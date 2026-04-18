import { Cache, Domain, Logger, LoggerLevel } from '@node-sdk/typings';
import { HttpInstance } from '@node-sdk/typings/http';

// ─────────────────────────────────────────────────────────────
// Normalized inbound message — the core output of the channel
// ─────────────────────────────────────────────────────────────

export type ChatType = 'p2p' | 'group';

export interface NormalizedMessage {
    messageId: string;
    chatId: string;
    chatType: ChatType;
    senderId: string;
    senderName?: string;
    content: string;
    rawContentType: string;
    resources: ResourceDescriptor[];
    mentions: MentionInfo[];
    mentionAll: boolean;
    mentionedBot: boolean;
    rootId?: string;
    threadId?: string;
    replyToMessageId?: string;
    createTime: number;
    raw?: unknown;
}

export interface ResourceDescriptor {
    type: 'image' | 'file' | 'audio' | 'video' | 'sticker';
    fileKey: string;
    fileName?: string;
    durationMs?: number;
    coverImageKey?: string;
}

export interface MentionInfo {
    key: string;
    openId?: string;
    userId?: string;
    name?: string;
    isBot?: boolean;
}

export interface BotIdentity {
    openId: string;
    userId?: string;
    name: string;
}

// ─────────────────────────────────────────────────────────────
// Outbound send / stream
// ─────────────────────────────────────────────────────────────

export type SendInput =
    | { markdown: string }
    | { text: string }
    | { post: object }
    | { image: { source: string | Buffer } }
    | { file: { source: string | Buffer; fileName: string } }
    | { audio: { source: string | Buffer; duration?: number } }
    | { video: { source: string | Buffer; duration?: number; coverImageKey?: string } }
    | { card: object }
    | { shareChat: { chatId: string } }
    | { shareUser: { userId: string } }
    | { sticker: { fileKey: string } };

export interface MediaSource {
    source: string | Buffer;
}

export interface SendOptions {
    replyTo?: string;
    replyInThread?: boolean;
    mentions?: MentionInfo[];
}

export interface SendResult {
    messageId: string;
    chunkIds?: string[];
}

export type StreamInput =
    | { markdown: MarkdownStreamProducer }
    | { card: { initial: object; producer: CardStreamProducer } };

export type MarkdownStreamProducer = (controller: MarkdownStreamController) => Promise<void>;
export type CardStreamProducer = (controller: CardStreamController) => Promise<void>;

export interface MarkdownStreamController {
    append(chunk: string): Promise<void>;
    setContent(full: string): Promise<void>;
    readonly messageId: string;
}

export interface CardStreamController {
    update(next: object | ((current: object) => object)): Promise<void>;
    readonly messageId: string;
    readonly current: object;
}

// ─────────────────────────────────────────────────────────────
// Events
// ─────────────────────────────────────────────────────────────

export interface EventMap {
    message: (msg: NormalizedMessage) => void | Promise<void>;
    reject: (evt: RejectEvent) => void;
    cardAction: (evt: CardActionEvent) => void | Promise<void>;
    reaction: (evt: ReactionEvent) => void;
    botAdded: (evt: BotAddedEvent) => void;
    comment: (evt: CommentEvent) => void | Promise<void>;
    error: (err: LarkChannelError) => void;
    reconnecting: () => void;
    reconnected: () => void;
}

export type EventName = keyof EventMap;

/**
 * Reason for a {@link RejectEvent}. These are the set of policy-level
 * decisions that deliberately reject a message and inform the caller.
 *
 * Internal defenses (duplicate dedup, stale/expired timestamps, in-flight
 * processing lock) silently drop their targets — they are not reject
 * reasons, because the caller cannot act on them meaningfully.
 */
export type RejectReason =
    | 'group_not_allowed'
    | 'sender_not_allowed'
    | 'no_mention'
    | 'dm_disabled'
    | 'mention_all_blocked';

export interface RejectEvent {
    messageId: string;
    chatId: string;
    senderId: string;
    reason: RejectReason;
}

export interface CardActionEvent {
    messageId: string;
    chatId: string;
    operator: { openId: string; userId?: string; name?: string };
    action: {
        value: unknown;
        tag: string;
        name?: string;
        option?: string;
    };
}

