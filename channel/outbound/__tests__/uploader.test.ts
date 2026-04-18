import fs from 'fs';
import os from 'os';
import path from 'path';
import { MediaUploader } from '../media/uploader';

// Mock dns.lookup so SSRF-guard-enabled tests are deterministic.
jest.mock('dns', () => ({
    promises: {
        lookup: jest.fn().mockResolvedValue([{ address: '8.8.8.8', family: 4 }]),
    },
}));

/**
 * Minimal mock of the subset of node-sdk Client surface used by MediaUploader:
 *   - client.im.v1.image.create
 *   - client.im.v1.file.create
 *   - client.httpInstance.request (only when source is an http(s) URL)
 */
function createMockClient(): {
    client: any;
    imageCreate: jest.Mock;
    fileCreate: jest.Mock;
    httpRequest: jest.Mock;
} {
    const imageCreate = jest.fn().mockResolvedValue({ image_key: 'img_default' });
    const fileCreate = jest.fn().mockResolvedValue({ file_key: 'file_default' });
    const httpRequest = jest.fn().mockResolvedValue(new Uint8Array([1, 2, 3]).buffer);
    const client = {
        im: { v1: { image: { create: imageCreate }, file: { create: fileCreate } } },
        httpInstance: { request: httpRequest },
    };
    return { client, imageCreate, fileCreate, httpRequest };
}

