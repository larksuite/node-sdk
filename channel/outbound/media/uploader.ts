import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import type { LookupFunction } from 'net';
import type { Client } from '@node-sdk/client/client';
import { LarkChannelError } from '../../types';
import type { OutboundConfig } from '../../types';
import { parseOpusDuration } from './duration-ogg';
import { parseMp4Duration } from './duration-mp4';
import { assertPublicUrl, SsrfGuardOptions } from './ssrf-guard';

/**
 * POSIX directory prefixes that can never be a legitimate media source.
 * Skipped on Windows (no equivalent single-prefix set exists there; a
 * downstream allowlist is the right tool for Windows deployments).
 */
const POSIX_BLOCKED_PREFIXES = ['/etc/', '/proc/', '/sys/', '/dev/'];

/** Max bytes accepted from a URL-based media source. Protects against
 *  memory DoS when a malicious URL tries to return gigabytes. */
const URL_MAX_BYTES = 50 * 1024 * 1024;

export type MediaKind = 'image' | 'file' | 'audio' | 'video';

export interface UploadInput {
    kind: MediaKind;
    source: string | Buffer;
    fileName?: string;
    duration?: number;          // explicit caller-provided duration (ms)
    coverImageKey?: string;
}

export interface UploadResult {
    kind: MediaKind;
    fileKey: string;            // image_key for images, file_key otherwise
    durationMs?: number;
}

export class MediaUploader {
    constructor(private client: Client, private config?: OutboundConfig) {}

    async upload(input: UploadInput): Promise<UploadResult> {
        const buffer = await this.toBuffer(input.source);

        if (input.kind === 'image') {
            return this.uploadImage(buffer);
        }
        if (input.kind === 'audio') {
            const duration = this.resolveDuration(input, buffer);
            return this.uploadFile(buffer, 'opus', input.fileName ?? 'voice.opus', duration);
        }
        if (input.kind === 'video') {
            const duration = this.resolveDuration(input, buffer);
            return this.uploadFile(buffer, 'mp4', input.fileName ?? 'video.mp4', duration);
        }
        // generic file — no duration required
        return this.uploadFile(buffer, 'stream', input.fileName ?? 'upload.bin');
    }

    /**
     * Materialize `source` into a Buffer. A string is treated as:
     *   • `http://` / `https://` URL — fetch with SSRF guard
     *   • anything else — local filesystem path, read directly
     */
    private async toBuffer(source: string | Buffer): Promise<Buffer> {
        if (Buffer.isBuffer(source)) return source;

        if (!/^https?:\/\//i.test(source)) {
            const allowedDirs = this.config?.allowedFileDirs;
            const resolved = path.resolve(source);

            // Pre-I/O POSIX blocklist check: catches `/etc/passwd` etc.
            // before touching the filesystem. Path-traversal variants like
            // `/tmp/../etc/passwd` are collapsed by `path.resolve`.
            this.assertNotOnPosixBlocklist(resolved);

            try {
                // Follow symlinks so that:
                //   • a symlink inside an allowed dir pointing outside
                //     is caught (allowlist containment is on real target);
                //   • macOS `/etc` → `/private/etc` alias is also blocked.
                const realPath = await fs.promises.realpath(resolved);
                this.assertNotOnPosixBlocklist(realPath);

                if (allowedDirs && allowedDirs.length > 0) {
                    // Realpath the allowed dirs too — otherwise macOS
                    // `/var` → `/private/var` alias would reject all
                    // tmpdir-based paths.
                    const canonicalDirs = await Promise.all(
                        allowedDirs.map(async (d) => {
                            const r = path.resolve(d);
                            try { return await fs.promises.realpath(r); }
                            catch { return r; }
                        })
                    );
                    const inAllowed = canonicalDirs.some(
                        (d) => realPath === d || realPath.startsWith(d + path.sep)
                    );
                    if (!inAllowed) {
                        throw new LarkChannelError(
                            'upload_failed',
                            `file path is outside allowed directories: ${realPath}`
                        );
                    }
                }

                return await fs.promises.readFile(realPath);
            } catch (e) {
                if (e instanceof LarkChannelError) throw e;
                throw new LarkChannelError(
                    'upload_failed',
                    `source is neither an http(s) URL nor a readable local file: ${source}`,
                    { cause: e }
                );
            }
        }

        const ssrf = this.config?.ssrfGuard;
        const guardEnabled = ssrf !== false;
        let resolvedIp: string | undefined;
        if (guardEnabled) {
            const ssrfOpts: SsrfGuardOptions =
                typeof ssrf === 'object' && ssrf ? { allowlist: ssrf.allowlist } : {};
            try {
                ({ resolvedIp } = await assertPublicUrl(source, ssrfOpts));
            } catch (e) {
                throw new LarkChannelError('ssrf_blocked', `URL blocked: ${String(e)}`, {
                    cause: e,
                });
            }
        }
        try {
            // Pin the TCP connect target to the IP we just validated so the
            // attacker can't swap in a private IP between the DNS check and
            // the fetch (DNS rebinding / TOCTOU). We inject a custom `lookup`
            // into a per-request agent; the URL itself stays intact so TLS
            // SNI and certificate verification continue to use the original
            // hostname.
            const requestOpts: Record<string, unknown> = {
                url: source,
                method: 'GET',
                responseType: 'arraybuffer',
                timeout: 15_000,
                maxContentLength: URL_MAX_BYTES,
                maxBodyLength: URL_MAX_BYTES,
            };
            if (resolvedIp) {
                const agent = makePinnedAgent(source, resolvedIp);
                requestOpts.httpAgent = agent;
                requestOpts.httpsAgent = agent;
            }
            const res = await this.client.httpInstance.request(requestOpts);
            return Buffer.from(res as ArrayBuffer);
        } catch (e) {
            throw new LarkChannelError('upload_failed', `fetch source URL failed`, {
                cause: e,
            });
        }
    }

