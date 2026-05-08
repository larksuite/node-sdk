import qs from 'querystring';
import WebSocket from 'ws';
import { EventDispatcher } from '@node-sdk/dispatcher/event';
import { assert, formatDomain, buildUserAgent } from '@node-sdk/utils';
import { defaultLogger } from '@node-sdk/logger/default-logger';
import { LoggerProxy } from '@node-sdk/logger/logger-proxy';
import { Domain, Logger, LoggerLevel } from '@node-sdk/typings';
import defaultHttpInstance from '@node-sdk/http';
import { HttpInstance } from '@node-sdk/typings/http';
import * as protoBuf from './proto-buf';
import { WSConfig } from './ws-config';
import { DataCache } from './data-cache';
import { ErrorCode, FrameType, HeaderKey, HttpStatusCode, MessageType } from './enum';
import { pbbp2 } from './proto-buf/pbbp2';
import { IConstructorParams, ConnectResult } from './types';

export class WSClient {
  private wsConfig = new WSConfig();

  private logger: Logger;

  private dataCache: DataCache;

  private httpInstance: HttpInstance;

  private eventDispatcher?: EventDispatcher;

  private pingInterval?: NodeJS.Timeout;

  private reconnectInterval?: NodeJS.Timeout;

  private reconnectGeneration: number = 0;

  private isConnecting: boolean = false;

  private reconnectInfo = {
    lastConnectTime: 0,
    nextConnectTime: 0,
  }

  private agent?: any;

  /** User-supplied state-transition callbacks. All optional. */
  private onReady?: () => void;
  private onError?: (err: Error) => void;
  private onReconnecting?: () => void;
  private onReconnected?: () => void;

  private readonly userAgent: string;

  /** True if the WS has ever connected successfully in this client's
   *  lifetime — used to distinguish first-connect from reconnect. */
  private hasEverConnected = false;

  constructor(params: IConstructorParams) {
    const {
      appId,
      appSecret,
      agent,
      domain = Domain.Feishu,
      httpInstance = defaultHttpInstance,
      loggerLevel = LoggerLevel.info,
      logger = defaultLogger,
      autoReconnect = true,
      source,
      extraUaTags,
      onReady,
      onError,
      onReconnecting,
      onReconnected,
    } = params;

    this.userAgent = buildUserAgent(source, { extraTags: extraUaTags });

    this.logger = new LoggerProxy(loggerLevel, logger);

    assert(!appId, () => this.logger.error('appId is needed'));
    assert(!appSecret, () => this.logger.error('appSecret is needed'));

    this.agent = agent;
    this.dataCache = new DataCache({logger: this.logger});
    this.httpInstance = httpInstance;
    this.wsConfig.updateClient({
      appId,
      appSecret,
      domain: formatDomain(domain),
    });

    this.wsConfig.updateWs({
      autoReconnect
    })

    this.onReady = onReady;
    this.onError = onError;
    this.onReconnecting = onReconnecting;
    this.onReconnected = onReconnected;
  }

  /**
   * Invoke a user-supplied callback safely: no-op if undefined, swallow any
   * exception to avoid breaking the WS state machine.
   */
  private safeInvoke<A extends unknown[]>(
    label: string,
    fn: ((...args: A) => void) | undefined,
    ...args: A
  ): void {
    if (!fn) return;
    try {
      fn(...args);
    } catch (e) {
      this.logger.error(`[ws] ${label} callback threw`, e);
    }
  }

