import type { ApiMessageItem, ConvertContext, ConvertResult } from '../context';
import { convertMergeForward } from '../converters/merge-forward';

const baseCtx: ConvertContext = {
    messageId: 'om_root',
    mentions: new Map(),
    mentionsByOpenId: new Map(),
    stripBotMentions: true,
};

const fakeDispatch = async (raw: string, type: string, _ctx: ConvertContext): Promise<ConvertResult> => {
    if (type === 'text') {
        const parsed = JSON.parse(raw);
        return { content: parsed.text ?? '', resources: [] };
    }
    return { content: `[${type}]`, resources: [] };
};

describe('convertMergeForward', () => {
    test('returns empty tag when fetchSubMessages is not provided', async () => {
        const r = await convertMergeForward('{}', baseCtx);
        expect(r.content).toBe('<forwarded_messages/>');
    });

    test('real Feishu shape: im.v1.message.get returns parent + children with upper_message_id', async () => {
        // Verbatim (with small shortening) of a real response we got from
        // `im.v1.message.get` on a merge_forward message id. The parent
        // itself sits at items[0] with no upper_message_id; every child
        // points back to the parent via upper_message_id.
        const items: ApiMessageItem[] = [
            {
                message_id: 'om_root',
                upper_message_id: undefined,
                msg_type: 'merge_forward',
                body: { content: 'Merged and Forwarded Message' },
                sender: { id: 'ou_forwarder' },
                create_time: '1776849870916',
            },
            {
                message_id: 'om_child_a',
                upper_message_id: 'om_root',
                msg_type: 'text',
                body: { content: JSON.stringify({ text: 'first child' }) },
                sender: { id: 'ou_alice' },
                create_time: '1776753549563',
            },
            {
                message_id: 'om_child_b',
                upper_message_id: 'om_root',
                msg_type: 'text',
                body: { content: JSON.stringify({ text: 'second child' }) },
                sender: { id: 'ou_bob' },
                create_time: '1776753669281',
            },
        ];
        const ctx: ConvertContext = {
            ...baseCtx,
            fetchSubMessages: async () => items,
            dispatch: fakeDispatch,
        };
        const r = await convertMergeForward('{}', ctx);
        // Parent must be filtered out, both children must appear in chrono order.
        expect(r.content).toMatch(/^<forwarded_messages>/);
        expect(r.content).not.toContain('Merged and Forwarded Message'); // parent string excluded
        expect(r.content).toContain('first child');
        expect(r.content).toContain('second child');
        expect(r.content.indexOf('first child')).toBeLessThan(r.content.indexOf('second child'));
    });

    test('wraps single-level messages with XML tag and indent', async () => {
        const items: ApiMessageItem[] = [
            {
                message_id: 'om_1',
                upper_message_id: undefined,
                sender: { id: 'ou_alice' },
                body: { content: JSON.stringify({ text: 'hello' }) },
                msg_type: 'text',
                create_time: String(Date.now()),
            },
            {
                message_id: 'om_2',
                upper_message_id: undefined,
                sender: { id: 'ou_bob' },
                body: { content: JSON.stringify({ text: 'world' }) },
                msg_type: 'text',
                create_time: String(Date.now() + 1000),
            },
        ];

        const ctx: ConvertContext = {
            ...baseCtx,
            fetchSubMessages: async () => items,
            dispatch: fakeDispatch,
        };
        const r = await convertMergeForward('{}', ctx);
        expect(r.content).toMatch(/^<forwarded_messages>/);
        expect(r.content).toMatch(/<\/forwarded_messages>$/);
        expect(r.content).toContain('hello');
        expect(r.content).toContain('world');
        expect(r.content).toContain('    hello'); // 4-space indent
    });

    test('recurses into nested merge_forward', async () => {
        const items: ApiMessageItem[] = [
            {
                message_id: 'om_outer',
                upper_message_id: undefined,
                sender: { id: 'ou_alice' },
                body: { content: '{}' },
                msg_type: 'merge_forward',
                create_time: '1000',
            },
            {
                message_id: 'om_inner',
                upper_message_id: 'om_outer',
                sender: { id: 'ou_bob' },
                body: { content: JSON.stringify({ text: 'inner' }) },
                msg_type: 'text',
                create_time: '2000',
            },
        ];

        const ctx: ConvertContext = {
            ...baseCtx,
            fetchSubMessages: async () => items,
            dispatch: fakeDispatch,
        };
        const r = await convertMergeForward('{}', ctx);
        expect(r.content).toContain('inner');
        // Should have nested <forwarded_messages>
        const count = (r.content.match(/<forwarded_messages>/g) ?? []).length;
        expect(count).toBeGreaterThanOrEqual(2);
    });

    test('handles fetchSubMessages failure gracefully', async () => {
        const ctx: ConvertContext = {
            ...baseCtx,
            fetchSubMessages: async () => { throw new Error('api error'); },
            dispatch: fakeDispatch,
        };
        const r = await convertMergeForward('{}', ctx);
        expect(r.content).toBe('<forwarded_messages/>');
    });

    test('displays resolved user name when resolver is available', async () => {
        const items: ApiMessageItem[] = [
            {
                message_id: 'om_1',
                sender: { id: 'ou_alice' },
                body: { content: JSON.stringify({ text: 'hi' }) },
                msg_type: 'text',
                create_time: '1000',
            },
        ];
        const ctx: ConvertContext = {
            ...baseCtx,
            fetchSubMessages: async () => items,
            dispatch: fakeDispatch,
            resolveUserName: (id) => (id === 'ou_alice' ? 'Alice' : undefined),
        };
        const r = await convertMergeForward('{}', ctx);
        expect(r.content).toContain('Alice:');
    });
});
