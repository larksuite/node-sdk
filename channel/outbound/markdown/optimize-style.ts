/**
 * Pre-processing for Markdown text rendered through Feishu's native `tag: 'md'`
 * post element. Without this, AI-produced markdown looks visually crammed —
 * H1 headings render at huge size, code blocks butt against surrounding text,
 * tables have no breathing room.
 *
 * Ported from openclaw-lark / src/card/markdown-style.ts. The two cardVersion
 * branches preserve the original behavior:
 *   - cardVersion=1 (Feishu post): heading demotion + blank-line compression
 *   - cardVersion=2 (CardKit v2):  same plus <br> insertion around tables /
 *     code blocks / consecutive headings
 *
 * channel currently only sends posts (msg_type='post'), so callers should
 * pass cardVersion=1. The v2 path is kept for parity in case the channel
 * grows native CardKit support later.
 */
export function optimizeMarkdownStyle(text: string, cardVersion = 1): string {
    try {
        return _optimize(text, cardVersion);
    } catch {
        return text;
    }
}

function _optimize(text: string, cardVersion: number): string {
    // 1. Protect fenced code blocks behind placeholders so subsequent regexes
    //    don't mangle their `#`, `-`, `|` characters.
    const MARK = '___CB_';
    const codeBlocks: string[] = [];
    let r = text.replace(/(^|\n)(`{3,})([^\n]*)\n[\s\S]*?\n\2(?=\n|$)/g, (m, prefix = '') => {
        const block = m.slice(String(prefix).length);
        return `${prefix}${MARK}${codeBlocks.push(block) - 1}___`;
    });

    // 2. Heading demotion. H1/H2 render too large in Feishu post — push
    //    everything down to H4/H5 so the visual hierarchy holds together.
    //    Order matters: H2~H6 first, then H1, otherwise H1→H4 would be
    //    re-matched by the H2~H6 rule.
    const hasH1toH3 = /^#{1,3} /m.test(text);
    if (hasH1toH3) {
        r = r.replace(/^#{2,6} (.+)$/gm, '##### $1');
        r = r.replace(/^# (.+)$/gm, '#### $1');
    }

    if (cardVersion >= 2) {
        // 3. <br> between consecutive headings — prevents two headings
        //    rendering as one chunk.
        r = r.replace(/^(#{4,5} .+)\n{1,2}(#{4,5} )/gm, '$1\n<br>\n$2');

        // 4a-c. Add breathing room around tables.
        r = r.replace(/^([^|\n].*)\n(\|.+\|)/gm, '$1\n\n$2');
        r = r.replace(/\n\n((?:\|.+\|[^\S\n]*\n?)+)/g, '\n\n<br>\n\n$1');
        r = r.replace(/((?:^\|.+\|[^\S\n]*\n?)+)/gm, (m, _table, offset) => {
            const after = r.slice(offset + m.length).replace(/^\n+/, '');
            if (!after || /^(---|#{4,5} |\*\*)/.test(after)) return m;
            return m + '\n<br>\n';
        });
        // 4d-e. Tighten the blank line that's adjacent to the inserted <br>
        //       so the final output isn't visually too sparse.
        r = r.replace(/^((?!#{4,5} )(?!\*\*).+)\n\n(<br>)\n\n(\|)/gm, '$1\n$2\n$3');
        r = r.replace(/^(\*\*.+)\n\n(<br>)\n\n(\|)/gm, '$1\n$2\n\n$3');
        r = r.replace(/(\|[^\n]*\n)\n(<br>\n)((?!#{4,5} )(?!\*\*))/gm, '$1$2$3');

        // 5. Restore code blocks with <br> bookends so they aren't visually
        //    glued to surrounding text.
        codeBlocks.forEach((block, i) => {
            r = r.replace(`${MARK}${i}___`, `\n<br>\n${block}\n<br>\n`);
        });
    } else {
        // 5. Restore code blocks without <br> for v1 / post.
        codeBlocks.forEach((block, i) => {
            r = r.replace(`${MARK}${i}___`, block);
        });
    }

    // 6. Compress 3+ consecutive newlines to 2 — keeps the output tidy.
    r = r.replace(/\n{3,}/g, '\n\n');

    return r;
}
