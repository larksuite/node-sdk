import type { MentionInfo, ResourceDescriptor } from '../types';

export interface RawMessageEvent {
    sender: {
        sender_id: { open_id?: string; user_id?: string; union_id?: string };
        sender_type?: string;
        tenant_key?: string;
    };
    message: {
        message_id: string;
        root_id?: string;
        parent_id?: string;
        create_time?: string;
        update_time?: string;
        chat_id: string;
        thread_id?: string;
        chat_type: 'p2p' | 'group';
        message_type: string;
        content: string;
        mentions?: RawMention[];
    };
}

export interface RawMention {
    key: string;
    id: { open_id?: string; user_id?: string; union_id?: string };
    name?: string;
    tenant_key?: string;
}

export interface PostElement {
    tag: string;
    text?: string;
    href?: string;
    image_key?: string;
    file_key?: string;
    user_id?: string;
    user_name?: string;
    style?: string[];
    language?: string;
    un_escape?: boolean;
}

export interface ApiMessageItem {
    message_id?: string;
    upper_message_id?: string;
    msg_type?: string;
    body?: { content?: string };
    mentions?: RawMention[];
    sender?: { id?: string; id_type?: string; sender_type?: string };
    create_time?: string | number;
}

export interface ConvertContext {
    messageId: string;
    botOpenId?: string;
    mentions: Map<string, MentionInfo>;
    mentionsByOpenId: Map<string, MentionInfo>;
    stripBotMentions: boolean;

    fetchSubMessages?: (messageId: string) => Promise<ApiMessageItem[]>;
    resolveUserName?: (openId: string) => string | undefined;
    batchResolveNames?: (openIds: string[]) => Promise<void>;

    dispatch?: (raw: string, msgType: string, ctx: ConvertContext) => Promise<ConvertResult>;
}

export interface ConvertResult {
    content: string;
    resources: ResourceDescriptor[];
}

export type ContentConverterFn = (
    rawContent: string,
    ctx: ConvertContext
) => Promise<ConvertResult>;
