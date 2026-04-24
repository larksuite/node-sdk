import type { Client } from '@node-sdk/client/client';
import type { Logger } from '@node-sdk/typings';
import {
    LarkChannelError,
    OutboundConfig,
    SendInput,
    SendOptions,
    SendResult,
    StreamInput,
} from '../types';
import { MarkdownStreamController } from './streaming/markdown-stream';
import { CardStreamController } from './streaming/card-stream';
import { MediaUploader } from './media/uploader';
import { markdownToPost, postToPlainText } from './markdown/to-post';
import { splitWithCodeFences } from './markdown/splitter';
import { composeMentionsTextPrefix } from './markdown/compose-mentions';
import { detectReceiveIdType, ReceiveIdType } from './routing';
import { classifyError, isFormatError, isReplyTargetGone } from './errors';
import { retry } from './retry';

const DEFAULT_CHUNK_LIMIT = 3500;

interface RawSendArgs {
    to: string;
    idType: ReceiveIdType;
    msgType: string;
    content: object;     // parsed; will be JSON.stringify'd at the edge
    replyTo?: string;
    replyInThread?: boolean;
}

export class OutboundSender {
    public readonly uploader: MediaUploader;
    private chunkLimit: number;

    constructor(
        public readonly client: Client,
        public readonly config: OutboundConfig,
        public readonly logger: Logger
    ) {
        this.uploader = new MediaUploader(client, config);
        this.chunkLimit = config.textChunkLimit ?? DEFAULT_CHUNK_LIMIT;
    }

    async send(to: string, input: SendInput, opts: SendOptions = {}): Promise<SendResult> {
        const idType = detectReceiveIdType(to);

        if ('markdown' in input) return this.sendMarkdown(to, idType, input.markdown, opts);
        if ('text' in input) return this.sendText(to, idType, input.text, opts);
        if ('post' in input) return this.sendPost(to, idType, input.post, opts);
        if ('image' in input) return this.sendImage(to, idType, input.image, opts);
        if ('file' in input) return this.sendFile(to, idType, input.file, opts);
        if ('audio' in input) return this.sendAudio(to, idType, input.audio, opts);
        if ('video' in input) return this.sendVideo(to, idType, input.video, opts);
        if ('card' in input) return this.sendCard(to, idType, input.card, opts);
        if ('shareChat' in input) return this.sendShareChat(to, idType, input.shareChat.chatId, opts);
        if ('shareUser' in input) return this.sendShareUser(to, idType, input.shareUser.userId, opts);
        if ('sticker' in input) return this.sendSticker(to, idType, input.sticker.fileKey, opts);
        throw new LarkChannelError('format_error', 'unrecognized SendInput shape');
    }

    async stream(to: string, input: StreamInput, opts: SendOptions = {}): Promise<SendResult> {
        const idType = detectReceiveIdType(to);
        if ('markdown' in input) {
            const controller = new MarkdownStreamController(this, to, idType, opts);
            return controller.run(input.markdown);
        }
        if ('card' in input) {
            const controller = new CardStreamController(this, to, idType, opts, input.card.initial);
            return controller.run(input.card.producer);
        }
        throw new LarkChannelError('format_error', 'unrecognized StreamInput shape');
    }

    // ─── text / markdown / post ───────────────────────────

    private async sendMarkdown(
        to: string,
        idType: ReceiveIdType,
        md: string,
        opts: SendOptions
    ): Promise<SendResult> {
        const chunks = splitWithCodeFences(md, this.chunkLimit);
        const ids: string[] = [];
        for (let i = 0; i < chunks.length; i++) {
            const post = this.convertMarkdown(chunks[i], i === 0 ? opts.mentions : undefined);
            const id = await this.sendOneWithFallback({
                to, idType,
                msgType: 'post', content: post,
                replyTo: i === 0 ? opts.replyTo : undefined,
                replyInThread: opts.replyInThread,
            });
            ids.push(id);
        }
        return this.makeResult(ids);
    }

    private async sendText(
        to: string,
        idType: ReceiveIdType,
        text: string,
        opts: SendOptions
    ): Promise<SendResult> {
        const prefix = composeMentionsTextPrefix(opts.mentions ?? []);
        const body = prefix + text;
        const chunks = splitPlain(body, this.chunkLimit);
        const ids: string[] = [];
        for (let i = 0; i < chunks.length; i++) {
            const id = await this.sendOneWithFallback({
                to, idType,
                msgType: 'text',
                content: { text: chunks[i] },
                replyTo: i === 0 ? opts.replyTo : undefined,
                replyInThread: opts.replyInThread,
            });
            ids.push(id);
        }
        return this.makeResult(ids);
    }

    private async sendPost(
        to: string,
        idType: ReceiveIdType,
        post: object,
        opts: SendOptions
    ): Promise<SendResult> {
        const id = await this.sendOneWithFallback({
            to, idType,
            msgType: 'post',
            content: post,
            replyTo: opts.replyTo,
            replyInThread: opts.replyInThread,
        });
        return { messageId: id };
    }

