import type { CommentEvent } from '../types';

export interface RawCommentEvent {
    app_id?: string;
    file_token?: string;
    file_type?: string;
    comment_id?: string;
    reply_id?: string;
    /** Whether the bot was mentioned. Top-level in current payload. */
    is_mentioned?: boolean;
    /** Millisecond timestamp of the event. */
    create_time?: string;
    notice_meta?: {
        from_user_id?: {
            open_id?: string;
            user_id?: string | null;
            union_id?: string;
        };
        to_user_id?: {
            open_id?: string;
            user_id?: string | null;
            union_id?: string;
        };
        file_token?: string;
        file_type?: string;
        timestamp?: string;
        is_mentioned?: boolean;
        notice_type?: string;
    };
    // Fallback top-level fields (legacy SDK flattening)
    is_mention?: boolean;
    user_id?: {
        open_id?: string;
        user_id?: string | null;
        union_id?: string;
    };
    action_time?: string;
}

export function normalizeComment(
    event: RawCommentEvent,
    opts?: { includeRaw?: boolean }
): CommentEvent | null {
    const fileToken = event.file_token ?? event.notice_meta?.file_token;
    const fileType = event.file_type ?? event.notice_meta?.file_type;
    const commentId = event.comment_id;

    const userId = event.notice_meta?.from_user_id ?? event.user_id;
    const operatorOpenId = userId?.open_id;

    if (!fileToken || !fileType || !commentId || !operatorOpenId) return null;

    const tsStr =
        event.create_time ??
        event.notice_meta?.timestamp ??
        event.action_time;
    const timestamp = tsStr ? parseInt(tsStr, 10) : Date.now();

    return {
        fileToken,
        fileType,
        commentId,
        replyId: event.reply_id,
        operator: {
            openId: operatorOpenId,
            userId: userId?.user_id ?? undefined,
            unionId: userId?.union_id,
        },
        mentionedBot: Boolean(
            event.is_mentioned ?? event.notice_meta?.is_mentioned ?? event.is_mention
        ),
        timestamp: Number.isFinite(timestamp) ? timestamp : Date.now(),
        raw: opts?.includeRaw ? event : undefined,
    };
}
