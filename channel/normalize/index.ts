import type { BotIdentity, NormalizedMessage } from '../types';
import type { ApiMessageItem, ConvertContext, RawMessageEvent } from './context';
import { extractMentions, resolveMentions } from './mentions';
import { dispatchConvert } from './registry';

export type {
    ConvertContext,
    ConvertResult,
    ContentConverterFn,
    RawMessageEvent,
    ApiMessageItem,
} from './context';
export { extractMentions, resolveMentions } from './mentions';
export { normalizeCardAction, RawCardActionEvent } from './card-action';
export { normalizeReaction, RawReactionEvent } from './reaction';
export { normalizeBotAdded, RawBotAddedEvent } from './bot-added';
export { normalizeComment, RawCommentEvent } from './comment';

export interface NormalizeOptions {
    botIdentity: BotIdentity;
    stripBotMentions?: boolean;
    includeRaw?: boolean;
    fetchSubMessages?: (messageId: string) => Promise<ApiMessageItem[]>;
    resolveUserName?: (openId: string) => string | undefined;
    resolveSenderName?: (openId: string) => string | undefined;
    batchResolveNames?: (openIds: string[]) => Promise<void>;
}

/**
 * Normalize a raw Feishu message event into a NormalizedMessage.
 *
 * Pipeline:
 *   1. Extract mentions → build key/openId maps + bot detection
 *   2. For `interactive` type, fetch full v2 card content if capability available
 *   3. Build ConvertContext with injected capabilities
 *   4. Dispatch to the matching converter (uniform error containment inside)
 *   5. Run resolveMentions second pass — replace placeholders with @name
 *   6. Assemble and return NormalizedMessage
 */
export async function normalize(
    event: RawMessageEvent,
    opts: NormalizeOptions
): Promise<NormalizedMessage> {
    const msg = event.message;
    const botOpenId = opts.botIdentity?.openId;

    const { mentions, mentionsByOpenId, mentionList, mentionAll: mentionAllFromRaw, mentionedBot } = extractMentions(
        msg.mentions,
        botOpenId
    );

    // Feishu frequently omits the `mentions` array even when the message
    // contains `@所有人` — the placeholder `@_all` stays inline in content.
    // Fall back to a content-level scan so policy gating (respondToMentionAll)
    // and downstream consumers see a truthy mentionAll in that case.
    const mentionAll = mentionAllFromRaw || detectMentionAllInContent(msg.content);

    const ctx: ConvertContext = {
        messageId: msg.message_id,
        botOpenId,
        mentions,
        mentionsByOpenId,
        stripBotMentions: opts.stripBotMentions ?? true,
        fetchSubMessages: opts.fetchSubMessages,
        resolveUserName: opts.resolveUserName,
        batchResolveNames: opts.batchResolveNames,
        dispatch: dispatchConvert,
    };

    const { content: rawContent, resources } = await dispatchConvert(
        msg.content,
        msg.message_type,
        ctx
    );

    const content = resolveMentions(rawContent, ctx);

    const senderOpenId = event.sender.sender_id.open_id;
    const senderFallbackId = event.sender.sender_id.user_id ?? event.sender.sender_id.union_id ?? '';
    const senderId = senderOpenId ?? senderFallbackId;
    const senderName = senderOpenId ? opts.resolveSenderName?.(senderOpenId) : undefined;

    const createMs = msg.create_time ? parseInt(msg.create_time, 10) : 0;

    return {
        messageId: msg.message_id,
        chatId: msg.chat_id,
        chatType: msg.chat_type as NormalizedMessage['chatType'],
        senderId,
        senderName,
        content,
        rawContentType: msg.message_type,
        resources,
        mentions: mentionList,
        mentionAll,
        mentionedBot,
        rootId: msg.root_id,
        threadId: msg.thread_id,
        replyToMessageId: msg.parent_id,
        createTime: Number.isFinite(createMs) ? createMs : 0,
        raw: opts.includeRaw ? event : undefined,
    };
}

/**
 * Detect `@_all` placeholder inside a raw Feishu content JSON string without
 * parsing. We deliberately search the serialized form (not the parsed text),
 * because the placeholder can appear in a `text` field (text/post) or inside
 * nested content arrays (post). The placeholder is bounded by non-word chars
 * on the right (whitespace, quote, punctuation) — on the left `@` is already
 * a non-word char so no explicit boundary is needed.
 */
function detectMentionAllInContent(content: string | undefined): boolean {
    if (!content) return false;
    return /@_all\b/.test(content);
}
