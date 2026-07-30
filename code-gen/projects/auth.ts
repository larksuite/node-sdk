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
import audio_video_ai from "./audio_video_ai";

// auto gen
export default abstract class Client extends audio_video_ai {
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
    auth = {
        /**
         * app_access_token
         */
        appAccessToken: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=auth&resource=app_access_token&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=auth&resource=app_access_token&version=v3 document }
             *
             * 商店应用获取 app_access_token
             *
             * 商店应用通过此接口获取`app_access_token`。
             *
             * 说明1： `app_access_token` 的最大有效期是 2 小时。如果在有效期小于 30 分钟的情况下，调用本接口，会返回一个新的 `app_access_token`，这会同时存在两个有效的 `app_access_token`。
             */
            create: async (
                payload?: {
                    data: {
                        app_id: string;
                        app_secret: string;
                        app_ticket: string;
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
                                app_access_token?: string;
                                expire: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/auth/v3/app_access_token`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=auth&resource=app_access_token&apiName=internal&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=internal&project=auth&resource=app_access_token&version=v3 document }
             *
             * 自建应用获取 app_access_token
             *
             * 自建应用通过此接口获取`app_access_token`。
             *
             * 说明： `app_access_token` 的最大有效期是 2 小时。如果在有效期小于 30 分钟的情况下，调用本接口，会返回一个新的 `app_access_token`，这会同时存在两个有效的 `app_access_token`。
             */
            internal: async (
                payload?: {
                    data: { app_id: string; app_secret: string };
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
                                app_access_token?: string;
                                expire?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/auth/v3/app_access_token/internal`,
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
         * tenant_access_token
         */
        tenantAccessToken: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=auth&resource=tenant_access_token&apiName=create&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=auth&resource=tenant_access_token&version=v3 document }
             *
             * 商店应用获取 tenant_access_token
             *
             * 商店应用通过此接口获取`tenant_access_token`。
             *
             * 说明 ： `tenant_access_token `的最大有效期是 2 小时。如果在有效期小于 30 分钟的情况下，调用本接口，会返回一个新的 `tenant_access_token`，这会同时存在两个有效的 `tenant_access_token`。
             */
            create: async (
                payload?: {
                    data: { app_access_token: string; tenant_key: string };
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
                                tenant_access_token?: string;
                                expire?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/auth/v3/tenant_access_token`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=auth&resource=tenant_access_token&apiName=internal&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=internal&project=auth&resource=tenant_access_token&version=v3 document }
             *
             * 自建应用获取 tenant_access_token
             *
             * 自建应用通过此接口获取 `tenant_access_token`。
             *
             * 说明： `tenant_access_token `的最大有效期是 2 小时。如果在有效期小于 30 分钟的情况下，调用本接口，会返回一个新的 `tenant_access_token`，这会同时存在两个有效的 `tenant_access_token`。
             */
            internal: async (
                payload?: {
                    data: { app_id: string; app_secret: string };
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
                                tenant_access_token?: string;
                                expire?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/auth/v3/tenant_access_token/internal`,
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
         * app_ticket
         */
        appTicket: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=auth&resource=app_ticket&apiName=resend&version=v3 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=resend&project=auth&resource=app_ticket&version=v3 document }
             *
             * 重新获取 app_ticket
             *
             * 飞书开放平台每隔 1 小时会给应用推送一次最新的 `app_ticket`，应用也可以主动调用此接口，触发飞书开放平台进行即时推送。
             */
            resend: async (
                payload?: {
                    data: { app_id: string; app_secret: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/auth/v3/app_ticket/resend`,
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
        v3: {
            /**
             * app_access_token
             */
            appAccessToken: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=auth&resource=app_access_token&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=auth&resource=app_access_token&version=v3 document }
                 *
                 * 商店应用获取 app_access_token
                 *
                 * 商店应用通过此接口获取`app_access_token`。
                 *
                 * 说明1： `app_access_token` 的最大有效期是 2 小时。如果在有效期小于 30 分钟的情况下，调用本接口，会返回一个新的 `app_access_token`，这会同时存在两个有效的 `app_access_token`。
                 */
                create: async (
                    payload?: {
                        data: {
                            app_id: string;
                            app_secret: string;
                            app_ticket: string;
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
                                    app_access_token?: string;
                                    expire: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/auth/v3/app_access_token`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=auth&resource=app_access_token&apiName=internal&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=internal&project=auth&resource=app_access_token&version=v3 document }
                 *
                 * 自建应用获取 app_access_token
                 *
                 * 自建应用通过此接口获取`app_access_token`。
                 *
                 * 说明： `app_access_token` 的最大有效期是 2 小时。如果在有效期小于 30 分钟的情况下，调用本接口，会返回一个新的 `app_access_token`，这会同时存在两个有效的 `app_access_token`。
                 */
                internal: async (
                    payload?: {
                        data: { app_id: string; app_secret: string };
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
                                    app_access_token?: string;
                                    expire?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/auth/v3/app_access_token/internal`,
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
             * tenant_access_token
             */
            tenantAccessToken: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=auth&resource=tenant_access_token&apiName=create&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=auth&resource=tenant_access_token&version=v3 document }
                 *
                 * 商店应用获取 tenant_access_token
                 *
                 * 商店应用通过此接口获取`tenant_access_token`。
                 *
                 * 说明 ： `tenant_access_token `的最大有效期是 2 小时。如果在有效期小于 30 分钟的情况下，调用本接口，会返回一个新的 `tenant_access_token`，这会同时存在两个有效的 `tenant_access_token`。
                 */
                create: async (
                    payload?: {
                        data: { app_access_token: string; tenant_key: string };
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
                                    tenant_access_token?: string;
                                    expire?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/auth/v3/tenant_access_token`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=auth&resource=tenant_access_token&apiName=internal&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=internal&project=auth&resource=tenant_access_token&version=v3 document }
                 *
                 * 自建应用获取 tenant_access_token
                 *
                 * 自建应用通过此接口获取 `tenant_access_token`。
                 *
                 * 说明： `tenant_access_token `的最大有效期是 2 小时。如果在有效期小于 30 分钟的情况下，调用本接口，会返回一个新的 `tenant_access_token`，这会同时存在两个有效的 `tenant_access_token`。
                 */
                internal: async (
                    payload?: {
                        data: { app_id: string; app_secret: string };
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
                                    tenant_access_token?: string;
                                    expire?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/auth/v3/tenant_access_token/internal`,
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
             * app_ticket
             */
            appTicket: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=auth&resource=app_ticket&apiName=resend&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=resend&project=auth&resource=app_ticket&version=v3 document }
                 *
                 * 重新获取 app_ticket
                 *
                 * 飞书开放平台每隔 1 小时会给应用推送一次最新的 `app_ticket`，应用也可以主动调用此接口，触发飞书开放平台进行即时推送。
                 */
                resend: async (
                    payload?: {
                        data: { app_id: string; app_secret: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/auth/v3/app_ticket/resend`,
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
