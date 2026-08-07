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
        /**
         * authorize
         */
        authorize: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=authen&resource=authorize&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=authen&resource=authorize&version=v1 document }
             */
            get: async (
                payload?: {
                    params: {
                        app_id: string;
                        redirect_uri: string;
                        scope?: string;
                        state?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/authen/v1/authorize`,
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
         * client_assertion_configuration
         */
        clientAssertionConfiguration: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=authen&resource=client_assertion_configuration&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=authen&resource=client_assertion_configuration&version=v1 document }
             */
            delete: async (
                payload?: {
                    path: { configuration_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/authen/v1/client_assertion_configurations/:client_assertion_configuration_id`,
                            path
                        ),
                        method: "DELETE",
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
             * {@link https://open.feishu.cn/api-explorer?project=authen&resource=client_assertion_configuration&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=authen&resource=client_assertion_configuration&version=v1 document }
             */
            list: async (
                payload?: {
                    params?: {
                        client_id?: string;
                        external_identifier?: string;
                        issuer?: string;
                        page_num?: number;
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
                                items?: {
                                    id?: number;
                                    client_id?: string;
                                    external_identifier?: string;
                                    issuer?: string;
                                };
                                total?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/authen/v1/client_assertion_configurations`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=authen&resource=client_assertion_configuration&apiName=put&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=put&project=authen&resource=client_assertion_configuration&version=v1 document }
             *
             * 创建或更新Client Assertion 配置
             */
            put: async (
                payload?: {
                    data: {
                        client_id: string;
                        external_identifier: string;
                        issuer?: string;
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
                                id?: string;
                                client_id?: string;
                                external_identifier?: string;
                                issuer?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/authen/v1/client_assertion_configuration`,
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
        /**
         * openid_issuer
         */
        openidIssuer: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=authen&resource=openid_issuer&apiName=put&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=put&project=authen&resource=openid_issuer&version=v1 document }
             */
            put: async (
                payload?: {
                    data: {
                        issuer_url: string;
                        purpose?: string;
                        open_id_config_url?: string;
                        jwks_uri?: string;
                        external_identifier_transformation?: string;
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
                                id?: string;
                                purpose?: string;
                                issuer_url?: string;
                                open_id_config_url?: string;
                                jwks_uri?: string;
                                external_identifier_transformation?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/authen/v1/openid_issuer`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=authen&resource=openid_issuer&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=authen&resource=openid_issuer&version=v1 document }
             */
            list: async (
                payload?: {
                    params?: {
                        issuer_url?: string;
                        purpose?: string;
                        page_num?: string;
                        page_size?: string;
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
                                    id?: number;
                                    purpose?: string;
                                    issuer_url?: string;
                                    openid_config_url?: string;
                                    jwks_uri?: string;
                                    external_identifier_transformation?: string;
                                }>;
                                total?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/authen/v1/openid_issuers`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=authen&resource=openid_issuer&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=authen&resource=openid_issuer&version=v1 document }
             */
            delete: async (
                payload?: {
                    path: { openid_issuer_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/authen/v1/openid_issuers/:openid_issuer_id`,
                            path
                        ),
                        method: "DELETE",
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
            /**
             * authorize
             */
            authorize: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=authorize&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=authen&resource=authorize&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params: {
                            app_id: string;
                            redirect_uri: string;
                            scope?: string;
                            state?: string;
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
                                `${this.domain}/open-apis/authen/v1/authorize`,
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
             * client_assertion_configuration
             */
            clientAssertionConfiguration: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=client_assertion_configuration&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=authen&resource=client_assertion_configuration&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        path: { configuration_id: string };
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
                                `${this.domain}/open-apis/authen/v1/client_assertion_configurations/:client_assertion_configuration_id`,
                                path
                            ),
                            method: "DELETE",
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
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=client_assertion_configuration&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=authen&resource=client_assertion_configuration&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            client_id?: string;
                            external_identifier?: string;
                            issuer?: string;
                            page_num?: number;
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
                                    items?: {
                                        id?: number;
                                        client_id?: string;
                                        external_identifier?: string;
                                        issuer?: string;
                                    };
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authen/v1/client_assertion_configurations`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=client_assertion_configuration&apiName=put&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=put&project=authen&resource=client_assertion_configuration&version=v1 document }
                 *
                 * 创建或更新Client Assertion 配置
                 */
                put: async (
                    payload?: {
                        data: {
                            client_id: string;
                            external_identifier: string;
                            issuer?: string;
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
                                    id?: string;
                                    client_id?: string;
                                    external_identifier?: string;
                                    issuer?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authen/v1/client_assertion_configuration`,
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
            /**
             * openid_issuer
             */
            openidIssuer: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=openid_issuer&apiName=put&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=put&project=authen&resource=openid_issuer&version=v1 document }
                 */
                put: async (
                    payload?: {
                        data: {
                            issuer_url: string;
                            purpose?: string;
                            open_id_config_url?: string;
                            jwks_uri?: string;
                            external_identifier_transformation?: string;
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
                                    id?: string;
                                    purpose?: string;
                                    issuer_url?: string;
                                    open_id_config_url?: string;
                                    jwks_uri?: string;
                                    external_identifier_transformation?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authen/v1/openid_issuer`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=openid_issuer&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=authen&resource=openid_issuer&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            issuer_url?: string;
                            purpose?: string;
                            page_num?: string;
                            page_size?: string;
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
                                        id?: number;
                                        purpose?: string;
                                        issuer_url?: string;
                                        openid_config_url?: string;
                                        jwks_uri?: string;
                                        external_identifier_transformation?: string;
                                    }>;
                                    total?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authen/v1/openid_issuers`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=openid_issuer&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=authen&resource=openid_issuer&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        path: { openid_issuer_id: string };
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
                                `${this.domain}/open-apis/authen/v1/openid_issuers/:openid_issuer_id`,
                                path
                            ),
                            method: "DELETE",
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
        v3: {
            /**
             * openid_issuer
             */
            openidIssuer: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=openid_issuer&apiName=put&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=put&project=authen&resource=openid_issuer&version=v3 document }
                 *
                 * 创建或更新租户 issuer 配置
                 */
                put: async (
                    payload?: {
                        data: {
                            issuer_url: string;
                            purpose?: string;
                            open_id_config_url?: string;
                            jwks_uri?: string;
                            external_identifier_transformation?: string;
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
                                    id?: string;
                                    purpose?: string;
                                    issuer_url?: string;
                                    open_id_config_url?: string;
                                    jwks_uri?: string;
                                    external_identifier_transformation?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authen/v3/openid_issuer`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=openid_issuer&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=authen&resource=openid_issuer&version=v3 document }
                 *
                 * 查询租户 issuer 配置
                 */
                list: async (
                    payload?: {
                        params?: {
                            issuer_url?: string;
                            purpose?: string;
                            page_num?: string;
                            page_size?: string;
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
                                        id?: number;
                                        purpose?: string;
                                        issuer_url?: string;
                                        openid_config_url?: string;
                                        jwks_uri?: string;
                                        external_identifier_transformation?: string;
                                    }>;
                                    total?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authen/v3/openid_issuers`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=openid_issuer&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=authen&resource=openid_issuer&version=v3 document }
                 *
                 * 删除租户 issuer 配置
                 */
                delete: async (
                    payload?: {
                        path: { openid_issuer_id: string };
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
                                `${this.domain}/open-apis/authen/v3/openid_issuers/:openid_issuer_id`,
                                path
                            ),
                            method: "DELETE",
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
             * client_assertion_configuration
             */
            clientAssertionConfiguration: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=client_assertion_configuration&apiName=put&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=put&project=authen&resource=client_assertion_configuration&version=v3 document }
                 *
                 * 创建或更新 Client Assertion 配置
                 */
                put: async (
                    payload?: {
                        data: {
                            client_id: string;
                            external_identifier: string;
                            issuer?: string;
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
                                    id?: string;
                                    client_id?: string;
                                    external_identifier?: string;
                                    issuer?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authen/v3/client_assertion_configuration`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=client_assertion_configuration&apiName=list&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=authen&resource=client_assertion_configuration&version=v3 document }
                 *
                 * 查询 Client Assertion 配置
                 */
                list: async (
                    payload?: {
                        params?: {
                            client_id?: string;
                            external_identifier?: string;
                            issuer?: string;
                            page_num?: number;
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
                                        id?: number;
                                        client_id?: string;
                                        external_identifier?: string;
                                        issuer?: string;
                                    }>;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authen/v3/client_assertion_configurations`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=client_assertion_configuration&apiName=delete&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=authen&resource=client_assertion_configuration&version=v3 document }
                 *
                 * 删除 Client Assertion 配置
                 */
                delete: async (
                    payload?: {
                        path: { client_assertion_configuration_id: string };
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
                                `${this.domain}/open-apis/authen/v3/client_assertion_configurations/:client_assertion_configuration_id`,
                                path
                            ),
                            method: "DELETE",
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
             * application
             */
            application: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=application&apiName=put_auth_methods&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=put_auth_methods&project=authen&resource=application&version=v3 document }
                 *
                 * 创建、更新应用认证方法
                 */
                putAuthMethods: async (
                    payload?: {
                        data?: { auth_methods?: Array<string> };
                        path: { app_id: string };
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
                                    app_id?: string;
                                    auth_methods?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authen/v3/applications/:app_id/auth_methods`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=application&apiName=get_auth_methods&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_auth_methods&project=authen&resource=application&version=v3 document }
                 *
                 * 获取应用认证方法
                 */
                getAuthMethods: async (
                    payload?: {
                        path: { app_id: string };
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
                                    app_id?: string;
                                    auth_methods?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/authen/v3/applications/:app_id/auth_methods`,
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
