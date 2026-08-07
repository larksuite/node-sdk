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
import partner_ai from "./partner_ai";

// auto gen
export default abstract class Client extends partner_ai {
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
    passport = {
        /**
         * session
         */
        session: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=passport&resource=session&apiName=logout&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=logout&project=passport&resource=session&version=v1 document }
             *
             * 退出登录
             *
             * 该接口用于退出用户的登录态
             */
            logout: async (
                payload?: {
                    data: {
                        idp_credential_id?: string;
                        logout_type: number;
                        terminal_type?: Array<number>;
                        user_id?: string;
                        logout_reason?: number;
                        sid?: string;
                    };
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/passport/v1/sessions/logout`,
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
             * {@link https://open.feishu.cn/api-explorer?project=passport&resource=session&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=passport&resource=session&version=v1 document }
             *
             * 批量获取脱敏的用户登录信息
             *
             * 该接口用于查询用户的登录信息。
             */
            query: async (
                payload?: {
                    data?: { user_ids?: Array<string> };
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
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
                                mask_sessions?: Array<{
                                    create_time?: string;
                                    terminal_type?: number;
                                    user_id?: string;
                                    sid?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/passport/v1/sessions/query`,
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
         * password
         */
        password: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=passport&resource=password&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=passport&resource=password&version=v1 document }
             *
             * 重置登录密码
             *
             * 当用户忘记密码、密码已过期或账号存在安全风险时，管理员可以为用户重置密码。
             */
            update: async (
                payload?: {
                    data: {
                        user_id: string;
                        password?: string;
                        require_reset?: boolean;
                    };
                    params?: {
                        user_id_type?: "open_id" | "user_id" | "union_id";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/passport/v1/password`,
                            path
                        ),
                        method: "PUT",
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
             * session
             */
            session: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=passport&resource=session&apiName=logout&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=logout&project=passport&resource=session&version=v1 document }
                 *
                 * 退出登录
                 *
                 * 该接口用于退出用户的登录态
                 */
                logout: async (
                    payload?: {
                        data: {
                            idp_credential_id?: string;
                            logout_type: number;
                            terminal_type?: Array<number>;
                            user_id?: string;
                            logout_reason?: number;
                            sid?: string;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
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
                                `${this.domain}/open-apis/passport/v1/sessions/logout`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=passport&resource=session&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=passport&resource=session&version=v1 document }
                 *
                 * 批量获取脱敏的用户登录信息
                 *
                 * 该接口用于查询用户的登录信息。
                 */
                query: async (
                    payload?: {
                        data?: { user_ids?: Array<string> };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
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
                                    mask_sessions?: Array<{
                                        create_time?: string;
                                        terminal_type?: number;
                                        user_id?: string;
                                        sid?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/passport/v1/sessions/query`,
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
             * password
             */
            password: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=passport&resource=password&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=passport&resource=password&version=v1 document }
                 *
                 * 重置登录密码
                 *
                 * 当用户忘记密码、密码已过期或账号存在安全风险时，管理员可以为用户重置密码。
                 */
                update: async (
                    payload?: {
                        data: {
                            user_id: string;
                            password?: string;
                            require_reset?: boolean;
                        };
                        params?: {
                            user_id_type?: "open_id" | "user_id" | "union_id";
                        };
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
                                `${this.domain}/open-apis/passport/v1/password`,
                                path
                            ),
                            method: "PUT",
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
