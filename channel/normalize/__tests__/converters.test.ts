import type { ConvertContext } from '../context';
import { convertText } from '../converters/text';
import { convertImage } from '../converters/image';
import { convertFile } from '../converters/file';
import { convertAudio } from '../converters/audio';
import { convertVideo } from '../converters/video';
import { convertSticker } from '../converters/sticker';
import { convertLocation } from '../converters/location';
import { convertShareChat, convertShareUser } from '../converters/share';
import { convertUnknown } from '../converters/fallback';
import { convertPost } from '../converters/post';

const ctx: ConvertContext = {
    messageId: 'om_x',
    mentions: new Map(),
    mentionsByOpenId: new Map(),
    stripBotMentions: true,
};

describe('simple converters', () => {
    test('text extracts .text', async () => {
        const r = await convertText('{"text":"hello"}', ctx);
        expect(r.content).toBe('hello');
        expect(r.resources).toEqual([]);
    });

    test('text missing field returns empty string', async () => {
        const r = await convertText('{}', ctx);
        expect(r.content).toBe('');
    });

    test('image renders Markdown + resource', async () => {
        const r = await convertImage('{"image_key":"img_v3_abc"}', ctx);
        expect(r.content).toBe('![image](img_v3_abc)');
        expect(r.resources).toEqual([{ type: 'image', fileKey: 'img_v3_abc' }]);
    });

    test('image missing key falls back to [image]', async () => {
        const r = await convertImage('{}', ctx);
        expect(r.content).toBe('[image]');
        expect(r.resources).toEqual([]);
    });

    test('file includes name attribute', async () => {
        const r = await convertFile('{"file_key":"f1","file_name":"doc.pdf"}', ctx);
        expect(r.content).toBe('<file key="f1" name="doc.pdf"/>');
        expect(r.resources[0].fileName).toBe('doc.pdf');
    });

    test('audio formats duration as "1.5s"', async () => {
        const r = await convertAudio('{"file_key":"a1","duration":1500}', ctx);
        expect(r.content).toBe('<audio key="a1" duration="1.5s"/>');
        expect(r.resources[0].durationMs).toBe(1500);
    });

    test('audio integer seconds shown without decimal', async () => {
        const r = await convertAudio('{"file_key":"a1","duration":1000}', ctx);
        expect(r.content).toBe('<audio key="a1" duration="1s"/>');
    });

    test('video includes name and duration', async () => {
        const r = await convertVideo('{"file_key":"v1","file_name":"clip.mp4","duration":30000}', ctx);
        expect(r.content).toBe('<video key="v1" name="clip.mp4" duration="30s"/>');
    });

    test('sticker minimal form', async () => {
        const r = await convertSticker('{"file_key":"s1"}', ctx);
        expect(r.content).toBe('<sticker key="s1"/>');
    });

    test('location with name and coords', async () => {
        const r = await convertLocation(
            '{"name":"Cafe","latitude":"39.9","longitude":"116.4"}',
            ctx
        );
        expect(r.content).toBe('<location name="Cafe" coords="lat:39.9,lng:116.4"/>');
    });

    test('share_chat', async () => {
        const r = await convertShareChat('{"chat_id":"oc_abc"}', ctx);
        expect(r.content).toBe('<group_card id="oc_abc"/>');
    });

    test('share_user', async () => {
        const r = await convertShareUser('{"user_id":"ou_bob"}', ctx);
        expect(r.content).toBe('<contact_card id="ou_bob"/>');
    });
});

describe('fallback (unknown)', () => {
    test('extracts .text if present', async () => {
        const r = await convertUnknown('{"text":"fallback body"}', ctx);
        expect(r.content).toBe('fallback body');
    });

    test('otherwise returns [unsupported message]', async () => {
        const r = await convertUnknown('{"random":"data"}', ctx);
        expect(r.content).toBe('[unsupported message]');
    });

    test('handles bad JSON', async () => {
        const r = await convertUnknown('not-json', ctx);
        expect(r.content).toBe('[unsupported message]');
    });
});

describe('post converter', () => {
    test('plain title + paragraph', async () => {
        const raw = JSON.stringify({
            zh_cn: {
                title: 'Hello',
                content: [[{ tag: 'text', text: 'world' }]],
            },
        });
        const r = await convertPost(raw, ctx);
        expect(r.content).toContain('**Hello**');
        expect(r.content).toContain('world');
    });

    test('inline image becomes Markdown and adds resource', async () => {
        const raw = JSON.stringify({
            zh_cn: {
                content: [[{ tag: 'img', image_key: 'img_1' }]],
            },
        });
        const r = await convertPost(raw, ctx);
        expect(r.content).toContain('![image](img_1)');
        expect(r.resources).toContainEqual({ type: 'image', fileKey: 'img_1' });
    });

    test('at element uses placeholder key when reverse lookup hits', async () => {
        const ctxWithMention: ConvertContext = {
            ...ctx,
            mentionsByOpenId: new Map([
                ['ou_alice', { key: '@_user_1', openId: 'ou_alice', name: 'Alice', isBot: false }],
            ]),
        };
        const raw = JSON.stringify({
            zh_cn: {
                content: [[{ tag: 'at', user_id: 'ou_alice', user_name: 'Alice' }]],
            },
        });
        const r = await convertPost(raw, ctxWithMention);
        expect(r.content).toContain('@_user_1');
    });

    test('link tag renders as Markdown link', async () => {
        const raw = JSON.stringify({
            zh_cn: {
                content: [[{ tag: 'a', text: 'click', href: 'https://x.com' }]],
            },
        });
        const r = await convertPost(raw, ctx);
        expect(r.content).toContain('[click](https://x.com)');
    });

    test('style bold applied', async () => {
        const raw = JSON.stringify({
            zh_cn: {
                content: [[{ tag: 'text', text: 'strong', style: ['bold'] }]],
            },
        });
        const r = await convertPost(raw, ctx);
        expect(r.content).toContain('**strong**');
    });

    test('malformed post falls back to placeholder', async () => {
        const r = await convertPost('not json', ctx);
        expect(r.content).toBe('[rich text message]');
    });
});
