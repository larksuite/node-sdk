import { SessionCache } from '../session-cache';

describe('aily session cache', () => {
  test('work right', async () => {
    const sessionCache = new SessionCache();

    await sessionCache.set('test', { a: 1 });
    expect(await sessionCache.get('test')).toEqual({a: 1});

    await sessionCache.set('test', { a: undefined });
    expect(await sessionCache.get('test')).toEqual({a: 1});

    await sessionCache.set('test', { a: 2, b: 1 });
    expect(await sessionCache.get('test')).toEqual({a: 2, b: 1});
  });
})