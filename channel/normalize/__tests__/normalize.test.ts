import type { RawMessageEvent } from '../context';
import { normalize } from '../index';

const botIdentity = { openId: 'ou_bot', name: 'TestBot' };

function buildEvent(overrides: Partial<RawMessageEvent['message']> = {}): RawMessageEvent {
    return {
        sender: {
            sender_id: { open_id: 'ou_alice', user_id: 'u_alice' },
        },
        message: {
            message_id: 'om_x',
            chat_id: 'oc_test',
            chat_type: 'group',
            message_type: 'text',
            content: '{"text":"hello"}',
            create_time: String(Date.now()),
            ...overrides,
        },
    };
}

describe('normalize() end-to-end', () => {
    test('basic text message', async () => {
        const msg = await normalize(buildEvent(), { botIdentity });
        expect(msg.messageId).toBe('om_x');
        expect(msg.chatId).toBe('oc_test');
        expect(msg.chatType).toBe('group');
        expect(msg.senderId).toBe('ou_alice');
        expect(msg.content).toBe('hello');
        expect(msg.rawContentType).toBe('text');
        expect(msg.mentionedBot).toBe(false);
        expect(msg.mentionAll).toBe(false);
    });

    test('fallback senderId when open_id missing', async () => {
        const event = buildEvent();
        event.sender.sender_id = { user_id: 'u_alice' };
        const msg = await normalize(event, { botIdentity });
        expect(msg.senderId).toBe('u_alice');
    });

    test('text with mentions resolves to @name', async () => {
        const event = buildEvent({
            content: '{"text":"@_user_1 please"}',
            mentions: [
                {
                    key: '@_user_1',
                    id: { open_id: 'ou_bob' },
                    name: 'Bob',
                },
            ],
        });
        const msg = await normalize(event, { botIdentity });
        expect(msg.content).toBe('@Bob please');
        expect(msg.mentions).toHaveLength(1);
        expect(msg.mentions[0].openId).toBe('ou_bob');
    });

    test('bot mention is detected and stripped by default', async () => {
        const event = buildEvent({
            content: '{"text":"@_bot help me"}',
            mentions: [
                {
                    key: '@_bot',
                    id: { open_id: 'ou_bot' },
                    name: 'TestBot',
                },
            ],
        });
        const msg = await normalize(event, { botIdentity });
        expect(msg.mentionedBot).toBe(true);
        expect(msg.content).toBe('help me');
    });

    test('@all detection from mentions array', async () => {
        const event = buildEvent({
            content: '{"text":"@_all listen up"}',
            mentions: [{ key: '@_all', id: {}, name: '所有人' }],
        });
        const msg = await normalize(event, { botIdentity });
        expect(msg.mentionAll).toBe(true);
    });

    test('@all detection falls back to content scan when mentions array is omitted', async () => {
        // Real Feishu group messages frequently omit `mentions` for @所有人.
        const event = buildEvent({
            content: '{"text":"@_all  hello everyone"}',
            // no `mentions` field
        });
        const msg = await normalize(event, { botIdentity });
        expect(msg.mentionAll).toBe(true);
    });

    test('content scan does not false-positive on `@_allied` or similar tokens', async () => {
        const event = buildEvent({
            content: '{"text":"@_allies are with us"}',
        });
        const msg = await normalize(event, { botIdentity });
        expect(msg.mentionAll).toBe(false);
    });

    test('content scan finds @_all inside nested post content', async () => {
        const event = buildEvent({
            message_type: 'post',
            content: JSON.stringify({
                zh_cn: {
                    title: '',
                    content: [[{ tag: 'text', text: '@_all meeting now' }]],
                },
            }),
        });
        const msg = await normalize(event, { botIdentity });
        expect(msg.mentionAll).toBe(true);
    });

    test('image message produces resource descriptor', async () => {
        const event = buildEvent({
            message_type: 'image',
            content: '{"image_key":"img_v3_xyz"}',
        });
        const msg = await normalize(event, { botIdentity });
        expect(msg.content).toBe('![image](img_v3_xyz)');
        expect(msg.resources).toEqual([{ type: 'image', fileKey: 'img_v3_xyz' }]);
    });

    test('post message with inline image and mention', async () => {
        const event = buildEvent({
            message_type: 'post',
            content: JSON.stringify({
                zh_cn: {
                    title: 'Greeting',
                    content: [
                        [
                            { tag: 'text', text: 'hi ' },
                            { tag: 'at', user_id: 'ou_bob', user_name: 'Bob' },
                        ],
                        [{ tag: 'img', image_key: 'img_1' }],
                    ],
                },
            }),
            mentions: [
                {
                    key: '@_user_1',
                    id: { open_id: 'ou_bob' },
                    name: 'Bob',
                },
            ],
        });
        const msg = await normalize(event, { botIdentity });
        expect(msg.content).toContain('**Greeting**');
        expect(msg.content).toContain('@Bob');
        expect(msg.content).toContain('![image](img_1)');
        expect(msg.resources).toContainEqual({ type: 'image', fileKey: 'img_1' });
    });

    test('unknown message type falls back gracefully', async () => {
        const event = buildEvent({
            message_type: 'something_new',
            content: '{"text":"sort of"}',
        });
        const msg = await normalize(event, { botIdentity });
        expect(msg.content).toBe('sort of');
        expect(msg.rawContentType).toBe('something_new');
    });

    test('unparseable content falls back', async () => {
        const event = buildEvent({
            message_type: 'post',
            content: 'not valid json',
        });
        const msg = await normalize(event, { botIdentity });
        expect(msg.content).toBe('[rich text message]');
    });

    test('includeRaw attaches original event', async () => {
        const ev = buildEvent();
        const msg = await normalize(ev, { botIdentity, includeRaw: true });
        expect(msg.raw).toBe(ev);
    });

    test('interactive message extracts text from event summary', async () => {
        const event = buildEvent({
            message_type: 'interactive',
            content: JSON.stringify({
                elements: [{ tag: 'markdown', content: 'visible body' }],
            }),
        });
        const msg = await normalize(event, { botIdentity });
        expect(msg.content).toContain('visible body');
    });

    test('rootId / threadId / replyToMessageId preserved', async () => {
        const event = buildEvent({
            root_id: 'om_root',
            parent_id: 'om_parent',
            thread_id: 'omt_1',
        });
        const msg = await normalize(event, { botIdentity });
        expect(msg.rootId).toBe('om_root');
        expect(msg.replyToMessageId).toBe('om_parent');
        expect(msg.threadId).toBe('omt_1');
    });

    test('senderName filled from resolveSenderName callback', async () => {
        const msg = await normalize(buildEvent(), {
            botIdentity,
            resolveSenderName: (id) => (id === 'ou_alice' ? 'Alice' : undefined),
        });
        expect(msg.senderName).toBe('Alice');
    });
});
