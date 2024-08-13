import { Client } from '@node-sdk/client/client';
import { IRequestOptions } from '@node-sdk/client/types';
import { Cache, Logger } from '@node-sdk/typings';
import { CAilySessionRecord } from '@node-sdk/consts';
import { SessionCache } from './session-cache';

type ElementType<T> = T extends (infer U)[] ? U : T;
type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
type TClientInstance = typeof Client extends new (...args: any[]) => infer R ? R : any;
type TPickParams<T extends (...args: any) => any > = Exclude<Parameters<T>['0'], undefined>;
type TCreateSessionParams = TPickParams<TClientInstance['aily']['v1']['ailySession']['create']>;
type TCreateMessageParams = TPickParams<TClientInstance['aily']['v1']['ailySessionAilyMessage']['create']>;
type TCreateRunParams = TPickParams<TClientInstance['aily']['v1']['ailySessionRun']['create']>;
type TMessage = ElementType<Exclude<Exclude<UnpackPromise<ReturnType<TClientInstance['aily']['v1']['ailySessionAilyMessage']['list']>>['data'], undefined>['messages'], undefined>>;

interface ICreateParams {
  // session
  sessionId?: string;
  sessionInfo?: TCreateSessionParams['data'];
  // message
  message: string;
  messageInfo?: Omit<TCreateMessageParams['data'], 'idempotent_id' | 'content_type' | 'content'>;
  // run
  ailyAppId: string;
  skillId?: string;
  runInfo?: Omit<TCreateRunParams['data'], 'app_id' | 'skill_id'>;
}

export enum EExecStatus {
  ERROR = -1,
  SUCCESS = 0,
  EXPIRED = 1,
  CANCELLED = 2,
  FAILED = 3,
  OTHER = 4
}

export class Aily {
  client: Client;
  cache: Cache;
  logger: Logger;

  constructor(params: { client: Client, cache?: Cache }) {
    this.client = params.client;
    this.logger = params.client.logger;
    this.cache = params.cache || new SessionCache();
  }

  private async getSessionId(params: { sessionId?: string, payload?:TCreateSessionParams['data'], options?: IRequestOptions }) {
    const { sessionId, payload, options } = params;
    
    const records = await this.getRecords() as Record<string, string>;
    if (sessionId && sessionId in records) {
      return records[sessionId];
    }

    const ailySession = await this.client.aily.v1.ailySession.create({ data: payload }, options);
    if (ailySession.code === 0 && ailySession.data) {
      const ailySessionId = ailySession.data.session?.id;
      if (sessionId) {
        await this.updateRecords({[sessionId]: ailySessionId!});
      }
      return ailySessionId;
    } else {
      this.logger.error('get aily session id error', ailySession.msg);
      return undefined;
    }
  }

  private async waitReply(params: ICreateParams, options?: IRequestOptions) {
    const { sessionId, ailyAppId, message, sessionInfo, messageInfo, runInfo, skillId } = params;

    // step1 get aily session id
    const ailySessionId = await this.getSessionId({ sessionId, payload: sessionInfo, options});
    if (!ailySessionId) {
      throw EExecStatus.ERROR;
    }

    // step2 create message and run
    const ailySessionMessage = await this.client.aily.v1.ailySessionAilyMessage.create({
      path: {
        aily_session_id: ailySessionId
      },
      data: {
        ...messageInfo,
        content: message,
        idempotent_id: `${Date.now()}`,
        content_type: 'MDX',
      }
    }, options);
    if (!(ailySessionMessage.code === 0 && ailySessionMessage.data)) {
      this.logger.error('create aily message error', ailySessionMessage.msg);
      throw EExecStatus.ERROR;
    }

    const messageId = ailySessionMessage.data.message?.id;

    const ailySessionRun = await this.client.aily.v1.ailySessionRun.create({
      path: {
        aily_session_id: ailySessionId
      },
      data: {
        app_id: ailyAppId,
        skill_id: skillId,
        ...runInfo
      }
    }, options);
    if (!(ailySessionRun.code === 0 && ailySessionRun.data)) {
      this.logger.error('create aily session run error', ailySessionRun.msg);
      throw EExecStatus.ERROR;
    }
    const runId = ailySessionRun.data.run?.id;
    if (!runId) {
      this.logger.error('run id is empty');
      throw EExecStatus.ERROR;
    }

    // step3 wait run complete
    const polling = async () => {
      return new Promise((resolve) => {
        setTimeout(async () => {
          const runStatusInfo = await this.client.aily.v1.ailySessionRun.get({
            path: {
              aily_session_id: ailySessionId,
              run_id: runId
            }
          }, options);

          if (!(runStatusInfo.code === 0 && runStatusInfo.data)) {
            resolve(3);
            return;
          }
      
          const status = runStatusInfo.data?.run?.status;

          switch(status) {
            case 'QUEUED':
            case 'IN_PROGRESS': await (async () => {
              const ret = await polling();
              resolve(ret);
            })();
            case 'COMPLETED': resolve(EExecStatus.SUCCESS);
            case 'EXPIRED': resolve(EExecStatus.EXPIRED);
            case 'CANCELLED': resolve(EExecStatus.CANCELLED);
            case 'FAILED': resolve(EExecStatus.FAILED);
            default: resolve(EExecStatus.OTHER)
          }
        }, 500)
      });
    }

    const pollingRet = await polling();
    if (pollingRet !== EExecStatus.SUCCESS) {
      this.logger.error('aily run error');
      throw pollingRet;
    }

    return {
      ailySessionId,
      runId,
      messageId
    }
  }

  private async create(params: ICreateParams, options?: IRequestOptions) {
    const {
      ailySessionId,
      runId
    } = await this.waitReply(params, options);

    let reply: TMessage | undefined;
    for await (const items of await this.client.aily.v1.ailySessionAilyMessage.listWithIterator({
      path: {
        aily_session_id: ailySessionId,
      },
      params: {
        run_id: runId,
        with_partial_message: false,
      }
    }, options)) {
      if(!items) {
        continue;
      }
      items?.messages?.forEach(message => {
        if (message.sender?.sender_type === 'ASSISTANT') {
          reply = message;
        }
      })
    } 
    if (!reply) {
      this.logger.error('no aily reply');
      throw EExecStatus.ERROR;
    }

    return reply;
  }

  private async createWithStream(params: ICreateParams, options?: IRequestOptions) {
    const {
      ailySessionId,
      runId,
      messageId
    } = await this.waitReply(params, options);

    const listMessages = () => this.client.aily.v1.ailySessionAilyMessage.listWithIterator({
      path: {
        aily_session_id: ailySessionId,
      },
      params: {
        run_id: runId,
        with_partial_message: true,
      }
    }, options);

    let startOutput = false;
    const Iterable = {
      async *[Symbol.asyncIterator]() {
        for await (const items of await listMessages()) {
          if(!items) {
            continue;
          }

          for (const message of items.messages || []) {
            if (startOutput) {
              yield message;

              if (message.status === 'COMPLETED') {
                return;
              }
            } else if (message.id === messageId && message.status === 'COMPLETED') {
              startOutput = true;
            }
          }
        }
      }
    }

    return Iterable;
  }

  private async getRecords() {
    const sessions = await this.cache.get(CAilySessionRecord) || {};
    return sessions;
  }

  private async updateRecords(records: Record<string , string>) {
    await this.cache.set(CAilySessionRecord, records);
  }

  completions = {
    create: this.create.bind(this),
    createWithStream: this.createWithStream.bind(this),
    sessionRecords: {
      get: this.getRecords.bind(this),
      update: this.updateRecords.bind(this)
    }
  }
}