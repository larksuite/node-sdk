import httpInstance, { AxiosError } from '@node-sdk/http';
import { RegisterAppOptions, RegisterAppResult, BeginResponse, PollResponse, AppPreset } from './types';
import { encodeAddons } from './addons';
import { createError } from './errors';

const SDK_NAME = 'node-sdk';

const DEFAULT_FEISHU_DOMAIN = 'accounts.feishu.cn';
const DEFAULT_LARK_DOMAIN = 'accounts.larksuite.com';

const ENDPOINT = '/oauth/v1/app/registration';

const AVATAR_MAX_COUNT = 6;

/**
 * Append `avatar` / `name` / `desc` query params to the QR code URL.
 * `URLSearchParams` handles URL encoding automatically.
 */
function applyAppPreset(qrCodeUrl: URL, preset: AppPreset): void {
    const { avatar, name, desc } = preset;

    if (avatar !== undefined) {
        const avatars = Array.isArray(avatar) ? avatar : [avatar];
        if (avatars.length === 0) {
            throw new Error('appPreset.avatar must contain at least 1 URL');
        }
        if (avatars.length > AVATAR_MAX_COUNT) {
            throw new Error(
                `appPreset.avatar supports at most ${AVATAR_MAX_COUNT} URLs, got ${avatars.length}`
            );
        }
        avatars.forEach((url, idx) => {
            if (typeof url !== 'string' || url === '') {
                throw new Error(`appPreset.avatar[${idx}] must be a non-empty string`);
            }
            qrCodeUrl.searchParams.append('avatar', url);
        });
    }

    if (name !== undefined) {
        qrCodeUrl.searchParams.set('name', name);
    }

    if (desc !== undefined) {
        qrCodeUrl.searchParams.set('desc', desc);
    }
}

async function requestRegistration<T>(baseUrl: string, params: Record<string, string>): Promise<T> {
    try {
        const resp = await httpInstance.post<T, T>(
            `${baseUrl}${ENDPOINT}`,
            new URLSearchParams(params).toString(),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }
        );
        return resp;
    } catch (e) {
        // RFC 8628: authorization_pending, slow_down etc. are returned with HTTP 400
        if (e instanceof AxiosError && e.response?.data) {
            return e.response.data as T;
        }
        throw e;
    }
}

function begin(baseUrl: string): Promise<BeginResponse> {
    return requestRegistration<BeginResponse>(baseUrl, {
        action: 'begin',
        archetype: 'PersonalAgent',
        auth_method: 'client_secret',
        request_user_info: 'open_id',
    });
}

interface PollingContext {
    baseUrl: string;
    deviceCode: string;
    interval: number;
    expireIn: number;
    larkBaseUrl: string;
    signal?: AbortSignal;
    onStatusChange?: RegisterAppOptions['onStatusChange'];
}