  private async pullConnectConfig(): Promise<ConnectResult> {
    const {
      appId,
      appSecret
    } = this.wsConfig.getClient();

    try {
      const {
        code,
        data: {
          URL,
          ClientConfig
        },
        msg
      } = await this.httpInstance.request({
        method: "post",
        url: this.wsConfig.wsConfigUrl,
        data: {
          AppID: appId,
          AppSecret: appSecret
        },
        // consumed by gateway
        headers: {
          "locale": "zh",
          "User-Agent": this.userAgent,
        },
        timeout: 15000,
      });

      if (code !== ErrorCode.ok) {
        const reason = code === ErrorCode.system_busy ? 'system busy' : msg;
        this.logger.error('[ws]', `code: ${code}, ${reason}`);
        if (code === ErrorCode.internal_error) {
          return { ok: false, retryable: true };
        }
        return {
          ok: false,
          retryable: false,
          error: `pullConnectConfig failed: code=${code}, msg=${reason}`,
        };
      }

      const {
        device_id,
        service_id
      } = qs.parse(URL);

      this.wsConfig.updateWs({
        connectUrl: URL,

        deviceId: device_id as string,
        serviceId: service_id as string,

        pingInterval: ClientConfig.PingInterval * 1000,
        reconnectCount: ClientConfig.ReconnectCount,
        reconnectInterval: ClientConfig.ReconnectInterval * 1000,
        reconnectNonce: ClientConfig.ReconnectNonce * 1000
      });

      this.logger.debug('[ws]', `get connect config success, ws url: ${URL}`);

      return { ok: true };
    } catch(e) {
      this.logger.error('[ws]', (e as any)?.message || 'system busy');
      return { ok: false, retryable: true };
    }
  }

  private connect() {
    const connectUrl = this.wsConfig.getWS('connectUrl');

    let wsInstance;

    try {
      const { agent } = this;
      wsInstance = new WebSocket(connectUrl, { agent });
    } catch(e) {
      this.logger.error('[ws]', 'new WebSocket error');
    }

    if (!wsInstance) {
      return Promise.resolve(false);
    }

    return new Promise((resolve) => {
      wsInstance.on('open', () => {
        this.logger.debug('[ws]', 'ws connect success');
        this.wsConfig.setWSInstance(wsInstance);
        this.pingLoop();
        resolve(true);
      });
      wsInstance.on('error', () => {
        this.logger.error('[ws]', 'ws connect failed')
        resolve(false);
      });
    });

  }

  private async reConnect(isStart: boolean = false) {
    if (this.isConnecting && !isStart) {
      this.logger.debug('[ws]', 'repeat connection');
      return;
    }

    this.isConnecting = true;

    // Invalidate any in-flight reconnect loops from previous sessions
    const currentGeneration = ++this.reconnectGeneration;

    const tryConnect = async (): Promise<ConnectResult> => {
      this.reconnectInfo.lastConnectTime = Date.now();
      const pullResult = await this.pullConnectConfig();
      if (!pullResult.ok) return pullResult;
      const connected = await this.connect();
      if (!connected) return { ok: false, retryable: true };
      this.communicate();
      return { ok: true };
    }

    if (this.pingInterval) {
      clearTimeout(this.pingInterval);
    }

    if (this.reconnectInterval) {
      clearTimeout(this.reconnectInterval);
    }

    const wsInstance = this.wsConfig.getWSInstance();

    if (isStart) {
      if (wsInstance) {
        wsInstance?.terminate();
      }
      let result: ConnectResult = { ok: false, retryable: true };
      try {
        result = await tryConnect();
      } finally {
        this.isConnecting = false;
      }
      if (result.ok) {
        this.hasEverConnected = true;
        this.safeInvoke('onReady', this.onReady);
      } else if (!result.retryable) {
        // Non-recoverable error from pullConnectConfig — bail out without retry.
        // Reset hasEverConnected so a subsequent start() is treated as a fresh
        // session (onReady fires, not onReconnected).
        this.hasEverConnected = false;
        this.safeInvoke('onError', this.onError, new Error(result.error));
        return;
      } else {
        this.logger.error('[ws]', 'connect failed');
        await this.reConnect();
      }
      this.logger.info('[ws]', 'ws client ready');
      return;
    }

    const { autoReconnect, reconnectNonce, reconnectCount, reconnectInterval } = this.wsConfig.getWS();

    if (!autoReconnect) {
      if (!this.hasEverConnected) {
        this.safeInvoke(
          'onError',
          this.onError,
          new Error('WebSocket connect failed and autoReconnect is disabled'),
        );
      }
      return;
    }

    this.logger.info('[ws]', 'reconnect');
    if (this.hasEverConnected) {
      this.safeInvoke('onReconnecting', this.onReconnecting);
    }

    if (wsInstance) {
      wsInstance?.terminate();
    }

    this.wsConfig.setWSInstance(null);

    const reconnectNonceTime = reconnectNonce ? reconnectNonce * Math.random() : 0
    this.reconnectInterval = setTimeout(async () => {
      (async function loopReConnect(this: WSClient, count: number) {
        // Stale loop — a newer reConnect session has started
        if (currentGeneration !== this.reconnectGeneration) {
          return;
        }

        count++;
        const result = await tryConnect();

        // Re-check after async operation in case a new session started
        if (currentGeneration !== this.reconnectGeneration) {
          return;
        }

        // if reconnectCount < 0, the reconnect time is infinite
        if (result.ok) {
          this.logger.debug('[ws]', 'reconnect success');
          if (this.hasEverConnected) {
            this.safeInvoke('onReconnected', this.onReconnected);
          } else {
            this.hasEverConnected = true;
            this.safeInvoke('onReady', this.onReady);
          }
          this.isConnecting = false;
          return;
        }

        if (!result.retryable) {
          // Non-recoverable error — abort the loop, do not schedule another attempt.
          // Reset hasEverConnected so a subsequent start() is treated as a fresh
          // session (onReady fires, not onReconnected).
          this.isConnecting = false;
          this.hasEverConnected = false;
          this.safeInvoke('onError', this.onError, new Error(result.error));
          return;
        }

        this.logger.info('ws', `unable to connect to the server after trying ${count} times")`);

        if (reconnectCount >= 0 && count >= reconnectCount) {
          this.isConnecting = false;
          this.safeInvoke(
            'onError',
            this.onError,
            new Error(`WebSocket reconnect exhausted after ${count} attempts`),
          );
          return;
        }

        this.reconnectInterval = setTimeout(() => {
          loopReConnect.bind(this)(count);
        }, reconnectInterval)
        this.reconnectInfo.nextConnectTime = Date.now() + reconnectInterval;
      }).bind(this)(0)
    }, reconnectNonceTime);
    this.reconnectInfo.nextConnectTime = Date.now() + reconnectNonceTime;
  }

