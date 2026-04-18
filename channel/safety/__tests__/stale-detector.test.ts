import { isStale } from '../stale-detector';

describe('isStale', () => {
    test('returns false for fresh timestamps', () => {
        expect(isStale(Date.now())).toBe(false);
        expect(isStale(Date.now() - 60_000)).toBe(false);
    });

    test('returns true when beyond default 30min window', () => {
        expect(isStale(Date.now() - 31 * 60_000)).toBe(true);
        expect(isStale(Date.now() - 60 * 60_000)).toBe(true);
    });

    test('honours custom window', () => {
        expect(isStale(Date.now() - 10_000, 5_000)).toBe(true);
        expect(isStale(Date.now() - 4_000, 5_000)).toBe(false);
    });

    test('tolerates invalid input', () => {
        expect(isStale(0)).toBe(false);
        expect(isStale(NaN as unknown as number)).toBe(false);
    });
});
