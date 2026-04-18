import { markdownToPost, postToPlainText } from '../markdown/to-post';

interface PostBody {
    zh_cn: { title?: string; content: any[][] };
}

describe('markdownToPost', () => {
    test('plain text becomes a single-element paragraph', () => {
        const r = markdownToPost('hello world') as PostBody;
        expect(r.zh_cn.content[0][0]).toEqual({ tag: 'text', text: 'hello world' });
    });

    test('inline **bold** renders with bold style', () => {
        const r = markdownToPost('hi **there**') as PostBody;
        const elements = r.zh_cn.content[0];
        expect(elements).toContainEqual({ tag: 'text', text: 'hi ' });
        expect(elements).toContainEqual({ tag: 'text', text: 'there', style: ['bold'] });
    });

    test('links render as tag:a', () => {
        const r = markdownToPost('see [here](https://x.com)') as PostBody;
        const elements = r.zh_cn.content[0];
        expect(elements).toContainEqual({ tag: 'a', text: 'here', href: 'https://x.com' });
    });

    test('headings render as bold text', () => {
        const r = markdownToPost('# Title') as PostBody;
        expect(r.zh_cn.content[0][0]).toEqual({ tag: 'text', text: 'Title', style: ['bold'] });
    });

    test('fenced code blocks become a single text element with un_escape', () => {
        const r = markdownToPost('```ts\nconst x = 1;\n```') as PostBody;
        const textEl = r.zh_cn.content[0][0];
        expect(textEl.text).toBe('const x = 1;');
        expect(textEl.un_escape).toBe(true);
    });

    test('inline `code` renders with code style', () => {
        const r = markdownToPost('use `foo` here') as PostBody;
        const elements = r.zh_cn.content[0];
        expect(elements).toContainEqual({ tag: 'text', text: 'foo', style: ['code'] });
    });

    test('horizontal rules become em-dashes', () => {
        const r = markdownToPost('---') as PostBody;
        expect(r.zh_cn.content[0][0].text).toBe('———');
    });

    test('mentions prepend an at element paragraph', () => {
        const r = markdownToPost('hello', {
            mentions: [{ key: '@_user_1', openId: 'ou_xxx', name: 'Alice' }],
        }) as PostBody;
        const first = r.zh_cn.content[0];
        expect(first[0]).toMatchObject({ tag: 'at', user_id: 'ou_xxx' });
    });
});

describe('postToPlainText', () => {
    test('reconstructs text from a post body', () => {
        const post = markdownToPost('hello **world** [link](https://x)');
        expect(postToPlainText(post)).toContain('hello');
        expect(postToPlainText(post)).toContain('world');
        expect(postToPlainText(post)).toContain('link');
    });

    test('handles null/undefined gracefully', () => {
        expect(postToPlainText(null)).toBe('');
        expect(postToPlainText({} as unknown)).toBe('');
    });
});
