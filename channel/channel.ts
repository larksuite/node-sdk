import { Client } from '@node-sdk/client/client';
import { WSClient } from '@node-sdk/ws-client';
import { EventDispatcher } from '@node-sdk/dispatcher/event';
import { defaultLogger } from '@node-sdk/logger/default-logger';
import { LoggerProxy } from '@node-sdk/logger/logger-proxy';
import { Domain, Logger, LoggerLevel } from '@node-sdk/typings';
import { internalCache } from '@node-sdk/utils';
import {
    BotIdentity,
    EventMap,
    EventName,
    LarkChannelError,
    LarkChannelOptions,
    PolicyConfig,
    ResourceType,
    SendInput,
    SendOptions,
    SendResult,
    StreamInput,
    ChatInfo,
} from './types';
import { OutboundSender } from './outbound';
import { classifyError } from './outbound/errors';
import { SafetyPipeline } from './safety';
import {
    normalize,
    normalizeBotAdded,
    normalizeCardAction,
    normalizeComment,
    normalizeReaction,
} from './normalize';
import type { ApiMessageItem, RawMessageEvent } from './normalize';

type Unsubscribe = () => void;

export class LarkChannel {
    readonly rawClient: Client;

    rawWsClient?: WSClient;

    botIdentity?: BotIdentity;

    private readonly opts: LarkChannelOptions;

    private readonly logger: Logger;

    private readonly dispatcher: EventDispatcher;

    private readonly handlers: Partial<EventMap> = {};

    private connectPromise?: Promise<void>;

    private connected = false;

    private readonly sender: OutboundSender;

    private readonly safety: SafetyPipeline;

    constructor(opts: LarkChannelOptions) {
        this.opts = opts;
        this.logger = new LoggerProxy(
            opts.loggerLevel ?? LoggerLevel.info,
            opts.logger ?? defaultLogger
        );

        this.rawClient = new Client({
            appId: opts.appId,
            appSecret: opts.appSecret,
            domain: opts.domain ?? Domain.Feishu,
            cache: opts.cache,
            httpInstance: opts.httpInstance,
            logger: opts.logger,
            loggerLevel: opts.loggerLevel,
            source: opts.source,
            extraUaTags: ['channel'],
        });

        this.dispatcher = new EventDispatcher({
            verificationToken: opts.webhook?.verificationToken,
            encryptKey: opts.webhook?.encryptKey,
            cache: opts.cache,
            logger: opts.logger,
            loggerLevel: opts.loggerLevel,
        });

        this.sender = new OutboundSender(this.rawClient, opts.outbound ?? {}, this.logger);

        this.safety = new SafetyPipeline({
            config: opts.safety,
            policy: opts.policy,
            cache: opts.cache ?? internalCache,
            logger: this.logger,
            onReject: (evt) => { this.handlers.reject?.(evt); },
            onMessage: async (merged) => {
                const handler = this.handlers.message;
                if (handler) await handler(merged);
            },
        });
    }

    // ─── lifecycle ──────────────────────────────────────────

    async connect(): Promise<void> {
        if (this.connectPromise) return this.connectPromise;
        this.connectPromise = this.doConnect().catch((err) => {
            this.connectPromise = undefined;
            throw err;
        });
        return this.connectPromise;
    }

    private async doConnect(): Promise<void> {
        this.botIdentity = await this.fetchBotIdentity();
        this.safety.setBotIdentity(this.botIdentity);
        this.registerDispatcherHandlers();

        const transport = this.opts.transport ?? 'websocket';
        if (transport === 'websocket') {
            await this.connectWebSocket(15000);
        }
        // webhook transport wiring is external: user plugs this.dispatcher into
        // their HTTP handler via the existing adaptor modules.
        this.connected = true;
    }

