import crypto from 'crypto';

/** Compare nonempty verification tokens without coercing untrusted values. */
export function isVerificationTokenValid(
    token: unknown,
    expected: unknown
): boolean {
    if (
        typeof token !== 'string' ||
        !token ||
        typeof expected !== 'string' ||
        !expected
    ) {
        return false;
    }
    const received = Buffer.from(token, 'utf8');
    const configured = Buffer.from(expected, 'utf8');
    return (
        received.length === configured.length &&
        crypto.timingSafeEqual(received, configured)
    );
}
