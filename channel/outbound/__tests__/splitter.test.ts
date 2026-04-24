import { splitWithCodeFences } from '../markdown/splitter';

describe('splitWithCodeFences', () => {
    test('short input returns single chunk', () => {
        expect(splitWithCodeFences('hello', 100)).toEqual(['hello']);
    });

    test('splits long plain text into multiple chunks', () => {
        const text = Array(20).fill('aaaaaaaa').join('\n');
        const out = splitWithCodeFences(text, 30);
        expect(out.length).toBeGreaterThan(1);
        out.forEach((c) => expect(c.length).toBeLessThanOrEqual(40));
    });

    test('closes and reopens code fence when split falls inside a fence', () => {
        const text = '```ts\n' + 'x'.repeat(60) + '\n' + 'y'.repeat(60) + '\n```';
        const out = splitWithCodeFences(text, 40);
        // Every chunk should have an even number of ``` markers
        out.forEach((c) => {
            const count = (c.match(/```/g) ?? []).length;
            expect(count % 2).toBe(0);
        });
        // Middle chunks should start with reopened fence
        for (let i = 1; i < out.length; i++) {
            expect(out[i].startsWith('```')).toBe(true);
        }
    });

    test('preserves original fence language', () => {
        const text = '```python\n' + 'a'.repeat(100) + '\n```';
        const out = splitWithCodeFences(text, 40);
        expect(out.length).toBeGreaterThan(1);
        expect(out[1]).toMatch(/^```python/);
    });

    test('splits before heading when chunk is mostly full', () => {
        const pre = 'a'.repeat(30);
        const text = pre + '\n## Heading\nafter';
        const out = splitWithCodeFences(text, 40);
        // Heading should start a new chunk
        const hasHeadingAtStart = out.some((c) => c.startsWith('## Heading'));
        expect(hasHeadingAtStart).toBe(true);
    });

    test('empty string returns single empty chunk', () => {
        expect(splitWithCodeFences('', 100)).toEqual(['']);
    });
});
