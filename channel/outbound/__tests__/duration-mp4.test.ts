import { parseMp4Duration } from '../media/duration-mp4';

/** Build a minimal MP4 with moov > mvhd box (version 0). */
function buildMp4(timescale: number, duration: number): Buffer {
    // mvhd box: 8 header + 4 (version/flags) + 4+4 (creation/mod) + 4 (timescale) + 4 (duration) + 80 (rest ignored)
    const mvhdPayload = Buffer.alloc(100);
    mvhdPayload.writeUInt8(0, 0);              // version
    // flags = 3 bytes of 0 already
    mvhdPayload.writeUInt32BE(0, 4);           // creation time
    mvhdPayload.writeUInt32BE(0, 8);           // modification time
    mvhdPayload.writeUInt32BE(timescale, 12);  // timescale
    mvhdPayload.writeUInt32BE(duration, 16);   // duration

    const mvhdSize = 8 + mvhdPayload.length;
    const mvhd = Buffer.alloc(mvhdSize);
    mvhd.writeUInt32BE(mvhdSize, 0);
    mvhd.write('mvhd', 4, 'ascii');
    mvhdPayload.copy(mvhd, 8);

    const moovSize = 8 + mvhd.length;
    const moov = Buffer.alloc(moovSize);
    moov.writeUInt32BE(moovSize, 0);
    moov.write('moov', 4, 'ascii');
    mvhd.copy(moov, 8);

    return moov;
}

describe('parseMp4Duration', () => {
    test('returns undefined for empty buffer', () => {
        expect(parseMp4Duration(Buffer.alloc(0))).toBeUndefined();
    });

    test('extracts duration from version 0 mvhd', () => {
        // timescale = 1000 (ms), duration = 30000 → 30 seconds
        const mp4 = buildMp4(1000, 30_000);
        expect(parseMp4Duration(mp4)).toBe(30_000);
    });

    test('handles non-1000 timescale', () => {
        // timescale = 600, duration = 3600 → 6 seconds
        const mp4 = buildMp4(600, 3600);
        expect(parseMp4Duration(mp4)).toBe(6000);
    });

    test('returns undefined for buffer without moov', () => {
        const buf = Buffer.alloc(100);
        buf.write('mdat', 4);
        expect(parseMp4Duration(buf)).toBeUndefined();
    });

    test('returns undefined for zero timescale', () => {
        const mp4 = buildMp4(0, 10);
        expect(parseMp4Duration(mp4)).toBeUndefined();
    });

    test('returns undefined for random bytes', () => {
        const buf = Buffer.from('this is not an mp4 file at all really nothing to see here');
        expect(parseMp4Duration(buf)).toBeUndefined();
    });
});
