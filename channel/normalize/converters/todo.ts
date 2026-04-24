import type { ContentConverterFn, PostElement } from '../context';
import { millisToDatetime, safeParse } from '../utils';

interface TodoContent {
    summary?: {
        title?: string;
        content?: PostElement[][];
    };
    due_time?: string | number;
}

export const convertTodo: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw) as TodoContent | undefined;
    if (!parsed?.summary) return { content: '<todo>\n[todo]\n</todo>', resources: [] };

    const lines: string[] = [];
    if (parsed.summary.title) lines.push(parsed.summary.title);

    const bodyText = extractPostPlainText(parsed.summary.content);
    if (bodyText) lines.push(bodyText);

    const due = millisToDatetime(parsed.due_time);
    if (due) lines.push(`Due: ${due}`);

    if (lines.length === 0) return { content: '<todo>\n[todo]\n</todo>', resources: [] };
    return { content: `<todo>\n${lines.join('\n')}\n</todo>`, resources: [] };
};

function extractPostPlainText(blocks: PostElement[][] | undefined): string {
    if (!blocks) return '';
    const lines: string[] = [];
    for (const paragraph of blocks) {
        if (!Array.isArray(paragraph)) continue;
        const parts: string[] = [];
        for (const el of paragraph) {
            if (el.tag === 'text' && el.text) parts.push(el.text);
            else if (el.tag === 'a' && el.text) parts.push(el.text);
        }
        if (parts.length > 0) lines.push(parts.join(''));
    }
    return lines.join('\n');
}
