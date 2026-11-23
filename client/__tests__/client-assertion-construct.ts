/**
 * Client construction validation + token injection priority.
 *
 * Covers construct-time credential validation (7104 when neither appSecret nor
 * provider is supplied) and accepts ISV ClientAssertion without app tickets
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

    test('provider + ISV initializes without requesting credentials', async () => {
        const provider = makeProvider();
        new Client({
            appId: APP_ID,
            clientAssertionProvider: provider,
            appType: AppType.ISV,
        });
        await Promise.resolve();
        expect(provider.retrieveToken).not.toHaveBeenCalled();
        expect(mockedPost).not.toHaveBeenCalled();
    });

    test('ISV uses existing UAT exchange, refresh and explicit user token flow', async () => {
        const client = new Client({
            appId: APP_ID,
            clientAssertionProvider: makeProvider(),
            appType: AppType.ISV,
        });
        const request = httpInstance.request as unknown as jest.Mock;
        request.mockResolvedValue({
            access_token: 'test-uat',
            expires_in: 7200,
            token_type: 'Bearer',
        });
        await client.accessToken.retrieveByAuthorizationCode({ code: 'test-code' });
        expect(request.mock.calls.at(-1)![0].data).toMatchObject({
            grant_type: 'authorization_code',
            code: 'test-code',
        });
        expect(request.mock.calls.at(-1)![0].data.tenant_key).toBeUndefined();
        await client.accessToken.refresh({ refreshToken: 'test-refresh' });
        expect(request.mock.calls.at(-1)![0].data).toMatchObject({
            grant_type: 'refresh_token',
            refresh_token: 'test-refresh',
        });
        expect(request.mock.calls.at(-1)![0].data.tenant_key).toBeUndefined();
        const getTenant = jest.spyOn(client.tokenManager, 'getTenantAccessToken');
        const out = await client.formatPayload(
            {},
            { lark: { [CWithUserAccessToken]: 'test-uat' } }
        );
        expect(out.headers.Authorization).toBe('Bearer test-uat');
        expect(getTenant).not.toHaveBeenCalled();
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

    test('secret-only ISV still requests an app ticket', async () => {
        mockedPost.mockResolvedValue(undefined);
        new Client({
            appId: APP_ID,
            appSecret: 'fake-secret-1',
            appType: AppType.ISV,
        });
        await Promise.resolve();
        expect(mockedPost).toHaveBeenCalledWith(
            'https://open.feishu.cn/open-apis/auth/v3/app_ticket/resend',
            { app_id: APP_ID, app_secret: 'fake-secret-1' }
        );
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