export interface ReactionEvent {
    messageId: string;
    operator: { openId: string; userId?: string };
    emojiType: string;
    action: 'added' | 'removed';
    actionTime?: number;
}

export interface BotAddedEvent {
    chatId: string;
    operator: { openId: string; userId?: string };
    /**
     * The bot's own name as carried in the `name` field of the Feishu event.
     * Not the chat's name — that requires a separate `getChatInfo(chatId)`
     * call, which callers can do on demand.
     */
    botName?: string;
    external?: boolean;
    raw?: unknown;
}

export interface CommentEvent {
    fileToken: string;
    fileType: string;
    commentId: string;
    replyId?: string;
    operator: { openId: string; userId?: string; unionId?: string };
    mentionedBot: boolean;
    timestamp: number;
    raw?: unknown;
}

export type LarkChannelErrorCode =
    | 'format_error'
    | 'target_revoked'
    | 'rate_limited'
    | 'permission_denied'
    | 'upload_failed'
    | 'ssrf_blocked'
    | 'send_timeout'
    | 'not_connected'
    | 'unknown';

export class LarkChannelError extends Error {
    code: LarkChannelErrorCode;

    cause?: unknown;

    context?: { to?: string; messageId?: string; attempt?: number };

    constructor(
        code: LarkChannelErrorCode,
        message: string,
        opts?: { cause?: unknown; context?: LarkChannelError['context'] }
    ) {
        super(message);
        this.name = 'LarkChannelError';
        this.code = code;
        this.cause = opts?.cause;
        this.context = opts?.context;
    }
}

// ─────────────────────────────────────────────────────────────
// Channel configuration
// ─────────────────────────────────────────────────────────────

export interface LarkChannelOptions {
    appId: string;
    appSecret: string;

    transport?: 'websocket' | 'webhook';
    webhook?: WebhookOptions;

    safety?: SafetyConfig;
    policy?: PolicyConfig;
    outbound?: OutboundConfig;

    logger?: Logger;
    loggerLevel?: LoggerLevel;
    cache?: Cache;
    domain?: Domain | string;
    httpInstance?: HttpInstance;

    /** Caller tag appended to User-Agent as `source/<name>`. */
    source?: string;

    includeRawInMessage?: boolean;
}

export interface WebhookOptions {
    verificationToken?: string;
    encryptKey?: string;
    adapter?: 'express' | 'koa' | 'koa-router';
}

export interface SafetyConfig {
    dedup?: {
        ttl?: number;
        maxEntries?: number;
        sweepIntervalMs?: number;
    };
    chatQueue?: {
        enabled?: boolean;
    };
    batch?: {
        text?: {
            delayMs?: number;
            longThresholdChars?: number;
            longDelayMs?: number;
            maxMessages?: number;
            maxChars?: number;
        };
        media?: {
            delayMs?: number;
            maxItems?: number;
        };
    };
    staleMessageWindowMs?: number;
}

export interface PolicyConfig {
    groupAllowlist?: string[];
    dmMode?: 'open' | 'allowlist' | 'pair' | 'disabled';
    dmAllowlist?: string[];
    requireMention?: boolean;
    respondToMentionAll?: boolean;
}

export interface OutboundConfig {
    textChunkLimit?: number;
    markdownConverter?: 'builtin' | ((md: string) => object);
    streamThrottleMs?: number;
    streamThrottleChars?: number;
    streamInitialText?: string;
    ssrfGuard?: boolean | { allowlist?: string[] };
    /**
     * Restrict local file paths accepted by media `source` to the listed
     * directories. When unset, only a POSIX blocklist (`/etc/`, `/proc/`,
     * `/sys/`, `/dev/`) is enforced as a safety net; when set, every path
     * must be inside one of these directories and symlink targets are
     * re-checked after `realpath` resolution.
     */
    allowedFileDirs?: string[];
    retry?: {
        maxAttempts?: number;
        baseDelayMs?: number;
    };
}

// ─────────────────────────────────────────────────────────────
// Low-level return types
// ─────────────────────────────────────────────────────────────

export interface ChatInfo {
    chatId: string;
    name?: string;
    description?: string;
    chatType: 'p2p' | 'group';
    ownerId?: string;
    memberCount?: number;
}

export type ResourceType = 'image' | 'file';
