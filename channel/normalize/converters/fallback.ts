import type { ContentConverterFn } from '../context';
import { safeParse } from '../utils';

export const convertUnknown: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw) as { text?: string } | undefined;
    if (parsed && typeof parsed.text === 'string') {
        return { content: parsed.text, resources: [] };
    }
    return { content: '[unsupported message]', resources: [] };
};