    /**
     * Construct the underlying WSClient and wait for its `onReady` callback —
     * so `connect()` only resolves after the first WebSocket handshake
     * actually succeeds. Rejects on `onError` or if the handshake doesn't
     * complete within `timeoutMs`.
     *
     * Also wires `onReconnecting` / `onReconnected` callbacks to emit the
     * corresponding public events.
     */
    private connectWebSocket(timeoutMs: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            let settled = false;
            const timer = setTimeout(() => {
                if (settled) return;
                settled = true;
                reject(new LarkChannelError(
                    'not_connected',
                    `WebSocket handshake did not complete within ${timeoutMs}ms`,
                ));
            }, timeoutMs);

            this.rawWsClient = new WSClient({
                appId: this.opts.appId,
                appSecret: this.opts.appSecret,
                domain: this.opts.domain ?? Domain.Feishu,
                logger: this.opts.logger,
                loggerLevel: this.opts.loggerLevel,
                httpInstance: this.opts.httpInstance,
                autoReconnect: true,
                source: this.opts.source,
                extraUaTags: ['channel'],
                onReady: () => {
                    if (settled) return;
                    settled = true;
                    clearTimeout(timer);
                    resolve();
                },
                onError: (err) => {
                    if (settled) return;
                    settled = true;
                    clearTimeout(timer);
                    reject(new LarkChannelError(
                        'not_connected',
                        `WebSocket connect failed: ${err.message}`,
                        { cause: err },
                    ));
                },
                onReconnecting: () => this.handlers.reconnecting?.(),
                onReconnected: () => this.handlers.reconnected?.(),
            });
            this.rawWsClient.start({ eventDispatcher: this.dispatcher });
        });
    }

    async disconnect(): Promise<void> {
        if (!this.connected) return;
        try { this.rawWsClient?.close({}); } catch { /* best effort */ }
        try { await this.safety.dispose(); } catch { /* best effort */ }
        this.connected = false;
        this.connectPromise = undefined;
    }

    // ─── event subscription ────────────────────────────────

    on<K extends EventName>(name: K, handler: EventMap[K]): Unsubscribe;

    on(handlers: Partial<EventMap>): Unsubscribe;

    on(
        nameOrMap: EventName | Partial<EventMap>,
        handler?: EventMap[EventName]
    ): Unsubscribe {
        if (typeof nameOrMap === 'string') {
            return this.attachSingle(nameOrMap, handler as EventMap[EventName]);
        }
        const unsubs: Unsubscribe[] = [];
        (Object.keys(nameOrMap) as EventName[]).forEach((k) => {
            const fn = nameOrMap[k];
            if (fn) unsubs.push(this.attachSingle(k, fn as EventMap[EventName]));
        });
        return () => unsubs.forEach((u) => u());
    }

    private attachSingle<K extends EventName>(
        name: K,
        handler: EventMap[K]
    ): Unsubscribe {
        if (this.handlers[name]) {
            this.logger.warn(`channel: handler for "${name}" is being overwritten`);
        }
        this.handlers[name] = handler;
        return () => {
            if (this.handlers[name] === handler) delete this.handlers[name];
        };
    }

    // ─── outbound ──────────────────────────────────────────

    async send(to: string, input: SendInput, opts?: SendOptions): Promise<SendResult> {
        return this.sender.send(to, input, opts);
    }

    async stream(to: string, input: StreamInput, opts?: SendOptions): Promise<SendResult> {
        return this.sender.stream(to, input, opts);
    }

    // ─── low-level ─────────────────────────────────────────

    async updateCard(messageId: string, card: object): Promise<void> {
        await this.sender.patchCard(messageId, card);
    }

    /**
     * Edit an already-sent message's text/post content. Uses `im.v1.message.update`
     * which (per Feishu docs) only supports editing text and rich-text (post)
     * messages. For cards, use {@link updateCard} instead — a wrong attempt to
     * use this on a card would hit the same API and fail with a clearer
     * Feishu-side error.
     */
    async editMessage(messageId: string, text: string): Promise<void> {
        await this.rawClient.im.v1.message.update({
            path: { message_id: messageId },
            data: {
                msg_type: 'text',
                content: JSON.stringify({ text }),
            } as never,
        });
    }

    async recallMessage(messageId: string): Promise<void> {
        await this.rawClient.im.v1.message.delete({
            path: { message_id: messageId },
        });
    }

    /**
     * Add an emoji reaction to a message. Returns the `reaction_id` Feishu
     * assigned — stash it if you want to {@link removeReaction} later,
     * since the raw `im.message.reaction.*_v1` events don't carry the id.
     * Only the bot's own reactions can be removed.
     */
    async addReaction(messageId: string, emojiType: string): Promise<string> {
        const r = await this.rawClient.im.v1.messageReaction.create({
            path: { message_id: messageId },
            data: { reaction_type: { emoji_type: emojiType } } as never,
        });
        const rid =
            (r as { data?: { reaction_id?: string } } | null)?.data?.reaction_id ??
            (r as { reaction_id?: string } | null)?.reaction_id;
        if (!rid) {
            throw new LarkChannelError(
                'unknown',
                'messageReaction.create returned no reaction_id',
            );
        }
        return rid;
    }

    /**
     * Remove a reaction by its `reaction_id` (the value returned from
     * {@link addReaction}). Only the bot's own reactions can be removed —
     * removing a user-added reaction will fail with a Feishu permission
     * error.
     */
    async removeReaction(messageId: string, reactionId: string): Promise<void> {
        await this.rawClient.im.v1.messageReaction.delete({
            path: { message_id: messageId, reaction_id: reactionId },
        });
    }

    /**
     * Convenience: remove the bot's reaction on `messageId` matching
     * `emojiType`, without needing the `reaction_id`. Lists the message's
     * reactions filtered by emoji, picks the one added by this bot
     * (operator_type === 'app'), and deletes it. Returns `true` if a
     * matching reaction was found and deleted, `false` otherwise (including
     * the case where the bot never added that emoji).
     */
    async removeReactionByEmoji(
        messageId: string,
        emojiType: string,
    ): Promise<boolean> {
        const r = await this.rawClient.im.v1.messageReaction.list({
            path: { message_id: messageId },
            params: { reaction_type: emojiType, page_size: 50 } as never,
        });
        const items =
            (r as {
                data?: {
                    items?: Array<{
                        reaction_id?: string;
                        operator?: { operator_type?: 'app' | 'user' };
                    }>;
                };
            } | null)?.data?.items ?? [];
        const mine = items.find((it) => it.operator?.operator_type === 'app');
        if (!mine?.reaction_id) return false;
        await this.removeReaction(messageId, mine.reaction_id);
        return true;
    }

    async downloadResource(fileKey: string, type: ResourceType): Promise<Buffer> {
        if (type === 'image') {
            const r = await this.rawClient.im.v1.image.get({
                path: { image_key: fileKey },
            });
            return await bufferFromStream(r as unknown);
        }
        const r = await this.rawClient.im.v1.file.get({
            path: { file_key: fileKey },
        });
        return await bufferFromStream(r as unknown);
    }

    async getChatInfo(chatId: string): Promise<ChatInfo> {
        const r = await this.rawClient.im.v1.chat.get({
            path: { chat_id: chatId },
        });
        const d = (r as { data?: Record<string, unknown> }).data ?? {};
        return {
            chatId,
            name: d.name as string | undefined,
            description: d.description as string | undefined,
            chatType: (d.chat_mode as 'p2p' | 'group') ?? 'group',
            ownerId: d.owner_id as string | undefined,
            memberCount: d.user_count as number | undefined,
        };
    }

    // ─── runtime config ────────────────────────────────────

    updatePolicy(partial: Partial<PolicyConfig>): void {
        this.safety.updatePolicy(partial);
    }

    getPolicy(): Readonly<PolicyConfig> {
        return this.safety.getPolicy();
    }

    // ─── internals: bot identity & dispatch wiring ────────

    private async fetchBotIdentity(): Promise<BotIdentity> {
        // Standard Feishu API: GET /open-apis/bot/v3/info
        // Returns: { code, msg, bot: { open_id, app_name, avatar_url, ... } }
        let lastError: unknown;
        try {
            const r = await this.rawClient.request({
                url: '/open-apis/bot/v3/info',
                method: 'GET',
            });
            const bot = (r as { bot?: { open_id?: string; app_name?: string } }).bot;
            if (bot?.open_id) {
                return { openId: bot.open_id, name: bot.app_name ?? 'bot' };
            }
            lastError = new Error(
                `bot/v3/info response missing open_id: ${JSON.stringify(r).slice(0, 200)}`
            );
        } catch (e) {
            lastError = e;
        }

        // Let the shared error classifier decide: 401/403 / feishu auth codes
        // → permission_denied; rate_limited / send_timeout pass through;
        // everything else falls back to `not_connected` (the genuine
        // "couldn't reach the API" bucket). Without this, all connect
        // failures collapse to `not_connected`, making auth errors
        // indistinguishable from network errors.
        const classified = classifyError(lastError);
        const code = classified.code === 'unknown' ? 'not_connected' : classified.code;
        throw new LarkChannelError(
            code,
            'could not resolve bot identity via /open-apis/bot/v3/info — required for channel to function',
            { cause: lastError }
        );
    }

    private registerDispatcherHandlers(): void {
        // `im.v1.message.get(mid)` on a merge_forward message returns
        // `data.items[]` as a flat list: the parent message first (no
        // `upper_message_id`) followed by every descendant, each with
        // `upper_message_id` pointing at its direct parent. That is
        // exactly what `convertMergeForward` / `buildChildrenMap` consume,
        // so the converter tree-builds correctly without further work.
        // (Earlier attempts used `message.list` with
        // `container_id_type: 'message'`, which Feishu rejects — 'message'
        // isn't a valid container type.)
        const fetchSubMessages = async (mid: string): Promise<ApiMessageItem[]> => {
            try {
                const r = await this.rawClient.im.v1.message.get({
                    path: { message_id: mid },
                });
                const items = (r as { data?: { items?: ApiMessageItem[] } }).data?.items ?? [];
                return items;
            } catch (e) {
                this.logger.warn?.('channel: fetchSubMessages failed', e);
                return [];
            }
        };

        const normalizeOpts = {
            botIdentity: this.botIdentity!,
            stripBotMentions: true,
            includeRaw: this.opts.includeRawInMessage,
            fetchSubMessages,
        };

        this.dispatcher.register({
            // IM message — full safety pipeline
            'im.message.receive_v1': async (raw: unknown) => {
                try {
                    const msg = await normalize(raw as RawMessageEvent, normalizeOpts);
                    await this.safety.pushMessage(msg);
                } catch (e) {
                    this.emitError(e);
                }
            },

            // Card button click — dedup + lock + queue (by chatId).
            // The key includes the action's identity (tag + value) so that
            // different buttons on the same card by the same user are NOT
            // collapsed by the dedup cache. A genuine Feishu re-delivery
            // of the same click still hashes to the same key.
            'card.action.trigger': async (raw: unknown) => {
                const evt = normalizeCardAction(raw as never);
                if (!evt) return;
                const actionId = cardActionId(evt.action);
                await this.safety.pushAction(
                    `card:${evt.messageId}:${evt.operator.openId}:${actionId}`,
                    evt.chatId,
                    async () => {
                        const h = this.handlers.cardAction;
                        if (h) await h(evt);
                    }
                );
            },

            // Reactions — dedup only
            'im.message.reaction.created_v1': async (raw: unknown) => {
                const evt = normalizeReaction(raw as never, 'added');
                if (!evt) return;
                const key = reactionKey(evt);
                await this.safety.pushLight(key, () => this.handlers.reaction?.(evt));
            },
            'im.message.reaction.deleted_v1': async (raw: unknown) => {
                const evt = normalizeReaction(raw as never, 'removed');
                if (!evt) return;
                const key = reactionKey(evt);
                await this.safety.pushLight(key, () => this.handlers.reaction?.(evt));
            },

            // Bot added — direct fire, no safety
            'im.chat.member.bot.added_v1': (raw: unknown) => {
                const evt = normalizeBotAdded(raw as never, {
                    includeRaw: this.opts.includeRawInMessage,
                });
                if (!evt) return;
                try {
                    this.handlers.botAdded?.(evt);
                } catch (e) { this.emitError(e); }
            },

            // Drive comments — dedup + lock + queue (by fileToken)
            'drive.notice.comment_add_v1': async (raw: unknown) => {
                const evt = normalizeComment(raw as never, {
                    includeRaw: this.opts.includeRawInMessage,
                });
                if (!evt) return;
                await this.safety.pushAction(
                    `comment:${evt.fileToken}:${evt.commentId}`,
                    evt.fileToken,
                    async () => {
                        const h = this.handlers.comment;
                        if (h) await h(evt);
                    }
                );
            },
        } as never);
    }

    private emitError(e: unknown): void {
        const err = e instanceof LarkChannelError
            ? e
            : new LarkChannelError('unknown', String((e as { message?: string })?.message ?? e), { cause: e });
        const handler = this.handlers.error;
        if (handler) handler(err);
        else this.logger.error?.('channel: unhandled error', err);
    }
}

