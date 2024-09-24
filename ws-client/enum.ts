export enum ErrorCode {
  ok = 0,
  system_busy = 1,
  forbidden = 403,
  auth_failed = 514,
  internal_error = 1000040343,
  exceed_conn_limit = 1000040350,
}

export enum FrameType {
  control = 0,
  data = 1
}

export enum HeaderKey {
  type = "type",
  message_id = "message_id",
  sum = "sum",
  seq = "seq",
  trace_id = "trace_id",
  biz_rt = "biz_rt",
  handshake_status = "handshake-status",
  handshake_msg = "handshake-msg",
  handshake_autherrcode = "handshake-autherrcode",
}

export enum MessageType {
  event = "event",
  card = "card",
  ping = "ping",
  pong = "pong"
}

export enum HttpStatusCode {
  // 2xx Success
  ok = 200,
  // 5xx Server errors
  internal_server_error = 500,
}