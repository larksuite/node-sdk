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
import personal_settings from "./personal_settings";

// auto gen
export default abstract class Client extends personal_settings {
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
     * 汇报
     */
    report = {
        /**
         * 规则
         */
        rule: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=report&resource=rule&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/report/report-v1/rule/query document }
             *
             * 规则查询
             *
             * 规则查询
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
         * 规则看板
         */
        ruleView: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=report&resource=rule.view&apiName=remove&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/report/report-v1/rule-view/remove document }
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
         * 任务
         */
        task: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=report&resource=task&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/report/report-v1/task/query document }
             *
             * 任务查询
             *
             * 任务查询
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
             * 规则
             */
            rule: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=report&resource=rule&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/report/report-v1/rule/query document }
                 *
                 * 规则查询
                 *
                 * 规则查询
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
             * 规则看板
             */
            ruleView: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=report&resource=rule.view&apiName=remove&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/report/report-v1/rule-view/remove document }
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
             * 任务
             */
            task: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=report&resource=task&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/report/report-v1/task/query document }
                 *
                 * 任务查询
                 *
                 * 任务查询
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
