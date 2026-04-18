import { LarkChannelError, LarkChannelErrorCode } from '../types';

/**
 * Classify a raw error (typically from axios/fetch or a Feishu API response)
 * into a LarkChannelError with a stable code.
 */
export function classifyError(err: unknown, context?: { to?: string; messageId?: string; attempt?: number }): LarkChannelError {
    if (err instanceof LarkChannelError) return err;

    const code = inferCode(err);
    const message = extractMessage(err);
    return new LarkChannelError(code, message, { cause: err, context });
}

function inferCode(err: unknown): LarkChannelErrorCode {
    const raw = err as any;
    const status = raw?.response?.status ?? raw?.status;
    const feishuCode = raw?.response?.data?.code ?? raw?.data?.code ?? raw?.code;
    const msg = String(raw?.message ?? '').toLowerCase();

    if (typeof feishuCode === 'number') {
        if (feishuCode === 230020 || feishuCode === 230017) return 'target_revoked';
        if (feishuCode === 99991400 || feishuCode === 99991401) return 'permission_denied';
        if (feishuCode === 230002 || feishuCode === 230001) return 'format_error';
    }

    if (status === 429) return 'rate_limited';
    if (status === 401 || status === 403) return 'permission_denied';
    if (status === 400) return 'format_error';
    if (status === 404) return 'target_revoked';

    if (msg.startsWith('ssrf_blocked')) return 'ssrf_blocked';
    if (msg.includes('timeout') || raw?.code === 'ETIMEDOUT' || raw?.code === 'ECONNABORTED') {
        return 'send_timeout';
    }

    return 'unknown';
}

function extractMessage(err: unknown): string {
    const raw = err as any;
    return (
        raw?.response?.data?.msg ||
        raw?.response?.data?.message ||
        raw?.message ||
        String(err)
    );
}

export function isRetryable(err: LarkChannelError): boolean {
    return err.code === 'rate_limited' || err.code === 'unknown';
}

export function isFormatError(err: LarkChannelError): boolean {
    return err.code === 'format_error';
}

export function isReplyTargetGone(err: LarkChannelError): boolean {
    return err.code === 'target_revoked';
}