    private convertMarkdown(md: string, mentions?: SendOptions['mentions']): object {
        const conv = this.config.markdownConverter;
        if (typeof conv === 'function') return conv(md);
        return markdownToPost(md, { mentions });
    }

    // ─── media ────────────────────────────────────────────

    private async sendImage(
        to: string, idType: ReceiveIdType,
        input: { source: string | Buffer },
        opts: SendOptions
    ): Promise<SendResult> {
        const up = await this.uploader.upload({ kind: 'image', source: input.source });
        const id = await this.sendOneWithFallback({
            to, idType,
            msgType: 'image',
            content: { image_key: up.fileKey },
            replyTo: opts.replyTo,
            replyInThread: opts.replyInThread,
        });
        return { messageId: id };
    }

    private async sendFile(
        to: string, idType: ReceiveIdType,
        input: { source: string | Buffer; fileName: string },
        opts: SendOptions
    ): Promise<SendResult> {
        const up = await this.uploader.upload({
            kind: 'file', source: input.source, fileName: input.fileName,
        });
        const id = await this.sendOneWithFallback({
            to, idType,
            msgType: 'file',
            content: { file_key: up.fileKey },
            replyTo: opts.replyTo,
            replyInThread: opts.replyInThread,
        });
        return { messageId: id };
    }

    private async sendAudio(
        to: string, idType: ReceiveIdType,
        input: { source: string | Buffer; duration?: number },
        opts: SendOptions
    ): Promise<SendResult> {
        const up = await this.uploader.upload({
            kind: 'audio', source: input.source, duration: input.duration,
        });
        const id = await this.sendOneWithFallback({
            to, idType,
            msgType: 'audio',
            content: { file_key: up.fileKey },
            replyTo: opts.replyTo,
            replyInThread: opts.replyInThread,
        });
        return { messageId: id };
    }

    private async sendVideo(
        to: string, idType: ReceiveIdType,
        input: { source: string | Buffer; duration?: number; coverImageKey?: string },
        opts: SendOptions
    ): Promise<SendResult> {
        const up = await this.uploader.upload({
            kind: 'video', source: input.source, duration: input.duration,
        });
        const content: Record<string, unknown> = { file_key: up.fileKey };
        if (input.coverImageKey) content.image_key = input.coverImageKey;
        const id = await this.sendOneWithFallback({
            to, idType,
            msgType: 'media',
            content,
            replyTo: opts.replyTo,
            replyInThread: opts.replyInThread,
        });
        return { messageId: id };
    }

    // ─── card ─────────────────────────────────────────────

    private async sendCard(
        to: string, idType: ReceiveIdType,
        card: object,
        opts: SendOptions
    ): Promise<SendResult> {
        const id = await this.sendOneWithFallback({
            to, idType,
            msgType: 'interactive',
            content: card,
            replyTo: opts.replyTo,
            replyInThread: opts.replyInThread,
        });
        return { messageId: id };
    }

    // ─── share / sticker ──────────────────────────────────

    private async sendShareChat(
        to: string, idType: ReceiveIdType,
        chatId: string,
        opts: SendOptions
    ): Promise<SendResult> {
        const id = await this.sendOneWithFallback({
            to, idType,
            msgType: 'share_chat',
            content: { chat_id: chatId },
            replyTo: opts.replyTo,
            replyInThread: opts.replyInThread,
        });
        return { messageId: id };
    }

    private async sendShareUser(
        to: string, idType: ReceiveIdType,
        userId: string,
        opts: SendOptions
    ): Promise<SendResult> {
        const id = await this.sendOneWithFallback({
            to, idType,
            msgType: 'share_user',
            content: { user_id: userId },
            replyTo: opts.replyTo,
            replyInThread: opts.replyInThread,
        });
        return { messageId: id };
    }

    private async sendSticker(
        to: string, idType: ReceiveIdType,
        fileKey: string,
        opts: SendOptions
    ): Promise<SendResult> {
        const id = await this.sendOneWithFallback({
            to, idType,
            msgType: 'sticker',
            content: { file_key: fileKey },
            replyTo: opts.replyTo,
            replyInThread: opts.replyInThread,
        });
        return { messageId: id };
    }

    // ─── low-level raw send with fallback & retry ─────────

    /**
     * Send once with fallback for format errors (post → text) and for
     * vanished reply targets (reply → create).
     */
    async sendOneWithFallback(args: RawSendArgs): Promise<string> {
        try {
            return await this.rawSendWithRetry(args);
        } catch (e) {
            const err = classifyError(e, { to: args.to });
            if (isReplyTargetGone(err) && args.replyTo) {
                return this.rawSendWithRetry({ ...args, replyTo: undefined });
            }
            if (isFormatError(err) && args.msgType === 'post') {
                const plain = postToPlainText(args.content);
                return this.rawSendWithRetry({
                    ...args, msgType: 'text', content: { text: plain || '[message]' },
                });
            }
            throw err;
        }
    }

