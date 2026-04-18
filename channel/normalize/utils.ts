export function safeParse(raw: string): unknown | undefined {
    if (!raw) return undefined;
    try {
        return JSON.parse(raw);
    } catch {
        return undefined;
    }
}

export function applyStyle(text: string, style?: string[]): string {
    if (!style || style.length === 0) return text;
    let out = text;
    if (style.includes('bold')) out = `**${out}**`;
    if (style.includes('italic')) out = `*${out}*`;
    if (style.includes('underline')) out = `<u>${out}</u>`;
    if (style.includes('lineThrough') || style.includes('strikethrough')) out = `~~${out}~~`;
    if (style.includes('codeInline') || style.includes('code')) out = `\`${out}\``;
    return out;
}

const LOCALE_PRIORITY = ['zh_cn', 'en_us', 'ja_jp'] as const;

export function unwrapLocale<T = Record<string, unknown>>(
    parsed: Record<string, unknown>
): T | undefined {
    if ('title' in parsed || 'content' in parsed) {
        return parsed as unknown as T;
    }
    for (const loc of LOCALE_PRIORITY) {
        const hit = parsed[loc];
        if (hit != null && typeof hit === 'object') return hit as T;
    }
    const firstKey = Object.keys(parsed)[0];
    if (firstKey) {
        const first = parsed[firstKey];
        if (first != null && typeof first === 'object') return first as T;
    }
    return undefined;
}

export function formatDuration(ms: number | undefined): string | undefined {
    if (ms == null || !Number.isFinite(ms) || ms < 0) return undefined;
    if (ms < 1000) return `${Math.round(ms)}ms`;
    if (ms % 1000 === 0) return `${ms / 1000}s`;
    return `${(ms / 1000).toFixed(1)}s`;
}

export function millisToDatetime(ms: string | number | undefined): string | undefined {
    if (ms == null) return undefined;
    const n = typeof ms === 'string' ? parseInt(ms, 10) : ms;
    if (!Number.isFinite(n) || n <= 0) return undefined;
    const d = new Date(n + 8 * 3600_000);
    const y = d.getUTCFullYear();
    const mo = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    const h = String(d.getUTCHours()).padStart(2, '0');
    const mi = String(d.getUTCMinutes()).padStart(2, '0');
    return `${y}-${mo}-${day} ${h}:${mi}`;
}

export function formatRFC3339Beijing(ms: number): string {
    const d = new Date(ms + 8 * 3600_000);
    const y = d.getUTCFullYear();
    const mo = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    const h = String(d.getUTCHours()).padStart(2, '0');
    const mi = String(d.getUTCMinutes()).padStart(2, '0');
    const s = String(d.getUTCSeconds()).padStart(2, '0');
    return `${y}-${mo}-${day}T${h}:${mi}:${s}+08:00`;
}

export function indentLines(text: string, indent: string): string {
    return text
        .split('\n')
        .map((line) => `${indent}${line}`)
        .join('\n');
}

export function escapeAttr(s: string): string {
    return s.replace(/"/g, '&quot;');
}
