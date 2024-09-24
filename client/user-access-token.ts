import get from 'lodash.get';
import { CUserAccessToken } from '@node-sdk/consts';
import { mergeObject } from '@node-sdk/utils/merge-object';
import type { Client } from './client';

interface ITokenInfo {
  code?: string;
  token?: string;
  refreshToken?: string;
  expiredTime?: number;
}

export class UserAccessToken {
  client: Client;

  constructor(params: { client: Client }) {
    this.client = params.client;
  }

  private getCacheKey(key: string, options: { namespace?: string }) {
    const namespace = get(options, 'namespace', this.client.appId);
    return `${namespace}/${CUserAccessToken.toString()}/${key}`;
  }

  // the unit of time is seconds
  private calibrateTime(time?: number) {
    // Due to the time-consuming network, the time needs to be 3 minutes earlier
    return new Date().getTime() + (time || 0) * 1000 - 3 * 60 * 1000;
  }

  async initWithCode(key2Code: Record<string, string>, options?: { namespace?: string }) {
    const key2Info: Record<string, ITokenInfo> = {};
    for (const [key, code] of Object.entries(key2Code)) {
      const oidcAccessInfo = await this.client.authen.oidcAccessToken.create({
        data: {
          grant_type: 'authorization_code',
          code
        }
      });

      if (oidcAccessInfo.code !== 0) {
        // @ts-ignore
        this.client.logger.error('init user access token error', key, oidcAccessInfo.msg || oidcAccessInfo.message);
        continue;
      }
      // code expired
      if (!oidcAccessInfo.data) {
        this.client.logger.error('user access code expired', key, code);
        continue;
      }

      key2Info[key] = {
        code,
        token: oidcAccessInfo.data.access_token,
        refreshToken: oidcAccessInfo.data.refresh_token,
        expiredTime: this.calibrateTime(oidcAccessInfo.data.expires_in)
      }
    }
    await this.update(key2Info, { namespace: get(options, 'namespace')});
    return key2Info;
  }

  async update(key2Info: Record<string, ITokenInfo>, options?: { namespace?: string }) {
    for (const [key, info] of Object.entries(key2Info)) {
      const cacheKey = this.getCacheKey(key, { namespace: get(options, 'namespace')});
      const cacheValue = await this.client.cache.get(cacheKey) || {};

      const { code, token, refreshToken, expiredTime } = info;
      const targetValue = mergeObject(cacheValue, { code, token, refreshToken, expiredTime });

      await this.client.cache.set(cacheKey, targetValue, Infinity);
    }
  }

  async get(key: string, options?: { namespace?: string }) {
    const cacheKey = this.getCacheKey(key, { namespace: get(options, 'namespace')});
    const cacheInfo = await this.client.cache.get(cacheKey);

    // cacheInfo是否存在
    if (!cacheInfo) {
      this.client.logger.error('user access token needs to be initialized or updated first');
      return;
    }

    const { token, code, refreshToken, expiredTime } = cacheInfo;
    // step1 token存在且未过期
    if (token && expiredTime && expiredTime - new Date().getTime() > 0) {
      return token;
    }

    // step2 refresh token存在，刷新token
    if (refreshToken) {
      const refreshAccessInfo = await this.client.authen.oidcRefreshAccessToken.create({
        data: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }
      });

      if (refreshAccessInfo.code === 0 && refreshAccessInfo.data) {
        await this.update({
          [key]: {
            token: refreshAccessInfo.data.access_token,
            refreshToken: refreshAccessInfo.data.refresh_token,
            expiredTime: this.calibrateTime(refreshAccessInfo.data.expires_in)
          }
        });

        return refreshAccessInfo.data.access_token;
      } else {
        this.client.logger.error('get user access token by refresh token failed.', refreshAccessInfo.msg);
        return;
      }
    }

    // step3 code存在的话，用code重新获取
    if (code) {
      const oidcAccessInfo = await this.client.authen.oidcAccessToken.create({
        data: {
          grant_type: "authorization_code",
          code: code
        }
      });

      if (oidcAccessInfo.code === 0 && oidcAccessInfo.data) {
        await this.update({
          [key]: {
            token: oidcAccessInfo.data.access_token,
            refreshToken: oidcAccessInfo.data.refresh_token,
            expiredTime: this.calibrateTime(oidcAccessInfo.data.expires_in)
          }
        })
      } else {
        this.client.logger.error('get user access token by code failed.', oidcAccessInfo.msg);
      }
    }

    // step4 重试完毕没结果后，返回undefine
    return;
  }
}

