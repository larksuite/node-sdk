import { gunzipSync } from 'zlib';
import { encodeAddons } from '../addons';
import { AppAddons } from '../types';

/** Mirror of the landing page's decode chain: base64url → gunzip → JSON.parse. */
function decode(encoded: string): unknown {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(gunzipSync(Buffer.from(base64, 'base64')).toString('utf8'));
}

describe('encodeAddons', () => {
    test('round-trips a full addons object through the platform decode chain', () => {
        const addons: AppAddons = {
            scopes: {
                tenant: ['im:message:send_as_bot', 'drive:drive.metadata:readonly'],
                user: ['calendar:calendar:read'],
            },
            events: {
                items: {
                    tenant: ['im.message.receive_v1'],
                    user: ['calendar.calendar.event.changed_v4'],
                },
            },
            callbacks: { items: ['card.action.trigger'] },
        };
        expect(decode(encodeAddons(addons))).toEqual(addons);
    });

    test('output only contains URL-safe characters and no padding', () => {
        // Large payload to make raw base64 '+' / '/' / '=' likely
        const addons: AppAddons = {
            scopes: {
                tenant: Array.from({ length: 100 }, (_, i) => `scope:item_${i}:readonly`),
            },
        };
        expect(encodeAddons(addons)).toMatch(/^[A-Za-z0-9_-]+$/);
    });

    test('keeps only the sections that were provided', () => {
        const encoded = encodeAddons({ scopes: { tenant: ['im:message:send_as_bot'] } });
        expect(decode(encoded)).toEqual({ scopes: { tenant: ['im:message:send_as_bot'] } });
    });

    test('throws on unknown top-level keys (e.g. sensitive manifest fields)', () => {
        const addons = {
            scopes: { tenant: ['im:message:send_as_bot'] },
            security: { allowed_ips: ['1.2.3.4'] },
        } as AppAddons;
        expect(() => encodeAddons(addons)).toThrow(/addons\.security is not allowed/);
    });

    test('throws on typo-ed top-level keys instead of silently dropping them', () => {
        const addons = { scope: { tenant: ['im:message:send_as_bot'] } } as AppAddons;
        expect(() => encodeAddons(addons)).toThrow(/addons\.scope is not allowed/);
    });

    test('throws on unknown nested keys', () => {
        const addons = { scopes: { tenant: [], bot: ['x'] } } as AppAddons;
        expect(() => encodeAddons(addons)).toThrow(/addons\.scopes\.bot is not allowed/);
        const events = { events: { items: { app: ['x'] } } } as AppAddons;
        expect(() => encodeAddons(events)).toThrow(/addons\.events\.items\.app is not allowed/);
    });

    test('throws when a section is not an object', () => {
        expect(() => encodeAddons({ scopes: ['x'] } as unknown as AppAddons))
            .toThrow(/addons\.scopes must be an object/);
    });

    test('throws when a leaf field is not an array', () => {
        expect(() => encodeAddons({ scopes: { tenant: 'im:message:send_as_bot' } } as unknown as AppAddons))
            .toThrow(/addons\.scopes\.tenant must be an array of strings/);
    });

    test('throws on empty-string items, including the item index', () => {
        expect(() => encodeAddons({ callbacks: { items: ['card.action.trigger', ''] } }))
            .toThrow(/addons\.callbacks\.items\[1\] must be a non-empty string/);
    });

    test('throws on non-string items', () => {
        expect(() => encodeAddons({ scopes: { user: [42] } } as unknown as AppAddons))
            .toThrow(/addons\.scopes\.user\[0\] must be a non-empty string/);
    });

    test('throws when every list is empty or missing', () => {
        const match = /at least one scope, event or callback/;
        expect(() => encodeAddons({})).toThrow(match);
        expect(() => encodeAddons({ scopes: { tenant: [], user: [] } })).toThrow(match);
        expect(() => encodeAddons({ events: {} })).toThrow(match);
        expect(() => encodeAddons({ events: { items: {} }, callbacks: { items: [] } })).toThrow(match);
    });

    test('throws when addons itself is not an object', () => {
        expect(() => encodeAddons('x' as unknown as AppAddons)).toThrow(/addons must be an object/);
        expect(() => encodeAddons([] as unknown as AppAddons)).toThrow(/addons must be an object/);
    });
});
