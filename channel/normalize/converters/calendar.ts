import type { ContentConverterFn } from '../context';
import { millisToDatetime, safeParse } from '../utils';

interface CalendarContent {
    summary?: string;
    start_time?: string | number;
    end_time?: string | number;
}

function formatCalendarInner(raw: string): string {
    const parsed = safeParse(raw) as CalendarContent | undefined;
    if (!parsed) return '[calendar event]';

    const lines: string[] = [];
    if (parsed.summary) lines.push(`📅 ${parsed.summary}`);

    const start = millisToDatetime(parsed.start_time);
    const end = millisToDatetime(parsed.end_time);
    if (start && end) lines.push(`🕙 ${start} ~ ${end}`);
    else if (start) lines.push(`🕙 ${start}`);

    return lines.length > 0 ? lines.join('\n') : '[calendar event]';
}

export const convertCalendar: ContentConverterFn = async (raw, _ctx) => ({
    content: `<calendar_invite>\n${formatCalendarInner(raw)}\n</calendar_invite>`,
    resources: [],
});

export const convertGeneralCalendar: ContentConverterFn = async (raw, _ctx) => ({
    content: `<calendar>\n${formatCalendarInner(raw)}\n</calendar>`,
    resources: [],
});

export const convertShareCalendarEvent: ContentConverterFn = async (raw, _ctx) => ({
    content: `<calendar_share>\n${formatCalendarInner(raw)}\n</calendar_share>`,
    resources: [],
});
