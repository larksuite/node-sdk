import type { ContentConverterFn } from '../../context';
import { safeParse } from '../../utils';
import { walkCard } from './card-walker';

export const convertInteractive: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw);
    if (parsed == null || typeof parsed !== 'object') {
        return { content: '[interactive card]', resources: [] };
    }

    const pieces = walkCard(parsed);
    if (pieces.length === 0) {
        return { content: '[interactive card]', resources: [] };
    }

    // Dedup adjacent duplicates while preserving order
    const seen = new Set<string>();
    const out: string[] = [];
    for (const p of pieces) {
        const key = p.trim();
        if (!key || seen.has(key)) continue;
        seen.add(key);
        out.push(key);
    }

    return { content: out.join('\n'), resources: [] };
};
