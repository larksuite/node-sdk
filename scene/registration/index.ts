import httpInstance, { AxiosError } from '@node-sdk/http';
import { RegisterAppOptions, RegisterAppResult, BeginResponse, PollResponse } from './types';
import { createError } from './errors';

const SDK_NAME = 'node-sdk';

const DEFAULT_FEISHU_DOMAIN = 'accounts.feishu.cn';
const DEFAULT_LARK_DOMAIN = 'accounts.larksuite.com';

const ENDPOINT = '/oauth/v1/app/registration';

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

        const onAbort = () => {
            cleanup();
            reject(createError('abort', 'Registration was aborted'));
        };

        if (ctx.signal?.aborted) {
            return reject(createError('abort', 'Registration was aborted'));
        }
        ctx.signal?.addEventListener('abort', onAbort, { once: true });

        expireTimer = setTimeout(() => {
            cleanup();
            reject(createError('expired_token', 'Polling timed out'));
        }, ctx.expireIn);

        const poll = async () => {
            try {
                const pollRes = await requestRegistration<PollResponse>(baseUrl, {
                    action: 'poll',
                    device_code: ctx.deviceCode,
                });

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
                    cleanup();
                    resolve({
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
                        cleanup();
                        reject(createError(pollRes.error, pollRes.error_description ?? 'Unknown error'));
                        return;
                    default:
                        if (pollRes.error) {
                            cleanup();
                            reject(createError(pollRes.error, pollRes.error_description ?? 'Unknown error'));
                            return;
                        }
                        break;
                }

                pollTimer = setTimeout(poll, interval);
            } catch (e) {
                cleanup();
                reject(e);
            }
        };

        poll();
    });
}

export async function registerApp(options: RegisterAppOptions): Promise<RegisterAppResult> {
    const { domain, source, signal, onQRCodeReady, onStatusChange } = options;

    const baseUrl = `https://${domain ?? DEFAULT_FEISHU_DOMAIN}`;

    const beginRes = await begin(baseUrl);

    const qrCodeUrl = new URL(beginRes.verification_uri_complete);
    qrCodeUrl.searchParams.set('from', 'sdk');
    qrCodeUrl.searchParams.set('source', source ? `${SDK_NAME}/${source}` : SDK_NAME);
    qrCodeUrl.searchParams.set('tp', 'sdk');
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
