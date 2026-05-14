import { Domain, Logger, LoggerLevel } from '@node-sdk/typings';
import { HttpInstance } from '@node-sdk/typings/http';

/**
 * Client-only WebSocket settings the Feishu server does not push. Server-
 * controlled values (ping interval, reconnect interval / count / nonce) keep
 * coming from `pullConnectConfig` and pong frames — those are not exposed
 * here.
 */
export interface WSConfigOverrides {
  /**
   * Seconds. Liveness watchdog: if no inbound message arrives within this
   * window after the last ping (or any prior server message), the
   * connection is considered dead and a reconnect is triggered. Unset =
   * disabled, preserving the original behavior of waiting for socket-level
   * errors.
   */
  pingTimeout?: number;
}

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
  /**
   * Milliseconds. Maximum time to wait for a WebSocket handshake (`open` /
   * `error` event) before aborting the attempt and letting the retry loop
   * try again. Unset = no client-side timeout; the handshake can hang
   * indefinitely on stuck DNS / proxy / NAT paths.
   */
  handshakeTimeoutMs?: number;
  /** Client-only WebSocket settings. See {@link WSConfigOverrides}. */
  wsConfig?: WSConfigOverrides;
}

/**
 * Current WebSocket lifecycle state, derived from internal flags.
 * Returned by {@link WSClient.getConnectionStatus}.
 */
export type WSConnectionState =
  | 'idle'
  | 'connecting'
  | 'connected'
  | 'reconnecting'
  | 'failed';

export interface WSConnectionStatus {
  state: WSConnectionState;
  /** ms timestamp of the most recent tryConnect attempt, if any. */
  lastConnectTime?: number;
  /** ms timestamp of the next scheduled reconnect attempt, if pending. */
  nextConnectTime?: number;
  /**
   * Consecutive reconnect attempts in the current loop. Resets to 0 on a
   * successful connect.
   */
  reconnectAttempts: number;
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
