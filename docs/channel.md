# Channel module

`Channel` is a high-level module built on top of `WSClient` / `EventDispatcher` / `Client`. It bundles the chores of running a Feishu bot — transport, message normalization, safety policy, outbound sending, streaming replies, media upload, card interactions — so you can focus on the business logic.

**When to use Channel**: conversational bots (AI chat, streaming replies, interactive card buttons, media handling, mention-all policy, etc.). If you only need to receive a few events and do simple processing, `WSClient` + `EventDispatcher` is sufficient.

---

## Table of contents

- [Minimal example](#minimal-example)
- [`createLarkChannel` options](#createlarkchannel-options)
- [Event listening](#event-listening)
- [`NormalizedMessage` fields](#normalizedmessage-fields)
- [Sending messages](#sending-messages)
- [Streaming replies](#streaming-replies)
- [Low-level helpers](#low-level-helpers)
- [Error types](#error-types)
- [Normalization utilities (advanced)](#normalization-utilities-advanced)

---

## Minimal example

```typescript
import { createLarkChannel, LoggerLevel } from '@larksuiteoapi/node-sdk';

const channel = createLarkChannel({
    appId: process.env.FEISHU_APP_ID!,
    appSecret: process.env.FEISHU_APP_SECRET!,
    loggerLevel: LoggerLevel.info,
    policy: { requireMention: true, dmMode: 'open' },
});

channel.on('message', async (msg) => {
    await channel.send(
        msg.chatId,
        { markdown: `received: ${msg.content}` },
        { replyTo: msg.messageId },
    );
});

await channel.connect();
console.log(`connected as ${channel.botIdentity!.name}`);

process.on('SIGINT', async () => {
    await channel.disconnect();
    process.exit(0);
});
```

`connect()` completes the WebSocket handshake (15-second timeout) before resolving; once resolved, `channel.botIdentity` is populated. The WS connection auto-reconnects for the lifetime of the process, emitting `reconnecting` / `reconnected` events.

---

## `createLarkChannel` options

| Option | Type | Required | Description |
| --- | --- | --- | --- |
| `appId` / `appSecret` | string | yes | Feishu app credentials |
| `transport` | `'websocket' \| 'webhook'` | no | Event transport; defaults to `'websocket'` (long connection) |
| `webhook` | `WebhookOptions` | no | Webhook-mode `verificationToken` / `encryptKey` / `adapter` config |
| `policy` | `PolicyConfig` | no | `requireMention` / `dmMode` / `groupAllowlist` / `dmAllowlist` / `respondToMentionAll` |
| `safety` | `SafetyConfig` | no | Dedup window, stale threshold, per-chat serialization, batch merging |
| `outbound` | `OutboundConfig` | no | Chunk limits, stream throttling, SSRF allowlist, retry |
| `loggerLevel` / `logger` | - | no | Log level and custom logger |
| `cache` | `Cache` | no | Pluggable cache (used for dedup, token caching, etc.) |
| `domain` | `Domain \| string` | no | Domain (Feishu / Lark / custom) |
| `httpInstance` | `HttpInstance` | no | Custom http instance (inherited by the underlying Client) |
| `includeRawInMessage` | boolean | no | Whether to attach the raw event body on normalized messages (debug) |

See the `LarkChannelOptions` type for the full shape.

---

## Event listening

```typescript
channel.on('message',      async (msg) => { /* NormalizedMessage */ });
channel.on('cardAction',   async (evt) => { /* card button click */ });
channel.on('reaction',     (evt)       => { /* emoji reaction add/remove */ });
channel.on('botAdded',     (evt)       => { /* bot invited into a group */ });
channel.on('comment',      async (evt) => { /* doc comment mentioning the bot */ });
channel.on('reject',       (evt)       => { /* policy rejection */ });
channel.on('error',        (err)       => { /* inbound dispatcher error */ });
channel.on('reconnecting', ()          => { /* WebSocket reconnecting */ });
channel.on('reconnected',  ()          => { /* WebSocket reconnected */ });
```

**`reject` reasons** (`RejectReason`): `group_not_allowed`, `sender_not_allowed`, `no_mention`, `dm_disabled`, `mention_all_blocked`. Only policy-layer rejections emit; internal dedup (duplicate), stale detection, and concurrent-lock drops are silent by design.

**`error` event**: only carries inbound dispatcher exceptions. Outbound errors from `send()` / `stream()` throw `LarkChannelError` directly to the caller, they do **not** route through `on('error')`.

---

## `NormalizedMessage` fields

Payload for the `message` event. Feishu's various message types (text / post / image / file / audio / video / sticker / share_chat / share_user / merge_forward / ...) are converted into a uniform markdown + XML-style-tag format, so you don't need to parse the raw Feishu message structure yourself.

| Field | Type | Description |
| --- | --- | --- |
| `messageId` | string | Message id |
| `chatId` | string | Chat id |
| `chatType` | `'p2p' \| 'group'` | Direct message / group |
| `senderId` | string | Sender open_id (falls back to user_id / union_id when open_id is missing) |
| `senderName` | string? | Sender name (requires a `resolveSenderName` resolver) |
| `content` | string | Normalized content (markdown, media rendered as XML-style tags) |
| `rawContentType` | string | Original Feishu `msg_type` (e.g. `text`, `post`, `merge_forward`) |
| `resources` | `ResourceDescriptor[]` | Resources referenced in the message (image / file / audio / video / sticker) |
| `mentions` | `MentionInfo[]` | @ list (excludes bot itself) |
| `mentionAll` | boolean | Whether `@all` was used (falls back to a content-level scan for the `@_all` placeholder) |
| `mentionedBot` | boolean | Whether the bot itself was mentioned |
| `rootId` / `threadId` / `replyToMessageId` | string? | Thread / reply relationships |
| `createTime` | number | Millisecond timestamp |
| `raw` | unknown | Raw event body (only when `includeRawInMessage: true`) |

---

## Sending messages

`channel.send(chatId, input, options?)` — nine input variants:

```typescript
// Text-based
await channel.send(chatId, { text: 'plain text' });
await channel.send(chatId, { markdown: 'hello **world**' });
await channel.send(chatId, { post: rawPostJson });
await channel.send(chatId, { card: cardJsonV2 });

// Media (source accepts URL string, local path string, or Buffer)
await channel.send(chatId, { image: { source: 'https://example.com/a.jpg' } });
await channel.send(chatId, { image: { source: './fixtures/sample.png' } });
await channel.send(chatId, { file:  { source: buf, fileName: 'doc.pdf' } });
await channel.send(chatId, { audio: { source: buf, duration: 3000 } });
await channel.send(chatId, { video: { source: buf, duration: 5000, coverImageKey: 'img_xxx' } });

// Share / sticker
await channel.send(chatId, { shareChat: { chatId: 'oc_xxx' } });
await channel.send(chatId, { shareUser: { userId: 'ou_xxx' } });
await channel.send(chatId, { sticker: { fileKey: 'file_v3_xxx' } });
```

### `SendOptions`

```typescript
await channel.send(chatId, { markdown: 'please check' }, {
    replyTo: msg.messageId,                           // reply to a specific message
    replyInThread: true,                              // reply inside the thread
    mentions: msg.mentions.filter(m => !m.isBot),     // structured @ mentions
});
```

**Do not hand-write `@username` in the text.** Pass `MentionInfo[]` via `mentions` and the SDK will assemble the Feishu @ placeholders correctly.

### Automatic fallbacks

Outbound sending has two built-in fallbacks that are transparent to the caller:

- **Reply target revoked** (`target_revoked`) → drop `replyTo` and resend as a fresh message
- **Post schema rejected** (`format_error`) → fall back to a plain-text resend

If the fallback also fails (or the error isn't in the above categories), a `LarkChannelError` is thrown.

### Media `source` shapes

- **HTTP(S) URL string** — SDK downloads (with SSRF guard) then uploads
- **Local file path string** — read from disk directly
- **`Buffer`** — uploaded as-is

Audio / video need a `duration` (ms). The SDK will try to parse it from the Opus / MP4 header; if parsing fails, pass it explicitly.

---

## Streaming replies

Keep the call site non-streaming; the SDK owns throttling and the native typewriter animation (via cardkit v1):

```typescript
channel.on('message', async (msg) => {
    await channel.stream(msg.chatId, {
        markdown: async (s) => {
            for await (const chunk of llmStream(msg.content)) {
                await s.append(chunk);
            }
        },
    }, { replyTo: msg.messageId });
});
```

- A `"Thinking..."` placeholder card is sent before the first `append`.
- The server renders the typewriter animation (no client-side throttling needed).
- If the producer never produces anything → card shows `"(no content)"`.
- If the producer throws → card appends `"— (Generation interrupted)"` and the error propagates.

---

## Low-level helpers

```typescript
// Message-level
await channel.updateCard(messageId, newCardJson);
await channel.editMessage(messageId, newText);            // text / post messages only
await channel.recallMessage(messageId);

// Reactions
const reactionId = await channel.addReaction(messageId, 'THUMBSUP');
await channel.removeReaction(messageId, reactionId);                     // delete by id
const removed = await channel.removeReactionByEmoji(messageId, 'THUMBSUP'); // delete by emoji (returns boolean)

// Resource download
const buf = await channel.downloadResource(fileKey, 'image');

// Chat info
const info = await channel.getChatInfo(chatId);

// Runtime policy update
channel.updatePolicy({ groupAllowlist: ['oc_xxx'] });

// Escape hatch: call the underlying Client directly
await channel.rawClient.im.v1.chat.list({});
```

> **About reactions**: Feishu API constraint — a bot can only delete reactions it added. `addReaction` returns the `reaction_id` that the caller must stash if they want to remove it later, because the `im.message.reaction.*_v1` events do **not** carry `reaction_id`.

---

## Error types

All outbound failures throw `LarkChannelError` with a `code` field:

| Code | Trigger |
| --- | --- |
| `format_error` | Message schema validation failed |
| `target_revoked` | Reply target deleted / recalled |
| `permission_denied` | Auth failure / insufficient scope |
| `rate_limited` | Rate limiting (HTTP 429) |
| `send_timeout` | Send / connect timeout |
| `upload_failed` | Media upload failed (URL not downloadable, local path unreadable, Feishu API rejection, ...) |
| `ssrf_blocked` | URL blocked by the SSRF guard |
| `not_connected` | Send invoked before `connect()`, or connect itself failed with no more specific category |
| `unknown` | Uncategorized |

Auth failures during `connect()` are classified as `permission_denied` (not `not_connected`), so callers can distinguish "bad credentials" from "network unreachable".

---

## Normalization utilities (advanced)

For webhook-mode integrations, historical event replay, or custom event pipelines, the internal normalizers are exported as well:

```typescript
import {
    normalize,
    normalizeCardAction,
    normalizeReaction,
    normalizeBotAdded,
    normalizeComment,
    RawMessageEvent,
    NormalizeOptions,
} from '@larksuiteoapi/node-sdk';

const msg = await normalize(rawEvent, { botIdentity, stripBotMentions: true });
// `msg` is structurally equivalent to what `channel.on('message')` receives.
```

---

## Common issues

1. **Don't write `@username` as literal text** in replies — use the structured `SendOptions.mentions`.
2. **Group messages require @bot by default.** To receive all group messages, request `im:message.group_msg` (admin approval required).
3. **Card buttons not firing** is usually either a missing `card.action.trigger` subscription or a v1 card schema. V2 uses `column_set` → `column` → `button` with `behaviors: [{ type: 'callback', value }]`.
4. **Use `stream()`** for streaming output; don't loop `send()` / `updateCard()` by hand.
5. **Media upload** supports Buffer / local path / URL interchangeably; audio/video `duration` is auto-parsed from binary headers when possible.
6. **`connect()` waits for the real handshake** — 15-second timeout throws `not_connected`; runtime disconnects are auto-retried with corresponding events emitted.
7. **`reject` only fires on policy rejections.** Duplicate dedup, stale detection, and concurrency locks drop silently by design.
