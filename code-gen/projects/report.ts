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
import profile from "./profile";

// auto gen
export default abstract class Client extends profile {
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
    report = {
        /**
         * rule
         */
        rule: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=report&resource=rule&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=report&resource=rule&version=v1 document }
             *
             * 查询规则
             *
             * 查询规则。
             */
            query: async (
                payload?: {
                    params: {
                        rule_name: string;
                        include_deleted?: number;
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
                                rules?: Array<{
                                    rule_id?: string;
                                    name?: string;
                                    icon_name?: string;
                                    created_at?: number;
                                    creator_user_id?: string;
                                    creator_user_name?: string;
                                    owner_user_id?: string;
                                    owner_user_name?: string;
                                    form_schema?: Array<{
                                        name?: string;
                                        type?:
                                            | "text"
                                            | "number"
                                            | "dropdown"
                                            | "image"
                                            | "attachement"
                                            | "multiSelect"
                                            | "address"
                                            | "datetime";
                                    }>;
                                    is_deleted?: number;
                                    need_report_user_ids?: Array<string>;
                                    need_report_department_ids?: Array<string>;
                                    need_report_chat_ids?: Array<string>;
                                    cc_user_ids?: Array<string>;
                                    cc_department_ids?: Array<string>;
                                    to_user_ids?: Array<string>;
                                    to_chat_ids?: Array<string>;
                                    to_leaders?: Array<number>;
                                    to_department_owners?: Array<number>;
                                    manager_user_ids?: Array<string>;
                                    cc_chat_ids?: Array<string>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/report/v1/rules/query`,
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
         * rule.view
         */
        ruleView: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=report&resource=rule.view&apiName=remove&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove&project=report&resource=rule.view&version=v1 document }
             *
             * 移除规则看板
             *
             * 移除规则看板
             */
            remove: async (
                payload?: {
                    data?: { user_ids?: Array<string> };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { rule_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/report/v1/rules/:rule_id/views/remove`,
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
         * task
         */
        task: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=report&resource=task&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=report&resource=task&version=v1 document }
             *
             * 查询任务
             *
             * 查询任务。
             *
             * **注意**：;1. 请求参数 page_token 为必填字段，首次调用接口时必须传空值，表示从头开始遍历。;2. 当使用user access token访问时，表示获取当前用户发起以及收到的汇报，且结果不分页
             */
            query: async (
                payload?: {
                    data: {
                        commit_start_time: number;
                        commit_end_time: number;
                        rule_id?: string;
                        user_id?: string;
                        page_token: string;
                        page_size: number;
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
                                items?: Array<{
                                    task_id?: string;
                                    rule_name?: string;
                                    from_user_id?: string;
                                    from_user_name?: string;
                                    department_name?: string;
                                    commit_time?: number;
                                    form_contents?: Array<{
                                        field_id?: string;
                                        field_name?: string;
                                        field_value?: string;
                                    }>;
                                    rule_id?: string;
                                    department_ids?: Array<string>;
                                    to_user_ids?: Array<string>;
                                    to_user_names?: Array<string>;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/report/v1/tasks/query`,
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
             * rule
             */
            rule: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=report&resource=rule&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=report&resource=rule&version=v1 document }
                 *
                 * 查询规则
                 *
                 * 查询规则。
                 */
                query: async (
                    payload?: {
                        params: {
                            rule_name: string;
                            include_deleted?: number;
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
                                    rules?: Array<{
                                        rule_id?: string;
                                        name?: string;
                                        icon_name?: string;
                                        created_at?: number;
                                        creator_user_id?: string;
                                        creator_user_name?: string;
                                        owner_user_id?: string;
                                        owner_user_name?: string;
                                        form_schema?: Array<{
                                            name?: string;
                                            type?:
                                                | "text"
                                                | "number"
                                                | "dropdown"
                                                | "image"
                                                | "attachement"
                                                | "multiSelect"
                                                | "address"
                                                | "datetime";
                                        }>;
                                        is_deleted?: number;
                                        need_report_user_ids?: Array<string>;
                                        need_report_department_ids?: Array<string>;
                                        need_report_chat_ids?: Array<string>;
                                        cc_user_ids?: Array<string>;
                                        cc_department_ids?: Array<string>;
                                        to_user_ids?: Array<string>;
                                        to_chat_ids?: Array<string>;
                                        to_leaders?: Array<number>;
                                        to_department_owners?: Array<number>;
                                        manager_user_ids?: Array<string>;
                                        cc_chat_ids?: Array<string>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/report/v1/rules/query`,
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
             * rule.view
             */
            ruleView: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=report&resource=rule.view&apiName=remove&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove&project=report&resource=rule.view&version=v1 document }
                 *
                 * 移除规则看板
                 *
                 * 移除规则看板
                 */
                remove: async (
                    payload?: {
                        data?: { user_ids?: Array<string> };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { rule_id: string };
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
                                `${this.domain}/open-apis/report/v1/rules/:rule_id/views/remove`,
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
             * task
             */
            task: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=report&resource=task&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=report&resource=task&version=v1 document }
                 *
                 * 查询任务
                 *
                 * 查询任务。
                 *
                 * **注意**：;1. 请求参数 page_token 为必填字段，首次调用接口时必须传空值，表示从头开始遍历。;2. 当使用user access token访问时，表示获取当前用户发起以及收到的汇报，且结果不分页
                 */
                query: async (
                    payload?: {
                        data: {
                            commit_start_time: number;
                            commit_end_time: number;
                            rule_id?: string;
                            user_id?: string;
                            page_token: string;
                            page_size: number;
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
                                    items?: Array<{
                                        task_id?: string;
                                        rule_name?: string;
                                        from_user_id?: string;
                                        from_user_name?: string;
                                        department_name?: string;
                                        commit_time?: number;
                                        form_contents?: Array<{
                                            field_id?: string;
                                            field_name?: string;
                                            field_value?: string;
                                        }>;
                                        rule_id?: string;
                                        department_ids?: Array<string>;
                                        to_user_ids?: Array<string>;
                                        to_user_names?: Array<string>;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/report/v1/tasks/query`,
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
