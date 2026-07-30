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
import aily from "./aily";

// auto gen
export default abstract class Client extends aily {
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
    apaas = {
        v1: {
            /**
             * approval_task
             */
            approvalTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=approval_task&apiName=add_assignee&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_assignee&project=apaas&resource=approval_task&version=v1 document }
                 *
                 * 人工任务加签
                 *
                 * 对于人工任务进行加签操作
                 */
                addAssignee: async (
                    payload?: {
                        data: {
                            user_id: string;
                            approvers?: Array<string>;
                            add_assignee_type?: string;
                            opinion?: string;
                        };
                        path: { approval_task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/approval_tasks/:approval_task_id/add_assignee`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=approval_task&apiName=agree&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=agree&project=apaas&resource=approval_task&version=v1 document }
                 *
                 * 同意人工任务
                 *
                 * 对于人工任务进行同意操作
                 */
                agree: async (
                    payload?: {
                        data: { user_id: string; opinion?: string };
                        path: { approval_task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/approval_tasks/:approval_task_id/agree`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=approval_task&apiName=transfer&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=transfer&project=apaas&resource=approval_task&version=v1 document }
                 *
                 * 转交人工任务
                 *
                 * 对于人工任务进行转交操作
                 */
                transfer: async (
                    payload?: {
                        data: {
                            user_id: string;
                            from_user_ids?: Array<string>;
                            to_user_ids?: Array<string>;
                            opinion?: string;
                        };
                        path: { approval_task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/approval_tasks/:approval_task_id/transfer`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=approval_task&apiName=reject&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reject&project=apaas&resource=approval_task&version=v1 document }
                 *
                 * 拒绝人工任务
                 *
                 * 对于人工任务进行拒绝操作
                 */
                reject: async (
                    payload?: {
                        data: { user_id: string; opinion?: string };
                        path: { approval_task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/approval_tasks/:approval_task_id/reject`,
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
             * application.object.record
             */
            applicationObjectRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 删除记录
                 *
                 * 删除对象中的指定记录
                 */
                delete: async (
                    payload?: {
                        path: {
                            namespace: string;
                            object_api_name: string;
                            id: string;
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/:id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 获取记录详情
                 *
                 * 获取对象中指定的记录详情
                 */
                query: async (
                    payload?: {
                        data?: { select?: Array<string> };
                        path: {
                            namespace: string;
                            object_api_name: string;
                            id: string;
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
                                data?: { item: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/:id/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 批量新建记录
                 *
                 * 一次新建多条对象中的记录
                 */
                batchCreate: async (
                    payload?: {
                        data: { records: string };
                        path: { namespace: string; object_api_name: string };
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
                                        success: boolean;
                                        id?: string;
                                        errors?: Array<{
                                            code: string;
                                            message: string;
                                            sub_code?: string;
                                            fields?: Array<string>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/batch_create`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 编辑记录
                 *
                 * 编辑对象中的指定记录
                 */
                patch: async (
                    payload?: {
                        data: { record: string };
                        path: {
                            namespace: string;
                            object_api_name: string;
                            id: string;
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/:id`,
                                path
                            ),
                            method: "PATCH",
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 批量删除记录
                 *
                 * 一次删除多条对象中的记录
                 */
                batchDelete: async (
                    payload?: {
                        data: { ids: Array<string> };
                        path: { namespace: string; object_api_name: string };
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
                                        success: boolean;
                                        id?: string;
                                        errors?: Array<{
                                            code: string;
                                            message: string;
                                            sub_code?: string;
                                            fields?: Array<string>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/batch_delete`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 批量编辑记录
                 *
                 * 一次编辑多条对象中的记录
                 */
                batchUpdate: async (
                    payload?: {
                        data: { records: string };
                        path: { namespace: string; object_api_name: string };
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
                                        success: boolean;
                                        id?: string;
                                        errors?: Array<{
                                            code: string;
                                            message: string;
                                            sub_code?: string;
                                            fields?: Array<string>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/batch_update`,
                                path
                            ),
                            method: "PATCH",
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 新建记录
                 *
                 * 在对象中新建记录
                 */
                create: async (
                    payload?: {
                        data: { record: string };
                        path: { namespace: string; object_api_name: string };
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
                                data?: { id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=batch_query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_query&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 查询记录列表
                 *
                 * 获取对象中符合指定条件的记录列表
                 */
                batchQuery: async (
                    payload?: {
                        data: {
                            select: Array<string>;
                            filter?: {
                                conditions?: Array<{
                                    index?: string;
                                    left?: {
                                        type?: string;
                                        settings?: string;
                                        display_names?: Array<string>;
                                    };
                                    right?: {
                                        type?: string;
                                        settings?: string;
                                        display_names?: Array<string>;
                                    };
                                    operator?: string;
                                }>;
                                logic_expression?: string;
                            };
                            order_by?: Array<{
                                field: string;
                                direction: "ASC" | "DESC";
                            }>;
                            group_by?: Array<{ field: string }>;
                            page_token?: string;
                            use_page_token?: boolean;
                            page_size?: number;
                            offset?: number;
                            need_total_count?: boolean;
                        };
                        path: { namespace: string; object_api_name: string };
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
                                    items: string;
                                    total?: number;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/batch_query`,
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
             * application.object
             */
            applicationObject: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object&apiName=oql_query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=oql_query&project=apaas&resource=application.object&version=v1 document }
                 *
                 * 执行 OQL
                 *
                 * 在应用内执行 OQL 语句
                 */
                oqlQuery: async (
                    payload?: {
                        data: {
                            query: string;
                            args?: string;
                            named_args?: string;
                        };
                        path: { namespace: string };
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
                                data?: { columns: Array<string>; rows: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/oql_query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=apaas&resource=application.object&version=v1 document }
                 *
                 * 搜索记录
                 *
                 * 在应用内搜索记录
                 */
                search: async (
                    payload?: {
                        data?: {
                            q?: string;
                            search_objects?: Array<{
                                api_name?: string;
                                search_fields?: Array<string>;
                                select?: Array<string>;
                                filter?: {
                                    conditions?: Array<{
                                        index?: string;
                                        left?: {
                                            type?: string;
                                            settings?: string;
                                            display_names?: Array<string>;
                                        };
                                        right?: {
                                            type?: string;
                                            settings?: string;
                                            display_names?: Array<string>;
                                        };
                                        operator?: string;
                                    }>;
                                    logic_expression?: string;
                                };
                                order_by?: {
                                    field?: string;
                                    order_type?: "asc" | "desc";
                                };
                            }>;
                            page_token?: string;
                            page_size?: string;
                            metadata?: "Label" | "SearchLayout";
                        };
                        path: { namespace: string };
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
                                    records?: string;
                                    has_more?: boolean;
                                    next_page_token?: string;
                                    objects?: Array<{
                                        object?: {
                                            id?: number;
                                            api_name?: string;
                                            label?: Record<string, string>;
                                            settings?: {
                                                display_name?: string;
                                                allow_search_fields?: Array<string>;
                                                search_layout?: {
                                                    display_fields?: Array<string>;
                                                };
                                            };
                                        };
                                        fields?: Array<{
                                            id?: number;
                                            api_name?: string;
                                            type?: string;
                                            label?: Record<string, string>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/search`,
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
             * application.function
             */
            applicationFunction: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.function&apiName=invoke&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=invoke&project=apaas&resource=application.function&version=v1 document }
                 *
                 * 执行函数
                 *
                 * 执行基于飞书应用引擎开发的应用的自定义函数
                 */
                invoke: async (
                    payload?: {
                        data?: { params?: string };
                        path: { namespace: string; function_api_name: string };
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/functions/:function_api_name/invoke`,
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
             * application.role.member
             */
            applicationRoleMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.member&apiName=batch_remove_authorization&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_remove_authorization&project=apaas&resource=application.role.member&version=v1 document }
                 *
                 * 批量删除角色成员授权
                 *
                 * 批量删除角色成员授权
                 */
                batchRemoveAuthorization: async (
                    payload?: {
                        data?: {
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                        };
                        path: { namespace: string; role_api_name: string };
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/roles/:role_api_name/member/batch_remove_authorization`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.member&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.role.member&version=v1 document }
                 *
                 * 获取角色成员详情
                 *
                 * 获取角色成员详情
                 */
                get: async (
                    payload?: {
                        params?: {
                            need_display_name?: boolean;
                            use_api_id?: boolean;
                        };
                        path: { namespace: string; role_api_name: string };
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
                                    role_member?: {
                                        role_api_id?: string;
                                        role_api_name?: string;
                                        users?: Array<string>;
                                        departments?: Array<string>;
                                        user_filter?: {
                                            conditions?: Array<{
                                                index?: string;
                                                left?: {
                                                    type?: string;
                                                    settings?: string;
                                                    display_names?: Array<string>;
                                                };
                                                right?: {
                                                    type?: string;
                                                    settings?: string;
                                                    display_names?: Array<string>;
                                                };
                                                operator?: string;
                                            }>;
                                            logic_expression?: string;
                                        };
                                        user_display_infos?: Array<{
                                            id?: string;
                                            name?: string;
                                        }>;
                                        department_display_infos?: Array<{
                                            id?: string;
                                            name?: string;
                                        }>;
                                        type?: "all" | "custom";
                                        updated_by?: string;
                                        updated_at?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/roles/:role_api_name/member`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.member&apiName=batch_create_authorization&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create_authorization&project=apaas&resource=application.role.member&version=v1 document }
                 *
                 * 批量创建角色成员授权
                 *
                 * 批量创建角色成员授权
                 */
                batchCreateAuthorization: async (
                    payload?: {
                        data?: {
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                        };
                        path: { namespace: string; role_api_name: string };
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/roles/:role_api_name/member/batch_create_authorization`,
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
             * application.record_permission.member
             */
            applicationRecordPermissionMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.record_permission.member&apiName=batch_create_authorization&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create_authorization&project=apaas&resource=application.record_permission.member&version=v1 document }
                 *
                 * 批量创建记录权限授权
                 *
                 * 批量创建记录权限授权
                 */
                batchCreateAuthorization: async (
                    payload?: {
                        data?: { user_ids?: Array<string> };
                        path: {
                            namespace: string;
                            record_permission_api_name: string;
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/record_permissions/:record_permission_api_name/member/batch_create_authorization`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.record_permission.member&apiName=batch_remove_authorization&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_remove_authorization&project=apaas&resource=application.record_permission.member&version=v1 document }
                 *
                 * 批量删除记录权限授权
                 *
                 * 批量删除记录权限授权
                 */
                batchRemoveAuthorization: async (
                    payload?: {
                        data?: { user_ids?: Array<string> };
                        path: {
                            namespace: string;
                            record_permission_api_name: string;
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/record_permissions/:record_permission_api_name/member/batch_remove_authorization`,
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
             * application.environment_variable
             */
            applicationEnvironmentVariable: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.environment_variable&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.environment_variable&version=v1 document }
                 *
                 * 查询环境变量详情
                 *
                 * 查询基于飞书 aPaaS 开发的应用的环境变量详情，包括名称、描述、变量值等
                 */
                get: async (
                    payload?: {
                        path: {
                            namespace: string;
                            environment_variable_api_name: string;
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
                                    item?: {
                                        api_name: string;
                                        label: { zh_cn: string; en_us: string };
                                        description: string;
                                        value: string;
                                        is_encrypted?: boolean;
                                        object_api_name?: string;
                                        object_label?: {
                                            zh_cn: string;
                                            en_us: string;
                                        };
                                        created_at?: number;
                                        updated_at: number;
                                        type?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/environment_variables/:environment_variable_api_name`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.environment_variable&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=application.environment_variable&version=v1 document }
                 *
                 * 查询环境变量列表
                 *
                 * 查询基于飞书 aPaaS 开发的应用的环境变量列表
                 */
                query: async (
                    payload?: {
                        data?: {
                            filter?: { quick_query?: string };
                            limit?: number;
                            offset?: number;
                        };
                        path: { namespace: string };
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
                                        api_name: string;
                                        label: { zh_cn: string; en_us: string };
                                        description: string;
                                        value: string;
                                        is_encrypted?: boolean;
                                        object_api_name?: string;
                                        object_label?: {
                                            zh_cn: string;
                                            en_us: string;
                                        };
                                        created_at?: number;
                                        updated_at: number;
                                        type?: string;
                                    }>;
                                    total: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/environment_variables/query`,
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
             * user_task
             */
            userTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=expediting&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=expediting&project=apaas&resource=user_task&version=v1 document }
                 *
                 * 人工任务 - 催办任务
                 *
                 * 对任务当前的处理人发起一次催办
                 */
                expediting: async (
                    payload?: {
                        data: {
                            operator_user_id: string;
                            expediting_user_ids: Array<string>;
                            opinion?: string;
                        };
                        path: { task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/user_tasks/:task_id/expediting`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=cc&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cc&project=apaas&resource=user_task&version=v1 document }
                 *
                 * 人工任务 - 抄送任务
                 *
                 * 对当前的任务进行一次抄送
                 */
                cc: async (
                    payload?: {
                        data: {
                            cc_user_ids: Array<string>;
                            operator_user_id: string;
                        };
                        path: { task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/user_tasks/:task_id/cc`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=chat_group&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=chat_group&project=apaas&resource=user_task&version=v1 document }
                 *
                 * 人工任务 - 发起群聊
                 *
                 * 基于任务，发起一个飞书群聊
                 */
                chatGroup: async (
                    payload?: {
                        data: {
                            operator_user_id: string;
                            invite_user_ids?: Array<string>;
                            chat_id?: string;
                            chat_name?: string;
                        };
                        path: { task_id: string };
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
                                data?: { chat_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/user_tasks/:task_id/chat_group`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=rollback&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=rollback&project=apaas&resource=user_task&version=v1 document }
                 *
                 * 人工任务 - 退回
                 *
                 * 对当前任务进行一次退回
                 */
                rollback: async (
                    payload?: {
                        data: {
                            operator_user_id: string;
                            to_task_id: string;
                            opinion: string;
                        };
                        path: { task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/user_tasks/:task_id/rollback`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=rollback_points&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=rollback_points&project=apaas&resource=user_task&version=v1 document }
                 *
                 * 人工任务 - 查询可退回的位置
                 *
                 * 查询当前任务可以退回的位置
                 */
                rollbackPoints: async (
                    payload?: {
                        data: { operator_user_id: string };
                        path: { task_id: string };
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
                                    tasks?: Array<{
                                        id?: string;
                                        activity_label?: Array<{
                                            language_code?: string;
                                            text?: string;
                                        }>;
                                        is_start?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/user_tasks/:task_id/rollback_points`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=user_task&version=v1 document }
                 *
                 * 查询人工任务列表
                 *
                 * 查询人工任务列表
                 */
                query: async (
                    payload?: {
                        data: {
                            type?: string;
                            source?: string;
                            limit?: string;
                            offset?: string;
                            start_time?: string;
                            end_time?: string;
                            api_ids?: Array<string>;
                            kunlun_user_id: string;
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
                                    count?: string;
                                    tasks?: Array<{
                                        task_id?: string;
                                        task_start_time?: string;
                                        workflow_instance?: {
                                            id?: string;
                                            label?: Array<{
                                                language_code?: string;
                                                text?: string;
                                            }>;
                                            status?: string;
                                        };
                                        initiator?: {
                                            user_id?: string;
                                            name?: string;
                                        };
                                        summarys?: Array<{
                                            file_key?: {
                                                language_code?: string;
                                                text?: string;
                                            };
                                            file_value?: Array<{
                                                language_code?: string;
                                                text?: string;
                                            }>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/user_task/query`,
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
             * application.flow
             */
            applicationFlow: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.flow&apiName=execute&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=execute&project=apaas&resource=application.flow&version=v1 document }
                 *
                 * 发起流程
                 *
                 * 执行相应流程
                 */
                execute: async (
                    payload?: {
                        data: {
                            is_async?: boolean;
                            idempotent_key?: string;
                            loop_masks?: Array<string>;
                            params?: string;
                            operator: string;
                        };
                        path: { namespace: string; flow_id: string };
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
                                    status?: string;
                                    out_params?: string;
                                    execution_id?: string;
                                    error_msg?: string;
                                    code?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/flows/:flow_id/execute`,
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
             * approval_instance
             */
            approvalInstance: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=approval_instance&apiName=cancel&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel&project=apaas&resource=approval_instance&version=v1 document }
                 *
                 * 人工任务 - 撤销
                 *
                 * 撤销一个人工任务（包括审批任务，填写任务）
                 */
                cancel: async (
                    payload?: {
                        data: { user_id: string; opinion: string };
                        path: { approval_instance_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/approval_instances/:approval_instance_id/cancel`,
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
             * application.audit_log
             */
            applicationAuditLog: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.audit_log&apiName=audit_log_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=audit_log_list&project=apaas&resource=application.audit_log&version=v1 document }
                 *
                 * 查询审计日志列表
                 *
                 * 根据搜索/筛选条件，查询审计日志列表
                 *
                 * 每次最多可查询 10,000 条数据
                 */
                auditLogList: async (
                    payload?: {
                        params: {
                            page_size: string;
                            offset: string;
                            quick_query?: string;
                            from: string;
                            to: string;
                            log_type: string;
                            filter?: string;
                            columns?: Array<string>;
                            sort_by?: string;
                            sort_order?: string;
                            app_type?: string;
                        };
                        path: { namespace: string };
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
                                        log_id?: string;
                                        op_time?: string;
                                        log_type?: string;
                                        operator?: {
                                            id?: string;
                                            name?: string;
                                            tenant_id?: string;
                                            email?: string;
                                        };
                                        outsider?: boolean;
                                        login_type?: string;
                                        lark_tenant_id?: string;
                                        apaas_tenant_id?: string;
                                        user_geo?: string;
                                        client_ip?: string;
                                        ip_loc?: string;
                                        ip_provider?: string;
                                        referer?: string;
                                        origin?: string;
                                        api_path?: string;
                                        full_path?: string;
                                        user_agent?: string;
                                        device_id?: string;
                                        web_device_id?: string;
                                        terminal_type?: string;
                                        os_type?: string;
                                        os_version?: string;
                                        module?: string;
                                        data_object?: string;
                                        audit_scope?: string;
                                        tenant_id?: string;
                                        namespace?: string;
                                        env_type?: string;
                                        op_type?: string;
                                        op_detail?: Record<string, string>;
                                        op_source?: string;
                                        status?: string;
                                        failed_reason_i18n?: Record<
                                            string,
                                            string
                                        >;
                                        data_changes?: Array<string>;
                                        app_name?: Record<string, string>;
                                        keyword_field_app_version?: string;
                                        keyword_field_functional_sub_module?: string;
                                    }>;
                                    total?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/audit_log/audit_log_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.audit_log&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.audit_log&version=v1 document }
                 *
                 * 飞书低代码平台-查询审计日志详情
                 *
                 * 根据日志 ID 查询审计日志详情
                 */
                get: async (
                    payload?: {
                        params: { log_id: string };
                        path: { namespace: string };
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
                                    data?: {
                                        log_id?: string;
                                        basic_info?: {
                                            log_type?: string;
                                            audit_scope?: string;
                                            env_type?: string;
                                            app_id?: string;
                                            module?: string;
                                            op_type?: string;
                                            app_name?: Record<string, string>;
                                        };
                                        op_info?: {
                                            operator?: {
                                                id?: string;
                                                name?: string;
                                                tenant_id?: string;
                                                email?: string;
                                            };
                                            outsider?: boolean;
                                            op_detail?: Record<string, string>;
                                            status?: string;
                                            failed_reason?: string;
                                            failed_reason_i18n?: Record<
                                                string,
                                                string
                                            >;
                                            op_time?: string;
                                            data_object?: string;
                                            op_source?: string;
                                            data_changes?: Array<string>;
                                        };
                                        login_info?: { login_type?: string };
                                        device_info?: {
                                            device_id?: string;
                                            web_device_id?: string;
                                            terminal_type?: string;
                                            os_type?: string;
                                            os_version?: string;
                                        };
                                        net_info?: {
                                            client_ip?: string;
                                            ip_loc?: string;
                                            ip_provider?: string;
                                            referer?: string;
                                            origin?: string;
                                            user_agent?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/audit_log`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.audit_log&apiName=data_change_logs_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=data_change_logs_list&project=apaas&resource=application.audit_log&version=v1 document }
                 *
                 * 飞书低代码平台-查询数据变更日志列表
                 *
                 * 根据搜索/筛选条件，查询数据变更日志列表
                 *
                 * 每次最多可查询 10,000 条数据
                 */
                dataChangeLogsList: async (
                    payload?: {
                        params: {
                            quick_query?: string;
                            page_size: string;
                            offset: string;
                            from?: string;
                            to?: string;
                            log_type: string;
                            filter?: string;
                            columns?: Array<string>;
                            sort_by?: string;
                            sort_order?: string;
                            app_type?: string;
                        };
                        path: { namespace: string };
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
                                        log_id?: string;
                                        op_time?: string;
                                        log_type?: string;
                                        operator?: {
                                            id?: string;
                                            name?: string;
                                            tenant_id?: string;
                                            email?: string;
                                        };
                                        outsider?: boolean;
                                        login_type?: string;
                                        lark_tenant_id?: string;
                                        apaas_tenant_id?: string;
                                        user_geo?: string;
                                        client_ip?: string;
                                        ip_loc?: string;
                                        ip_provider?: string;
                                        referer?: string;
                                        origin?: string;
                                        api_path?: string;
                                        full_path?: string;
                                        user_agent?: string;
                                        device_id?: string;
                                        web_device_id?: string;
                                        terminal_type?: string;
                                        os_type?: string;
                                        os_version?: string;
                                        module?: string;
                                        data_object?: string;
                                        audit_scope?: string;
                                        tenant_id?: string;
                                        namespace?: string;
                                        env_type?: string;
                                        op_type?: string;
                                        op_detail?: Record<string, string>;
                                        op_source?: string;
                                        status?: string;
                                        failed_reason_i18n?: Record<
                                            string,
                                            string
                                        >;
                                        data_changes?: Array<string>;
                                        app_name?: Record<string, string>;
                                        keyword_field_app_version?: string;
                                        keyword_field_functional_sub_module?: string;
                                    }>;
                                    total?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/audit_log/data_change_logs_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.audit_log&apiName=data_change_log_detail&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=data_change_log_detail&project=apaas&resource=application.audit_log&version=v1 document }
                 *
                 * 飞书低代码平台-查询数据变更日志详情
                 *
                 * 根据日志 ID 查询数据变更日志详情
                 */
                dataChangeLogDetail: async (
                    payload?: {
                        params: { log_id: string };
                        path: { namespace: string };
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
                                    data?: {
                                        log_id?: string;
                                        basic_info?: {
                                            log_type?: string;
                                            audit_scope?: string;
                                            env_type?: string;
                                            app_id?: string;
                                            module?: string;
                                            op_type?: string;
                                            app_name?: Record<string, string>;
                                        };
                                        op_info?: {
                                            operator?: {
                                                id?: string;
                                                name?: string;
                                                tenant_id?: string;
                                                email?: string;
                                            };
                                            outsider?: boolean;
                                            op_detail?: Record<string, string>;
                                            status?: string;
                                            failed_reason?: string;
                                            failed_reason_i18n?: Record<
                                                string,
                                                string
                                            >;
                                            op_time?: string;
                                            data_object?: string;
                                            op_source?: string;
                                            data_changes?: Array<string>;
                                        };
                                        login_info?: { login_type?: string };
                                        device_info?: {
                                            device_id?: string;
                                            web_device_id?: string;
                                            terminal_type?: string;
                                            os_type?: string;
                                            os_version?: string;
                                        };
                                        net_info?: {
                                            client_ip?: string;
                                            ip_loc?: string;
                                            ip_provider?: string;
                                            referer?: string;
                                            origin?: string;
                                            user_agent?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/audit_log/data_change_log_detail`,
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
             * seat_assignment
             */
            seatAssignment: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            seat_type: "per_user" | "per_user_per_app";
                            page_size: string;
                            page_token?: string;
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
                                    `${this.domain}/open-apis/apaas/v1/seat_assignments`,
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
                                                        user_id?: number;
                                                        namespace?: string;
                                                        status?:
                                                            | "in_use"
                                                            | "released";
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=seat_assignment&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=apaas&resource=seat_assignment&version=v1 document }
                 *
                 * 查询席位分配详情
                 *
                 * 获取租户下平台席位和应用访问席位分配详情，如用户 ID 、应用命名空间等，需要飞书 aPaaS 系统管理员作为授权人调用当前 API 。
                 */
                list: async (
                    payload?: {
                        params: {
                            seat_type: "per_user" | "per_user_per_app";
                            page_size: string;
                            page_token?: string;
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
                                        user_id?: number;
                                        namespace?: string;
                                        status?: "in_use" | "released";
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/seat_assignments`,
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
             * seat_activity
             */
            seatActivity: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            seat_type: "per_user" | "per_user_per_app";
                            page_size: string;
                            page_token?: string;
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
                                    `${this.domain}/open-apis/apaas/v1/seat_activities`,
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
                                                        user_id?: number;
                                                        namespace?: string;
                                                        status?:
                                                            | "in_use"
                                                            | "released";
                                                        active_time?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=seat_activity&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=apaas&resource=seat_activity&version=v1 document }
                 *
                 * 查询席位活跃详情
                 *
                 * 获取租户下用户使用飞书 aPaaS 席位最近访问应用时间。需要飞书 aPaaS 系统管理员作为授权人调用当前API。
                 */
                list: async (
                    payload?: {
                        params: {
                            seat_type: "per_user" | "per_user_per_app";
                            page_size: string;
                            page_token?: string;
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
                                        user_id?: number;
                                        namespace?: string;
                                        status?: "in_use" | "released";
                                        active_time?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/seat_activities`,
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
             * app
             */
            app: {
                listWithIterator: async (
                    payload?: {
                        params?: { page_size?: string; page_token?: string };
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
                                    `${this.domain}/open-apis/apaas/v1/apps`,
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
                                                        name?: Array<{
                                                            language_code?: string;
                                                            text?: string;
                                                        }>;
                                                        namespace?: string;
                                                        created_at?: number;
                                                        creator?: number;
                                                        owner?: number;
                                                        status?:
                                                            | "pending_launch"
                                                            | "enabled"
                                                            | "disabled"
                                                            | "stopped"
                                                            | "unspecified";
                                                        app_roles_info?: {
                                                            admins?: Array<number>;
                                                            developers?: Array<number>;
                                                            test_users?: Array<number>;
                                                            data_admins?: Array<number>;
                                                        };
                                                        icon?: string;
                                                        description?: Array<{
                                                            language_code?: string;
                                                            text?: string;
                                                        }>;
                                                        type?:
                                                            | "custom"
                                                            | "client_isv_saas"
                                                            | "client_isv_project";
                                                        enable_status?:
                                                            | "enabled"
                                                            | "disabled";
                                                        release_status?:
                                                            | "released"
                                                            | "unreleased";
                                                        service_status?:
                                                            | "available"
                                                            | "unavailable";
                                                        service_unavailable_reason?:
                                                            | "from_isv"
                                                            | "entitlement_expire";
                                                        feature_set?:
                                                            | "paid"
                                                            | "free";
                                                        charge_mode?:
                                                            | "per_user_per_app"
                                                            | "per_user"
                                                            | "independent"
                                                            | "free";
                                                        isv_tenant?: {
                                                            id?: string;
                                                            name?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=app&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=apaas&resource=app&version=v1 document }
                 *
                 * 查看应用基本信息
                 *
                 * 获取企业下应用基本信息，如应用名称 、应用命名空间等。;
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: string; page_token?: string };
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
                                        name?: Array<{
                                            language_code?: string;
                                            text?: string;
                                        }>;
                                        namespace?: string;
                                        created_at?: number;
                                        creator?: number;
                                        owner?: number;
                                        status?:
                                            | "pending_launch"
                                            | "enabled"
                                            | "disabled"
                                            | "stopped"
                                            | "unspecified";
                                        app_roles_info?: {
                                            admins?: Array<number>;
                                            developers?: Array<number>;
                                            test_users?: Array<number>;
                                            data_admins?: Array<number>;
                                        };
                                        icon?: string;
                                        description?: Array<{
                                            language_code?: string;
                                            text?: string;
                                        }>;
                                        type?:
                                            | "custom"
                                            | "client_isv_saas"
                                            | "client_isv_project";
                                        enable_status?: "enabled" | "disabled";
                                        release_status?:
                                            | "released"
                                            | "unreleased";
                                        service_status?:
                                            | "available"
                                            | "unavailable";
                                        service_unavailable_reason?:
                                            | "from_isv"
                                            | "entitlement_expire";
                                        feature_set?: "paid" | "free";
                                        charge_mode?:
                                            | "per_user_per_app"
                                            | "per_user"
                                            | "independent"
                                            | "free";
                                        isv_tenant?: {
                                            id?: string;
                                            name?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/apps`,
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
             * workspace.table
             */
            workspaceTable: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.table&apiName=records_batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=records_batch_update&project=apaas&resource=workspace.table&version=v1 document }
                 *
                 * 批量更新数据表中的记录
                 *
                 * 批量更新数据表中的记录
                 */
                recordsBatchUpdate: async (
                    payload?: {
                        data: { records: string };
                        path: { workspace_id: string; table_name: string };
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
                                data?: { record_ids: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/tables/:table_name/records_batch_update`,
                                path
                            ),
                            method: "PATCH",
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.table&apiName=records_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=records_delete&project=apaas&resource=workspace.table&version=v1 document }
                 *
                 * 删除数据表中的记录
                 *
                 * 删除数据表中的记录
                 */
                recordsDelete: async (
                    payload?: {
                        params: { filter: string };
                        path: { workspace_id: string; table_name: string };
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
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/tables/:table_name/records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.table&apiName=records_patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=records_patch&project=apaas&resource=workspace.table&version=v1 document }
                 *
                 * 按条件更新数据表中的记录
                 *
                 * 按条件更新数据表中的记录
                 */
                recordsPatch: async (
                    payload?: {
                        data: { record: string };
                        params: { filter: string };
                        path: { workspace_id: string; table_name: string };
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
                                data?: { record_ids: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/tables/:table_name/records`,
                                path
                            ),
                            method: "PATCH",
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.table&apiName=records_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=records_get&project=apaas&resource=workspace.table&version=v1 document }
                 *
                 * 查询数据表数据记录
                 *
                 *  查询数据表数据记录
                 */
                recordsGet: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            select?: string;
                            filter?: string;
                            order?: string;
                        };
                        path: { workspace_id: string; table_name: string };
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
                                    has_more: boolean;
                                    page_token: string;
                                    total: number;
                                    items: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/tables/:table_name/records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.table&apiName=records_post&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=records_post&project=apaas&resource=workspace.table&version=v1 document }
                 *
                 * 向数据表中添加或更新记录
                 *
                 * 向数据表中添加或更新记录
                 */
                recordsPost: async (
                    payload?: {
                        data: { records: string };
                        params?: { columns?: string; on_conflict?: string };
                        path: { workspace_id: string; table_name: string };
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
                                data?: { record_ids: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/tables/:table_name/records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.table&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=apaas&resource=workspace.table&version=v1 document }
                 *
                 * 获取工作空间下的数据表列表
                 *
                 * 获取工作空间下的数据表列表
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { workspace_id: string };
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
                                    has_more: boolean;
                                    page_token: string;
                                    items: Array<{
                                        name: string;
                                        description: string;
                                        columns: Array<{
                                            name: string;
                                            description: string;
                                            data_type: string;
                                            is_primary_key: boolean;
                                            is_unique: boolean;
                                            is_auto_increment: boolean;
                                            is_array: boolean;
                                            is_allow_null: boolean;
                                            default_value: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/tables`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.table&apiName=table_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=table_get&project=apaas&resource=workspace.table&version=v1 document }
                 *
                 * 获取数据表详细信息
                 *
                 * 获取数据表详细信息
                 */
                tableGet: async (
                    payload?: {
                        path: { workspace_id: string; table_name: string };
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
                                    name: string;
                                    description: string;
                                    columns: Array<{
                                        name: string;
                                        description: string;
                                        data_type: string;
                                        is_primary_key: boolean;
                                        is_unique: boolean;
                                        is_auto_increment: boolean;
                                        is_array: boolean;
                                        is_allow_null: boolean;
                                        default_value: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/tables/:table_name`,
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
             * workspace
             */
            workspace: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace&apiName=sql_commands&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=sql_commands&project=apaas&resource=workspace&version=v1 document }
                 *
                 * 执行 SQL
                 *
                 * 在工作空间下执行 SQL 语句
                 */
                sqlCommands: async (
                    payload?: {
                        data: { sql: string };
                        path: { workspace_id: string };
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
                                data?: { result: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/sql_commands`,
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
             * workspace.view
             */
            workspaceView: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.view&apiName=views_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=views_get&project=apaas&resource=workspace.view&version=v1 document }
                 *
                 * 查询视图数据记录
                 *
                 * 查询视图数据记录
                 */
                viewsGet: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            select?: string;
                            filter?: string;
                            order?: string;
                        };
                        path: { workspace_id: string; view_name: string };
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
                                    has_more: boolean;
                                    page_token: string;
                                    total: number;
                                    items: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/views/:view_name/records`,
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
             * workspace.enum
             */
            workspaceEnum: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.enum&apiName=enum_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=enum_get&project=apaas&resource=workspace.enum&version=v1 document }
                 *
                 * 获取自定义枚举详细信息
                 *
                 * 获取自定义枚举详细信息
                 */
                enumGet: async (
                    payload?: {
                        path: { workspace_id: string; enum_name: string };
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
                                    name: string;
                                    description: string;
                                    options: Array<string>;
                                    created_at: string;
                                    created_by: {
                                        id?: string;
                                        name?: string;
                                        avatar?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/enums/:enum_name`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=workspace.enum&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=apaas&resource=workspace.enum&version=v1 document }
                 *
                 * 获取工作空间下的自定义枚举列表
                 *
                 * 获取工作空间下的自定义枚举列表
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { workspace_id: string };
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
                                    has_more: boolean;
                                    page_token: string;
                                    items: Array<{
                                        name: string;
                                        description: string;
                                        options: Array<string>;
                                        created_at: number;
                                        created_by?: {
                                            id?: string;
                                            name?: string;
                                            avatar?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/workspaces/:workspace_id/enums`,
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
             * tenant_app_metrics
             */
            tenantAppMetrics: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=tenant_app_metrics&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=tenant_app_metrics&version=v1 document }
                 *
                 * 获取应用运营数据
                 *
                 * 获取 aPaaS 应用活跃数据、存储或运行资源用量数据。
                 */
                query: async (
                    payload?: {
                        data: { namespaces: Array<string>; date: string };
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
                                    metrics?: Array<{
                                        namespace?: string;
                                        data?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/tenant_app_metrics/query`,
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
