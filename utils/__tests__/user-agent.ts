import { buildUserAgent, sanitizeSource, getSdkVersion } from '../user-agent';

describe('getSdkVersion', () => {
    test('returns the version from the real package.json', () => {
        const v = getSdkVersion();
        // Must look like a semver-ish string from our own package.
        expect(v).toMatch(/^\d+\.\d+\.\d+/);
        expect(v).not.toBe('unknown');
    });
});

describe('sanitizeSource', () => {
    test('passes token chars through unchanged', () => {
        expect(sanitizeSource('cursor-bot')).toBe('cursor-bot');
        expect(sanitizeSource('Team_2026.v1')).toBe('Team_2026.v1');
    });

    test('replaces unsupported chars with underscore', () => {
        expect(sanitizeSource('hello world')).toBe('hello_world');
        expect(sanitizeSource('foo/bar')).toBe('foo_bar');
        expect(sanitizeSource('a b\tc\nd')).toBe('a_b_c_d');
    });

    test('replaces non-ASCII (including CJK) with underscore', () => {
        expect(sanitizeSource('机器人')).toBe('___');
    });

    test('clamps to 64 characters', () => {
        const long = 'a'.repeat(200);
        expect(sanitizeSource(long)).toHaveLength(64);
    });
});

describe('buildUserAgent', () => {
    test('no source → base UA only', () => {
        const ua = buildUserAgent();
        expect(ua).toMatch(/^oapi-node-sdk\/\d+\.\d+\.\d+/);
        expect(ua).not.toContain('source/');
    });

    test('empty string source → base UA only', () => {
        expect(buildUserAgent('')).not.toContain('source/');
    });

    test('valid source → appended as source/<name> product token', () => {
        const ua = buildUserAgent('cursor-bot');
        expect(ua).toMatch(/^oapi-node-sdk\/\d+\.\d+\.\d+ source\/cursor-bot$/);
    });

    test('source is sanitized before being appended', () => {
        const ua = buildUserAgent('my cool bot!');
        expect(ua).toContain('source/my_cool_bot_');
    });

    test('all-invalid-char source still produces a source/ token of underscores', () => {
        // The sanitized result is all underscores, still technically non-empty,
        // so it appears after `source/`. Documenting current behavior so future
        // contributors don't accidentally strip it.
        const ua = buildUserAgent('机器人');
        expect(ua).toContain('source/___');
    });

    test('extraTags are appended as bare product tokens after source', () => {
        const ua = buildUserAgent('cursor-bot', { extraTags: ['channel'] });
        expect(ua).toMatch(/^oapi-node-sdk\/\d+\.\d+\.\d+ source\/cursor-bot channel$/);
    });

    test('extraTags are appended even without source', () => {
        const ua = buildUserAgent(undefined, { extraTags: ['channel'] });
        expect(ua).toMatch(/^oapi-node-sdk\/\d+\.\d+\.\d+ channel$/);
    });

    test('multiple extraTags are appended in order', () => {
        const ua = buildUserAgent('x', { extraTags: ['channel', 'beta'] });
        expect(ua).toContain('source/x channel beta');
    });

    test('extraTags are sanitized (non-token chars replaced)', () => {
        const ua = buildUserAgent(undefined, { extraTags: ['has space'] });
        expect(ua).toContain('has_space');
    });

    test('empty extraTags are dropped (matches sanitize-then-append rule)', () => {
        const ua = buildUserAgent('x', { extraTags: [''] });
        expect(ua).toMatch(/^oapi-node-sdk\/\d+\.\d+\.\d+ source\/x$/);
    });
});