  private pingLoop() {
    const {
      serviceId,
      pingInterval
    } = this.wsConfig.getWS();

    const wsInstance = this.wsConfig.getWSInstance();
    if (wsInstance?.readyState === WebSocket.OPEN) {
      const frame: pbbp2.IFrame = {
        headers: [{
          key: HeaderKey.type,
          value: MessageType.ping
        }],
        service: Number(serviceId),
        method: FrameType.control,
        SeqID: 0,
        LogID: 0
      };
      this.sendMessage(frame);
      this.logger.trace('[ws]', 'ping success');
    }

    this.pingInterval = setTimeout(this.pingLoop.bind(this), pingInterval);
  }

  private communicate() {
    const wsInstance = this.wsConfig.getWSInstance();

    wsInstance?.on('message', async (buffer: Uint8Array) => {
      const data = protoBuf.decode(buffer);
      const { method } = data;

      if (method === FrameType.control) {
        await this.handleControlData(data);
      }

      if (method === FrameType.data) {
        await this.handleEventData(data);
      }
    });

    wsInstance?.on('error', (e) => {
      this.logger.error('[ws]', 'ws error');
    });

    wsInstance?.on('close', () => {
      this.logger.debug('[ws]', 'client closed');
      this.reConnect();
    });

  }

  private async handleControlData(data: pbbp2.Frame) {
    const type = data.headers.find(item => item.key === HeaderKey.type)?.value;
    const payload = data.payload;

    if (type === MessageType.ping) {
      return;
    }

    if (type === MessageType.pong && payload) {
      this.logger.trace('[ws]', 'receive pong');
      const dataString = new TextDecoder("utf-8").decode(payload);
      const {
        PingInterval,
        ReconnectCount,
        ReconnectInterval,
        ReconnectNonce
      } = JSON.parse(dataString);

      this.wsConfig.updateWs({
        pingInterval: PingInterval * 1000,
        reconnectCount: ReconnectCount,
        reconnectInterval: ReconnectInterval * 1000,
        reconnectNonce: ReconnectNonce * 1000,
      });

      this.logger.trace('[ws]', 'update wsConfig with pong data');
    }
  }

