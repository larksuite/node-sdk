/**
 * Client construction validation + token injection priority.
 *
 * Covers construct-time credential validation (7104 when neither appSecret nor
 * provider is supplied; 7100 when a provider is paired with the ISV appType)
 * and the assertion provider param.
 *
 * SECURITY: only placeholder fake values. Valid-looking appId matches WS regex
 * ^cli_[0-9a-fA-F]{16}$.
 */
import httpInstance from '@node-sdk/http';
import { Client } from '../client';
import { ClientAssertionError } from '../client-assertion';
import { AppType } from '@node-sdk/typings';
import { CWithUserAccessToken } from '@node-sdk/consts';

jest.mock('@node-sdk/http', () => ({
    __esModule: true,
    default: { post: jest.fn(), request: jest.fn() },
    AxiosError: class AxiosError extends Error {},
}));

const mockedPost = httpInstance.post as unknown as jest.Mock;

const APP_ID = 'cli_ABCDEF0123456789';
const FAKE_ASSERTION = 'aaa.bbb.ccc';

function makeProvider() {
    return {
        retrieveToken: jest.fn().mockResolvedValue({ value: FAKE_ASSERTION }),
    };
}

beforeEach(() => {
    mockedPost.mockReset();
});

describe('construct-time validation', () => {
    test('appId only (no secret, no provider) → throws ClientAssertionError 7104', () => {
        expect(() => new Client({ appId: APP_ID } as any)).toThrow(
            ClientAssertionError
        );
        try {
            // eslint-disable-next-line no-new
            new Client({ appId: APP_ID } as any);
        } catch (e: any) {
            expect(e.code).toBe(7104);
        }
    });

    test('provider + ISV appType → throws ClientAssertionError 7100', () => {
        expect(
            () =>
                new Client({
                    appId: APP_ID,
                    clientAssertionProvider: makeProvider(),
                    appType: AppType.ISV,
                } as any)
        ).toThrow(ClientAssertionError);
        try {
            // eslint-disable-next-line no-new
            new Client({
                appId: APP_ID,
                clientAssertionProvider: makeProvider(),
                appType: AppType.ISV,
            } as any);
        } catch (e: any) {
            expect(e.code).toBe(7100);
        }
    });

    test('provider-only self-build does not throw', () => {
        expect(
            () =>
                new Client({
                    appId: APP_ID,
                    clientAssertionProvider: makeProvider(),
                } as any)
        ).not.toThrow();
    });

    test('secret-only does not throw (back-compat)', () => {
        expect(
            () => new Client({ appId: APP_ID, appSecret: 'fake-secret-1' } as any)
        ).not.toThrow();
    });
});

describe('token injection priority', () => {
    test('manual user token wins; tokenManager is not consulted', async () => {
        const client = new Client({
            appId: APP_ID,
            clientAssertionProvider: makeProvider(),
        } as any);
        const spy = jest
            .spyOn(client.tokenManager, 'getTenantAccessToken')
            .mockResolvedValue('should-not-be-used' as any);

        const out = await client.formatPayload(
            {},
            { lark: { [CWithUserAccessToken]: 'manual-uat-1' } }
        );

        expect(out.headers.Authorization).toBe('Bearer manual-uat-1');
        expect(spy).not.toHaveBeenCalled();
    });

    test('without a manual token, tenant token is injected', async () => {
        const client = new Client({
            appId: APP_ID,
            clientAssertionProvider: makeProvider(),
        } as any);
        jest
            .spyOn(client.tokenManager, 'getTenantAccessToken')
            .mockResolvedValue('fake-tat-1' as any);

        const out = await client.formatPayload({}, {});
        expect(out.headers.Authorization).toBe('Bearer fake-tat-1');
    });
});
