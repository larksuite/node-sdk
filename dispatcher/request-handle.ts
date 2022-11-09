import crypto from 'crypto';
import get from 'lodash.get';
import { CEventType } from '@node-sdk/consts';
import { AESCipher } from '@node-sdk/utils';
import { Logger } from '@node-sdk/typings';

export default class RequestHandle {
    aesCipher?: AESCipher;

    verificationToken?: string;

    encryptKey?: string;

    logger: Logger;

    constructor(params: {
        encryptKey?: string;
        verificationToken?: string;
        logger: Logger;
    }) {
        const { encryptKey, verificationToken, logger } = params;

        this.verificationToken = verificationToken;
        this.encryptKey = encryptKey;
        this.logger = logger;

        if (encryptKey) {
            this.aesCipher = new AESCipher(encryptKey);
        }
    }

    parse(data: any) {
        const targetData = (() => {
            const { encrypt, ...rest } = data || {};
            if (encrypt) {
                try {
                    return {
                        ...JSON.parse(this.aesCipher?.decrypt(encrypt)!),
                        ...rest,
                    };
                } catch (e) {
                    this.logger.error('parse encrypt data failed');
                    return {};
                }
            }

            return rest;
        })();

        // v1和v2版事件的区别：https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM
        if ('schema' in targetData) {
            const { header, event, ...rest } = targetData;
            return {
                [CEventType]: get(targetData, 'header.event_type'),
                ...rest,
                ...header,
                ...event,
            };
        }
        const { event, ...rest } = targetData;
        return {
            [CEventType]: get(targetData, 'event.type'),
            ...event,
            ...rest,
        };
    }

    checkIsCardEventValidated(data: any): boolean {
        const {
            'x-lark-request-timestamp': timestamp,
            'x-lark-request-nonce': nonce,
            'x-lark-signature': signature,
        } = data.headers;

        if (!this.verificationToken) {
            return true;
        }

        const computedSignature = crypto
            .createHash('sha1')
            .update(
                timestamp +
                    nonce +
                    this.verificationToken +
                    JSON.stringify(data)
            )
            .digest('hex');

        return computedSignature === signature;
    }

    checkIsEventValidated(data: any): boolean {
        if (!this.encryptKey) {
            return true;
        }

        const {
            'x-lark-request-timestamp': timestamp,
            'x-lark-request-nonce': nonce,
            'x-lark-signature': signature,
        } = data.headers;

        const content =
            timestamp + nonce + this.encryptKey + JSON.stringify(data);

        const computedSignature = crypto
            .createHash('sha256')
            .update(content)
            .digest('hex');

        return computedSignature === signature;
    }
}
