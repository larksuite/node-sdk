import type { ContentConverterFn } from '../context';
import { escapeAttr, safeParse } from '../utils';

export const convertHongbao: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw) as { text?: string } | undefined;
    const textAttr = parsed?.text ? ` text="${escapeAttr(parsed.text)}"` : '';
    return { content: `<hongbao${textAttr}/>`, resources: [] };
};
