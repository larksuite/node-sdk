import { Cache } from '@node-sdk/typings';
import { mergeObject } from '@node-sdk/utils/merge-object';

export class SessionCache implements Cache {
  sessions: Map<string, Record<string, any>> = new Map();

  async set(key: string | Symbol, value: Record<string, any>) {
    const sessions = this.sessions.get(key.toString()) || {};
    const mergedSessions = mergeObject(sessions, value);
    this.sessions.set(key.toString(), mergedSessions);
    return true;
  }

  async get(key: string | Symbol) {
    return this.sessions.get(key.toString());
  }
}