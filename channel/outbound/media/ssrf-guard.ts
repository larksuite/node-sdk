import { promises as dns } from 'dns';
import { isIP } from 'net';

/**
 * CIDR blocks that must not be reached from a URL fetch triggered by the
 * SDK. Covers loopback, link-local, private ranges, CGNAT, documentation.
 */
const BLOCKED_V4: Array<[number, number]> = [
    [0x00000000, 8],    // 0.0.0.0/8
    [0x0a000000, 8],    // 10.0.0.0/8
    [0x7f000000, 8],    // 127.0.0.0/8
    [0xa9fe0000, 16],   // 169.254.0.0/16
    [0xac100000, 12],   // 172.16.0.0/12
    [0xc0a80000, 16],   // 192.168.0.0/16
    [0x64400000, 10],   // 100.64.0.0/10 (CGNAT)
    [0xc0000000, 24],   // 192.0.0.0/24
    [0xc0000200, 24],   // 192.0.2.0/24
    [0xc6120000, 15],   // 198.18.0.0/15
    [0xc6336400, 24],   // 198.51.100.0/24
    [0xcb007100, 24],   // 203.0.113.0/24
    [0xe0000000, 4],    // 224.0.0.0/4 (multicast)
    [0xf0000000, 4],    // 240.0.0.0/4 (reserved)
];

export interface SsrfGuardOptions {
    allowlist?: string[]; // hostnames exempt from public-IP checks
}

/**
 * Result of a successful SSRF validation. Callers should use `resolvedIp`
 * to pin the connection (e.g. via a custom `lookup`), and preserve the
 * original URL's hostname on the wire so TLS SNI and certificate
 * verification continue to work.
 */
export interface SsrfValidation {
    resolvedIp: string;
    originalHost: string;
}

/**
 * Validate that `url` does not resolve to an internal / reserved IP, and
 * return the single IP that downstream fetching should pin to. Pinning is
 * essential to close the DNS-rebinding TOCTOU gap: the attacker's DNS
 * server could otherwise return a public IP to this check and a private
 * IP (e.g. cloud metadata `169.254.169.254`) to the subsequent fetch.
 *
 * Allowlisted hostnames skip the public-IP check but still pin — pinning
 * is only about consistency between check-time and use-time, and is
 * harmless when the caller trusts the host.
 */
export async function assertPublicUrl(
    url: string,
    opts: SsrfGuardOptions = {}
): Promise<SsrfValidation> {
    const u = new URL(url);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') {
        throw new Error(`ssrf_blocked: protocol ${u.protocol}`);
    }

    // URL keeps IPv6 literals wrapped in brackets (`[::1]`) — strip them so
    // `isIP()` recognizes the literal and we don't fall through to DNS.
    const rawHost = u.hostname;
    const host =
        rawHost.startsWith('[') && rawHost.endsWith(']')
            ? rawHost.slice(1, -1)
            : rawHost;
    const allowlisted = opts.allowlist?.includes(host) ?? false;

    let resolvedIp: string;
    if (isIP(host)) {
        resolvedIp = host;
        if (!allowlisted) assertIpPublic(resolvedIp);
    } else {
        const records = await dns.lookup(host, { all: true });
        if (records.length === 0) {
            throw new Error(`ssrf_blocked: no DNS records for ${host}`);
        }
        if (!allowlisted) {
            // Reject if ANY record is private — we can't trust DNS
            // round-robin to "win the lottery" and only return public IPs.
            for (const r of records) assertIpPublic(r.address);
        }
        resolvedIp = records[0].address;
    }

    return { resolvedIp, originalHost: host };
}

function assertIpPublic(ip: string): void {
    const v = isIP(ip);
    if (v === 4 && ipv4Blocked(ip)) {
        throw new Error(`ssrf_blocked: ${ip}`);
    }
    if (v === 6 && ipv6Blocked(ip)) {
        throw new Error(`ssrf_blocked: ${ip}`);
    }
    if (v === 0) {
        throw new Error(`ssrf_blocked: not a valid IP: ${ip}`);
    }
}

function ipv4Blocked(ip: string): boolean {
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some((p) => p < 0 || p > 255)) return true;
    const n = ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
    return BLOCKED_V4.some(([net, bits]) => {
        const mask = bits === 0 ? 0 : ((-1) << (32 - bits)) >>> 0;
        return (n & mask) === (net & mask);
    });
}

/**
 * Hardcoded IPv6 CIDR blocks rejected outright (not delegated to v4).
 * Each tuple is [network address as 128-bit bigint, prefix length].
 *
 * Note: `BigInt('0x...')` is used (instead of `0x...n` literals) so the
 * code compiles under TypeScript `target: es6` — bigint literals need
 * es2020. Semantically identical.
 */
