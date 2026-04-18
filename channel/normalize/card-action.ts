import type { CardActionEvent } from '../types';

export interface RawCardActionEvent {
    /**
     * Current shape (observed from `card.action.trigger` v2): message/chat ids
     * are nested under `context`. Top-level variants kept as fallback in case
     * older or alternate surfaces (webhook vs WS, older schema) still deliver
     * them at the root.
     */
    context?: {
        open_message_id?: string;
        open_chat_id?: string;
    };
    open_message_id?: string;
    open_chat_id?: string;
    token?: string;
    operator?: {
        open_id?: string;
        user_id?: string;
        union_id?: string;
        name?: string;
    };
    action?: {
        value?: unknown;
        tag?: string;
        name?: string;
        option?: string;
        timezone?: string;
    };
}

export function normalizeCardAction(event: RawCardActionEvent): CardActionEvent | null {
    const messageId = event.context?.open_message_id ?? event.open_message_id;
    const chatId = event.context?.open_chat_id ?? event.open_chat_id;
    const operatorOpenId = event.operator?.open_id;

    if (!messageId || !chatId || !operatorOpenId) return null;

    return {
        messageId,
        chatId,
        operator: {
            openId: operatorOpenId,
            userId: event.operator?.user_id,
            name: event.operator?.name,
        },
        action: {
            value: event.action?.value,
            tag: event.action?.tag ?? 'unknown',
            name: event.action?.name,
            option: event.action?.option,
        },
    };
}
