import type { ContentConverterFn } from '../context';
import { safeParse } from '../utils';

export const convertShareChat: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw) as { chat_id?: string } | undefined;
    return {
        content: `<group_card id="${parsed?.chat_id ?? ''}"/>`,
        resources: [],
    };
};

export const convertShareUser: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw) as { user_id?: string } | undefined;
    return {
        content: `<contact_card id="${parsed?.user_id ?? ''}"/>`,
        resources: [],
    };
};
