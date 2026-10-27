import packageJson from '../package.json';

/** The version is bundled as a value, so consumers need neither `__dirname` nor filesystem access. */
export function getSdkVersion(): string {
    return packageJson.version;
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
