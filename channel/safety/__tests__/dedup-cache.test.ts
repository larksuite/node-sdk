import type { Cache } from '@node-sdk/typings';
import { SeenCache } from '../dedup-cache';

/** In-memory Cache impl for testing — mimics node-sdk internalCache shape */
function makeCache(): Cache & { _store: Map<string, { v: unknown; exp: number }> } {
    const store = new Map<string, { v: unknown; exp: number }>();
    return {
        _store: store,
        async get(key, opts) {
            const k = (opts?.namespace ?? '') + ':' + String(key);
            const hit = store.get(k);
            if (!hit) return undefined;
            if (hit.exp > 0 && hit.exp < Date.now()) { store.delete(k); return undefined; }
            return hit.v;
        },
        async set(key, value, expire, opts) {
            const k = (opts?.namespace ?? '') + ':' + String(key);
            store.set(k, { v: value, exp: expire ?? 0 });
            return true;
        },
    };
}

describe('SeenCache', () => {
    let dedup: SeenCache;
    afterEach(() => dedup?.dispose());

    test('has returns false for unseen id', async () => {
        dedup = new SeenCache(makeCache());
        expect(await dedup.has('m1')).toBe(false);
    });

    test('add + has roundtrip', async () => {
        dedup = new SeenCache(makeCache());
        await dedup.add('m1');
        expect(await dedup.has('m1')).toBe(true);
    });

    test('different ids do not collide', async () => {
        dedup = new SeenCache(makeCache());
        await dedup.add('m1');
        expect(await dedup.has('m2')).toBe(false);
    });

    test('memory miss falls through to long-term cache', async () => {
        const cache = makeCache();
        // Pre-populate long-term tier only
        await cache.set('m1', '1', Date.now() + 60_000, { namespace: 'channel:seen' });

        dedup = new SeenCache(cache);
        expect(await dedup.has('m1')).toBe(true);
        // Second check should hit memory (refilled)
        expect(await dedup.has('m1')).toBe(true);
    });

    test('evicts oldest entries when max exceeded', async () => {
        dedup = new SeenCache(makeCache(), { maxMemEntries: 3 });
        await dedup.add('a');
        await dedup.add('b');
        await dedup.add('c');
        await dedup.add('d');         // eviction
        // 'a' should have been evicted from memory; depending on cache
        // semantics, long-term may still retain it — we only assert memory-level
        expect((dedup as unknown as { memory: Map<string, number> }).memory.has('a')).toBe(false);
        expect((dedup as unknown as { memory: Map<string, number> }).memory.has('d')).toBe(true);
    });

    test('cache set failure does not throw', async () => {
        const badCache: Cache = {
            async get() { return undefined; },
            async set() { throw new Error('backend down'); },
        };
        dedup = new SeenCache(badCache);
        await expect(dedup.add('m1')).resolves.toBeUndefined();
        // Memory tier still holds it
        expect(await dedup.has('m1')).toBe(true);
    });
});
