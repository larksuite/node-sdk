import { formatUrl } from '../format-url';

describe('format url', () => {
    test('format right', () => {
        expect(formatUrl('/a/b/c')).toBe('a/b/c');
        expect(formatUrl('a/b/c')).toBe('a/b/c');
        expect(formatUrl('')).toBe('');
    });
});
