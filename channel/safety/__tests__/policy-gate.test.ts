import type { NormalizedMessage } from '../../types';
import { PolicyGate } from '../policy-gate';

function makeMsg(overrides: Partial<NormalizedMessage> = {}): NormalizedMessage {
    return {
        messageId: 'om_x',
        chatId: 'oc_test',
        chatType: 'group',
        senderId: 'ou_alice',
        content: 'hi',
        rawContentType: 'text',
        resources: [],
        mentions: [],
        mentionAll: false,
        mentionedBot: false,
        createTime: Date.now(),
        ...overrides,
    };
}

describe('PolicyGate — group rules', () => {
    test('denies group not on allowlist', () => {
        const g = new PolicyGate({ groupAllowlist: ['oc_ok'], requireMention: false });
        const d = g.evaluate(makeMsg({ chatId: 'oc_other' }));
        expect(d).toEqual({ allowed: false, reason: 'group_not_allowed' });
    });

    test('allows when chatId in allowlist and mention present', () => {
        const g = new PolicyGate({ groupAllowlist: ['oc_ok'], requireMention: true });
        const d = g.evaluate(makeMsg({ chatId: 'oc_ok', mentionedBot: true }));
        expect(d.allowed).toBe(true);
    });

    test('rejects group without mention when requireMention is default (true)', () => {
        const g = new PolicyGate({});
        const d = g.evaluate(makeMsg({ mentionedBot: false }));
        expect(d).toEqual({ allowed: false, reason: 'no_mention' });
    });

    test('allows group without mention when requireMention is false', () => {
        const g = new PolicyGate({ requireMention: false });
        expect(g.evaluate(makeMsg({ mentionedBot: false })).allowed).toBe(true);
    });

    test('blocks @all by default', () => {
        const g = new PolicyGate({ requireMention: false });
        const d = g.evaluate(makeMsg({ mentionAll: true }));
        expect(d).toEqual({ allowed: false, reason: 'mention_all_blocked' });
    });

    test('allows @all when explicitly enabled', () => {
        const g = new PolicyGate({ requireMention: false, respondToMentionAll: true });
        expect(g.evaluate(makeMsg({ mentionAll: true })).allowed).toBe(true);
    });

    test('empty groupAllowlist means no restriction', () => {
        const g = new PolicyGate({ requireMention: false });
        expect(g.evaluate(makeMsg({ chatId: 'oc_anything' })).allowed).toBe(true);
    });
});

describe('PolicyGate — DM rules', () => {
    test('open is default', () => {
        const g = new PolicyGate({});
        expect(g.evaluate(makeMsg({ chatType: 'p2p' })).allowed).toBe(true);
    });

    test('disabled rejects all DMs', () => {
        const g = new PolicyGate({ dmMode: 'disabled' });
        const d = g.evaluate(makeMsg({ chatType: 'p2p' }));
        expect(d).toEqual({ allowed: false, reason: 'dm_disabled' });
    });

    test('allowlist rejects non-allowlisted senders', () => {
        const g = new PolicyGate({ dmMode: 'allowlist', dmAllowlist: ['ou_bob'] });
        const d = g.evaluate(makeMsg({ chatType: 'p2p', senderId: 'ou_alice' }));
        expect(d).toEqual({ allowed: false, reason: 'sender_not_allowed' });
    });

    test('allowlist allows listed sender', () => {
        const g = new PolicyGate({ dmMode: 'allowlist', dmAllowlist: ['ou_alice'] });
        const d = g.evaluate(makeMsg({ chatType: 'p2p', senderId: 'ou_alice' }));
        expect(d.allowed).toBe(true);
    });
});

describe('PolicyGate — runtime update', () => {
    test('updateConfig merges and takes effect immediately', () => {
        const g = new PolicyGate({ requireMention: false });
        expect(g.evaluate(makeMsg()).allowed).toBe(true);
        g.updateConfig({ requireMention: true });
        expect(g.evaluate(makeMsg()).allowed).toBe(false);
    });
});