  private async handleEventData(data: pbbp2.Frame) {
    const headers = data.headers.reduce((acc, cur) => {
      acc[cur.key] = cur.value;
      return acc;
    }, {} as Record<HeaderKey, string>);
    const { message_id, sum, seq, type, trace_id } = headers;
    const payload = data.payload;

    if (type !== MessageType.event) {
      return;
    }

    const mergedData = this.dataCache.mergeData({
      message_id,
      sum: Number(sum),
      seq: Number(seq),
      trace_id,
      data: payload
    });

    if (!mergedData) {
      return;
    }

    this.logger.debug('[ws]', `receive message, message_type: ${type}; message_id: ${message_id}; trace_id: ${trace_id}; data: ${mergedData.data}`);

    const respPayload: { code: number, data?: string } = {
      code: HttpStatusCode.ok,
    }

    const startTime = Date.now();
    try {
      const result = await this.eventDispatcher?.invoke(mergedData, { needCheck: false });
      if (result) {
        respPayload.data = Buffer.from(JSON.stringify(result)).toString("base64")
      }
    } catch (error) {
      respPayload.code = HttpStatusCode.internal_server_error;
      this.logger.error('[ws]', `invoke event failed, message_type: ${type}; message_id: ${message_id}; trace_id: ${trace_id}; error: ${error}`);
    }
    const endTime = Date.now();

    this.sendMessage({
      ...data,
      headers: [...data.headers, {key: HeaderKey.biz_rt, value: String(startTime - endTime)}],
      payload: new TextEncoder().encode(JSON.stringify(respPayload))
    })
  }

  private sendMessage(data: pbbp2.IFrame) {
    const wsInstance = this.wsConfig.getWSInstance();
    if (wsInstance?.readyState === WebSocket.OPEN) {
      const resp = pbbp2.Frame.encode(data).finish();
      this.wsConfig.getWSInstance()?.send(resp,(err) => {
        if (err) {
          this.logger.error('[ws]', 'send data failed');
        }
      });
    }
  }

  getReconnectInfo() {
    return this.reconnectInfo;
  }

  /**
   * close connection
   * @param params close params
   * @param params.force whether force close (use terminate instead of close)
   */
  close(params: { force?: boolean } = {}) {
    const { force = false } = params;
    // Invalidate any in-flight reconnect loops
    this.reconnectGeneration++;
    if (this.pingInterval) {
      clearTimeout(this.pingInterval);
      this.pingInterval = undefined;
    }
    if (this.reconnectInterval) {
      clearTimeout(this.reconnectInterval);
      this.reconnectInterval = undefined;
    }
    this.isConnecting = false;
    const wsInstance = this.wsConfig.getWSInstance();
    if (wsInstance) {
      wsInstance.removeAllListeners();
      if (force) {
        wsInstance.terminate();
      } else {
        wsInstance.close();
      }
      this.wsConfig.setWSInstance(null);
    }
    this.logger.info('[ws]', `ws client closed manually${force ? ' (force)' : ''}`);
  }

  async start(params: { eventDispatcher: EventDispatcher }) {
    const { appId } = this.wsConfig.getClient();
    if (!/^cli_[0-9a-fA-F]{16}$/.test(appId)) {
      this.logger.error('[ws]', `invalid appId: ${appId}`);
      return;
    }

    const { eventDispatcher } = params;
    if (!eventDispatcher) {
      this.logger.warn('[ws]', 'client need to start with a eventDispatcher');
      return;
    }

    this.logger.info(
      '[ws]',
      `receive events or callbacks through persistent connection only available in self-build & Feishu app, Configured in:
        Developer Console(开发者后台)
          ->
        Events and Callbacks(事件与回调)
          ->
        Mode of event/callback subscription(订阅方式)
          ->
        Receive events/callbacks through persistent connection(使用 长连接 接收事件/回调)`
    );

    this.eventDispatcher = eventDispatcher;
    this.reConnect(true);
  }
}