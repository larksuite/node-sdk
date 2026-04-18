import type { BotAddedEvent } from '../types';

export interface RawBotAddedEvent {
    chat_id?: string;
    operator_id?: {
        open_id?: string;
        user_id?: string | null;
        union_id?: string;
    };
    external?: boolean;
    /** The bot's name (NOT the chat's name). */
    name?: string;
    /** The bot's localized names. */
    i18n_names?: {
        zh_cn?: string;
        en_us?: string;
        ja_jp?: string;
    };
}

export function normalizeBotAdded(
    event: RawBotAddedEvent,
    opts?: { includeRaw?: boolean }
): BotAddedEvent | null {
    const chatId = event.chat_id;
    const operatorOpenId = event.operator_id?.open_id;

    if (!chatId || !operatorOpenId) return null;

    const botName =
        event.name ??
        event.i18n_names?.zh_cn ??
        event.i18n_names?.en_us ??
        event.i18n_names?.ja_jp;

    return {
        chatId,
        operator: {
            openId: operatorOpenId,
            userId: event.operator_id?.user_id ?? undefined,
        },
        botName,
        external: event.external,
        raw: opts?.includeRaw ? event : undefined,
    };
}