    async rawSendWithRetry(args: RawSendArgs): Promise<string> {
        return retry(
            () => this.rawSend(args),
            this.config.retry
        );
    }

    private async rawSend(args: RawSendArgs): Promise<string> {
        const payload = {
            receive_id: args.to,
            msg_type: args.msgType,
            content: JSON.stringify(args.content),
        };
        if (args.replyTo) {
            const r = await this.client.im.v1.message.reply({
                path: { message_id: args.replyTo },
                data: {
                    content: payload.content,
                    msg_type: args.msgType,
                    reply_in_thread: args.replyInThread,
                } as never,
            });
            const id = (r as { data?: { message_id?: string } }).data?.message_id;
            if (!id) throw new LarkChannelError('unknown', 'message_id missing from reply response');
            return id;
        }
        const r = await this.client.im.v1.message.create({
            params: { receive_id_type: args.idType } as never,
            data: payload as never,
        });
        const id = (r as { data?: { message_id?: string } }).data?.message_id;
        if (!id) throw new LarkChannelError('unknown', 'message_id missing from create response');
        return id;
    }

    // ─── helpers used by streaming ────────────────────────

    /**
     * Full card replace via im.v1.message.patch — used by CardStreamController
     * and the public `channel.updateCard()` low-level API. Not suitable for
     * text streaming (use native cardkit streaming below for that).
     */
    async patchCard(messageId: string, card: object): Promise<void> {
        await this.client.im.v1.message.patch({
            path: { message_id: messageId },
            data: { content: JSON.stringify(card) } as never,
        });
    }

    /**
     * Create a card instance via cardkit.v1.card.create. Used to get a
     * `card_id` that can be referenced from messages AND updated with
     * native streaming APIs (cardElement.content for typewriter effect).
     */
    async createCardInstance(spec: object): Promise<string> {
        const r = await this.client.cardkit.v1.card.create({
            data: { type: 'card_json', data: JSON.stringify(spec) } as never,
        });
        const cardId = (r as { data?: { card_id?: string } }).data?.card_id;
        if (!cardId) {
            throw new LarkChannelError('unknown', 'cardkit.card.create returned no card_id');
        }
        return cardId;
    }

    /**
     * Send an interactive message that references a pre-created card instance
     * by card_id. Returns the resulting message_id.
     */
    async sendCardByReference(
        to: string,
        idType: ReceiveIdType,
        cardId: string,
        opts: SendOptions,
    ): Promise<string> {
        return this.rawSendWithRetry({
            to, idType,
            msgType: 'interactive',
            content: { type: 'card', data: { card_id: cardId } },
            replyTo: opts.replyTo,
            replyInThread: opts.replyInThread,
        });
    }

    /**
     * Stream update: replace a card element's content and let Feishu render
     * the incremental diff as a typewriter animation. `sequence` must be
     * monotonically increasing per card (duplicates/out-of-order → rejected
     * server-side). `uuid` is required for idempotency — we compose it from
     * cardId + sequence so two concurrent calls with the same seq would
     * dedupe rather than both take effect.
     */
    async updateCardElementContent(
        cardId: string,
        elementId: string,
        content: string,
        sequence: number,
    ): Promise<void> {
        await this.client.cardkit.v1.cardElement.content({
            path: { card_id: cardId, element_id: elementId },
            data: {
                content,
                sequence,
                uuid: `c_${cardId}_${sequence}`,
            } as never,
        });
    }

    /**
     * Switch a streaming card to finalized state (streaming_mode: false).
     * Feishu auto-closes after 10min regardless, but callers should close
     * explicitly when producer completes.
     *
     * `summary` is optional; when provided, also updates the card's preview
     * text (the one shown in message lists / chat previews). Without it, the
     * preview stays at whatever was set during streaming (typically the
     * default "[Generating...]"), which looks stuck.
     */
    async finishStreamingCard(
        cardId: string,
        sequence: number,
        summary?: string,
    ): Promise<void> {
        const config: Record<string, unknown> = { streaming_mode: false };
        if (summary !== undefined) {
            config.summary = { content: summary };
        }
        await this.client.cardkit.v1.card.settings({
            path: { card_id: cardId },
            data: {
                settings: JSON.stringify({ config }),
                sequence,
                uuid: `s_${cardId}_${sequence}`,
            } as never,
        });
    }

    private makeResult(ids: string[]): SendResult {
        return {
            messageId: ids[0],
            chunkIds: ids.length > 1 ? ids : undefined,
        };
    }
}

function splitPlain(text: string, limit: number): string[] {
    if (text.length <= limit) return [text];
    const out: string[] = [];
    for (let i = 0; i < text.length; i += limit) {
        out.push(text.slice(i, i + limit));
    }
    return out;
}
