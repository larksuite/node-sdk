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
import unified_kms from "./unified_kms";

// auto gen
export default abstract class Client extends unified_kms {
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
    vault = {
        v1: {
            /**
             * retention.minutes
             */
            retentionMinutes: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=retention.minutes&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=vault&resource=retention.minutes&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        path: { minutes_token: string };
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
                                `${this.domain}/open-apis/vault/v1/retention/minutes/:minutes_token`,
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
             * retention.docs
             */
            retentionDocs: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=retention.docs&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=vault&resource=retention.docs&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        params: { object_type: string };
                        path: { doc_token: string };
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
                                `${this.domain}/open-apis/vault/v1/retention/docs/:doc_token`,
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
             * retention.messages
             */
            retentionMessages: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=retention.messages&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=vault&resource=retention.messages&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        path: { message_id: string };
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
                                `${this.domain}/open-apis/vault/v1/retention/messages/:message_id`,
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
             * retention.mails
             */
            retentionMails: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=retention.mails&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=vault&resource=retention.mails&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        params: { user_mailbox_id: string };
                        path: { mail_id: string };
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
                                `${this.domain}/open-apis/vault/v1/retention/mails/:mail_id`,
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
             * retention.bitables
             */
            retentionBitables: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=retention.bitables&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=vault&resource=retention.bitables&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        params: { object_type: string };
                        path: { app_token: string };
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
                                `${this.domain}/open-apis/vault/v1/retention/bitables/:app_token`,
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
             * ediscovery.cases
             */
            ediscoveryCases: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases&apiName=add_permissions&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_permissions&project=vault&resource=ediscovery.cases&version=v1 document }
                 *
                 * 添加案例审计员
                 *
                 * 案例创建人可以添加案例审计员。
                 */
                addPermissions: async (
                    payload?: {
                        data: { user_id: string; role: "auditor" };
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string };
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
                                    permission?: {
                                        user_id: string;
                                        role: "auditor";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id/add_permissions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases&apiName=remove_permissions&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_permissions&project=vault&resource=ediscovery.cases&version=v1 document }
                 *
                 * 删除案例审计员
                 *
                 * 案例创建人可以删除案例审计员。
                 */
                removePermissions: async (
                    payload?: {
                        data: { user_id: string; role: "auditor" };
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string };
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
                                data?: { result?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id/remove_permissions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases&apiName=remove_scopes&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_scopes&project=vault&resource=ediscovery.cases&version=v1 document }
                 *
                 * 减少案例范围
                 *
                 * 为指定案例减少被审计人、被审计部门及被审计公共邮箱作为案例范围;;相比于 更新案例 接口，该接口只变更案例范围，调用方式更加轻量级。
                 */
                removeScopes: async (
                    payload?: {
                        data?: {
                            scopes?: Array<{
                                entity_type:
                                    | "im"
                                    | "docs"
                                    | "mail"
                                    | "minutes"
                                    | "calendar";
                                entity: {
                                    users?: Array<string>;
                                    departments?: Array<string>;
                                    public_mails?: Array<string>;
                                };
                            }>;
                        };
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string };
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
                                    scopes?: {
                                        scopes?: Array<{
                                            entity_type:
                                                | "im"
                                                | "docs"
                                                | "mail"
                                                | "minutes"
                                                | "calendar";
                                            entity: {
                                                users?: Array<string>;
                                                departments?: Array<string>;
                                                public_mails?: Array<string>;
                                            };
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id/remove_scopes`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases&apiName=add_scopes&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_scopes&project=vault&resource=ediscovery.cases&version=v1 document }
                 *
                 * 添加案例范围
                 *
                 * 为指定案例添加被审计人、被审计部门及被审计公共邮箱作为案例范围;;相比于 更新案例 接口，该接口只变更案例范围，调用方式更加轻量级。
                 */
                addScopes: async (
                    payload?: {
                        data?: {
                            scopes?: Array<{
                                entity_type:
                                    | "im"
                                    | "docs"
                                    | "mail"
                                    | "minutes"
                                    | "calendar";
                                entity: {
                                    users?: Array<string>;
                                    departments?: Array<string>;
                                    public_mails?: Array<string>;
                                };
                            }>;
                        };
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string };
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
                                    scopes?: {
                                        scopes?: Array<{
                                            entity_type:
                                                | "im"
                                                | "docs"
                                                | "mail"
                                                | "minutes"
                                                | "calendar";
                                            entity: {
                                                users?: Array<string>;
                                                departments?: Array<string>;
                                                public_mails?: Array<string>;
                                            };
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id/add_scopes`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=vault&resource=ediscovery.cases&version=v1 document }
                 *
                 * 更新案例
                 *
                 * 案例创建人可以修改案例，更改案例可审计的服务范围和成员范围、配置案例审计员。
                 */
                update: async (
                    payload?: {
                        data: {
                            name: string;
                            auditors: Array<string>;
                            scopes: Array<{
                                entity_type:
                                    | "im"
                                    | "docs"
                                    | "mail"
                                    | "minutes"
                                    | "calendar";
                                entity: {
                                    users?: Array<string>;
                                    departments?: Array<string>;
                                    public_mails?: Array<string>;
                                };
                            }>;
                            notify_users?: Array<string>;
                            description?: string;
                            audit_time_range?: { from: string; to: string };
                            export_enable?: boolean;
                            id?: string;
                            status?: "open" | "close";
                            create_time?: string;
                            update_time?: string;
                            creator?: {
                                tenant_id?: string;
                                user_id?: string;
                                name?: string;
                                email?: string;
                                app_id?: string;
                            };
                        };
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string };
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
                                    case?: {
                                        name: string;
                                        auditors: Array<string>;
                                        scopes: Array<{
                                            entity_type:
                                                | "im"
                                                | "docs"
                                                | "mail"
                                                | "minutes"
                                                | "calendar";
                                            entity: {
                                                users?: Array<string>;
                                                departments?: Array<string>;
                                                public_mails?: Array<string>;
                                            };
                                        }>;
                                        notify_users?: Array<string>;
                                        description?: string;
                                        audit_time_range?: {
                                            from: string;
                                            to: string;
                                        };
                                        export_enable?: boolean;
                                        id?: string;
                                        status?: "open" | "close";
                                        create_time?: string;
                                        update_time?: string;
                                        creator?: {
                                            tenant_id?: string;
                                            user_id?: string;
                                            name?: string;
                                            email?: string;
                                            app_id?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=vault&resource=ediscovery.cases&version=v1 document }
                 *
                 * 创建案例
                 *
                 * 管理员可以创建案例，设置案例可审计的服务范围和成员范围、配置案例审计员，对应的案例审计员可在案例范围内;对成员进行调查取证。
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            auditors: Array<string>;
                            scopes: Array<{
                                entity_type:
                                    | "im"
                                    | "docs"
                                    | "mail"
                                    | "minutes"
                                    | "calendar";
                                entity: {
                                    users?: Array<string>;
                                    departments?: Array<string>;
                                    public_mails?: Array<string>;
                                };
                            }>;
                            notify_users?: Array<string>;
                            description?: string;
                            audit_time_range?: { from: string; to: string };
                            export_enable?: boolean;
                            id?: string;
                            status?: "open" | "close";
                            create_time?: string;
                            update_time?: string;
                            creator?: {
                                tenant_id?: string;
                                user_id?: string;
                                name?: string;
                                email?: string;
                                app_id?: string;
                            };
                        };
                        params?: {
                            vault_operator_id?: string;
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
                                data?: {
                                    case?: {
                                        name: string;
                                        auditors: Array<string>;
                                        scopes: Array<{
                                            entity_type:
                                                | "im"
                                                | "docs"
                                                | "mail"
                                                | "minutes"
                                                | "calendar";
                                            entity: {
                                                users?: Array<string>;
                                                departments?: Array<string>;
                                                public_mails?: Array<string>;
                                            };
                                        }>;
                                        notify_users?: Array<string>;
                                        description?: string;
                                        audit_time_range?: {
                                            from: string;
                                            to: string;
                                        };
                                        export_enable?: boolean;
                                        id?: string;
                                        status?: "open" | "close";
                                        create_time?: string;
                                        update_time?: string;
                                        creator?: {
                                            tenant_id?: string;
                                            user_id?: string;
                                            name?: string;
                                            email?: string;
                                            app_id?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vault&resource=ediscovery.cases&version=v1 document }
                 *
                 * 查询案例详情
                 *
                 * 案例创建人和审计员可以查询案例详情。
                 */
                get: async (
                    payload?: {
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string };
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
                                    case?: {
                                        name: string;
                                        auditors: Array<string>;
                                        scopes: Array<{
                                            entity_type:
                                                | "im"
                                                | "docs"
                                                | "mail"
                                                | "minutes"
                                                | "calendar";
                                            entity: {
                                                users?: Array<string>;
                                                departments?: Array<string>;
                                                public_mails?: Array<string>;
                                            };
                                        }>;
                                        notify_users?: Array<string>;
                                        description?: string;
                                        audit_time_range?: {
                                            from: string;
                                            to: string;
                                        };
                                        export_enable?: boolean;
                                        id?: string;
                                        status?: "open" | "close";
                                        create_time?: string;
                                        update_time?: string;
                                        creator?: {
                                            tenant_id?: string;
                                            user_id?: string;
                                            name?: string;
                                            email?: string;
                                            app_id?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id`,
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
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    `${this.domain}/open-apis/vault/v1/ediscovery/cases`,
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
                                                        name: string;
                                                        auditors: Array<string>;
                                                        scopes: Array<{
                                                            entity_type:
                                                                | "im"
                                                                | "docs"
                                                                | "mail"
                                                                | "minutes"
                                                                | "calendar";
                                                            entity: {
                                                                users?: Array<string>;
                                                                departments?: Array<string>;
                                                                public_mails?: Array<string>;
                                                            };
                                                        }>;
                                                        notify_users?: Array<string>;
                                                        description?: string;
                                                        audit_time_range?: {
                                                            from: string;
                                                            to: string;
                                                        };
                                                        export_enable?: boolean;
                                                        id?: string;
                                                        status?:
                                                            | "open"
                                                            | "close";
                                                        create_time?: string;
                                                        update_time?: string;
                                                        creator?: {
                                                            tenant_id?: string;
                                                            user_id?: string;
                                                            name?: string;
                                                            email?: string;
                                                            app_id?: string;
                                                        };
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=vault&resource=ediscovery.cases&version=v1 document }
                 *
                 * 查询案例列表
                 *
                 * 管理员可以查询自己创建的案例和自己被配置为审计员的案例。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            vault_operator_id?: string;
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
                                data?: {
                                    items?: Array<{
                                        name: string;
                                        auditors: Array<string>;
                                        scopes: Array<{
                                            entity_type:
                                                | "im"
                                                | "docs"
                                                | "mail"
                                                | "minutes"
                                                | "calendar";
                                            entity: {
                                                users?: Array<string>;
                                                departments?: Array<string>;
                                                public_mails?: Array<string>;
                                            };
                                        }>;
                                        notify_users?: Array<string>;
                                        description?: string;
                                        audit_time_range?: {
                                            from: string;
                                            to: string;
                                        };
                                        export_enable?: boolean;
                                        id?: string;
                                        status?: "open" | "close";
                                        create_time?: string;
                                        update_time?: string;
                                        creator?: {
                                            tenant_id?: string;
                                            user_id?: string;
                                            name?: string;
                                            email?: string;
                                            app_id?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases&apiName=update_creator&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_creator&project=vault&resource=ediscovery.cases&version=v1 document }
                 *
                 * 修改案例创建人
                 */
                updateCreator: async (
                    payload?: {
                        data?: { dummy?: string };
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string };
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
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id/update_creator`,
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
             * csam.attachment
             */
            csamAttachment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=csam.attachment&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=vault&resource=csam.attachment&version=v1 document }
                 *
                 * 删除附件资源
                 *
                 * 输入附件信息以彻底删除消息、文档中的附件
                 */
                create: async (
                    payload?: {
                        data: {
                            biz_id: string;
                            attachment_token: string;
                            attachment_version?: string;
                            deletion_reason?: string;
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
                                    attachment_list?: Array<{
                                        attachment_token?: string;
                                        attachment_version?: string;
                                        attachment_type?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/csam/attachment`,
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
             * ediscovery.cases.exports
             */
            ediscoveryCasesExports: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases.exports&apiName=terminate&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=terminate&project=vault&resource=ediscovery.cases.exports&version=v1 document }
                 *
                 * 终止导出任务
                 *
                 * [案例审计员](https://open.larkoffice.com/document/security_and_compliance-v1/vault-v1/ediscovery/ediscovery-cases/add_permissions)可以更新固证。可以终止导出任务。
                 */
                terminate: async (
                    payload?: {
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string; exports_id: string };
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
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id/exports/:exports_id/terminate`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases.exports&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vault&resource=ediscovery.cases.exports&version=v1 document }
                 *
                 * 查询导出任务
                 *
                 * 案例审计员可以查询导出任务。
                 */
                get: async (
                    payload?: {
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string; exports_id: string };
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
                                    export?: {
                                        case_id: string;
                                        task_name: string;
                                        entity_type:
                                            | "im"
                                            | "docs"
                                            | "mail"
                                            | "minutes"
                                            | "calendar"
                                            | "chat";
                                        data_source?:
                                            | "online"
                                            | "hold"
                                            | "compliance_copy";
                                        id?: string;
                                        creator?: {
                                            tenant_id?: string;
                                            user_id?: string;
                                            name?: string;
                                            email?: string;
                                            app_id?: string;
                                        };
                                        create_time?: string;
                                        update_time?: string;
                                        task_status?: string;
                                        expire_time?: string;
                                        fail_reason?: string;
                                        extract_key?: string;
                                        files?: Array<{
                                            name: string;
                                            size?: string;
                                            download_url?: string;
                                        }>;
                                        entity: {
                                            im_entity?: {
                                                user_ids?: Array<string>;
                                                chat_ids?: Array<string>;
                                                keywords?: string;
                                                chat_type?: Array<number>;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                message_context_radius?: number;
                                                participant_ids?: Array<string>;
                                                with_external_message?: boolean;
                                                with_recall_edit_thread_message?: boolean;
                                                with_attachment?: boolean;
                                                user_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                participant_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                export_chat_scope?: number;
                                                with_thread_message?: boolean;
                                                lark_chat_ids?: Array<string>;
                                                with_recall_message?: boolean;
                                                with_edit_message?: boolean;
                                                only_entity_list?: boolean;
                                            };
                                            docs_entity?: {
                                                user_ids?: Array<string>;
                                                tokens?: Array<string>;
                                                urls?: Array<string>;
                                                keywords?: string;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                update_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                doc_type?: Array<number>;
                                                doc_status?: Array<number>;
                                                with_comment_json?: boolean;
                                                with_comment_embeded?: boolean;
                                                with_block?: boolean;
                                                user_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                url_metas?: Array<{
                                                    url?: string;
                                                    owner_id?: string;
                                                    owner_name?: string;
                                                }>;
                                                locations?: Array<string>;
                                                user_access_type?: string;
                                                object_tokens?: Array<{
                                                    obj_type?: number;
                                                    obj_token?: string;
                                                    obj_type_str?: string;
                                                }>;
                                                only_entity_list?: boolean;
                                                only_metadata?: boolean;
                                            };
                                            mail_entity?: {
                                                user_ids?: Array<string>;
                                                public_mails?: Array<string>;
                                                keywords?: string;
                                                mail_id?: string;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                export_type?: string;
                                                mail_infos?: Array<{
                                                    mail_type?: number;
                                                    user_id?: string;
                                                    id?: string;
                                                    name?: string;
                                                    address?: string;
                                                }>;
                                                label_list?: Array<string>;
                                                exclude_draft?: boolean;
                                            };
                                            minutes_entity?: {
                                                user_ids?: Array<string>;
                                                participant_ids?: Array<string>;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                update_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                keywords?: string;
                                                export_content?:
                                                    | "all"
                                                    | "text"
                                                    | "video";
                                                urls?: Array<string>;
                                                with_metadata?: boolean;
                                                user_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                participant_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                url_metas?: Array<{
                                                    url?: string;
                                                    owner_id?: string;
                                                    owner_name?: string;
                                                }>;
                                                tokens?: Array<string>;
                                                only_entity_list?: boolean;
                                            };
                                            chat_entity?: {
                                                user_ids?: Array<string>;
                                                time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                chat_export_type?: number;
                                                with_external_chat?: boolean;
                                            };
                                            calendar_entity?: {
                                                user_ids: Array<string>;
                                                time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                user_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                only_entity_list?: boolean;
                                                sort_by?: "time" | "version";
                                            };
                                            meeting_entity?: {
                                                user_ids?: Array<string>;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                            };
                                            active_chat_entity?: {
                                                user_ids?: Array<string>;
                                                time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                with_external_chat?: boolean;
                                            };
                                        };
                                        is_partially_completed?: boolean;
                                        entity_progress?: {
                                            im_progress?: {
                                                chat_count_exported?: string;
                                                message_count_in_chat_exporting_exported?: string;
                                                chat_count_total?: string;
                                                message_count_in_chat_exporting_total?: string;
                                            };
                                            docs_progress?: {
                                                doc_count_exported?: string;
                                                doc_count_total?: string;
                                            };
                                            mail_progress?: {
                                                mailbox_count_exported?: string;
                                                mail_count_exported?: string;
                                                mailbox_count_total?: string;
                                                mail_count_total?: string;
                                            };
                                            minutes_progress?: {
                                                minutes_count_exported?: string;
                                                minutes_count_total?: string;
                                            };
                                            calendar_progress?: {
                                                calendar_count_exported?: string;
                                                event_count_exported?: string;
                                                calendar_count_total?: string;
                                            };
                                            meeting_progress?: {
                                                meeting_count_total?: string;
                                                meeting_count_exported?: string;
                                            };
                                        };
                                        geo_sources?: Array<string>;
                                        geo_storage?: string;
                                        data_scope?:
                                            | "owned_data_scope"
                                            | "held_data_scope";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id/exports/:exports_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases.exports&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=vault&resource=ediscovery.cases.exports&version=v1 document }
                 *
                 * 创建导出任务
                 *
                 * 案例审计员可以创建导出任务，支持消息、文档、邮件、日程。
                 *
                 * **频率限制**;- 对于每种 Entity 资源，每个租户最多只能同时运行 5 个导出任务，超过该频率限制，接口将返回 HTTP 状态码 403 及错误码 2201004。当请求被限频，应用需要处理限频状态码，并使用指数退避算法或其它一些频控策略降低对 API 的调用速率。;- 另外，为保障服务的稳定性，对于每种 Entity 资源限制了全局的最大运行导出任务数，若所有租户运行导出任务过多，接口将返回 HTTP 状态码 403 及错误码 2201005。当请求被限频时，请稍候重试。若重试多次仍无法解决请寻求客服帮助。
                 */
                create: async (
                    payload?: {
                        data: {
                            case_id: string;
                            task_name: string;
                            entity_type:
                                | "im"
                                | "docs"
                                | "mail"
                                | "minutes"
                                | "calendar"
                                | "chat";
                            data_source?: "online" | "hold" | "compliance_copy";
                            id?: string;
                            creator?: {
                                tenant_id?: string;
                                user_id?: string;
                                name?: string;
                                email?: string;
                                app_id?: string;
                            };
                            create_time?: string;
                            update_time?: string;
                            task_status?: string;
                            expire_time?: string;
                            fail_reason?: string;
                            extract_key?: string;
                            files?: Array<{
                                name: string;
                                size?: string;
                                download_url?: string;
                            }>;
                            entity: {
                                im_entity?: {
                                    user_ids?: Array<string>;
                                    chat_ids?: Array<string>;
                                    keywords?: string;
                                    chat_type?: Array<number>;
                                    create_time_range?: {
                                        from: string;
                                        to: string;
                                    };
                                    message_context_radius?: number;
                                    participant_ids?: Array<string>;
                                    with_external_message?: boolean;
                                    with_recall_edit_thread_message?: boolean;
                                    with_attachment?: boolean;
                                    user_infos?: Array<{
                                        tenant_id?: string;
                                        user_id?: string;
                                        name?: string;
                                        email?: string;
                                        app_id?: string;
                                    }>;
                                    participant_infos?: Array<{
                                        tenant_id?: string;
                                        user_id?: string;
                                        name?: string;
                                        email?: string;
                                        app_id?: string;
                                    }>;
                                    export_chat_scope?: number;
                                    with_thread_message?: boolean;
                                    lark_chat_ids?: Array<string>;
                                    with_recall_message?: boolean;
                                    with_edit_message?: boolean;
                                    only_entity_list?: boolean;
                                };
                                docs_entity?: {
                                    user_ids?: Array<string>;
                                    tokens?: Array<string>;
                                    urls?: Array<string>;
                                    keywords?: string;
                                    create_time_range?: {
                                        from: string;
                                        to: string;
                                    };
                                    update_time_range?: {
                                        from: string;
                                        to: string;
                                    };
                                    doc_type?: Array<number>;
                                    doc_status?: Array<number>;
                                    with_comment_json?: boolean;
                                    with_comment_embeded?: boolean;
                                    with_block?: boolean;
                                    user_infos?: Array<{
                                        tenant_id?: string;
                                        user_id?: string;
                                        name?: string;
                                        email?: string;
                                        app_id?: string;
                                    }>;
                                    url_metas?: Array<{
                                        url?: string;
                                        owner_id?: string;
                                        owner_name?: string;
                                    }>;
                                    locations?: Array<string>;
                                    user_access_type?: string;
                                    object_tokens?: Array<{
                                        obj_type?: number;
                                        obj_token?: string;
                                        obj_type_str?: string;
                                    }>;
                                    only_entity_list?: boolean;
                                    only_metadata?: boolean;
                                };
                                mail_entity?: {
                                    user_ids?: Array<string>;
                                    public_mails?: Array<string>;
                                    keywords?: string;
                                    mail_id?: string;
                                    create_time_range?: {
                                        from: string;
                                        to: string;
                                    };
                                    export_type?: string;
                                    mail_infos?: Array<{
                                        mail_type?: number;
                                        user_id?: string;
                                        id?: string;
                                        name?: string;
                                        address?: string;
                                    }>;
                                    label_list?: Array<string>;
                                    exclude_draft?: boolean;
                                };
                                minutes_entity?: {
                                    user_ids?: Array<string>;
                                    participant_ids?: Array<string>;
                                    create_time_range?: {
                                        from: string;
                                        to: string;
                                    };
                                    update_time_range?: {
                                        from: string;
                                        to: string;
                                    };
                                    keywords?: string;
                                    export_content?: "all" | "text" | "video";
                                    urls?: Array<string>;
                                    with_metadata?: boolean;
                                    user_infos?: Array<{
                                        tenant_id?: string;
                                        user_id?: string;
                                        name?: string;
                                        email?: string;
                                        app_id?: string;
                                    }>;
                                    participant_infos?: Array<{
                                        tenant_id?: string;
                                        user_id?: string;
                                        name?: string;
                                        email?: string;
                                        app_id?: string;
                                    }>;
                                    url_metas?: Array<{
                                        url?: string;
                                        owner_id?: string;
                                        owner_name?: string;
                                    }>;
                                    tokens?: Array<string>;
                                    only_entity_list?: boolean;
                                };
                                chat_entity?: {
                                    user_ids?: Array<string>;
                                    time_range?: { from: string; to: string };
                                    chat_export_type?: number;
                                    with_external_chat?: boolean;
                                };
                                calendar_entity?: {
                                    user_ids: Array<string>;
                                    time_range?: { from: string; to: string };
                                    user_infos?: Array<{
                                        tenant_id?: string;
                                        user_id?: string;
                                        name?: string;
                                        email?: string;
                                        app_id?: string;
                                    }>;
                                    only_entity_list?: boolean;
                                    sort_by?: "time" | "version";
                                };
                                meeting_entity?: {
                                    user_ids?: Array<string>;
                                    create_time_range?: {
                                        from: string;
                                        to: string;
                                    };
                                };
                                active_chat_entity?: {
                                    user_ids?: Array<string>;
                                    time_range?: { from: string; to: string };
                                    with_external_chat?: boolean;
                                };
                            };
                            is_partially_completed?: boolean;
                            entity_progress?: {
                                im_progress?: {
                                    chat_count_exported?: string;
                                    message_count_in_chat_exporting_exported?: string;
                                    chat_count_total?: string;
                                    message_count_in_chat_exporting_total?: string;
                                };
                                docs_progress?: {
                                    doc_count_exported?: string;
                                    doc_count_total?: string;
                                };
                                mail_progress?: {
                                    mailbox_count_exported?: string;
                                    mail_count_exported?: string;
                                    mailbox_count_total?: string;
                                    mail_count_total?: string;
                                };
                                minutes_progress?: {
                                    minutes_count_exported?: string;
                                    minutes_count_total?: string;
                                };
                                calendar_progress?: {
                                    calendar_count_exported?: string;
                                    event_count_exported?: string;
                                    calendar_count_total?: string;
                                };
                                meeting_progress?: {
                                    meeting_count_total?: string;
                                    meeting_count_exported?: string;
                                };
                            };
                            geo_sources?: Array<string>;
                            geo_storage?: string;
                            data_scope?: "owned_data_scope" | "held_data_scope";
                        };
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string };
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
                                    export?: {
                                        case_id: string;
                                        task_name: string;
                                        entity_type:
                                            | "im"
                                            | "docs"
                                            | "mail"
                                            | "minutes"
                                            | "calendar"
                                            | "chat";
                                        data_source?:
                                            | "online"
                                            | "hold"
                                            | "compliance_copy";
                                        id?: string;
                                        creator?: {
                                            tenant_id?: string;
                                            user_id?: string;
                                            name?: string;
                                            email?: string;
                                            app_id?: string;
                                        };
                                        create_time?: string;
                                        update_time?: string;
                                        task_status?: string;
                                        expire_time?: string;
                                        fail_reason?: string;
                                        extract_key?: string;
                                        files?: Array<{
                                            name: string;
                                            size?: string;
                                            download_url?: string;
                                        }>;
                                        entity: {
                                            im_entity?: {
                                                user_ids?: Array<string>;
                                                chat_ids?: Array<string>;
                                                keywords?: string;
                                                chat_type?: Array<number>;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                message_context_radius?: number;
                                                participant_ids?: Array<string>;
                                                with_external_message?: boolean;
                                                with_recall_edit_thread_message?: boolean;
                                                with_attachment?: boolean;
                                                user_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                participant_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                export_chat_scope?: number;
                                                with_thread_message?: boolean;
                                                lark_chat_ids?: Array<string>;
                                                with_recall_message?: boolean;
                                                with_edit_message?: boolean;
                                                only_entity_list?: boolean;
                                            };
                                            docs_entity?: {
                                                user_ids?: Array<string>;
                                                tokens?: Array<string>;
                                                urls?: Array<string>;
                                                keywords?: string;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                update_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                doc_type?: Array<number>;
                                                doc_status?: Array<number>;
                                                with_comment_json?: boolean;
                                                with_comment_embeded?: boolean;
                                                with_block?: boolean;
                                                user_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                url_metas?: Array<{
                                                    url?: string;
                                                    owner_id?: string;
                                                    owner_name?: string;
                                                }>;
                                                locations?: Array<string>;
                                                user_access_type?: string;
                                                object_tokens?: Array<{
                                                    obj_type?: number;
                                                    obj_token?: string;
                                                    obj_type_str?: string;
                                                }>;
                                                only_entity_list?: boolean;
                                                only_metadata?: boolean;
                                            };
                                            mail_entity?: {
                                                user_ids?: Array<string>;
                                                public_mails?: Array<string>;
                                                keywords?: string;
                                                mail_id?: string;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                export_type?: string;
                                                mail_infos?: Array<{
                                                    mail_type?: number;
                                                    user_id?: string;
                                                    id?: string;
                                                    name?: string;
                                                    address?: string;
                                                }>;
                                                label_list?: Array<string>;
                                                exclude_draft?: boolean;
                                            };
                                            minutes_entity?: {
                                                user_ids?: Array<string>;
                                                participant_ids?: Array<string>;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                update_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                keywords?: string;
                                                export_content?:
                                                    | "all"
                                                    | "text"
                                                    | "video";
                                                urls?: Array<string>;
                                                with_metadata?: boolean;
                                                user_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                participant_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                url_metas?: Array<{
                                                    url?: string;
                                                    owner_id?: string;
                                                    owner_name?: string;
                                                }>;
                                                tokens?: Array<string>;
                                                only_entity_list?: boolean;
                                            };
                                            chat_entity?: {
                                                user_ids?: Array<string>;
                                                time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                chat_export_type?: number;
                                                with_external_chat?: boolean;
                                            };
                                            calendar_entity?: {
                                                user_ids: Array<string>;
                                                time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                user_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                only_entity_list?: boolean;
                                                sort_by?: "time" | "version";
                                            };
                                            meeting_entity?: {
                                                user_ids?: Array<string>;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                            };
                                            active_chat_entity?: {
                                                user_ids?: Array<string>;
                                                time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                with_external_chat?: boolean;
                                            };
                                        };
                                        is_partially_completed?: boolean;
                                        entity_progress?: {
                                            im_progress?: {
                                                chat_count_exported?: string;
                                                message_count_in_chat_exporting_exported?: string;
                                                chat_count_total?: string;
                                                message_count_in_chat_exporting_total?: string;
                                            };
                                            docs_progress?: {
                                                doc_count_exported?: string;
                                                doc_count_total?: string;
                                            };
                                            mail_progress?: {
                                                mailbox_count_exported?: string;
                                                mail_count_exported?: string;
                                                mailbox_count_total?: string;
                                                mail_count_total?: string;
                                            };
                                            minutes_progress?: {
                                                minutes_count_exported?: string;
                                                minutes_count_total?: string;
                                            };
                                            calendar_progress?: {
                                                calendar_count_exported?: string;
                                                event_count_exported?: string;
                                                calendar_count_total?: string;
                                            };
                                            meeting_progress?: {
                                                meeting_count_total?: string;
                                                meeting_count_exported?: string;
                                            };
                                        };
                                        geo_sources?: Array<string>;
                                        geo_storage?: string;
                                        data_scope?:
                                            | "owned_data_scope"
                                            | "held_data_scope";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id/exports`,
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
             * ediscovery.cases.holds
             */
            ediscoveryCasesHolds: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases.holds&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=vault&resource=ediscovery.cases.holds&version=v1 document }
                 *
                 * 删除固证
                 *
                 * [案例审计员](https://open.larkoffice.com/document/security_and_compliance-v1/vault-v1/ediscovery/ediscovery-cases/add_permissions)可以删除固证。
                 */
                delete: async (
                    payload?: {
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string; holds_id: string };
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
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id/holds/:holds_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases.holds&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vault&resource=ediscovery.cases.holds&version=v1 document }
                 *
                 * 查询固证详情
                 *
                 * 案例审计员可以查询固证详情。
                 */
                get: async (
                    payload?: {
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string; holds_id: string };
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
                                    hold?: {
                                        name?: string;
                                        case_id?: string;
                                        scopes?: {
                                            im_scope?: {};
                                            docs_scope?: {};
                                            vc_scope?: {};
                                            mail_scope?: {};
                                            calendar_scope?: {};
                                        };
                                        description?: string;
                                        id?: string;
                                        status?: string;
                                        create_time?: string;
                                        creator?: {
                                            tenant_id?: string;
                                            user_id?: string;
                                            name?: string;
                                            email?: string;
                                            app_id?: string;
                                        };
                                        custodians?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id/holds/:holds_id`,
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
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string };
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
                                    `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id/holds`,
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
                                                        name?: string;
                                                        case_id?: string;
                                                        scopes?: {
                                                            im_scope?: {};
                                                            docs_scope?: {};
                                                            vc_scope?: {};
                                                            mail_scope?: {};
                                                            calendar_scope?: {};
                                                        };
                                                        description?: string;
                                                        id?: string;
                                                        status?: string;
                                                        create_time?: string;
                                                        creator?: {
                                                            tenant_id?: string;
                                                            user_id?: string;
                                                            name?: string;
                                                            email?: string;
                                                            app_id?: string;
                                                        };
                                                        custodians?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases.holds&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=vault&resource=ediscovery.cases.holds&version=v1 document }
                 *
                 * 查询固证列表
                 *
                 * 案例审计员可以查询固证列表。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string };
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
                                        name?: string;
                                        case_id?: string;
                                        scopes?: {
                                            im_scope?: {};
                                            docs_scope?: {};
                                            vc_scope?: {};
                                            mail_scope?: {};
                                            calendar_scope?: {};
                                        };
                                        description?: string;
                                        id?: string;
                                        status?: string;
                                        create_time?: string;
                                        creator?: {
                                            tenant_id?: string;
                                            user_id?: string;
                                            name?: string;
                                            email?: string;
                                            app_id?: string;
                                        };
                                        custodians?: Array<string>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id/holds`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases.holds&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=vault&resource=ediscovery.cases.holds&version=v1 document }
                 *
                 * 创建固证
                 *
                 * 案例审计员可以创建固证。
                 */
                create: async (
                    payload?: {
                        data?: {
                            name?: string;
                            case_id?: string;
                            scopes?: {
                                im_scope?: {};
                                docs_scope?: {};
                                vc_scope?: {};
                                mail_scope?: {};
                                calendar_scope?: {};
                            };
                            description?: string;
                            id?: string;
                            status?: string;
                            create_time?: string;
                            creator?: {
                                tenant_id?: string;
                                user_id?: string;
                                name?: string;
                                email?: string;
                                app_id?: string;
                            };
                            custodians?: Array<string>;
                        };
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string };
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
                                    hold?: {
                                        name?: string;
                                        case_id?: string;
                                        scopes?: {
                                            im_scope?: {};
                                            docs_scope?: {};
                                            vc_scope?: {};
                                            mail_scope?: {};
                                            calendar_scope?: {};
                                        };
                                        description?: string;
                                        id?: string;
                                        status?: string;
                                        create_time?: string;
                                        creator?: {
                                            tenant_id?: string;
                                            user_id?: string;
                                            name?: string;
                                            email?: string;
                                            app_id?: string;
                                        };
                                        custodians?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id/holds`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases.holds&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=vault&resource=ediscovery.cases.holds&version=v1 document }
                 *
                 * 更新固证
                 *
                 * [案例审计员](https://open.larkoffice.com/document/security_and_compliance-v1/vault-v1/ediscovery/ediscovery-cases/add_permissions)可以更新固证。
                 */
                update: async (
                    payload?: {
                        data?: {
                            name?: string;
                            case_id?: string;
                            scopes?: {
                                im_scope?: {};
                                docs_scope?: {};
                                vc_scope?: {};
                                mail_scope?: {};
                                calendar_scope?: {};
                            };
                            description?: string;
                            id?: string;
                            status?: string;
                            create_time?: string;
                            creator?: {
                                tenant_id?: string;
                                user_id?: string;
                                name?: string;
                                email?: string;
                                app_id?: string;
                            };
                            custodians?: Array<string>;
                        };
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string; holds_id: string };
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
                                    hold?: {
                                        name?: string;
                                        case_id?: string;
                                        scopes?: {
                                            im_scope?: {};
                                            docs_scope?: {};
                                            vc_scope?: {};
                                            mail_scope?: {};
                                            calendar_scope?: {};
                                        };
                                        description?: string;
                                        id?: string;
                                        status?: string;
                                        create_time?: string;
                                        creator?: {
                                            tenant_id?: string;
                                            user_id?: string;
                                            name?: string;
                                            email?: string;
                                            app_id?: string;
                                        };
                                        custodians?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id/holds/:holds_id`,
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
             * ediscovery.downloads
             */
            ediscoveryDownloads: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.downloads&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vault&resource=ediscovery.downloads&version=v1 document }
                 *
                 * 下载文件
                 *
                 * 案例审计员可以下载文件，可将文件下载到本地。
                 */
                get: async (
                    payload?: {
                        params: {
                            type:
                                | "task_file"
                                | "im_resource_file"
                                | "im_attachment_file"
                                | "mail_attachment_file";
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { download_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/downloads/:download_id`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                            $return_headers: true,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    const checkIsReadable = () => {
                        const consumedError =
                            "The stream has already been consumed";
                        if (!res.data.readable) {
                            this.logger.error(consumedError);
                            throw new Error(consumedError);
                        }
                    };

                    return {
                        writeFile: async (filePath: string) => {
                            checkIsReadable();
                            return new Promise((resolve, reject) => {
                                const writableStream =
                                    fs.createWriteStream(filePath);
                                writableStream.on("finish", () => {
                                    resolve(filePath);
                                });
                                writableStream.on("error", (e) => {
                                    reject(e);
                                });
                                res.data.pipe(writableStream);
                            });
                        },
                        getReadableStream: () => {
                            checkIsReadable();
                            return res.data as Readable;
                        },
                        headers: res.headers,
                    };
                },
            },
            /**
             * ediscovery.hold_custodian
             */
            ediscoveryHoldCustodian: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.hold_custodian&apiName=status&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=status&project=vault&resource=ediscovery.hold_custodian&version=v1 document }
                 */
                status: async (
                    payload?: {
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { custodian_id: string };
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
                                        id?: string;
                                        relation_hold_count?: number;
                                        valid_time?: string;
                                        scheduler_psm?: string;
                                        entity_type?: string;
                                        entity_status?: string;
                                        task_id?: string;
                                        task_status?: string;
                                        task_start_time?: string;
                                        task_end_time?: string;
                                        created_time?: string;
                                        updated_time?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/custodians/:custodian_id/status`,
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
                holdsWithIterator: async (
                    payload?: {
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { custodian_id: string };
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
                                    `${this.domain}/open-apis/vault/v1/ediscovery/custodians/:custodian_id/holds`,
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
                                                        name?: string;
                                                        case_id?: string;
                                                        scopes?: {
                                                            im_scope?: {};
                                                            docs_scope?: {};
                                                            vc_scope?: {};
                                                            mail_scope?: {};
                                                            calendar_scope?: {};
                                                        };
                                                        description?: string;
                                                        id?: string;
                                                        status?: string;
                                                        create_time?: string;
                                                        creator?: {
                                                            tenant_id?: string;
                                                            user_id?: string;
                                                            name?: string;
                                                            email?: string;
                                                            app_id?: string;
                                                        };
                                                        custodians?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.hold_custodian&apiName=holds&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=holds&project=vault&resource=ediscovery.hold_custodian&version=v1 document }
                 */
                holds: async (
                    payload?: {
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { custodian_id: string };
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
                                        name?: string;
                                        case_id?: string;
                                        scopes?: {
                                            im_scope?: {};
                                            docs_scope?: {};
                                            vc_scope?: {};
                                            mail_scope?: {};
                                            calendar_scope?: {};
                                        };
                                        description?: string;
                                        id?: string;
                                        status?: string;
                                        create_time?: string;
                                        creator?: {
                                            tenant_id?: string;
                                            user_id?: string;
                                            name?: string;
                                            email?: string;
                                            app_id?: string;
                                        };
                                        custodians?: Array<string>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/custodians/:custodian_id/holds`,
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
             * ediscovery.cases.holds.custodians.add
             */
            ediscoveryCasesHoldsCustodiansAdd: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases.holds.custodians.add&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=vault&resource=ediscovery.cases.holds.custodians.add&version=v1 document }
                 *
                 * 增加固证人员
                 *
                 * [案例审计员](https://open.larkoffice.com/document/security_and_compliance-v1/vault-v1/ediscovery/ediscovery-cases/add_permissions)可以增加固证人员。
                 */
                create: async (
                    payload?: {
                        data: { custodians: Array<string> };
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string; holds_id: string };
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
                                    hold?: {
                                        name?: string;
                                        case_id?: string;
                                        scopes?: {
                                            im_scope?: {};
                                            docs_scope?: {};
                                            vc_scope?: {};
                                            mail_scope?: {};
                                            calendar_scope?: {};
                                        };
                                        description?: string;
                                        id?: string;
                                        status?: string;
                                        create_time?: string;
                                        creator?: {
                                            tenant_id?: string;
                                            user_id?: string;
                                            name?: string;
                                            email?: string;
                                            app_id?: string;
                                        };
                                        custodians?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id/holds/:holds_id/custodians/add`,
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
             * ediscovery.cases.holds.custodians.remove
             */
            ediscoveryCasesHoldsCustodiansRemove: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=ediscovery.cases.holds.custodians.remove&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=vault&resource=ediscovery.cases.holds.custodians.remove&version=v1 document }
                 *
                 * 移除固证人员
                 *
                 * [案例审计员](https://open.larkoffice.com/document/security_and_compliance-v1/vault-v1/ediscovery/ediscovery-cases/add_permissions)可以移除固证人员。
                 */
                create: async (
                    payload?: {
                        data: { custodians: Array<string> };
                        params?: {
                            vault_operator_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { cases_id: string; holds_id: string };
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
                                    hold?: {
                                        name?: string;
                                        case_id?: string;
                                        scopes?: {
                                            im_scope?: {};
                                            docs_scope?: {};
                                            vc_scope?: {};
                                            mail_scope?: {};
                                            calendar_scope?: {};
                                        };
                                        description?: string;
                                        id?: string;
                                        status?: string;
                                        create_time?: string;
                                        creator?: {
                                            tenant_id?: string;
                                            user_id?: string;
                                            name?: string;
                                            email?: string;
                                            app_id?: string;
                                        };
                                        custodians?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/ediscovery/cases/:cases_id/holds/:holds_id/custodians/remove`,
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
             * content.downloads
             */
            contentDownloads: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=content.downloads&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vault&resource=content.downloads&version=v1 document }
                 *
                 * 下载文件
                 *
                 * 根据下载链接下载指定的文件。
                 */
                get: async (
                    payload?: {
                        params: {
                            type:
                                | "task_file"
                                | "im_resource_file"
                                | "im_attachment_file"
                                | "mail_attachment_file";
                        };
                        path: { download_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/content/downloads/:download_id`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                            $return_headers: true,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    const checkIsReadable = () => {
                        const consumedError =
                            "The stream has already been consumed";
                        if (!res.data.readable) {
                            this.logger.error(consumedError);
                            throw new Error(consumedError);
                        }
                    };

                    return {
                        writeFile: async (filePath: string) => {
                            checkIsReadable();
                            return new Promise((resolve, reject) => {
                                const writableStream =
                                    fs.createWriteStream(filePath);
                                writableStream.on("finish", () => {
                                    resolve(filePath);
                                });
                                writableStream.on("error", (e) => {
                                    reject(e);
                                });
                                res.data.pipe(writableStream);
                            });
                        },
                        getReadableStream: () => {
                            checkIsReadable();
                            return res.data as Readable;
                        },
                        headers: res.headers,
                    };
                },
            },
            /**
             * content.exports
             */
            contentExports: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=content.exports&apiName=terminate&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=terminate&project=vault&resource=content.exports&version=v1 document }
                 */
                terminate: async (
                    payload?: {
                        path: { exports_id: string };
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
                                `${this.domain}/open-apis/vault/v1/content/exports/:exports_id/terminate`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=content.exports&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vault&resource=content.exports&version=v1 document }
                 *
                 * 查询导出任务
                 *
                 * 查询导出任务的状态。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { exports_id: string };
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
                                    export?: {
                                        task_name: string;
                                        entity_type:
                                            | "im"
                                            | "docs"
                                            | "mail"
                                            | "minutes"
                                            | "chat"
                                            | "calendar"
                                            | "meeting";
                                        id?: string;
                                        creator?: {
                                            tenant_id?: string;
                                            user_id?: string;
                                            name?: string;
                                            email?: string;
                                            app_id?: string;
                                        };
                                        creator_type?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        expire_time?: string;
                                        task_status?: string;
                                        fail_reason?: string;
                                        extract_key?: string;
                                        files?: Array<{
                                            name: string;
                                            size?: string;
                                            download_url?: string;
                                        }>;
                                        entity: {
                                            im_entity?: {
                                                user_ids?: Array<string>;
                                                chat_ids?: Array<string>;
                                                keywords?: string;
                                                chat_type?: Array<number>;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                message_context_radius?: number;
                                                participant_ids?: Array<string>;
                                                with_external_message?: boolean;
                                                with_recall_edit_thread_message?: boolean;
                                                with_attachment?: boolean;
                                                user_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                participant_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                export_chat_scope?: number;
                                                with_thread_message?: boolean;
                                                lark_chat_ids?: Array<string>;
                                                with_recall_message?: boolean;
                                                with_edit_message?: boolean;
                                                only_entity_list?: boolean;
                                            };
                                            docs_entity?: {
                                                user_ids?: Array<string>;
                                                tokens?: Array<string>;
                                                urls?: Array<string>;
                                                keywords?: string;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                update_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                doc_type?: Array<number>;
                                                doc_status?: Array<number>;
                                                with_comment_json?: boolean;
                                                with_comment_embeded?: boolean;
                                                with_block?: boolean;
                                                user_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                url_metas?: Array<{
                                                    url?: string;
                                                    owner_id?: string;
                                                    owner_name?: string;
                                                }>;
                                                locations?: Array<string>;
                                                user_access_type?: string;
                                                object_tokens?: Array<{
                                                    obj_type?: number;
                                                    obj_token?: string;
                                                    obj_type_str?: string;
                                                }>;
                                                only_entity_list?: boolean;
                                                only_metadata?: boolean;
                                            };
                                            mail_entity?: {
                                                user_ids?: Array<string>;
                                                public_mails?: Array<string>;
                                                keywords?: string;
                                                mail_id?: string;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                export_type?: string;
                                                mail_infos?: Array<{
                                                    mail_type?: number;
                                                    user_id?: string;
                                                    id?: string;
                                                    name?: string;
                                                    address?: string;
                                                }>;
                                                label_list?: Array<string>;
                                                exclude_draft?: boolean;
                                            };
                                            minutes_entity?: {
                                                user_ids?: Array<string>;
                                                participant_ids?: Array<string>;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                update_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                keywords?: string;
                                                export_content?:
                                                    | "all"
                                                    | "text"
                                                    | "video";
                                                urls?: Array<string>;
                                                with_metadata?: boolean;
                                                user_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                participant_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                url_metas?: Array<{
                                                    url?: string;
                                                    owner_id?: string;
                                                    owner_name?: string;
                                                }>;
                                                tokens?: Array<string>;
                                                only_entity_list?: boolean;
                                            };
                                            chat_entity?: {
                                                user_ids?: Array<string>;
                                                time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                chat_export_type?: number;
                                                with_external_chat?: boolean;
                                            };
                                            calendar_entity?: {
                                                user_ids: Array<string>;
                                                time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                user_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                only_entity_list?: boolean;
                                                sort_by?: "time" | "version";
                                            };
                                            meeting_entity?: {
                                                user_ids?: Array<string>;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                            };
                                            active_chat_entity?: {
                                                user_ids?: Array<string>;
                                                time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                with_external_chat?: boolean;
                                            };
                                        };
                                        is_partially_completed?: boolean;
                                        entity_progress?: {
                                            im_progress?: {
                                                chat_count_exported?: string;
                                                message_count_in_chat_exporting_exported?: string;
                                                chat_count_total?: string;
                                                message_count_in_chat_exporting_total?: string;
                                            };
                                            docs_progress?: {
                                                doc_count_exported?: string;
                                                doc_count_total?: string;
                                            };
                                            mail_progress?: {
                                                mailbox_count_exported?: string;
                                                mail_count_exported?: string;
                                                mailbox_count_total?: string;
                                                mail_count_total?: string;
                                            };
                                            minutes_progress?: {
                                                minutes_count_exported?: string;
                                                minutes_count_total?: string;
                                            };
                                            calendar_progress?: {
                                                calendar_count_exported?: string;
                                                event_count_exported?: string;
                                                calendar_count_total?: string;
                                            };
                                            meeting_progress?: {
                                                meeting_count_total?: string;
                                                meeting_count_exported?: string;
                                            };
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/content/exports/:exports_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=content.exports&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=vault&resource=content.exports&version=v1 document }
                 *
                 * 创建导出任务
                 *
                 * 发起消息、文档、邮件、妙记、日历等调证导出任务。;1. 文档，支持按成员或链接导出文档; 1. 按成员导出文档，导出范围包括用户作为“所有者”的云盘中的云文档，包括文档、电子表格、幻灯片、多维表格、思维导图、文件; 2. 按链接导出文档，导出范围为本租户内的云文档;2. 消息; 1. 支持按成员查询群信息; 1. 查询成员当前所在的群; 2. 查询成员发过消息的群; 3. 查询成员入退群记录; 2. 支持按成员导出消息; 1. 导出成员当前所在的会话里的信息，包括外部群; 3. 支持按会话 ID 导出消息; 1. 导出会话里的消息;3. 日历日程，支持按成员导出日历和日程;4. 妙记，支持按成员或者链接导出妙记; 1. 按成员导出，导出用户作为“所有者”的妙记; 2. 按链接导出，导出本租户成员为所有者的妙记，无法导出外部联系人的妙记; 其中，妙记包含妙记视频、文本、metadata。;5. 邮箱，支持按成员和公共邮箱导出邮件。内容包含收件箱、发件箱、草稿、已归档、已删除的邮件以及垃圾邮件
                 */
                create: async (
                    payload?: {
                        data?: {
                            task_name?: string;
                            entity_type?:
                                | "im"
                                | "docs"
                                | "mail"
                                | "minutes"
                                | "chat"
                                | "calendar"
                                | "meeting"
                                | "active_chat";
                            id?: string;
                            creator?: {
                                tenant_id?: string;
                                user_id?: string;
                                name?: string;
                                email?: string;
                                app_id?: string;
                            };
                            creator_type?: string;
                            create_time?: string;
                            update_time?: string;
                            expire_time?: string;
                            task_status?: string;
                            fail_reason?: string;
                            extract_key?: string;
                            files?: Array<{
                                name: string;
                                size?: string;
                                download_url?: string;
                            }>;
                            entity?: {
                                im_entity?: {
                                    user_ids?: Array<string>;
                                    chat_ids?: Array<string>;
                                    keywords?: string;
                                    chat_type?: Array<number>;
                                    create_time_range?: {
                                        from: string;
                                        to: string;
                                    };
                                    message_context_radius?: number;
                                    participant_ids?: Array<string>;
                                    with_external_message?: boolean;
                                    with_recall_edit_thread_message?: boolean;
                                    with_attachment?: boolean;
                                    user_infos?: Array<{
                                        tenant_id?: string;
                                        user_id?: string;
                                        name?: string;
                                        email?: string;
                                        app_id?: string;
                                    }>;
                                    participant_infos?: Array<{
                                        tenant_id?: string;
                                        user_id?: string;
                                        name?: string;
                                        email?: string;
                                        app_id?: string;
                                    }>;
                                    export_chat_scope?: number;
                                    with_thread_message?: boolean;
                                    lark_chat_ids?: Array<string>;
                                    with_recall_message?: boolean;
                                    with_edit_message?: boolean;
                                    only_entity_list?: boolean;
                                };
                                docs_entity?: {
                                    user_ids?: Array<string>;
                                    tokens?: Array<string>;
                                    urls?: Array<string>;
                                    keywords?: string;
                                    create_time_range?: {
                                        from: string;
                                        to: string;
                                    };
                                    update_time_range?: {
                                        from: string;
                                        to: string;
                                    };
                                    doc_type?: Array<number>;
                                    doc_status?: Array<number>;
                                    with_comment_json?: boolean;
                                    with_comment_embeded?: boolean;
                                    with_block?: boolean;
                                    user_infos?: Array<{
                                        tenant_id?: string;
                                        user_id?: string;
                                        name?: string;
                                        email?: string;
                                        app_id?: string;
                                    }>;
                                    url_metas?: Array<{
                                        url?: string;
                                        owner_id?: string;
                                        owner_name?: string;
                                    }>;
                                    locations?: Array<string>;
                                    user_access_type?: string;
                                    object_tokens?: Array<{
                                        obj_type?: number;
                                        obj_token?: string;
                                        obj_type_str?: string;
                                    }>;
                                    only_entity_list?: boolean;
                                    only_metadata?: boolean;
                                };
                                mail_entity?: {
                                    user_ids?: Array<string>;
                                    public_mails?: Array<string>;
                                    keywords?: string;
                                    mail_id?: string;
                                    create_time_range?: {
                                        from: string;
                                        to: string;
                                    };
                                    export_type?: string;
                                    mail_infos?: Array<{
                                        mail_type?: number;
                                        user_id?: string;
                                        id?: string;
                                        name?: string;
                                        address?: string;
                                    }>;
                                    label_list?: Array<string>;
                                    exclude_draft?: boolean;
                                };
                                minutes_entity?: {
                                    user_ids?: Array<string>;
                                    participant_ids?: Array<string>;
                                    create_time_range?: {
                                        from: string;
                                        to: string;
                                    };
                                    update_time_range?: {
                                        from: string;
                                        to: string;
                                    };
                                    keywords?: string;
                                    export_content?: "all" | "text" | "video";
                                    urls?: Array<string>;
                                    with_metadata?: boolean;
                                    user_infos?: Array<{
                                        tenant_id?: string;
                                        user_id?: string;
                                        name?: string;
                                        email?: string;
                                        app_id?: string;
                                    }>;
                                    participant_infos?: Array<{
                                        tenant_id?: string;
                                        user_id?: string;
                                        name?: string;
                                        email?: string;
                                        app_id?: string;
                                    }>;
                                    url_metas?: Array<{
                                        url?: string;
                                        owner_id?: string;
                                        owner_name?: string;
                                    }>;
                                    tokens?: Array<string>;
                                    only_entity_list?: boolean;
                                };
                                chat_entity?: {
                                    user_ids?: Array<string>;
                                    time_range?: { from: string; to: string };
                                    chat_export_type?: number;
                                    with_external_chat?: boolean;
                                };
                                calendar_entity?: {
                                    user_ids: Array<string>;
                                    time_range?: { from: string; to: string };
                                    user_infos?: Array<{
                                        tenant_id?: string;
                                        user_id?: string;
                                        name?: string;
                                        email?: string;
                                        app_id?: string;
                                    }>;
                                    only_entity_list?: boolean;
                                    sort_by?: "time" | "version";
                                };
                                meeting_entity?: {
                                    user_ids?: Array<string>;
                                    create_time_range?: {
                                        from: string;
                                        to: string;
                                    };
                                };
                                active_chat_entity?: {
                                    user_ids?: Array<string>;
                                    time_range?: { from: string; to: string };
                                    with_external_chat?: boolean;
                                };
                            };
                            is_partially_completed?: boolean;
                            entity_progress?: {
                                im_progress?: {
                                    chat_count_exported?: string;
                                    message_count_in_chat_exporting_exported?: string;
                                    chat_count_total?: string;
                                    message_count_in_chat_exporting_total?: string;
                                };
                                docs_progress?: {
                                    doc_count_exported?: string;
                                    doc_count_total?: string;
                                };
                                mail_progress?: {
                                    mailbox_count_exported?: string;
                                    mail_count_exported?: string;
                                    mailbox_count_total?: string;
                                    mail_count_total?: string;
                                };
                                minutes_progress?: {
                                    minutes_count_exported?: string;
                                    minutes_count_total?: string;
                                };
                                calendar_progress?: {
                                    calendar_count_exported?: string;
                                    event_count_exported?: string;
                                    calendar_count_total?: string;
                                };
                                meeting_progress?: {
                                    meeting_count_total?: string;
                                    meeting_count_exported?: string;
                                };
                            };
                            geo_sources?: Array<string>;
                            data_scope?: string;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    export?: {
                                        task_name: string;
                                        entity_type:
                                            | "im"
                                            | "docs"
                                            | "mail"
                                            | "minutes"
                                            | "chat"
                                            | "calendar"
                                            | "meeting";
                                        id?: string;
                                        creator?: {
                                            tenant_id?: string;
                                            user_id?: string;
                                            name?: string;
                                            email?: string;
                                            app_id?: string;
                                        };
                                        creator_type?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        expire_time?: string;
                                        task_status?: string;
                                        fail_reason?: string;
                                        extract_key?: string;
                                        files?: Array<{
                                            name: string;
                                            size?: string;
                                            download_url?: string;
                                        }>;
                                        entity: {
                                            im_entity?: {
                                                user_ids?: Array<string>;
                                                chat_ids?: Array<string>;
                                                keywords?: string;
                                                chat_type?: Array<number>;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                message_context_radius?: number;
                                                participant_ids?: Array<string>;
                                                with_external_message?: boolean;
                                                with_recall_edit_thread_message?: boolean;
                                                with_attachment?: boolean;
                                                user_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                participant_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                export_chat_scope?: number;
                                                with_thread_message?: boolean;
                                                lark_chat_ids?: Array<string>;
                                                with_recall_message?: boolean;
                                                with_edit_message?: boolean;
                                                only_entity_list?: boolean;
                                            };
                                            docs_entity?: {
                                                user_ids?: Array<string>;
                                                tokens?: Array<string>;
                                                urls?: Array<string>;
                                                keywords?: string;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                update_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                doc_type?: Array<number>;
                                                doc_status?: Array<number>;
                                                with_comment_json?: boolean;
                                                with_comment_embeded?: boolean;
                                                with_block?: boolean;
                                                user_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                url_metas?: Array<{
                                                    url?: string;
                                                    owner_id?: string;
                                                    owner_name?: string;
                                                }>;
                                                locations?: Array<string>;
                                                user_access_type?: string;
                                                object_tokens?: Array<{
                                                    obj_type?: number;
                                                    obj_token?: string;
                                                    obj_type_str?: string;
                                                }>;
                                                only_entity_list?: boolean;
                                                only_metadata?: boolean;
                                            };
                                            mail_entity?: {
                                                user_ids?: Array<string>;
                                                public_mails?: Array<string>;
                                                keywords?: string;
                                                mail_id?: string;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                export_type?: string;
                                                mail_infos?: Array<{
                                                    mail_type?: number;
                                                    user_id?: string;
                                                    id?: string;
                                                    name?: string;
                                                    address?: string;
                                                }>;
                                                label_list?: Array<string>;
                                                exclude_draft?: boolean;
                                            };
                                            minutes_entity?: {
                                                user_ids?: Array<string>;
                                                participant_ids?: Array<string>;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                update_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                keywords?: string;
                                                export_content?:
                                                    | "all"
                                                    | "text"
                                                    | "video";
                                                urls?: Array<string>;
                                                with_metadata?: boolean;
                                                user_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                participant_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                url_metas?: Array<{
                                                    url?: string;
                                                    owner_id?: string;
                                                    owner_name?: string;
                                                }>;
                                                tokens?: Array<string>;
                                                only_entity_list?: boolean;
                                            };
                                            chat_entity?: {
                                                user_ids?: Array<string>;
                                                time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                chat_export_type?: number;
                                                with_external_chat?: boolean;
                                            };
                                            calendar_entity?: {
                                                user_ids: Array<string>;
                                                time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                user_infos?: Array<{
                                                    tenant_id?: string;
                                                    user_id?: string;
                                                    name?: string;
                                                    email?: string;
                                                    app_id?: string;
                                                }>;
                                                only_entity_list?: boolean;
                                                sort_by?: "time" | "version";
                                            };
                                            meeting_entity?: {
                                                user_ids?: Array<string>;
                                                create_time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                            };
                                            active_chat_entity?: {
                                                user_ids?: Array<string>;
                                                time_range?: {
                                                    from: string;
                                                    to: string;
                                                };
                                                with_external_chat?: boolean;
                                            };
                                        };
                                        is_partially_completed?: boolean;
                                        entity_progress?: {
                                            im_progress?: {
                                                chat_count_exported?: string;
                                                message_count_in_chat_exporting_exported?: string;
                                                chat_count_total?: string;
                                                message_count_in_chat_exporting_total?: string;
                                            };
                                            docs_progress?: {
                                                doc_count_exported?: string;
                                                doc_count_total?: string;
                                            };
                                            mail_progress?: {
                                                mailbox_count_exported?: string;
                                                mail_count_exported?: string;
                                                mailbox_count_total?: string;
                                                mail_count_total?: string;
                                            };
                                            minutes_progress?: {
                                                minutes_count_exported?: string;
                                                minutes_count_total?: string;
                                            };
                                            calendar_progress?: {
                                                calendar_count_exported?: string;
                                                event_count_exported?: string;
                                                calendar_count_total?: string;
                                            };
                                            meeting_progress?: {
                                                meeting_count_total?: string;
                                                meeting_count_exported?: string;
                                            };
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/content/exports`,
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
             * entity.metadata
             */
            entityMetadata: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vault&resource=entity.metadata&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=vault&resource=entity.metadata&version=v1 document }
                 *
                 * ## 功能介绍;批量查询实体元数据记录，支持为聊天、文档、会议纪要等不同类型的实体绑定归属者信息，用于实体的权限管控、归属关系管理及数据统计场景。;;### 前提条件;- 需拥有对应实体类型的元数据管理权限;- 当传入`query_ids`时，需确保`query_id_type`与实体类型匹配;;### 注意事项;- 单次调用最多支持创建100条元数据记录;- 若传入已存在的`entity_type`+`query_id`组合，将覆盖原有元数据信息;;### 使用限制;- 仅支持系统预设的实体类型，具体可通过实体类型枚举接口查询
                 */
                query: async (
                    payload?: {
                        data: {
                            entity_type: string;
                            query_id_type?: string;
                            query_ids?: Array<string>;
                        };
                        params?: {
                            vault_operator_id?: string;
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
                                data?: {
                                    data?: Array<{
                                        entity_type: string;
                                        query_id: string;
                                        query_id_type: string;
                                        owner_id?: string;
                                        owner_name?: string;
                                        chat_entity_metadata?: {
                                            chat_id: string;
                                            name?: string;
                                            member_count?: number;
                                            avatar_url?: string;
                                            is_external?: boolean;
                                        };
                                        docs_entity_metadata?: {
                                            doc_id: string;
                                            title?: string;
                                            type?: string;
                                            status?: string;
                                            create_time?: string;
                                            last_update_time?: string;
                                            upgrade_info?: {
                                                upgrade_time?: string;
                                                upgrade_operator_user_id?: string;
                                                upgrade_operator_user_name?: string;
                                            };
                                        };
                                        minutes_entity_metadata?: {
                                            token?: string;
                                            title?: string;
                                            create_time?: string;
                                            last_update_time?: string;
                                            type?: string;
                                            status?: string;
                                            duration?: number;
                                            meeting_id?: string;
                                        };
                                    }>;
                                    failed_infos?: Array<{
                                        code?: number;
                                        msg?: string;
                                        entity_type?: string;
                                        entity_id_type?: string;
                                        query_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vault/v1/entity/metadata/query`,
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
