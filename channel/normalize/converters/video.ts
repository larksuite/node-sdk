import type { ResourceDescriptor } from '../../types';
import type { ContentConverterFn } from '../context';
import { escapeAttr, formatDuration, safeParse } from '../utils';

export const convertVideo: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw) as
        | {
              file_key?: string;
              file_name?: string;
              duration?: number;
              image_key?: string; // cover
          }
        | undefined;
    const fileKey = parsed?.file_key;
    if (!fileKey) return { content: '[video]', resources: [] };

    const nameAttr = parsed?.file_name ? ` name="${escapeAttr(parsed.file_name)}"` : '';
    const durStr = formatDuration(parsed?.duration);
    const durAttr = durStr ? ` duration="${durStr}"` : '';
    const content = `<video key="${fileKey}"${nameAttr}${durAttr}/>`;
    const resources: ResourceDescriptor[] = [
        {
            type: 'video',
            fileKey,
            fileName: parsed?.file_name,
            durationMs: parsed?.duration,
            coverImageKey: parsed?.image_key,
        },
    ];
    return { content, resources };
};
