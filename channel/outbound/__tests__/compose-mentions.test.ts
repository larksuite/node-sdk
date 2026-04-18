import {
    composeMentionsTextPrefix,
    composePostMentionElements,
} from '../markdown/compose-mentions';

describe('composeMentionsTextPrefix', () => {
    test('empty input returns empty string', () => {
        expect(composeMentionsTextPrefix([])).toBe('');
    });

    test('single mention', () => {
        expect(
            composeMentionsTextPrefix([
                { key: '@_user_1', openId: 'ou_alice', name: 'Alice' },
            ])
        ).toBe('<at user_id="ou_alice">Alice</at> ');
    });

    test('multiple mentions joined with spaces', () => {
        const out = composeMentionsTextPrefix([
            { key: '@_user_1', openId: 'ou_a', name: 'A' },
            { key: '@_user_2', openId: 'ou_b', name: 'B' },
        ]);
        expect(out).toBe('<at user_id="ou_a">A</at> <at user_id="ou_b">B</at> ');
    });

    test('skips mentions without openId', () => {
        expect(
            composeMentionsTextPrefix([{ key: '@_x', name: 'Anon' }])
        ).toBe('');
    });
});

describe('composePostMentionElements', () => {
    test('returns at elements for valid mentions', () => {
        const out = composePostMentionElements([
            { key: '@_user_1', openId: 'ou_alice', name: 'Alice' },
        ]);
        expect(out).toEqual([{ tag: 'at', user_id: 'ou_alice', user_name: 'Alice' }]);
    });

    test('empty mentions → empty array', () => {
        expect(composePostMentionElements([])).toEqual([]);
    });
});
