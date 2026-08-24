import type { Cache } from '@node-sdk/typings';
import type { Client } from '../client';
import { UserAccessToken } from '../user-access-token';

function createSubject() {
    const values = new Map<string | Symbol, unknown>();
    const cache: Cache = {
        get: jest.fn(async (key) => values.get(key)),
        set: jest.fn(async (key, value) => {
            values.set(key, value);
            return true;
        }),
    };
    const refresh = jest.fn();
    const exchangeCode = jest.fn();
    const client = {
        appId: 'app-id',
        cache,
        logger: { error: jest.fn() },
        authen: {
            oidcRefreshAccessToken: { create: refresh },
            oidcAccessToken: { create: exchangeCode },
        },
    } as unknown as Client;

    return {
        cache,
        refresh,
        exchangeCode,
        subject: new UserAccessToken({ client }),
    };
}

describe('UserAccessToken custom namespace', () => {
    test('persists a refreshed token in the namespace it was read from', async () => {
        const { subject, refresh } = createSubject();
        await subject.update({
            user: {
                token: 'expired',
                refreshToken: 'refresh-1',
                expiredTime: 0,
            },
        }, { namespace: 'tenant-a' });
        refresh.mockResolvedValue({
            code: 0,
            data: {
                access_token: 'fresh',
                refresh_token: 'refresh-2',
                expires_in: 3600,
            },
        });

        await expect(subject.get('user', { namespace: 'tenant-a' })).resolves.toBe('fresh');
        await expect(subject.get('user', { namespace: 'tenant-a' })).resolves.toBe('fresh');

        expect(refresh).toHaveBeenCalledTimes(1);
    });

    test('persists a code-exchanged token in the namespace it was read from', async () => {
        const { subject, exchangeCode } = createSubject();
        await subject.update({
            user: {
                code: 'authorization-code',
                expiredTime: 0,
            },
        }, { namespace: 'tenant-a' });
        exchangeCode.mockResolvedValue({
            code: 0,
            data: {
                access_token: 'fresh',
                refresh_token: 'refresh-1',
                expires_in: 3600,
            },
        });

        await subject.get('user', { namespace: 'tenant-a' });
        await expect(subject.get('user', { namespace: 'tenant-a' })).resolves.toBe('fresh');

        expect(exchangeCode).toHaveBeenCalledTimes(1);
    });
});
