import { gunzipSync } from 'zlib';
import httpInstance from '@node-sdk/http';
import { registerApp } from '../index';

jest.mock('@node-sdk/http', () => ({
    __esModule: true,
    default: { post: jest.fn() },
    AxiosError: class AxiosError extends Error {},
}));

const mockedPost = httpInstance.post as unknown as jest.Mock;

const FAKE_BEGIN = {
    device_code: 'dev-1',
    verification_uri_complete: 'https://accounts.feishu.cn/page/launcher',
    verification_uri: 'https://accounts.feishu.cn/page/launcher',
    user_code: 'uc-1',
    interval: 5,
    expires_in: 600,
};

type RegisterAppOptions = Parameters<typeof registerApp>[0];

/**
 * Drive `registerApp` just far enough to capture the QR-code URL, then abort
 * to avoid the polling loop. Returns the captured URL as a `URL` instance.
 */
async function captureQRUrl(
    overrides: Partial<RegisterAppOptions> = {},
): Promise<URL> {
    mockedPost.mockReset();
    mockedPost.mockResolvedValueOnce(FAKE_BEGIN);

    const controller = new AbortController();
    let captured = '';
    try {
        await registerApp({
            ...overrides,
            signal: controller.signal,
            onQRCodeReady: (info) => {
                captured = info.url;
                controller.abort();
            },
        });
    } catch {
        // abort rejection — expected
    }
    return new URL(captured);
}

async function expectReject(
    overrides: Partial<RegisterAppOptions>,
    match: RegExp,
): Promise<void> {
    mockedPost.mockReset();
    mockedPost.mockResolvedValueOnce(FAKE_BEGIN);
    await expect(
        registerApp({
            ...overrides,
            onQRCodeReady: () => { /* should never fire */ },
        }),
    ).rejects.toThrow(match);
}

describe('registerApp appPreset', () => {
    test('omits avatar/name/desc when appPreset is not provided', async () => {
        const url = await captureQRUrl();
        expect(url.searchParams.has('avatar')).toBe(false);
        expect(url.searchParams.has('name')).toBe(false);
        expect(url.searchParams.has('desc')).toBe(false);
        // Existing params still set
        expect(url.searchParams.get('from')).toBe('sdk');
        expect(url.searchParams.get('source')).toBe('node-sdk');
        expect(url.searchParams.get('tp')).toBe('sdk');
    });

    test('accepts a single avatar string', async () => {
        const url = await captureQRUrl({ appPreset: { avatar: 'https://example.com/a.png' } });
        expect(url.searchParams.getAll('avatar')).toEqual(['https://example.com/a.png']);
    });

    test('accepts an array of avatars and preserves order', async () => {
        const url = await captureQRUrl({
            appPreset: {
                avatar: [
                    'https://example.com/a.png',
                    'https://example.com/b.webp',
                    'https://example.com/c.gif',
                ],
            },
        });
        expect(url.searchParams.getAll('avatar')).toEqual([
            'https://example.com/a.png',
            'https://example.com/b.webp',
            'https://example.com/c.gif',
        ]);
    });

    test('accepts exactly 6 avatars', async () => {
        const six = Array.from({ length: 6 }, (_, i) => `https://example.com/${i}.png`);
        const url = await captureQRUrl({ appPreset: { avatar: six } });
        expect(url.searchParams.getAll('avatar')).toEqual(six);
    });

    test('URL-encodes name (including {user} placeholder)', async () => {
        const url = await captureQRUrl({ appPreset: { name: '{user}的应用' } });
        expect(url.searchParams.get('name')).toBe('{user}的应用');
        // Raw string form must keep the percent-encoded value
        expect(url.toString()).toContain('name=%7Buser%7D%E7%9A%84%E5%BA%94%E7%94%A8');
    });

    test('URL-encodes desc', async () => {
        const url = await captureQRUrl({ appPreset: { desc: '由业务平台自动生成' } });
        expect(url.searchParams.get('desc')).toBe('由业务平台自动生成');
    });

    test('emits all three fields together', async () => {
        const url = await captureQRUrl({
            appPreset: {
                avatar: ['https://example.com/a.png', 'https://example.com/b.png'],
                name: 'MyApp',
                desc: 'demo',
            },
        });
        expect(url.searchParams.getAll('avatar')).toHaveLength(2);
        expect(url.searchParams.get('name')).toBe('MyApp');
        expect(url.searchParams.get('desc')).toBe('demo');
    });

    test('does not interfere with the `source` parameter', async () => {
        const url = await captureQRUrl({ appPreset: { name: 'X' }, source: 'lark-cli' });
        expect(url.searchParams.get('source')).toBe('node-sdk/lark-cli');
        expect(url.searchParams.get('name')).toBe('X');
    });
});

