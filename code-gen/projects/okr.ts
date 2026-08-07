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
import myai from "./myai";

// auto gen
export default abstract class Client extends myai {
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
    okr = {
        /**
         * metric_source
         */
        metricSource: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=metric_source&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=metric_source&version=v1 document }
             *
             * 获取指标库
             *
             * 获取租户下全部 OKR 指标库（仅限 OKR 企业版使用）。
             */
            list: async (
                payload?: {
                    params?: { page_token?: string; page_size?: string };
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
                                total: number;
                                has_more: boolean;
                                page_token?: string;
                                items?: Array<{
                                    metric_source_id: string;
                                    metric_source_name: string;
                                    metric_name: string;
                                    metric_unit: {
                                        zh_cn: string;
                                        en_us: string;
                                        ja_jp: string;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/metric_sources`,
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
         * metric_source.table.item
         */
        metricSourceTableItem: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=metric_source.table.item&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=okr&resource=metric_source.table.item&version=v1 document }
             *
             * 更新指标项
             *
             * - 该接口用于更新某项指标，接口仅限 OKR 企业版使用。;; 更新成功后 OKR 系统会给以下人员发送消息通知：;; - 首次更新目标值的人员 ;; - 已经将指标添加为 KR、且本次目标值/起始值/支撑的上级有变更的人员，不包含仅更新了进度值的人员
             */
            patch: async (
                payload?: {
                    data?: {
                        metric_initial_value?: number;
                        metric_target_value?: number;
                        metric_current_value?: number;
                        supported_user_id?: string;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: {
                        metric_source_id: string;
                        metric_table_id: string;
                        metric_item_id: string;
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
                                metric_item_id: string;
                                user_id: string;
                                period_id: string;
                                metric_unit: {
                                    zh_cn: string;
                                    en_us: string;
                                    ja_jp: string;
                                };
                                metric_initial_value: number;
                                metric_target_value?: number;
                                metric_current_value: number;
                                supported_user_id?: string;
                                kr_id?: string;
                                updated_at: string;
                                updated_by?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/metric_sources/:metric_source_id/tables/:metric_table_id/items/:metric_item_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=metric_source.table.item&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=okr&resource=metric_source.table.item&version=v1 document }
             *
             * 获取指标项详情
             *
             * 获取某项指标的具体内容（仅限 OKR 企业版使用）。
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: {
                        metric_source_id: string;
                        metric_table_id: string;
                        metric_item_id: string;
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
                                metric_item_id: string;
                                user_id: string;
                                period_id: string;
                                metric_unit: {
                                    zh_cn: string;
                                    en_us: string;
                                    ja_jp: string;
                                };
                                metric_initial_value: number;
                                metric_target_value?: number;
                                metric_current_value: number;
                                supported_user_id?: string;
                                kr_id?: string;
                                updated_at: string;
                                updated_by?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/metric_sources/:metric_source_id/tables/:metric_table_id/items/:metric_item_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=metric_source.table.item&apiName=batch_update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=okr&resource=metric_source.table.item&version=v1 document }
             *
             * 批量更新指标项
             *
             * - 该接口用于批量更新多项指标，单次调用最多更新 100 条记录。接口仅限 OKR 企业版使用。;; 更新成功后 OKR 系统会给以下人员发送消息通知：;; - 首次更新目标值的人员 ;; - 已经将指标添加为 KR、且本次目标值/起始值/支撑的上级有变更的人员，不包含仅更新了进度值的人员
             */
            batchUpdate: async (
                payload?: {
                    data: {
                        items: Array<{
                            metric_item_id: string;
                            metric_initial_value?: number;
                            metric_target_value?: number;
                            metric_current_value?: number;
                            supported_user_id?: string;
                        }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { metric_source_id: string; metric_table_id: string };
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
                                    metric_item_id: string;
                                    user_id: string;
                                    period_id: string;
                                    metric_unit: {
                                        zh_cn: string;
                                        en_us: string;
                                        ja_jp: string;
                                    };
                                    metric_initial_value: number;
                                    metric_target_value?: number;
                                    metric_current_value: number;
                                    supported_user_id?: string;
                                    kr_id?: string;
                                    updated_at: string;
                                    updated_by?: string;
                                }>;
                                failed_items?: Array<{
                                    metric_item_id: string;
                                    reason: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/metric_sources/:metric_source_id/tables/:metric_table_id/items/batch_update`,
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
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=metric_source.table.item&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=metric_source.table.item&version=v1 document }
             *
             * 获取指标项
             *
             * 获取指定指标表下的所有指标项（仅限 OKR 企业版使用）。
             */
            list: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_token?: string;
                        page_size?: string;
                    };
                    path: { metric_source_id: string; metric_table_id: string };
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
                                total: number;
                                has_more: boolean;
                                page_token?: string;
                                items?: Array<{
                                    metric_item_id: string;
                                    user_id: string;
                                    period_id: string;
                                    metric_unit: {
                                        zh_cn: string;
                                        en_us: string;
                                        ja_jp: string;
                                    };
                                    metric_initial_value: number;
                                    metric_target_value?: number;
                                    metric_current_value: number;
                                    supported_user_id?: string;
                                    kr_id?: string;
                                    updated_at: string;
                                    updated_by?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/metric_sources/:metric_source_id/tables/:metric_table_id/items`,
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
         * metric_source.table
         */
        metricSourceTable: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=metric_source.table&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=metric_source.table&version=v1 document }
             *
             * 获取指标表
             *
             * 获取指定指标库下有哪些指标表（仅限 OKR 企业版使用）。
             */
            list: async (
                payload?: {
                    params?: { page_token?: string; page_size?: string };
                    path: { metric_source_id: string };
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
                                total: number;
                                has_more: boolean;
                                page_token?: string;
                                items?: Array<{
                                    metric_table_id: string;
                                    metric_table_name: string;
                                    period_id: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/metric_sources/:metric_source_id/tables`,
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
         * task
         */
        task: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=task&apiName=permissions&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=permissions&project=okr&resource=task&version=v1 document }
             *
             * 在任务管理多维表格中增加协作者权限
             *
             * 给指定的用户、群组、应用增加任务管理多维表格的协作者权限。
             */
            permissions: async (
                payload?: {
                    data: {
                        member_id: string;
                        member_type: string;
                        permission_type: string;
                    };
                    path: { task_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/tasks/:task_id/permissions`,
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
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=task&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=task&version=v1 document }
             *
             * 获取用户的任务管理多维表格的 id
             *
             * 获取指定用户在指定周期里的任务多维表格的 id。
             */
            list: async (
                payload?: {
                    params: {
                        period_ids: Array<string>;
                        user_id: string;
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
                                    app_token?: string;
                                    user_id?: string;
                                    okr_id?: string;
                                    period_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/tasks`,
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
         * review
         */
        review: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=review&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=okr&resource=review&version=v1 document }
             *
             * 查询复盘信息
             *
             * 根据周期和用户查询复盘信息。
             */
            query: async (
                payload?: {
                    params: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                        user_ids: Array<string>;
                        period_ids: Array<string>;
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
                                review_list?: Array<{
                                    user_id?: {
                                        open_id?: string;
                                        user_id?: string;
                                    };
                                    review_period_list?: Array<{
                                        period_id?: string;
                                        cycle_review_list?: Array<{
                                            url?: string;
                                            create_time?: string;
                                        }>;
                                        progress_report_list?: Array<{
                                            url?: string;
                                            create_time?: string;
                                        }>;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/reviews/query`,
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
         * period_rule
         */
        periodRule: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period_rule&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=period_rule&version=v1 document }
             *
             * 获取 OKR 周期规则
             *
             * 获取租户的周期规则列表。
             */
            list: async (payload?: {}, options?: IRequestOptions) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                period_rules?: Array<{
                                    period_rule_id?: string;
                                    type?: string;
                                    length?: number;
                                    first_month?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/period_rules`,
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
         * progress_record
         */
        progressRecord: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=okr&resource=progress_record&version=v1 document }
             *
             * 删除 OKR 进展记录
             *
             * 根据 ID 删除 OKR 进展记录。
             */
            delete: async (
                payload?: {
                    path: { progress_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/progress_records/:progress_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=okr&resource=progress_record&version=v1 document }
             *
             * 更新 OKR 进展记录
             *
             * 根据 OKR 进展记录 ID 更新进展详情。
             */
            update: async (
                payload?: {
                    data: {
                        content: {
                            blocks?: Array<{
                                type?: "paragraph" | "gallery";
                                paragraph?: {
                                    style?: {
                                        list?: {
                                            type?:
                                                | "number"
                                                | "bullet"
                                                | "checkBox"
                                                | "checkedBox"
                                                | "indent";
                                            indentLevel?: number;
                                            number?: number;
                                        };
                                    };
                                    elements?: Array<{
                                        type?:
                                            | "textRun"
                                            | "docsLink"
                                            | "person";
                                        textRun?: {
                                            text?: string;
                                            style?: {
                                                bold?: boolean;
                                                strikeThrough?: boolean;
                                                backColor?: {
                                                    red?: number;
                                                    green?: number;
                                                    blue?: number;
                                                    alpha?: number;
                                                };
                                                textColor?: {
                                                    red?: number;
                                                    green?: number;
                                                    blue?: number;
                                                    alpha?: number;
                                                };
                                                link?: { url?: string };
                                            };
                                        };
                                        docsLink?: {
                                            url?: string;
                                            title?: string;
                                        };
                                        person?: { openId?: string };
                                    }>;
                                };
                                gallery?: {
                                    imageList?: Array<{
                                        fileToken?: string;
                                        src?: string;
                                        width?: number;
                                        height?: number;
                                    }>;
                                };
                            }>;
                        };
                        progress_rate?: { percent?: number; status?: number };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { progress_id: string };
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
                                progress_id?: string;
                                modify_time?: string;
                                content?: {
                                    blocks?: Array<{
                                        type?: "paragraph" | "gallery";
                                        paragraph?: {
                                            style?: {
                                                list?: {
                                                    type?:
                                                        | "number"
                                                        | "bullet"
                                                        | "checkBox"
                                                        | "checkedBox"
                                                        | "indent";
                                                    indentLevel?: number;
                                                    number?: number;
                                                };
                                            };
                                            elements?: Array<{
                                                type?:
                                                    | "textRun"
                                                    | "docsLink"
                                                    | "person";
                                                textRun?: {
                                                    text?: string;
                                                    style?: {
                                                        bold?: boolean;
                                                        strikeThrough?: boolean;
                                                        backColor?: {
                                                            red?: number;
                                                            green?: number;
                                                            blue?: number;
                                                            alpha?: number;
                                                        };
                                                        textColor?: {
                                                            red?: number;
                                                            green?: number;
                                                            blue?: number;
                                                            alpha?: number;
                                                        };
                                                        link?: { url?: string };
                                                    };
                                                };
                                                docsLink?: {
                                                    url?: string;
                                                    title?: string;
                                                };
                                                person?: { openId?: string };
                                            }>;
                                        };
                                        gallery?: {
                                            imageList?: Array<{
                                                fileToken?: string;
                                                src?: string;
                                                width?: number;
                                                height?: number;
                                            }>;
                                        };
                                    }>;
                                };
                                progress_rate?: {
                                    percent?: number;
                                    status?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/progress_records/:progress_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=okr&resource=progress_record&version=v1 document }
             *
             * 获取 OKR 进展记录
             *
             * 根据 ID 获取 OKR 进展记录详情，接口返回进展记录的内容、更新时间以及进展百分比和状态。
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { progress_id?: string };
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
                                progress_id?: string;
                                modify_time?: string;
                                content?: {
                                    blocks?: Array<{
                                        type?: "paragraph" | "gallery";
                                        paragraph?: {
                                            style?: {
                                                list?: {
                                                    type?:
                                                        | "number"
                                                        | "bullet"
                                                        | "checkBox"
                                                        | "checkedBox"
                                                        | "indent";
                                                    indentLevel?: number;
                                                    number?: number;
                                                };
                                            };
                                            elements?: Array<{
                                                type?:
                                                    | "textRun"
                                                    | "docsLink"
                                                    | "person";
                                                textRun?: {
                                                    text?: string;
                                                    style?: {
                                                        bold?: boolean;
                                                        strikeThrough?: boolean;
                                                        backColor?: {
                                                            red?: number;
                                                            green?: number;
                                                            blue?: number;
                                                            alpha?: number;
                                                        };
                                                        textColor?: {
                                                            red?: number;
                                                            green?: number;
                                                            blue?: number;
                                                            alpha?: number;
                                                        };
                                                        link?: { url?: string };
                                                    };
                                                };
                                                docsLink?: {
                                                    url?: string;
                                                    title?: string;
                                                };
                                                person?: { openId?: string };
                                            }>;
                                        };
                                        gallery?: {
                                            imageList?: Array<{
                                                fileToken?: string;
                                                src?: string;
                                                width?: number;
                                                height?: number;
                                            }>;
                                        };
                                    }>;
                                };
                                progress_rate?: {
                                    percent?: number;
                                    status?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/progress_records/:progress_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=okr&resource=progress_record&version=v1 document }
             *
             * 创建 OKR 进展记录
             *
             * 创建 OKR 进展记录。
             */
            create: async (
                payload?: {
                    data: {
                        source_title: string;
                        source_url: string;
                        target_id: string;
                        target_type: number;
                        content: {
                            blocks?: Array<{
                                type?: "paragraph" | "gallery";
                                paragraph?: {
                                    style?: {
                                        list?: {
                                            type?:
                                                | "number"
                                                | "bullet"
                                                | "checkBox"
                                                | "checkedBox"
                                                | "indent";
                                            indentLevel?: number;
                                            number?: number;
                                        };
                                    };
                                    elements?: Array<{
                                        type?:
                                            | "textRun"
                                            | "docsLink"
                                            | "person";
                                        textRun?: {
                                            text?: string;
                                            style?: {
                                                bold?: boolean;
                                                strikeThrough?: boolean;
                                                backColor?: {
                                                    red?: number;
                                                    green?: number;
                                                    blue?: number;
                                                    alpha?: number;
                                                };
                                                textColor?: {
                                                    red?: number;
                                                    green?: number;
                                                    blue?: number;
                                                    alpha?: number;
                                                };
                                                link?: { url?: string };
                                            };
                                        };
                                        docsLink?: {
                                            url?: string;
                                            title?: string;
                                        };
                                        person?: { openId?: string };
                                    }>;
                                };
                                gallery?: {
                                    imageList?: Array<{
                                        fileToken?: string;
                                        src?: string;
                                        width?: number;
                                        height?: number;
                                    }>;
                                };
                            }>;
                        };
                        source_url_pc?: string;
                        source_url_mobile?: string;
                        progress_rate?: { percent?: number; status?: number };
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
                                progress_id?: string;
                                modify_time?: string;
                                content?: {
                                    blocks?: Array<{
                                        type?: "paragraph" | "gallery";
                                        paragraph?: {
                                            style?: {
                                                list?: {
                                                    type?:
                                                        | "number"
                                                        | "bullet"
                                                        | "checkBox"
                                                        | "checkedBox"
                                                        | "indent";
                                                    indentLevel?: number;
                                                    number?: number;
                                                };
                                            };
                                            elements?: Array<{
                                                type?:
                                                    | "textRun"
                                                    | "docsLink"
                                                    | "person";
                                                textRun?: {
                                                    text?: string;
                                                    style?: {
                                                        bold?: boolean;
                                                        strikeThrough?: boolean;
                                                        backColor?: {
                                                            red?: number;
                                                            green?: number;
                                                            blue?: number;
                                                            alpha?: number;
                                                        };
                                                        textColor?: {
                                                            red?: number;
                                                            green?: number;
                                                            blue?: number;
                                                            alpha?: number;
                                                        };
                                                        link?: { url?: string };
                                                    };
                                                };
                                                docsLink?: {
                                                    url?: string;
                                                    title?: string;
                                                };
                                                person?: { openId?: string };
                                            }>;
                                        };
                                        gallery?: {
                                            imageList?: Array<{
                                                fileToken?: string;
                                                src?: string;
                                                width?: number;
                                                height?: number;
                                            }>;
                                        };
                                    }>;
                                };
                                progress_rate?: {
                                    percent?: number;
                                    status?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/progress_records`,
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
         * period
         */
        period: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=period&version=v1 document }
             *
             * 获取 OKR 周期列表
             *
             * 获取 OKR 周期列表。
             *
             * 使用<md-tag mode="inline" type="token-tenant">tenant_access_token</md-tag>需要额外申请权限<md-perm ;href="https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN">以应用身份访问OKR信息</md-perm>
             */
            list: async (
                payload?: {
                    params?: { page_token?: string; page_size?: number };
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
                                page_token?: string;
                                has_more?: boolean;
                                items?: Array<{
                                    id?: string;
                                    zh_name?: string;
                                    en_name?: string;
                                    status?: number;
                                    period_start_time?: string;
                                    period_end_time?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/periods`,
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
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=okr&resource=period&version=v1 document }
             *
             * 创建 OKR 周期
             *
             * 根据周期规则创建一个 OKR 周期。
             */
            create: async (
                payload?: {
                    data: { period_rule_id: string; start_month: string };
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
                                period_id?: string;
                                start_month?: string;
                                end_month?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/periods`,
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
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=okr&resource=period&version=v1 document }
             *
             * 修改 OKR 周期状态
             *
             * 修改某个 OKR 周期的状态为「正常」、「失效」或「隐藏」，对租户所有人生效，请谨慎操作
             */
            patch: async (
                payload?: {
                    data: { status: number };
                    path: { period_id: string };
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
                            data?: { period_id?: string; status?: number };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/periods/:period_id`,
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
        },
        /**
         * okr
         */
        okr: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr&apiName=batch_get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=okr&resource=okr&version=v1 document }
             *
             * 批量获取 OKR
             *
             * 根据 OKR id 批量获取 OKR。
             *
             * 使用<md-tag mode="inline" type="token-tenant">tenant_access_token</md-tag>需要额外申请权限<md-perm ;href="https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN">以应用身份访问OKR信息</md-perm>
             */
            batchGet: async (
                payload?: {
                    params: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                        okr_ids: Array<string>;
                        lang?: string;
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
                                okr_list?: Array<{
                                    id?: string;
                                    permission?: number;
                                    period_id?: string;
                                    name?: string;
                                    objective_list?: Array<{
                                        id?: string;
                                        permission?: number;
                                        content?: string;
                                        progress_report?: string;
                                        score?: number;
                                        weight?: number;
                                        progress_rate?: {
                                            percent?: number;
                                            status?: string;
                                        };
                                        kr_list?: Array<{
                                            id?: string;
                                            content?: string;
                                            score?: number;
                                            weight?: number;
                                            kr_weight?: number;
                                            progress_rate?: {
                                                percent?: number;
                                                status?: string;
                                            };
                                            progress_record_list?: Array<{
                                                id?: string;
                                            }>;
                                            progress_rate_percent_last_updated_time?: string;
                                            progress_rate_status_last_updated_time?: string;
                                            progress_record_last_updated_time?: string;
                                            progress_report_last_updated_time?: string;
                                            score_last_updated_time?: string;
                                            deadline?: string;
                                            mentioned_user_list?: Array<{
                                                open_id?: string;
                                                user_id?: string;
                                            }>;
                                        }>;
                                        aligned_objective_list?: Array<{
                                            id?: string;
                                            okr_id?: string;
                                            owner?: {
                                                open_id?: string;
                                                user_id?: string;
                                            };
                                        }>;
                                        aligning_objective_list?: Array<{
                                            id?: string;
                                            okr_id?: string;
                                            owner?: {
                                                open_id?: string;
                                                user_id?: string;
                                            };
                                        }>;
                                        progress_record_list?: Array<{
                                            id?: string;
                                        }>;
                                        progress_rate_percent_last_updated_time?: string;
                                        progress_rate_status_last_updated_time?: string;
                                        progress_record_last_updated_time?: string;
                                        progress_report_last_updated_time?: string;
                                        score_last_updated_time?: string;
                                        deadline?: string;
                                        mentioned_user_list?: Array<{
                                            open_id?: string;
                                            user_id?: string;
                                        }>;
                                    }>;
                                    confirm_status?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/okrs/batch_get`,
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
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr&apiName=import&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=import&project=okr&resource=okr&version=v1 document }
             */
            import: async (
                payload?: {
                    data: {
                        period_id: string;
                        objective_list?: Array<{
                            content: string;
                            mention_list?: Array<string>;
                            kr_list?: Array<{
                                content: string;
                                mention_list?: Array<string>;
                                score?: number;
                                progress_rate?: {
                                    percent?: number;
                                    status?: number;
                                };
                                progress_list?: Array<{
                                    content?: string;
                                    timestamp?: string;
                                    mention_list?: Array<string>;
                                }>;
                                weight?: number;
                            }>;
                            progress_rate?: {
                                percent?: number;
                                status?: number;
                            };
                            progress_list?: Array<{
                                content?: string;
                                timestamp?: string;
                                mention_list?: Array<string>;
                            }>;
                            weight?: number;
                        }>;
                    };
                    params?: {
                        user_id?: string;
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        { code?: number; msg?: string; data?: { id?: string } }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/okrs/import`,
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
         * okr.objective.alignment
         */
        okrObjectiveAlignment: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective.alignment&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=okr&resource=okr.objective.alignment&version=v1 document }
             */
            create: async (
                payload?: {
                    data: { to_id: string; to_type: number };
                    path: { okr_id: string; objective_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        { code?: number; msg?: string; data?: { id?: string } }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/okrs/:okr_id/objectives/:objective_id/alignments`,
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
         * user.okr
         */
        userOkr: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=user.okr&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=user.okr&version=v1 document }
             *
             * 获取用户的 OKR 列表
             *
             * 根据用户的 id 获取 OKR 列表。
             *
             * 使用<md-tag mode="inline" type="token-tenant">tenant_access_token</md-tag>需要额外申请权限<md-perm ;href="https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN">以应用身份访问OKR信息</md-perm>
             */
            list: async (
                payload?: {
                    params: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                        offset: string;
                        limit: string;
                        lang?: string;
                        period_ids?: Array<string>;
                    };
                    path?: { user_id?: string };
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
                                total?: number;
                                okr_list?: Array<{
                                    id?: string;
                                    permission?: number;
                                    period_id?: string;
                                    name?: string;
                                    objective_list?: Array<{
                                        id?: string;
                                        permission?: number;
                                        content?: string;
                                        progress_report?: string;
                                        score?: number;
                                        weight?: number;
                                        progress_rate?: {
                                            percent?: number;
                                            status?: string;
                                        };
                                        kr_list?: Array<{
                                            id?: string;
                                            content?: string;
                                            score?: number;
                                            weight?: number;
                                            kr_weight?: number;
                                            progress_rate?: {
                                                percent?: number;
                                                status?: string;
                                            };
                                            progress_record_list?: Array<{
                                                id?: string;
                                            }>;
                                            progress_rate_percent_last_updated_time?: string;
                                            progress_rate_status_last_updated_time?: string;
                                            progress_record_last_updated_time?: string;
                                            progress_report_last_updated_time?: string;
                                            score_last_updated_time?: string;
                                            deadline?: string;
                                            mentioned_user_list?: Array<{
                                                open_id?: string;
                                                user_id?: string;
                                            }>;
                                        }>;
                                        aligned_objective_list?: Array<{
                                            id?: string;
                                            okr_id?: string;
                                            owner?: {
                                                open_id?: string;
                                                user_id?: string;
                                            };
                                        }>;
                                        aligning_objective_list?: Array<{
                                            id?: string;
                                            okr_id?: string;
                                            owner?: {
                                                open_id?: string;
                                                user_id?: string;
                                            };
                                        }>;
                                        progress_record_list?: Array<{
                                            id?: string;
                                        }>;
                                        progress_rate_percent_last_updated_time?: string;
                                        progress_rate_status_last_updated_time?: string;
                                        progress_record_last_updated_time?: string;
                                        progress_report_last_updated_time?: string;
                                        score_last_updated_time?: string;
                                        deadline?: string;
                                        mentioned_user_list?: Array<{
                                            open_id?: string;
                                            user_id?: string;
                                        }>;
                                    }>;
                                    confirm_status?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/users/:user_id/okrs`,
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
         * image
         */
        image: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=okr&resource=image&apiName=upload&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=okr&resource=image&version=v1 document }
             *
             * 上传进展记录图片
             *
             * 上传图片，以获取在进展记录富文本中使用的 token。成功调用该接口后，你可继续调用[创建 OKR 进展记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/create)或[更新 OKR 进展记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/update)，将返回的 `url`参数和`file_token` 参数传入 `imageList` 参数中。
             */
            upload: async (
                payload?: {
                    data: {
                        data: Buffer | fs.ReadStream;
                        target_id: string;
                        target_type: number;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { file_token?: string; url?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/okr/v1/images/upload`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers: {
                            ...headers,
                            "Content-Type": "multipart/form-data",
                        },
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                return res?.data || null;
            },
        },
        v1: {
            /**
             * metric_source
             */
            metricSource: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=metric_source&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=metric_source&version=v1 document }
                 *
                 * 获取指标库
                 *
                 * 获取租户下全部 OKR 指标库（仅限 OKR 企业版使用）。
                 */
                list: async (
                    payload?: {
                        params?: { page_token?: string; page_size?: string };
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
                                    total: number;
                                    has_more: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        metric_source_id: string;
                                        metric_source_name: string;
                                        metric_name: string;
                                        metric_unit: {
                                            zh_cn: string;
                                            en_us: string;
                                            ja_jp: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/metric_sources`,
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
             * metric_source.table.item
             */
            metricSourceTableItem: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=metric_source.table.item&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=okr&resource=metric_source.table.item&version=v1 document }
                 *
                 * 更新指标项
                 *
                 * - 该接口用于更新某项指标，接口仅限 OKR 企业版使用。;; 更新成功后 OKR 系统会给以下人员发送消息通知：;; - 首次更新目标值的人员 ;; - 已经将指标添加为 KR、且本次目标值/起始值/支撑的上级有变更的人员，不包含仅更新了进度值的人员
                 */
                patch: async (
                    payload?: {
                        data?: {
                            metric_initial_value?: number;
                            metric_target_value?: number;
                            metric_current_value?: number;
                            supported_user_id?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            metric_source_id: string;
                            metric_table_id: string;
                            metric_item_id: string;
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
                                    metric_item_id: string;
                                    user_id: string;
                                    period_id: string;
                                    metric_unit: {
                                        zh_cn: string;
                                        en_us: string;
                                        ja_jp: string;
                                    };
                                    metric_initial_value: number;
                                    metric_target_value?: number;
                                    metric_current_value: number;
                                    supported_user_id?: string;
                                    kr_id?: string;
                                    updated_at: string;
                                    updated_by?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/metric_sources/:metric_source_id/tables/:metric_table_id/items/:metric_item_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=metric_source.table.item&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=okr&resource=metric_source.table.item&version=v1 document }
                 *
                 * 获取指标项详情
                 *
                 * 获取某项指标的具体内容（仅限 OKR 企业版使用）。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            metric_source_id: string;
                            metric_table_id: string;
                            metric_item_id: string;
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
                                    metric_item_id: string;
                                    user_id: string;
                                    period_id: string;
                                    metric_unit: {
                                        zh_cn: string;
                                        en_us: string;
                                        ja_jp: string;
                                    };
                                    metric_initial_value: number;
                                    metric_target_value?: number;
                                    metric_current_value: number;
                                    supported_user_id?: string;
                                    kr_id?: string;
                                    updated_at: string;
                                    updated_by?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/metric_sources/:metric_source_id/tables/:metric_table_id/items/:metric_item_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=metric_source.table.item&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=okr&resource=metric_source.table.item&version=v1 document }
                 *
                 * 批量更新指标项
                 *
                 * - 该接口用于批量更新多项指标，单次调用最多更新 100 条记录。接口仅限 OKR 企业版使用。;; 更新成功后 OKR 系统会给以下人员发送消息通知：;; - 首次更新目标值的人员 ;; - 已经将指标添加为 KR、且本次目标值/起始值/支撑的上级有变更的人员，不包含仅更新了进度值的人员
                 */
                batchUpdate: async (
                    payload?: {
                        data: {
                            items: Array<{
                                metric_item_id: string;
                                metric_initial_value?: number;
                                metric_target_value?: number;
                                metric_current_value?: number;
                                supported_user_id?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            metric_source_id: string;
                            metric_table_id: string;
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
                                        metric_item_id: string;
                                        user_id: string;
                                        period_id: string;
                                        metric_unit: {
                                            zh_cn: string;
                                            en_us: string;
                                            ja_jp: string;
                                        };
                                        metric_initial_value: number;
                                        metric_target_value?: number;
                                        metric_current_value: number;
                                        supported_user_id?: string;
                                        kr_id?: string;
                                        updated_at: string;
                                        updated_by?: string;
                                    }>;
                                    failed_items?: Array<{
                                        metric_item_id: string;
                                        reason: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/metric_sources/:metric_source_id/tables/:metric_table_id/items/batch_update`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=metric_source.table.item&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=metric_source.table.item&version=v1 document }
                 *
                 * 获取指标项
                 *
                 * 获取指定指标表下的所有指标项（仅限 OKR 企业版使用）。
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: string;
                        };
                        path: {
                            metric_source_id: string;
                            metric_table_id: string;
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
                                    total: number;
                                    has_more: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        metric_item_id: string;
                                        user_id: string;
                                        period_id: string;
                                        metric_unit: {
                                            zh_cn: string;
                                            en_us: string;
                                            ja_jp: string;
                                        };
                                        metric_initial_value: number;
                                        metric_target_value?: number;
                                        metric_current_value: number;
                                        supported_user_id?: string;
                                        kr_id?: string;
                                        updated_at: string;
                                        updated_by?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/metric_sources/:metric_source_id/tables/:metric_table_id/items`,
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
             * metric_source.table
             */
            metricSourceTable: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=metric_source.table&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=metric_source.table&version=v1 document }
                 *
                 * 获取指标表
                 *
                 * 获取指定指标库下有哪些指标表（仅限 OKR 企业版使用）。
                 */
                list: async (
                    payload?: {
                        params?: { page_token?: string; page_size?: string };
                        path: { metric_source_id: string };
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
                                    total: number;
                                    has_more: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        metric_table_id: string;
                                        metric_table_name: string;
                                        period_id: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/metric_sources/:metric_source_id/tables`,
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
             * task
             */
            task: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=task&apiName=permissions&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=permissions&project=okr&resource=task&version=v1 document }
                 *
                 * 在任务管理多维表格中增加协作者权限
                 *
                 * 给指定的用户、群组、应用增加任务管理多维表格的协作者权限。
                 */
                permissions: async (
                    payload?: {
                        data: {
                            member_id: string;
                            member_type: string;
                            permission_type: string;
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
                                `${this.domain}/open-apis/okr/v1/tasks/:task_id/permissions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=task&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=task&version=v1 document }
                 *
                 * 获取用户的任务管理多维表格的 id
                 *
                 * 获取指定用户在指定周期里的任务多维表格的 id。
                 */
                list: async (
                    payload?: {
                        params: {
                            period_ids: Array<string>;
                            user_id: string;
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
                                        app_token?: string;
                                        user_id?: string;
                                        okr_id?: string;
                                        period_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/tasks`,
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
             * review
             */
            review: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=review&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=okr&resource=review&version=v1 document }
                 *
                 * 查询复盘信息
                 *
                 * 根据周期和用户查询复盘信息。
                 */
                query: async (
                    payload?: {
                        params: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            user_ids: Array<string>;
                            period_ids: Array<string>;
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
                                    review_list?: Array<{
                                        user_id?: {
                                            open_id?: string;
                                            user_id?: string;
                                        };
                                        review_period_list?: Array<{
                                            period_id?: string;
                                            cycle_review_list?: Array<{
                                                url?: string;
                                                create_time?: string;
                                            }>;
                                            progress_report_list?: Array<{
                                                url?: string;
                                                create_time?: string;
                                            }>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/reviews/query`,
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
             * period_rule
             */
            periodRule: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period_rule&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=period_rule&version=v1 document }
                 *
                 * 获取 OKR 周期规则
                 *
                 * 获取租户的周期规则列表。
                 */
                list: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    period_rules?: Array<{
                                        period_rule_id?: string;
                                        type?: string;
                                        length?: number;
                                        first_month?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/period_rules`,
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
             * progress_record
             */
            progressRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=okr&resource=progress_record&version=v1 document }
                 *
                 * 删除 OKR 进展记录
                 *
                 * 根据 ID 删除 OKR 进展记录。
                 */
                delete: async (
                    payload?: {
                        path: { progress_id: string };
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
                                `${this.domain}/open-apis/okr/v1/progress_records/:progress_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=okr&resource=progress_record&version=v1 document }
                 *
                 * 更新 OKR 进展记录
                 *
                 * 根据 OKR 进展记录 ID 更新进展详情。
                 */
                update: async (
                    payload?: {
                        data: {
                            content: {
                                blocks?: Array<{
                                    type?: "paragraph" | "gallery";
                                    paragraph?: {
                                        style?: {
                                            list?: {
                                                type?:
                                                    | "number"
                                                    | "bullet"
                                                    | "checkBox"
                                                    | "checkedBox"
                                                    | "indent";
                                                indentLevel?: number;
                                                number?: number;
                                            };
                                        };
                                        elements?: Array<{
                                            type?:
                                                | "textRun"
                                                | "docsLink"
                                                | "person";
                                            textRun?: {
                                                text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    strikeThrough?: boolean;
                                                    backColor?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    textColor?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    link?: { url?: string };
                                                };
                                            };
                                            docsLink?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            person?: { openId?: string };
                                        }>;
                                    };
                                    gallery?: {
                                        imageList?: Array<{
                                            fileToken?: string;
                                            src?: string;
                                            width?: number;
                                            height?: number;
                                        }>;
                                    };
                                }>;
                            };
                            progress_rate?: {
                                percent?: number;
                                status?: number;
                            };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { progress_id: string };
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
                                    progress_id?: string;
                                    modify_time?: string;
                                    content?: {
                                        blocks?: Array<{
                                            type?: "paragraph" | "gallery";
                                            paragraph?: {
                                                style?: {
                                                    list?: {
                                                        type?:
                                                            | "number"
                                                            | "bullet"
                                                            | "checkBox"
                                                            | "checkedBox"
                                                            | "indent";
                                                        indentLevel?: number;
                                                        number?: number;
                                                    };
                                                };
                                                elements?: Array<{
                                                    type?:
                                                        | "textRun"
                                                        | "docsLink"
                                                        | "person";
                                                    textRun?: {
                                                        text?: string;
                                                        style?: {
                                                            bold?: boolean;
                                                            strikeThrough?: boolean;
                                                            backColor?: {
                                                                red?: number;
                                                                green?: number;
                                                                blue?: number;
                                                                alpha?: number;
                                                            };
                                                            textColor?: {
                                                                red?: number;
                                                                green?: number;
                                                                blue?: number;
                                                                alpha?: number;
                                                            };
                                                            link?: {
                                                                url?: string;
                                                            };
                                                        };
                                                    };
                                                    docsLink?: {
                                                        url?: string;
                                                        title?: string;
                                                    };
                                                    person?: {
                                                        openId?: string;
                                                    };
                                                }>;
                                            };
                                            gallery?: {
                                                imageList?: Array<{
                                                    fileToken?: string;
                                                    src?: string;
                                                    width?: number;
                                                    height?: number;
                                                }>;
                                            };
                                        }>;
                                    };
                                    progress_rate?: {
                                        percent?: number;
                                        status?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/progress_records/:progress_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=okr&resource=progress_record&version=v1 document }
                 *
                 * 获取 OKR 进展记录
                 *
                 * 根据 ID 获取 OKR 进展记录详情，接口返回进展记录的内容、更新时间以及进展百分比和状态。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { progress_id?: string };
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
                                    progress_id?: string;
                                    modify_time?: string;
                                    content?: {
                                        blocks?: Array<{
                                            type?: "paragraph" | "gallery";
                                            paragraph?: {
                                                style?: {
                                                    list?: {
                                                        type?:
                                                            | "number"
                                                            | "bullet"
                                                            | "checkBox"
                                                            | "checkedBox"
                                                            | "indent";
                                                        indentLevel?: number;
                                                        number?: number;
                                                    };
                                                };
                                                elements?: Array<{
                                                    type?:
                                                        | "textRun"
                                                        | "docsLink"
                                                        | "person";
                                                    textRun?: {
                                                        text?: string;
                                                        style?: {
                                                            bold?: boolean;
                                                            strikeThrough?: boolean;
                                                            backColor?: {
                                                                red?: number;
                                                                green?: number;
                                                                blue?: number;
                                                                alpha?: number;
                                                            };
                                                            textColor?: {
                                                                red?: number;
                                                                green?: number;
                                                                blue?: number;
                                                                alpha?: number;
                                                            };
                                                            link?: {
                                                                url?: string;
                                                            };
                                                        };
                                                    };
                                                    docsLink?: {
                                                        url?: string;
                                                        title?: string;
                                                    };
                                                    person?: {
                                                        openId?: string;
                                                    };
                                                }>;
                                            };
                                            gallery?: {
                                                imageList?: Array<{
                                                    fileToken?: string;
                                                    src?: string;
                                                    width?: number;
                                                    height?: number;
                                                }>;
                                            };
                                        }>;
                                    };
                                    progress_rate?: {
                                        percent?: number;
                                        status?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/progress_records/:progress_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=progress_record&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=okr&resource=progress_record&version=v1 document }
                 *
                 * 创建 OKR 进展记录
                 *
                 * 创建 OKR 进展记录。
                 */
                create: async (
                    payload?: {
                        data: {
                            source_title: string;
                            source_url: string;
                            target_id: string;
                            target_type: number;
                            content: {
                                blocks?: Array<{
                                    type?: "paragraph" | "gallery";
                                    paragraph?: {
                                        style?: {
                                            list?: {
                                                type?:
                                                    | "number"
                                                    | "bullet"
                                                    | "checkBox"
                                                    | "checkedBox"
                                                    | "indent";
                                                indentLevel?: number;
                                                number?: number;
                                            };
                                        };
                                        elements?: Array<{
                                            type?:
                                                | "textRun"
                                                | "docsLink"
                                                | "person";
                                            textRun?: {
                                                text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    strikeThrough?: boolean;
                                                    backColor?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    textColor?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    link?: { url?: string };
                                                };
                                            };
                                            docsLink?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            person?: { openId?: string };
                                        }>;
                                    };
                                    gallery?: {
                                        imageList?: Array<{
                                            fileToken?: string;
                                            src?: string;
                                            width?: number;
                                            height?: number;
                                        }>;
                                    };
                                }>;
                            };
                            source_url_pc?: string;
                            source_url_mobile?: string;
                            progress_rate?: {
                                percent?: number;
                                status?: number;
                            };
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
                                    progress_id?: string;
                                    modify_time?: string;
                                    content?: {
                                        blocks?: Array<{
                                            type?: "paragraph" | "gallery";
                                            paragraph?: {
                                                style?: {
                                                    list?: {
                                                        type?:
                                                            | "number"
                                                            | "bullet"
                                                            | "checkBox"
                                                            | "checkedBox"
                                                            | "indent";
                                                        indentLevel?: number;
                                                        number?: number;
                                                    };
                                                };
                                                elements?: Array<{
                                                    type?:
                                                        | "textRun"
                                                        | "docsLink"
                                                        | "person";
                                                    textRun?: {
                                                        text?: string;
                                                        style?: {
                                                            bold?: boolean;
                                                            strikeThrough?: boolean;
                                                            backColor?: {
                                                                red?: number;
                                                                green?: number;
                                                                blue?: number;
                                                                alpha?: number;
                                                            };
                                                            textColor?: {
                                                                red?: number;
                                                                green?: number;
                                                                blue?: number;
                                                                alpha?: number;
                                                            };
                                                            link?: {
                                                                url?: string;
                                                            };
                                                        };
                                                    };
                                                    docsLink?: {
                                                        url?: string;
                                                        title?: string;
                                                    };
                                                    person?: {
                                                        openId?: string;
                                                    };
                                                }>;
                                            };
                                            gallery?: {
                                                imageList?: Array<{
                                                    fileToken?: string;
                                                    src?: string;
                                                    width?: number;
                                                    height?: number;
                                                }>;
                                            };
                                        }>;
                                    };
                                    progress_rate?: {
                                        percent?: number;
                                        status?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/progress_records`,
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
             * period
             */
            period: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=period&version=v1 document }
                 *
                 * 获取 OKR 周期列表
                 *
                 * 获取 OKR 周期列表。
                 *
                 * 使用<md-tag mode="inline" type="token-tenant">tenant_access_token</md-tag>需要额外申请权限<md-perm ;href="https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN">以应用身份访问OKR信息</md-perm>
                 */
                list: async (
                    payload?: {
                        params?: { page_token?: string; page_size?: number };
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
                                    page_token?: string;
                                    has_more?: boolean;
                                    items?: Array<{
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        status?: number;
                                        period_start_time?: string;
                                        period_end_time?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/periods`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=okr&resource=period&version=v1 document }
                 *
                 * 创建 OKR 周期
                 *
                 * 根据周期规则创建一个 OKR 周期。
                 */
                create: async (
                    payload?: {
                        data: { period_rule_id: string; start_month: string };
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
                                    period_id?: string;
                                    start_month?: string;
                                    end_month?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/periods`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=period&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=okr&resource=period&version=v1 document }
                 *
                 * 修改 OKR 周期状态
                 *
                 * 修改某个 OKR 周期的状态为「正常」、「失效」或「隐藏」，对租户所有人生效，请谨慎操作
                 */
                patch: async (
                    payload?: {
                        data: { status: number };
                        path: { period_id: string };
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
                                data?: { period_id?: string; status?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/periods/:period_id`,
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
            },
            /**
             * okr
             */
            okr: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr&apiName=batch_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=okr&resource=okr&version=v1 document }
                 *
                 * 批量获取 OKR
                 *
                 * 根据 OKR id 批量获取 OKR。
                 *
                 * 使用<md-tag mode="inline" type="token-tenant">tenant_access_token</md-tag>需要额外申请权限<md-perm ;href="https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN">以应用身份访问OKR信息</md-perm>
                 */
                batchGet: async (
                    payload?: {
                        params: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            okr_ids: Array<string>;
                            lang?: string;
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
                                    okr_list?: Array<{
                                        id?: string;
                                        permission?: number;
                                        period_id?: string;
                                        name?: string;
                                        objective_list?: Array<{
                                            id?: string;
                                            permission?: number;
                                            content?: string;
                                            progress_report?: string;
                                            score?: number;
                                            weight?: number;
                                            progress_rate?: {
                                                percent?: number;
                                                status?: string;
                                            };
                                            kr_list?: Array<{
                                                id?: string;
                                                content?: string;
                                                score?: number;
                                                weight?: number;
                                                kr_weight?: number;
                                                progress_rate?: {
                                                    percent?: number;
                                                    status?: string;
                                                };
                                                progress_record_list?: Array<{
                                                    id?: string;
                                                }>;
                                                progress_rate_percent_last_updated_time?: string;
                                                progress_rate_status_last_updated_time?: string;
                                                progress_record_last_updated_time?: string;
                                                progress_report_last_updated_time?: string;
                                                score_last_updated_time?: string;
                                                deadline?: string;
                                                mentioned_user_list?: Array<{
                                                    open_id?: string;
                                                    user_id?: string;
                                                }>;
                                            }>;
                                            aligned_objective_list?: Array<{
                                                id?: string;
                                                okr_id?: string;
                                                owner?: {
                                                    open_id?: string;
                                                    user_id?: string;
                                                };
                                            }>;
                                            aligning_objective_list?: Array<{
                                                id?: string;
                                                okr_id?: string;
                                                owner?: {
                                                    open_id?: string;
                                                    user_id?: string;
                                                };
                                            }>;
                                            progress_record_list?: Array<{
                                                id?: string;
                                            }>;
                                            progress_rate_percent_last_updated_time?: string;
                                            progress_rate_status_last_updated_time?: string;
                                            progress_record_last_updated_time?: string;
                                            progress_report_last_updated_time?: string;
                                            score_last_updated_time?: string;
                                            deadline?: string;
                                            mentioned_user_list?: Array<{
                                                open_id?: string;
                                                user_id?: string;
                                            }>;
                                        }>;
                                        confirm_status?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/okrs/batch_get`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr&apiName=import&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=import&project=okr&resource=okr&version=v1 document }
                 */
                import: async (
                    payload?: {
                        data: {
                            period_id: string;
                            objective_list?: Array<{
                                content: string;
                                mention_list?: Array<string>;
                                kr_list?: Array<{
                                    content: string;
                                    mention_list?: Array<string>;
                                    score?: number;
                                    progress_rate?: {
                                        percent?: number;
                                        status?: number;
                                    };
                                    progress_list?: Array<{
                                        content?: string;
                                        timestamp?: string;
                                        mention_list?: Array<string>;
                                    }>;
                                    weight?: number;
                                }>;
                                progress_rate?: {
                                    percent?: number;
                                    status?: number;
                                };
                                progress_list?: Array<{
                                    content?: string;
                                    timestamp?: string;
                                    mention_list?: Array<string>;
                                }>;
                                weight?: number;
                            }>;
                        };
                        params?: {
                            user_id?: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                data?: { id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/okrs/import`,
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
             * okr.objective.alignment
             */
            okrObjectiveAlignment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective.alignment&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=okr&resource=okr.objective.alignment&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data: { to_id: string; to_type: number };
                        path: { okr_id: string; objective_id: string };
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
                                `${this.domain}/open-apis/okr/v1/okrs/:okr_id/objectives/:objective_id/alignments`,
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
             * user.okr
             */
            userOkr: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=user.okr&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=user.okr&version=v1 document }
                 *
                 * 获取用户的 OKR 列表
                 *
                 * 根据用户的 id 获取 OKR 列表。
                 *
                 * 使用<md-tag mode="inline" type="token-tenant">tenant_access_token</md-tag>需要额外申请权限<md-perm ;href="https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN">以应用身份访问OKR信息</md-perm>
                 */
                list: async (
                    payload?: {
                        params: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            offset: string;
                            limit: string;
                            lang?: string;
                            period_ids?: Array<string>;
                        };
                        path?: { user_id?: string };
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
                                    total?: number;
                                    okr_list?: Array<{
                                        id?: string;
                                        permission?: number;
                                        period_id?: string;
                                        name?: string;
                                        objective_list?: Array<{
                                            id?: string;
                                            permission?: number;
                                            content?: string;
                                            progress_report?: string;
                                            score?: number;
                                            weight?: number;
                                            progress_rate?: {
                                                percent?: number;
                                                status?: string;
                                            };
                                            kr_list?: Array<{
                                                id?: string;
                                                content?: string;
                                                score?: number;
                                                weight?: number;
                                                kr_weight?: number;
                                                progress_rate?: {
                                                    percent?: number;
                                                    status?: string;
                                                };
                                                progress_record_list?: Array<{
                                                    id?: string;
                                                }>;
                                                progress_rate_percent_last_updated_time?: string;
                                                progress_rate_status_last_updated_time?: string;
                                                progress_record_last_updated_time?: string;
                                                progress_report_last_updated_time?: string;
                                                score_last_updated_time?: string;
                                                deadline?: string;
                                                mentioned_user_list?: Array<{
                                                    open_id?: string;
                                                    user_id?: string;
                                                }>;
                                            }>;
                                            aligned_objective_list?: Array<{
                                                id?: string;
                                                okr_id?: string;
                                                owner?: {
                                                    open_id?: string;
                                                    user_id?: string;
                                                };
                                            }>;
                                            aligning_objective_list?: Array<{
                                                id?: string;
                                                okr_id?: string;
                                                owner?: {
                                                    open_id?: string;
                                                    user_id?: string;
                                                };
                                            }>;
                                            progress_record_list?: Array<{
                                                id?: string;
                                            }>;
                                            progress_rate_percent_last_updated_time?: string;
                                            progress_rate_status_last_updated_time?: string;
                                            progress_record_last_updated_time?: string;
                                            progress_report_last_updated_time?: string;
                                            score_last_updated_time?: string;
                                            deadline?: string;
                                            mentioned_user_list?: Array<{
                                                open_id?: string;
                                                user_id?: string;
                                            }>;
                                        }>;
                                        confirm_status?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/users/:user_id/okrs`,
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
             * image
             */
            image: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=image&apiName=upload&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=okr&resource=image&version=v1 document }
                 *
                 * 上传进展记录图片
                 *
                 * 上传图片，以获取在进展记录富文本中使用的 token。成功调用该接口后，你可继续调用[创建 OKR 进展记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/create)或[更新 OKR 进展记录](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/okr-v1/progress_record/update)，将返回的 `url`参数和`file_token` 参数传入 `imageList` 参数中。
                 */
                upload: async (
                    payload?: {
                        data: {
                            data: Buffer | fs.ReadStream;
                            target_id: string;
                            target_type: number;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { file_token?: string; url?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v1/images/upload`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
        },
        v2: {
            /**
             * okr.alignment
             */
            okrAlignment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.alignment&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=okr&resource=okr.alignment&version=v2 document }
                 *
                 * 删除 OKR 对齐关系
                 *
                 * 删除两个目标之间现有的 OKR 对齐关系。移除对齐连接的同时保留目标本身。
                 */
                delete: async (
                    payload?: {
                        path: { alignment_id: string };
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
                                data?: { alignment_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/alignments/:alignment_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.alignment&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=okr&resource=okr.alignment&version=v2 document }
                 *
                 * 获取 OKR 对齐信息
                 *
                 * 获取特定 OKR 对齐的详细信息，包括对齐关系中涉及的两个实体、它们的所有者以及创建/更新时间戳。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { alignment_id: string };
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
                                    alignment?: {
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        from_owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        to_owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        from_entity_type: number;
                                        from_entity_id: string;
                                        to_entity_type: number;
                                        to_entity_id: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/alignments/:alignment_id`,
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
             * okr.objective
             */
            okrObjective: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=okr&resource=okr.objective&version=v2 document }
                 *
                 * 删除 OKR 目标
                 *
                 * 从 OKR 周期中删除已存在的目标，将目标及其关联的关键结果从 OKR 结构中移除。
                 */
                delete: async (
                    payload?: {
                        path: { objective_id: string };
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
                                data?: { objective_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective&apiName=key_results_position&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=key_results_position&project=okr&resource=okr.objective&version=v2 document }
                 *
                 * 修改关键结果位置
                 *
                 * 通过提供按顺序排列的关键结果 ID 列表，对指定目标下的关键结果进行重新排序，并相应更新其序号。
                 */
                keyResultsPosition: async (
                    payload?: {
                        data: { key_result_ids: Array<string> };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
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
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        objective_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        weight?: number;
                                        deadline?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id/key_results_position`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=okr&resource=okr.objective&version=v2 document }
                 *
                 * 编辑 OKR 目标
                 *
                 * 更新 OKR 周期中已存在目标的内容、分数、备注、截止时间和分类，支持对指定字段进行部分更新。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            content?: {
                                blocks?: Array<{
                                    block_element_type?:
                                        | "paragraph"
                                        | "gallery";
                                    paragraph?: {
                                        style?: {
                                            list?: {
                                                list_type?:
                                                    | "number"
                                                    | "bullet"
                                                    | "checkBox"
                                                    | "checkedBox"
                                                    | "indent";
                                                indent_level?: number;
                                                number?: number;
                                            };
                                        };
                                        elements?: Array<{
                                            paragraph_element_type?:
                                                | "textRun"
                                                | "docsLink"
                                                | "mention";
                                            text_run?: {
                                                text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    strike_through?: boolean;
                                                    back_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    text_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    link?: { url?: string };
                                                };
                                            };
                                            docs_link?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            mention?: { user_id?: string };
                                        }>;
                                    };
                                    gallery?: {
                                        images?: Array<{
                                            file_token?: string;
                                            src?: string;
                                            width?: number;
                                            height?: number;
                                        }>;
                                    };
                                }>;
                            };
                            score?: number;
                            notes?: {
                                blocks?: Array<{
                                    block_element_type?:
                                        | "paragraph"
                                        | "gallery";
                                    paragraph?: {
                                        style?: {
                                            list?: {
                                                list_type?:
                                                    | "number"
                                                    | "bullet"
                                                    | "checkBox"
                                                    | "checkedBox"
                                                    | "indent";
                                                indent_level?: number;
                                                number?: number;
                                            };
                                        };
                                        elements?: Array<{
                                            paragraph_element_type?:
                                                | "textRun"
                                                | "docsLink"
                                                | "mention";
                                            text_run?: {
                                                text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    strike_through?: boolean;
                                                    back_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    text_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    link?: { url?: string };
                                                };
                                            };
                                            docs_link?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            mention?: { user_id?: string };
                                        }>;
                                    };
                                    gallery?: {
                                        images?: Array<{
                                            file_token?: string;
                                            src?: string;
                                            width?: number;
                                            height?: number;
                                        }>;
                                    };
                                }>;
                            };
                            deadline?: string;
                            category_id?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
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
                                    objective?: {
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        cycle_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        notes?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        weight?: number;
                                        deadline?: string;
                                        category_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective&apiName=key_results_weight&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=key_results_weight&project=okr&resource=okr.objective&version=v2 document }
                 *
                 * 修改关键结果权重
                 *
                 * 调整指定目标下各关键结果的权重分配。为每个关键结果设置权重值，以反映其在计算目标整体得分时的相对重要性。
                 */
                keyResultsWeight: async (
                    payload?: {
                        data: {
                            key_result_weights: Array<{
                                key_result_id: string;
                                weight: number;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
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
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        objective_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        weight?: number;
                                        deadline?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id/key_results_weight`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=okr&resource=okr.objective&version=v2 document }
                 *
                 * 获取目标详细信息
                 *
                 * 获取指定目标的详细信息，包括其内容、负责人、分数、权重、截止时间及分类。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
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
                                    objective?: {
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        cycle_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        notes?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        weight?: number;
                                        deadline?: string;
                                        category_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id`,
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
             * okr.key_result
             */
            okrKeyResult: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.key_result&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=okr&resource=okr.key_result&version=v2 document }
                 *
                 * 删除关键结果
                 *
                 * 删除目标下指定的关键结果。此操作将永久删除该关键结果及其关联的所有数据，包括进展记录和量化指标。
                 */
                delete: async (
                    payload?: {
                        path: { key_result_id: string };
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
                                data?: { key_result_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/key_results/:key_result_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.key_result&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=okr&resource=okr.key_result&version=v2 document }
                 *
                 * 获取关键结果
                 *
                 * 获取指定关键结果的详细信息，包括其内容、负责人、分数、权重、截止时间和相关指标。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { key_result_id: string };
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
                                    key_result?: {
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        objective_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        weight?: number;
                                        deadline?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/key_results/:key_result_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.key_result&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=okr&resource=okr.key_result&version=v2 document }
                 *
                 * 编辑关键结果
                 *
                 * 修改指定目标下现有关键结果的内容、分数和截止时间，更新其内容。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            content?: {
                                blocks?: Array<{
                                    block_element_type?:
                                        | "paragraph"
                                        | "gallery";
                                    paragraph?: {
                                        style?: {
                                            list?: {
                                                list_type?:
                                                    | "number"
                                                    | "bullet"
                                                    | "checkBox"
                                                    | "checkedBox"
                                                    | "indent";
                                                indent_level?: number;
                                                number?: number;
                                            };
                                        };
                                        elements?: Array<{
                                            paragraph_element_type?:
                                                | "textRun"
                                                | "docsLink"
                                                | "mention";
                                            text_run?: {
                                                text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    strike_through?: boolean;
                                                    back_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    text_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    link?: { url?: string };
                                                };
                                            };
                                            docs_link?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            mention?: { user_id?: string };
                                        }>;
                                    };
                                    gallery?: {
                                        images?: Array<{
                                            file_token?: string;
                                            src?: string;
                                            width?: number;
                                            height?: number;
                                        }>;
                                    };
                                }>;
                            };
                            score?: number;
                            deadline?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { key_result_id: string };
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
                                    key_result?: {
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        objective_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        weight?: number;
                                        deadline?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/key_results/:key_result_id`,
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
            },
            /**
             * okr.objective.alignment
             */
            okrObjectiveAlignment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective.alignment&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=okr&resource=okr.objective.alignment&version=v2 document }
                 *
                 * 创建目标对齐关系
                 *
                 * 为指定目标与另一个目标创建对齐关系，在 OKR 结构中建立层级对齐。
                 */
                create: async (
                    payload?: {
                        data: { to_entity_type: number; to_entity_id: string };
                        path: { objective_id: string };
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
                                data?: { alignment_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id/alignments`,
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
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            align_type?: "aligned" | "aligning";
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
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
                                    `${this.domain}/open-apis/okr/v2/objectives/:objective_id/alignments`,
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        id: string;
                                                        create_time: string;
                                                        update_time: string;
                                                        from_owner: {
                                                            owner_type: "user";
                                                            user_id?: string;
                                                        };
                                                        to_owner: {
                                                            owner_type: "user";
                                                            user_id?: string;
                                                        };
                                                        from_entity_type: number;
                                                        from_entity_id: string;
                                                        to_entity_type: number;
                                                        to_entity_id: string;
                                                    }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective.alignment&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.objective.alignment&version=v2 document }
                 *
                 * 获取目标的对齐信息
                 *
                 * 分页获取指定目标的对齐关系列表，包含被其他目标对齐（被对齐）和对齐到其他目标（对齐）两种类型的对齐信息，以及发起方和被对齐方的负责人与实体详情。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            align_type?: "aligned" | "aligning";
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
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
                                    items?: Array<{
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        from_owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        to_owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        from_entity_type: number;
                                        from_entity_id: string;
                                        to_entity_type: number;
                                        to_entity_id: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id/alignments`,
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
             * okr.category
             */
            okrCategory: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            owner_type?: "user" | "department";
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
                                    `${this.domain}/open-apis/okr/v2/categories`,
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        id: string;
                                                        create_time: string;
                                                        update_time: string;
                                                        category_type:
                                                            | "person"
                                                            | "team";
                                                        enabled: boolean;
                                                        color:
                                                            | "blue"
                                                            | "purple"
                                                            | "wathet"
                                                            | "turquoise"
                                                            | "indigo"
                                                            | "orange";
                                                        name: {
                                                            zh?: string;
                                                            en?: string;
                                                            ja?: string;
                                                        };
                                                    }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.category&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.category&version=v2 document }
                 *
                 * 获取所有 OKR 分类
                 *
                 * 获取系统中所有可用的 OKR 分类的分页列表。每个分类包括 ID、名称（多语言）、颜色、类型、启用状态以及创建/更新时间戳等元数据。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            owner_type?: "user" | "department";
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        category_type: "person" | "team";
                                        enabled: boolean;
                                        color:
                                            | "blue"
                                            | "purple"
                                            | "wathet"
                                            | "turquoise"
                                            | "indigo"
                                            | "orange";
                                        name: {
                                            zh?: string;
                                            en?: string;
                                            ja?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/categories`,
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
             * okr.cycle
             */
            okrCycle: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            user_id: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_size?: number;
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
                                    `${this.domain}/open-apis/okr/v2/cycles`,
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        id: string;
                                                        create_time: string;
                                                        update_time: string;
                                                        tenant_cycle_id: string;
                                                        owner: {
                                                            owner_type: "user";
                                                            user_id?: string;
                                                        };
                                                        start_time: string;
                                                        end_time: string;
                                                        cycle_status?: number;
                                                        score?: number;
                                                    }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.cycle&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.cycle&version=v2 document }
                 *
                 * 获取用户 OKR 周期列表
                 *
                 * 获取指定用户的 OKR 周期列表，包含周期状态、时间范围和分数等信息。
                 */
                list: async (
                    payload?: {
                        params: {
                            user_id: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_size?: number;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        tenant_cycle_id: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        start_time: string;
                                        end_time: string;
                                        cycle_status?: number;
                                        score?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/cycles`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.cycle&apiName=objectives_weight&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=objectives_weight&project=okr&resource=okr.cycle&version=v2 document }
                 *
                 * 修改 OKR 目标权重
                 *
                 * 批量修改指定 OKR 周期下多个目标的权重。权重取值范围为 0 到 1，支持最多三位小数。
                 */
                objectivesWeight: async (
                    payload?: {
                        data: {
                            objective_weights: Array<{
                                objective_id: string;
                                weight: number;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { cycle_id: string };
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
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        cycle_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        notes?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        weight?: number;
                                        deadline?: string;
                                        category_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/cycles/:cycle_id/objectives_weight`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.cycle&apiName=objectives_position&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=objectives_position&project=okr&resource=okr.cycle&version=v2 document }
                 *
                 * 修改 OKR 目标位置
                 *
                 * 通过提供按顺序排列的目标 ID 列表，在指定的 OKR 周期内重新排序目标。
                 */
                objectivesPosition: async (
                    payload?: {
                        data: { objective_ids: Array<string> };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { cycle_id: string };
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
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        cycle_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        notes?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        weight?: number;
                                        deadline?: string;
                                        category_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/cycles/:cycle_id/objectives_position`,
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
             * okr.objective.key_result
             */
            okrObjectiveKeyResult: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
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
                                    `${this.domain}/open-apis/okr/v2/objectives/:objective_id/key_results`,
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        id: string;
                                                        create_time: string;
                                                        update_time: string;
                                                        owner: {
                                                            owner_type: "user";
                                                            user_id?: string;
                                                        };
                                                        objective_id: string;
                                                        position: number;
                                                        content?: {
                                                            blocks?: Array<{
                                                                block_element_type?:
                                                                    | "paragraph"
                                                                    | "gallery";
                                                                paragraph?: {
                                                                    style?: {
                                                                        list?: {
                                                                            list_type?:
                                                                                | "number"
                                                                                | "bullet"
                                                                                | "checkBox"
                                                                                | "checkedBox"
                                                                                | "indent";
                                                                            indent_level?: number;
                                                                            number?: number;
                                                                        };
                                                                    };
                                                                    elements?: Array<{
                                                                        paragraph_element_type?:
                                                                            | "textRun"
                                                                            | "docsLink"
                                                                            | "mention";
                                                                        text_run?: {
                                                                            text?: string;
                                                                            style?: {
                                                                                bold?: boolean;
                                                                                strike_through?: boolean;
                                                                                back_color?: {
                                                                                    red?: number;
                                                                                    green?: number;
                                                                                    blue?: number;
                                                                                    alpha?: number;
                                                                                };
                                                                                text_color?: {
                                                                                    red?: number;
                                                                                    green?: number;
                                                                                    blue?: number;
                                                                                    alpha?: number;
                                                                                };
                                                                                link?: {
                                                                                    url?: string;
                                                                                };
                                                                            };
                                                                        };
                                                                        docs_link?: {
                                                                            url?: string;
                                                                            title?: string;
                                                                        };
                                                                        mention?: {
                                                                            user_id?: string;
                                                                        };
                                                                    }>;
                                                                };
                                                                gallery?: {
                                                                    images?: Array<{
                                                                        file_token?: string;
                                                                        src?: string;
                                                                        width?: number;
                                                                        height?: number;
                                                                    }>;
                                                                };
                                                            }>;
                                                        };
                                                        score?: number;
                                                        weight?: number;
                                                        deadline?: string;
                                                    }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective.key_result&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.objective.key_result&version=v2 document }
                 *
                 * 获取目标下的所有关键结果
                 *
                 * 分页获取指定目标下的所有关键结果列表，包括关键结果的内容、进度、分数和负责人信息。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
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
                                    items?: Array<{
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        objective_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        weight?: number;
                                        deadline?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id/key_results`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective.key_result&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=okr&resource=okr.objective.key_result&version=v2 document }
                 *
                 * 在目标下创建关键结果
                 *
                 * 在指定目标下创建一个新的关键结果。使用富文本结构定义关键结果内容，设置截止时间和打分。
                 */
                create: async (
                    payload?: {
                        data?: {
                            content?: {
                                blocks?: Array<{
                                    block_element_type?:
                                        | "paragraph"
                                        | "gallery";
                                    paragraph?: {
                                        style?: {
                                            list?: {
                                                list_type?:
                                                    | "number"
                                                    | "bullet"
                                                    | "checkBox"
                                                    | "checkedBox"
                                                    | "indent";
                                                indent_level?: number;
                                                number?: number;
                                            };
                                        };
                                        elements?: Array<{
                                            paragraph_element_type?:
                                                | "textRun"
                                                | "docsLink"
                                                | "mention";
                                            text_run?: {
                                                text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    strike_through?: boolean;
                                                    back_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    text_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    link?: { url?: string };
                                                };
                                            };
                                            docs_link?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            mention?: { user_id?: string };
                                        }>;
                                    };
                                    gallery?: {
                                        images?: Array<{
                                            file_token?: string;
                                            src?: string;
                                            width?: number;
                                            height?: number;
                                        }>;
                                    };
                                }>;
                            };
                            deadline?: string;
                            score?: number;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
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
                                data?: { key_result_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id/key_results`,
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
             * okr.key_result.indicator
             */
            okrKeyResultIndicator: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.key_result.indicator&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.key_result.indicator&version=v2 document }
                 *
                 * 获取关键结果的量化指标
                 *
                 * 获取指定关键结果的量化指标数据，包括其当前值、目标值、状态、计算方式和单位信息。
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { key_result_id: string };
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
                                    indicator?: {
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        entity_type: number;
                                        entity_id: string;
                                        indicator_status: number;
                                        status_calculate_type: number;
                                        start_value?: number;
                                        target_value?: number;
                                        current_value?: number;
                                        current_value_calculate_type?: number;
                                        unit?: {
                                            unit_type: number;
                                            unit_value: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/key_results/:key_result_id/indicators`,
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
             * okr.objective.indicator
             */
            okrObjectiveIndicator: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective.indicator&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.objective.indicator&version=v2 document }
                 *
                 * 获取目标的量化指标
                 *
                 * 获取指定目标的量化指标数据，包括其起始值、当前值、目标值、状态、计算方式和单位信息。
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
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
                                    indicator?: {
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        entity_type: number;
                                        entity_id: string;
                                        indicator_status: number;
                                        status_calculate_type: number;
                                        start_value?: number;
                                        target_value?: number;
                                        current_value?: number;
                                        current_value_calculate_type?: number;
                                        unit?: {
                                            unit_type: number;
                                            unit_value: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id/indicators`,
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
             * okr.cycle.objective
             */
            okrCycleObjective: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.cycle.objective&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=okr&resource=okr.cycle.objective&version=v2 document }
                 *
                 * 创建 OKR 目标
                 *
                 * 在指定的 OKR 周期下创建一个新的目标。使用富文本结构定义目标内容，添加可选备注，设置截止时间，并配置权重、分类和初始分数。
                 */
                create: async (
                    payload?: {
                        data?: {
                            content?: {
                                blocks?: Array<{
                                    block_element_type?:
                                        | "paragraph"
                                        | "gallery";
                                    paragraph?: {
                                        style?: {
                                            list?: {
                                                list_type?:
                                                    | "number"
                                                    | "bullet"
                                                    | "checkBox"
                                                    | "checkedBox"
                                                    | "indent";
                                                indent_level?: number;
                                                number?: number;
                                            };
                                        };
                                        elements?: Array<{
                                            paragraph_element_type?:
                                                | "textRun"
                                                | "docsLink"
                                                | "mention";
                                            text_run?: {
                                                text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    strike_through?: boolean;
                                                    back_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    text_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    link?: { url?: string };
                                                };
                                            };
                                            docs_link?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            mention?: { user_id?: string };
                                        }>;
                                    };
                                    gallery?: {
                                        images?: Array<{
                                            file_token?: string;
                                            src?: string;
                                            width?: number;
                                            height?: number;
                                        }>;
                                    };
                                }>;
                            };
                            notes?: {
                                blocks?: Array<{
                                    block_element_type?:
                                        | "paragraph"
                                        | "gallery";
                                    paragraph?: {
                                        style?: {
                                            list?: {
                                                list_type?:
                                                    | "number"
                                                    | "bullet"
                                                    | "checkBox"
                                                    | "checkedBox"
                                                    | "indent";
                                                indent_level?: number;
                                                number?: number;
                                            };
                                        };
                                        elements?: Array<{
                                            paragraph_element_type?:
                                                | "textRun"
                                                | "docsLink"
                                                | "mention";
                                            text_run?: {
                                                text?: string;
                                                style?: {
                                                    bold?: boolean;
                                                    strike_through?: boolean;
                                                    back_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    text_color?: {
                                                        red?: number;
                                                        green?: number;
                                                        blue?: number;
                                                        alpha?: number;
                                                    };
                                                    link?: { url?: string };
                                                };
                                            };
                                            docs_link?: {
                                                url?: string;
                                                title?: string;
                                            };
                                            mention?: { user_id?: string };
                                        }>;
                                    };
                                    gallery?: {
                                        images?: Array<{
                                            file_token?: string;
                                            src?: string;
                                            width?: number;
                                            height?: number;
                                        }>;
                                    };
                                }>;
                            };
                            deadline?: string;
                            weight?: number;
                            category_id?: string;
                            score?: number;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { cycle_id: string };
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
                                data?: { objective_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/cycles/:cycle_id/objectives`,
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
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { cycle_id: string };
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
                                    `${this.domain}/open-apis/okr/v2/cycles/:cycle_id/objectives`,
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        id: string;
                                                        create_time: string;
                                                        update_time: string;
                                                        owner: {
                                                            owner_type: "user";
                                                            user_id?: string;
                                                        };
                                                        cycle_id: string;
                                                        position: number;
                                                        content?: {
                                                            blocks?: Array<{
                                                                block_element_type?:
                                                                    | "paragraph"
                                                                    | "gallery";
                                                                paragraph?: {
                                                                    style?: {
                                                                        list?: {
                                                                            list_type?:
                                                                                | "number"
                                                                                | "bullet"
                                                                                | "checkBox"
                                                                                | "checkedBox"
                                                                                | "indent";
                                                                            indent_level?: number;
                                                                            number?: number;
                                                                        };
                                                                    };
                                                                    elements?: Array<{
                                                                        paragraph_element_type?:
                                                                            | "textRun"
                                                                            | "docsLink"
                                                                            | "mention";
                                                                        text_run?: {
                                                                            text?: string;
                                                                            style?: {
                                                                                bold?: boolean;
                                                                                strike_through?: boolean;
                                                                                back_color?: {
                                                                                    red?: number;
                                                                                    green?: number;
                                                                                    blue?: number;
                                                                                    alpha?: number;
                                                                                };
                                                                                text_color?: {
                                                                                    red?: number;
                                                                                    green?: number;
                                                                                    blue?: number;
                                                                                    alpha?: number;
                                                                                };
                                                                                link?: {
                                                                                    url?: string;
                                                                                };
                                                                            };
                                                                        };
                                                                        docs_link?: {
                                                                            url?: string;
                                                                            title?: string;
                                                                        };
                                                                        mention?: {
                                                                            user_id?: string;
                                                                        };
                                                                    }>;
                                                                };
                                                                gallery?: {
                                                                    images?: Array<{
                                                                        file_token?: string;
                                                                        src?: string;
                                                                        width?: number;
                                                                        height?: number;
                                                                    }>;
                                                                };
                                                            }>;
                                                        };
                                                        score?: number;
                                                        notes?: {
                                                            blocks?: Array<{
                                                                block_element_type?:
                                                                    | "paragraph"
                                                                    | "gallery";
                                                                paragraph?: {
                                                                    style?: {
                                                                        list?: {
                                                                            list_type?:
                                                                                | "number"
                                                                                | "bullet"
                                                                                | "checkBox"
                                                                                | "checkedBox"
                                                                                | "indent";
                                                                            indent_level?: number;
                                                                            number?: number;
                                                                        };
                                                                    };
                                                                    elements?: Array<{
                                                                        paragraph_element_type?:
                                                                            | "textRun"
                                                                            | "docsLink"
                                                                            | "mention";
                                                                        text_run?: {
                                                                            text?: string;
                                                                            style?: {
                                                                                bold?: boolean;
                                                                                strike_through?: boolean;
                                                                                back_color?: {
                                                                                    red?: number;
                                                                                    green?: number;
                                                                                    blue?: number;
                                                                                    alpha?: number;
                                                                                };
                                                                                text_color?: {
                                                                                    red?: number;
                                                                                    green?: number;
                                                                                    blue?: number;
                                                                                    alpha?: number;
                                                                                };
                                                                                link?: {
                                                                                    url?: string;
                                                                                };
                                                                            };
                                                                        };
                                                                        docs_link?: {
                                                                            url?: string;
                                                                            title?: string;
                                                                        };
                                                                        mention?: {
                                                                            user_id?: string;
                                                                        };
                                                                    }>;
                                                                };
                                                                gallery?: {
                                                                    images?: Array<{
                                                                        file_token?: string;
                                                                        src?: string;
                                                                        width?: number;
                                                                        height?: number;
                                                                    }>;
                                                                };
                                                            }>;
                                                        };
                                                        weight?: number;
                                                        deadline?: string;
                                                        category_id?: string;
                                                    }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.cycle.objective&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.cycle.objective&version=v2 document }
                 *
                 * 获取用户 OKR 周期内的目标
                 *
                 * 获取指定用户 OKR 周期内的所有目标列表，包含目标内容、负责人、分数和进度状态等信息。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { cycle_id: string };
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
                                    items?: Array<{
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        cycle_id: string;
                                        position: number;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        score?: number;
                                        notes?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        weight?: number;
                                        deadline?: string;
                                        category_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/cycles/:cycle_id/objectives`,
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
             * okr.indicator
             */
            okrIndicator: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.indicator&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=okr&resource=okr.indicator&version=v2 document }
                 *
                 * 更新量化指标
                 *
                 * 更新现有量化指标的配置和数值，包括计算方式、状态、当前值、目标值和单位设置。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            current_value_calculate_type?: number;
                            status_calculate_type?: number;
                            start_value?: number;
                            target_value?: number;
                            current_value?: number;
                            unit?: { unit_type: number; unit_value: string };
                            indicator_status?: number;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { indicator_id: string };
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
                                    indicator?: {
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        entity_type: number;
                                        entity_id: string;
                                        indicator_status: number;
                                        status_calculate_type: number;
                                        start_value?: number;
                                        target_value?: number;
                                        current_value?: number;
                                        current_value_calculate_type?: number;
                                        unit?: {
                                            unit_type: number;
                                            unit_value: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/indicators/:indicator_id`,
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
            },
            /**
             * okr.objective.progress
             */
            okrObjectiveProgress: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
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
                                    `${this.domain}/open-apis/okr/v2/objectives/:objective_id/progresses`,
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        id: string;
                                                        create_time: string;
                                                        update_time: string;
                                                        owner: {
                                                            owner_type: "user";
                                                            user_id?: string;
                                                        };
                                                        entity_type: number;
                                                        entity_id: string;
                                                        content?: {
                                                            blocks?: Array<{
                                                                block_element_type?:
                                                                    | "paragraph"
                                                                    | "gallery";
                                                                paragraph?: {
                                                                    style?: {
                                                                        list?: {
                                                                            list_type?:
                                                                                | "number"
                                                                                | "bullet"
                                                                                | "checkBox"
                                                                                | "checkedBox"
                                                                                | "indent";
                                                                            indent_level?: number;
                                                                            number?: number;
                                                                        };
                                                                    };
                                                                    elements?: Array<{
                                                                        paragraph_element_type?:
                                                                            | "textRun"
                                                                            | "docsLink"
                                                                            | "mention";
                                                                        text_run?: {
                                                                            text?: string;
                                                                            style?: {
                                                                                bold?: boolean;
                                                                                strike_through?: boolean;
                                                                                back_color?: {
                                                                                    red?: number;
                                                                                    green?: number;
                                                                                    blue?: number;
                                                                                    alpha?: number;
                                                                                };
                                                                                text_color?: {
                                                                                    red?: number;
                                                                                    green?: number;
                                                                                    blue?: number;
                                                                                    alpha?: number;
                                                                                };
                                                                                link?: {
                                                                                    url?: string;
                                                                                };
                                                                            };
                                                                        };
                                                                        docs_link?: {
                                                                            url?: string;
                                                                            title?: string;
                                                                        };
                                                                        mention?: {
                                                                            user_id?: string;
                                                                        };
                                                                    }>;
                                                                };
                                                                gallery?: {
                                                                    images?: Array<{
                                                                        file_token?: string;
                                                                        src?: string;
                                                                        width?: number;
                                                                        height?: number;
                                                                    }>;
                                                                };
                                                            }>;
                                                        };
                                                        progress_rate?: {
                                                            progress_percent?: number;
                                                            progress_status?: number;
                                                        };
                                                    }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.objective.progress&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.objective.progress&version=v2 document }
                 *
                 * 获取目标下的进展记录
                 *
                 * 分页获取指定目标下的进展记录列表，包含进展内容、创建/更新时间戳、负责人信息以及进展百分比和状态。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { objective_id: string };
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
                                    items?: Array<{
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        entity_type: number;
                                        entity_id: string;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        progress_rate?: {
                                            progress_percent?: number;
                                            progress_status?: number;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/objectives/:objective_id/progresses`,
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
             * okr.key_result.progress
             */
            okrKeyResultProgress: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { key_result_id: string };
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
                                    `${this.domain}/open-apis/okr/v2/key_results/:key_result_id/progresses`,
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        id: string;
                                                        create_time: string;
                                                        update_time: string;
                                                        owner: {
                                                            owner_type: "user";
                                                            user_id?: string;
                                                        };
                                                        entity_type: number;
                                                        entity_id: string;
                                                        content?: {
                                                            blocks?: Array<{
                                                                block_element_type?:
                                                                    | "paragraph"
                                                                    | "gallery";
                                                                paragraph?: {
                                                                    style?: {
                                                                        list?: {
                                                                            list_type?:
                                                                                | "number"
                                                                                | "bullet"
                                                                                | "checkBox"
                                                                                | "checkedBox"
                                                                                | "indent";
                                                                            indent_level?: number;
                                                                            number?: number;
                                                                        };
                                                                    };
                                                                    elements?: Array<{
                                                                        paragraph_element_type?:
                                                                            | "textRun"
                                                                            | "docsLink"
                                                                            | "mention";
                                                                        text_run?: {
                                                                            text?: string;
                                                                            style?: {
                                                                                bold?: boolean;
                                                                                strike_through?: boolean;
                                                                                back_color?: {
                                                                                    red?: number;
                                                                                    green?: number;
                                                                                    blue?: number;
                                                                                    alpha?: number;
                                                                                };
                                                                                text_color?: {
                                                                                    red?: number;
                                                                                    green?: number;
                                                                                    blue?: number;
                                                                                    alpha?: number;
                                                                                };
                                                                                link?: {
                                                                                    url?: string;
                                                                                };
                                                                            };
                                                                        };
                                                                        docs_link?: {
                                                                            url?: string;
                                                                            title?: string;
                                                                        };
                                                                        mention?: {
                                                                            user_id?: string;
                                                                        };
                                                                    }>;
                                                                };
                                                                gallery?: {
                                                                    images?: Array<{
                                                                        file_token?: string;
                                                                        src?: string;
                                                                        width?: number;
                                                                        height?: number;
                                                                    }>;
                                                                };
                                                            }>;
                                                        };
                                                        progress_rate?: {
                                                            progress_percent?: number;
                                                            progress_status?: number;
                                                        };
                                                    }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=okr&resource=okr.key_result.progress&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=okr&resource=okr.key_result.progress&version=v2 document }
                 *
                 * 获取关键结果下的进展记录
                 *
                 * 获取指定关键结果的分页进展更新记录。每条记录包括进展内容、完成百分比、状态指示器、所有者信息和时间戳。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { key_result_id: string };
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
                                    items?: Array<{
                                        id: string;
                                        create_time: string;
                                        update_time: string;
                                        owner: {
                                            owner_type: "user";
                                            user_id?: string;
                                        };
                                        entity_type: number;
                                        entity_id: string;
                                        content?: {
                                            blocks?: Array<{
                                                block_element_type?:
                                                    | "paragraph"
                                                    | "gallery";
                                                paragraph?: {
                                                    style?: {
                                                        list?: {
                                                            list_type?:
                                                                | "number"
                                                                | "bullet"
                                                                | "checkBox"
                                                                | "checkedBox"
                                                                | "indent";
                                                            indent_level?: number;
                                                            number?: number;
                                                        };
                                                    };
                                                    elements?: Array<{
                                                        paragraph_element_type?:
                                                            | "textRun"
                                                            | "docsLink"
                                                            | "mention";
                                                        text_run?: {
                                                            text?: string;
                                                            style?: {
                                                                bold?: boolean;
                                                                strike_through?: boolean;
                                                                back_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                text_color?: {
                                                                    red?: number;
                                                                    green?: number;
                                                                    blue?: number;
                                                                    alpha?: number;
                                                                };
                                                                link?: {
                                                                    url?: string;
                                                                };
                                                            };
                                                        };
                                                        docs_link?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        mention?: {
                                                            user_id?: string;
                                                        };
                                                    }>;
                                                };
                                                gallery?: {
                                                    images?: Array<{
                                                        file_token?: string;
                                                        src?: string;
                                                        width?: number;
                                                        height?: number;
                                                    }>;
                                                };
                                            }>;
                                        };
                                        progress_rate?: {
                                            progress_percent?: number;
                                            progress_status?: number;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/okr/v2/key_results/:key_result_id/progresses`,
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