export function createLarkChannel(opts: LarkChannelOptions): LarkChannel {
    return new LarkChannel(opts);
}

async function bufferFromStream(raw: unknown): Promise<Buffer> {
    if (Buffer.isBuffer(raw)) return raw;
    if (raw instanceof Uint8Array) return Buffer.from(raw);
    if (typeof raw === 'object' && raw !== null) {
        const r = raw as {
            data?: unknown;
            getReadableStream?: () => NodeJS.ReadableStream;
        };
        // The code-gen download endpoints (im.v1.image.get / im.v1.file.get)
        // return a wrapper object `{ writeFile, getReadableStream, headers }`
        // where the body is exposed as a stream. Consume it into a Buffer.
        if (typeof r.getReadableStream === 'function') {
            return await readableToBuffer(r.getReadableStream());
        }
        if (Buffer.isBuffer(r.data)) return r.data;
        if (r.data instanceof Uint8Array) return Buffer.from(r.data);
    }
    throw new LarkChannelError('unknown', 'unexpected download response type');
}

function readableToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on('data', (chunk: Buffer | string) => {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        });
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
    });
}

function reactionKey(evt: {
    messageId: string;
    operator: { openId: string };
    emojiType: string;
    action: 'added' | 'removed';
    actionTime?: number;
}): string {
    return `rx:${evt.messageId}:${evt.operator.openId}:${evt.emojiType}:${evt.action}:${evt.actionTime ?? 0}`;
}

/**
 * Build a stable identity for a card action event's button/element, so that
 * different clicks on the same card by the same user dedup independently.
 * `tag` plus serialized `value` is enough to tell buttons apart; `name` and
 * `option` are rolled in for form-style interactions where the same value
 * may repeat but the triggering element differs. The serialized payload is
 * length-clamped to keep cache keys small.
 */
function cardActionId(action: {
    value: unknown;
    tag: string;
    name?: string;
    option?: string;
}): string {
    const serialized =
        typeof action.value === 'string' ? action.value : JSON.stringify(action.value ?? '');
    const valuePart = serialized.length > 128 ? serialized.slice(0, 128) : serialized;
    return `${action.tag}|${action.name ?? ''}|${action.option ?? ''}|${valuePart}`;
}
