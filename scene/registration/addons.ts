import { gzipSync } from 'zlib';
import { AppAddons } from './types';

function assertPlainObject(
    value: unknown,
    path: string
): asserts value is Record<string, unknown> {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        throw new Error(`${path} must be an object`);
    }
}

/**
 * The confirm page silently discards the whole payload on any shape mismatch,
 * so unknown keys (typos, or sensitive manifest fields like `security`)
 * must fail loudly here instead.
 */
function assertAllowedKeys(
    obj: Record<string, unknown>,
    allowed: string[],
    path: string
): void {
    for (const key of Object.keys(obj)) {
        if (!allowed.includes(key)) {
            throw new Error(
                `${path}.${key} is not allowed; allowed keys: ${allowed.join(', ')}`
            );
        }
    }
}

function validateStringArray(value: unknown, path: string): string[] | undefined {
    if (value === undefined) {
        return undefined;
    }
    if (!Array.isArray(value)) {
        throw new Error(`${path} must be an array of strings`);
    }
    value.forEach((item, idx) => {
        if (typeof item !== 'string' || item === '') {
            throw new Error(`${path}[${idx}] must be a non-empty string`);
        }
    });
    return value;
}

/**
 * Validate the shape of `addons` and rebuild it from the 5 known public
 * fields only, so nothing outside the whitelist can ever be serialized.
 */
function normalizeAddons(addons: AppAddons): AppAddons {
    assertPlainObject(addons, 'addons');
    assertAllowedKeys(addons, ['scopes', 'events', 'callbacks'], 'addons');

    let itemCount = 0;
    const pick = (value: unknown, path: string): string[] | undefined => {
        const items = validateStringArray(value, path);
        itemCount += items?.length ?? 0;
        return items;
    };

    const normalized: AppAddons = {};

    if (addons.scopes !== undefined) {
        assertPlainObject(addons.scopes, 'addons.scopes');
        assertAllowedKeys(addons.scopes, ['tenant', 'user'], 'addons.scopes');
        normalized.scopes = {
            tenant: pick(addons.scopes.tenant, 'addons.scopes.tenant'),
            user: pick(addons.scopes.user, 'addons.scopes.user'),
        };
    }

    if (addons.events !== undefined) {
        assertPlainObject(addons.events, 'addons.events');
        assertAllowedKeys(addons.events, ['items'], 'addons.events');
        if (addons.events.items !== undefined) {
            assertPlainObject(addons.events.items, 'addons.events.items');
            assertAllowedKeys(addons.events.items, ['tenant', 'user'], 'addons.events.items');
            normalized.events = {
                items: {
                    tenant: pick(addons.events.items.tenant, 'addons.events.items.tenant'),
                    user: pick(addons.events.items.user, 'addons.events.items.user'),
                },
            };
        }
    }

    if (addons.callbacks !== undefined) {
        assertPlainObject(addons.callbacks, 'addons.callbacks');
        assertAllowedKeys(addons.callbacks, ['items'], 'addons.callbacks');
        normalized.callbacks = {
            items: pick(addons.callbacks.items, 'addons.callbacks.items'),
        };
    }

    // An all-empty addons is treated as "no addons" by the confirm page —
    // passing one is always a caller bug, so surface it at build time.
    if (itemCount === 0) {
        throw new Error(
            'addons must contain at least one scope, event or callback'
        );
    }

    return normalized;
}

/**
 * Validate `addons` and encode it into the URL-safe string carried by the
 * `addons` query param of the one-click app creation / update link.
 *
 * Encoding pipeline (fixed by the platform):
 * `JSON.stringify → gzip → base64 → URL-safe ('+' → '-', '/' → '_') → strip '=' padding`.
 * The result only contains `A-Z a-z 0-9 - _` and needs no further escaping.
 */
export function encodeAddons(addons: AppAddons): string {
    const json = JSON.stringify(normalizeAddons(addons));
    return gzipSync(Buffer.from(json, 'utf8'))
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}