    /**
     * Reject paths pointing at POSIX system directories (`/etc`, `/proc`,
     * `/sys`, `/dev`). Called twice by the caller — once on the resolved
     * path pre-I/O, again on the realpath — so both direct hits
     * (`/etc/passwd`) and macOS alias hits (`/etc` → `/private/etc`) are
     * caught.
     */
    private assertNotOnPosixBlocklist(p: string): void {
        if (process.platform === 'win32') return;
        if (POSIX_BLOCKED_PREFIXES.some(
            (pre) => p === pre.slice(0, -1) || p.startsWith(pre)
        )) {
            throw new LarkChannelError(
                'upload_failed',
                `file path is not allowed: ${p}`
            );
        }
    }

    private resolveDuration(input: UploadInput, buffer: Buffer): number {
        if (input.duration != null && input.duration > 0) return input.duration;
        const parsed = input.kind === 'audio'
            ? parseOpusDuration(buffer)
            : input.kind === 'video'
                ? parseMp4Duration(buffer)
                : undefined;
        if (parsed != null) return parsed;
        throw new LarkChannelError(
            'upload_failed',
            `duration could not be determined for ${input.kind}; pass it explicitly`
        );
    }

    private async uploadImage(buffer: Buffer): Promise<UploadResult> {
        try {
            const r = await this.client.im.v1.image.create({
                data: { image_type: 'message', image: buffer } as never,
            });
            // The code-gen client already strips the outer envelope and returns
            // `res?.data` directly, so `image_key` sits at the top level. Keep
            // the nested `.data.image_key` path as a defensive fallback in case
            // a caller plugs in a different HttpInstance that preserves the
            // envelope.
            const key =
                (r as { image_key?: string } | null)?.image_key ??
                (r as { data?: { image_key?: string } } | null)?.data?.image_key;
            if (!key) throw new Error('image_key missing in upload response');
            return { kind: 'image', fileKey: key };
        } catch (e) {
            throw new LarkChannelError('upload_failed', `image upload failed`, {
                cause: e,
            });
        }
    }

    private async uploadFile(
        buffer: Buffer,
        fileType: 'opus' | 'mp4' | 'stream' | 'pdf' | 'doc' | 'xls' | 'ppt',
        fileName: string,
        durationMs?: number
    ): Promise<UploadResult> {
        try {
            const data: Record<string, unknown> = {
                file_type: fileType,
                file_name: fileName,
                file: buffer,
            };
            if (durationMs != null) data.duration = durationMs;
            const r = await this.client.im.v1.file.create({
                data: data as never,
            });
            const key =
                (r as { file_key?: string } | null)?.file_key ??
                (r as { data?: { file_key?: string } } | null)?.data?.file_key;
            if (!key) throw new Error('file_key missing in upload response');
            const kind: MediaKind =
                fileType === 'opus' ? 'audio' : fileType === 'mp4' ? 'video' : 'file';
            return { kind, fileKey: key, durationMs };
        } catch (e) {
            if (e instanceof LarkChannelError) throw e;
            throw new LarkChannelError('upload_failed', `file upload failed`, {
                cause: e,
            });
        }
    }
}

/**
 * Build a per-request http(s) Agent whose DNS lookup always returns
 * `pinnedIp`, regardless of what hostname Node would otherwise resolve.
 * The URL's original hostname is preserved on the wire, which keeps TLS
 * SNI and certificate verification working. This closes the window where
 * a malicious DNS server could return a different (private) IP on the
 * second resolution triggered by the actual fetch.
 */
function makePinnedAgent(url: string, pinnedIp: string): http.Agent | https.Agent {
    const AgentClass = url.startsWith('https:') ? https.Agent : http.Agent;
    const agent = new AgentClass();

    const family = pinnedIp.includes(':') ? 6 : 4;
    const lookup: LookupFunction = (_hostname, _opts, cb) => {
        cb(null, pinnedIp, family);
    };

    // Node's Agent doesn't accept `lookup` in its constructor options, so we
    // wrap `createConnection` to fold `lookup` into every outgoing socket.
    const origCreateConnection = agent.createConnection.bind(agent);
    (agent as unknown as {
        createConnection: (opts: unknown, cb: unknown) => unknown;
    }).createConnection = (opts, cb) =>
        origCreateConnection({ ...(opts as object), lookup }, cb as never);

    return agent;
}