describe('registerApp appPreset validation', () => {
    test('throws when avatar is an empty array', async () => {
        await expectReject({ appPreset: { avatar: [] } }, /at least 1 URL/);
    });

    test('throws when avatar has more than 6 entries', async () => {
        const seven = Array.from({ length: 7 }, (_, i) => `https://example.com/${i}.png`);
        await expectReject({ appPreset: { avatar: seven } }, /at most 6.*got 7/);
    });

    test('throws when avatar is an empty string', async () => {
        await expectReject({ appPreset: { avatar: '' } }, /must be a non-empty string/);
    });

    test('throws when an avatar array entry is empty, including its index', async () => {
        await expectReject(
            { appPreset: { avatar: ['https://example.com/a.png', ''] } },
            /avatar\[1\].*non-empty/,
        );
    });
});

describe('registerApp addons', () => {
    function decodeAddonsParam(url: URL): unknown {
        const encoded = url.searchParams.get('addons');
        expect(encoded).not.toBeNull();
        const base64 = (encoded as string).replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(gunzipSync(Buffer.from(base64, 'base64')).toString('utf8'));
    }

    test('omits the addons param when not provided', async () => {
        const url = await captureQRUrl();
        expect(url.searchParams.has('addons')).toBe(false);
    });

    test('encodes addons into a URL-safe param that decodes back to the input', async () => {
        const addons = {
            scopes: { tenant: ['im:message:send_as_bot'], user: ['calendar:calendar:read'] },
            events: { items: { tenant: ['im.message.receive_v1'], user: ['calendar.calendar.event.changed_v4'] } },
            callbacks: { items: ['card.action.trigger'] },
        };
        const url = await captureQRUrl({ addons });
        const encoded = url.searchParams.get('addons') as string;
        expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
        expect(decodeAddonsParam(url)).toEqual(addons);
    });

    test('coexists with appPreset and createOnly', async () => {
        const url = await captureQRUrl({
            addons: { scopes: { tenant: ['im:message:send_as_bot'] } },
            appPreset: { name: 'MyApp' },
            createOnly: true,
        });
        expect(decodeAddonsParam(url)).toEqual({ scopes: { tenant: ['im:message:send_as_bot'] } });
        expect(url.searchParams.get('name')).toBe('MyApp');
        expect(url.searchParams.get('createOnly')).toBe('true');
    });

    test('rejects before showing the QR code when addons is invalid', async () => {
        await expectReject({ addons: {} }, /at least one scope, event or callback/);
    });
});

describe('registerApp appId (update flow)', () => {
    test('omits the clientID param when appId is not provided', async () => {
        const url = await captureQRUrl();
        expect(url.searchParams.has('clientID')).toBe(false);
    });

    test('sets clientID to the given appId', async () => {
        const url = await captureQRUrl({ appId: 'cli_a1b2c3' });
        expect(url.searchParams.get('clientID')).toBe('cli_a1b2c3');
    });

    test('combines with addons for a config update link', async () => {
        const url = await captureQRUrl({
            appId: 'cli_a1b2c3',
            addons: { scopes: { tenant: ['im:message:send_as_bot'] } },
        });
        expect(url.searchParams.get('clientID')).toBe('cli_a1b2c3');
        expect(url.searchParams.has('addons')).toBe(true);
    });

    test('rejects an empty appId', async () => {
        await expectReject({ appId: '' }, /appId must be a non-empty string/);
    });
});

