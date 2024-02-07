import qs from 'querystring';
import WebSocket from 'ws';
import get from 'lodash.get';
import { EventDispatcher } from '@node-sdk/dispatcher/event';
import { assert, formatDomain } from '@node-sdk/utils';
import { defaultLogger } from '@node-sdk/logger/default-logger';
import { LoggerProxy } from '@node-sdk/logger/logger-proxy';
import { Domain, Logger, LoggerLevel } from '@node-sdk/typings';
import { HttpInstance } from '@node-sdk/typings/http';
import defaultHttpInstance from '@node-sdk/http';
import * as protoBuf from './proto-buf';
import { WSConfig } from './ws-config';
import { DataCache } from './data-cache';
import { ErrorCode, FrameType, HeaderKey, MessageType } from './enum';
import { pbbp2 } from './proto-buf/pbbp2';

interface IConstructorParams {
  appId: string;
  appSecret: string;
  domain?: string | Domain;
  logger?: Logger;
  loggerLevel?: LoggerLevel;
  httpInstance?: HttpInstance;
  autoReconnect?: boolean;
}

export class WSClient {
  private wsConfig = new WSConfig();

  private logger: Logger;

  private dataCache: DataCache;

  private httpInstance: HttpInstance;

  private eventDispatcher?: EventDispatcher;

  constructor(params: IConstructorParams) {
    const { 
      appId, 
      appSecret, 
      domain = Domain.Feishu, 
      httpInstance = defaultHttpInstance,
      loggerLevel = LoggerLevel.info,
      logger = defaultLogger,
      autoReconnect = true
    } = params;

    this.logger = new LoggerProxy(loggerLevel, logger);
    
    assert(!appId, () => this.logger.error('appId is needed'));
    assert(!appSecret, () => this.logger.error('appSecret is needed'));
    
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
  }  

  private async pullConnectConfig() {
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
        }
      });

      if (code !== ErrorCode.ok) {
        this.logger.error('[ws]', `code: ${code}, ${code === ErrorCode.system_busy ? msg : 'system busy'}`);
        if (code === ErrorCode.system_busy || code === ErrorCode.internal_error) {
          return false;
        }
      }

      const {
        device_id,
        service_id
      } = qs.parse(URL);

      this.wsConfig.updateWs({
        connectUrl: URL,
        
        deviceId: device_id as string,
        serviceId: service_id as string,

        pingInterval: ClientConfig.PingInterval,
        reconnectCount: ClientConfig.ReconnectCount,
        reconnectInterval: ClientConfig.ReconnectInterval,
        reconnectNonce: ClientConfig.ReconnectNonce
      });

      this.logger.debug('[ws]', `get connect config success, ws url: ${URL}`);

      return true;
    } catch(e) {
      this.logger.error('[ws]', get(e, 'message', 'system busy'));
      return false;
    }
  }

  private connect() {
    const connectUrl = this.wsConfig.getWS('connectUrl');
    const wsInstance = new WebSocket(connectUrl);

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
    const tryConnect = () => {
      return this.pullConnectConfig()
        .then(isSuccess => isSuccess ? this.connect() : Promise.resolve(false))
        .then(isSuccess => {
          if (isSuccess) {
            this.communicate();
            return Promise.resolve(true);
          }
          return Promise.resolve(false);
        })
    }

    if (isStart) {
      const isSuccess = await tryConnect();
      if (!isSuccess) {
        this.logger.error('[ws]', 'connect failed');
        await this.reConnect();
      }
      this.logger.info('[ws]', 'ws client ready');
      return;
    }

    const wsInstance = this.wsConfig.getWSInstance();
    const { autoReconnect, reconnectNonce, reconnectCount, reconnectInterval } = this.wsConfig.getWS();
    
    if (!autoReconnect) {
      return;
    }

    this.logger.info('[ws]', 'reconnect');
    
    if (wsInstance) {
      wsInstance?.terminate();
    }
    
    this.wsConfig.setWSInstance(null);

    setTimeout(async () => {
      (async function loopReConnect(this: WSClient, count: number) {
        count++;
        const isSuccess = await tryConnect();
        // if reconnectCount < 0, the reconnect time is infinite
        if (isSuccess) {
          this.logger.debug('[ws]', 'reconnect success');
          return;
        }

        this.logger.info('ws', `unable to connect to the server after trying ${count} times")`);

        if (reconnectCount >= 0 && count >= reconnectCount) {
          return;
        }

        setTimeout(() => {
          loopReConnect.bind(this)(count);
        }, reconnectInterval)
      }).bind(this)(0)
    }, reconnectNonce ? reconnectNonce * Math.random() : 0);
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

    setTimeout(this.pingLoop.bind(this), pingInterval);
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
        pingInterval: PingInterval,
        reconnectCount: ReconnectCount,
        reconnectInterval: ReconnectInterval,
        reconnectNonce: ReconnectNonce,
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

    const startTime = Date.now();
    await this.eventDispatcher?.invoke(mergedData, { needCheck: false });
    const endTime = Date.now();

    this.sendMessage({
      ...data,
      headers: [...data.headers, {key: HeaderKey.biz_rt, value: String(startTime - endTime)}],
      payload: new TextEncoder().encode(JSON.stringify({
        // http code
        code: 200
      }))
    })
  }

  private sendMessage(data: pbbp2.IFrame) {
    const wsInstance = this.wsConfig.getWSInstance();
    if (wsInstance?.readyState === WebSocket.OPEN) {
      const resp = pbbp2.Frame.encode(data).finish();
      this.wsConfig.getWSInstance()?.send(resp, (err) => {
        if (err) {
          this.logger.error('[ws]', 'send data failed');
        }
      });
    }
  }

  async start(params: { eventDispatcher: EventDispatcher }) {
    this.logger.info(
      '[ws]',
      `receive events through persistent connection only available in self-build & Feishu app, Configured in:
        Developer Console(开发者后台) 
          ->
        Events and Callbacks(事件配置)
          -> 
        Mode of event subscription(配置订阅方式)
          -> 
        Receive events through persistent connection(使用长连接接收事件)`
    );

    const { eventDispatcher } = params;

    if (!eventDispatcher) {
      this.logger.warn('[ws]', 'client need to start with a eventDispatcher');
      return;
    }
    this.eventDispatcher = eventDispatcher;
    this.reConnect(true);
  }
}