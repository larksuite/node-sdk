/**
 * Split a long markdown string into chunks under `limit` characters.
 *
 * Preserves code block integrity — if a chunk boundary would fall inside a
 * fenced code block, the current chunk closes the fence and the next chunk
 * reopens it with the same language tag.
 *
 * Prefers breaking before headings when possible.
 */
export function splitWithCodeFences(text: string, limit: number): string[] {
    if (text.length <= limit) return [text];

    const lines = text.split('\n');
    const out: string[] = [];
    let buf: string[] = [];
    let bufLen = 0;
    let fenceLang: string | null = null;

    const flush = () => {
        if (buf.length === 0) return;
        let chunk = buf.join('\n');
        if (fenceLang !== null) chunk += '\n```';
        out.push(chunk);
        buf = [];
        bufLen = 0;
        if (fenceLang !== null) {
            // reopen fence in the next chunk
            buf.push('```' + fenceLang);
            bufLen = buf[0].length;
        }
    };

    for (const line of lines) {
        const m = line.match(/^```(\w*)$/);
        const lineLen = line.length + (buf.length > 0 ? 1 : 0); // +1 for \n

        // If this line is a heading and we already have content that's near
        // the limit, prefer breaking here.
        const isHeading = /^#{1,6}\s/.test(line);
        const nearFull = bufLen > limit * 0.75;

        if (bufLen + lineLen > limit || (isHeading && nearFull && buf.length > 0)) {
            flush();
        }

        buf.push(line);
        bufLen += lineLen;

        if (m) {
            // entering or leaving a fence
            fenceLang = fenceLang === null ? m[1] || '' : null;
        }
    }
    flush();
    return out;
}
