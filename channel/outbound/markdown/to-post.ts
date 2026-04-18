import type { MentionInfo } from '../../types';
import { composePostMentionElements } from './compose-mentions';

/**
 * Convert a Markdown string to Feishu post JSON.
 *
 * Coverage (the subset Agent frameworks realistically produce):
 *   - Headings (rendered as bold text; Feishu post has no heading element)
 *   - Paragraphs with inline **bold**, *italic*, `code`, [text](url)
 *   - Fenced code blocks (```lang\n...\n```)
 *   - Hard rules (---)
 *   - Unordered / ordered list items (rendered as plain text with bullets)
 *   - Blockquotes (rendered as "> " prefix preserved)
 *
 * Returns a post body keyed by `zh_cn` (Feishu's default locale).
 */
export function markdownToPost(
    md: string,
    opts?: { mentions?: MentionInfo[]; title?: string }
): object {
    const lines = md.replace(/\r\n/g, '\n').split('\n');
    const paragraphs: PostElement[][] = [];

    let fenceLang: string | null = null;
    let fenceBuf: string[] = [];

    const flushFence = () => {
        if (fenceLang !== null) {
            paragraphs.push([
                {
                    tag: 'text',
                    text: fenceBuf.join('\n'),
                    un_escape: true,
                } as PostElement,
            ]);
            fenceBuf = [];
            fenceLang = null;
        }
    };

    for (const line of lines) {
        const fenceMatch = line.match(/^```(\w*)\s*$/);
        if (fenceMatch) {
            if (fenceLang !== null) {
                flushFence();
            } else {
                fenceLang = fenceMatch[1] || '';
            }
            continue;
        }
        if (fenceLang !== null) {
            fenceBuf.push(line);
            continue;
        }
        if (/^\s*$/.test(line)) {
            paragraphs.push([{ tag: 'text', text: '' } as PostElement]);
            continue;
        }
        if (/^(-{3,}|_{3,}|\*{3,})\s*$/.test(line)) {
            paragraphs.push([{ tag: 'text', text: '———' } as PostElement]);
            continue;
        }
        paragraphs.push(parseInline(line));
    }
    flushFence();

    // Prepend explicit mentions as `at` elements at the very top.
    if (opts?.mentions?.length) {
        const atElements = composePostMentionElements(opts.mentions).map(
            (el) => el as unknown as PostElement
        );
        if (atElements.length > 0) {
            // Insert as a new first paragraph with at elements + a space
            const first: PostElement[] = [];
            for (const el of atElements) {
                first.push(el);
                first.push({ tag: 'text', text: ' ' });
            }
            paragraphs.unshift(first);
        }
    }

    return {
        zh_cn: {
            title: opts?.title ?? '',
            content: paragraphs,
        },
    };
}

interface PostElement {
    tag: 'text' | 'a' | 'at' | 'img';
    text?: string;
    href?: string;
    user_id?: string;
    user_name?: string;
    image_key?: string;
    style?: string[];
    un_escape?: boolean;
}

/**
 * Parse a single line of inline markdown into a list of post elements.
 *
 * Handles (in order):
 *   ```inline code```, [text](url), **bold**, *italic*, __bold__, _italic_
 *
 * Headings (leading `#` sequence) render as bold text. List bullets and
 * blockquote markers pass through as plain text prefix.
 */
function parseInline(line: string): PostElement[] {
    // Normalize headings to bold
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
        const boldText = headingMatch[2];
        return [{ tag: 'text', text: boldText, style: ['bold'] }];
    }

    const out: PostElement[] = [];

    // Token regex: inline code, link, bold, italic
    const pattern =
        /(`[^`\n]+`)|(\[([^\]]+)\]\(([^)]+)\))|(\*\*[^*\n]+\*\*)|(__[^_\n]+__)|(\*[^*\n]+\*)|(_[^_\n]+_)/g;

    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = pattern.exec(line))) {
        if (m.index > last) {
            out.push({ tag: 'text', text: line.slice(last, m.index) });
        }
        if (m[1]) {
            // inline code
            out.push({ tag: 'text', text: m[1].slice(1, -1), style: ['code'] });
        } else if (m[2]) {
            // link
            out.push({ tag: 'a', text: m[3], href: m[4] });
        } else if (m[5]) {
            out.push({ tag: 'text', text: m[5].slice(2, -2), style: ['bold'] });
        } else if (m[6]) {
            out.push({ tag: 'text', text: m[6].slice(2, -2), style: ['bold'] });
        } else if (m[7]) {
            out.push({ tag: 'text', text: m[7].slice(1, -1), style: ['italic'] });
        } else if (m[8]) {
            out.push({ tag: 'text', text: m[8].slice(1, -1), style: ['italic'] });
        }
        last = pattern.lastIndex;
    }
    if (last < line.length) {
        out.push({ tag: 'text', text: line.slice(last) });
    }
    return out.length > 0 ? out : [{ tag: 'text', text: line }];
}

/**
 * Extract the plain text body from a post JSON (recover flatted text for
 * fallback-to-text paths).
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
