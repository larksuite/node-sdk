import type { ReactionEvent } from '../types';

export interface RawReactionEvent {
    message_id?: string;
    reaction_type?: { emoji_type?: string };
    operator_type?: string;
    user_id?: {
        open_id?: string;
        user_id?: string | null;
        union_id?: string;
    };
    action_time?: string;
}

export function normalizeReaction(
    event: RawReactionEvent,
    action: 'added' | 'removed'
): ReactionEvent | null {
    const messageId = event.message_id;
    const emojiType = event.reaction_type?.emoji_type;
    const operatorOpenId = event.user_id?.open_id;

    if (!messageId || !emojiType || !operatorOpenId) return null;

    const actionTimeStr = event.action_time;
    const actionTime = actionTimeStr ? parseInt(actionTimeStr, 10) : undefined;

    return {
        messageId,
        operator: {
            openId: operatorOpenId,
            userId: event.user_id?.user_id ?? undefined,
        },
        emojiType,
        action,
        actionTime: actionTime != null && Number.isFinite(actionTime) ? actionTime : undefined,
    };
}
