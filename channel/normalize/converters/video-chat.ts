import type { ContentConverterFn } from '../context';
import { millisToDatetime, safeParse } from '../utils';

interface VideoChatContent {
    topic?: string;
    start_time?: string | number;
}

export const convertVideoChat: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw) as VideoChatContent | undefined;
    if (!parsed) {
        return { content: '<meeting>\n[video chat]\n</meeting>', resources: [] };
    }

    const lines: string[] = [];
    if (parsed.topic) lines.push(`📹 ${parsed.topic}`);
    const start = millisToDatetime(parsed.start_time);
    if (start) lines.push(`🕙 ${start}`);

    const inner = lines.length > 0 ? lines.join('\n') : '[video chat]';
    return { content: `<meeting>\n${inner}\n</meeting>`, resources: [] };
};
