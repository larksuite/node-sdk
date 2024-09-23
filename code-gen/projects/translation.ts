import identity from "lodash.identity";
import pickBy from "lodash.pickby";
import get from "lodash.get";
import fs from "fs";
import { fillApiPath } from "@node-sdk/utils";
import { Logger } from "@node-sdk/typings";
import { formatErrors } from "@node-sdk/client/utils";
import { IRequestOptions } from "@node-sdk/code-gen/types";
import { IPayload } from "@node-sdk/client/types";
import { HttpInstance } from "@node-sdk/typings/http";
import { Readable } from "stream";
import tenant from "./tenant";

// auto gen
export default abstract class Client extends tenant {
    declare tokenManager;

    declare domain;

    declare logger: Logger;

    declare httpInstance: HttpInstance;

    abstract formatPayload(
        // eslint-disable-next-line no-unused-vars
        payload?: IPayload,
        // eslint-disable-next-line no-unused-vars
        options?: IRequestOptions
    ): Promise<Required<IPayload>>;

    /**
     * AI能力
     */
    translation = {
        /**
         * 文本
         */
        text: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=translation&resource=text&apiName=detect&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/translation-v1/text/detect document }
             *
             * 文本语种识别
             *
             * 机器翻译 (MT)，支持 100 多种语言识别，返回符合 ISO 639-1 标准
             *
             * 单租户限流：20QPS，同租户下的应用没有限流，共享本租户的 20QPS 限流
             */
            detect: async (
                payload?: {
                    data: { text: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { language: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/translation/v1/text/detect`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=translation&resource=text&apiName=translate&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/translation-v1/text/translate document }
             *
             * 文本翻译
             *
             * 机器翻译 (MT)，支持以下语种互译：;"zh": 汉语；;"zh-Hant": 繁体汉语；;"en": 英语；;"ja": 日语；;"ru": 俄语；;"de": 德语；;"fr": 法语；;"it": 意大利语；;"pl": 波兰语；;"th": 泰语；;"hi": 印地语；;"id": 印尼语；;"es": 西班牙语；;"pt": 葡萄牙语；;"ko": 朝鲜语；;"vi": 越南语；
             *
             * 单租户限流：20QPS，同租户下的应用没有限流，共享本租户的 20QPS 限流
             */
            translate: async (
                payload?: {
                    data: {
                        source_language: string;
                        text: string;
                        target_language: string;
                        glossary?: Array<{ from: string; to: string }>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        { code?: number; msg?: string; data?: { text: string } }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/translation/v1/text/translate`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        v1: {
            /**
             * 文本
             */
            text: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=translation&resource=text&apiName=detect&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/translation-v1/text/detect document }
                 *
                 * 文本语种识别
                 *
                 * 机器翻译 (MT)，支持 100 多种语言识别，返回符合 ISO 639-1 标准
                 *
                 * 单租户限流：20QPS，同租户下的应用没有限流，共享本租户的 20QPS 限流
                 */
                detect: async (
                    payload?: {
                        data: { text: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { language: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/translation/v1/text/detect`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=translation&resource=text&apiName=translate&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/ai/translation-v1/text/translate document }
                 *
                 * 文本翻译
                 *
                 * 机器翻译 (MT)，支持以下语种互译：;"zh": 汉语；;"zh-Hant": 繁体汉语；;"en": 英语；;"ja": 日语；;"ru": 俄语；;"de": 德语；;"fr": 法语；;"it": 意大利语；;"pl": 波兰语；;"th": 泰语；;"hi": 印地语；;"id": 印尼语；;"es": 西班牙语；;"pt": 葡萄牙语；;"ko": 朝鲜语；;"vi": 越南语；
                 *
                 * 单租户限流：20QPS，同租户下的应用没有限流，共享本租户的 20QPS 限流
                 */
                translate: async (
                    payload?: {
                        data: {
                            source_language: string;
                            text: string;
                            target_language: string;
                            glossary?: Array<{ from: string; to: string }>;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { text: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/translation/v1/text/translate`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
        },
    };
}
