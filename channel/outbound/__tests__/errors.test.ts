import { LarkChannelError } from '../../types';
import {
    classifyError,
    isFormatError,
    isReplyTargetGone,
    isRetryable,
} from '../errors';

describe('classifyError', () => {
    test('passes through existing LarkChannelError', () => {
        const orig = new LarkChannelError('rate_limited', 'too many');
        const out = classifyError(orig);
        expect(out).toBe(orig);
    });

    test('infers rate_limited from HTTP 429', () => {
        const err = classifyError({ response: { status: 429 } });
        expect(err.code).toBe('rate_limited');
    });

    test('infers permission_denied from HTTP 403', () => {
        const err = classifyError({ response: { status: 403 } });
        expect(err.code).toBe('permission_denied');
    });

    test('infers format_error from HTTP 400', () => {
        const err = classifyError({ response: { status: 400 } });
        expect(err.code).toBe('format_error');
    });

    test('infers target_revoked from Feishu code 230020', () => {
        const err = classifyError({ response: { data: { code: 230020 } } });
        expect(err.code).toBe('target_revoked');
    });

    test('detects ssrf_blocked from error message prefix', () => {
        const err = classifyError(new Error('ssrf_blocked: 10.0.0.1'));
        expect(err.code).toBe('ssrf_blocked');
    });

    test('detects timeout from error code', () => {
        const err = classifyError({ code: 'ETIMEDOUT', message: 'timeout' });
        expect(err.code).toBe('send_timeout');
    });

    test('falls through to unknown', () => {
        const err = classifyError(new Error('mystery'));
        expect(err.code).toBe('unknown');
    });
});

describe('error predicates', () => {
    test('isRetryable: rate_limited and unknown only', () => {
        expect(isRetryable(new LarkChannelError('rate_limited', ''))).toBe(true);
        expect(isRetryable(new LarkChannelError('unknown', ''))).toBe(true);
        expect(isRetryable(new LarkChannelError('format_error', ''))).toBe(false);
        expect(isRetryable(new LarkChannelError('permission_denied', ''))).toBe(false);
        expect(isRetryable(new LarkChannelError('send_timeout', ''))).toBe(false);
    });

    test('isFormatError', () => {
        expect(isFormatError(new LarkChannelError('format_error', ''))).toBe(true);
        expect(isFormatError(new LarkChannelError('rate_limited', ''))).toBe(false);
    });

    test('isReplyTargetGone', () => {
        expect(isReplyTargetGone(new LarkChannelError('target_revoked', ''))).toBe(true);
        expect(isReplyTargetGone(new LarkChannelError('unknown', ''))).toBe(false);
    });
});
