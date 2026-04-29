import fs from 'fs';
import path from 'path';

/**
 * Resolve the SDK's own version from `package.json`. The source lives at
 * `utils/user-agent.ts`; the published bundle lives at `lib/index.js` or
 * `es/index.js`. In both shapes the package.json sits exactly one level
 * above the code, so `__dirname/..` is the primary candidate. A second
 * candidate (two levels up) covers downstream bundlers that re-emit this
 * module at a deeper path.
 *
 * We sanity-check `name === '@larksuiteoapi/node-sdk'` so we don't
 * accidentally read an unrelated package.json that happens to sit in a
 * parent directory during local development.
 */
let cachedVersion: string | undefined;

export function getSdkVersion(): string {
    if (cachedVersion !== undefined) return cachedVersion;
    const candidates = [
        path.resolve(__dirname, '..', 'package.json'),
        path.resolve(__dirname, '..', '..', 'package.json'),
    ];
    for (const p of candidates) {
        try {
            const pkg = JSON.parse(fs.readFileSync(p, 'utf-8'));
            if (pkg.name === '@larksuiteoapi/node-sdk' && typeof pkg.version === 'string') {
                cachedVersion = pkg.version;
                return pkg.version;
            }
        } catch {
            // try next candidate
        }
    }
    cachedVersion = 'unknown';
    return 'unknown';
}

/**
 * Sanitize a caller-supplied `source` tag so it can be safely concatenated
 * into a User-Agent header. Non-token characters are replaced with '_'
 * and the result is clamped to 64 characters. Never throws.
 */
export function sanitizeSource(raw: string): string {
    return raw.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 64);
}

export function buildUserAgent(
    source?: string,
    opts?: { extraTags?: string[] }
): string {
    let ua = `oapi-node-sdk/${getSdkVersion()}`;
    if (source) {
        const clean = sanitizeSource(source);
        if (clean) ua += ` source/${clean}`;
    }
    if (opts?.extraTags) {
        for (const t of opts.extraTags) {
            const clean = sanitizeSource(t);
            if (clean) ua += ` ${clean}`;
        }
    }
    return ua;
}
