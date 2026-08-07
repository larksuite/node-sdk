import identity from "lodash.identity";
import pickBy from "lodash.pickby";
import fs from "fs";
import { fillApiPath } from "@node-sdk/utils";
import { Logger } from "@node-sdk/typings";
import { formatErrors } from "@node-sdk/client/utils";
import { IRequestOptions } from "@node-sdk/code-gen/types";
import { IPayload } from "@node-sdk/client/types";
import { HttpInstance } from "@node-sdk/typings/http";
import { Readable } from "stream";
import { stringify } from "qs";
import contact from "./contact";

// auto gen
export default abstract class Client extends contact {
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
         
         */
    content_check = {
        /**
         * text
         */
        text: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=content_check&resource=text&apiName=check&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=check&project=content_check&resource=text&version=v1 document }
             *
             * 文本安全检测
             *
             * 文本检测接口，能够实时返回检测结果，通常检测时延在500ms以下，限制文本字符串长度不超过2000。
             *
             * 单应用限流：20QPS
             */
            check: async (
                payload?: {
                    data: { content: string };
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
                            data?: {
                                predicts?: Array<{
                                    risk_type?: string;
                                    hit?: boolean;
                                    prob?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/content_check/v1/text/check`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * image
         */
        image: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=content_check&resource=image&apiName=check&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=check&project=content_check&resource=image&version=v1 document }
             *
             * 图片安全检测
             *
             * 图片检测接口，能够实时返回检测结果，通常检测时延在2s以下，限制图片资源链接为公网可直接访问，图片大小不超过10M。
             *
             * 单应用限流：20QPS
             */
            check: async (
                payload?: {
                    data?: { image_url?: string; image_data?: string };
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
                            data?: {
                                predicts?: Array<{
                                    risk_type?: string;
                                    hit?: boolean;
                                    prob?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/content_check/v1/image/check`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        v1: {
            /**
             * text
             */
            text: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=content_check&resource=text&apiName=check&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=check&project=content_check&resource=text&version=v1 document }
                 *
                 * 文本安全检测
                 *
                 * 文本检测接口，能够实时返回检测结果，通常检测时延在500ms以下，限制文本字符串长度不超过2000。
                 *
                 * 单应用限流：20QPS
                 */
                check: async (
                    payload?: {
                        data: { content: string };
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
                                data?: {
                                    predicts?: Array<{
                                        risk_type?: string;
                                        hit?: boolean;
                                        prob?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/content_check/v1/text/check`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * image
             */
            image: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=content_check&resource=image&apiName=check&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=check&project=content_check&resource=image&version=v1 document }
                 *
                 * 图片安全检测
                 *
                 * 图片检测接口，能够实时返回检测结果，通常检测时延在2s以下，限制图片资源链接为公网可直接访问，图片大小不超过10M。
                 *
                 * 单应用限流：20QPS
                 */
                check: async (
                    payload?: {
                        data?: { image_url?: string; image_data?: string };
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
                                data?: {
                                    predicts?: Array<{
                                        risk_type?: string;
                                        hit?: boolean;
                                        prob?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/content_check/v1/image/check`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
