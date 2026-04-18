/**
 * Parse MP4 video duration (ms) from a buffer by walking the ISO BMFF box
 * hierarchy and finding `moov → mvhd`.
 *
 * The `mvhd` box version determines field widths:
 * - version 0: creation/modification/timescale/duration = 4 bytes each
 * - version 1: creation/modification = 8 bytes, timescale = 4 bytes,
 *              duration = 8 bytes
 *
 * Returns undefined if the stream is not parseable or duration is unknown.
 */
export function parseMp4Duration(buf: Buffer): number | undefined {
    if (!buf || buf.length < 16) return undefined;

    const moov = findBoxPayload(buf, 0, buf.length, 'moov');
    if (!moov) return undefined;

    const mvhd = findBoxPayload(buf, moov.start, moov.end, 'mvhd');
    if (!mvhd) return undefined;

    const p = mvhd.start;
    if (p + 4 > buf.length) return undefined;

    const version = buf.readUInt8(p);
    // skip flags (3 bytes)
    const base = p + 4;

    let timescale: number;
    let duration: number;

    if (version === 1) {
        // creation(8) + modification(8) + timescale(4) + duration(8)
        if (base + 28 > buf.length) return undefined;
        timescale = buf.readUInt32BE(base + 16);
        duration = Number(buf.readBigUInt64BE(base + 20));
    } else {
        // creation(4) + modification(4) + timescale(4) + duration(4)
        if (base + 16 > buf.length) return undefined;
        timescale = buf.readUInt32BE(base + 8);
        duration = buf.readUInt32BE(base + 12);
    }

    if (!timescale || !Number.isFinite(timescale) || !Number.isFinite(duration)) {
        return undefined;
    }
    return Math.round((duration / timescale) * 1000);
}

/**
 * Walk the boxes from [begin, end) looking for one whose type matches
 * `name`. Returns the payload range (excluding the 8-byte header).
 */
function findBoxPayload(
    buf: Buffer,
    begin: number,
    end: number,
    name: string
): { start: number; end: number } | undefined {
    let p = begin;
    while (p + 8 <= end && p + 8 <= buf.length) {
        const size = buf.readUInt32BE(p);
        const type = buf.slice(p + 4, p + 8).toString('ascii');
        const boxEnd = size === 1
            ? p + Number(buf.readBigUInt64BE(p + 8))
            : size === 0
                ? end   // box extends to end-of-file
                : p + size;
        if (boxEnd <= p || boxEnd > end) return undefined;

        if (type === name) {
            const payloadStart = size === 1 ? p + 16 : p + 8;
            return { start: payloadStart, end: boxEnd };
        }
        p = boxEnd;
    }
    return undefined;
}
