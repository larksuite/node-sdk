import { Domain } from '@node-sdk/typings';
import WebSocket from 'ws';

interface IClientConfig {
  appId: string;
  appSecret: string;
  domain: string | Domain;
}

interface IWSConfig {
  connectUrl: string;
  pingInterval: number;
  reconnectCount: number;
  reconnectInterval: number;
  reconnectNonce: number;
  deviceId: string;
  serviceId: string;
  autoReconnect: boolean;
}

export class WSConfig {
  private client: IClientConfig = {
    appId: '',
    appSecret: '',
    domain: Domain.Feishu,
  }

  private ws: IWSConfig = {
    connectUrl: '',

    pingInterval: 120 * 1000,
    reconnectCount: -1,
    reconnectInterval: 120 * 1000,
    reconnectNonce: 30 * 1000,
  
    deviceId: '',
    serviceId: '',
  
    autoReconnect: true
  };

  private wsInstance: WebSocket | null = null;

  constructor() {}

  updateClient(clientConfig: Partial<IClientConfig>) {
    Object.assign(this.client, clientConfig);
  }

  updateWs(WSConfig: Partial<IWSConfig>) {
    Object.assign(this.ws, WSConfig);
  }

  getClient(): IClientConfig;
  getClient<T extends keyof IClientConfig>(key: T): IClientConfig[T];
  getClient<T extends keyof IClientConfig>(key?: T): IClientConfig | IClientConfig[T] {
    if (key === undefined) {
      return this.client;
    }
    return this.client[key];
  }

  getWS(): IWSConfig;
  getWS<T extends keyof IWSConfig>(key: T): IWSConfig[T];
  getWS<T extends keyof IWSConfig>(key?: T): IWSConfig | IWSConfig[T] {
    if (key === undefined) {
      return this.ws;
    }
    return this.ws[key];
  }

  get wsConfigUrl() {
    return `${this.getClient("domain")}/callback/ws/endpoint`;
  }

  setWSInstance(wsInstance: WebSocket | null) {
    this.wsInstance = wsInstance;
  }

  getWSInstance() {
    return this.wsInstance;
  }
}
