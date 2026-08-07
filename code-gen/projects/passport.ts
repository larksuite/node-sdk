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
         * idp_credential
         */
        idpCredential: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=passport&resource=idp_credential&apiName=bind&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=bind&project=passport&resource=idp_credential&version=v1 document }
             */
            bind: async (
                payload?: {
                    data: { idp_credential_id: string; user_id: string };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/passport/v1/idp_credential/bind`,
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
             * {@link https://open.feishu.cn/api-explorer?project=passport&resource=idp_credential&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=passport&resource=idp_credential&version=v1 document }
             */
            query: async (
                payload?: {
                    data: { user_id: string };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                            data?: { idp_credential_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/passport/v1/idp_credential/query`,
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
             * {@link https://open.feishu.cn/api-explorer?project=passport&resource=idp_credential&apiName=rebind&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=rebind&project=passport&resource=idp_credential&version=v1 document }
             */
            rebind: async (
                payload?: {
                    data: { idp_credential_id: string; user_id: string };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/passport/v1/idp_credential/rebind`,
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
             * {@link https://open.feishu.cn/api-explorer?project=passport&resource=idp_credential&apiName=unbind&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unbind&project=passport&resource=idp_credential&version=v1 document }
             */
            unbind: async (
                payload?: {
                    data: { idp_credential_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/passport/v1/idp_credential/unbind`,
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
         * credential
         */
        credential: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=passport&resource=credential&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=passport&resource=credential&version=v1 document }
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
                                items?: Array<{
                                    email?: string;
                                    mobile?: string;
                                    user_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/passport/v1/credentials/query`,
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
         * flow
         */
        flow: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=passport&resource=flow&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=passport&resource=flow&version=v1 document }
             *
             * 创建登录流程
             *
             * 该接口用于创建一个登录流程
             */
            create: async (
                payload?: {
                    data: {
                        flow_type: string;
                        init_idp_config: boolean;
                        channel?: string;
                        idp_open_id?: string;
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
                            data?: { flow_token: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/passport/v1/flow`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=passport&resource=password&apiName=init&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=init&project=passport&resource=password&version=v1 document }
             *
             * 重置登录密码（未激活状态用户）
             *
             * 为未激活的用户设置初始登录密码
             */
            init: async (
                payload?: {
                    data: {
                        user_id: string;
                        password?: string;
                        require_reset?: boolean;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/passport/v1/password/init`,
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
         * backup_verification.setting
         */
        backupVerificationSetting: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=passport&resource=backup_verification.setting&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=passport&resource=backup_verification.setting&version=v1 document }
             *
             * 设置备用验证邮箱域名限制
             *
             * 管理员可以限制成员的备用验证邮箱域名，只能在指定的域名范围内，避免设置安全等级比较低的邮箱作为备用验证邮箱时，导致的潜在账号风险。
             */
            update: async (
                payload?: {
                    data?: { allowed_email_domains?: Array<string> };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/passport/v1/backup_verification/setting`,
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
         * backup_verification
         */
        backupVerification: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=passport&resource=backup_verification&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=passport&resource=backup_verification&version=v1 document }
             *
             * 设置备用验证方式
             *
             * 管理员可为用户设置备用验证方式，如备用验证手机号，或备用验证邮箱，用于登录的第二步认证或已登录状态下的身份验证因子。
             */
            update: async (
                payload?: {
                    data: {
                        user_id: string;
                        backup_verification_type: string;
                        backup_verification_content: string;
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
                            `${this.domain}/open-apis/passport/v1/backup_verification`,
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
             * idp_credential
             */
            idpCredential: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=passport&resource=idp_credential&apiName=bind&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=bind&project=passport&resource=idp_credential&version=v1 document }
                 */
                bind: async (
                    payload?: {
                        data: { idp_credential_id: string; user_id: string };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/passport/v1/idp_credential/bind`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=passport&resource=idp_credential&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=passport&resource=idp_credential&version=v1 document }
                 */
                query: async (
                    payload?: {
                        data: { user_id: string };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                data?: { idp_credential_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/passport/v1/idp_credential/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=passport&resource=idp_credential&apiName=rebind&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=rebind&project=passport&resource=idp_credential&version=v1 document }
                 */
                rebind: async (
                    payload?: {
                        data: { idp_credential_id: string; user_id: string };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/passport/v1/idp_credential/rebind`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=passport&resource=idp_credential&apiName=unbind&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unbind&project=passport&resource=idp_credential&version=v1 document }
                 */
                unbind: async (
                    payload?: {
                        data: { idp_credential_id: string };
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
                                `${this.domain}/open-apis/passport/v1/idp_credential/unbind`,
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
             * credential
             */
            credential: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=passport&resource=credential&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=passport&resource=credential&version=v1 document }
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
                                    items?: Array<{
                                        email?: string;
                                        mobile?: string;
                                        user_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/passport/v1/credentials/query`,
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
             * flow
             */
            flow: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=passport&resource=flow&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=passport&resource=flow&version=v1 document }
                 *
                 * 创建登录流程
                 *
                 * 该接口用于创建一个登录流程
                 */
                create: async (
                    payload?: {
                        data: {
                            flow_type: string;
                            init_idp_config: boolean;
                            channel?: string;
                            idp_open_id?: string;
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
                                data?: { flow_token: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/passport/v1/flow`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=passport&resource=password&apiName=init&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=init&project=passport&resource=password&version=v1 document }
                 *
                 * 重置登录密码（未激活状态用户）
                 *
                 * 为未激活的用户设置初始登录密码
                 */
                init: async (
                    payload?: {
                        data: {
                            user_id: string;
                            password?: string;
                            require_reset?: boolean;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/passport/v1/password/init`,
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
             * backup_verification.setting
             */
            backupVerificationSetting: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=passport&resource=backup_verification.setting&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=passport&resource=backup_verification.setting&version=v1 document }
                 *
                 * 设置备用验证邮箱域名限制
                 *
                 * 管理员可以限制成员的备用验证邮箱域名，只能在指定的域名范围内，避免设置安全等级比较低的邮箱作为备用验证邮箱时，导致的潜在账号风险。
                 */
                update: async (
                    payload?: {
                        data?: { allowed_email_domains?: Array<string> };
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
                                `${this.domain}/open-apis/passport/v1/backup_verification/setting`,
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
             * backup_verification
             */
            backupVerification: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=passport&resource=backup_verification&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=passport&resource=backup_verification&version=v1 document }
                 *
                 * 设置备用验证方式
                 *
                 * 管理员可为用户设置备用验证方式，如备用验证手机号，或备用验证邮箱，用于登录的第二步认证或已登录状态下的身份验证因子。
                 */
                update: async (
                    payload?: {
                        data: {
                            user_id: string;
                            backup_verification_type: string;
                            backup_verification_content: string;
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
                                `${this.domain}/open-apis/passport/v1/backup_verification`,
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