const BLOCKED_V6: Array<[bigint, number]> = [
    [BigInt('0xfe800000000000000000000000000000'), 10],  // fe80::/10      link-local
    [BigInt('0xfc000000000000000000000000000000'), 7],   // fc00::/7       ULA
    [BigInt('0xff000000000000000000000000000000'), 8],   // ff00::/8       multicast
    [BigInt('0x01000000000000000000000000000000'), 64],  // 100::/64       discard-only
    [BigInt('0x20010db8000000000000000000000000'), 32],  // 2001:db8::/32  documentation
    [BigInt('0x20010000000000000000000000000000'), 32],  // 2001::/32      Teredo
];

// Top-96-bit prefixes that identify "an IPv4 address carried inside IPv6".
// When these match, the low 32 bits are the actual IPv4 and we delegate
// the decision to `ipv4Blocked` — so e.g. NAT64 around a public IPv4
// passes, NAT64 around a private IPv4 is rejected.
const HIGH96_MASK = BigInt('0xffffffffffffffffffffffff00000000');
const PREFIX_V4_MAPPED = BigInt('0x00000000000000000000ffff00000000'); // ::ffff:0:0/96
const PREFIX_V4_COMPAT = BigInt(0);                                    // ::/96
const PREFIX_NAT64     = BigInt('0x0064ff9b000000000000000000000000'); // 64:ff9b::/96
const LOW32_MASK       = BigInt('0xffffffff');

function ipv6Blocked(ip: string): boolean {
    let n: bigint;
    try {
        n = parseIPv6(ip);
    } catch {
        // Unparseable — fail-closed: treat as internal / suspicious.
        return true;
    }

    // If the address carries an IPv4 in its low 32 bits, check that IPv4.
    const high96 = n & HIGH96_MASK;
    if (
        high96 === PREFIX_V4_MAPPED ||
        high96 === PREFIX_NAT64 ||
        high96 === PREFIX_V4_COMPAT
    ) {
        const v4 = Number(n & LOW32_MASK);
        const v4Str = [
            (v4 >>> 24) & 0xff,
            (v4 >>> 16) & 0xff,
            (v4 >>> 8) & 0xff,
            v4 & 0xff,
        ].join('.');
        return ipv4Blocked(v4Str);
    }

    // Standalone blocked CIDRs via numeric comparison — handles all
    // equivalent string representations (compressed, expanded, mixed).
    return BLOCKED_V6.some(([net, bits]) => {
        const shift = BigInt(128 - bits);
        const allOnes = (BigInt(1) << BigInt(128)) - BigInt(1);
        const mask = (allOnes >> shift) << shift;
        return (n & mask) === (net & mask);
    });
}

/**
 * Parse any representation of an IPv6 address into a 128-bit bigint.
 * Handles:
 *   - `::` compression (`::1`, `fe80::1`, `::`)
 *   - fully expanded form (`0:0:0:0:0:0:0:1`)
 *   - IPv4-in-IPv6 mixed notation (`::ffff:127.0.0.1`, `64:ff9b::10.0.0.1`)
 *   - Zone ID suffix (`fe80::1%eth0` — the suffix is ignored)
 * Throws on any malformed input; the caller treats a throw as
 * fail-closed.
 */
function parseIPv6(ip: string): bigint {
    let addr = ip.split('%')[0].toLowerCase(); // strip Zone ID

    // Convert IPv4 suffix (dotted decimal) to two 16-bit hex groups so the
    // rest of the parser only sees hex groups.
    const v4Suffix = addr.match(/:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})$/);
    if (v4Suffix) {
        const parts = v4Suffix[1].split('.').map(Number);
        if (parts.length !== 4 || parts.some((p) => !Number.isFinite(p) || p < 0 || p > 255)) {
            throw new Error('bad v4 suffix');
        }
        const hex1 = ((parts[0] << 8) | parts[1]).toString(16);
        const hex2 = ((parts[2] << 8) | parts[3]).toString(16);
        addr = addr.slice(0, addr.length - v4Suffix[1].length) + `${hex1}:${hex2}`;
    }

    // Expand `::`.
    const halves = addr.split('::');
    if (halves.length > 2) throw new Error('multiple "::"');

    let groups: string[];
    if (halves.length === 2) {
        const left = halves[0] ? halves[0].split(':') : [];
        const right = halves[1] ? halves[1].split(':') : [];
        const fill = 8 - left.length - right.length;
        if (fill < 0) throw new Error('too many groups');
        groups = [...left, ...Array(fill).fill('0'), ...right];
    } else {
        groups = addr.split(':');
    }

    if (groups.length !== 8) throw new Error('wrong group count');

    let n = BigInt(0);
    for (const g of groups) {
        if (!/^[0-9a-f]{0,4}$/.test(g)) throw new Error('bad group');
        n = (n << BigInt(16)) | BigInt(`0x${g || '0'}`);
    }
    return n;
}
