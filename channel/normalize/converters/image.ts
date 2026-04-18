import type { ResourceDescriptor } from '../../types';
import type { ContentConverterFn } from '../context';
import { safeParse } from '../utils';

export const convertImage: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw) as { image_key?: string } | undefined;
    const imageKey = parsed?.image_key;
    if (!imageKey) return { content: '[image]', resources: [] };
    const resources: ResourceDescriptor[] = [{ type: 'image', fileKey: imageKey }];
    return { content: `![image](${imageKey})`, resources };
};
