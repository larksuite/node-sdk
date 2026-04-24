/**
 * Parse Opus/OGG audio duration (ms) from a buffer.
 *
 * Scans backward for the last "OggS" page capture pattern (0x4f676753) and
 * reads its granule_position (64-bit LE at offset +6 from magic). For Opus,
 * granule_position is the number of decoded samples at 48 kHz — divide by
 * 48 (samples per ms) to get milliseconds.
 *
 * Returns undefined if the buffer doesn't contain a valid Ogg stream or if
 * the granule position is obviously invalid.
 */
export function parseOpusDuration(buf: Buffer): number | undefined {
    if (!buf || buf.length < 27) return undefined;

    for (let i = buf.length - 27; i >= 0; i--) {
        // "OggS" = 0x4f 67 67 53
        if (
            buf[i] === 0x4f &&
            buf[i + 1] === 0x67 &&
            buf[i + 2] === 0x67 &&
            buf[i + 3] === 0x53
        ) {
            const granule = buf.readBigInt64LE(i + 6);
            if (granule < BigInt(0)) return undefined;
            const ms = Number(granule) / 48;
            if (!Number.isFinite(ms) || ms < 0) return undefined;
            return Math.round(ms);
        }
    }
    return undefined;
}
