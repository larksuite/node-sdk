import type { MentionInfo } from '../../types';

/**
 * Build a text prefix that renders as real Feishu mentions when prepended
 * to a text-type outbound message (the <at …> tag form).
 *
 * For post-type messages, the mentions should be injected as `at` elements
 * at the beginning of the post body — use `composePostMentionElements`
 * instead.
 */
export function composeMentionsTextPrefix(mentions: MentionInfo[]): string {
    if (!mentions?.length) return '';
    const parts: string[] = [];
    for (const m of mentions) {
        if (!m.openId) continue;
        const name = m.name ?? '';
        parts.push(`<at user_id="${m.openId}">${name}</at>`);
    }
    return parts.length > 0 ? parts.join(' ') + ' ' : '';
}

export interface PostAtElement {
    tag: 'at';
    user_id: string;
    user_name?: string;
}

/**
 * Produce `at` elements to prepend to the first paragraph of a post body.
 */
export function composePostMentionElements(mentions: MentionInfo[]): PostAtElement[] {
    if (!mentions?.length) return [];
    const out: PostAtElement[] = [];
    for (const m of mentions) {
        if (!m.openId) continue;
        out.push({ tag: 'at', user_id: m.openId, user_name: m.name });
    }
    return out;
}
