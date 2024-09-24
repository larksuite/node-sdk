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
import baike from "./baike";

// auto gen
export default abstract class Client extends baike {
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
     * 云文档-多维表格
     */
    bitable = {
        /**
         * 多维表格
         */
        app: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=copy&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=copy&project=bitable&resource=app&version=v1 document }
             */
            copy: async (
                payload?: {
                    data?: {
                        name?: string;
                        folder_token?: string;
                        without_content?: boolean;
                        time_zone?: string;
                    };
                    path: { app_token: string };
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
                                app?: {
                                    app_token?: string;
                                    name?: string;
                                    revision?: number;
                                    folder_token?: string;
                                    url?: string;
                                    time_zone?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/copy`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app&version=v1 document }
             */
            create: async (
                payload?: {
                    data?: {
                        name?: string;
                        folder_token?: string;
                        time_zone?: string;
                    };
                    params?: {
                        customized_config?: boolean;
                        source_app_token?: string;
                        copy_types?: number;
                        api_type?: string;
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
                                app?: {
                                    app_token?: string;
                                    name?: string;
                                    revision?: number;
                                    folder_token?: string;
                                    url?: string;
                                    default_table_id?: string;
                                    time_zone?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/get document }
             *
             * 获取多维表格元数据
             *
             * 获取指定多维表格的元数据信息，包括多维表格名称，多维表格版本号，多维表格是否开启高级权限等。
             *
             * 该接口支持调用频率上限为 20 QPS（Query Per Second，每秒请求率）
             */
            get: async (
                payload?: {
                    path: { app_token: string };
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
                                app?: {
                                    app_token?: string;
                                    name?: string;
                                    revision?: number;
                                    is_advanced?: boolean;
                                    time_zone?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update document }
             *
             * 更新多维表格元数据
             *
             * 通过 app_token 更新多维表格元数据
             *
             * 该接口支持调用频率上限为 10 QPS
             *
             * - 飞书文档、飞书表格、知识库中的多维表格不支持开启高级权限;- 此接口非原子操作，先修改多维表格名字，后开关高级权限。可能存在部分成功的情况
             */
            update: async (
                payload?: {
                    data?: { name?: string; is_advanced?: boolean };
                    path: { app_token: string };
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
                                app?: {
                                    app_token?: string;
                                    name?: string;
                                    is_advanced?: boolean;
                                    time_zone?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token`,
                            path
                        ),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 仪表盘
         */
        appDashboard: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.dashboard&apiName=copy&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-dashboard/copy document }
             *
             * 复制仪表盘
             *
             * 该接口用于根据现有仪表盘复制出新的仪表盘
             */
            copy: async (
                payload?: {
                    data: { name: string };
                    path: { app_token: string; block_id: string };
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
                            data?: { block_id?: string; name?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/dashboards/:block_id/copy`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            listWithIterator: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                    path: { app_token: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/dashboards`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                dashboards: Array<{
                                                    block_id: string;
                                                    name: string;
                                                }>;
                                                page_token: string;
                                                has_more: boolean;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.dashboard&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-dashboard/list document }
             *
             * 列出仪表盘
             *
             * 根据 app_token，获取多维表格下的所有仪表盘
             *
             * 该接口支持调用频率上限为 20 QPS
             */
            list: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                    path: { app_token: string };
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
                                dashboards: Array<{
                                    block_id: string;
                                    name: string;
                                }>;
                                page_token: string;
                                has_more: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/dashboards`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 自定义角色
         */
        appRole: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/create document }
             *
             * 新增自定义角色
             *
             * 新增自定义角色
             */
            create: async (
                payload?: {
                    data: {
                        role_name: string;
                        table_roles: Array<{
                            table_perm: number;
                            table_name?: string;
                            table_id?: string;
                            rec_rule?: {
                                conditions: Array<{
                                    field_name: string;
                                    operator?:
                                        | "is"
                                        | "isNot"
                                        | "contains"
                                        | "doesNotContain"
                                        | "isEmpty"
                                        | "isNotEmpty";
                                    value?: Array<string>;
                                }>;
                                conjunction?: "and" | "or";
                                other_perm?: number;
                            };
                            field_perm?: Record<string, number>;
                            allow_add_record?: boolean;
                            allow_delete_record?: boolean;
                        }>;
                        block_roles?: Array<{
                            block_id: string;
                            block_perm: number;
                        }>;
                    };
                    path?: { app_token?: string };
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
                                role?: {
                                    role_name: string;
                                    role_id?: string;
                                    table_roles: Array<{
                                        table_perm: number;
                                        table_name?: string;
                                        table_id?: string;
                                        rec_rule?: {
                                            conditions: Array<{
                                                field_name: string;
                                                operator?:
                                                    | "is"
                                                    | "isNot"
                                                    | "contains"
                                                    | "doesNotContain"
                                                    | "isEmpty"
                                                    | "isNotEmpty";
                                                value?: Array<string>;
                                                field_type?: number;
                                            }>;
                                            conjunction?: "and" | "or";
                                            other_perm?: number;
                                        };
                                        field_perm?: Record<string, number>;
                                        allow_add_record?: boolean;
                                        allow_delete_record?: boolean;
                                    }>;
                                    block_roles?: Array<{
                                        block_id: string;
                                        block_type?: "dashboard";
                                        block_perm: number;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/delete document }
             *
             * 删除自定义角色
             *
             * 删除自定义角色
             */
            delete: async (
                payload?: {
                    path?: { app_token?: string; role_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            listWithIterator: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                    path?: { app_token?: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    role_name: string;
                                                    role_id?: string;
                                                    table_roles: Array<{
                                                        table_perm: number;
                                                        table_name?: string;
                                                        table_id?: string;
                                                        rec_rule?: {
                                                            conditions: Array<{
                                                                field_name: string;
                                                                operator?:
                                                                    | "is"
                                                                    | "isNot"
                                                                    | "contains"
                                                                    | "doesNotContain"
                                                                    | "isEmpty"
                                                                    | "isNotEmpty";
                                                                value?: Array<string>;
                                                                field_type?: number;
                                                            }>;
                                                            conjunction?:
                                                                | "and"
                                                                | "or";
                                                            other_perm?: number;
                                                        };
                                                        field_perm?: Record<
                                                            string,
                                                            number
                                                        >;
                                                        allow_add_record?: boolean;
                                                        allow_delete_record?: boolean;
                                                    }>;
                                                    block_roles?: Array<{
                                                        block_id: string;
                                                        block_type?: "dashboard";
                                                        block_perm: number;
                                                    }>;
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                                total?: number;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/list document }
             *
             * 列出自定义角色
             *
             * 列出自定义角色
             */
            list: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                    path?: { app_token?: string };
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
                                    role_name: string;
                                    role_id?: string;
                                    table_roles: Array<{
                                        table_perm: number;
                                        table_name?: string;
                                        table_id?: string;
                                        rec_rule?: {
                                            conditions: Array<{
                                                field_name: string;
                                                operator?:
                                                    | "is"
                                                    | "isNot"
                                                    | "contains"
                                                    | "doesNotContain"
                                                    | "isEmpty"
                                                    | "isNotEmpty";
                                                value?: Array<string>;
                                                field_type?: number;
                                            }>;
                                            conjunction?: "and" | "or";
                                            other_perm?: number;
                                        };
                                        field_perm?: Record<string, number>;
                                        allow_add_record?: boolean;
                                        allow_delete_record?: boolean;
                                    }>;
                                    block_roles?: Array<{
                                        block_id: string;
                                        block_type?: "dashboard";
                                        block_perm: number;
                                    }>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                                total?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/update document }
             *
             * 更新自定义角色
             *
             * 更新自定义角色
             *
             * 更新自定义角色是全量更新，会完全覆盖旧的自定义角色设置
             */
            update: async (
                payload?: {
                    data: {
                        role_name: string;
                        table_roles: Array<{
                            table_perm: number;
                            table_name?: string;
                            table_id?: string;
                            rec_rule?: {
                                conditions: Array<{
                                    field_name: string;
                                    operator?:
                                        | "is"
                                        | "isNot"
                                        | "contains"
                                        | "doesNotContain"
                                        | "isEmpty"
                                        | "isNotEmpty";
                                    value?: Array<string>;
                                }>;
                                conjunction?: "and" | "or";
                                other_perm?: number;
                            };
                            field_perm?: Record<string, number>;
                            allow_add_record?: boolean;
                            allow_delete_record?: boolean;
                        }>;
                        block_roles?: Array<{
                            block_id: string;
                            block_perm: number;
                        }>;
                    };
                    path?: { app_token?: string; role_id?: string };
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
                                role?: {
                                    role_name: string;
                                    role_id?: string;
                                    table_roles: Array<{
                                        table_perm: number;
                                        table_name?: string;
                                        table_id?: string;
                                        rec_rule?: {
                                            conditions: Array<{
                                                field_name: string;
                                                operator?:
                                                    | "is"
                                                    | "isNot"
                                                    | "contains"
                                                    | "doesNotContain"
                                                    | "isEmpty"
                                                    | "isNotEmpty";
                                                value?: Array<string>;
                                                field_type?: number;
                                            }>;
                                            conjunction?: "and" | "or";
                                            other_perm?: number;
                                        };
                                        field_perm?: Record<string, number>;
                                        allow_add_record?: boolean;
                                        allow_delete_record?: boolean;
                                    }>;
                                    block_roles?: Array<{
                                        block_id: string;
                                        block_type?: "dashboard";
                                        block_perm: number;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id`,
                            path
                        ),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 协作者
         */
        appRoleMember: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=batch_create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/batch_create document }
             *
             * 批量新增协作者
             *
             * 批量新增自定义角色的协作者
             */
            batchCreate: async (
                payload?: {
                    data: {
                        member_list: Array<{
                            type?:
                                | "open_id"
                                | "union_id"
                                | "user_id"
                                | "chat_id"
                                | "department_id"
                                | "open_department_id";
                            id: string;
                        }>;
                    };
                    path: { app_token: string; role_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/batch_create`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=batch_delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/batch_delete document }
             *
             * 批量删除协作者
             *
             * 批量删除自定义角色的协作者
             */
            batchDelete: async (
                payload?: {
                    data: {
                        member_list: Array<{
                            type?:
                                | "open_id"
                                | "union_id"
                                | "user_id"
                                | "chat_id"
                                | "department_id"
                                | "open_department_id";
                            id: string;
                        }>;
                    };
                    path: { app_token: string; role_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/batch_delete`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/create document }
             *
             * 新增协作者
             *
             * 新增自定义角色的协作者
             */
            create: async (
                payload?: {
                    data: { member_id: string };
                    params?: {
                        member_id_type?:
                            | "open_id"
                            | "union_id"
                            | "user_id"
                            | "chat_id"
                            | "department_id"
                            | "open_department_id";
                    };
                    path?: { app_token?: string; role_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/delete document }
             *
             * 删除协作者
             *
             * 删除自定义角色的协作者
             */
            delete: async (
                payload?: {
                    params?: {
                        member_id_type?:
                            | "open_id"
                            | "union_id"
                            | "user_id"
                            | "chat_id"
                            | "department_id"
                            | "open_department_id";
                    };
                    path: {
                        app_token?: string;
                        role_id?: string;
                        member_id: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/:member_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            listWithIterator: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                    path: { app_token: string; role_id: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    open_id?: string;
                                                    union_id?: string;
                                                    user_id?: string;
                                                    chat_id?: string;
                                                    department_id?: string;
                                                    open_department_id?: string;
                                                    member_name?: string;
                                                    member_en_name?: string;
                                                    member_type?:
                                                        | "user"
                                                        | "chat"
                                                        | "department";
                                                }>;
                                                has_more?: boolean;
                                                page_token?: string;
                                                total?: number;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/list document }
             *
             * 列出协作者
             *
             * 列出自定义角色的协作者
             */
            list: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                    path: { app_token: string; role_id: string };
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
                                    open_id?: string;
                                    union_id?: string;
                                    user_id?: string;
                                    chat_id?: string;
                                    department_id?: string;
                                    open_department_id?: string;
                                    member_name?: string;
                                    member_en_name?: string;
                                    member_type?:
                                        | "user"
                                        | "chat"
                                        | "department";
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                                total?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 数据表
         */
        appTable: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=batch_create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/batch_create document }
             *
             * 新增多个数据表
             *
             * 新增多个数据表
             *
             * 该接口支持调用频率上限为 10 QPS
             */
            batchCreate: async (
                payload?: {
                    data?: {
                        tables?: Array<{
                            name?: string;
                            default_view_name?: string;
                            fields?: Array<{
                                field_name: string;
                                type: number;
                                ui_type?:
                                    | "Text"
                                    | "Barcode"
                                    | "Number"
                                    | "Progress"
                                    | "Currency"
                                    | "Rating"
                                    | "SingleSelect"
                                    | "MultiSelect"
                                    | "DateTime"
                                    | "Checkbox"
                                    | "User"
                                    | "GroupChat"
                                    | "Phone"
                                    | "Url"
                                    | "Attachment"
                                    | "SingleLink"
                                    | "Formula"
                                    | "DuplexLink"
                                    | "Location"
                                    | "CreatedTime"
                                    | "ModifiedTime"
                                    | "CreatedUser"
                                    | "ModifiedUser"
                                    | "AutoNumber";
                                property?: {
                                    options?: Array<{
                                        name?: string;
                                        id?: string;
                                        color?: number;
                                    }>;
                                    formatter?: string;
                                    date_formatter?: string;
                                    auto_fill?: boolean;
                                    multiple?: boolean;
                                    table_id?: string;
                                    table_name?: string;
                                    back_field_name?: string;
                                    auto_serial?: {
                                        type:
                                            | "custom"
                                            | "auto_increment_number";
                                        options?: Array<{
                                            type:
                                                | "system_number"
                                                | "fixed_text"
                                                | "created_time";
                                            value: string;
                                        }>;
                                    };
                                    location?: {
                                        input_type: "only_mobile" | "not_limit";
                                    };
                                    formula_expression?: string;
                                    allowed_edit_modes?: {
                                        manual?: boolean;
                                        scan?: boolean;
                                    };
                                    min?: number;
                                    max?: number;
                                    range_customize?: boolean;
                                    currency_code?: string;
                                    rating?: { symbol?: string };
                                };
                                description?: {
                                    disable_sync?: boolean;
                                    text?: string;
                                };
                            }>;
                        }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { app_token: string };
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
                            data?: { table_ids?: Array<string> };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/batch_create`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=batch_delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/batch_delete document }
             *
             * 删除多个数据表
             *
             * 删除多个数据表
             *
             * 该接口支持调用频率上限为 10 QPS
             */
            batchDelete: async (
                payload?: {
                    data?: { table_ids?: Array<string> };
                    path: { app_token: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/batch_delete`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/create document }
             *
             * 新增数据表
             *
             * 新增一个数据表
             *
             * 该接口支持调用频率上限为 10 QPS
             */
            create: async (
                payload?: {
                    data?: {
                        table?: {
                            name?: string;
                            default_view_name?: string;
                            fields?: Array<{
                                field_name: string;
                                type: number;
                                ui_type?:
                                    | "Text"
                                    | "Barcode"
                                    | "Number"
                                    | "Progress"
                                    | "Currency"
                                    | "Rating"
                                    | "SingleSelect"
                                    | "MultiSelect"
                                    | "DateTime"
                                    | "Checkbox"
                                    | "User"
                                    | "GroupChat"
                                    | "Phone"
                                    | "Url"
                                    | "Attachment"
                                    | "SingleLink"
                                    | "Formula"
                                    | "DuplexLink"
                                    | "Location"
                                    | "CreatedTime"
                                    | "ModifiedTime"
                                    | "CreatedUser"
                                    | "ModifiedUser"
                                    | "AutoNumber";
                                property?: {
                                    options?: Array<{
                                        name?: string;
                                        id?: string;
                                        color?: number;
                                    }>;
                                    formatter?: string;
                                    date_formatter?: string;
                                    auto_fill?: boolean;
                                    multiple?: boolean;
                                    table_id?: string;
                                    table_name?: string;
                                    back_field_name?: string;
                                    auto_serial?: {
                                        type:
                                            | "custom"
                                            | "auto_increment_number";
                                        options?: Array<{
                                            type:
                                                | "system_number"
                                                | "fixed_text"
                                                | "created_time";
                                            value: string;
                                        }>;
                                    };
                                    location?: {
                                        input_type: "only_mobile" | "not_limit";
                                    };
                                    formula_expression?: string;
                                    allowed_edit_modes?: {
                                        manual?: boolean;
                                        scan?: boolean;
                                    };
                                    min?: number;
                                    max?: number;
                                    range_customize?: boolean;
                                    currency_code?: string;
                                    rating?: { symbol?: string };
                                };
                                description?: {
                                    disable_sync?: boolean;
                                    text?: string;
                                };
                            }>;
                        };
                    };
                    path: { app_token: string };
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
                                table_id?: string;
                                default_view_id?: string;
                                field_id_list?: Array<string>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/delete document }
             *
             * 删除数据表
             *
             * 删除一个数据表
             *
             * 该接口支持调用频率上限为 10 QPS
             */
            delete: async (
                payload?: {
                    path: { app_token: string; table_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            listWithIterator: async (
                payload?: {
                    params?: { page_token?: string; page_size?: number };
                    path: { app_token: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                has_more?: boolean;
                                                page_token?: string;
                                                total?: number;
                                                items?: Array<{
                                                    table_id?: string;
                                                    revision?: number;
                                                    name?: string;
                                                }>;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/list document }
             *
             * 列出数据表
             *
             * 根据  app_token，获取多维表格下的所有数据表
             *
             * 该接口支持调用频率上限为 20 QPS
             */
            list: async (
                payload?: {
                    params?: { page_token?: string; page_size?: number };
                    path: { app_token: string };
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
                                has_more?: boolean;
                                page_token?: string;
                                total?: number;
                                items?: Array<{
                                    table_id?: string;
                                    revision?: number;
                                    name?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/patch document }
             */
            patch: async (
                payload?: {
                    data?: { name?: string };
                    path: { app_token: string; table_id: string };
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
                            data?: { name?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 字段
         */
        appTableField: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/create document }
             *
             * 新增字段
             *
             * 该接口用于在数据表中新增一个字段
             *
             * 该接口支持调用频率上限为 10 QPS
             */
            create: async (
                payload?: {
                    data: {
                        field_name: string;
                        type: number;
                        property?: {
                            options?: Array<{
                                name?: string;
                                id?: string;
                                color?: number;
                            }>;
                            formatter?: string;
                            date_formatter?: string;
                            auto_fill?: boolean;
                            multiple?: boolean;
                            table_id?: string;
                            back_field_name?: string;
                            auto_serial?: {
                                type: "custom" | "auto_increment_number";
                                options?: Array<{
                                    type:
                                        | "system_number"
                                        | "fixed_text"
                                        | "created_time";
                                    value: string;
                                }>;
                            };
                            location?: {
                                input_type: "only_mobile" | "not_limit";
                            };
                            formula_expression?: string;
                            allowed_edit_modes?: {
                                manual?: boolean;
                                scan?: boolean;
                            };
                            min?: number;
                            max?: number;
                            range_customize?: boolean;
                            currency_code?: string;
                            rating?: { symbol?: string };
                        };
                        description?: { disable_sync?: boolean; text?: string };
                        ui_type?:
                            | "Text"
                            | "Email"
                            | "Barcode"
                            | "Number"
                            | "Progress"
                            | "Currency"
                            | "Rating"
                            | "SingleSelect"
                            | "MultiSelect"
                            | "DateTime"
                            | "Checkbox"
                            | "User"
                            | "GroupChat"
                            | "Phone"
                            | "Url"
                            | "Attachment"
                            | "SingleLink"
                            | "Formula"
                            | "DuplexLink"
                            | "Location"
                            | "CreatedTime"
                            | "ModifiedTime"
                            | "CreatedUser"
                            | "ModifiedUser"
                            | "AutoNumber";
                    };
                    params?: { client_token?: string };
                    path: { app_token: string; table_id: string };
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
                                field?: {
                                    field_name: string;
                                    type: number;
                                    property?: {
                                        options?: Array<{
                                            name?: string;
                                            id?: string;
                                            color?: number;
                                        }>;
                                        formatter?: string;
                                        date_formatter?: string;
                                        auto_fill?: boolean;
                                        multiple?: boolean;
                                        table_id?: string;
                                        table_name?: string;
                                        back_field_name?: string;
                                        auto_serial?: {
                                            type:
                                                | "custom"
                                                | "auto_increment_number";
                                            options?: Array<{
                                                type:
                                                    | "system_number"
                                                    | "fixed_text"
                                                    | "created_time";
                                                value: string;
                                            }>;
                                        };
                                        location?: {
                                            input_type:
                                                | "only_mobile"
                                                | "not_limit";
                                        };
                                        formula_expression?: string;
                                        allowed_edit_modes?: {
                                            manual?: boolean;
                                            scan?: boolean;
                                        };
                                        min?: number;
                                        max?: number;
                                        range_customize?: boolean;
                                        currency_code?: string;
                                        rating?: { symbol?: string };
                                    };
                                    description?: {
                                        disable_sync?: boolean;
                                        text?: string;
                                    };
                                    is_primary?: boolean;
                                    field_id?: string;
                                    ui_type?:
                                        | "Text"
                                        | "Email"
                                        | "Barcode"
                                        | "Number"
                                        | "Progress"
                                        | "Currency"
                                        | "Rating"
                                        | "SingleSelect"
                                        | "MultiSelect"
                                        | "DateTime"
                                        | "Checkbox"
                                        | "User"
                                        | "GroupChat"
                                        | "Phone"
                                        | "Url"
                                        | "Attachment"
                                        | "SingleLink"
                                        | "Formula"
                                        | "DuplexLink"
                                        | "Location"
                                        | "CreatedTime"
                                        | "ModifiedTime"
                                        | "CreatedUser"
                                        | "ModifiedUser"
                                        | "AutoNumber";
                                    is_hidden?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/delete document }
             *
             * 删除字段
             *
             * 该接口用于在数据表中删除一个字段
             *
             * 该接口支持调用频率上限为 10 QPS
             */
            delete: async (
                payload?: {
                    path: {
                        app_token: string;
                        table_id: string;
                        field_id: string;
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
                            data?: { field_id?: string; deleted?: boolean };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields/:field_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            listWithIterator: async (
                payload?: {
                    params?: {
                        view_id?: string;
                        text_field_as_array?: boolean;
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { app_token: string; table_id: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                has_more?: boolean;
                                                page_token?: string;
                                                total?: number;
                                                items?: Array<{
                                                    field_name: string;
                                                    type: number;
                                                    property?: {
                                                        options?: Array<{
                                                            name?: string;
                                                            id?: string;
                                                            color?: number;
                                                        }>;
                                                        formatter?: string;
                                                        date_formatter?: string;
                                                        auto_fill?: boolean;
                                                        multiple?: boolean;
                                                        table_id?: string;
                                                        table_name?: string;
                                                        back_field_name?: string;
                                                        auto_serial?: {
                                                            type:
                                                                | "custom"
                                                                | "auto_increment_number";
                                                            options?: Array<{
                                                                type:
                                                                    | "system_number"
                                                                    | "fixed_text"
                                                                    | "created_time";
                                                                value: string;
                                                            }>;
                                                        };
                                                        location?: {
                                                            input_type:
                                                                | "only_mobile"
                                                                | "not_limit";
                                                        };
                                                        formula_expression?: string;
                                                        allowed_edit_modes?: {
                                                            manual?: boolean;
                                                            scan?: boolean;
                                                        };
                                                        min?: number;
                                                        max?: number;
                                                        range_customize?: boolean;
                                                        currency_code?: string;
                                                        rating?: {
                                                            symbol?: string;
                                                        };
                                                    };
                                                    description?: string;
                                                    is_primary?: boolean;
                                                    field_id?: string;
                                                    ui_type?:
                                                        | "Text"
                                                        | "Barcode"
                                                        | "Number"
                                                        | "Progress"
                                                        | "Currency"
                                                        | "Rating"
                                                        | "SingleSelect"
                                                        | "MultiSelect"
                                                        | "DateTime"
                                                        | "Checkbox"
                                                        | "User"
                                                        | "GroupChat"
                                                        | "Phone"
                                                        | "Url"
                                                        | "Attachment"
                                                        | "SingleLink"
                                                        | "Formula"
                                                        | "DuplexLink"
                                                        | "Location"
                                                        | "CreatedTime"
                                                        | "ModifiedTime"
                                                        | "CreatedUser"
                                                        | "ModifiedUser"
                                                        | "AutoNumber";
                                                    is_hidden?: boolean;
                                                }>;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/list document }
             *
             * 列出字段
             *
             * 根据 app_token 和 table_id，获取数据表的所有字段
             *
             * 该接口支持调用频率上限为 20 QPS
             */
            list: async (
                payload?: {
                    params?: {
                        view_id?: string;
                        text_field_as_array?: boolean;
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { app_token: string; table_id: string };
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
                                has_more?: boolean;
                                page_token?: string;
                                total?: number;
                                items?: Array<{
                                    field_name: string;
                                    type: number;
                                    property?: {
                                        options?: Array<{
                                            name?: string;
                                            id?: string;
                                            color?: number;
                                        }>;
                                        formatter?: string;
                                        date_formatter?: string;
                                        auto_fill?: boolean;
                                        multiple?: boolean;
                                        table_id?: string;
                                        table_name?: string;
                                        back_field_name?: string;
                                        auto_serial?: {
                                            type:
                                                | "custom"
                                                | "auto_increment_number";
                                            options?: Array<{
                                                type:
                                                    | "system_number"
                                                    | "fixed_text"
                                                    | "created_time";
                                                value: string;
                                            }>;
                                        };
                                        location?: {
                                            input_type:
                                                | "only_mobile"
                                                | "not_limit";
                                        };
                                        formula_expression?: string;
                                        allowed_edit_modes?: {
                                            manual?: boolean;
                                            scan?: boolean;
                                        };
                                        min?: number;
                                        max?: number;
                                        range_customize?: boolean;
                                        currency_code?: string;
                                        rating?: { symbol?: string };
                                    };
                                    description?: string;
                                    is_primary?: boolean;
                                    field_id?: string;
                                    ui_type?:
                                        | "Text"
                                        | "Barcode"
                                        | "Number"
                                        | "Progress"
                                        | "Currency"
                                        | "Rating"
                                        | "SingleSelect"
                                        | "MultiSelect"
                                        | "DateTime"
                                        | "Checkbox"
                                        | "User"
                                        | "GroupChat"
                                        | "Phone"
                                        | "Url"
                                        | "Attachment"
                                        | "SingleLink"
                                        | "Formula"
                                        | "DuplexLink"
                                        | "Location"
                                        | "CreatedTime"
                                        | "ModifiedTime"
                                        | "CreatedUser"
                                        | "ModifiedUser"
                                        | "AutoNumber";
                                    is_hidden?: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/update document }
             *
             * 更新字段
             *
             * 该接口用于在数据表中更新一个字段
             *
             * 该接口支持调用频率上限为 10 QPS
             */
            update: async (
                payload?: {
                    data: {
                        field_name: string;
                        type: number;
                        property?: {
                            options?: Array<{
                                name?: string;
                                id?: string;
                                color?: number;
                            }>;
                            formatter?: string;
                            date_formatter?: string;
                            auto_fill?: boolean;
                            multiple?: boolean;
                            table_id?: string;
                            table_name?: string;
                            back_field_name?: string;
                            auto_serial?: {
                                type: "custom" | "auto_increment_number";
                                options?: Array<{
                                    type:
                                        | "system_number"
                                        | "fixed_text"
                                        | "created_time";
                                    value: string;
                                }>;
                            };
                            location?: {
                                input_type: "only_mobile" | "not_limit";
                            };
                            formula_expression?: string;
                            allowed_edit_modes?: {
                                manual?: boolean;
                                scan?: boolean;
                            };
                            min?: number;
                            max?: number;
                            range_customize?: boolean;
                            currency_code?: string;
                            rating?: { symbol?: string };
                        };
                        description?: { disable_sync?: boolean; text?: string };
                        ui_type?:
                            | "Text"
                            | "Email"
                            | "Barcode"
                            | "Number"
                            | "Progress"
                            | "Currency"
                            | "Rating"
                            | "SingleSelect"
                            | "MultiSelect"
                            | "DateTime"
                            | "Checkbox"
                            | "User"
                            | "GroupChat"
                            | "Phone"
                            | "Url"
                            | "Attachment"
                            | "SingleLink"
                            | "Formula"
                            | "DuplexLink"
                            | "Location"
                            | "CreatedTime"
                            | "ModifiedTime"
                            | "CreatedUser"
                            | "ModifiedUser"
                            | "AutoNumber";
                    };
                    path: {
                        app_token: string;
                        table_id: string;
                        field_id: string;
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
                                field?: {
                                    field_name: string;
                                    type: number;
                                    property?: {
                                        options?: Array<{
                                            name?: string;
                                            id?: string;
                                            color?: number;
                                        }>;
                                        formatter?: string;
                                        date_formatter?: string;
                                        auto_fill?: boolean;
                                        multiple?: boolean;
                                        table_id?: string;
                                        table_name?: string;
                                        back_field_name?: string;
                                        auto_serial?: {
                                            type:
                                                | "custom"
                                                | "auto_increment_number";
                                            options?: Array<{
                                                type:
                                                    | "system_number"
                                                    | "fixed_text"
                                                    | "created_time";
                                                value: string;
                                            }>;
                                        };
                                        location?: {
                                            input_type:
                                                | "only_mobile"
                                                | "not_limit";
                                        };
                                        formula_expression?: string;
                                        allowed_edit_modes?: {
                                            manual?: boolean;
                                            scan?: boolean;
                                        };
                                        min?: number;
                                        max?: number;
                                        range_customize?: boolean;
                                        currency_code?: string;
                                        rating?: { symbol?: string };
                                    };
                                    description?: {
                                        disable_sync?: boolean;
                                        text?: string;
                                    };
                                    is_primary?: boolean;
                                    field_id?: string;
                                    ui_type?:
                                        | "Text"
                                        | "Email"
                                        | "Barcode"
                                        | "Number"
                                        | "Progress"
                                        | "Currency"
                                        | "Rating"
                                        | "SingleSelect"
                                        | "MultiSelect"
                                        | "DateTime"
                                        | "Checkbox"
                                        | "User"
                                        | "GroupChat"
                                        | "Phone"
                                        | "Url"
                                        | "Attachment"
                                        | "SingleLink"
                                        | "Formula"
                                        | "DuplexLink"
                                        | "Location"
                                        | "CreatedTime"
                                        | "ModifiedTime"
                                        | "CreatedUser"
                                        | "ModifiedUser"
                                        | "AutoNumber";
                                    is_hidden?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields/:field_id`,
                            path
                        ),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 表单
         */
        appTableFormField: {
            listWithIterator: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                    path: {
                        app_token: string;
                        table_id: string;
                        form_id: string;
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items: Array<{
                                                    field_id?: string;
                                                    title?: string;
                                                    description?: string;
                                                    required?: boolean;
                                                    visible?: boolean;
                                                }>;
                                                page_token: string;
                                                has_more: boolean;
                                                total: number;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form.field&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form-field/list document }
             *
             * 列出表单问题
             *
             * 列出表单的所有问题项
             *
             * 该接口支持调用频率上限为 20 QPS
             */
            list: async (
                payload?: {
                    params?: { page_size?: number; page_token?: string };
                    path: {
                        app_token: string;
                        table_id: string;
                        form_id: string;
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
                                items: Array<{
                                    field_id?: string;
                                    title?: string;
                                    description?: string;
                                    required?: boolean;
                                    visible?: boolean;
                                }>;
                                page_token: string;
                                has_more: boolean;
                                total: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form.field&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form-field/patch document }
             *
             * 更新表单问题
             *
             * 该接口用于更新表单中的问题项
             *
             * 该接口支持调用频率上限为 10 QPS
             */
            patch: async (
                payload?: {
                    data?: {
                        pre_field_id?: string;
                        title?: string;
                        description?: string;
                        required?: boolean;
                        visible?: boolean;
                    };
                    path: {
                        app_token: string;
                        table_id: string;
                        form_id: string;
                        field_id: string;
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
                                field?: {
                                    pre_field_id?: string;
                                    title?: string;
                                    description?: string;
                                    required?: boolean;
                                    visible?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields/:field_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 表单
         */
        appTableForm: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form/get document }
             *
             * 获取表单元数据
             *
             * 获取表单的所有元数据项
             *
             * 该接口支持调用频率上限为 20 QPS
             */
            get: async (
                payload?: {
                    path: {
                        app_token: string;
                        table_id: string;
                        form_id: string;
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
                                form: {
                                    name?: string;
                                    description?: string;
                                    shared?: boolean;
                                    shared_url?: string;
                                    shared_limit?:
                                        | "off"
                                        | "tenant_editable"
                                        | "anyone_editable";
                                    submit_limit_once?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form/patch document }
             *
             * 更新表单元数据
             *
             * 该接口用于更新表单中的元数据项
             *
             * 该接口支持调用频率上限为 10 QPS
             */
            patch: async (
                payload?: {
                    data?: {
                        name?: string;
                        description?: string;
                        shared?: boolean;
                        shared_limit?:
                            | "off"
                            | "tenant_editable"
                            | "anyone_editable";
                        submit_limit_once?: boolean;
                    };
                    path: {
                        app_token: string;
                        table_id: string;
                        form_id: string;
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
                                form: {
                                    name?: string;
                                    description?: string;
                                    shared?: boolean;
                                    shared_url?: string;
                                    shared_limit?:
                                        | "off"
                                        | "tenant_editable"
                                        | "anyone_editable";
                                    submit_limit_once?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 记录
         */
        appTableRecord: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_create document }
             *
             * 新增多条记录
             *
             * 该接口用于在数据表中新增多条记录，单次调用最多新增 500 条记录。
             *
             * 该接口支持调用频率上限为 10 QPS（Query Per Second，每秒请求率）
             */
            batchCreate: async (
                payload?: {
                    data: {
                        records: Array<{
                            fields: Record<
                                string,
                                | string
                                | number
                                | number
                                | number
                                | boolean
                                | { text?: string; link?: string }
                                | {
                                      location?: string;
                                      pname?: string;
                                      cityname?: string;
                                      adname?: string;
                                      address?: string;
                                      name?: string;
                                      full_address?: string;
                                  }
                                | Array<{
                                      id?: string;
                                      name?: string;
                                      avatar_url?: string;
                                  }>
                                | Array<string>
                                | Array<{
                                      id?: string;
                                      name?: string;
                                      en_name?: string;
                                      email?: string;
                                      avatar_url?: string;
                                  }>
                                | Array<{
                                      file_token?: string;
                                      name?: string;
                                      type?: string;
                                      size?: number;
                                      url?: string;
                                      tmp_url?: string;
                                  }>
                            >;
                            created_by?: {
                                id?: string;
                                name?: string;
                                en_name?: string;
                                email?: string;
                                avatar_url?: string;
                            };
                            created_time?: number;
                            last_modified_by?: {
                                id?: string;
                                name?: string;
                                en_name?: string;
                                email?: string;
                                avatar_url?: string;
                            };
                            last_modified_time?: number;
                            shared_url?: string;
                            record_url?: string;
                        }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        client_token?: string;
                    };
                    path: { app_token: string; table_id: string };
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
                                records?: Array<{
                                    fields: Record<
                                        string,
                                        | string
                                        | number
                                        | number
                                        | number
                                        | boolean
                                        | { text?: string; link?: string }
                                        | {
                                              location?: string;
                                              pname?: string;
                                              cityname?: string;
                                              adname?: string;
                                              address?: string;
                                              name?: string;
                                              full_address?: string;
                                          }
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<string>
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              en_name?: string;
                                              email?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<{
                                              file_token?: string;
                                              name?: string;
                                              type?: string;
                                              size?: number;
                                              url?: string;
                                              tmp_url?: string;
                                          }>
                                    >;
                                    record_id?: string;
                                    created_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    created_time?: number;
                                    last_modified_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    last_modified_time?: number;
                                    shared_url?: string;
                                    record_url?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_create`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_delete document }
             *
             * 删除多条记录
             *
             * 该接口用于删除数据表中现有的多条记录，单次调用中最多删除 500 条记录。
             *
             * 该接口支持调用频率上限为 10 QPS
             */
            batchDelete: async (
                payload?: {
                    data: { records: Array<string> };
                    path: { app_token: string; table_id: string };
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
                                records?: Array<{
                                    deleted?: boolean;
                                    record_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_delete`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=bitable&resource=app.table.record&version=v1 document }
             *
             * 批量获取多维表格记录
             */
            batchGet: async (
                payload?: {
                    data: {
                        record_ids: Array<string>;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        with_shared_url?: boolean;
                        automatic_fields?: boolean;
                    };
                    path: { app_token: string; table_id: string };
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
                                records?: Array<{
                                    fields: Record<
                                        string,
                                        | string
                                        | number
                                        | number
                                        | number
                                        | boolean
                                        | { text?: string; link?: string }
                                        | {
                                              location?: string;
                                              pname?: string;
                                              cityname?: string;
                                              adname?: string;
                                              address?: string;
                                              name?: string;
                                              full_address?: string;
                                          }
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<string>
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              en_name?: string;
                                              email?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<{
                                              file_token?: string;
                                              name?: string;
                                              type?: string;
                                              size?: number;
                                              url?: string;
                                              tmp_url?: string;
                                          }>
                                    >;
                                    record_id?: string;
                                    created_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    created_time?: number;
                                    last_modified_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    last_modified_time?: number;
                                    shared_url?: string;
                                    record_url?: string;
                                }>;
                                forbidden_record_ids?: Array<string>;
                                absent_record_ids?: Array<string>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_get`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_update document }
             *
             * 更新多条记录
             *
             * 该接口用于更新数据表中的多条记录，单次调用最多更新 500 条记录。
             *
             * 该接口支持调用频率上限为 10 QPS
             */
            batchUpdate: async (
                payload?: {
                    data: {
                        records: Array<{
                            fields: Record<
                                string,
                                | string
                                | number
                                | number
                                | number
                                | boolean
                                | { text?: string; link?: string }
                                | {
                                      location?: string;
                                      pname?: string;
                                      cityname?: string;
                                      adname?: string;
                                      address?: string;
                                      name?: string;
                                      full_address?: string;
                                  }
                                | Array<{
                                      id?: string;
                                      name?: string;
                                      avatar_url?: string;
                                  }>
                                | Array<string>
                                | Array<{
                                      id?: string;
                                      name?: string;
                                      en_name?: string;
                                      email?: string;
                                      avatar_url?: string;
                                  }>
                                | Array<{
                                      file_token?: string;
                                      name?: string;
                                      type?: string;
                                      size?: number;
                                      url?: string;
                                      tmp_url?: string;
                                  }>
                            >;
                            record_id?: string;
                            created_by?: {
                                id?: string;
                                name?: string;
                                en_name?: string;
                                email?: string;
                                avatar_url?: string;
                            };
                            created_time?: number;
                            last_modified_by?: {
                                id?: string;
                                name?: string;
                                en_name?: string;
                                email?: string;
                                avatar_url?: string;
                            };
                            last_modified_time?: number;
                            shared_url?: string;
                            record_url?: string;
                        }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { app_token: string; table_id: string };
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
                                records?: Array<{
                                    fields: Record<
                                        string,
                                        | string
                                        | number
                                        | number
                                        | number
                                        | boolean
                                        | { text?: string; link?: string }
                                        | {
                                              location?: string;
                                              pname?: string;
                                              cityname?: string;
                                              adname?: string;
                                              address?: string;
                                              name?: string;
                                              full_address?: string;
                                          }
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<string>
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              en_name?: string;
                                              email?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<{
                                              file_token?: string;
                                              name?: string;
                                              type?: string;
                                              size?: number;
                                              url?: string;
                                              tmp_url?: string;
                                          }>
                                    >;
                                    record_id?: string;
                                    created_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    created_time?: number;
                                    last_modified_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    last_modified_time?: number;
                                    shared_url?: string;
                                    record_url?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_update`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/create document }
             *
             * 新增记录
             *
             * 该接口用于在数据表中新增一条记录
             *
             * 该接口支持调用频率上限为 10 QPS（Query Per Second，每秒请求率）
             */
            create: async (
                payload?: {
                    data: {
                        fields: Record<
                            string,
                            | string
                            | number
                            | number
                            | number
                            | boolean
                            | { text?: string; link?: string }
                            | {
                                  location?: string;
                                  pname?: string;
                                  cityname?: string;
                                  adname?: string;
                                  address?: string;
                                  name?: string;
                                  full_address?: string;
                              }
                            | Array<{
                                  id?: string;
                                  name?: string;
                                  avatar_url?: string;
                              }>
                            | Array<string>
                            | Array<{
                                  id?: string;
                                  name?: string;
                                  en_name?: string;
                                  email?: string;
                              }>
                            | Array<{
                                  file_token?: string;
                                  name?: string;
                                  type?: string;
                                  size?: number;
                                  url?: string;
                                  tmp_url?: string;
                              }>
                        >;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        client_token?: string;
                    };
                    path: { app_token: string; table_id: string };
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
                                record?: {
                                    fields: Record<
                                        string,
                                        | string
                                        | number
                                        | number
                                        | number
                                        | boolean
                                        | { text?: string; link?: string }
                                        | {
                                              location?: string;
                                              pname?: string;
                                              cityname?: string;
                                              adname?: string;
                                              address?: string;
                                              name?: string;
                                              full_address?: string;
                                          }
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<string>
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              en_name?: string;
                                              email?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<{
                                              file_token?: string;
                                              name?: string;
                                              type?: string;
                                              size?: number;
                                              url?: string;
                                              tmp_url?: string;
                                          }>
                                    >;
                                    record_id?: string;
                                    created_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    created_time?: number;
                                    last_modified_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    last_modified_time?: number;
                                    shared_url?: string;
                                    record_url?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/delete document }
             *
             * 删除记录
             *
             * 该接口用于删除数据表中的一条记录
             *
             * 该接口支持调用频率上限为 10 QPS
             */
            delete: async (
                payload?: {
                    path: {
                        app_token: string;
                        table_id: string;
                        record_id: string;
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
                            data?: { deleted?: boolean; record_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/get document }
             *
             * 检索记录
             *
             * 该接口用于根据 record_id 的值检索现有记录
             *
             * 该接口支持调用频率上限为 20 QPS
             */
            get: async (
                payload?: {
                    params?: {
                        text_field_as_array?: boolean;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        display_formula_ref?: boolean;
                        with_shared_url?: boolean;
                        automatic_fields?: boolean;
                    };
                    path: {
                        app_token: string;
                        table_id: string;
                        record_id: string;
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
                                record?: {
                                    fields: Record<
                                        string,
                                        | string
                                        | number
                                        | number
                                        | number
                                        | boolean
                                        | { text?: string; link?: string }
                                        | {
                                              location?: string;
                                              pname?: string;
                                              cityname?: string;
                                              adname?: string;
                                              address?: string;
                                              name?: string;
                                              full_address?: string;
                                          }
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<string>
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              en_name?: string;
                                              email?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<{
                                              file_token?: string;
                                              name?: string;
                                              type?: string;
                                              size?: number;
                                              url?: string;
                                              tmp_url?: string;
                                          }>
                                    >;
                                    record_id?: string;
                                    created_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    created_time?: number;
                                    last_modified_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    last_modified_time?: number;
                                    shared_url?: string;
                                    record_url?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            listWithIterator: async (
                payload?: {
                    params?: {
                        view_id?: string;
                        filter?: string;
                        sort?: string;
                        field_names?: string;
                        text_field_as_array?: boolean;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        display_formula_ref?: boolean;
                        automatic_fields?: boolean;
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { app_token: string; table_id: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                has_more?: boolean;
                                                page_token?: string;
                                                total?: number;
                                                items?: Array<{
                                                    fields: Record<
                                                        string,
                                                        | string
                                                        | number
                                                        | number
                                                        | number
                                                        | boolean
                                                        | {
                                                              text?: string;
                                                              link?: string;
                                                          }
                                                        | {
                                                              location?: string;
                                                              pname?: string;
                                                              cityname?: string;
                                                              adname?: string;
                                                              address?: string;
                                                              name?: string;
                                                              full_address?: string;
                                                          }
                                                        | Array<{
                                                              id?: string;
                                                              name?: string;
                                                              avatar_url?: string;
                                                          }>
                                                        | Array<string>
                                                        | Array<{
                                                              id?: string;
                                                              name?: string;
                                                              en_name?: string;
                                                              email?: string;
                                                              avatar_url?: string;
                                                          }>
                                                        | Array<{
                                                              file_token?: string;
                                                              name?: string;
                                                              type?: string;
                                                              size?: number;
                                                              url?: string;
                                                              tmp_url?: string;
                                                          }>
                                                    >;
                                                    record_id?: string;
                                                    created_by?: {
                                                        id?: string;
                                                        name?: string;
                                                        en_name?: string;
                                                        email?: string;
                                                        avatar_url?: string;
                                                    };
                                                    created_time?: number;
                                                    last_modified_by?: {
                                                        id?: string;
                                                        name?: string;
                                                        en_name?: string;
                                                        email?: string;
                                                        avatar_url?: string;
                                                    };
                                                    last_modified_time?: number;
                                                    shared_url?: string;
                                                    record_url?: string;
                                                }>;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/list document }
             *
             * 列出记录
             *
             * 该接口用于列出数据表中的现有记录，单次最多列出 500 行记录，支持分页获取。
             *
             * 该接口支持调用频率上限为 10 QPS（Query Per Second，每秒请求率），1000 QPM（Query Per Minute，每分钟请求率）
             */
            list: async (
                payload?: {
                    params?: {
                        view_id?: string;
                        filter?: string;
                        sort?: string;
                        field_names?: string;
                        text_field_as_array?: boolean;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        display_formula_ref?: boolean;
                        automatic_fields?: boolean;
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { app_token: string; table_id: string };
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
                                has_more?: boolean;
                                page_token?: string;
                                total?: number;
                                items?: Array<{
                                    fields: Record<
                                        string,
                                        | string
                                        | number
                                        | number
                                        | number
                                        | boolean
                                        | { text?: string; link?: string }
                                        | {
                                              location?: string;
                                              pname?: string;
                                              cityname?: string;
                                              adname?: string;
                                              address?: string;
                                              name?: string;
                                              full_address?: string;
                                          }
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<string>
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              en_name?: string;
                                              email?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<{
                                              file_token?: string;
                                              name?: string;
                                              type?: string;
                                              size?: number;
                                              url?: string;
                                              tmp_url?: string;
                                          }>
                                    >;
                                    record_id?: string;
                                    created_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    created_time?: number;
                                    last_modified_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    last_modified_time?: number;
                                    shared_url?: string;
                                    record_url?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            searchWithIterator: async (
                payload?: {
                    data?: {
                        view_id?: string;
                        field_names?: Array<string>;
                        sort?: Array<{ field_name?: string; desc?: boolean }>;
                        filter?: {
                            conjunction?: "and" | "or";
                            conditions?: Array<{
                                field_name: string;
                                operator:
                                    | "is"
                                    | "isNot"
                                    | "contains"
                                    | "doesNotContain"
                                    | "isEmpty"
                                    | "isNotEmpty"
                                    | "isGreater"
                                    | "isGreaterEqual"
                                    | "isLess"
                                    | "isLessEqual"
                                    | "like"
                                    | "in";
                                value?: Array<string>;
                            }>;
                            children?: Array<{
                                conjunction: "and" | "or";
                                conditions?: Array<{
                                    field_name: string;
                                    operator:
                                        | "is"
                                        | "isNot"
                                        | "contains"
                                        | "doesNotContain"
                                        | "isEmpty"
                                        | "isNotEmpty"
                                        | "isGreater"
                                        | "isGreaterEqual"
                                        | "isLess"
                                        | "isLessEqual"
                                        | "like"
                                        | "in";
                                    value?: Array<string>;
                                }>;
                            }>;
                        };
                        automatic_fields?: boolean;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { app_token: string; table_id: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/search`,
                                path
                            ),
                            method: "POST",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    fields: Record<
                                                        string,
                                                        | string
                                                        | number
                                                        | number
                                                        | number
                                                        | boolean
                                                        | {
                                                              text?: string;
                                                              link?: string;
                                                          }
                                                        | {
                                                              location?: string;
                                                              pname?: string;
                                                              cityname?: string;
                                                              adname?: string;
                                                              address?: string;
                                                              name?: string;
                                                              full_address?: string;
                                                          }
                                                        | Array<{
                                                              id?: string;
                                                              name?: string;
                                                              avatar_url?: string;
                                                          }>
                                                        | Array<string>
                                                        | Array<{
                                                              id?: string;
                                                              name?: string;
                                                              en_name?: string;
                                                              email?: string;
                                                              avatar_url?: string;
                                                          }>
                                                        | Array<{
                                                              file_token?: string;
                                                              name?: string;
                                                              type?: string;
                                                              size?: number;
                                                              url?: string;
                                                              tmp_url?: string;
                                                          }>
                                                    >;
                                                    record_id?: string;
                                                    created_by?: {
                                                        id?: string;
                                                        name?: string;
                                                        en_name?: string;
                                                        email?: string;
                                                        avatar_url?: string;
                                                    };
                                                    created_time?: number;
                                                    last_modified_by?: {
                                                        id?: string;
                                                        name?: string;
                                                        en_name?: string;
                                                        email?: string;
                                                        avatar_url?: string;
                                                    };
                                                    last_modified_time?: number;
                                                    shared_url?: string;
                                                    record_url?: string;
                                                }>;
                                                has_more?: boolean;
                                                page_token?: string;
                                                total?: number;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=bitable&resource=app.table.record&version=v1 document }
             *
             * 查找多维表格记录
             */
            search: async (
                payload?: {
                    data?: {
                        view_id?: string;
                        field_names?: Array<string>;
                        sort?: Array<{ field_name?: string; desc?: boolean }>;
                        filter?: {
                            conjunction?: "and" | "or";
                            conditions?: Array<{
                                field_name: string;
                                operator:
                                    | "is"
                                    | "isNot"
                                    | "contains"
                                    | "doesNotContain"
                                    | "isEmpty"
                                    | "isNotEmpty"
                                    | "isGreater"
                                    | "isGreaterEqual"
                                    | "isLess"
                                    | "isLessEqual"
                                    | "like"
                                    | "in";
                                value?: Array<string>;
                            }>;
                            children?: Array<{
                                conjunction: "and" | "or";
                                conditions?: Array<{
                                    field_name: string;
                                    operator:
                                        | "is"
                                        | "isNot"
                                        | "contains"
                                        | "doesNotContain"
                                        | "isEmpty"
                                        | "isNotEmpty"
                                        | "isGreater"
                                        | "isGreaterEqual"
                                        | "isLess"
                                        | "isLessEqual"
                                        | "like"
                                        | "in";
                                    value?: Array<string>;
                                }>;
                            }>;
                        };
                        automatic_fields?: boolean;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { app_token: string; table_id: string };
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
                                    fields: Record<
                                        string,
                                        | string
                                        | number
                                        | number
                                        | number
                                        | boolean
                                        | { text?: string; link?: string }
                                        | {
                                              location?: string;
                                              pname?: string;
                                              cityname?: string;
                                              adname?: string;
                                              address?: string;
                                              name?: string;
                                              full_address?: string;
                                          }
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<string>
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              en_name?: string;
                                              email?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<{
                                              file_token?: string;
                                              name?: string;
                                              type?: string;
                                              size?: number;
                                              url?: string;
                                              tmp_url?: string;
                                          }>
                                    >;
                                    record_id?: string;
                                    created_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    created_time?: number;
                                    last_modified_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    last_modified_time?: number;
                                    shared_url?: string;
                                    record_url?: string;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                                total?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/search`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/update document }
             *
             * 更新记录
             *
             * 该接口用于更新数据表中的一条记录
             *
             * 该接口支持调用频率上限为 10 QPS（Query Per Second，每秒请求率）
             */
            update: async (
                payload?: {
                    data: {
                        fields: Record<
                            string,
                            | string
                            | number
                            | number
                            | number
                            | boolean
                            | { text?: string; link?: string }
                            | {
                                  location?: string;
                                  pname?: string;
                                  cityname?: string;
                                  adname?: string;
                                  address?: string;
                                  name?: string;
                                  full_address?: string;
                              }
                            | Array<{
                                  id?: string;
                                  name?: string;
                                  avatar_url?: string;
                              }>
                            | Array<string>
                            | Array<{
                                  id?: string;
                                  name?: string;
                                  en_name?: string;
                                  email?: string;
                              }>
                            | Array<{
                                  file_token?: string;
                                  name?: string;
                                  type?: string;
                                  size?: number;
                                  url?: string;
                                  tmp_url?: string;
                              }>
                        >;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: {
                        app_token: string;
                        table_id: string;
                        record_id: string;
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
                                record?: {
                                    fields: Record<
                                        string,
                                        | string
                                        | number
                                        | number
                                        | number
                                        | boolean
                                        | { text?: string; link?: string }
                                        | {
                                              location?: string;
                                              pname?: string;
                                              cityname?: string;
                                              adname?: string;
                                              address?: string;
                                              name?: string;
                                              full_address?: string;
                                          }
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<string>
                                        | Array<{
                                              id?: string;
                                              name?: string;
                                              en_name?: string;
                                              email?: string;
                                              avatar_url?: string;
                                          }>
                                        | Array<{
                                              file_token?: string;
                                              name?: string;
                                              type?: string;
                                              size?: number;
                                              url?: string;
                                              tmp_url?: string;
                                          }>
                                    >;
                                    record_id?: string;
                                    created_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    created_time?: number;
                                    last_modified_by?: {
                                        id?: string;
                                        name?: string;
                                        en_name?: string;
                                        email?: string;
                                        avatar_url?: string;
                                    };
                                    last_modified_time?: number;
                                    shared_url?: string;
                                    record_url?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id`,
                            path
                        ),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 视图
         */
        appTableView: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/create document }
             *
             * 新增视图
             *
             * 在数据表中新增一个视图
             *
             * 该接口支持调用频率上限为 10 QPS
             */
            create: async (
                payload?: {
                    data: {
                        view_name: string;
                        view_type?:
                            | "grid"
                            | "kanban"
                            | "gallery"
                            | "gantt"
                            | "form";
                    };
                    path?: { app_token?: string; table_id?: string };
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
                                view?: {
                                    view_id?: string;
                                    view_name?: string;
                                    view_type?: string;
                                    property?: {
                                        filter_info?: {
                                            conjunction: "and" | "or";
                                            conditions: Array<{
                                                field_id: string;
                                                operator:
                                                    | "is"
                                                    | "isNot"
                                                    | "contains"
                                                    | "doesNotContain"
                                                    | "isEmpty"
                                                    | "isNotEmpty"
                                                    | "isGreater"
                                                    | "isGreaterEqual"
                                                    | "isLess"
                                                    | "isLessEqual";
                                                value?: string;
                                                condition_id?: string;
                                                field_type?: number;
                                            }>;
                                            condition_omitted?: boolean;
                                        };
                                        hidden_fields?: Array<string>;
                                        hierarchy_config?: {
                                            field_id?: string;
                                        };
                                    };
                                    view_public_level?:
                                        | "Public"
                                        | "Locked"
                                        | "Private";
                                    view_private_owner_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/delete document }
             *
             * 删除视图
             *
             * 删除数据表中的视图
             *
             * 该接口支持调用频率上限为 10 QPS
             */
            delete: async (
                payload?: {
                    path?: {
                        app_token?: string;
                        table_id?: string;
                        view_id?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/get document }
             *
             * 检索视图
             *
             * 该接口根据 view_id 检索现有视图
             */
            get: async (
                payload?: {
                    path?: {
                        app_token?: string;
                        table_id?: string;
                        view_id?: string;
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
                                view?: {
                                    view_id?: string;
                                    view_name?: string;
                                    view_type?: string;
                                    property?: {
                                        filter_info?: {
                                            conjunction: "and" | "or";
                                            conditions: Array<{
                                                field_id: string;
                                                operator:
                                                    | "is"
                                                    | "isNot"
                                                    | "contains"
                                                    | "doesNotContain"
                                                    | "isEmpty"
                                                    | "isNotEmpty"
                                                    | "isGreater"
                                                    | "isGreaterEqual"
                                                    | "isLess"
                                                    | "isLessEqual";
                                                value?: string;
                                                condition_id?: string;
                                                field_type?: number;
                                            }>;
                                            condition_omitted?: boolean;
                                        };
                                        hidden_fields?: Array<string>;
                                        hierarchy_config?: {
                                            field_id?: string;
                                        };
                                    };
                                    view_public_level?:
                                        | "Public"
                                        | "Locked"
                                        | "Private";
                                    view_private_owner_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
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
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { app_token?: string; table_id?: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    view_id?: string;
                                                    view_name?: string;
                                                    view_type?: string;
                                                    property?: {
                                                        filter_info?: {
                                                            conjunction:
                                                                | "and"
                                                                | "or";
                                                            conditions: Array<{
                                                                field_id: string;
                                                                operator:
                                                                    | "is"
                                                                    | "isNot"
                                                                    | "contains"
                                                                    | "doesNotContain"
                                                                    | "isEmpty"
                                                                    | "isNotEmpty"
                                                                    | "isGreater"
                                                                    | "isGreaterEqual"
                                                                    | "isLess"
                                                                    | "isLessEqual";
                                                                value?: string;
                                                                condition_id?: string;
                                                                field_type?: number;
                                                            }>;
                                                            condition_omitted?: boolean;
                                                        };
                                                        hidden_fields?: Array<string>;
                                                        hierarchy_config?: {
                                                            field_id?: string;
                                                        };
                                                    };
                                                    view_public_level?:
                                                        | "Public"
                                                        | "Locked"
                                                        | "Private";
                                                    view_private_owner_id?: string;
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                                total?: number;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/list document }
             *
             * 列出视图
             *
             * 根据 app_token 和 table_id，获取数据表的所有视图
             *
             * 该接口支持调用频率上限为 20 QPS
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { app_token?: string; table_id?: string };
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
                                    view_id?: string;
                                    view_name?: string;
                                    view_type?: string;
                                    property?: {
                                        filter_info?: {
                                            conjunction: "and" | "or";
                                            conditions: Array<{
                                                field_id: string;
                                                operator:
                                                    | "is"
                                                    | "isNot"
                                                    | "contains"
                                                    | "doesNotContain"
                                                    | "isEmpty"
                                                    | "isNotEmpty"
                                                    | "isGreater"
                                                    | "isGreaterEqual"
                                                    | "isLess"
                                                    | "isLessEqual";
                                                value?: string;
                                                condition_id?: string;
                                                field_type?: number;
                                            }>;
                                            condition_omitted?: boolean;
                                        };
                                        hidden_fields?: Array<string>;
                                        hierarchy_config?: {
                                            field_id?: string;
                                        };
                                    };
                                    view_public_level?:
                                        | "Public"
                                        | "Locked"
                                        | "Private";
                                    view_private_owner_id?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                                total?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/patch document }
             *
             * 更新视图
             *
             * 该接口用于增量修改视图信息
             */
            patch: async (
                payload?: {
                    data?: {
                        view_name?: string;
                        property?: {
                            filter_info?: {
                                conjunction: "and" | "or";
                                conditions: Array<{
                                    field_id: string;
                                    operator:
                                        | "is"
                                        | "isNot"
                                        | "contains"
                                        | "doesNotContain"
                                        | "isEmpty"
                                        | "isNotEmpty"
                                        | "isGreater"
                                        | "isGreaterEqual"
                                        | "isLess"
                                        | "isLessEqual";
                                    value?: string;
                                }>;
                            };
                            hidden_fields?: Array<string>;
                            hierarchy_config?: { field_id?: string };
                        };
                    };
                    path?: {
                        app_token?: string;
                        table_id?: string;
                        view_id?: string;
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
                                view?: {
                                    view_id?: string;
                                    view_name?: string;
                                    view_type?: string;
                                    property?: {
                                        filter_info?: {
                                            conjunction: "and" | "or";
                                            conditions: Array<{
                                                field_id: string;
                                                operator:
                                                    | "is"
                                                    | "isNot"
                                                    | "contains"
                                                    | "doesNotContain"
                                                    | "isEmpty"
                                                    | "isNotEmpty"
                                                    | "isGreater"
                                                    | "isGreaterEqual"
                                                    | "isLess"
                                                    | "isLessEqual";
                                                value?: string;
                                                condition_id?: string;
                                                field_type?: number;
                                            }>;
                                            condition_omitted?: boolean;
                                        };
                                        hidden_fields?: Array<string>;
                                        hierarchy_config?: {
                                            field_id?: string;
                                        };
                                    };
                                    view_public_level?:
                                        | "Public"
                                        | "Locked"
                                        | "Private";
                                    view_private_owner_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        v1: {
            /**
             * 多维表格
             */
            app: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=copy&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=copy&project=bitable&resource=app&version=v1 document }
                 */
                copy: async (
                    payload?: {
                        data?: {
                            name?: string;
                            folder_token?: string;
                            without_content?: boolean;
                            time_zone?: string;
                        };
                        path: { app_token: string };
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
                                    app?: {
                                        app_token?: string;
                                        name?: string;
                                        revision?: number;
                                        folder_token?: string;
                                        url?: string;
                                        time_zone?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/copy`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=bitable&resource=app&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            name?: string;
                            folder_token?: string;
                            time_zone?: string;
                        };
                        params?: {
                            customized_config?: boolean;
                            source_app_token?: string;
                            copy_types?: number;
                            api_type?: string;
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
                                    app?: {
                                        app_token?: string;
                                        name?: string;
                                        revision?: number;
                                        folder_token?: string;
                                        url?: string;
                                        default_table_id?: string;
                                        time_zone?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/get document }
                 *
                 * 获取多维表格元数据
                 *
                 * 获取指定多维表格的元数据信息，包括多维表格名称，多维表格版本号，多维表格是否开启高级权限等。
                 *
                 * 该接口支持调用频率上限为 20 QPS（Query Per Second，每秒请求率）
                 */
                get: async (
                    payload?: {
                        path: { app_token: string };
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
                                    app?: {
                                        app_token?: string;
                                        name?: string;
                                        revision?: number;
                                        is_advanced?: boolean;
                                        time_zone?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app/update document }
                 *
                 * 更新多维表格元数据
                 *
                 * 通过 app_token 更新多维表格元数据
                 *
                 * 该接口支持调用频率上限为 10 QPS
                 *
                 * - 飞书文档、飞书表格、知识库中的多维表格不支持开启高级权限;- 此接口非原子操作，先修改多维表格名字，后开关高级权限。可能存在部分成功的情况
                 */
                update: async (
                    payload?: {
                        data?: { name?: string; is_advanced?: boolean };
                        path: { app_token: string };
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
                                    app?: {
                                        app_token?: string;
                                        name?: string;
                                        is_advanced?: boolean;
                                        time_zone?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token`,
                                path
                            ),
                            method: "PUT",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 仪表盘
             */
            appDashboard: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.dashboard&apiName=copy&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-dashboard/copy document }
                 *
                 * 复制仪表盘
                 *
                 * 该接口用于根据现有仪表盘复制出新的仪表盘
                 */
                copy: async (
                    payload?: {
                        data: { name: string };
                        path: { app_token: string; block_id: string };
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
                                data?: { block_id?: string; name?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/dashboards/:block_id/copy`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                listWithIterator: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { app_token: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/dashboards`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    dashboards: Array<{
                                                        block_id: string;
                                                        name: string;
                                                    }>;
                                                    page_token: string;
                                                    has_more: boolean;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.dashboard&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-dashboard/list document }
                 *
                 * 列出仪表盘
                 *
                 * 根据 app_token，获取多维表格下的所有仪表盘
                 *
                 * 该接口支持调用频率上限为 20 QPS
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { app_token: string };
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
                                    dashboards: Array<{
                                        block_id: string;
                                        name: string;
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/dashboards`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 自定义角色
             */
            appRole: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/create document }
                 *
                 * 新增自定义角色
                 *
                 * 新增自定义角色
                 */
                create: async (
                    payload?: {
                        data: {
                            role_name: string;
                            table_roles: Array<{
                                table_perm: number;
                                table_name?: string;
                                table_id?: string;
                                rec_rule?: {
                                    conditions: Array<{
                                        field_name: string;
                                        operator?:
                                            | "is"
                                            | "isNot"
                                            | "contains"
                                            | "doesNotContain"
                                            | "isEmpty"
                                            | "isNotEmpty";
                                        value?: Array<string>;
                                    }>;
                                    conjunction?: "and" | "or";
                                    other_perm?: number;
                                };
                                field_perm?: Record<string, number>;
                                allow_add_record?: boolean;
                                allow_delete_record?: boolean;
                            }>;
                            block_roles?: Array<{
                                block_id: string;
                                block_perm: number;
                            }>;
                        };
                        path?: { app_token?: string };
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
                                    role?: {
                                        role_name: string;
                                        role_id?: string;
                                        table_roles: Array<{
                                            table_perm: number;
                                            table_name?: string;
                                            table_id?: string;
                                            rec_rule?: {
                                                conditions: Array<{
                                                    field_name: string;
                                                    operator?:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty";
                                                    value?: Array<string>;
                                                    field_type?: number;
                                                }>;
                                                conjunction?: "and" | "or";
                                                other_perm?: number;
                                            };
                                            field_perm?: Record<string, number>;
                                            allow_add_record?: boolean;
                                            allow_delete_record?: boolean;
                                        }>;
                                        block_roles?: Array<{
                                            block_id: string;
                                            block_type?: "dashboard";
                                            block_perm: number;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/delete document }
                 *
                 * 删除自定义角色
                 *
                 * 删除自定义角色
                 */
                delete: async (
                    payload?: {
                        path?: { app_token?: string; role_id?: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                listWithIterator: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path?: { app_token?: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        role_name: string;
                                                        role_id?: string;
                                                        table_roles: Array<{
                                                            table_perm: number;
                                                            table_name?: string;
                                                            table_id?: string;
                                                            rec_rule?: {
                                                                conditions: Array<{
                                                                    field_name: string;
                                                                    operator?:
                                                                        | "is"
                                                                        | "isNot"
                                                                        | "contains"
                                                                        | "doesNotContain"
                                                                        | "isEmpty"
                                                                        | "isNotEmpty";
                                                                    value?: Array<string>;
                                                                    field_type?: number;
                                                                }>;
                                                                conjunction?:
                                                                    | "and"
                                                                    | "or";
                                                                other_perm?: number;
                                                            };
                                                            field_perm?: Record<
                                                                string,
                                                                number
                                                            >;
                                                            allow_add_record?: boolean;
                                                            allow_delete_record?: boolean;
                                                        }>;
                                                        block_roles?: Array<{
                                                            block_id: string;
                                                            block_type?: "dashboard";
                                                            block_perm: number;
                                                        }>;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    total?: number;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/list document }
                 *
                 * 列出自定义角色
                 *
                 * 列出自定义角色
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path?: { app_token?: string };
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
                                        role_name: string;
                                        role_id?: string;
                                        table_roles: Array<{
                                            table_perm: number;
                                            table_name?: string;
                                            table_id?: string;
                                            rec_rule?: {
                                                conditions: Array<{
                                                    field_name: string;
                                                    operator?:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty";
                                                    value?: Array<string>;
                                                    field_type?: number;
                                                }>;
                                                conjunction?: "and" | "or";
                                                other_perm?: number;
                                            };
                                            field_perm?: Record<string, number>;
                                            allow_add_record?: boolean;
                                            allow_delete_record?: boolean;
                                        }>;
                                        block_roles?: Array<{
                                            block_id: string;
                                            block_type?: "dashboard";
                                            block_perm: number;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role/update document }
                 *
                 * 更新自定义角色
                 *
                 * 更新自定义角色
                 *
                 * 更新自定义角色是全量更新，会完全覆盖旧的自定义角色设置
                 */
                update: async (
                    payload?: {
                        data: {
                            role_name: string;
                            table_roles: Array<{
                                table_perm: number;
                                table_name?: string;
                                table_id?: string;
                                rec_rule?: {
                                    conditions: Array<{
                                        field_name: string;
                                        operator?:
                                            | "is"
                                            | "isNot"
                                            | "contains"
                                            | "doesNotContain"
                                            | "isEmpty"
                                            | "isNotEmpty";
                                        value?: Array<string>;
                                    }>;
                                    conjunction?: "and" | "or";
                                    other_perm?: number;
                                };
                                field_perm?: Record<string, number>;
                                allow_add_record?: boolean;
                                allow_delete_record?: boolean;
                            }>;
                            block_roles?: Array<{
                                block_id: string;
                                block_perm: number;
                            }>;
                        };
                        path?: { app_token?: string; role_id?: string };
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
                                    role?: {
                                        role_name: string;
                                        role_id?: string;
                                        table_roles: Array<{
                                            table_perm: number;
                                            table_name?: string;
                                            table_id?: string;
                                            rec_rule?: {
                                                conditions: Array<{
                                                    field_name: string;
                                                    operator?:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty";
                                                    value?: Array<string>;
                                                    field_type?: number;
                                                }>;
                                                conjunction?: "and" | "or";
                                                other_perm?: number;
                                            };
                                            field_perm?: Record<string, number>;
                                            allow_add_record?: boolean;
                                            allow_delete_record?: boolean;
                                        }>;
                                        block_roles?: Array<{
                                            block_id: string;
                                            block_type?: "dashboard";
                                            block_perm: number;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id`,
                                path
                            ),
                            method: "PUT",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 协作者
             */
            appRoleMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/batch_create document }
                 *
                 * 批量新增协作者
                 *
                 * 批量新增自定义角色的协作者
                 */
                batchCreate: async (
                    payload?: {
                        data: {
                            member_list: Array<{
                                type?:
                                    | "open_id"
                                    | "union_id"
                                    | "user_id"
                                    | "chat_id"
                                    | "department_id"
                                    | "open_department_id";
                                id: string;
                            }>;
                        };
                        path: { app_token: string; role_id: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/batch_create`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/batch_delete document }
                 *
                 * 批量删除协作者
                 *
                 * 批量删除自定义角色的协作者
                 */
                batchDelete: async (
                    payload?: {
                        data: {
                            member_list: Array<{
                                type?:
                                    | "open_id"
                                    | "union_id"
                                    | "user_id"
                                    | "chat_id"
                                    | "department_id"
                                    | "open_department_id";
                                id: string;
                            }>;
                        };
                        path: { app_token: string; role_id: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/batch_delete`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/create document }
                 *
                 * 新增协作者
                 *
                 * 新增自定义角色的协作者
                 */
                create: async (
                    payload?: {
                        data: { member_id: string };
                        params?: {
                            member_id_type?:
                                | "open_id"
                                | "union_id"
                                | "user_id"
                                | "chat_id"
                                | "department_id"
                                | "open_department_id";
                        };
                        path?: { app_token?: string; role_id?: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/delete document }
                 *
                 * 删除协作者
                 *
                 * 删除自定义角色的协作者
                 */
                delete: async (
                    payload?: {
                        params?: {
                            member_id_type?:
                                | "open_id"
                                | "union_id"
                                | "user_id"
                                | "chat_id"
                                | "department_id"
                                | "open_department_id";
                        };
                        path: {
                            app_token?: string;
                            role_id?: string;
                            member_id: string;
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members/:member_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                listWithIterator: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { app_token: string; role_id: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        open_id?: string;
                                                        union_id?: string;
                                                        user_id?: string;
                                                        chat_id?: string;
                                                        department_id?: string;
                                                        open_department_id?: string;
                                                        member_name?: string;
                                                        member_en_name?: string;
                                                        member_type?:
                                                            | "user"
                                                            | "chat"
                                                            | "department";
                                                    }>;
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    total?: number;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.role.member&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-role-member/list document }
                 *
                 * 列出协作者
                 *
                 * 列出自定义角色的协作者
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { app_token: string; role_id: string };
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
                                        open_id?: string;
                                        union_id?: string;
                                        user_id?: string;
                                        chat_id?: string;
                                        department_id?: string;
                                        open_department_id?: string;
                                        member_name?: string;
                                        member_en_name?: string;
                                        member_type?:
                                            | "user"
                                            | "chat"
                                            | "department";
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/roles/:role_id/members`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 数据表
             */
            appTable: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/batch_create document }
                 *
                 * 新增多个数据表
                 *
                 * 新增多个数据表
                 *
                 * 该接口支持调用频率上限为 10 QPS
                 */
                batchCreate: async (
                    payload?: {
                        data?: {
                            tables?: Array<{
                                name?: string;
                                default_view_name?: string;
                                fields?: Array<{
                                    field_name: string;
                                    type: number;
                                    ui_type?:
                                        | "Text"
                                        | "Barcode"
                                        | "Number"
                                        | "Progress"
                                        | "Currency"
                                        | "Rating"
                                        | "SingleSelect"
                                        | "MultiSelect"
                                        | "DateTime"
                                        | "Checkbox"
                                        | "User"
                                        | "GroupChat"
                                        | "Phone"
                                        | "Url"
                                        | "Attachment"
                                        | "SingleLink"
                                        | "Formula"
                                        | "DuplexLink"
                                        | "Location"
                                        | "CreatedTime"
                                        | "ModifiedTime"
                                        | "CreatedUser"
                                        | "ModifiedUser"
                                        | "AutoNumber";
                                    property?: {
                                        options?: Array<{
                                            name?: string;
                                            id?: string;
                                            color?: number;
                                        }>;
                                        formatter?: string;
                                        date_formatter?: string;
                                        auto_fill?: boolean;
                                        multiple?: boolean;
                                        table_id?: string;
                                        table_name?: string;
                                        back_field_name?: string;
                                        auto_serial?: {
                                            type:
                                                | "custom"
                                                | "auto_increment_number";
                                            options?: Array<{
                                                type:
                                                    | "system_number"
                                                    | "fixed_text"
                                                    | "created_time";
                                                value: string;
                                            }>;
                                        };
                                        location?: {
                                            input_type:
                                                | "only_mobile"
                                                | "not_limit";
                                        };
                                        formula_expression?: string;
                                        allowed_edit_modes?: {
                                            manual?: boolean;
                                            scan?: boolean;
                                        };
                                        min?: number;
                                        max?: number;
                                        range_customize?: boolean;
                                        currency_code?: string;
                                        rating?: { symbol?: string };
                                    };
                                    description?: {
                                        disable_sync?: boolean;
                                        text?: string;
                                    };
                                }>;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { app_token: string };
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
                                data?: { table_ids?: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/batch_create`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/batch_delete document }
                 *
                 * 删除多个数据表
                 *
                 * 删除多个数据表
                 *
                 * 该接口支持调用频率上限为 10 QPS
                 */
                batchDelete: async (
                    payload?: {
                        data?: { table_ids?: Array<string> };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/batch_delete`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/create document }
                 *
                 * 新增数据表
                 *
                 * 新增一个数据表
                 *
                 * 该接口支持调用频率上限为 10 QPS
                 */
                create: async (
                    payload?: {
                        data?: {
                            table?: {
                                name?: string;
                                default_view_name?: string;
                                fields?: Array<{
                                    field_name: string;
                                    type: number;
                                    ui_type?:
                                        | "Text"
                                        | "Barcode"
                                        | "Number"
                                        | "Progress"
                                        | "Currency"
                                        | "Rating"
                                        | "SingleSelect"
                                        | "MultiSelect"
                                        | "DateTime"
                                        | "Checkbox"
                                        | "User"
                                        | "GroupChat"
                                        | "Phone"
                                        | "Url"
                                        | "Attachment"
                                        | "SingleLink"
                                        | "Formula"
                                        | "DuplexLink"
                                        | "Location"
                                        | "CreatedTime"
                                        | "ModifiedTime"
                                        | "CreatedUser"
                                        | "ModifiedUser"
                                        | "AutoNumber";
                                    property?: {
                                        options?: Array<{
                                            name?: string;
                                            id?: string;
                                            color?: number;
                                        }>;
                                        formatter?: string;
                                        date_formatter?: string;
                                        auto_fill?: boolean;
                                        multiple?: boolean;
                                        table_id?: string;
                                        table_name?: string;
                                        back_field_name?: string;
                                        auto_serial?: {
                                            type:
                                                | "custom"
                                                | "auto_increment_number";
                                            options?: Array<{
                                                type:
                                                    | "system_number"
                                                    | "fixed_text"
                                                    | "created_time";
                                                value: string;
                                            }>;
                                        };
                                        location?: {
                                            input_type:
                                                | "only_mobile"
                                                | "not_limit";
                                        };
                                        formula_expression?: string;
                                        allowed_edit_modes?: {
                                            manual?: boolean;
                                            scan?: boolean;
                                        };
                                        min?: number;
                                        max?: number;
                                        range_customize?: boolean;
                                        currency_code?: string;
                                        rating?: { symbol?: string };
                                    };
                                    description?: {
                                        disable_sync?: boolean;
                                        text?: string;
                                    };
                                }>;
                            };
                        };
                        path: { app_token: string };
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
                                    table_id?: string;
                                    default_view_id?: string;
                                    field_id_list?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/delete document }
                 *
                 * 删除数据表
                 *
                 * 删除一个数据表
                 *
                 * 该接口支持调用频率上限为 10 QPS
                 */
                delete: async (
                    payload?: {
                        path: { app_token: string; table_id: string };
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                listWithIterator: async (
                    payload?: {
                        params?: { page_token?: string; page_size?: number };
                        path: { app_token: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    total?: number;
                                                    items?: Array<{
                                                        table_id?: string;
                                                        revision?: number;
                                                        name?: string;
                                                    }>;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/list document }
                 *
                 * 列出数据表
                 *
                 * 根据  app_token，获取多维表格下的所有数据表
                 *
                 * 该接口支持调用频率上限为 20 QPS
                 */
                list: async (
                    payload?: {
                        params?: { page_token?: string; page_size?: number };
                        path: { app_token: string };
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    total?: number;
                                    items?: Array<{
                                        table_id?: string;
                                        revision?: number;
                                        name?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table/patch document }
                 */
                patch: async (
                    payload?: {
                        data?: { name?: string };
                        path: { app_token: string; table_id: string };
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
                                data?: { name?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 字段
             */
            appTableField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/create document }
                 *
                 * 新增字段
                 *
                 * 该接口用于在数据表中新增一个字段
                 *
                 * 该接口支持调用频率上限为 10 QPS
                 */
                create: async (
                    payload?: {
                        data: {
                            field_name: string;
                            type: number;
                            property?: {
                                options?: Array<{
                                    name?: string;
                                    id?: string;
                                    color?: number;
                                }>;
                                formatter?: string;
                                date_formatter?: string;
                                auto_fill?: boolean;
                                multiple?: boolean;
                                table_id?: string;
                                back_field_name?: string;
                                auto_serial?: {
                                    type: "custom" | "auto_increment_number";
                                    options?: Array<{
                                        type:
                                            | "system_number"
                                            | "fixed_text"
                                            | "created_time";
                                        value: string;
                                    }>;
                                };
                                location?: {
                                    input_type: "only_mobile" | "not_limit";
                                };
                                formula_expression?: string;
                                allowed_edit_modes?: {
                                    manual?: boolean;
                                    scan?: boolean;
                                };
                                min?: number;
                                max?: number;
                                range_customize?: boolean;
                                currency_code?: string;
                                rating?: { symbol?: string };
                            };
                            description?: {
                                disable_sync?: boolean;
                                text?: string;
                            };
                            ui_type?:
                                | "Text"
                                | "Email"
                                | "Barcode"
                                | "Number"
                                | "Progress"
                                | "Currency"
                                | "Rating"
                                | "SingleSelect"
                                | "MultiSelect"
                                | "DateTime"
                                | "Checkbox"
                                | "User"
                                | "GroupChat"
                                | "Phone"
                                | "Url"
                                | "Attachment"
                                | "SingleLink"
                                | "Formula"
                                | "DuplexLink"
                                | "Location"
                                | "CreatedTime"
                                | "ModifiedTime"
                                | "CreatedUser"
                                | "ModifiedUser"
                                | "AutoNumber";
                        };
                        params?: { client_token?: string };
                        path: { app_token: string; table_id: string };
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
                                    field?: {
                                        field_name: string;
                                        type: number;
                                        property?: {
                                            options?: Array<{
                                                name?: string;
                                                id?: string;
                                                color?: number;
                                            }>;
                                            formatter?: string;
                                            date_formatter?: string;
                                            auto_fill?: boolean;
                                            multiple?: boolean;
                                            table_id?: string;
                                            table_name?: string;
                                            back_field_name?: string;
                                            auto_serial?: {
                                                type:
                                                    | "custom"
                                                    | "auto_increment_number";
                                                options?: Array<{
                                                    type:
                                                        | "system_number"
                                                        | "fixed_text"
                                                        | "created_time";
                                                    value: string;
                                                }>;
                                            };
                                            location?: {
                                                input_type:
                                                    | "only_mobile"
                                                    | "not_limit";
                                            };
                                            formula_expression?: string;
                                            allowed_edit_modes?: {
                                                manual?: boolean;
                                                scan?: boolean;
                                            };
                                            min?: number;
                                            max?: number;
                                            range_customize?: boolean;
                                            currency_code?: string;
                                            rating?: { symbol?: string };
                                        };
                                        description?: {
                                            disable_sync?: boolean;
                                            text?: string;
                                        };
                                        is_primary?: boolean;
                                        field_id?: string;
                                        ui_type?:
                                            | "Text"
                                            | "Email"
                                            | "Barcode"
                                            | "Number"
                                            | "Progress"
                                            | "Currency"
                                            | "Rating"
                                            | "SingleSelect"
                                            | "MultiSelect"
                                            | "DateTime"
                                            | "Checkbox"
                                            | "User"
                                            | "GroupChat"
                                            | "Phone"
                                            | "Url"
                                            | "Attachment"
                                            | "SingleLink"
                                            | "Formula"
                                            | "DuplexLink"
                                            | "Location"
                                            | "CreatedTime"
                                            | "ModifiedTime"
                                            | "CreatedUser"
                                            | "ModifiedUser"
                                            | "AutoNumber";
                                        is_hidden?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/delete document }
                 *
                 * 删除字段
                 *
                 * 该接口用于在数据表中删除一个字段
                 *
                 * 该接口支持调用频率上限为 10 QPS
                 */
                delete: async (
                    payload?: {
                        path: {
                            app_token: string;
                            table_id: string;
                            field_id: string;
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
                                data?: { field_id?: string; deleted?: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields/:field_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                listWithIterator: async (
                    payload?: {
                        params?: {
                            view_id?: string;
                            text_field_as_array?: boolean;
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { app_token: string; table_id: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    total?: number;
                                                    items?: Array<{
                                                        field_name: string;
                                                        type: number;
                                                        property?: {
                                                            options?: Array<{
                                                                name?: string;
                                                                id?: string;
                                                                color?: number;
                                                            }>;
                                                            formatter?: string;
                                                            date_formatter?: string;
                                                            auto_fill?: boolean;
                                                            multiple?: boolean;
                                                            table_id?: string;
                                                            table_name?: string;
                                                            back_field_name?: string;
                                                            auto_serial?: {
                                                                type:
                                                                    | "custom"
                                                                    | "auto_increment_number";
                                                                options?: Array<{
                                                                    type:
                                                                        | "system_number"
                                                                        | "fixed_text"
                                                                        | "created_time";
                                                                    value: string;
                                                                }>;
                                                            };
                                                            location?: {
                                                                input_type:
                                                                    | "only_mobile"
                                                                    | "not_limit";
                                                            };
                                                            formula_expression?: string;
                                                            allowed_edit_modes?: {
                                                                manual?: boolean;
                                                                scan?: boolean;
                                                            };
                                                            min?: number;
                                                            max?: number;
                                                            range_customize?: boolean;
                                                            currency_code?: string;
                                                            rating?: {
                                                                symbol?: string;
                                                            };
                                                        };
                                                        description?: string;
                                                        is_primary?: boolean;
                                                        field_id?: string;
                                                        ui_type?:
                                                            | "Text"
                                                            | "Barcode"
                                                            | "Number"
                                                            | "Progress"
                                                            | "Currency"
                                                            | "Rating"
                                                            | "SingleSelect"
                                                            | "MultiSelect"
                                                            | "DateTime"
                                                            | "Checkbox"
                                                            | "User"
                                                            | "GroupChat"
                                                            | "Phone"
                                                            | "Url"
                                                            | "Attachment"
                                                            | "SingleLink"
                                                            | "Formula"
                                                            | "DuplexLink"
                                                            | "Location"
                                                            | "CreatedTime"
                                                            | "ModifiedTime"
                                                            | "CreatedUser"
                                                            | "ModifiedUser"
                                                            | "AutoNumber";
                                                        is_hidden?: boolean;
                                                    }>;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/list document }
                 *
                 * 列出字段
                 *
                 * 根据 app_token 和 table_id，获取数据表的所有字段
                 *
                 * 该接口支持调用频率上限为 20 QPS
                 */
                list: async (
                    payload?: {
                        params?: {
                            view_id?: string;
                            text_field_as_array?: boolean;
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { app_token: string; table_id: string };
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    total?: number;
                                    items?: Array<{
                                        field_name: string;
                                        type: number;
                                        property?: {
                                            options?: Array<{
                                                name?: string;
                                                id?: string;
                                                color?: number;
                                            }>;
                                            formatter?: string;
                                            date_formatter?: string;
                                            auto_fill?: boolean;
                                            multiple?: boolean;
                                            table_id?: string;
                                            table_name?: string;
                                            back_field_name?: string;
                                            auto_serial?: {
                                                type:
                                                    | "custom"
                                                    | "auto_increment_number";
                                                options?: Array<{
                                                    type:
                                                        | "system_number"
                                                        | "fixed_text"
                                                        | "created_time";
                                                    value: string;
                                                }>;
                                            };
                                            location?: {
                                                input_type:
                                                    | "only_mobile"
                                                    | "not_limit";
                                            };
                                            formula_expression?: string;
                                            allowed_edit_modes?: {
                                                manual?: boolean;
                                                scan?: boolean;
                                            };
                                            min?: number;
                                            max?: number;
                                            range_customize?: boolean;
                                            currency_code?: string;
                                            rating?: { symbol?: string };
                                        };
                                        description?: string;
                                        is_primary?: boolean;
                                        field_id?: string;
                                        ui_type?:
                                            | "Text"
                                            | "Barcode"
                                            | "Number"
                                            | "Progress"
                                            | "Currency"
                                            | "Rating"
                                            | "SingleSelect"
                                            | "MultiSelect"
                                            | "DateTime"
                                            | "Checkbox"
                                            | "User"
                                            | "GroupChat"
                                            | "Phone"
                                            | "Url"
                                            | "Attachment"
                                            | "SingleLink"
                                            | "Formula"
                                            | "DuplexLink"
                                            | "Location"
                                            | "CreatedTime"
                                            | "ModifiedTime"
                                            | "CreatedUser"
                                            | "ModifiedUser"
                                            | "AutoNumber";
                                        is_hidden?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.field&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-field/update document }
                 *
                 * 更新字段
                 *
                 * 该接口用于在数据表中更新一个字段
                 *
                 * 该接口支持调用频率上限为 10 QPS
                 */
                update: async (
                    payload?: {
                        data: {
                            field_name: string;
                            type: number;
                            property?: {
                                options?: Array<{
                                    name?: string;
                                    id?: string;
                                    color?: number;
                                }>;
                                formatter?: string;
                                date_formatter?: string;
                                auto_fill?: boolean;
                                multiple?: boolean;
                                table_id?: string;
                                table_name?: string;
                                back_field_name?: string;
                                auto_serial?: {
                                    type: "custom" | "auto_increment_number";
                                    options?: Array<{
                                        type:
                                            | "system_number"
                                            | "fixed_text"
                                            | "created_time";
                                        value: string;
                                    }>;
                                };
                                location?: {
                                    input_type: "only_mobile" | "not_limit";
                                };
                                formula_expression?: string;
                                allowed_edit_modes?: {
                                    manual?: boolean;
                                    scan?: boolean;
                                };
                                min?: number;
                                max?: number;
                                range_customize?: boolean;
                                currency_code?: string;
                                rating?: { symbol?: string };
                            };
                            description?: {
                                disable_sync?: boolean;
                                text?: string;
                            };
                            ui_type?:
                                | "Text"
                                | "Email"
                                | "Barcode"
                                | "Number"
                                | "Progress"
                                | "Currency"
                                | "Rating"
                                | "SingleSelect"
                                | "MultiSelect"
                                | "DateTime"
                                | "Checkbox"
                                | "User"
                                | "GroupChat"
                                | "Phone"
                                | "Url"
                                | "Attachment"
                                | "SingleLink"
                                | "Formula"
                                | "DuplexLink"
                                | "Location"
                                | "CreatedTime"
                                | "ModifiedTime"
                                | "CreatedUser"
                                | "ModifiedUser"
                                | "AutoNumber";
                        };
                        path: {
                            app_token: string;
                            table_id: string;
                            field_id: string;
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
                                    field?: {
                                        field_name: string;
                                        type: number;
                                        property?: {
                                            options?: Array<{
                                                name?: string;
                                                id?: string;
                                                color?: number;
                                            }>;
                                            formatter?: string;
                                            date_formatter?: string;
                                            auto_fill?: boolean;
                                            multiple?: boolean;
                                            table_id?: string;
                                            table_name?: string;
                                            back_field_name?: string;
                                            auto_serial?: {
                                                type:
                                                    | "custom"
                                                    | "auto_increment_number";
                                                options?: Array<{
                                                    type:
                                                        | "system_number"
                                                        | "fixed_text"
                                                        | "created_time";
                                                    value: string;
                                                }>;
                                            };
                                            location?: {
                                                input_type:
                                                    | "only_mobile"
                                                    | "not_limit";
                                            };
                                            formula_expression?: string;
                                            allowed_edit_modes?: {
                                                manual?: boolean;
                                                scan?: boolean;
                                            };
                                            min?: number;
                                            max?: number;
                                            range_customize?: boolean;
                                            currency_code?: string;
                                            rating?: { symbol?: string };
                                        };
                                        description?: {
                                            disable_sync?: boolean;
                                            text?: string;
                                        };
                                        is_primary?: boolean;
                                        field_id?: string;
                                        ui_type?:
                                            | "Text"
                                            | "Email"
                                            | "Barcode"
                                            | "Number"
                                            | "Progress"
                                            | "Currency"
                                            | "Rating"
                                            | "SingleSelect"
                                            | "MultiSelect"
                                            | "DateTime"
                                            | "Checkbox"
                                            | "User"
                                            | "GroupChat"
                                            | "Phone"
                                            | "Url"
                                            | "Attachment"
                                            | "SingleLink"
                                            | "Formula"
                                            | "DuplexLink"
                                            | "Location"
                                            | "CreatedTime"
                                            | "ModifiedTime"
                                            | "CreatedUser"
                                            | "ModifiedUser"
                                            | "AutoNumber";
                                        is_hidden?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/fields/:field_id`,
                                path
                            ),
                            method: "PUT",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 表单
             */
            appTableFormField: {
                listWithIterator: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: {
                            app_token: string;
                            table_id: string;
                            form_id: string;
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items: Array<{
                                                        field_id?: string;
                                                        title?: string;
                                                        description?: string;
                                                        required?: boolean;
                                                        visible?: boolean;
                                                    }>;
                                                    page_token: string;
                                                    has_more: boolean;
                                                    total: number;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form.field&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form-field/list document }
                 *
                 * 列出表单问题
                 *
                 * 列出表单的所有问题项
                 *
                 * 该接口支持调用频率上限为 20 QPS
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: {
                            app_token: string;
                            table_id: string;
                            form_id: string;
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
                                    items: Array<{
                                        field_id?: string;
                                        title?: string;
                                        description?: string;
                                        required?: boolean;
                                        visible?: boolean;
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                    total: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form.field&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form-field/patch document }
                 *
                 * 更新表单问题
                 *
                 * 该接口用于更新表单中的问题项
                 *
                 * 该接口支持调用频率上限为 10 QPS
                 */
                patch: async (
                    payload?: {
                        data?: {
                            pre_field_id?: string;
                            title?: string;
                            description?: string;
                            required?: boolean;
                            visible?: boolean;
                        };
                        path: {
                            app_token: string;
                            table_id: string;
                            form_id: string;
                            field_id: string;
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
                                    field?: {
                                        pre_field_id?: string;
                                        title?: string;
                                        description?: string;
                                        required?: boolean;
                                        visible?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id/fields/:field_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 表单
             */
            appTableForm: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form/get document }
                 *
                 * 获取表单元数据
                 *
                 * 获取表单的所有元数据项
                 *
                 * 该接口支持调用频率上限为 20 QPS
                 */
                get: async (
                    payload?: {
                        path: {
                            app_token: string;
                            table_id: string;
                            form_id: string;
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
                                    form: {
                                        name?: string;
                                        description?: string;
                                        shared?: boolean;
                                        shared_url?: string;
                                        shared_limit?:
                                            | "off"
                                            | "tenant_editable"
                                            | "anyone_editable";
                                        submit_limit_once?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.form&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-form/patch document }
                 *
                 * 更新表单元数据
                 *
                 * 该接口用于更新表单中的元数据项
                 *
                 * 该接口支持调用频率上限为 10 QPS
                 */
                patch: async (
                    payload?: {
                        data?: {
                            name?: string;
                            description?: string;
                            shared?: boolean;
                            shared_limit?:
                                | "off"
                                | "tenant_editable"
                                | "anyone_editable";
                            submit_limit_once?: boolean;
                        };
                        path: {
                            app_token: string;
                            table_id: string;
                            form_id: string;
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
                                    form: {
                                        name?: string;
                                        description?: string;
                                        shared?: boolean;
                                        shared_url?: string;
                                        shared_limit?:
                                            | "off"
                                            | "tenant_editable"
                                            | "anyone_editable";
                                        submit_limit_once?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/forms/:form_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 记录
             */
            appTableRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_create document }
                 *
                 * 新增多条记录
                 *
                 * 该接口用于在数据表中新增多条记录，单次调用最多新增 500 条记录。
                 *
                 * 该接口支持调用频率上限为 10 QPS（Query Per Second，每秒请求率）
                 */
                batchCreate: async (
                    payload?: {
                        data: {
                            records: Array<{
                                fields: Record<
                                    string,
                                    | string
                                    | number
                                    | number
                                    | number
                                    | boolean
                                    | { text?: string; link?: string }
                                    | {
                                          location?: string;
                                          pname?: string;
                                          cityname?: string;
                                          adname?: string;
                                          address?: string;
                                          name?: string;
                                          full_address?: string;
                                      }
                                    | Array<{
                                          id?: string;
                                          name?: string;
                                          avatar_url?: string;
                                      }>
                                    | Array<string>
                                    | Array<{
                                          id?: string;
                                          name?: string;
                                          en_name?: string;
                                          email?: string;
                                          avatar_url?: string;
                                      }>
                                    | Array<{
                                          file_token?: string;
                                          name?: string;
                                          type?: string;
                                          size?: number;
                                          url?: string;
                                          tmp_url?: string;
                                      }>
                                >;
                                created_by?: {
                                    id?: string;
                                    name?: string;
                                    en_name?: string;
                                    email?: string;
                                    avatar_url?: string;
                                };
                                created_time?: number;
                                last_modified_by?: {
                                    id?: string;
                                    name?: string;
                                    en_name?: string;
                                    email?: string;
                                    avatar_url?: string;
                                };
                                last_modified_time?: number;
                                shared_url?: string;
                                record_url?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            client_token?: string;
                        };
                        path: { app_token: string; table_id: string };
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
                                    records?: Array<{
                                        fields: Record<
                                            string,
                                            | string
                                            | number
                                            | number
                                            | number
                                            | boolean
                                            | { text?: string; link?: string }
                                            | {
                                                  location?: string;
                                                  pname?: string;
                                                  cityname?: string;
                                                  adname?: string;
                                                  address?: string;
                                                  name?: string;
                                                  full_address?: string;
                                              }
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<string>
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  en_name?: string;
                                                  email?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<{
                                                  file_token?: string;
                                                  name?: string;
                                                  type?: string;
                                                  size?: number;
                                                  url?: string;
                                                  tmp_url?: string;
                                              }>
                                        >;
                                        record_id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        created_time?: number;
                                        last_modified_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        last_modified_time?: number;
                                        shared_url?: string;
                                        record_url?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_create`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_delete document }
                 *
                 * 删除多条记录
                 *
                 * 该接口用于删除数据表中现有的多条记录，单次调用中最多删除 500 条记录。
                 *
                 * 该接口支持调用频率上限为 10 QPS
                 */
                batchDelete: async (
                    payload?: {
                        data: { records: Array<string> };
                        path: { app_token: string; table_id: string };
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
                                    records?: Array<{
                                        deleted?: boolean;
                                        record_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_delete`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=bitable&resource=app.table.record&version=v1 document }
                 *
                 * 批量获取多维表格记录
                 */
                batchGet: async (
                    payload?: {
                        data: {
                            record_ids: Array<string>;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            with_shared_url?: boolean;
                            automatic_fields?: boolean;
                        };
                        path: { app_token: string; table_id: string };
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
                                    records?: Array<{
                                        fields: Record<
                                            string,
                                            | string
                                            | number
                                            | number
                                            | number
                                            | boolean
                                            | { text?: string; link?: string }
                                            | {
                                                  location?: string;
                                                  pname?: string;
                                                  cityname?: string;
                                                  adname?: string;
                                                  address?: string;
                                                  name?: string;
                                                  full_address?: string;
                                              }
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<string>
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  en_name?: string;
                                                  email?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<{
                                                  file_token?: string;
                                                  name?: string;
                                                  type?: string;
                                                  size?: number;
                                                  url?: string;
                                                  tmp_url?: string;
                                              }>
                                        >;
                                        record_id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        created_time?: number;
                                        last_modified_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        last_modified_time?: number;
                                        shared_url?: string;
                                        record_url?: string;
                                    }>;
                                    forbidden_record_ids?: Array<string>;
                                    absent_record_ids?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_get`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/batch_update document }
                 *
                 * 更新多条记录
                 *
                 * 该接口用于更新数据表中的多条记录，单次调用最多更新 500 条记录。
                 *
                 * 该接口支持调用频率上限为 10 QPS
                 */
                batchUpdate: async (
                    payload?: {
                        data: {
                            records: Array<{
                                fields: Record<
                                    string,
                                    | string
                                    | number
                                    | number
                                    | number
                                    | boolean
                                    | { text?: string; link?: string }
                                    | {
                                          location?: string;
                                          pname?: string;
                                          cityname?: string;
                                          adname?: string;
                                          address?: string;
                                          name?: string;
                                          full_address?: string;
                                      }
                                    | Array<{
                                          id?: string;
                                          name?: string;
                                          avatar_url?: string;
                                      }>
                                    | Array<string>
                                    | Array<{
                                          id?: string;
                                          name?: string;
                                          en_name?: string;
                                          email?: string;
                                          avatar_url?: string;
                                      }>
                                    | Array<{
                                          file_token?: string;
                                          name?: string;
                                          type?: string;
                                          size?: number;
                                          url?: string;
                                          tmp_url?: string;
                                      }>
                                >;
                                record_id?: string;
                                created_by?: {
                                    id?: string;
                                    name?: string;
                                    en_name?: string;
                                    email?: string;
                                    avatar_url?: string;
                                };
                                created_time?: number;
                                last_modified_by?: {
                                    id?: string;
                                    name?: string;
                                    en_name?: string;
                                    email?: string;
                                    avatar_url?: string;
                                };
                                last_modified_time?: number;
                                shared_url?: string;
                                record_url?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { app_token: string; table_id: string };
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
                                    records?: Array<{
                                        fields: Record<
                                            string,
                                            | string
                                            | number
                                            | number
                                            | number
                                            | boolean
                                            | { text?: string; link?: string }
                                            | {
                                                  location?: string;
                                                  pname?: string;
                                                  cityname?: string;
                                                  adname?: string;
                                                  address?: string;
                                                  name?: string;
                                                  full_address?: string;
                                              }
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<string>
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  en_name?: string;
                                                  email?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<{
                                                  file_token?: string;
                                                  name?: string;
                                                  type?: string;
                                                  size?: number;
                                                  url?: string;
                                                  tmp_url?: string;
                                              }>
                                        >;
                                        record_id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        created_time?: number;
                                        last_modified_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        last_modified_time?: number;
                                        shared_url?: string;
                                        record_url?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/batch_update`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/create document }
                 *
                 * 新增记录
                 *
                 * 该接口用于在数据表中新增一条记录
                 *
                 * 该接口支持调用频率上限为 10 QPS（Query Per Second，每秒请求率）
                 */
                create: async (
                    payload?: {
                        data: {
                            fields: Record<
                                string,
                                | string
                                | number
                                | number
                                | number
                                | boolean
                                | { text?: string; link?: string }
                                | {
                                      location?: string;
                                      pname?: string;
                                      cityname?: string;
                                      adname?: string;
                                      address?: string;
                                      name?: string;
                                      full_address?: string;
                                  }
                                | Array<{
                                      id?: string;
                                      name?: string;
                                      avatar_url?: string;
                                  }>
                                | Array<string>
                                | Array<{
                                      id?: string;
                                      name?: string;
                                      en_name?: string;
                                      email?: string;
                                  }>
                                | Array<{
                                      file_token?: string;
                                      name?: string;
                                      type?: string;
                                      size?: number;
                                      url?: string;
                                      tmp_url?: string;
                                  }>
                            >;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            client_token?: string;
                        };
                        path: { app_token: string; table_id: string };
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
                                    record?: {
                                        fields: Record<
                                            string,
                                            | string
                                            | number
                                            | number
                                            | number
                                            | boolean
                                            | { text?: string; link?: string }
                                            | {
                                                  location?: string;
                                                  pname?: string;
                                                  cityname?: string;
                                                  adname?: string;
                                                  address?: string;
                                                  name?: string;
                                                  full_address?: string;
                                              }
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<string>
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  en_name?: string;
                                                  email?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<{
                                                  file_token?: string;
                                                  name?: string;
                                                  type?: string;
                                                  size?: number;
                                                  url?: string;
                                                  tmp_url?: string;
                                              }>
                                        >;
                                        record_id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        created_time?: number;
                                        last_modified_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        last_modified_time?: number;
                                        shared_url?: string;
                                        record_url?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/delete document }
                 *
                 * 删除记录
                 *
                 * 该接口用于删除数据表中的一条记录
                 *
                 * 该接口支持调用频率上限为 10 QPS
                 */
                delete: async (
                    payload?: {
                        path: {
                            app_token: string;
                            table_id: string;
                            record_id: string;
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
                                    deleted?: boolean;
                                    record_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/get document }
                 *
                 * 检索记录
                 *
                 * 该接口用于根据 record_id 的值检索现有记录
                 *
                 * 该接口支持调用频率上限为 20 QPS
                 */
                get: async (
                    payload?: {
                        params?: {
                            text_field_as_array?: boolean;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            display_formula_ref?: boolean;
                            with_shared_url?: boolean;
                            automatic_fields?: boolean;
                        };
                        path: {
                            app_token: string;
                            table_id: string;
                            record_id: string;
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
                                    record?: {
                                        fields: Record<
                                            string,
                                            | string
                                            | number
                                            | number
                                            | number
                                            | boolean
                                            | { text?: string; link?: string }
                                            | {
                                                  location?: string;
                                                  pname?: string;
                                                  cityname?: string;
                                                  adname?: string;
                                                  address?: string;
                                                  name?: string;
                                                  full_address?: string;
                                              }
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<string>
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  en_name?: string;
                                                  email?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<{
                                                  file_token?: string;
                                                  name?: string;
                                                  type?: string;
                                                  size?: number;
                                                  url?: string;
                                                  tmp_url?: string;
                                              }>
                                        >;
                                        record_id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        created_time?: number;
                                        last_modified_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        last_modified_time?: number;
                                        shared_url?: string;
                                        record_url?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                listWithIterator: async (
                    payload?: {
                        params?: {
                            view_id?: string;
                            filter?: string;
                            sort?: string;
                            field_names?: string;
                            text_field_as_array?: boolean;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            display_formula_ref?: boolean;
                            automatic_fields?: boolean;
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { app_token: string; table_id: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    total?: number;
                                                    items?: Array<{
                                                        fields: Record<
                                                            string,
                                                            | string
                                                            | number
                                                            | number
                                                            | number
                                                            | boolean
                                                            | {
                                                                  text?: string;
                                                                  link?: string;
                                                              }
                                                            | {
                                                                  location?: string;
                                                                  pname?: string;
                                                                  cityname?: string;
                                                                  adname?: string;
                                                                  address?: string;
                                                                  name?: string;
                                                                  full_address?: string;
                                                              }
                                                            | Array<{
                                                                  id?: string;
                                                                  name?: string;
                                                                  avatar_url?: string;
                                                              }>
                                                            | Array<string>
                                                            | Array<{
                                                                  id?: string;
                                                                  name?: string;
                                                                  en_name?: string;
                                                                  email?: string;
                                                                  avatar_url?: string;
                                                              }>
                                                            | Array<{
                                                                  file_token?: string;
                                                                  name?: string;
                                                                  type?: string;
                                                                  size?: number;
                                                                  url?: string;
                                                                  tmp_url?: string;
                                                              }>
                                                        >;
                                                        record_id?: string;
                                                        created_by?: {
                                                            id?: string;
                                                            name?: string;
                                                            en_name?: string;
                                                            email?: string;
                                                            avatar_url?: string;
                                                        };
                                                        created_time?: number;
                                                        last_modified_by?: {
                                                            id?: string;
                                                            name?: string;
                                                            en_name?: string;
                                                            email?: string;
                                                            avatar_url?: string;
                                                        };
                                                        last_modified_time?: number;
                                                        shared_url?: string;
                                                        record_url?: string;
                                                    }>;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/list document }
                 *
                 * 列出记录
                 *
                 * 该接口用于列出数据表中的现有记录，单次最多列出 500 行记录，支持分页获取。
                 *
                 * 该接口支持调用频率上限为 10 QPS（Query Per Second，每秒请求率），1000 QPM（Query Per Minute，每分钟请求率）
                 */
                list: async (
                    payload?: {
                        params?: {
                            view_id?: string;
                            filter?: string;
                            sort?: string;
                            field_names?: string;
                            text_field_as_array?: boolean;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            display_formula_ref?: boolean;
                            automatic_fields?: boolean;
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { app_token: string; table_id: string };
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    total?: number;
                                    items?: Array<{
                                        fields: Record<
                                            string,
                                            | string
                                            | number
                                            | number
                                            | number
                                            | boolean
                                            | { text?: string; link?: string }
                                            | {
                                                  location?: string;
                                                  pname?: string;
                                                  cityname?: string;
                                                  adname?: string;
                                                  address?: string;
                                                  name?: string;
                                                  full_address?: string;
                                              }
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<string>
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  en_name?: string;
                                                  email?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<{
                                                  file_token?: string;
                                                  name?: string;
                                                  type?: string;
                                                  size?: number;
                                                  url?: string;
                                                  tmp_url?: string;
                                              }>
                                        >;
                                        record_id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        created_time?: number;
                                        last_modified_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        last_modified_time?: number;
                                        shared_url?: string;
                                        record_url?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                searchWithIterator: async (
                    payload?: {
                        data?: {
                            view_id?: string;
                            field_names?: Array<string>;
                            sort?: Array<{
                                field_name?: string;
                                desc?: boolean;
                            }>;
                            filter?: {
                                conjunction?: "and" | "or";
                                conditions?: Array<{
                                    field_name: string;
                                    operator:
                                        | "is"
                                        | "isNot"
                                        | "contains"
                                        | "doesNotContain"
                                        | "isEmpty"
                                        | "isNotEmpty"
                                        | "isGreater"
                                        | "isGreaterEqual"
                                        | "isLess"
                                        | "isLessEqual"
                                        | "like"
                                        | "in";
                                    value?: Array<string>;
                                }>;
                                children?: Array<{
                                    conjunction: "and" | "or";
                                    conditions?: Array<{
                                        field_name: string;
                                        operator:
                                            | "is"
                                            | "isNot"
                                            | "contains"
                                            | "doesNotContain"
                                            | "isEmpty"
                                            | "isNotEmpty"
                                            | "isGreater"
                                            | "isGreaterEqual"
                                            | "isLess"
                                            | "isLessEqual"
                                            | "like"
                                            | "in";
                                        value?: Array<string>;
                                    }>;
                                }>;
                            };
                            automatic_fields?: boolean;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { app_token: string; table_id: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/search`,
                                    path
                                ),
                                method: "POST",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        fields: Record<
                                                            string,
                                                            | string
                                                            | number
                                                            | number
                                                            | number
                                                            | boolean
                                                            | {
                                                                  text?: string;
                                                                  link?: string;
                                                              }
                                                            | {
                                                                  location?: string;
                                                                  pname?: string;
                                                                  cityname?: string;
                                                                  adname?: string;
                                                                  address?: string;
                                                                  name?: string;
                                                                  full_address?: string;
                                                              }
                                                            | Array<{
                                                                  id?: string;
                                                                  name?: string;
                                                                  avatar_url?: string;
                                                              }>
                                                            | Array<string>
                                                            | Array<{
                                                                  id?: string;
                                                                  name?: string;
                                                                  en_name?: string;
                                                                  email?: string;
                                                                  avatar_url?: string;
                                                              }>
                                                            | Array<{
                                                                  file_token?: string;
                                                                  name?: string;
                                                                  type?: string;
                                                                  size?: number;
                                                                  url?: string;
                                                                  tmp_url?: string;
                                                              }>
                                                        >;
                                                        record_id?: string;
                                                        created_by?: {
                                                            id?: string;
                                                            name?: string;
                                                            en_name?: string;
                                                            email?: string;
                                                            avatar_url?: string;
                                                        };
                                                        created_time?: number;
                                                        last_modified_by?: {
                                                            id?: string;
                                                            name?: string;
                                                            en_name?: string;
                                                            email?: string;
                                                            avatar_url?: string;
                                                        };
                                                        last_modified_time?: number;
                                                        shared_url?: string;
                                                        record_url?: string;
                                                    }>;
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    total?: number;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=bitable&resource=app.table.record&version=v1 document }
                 *
                 * 查找多维表格记录
                 */
                search: async (
                    payload?: {
                        data?: {
                            view_id?: string;
                            field_names?: Array<string>;
                            sort?: Array<{
                                field_name?: string;
                                desc?: boolean;
                            }>;
                            filter?: {
                                conjunction?: "and" | "or";
                                conditions?: Array<{
                                    field_name: string;
                                    operator:
                                        | "is"
                                        | "isNot"
                                        | "contains"
                                        | "doesNotContain"
                                        | "isEmpty"
                                        | "isNotEmpty"
                                        | "isGreater"
                                        | "isGreaterEqual"
                                        | "isLess"
                                        | "isLessEqual"
                                        | "like"
                                        | "in";
                                    value?: Array<string>;
                                }>;
                                children?: Array<{
                                    conjunction: "and" | "or";
                                    conditions?: Array<{
                                        field_name: string;
                                        operator:
                                            | "is"
                                            | "isNot"
                                            | "contains"
                                            | "doesNotContain"
                                            | "isEmpty"
                                            | "isNotEmpty"
                                            | "isGreater"
                                            | "isGreaterEqual"
                                            | "isLess"
                                            | "isLessEqual"
                                            | "like"
                                            | "in";
                                        value?: Array<string>;
                                    }>;
                                }>;
                            };
                            automatic_fields?: boolean;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { app_token: string; table_id: string };
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
                                        fields: Record<
                                            string,
                                            | string
                                            | number
                                            | number
                                            | number
                                            | boolean
                                            | { text?: string; link?: string }
                                            | {
                                                  location?: string;
                                                  pname?: string;
                                                  cityname?: string;
                                                  adname?: string;
                                                  address?: string;
                                                  name?: string;
                                                  full_address?: string;
                                              }
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<string>
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  en_name?: string;
                                                  email?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<{
                                                  file_token?: string;
                                                  name?: string;
                                                  type?: string;
                                                  size?: number;
                                                  url?: string;
                                                  tmp_url?: string;
                                              }>
                                        >;
                                        record_id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        created_time?: number;
                                        last_modified_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        last_modified_time?: number;
                                        shared_url?: string;
                                        record_url?: string;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/search`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.record&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-record/update document }
                 *
                 * 更新记录
                 *
                 * 该接口用于更新数据表中的一条记录
                 *
                 * 该接口支持调用频率上限为 10 QPS（Query Per Second，每秒请求率）
                 */
                update: async (
                    payload?: {
                        data: {
                            fields: Record<
                                string,
                                | string
                                | number
                                | number
                                | number
                                | boolean
                                | { text?: string; link?: string }
                                | {
                                      location?: string;
                                      pname?: string;
                                      cityname?: string;
                                      adname?: string;
                                      address?: string;
                                      name?: string;
                                      full_address?: string;
                                  }
                                | Array<{
                                      id?: string;
                                      name?: string;
                                      avatar_url?: string;
                                  }>
                                | Array<string>
                                | Array<{
                                      id?: string;
                                      name?: string;
                                      en_name?: string;
                                      email?: string;
                                  }>
                                | Array<{
                                      file_token?: string;
                                      name?: string;
                                      type?: string;
                                      size?: number;
                                      url?: string;
                                      tmp_url?: string;
                                  }>
                            >;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            app_token: string;
                            table_id: string;
                            record_id: string;
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
                                    record?: {
                                        fields: Record<
                                            string,
                                            | string
                                            | number
                                            | number
                                            | number
                                            | boolean
                                            | { text?: string; link?: string }
                                            | {
                                                  location?: string;
                                                  pname?: string;
                                                  cityname?: string;
                                                  adname?: string;
                                                  address?: string;
                                                  name?: string;
                                                  full_address?: string;
                                              }
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<string>
                                            | Array<{
                                                  id?: string;
                                                  name?: string;
                                                  en_name?: string;
                                                  email?: string;
                                                  avatar_url?: string;
                                              }>
                                            | Array<{
                                                  file_token?: string;
                                                  name?: string;
                                                  type?: string;
                                                  size?: number;
                                                  url?: string;
                                                  tmp_url?: string;
                                              }>
                                        >;
                                        record_id?: string;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        created_time?: number;
                                        last_modified_by?: {
                                            id?: string;
                                            name?: string;
                                            en_name?: string;
                                            email?: string;
                                            avatar_url?: string;
                                        };
                                        last_modified_time?: number;
                                        shared_url?: string;
                                        record_url?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/records/:record_id`,
                                path
                            ),
                            method: "PUT",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 视图
             */
            appTableView: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/create document }
                 *
                 * 新增视图
                 *
                 * 在数据表中新增一个视图
                 *
                 * 该接口支持调用频率上限为 10 QPS
                 */
                create: async (
                    payload?: {
                        data: {
                            view_name: string;
                            view_type?:
                                | "grid"
                                | "kanban"
                                | "gallery"
                                | "gantt"
                                | "form";
                        };
                        path?: { app_token?: string; table_id?: string };
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
                                    view?: {
                                        view_id?: string;
                                        view_name?: string;
                                        view_type?: string;
                                        property?: {
                                            filter_info?: {
                                                conjunction: "and" | "or";
                                                conditions: Array<{
                                                    field_id: string;
                                                    operator:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty"
                                                        | "isGreater"
                                                        | "isGreaterEqual"
                                                        | "isLess"
                                                        | "isLessEqual";
                                                    value?: string;
                                                    condition_id?: string;
                                                    field_type?: number;
                                                }>;
                                                condition_omitted?: boolean;
                                            };
                                            hidden_fields?: Array<string>;
                                            hierarchy_config?: {
                                                field_id?: string;
                                            };
                                        };
                                        view_public_level?:
                                            | "Public"
                                            | "Locked"
                                            | "Private";
                                        view_private_owner_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/delete document }
                 *
                 * 删除视图
                 *
                 * 删除数据表中的视图
                 *
                 * 该接口支持调用频率上限为 10 QPS
                 */
                delete: async (
                    payload?: {
                        path?: {
                            app_token?: string;
                            table_id?: string;
                            view_id?: string;
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
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/get document }
                 *
                 * 检索视图
                 *
                 * 该接口根据 view_id 检索现有视图
                 */
                get: async (
                    payload?: {
                        path?: {
                            app_token?: string;
                            table_id?: string;
                            view_id?: string;
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
                                    view?: {
                                        view_id?: string;
                                        view_name?: string;
                                        view_type?: string;
                                        property?: {
                                            filter_info?: {
                                                conjunction: "and" | "or";
                                                conditions: Array<{
                                                    field_id: string;
                                                    operator:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty"
                                                        | "isGreater"
                                                        | "isGreaterEqual"
                                                        | "isLess"
                                                        | "isLessEqual";
                                                    value?: string;
                                                    condition_id?: string;
                                                    field_type?: number;
                                                }>;
                                                condition_omitted?: boolean;
                                            };
                                            hidden_fields?: Array<string>;
                                            hierarchy_config?: {
                                                field_id?: string;
                                            };
                                        };
                                        view_public_level?:
                                            | "Public"
                                            | "Locked"
                                            | "Private";
                                        view_private_owner_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
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
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { app_token?: string; table_id?: string };
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
                                    `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        view_id?: string;
                                                        view_name?: string;
                                                        view_type?: string;
                                                        property?: {
                                                            filter_info?: {
                                                                conjunction:
                                                                    | "and"
                                                                    | "or";
                                                                conditions: Array<{
                                                                    field_id: string;
                                                                    operator:
                                                                        | "is"
                                                                        | "isNot"
                                                                        | "contains"
                                                                        | "doesNotContain"
                                                                        | "isEmpty"
                                                                        | "isNotEmpty"
                                                                        | "isGreater"
                                                                        | "isGreaterEqual"
                                                                        | "isLess"
                                                                        | "isLessEqual";
                                                                    value?: string;
                                                                    condition_id?: string;
                                                                    field_type?: number;
                                                                }>;
                                                                condition_omitted?: boolean;
                                                            };
                                                            hidden_fields?: Array<string>;
                                                            hierarchy_config?: {
                                                                field_id?: string;
                                                            };
                                                        };
                                                        view_public_level?:
                                                            | "Public"
                                                            | "Locked"
                                                            | "Private";
                                                        view_private_owner_id?: string;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    total?: number;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/list document }
                 *
                 * 列出视图
                 *
                 * 根据 app_token 和 table_id，获取数据表的所有视图
                 *
                 * 该接口支持调用频率上限为 20 QPS
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { app_token?: string; table_id?: string };
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
                                        view_id?: string;
                                        view_name?: string;
                                        view_type?: string;
                                        property?: {
                                            filter_info?: {
                                                conjunction: "and" | "or";
                                                conditions: Array<{
                                                    field_id: string;
                                                    operator:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty"
                                                        | "isGreater"
                                                        | "isGreaterEqual"
                                                        | "isLess"
                                                        | "isLessEqual";
                                                    value?: string;
                                                    condition_id?: string;
                                                    field_type?: number;
                                                }>;
                                                condition_omitted?: boolean;
                                            };
                                            hidden_fields?: Array<string>;
                                            hierarchy_config?: {
                                                field_id?: string;
                                            };
                                        };
                                        view_public_level?:
                                            | "Public"
                                            | "Locked"
                                            | "Private";
                                        view_private_owner_id?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bitable&resource=app.table.view&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/bitable-v1/app-table-view/patch document }
                 *
                 * 更新视图
                 *
                 * 该接口用于增量修改视图信息
                 */
                patch: async (
                    payload?: {
                        data?: {
                            view_name?: string;
                            property?: {
                                filter_info?: {
                                    conjunction: "and" | "or";
                                    conditions: Array<{
                                        field_id: string;
                                        operator:
                                            | "is"
                                            | "isNot"
                                            | "contains"
                                            | "doesNotContain"
                                            | "isEmpty"
                                            | "isNotEmpty"
                                            | "isGreater"
                                            | "isGreaterEqual"
                                            | "isLess"
                                            | "isLessEqual";
                                        value?: string;
                                    }>;
                                };
                                hidden_fields?: Array<string>;
                                hierarchy_config?: { field_id?: string };
                            };
                        };
                        path?: {
                            app_token?: string;
                            table_id?: string;
                            view_id?: string;
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
                                    view?: {
                                        view_id?: string;
                                        view_name?: string;
                                        view_type?: string;
                                        property?: {
                                            filter_info?: {
                                                conjunction: "and" | "or";
                                                conditions: Array<{
                                                    field_id: string;
                                                    operator:
                                                        | "is"
                                                        | "isNot"
                                                        | "contains"
                                                        | "doesNotContain"
                                                        | "isEmpty"
                                                        | "isNotEmpty"
                                                        | "isGreater"
                                                        | "isGreaterEqual"
                                                        | "isLess"
                                                        | "isLessEqual";
                                                    value?: string;
                                                    condition_id?: string;
                                                    field_type?: number;
                                                }>;
                                                condition_omitted?: boolean;
                                            };
                                            hidden_fields?: Array<string>;
                                            hierarchy_config?: {
                                                field_id?: string;
                                            };
                                        };
                                        view_public_level?:
                                            | "Public"
                                            | "Locked"
                                            | "Private";
                                        view_private_owner_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bitable/v1/apps/:app_token/tables/:table_id/views/:view_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
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
