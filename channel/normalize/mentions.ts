import type { MentionInfo } from '../types';
import type { ConvertContext, RawMention } from './context';

export function isMentionAll(m: RawMention): boolean {
    return m.key === '@_all';
}

export interface MentionExtraction {
    mentions: Map<string, MentionInfo>;           // by placeholder key
    mentionsByOpenId: Map<string, MentionInfo>;   // by open_id
    mentionList: MentionInfo[];                   // non-@all, non-bot list for public export
    mentionAll: boolean;
    mentionedBot: boolean;
}

export function extractMentions(
    raw: RawMention[] | undefined,
    botOpenId: string | undefined
): MentionExtraction {
    const mentions = new Map<string, MentionInfo>();
    const mentionsByOpenId = new Map<string, MentionInfo>();
    const mentionList: MentionInfo[] = [];
    let mentionAll = false;
    let mentionedBot = false;

    for (const m of raw ?? []) {
        if (isMentionAll(m)) {
            mentionAll = true;
            mentions.set(m.key, { key: m.key, name: m.name, isBot: false });
            continue;
        }
        const openId = m.id?.open_id ?? '';
        const userId = m.id?.user_id;
        const isBot = Boolean(botOpenId && openId === botOpenId);
        if (isBot) mentionedBot = true;

        const info: MentionInfo = {
            key: m.key,
            openId: openId || undefined,
            userId,
            name: m.name,
            isBot,
        };
        mentions.set(m.key, info);
        if (openId) mentionsByOpenId.set(openId, info);
        mentionList.push(info);
    }

    return { mentions, mentionsByOpenId, mentionList, mentionAll, mentionedBot };
}

/**
 * Second-pass: replace placeholder keys in `content` with human-readable names
 * (or strip bot mentions if configured).
 *
 * Must run AFTER all converters have done their work, because converters use
 * placeholder keys to defer resolution to this single point.
 */
export function resolveMentions(
    content: string,
    ctx: Pick<ConvertContext, 'mentions' | 'stripBotMentions'>
): string {
    if (!content || ctx.mentions.size === 0) return content;

    let out = content;
    for (const [key, info] of ctx.mentions) {
        if (info.isBot && ctx.stripBotMentions) {
            // Remove key plus one surrounding whitespace on either side.
            const re = new RegExp(`\\s?${escapeRegex(key)}\\s?`, 'g');
            out = out.replace(re, ' ');
            continue;
        }
        const replacement = info.name ? `@${info.name}` : key;
        out = out.split(key).join(replacement);
    }
    // Collapse any double-spaces introduced by bot-mention stripping.
    return out.replace(/[ \t]{2,}/g, ' ').trim();
}

function escapeRegex(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
