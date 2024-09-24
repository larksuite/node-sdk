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
         * access_token
         */
        accessToken: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=authen&resource=access_token&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authen&resource=access_token&version=v1 document }
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
         * oidc.access_token
         */
        oidcAccessToken: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=authen&resource=oidc.access_token&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authen&resource=oidc.access_token&version=v1 document }
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
         * refresh_access_token
         */
        refreshAccessToken: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=authen&resource=refresh_access_token&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authen&resource=refresh_access_token&version=v1 document }
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
         * user_info
         */
        userInfo: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=authen&resource=user_info&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=authen&resource=user_info&version=v1 document }
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
        v1: {
            /**
             * access_token
             */
            accessToken: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=access_token&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authen&resource=access_token&version=v1 document }
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
             * oidc.access_token
             */
            oidcAccessToken: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=oidc.access_token&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authen&resource=oidc.access_token&version=v1 document }
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
             * refresh_access_token
             */
            refreshAccessToken: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=refresh_access_token&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=authen&resource=refresh_access_token&version=v1 document }
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
             * user_info
             */
            userInfo: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=authen&resource=user_info&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=authen&resource=user_info&version=v1 document }
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
        },
    };
}
