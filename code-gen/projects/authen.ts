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
import auth from "./auth";

// auto gen
export default abstract class Client extends auth {
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
    authen = {
        /**
         * user_info
         */
        userInfo: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=authen&resource=user_info&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=authen&resource=user_info&version=v1 document }
             *
             * 获取用户信息
             *
             * 通过 `user_access_token` 获取相关用户信息。
             *
             * 手机号和邮箱信息为管理员导入的用户联系方式，未经过用户本人实时验证，不建议开发者直接将其作为业务系统的登录凭证。如使用，务必自行认证。
             */
            get: async (payload?: {}, options?: IRequestOptions) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                name?: string;
                                en_name?: string;
                                avatar_url?: string;
                                avatar_thumb?: string;
                                avatar_middle?: string;
                                avatar_big?: string;
                                open_id?: string;
                                union_id?: string;
                                email?: string;
                                enterprise_email?: string;
                                user_id?: string;
                                mobile?: string;
                                tenant_key?: string;
                                employee_no?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/authen/v1/user_info`,
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
        /**
         * access_token
         */
        accessToken: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=authen&resource=access_token&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authen&resource=access_token&version=v1 document }
             *
             * 获取 user_access_token（v1 版本）
             *
             * :::html;<md-alert type="error">;本接口已成为历史版本，不推荐使用。请使用最新版本：[获取 user_access_token ](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/authentication-management/access-token/get-user-access-token);</md-alert>。;:::;;根据[登录预授权码](https://open.feishu.cn/document/ukTMukTMukTM/ukzN4UjL5cDO14SO3gTN) code 获取 `user_access_token`。
             *
             * 本接口用于网页应用免登录应用场景，小程序应用获取 user_access_token 的方法，请参考小程序应用提供的 [code2session](https://open.feishu.cn/document/uYjL24iN/ukjM04SOyQjL5IDN) 接口。
             */
            create: async (
                payload?: {
                    data: { grant_type: string; code: string };
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
                                access_token?: string;
                                token_type?: string;
                                expires_in?: number;
                                name?: string;
                                en_name?: string;
                                avatar_url?: string;
                                avatar_thumb?: string;
                                avatar_middle?: string;
                                avatar_big?: string;
                                open_id?: string;
                                union_id?: string;
                                email?: string;
                                enterprise_email?: string;
                                user_id?: string;
                                mobile?: string;
                                tenant_key?: string;
                                refresh_expires_in?: number;
                                refresh_token?: string;
                                sid?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/authen/v1/access_token`,
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
         * refresh_access_token
         */
        refreshAccessToken: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=authen&resource=refresh_access_token&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authen&resource=refresh_access_token&version=v1 document }
             *
             * 刷新 user_access_token（v1 版本）
             *
             * :::html;<md-alert type="error">;本接口已成为历史版本，不推荐使用。请使用最新版本：[刷新 user_access_token](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/authentication-management/access-token/refresh-user-access-token);</md-alert>。;:::;;user_access_token 的最大有效期是 2小时左右。当 user_access_token 过期时，可以调用本接口获取新的 user_access_token。
             *
             * 刷新后请更新本地user_access_token和refresh_token，不要继续使用旧值重复刷新。保证参数是最新值
             */
            create: async (
                payload?: {
                    data: { grant_type: string; refresh_token: string };
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
                                access_token?: string;
                                token_type?: string;
                                expires_in?: number;
                                name?: string;
                                en_name?: string;
                                avatar_url?: string;
                                avatar_thumb?: string;
                                avatar_middle?: string;
                                avatar_big?: string;
                                open_id?: string;
                                union_id?: string;
                                email?: string;
                                enterprise_email?: string;
                                user_id?: string;
                                mobile?: string;
                                tenant_key?: string;
                                refresh_expires_in?: number;
                                refresh_token?: string;
                                sid?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/authen/v1/refresh_access_token`,
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
         * oidc.access_token
         */
        oidcAccessToken: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=authen&resource=oidc.access_token&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authen&resource=oidc.access_token&version=v1 document }
             *
             * 获取 user_access_token
             *
             * :::html;<md-alert type="error">;本接口已成为历史版本，不推荐使用。请使用最新版本：[获取 user_access_token ](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/authentication-management/access-token/get-user-access-token);</md-alert>。;:::;;根据[登录预授权码](https://open.feishu.cn/document/common-capabilities/sso/api/obtain-oauth-code) 返回 code 获取 `user_access_token`。;;
             */
            create: async (
                payload?: {
                    data: { grant_type: string; code: string };
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
                                access_token: string;
                                refresh_token?: string;
                                token_type: string;
                                expires_in?: number;
                                refresh_expires_in?: number;
                                scope?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/authen/v1/oidc/access_token`,
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
         * oidc.refresh_access_token
         */
        oidcRefreshAccessToken: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=authen&resource=oidc.refresh_access_token&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authen&resource=oidc.refresh_access_token&version=v1 document }
             *
             * 刷新 user_access_token
             *
             * :::html;<md-alert type="error">;本接口已成为历史版本，不推荐使用。请使用最新版本：[刷新 user_access_token ](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/authentication-management/access-token/refresh-user-access-token);</md-alert>。;:::;;user_access_token 的最大有效期是 2小时左右。当 user_access_token 过期时，可以调用本接口获取新的 user_access_token。
             */
            create: async (
                payload?: {
                    data: { grant_type: string; refresh_token: string };
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
                                access_token: string;
                                refresh_token?: string;
                                token_type: string;
                                expires_in?: number;
                                refresh_expires_in?: number;
                                scope?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/authen/v1/oidc/refresh_access_token`,
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
             * user_info
             */
            userInfo: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=user_info&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=authen&resource=user_info&version=v1 document }
                 *
                 * 获取用户信息
                 *
                 * 通过 `user_access_token` 获取相关用户信息。
                 *
                 * 手机号和邮箱信息为管理员导入的用户联系方式，未经过用户本人实时验证，不建议开发者直接将其作为业务系统的登录凭证。如使用，务必自行认证。
                 */
                get: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    name?: string;
                                    en_name?: string;
                                    avatar_url?: string;
                                    avatar_thumb?: string;
                                    avatar_middle?: string;
                                    avatar_big?: string;
                                    open_id?: string;
                                    union_id?: string;
                                    email?: string;
                                    enterprise_email?: string;
                                    user_id?: string;
                                    mobile?: string;
                                    tenant_key?: string;
                                    employee_no?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authen/v1/user_info`,
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
            /**
             * access_token
             */
            accessToken: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=access_token&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authen&resource=access_token&version=v1 document }
                 *
                 * 获取 user_access_token（v1 版本）
                 *
                 * :::html;<md-alert type="error">;本接口已成为历史版本，不推荐使用。请使用最新版本：[获取 user_access_token ](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/authentication-management/access-token/get-user-access-token);</md-alert>。;:::;;根据[登录预授权码](https://open.feishu.cn/document/ukTMukTMukTM/ukzN4UjL5cDO14SO3gTN) code 获取 `user_access_token`。
                 *
                 * 本接口用于网页应用免登录应用场景，小程序应用获取 user_access_token 的方法，请参考小程序应用提供的 [code2session](https://open.feishu.cn/document/uYjL24iN/ukjM04SOyQjL5IDN) 接口。
                 */
                create: async (
                    payload?: {
                        data: { grant_type: string; code: string };
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
                                    access_token?: string;
                                    token_type?: string;
                                    expires_in?: number;
                                    name?: string;
                                    en_name?: string;
                                    avatar_url?: string;
                                    avatar_thumb?: string;
                                    avatar_middle?: string;
                                    avatar_big?: string;
                                    open_id?: string;
                                    union_id?: string;
                                    email?: string;
                                    enterprise_email?: string;
                                    user_id?: string;
                                    mobile?: string;
                                    tenant_key?: string;
                                    refresh_expires_in?: number;
                                    refresh_token?: string;
                                    sid?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authen/v1/access_token`,
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
             * refresh_access_token
             */
            refreshAccessToken: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=refresh_access_token&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authen&resource=refresh_access_token&version=v1 document }
                 *
                 * 刷新 user_access_token（v1 版本）
                 *
                 * :::html;<md-alert type="error">;本接口已成为历史版本，不推荐使用。请使用最新版本：[刷新 user_access_token](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/authentication-management/access-token/refresh-user-access-token);</md-alert>。;:::;;user_access_token 的最大有效期是 2小时左右。当 user_access_token 过期时，可以调用本接口获取新的 user_access_token。
                 *
                 * 刷新后请更新本地user_access_token和refresh_token，不要继续使用旧值重复刷新。保证参数是最新值
                 */
                create: async (
                    payload?: {
                        data: { grant_type: string; refresh_token: string };
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
                                    access_token?: string;
                                    token_type?: string;
                                    expires_in?: number;
                                    name?: string;
                                    en_name?: string;
                                    avatar_url?: string;
                                    avatar_thumb?: string;
                                    avatar_middle?: string;
                                    avatar_big?: string;
                                    open_id?: string;
                                    union_id?: string;
                                    email?: string;
                                    enterprise_email?: string;
                                    user_id?: string;
                                    mobile?: string;
                                    tenant_key?: string;
                                    refresh_expires_in?: number;
                                    refresh_token?: string;
                                    sid?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authen/v1/refresh_access_token`,
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
             * oidc.access_token
             */
            oidcAccessToken: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=oidc.access_token&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authen&resource=oidc.access_token&version=v1 document }
                 *
                 * 获取 user_access_token
                 *
                 * :::html;<md-alert type="error">;本接口已成为历史版本，不推荐使用。请使用最新版本：[获取 user_access_token ](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/authentication-management/access-token/get-user-access-token);</md-alert>。;:::;;根据[登录预授权码](https://open.feishu.cn/document/common-capabilities/sso/api/obtain-oauth-code) 返回 code 获取 `user_access_token`。;;
                 */
                create: async (
                    payload?: {
                        data: { grant_type: string; code: string };
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
                                    access_token: string;
                                    refresh_token?: string;
                                    token_type: string;
                                    expires_in?: number;
                                    refresh_expires_in?: number;
                                    scope?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authen/v1/oidc/access_token`,
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
             * oidc.refresh_access_token
             */
            oidcRefreshAccessToken: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=oidc.refresh_access_token&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authen&resource=oidc.refresh_access_token&version=v1 document }
                 *
                 * 刷新 user_access_token
                 *
                 * :::html;<md-alert type="error">;本接口已成为历史版本，不推荐使用。请使用最新版本：[刷新 user_access_token ](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/authentication-management/access-token/refresh-user-access-token);</md-alert>。;:::;;user_access_token 的最大有效期是 2小时左右。当 user_access_token 过期时，可以调用本接口获取新的 user_access_token。
                 */
                create: async (
                    payload?: {
                        data: { grant_type: string; refresh_token: string };
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
                                    access_token: string;
                                    refresh_token?: string;
                                    token_type: string;
                                    expires_in?: number;
                                    refresh_expires_in?: number;
                                    scope?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authen/v1/oidc/refresh_access_token`,
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
