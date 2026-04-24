import type {
    ApiMessageItem,
    ContentConverterFn,
    ConvertContext,
} from '../context';
import { formatRFC3339Beijing, indentLines } from '../utils';

const MAX_ITEMS = 50;

export const convertMergeForward: ContentConverterFn = async (_raw, ctx) => {
    const { messageId, fetchSubMessages, dispatch } = ctx;

    if (!fetchSubMessages || !dispatch) {
        return { content: '<forwarded_messages/>', resources: [] };
    }

    let items: ApiMessageItem[];
    try {
        items = await fetchSubMessages(messageId);
    } catch {
        return { content: '<forwarded_messages/>', resources: [] };
    }

    if (!items || items.length === 0) {
        return { content: '<forwarded_messages/>', resources: [] };
    }

    const capped = items.slice(0, MAX_ITEMS);
    const truncated = items.length > MAX_ITEMS;

    // Pre-warm sender name cache in one batch call.
    if (ctx.batchResolveNames) {
        const senderIds = new Set<string>();
        for (const it of capped) {
            const sid = it.sender?.id;
            if (sid && it.message_id !== messageId) senderIds.add(sid);
        }
        if (senderIds.size > 0) {
            try {
                await ctx.batchResolveNames([...senderIds]);
            } catch {
                // best effort
            }
        }
    }

    const childrenMap = buildChildrenMap(capped, messageId);
    const content = await formatSubTree(messageId, childrenMap, ctx, truncated);
    return { content, resources: [] };
};

function buildChildrenMap(
    items: ApiMessageItem[],
    rootId: string
): Map<string, ApiMessageItem[]> {
    const map = new Map<string, ApiMessageItem[]>();
    for (const it of items) {
        if (it.message_id === rootId && !it.upper_message_id) continue;
        const pid = it.upper_message_id ?? rootId;
        let arr = map.get(pid);
        if (!arr) {
            arr = [];
            map.set(pid, arr);
        }
        arr.push(it);
    }
    for (const arr of map.values()) {
        arr.sort((a, b) => {
            const ta = parseInt(String(a.create_time ?? '0'), 10);
            const tb = parseInt(String(b.create_time ?? '0'), 10);
            return ta - tb;
        });
    }
    return map;
}

async function formatSubTree(
    parentId: string,
    map: Map<string, ApiMessageItem[]>,
    ctx: ConvertContext,
    truncated = false
): Promise<string> {
    const children = map.get(parentId);
    if (!children || children.length === 0) return '<forwarded_messages/>';

    const parts: string[] = [];
    for (const item of children) {
        try {
            const sub = await renderItem(item, map, ctx);
            if (sub) parts.push(sub);
        } catch {
            // skip bad item
        }
    }

    if (parts.length === 0) return '<forwarded_messages/>';
    const body = parts.join('\n');
    const footer = truncated ? '\n... (truncated)' : '';
    return `<forwarded_messages>\n${body}${footer}\n</forwarded_messages>`;
}

async function renderItem(
    item: ApiMessageItem,
    map: Map<string, ApiMessageItem[]>,
    ctx: ConvertContext
): Promise<string> {
    const msgType = item.msg_type ?? 'text';
    const senderId = item.sender?.id ?? 'unknown';
    const createMs = parseInt(String(item.create_time ?? '0'), 10);
    const timestamp = createMs > 0 ? formatRFC3339Beijing(createMs) : 'unknown';
    const displayName = ctx.resolveUserName?.(senderId) ?? senderId;

    let content: string;
    if (msgType === 'merge_forward') {
        // Nested forward — recurse locally without another API call.
        const nestedId = item.message_id;
        content = nestedId ? await formatSubTree(nestedId, map, ctx) : '<forwarded_messages/>';
    } else {
        const rawContent = item.body?.content ?? '{}';
        if (!ctx.dispatch) {
            content = rawContent;
        } else {
            const r = await ctx.dispatch(rawContent, msgType, ctx);
            content = r.content;
        }
    }

    const indented = indentLines(content, '    ');
    return `[${timestamp}] ${displayName}:\n${indented}`;
}
