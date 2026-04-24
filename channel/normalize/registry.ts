import type { ContentConverterFn, ConvertContext, ConvertResult } from './context';
import { convertAudio } from './converters/audio';
import { convertCalendar, convertGeneralCalendar, convertShareCalendarEvent } from './converters/calendar';
import { convertFile } from './converters/file';
import { convertFolder } from './converters/folder';
import { convertHongbao } from './converters/hongbao';
import { convertImage } from './converters/image';
import { convertInteractive } from './converters/interactive';
import { convertLocation } from './converters/location';
import { convertMergeForward } from './converters/merge-forward';
import { convertPost } from './converters/post';
import { convertShareChat, convertShareUser } from './converters/share';
import { convertSticker } from './converters/sticker';
import { convertSystem } from './converters/system';
import { convertText } from './converters/text';
import { convertTodo } from './converters/todo';
import { convertUnknown } from './converters/fallback';
import { convertVideo } from './converters/video';
import { convertVideoChat } from './converters/video-chat';
import { convertVote } from './converters/vote';

export const converters: ReadonlyMap<string, ContentConverterFn> = new Map<
    string,
    ContentConverterFn
>([
    ['text', convertText],
    ['post', convertPost],
    ['image', convertImage],
    ['file', convertFile],
    ['audio', convertAudio],
    ['video', convertVideo],
    ['media', convertVideo],
    ['sticker', convertSticker],
    ['interactive', convertInteractive],
    ['merge_forward', convertMergeForward],
    ['share_chat', convertShareChat],
    ['share_user', convertShareUser],
    ['location', convertLocation],
    ['system', convertSystem],
    ['vote', convertVote],
    ['todo', convertTodo],
    ['calendar', convertCalendar],
    ['general_calendar', convertGeneralCalendar],
    ['share_calendar_event', convertShareCalendarEvent],
    ['folder', convertFolder],
    ['hongbao', convertHongbao],
    ['video_chat', convertVideoChat],
]);

/**
 * Dispatch a message content to the matching converter, with uniform error
 * containment — any thrown error is trapped and the fallback converter is
 * invoked instead so that normalization never fails catastrophically.
 */
export async function dispatchConvert(
    raw: string,
    msgType: string,
    ctx: ConvertContext
): Promise<ConvertResult> {
    const fn = converters.get(msgType) ?? convertUnknown;
    try {
        return await fn(raw, ctx);
    } catch {
        return convertUnknown(raw, ctx);
    }
}
