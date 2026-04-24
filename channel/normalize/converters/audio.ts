import type { ResourceDescriptor } from '../../types';
import type { ContentConverterFn } from '../context';
import { formatDuration, safeParse } from '../utils';

export const convertAudio: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw) as
        | { file_key?: string; duration?: number }
        | undefined;
    const fileKey = parsed?.file_key;
    if (!fileKey) return { content: '[audio]', resources: [] };

    const duration = parsed?.duration;
    const durAttr = formatDuration(duration);
    const attr = durAttr ? ` duration="${durAttr}"` : '';
    const content = `<audio key="${fileKey}"${attr}/>`;
    const resources: ResourceDescriptor[] = [
        { type: 'audio', fileKey, durationMs: duration },
    ];
    return { content, resources };
};
