import { extractMentions, resolveMentions } from '../mentions';

describe('extractMentions', () => {
    test('empty mentions array', () => {
        const r = extractMentions(undefined, 'ou_bot');
        expect(r.mentionList).toEqual([]);
        expect(r.mentionAll).toBe(false);
        expect(r.mentionedBot).toBe(false);
    });

    test('single user mention', () => {
        const r = extractMentions(
            [{ key: '@_user_1', id: { open_id: 'ou_alice' }, name: 'Alice' }],
            'ou_bot'
        );
        expect(r.mentionList).toHaveLength(1);
        expect(r.mentionList[0]).toMatchObject({
            key: '@_user_1', openId: 'ou_alice', name: 'Alice', isBot: false,
        });
        expect(r.mentionsByOpenId.get('ou_alice')).toBeDefined();
    });

    test('bot mention detected', () => {
        const r = extractMentions(
            [{ key: '@_bot', id: { open_id: 'ou_bot' }, name: 'Bot' }],
            'ou_bot'
        );
        expect(r.mentionedBot).toBe(true);
        expect(r.mentionList[0].isBot).toBe(true);
    });

    test('@all detection', () => {
        const r = extractMentions(
            [{ key: '@_all', id: {}, name: '所有人' }],
            'ou_bot'
        );
        expect(r.mentionAll).toBe(true);
        expect(r.mentionList).toEqual([]);   // @all not in list
        expect(r.mentions.has('@_all')).toBe(true);
    });

    test('mixed: user + bot + all', () => {
        const r = extractMentions(
            [
                { key: '@_user_1', id: { open_id: 'ou_alice' }, name: 'Alice' },
                { key: '@_bot', id: { open_id: 'ou_bot' }, name: 'Bot' },
                { key: '@_all', id: {}, name: '所有人' },
            ],
            'ou_bot'
        );
        expect(r.mentionAll).toBe(true);
        expect(r.mentionedBot).toBe(true);
        expect(r.mentionList).toHaveLength(2);
    });
});

describe('resolveMentions', () => {
    test('replaces placeholder with @name', () => {
        const mentions = new Map([
            ['@_user_1', { key: '@_user_1', openId: 'ou_alice', name: 'Alice', isBot: false }],
        ]);
        expect(resolveMentions('hello @_user_1', { mentions, stripBotMentions: true }))
            .toBe('hello @Alice');
    });

    test('strips bot mention when flag is on', () => {
        const mentions = new Map([
            ['@_bot', { key: '@_bot', openId: 'ou_bot', name: 'Bot', isBot: true }],
        ]);
        expect(resolveMentions('@_bot help me', { mentions, stripBotMentions: true }))
            .toBe('help me');
    });

    test('does not strip bot mention when flag is off', () => {
        const mentions = new Map([
            ['@_bot', { key: '@_bot', openId: 'ou_bot', name: 'Bot', isBot: true }],
        ]);
        expect(resolveMentions('@_bot help me', { mentions, stripBotMentions: false }))
            .toBe('@Bot help me');
    });

    test('handles multiple mentions in one string', () => {
        const mentions = new Map([
            ['@_user_1', { key: '@_user_1', openId: 'ou_a', name: 'A', isBot: false }],
            ['@_user_2', { key: '@_user_2', openId: 'ou_b', name: 'B', isBot: false }],
        ]);
        expect(resolveMentions('@_user_1 and @_user_2', { mentions, stripBotMentions: true }))
            .toBe('@A and @B');
    });

    test('empty mentions map returns unchanged', () => {
        expect(resolveMentions('hello', { mentions: new Map(), stripBotMentions: true }))
            .toBe('hello');
    });
});
