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

/**
 * Build the User-Agent value. When `source` is provided it appends a
 * `source/<sanitized>` product token, e.g.
 *     oapi-node-sdk/1.62.0 source/cursor-bot
 * Falsy or all-invalid-char `source` values produce the base UA without
 * the extra token.
 */
export function buildUserAgent(source?: string): string {
    const base = `oapi-node-sdk/${getSdkVersion()}`;
    if (!source) return base;
    const clean = sanitizeSource(source);
    return clean ? `${base} source/${clean}` : base;
}
