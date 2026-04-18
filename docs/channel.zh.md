# Channel 模块

`Channel` 是在 `WSClient` / `EventDispatcher` / `Client` 之上封装的**高层模块**，把飞书机器人接入过程中的传输、消息归一化、安全策略、出站发送、流式回复、媒体上传、卡片交互等杂活封装好，使用者只需要专注业务逻辑。

**什么时候用 Channel**：需要做会话式机器人（AI 对话、流式回复、卡片按钮、媒体上传、@所有人策略等）时。若只是收少量事件做简单处理，`WSClient` + `EventDispatcher` 组合已经够用。

---

## 目录

- [最小示例](#最小示例)
- [`createLarkChannel` 参数](#createlarkchannel-参数)
- [事件监听](#事件监听)
- [`NormalizedMessage` 字段](#normalizedmessage-字段)
- [发送消息](#发送消息)
- [流式回复](#流式回复)
- [底层能力](#底层能力)
- [错误类型](#错误类型)
- [归一化工具（高级用法）](#归一化工具高级用法)

---

## 最小示例

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
        { markdown: `收到：${msg.content}` },
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

`connect()` 会完成 WebSocket 握手（15 秒超时），成功后 `channel.botIdentity` 可用。进程存活期间自动重连并 emit `reconnecting` / `reconnected` 事件。

---

## `createLarkChannel` 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `appId` / `appSecret` | string | 是 | 飞书应用凭据 |
| `transport` | `'websocket' \| 'webhook'` | 否 | 事件传输方式，默认 `'websocket'`（长连接） |
| `webhook` | `WebhookOptions` | 否 | Webhook 模式下的 `verificationToken` / `encryptKey` / `adapter` 配置 |
| `policy` | `PolicyConfig` | 否 | 策略：`requireMention` / `dmMode` / `groupAllowlist` / `dmAllowlist` / `respondToMentionAll` |
| `safety` | `SafetyConfig` | 否 | 去重窗口、stale 阈值、chatQueue 串行化、批量合并等 |
| `outbound` | `OutboundConfig` | 否 | 出站策略：分片上限、流式节流、SSRF 白名单、重试次数等 |
| `loggerLevel` / `logger` | - | 否 | 日志级别与自定义 logger |
| `cache` | `Cache` | 否 | 可插拔缓存（用于去重、token 缓存等） |
| `domain` | `Domain \| string` | 否 | 域名（飞书 / Lark / 海外自定义） |
| `httpInstance` | `HttpInstance` | 否 | 自定义 http 实例（继承自底层 Client） |
| `includeRawInMessage` | boolean | 否 | 是否在归一化消息里携带原始事件体（调试用） |

完整配置项见 `LarkChannelOptions` 类型定义。

---

## 事件监听

```typescript
channel.on('message',      async (msg) => { /* NormalizedMessage */ });
channel.on('cardAction',   async (evt) => { /* 卡片按钮点击 */ });
channel.on('reaction',     (evt)       => { /* emoji 表态增减 */ });
channel.on('botAdded',     (evt)       => { /* bot 被拉进群 */ });
channel.on('comment',      async (evt) => { /* 文档内 @bot 评论 */ });
channel.on('reject',       (evt)       => { /* 策略拦截 */ });
channel.on('error',        (err)       => { /* 入站 dispatcher 异常 */ });
channel.on('reconnecting', ()          => { /* WebSocket 重连中 */ });
channel.on('reconnected',  ()          => { /* WebSocket 重连成功 */ });
```

**`reject` 事件的触发原因**（`RejectReason`）：`group_not_allowed`、`sender_not_allowed`、`no_mention`、`dm_disabled`、`mention_all_blocked`。只有策略层拦截才 emit；内部去重（duplicate）、过期（stale）、并发锁属于静默丢弃。

**`error` 事件**：只携带入站 dispatcher 处理异常。`send()` / `stream()` 的出站错误直接向调用方抛 `LarkChannelError`，不走 `on('error')`。

---

## `NormalizedMessage` 字段

`message` 事件的 payload。飞书各种消息类型（text / post / image / file / audio / video / sticker / share_chat / share_user / merge_forward 等）都会被转换成统一的 markdown + XML-style 标签格式，开发者不需要自己解析飞书原生消息结构。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `messageId` | string | 消息 ID |
| `chatId` | string | 会话 ID |
| `chatType` | `'p2p' \| 'group'` | 单聊 / 群聊 |
| `senderId` | string | 发送者 open_id（缺省时回落到 user_id / union_id） |
| `senderName` | string? | 发送者名字（需要 `resolveSenderName` 解析器配合） |
| `content` | string | 归一化后的文本内容（markdown 格式，媒体用 XML-style 标签表示） |
| `rawContentType` | string | 飞书原始 msg_type（如 `text`、`post`、`merge_forward`） |
| `resources` | `ResourceDescriptor[]` | 消息里引用的资源（image / file / audio / video / sticker） |
| `mentions` | `MentionInfo[]` | @ 列表（不含 bot 自己） |
| `mentionAll` | boolean | 是否 @所有人（会自动从 content 兜底识别 `@_all` 占位符） |
| `mentionedBot` | boolean | 是否 @了 bot 本身 |
| `rootId` / `threadId` / `replyToMessageId` | string? | 话题 / 回复关系 |
| `createTime` | number | 毫秒时间戳 |
| `raw` | unknown | 原始事件体（仅当 `includeRawInMessage: true`） |

---

## 发送消息

`channel.send(chatId, input, options?)` —— 9 种 input 类型：

```typescript
// 基础文本类
await channel.send(chatId, { text: 'plain text' });
await channel.send(chatId, { markdown: 'hello **world**' });
await channel.send(chatId, { post: rawPostJson });
await channel.send(chatId, { card: cardJsonV2 });

// 媒体（source 支持 URL 字符串、本地路径字符串、或 Buffer）
await channel.send(chatId, { image: { source: 'https://example.com/a.jpg' } });
await channel.send(chatId, { image: { source: './fixtures/sample.png' } });
await channel.send(chatId, { file:  { source: buf, fileName: 'doc.pdf' } });
await channel.send(chatId, { audio: { source: buf, duration: 3000 } });
await channel.send(chatId, { video: { source: buf, duration: 5000, coverImageKey: 'img_xxx' } });

// 分享类
await channel.send(chatId, { shareChat: { chatId: 'oc_xxx' } });
await channel.send(chatId, { shareUser: { userId: 'ou_xxx' } });
await channel.send(chatId, { sticker: { fileKey: 'file_v3_xxx' } });
```

### `SendOptions`

```typescript
await channel.send(chatId, { markdown: 'please check' }, {
    replyTo: msg.messageId,                 // 回复目标消息
    replyInThread: true,                    // 在话题内回复
    mentions: msg.mentions.filter(m => !m.isBot),  // 结构化 @
});
```

**不要在文本里手写 `@用户名`**——请用 `mentions` 结构化传入 `MentionInfo[]`，SDK 负责正确拼装 Feishu 的 @ 占位符。

### 自动降级

出站发送内置两条自动降级：

- **回复目标已撤销**（`target_revoked`）→ 自动去掉 `replyTo`，重发为普通消息
- **post 结构校验失败**（`format_error`）→ 自动降级为纯文本重发

这两条对调用方透明。如果降级后仍然失败（或错误原因不在上述范围），向调用方抛出 `LarkChannelError`。

### 媒体 `source` 支持的形态

- **HTTP(S) URL 字符串**：SDK 会下载（带 SSRF 防护）再上传
- **本地文件路径字符串**：直接读文件
- **`Buffer`**：直接上传

音频 / 视频需要提供 `duration`（毫秒）。SDK 会尝试从 Opus / MP4 文件头解析；解析失败需要调用方显式传入。

---

## 流式回复

调用方保持非流式的写法，由 SDK 接管节流和原生打字机动画（基于 cardkit v1）：

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

- 首次 `append` 前自动发 "Thinking..." 占位卡片
- 服务端渲染打字机动画（无需客户端自己节流）
- producer 未产出任何内容 → 卡片显示 "(no content)"
- producer 抛错 → 卡片追加 "— (Generation interrupted)" 并向上抛出

---

## 底层能力

```typescript
// 消息级
await channel.updateCard(messageId, newCardJson);
await channel.editMessage(messageId, newText);           // 仅文本 / 富文本消息
await channel.recallMessage(messageId);

// reaction
const reactionId = await channel.addReaction(messageId, 'THUMBSUP');
await channel.removeReaction(messageId, reactionId);                    // 按 id 删
const removed = await channel.removeReactionByEmoji(messageId, 'THUMBSUP'); // 按 emoji 删（返回 boolean）

// 资源下载
const buf = await channel.downloadResource(fileKey, 'image');

// 群信息
const info = await channel.getChatInfo(chatId);

// 运行时改策略
channel.updatePolicy({ groupAllowlist: ['oc_xxx'] });

// 逃生舱：直接调底层 Client
await channel.rawClient.im.v1.chat.list({});
```

> **关于 reaction**：飞书 API 约束——bot 只能删自己添加的 reaction。`addReaction` 返回的 `reaction_id` 需要业务方自己保存，因为 `im.message.reaction.*_v1` 事件里并不携带 `reaction_id`。

---

## 错误类型

所有出站调用失败都会抛 `LarkChannelError`，包含 `code` 字段：

| code | 触发场景 |
| --- | --- |
| `format_error` | 消息格式校验失败 |
| `target_revoked` | 回复目标已删除 / 撤回 |
| `permission_denied` | 鉴权失败 / 权限不足 |
| `rate_limited` | 限流（HTTP 429） |
| `send_timeout` | 发送 / 连接超时 |
| `upload_failed` | 媒体上传失败（URL 无法下载、本地路径读不到、Feishu API 报错等） |
| `ssrf_blocked` | URL 被 SSRF 防护拦截 |
| `not_connected` | `connect()` 之前调用发送，或连接阶段失败（无法归类到具体错误） |
| `unknown` | 未分类错误 |

`connect()` 阶段的鉴权错误会被分类到 `permission_denied`（而非 `not_connected`），便于调用方区分"凭据错"和"网络不通"。

---

## 归一化工具（高级用法）

对于 Webhook 模式、历史事件回放、或自定义事件处理链路，Channel 把内部的归一化函数也一并 export：

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
// msg 与 channel.on('message') 中的 NormalizedMessage 等价
```

---

## 常见问题

1. **不要在回复文本里写 `@用户名`**——用 `SendOptions.mentions` 结构化传
2. **群消息默认需要 @bot** 才触发；想响应所有群消息需要 `im:message.group_msg`（管理员审批）
3. **卡片按钮不响应**通常是：没加 `card.action.trigger` 订阅 / 卡片用了 V1 schema（需要 V2：`column_set` → `column` → `button` 的 `behaviors: [{ type: 'callback', value }]` 结构）
4. **流式用 `stream()`**，不要手动反复 `send()` / `updateCard()` 模拟
5. **媒体上传**：Buffer / 本地路径 / URL 三种都支持；音视频 `duration` 不传会从二进制头部尝试解析
6. **`connect()` 会等真实握手**，15 秒超时抛 `not_connected`；运行期断连自动重连 + emit 相应事件
7. **`reject` 事件只在策略拦截时触发**；去重 / 过期 / 并发锁是静默丢弃，不走 reject
