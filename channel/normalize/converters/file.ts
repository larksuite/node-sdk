import type { ResourceDescriptor } from '../../types';
import type { ContentConverterFn } from '../context';
import { escapeAttr, safeParse } from '../utils';

export const convertFile: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw) as
        | { file_key?: string; file_name?: string }
        | undefined;
    const fileKey = parsed?.file_key;
    if (!fileKey) return { content: '[file]', resources: [] };

    const fileName = parsed?.file_name;
    const nameAttr = fileName ? ` name="${escapeAttr(fileName)}"` : '';
    const content = `<file key="${fileKey}"${nameAttr}/>`;
    const resources: ResourceDescriptor[] = [{ type: 'file', fileKey, fileName }];
    return { content, resources };
};
