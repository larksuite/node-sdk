import { parseOpusDuration } from '../media/duration-ogg';

/**
 * Build a minimal Ogg page with a given granule_position.
 *   Capture: "OggS" (4)
 *   Version: 0 (1)
 *   Type: 0 (1)
 *   Granule: 8 bytes LE
 *   Stream serial: 4 bytes
 *   Page seq: 4 bytes
 *   Checksum: 4 bytes
 *   Segments count: 0 (1)
 * Total header: 27 bytes
 */
function buildOggPage(granule: bigint): Buffer {
    const buf = Buffer.alloc(27);
    buf.write('OggS', 0, 'ascii');
    buf.writeUInt8(0, 4);           // version
    buf.writeUInt8(0, 5);           // header type
    buf.writeBigInt64LE(granule, 6);
    buf.writeUInt32LE(1, 14);       // stream serial
    buf.writeUInt32LE(0, 18);       // page seq
    buf.writeUInt32LE(0, 22);       // checksum
    buf.writeUInt8(0, 26);          // segments count
    return buf;
}

describe('parseOpusDuration', () => {
    test('returns undefined for empty / too-small buffer', () => {
        expect(parseOpusDuration(Buffer.alloc(0))).toBeUndefined();
        expect(parseOpusDuration(Buffer.alloc(10))).toBeUndefined();
    });

    test('extracts duration from last OggS page', () => {
        // 1 second = 48_000 samples at 48kHz
        const page = buildOggPage(BigInt(48_000));
        expect(parseOpusDuration(page)).toBe(1000);
    });

    test('handles 1.5 seconds', () => {
        const page = buildOggPage(BigInt(72_000));
        expect(parseOpusDuration(page)).toBe(1500);
    });

    test('finds last page when multiple are present', () => {
        // Earlier page shows 500ms
        const page1 = buildOggPage(BigInt(24_000));
        // Later page shows 2000ms
        const page2 = buildOggPage(BigInt(96_000));
        const combined = Buffer.concat([page1, page2]);
        expect(parseOpusDuration(combined)).toBe(2000);
    });

    test('returns undefined for negative granule', () => {
        const page = buildOggPage(BigInt(-1));
        expect(parseOpusDuration(page)).toBeUndefined();
    });

    test('returns undefined for random bytes', () => {
        const buf = Buffer.from('not an ogg file here at all at all');
        expect(parseOpusDuration(buf)).toBeUndefined();
    });
});
