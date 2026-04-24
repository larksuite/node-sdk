import type { ContentConverterFn } from '../context';
import { safeParse } from '../utils';

export const convertText: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw) as { text?: string } | undefined;
    return { content: parsed?.text ?? '', resources: [] };
};
