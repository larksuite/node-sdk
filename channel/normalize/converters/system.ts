import type { ContentConverterFn } from '../context';
import { safeParse } from '../utils';

interface SystemContent {
    template?: string;
    from_user?: string[];
    to_chatters?: string[];
    divider_text?: string;
    [key: string]: unknown;
}

export const convertSystem: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw) as SystemContent | undefined;
    if (!parsed || !parsed.template) {
        return { content: '[system message]', resources: [] };
    }

    const out = parsed.template.replace(/\{([a-z_]+)\}/g, (match, name) => {
        const val = (parsed as Record<string, unknown>)[name];
        if (Array.isArray(val)) return val.join(', ');
        if (typeof val === 'string') return val;
        if (val == null) return '';
        return match;
    });

    return { content: out.trim() || '[system message]', resources: [] };
};
