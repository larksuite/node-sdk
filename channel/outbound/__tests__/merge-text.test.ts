import { mergeStreamingText } from '../streaming/merge-text';

describe('mergeStreamingText', () => {
    test('empty prev returns next', () => {
        expect(mergeStreamingText('', 'hello')).toBe('hello');
    });

    test('empty next returns prev', () => {
        expect(mergeStreamingText('hello', '')).toBe('hello');
    });

    test('accumulated stream (next is superset) → use next', () => {
        expect(mergeStreamingText('hello', 'hello world')).toBe('hello world');
    });

    test('backward duplicate (prev contains next) → keep prev', () => {
        expect(mergeStreamingText('hello world', 'hello')).toBe('hello world');
    });

    test('overlapping tail / head → merge at max overlap', () => {
        expect(mergeStreamingText('hello wor', 'world foo')).toBe('hello world foo');
    });

    test('no overlap → concatenate', () => {
        expect(mergeStreamingText('abc', 'xyz')).toBe('abcxyz');
    });

    test('single character overlap', () => {
        expect(mergeStreamingText('foo', 'oo bar')).toBe('foo barhe'.slice(0, 7));
        // Actually: tail 'oo' overlaps with head 'oo' of 'oo bar'
        // Wait: 'foo' + 'oo bar'[2:] = 'foo' + ' bar' = 'foo bar'
        expect(mergeStreamingText('foo', 'oo bar')).toBe('foo bar');
    });
});
