/** Configuration errors are terminal and must not enter the reconnect loop. */
export class ConnectionConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConnectionConfigError';
  }
}

/** Reject empty values and URLs/paths; leave address validation to the transport. */
export function validateConnectionHost(host: string | undefined): void {
  if (host === undefined) return;
  if (typeof host !== 'string' || !host.trim() || host.includes('/') || host.includes('?')) {
    throw new ConnectionConfigError('invalid websocket connection host');
  }
}

/** Copy handshake headers, keeping protocol-owned fields under SDK control. */
export function snapshotConnectionHeaders(headers?: Readonly<Record<string, string>>): Record<string, string> {
  const snapshot = { ...headers };
  for (const name of Object.keys(snapshot)) {
    const lower = name.toLowerCase();
    if (['host', 'connection', 'upgrade'].includes(lower) || lower.startsWith('sec-websocket-')) {
      throw new ConnectionConfigError('invalid websocket connection headers');
    }
  }
  // Pass other header names/values through without SDK format checks.
  return snapshot;
}

/** Replace only authority, retaining raw path/query and the original ws/wss scheme. */
export function buildConnectionUrl(endpoint: string, host?: string): string {
  if (host === undefined) return endpoint;
  try {
    const match = /^(wss?):\/\/([^/?#]+)([^#]*)$/.exec(endpoint);
    const parsed = new URL(endpoint);
    if (!match || !parsed.hostname || match[2].includes('@')) throw new Error();
    return `${match[1]}://${host}${match[3]}`;
  } catch {
    throw new ConnectionConfigError('invalid websocket connection endpoint');
  }
}
