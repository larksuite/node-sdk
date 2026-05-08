import { Domain, Logger, LoggerLevel } from '@node-sdk/typings';
import { HttpInstance } from '@node-sdk/typings/http';

export interface IConstructorParams {
  appId: string;
  appSecret: string;
  domain?: string | Domain;
  logger?: Logger;
  loggerLevel?: LoggerLevel;
  httpInstance?: HttpInstance;
  autoReconnect?: boolean;
  agent?: any;
  /** Caller tag appended to User-Agent as `source/<name>`. */
  source?: string;
  /** @internal Extra bare tokens appended to User-Agent, set by sub-modules. */
  extraUaTags?: string[];
  /** Fires once when the first WebSocket handshake succeeds. */
  onReady?: () => void;
  /**
   * Fires when the initial connect fails and the client either cannot retry
   * (autoReconnect=false) or exhausts `reconnectCount` retries. The callback
   * receives an Error describing the final failure.
   */
  onError?: (err: Error) => void;
  /** Fires when the client enters the reconnect loop (i.e., after a disconnect). */
  onReconnecting?: () => void;
  /** Fires after the reconnect loop successfully re-establishes the connection. */
  onReconnected?: () => void;
}

/**
 * Internal result type for connect attempts. `retryable: false` signals a
 * terminal failure (e.g. non-recoverable error code from pullConnectConfig)
 * — the caller must not enter or continue the reconnect loop.
 */
export type ConnectResult =
  | { ok: true }
  | { ok: false; retryable: true }
  | { ok: false; retryable: false; error: string };
