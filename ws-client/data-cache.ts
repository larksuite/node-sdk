import { Logger } from '@node-sdk/typings';

export class DataCache {
  cache: Map<string, {
    buffer: Uint8Array[],
    trace_id: string,
    message_id: string,
    create_time: number
  }>

  logger?: Logger;
  
  constructor(params: {
    logger?: Logger;
  }) {
    this.cache = new Map();
    this.logger = params.logger;
    this.clearAtInterval();
  }

  mergeData(params: {
    message_id: string;
    sum: number;
    seq: number;
    trace_id: string;
    data: Uint8Array;
  }) {
    const { message_id, sum, seq, trace_id, data } = params;

    const cache = this.cache.get(message_id);    
    if (!cache) {
      const buffer = new Array(sum).fill(undefined);
      buffer[seq] = data;
      this.cache.set(message_id, {
        buffer,
        trace_id,
        message_id,
        create_time: Date.now()
      });
    } else {
      cache.buffer[seq] = data;
    }

    const mergedCache = this.cache.get(message_id);
    if (mergedCache?.buffer.every(item => !!item)) {
      const mergedBuffer = mergedCache.buffer.reduce((acc, cur) => {
        const combined = new Uint8Array(acc.byteLength + cur.byteLength);
        combined.set(acc, 0);
        combined.set(cur, acc.length);
  
        return combined;
      }, new Uint8Array([]));

      const string = new TextDecoder("utf-8").decode(mergedBuffer);
      const data = JSON.parse(string);
      
      this.deleteCache(message_id);
      
      return data;
    }
    
    return null;
  }

  private deleteCache(message_id: string) {
    this.cache.delete(message_id);
  }

  private clearAtInterval() {
    // magic number，10s expired
    const clearIntervalMs = 10000;
    setInterval(() => {
      const now = Date.now();
      this.cache.forEach((value, key) => {
        const { create_time, trace_id, message_id } = value;
        if (now - create_time > clearIntervalMs) {
          this.logger?.debug(`${message_id} event data is deleted as expired, trace_id: ${trace_id}`);
          this.deleteCache(key);
        }
      });
    }, clearIntervalMs);
  }
}