function startPolling(ctx: PollingContext): Promise<RegisterAppResult> {
    return new Promise((resolve, reject) => {
        let { baseUrl, interval } = ctx;
        let domainSwitched = false;
        let pollTimer: ReturnType<typeof setTimeout> | null = null;
        let expireTimer: ReturnType<typeof setTimeout> | null = null;
        let settled = false;

        const cleanup = () => {
            if (pollTimer !== null) {
                clearTimeout(pollTimer);
                pollTimer = null;
            }
            if (expireTimer !== null) {
                clearTimeout(expireTimer);
                expireTimer = null;
            }
            ctx.signal?.removeEventListener('abort', onAbort);
        };

        // Every terminal transition goes through succeed() / fail(): they flip
        // `settled`, drop the timers and the abort listener, and ignore any later
        // call. Keeping that bookkeeping in one place is what stops a cancelled
        // run from resuming — see issue #211.
        const succeed = (result: RegisterAppResult) => {
            if (settled) {
                return;
            }
            settled = true;
            cleanup();
            resolve(result);
        };

        const fail = (err: unknown) => {
            if (settled) {
                return;
            }
            settled = true;
            cleanup();
            reject(err);
        };

        // Scheduling is guarded too: a status callback may abort the run
        // synchronously, and a timer armed after cleanup() would never be cleared.
        const scheduleNextPoll = () => {
            if (settled) {
                return;
            }
            pollTimer = setTimeout(poll, interval);
        };

        const onAbort = () => {
            fail(createError('abort', 'Registration was aborted'));
        };

        if (ctx.signal?.aborted) {
            return fail(createError('abort', 'Registration was aborted'));
        }
        ctx.signal?.addEventListener('abort', onAbort, { once: true });

        expireTimer = setTimeout(() => {
            fail(createError('expired_token', 'Polling timed out'));
        }, ctx.expireIn);

        const poll = async () => {
            if (settled) {
                return;
            }
            try {
                const pollRes = await requestRegistration<PollResponse>(baseUrl, {
                    action: 'poll',
                    device_code: ctx.deviceCode,
                });
                // The run may have been aborted or have expired while this request
                // was in flight. Drop the response: no status callback, no next
                // poll (issue #211).
                if (settled) {
                    return;
                }

                // Lark domain switch (once only)
                if (pollRes.user_info?.tenant_brand === 'lark' && !domainSwitched) {
                    baseUrl = ctx.larkBaseUrl;
                    domainSwitched = true;
                    ctx.onStatusChange?.({ status: 'domain_switched' });
                    poll();
                    return;
                }

                // Success
                if (pollRes.client_id && pollRes.client_secret) {
                    succeed({
                        client_id: pollRes.client_id,
                        client_secret: pollRes.client_secret,
                        user_info: pollRes.user_info,
                    });
                    return;
                }

                // Handle errors
                switch (pollRes.error) {
                    case 'authorization_pending':
                        ctx.onStatusChange?.({ status: 'polling' });
                        break;
                    case 'slow_down':
                        interval += 5000;
                        ctx.onStatusChange?.({ status: 'slow_down', interval: interval / 1000 });
                        break;
                    case 'access_denied':
                    case 'expired_token':
                        fail(createError(pollRes.error, pollRes.error_description ?? 'Unknown error'));
                        return;
                    default:
                        if (pollRes.error) {
                            fail(createError(pollRes.error, pollRes.error_description ?? 'Unknown error'));
                            return;
                        }
                        break;
                }

                scheduleNextPoll();
            } catch (e) {
                fail(e);
            }
        };

        poll();
    });
}

export async function registerApp(options: RegisterAppOptions): Promise<RegisterAppResult> {
    const { domain, source, signal, onQRCodeReady, onStatusChange, appPreset, addons, createOnly, appId } = options;

    if (appId !== undefined && (typeof appId !== 'string' || appId === '')) {
        throw new Error('appId must be a non-empty string');
    }

    const baseUrl = `https://${domain ?? DEFAULT_FEISHU_DOMAIN}`;

    const beginRes = await begin(baseUrl);

    const qrCodeUrl = new URL(beginRes.verification_uri_complete);
    qrCodeUrl.searchParams.set('from', 'sdk');
    qrCodeUrl.searchParams.set('source', source ? `${SDK_NAME}/${source}` : SDK_NAME);
    qrCodeUrl.searchParams.set('tp', 'sdk');
    if (appPreset) {
        applyAppPreset(qrCodeUrl, appPreset);
    }
    if (addons) {
        qrCodeUrl.searchParams.set('addons', encodeAddons(addons));
    }
    // The landing page only honors the literal value 'true'; anything else is
    // treated as absent, so the param is simply omitted in that case.
    if (createOnly === true) {
        qrCodeUrl.searchParams.set('createOnly', 'true');
    }
    // When both are present the page gives createOnly precedence and ignores
    // clientID, so the two params can be passed through together as-is.
    if (appId) {
        qrCodeUrl.searchParams.set('clientID', appId);
    }
    onQRCodeReady({
        url: qrCodeUrl.toString(),
        expireIn: beginRes.expires_in ?? 600,
    });

    return startPolling({
        baseUrl,
        deviceCode: beginRes.device_code,
        interval: (beginRes.interval ?? 5) * 1000,
        expireIn: (beginRes.expires_in ?? 600) * 1000,
        larkBaseUrl: `https://${options.larkDomain ?? DEFAULT_LARK_DOMAIN}`,
        signal,
        onStatusChange,
    });
}