describe('MediaUploader.toBuffer source resolution', () => {
    test('Buffer passes through untouched', async () => {
        const { client, imageCreate, httpRequest } = createMockClient();
        const buf = Buffer.from('hello bytes');
        await new MediaUploader(client).upload({ kind: 'image', source: buf });
        expect(imageCreate).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({ image: buf, image_type: 'message' }),
            })
        );
        expect(httpRequest).not.toHaveBeenCalled();
    });

    test('local file path is read from fs', async () => {
        const tmpFile = path.join(os.tmpdir(), `uploader-test-${Date.now()}.bin`);
        const payload = Buffer.from('on-disk content');
        fs.writeFileSync(tmpFile, payload);
        try {
            const { client, imageCreate, httpRequest } = createMockClient();
            await new MediaUploader(client).upload({ kind: 'image', source: tmpFile });
            const call = imageCreate.mock.calls[0][0];
            expect(Buffer.isBuffer(call.data.image)).toBe(true);
            expect((call.data.image as Buffer).equals(payload)).toBe(true);
            expect(httpRequest).not.toHaveBeenCalled();
        } finally {
            fs.unlinkSync(tmpFile);
        }
    });

    test('non-existent local path throws upload_failed with clear message', async () => {
        const { client } = createMockClient();
        await expect(
            new MediaUploader(client).upload({
                kind: 'image',
                source: '/definitely/does/not/exist/here.png',
            })
        ).rejects.toMatchObject({
            code: 'upload_failed',
            message: expect.stringContaining('neither an http(s) URL nor a readable local file'),
        });
    });

    // ── LFI defenses (vuln #3) ──────────────────────────────────

    // The POSIX blocklist only applies off-Windows. Skip these on win32.
    const describePosix = process.platform === 'win32' ? describe.skip : describe;

    describePosix('POSIX blocklist', () => {
        test.each(['/etc/passwd', '/proc/self/environ', '/sys/kernel/version', '/dev/null'])(
            'rejects %s',
            async (p) => {
                const { client } = createMockClient();
                await expect(
                    new MediaUploader(client).upload({ kind: 'image', source: p })
                ).rejects.toMatchObject({
                    code: 'upload_failed',
                    message: expect.stringContaining('file path is not allowed'),
                });
            }
        );

        test('path traversal resolving into blocked dir is caught after path.resolve', async () => {
            const { client } = createMockClient();
            await expect(
                new MediaUploader(client).upload({
                    kind: 'image',
                    source: '/tmp/../etc/passwd',
                })
            ).rejects.toMatchObject({
                code: 'upload_failed',
                message: expect.stringContaining('file path is not allowed'),
            });
        });
    });

    describe('allowedFileDirs allowlist', () => {
        test('path inside allowed dir is accepted', async () => {
            const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lfi-ok-'));
            const file = path.join(dir, 'ok.bin');
            fs.writeFileSync(file, Buffer.from('allowed'));
            try {
                const { client, imageCreate } = createMockClient();
                await new MediaUploader(client, { allowedFileDirs: [dir] }).upload({
                    kind: 'image',
                    source: file,
                });
                expect(imageCreate).toHaveBeenCalled();
            } finally {
                fs.unlinkSync(file);
                fs.rmdirSync(dir);
            }
        });

        test('path outside allowed dir is rejected', async () => {
            const allowed = fs.mkdtempSync(path.join(os.tmpdir(), 'lfi-scope-'));
            const outside = fs.mkdtempSync(path.join(os.tmpdir(), 'lfi-out-'));
            const file = path.join(outside, 'nope.bin');
            fs.writeFileSync(file, Buffer.from('x'));
            try {
                const { client } = createMockClient();
                await expect(
                    new MediaUploader(client, { allowedFileDirs: [allowed] }).upload({
                        kind: 'image',
                        source: file,
                    })
                ).rejects.toMatchObject({
                    code: 'upload_failed',
                    message: expect.stringContaining('outside allowed directories'),
                });
            } finally {
                fs.unlinkSync(file);
                fs.rmdirSync(allowed);
                fs.rmdirSync(outside);
            }
        });

        test('symlink inside allowed dir that points OUT is rejected (realpath re-check)', async () => {
            if (process.platform === 'win32') return; // symlink semantics differ on Windows
            const allowed = fs.mkdtempSync(path.join(os.tmpdir(), 'lfi-sym-'));
            const outside = fs.mkdtempSync(path.join(os.tmpdir(), 'lfi-sym-out-'));
            const realFile = path.join(outside, 'real.bin');
            fs.writeFileSync(realFile, Buffer.from('secret'));
            const symlink = path.join(allowed, 'link.bin');
            fs.symlinkSync(realFile, symlink);
            try {
                const { client } = createMockClient();
                await expect(
                    new MediaUploader(client, { allowedFileDirs: [allowed] }).upload({
                        kind: 'image',
                        source: symlink,
                    })
                ).rejects.toMatchObject({
                    code: 'upload_failed',
                    message: expect.stringContaining('outside allowed directories'),
                });
            } finally {
                fs.unlinkSync(symlink);
                fs.unlinkSync(realFile);
                fs.rmdirSync(allowed);
                fs.rmdirSync(outside);
            }
        });

        test('no allowedFileDirs configured: arbitrary safe path still works', async () => {
            const tmpFile = path.join(os.tmpdir(), `lfi-default-${Date.now()}.bin`);
            fs.writeFileSync(tmpFile, Buffer.from('hi'));
            try {
                const { client, imageCreate } = createMockClient();
                await new MediaUploader(client).upload({ kind: 'image', source: tmpFile });
                expect(imageCreate).toHaveBeenCalled();
            } finally {
                fs.unlinkSync(tmpFile);
            }
        });
    });

    test('URL fetch with SSRF guard enabled: pins connect target to validated IP (DNS rebinding defense)', async () => {
        const { client, httpRequest } = createMockClient();
        httpRequest.mockResolvedValueOnce(new Uint8Array([1]).buffer);
        // dns.lookup is module-mocked above to return { 8.8.8.8, v4 }
        await new MediaUploader(client).upload({
            kind: 'image',
            source: 'https://evil.example.com/a.png',
        });
        const [[reqOpts]] = httpRequest.mock.calls;
        // URL is NOT rewritten — TLS SNI / cert verification still use the
        // original hostname.
        expect(reqOpts.url).toBe('https://evil.example.com/a.png');
        // Agents are installed for both http and https so connections honor
        // the pinned lookup regardless of protocol.
        expect(reqOpts.httpAgent).toBeDefined();
        expect(reqOpts.httpsAgent).toBeDefined();
        // A size cap is enforced to protect against memory DoS from huge
        // upstream responses.
        expect(reqOpts.maxContentLength).toBe(50 * 1024 * 1024);
        expect(reqOpts.maxBodyLength).toBe(50 * 1024 * 1024);
    });

    test('URL fetch with SSRF guard disabled: no pinned agent, no rebinding defense', async () => {
        const { client, httpRequest } = createMockClient();
        httpRequest.mockResolvedValueOnce(new Uint8Array([1]).buffer);
        await new MediaUploader(client, { ssrfGuard: false }).upload({
            kind: 'image',
            source: 'https://example.com/a.png',
        });
        const [[reqOpts]] = httpRequest.mock.calls;
        expect(reqOpts.url).toBe('https://example.com/a.png');
        expect(reqOpts.httpAgent).toBeUndefined();
        expect(reqOpts.httpsAgent).toBeUndefined();
    });

    test('http URL is fetched via httpInstance (ssrfGuard off)', async () => {
        const { client, imageCreate, httpRequest } = createMockClient();
        httpRequest.mockResolvedValueOnce(new Uint8Array([9, 9, 9]).buffer);
        await new MediaUploader(client, { ssrfGuard: false }).upload({
            kind: 'image',
            source: 'https://example.com/a.png',
        });
        expect(httpRequest).toHaveBeenCalledWith(
            expect.objectContaining({
                url: 'https://example.com/a.png',
                method: 'GET',
                responseType: 'arraybuffer',
            })
        );
        const call = imageCreate.mock.calls[0][0];
        expect(Buffer.isBuffer(call.data.image)).toBe(true);
    });
});

