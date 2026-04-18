import { assertPublicUrl } from '../media/ssrf-guard';

// Mock dns.lookup so tests are deterministic and don't hit real DNS.
jest.mock('dns', () => ({
    promises: {
        lookup: jest.fn(),
    },
}));

const mockLookup = jest.requireMock('dns').promises.lookup as jest.Mock;

function stubLookup(records: Array<{ address: string; family: number }>) {
    mockLookup.mockResolvedValue(records);
}

describe('assertPublicUrl', () => {
    beforeEach(() => {
        mockLookup.mockReset();
    });

    test('returns pinned IP for a public hostname', async () => {
        stubLookup([{ address: '8.8.8.8', family: 4 }]);
        const r = await assertPublicUrl('https://example.com/x');
        expect(r).toEqual({ resolvedIp: '8.8.8.8', originalHost: 'example.com' });
    });

    test('throws on hostname resolving to a private IP', async () => {
        stubLookup([{ address: '169.254.169.254', family: 4 }]);
        await expect(assertPublicUrl('http://evil.com/')).rejects.toThrow(/ssrf_blocked/);
    });

    test('throws when ANY record in a multi-A-record set is private (no lottery)', async () => {
        // This is the specific DNS-rebinding defense: if the attacker's DNS
        // server returns a public IP + a private IP, we must not trust
        // round-robin scheduling to hand us the public one.
        stubLookup([
            { address: '8.8.8.8', family: 4 },
            { address: '169.254.169.254', family: 4 },
        ]);
        await expect(assertPublicUrl('http://evil.com/')).rejects.toThrow(/ssrf_blocked/);
    });

    test('IP literal URL: skips DNS, still validates', async () => {
        const r = await assertPublicUrl('http://1.2.3.4/');
        expect(r.resolvedIp).toBe('1.2.3.4');
        expect(mockLookup).not.toHaveBeenCalled();
    });

    test('IP literal URL pointing at private IP is rejected', async () => {
        await expect(assertPublicUrl('http://169.254.169.254/'))
            .rejects.toThrow(/ssrf_blocked/);
    });

    test('IPv6 literal: ::1 (loopback) is rejected', async () => {
        await expect(assertPublicUrl('http://[::1]/'))
            .rejects.toThrow(/ssrf_blocked/);
    });

    // ── IPv6 bypass vectors from the security report ──
    // Previously the IPv6 check used string prefix matching, which missed
    // several equivalent representations of blocked ranges. After fixing
    // `ipv6Blocked` to parse into a 128-bit bigint and compare against
    // CIDR masks, each of the following must be rejected.

    test('IPv4-mapped loopback (Node hex normalization `::ffff:7f00:1`)', async () => {
        // Node's URL parser normalizes `[::ffff:127.0.0.1]` to hex form.
        await expect(assertPublicUrl('http://[::ffff:127.0.0.1]/'))
            .rejects.toThrow(/ssrf_blocked/);
    });

    test('IPv4-mapped fully-expanded form', async () => {
        stubLookup([{ address: '0:0:0:0:0:ffff:7f00:1', family: 6 }]);
        await expect(assertPublicUrl('http://expanded.test/'))
            .rejects.toThrow(/ssrf_blocked/);
    });

    test('IPv4-compatible (::127.0.0.1) delegates to v4', async () => {
        stubLookup([{ address: '::7f00:1', family: 6 }]);
        await expect(assertPublicUrl('http://v4compat.test/'))
            .rejects.toThrow(/ssrf_blocked/);
    });

    test('NAT64 wrapping a private IPv4 (64:ff9b::10.0.0.1) is rejected', async () => {
        stubLookup([{ address: '64:ff9b::a00:1', family: 6 }]);
        await expect(assertPublicUrl('http://nat64.test/'))
            .rejects.toThrow(/ssrf_blocked/);
    });

    test('NAT64 wrapping a PUBLIC IPv4 (64:ff9b::8.8.8.8) passes', async () => {
        stubLookup([{ address: '64:ff9b::808:808', family: 6 }]);
        const r = await assertPublicUrl('http://nat64pub.test/');
        expect(r.resolvedIp).toBe('64:ff9b::808:808');
    });

    test('Documentation range 2001:db8::/32 is rejected', async () => {
        stubLookup([{ address: '2001:db8::1', family: 6 }]);
        await expect(assertPublicUrl('http://doc.test/'))
            .rejects.toThrow(/ssrf_blocked/);
    });

    test('Teredo 2001::/32 is rejected', async () => {
        stubLookup([{ address: '2001:0:1234::1', family: 6 }]);
        await expect(assertPublicUrl('http://teredo.test/'))
            .rejects.toThrow(/ssrf_blocked/);
    });

    test('Legitimate public IPv6 (Google DNS 2001:4860::8888) passes', async () => {
        // Top 32 bits = 0x20014860, NOT 0x20010000 (Teredo) or 0x20010db8 (doc).
        stubLookup([{ address: '2001:4860:4860::8888', family: 6 }]);
        const r = await assertPublicUrl('http://dns.test/');
        expect(r.resolvedIp).toBe('2001:4860:4860::8888');
    });

    test('link-local with Zone ID (fe80::1%eth0) is rejected', async () => {
        stubLookup([{ address: 'fe80::1%eth0', family: 6 }]);
        await expect(assertPublicUrl('http://ll.test/'))
            .rejects.toThrow(/ssrf_blocked/);
    });

    test('ULA fc00::/7 (both fc and fd prefixes) rejected', async () => {
        stubLookup([{ address: 'fc12:3456::1', family: 6 }]);
        await expect(assertPublicUrl('http://ula-fc.test/'))
            .rejects.toThrow(/ssrf_blocked/);

        stubLookup([{ address: 'fd00:abcd::1', family: 6 }]);
        await expect(assertPublicUrl('http://ula-fd.test/'))
            .rejects.toThrow(/ssrf_blocked/);
    });

    test('fully-expanded ::1 (0:0:0:0:0:0:0:1) rejected via delegation', async () => {
        // Matches ::/96 (IPv4-compatible): low 32 bits = 0.0.0.1, blocked by v4 0.0.0.0/8.
        stubLookup([{ address: '0:0:0:0:0:0:0:1', family: 6 }]);
        await expect(assertPublicUrl('http://expanded-lo.test/'))
            .rejects.toThrow(/ssrf_blocked/);
    });

    test('garbage IPv6 string is treated as blocked (fail-closed)', async () => {
        stubLookup([{ address: 'not::an::ipv6', family: 6 }]);
        await expect(assertPublicUrl('http://garbage.test/'))
            .rejects.toThrow(/ssrf_blocked/);
    });

    test('non-http(s) protocol is rejected', async () => {
        await expect(assertPublicUrl('file:///etc/passwd'))
            .rejects.toThrow(/ssrf_blocked/);
        await expect(assertPublicUrl('gopher://evil.com/'))
            .rejects.toThrow(/ssrf_blocked/);
    });

    test('hostname with no DNS records is rejected', async () => {
        stubLookup([]);
        await expect(assertPublicUrl('http://nxdomain.invalid/'))
            .rejects.toThrow(/ssrf_blocked/);
    });

    test('allowlisted hostname bypasses the public-IP check but still pins', async () => {
        stubLookup([{ address: '10.0.0.1', family: 4 }]);
        const r = await assertPublicUrl('http://internal.corp/', {
            allowlist: ['internal.corp'],
        });
        expect(r.resolvedIp).toBe('10.0.0.1');
        expect(r.originalHost).toBe('internal.corp');
    });

    test('CGNAT range (100.64.0.0/10) is blocked', async () => {
        stubLookup([{ address: '100.64.0.1', family: 4 }]);
        await expect(assertPublicUrl('http://cgnat.test/'))
            .rejects.toThrow(/ssrf_blocked/);
    });

    test('multiple public records: pins to the first one', async () => {
        stubLookup([
            { address: '8.8.8.8', family: 4 },
            { address: '1.1.1.1', family: 4 },
        ]);
        const r = await assertPublicUrl('http://public.test/');
        expect(r.resolvedIp).toBe('8.8.8.8');
    });
});
