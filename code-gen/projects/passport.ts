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
import optical_char_recognition from "./optical_char_recognition";

// auto gen
export default abstract class Client extends optical_char_recognition {
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
     * 帐号
     */
    passport = {
        /**
         * 登录态
         */
        session: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=passport&resource=session&apiName=logout&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=logout&project=passport&resource=session&version=v1 document }
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/passport-v1/session/query document }
             *
             * 批量获取用户登录信息（脱敏）
             *
             * 该接口用于查询用户的登录信息
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
        v1: {
            /**
             * 登录态
             */
            session: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=passport&resource=session&apiName=logout&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=logout&project=passport&resource=session&version=v1 document }
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/passport-v1/session/query document }
                 *
                 * 批量获取用户登录信息（脱敏）
                 *
                 * 该接口用于查询用户的登录信息
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
        },
    };
}