describe('registerApp createOnly', () => {
    test('omits the createOnly param when not provided', async () => {
        const url = await captureQRUrl();
        expect(url.searchParams.has('createOnly')).toBe(false);
    });

    test('sets createOnly=true when enabled', async () => {
        const url = await captureQRUrl({ createOnly: true });
        expect(url.searchParams.get('createOnly')).toBe('true');
    });

    test('omits the createOnly param when explicitly false', async () => {
        const url = await captureQRUrl({ createOnly: false });
        expect(url.searchParams.has('createOnly')).toBe(false);
    });
});

describe('registerApp cancellation', () => {
    /**
     * Load-bearing: with `interval: 0` the poll a regression would schedule
     * expires immediately, so it fires inside `advancePastNextPollTick` below.
     * Raising it silently disables this test — the extra request would be
     * scheduled but never fire before the assertion, and the case would stay
     * green with the bug back in place.
     */
    const IMMEDIATE_POLL_INTERVAL = 0;

    /** Cross one timers phase — long enough for a `setTimeout(poll, 0)` to fire. */
    const advancePastNextPollTick = () =>
        new Promise((resolve) => setTimeout(resolve, 10));

    test('does not resume polling when an in-flight request resolves after abort', async () => {
        mockedPost.mockReset();

        let resolvePoll!: (value: unknown) => void;
        const inFlightPoll = new Promise((resolve) => {
            resolvePoll = resolve;
        });
        mockedPost
            .mockResolvedValueOnce({ ...FAKE_BEGIN, interval: IMMEDIATE_POLL_INTERVAL })
            .mockReturnValueOnce(inFlightPoll)
            // Never consumed while the fix holds. If polling does resume, this
            // terminal response stops the loop, so a regression surfaces as the
            // assertions below rather than as a runaway of pending requests.
            .mockResolvedValueOnce({ error: 'expired_token' });

        const controller = new AbortController();
        const onStatusChange = jest.fn();
        const registration = registerApp({
            signal: controller.signal,
            onStatusChange,
            onQRCodeReady: () => { /* no-op */ },
        });

        await new Promise((resolve) => setImmediate(resolve));
        expect(mockedPost).toHaveBeenCalledTimes(2);

        controller.abort();
        await expect(registration).rejects.toMatchObject({
            code: 'abort',
            description: 'Registration was aborted',
        });

        // Only activity that happens *after* the abort matters from here on.
        onStatusChange.mockClear();

        resolvePoll({ error: 'authorization_pending' });
        await advancePastNextPollTick();

        expect(mockedPost).toHaveBeenCalledTimes(2);
        expect(onStatusChange).not.toHaveBeenCalled();
    });

    test('does not arm a poll timer when onStatusChange aborts synchronously', async () => {
        mockedPost.mockReset();
        // Fake timers here so the assertion can look at the timer queue itself:
        // this leak is invisible to a request-count check, because the stray
        // timer fires into a guard and never reaches the network.
        // `performance` is read-only on modern Node, and this suite has no use
        // for a faked one.
        jest.useFakeTimers({ doNotFake: ['performance'] });

        try {
            mockedPost
                .mockResolvedValueOnce({ ...FAKE_BEGIN, interval: IMMEDIATE_POLL_INTERVAL })
                .mockResolvedValueOnce({ error: 'authorization_pending' });

            const controller = new AbortController();
            const registration = registerApp({
                signal: controller.signal,
                // Aborting from inside the callback runs the whole teardown while
                // poll() is still on the stack, so anything scheduled afterwards
                // outlives the cleanup that was supposed to cancel it.
                onStatusChange: () => controller.abort(),
                onQRCodeReady: () => { /* no-op */ },
            });

            await expect(registration).rejects.toMatchObject({
                code: 'abort',
                description: 'Registration was aborted',
            });

            expect(jest.getTimerCount()).toBe(0);
            expect(mockedPost).toHaveBeenCalledTimes(2);
        } finally {
            jest.useRealTimers();
        }
    });
});
