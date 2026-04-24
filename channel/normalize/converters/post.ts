import type { ResourceDescriptor } from '../../types';
import type {
    ContentConverterFn,
    ConvertContext,
    PostElement,
} from '../context';
import { applyStyle, safeParse, unwrapLocale } from '../utils';

interface PostBody {
    title?: string;
    content?: PostElement[][];
}

export const convertPost: ContentConverterFn = async (raw, ctx) => {
    const rawParsed = safeParse(raw);
    if (rawParsed == null || typeof rawParsed !== 'object') {
        return { content: '[rich text message]', resources: [] };
    }

    const body = unwrapLocale<PostBody>(rawParsed as Record<string, unknown>);
    if (!body) return { content: '[rich text message]', resources: [] };

    const resources: ResourceDescriptor[] = [];
    const lines: string[] = [];

    if (body.title) {
        lines.push(`**${body.title}**`);
        lines.push('');
    }

    for (const paragraph of body.content ?? []) {
        if (!Array.isArray(paragraph)) continue;
        let line = '';
        for (const el of paragraph) {
            line += renderElement(el, ctx, resources);
        }
        lines.push(line);
    }

    const content = lines.join('\n').trim() || '[rich text message]';
    return { content, resources };
};

function renderElement(
    el: PostElement,
    ctx: ConvertContext,
    resources: ResourceDescriptor[]
): string {
    switch (el.tag) {
        case 'text':
            return applyStyle(el.text ?? '', el.style);
        case 'a': {
            const label = el.text ?? el.href ?? '';
            return el.href ? `[${label}](${el.href})` : label;
        }
        case 'at': {
            const userId = el.user_id ?? '';
            if (userId === 'all' || userId === 'all_members') return '@all';
            // Prefer placeholder key so resolveMentions handles it uniformly
            const info = ctx.mentionsByOpenId.get(userId);
            if (info) return info.key;
            return el.user_name ? `@${el.user_name}` : `@${userId}`;
        }
        case 'img': {
            if (el.image_key) {
                resources.push({ type: 'image', fileKey: el.image_key });
                return `![image](${el.image_key})`;
            }
            return '';
        }
        case 'media': {
            if (el.file_key) {
                resources.push({ type: 'file', fileKey: el.file_key });
                return `<file key="${el.file_key}"/>`;
            }
            return '';
        }
        case 'code_block': {
            const lang = el.language ?? '';
            const code = el.text ?? '';
            return `\n\`\`\`${lang}\n${code}\n\`\`\`\n`;
        }
        case 'hr':
            return '\n---\n';
        default:
            return el.text ?? '';
    }
}
