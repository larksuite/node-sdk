import type { ResourceDescriptor } from '../../types';
import type { ContentConverterFn } from '../context';
import { safeParse } from '../utils';

export const convertSticker: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw) as { file_key?: string } | undefined;
    const fileKey = parsed?.file_key;
    if (!fileKey) return { content: '[sticker]', resources: [] };
    const resources: ResourceDescriptor[] = [{ type: 'sticker', fileKey }];
    return { content: `<sticker key="${fileKey}"/>`, resources };
};
