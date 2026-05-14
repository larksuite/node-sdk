import type { MentionInfo } from '../../types';
import { composeMentionsTextPrefix } from './compose-mentions';
import { optimizeMarkdownStyle } from './optimize-style';

/**
 * Convert a Markdown string to Feishu post JSON.
 *
 * The post body is a single `tag: 'md'` element whose `text` is the original
 * markdown — Feishu's native renderer handles bold / italic / code / links /
 * headings / lists / blockquotes / `<at>` mentions and code fences. The
 * markdown is run through `optimizeMarkdownStyle` first to fix common visual
 * issues (oversized H1/H2, excess blank lines, etc.).
 *
 * Mentions are rendered as `<at user_id="ou_xxx">name</at>` tokens prepended
 * to the markdown, which the `md` element renders inline.
 */
export function markdownToPost(
    md: string,
    opts?: { mentions?: MentionInfo[]; title?: string }
): object {
    const prefix = composeMentionsTextPrefix(opts?.mentions ?? []);
    const text = optimizeMarkdownStyle(prefix + md, 1);
    return {
        zh_cn: {
            title: opts?.title ?? '',
            content: [[{ tag: 'md', text }]],
        },
    };
}

interface PostElement {
    tag: 'text' | 'a' | 'at' | 'img' | 'md';
    text?: string;
    href?: string;
    user_id?: string;
    user_name?: string;
    image_key?: string;
    style?: string[];
    un_escape?: boolean;
}

/**
 * Extract the plain text body from a post JSON. Used as a fallback when a
 * post send is rejected with a format error and we need to re-send as a
 * plain text message.
 */
export function postToPlainText(post: unknown): string {
    const body = (post as { zh_cn?: { content?: PostElement[][] } })?.zh_cn;
    if (!body?.content) return '';
    const lines: string[] = [];
    for (const paragraph of body.content) {
        if (!Array.isArray(paragraph)) continue;
        const parts: string[] = [];
        for (const el of paragraph) {
            switch (el.tag) {
                case 'md':
                case 'text':
                case 'a':
                    parts.push(el.text ?? '');
                    break;
                case 'at':
                    parts.push(el.user_name ? `@${el.user_name}` : '');
                    break;
                case 'img':
                    parts.push(el.image_key ? `[image]` : '');
                    break;
            }
        }
        lines.push(parts.join(''));
    }
    return lines.join('\n').trim();
}
