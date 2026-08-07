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
import trust_party from "./trust_party";

// auto gen
export default abstract class Client extends trust_party {
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
    unified_kms_log = {
        /**
         * kms_log
         */
        kmsLog: {
            listWithIterator: async (
                payload?: {
                    params: {
                        date_start: string;
                        date_end: string;
                        page_token?: string;
                        page_size?: number;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const sendRequest = async (innerPayload: {
                    headers: any;
                    params: any;
                    data: any;
                }) => {
                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/unified_kms_log/v1/kms_logs`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                        });
                    return res;
                };

                const Iterable = {
                    async *[Symbol.asyncIterator]() {
                        let hasMore = true;
                        let pageToken;

                        while (hasMore) {
                            try {
                                const res = await sendRequest({
                                    headers,
                                    params: {
                                        ...params,
                                        page_token: pageToken,
                                    },
                                    data,
                                });

                                const {
                                    // @ts-ignore
                                    has_more,
                                    // @ts-ignore
                                    page_token,
                                    // @ts-ignore
                                    next_page_token,
                                    ...rest
                                } =
                                    (
                                        res as {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    file_name: string;
                                                    download_link: string;
                                                    backup_download_link?: string;
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                            };
                                        }
                                    )?.data || {};

                                yield rest;

                                hasMore = Boolean(has_more);
                                pageToken = page_token || next_page_token;
                            } catch (e) {
                                yield null;
                                break;
                            }
                        }
                    },
                };

                return Iterable;
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=unified_kms_log&resource=kms_log&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=unified_kms_log&resource=kms_log&version=v1 document }
             *
             * 获取加解密操作日志
             *
             * ## 功能概述;### 业务介绍;该服务用于通过「开放平台 Open API 」获取飞书加密服务的「密钥操作及调用日志」数据。;## 方案说明;日志包含ID、时间、请求所属业务、事件、密钥 ID、加密算法等字段。日志均以英文提供，具体的中文对照含义见附录对照表。;;## 使用建议;1. 每 24 小时定时请求一次，获取过去一天的日志数据。;2. 需要在当天凌晨 3 点后请求前一天的日志，建议在非工作时间下载。;3. 考虑到日志量和下载性能，请为当前接口预留不低于 100 Mbps 的独立带宽，并配置限速，避免因网络问题下载失败，或影响到其他业务。
             */
            list: async (
                payload?: {
                    params: {
                        date_start: string;
                        date_end: string;
                        page_token?: string;
                        page_size?: number;
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
                            data?: {
                                items?: Array<{
                                    file_name: string;
                                    download_link: string;
                                    backup_download_link?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/unified_kms_log/v1/kms_logs`,
                            path
                        ),
                        method: "GET",
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
             * kms_log
             */
            kmsLog: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            date_start: string;
                            date_end: string;
                            page_token?: string;
                            page_size?: number;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const sendRequest = async (innerPayload: {
                        headers: any;
                        params: any;
                        data: any;
                    }) => {
                        const res = await this.httpInstance
                            .request<any, any>({
                                url: fillApiPath(
                                    `${this.domain}/open-apis/unified_kms_log/v1/kms_logs`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
                                paramsSerializer: (params) =>
                                    stringify(params, {
                                        arrayFormat: "repeat",
                                    }),
                            })
                            .catch((e) => {
                                this.logger.error(formatErrors(e));
                            });
                        return res;
                    };

                    const Iterable = {
                        async *[Symbol.asyncIterator]() {
                            let hasMore = true;
                            let pageToken;

                            while (hasMore) {
                                try {
                                    const res = await sendRequest({
                                        headers,
                                        params: {
                                            ...params,
                                            page_token: pageToken,
                                        },
                                        data,
                                    });

                                    const {
                                        // @ts-ignore
                                        has_more,
                                        // @ts-ignore
                                        page_token,
                                        // @ts-ignore
                                        next_page_token,
                                        ...rest
                                    } =
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        file_name: string;
                                                        download_link: string;
                                                        backup_download_link?: string;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                };
                                            }
                                        )?.data || {};

                                    yield rest;

                                    hasMore = Boolean(has_more);
                                    pageToken = page_token || next_page_token;
                                } catch (e) {
                                    yield null;
                                    break;
                                }
                            }
                        },
                    };

                    return Iterable;
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=unified_kms_log&resource=kms_log&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=unified_kms_log&resource=kms_log&version=v1 document }
                 *
                 * 获取加解密操作日志
                 *
                 * ## 功能概述;### 业务介绍;该服务用于通过「开放平台 Open API 」获取飞书加密服务的「密钥操作及调用日志」数据。;## 方案说明;日志包含ID、时间、请求所属业务、事件、密钥 ID、加密算法等字段。日志均以英文提供，具体的中文对照含义见附录对照表。;;## 使用建议;1. 每 24 小时定时请求一次，获取过去一天的日志数据。;2. 需要在当天凌晨 3 点后请求前一天的日志，建议在非工作时间下载。;3. 考虑到日志量和下载性能，请为当前接口预留不低于 100 Mbps 的独立带宽，并配置限速，避免因网络问题下载失败，或影响到其他业务。
                 */
                list: async (
                    payload?: {
                        params: {
                            date_start: string;
                            date_end: string;
                            page_token?: string;
                            page_size?: number;
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
                                data?: {
                                    items?: Array<{
                                        file_name: string;
                                        download_link: string;
                                        backup_download_link?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/unified_kms_log/v1/kms_logs`,
                                path
                            ),
                            method: "GET",
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