describe('MediaUploader.uploadImage response shape', () => {
    test('reads image_key at top level (real code-gen shape)', async () => {
        const { client, imageCreate } = createMockClient();
        imageCreate.mockResolvedValueOnce({ image_key: 'img_top' });
        const r = await new MediaUploader(client).upload({
            kind: 'image',
            source: Buffer.from('x'),
        });
        expect(r).toEqual({ kind: 'image', fileKey: 'img_top' });
    });

    test('falls back to data.image_key when envelope preserved', async () => {
        const { client, imageCreate } = createMockClient();
        imageCreate.mockResolvedValueOnce({ data: { image_key: 'img_nested' } });
        const r = await new MediaUploader(client).upload({
            kind: 'image',
            source: Buffer.from('x'),
        });
        expect(r.fileKey).toBe('img_nested');
    });

    test('throws upload_failed when image_key missing', async () => {
        const { client, imageCreate } = createMockClient();
        imageCreate.mockResolvedValueOnce(null);
        await expect(
            new MediaUploader(client).upload({ kind: 'image', source: Buffer.from('x') })
        ).rejects.toMatchObject({ code: 'upload_failed' });
    });
});

describe('MediaUploader.uploadFile response shape', () => {
    test('reads file_key at top level', async () => {
        const { client, fileCreate } = createMockClient();
        fileCreate.mockResolvedValueOnce({ file_key: 'file_top' });
        const r = await new MediaUploader(client).upload({
            kind: 'file',
            source: Buffer.from('plain'),
            fileName: 'a.txt',
        });
        expect(r).toEqual({ kind: 'file', fileKey: 'file_top', durationMs: undefined });
    });

    test('falls back to data.file_key', async () => {
        const { client, fileCreate } = createMockClient();
        fileCreate.mockResolvedValueOnce({ data: { file_key: 'file_nested' } });
        const r = await new MediaUploader(client).upload({
            kind: 'file',
            source: Buffer.from('plain'),
            fileName: 'a.txt',
        });
        expect(r.fileKey).toBe('file_nested');
    });
});

describe('MediaUploader.upload kind routing', () => {
    test('kind: file does NOT require duration', async () => {
        const { client, fileCreate } = createMockClient();
        const r = await new MediaUploader(client).upload({
            kind: 'file',
            source: Buffer.from('plain text, no duration'),
            fileName: 'doc.txt',
        });
        expect(r.kind).toBe('file');
        expect(r.durationMs).toBeUndefined();
        expect(fileCreate).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({
                    file_type: 'stream',
                    file_name: 'doc.txt',
                }),
            })
        );
        // duration must NOT be in the request body for plain files
        const req = fileCreate.mock.calls[0][0];
        expect(req.data.duration).toBeUndefined();
    });

    test('kind: audio throws when duration cannot be determined', async () => {
        const { client } = createMockClient();
        await expect(
            new MediaUploader(client).upload({
                kind: 'audio',
                source: Buffer.from('not a valid opus stream'),
            })
        ).rejects.toMatchObject({
            code: 'upload_failed',
            message: expect.stringContaining('duration could not be determined'),
        });
    });

    test('kind: audio with explicit duration uploads as opus', async () => {
        const { client, fileCreate } = createMockClient();
        const r = await new MediaUploader(client).upload({
            kind: 'audio',
            source: Buffer.from('any bytes'),
            duration: 3000,
        });
        expect(r).toEqual({
            kind: 'audio',
            fileKey: 'file_default',
            durationMs: 3000,
        });
        expect(fileCreate).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({
                    file_type: 'opus',
                    duration: 3000,
                }),
            })
        );
    });

    test('kind: video with explicit duration uploads as mp4', async () => {
        const { client, fileCreate } = createMockClient();
        const r = await new MediaUploader(client).upload({
            kind: 'video',
            source: Buffer.from('any'),
            duration: 5000,
        });
        expect(r.kind).toBe('video');
        expect(fileCreate).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({ file_type: 'mp4', duration: 5000 }),
            })
        );
    });

    test('kind: video throws when duration cannot be determined', async () => {
        const { client } = createMockClient();
        await expect(
            new MediaUploader(client).upload({
                kind: 'video',
                source: Buffer.from('not an mp4'),
            })
        ).rejects.toMatchObject({ code: 'upload_failed' });
    });

    test('kind: image skips duration logic entirely', async () => {
        const { client } = createMockClient();
        const r = await new MediaUploader(client).upload({
            kind: 'image',
            source: Buffer.from('any bytes'),
        });
        expect(r.kind).toBe('image');
    });
});
