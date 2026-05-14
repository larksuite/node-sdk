import { markdownToPost, postToPlainText } from '../markdown/to-post';

interface PostBody {
    zh_cn: { title?: string; content: any[][] };
}

describe('markdownToPost', () => {
    test('emits a single tag:md element wrapping the markdown', () => {
        const r = markdownToPost('hello world') as PostBody;
        expect(r.zh_cn.content).toHaveLength(1);
        expect(r.zh_cn.content[0]).toHaveLength(1);
        expect(r.zh_cn.content[0][0]).toEqual({ tag: 'md', text: 'hello world' });
    });

    test('preserves inline markdown verbatim — Feishu renders it natively', () => {
        const r = markdownToPost('hi **there** and `code` and [link](https://x)') as PostBody;
        expect(r.zh_cn.content[0][0].text).toBe(
            'hi **there** and `code` and [link](https://x)'
        );
    });

    test('demotes H1 → H4 when the original document contains H1~H3', () => {
        const r = markdownToPost('# Title\n\nbody') as PostBody;
        expect(r.zh_cn.content[0][0].text).toContain('#### Title');
    });

    test('demotes H2~H6 → H5 when the original contains H1~H3', () => {
        const r = markdownToPost('# A\n\n## B\n\n### C\n\n#### D') as PostBody;
        const text = r.zh_cn.content[0][0].text;
        expect(text).toContain('#### A');
        expect(text).toContain('##### B');
        expect(text).toContain('##### C');
        expect(text).toContain('##### D');
    });

    test('does not demote when no H1~H3 are present', () => {
        const r = markdownToPost('#### existing H4') as PostBody;
        expect(r.zh_cn.content[0][0].text).toBe('#### existing H4');
    });

    test('preserves fenced code block content (and protects it from demotion)', () => {
        const r = markdownToPost('# heading\n\n```ts\n# not a heading inside code\n```') as PostBody;
        const text = r.zh_cn.content[0][0].text;
        // Heading outside the fence got demoted, content inside stays intact.
        expect(text).toContain('#### heading');
        expect(text).toContain('# not a heading inside code');
    });

    test('compresses 3+ consecutive newlines to 2', () => {
        const r = markdownToPost('a\n\n\n\nb') as PostBody;
        expect(r.zh_cn.content[0][0].text).toBe('a\n\nb');
    });

    test('mentions prepend a Feishu <at> token to the markdown', () => {
        const r = markdownToPost('hello', {
            mentions: [{ key: '@_user_1', openId: 'ou_xxx', name: 'Alice' }],
        }) as PostBody;
        expect(r.zh_cn.content[0][0].text).toBe(
            '<at user_id="ou_xxx">Alice</at> hello'
        );
    });

    test('multiple mentions are space-separated and followed by a single space', () => {
        const r = markdownToPost('hi', {
            mentions: [
                { key: '@_user_1', openId: 'ou_a', name: 'Alice' },
                { key: '@_user_2', openId: 'ou_b', name: 'Bob' },
            ],
        }) as PostBody;
        expect(r.zh_cn.content[0][0].text).toBe(
            '<at user_id="ou_a">Alice</at> <at user_id="ou_b">Bob</at> hi'
        );
    });

    test('respects optional title', () => {
        const r = markdownToPost('body', { title: 'My title' }) as PostBody;
        expect(r.zh_cn.title).toBe('My title');
    });

    test('defaults title to empty string', () => {
        const r = markdownToPost('body') as PostBody;
        expect(r.zh_cn.title).toBe('');
    });
});

describe('postToPlainText', () => {
    test('reconstructs the markdown text from a tag:md post', () => {
        const post = markdownToPost('hello **world** [link](https://x)');
        // The md text is what Feishu would render; for the text-fallback path
        // we send it as-is.
        expect(postToPlainText(post)).toBe('hello **world** [link](https://x)');
    });

    test('handles legacy mixed-element posts (text/a/at/img) for back-compat', () => {
        const legacy = {
            zh_cn: {
                content: [[
                    { tag: 'text', text: 'hello ' },
                    { tag: 'at', user_name: 'Alice' },
                    { tag: 'text', text: ' see ' },
                    { tag: 'a', text: 'docs', href: 'https://x' },
                    { tag: 'img', image_key: 'img_1' },
                ]],
            },
        };
        expect(postToPlainText(legacy)).toBe('hello @Alice see docs[image]');
    });

    test('handles null/undefined gracefully', () => {
        expect(postToPlainText(null)).toBe('');
        expect(postToPlainText({} as unknown)).toBe('');
    });
});
