import type { ContentConverterFn } from '../context';
import { escapeAttr, safeParse } from '../utils';

export const convertFolder: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw) as
        | { file_key?: string; file_name?: string }
        | undefined;
    const fileKey = parsed?.file_key;
    if (!fileKey) return { content: '[folder]', resources: [] };

    const nameAttr = parsed?.file_name ? ` name="${escapeAttr(parsed.file_name)}"` : '';
    return { content: `<folder key="${fileKey}"${nameAttr}/>`, resources: [] };
};
