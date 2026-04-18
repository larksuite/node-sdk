import type { ContentConverterFn } from '../context';
import { safeParse } from '../utils';

export const convertVote: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw) as
        | { topic?: string; options?: string[] }
        | undefined;

    if (!parsed || (!parsed.topic && !parsed.options?.length)) {
        return { content: '<vote>\n[vote]\n</vote>', resources: [] };
    }

    const lines: string[] = [];
    if (parsed.topic) lines.push(parsed.topic);
    for (const opt of parsed.options ?? []) lines.push(`• ${opt}`);

    return { content: `<vote>\n${lines.join('\n')}\n</vote>`, resources: [] };
};
