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
import apaas from "./apaas";

// auto gen
export default abstract class Client extends apaas {
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
    application = {
        applicationAppUsage: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_usage&apiName=overview&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=overview&project=application&resource=application.app_usage&version=v6 document }
             *
             * 获取应用使用概览
             *
             * 查看应用在某一天/某一周/某一个月的使用数据，可以查看租户整体对应用的使用情况，也可以分部门查看。
             *
             * 1. 仅支持企业版/旗舰版租户使用;2. 一般每天早上10点产出前一天的数据;3. 已经支持的指标包括：应用的活跃用户数、累计用户数、新增用户数、访问页面数、打开次数;4. 数据从飞书4.10版本开始统计，使用飞书版本4.10及以下版本的用户数据不会被统计到;5. 按照部门查看数据时，会展示当前部门以及其子部门的整体使用情况;6. 调用频控为100次/分
             */
            overview: async (
                payload?: {
                    data: {
                        date: string;
                        cycle_type: number;
                        department_id?: string;
                        ability: "app" | "mp" | "h5" | "bot";
                    };
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
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
                                items?: Array<{
                                    metric_name: string;
                                    metric_value: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/app_usage/overview`,
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_usage&apiName=message_push_overview&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=message_push_overview&project=application&resource=application.app_usage&version=v6 document }
             *
             * 获取消息推送概览
             *
             * 目标：查看应用在某一天/某一周/某一个月的机器人消息推送数据，可以根据部门做筛选
             *
             * 1. 仅支持企业版/旗舰版租户使用;2. 一般每天早上10点产出两天前的数据。;3. 已经支持的指标包括：消息推送给用户的次数、消息触达的人数、消息1小时阅读量、消息12小时阅读量;4. 按照部门查看数据时，会展示当前部门以及其子部门的整体使用情况;5. 调用频控为100次/分
             */
            messagePushOverview: async (
                payload?: {
                    data: {
                        date: string;
                        cycle_type: number;
                        department_id?: string;
                    };
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
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
                                items?: Array<{
                                    metric_name: string;
                                    metric_value: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/app_usage/message_push_overview`,
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_usage&apiName=department_overview&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=department_overview&project=application&resource=application.app_usage&version=v6 document }
             *
             * 获取多部门应用使用概览
             *
             * 查看应用在某一天/某一周/某一个月的使用数据，可以根据部门做多层子部门的筛选
             *
             * 1. 仅支持企业版/旗舰版租户使用;2. 一般每天早上10点产出前一天的数据;3. 已经支持的指标包括：应用的活跃用户数、累计用户数、新增用户数、访问页面数、打开次数;4. 按照部门查看数据时，可以分别展示当前部门以及其子部门的使用情况;5. 如果查询的部门在查询日期没有使用过应用，只返回指标：应用的活跃用户数指标;6. 数据从飞书4.10版本开始统计，使用飞书版本4.10及以下版本的用户数据不会被统计到;7. 调用频控为100次/分
             */
            departmentOverview: async (
                payload?: {
                    data: {
                        date: string;
                        cycle_type: number;
                        department_id?: string;
                        recursion?: number;
                        page_size?: number;
                        page_token?: string;
                    };
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    department_id?: string;
                                    app?: Array<{
                                        metric_name: string;
                                        metric_value: number;
                                    }>;
                                    gadget?: Array<{
                                        metric_name: string;
                                        metric_value: number;
                                    }>;
                                    webapp?: Array<{
                                        metric_name: string;
                                        metric_value: number;
                                    }>;
                                    bot?: Array<{
                                        metric_name: string;
                                        metric_value: number;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/app_usage/department_overview`,
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
        applicationFeedback: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.feedback&apiName=list&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=application.feedback&version=v6 document }
             *
             * 获取应用反馈列表
             *
             * 查询应用的反馈数据
             */
            list: async (
                payload?: {
                    params?: {
                        from_date?: string;
                        to_date?: string;
                        feedback_type?: number;
                        status?: number;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        page_token?: string;
                        page_size?: number;
                    };
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
                                feedback_list?: Array<{
                                    feedback_id: string;
                                    app_id: string;
                                    feedback_time: string;
                                    tenant_name?: string;
                                    feedback_type: number;
                                    status: number;
                                    fault_type?: Array<number>;
                                    fault_time?: string;
                                    source?: number;
                                    contact?: string;
                                    update_time?: string;
                                    description: string;
                                    user_id?: string;
                                    operator_id?: string;
                                    images?: Array<string>;
                                    feedback_path?: string;
                                }>;
                                has_more: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/feedbacks`,
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.feedback&apiName=patch&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.feedback&version=v6 document }
             *
             * 更新应用反馈
             *
             * 更新应用的反馈数据
             */
            patch: async (
                payload?: {
                    params: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        status: number;
                        operator_id: string;
                    };
                    path: { app_id: string; feedback_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/feedbacks/:feedback_id`,
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
        applicationVisibility: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.visibility&apiName=isv_visibility_list&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=isv_visibility_list&project=application&resource=application.visibility&version=v6 document }
             *
             * 获取商店应用在安装企业内的可用范围
             *
             * 该接口用于查询商店应用在该企业内可以被使用的范围，可以被自建应用调用。
             */
            isvVisibilityList: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
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
                                department_visibility_items?: Array<{
                                    user_id?: string;
                                    department_id?: string;
                                    group_id?: string;
                                }>;
                                is_visible_to_all?: boolean;
                                has_more?: boolean;
                                page_token?: string;
                                user_visibility_items?: Array<{
                                    user_id?: string;
                                    department_id?: string;
                                    group_id?: string;
                                }>;
                                department_invisibility_items?: Array<{
                                    user_id?: string;
                                    department_id?: string;
                                    group_id?: string;
                                }>;
                                user_invisibility_items?: Array<{
                                    user_id?: string;
                                    department_id?: string;
                                    group_id?: string;
                                }>;
                                group_visibility_items?: Array<{
                                    user_id?: string;
                                    department_id?: string;
                                    group_id?: string;
                                }>;
                                group_invisibility_items?: Array<{
                                    user_id?: string;
                                    department_id?: string;
                                    group_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/visibility/isv_visibility_list`,
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.visibility&apiName=check_white_black_list&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=check_white_black_list&project=application&resource=application.visibility&version=v6 document }
             *
             * 查询用户或部门是否在应用的可用或禁用名单
             *
             * 该接口用于查询用户、部门、用户组是否在应用的可用或禁用名单中
             */
            checkWhiteBlackList: async (
                payload?: {
                    data?: {
                        user_ids?: Array<string>;
                        department_ids?: Array<string>;
                        group_ids?: Array<string>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
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
                                user_visibility_list?: Array<{
                                    user_id?: string;
                                    in_white_list?: boolean;
                                    in_black_list?: boolean;
                                    in_paid_list?: boolean;
                                }>;
                                department_visibility_list?: Array<{
                                    department_id?: string;
                                    in_white_list?: boolean;
                                    in_black_list?: boolean;
                                }>;
                                group_visibility_list?: Array<{
                                    group_id?: string;
                                    in_white_list?: boolean;
                                    in_black_list?: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/visibility/check_white_black_list`,
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.visibility&apiName=patch&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.visibility&version=v6 document }
             *
             * 更新应用可用范围
             *
             * 调用该接口更新指定应用的可用范围，支持更新当前企业内自建应用的可用范围，或者已安装的商店应用的可用范围，包括可用人员与禁用人员。更新可用范围后对线上立即生效。
             */
            patch: async (
                payload?: {
                    data?: {
                        add_visible_list?: {
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                            group_ids?: Array<string>;
                        };
                        del_visible_list?: {
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                            group_ids?: Array<string>;
                        };
                        add_invisible_list?: {
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                            group_ids?: Array<string>;
                        };
                        del_invisible_list?: {
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                            group_ids?: Array<string>;
                        };
                        is_visible_to_all?: boolean;
                    };
                    params?: {
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        user_id_type?: "open_id" | "user_id" | "union_id";
                    };
                    path: { app_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/visibility`,
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
        appPackage: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_package&apiName=upload&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=application&resource=app_package&version=v6 document }
             *
             * 应用包上传（灰度租户可见）
             *
             * 上传应用包
             */
            upload: async (
                payload?: {
                    data: {
                        app_id: string;
                        package_type: "mobile" | "pc" | "block";
                        version: string;
                        description?: string;
                        source: Buffer | fs.ReadStream;
                        block_type_id?: string;
                        mini_mode?: number;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/app_package/upload`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_package&apiName=latest_version&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=latest_version&project=application&resource=app_package&version=v6 document }
             *
             * 应用最新包版本
             *
             * 获取应用最新包版本
             */
            latestVersion: async (
                payload?: {
                    params: {
                        app_id: string;
                        package_type: "mobile" | "pc" | "block";
                        block_type_id?: string;
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
                            data?: { version?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/app_package/latest_version`,
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_package&apiName=progress&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=progress&project=application&resource=app_package&version=v6 document }
             *
             * 应用包上传进度查询（灰度租户可见）
             *
             * 应用包上传进度查询
             */
            progress: async (
                payload?: {
                    params: { app_id: string };
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
                            data?: { status?: number };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/app_package/progress`,
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
        appRecommendRule: {
            listWithIterator: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
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
                                `${this.domain}/open-apis/application/v6/app_recommend_rules`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                rules?: Array<{
                                                    id?: string;
                                                    name?: string;
                                                    status?: "open" | "closed";
                                                    visibility_info?: {
                                                        is_all?: boolean;
                                                        department_ids?: Array<string>;
                                                        user_ids?: Array<string>;
                                                        group_ids?: Array<string>;
                                                    };
                                                    recommend_item_infos?: Array<{
                                                        item_id?: string;
                                                        item_type?:
                                                            | "application"
                                                            | "link";
                                                        name?: string;
                                                        description?: string;
                                                        link_url?: string;
                                                        client_id?: string;
                                                        icon_url?: string;
                                                        default_locale?:
                                                            | "zh_cn"
                                                            | "zh_hk"
                                                            | "zh_tw"
                                                            | "en_us"
                                                            | "ja_jp";
                                                        i18n_name?: {
                                                            zh_cn?: string;
                                                            zh_hk?: string;
                                                            zh_tw?: string;
                                                            en_us?: string;
                                                            ja_jp?: string;
                                                        };
                                                    }>;
                                                    distributed_recommend_item_infos?: Array<{
                                                        item_id?: string;
                                                        item_type?:
                                                            | "application"
                                                            | "link";
                                                        name?: string;
                                                        description?: string;
                                                        link_url?: string;
                                                        client_id?: string;
                                                        icon_url?: string;
                                                        default_locale?:
                                                            | "zh_cn"
                                                            | "zh_hk"
                                                            | "zh_tw"
                                                            | "en_us"
                                                            | "ja_jp";
                                                        i18n_name?: {
                                                            zh_cn?: string;
                                                            zh_hk?: string;
                                                            zh_tw?: string;
                                                            en_us?: string;
                                                            ja_jp?: string;
                                                        };
                                                    }>;
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_recommend_rule&apiName=list&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=app_recommend_rule&version=v6 document }
             *
             * 获取当前设置的推荐规则列表
             *
             * 获取当前设置的推荐规则列表。
             */
            list: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
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
                                    id?: string;
                                    name?: string;
                                    status?: "open" | "closed";
                                    visibility_info?: {
                                        is_all?: boolean;
                                        department_ids?: Array<string>;
                                        user_ids?: Array<string>;
                                        group_ids?: Array<string>;
                                    };
                                    recommend_item_infos?: Array<{
                                        item_id?: string;
                                        item_type?: "application" | "link";
                                        name?: string;
                                        description?: string;
                                        link_url?: string;
                                        client_id?: string;
                                        icon_url?: string;
                                        default_locale?:
                                            | "zh_cn"
                                            | "zh_hk"
                                            | "zh_tw"
                                            | "en_us"
                                            | "ja_jp";
                                        i18n_name?: {
                                            zh_cn?: string;
                                            zh_hk?: string;
                                            zh_tw?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                    }>;
                                    distributed_recommend_item_infos?: Array<{
                                        item_id?: string;
                                        item_type?: "application" | "link";
                                        name?: string;
                                        description?: string;
                                        link_url?: string;
                                        client_id?: string;
                                        icon_url?: string;
                                        default_locale?:
                                            | "zh_cn"
                                            | "zh_hk"
                                            | "zh_tw"
                                            | "en_us"
                                            | "ja_jp";
                                        i18n_name?: {
                                            zh_cn?: string;
                                            zh_hk?: string;
                                            zh_tw?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                    }>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/app_recommend_rules`,
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
         * application
         */
        application: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=contacts_range_configuration&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=contacts_range_configuration&project=application&resource=application&version=v6 document }
             *
             * 获取应用通讯录权限范围配置
             *
             * 获取当前企业内某个自建应用线上实际生效的通讯录权限范围配置。
             */
            contactsRangeConfiguration: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
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
                                contacts_range?: {
                                    contacts_scope_type?:
                                        | "equal_to_availability"
                                        | "some"
                                        | "all";
                                    visible_list?: {
                                        open_ids?: Array<string>;
                                        department_ids?: Array<string>;
                                        group_ids?: Array<string>;
                                    };
                                };
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/contacts_range_configuration`,
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=create&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=application&resource=application&version=v6 document }
             *
             * 创建企业自建应用
             *
             * 创建一个企业自建应用，创建应用后的状态为待发布状态。可进入飞书开放平台查看该应用。
             */
            create: async (
                payload?: {
                    data: {
                        avatar?: string;
                        owner_id?: string;
                        i18n: Array<{
                            i18n_key:
                                | "zh_cn"
                                | "en_us"
                                | "ja_jp"
                                | "zh_hk"
                                | "zh_tw"
                                | "id_id"
                                | "ms_my"
                                | "de_de"
                                | "es_es"
                                | "fr_fr"
                                | "it_it"
                                | "pt_br"
                                | "vi_vn"
                                | "ru_ru"
                                | "th_th"
                                | "ko_kr";
                            name: string;
                            description?: string;
                            help_use?: string;
                        }>;
                        app_id?: string;
                        app_secret?: string;
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
                        {
                            code?: number;
                            msg?: string;
                            data?: { app_id?: string; app_secret?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications`,
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
                    params: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: string;
                        lang: string;
                        status?: number;
                        payment_type?: number;
                        owner_type?: number;
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
                                `${this.domain}/open-apis/application/v6/applications`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                app_list?: Array<{
                                                    app_id: string;
                                                    creator_id?: string;
                                                    status?: number;
                                                    scene_type?: number;
                                                    payment_type?: number;
                                                    create_source?:
                                                        | "developer_console"
                                                        | "base"
                                                        | "app_engine"
                                                        | "bot_builder"
                                                        | "aily"
                                                        | "unknown";
                                                    redirect_urls?: Array<string>;
                                                    online_version_id?: string;
                                                    unaudit_version_id?: string;
                                                    app_name?: string;
                                                    avatar_url?: string;
                                                    description?: string;
                                                    scopes?: Array<{
                                                        scope: string;
                                                        description?: string;
                                                        level?: number;
                                                        token_types?: Array<
                                                            "tenant" | "user"
                                                        >;
                                                    }>;
                                                    back_home_url?: string;
                                                    i18n?: Array<{
                                                        i18n_key:
                                                            | "zh_cn"
                                                            | "en_us"
                                                            | "ja_jp"
                                                            | "zh_hk"
                                                            | "zh_tw"
                                                            | "id_id"
                                                            | "ms_my"
                                                            | "de_de"
                                                            | "es_es"
                                                            | "fr_fr"
                                                            | "it_it"
                                                            | "pt_br"
                                                            | "vi_vn"
                                                            | "ru_ru"
                                                            | "th_th"
                                                            | "ko_kr";
                                                        name?: string;
                                                        description?: string;
                                                        help_use?: string;
                                                    }>;
                                                    primary_language?:
                                                        | "zh_cn"
                                                        | "en_us"
                                                        | "ja_jp";
                                                    common_categories?: Array<string>;
                                                    owner?: {
                                                        type: number;
                                                        owner_id?: string;
                                                        name?: string;
                                                        help_desk?: string;
                                                        email?: string;
                                                        phone?: string;
                                                        customer_service_account?: string;
                                                    };
                                                    mobile_default_ability?:
                                                        | "gadget"
                                                        | "web_app"
                                                        | "bot";
                                                    pc_default_ability?:
                                                        | "gadget"
                                                        | "web_app"
                                                        | "bot";
                                                    secret?: string;
                                                    event?: {
                                                        subscription_type?: string;
                                                        request_url?: string;
                                                        subscribed_events?: Array<string>;
                                                    };
                                                    callback?: {
                                                        callback_type?: string;
                                                        request_url?: string;
                                                        subscribed_callbacks?: Array<string>;
                                                    };
                                                    encryption?: {
                                                        encryption_key?: string;
                                                        verification_token?: string;
                                                    };
                                                    security?: {
                                                        redirect_urls?: Array<string>;
                                                        allowed_ips?: Array<string>;
                                                        h5_trusted_domains?: Array<string>;
                                                        web_view_trusted_domains?: Array<string>;
                                                        allowed_schemas?: Array<string>;
                                                        allowed_server_domains?: Array<string>;
                                                    };
                                                    allow_refresh_token?: boolean;
                                                    callback_info?: {
                                                        callback_type?:
                                                            | "webhook"
                                                            | "websocket";
                                                        request_url?: string;
                                                        subscribed_callbacks?: Array<string>;
                                                    };
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                                total_count?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=list&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=application&version=v6 document }
             *
             * 获取企业安装的应用
             *
             * 该接口用于查询企业安装的应用列表，只能被企业自建应用调用。
             */
            list: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: string;
                        lang: string;
                        status?: number;
                        payment_type?: number;
                        owner_type?: number;
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
                                app_list?: Array<{
                                    app_id: string;
                                    creator_id?: string;
                                    status?: number;
                                    scene_type?: number;
                                    payment_type?: number;
                                    create_source?:
                                        | "developer_console"
                                        | "base"
                                        | "app_engine"
                                        | "bot_builder"
                                        | "aily"
                                        | "unknown";
                                    redirect_urls?: Array<string>;
                                    online_version_id?: string;
                                    unaudit_version_id?: string;
                                    app_name?: string;
                                    avatar_url?: string;
                                    description?: string;
                                    scopes?: Array<{
                                        scope: string;
                                        description?: string;
                                        level?: number;
                                        token_types?: Array<"tenant" | "user">;
                                    }>;
                                    back_home_url?: string;
                                    i18n?: Array<{
                                        i18n_key:
                                            | "zh_cn"
                                            | "en_us"
                                            | "ja_jp"
                                            | "zh_hk"
                                            | "zh_tw"
                                            | "id_id"
                                            | "ms_my"
                                            | "de_de"
                                            | "es_es"
                                            | "fr_fr"
                                            | "it_it"
                                            | "pt_br"
                                            | "vi_vn"
                                            | "ru_ru"
                                            | "th_th"
                                            | "ko_kr";
                                        name?: string;
                                        description?: string;
                                        help_use?: string;
                                    }>;
                                    primary_language?:
                                        | "zh_cn"
                                        | "en_us"
                                        | "ja_jp";
                                    common_categories?: Array<string>;
                                    owner?: {
                                        type: number;
                                        owner_id?: string;
                                        name?: string;
                                        help_desk?: string;
                                        email?: string;
                                        phone?: string;
                                        customer_service_account?: string;
                                    };
                                    mobile_default_ability?:
                                        | "gadget"
                                        | "web_app"
                                        | "bot";
                                    pc_default_ability?:
                                        | "gadget"
                                        | "web_app"
                                        | "bot";
                                    secret?: string;
                                    event?: {
                                        subscription_type?: string;
                                        request_url?: string;
                                        subscribed_events?: Array<string>;
                                    };
                                    callback?: {
                                        callback_type?: string;
                                        request_url?: string;
                                        subscribed_callbacks?: Array<string>;
                                    };
                                    encryption?: {
                                        encryption_key?: string;
                                        verification_token?: string;
                                    };
                                    security?: {
                                        redirect_urls?: Array<string>;
                                        allowed_ips?: Array<string>;
                                        h5_trusted_domains?: Array<string>;
                                        web_view_trusted_domains?: Array<string>;
                                        allowed_schemas?: Array<string>;
                                        allowed_server_domains?: Array<string>;
                                    };
                                    allow_refresh_token?: boolean;
                                    callback_info?: {
                                        callback_type?: "webhook" | "websocket";
                                        request_url?: string;
                                        subscribed_callbacks?: Array<string>;
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                                total_count?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications`,
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=get&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=application&resource=application&version=v6 document }
             *
             * 获取应用信息
             *
             * 根据app_id获取应用的基础信息
             *
             * 商店应用必须正式发布版本后，才可以调用该接口获取应用信息。如果灰度发布应用，调用该接口将会报错 210504 错误码。
             */
            get: async (
                payload?: {
                    params: {
                        lang: "zh_cn" | "en_us" | "ja_jp";
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
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
                                app?: {
                                    app_id: string;
                                    creator_id?: string;
                                    status?: number;
                                    scene_type?: number;
                                    payment_type?: number;
                                    create_source?:
                                        | "developer_console"
                                        | "base"
                                        | "app_engine"
                                        | "bot_builder"
                                        | "aily"
                                        | "unknown";
                                    redirect_urls?: Array<string>;
                                    online_version_id?: string;
                                    unaudit_version_id?: string;
                                    app_name?: string;
                                    avatar_url?: string;
                                    description?: string;
                                    scopes?: Array<{
                                        scope: string;
                                        description?: string;
                                        level?: number;
                                        token_types?: Array<"tenant" | "user">;
                                    }>;
                                    back_home_url?: string;
                                    i18n?: Array<{
                                        i18n_key:
                                            | "zh_cn"
                                            | "en_us"
                                            | "ja_jp"
                                            | "zh_hk"
                                            | "zh_tw"
                                            | "id_id"
                                            | "ms_my"
                                            | "de_de"
                                            | "es_es"
                                            | "fr_fr"
                                            | "it_it"
                                            | "pt_br"
                                            | "vi_vn"
                                            | "ru_ru"
                                            | "th_th"
                                            | "ko_kr";
                                        name?: string;
                                        description?: string;
                                        help_use?: string;
                                    }>;
                                    primary_language?:
                                        | "zh_cn"
                                        | "en_us"
                                        | "ja_jp";
                                    common_categories?: Array<string>;
                                    owner?: {
                                        type: number;
                                        owner_id?: string;
                                        name?: string;
                                        help_desk?: string;
                                        email?: string;
                                        phone?: string;
                                        customer_service_account?: string;
                                    };
                                    mobile_default_ability?:
                                        | "gadget"
                                        | "web_app"
                                        | "bot";
                                    pc_default_ability?:
                                        | "gadget"
                                        | "web_app"
                                        | "bot";
                                    secret?: string;
                                    event?: {
                                        subscription_type?: string;
                                        request_url?: string;
                                        subscribed_events?: Array<string>;
                                    };
                                    callback?: {
                                        callback_type?: string;
                                        request_url?: string;
                                        subscribed_callbacks?: Array<string>;
                                    };
                                    encryption?: {
                                        encryption_key?: string;
                                        verification_token?: string;
                                    };
                                    security?: {
                                        redirect_urls?: Array<string>;
                                        allowed_ips?: Array<string>;
                                        h5_trusted_domains?: Array<string>;
                                        web_view_trusted_domains?: Array<string>;
                                        allowed_schemas?: Array<string>;
                                        allowed_server_domains?: Array<string>;
                                    };
                                    allow_refresh_token?: boolean;
                                    callback_info?: {
                                        callback_type?: "webhook" | "websocket";
                                        request_url?: string;
                                        subscribed_callbacks?: Array<string>;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=patch&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application&version=v6 document }
             *
             * 更新应用分组信息
             *
             * 更新应用的分组信息（分组会影响应用在工作台中的分类情况，请谨慎更新）
             */
            patch: async (
                payload?: {
                    data?: {
                        common_categories?: Array<string>;
                        secret?: string;
                        event?: {
                            subscription_type?: string;
                            request_url?: string;
                            subscribed_events?: Array<string>;
                        };
                        callback?: {
                            callback_type?: string;
                            request_url?: string;
                            subscribed_callbacks?: Array<string>;
                        };
                        encryption?: {
                            encryption_key?: string;
                            verification_token?: string;
                        };
                        security?: {
                            redirect_urls?: Array<string>;
                            allowed_ips?: Array<string>;
                            h5_trusted_domains?: Array<string>;
                            web_view_trusted_domains?: Array<string>;
                            allowed_schemas?: Array<string>;
                            allowed_server_domains?: Array<string>;
                        };
                        allow_refresh_token?: boolean;
                        callback_info?: {
                            callback_type?: "webhook" | "websocket";
                            request_url?: string;
                            subscribed_callbacks?: Array<string>;
                        };
                    };
                    params: { lang: "zh_cn" | "en_us" | "ja_jp" };
                    path: { app_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id`,
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
            underauditlistWithIterator: async (
                payload?: {
                    params: {
                        lang: "zh_cn" | "en_us" | "ja_jp";
                        page_token?: string;
                        page_size?: number;
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
                                `${this.domain}/open-apis/application/v6/applications/underauditlist`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                items: Array<{
                                                    app_id: string;
                                                    creator_id?: string;
                                                    status?: number;
                                                    scene_type?: number;
                                                    payment_type?: number;
                                                    create_source?:
                                                        | "developer_console"
                                                        | "base"
                                                        | "app_engine"
                                                        | "bot_builder"
                                                        | "aily"
                                                        | "unknown";
                                                    redirect_urls?: Array<string>;
                                                    online_version_id?: string;
                                                    unaudit_version_id?: string;
                                                    app_name?: string;
                                                    avatar_url?: string;
                                                    description?: string;
                                                    scopes?: Array<{
                                                        scope: string;
                                                        description?: string;
                                                        level?: number;
                                                        token_types?: Array<
                                                            "tenant" | "user"
                                                        >;
                                                    }>;
                                                    back_home_url?: string;
                                                    i18n?: Array<{
                                                        i18n_key:
                                                            | "zh_cn"
                                                            | "en_us"
                                                            | "ja_jp"
                                                            | "zh_hk"
                                                            | "zh_tw"
                                                            | "id_id"
                                                            | "ms_my"
                                                            | "de_de"
                                                            | "es_es"
                                                            | "fr_fr"
                                                            | "it_it"
                                                            | "pt_br"
                                                            | "vi_vn"
                                                            | "ru_ru"
                                                            | "th_th"
                                                            | "ko_kr";
                                                        name?: string;
                                                        description?: string;
                                                        help_use?: string;
                                                    }>;
                                                    primary_language?:
                                                        | "zh_cn"
                                                        | "en_us"
                                                        | "ja_jp";
                                                    common_categories?: Array<string>;
                                                    owner?: {
                                                        type: number;
                                                        owner_id?: string;
                                                        name?: string;
                                                        help_desk?: string;
                                                        email?: string;
                                                        phone?: string;
                                                        customer_service_account?: string;
                                                    };
                                                    mobile_default_ability?:
                                                        | "gadget"
                                                        | "web_app"
                                                        | "bot";
                                                    pc_default_ability?:
                                                        | "gadget"
                                                        | "web_app"
                                                        | "bot";
                                                    secret?: string;
                                                    event?: {
                                                        subscription_type?: string;
                                                        request_url?: string;
                                                        subscribed_events?: Array<string>;
                                                    };
                                                    callback?: {
                                                        callback_type?: string;
                                                        request_url?: string;
                                                        subscribed_callbacks?: Array<string>;
                                                    };
                                                    encryption?: {
                                                        encryption_key?: string;
                                                        verification_token?: string;
                                                    };
                                                    security?: {
                                                        redirect_urls?: Array<string>;
                                                        allowed_ips?: Array<string>;
                                                        h5_trusted_domains?: Array<string>;
                                                        web_view_trusted_domains?: Array<string>;
                                                        allowed_schemas?: Array<string>;
                                                        allowed_server_domains?: Array<string>;
                                                    };
                                                    allow_refresh_token?: boolean;
                                                    callback_info?: {
                                                        callback_type?:
                                                            | "webhook"
                                                            | "websocket";
                                                        request_url?: string;
                                                        subscribed_callbacks?: Array<string>;
                                                    };
                                                }>;
                                                has_more: boolean;
                                                page_token?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=underauditlist&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=underauditlist&project=application&resource=application&version=v6 document }
             *
             * 查看待审核的应用列表
             *
             * 查看本企业下所有待审核的自建应用列表
             */
            underauditlist: async (
                payload?: {
                    params: {
                        lang: "zh_cn" | "en_us" | "ja_jp";
                        page_token?: string;
                        page_size?: number;
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
                                items: Array<{
                                    app_id: string;
                                    creator_id?: string;
                                    status?: number;
                                    scene_type?: number;
                                    payment_type?: number;
                                    create_source?:
                                        | "developer_console"
                                        | "base"
                                        | "app_engine"
                                        | "bot_builder"
                                        | "aily"
                                        | "unknown";
                                    redirect_urls?: Array<string>;
                                    online_version_id?: string;
                                    unaudit_version_id?: string;
                                    app_name?: string;
                                    avatar_url?: string;
                                    description?: string;
                                    scopes?: Array<{
                                        scope: string;
                                        description?: string;
                                        level?: number;
                                        token_types?: Array<"tenant" | "user">;
                                    }>;
                                    back_home_url?: string;
                                    i18n?: Array<{
                                        i18n_key:
                                            | "zh_cn"
                                            | "en_us"
                                            | "ja_jp"
                                            | "zh_hk"
                                            | "zh_tw"
                                            | "id_id"
                                            | "ms_my"
                                            | "de_de"
                                            | "es_es"
                                            | "fr_fr"
                                            | "it_it"
                                            | "pt_br"
                                            | "vi_vn"
                                            | "ru_ru"
                                            | "th_th"
                                            | "ko_kr";
                                        name?: string;
                                        description?: string;
                                        help_use?: string;
                                    }>;
                                    primary_language?:
                                        | "zh_cn"
                                        | "en_us"
                                        | "ja_jp";
                                    common_categories?: Array<string>;
                                    owner?: {
                                        type: number;
                                        owner_id?: string;
                                        name?: string;
                                        help_desk?: string;
                                        email?: string;
                                        phone?: string;
                                        customer_service_account?: string;
                                    };
                                    mobile_default_ability?:
                                        | "gadget"
                                        | "web_app"
                                        | "bot";
                                    pc_default_ability?:
                                        | "gadget"
                                        | "web_app"
                                        | "bot";
                                    secret?: string;
                                    event?: {
                                        subscription_type?: string;
                                        request_url?: string;
                                        subscribed_events?: Array<string>;
                                    };
                                    callback?: {
                                        callback_type?: string;
                                        request_url?: string;
                                        subscribed_callbacks?: Array<string>;
                                    };
                                    encryption?: {
                                        encryption_key?: string;
                                        verification_token?: string;
                                    };
                                    security?: {
                                        redirect_urls?: Array<string>;
                                        allowed_ips?: Array<string>;
                                        h5_trusted_domains?: Array<string>;
                                        web_view_trusted_domains?: Array<string>;
                                        allowed_schemas?: Array<string>;
                                        allowed_server_domains?: Array<string>;
                                    };
                                    allow_refresh_token?: boolean;
                                    callback_info?: {
                                        callback_type?: "webhook" | "websocket";
                                        request_url?: string;
                                        subscribed_callbacks?: Array<string>;
                                    };
                                }>;
                                has_more: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/underauditlist`,
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
        applicationAppVersion: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=contacts_range_suggest&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=contacts_range_suggest&project=application&resource=application.app_version&version=v6 document }
             *
             * 获取应用版本中开发者申请的通讯录权限范围
             *
             * 该接口用于根据应用的 App ID 和版本 ID 获取企业自建应用某个版本的通讯录权限范围。
             *
             * 由于通讯录权限范围需要提交发布新的应用版本，并且企业管理员审核通过后才会生效，因此该权限范围可能与实际生效的权限范围有差别，如需获取线上实际生效的通讯录权限范围，可通过[获取应用通讯录权限范围配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/contacts_range_configuration) 获取。
             */
            contactsRangeSuggest: async (
                payload?: {
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { app_id: string; version_id: string };
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
                                contacts_range?: {
                                    contacts_scope_type?:
                                        | "equal_to_availability"
                                        | "some"
                                        | "all";
                                    visible_list?: {
                                        open_ids?: Array<string>;
                                        department_ids?: Array<string>;
                                        group_ids?: Array<string>;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/app_versions/:version_id/contacts_range_suggest`,
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=patch&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.app_version&version=v6 document }
             *
             * 更新应用审核状态
             *
             * 通过接口来更新应用版本的审核结果：通过后应用可以直接上架；拒绝后则开发者可以看到拒绝理由，并在修改后再次申请发布。
             */
            patch: async (
                payload?: {
                    data?: { status?: number };
                    params: {
                        user_id_type: "user_id" | "union_id" | "open_id";
                        operator_id: string;
                        reject_reason?: string;
                    };
                    path: { app_id: string; version_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/app_versions/:version_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=get&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=application&resource=application.app_version&version=v6 document }
             *
             * 获取应用版本信息
             *
             * 根据应用 ID 和应用版本 ID 来获取同租户下的应用版本的信息
             */
            get: async (
                payload?: {
                    params: {
                        lang: "zh_cn" | "en_us" | "ja_jp";
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { app_id: string; version_id: string };
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
                                app_version?: {
                                    app_id: string;
                                    version?: string;
                                    version_id: string;
                                    app_name?: string;
                                    avatar_url?: string;
                                    description?: string;
                                    scopes?: Array<{
                                        scope: string;
                                        description?: string;
                                        level?: number;
                                        token_types?: Array<"tenant" | "user">;
                                    }>;
                                    back_home_url?: string;
                                    i18n?: Array<{
                                        i18n_key:
                                            | "zh_cn"
                                            | "en_us"
                                            | "ja_jp"
                                            | "zh_hk"
                                            | "zh_tw"
                                            | "id_id"
                                            | "ms_my"
                                            | "de_de"
                                            | "es_es"
                                            | "fr_fr"
                                            | "it_it"
                                            | "pt_br"
                                            | "vi_vn"
                                            | "ru_ru"
                                            | "th_th"
                                            | "ko_kr";
                                        name?: string;
                                        description?: string;
                                        help_use?: string;
                                    }>;
                                    common_categories?: Array<string>;
                                    events?: Array<string>;
                                    status?: number;
                                    create_time?: string;
                                    publish_time?: string;
                                    ability?: {
                                        gadget?: {
                                            enable_pc_mode?: number;
                                            schema_urls?: Array<string>;
                                            pc_use_mobile_pkg?: boolean;
                                            pc_version?: string;
                                            mobile_version?: string;
                                            mobile_min_lark_version?: string;
                                            pc_min_lark_version?: string;
                                        };
                                        web_app?: {
                                            pc_url?: string;
                                            mobile_url?: string;
                                        };
                                        bot?: {
                                            card_request_url?: string;
                                            bot_menu_enable?: boolean;
                                            bot_menus?: Array<{
                                                menu_id?: string;
                                                parent_menu_id?: string;
                                                sort?: number;
                                                default_name?: string;
                                                i18n_name?: Record<
                                                    string,
                                                    string
                                                >;
                                                redirect_link?: {
                                                    pc_url?: string;
                                                    mobile_url?: string;
                                                };
                                                event_key?: string;
                                                icon_file_key?: string;
                                                ud_icon?: {
                                                    token?: string;
                                                    color?: string;
                                                };
                                                menu_content_type?: number;
                                            }>;
                                            bot_menu_display_strategy?: number;
                                        };
                                        workplace_widgets?: Array<{
                                            min_lark_version?: string;
                                        }>;
                                        navigate?: {
                                            pc?: {
                                                version?: string;
                                                image_url?: string;
                                                hover_image_url?: string;
                                            };
                                            mobile?: {
                                                version?: string;
                                                image_url?: string;
                                                hover_image_url?: string;
                                            };
                                        };
                                        cloud_doc?: {
                                            space_url?: string;
                                            i18n?: Array<{
                                                i18n_key:
                                                    | "zh_cn"
                                                    | "en_us"
                                                    | "ja_jp";
                                                name?: string;
                                                read_description?: string;
                                                write_description?: string;
                                            }>;
                                            icon_url?: string;
                                            mode?: number;
                                        };
                                        docs_blocks?: Array<{
                                            block_type_id?: string;
                                            i18n?: Array<{
                                                i18n_key?:
                                                    | "zh_cn"
                                                    | "en_us"
                                                    | "ja_jp";
                                                name?: string;
                                            }>;
                                            mobile_icon_url?: string;
                                            pc_icon_url?: string;
                                        }>;
                                        message_action?: {
                                            pc_app_link?: string;
                                            mobile_app_link?: string;
                                            i18n?: Array<{
                                                i18n_key?:
                                                    | "zh_cn"
                                                    | "en_us"
                                                    | "ja_jp";
                                                name?: string;
                                            }>;
                                        };
                                        plus_menu?: {
                                            pc_app_link?: string;
                                            mobile_app_link?: string;
                                        };
                                    };
                                    remark?: {
                                        remark?: string;
                                        update_remark?: string;
                                        visibility?: {
                                            is_all?: boolean;
                                            visible_list?: {
                                                open_ids?: Array<string>;
                                                department_ids?: Array<string>;
                                                group_ids?: Array<string>;
                                            };
                                            invisible_list?: {
                                                open_ids?: Array<string>;
                                                department_ids?: Array<string>;
                                                group_ids?: Array<string>;
                                            };
                                        };
                                    };
                                    event_infos?: Array<{
                                        event_type?: string;
                                        event_name?: string;
                                        event_description?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/app_versions/:version_id`,
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
                    params: {
                        lang: "zh_cn" | "en_us" | "ja_jp";
                        page_size?: number;
                        page_token?: string;
                        order?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { app_id: string };
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
                                `${this.domain}/open-apis/application/v6/applications/:app_id/app_versions`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                    app_id: string;
                                                    version?: string;
                                                    version_id: string;
                                                    app_name?: string;
                                                    avatar_url?: string;
                                                    description?: string;
                                                    scopes?: Array<{
                                                        scope: string;
                                                        description?: string;
                                                        level?: number;
                                                        token_types?: Array<
                                                            "tenant" | "user"
                                                        >;
                                                    }>;
                                                    back_home_url?: string;
                                                    i18n?: Array<{
                                                        i18n_key:
                                                            | "zh_cn"
                                                            | "en_us"
                                                            | "ja_jp"
                                                            | "zh_hk"
                                                            | "zh_tw"
                                                            | "id_id"
                                                            | "ms_my"
                                                            | "de_de"
                                                            | "es_es"
                                                            | "fr_fr"
                                                            | "it_it"
                                                            | "pt_br"
                                                            | "vi_vn"
                                                            | "ru_ru"
                                                            | "th_th"
                                                            | "ko_kr";
                                                        name?: string;
                                                        description?: string;
                                                        help_use?: string;
                                                    }>;
                                                    common_categories?: Array<string>;
                                                    events?: Array<string>;
                                                    status?: number;
                                                    create_time?: string;
                                                    publish_time?: string;
                                                    ability?: {
                                                        gadget?: {
                                                            enable_pc_mode?: number;
                                                            schema_urls?: Array<string>;
                                                            pc_use_mobile_pkg?: boolean;
                                                            pc_version?: string;
                                                            mobile_version?: string;
                                                            mobile_min_lark_version?: string;
                                                            pc_min_lark_version?: string;
                                                        };
                                                        web_app?: {
                                                            pc_url?: string;
                                                            mobile_url?: string;
                                                        };
                                                        bot?: {
                                                            card_request_url?: string;
                                                            bot_menu_enable?: boolean;
                                                            bot_menus?: Array<{
                                                                menu_id?: string;
                                                                parent_menu_id?: string;
                                                                sort?: number;
                                                                default_name?: string;
                                                                i18n_name?: Record<
                                                                    string,
                                                                    string
                                                                >;
                                                                redirect_link?: {
                                                                    pc_url?: string;
                                                                    mobile_url?: string;
                                                                };
                                                                event_key?: string;
                                                                icon_file_key?: string;
                                                                ud_icon?: {
                                                                    token?: string;
                                                                    color?: string;
                                                                };
                                                                menu_content_type?: number;
                                                            }>;
                                                            bot_menu_display_strategy?: number;
                                                        };
                                                        workplace_widgets?: Array<{
                                                            min_lark_version?: string;
                                                        }>;
                                                        navigate?: {
                                                            pc?: {
                                                                version?: string;
                                                                image_url?: string;
                                                                hover_image_url?: string;
                                                            };
                                                            mobile?: {
                                                                version?: string;
                                                                image_url?: string;
                                                                hover_image_url?: string;
                                                            };
                                                        };
                                                        cloud_doc?: {
                                                            space_url?: string;
                                                            i18n?: Array<{
                                                                i18n_key:
                                                                    | "zh_cn"
                                                                    | "en_us"
                                                                    | "ja_jp";
                                                                name?: string;
                                                                read_description?: string;
                                                                write_description?: string;
                                                            }>;
                                                            icon_url?: string;
                                                            mode?: number;
                                                        };
                                                        docs_blocks?: Array<{
                                                            block_type_id?: string;
                                                            i18n?: Array<{
                                                                i18n_key?:
                                                                    | "zh_cn"
                                                                    | "en_us"
                                                                    | "ja_jp";
                                                                name?: string;
                                                            }>;
                                                            mobile_icon_url?: string;
                                                            pc_icon_url?: string;
                                                        }>;
                                                        message_action?: {
                                                            pc_app_link?: string;
                                                            mobile_app_link?: string;
                                                            i18n?: Array<{
                                                                i18n_key?:
                                                                    | "zh_cn"
                                                                    | "en_us"
                                                                    | "ja_jp";
                                                                name?: string;
                                                            }>;
                                                        };
                                                        plus_menu?: {
                                                            pc_app_link?: string;
                                                            mobile_app_link?: string;
                                                        };
                                                    };
                                                    remark?: {
                                                        remark?: string;
                                                        update_remark?: string;
                                                        visibility?: {
                                                            is_all?: boolean;
                                                            visible_list?: {
                                                                open_ids?: Array<string>;
                                                                department_ids?: Array<string>;
                                                                group_ids?: Array<string>;
                                                            };
                                                            invisible_list?: {
                                                                open_ids?: Array<string>;
                                                                department_ids?: Array<string>;
                                                                group_ids?: Array<string>;
                                                            };
                                                        };
                                                    };
                                                    event_infos?: Array<{
                                                        event_type?: string;
                                                        event_name?: string;
                                                        event_description?: string;
                                                    }>;
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=list&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=application.app_version&version=v6 document }
             *
             * 获取应用版本列表
             *
             * 根据 app_id 获取对应应用版本列表。
             */
            list: async (
                payload?: {
                    params: {
                        lang: "zh_cn" | "en_us" | "ja_jp";
                        page_size?: number;
                        page_token?: string;
                        order?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
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
                                items?: Array<{
                                    app_id: string;
                                    version?: string;
                                    version_id: string;
                                    app_name?: string;
                                    avatar_url?: string;
                                    description?: string;
                                    scopes?: Array<{
                                        scope: string;
                                        description?: string;
                                        level?: number;
                                        token_types?: Array<"tenant" | "user">;
                                    }>;
                                    back_home_url?: string;
                                    i18n?: Array<{
                                        i18n_key:
                                            | "zh_cn"
                                            | "en_us"
                                            | "ja_jp"
                                            | "zh_hk"
                                            | "zh_tw"
                                            | "id_id"
                                            | "ms_my"
                                            | "de_de"
                                            | "es_es"
                                            | "fr_fr"
                                            | "it_it"
                                            | "pt_br"
                                            | "vi_vn"
                                            | "ru_ru"
                                            | "th_th"
                                            | "ko_kr";
                                        name?: string;
                                        description?: string;
                                        help_use?: string;
                                    }>;
                                    common_categories?: Array<string>;
                                    events?: Array<string>;
                                    status?: number;
                                    create_time?: string;
                                    publish_time?: string;
                                    ability?: {
                                        gadget?: {
                                            enable_pc_mode?: number;
                                            schema_urls?: Array<string>;
                                            pc_use_mobile_pkg?: boolean;
                                            pc_version?: string;
                                            mobile_version?: string;
                                            mobile_min_lark_version?: string;
                                            pc_min_lark_version?: string;
                                        };
                                        web_app?: {
                                            pc_url?: string;
                                            mobile_url?: string;
                                        };
                                        bot?: {
                                            card_request_url?: string;
                                            bot_menu_enable?: boolean;
                                            bot_menus?: Array<{
                                                menu_id?: string;
                                                parent_menu_id?: string;
                                                sort?: number;
                                                default_name?: string;
                                                i18n_name?: Record<
                                                    string,
                                                    string
                                                >;
                                                redirect_link?: {
                                                    pc_url?: string;
                                                    mobile_url?: string;
                                                };
                                                event_key?: string;
                                                icon_file_key?: string;
                                                ud_icon?: {
                                                    token?: string;
                                                    color?: string;
                                                };
                                                menu_content_type?: number;
                                            }>;
                                            bot_menu_display_strategy?: number;
                                        };
                                        workplace_widgets?: Array<{
                                            min_lark_version?: string;
                                        }>;
                                        navigate?: {
                                            pc?: {
                                                version?: string;
                                                image_url?: string;
                                                hover_image_url?: string;
                                            };
                                            mobile?: {
                                                version?: string;
                                                image_url?: string;
                                                hover_image_url?: string;
                                            };
                                        };
                                        cloud_doc?: {
                                            space_url?: string;
                                            i18n?: Array<{
                                                i18n_key:
                                                    | "zh_cn"
                                                    | "en_us"
                                                    | "ja_jp";
                                                name?: string;
                                                read_description?: string;
                                                write_description?: string;
                                            }>;
                                            icon_url?: string;
                                            mode?: number;
                                        };
                                        docs_blocks?: Array<{
                                            block_type_id?: string;
                                            i18n?: Array<{
                                                i18n_key?:
                                                    | "zh_cn"
                                                    | "en_us"
                                                    | "ja_jp";
                                                name?: string;
                                            }>;
                                            mobile_icon_url?: string;
                                            pc_icon_url?: string;
                                        }>;
                                        message_action?: {
                                            pc_app_link?: string;
                                            mobile_app_link?: string;
                                            i18n?: Array<{
                                                i18n_key?:
                                                    | "zh_cn"
                                                    | "en_us"
                                                    | "ja_jp";
                                                name?: string;
                                            }>;
                                        };
                                        plus_menu?: {
                                            pc_app_link?: string;
                                            mobile_app_link?: string;
                                        };
                                    };
                                    remark?: {
                                        remark?: string;
                                        update_remark?: string;
                                        visibility?: {
                                            is_all?: boolean;
                                            visible_list?: {
                                                open_ids?: Array<string>;
                                                department_ids?: Array<string>;
                                                group_ids?: Array<string>;
                                            };
                                            invisible_list?: {
                                                open_ids?: Array<string>;
                                                department_ids?: Array<string>;
                                                group_ids?: Array<string>;
                                            };
                                        };
                                    };
                                    event_infos?: Array<{
                                        event_type?: string;
                                        event_name?: string;
                                        event_description?: string;
                                    }>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/app_versions`,
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
        applicationOpenapiOptions: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.openapi_options&apiName=get&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=application&resource=application.openapi_options&version=v6 document }
             *
             * 获取应用下OpenAPI管控选项
             *
             * 根据app_id获取应用下OpenAPI管控选项，目前支持选项有"可访问性"，接口返回通过 [更新应用下OpenAPI管控选项](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-openapi_options/patch) 更新的最新数据，包含访问状态为停用("Disable") 与启用("Enable") 所有OpenAPI管控选项。
             *
             * 支持获取企业内自建应用OpenAPI管控选项，仅企业内特定应用可申请权限调用此OpenAPI。
             */
            get: async (
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
                                openapi_options?: Array<{
                                    http_method: string;
                                    url_pattern: string;
                                    accessibility: {
                                        reason?: string;
                                        state: string;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/openapi_options`,
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.openapi_options&apiName=patch&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.openapi_options&version=v6 document }
             *
             * 更新应用下OpenAPI管控选项
             *
             * 根据app_id更新应用下OpenAPI管控选项，目前支持选项有"可访问性"。
             *
             * 支持更新企业内自建应用OpenAPI管控选项，仅企业内特定应用可申请权限调用此OpenAPI。
             */
            patch: async (
                payload?: {
                    data: {
                        openapi_options: Array<{
                            http_method: string;
                            url_pattern: string;
                            accessibility: { reason?: string; state: string };
                        }>;
                    };
                    path: { app_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/openapi_options`,
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
        applicationContactsRange: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.contacts_range&apiName=patch&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.contacts_range&version=v6 document }
             *
             * 更新应用通讯录权限范围配置
             *
             * 该接口用于更新当前企业内自建应用或已安装的商店应用的通讯录权限范围配置。更新后线上立即生效。
             */
            patch: async (
                payload?: {
                    data: {
                        contacts_range_type:
                            | "equal_to_availability"
                            | "some"
                            | "all";
                        add_visible_list?: {
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                            group_ids?: Array<string>;
                        };
                        del_visible_list?: {
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                            group_ids?: Array<string>;
                        };
                    };
                    params?: {
                        user_id_type?: "open_id" | "user_id" | "union_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                    };
                    path: { app_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/contacts_range`,
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
        applicationAppSecret: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_secret&apiName=create&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=application&resource=application.app_secret&version=v6 document }
             *
             * 刷新企业内自建应用的app secret
             *
             * 该接口用于管理与刷新企业内自建应用app secret
             */
            create: async (
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
                            data?: { app_secret?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/app_secret`,
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
        applicationCollaborators: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.collaborators&apiName=get&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=application&resource=application.collaborators&version=v6 document }
             *
             * 获取应用协作者列表
             *
             * 根据 app_id 获取应用（包括自建应用和商店应用）的协作者信息，包括应用的所有者、管理员、开发者、运营人员
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
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
                                collaborators?: Array<{
                                    type:
                                        | "administrator"
                                        | "developer"
                                        | "operator";
                                    user_id: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/collaborators`,
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.collaborators&apiName=update&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=application&resource=application.collaborators&version=v6 document }
             *
             * 更新应用协作者
             *
             * 某个应用（包括自建应用和商店应用）中添加/移除应用协作者，添加后协作者将会收到添加通知。
             *
             * 若用 user_access_token 代表某个终端用户操作API，则需确保该用户为应用的所有者或管理员，否则无法操作成功。
             */
            update: async (
                payload?: {
                    data?: {
                        adds?: Array<{
                            type: "administrator" | "developer" | "operator";
                            user_id: string;
                        }>;
                        removes?: Array<string>;
                    };
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path: { app_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/collaborators`,
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
        applicationOwner: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.owner&apiName=update&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=application&resource=application.owner&version=v6 document }
             *
             * 转移应用所有者
             *
             * 将某个自建应用的所有者转移给另外一个人。
             *
             * 若用 user_access_token 代表某个终端用户操作API，则需确保该用户为应用当前的所有者，否则无法操作成功。
             */
            update: async (
                payload?: {
                    data: { owner_id: string };
                    params?: {
                        user_id_type?: "open_id" | "user_id" | "union_id";
                    };
                    path: { app_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/owner`,
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
        appAvatar: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_avatar&apiName=upload&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=application&resource=app_avatar&version=v6 document }
             *
             * 上传应用图标
             *
             * 上传应用图标
             */
            upload: async (
                payload?: {
                    data: { avatar: Buffer | fs.ReadStream };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<
                        any,
                        { code?: number; msg?: string; data?: { url?: string } }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/app_avatar/upload`,
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
        applicationAbility: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.ability&apiName=patch&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.ability&version=v6 document }
             *
             * 更新应用能力
             *
             * 通过该接口可更新自建应用的应用能力（机器人、网页应用等）相关配置，不传入的参数则保持不变，仅针对传入的参数则进行更新。如果应用正在审核中，则无法更新配置
             *
             * - 仅支持更新[开发者后台](https://open.feishu.cn/app)创建的自建应用，不包含通过机器人助手等其他渠道创建的自建应用;- 应用配置修改后需要[提交发布](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-publish/create)，并审核通过后才会在线上生效;;- 若用 user_access_token 代表某个终端用户操作API，则需确保该用户为应用的所有者、管理员、开发者，否则无法操作成功;;- 若用 tenant_access_token 代表应用操作API，则可以操作企业内的任何一个自建应用
             */
            patch: async (
                payload?: {
                    data?: {
                        web_app?: {
                            enable: boolean;
                            pc_url?: string;
                            pc_new_page_open_mode?: "new_tab" | "browser";
                            mobile_url?: string;
                        };
                        bot?: {
                            enable: boolean;
                            message_card_callback_url?: string;
                            i18ns?: Array<{
                                i18n_key:
                                    | "zh_cn"
                                    | "en_us"
                                    | "ja_jp"
                                    | "zh_hk"
                                    | "zh_tw"
                                    | "id_id"
                                    | "ms_my"
                                    | "de_de"
                                    | "es_es"
                                    | "fr_fr"
                                    | "it_it"
                                    | "pt_br"
                                    | "vi_vn"
                                    | "ru_ru"
                                    | "th_th"
                                    | "ko_kr";
                                get_started_desc: string;
                            }>;
                        };
                    };
                    path: { app_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/ability`,
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
        applicationBase: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.base&apiName=patch&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.base&version=v6 document }
             *
             * 更新应用基础信息配置
             *
             * 通过该接口可更新自建应用的基础信息（名称、头像等），不传入的参数则保持不变，仅针对传入的参数则进行更新。如果应用正在审核中，则无法更新配置
             *
             * - 仅支持更新[开发者后台](https://open.feishu.cn/app)创建的自建应用，不包含通过机器人助手等其他渠道创建的自建应用;- 应用配置修改后需要[提交发布](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-publish/create)，并审核通过后才会在线上生效;;- 若用 user_access_token 代表某个终端用户操作API，则需确保该用户为应用的所有者、管理员、开发者，否则无法操作成功;;- 若用 tenant_access_token 代表应用操作API，则可以操作企业内的任何一个自建应用
             */
            patch: async (
                payload?: {
                    data?: {
                        i18ns?: Array<{
                            i18n_key:
                                | "zh_cn"
                                | "en_us"
                                | "ja_jp"
                                | "zh_hk"
                                | "zh_tw"
                                | "id_id"
                                | "ms_my"
                                | "de_de"
                                | "es_es"
                                | "fr_fr"
                                | "it_it"
                                | "pt_br"
                                | "vi_vn"
                                | "ru_ru"
                                | "th_th"
                                | "ko_kr";
                            name?: string;
                            description?: string;
                            help_use?: string;
                        }>;
                        avatar_url?: string;
                        homepage_url?: string;
                    };
                    path: { app_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/base`,
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
        applicationPublish: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.publish&apiName=create&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=application&resource=application.publish&version=v6 document }
             *
             * 提交发布自建应用
             *
             * 自建应用提交应用发布，如果当前自建应用没有待发布的版本，则会自动创建一个版本，如果有待发布的版本，则直接提交该版本。
             *
             * 仅支持发布[开发者后台](https://open.feishu.cn/app)创建的自建应用，不包含通过机器人助手等其他渠道创建的自建应用;;- 若用 user_access_token 代表某个终端用户操作API，则需确保该用户为应用的所有者、管理员，否则无法操作成功;;- 若用 tenant_access_token 代表应用操作API，则可以操作企业内的任何一个自建应用
             */
            create: async (
                payload?: {
                    data: {
                        mobile_default_ability?: "gadget" | "web_app" | "bot";
                        pc_default_ability?: "gadget" | "web_app" | "bot";
                        remark: string;
                        changelog: string;
                        version?: string;
                    };
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
                            data?: { version_id?: string; version?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/publish`,
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
        applicationManagement: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.management&apiName=update&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=application&resource=application.management&version=v6 document }
             *
             * 启停用应用
             *
             * 可停用或启用企业内已安装的自建应用与商店应用。
             */
            update: async (
                payload?: {
                    data?: { enable?: boolean };
                    path: { app_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/management`,
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
        scope: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=scope&apiName=list&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=scope&version=v6 document }
             *
             * 查询租户授权状态
             *
             * 调用该接口查询当前应用向租户申请授权的状态。
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
                                scopes?: Array<{
                                    scope_name: string;
                                    grant_status: number;
                                    scope_type?: "tenant" | "user";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/scopes`,
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=scope&apiName=apply&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=apply&project=application&resource=scope&version=v6 document }
             *
             * 向管理员申请授权
             *
             * 调用该接口以应用身份向租户管理员申请应用内需要审核的 API 权限。
             *
             * **注意**：同一租户下，其他员工在一个应用的同一个版本向管理员申请授权的次数不能超过 10 次。
             */
            apply: async (payload?: {}, options?: IRequestOptions) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/scopes/apply`,
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
        appCustomCategory: {
            listWithIterator: async (
                payload?: {
                    params: {
                        lang: "zh_cn" | "en_us" | "ja_jp";
                        page_token?: string;
                        page_size?: number;
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
                                `${this.domain}/open-apis/application/v6/app_custom_categories`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                items: Array<{
                                                    i18n_key:
                                                        | "zh_cn"
                                                        | "en_us"
                                                        | "ja_jp";
                                                    description: string;
                                                    app_ids?: Array<string>;
                                                }>;
                                                has_more: boolean;
                                                page_token?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_custom_category&apiName=list&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=app_custom_category&version=v6 document }
             *
             * 获取当前设置的自定义分组列表
             *
             * 获取当前设置的自定义分组列表。
             */
            list: async (
                payload?: {
                    params: {
                        lang: "zh_cn" | "en_us" | "ja_jp";
                        page_token?: string;
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
                                items: Array<{
                                    i18n_key: "zh_cn" | "en_us" | "ja_jp";
                                    description: string;
                                    app_ids?: Array<string>;
                                }>;
                                has_more: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/app_custom_categories`,
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
        appBadge: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_badge&apiName=set&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=set&project=application&resource=app_badge&version=v6 document }
             *
             * 更新应用红点
             *
             * 更新应用红点信息，用于工作台场景
             */
            set: async (
                payload?: {
                    data: {
                        user_id: string;
                        version: string;
                        extra?: string;
                        pc?: { web_app?: number; gadget?: number };
                        mobile?: { web_app?: number; gadget?: number };
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
                            `${this.domain}/open-apis/application/v6/app_badge/set`,
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
        appAdminUser: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        admin_type?: string;
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
                                `${this.domain}/open-apis/application/v6/app_admin_users`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                user_list?: Array<{
                                                    admin_type?: Array<string>;
                                                    user_id?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_admin_user&apiName=list&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=app_admin_user&version=v6 document }
             *
             * 查询应用管理员列表（新）
             *
             * 查询审核应用的管理员列表，返回 所有 管理员账户列表；返回管理员的角色（超级管理员或管理员）以及 用户ID。提示：如果该管理员同时是超级管理员 又是管理员，则同时返回两个角色。
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        admin_type?: string;
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
                                user_list?: Array<{
                                    admin_type?: Array<string>;
                                    user_id?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/app_admin_users`,
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
        botDisplayInfo: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=bot_display_info&apiName=mget&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=application&resource=bot_display_info&version=v6 document }
             */
            mget: async (
                payload?: {
                    data?: { bot_ids?: Array<string> };
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
                                bot_infos?: Record<
                                    string,
                                    {
                                        id?: string;
                                        name?: string;
                                        avatar_url?: string;
                                        tenant_id?: string;
                                        i18n_names?: Record<string, string>;
                                        i18n_descriptions?: Record<
                                            string,
                                            string
                                        >;
                                    }
                                >;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/bot_display_info/mget`,
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
        userVisibleApplication: {
            listWithIterator: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "open_id" | "user_id" | "union_id";
                        user_id: string;
                        lang?:
                            | "zh_cn"
                            | "en_us"
                            | "ja_jp"
                            | "zh_hk"
                            | "zh_tw"
                            | "id_id"
                            | "ms_my"
                            | "de_de"
                            | "es_es"
                            | "fr_fr"
                            | "it_it"
                            | "pt_br"
                            | "vi_vn"
                            | "ru_ru"
                            | "th_th"
                            | "ko_kr";
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
                                `${this.domain}/open-apis/application/v6/user_visible_applications`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                    app_id: string;
                                                    creator_id?: string;
                                                    status?: number;
                                                    scene_type?: number;
                                                    payment_type?: number;
                                                    create_source?:
                                                        | "developer_console"
                                                        | "base"
                                                        | "app_engine"
                                                        | "bot_builder"
                                                        | "aily"
                                                        | "unknown";
                                                    redirect_urls?: Array<string>;
                                                    online_version_id?: string;
                                                    unaudit_version_id?: string;
                                                    app_name?: string;
                                                    avatar_url?: string;
                                                    description?: string;
                                                    scopes?: Array<{
                                                        scope: string;
                                                        description?: string;
                                                        level?: number;
                                                        token_types?: Array<
                                                            "tenant" | "user"
                                                        >;
                                                    }>;
                                                    back_home_url?: string;
                                                    i18n?: Array<{
                                                        i18n_key:
                                                            | "zh_cn"
                                                            | "en_us"
                                                            | "ja_jp"
                                                            | "zh_hk"
                                                            | "zh_tw"
                                                            | "id_id"
                                                            | "ms_my"
                                                            | "de_de"
                                                            | "es_es"
                                                            | "fr_fr"
                                                            | "it_it"
                                                            | "pt_br"
                                                            | "vi_vn"
                                                            | "ru_ru"
                                                            | "th_th"
                                                            | "ko_kr";
                                                        name?: string;
                                                        description?: string;
                                                        help_use?: string;
                                                    }>;
                                                    primary_language?:
                                                        | "zh_cn"
                                                        | "en_us"
                                                        | "ja_jp";
                                                    common_categories?: Array<string>;
                                                    owner?: {
                                                        type: number;
                                                        owner_id?: string;
                                                        name?: string;
                                                        help_desk?: string;
                                                        email?: string;
                                                        phone?: string;
                                                        customer_service_account?: string;
                                                    };
                                                    mobile_default_ability?:
                                                        | "gadget"
                                                        | "web_app"
                                                        | "bot";
                                                    pc_default_ability?:
                                                        | "gadget"
                                                        | "web_app"
                                                        | "bot";
                                                    secret?: string;
                                                    event?: {
                                                        subscription_type?: string;
                                                        request_url?: string;
                                                        subscribed_events?: Array<string>;
                                                    };
                                                    callback?: {
                                                        callback_type?: string;
                                                        request_url?: string;
                                                        subscribed_callbacks?: Array<string>;
                                                    };
                                                    encryption?: {
                                                        encryption_key?: string;
                                                        verification_token?: string;
                                                    };
                                                    security?: {
                                                        redirect_urls?: Array<string>;
                                                        allowed_ips?: Array<string>;
                                                        h5_trusted_domains?: Array<string>;
                                                        web_view_trusted_domains?: Array<string>;
                                                        allowed_schemas?: Array<string>;
                                                        allowed_server_domains?: Array<string>;
                                                    };
                                                    allow_refresh_token?: boolean;
                                                    callback_info?: {
                                                        callback_type?:
                                                            | "webhook"
                                                            | "websocket";
                                                        request_url?: string;
                                                        subscribed_callbacks?: Array<string>;
                                                    };
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                                total_count?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=user_visible_application&apiName=list&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=user_visible_application&version=v6 document }
             */
            list: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "open_id" | "user_id" | "union_id";
                        user_id: string;
                        lang?:
                            | "zh_cn"
                            | "en_us"
                            | "ja_jp"
                            | "zh_hk"
                            | "zh_tw"
                            | "id_id"
                            | "ms_my"
                            | "de_de"
                            | "es_es"
                            | "fr_fr"
                            | "it_it"
                            | "pt_br"
                            | "vi_vn"
                            | "ru_ru"
                            | "th_th"
                            | "ko_kr";
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
                                    app_id: string;
                                    creator_id?: string;
                                    status?: number;
                                    scene_type?: number;
                                    payment_type?: number;
                                    create_source?:
                                        | "developer_console"
                                        | "base"
                                        | "app_engine"
                                        | "bot_builder"
                                        | "aily"
                                        | "unknown";
                                    redirect_urls?: Array<string>;
                                    online_version_id?: string;
                                    unaudit_version_id?: string;
                                    app_name?: string;
                                    avatar_url?: string;
                                    description?: string;
                                    scopes?: Array<{
                                        scope: string;
                                        description?: string;
                                        level?: number;
                                        token_types?: Array<"tenant" | "user">;
                                    }>;
                                    back_home_url?: string;
                                    i18n?: Array<{
                                        i18n_key:
                                            | "zh_cn"
                                            | "en_us"
                                            | "ja_jp"
                                            | "zh_hk"
                                            | "zh_tw"
                                            | "id_id"
                                            | "ms_my"
                                            | "de_de"
                                            | "es_es"
                                            | "fr_fr"
                                            | "it_it"
                                            | "pt_br"
                                            | "vi_vn"
                                            | "ru_ru"
                                            | "th_th"
                                            | "ko_kr";
                                        name?: string;
                                        description?: string;
                                        help_use?: string;
                                    }>;
                                    primary_language?:
                                        | "zh_cn"
                                        | "en_us"
                                        | "ja_jp";
                                    common_categories?: Array<string>;
                                    owner?: {
                                        type: number;
                                        owner_id?: string;
                                        name?: string;
                                        help_desk?: string;
                                        email?: string;
                                        phone?: string;
                                        customer_service_account?: string;
                                    };
                                    mobile_default_ability?:
                                        | "gadget"
                                        | "web_app"
                                        | "bot";
                                    pc_default_ability?:
                                        | "gadget"
                                        | "web_app"
                                        | "bot";
                                    secret?: string;
                                    event?: {
                                        subscription_type?: string;
                                        request_url?: string;
                                        subscribed_events?: Array<string>;
                                    };
                                    callback?: {
                                        callback_type?: string;
                                        request_url?: string;
                                        subscribed_callbacks?: Array<string>;
                                    };
                                    encryption?: {
                                        encryption_key?: string;
                                        verification_token?: string;
                                    };
                                    security?: {
                                        redirect_urls?: Array<string>;
                                        allowed_ips?: Array<string>;
                                        h5_trusted_domains?: Array<string>;
                                        web_view_trusted_domains?: Array<string>;
                                        allowed_schemas?: Array<string>;
                                        allowed_server_domains?: Array<string>;
                                    };
                                    allow_refresh_token?: boolean;
                                    callback_info?: {
                                        callback_type?: "webhook" | "websocket";
                                        request_url?: string;
                                        subscribed_callbacks?: Array<string>;
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                                total_count?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/user_visible_applications`,
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
        applicationConfig: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.config&apiName=patch&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.config&version=v6 document }
             *
             * 更新应用开发配置
             *
             * 通过该接口可更新自建应用的应用的开发配置（通讯录、安全、可见性等），不传入的参数则保持不变，仅针对传入的参数则进行更新。如果应用正在审核中，则无法更新配置
             *
             * - 仅支持更新[开发者后台](https://open.feishu.cn/app)创建的自建应用，不包含通过机器人助手等其他渠道创建的自建应用;- 免审权限、事件订阅服务器地址、重定向URL、IP白名单、H5可信域名、协议名白名单修改后立即生效，其他应用配置修改后需要[提交发布](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-publish/create)，并审核通过后才会在线上生效。为确保所有配置均能在线上生效，建议修改后提交应用发布。;;- 若用 user_access_token 代表某个终端用户操作API，则需确保该用户为应用的所有者、管理员、开发者，否则无法操作成功;;- 若用 tenant_access_token 代表应用操作API，则可以操作企业内的任何一个自建应用
             */
            patch: async (
                payload?: {
                    data?: {
                        scope?: {
                            add_scopes?: Array<{
                                scope_name: string;
                                token_type: "user" | "tenant";
                            }>;
                            remove_scopes?: Array<{
                                scope_name: string;
                                token_type: "user" | "tenant";
                            }>;
                        };
                        event?: {
                            subscription_type: "webhook";
                            request_url?: string;
                            add_events?: Array<string>;
                            remove_events?: Array<string>;
                        };
                        security?: {
                            add?: {
                                redirect_urls?: Array<string>;
                                allowed_ips?: Array<string>;
                                h5_trusted_domains?: Array<string>;
                                web_view_trusted_domains?: Array<string>;
                                allowed_schemas?: Array<string>;
                                allowed_server_domains?: Array<string>;
                            };
                            remove?: {
                                redirect_urls?: Array<string>;
                                allowed_ips?: Array<string>;
                                h5_trusted_domains?: Array<string>;
                                web_view_trusted_domains?: Array<string>;
                                allowed_schemas?: Array<string>;
                                allowed_server_domains?: Array<string>;
                            };
                        };
                        visibility?: {
                            is_visible_to_all: boolean;
                            visible_list?: {
                                user_ids?: Array<string>;
                                department_ids?: Array<string>;
                            };
                        };
                        contacts?: {
                            contacts_range_type:
                                | "equal_to_availability"
                                | "some"
                                | "all";
                            visible_list?: {
                                user_ids?: Array<string>;
                                department_ids?: Array<string>;
                            };
                        };
                        event_and_callback_encrypt_strategy?: {
                            encryption_key?: string;
                            verification_token?: string;
                        };
                        callback?: {
                            callback_type: "webhook" | "websocket";
                            request_url?: string;
                            add_callbacks?: Array<string>;
                            remove_callbacks?: Array<string>;
                        };
                    };
                    params?: {
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        user_id_type?: "open_id" | "user_id" | "union_id";
                    };
                    path: { app_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/applications/:app_id/config`,
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
        larksuiteCliApp: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=larksuite_cli_app&apiName=probe&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=probe&project=application&resource=larksuite_cli_app&version=v6 document }
             *
             * 飞书cli应用探活接口
             */
            probe: async (
                payload?: {
                    data?: { from?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/application/v6/larksuite_cli_app/probe`,
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
        v5: {
            /**
             * application
             */
            application: {
                favouriteWithIterator: async (
                    payload?: {
                        params?: {
                            language?: "zh_cn" | "en_us" | "ja_jp";
                            page_token?: string;
                            page_size?: number;
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
                                    `${this.domain}/open-apis/application/v5/applications/favourite`,
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
                                                    page_token?: string;
                                                    total_count?: number;
                                                    has_more?: boolean;
                                                    app_list?: Array<{
                                                        app_id: string;
                                                        app_name: string;
                                                        description: string;
                                                        app_type:
                                                            | "app"
                                                            | "shortcut";
                                                        avatar_url: string;
                                                        open_methods: Array<{
                                                            type?:
                                                                | "mobile_gadget"
                                                                | "mobile_web"
                                                                | "pc_gadget"
                                                                | "pc_web"
                                                                | "bot";
                                                            applink?: string;
                                                        }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=favourite&version=v5 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=favourite&project=application&resource=application&version=v5 document }
                 *
                 * 获取用户自定义常用的应用
                 *
                 * 获取用户自定义常用的应用。
                 */
                favourite: async (
                    payload?: {
                        params?: {
                            language?: "zh_cn" | "en_us" | "ja_jp";
                            page_token?: string;
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
                                    page_token?: string;
                                    total_count?: number;
                                    has_more?: boolean;
                                    app_list?: Array<{
                                        app_id: string;
                                        app_name: string;
                                        description: string;
                                        app_type: "app" | "shortcut";
                                        avatar_url: string;
                                        open_methods: Array<{
                                            type?:
                                                | "mobile_gadget"
                                                | "mobile_web"
                                                | "pc_gadget"
                                                | "pc_web"
                                                | "bot";
                                            applink?: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v5/applications/favourite`,
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
                recommendWithIterator: async (
                    payload?: {
                        params?: {
                            language?: "zh_cn" | "en_us" | "ja_jp";
                            recommend_type?:
                                | "user_unremovable"
                                | "user_removable";
                            page_token?: string;
                            page_size?: number;
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
                                    `${this.domain}/open-apis/application/v5/applications/recommend`,
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
                                                    page_token?: string;
                                                    page_size?: number;
                                                    total_count?: number;
                                                    has_more?: boolean;
                                                    app_list?: Array<{
                                                        app_id: string;
                                                        app_name: string;
                                                        description: string;
                                                        app_type:
                                                            | "app"
                                                            | "shortcut";
                                                        avatar_url: string;
                                                        open_methods: Array<{
                                                            type?:
                                                                | "mobile_gadget"
                                                                | "mobile_web"
                                                                | "pc_gadget"
                                                                | "pc_web"
                                                                | "bot";
                                                            applink?: string;
                                                        }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=recommend&version=v5 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recommend&project=application&resource=application&version=v5 document }
                 *
                 * 获取管理员推荐的应用
                 *
                 * 获取管理员推荐的应用。
                 */
                recommend: async (
                    payload?: {
                        params?: {
                            language?: "zh_cn" | "en_us" | "ja_jp";
                            recommend_type?:
                                | "user_unremovable"
                                | "user_removable";
                            page_token?: string;
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
                                    page_token?: string;
                                    page_size?: number;
                                    total_count?: number;
                                    has_more?: boolean;
                                    app_list?: Array<{
                                        app_id: string;
                                        app_name: string;
                                        description: string;
                                        app_type: "app" | "shortcut";
                                        avatar_url: string;
                                        open_methods: Array<{
                                            type?:
                                                | "mobile_gadget"
                                                | "mobile_web"
                                                | "pc_gadget"
                                                | "pc_web"
                                                | "bot";
                                            applink?: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v5/applications/recommend`,
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
        v6: {
            /**
             * application.app_usage
             */
            applicationAppUsage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_usage&apiName=overview&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=overview&project=application&resource=application.app_usage&version=v6 document }
                 *
                 * 获取应用使用概览
                 *
                 * 查看应用在某一天/某一周/某一个月的使用数据，可以查看租户整体对应用的使用情况，也可以分部门查看。
                 *
                 * 1. 仅支持企业版/旗舰版租户使用;2. 一般每天早上10点产出前一天的数据;3. 已经支持的指标包括：应用的活跃用户数、累计用户数、新增用户数、访问页面数、打开次数;4. 数据从飞书4.10版本开始统计，使用飞书版本4.10及以下版本的用户数据不会被统计到;5. 按照部门查看数据时，会展示当前部门以及其子部门的整体使用情况;6. 调用频控为100次/分
                 */
                overview: async (
                    payload?: {
                        data: {
                            date: string;
                            cycle_type: number;
                            department_id?: string;
                            ability: "app" | "mp" | "h5" | "bot";
                        };
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
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
                                    items?: Array<{
                                        metric_name: string;
                                        metric_value: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications/:app_id/app_usage/overview`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_usage&apiName=message_push_overview&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=message_push_overview&project=application&resource=application.app_usage&version=v6 document }
                 *
                 * 获取消息推送概览
                 *
                 * 目标：查看应用在某一天/某一周/某一个月的机器人消息推送数据，可以根据部门做筛选
                 *
                 * 1. 仅支持企业版/旗舰版租户使用;2. 一般每天早上10点产出两天前的数据。;3. 已经支持的指标包括：消息推送给用户的次数、消息触达的人数、消息1小时阅读量、消息12小时阅读量;4. 按照部门查看数据时，会展示当前部门以及其子部门的整体使用情况;5. 调用频控为100次/分
                 */
                messagePushOverview: async (
                    payload?: {
                        data: {
                            date: string;
                            cycle_type: number;
                            department_id?: string;
                        };
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
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
                                    items?: Array<{
                                        metric_name: string;
                                        metric_value: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications/:app_id/app_usage/message_push_overview`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_usage&apiName=department_overview&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=department_overview&project=application&resource=application.app_usage&version=v6 document }
                 *
                 * 获取多部门应用使用概览
                 *
                 * 查看应用在某一天/某一周/某一个月的使用数据，可以根据部门做多层子部门的筛选
                 *
                 * 1. 仅支持企业版/旗舰版租户使用;2. 一般每天早上10点产出前一天的数据;3. 已经支持的指标包括：应用的活跃用户数、累计用户数、新增用户数、访问页面数、打开次数;4. 按照部门查看数据时，可以分别展示当前部门以及其子部门的使用情况;5. 如果查询的部门在查询日期没有使用过应用，只返回指标：应用的活跃用户数指标;6. 数据从飞书4.10版本开始统计，使用飞书版本4.10及以下版本的用户数据不会被统计到;7. 调用频控为100次/分
                 */
                departmentOverview: async (
                    payload?: {
                        data: {
                            date: string;
                            cycle_type: number;
                            department_id?: string;
                            recursion?: number;
                            page_size?: number;
                            page_token?: string;
                        };
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        department_id?: string;
                                        app?: Array<{
                                            metric_name: string;
                                            metric_value: number;
                                        }>;
                                        gadget?: Array<{
                                            metric_name: string;
                                            metric_value: number;
                                        }>;
                                        webapp?: Array<{
                                            metric_name: string;
                                            metric_value: number;
                                        }>;
                                        bot?: Array<{
                                            metric_name: string;
                                            metric_value: number;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications/:app_id/app_usage/department_overview`,
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
             * application.feedback
             */
            applicationFeedback: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.feedback&apiName=list&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=application.feedback&version=v6 document }
                 *
                 * 获取应用反馈列表
                 *
                 * 查询应用的反馈数据
                 */
                list: async (
                    payload?: {
                        params?: {
                            from_date?: string;
                            to_date?: string;
                            feedback_type?: number;
                            status?: number;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            page_token?: string;
                            page_size?: number;
                        };
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
                                    feedback_list?: Array<{
                                        feedback_id: string;
                                        app_id: string;
                                        feedback_time: string;
                                        tenant_name?: string;
                                        feedback_type: number;
                                        status: number;
                                        fault_type?: Array<number>;
                                        fault_time?: string;
                                        source?: number;
                                        contact?: string;
                                        update_time?: string;
                                        description: string;
                                        user_id?: string;
                                        operator_id?: string;
                                        images?: Array<string>;
                                        feedback_path?: string;
                                    }>;
                                    has_more: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications/:app_id/feedbacks`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.feedback&apiName=patch&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.feedback&version=v6 document }
                 *
                 * 更新应用反馈
                 *
                 * 更新应用的反馈数据
                 */
                patch: async (
                    payload?: {
                        params: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            status: number;
                            operator_id: string;
                        };
                        path: { app_id: string; feedback_id: string };
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
                                `${this.domain}/open-apis/application/v6/applications/:app_id/feedbacks/:feedback_id`,
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
             * application.visibility
             */
            applicationVisibility: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.visibility&apiName=isv_visibility_list&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=isv_visibility_list&project=application&resource=application.visibility&version=v6 document }
                 *
                 * 获取商店应用在安装企业内的可用范围
                 *
                 * 该接口用于查询商店应用在该企业内可以被使用的范围，可以被自建应用调用。
                 */
                isvVisibilityList: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
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
                                    department_visibility_items?: Array<{
                                        user_id?: string;
                                        department_id?: string;
                                        group_id?: string;
                                    }>;
                                    is_visible_to_all?: boolean;
                                    has_more?: boolean;
                                    page_token?: string;
                                    user_visibility_items?: Array<{
                                        user_id?: string;
                                        department_id?: string;
                                        group_id?: string;
                                    }>;
                                    department_invisibility_items?: Array<{
                                        user_id?: string;
                                        department_id?: string;
                                        group_id?: string;
                                    }>;
                                    user_invisibility_items?: Array<{
                                        user_id?: string;
                                        department_id?: string;
                                        group_id?: string;
                                    }>;
                                    group_visibility_items?: Array<{
                                        user_id?: string;
                                        department_id?: string;
                                        group_id?: string;
                                    }>;
                                    group_invisibility_items?: Array<{
                                        user_id?: string;
                                        department_id?: string;
                                        group_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications/:app_id/visibility/isv_visibility_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.visibility&apiName=check_white_black_list&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=check_white_black_list&project=application&resource=application.visibility&version=v6 document }
                 *
                 * 查询用户或部门是否在应用的可用或禁用名单
                 *
                 * 该接口用于查询用户、部门、用户组是否在应用的可用或禁用名单中
                 */
                checkWhiteBlackList: async (
                    payload?: {
                        data?: {
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                            group_ids?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
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
                                    user_visibility_list?: Array<{
                                        user_id?: string;
                                        in_white_list?: boolean;
                                        in_black_list?: boolean;
                                        in_paid_list?: boolean;
                                    }>;
                                    department_visibility_list?: Array<{
                                        department_id?: string;
                                        in_white_list?: boolean;
                                        in_black_list?: boolean;
                                    }>;
                                    group_visibility_list?: Array<{
                                        group_id?: string;
                                        in_white_list?: boolean;
                                        in_black_list?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications/:app_id/visibility/check_white_black_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.visibility&apiName=patch&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.visibility&version=v6 document }
                 *
                 * 更新应用可用范围
                 *
                 * 调用该接口更新指定应用的可用范围，支持更新当前企业内自建应用的可用范围，或者已安装的商店应用的可用范围，包括可用人员与禁用人员。更新可用范围后对线上立即生效。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            add_visible_list?: {
                                user_ids?: Array<string>;
                                department_ids?: Array<string>;
                                group_ids?: Array<string>;
                            };
                            del_visible_list?: {
                                user_ids?: Array<string>;
                                department_ids?: Array<string>;
                                group_ids?: Array<string>;
                            };
                            add_invisible_list?: {
                                user_ids?: Array<string>;
                                department_ids?: Array<string>;
                                group_ids?: Array<string>;
                            };
                            del_invisible_list?: {
                                user_ids?: Array<string>;
                                department_ids?: Array<string>;
                                group_ids?: Array<string>;
                            };
                            is_visible_to_all?: boolean;
                        };
                        params?: {
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            user_id_type?: "open_id" | "user_id" | "union_id";
                        };
                        path: { app_id: string };
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
                                `${this.domain}/open-apis/application/v6/applications/:app_id/visibility`,
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
             * app_package
             */
            appPackage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_package&apiName=upload&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=application&resource=app_package&version=v6 document }
                 *
                 * 应用包上传（灰度租户可见）
                 *
                 * 上传应用包
                 */
                upload: async (
                    payload?: {
                        data: {
                            app_id: string;
                            package_type: "mobile" | "pc" | "block";
                            version: string;
                            description?: string;
                            source: Buffer | fs.ReadStream;
                            block_type_id?: string;
                            mini_mode?: number;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/app_package/upload`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_package&apiName=latest_version&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=latest_version&project=application&resource=app_package&version=v6 document }
                 *
                 * 应用最新包版本
                 *
                 * 获取应用最新包版本
                 */
                latestVersion: async (
                    payload?: {
                        params: {
                            app_id: string;
                            package_type: "mobile" | "pc" | "block";
                            block_type_id?: string;
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
                                data?: { version?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/app_package/latest_version`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_package&apiName=progress&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=progress&project=application&resource=app_package&version=v6 document }
                 *
                 * 应用包上传进度查询（灰度租户可见）
                 *
                 * 应用包上传进度查询
                 */
                progress: async (
                    payload?: {
                        params: { app_id: string };
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
                                data?: { status?: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/app_package/progress`,
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
             * app_recommend_rule
             */
            appRecommendRule: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
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
                                    `${this.domain}/open-apis/application/v6/app_recommend_rules`,
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
                                                    rules?: Array<{
                                                        id?: string;
                                                        name?: string;
                                                        status?:
                                                            | "open"
                                                            | "closed";
                                                        visibility_info?: {
                                                            is_all?: boolean;
                                                            department_ids?: Array<string>;
                                                            user_ids?: Array<string>;
                                                            group_ids?: Array<string>;
                                                        };
                                                        recommend_item_infos?: Array<{
                                                            item_id?: string;
                                                            item_type?:
                                                                | "application"
                                                                | "link";
                                                            name?: string;
                                                            description?: string;
                                                            link_url?: string;
                                                            client_id?: string;
                                                            icon_url?: string;
                                                            default_locale?:
                                                                | "zh_cn"
                                                                | "zh_hk"
                                                                | "zh_tw"
                                                                | "en_us"
                                                                | "ja_jp";
                                                            i18n_name?: {
                                                                zh_cn?: string;
                                                                zh_hk?: string;
                                                                zh_tw?: string;
                                                                en_us?: string;
                                                                ja_jp?: string;
                                                            };
                                                        }>;
                                                        distributed_recommend_item_infos?: Array<{
                                                            item_id?: string;
                                                            item_type?:
                                                                | "application"
                                                                | "link";
                                                            name?: string;
                                                            description?: string;
                                                            link_url?: string;
                                                            client_id?: string;
                                                            icon_url?: string;
                                                            default_locale?:
                                                                | "zh_cn"
                                                                | "zh_hk"
                                                                | "zh_tw"
                                                                | "en_us"
                                                                | "ja_jp";
                                                            i18n_name?: {
                                                                zh_cn?: string;
                                                                zh_hk?: string;
                                                                zh_tw?: string;
                                                                en_us?: string;
                                                                ja_jp?: string;
                                                            };
                                                        }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_recommend_rule&apiName=list&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=app_recommend_rule&version=v6 document }
                 *
                 * 获取当前设置的推荐规则列表
                 *
                 * 获取当前设置的推荐规则列表。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
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
                                        id?: string;
                                        name?: string;
                                        status?: "open" | "closed";
                                        visibility_info?: {
                                            is_all?: boolean;
                                            department_ids?: Array<string>;
                                            user_ids?: Array<string>;
                                            group_ids?: Array<string>;
                                        };
                                        recommend_item_infos?: Array<{
                                            item_id?: string;
                                            item_type?: "application" | "link";
                                            name?: string;
                                            description?: string;
                                            link_url?: string;
                                            client_id?: string;
                                            icon_url?: string;
                                            default_locale?:
                                                | "zh_cn"
                                                | "zh_hk"
                                                | "zh_tw"
                                                | "en_us"
                                                | "ja_jp";
                                            i18n_name?: {
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                        }>;
                                        distributed_recommend_item_infos?: Array<{
                                            item_id?: string;
                                            item_type?: "application" | "link";
                                            name?: string;
                                            description?: string;
                                            link_url?: string;
                                            client_id?: string;
                                            icon_url?: string;
                                            default_locale?:
                                                | "zh_cn"
                                                | "zh_hk"
                                                | "zh_tw"
                                                | "en_us"
                                                | "ja_jp";
                                            i18n_name?: {
                                                zh_cn?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/app_recommend_rules`,
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
             * application
             */
            application: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=contacts_range_configuration&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=contacts_range_configuration&project=application&resource=application&version=v6 document }
                 *
                 * 获取应用通讯录权限范围配置
                 *
                 * 获取当前企业内某个自建应用线上实际生效的通讯录权限范围配置。
                 */
                contactsRangeConfiguration: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
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
                                    contacts_range?: {
                                        contacts_scope_type?:
                                            | "equal_to_availability"
                                            | "some"
                                            | "all";
                                        visible_list?: {
                                            open_ids?: Array<string>;
                                            department_ids?: Array<string>;
                                            group_ids?: Array<string>;
                                        };
                                    };
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications/:app_id/contacts_range_configuration`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=create&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=application&resource=application&version=v6 document }
                 *
                 * 创建企业自建应用
                 *
                 * 创建一个企业自建应用，创建应用后的状态为待发布状态。可进入飞书开放平台查看该应用。
                 */
                create: async (
                    payload?: {
                        data: {
                            avatar?: string;
                            owner_id?: string;
                            i18n: Array<{
                                i18n_key:
                                    | "zh_cn"
                                    | "en_us"
                                    | "ja_jp"
                                    | "zh_hk"
                                    | "zh_tw"
                                    | "id_id"
                                    | "ms_my"
                                    | "de_de"
                                    | "es_es"
                                    | "fr_fr"
                                    | "it_it"
                                    | "pt_br"
                                    | "vi_vn"
                                    | "ru_ru"
                                    | "th_th"
                                    | "ko_kr";
                                name: string;
                                description?: string;
                                help_use?: string;
                            }>;
                            app_id?: string;
                            app_secret?: string;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: { app_id?: string; app_secret?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications`,
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
                        params: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: string;
                            lang: string;
                            status?: number;
                            payment_type?: number;
                            owner_type?: number;
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
                                    `${this.domain}/open-apis/application/v6/applications`,
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
                                                    app_list?: Array<{
                                                        app_id: string;
                                                        creator_id?: string;
                                                        status?: number;
                                                        scene_type?: number;
                                                        payment_type?: number;
                                                        create_source?:
                                                            | "developer_console"
                                                            | "base"
                                                            | "app_engine"
                                                            | "bot_builder"
                                                            | "aily"
                                                            | "unknown";
                                                        redirect_urls?: Array<string>;
                                                        online_version_id?: string;
                                                        unaudit_version_id?: string;
                                                        app_name?: string;
                                                        avatar_url?: string;
                                                        description?: string;
                                                        scopes?: Array<{
                                                            scope: string;
                                                            description?: string;
                                                            level?: number;
                                                            token_types?: Array<
                                                                | "tenant"
                                                                | "user"
                                                            >;
                                                        }>;
                                                        back_home_url?: string;
                                                        i18n?: Array<{
                                                            i18n_key:
                                                                | "zh_cn"
                                                                | "en_us"
                                                                | "ja_jp"
                                                                | "zh_hk"
                                                                | "zh_tw"
                                                                | "id_id"
                                                                | "ms_my"
                                                                | "de_de"
                                                                | "es_es"
                                                                | "fr_fr"
                                                                | "it_it"
                                                                | "pt_br"
                                                                | "vi_vn"
                                                                | "ru_ru"
                                                                | "th_th"
                                                                | "ko_kr";
                                                            name?: string;
                                                            description?: string;
                                                            help_use?: string;
                                                        }>;
                                                        primary_language?:
                                                            | "zh_cn"
                                                            | "en_us"
                                                            | "ja_jp";
                                                        common_categories?: Array<string>;
                                                        owner?: {
                                                            type: number;
                                                            owner_id?: string;
                                                            name?: string;
                                                            help_desk?: string;
                                                            email?: string;
                                                            phone?: string;
                                                            customer_service_account?: string;
                                                        };
                                                        mobile_default_ability?:
                                                            | "gadget"
                                                            | "web_app"
                                                            | "bot";
                                                        pc_default_ability?:
                                                            | "gadget"
                                                            | "web_app"
                                                            | "bot";
                                                        secret?: string;
                                                        event?: {
                                                            subscription_type?: string;
                                                            request_url?: string;
                                                            subscribed_events?: Array<string>;
                                                        };
                                                        callback?: {
                                                            callback_type?: string;
                                                            request_url?: string;
                                                            subscribed_callbacks?: Array<string>;
                                                        };
                                                        encryption?: {
                                                            encryption_key?: string;
                                                            verification_token?: string;
                                                        };
                                                        security?: {
                                                            redirect_urls?: Array<string>;
                                                            allowed_ips?: Array<string>;
                                                            h5_trusted_domains?: Array<string>;
                                                            web_view_trusted_domains?: Array<string>;
                                                            allowed_schemas?: Array<string>;
                                                            allowed_server_domains?: Array<string>;
                                                        };
                                                        allow_refresh_token?: boolean;
                                                        callback_info?: {
                                                            callback_type?:
                                                                | "webhook"
                                                                | "websocket";
                                                            request_url?: string;
                                                            subscribed_callbacks?: Array<string>;
                                                        };
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    total_count?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=list&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=application&version=v6 document }
                 *
                 * 获取企业安装的应用
                 *
                 * 该接口用于查询企业安装的应用列表，只能被企业自建应用调用。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: string;
                            lang: string;
                            status?: number;
                            payment_type?: number;
                            owner_type?: number;
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
                                    app_list?: Array<{
                                        app_id: string;
                                        creator_id?: string;
                                        status?: number;
                                        scene_type?: number;
                                        payment_type?: number;
                                        create_source?:
                                            | "developer_console"
                                            | "base"
                                            | "app_engine"
                                            | "bot_builder"
                                            | "aily"
                                            | "unknown";
                                        redirect_urls?: Array<string>;
                                        online_version_id?: string;
                                        unaudit_version_id?: string;
                                        app_name?: string;
                                        avatar_url?: string;
                                        description?: string;
                                        scopes?: Array<{
                                            scope: string;
                                            description?: string;
                                            level?: number;
                                            token_types?: Array<
                                                "tenant" | "user"
                                            >;
                                        }>;
                                        back_home_url?: string;
                                        i18n?: Array<{
                                            i18n_key:
                                                | "zh_cn"
                                                | "en_us"
                                                | "ja_jp"
                                                | "zh_hk"
                                                | "zh_tw"
                                                | "id_id"
                                                | "ms_my"
                                                | "de_de"
                                                | "es_es"
                                                | "fr_fr"
                                                | "it_it"
                                                | "pt_br"
                                                | "vi_vn"
                                                | "ru_ru"
                                                | "th_th"
                                                | "ko_kr";
                                            name?: string;
                                            description?: string;
                                            help_use?: string;
                                        }>;
                                        primary_language?:
                                            | "zh_cn"
                                            | "en_us"
                                            | "ja_jp";
                                        common_categories?: Array<string>;
                                        owner?: {
                                            type: number;
                                            owner_id?: string;
                                            name?: string;
                                            help_desk?: string;
                                            email?: string;
                                            phone?: string;
                                            customer_service_account?: string;
                                        };
                                        mobile_default_ability?:
                                            | "gadget"
                                            | "web_app"
                                            | "bot";
                                        pc_default_ability?:
                                            | "gadget"
                                            | "web_app"
                                            | "bot";
                                        secret?: string;
                                        event?: {
                                            subscription_type?: string;
                                            request_url?: string;
                                            subscribed_events?: Array<string>;
                                        };
                                        callback?: {
                                            callback_type?: string;
                                            request_url?: string;
                                            subscribed_callbacks?: Array<string>;
                                        };
                                        encryption?: {
                                            encryption_key?: string;
                                            verification_token?: string;
                                        };
                                        security?: {
                                            redirect_urls?: Array<string>;
                                            allowed_ips?: Array<string>;
                                            h5_trusted_domains?: Array<string>;
                                            web_view_trusted_domains?: Array<string>;
                                            allowed_schemas?: Array<string>;
                                            allowed_server_domains?: Array<string>;
                                        };
                                        allow_refresh_token?: boolean;
                                        callback_info?: {
                                            callback_type?:
                                                | "webhook"
                                                | "websocket";
                                            request_url?: string;
                                            subscribed_callbacks?: Array<string>;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                    total_count?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=get&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=application&resource=application&version=v6 document }
                 *
                 * 获取应用信息
                 *
                 * 根据app_id获取应用的基础信息
                 *
                 * 商店应用必须正式发布版本后，才可以调用该接口获取应用信息。如果灰度发布应用，调用该接口将会报错 210504 错误码。
                 */
                get: async (
                    payload?: {
                        params: {
                            lang: "zh_cn" | "en_us" | "ja_jp";
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
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
                                    app?: {
                                        app_id: string;
                                        creator_id?: string;
                                        status?: number;
                                        scene_type?: number;
                                        payment_type?: number;
                                        create_source?:
                                            | "developer_console"
                                            | "base"
                                            | "app_engine"
                                            | "bot_builder"
                                            | "aily"
                                            | "unknown";
                                        redirect_urls?: Array<string>;
                                        online_version_id?: string;
                                        unaudit_version_id?: string;
                                        app_name?: string;
                                        avatar_url?: string;
                                        description?: string;
                                        scopes?: Array<{
                                            scope: string;
                                            description?: string;
                                            level?: number;
                                            token_types?: Array<
                                                "tenant" | "user"
                                            >;
                                        }>;
                                        back_home_url?: string;
                                        i18n?: Array<{
                                            i18n_key:
                                                | "zh_cn"
                                                | "en_us"
                                                | "ja_jp"
                                                | "zh_hk"
                                                | "zh_tw"
                                                | "id_id"
                                                | "ms_my"
                                                | "de_de"
                                                | "es_es"
                                                | "fr_fr"
                                                | "it_it"
                                                | "pt_br"
                                                | "vi_vn"
                                                | "ru_ru"
                                                | "th_th"
                                                | "ko_kr";
                                            name?: string;
                                            description?: string;
                                            help_use?: string;
                                        }>;
                                        primary_language?:
                                            | "zh_cn"
                                            | "en_us"
                                            | "ja_jp";
                                        common_categories?: Array<string>;
                                        owner?: {
                                            type: number;
                                            owner_id?: string;
                                            name?: string;
                                            help_desk?: string;
                                            email?: string;
                                            phone?: string;
                                            customer_service_account?: string;
                                        };
                                        mobile_default_ability?:
                                            | "gadget"
                                            | "web_app"
                                            | "bot";
                                        pc_default_ability?:
                                            | "gadget"
                                            | "web_app"
                                            | "bot";
                                        secret?: string;
                                        event?: {
                                            subscription_type?: string;
                                            request_url?: string;
                                            subscribed_events?: Array<string>;
                                        };
                                        callback?: {
                                            callback_type?: string;
                                            request_url?: string;
                                            subscribed_callbacks?: Array<string>;
                                        };
                                        encryption?: {
                                            encryption_key?: string;
                                            verification_token?: string;
                                        };
                                        security?: {
                                            redirect_urls?: Array<string>;
                                            allowed_ips?: Array<string>;
                                            h5_trusted_domains?: Array<string>;
                                            web_view_trusted_domains?: Array<string>;
                                            allowed_schemas?: Array<string>;
                                            allowed_server_domains?: Array<string>;
                                        };
                                        allow_refresh_token?: boolean;
                                        callback_info?: {
                                            callback_type?:
                                                | "webhook"
                                                | "websocket";
                                            request_url?: string;
                                            subscribed_callbacks?: Array<string>;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications/:app_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=patch&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application&version=v6 document }
                 *
                 * 更新应用分组信息
                 *
                 * 更新应用的分组信息（分组会影响应用在工作台中的分类情况，请谨慎更新）
                 */
                patch: async (
                    payload?: {
                        data?: {
                            common_categories?: Array<string>;
                            secret?: string;
                            event?: {
                                subscription_type?: string;
                                request_url?: string;
                                subscribed_events?: Array<string>;
                            };
                            callback?: {
                                callback_type?: string;
                                request_url?: string;
                                subscribed_callbacks?: Array<string>;
                            };
                            encryption?: {
                                encryption_key?: string;
                                verification_token?: string;
                            };
                            security?: {
                                redirect_urls?: Array<string>;
                                allowed_ips?: Array<string>;
                                h5_trusted_domains?: Array<string>;
                                web_view_trusted_domains?: Array<string>;
                                allowed_schemas?: Array<string>;
                                allowed_server_domains?: Array<string>;
                            };
                            allow_refresh_token?: boolean;
                            callback_info?: {
                                callback_type?: "webhook" | "websocket";
                                request_url?: string;
                                subscribed_callbacks?: Array<string>;
                            };
                        };
                        params: { lang: "zh_cn" | "en_us" | "ja_jp" };
                        path: { app_id: string };
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
                                `${this.domain}/open-apis/application/v6/applications/:app_id`,
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
                underauditlistWithIterator: async (
                    payload?: {
                        params: {
                            lang: "zh_cn" | "en_us" | "ja_jp";
                            page_token?: string;
                            page_size?: number;
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
                                    `${this.domain}/open-apis/application/v6/applications/underauditlist`,
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
                                                    items: Array<{
                                                        app_id: string;
                                                        creator_id?: string;
                                                        status?: number;
                                                        scene_type?: number;
                                                        payment_type?: number;
                                                        create_source?:
                                                            | "developer_console"
                                                            | "base"
                                                            | "app_engine"
                                                            | "bot_builder"
                                                            | "aily"
                                                            | "unknown";
                                                        redirect_urls?: Array<string>;
                                                        online_version_id?: string;
                                                        unaudit_version_id?: string;
                                                        app_name?: string;
                                                        avatar_url?: string;
                                                        description?: string;
                                                        scopes?: Array<{
                                                            scope: string;
                                                            description?: string;
                                                            level?: number;
                                                            token_types?: Array<
                                                                | "tenant"
                                                                | "user"
                                                            >;
                                                        }>;
                                                        back_home_url?: string;
                                                        i18n?: Array<{
                                                            i18n_key:
                                                                | "zh_cn"
                                                                | "en_us"
                                                                | "ja_jp"
                                                                | "zh_hk"
                                                                | "zh_tw"
                                                                | "id_id"
                                                                | "ms_my"
                                                                | "de_de"
                                                                | "es_es"
                                                                | "fr_fr"
                                                                | "it_it"
                                                                | "pt_br"
                                                                | "vi_vn"
                                                                | "ru_ru"
                                                                | "th_th"
                                                                | "ko_kr";
                                                            name?: string;
                                                            description?: string;
                                                            help_use?: string;
                                                        }>;
                                                        primary_language?:
                                                            | "zh_cn"
                                                            | "en_us"
                                                            | "ja_jp";
                                                        common_categories?: Array<string>;
                                                        owner?: {
                                                            type: number;
                                                            owner_id?: string;
                                                            name?: string;
                                                            help_desk?: string;
                                                            email?: string;
                                                            phone?: string;
                                                            customer_service_account?: string;
                                                        };
                                                        mobile_default_ability?:
                                                            | "gadget"
                                                            | "web_app"
                                                            | "bot";
                                                        pc_default_ability?:
                                                            | "gadget"
                                                            | "web_app"
                                                            | "bot";
                                                        secret?: string;
                                                        event?: {
                                                            subscription_type?: string;
                                                            request_url?: string;
                                                            subscribed_events?: Array<string>;
                                                        };
                                                        callback?: {
                                                            callback_type?: string;
                                                            request_url?: string;
                                                            subscribed_callbacks?: Array<string>;
                                                        };
                                                        encryption?: {
                                                            encryption_key?: string;
                                                            verification_token?: string;
                                                        };
                                                        security?: {
                                                            redirect_urls?: Array<string>;
                                                            allowed_ips?: Array<string>;
                                                            h5_trusted_domains?: Array<string>;
                                                            web_view_trusted_domains?: Array<string>;
                                                            allowed_schemas?: Array<string>;
                                                            allowed_server_domains?: Array<string>;
                                                        };
                                                        allow_refresh_token?: boolean;
                                                        callback_info?: {
                                                            callback_type?:
                                                                | "webhook"
                                                                | "websocket";
                                                            request_url?: string;
                                                            subscribed_callbacks?: Array<string>;
                                                        };
                                                    }>;
                                                    has_more: boolean;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=underauditlist&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=underauditlist&project=application&resource=application&version=v6 document }
                 *
                 * 查看待审核的应用列表
                 *
                 * 查看本企业下所有待审核的自建应用列表
                 */
                underauditlist: async (
                    payload?: {
                        params: {
                            lang: "zh_cn" | "en_us" | "ja_jp";
                            page_token?: string;
                            page_size?: number;
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
                                    items: Array<{
                                        app_id: string;
                                        creator_id?: string;
                                        status?: number;
                                        scene_type?: number;
                                        payment_type?: number;
                                        create_source?:
                                            | "developer_console"
                                            | "base"
                                            | "app_engine"
                                            | "bot_builder"
                                            | "aily"
                                            | "unknown";
                                        redirect_urls?: Array<string>;
                                        online_version_id?: string;
                                        unaudit_version_id?: string;
                                        app_name?: string;
                                        avatar_url?: string;
                                        description?: string;
                                        scopes?: Array<{
                                            scope: string;
                                            description?: string;
                                            level?: number;
                                            token_types?: Array<
                                                "tenant" | "user"
                                            >;
                                        }>;
                                        back_home_url?: string;
                                        i18n?: Array<{
                                            i18n_key:
                                                | "zh_cn"
                                                | "en_us"
                                                | "ja_jp"
                                                | "zh_hk"
                                                | "zh_tw"
                                                | "id_id"
                                                | "ms_my"
                                                | "de_de"
                                                | "es_es"
                                                | "fr_fr"
                                                | "it_it"
                                                | "pt_br"
                                                | "vi_vn"
                                                | "ru_ru"
                                                | "th_th"
                                                | "ko_kr";
                                            name?: string;
                                            description?: string;
                                            help_use?: string;
                                        }>;
                                        primary_language?:
                                            | "zh_cn"
                                            | "en_us"
                                            | "ja_jp";
                                        common_categories?: Array<string>;
                                        owner?: {
                                            type: number;
                                            owner_id?: string;
                                            name?: string;
                                            help_desk?: string;
                                            email?: string;
                                            phone?: string;
                                            customer_service_account?: string;
                                        };
                                        mobile_default_ability?:
                                            | "gadget"
                                            | "web_app"
                                            | "bot";
                                        pc_default_ability?:
                                            | "gadget"
                                            | "web_app"
                                            | "bot";
                                        secret?: string;
                                        event?: {
                                            subscription_type?: string;
                                            request_url?: string;
                                            subscribed_events?: Array<string>;
                                        };
                                        callback?: {
                                            callback_type?: string;
                                            request_url?: string;
                                            subscribed_callbacks?: Array<string>;
                                        };
                                        encryption?: {
                                            encryption_key?: string;
                                            verification_token?: string;
                                        };
                                        security?: {
                                            redirect_urls?: Array<string>;
                                            allowed_ips?: Array<string>;
                                            h5_trusted_domains?: Array<string>;
                                            web_view_trusted_domains?: Array<string>;
                                            allowed_schemas?: Array<string>;
                                            allowed_server_domains?: Array<string>;
                                        };
                                        allow_refresh_token?: boolean;
                                        callback_info?: {
                                            callback_type?:
                                                | "webhook"
                                                | "websocket";
                                            request_url?: string;
                                            subscribed_callbacks?: Array<string>;
                                        };
                                    }>;
                                    has_more: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications/underauditlist`,
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
             * application.app_version
             */
            applicationAppVersion: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=contacts_range_suggest&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=contacts_range_suggest&project=application&resource=application.app_version&version=v6 document }
                 *
                 * 获取应用版本中开发者申请的通讯录权限范围
                 *
                 * 该接口用于根据应用的 App ID 和版本 ID 获取企业自建应用某个版本的通讯录权限范围。
                 *
                 * 由于通讯录权限范围需要提交发布新的应用版本，并且企业管理员审核通过后才会生效，因此该权限范围可能与实际生效的权限范围有差别，如需获取线上实际生效的通讯录权限范围，可通过[获取应用通讯录权限范围配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/contacts_range_configuration) 获取。
                 */
                contactsRangeSuggest: async (
                    payload?: {
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { app_id: string; version_id: string };
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
                                    contacts_range?: {
                                        contacts_scope_type?:
                                            | "equal_to_availability"
                                            | "some"
                                            | "all";
                                        visible_list?: {
                                            open_ids?: Array<string>;
                                            department_ids?: Array<string>;
                                            group_ids?: Array<string>;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications/:app_id/app_versions/:version_id/contacts_range_suggest`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=patch&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.app_version&version=v6 document }
                 *
                 * 更新应用审核状态
                 *
                 * 通过接口来更新应用版本的审核结果：通过后应用可以直接上架；拒绝后则开发者可以看到拒绝理由，并在修改后再次申请发布。
                 */
                patch: async (
                    payload?: {
                        data?: { status?: number };
                        params: {
                            user_id_type: "user_id" | "union_id" | "open_id";
                            operator_id: string;
                            reject_reason?: string;
                        };
                        path: { app_id: string; version_id: string };
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
                                `${this.domain}/open-apis/application/v6/applications/:app_id/app_versions/:version_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=get&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=application&resource=application.app_version&version=v6 document }
                 *
                 * 获取应用版本信息
                 *
                 * 根据应用 ID 和应用版本 ID 来获取同租户下的应用版本的信息
                 */
                get: async (
                    payload?: {
                        params: {
                            lang: "zh_cn" | "en_us" | "ja_jp";
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { app_id: string; version_id: string };
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
                                    app_version?: {
                                        app_id: string;
                                        version?: string;
                                        version_id: string;
                                        app_name?: string;
                                        avatar_url?: string;
                                        description?: string;
                                        scopes?: Array<{
                                            scope: string;
                                            description?: string;
                                            level?: number;
                                            token_types?: Array<
                                                "tenant" | "user"
                                            >;
                                        }>;
                                        back_home_url?: string;
                                        i18n?: Array<{
                                            i18n_key:
                                                | "zh_cn"
                                                | "en_us"
                                                | "ja_jp"
                                                | "zh_hk"
                                                | "zh_tw"
                                                | "id_id"
                                                | "ms_my"
                                                | "de_de"
                                                | "es_es"
                                                | "fr_fr"
                                                | "it_it"
                                                | "pt_br"
                                                | "vi_vn"
                                                | "ru_ru"
                                                | "th_th"
                                                | "ko_kr";
                                            name?: string;
                                            description?: string;
                                            help_use?: string;
                                        }>;
                                        common_categories?: Array<string>;
                                        events?: Array<string>;
                                        status?: number;
                                        create_time?: string;
                                        publish_time?: string;
                                        ability?: {
                                            gadget?: {
                                                enable_pc_mode?: number;
                                                schema_urls?: Array<string>;
                                                pc_use_mobile_pkg?: boolean;
                                                pc_version?: string;
                                                mobile_version?: string;
                                                mobile_min_lark_version?: string;
                                                pc_min_lark_version?: string;
                                            };
                                            web_app?: {
                                                pc_url?: string;
                                                mobile_url?: string;
                                            };
                                            bot?: {
                                                card_request_url?: string;
                                                bot_menu_enable?: boolean;
                                                bot_menus?: Array<{
                                                    menu_id?: string;
                                                    parent_menu_id?: string;
                                                    sort?: number;
                                                    default_name?: string;
                                                    i18n_name?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    redirect_link?: {
                                                        pc_url?: string;
                                                        mobile_url?: string;
                                                    };
                                                    event_key?: string;
                                                    icon_file_key?: string;
                                                    ud_icon?: {
                                                        token?: string;
                                                        color?: string;
                                                    };
                                                    menu_content_type?: number;
                                                }>;
                                                bot_menu_display_strategy?: number;
                                            };
                                            workplace_widgets?: Array<{
                                                min_lark_version?: string;
                                            }>;
                                            navigate?: {
                                                pc?: {
                                                    version?: string;
                                                    image_url?: string;
                                                    hover_image_url?: string;
                                                };
                                                mobile?: {
                                                    version?: string;
                                                    image_url?: string;
                                                    hover_image_url?: string;
                                                };
                                            };
                                            cloud_doc?: {
                                                space_url?: string;
                                                i18n?: Array<{
                                                    i18n_key:
                                                        | "zh_cn"
                                                        | "en_us"
                                                        | "ja_jp";
                                                    name?: string;
                                                    read_description?: string;
                                                    write_description?: string;
                                                }>;
                                                icon_url?: string;
                                                mode?: number;
                                            };
                                            docs_blocks?: Array<{
                                                block_type_id?: string;
                                                i18n?: Array<{
                                                    i18n_key?:
                                                        | "zh_cn"
                                                        | "en_us"
                                                        | "ja_jp";
                                                    name?: string;
                                                }>;
                                                mobile_icon_url?: string;
                                                pc_icon_url?: string;
                                            }>;
                                            message_action?: {
                                                pc_app_link?: string;
                                                mobile_app_link?: string;
                                                i18n?: Array<{
                                                    i18n_key?:
                                                        | "zh_cn"
                                                        | "en_us"
                                                        | "ja_jp";
                                                    name?: string;
                                                }>;
                                            };
                                            plus_menu?: {
                                                pc_app_link?: string;
                                                mobile_app_link?: string;
                                            };
                                        };
                                        remark?: {
                                            remark?: string;
                                            update_remark?: string;
                                            visibility?: {
                                                is_all?: boolean;
                                                visible_list?: {
                                                    open_ids?: Array<string>;
                                                    department_ids?: Array<string>;
                                                    group_ids?: Array<string>;
                                                };
                                                invisible_list?: {
                                                    open_ids?: Array<string>;
                                                    department_ids?: Array<string>;
                                                    group_ids?: Array<string>;
                                                };
                                            };
                                        };
                                        event_infos?: Array<{
                                            event_type?: string;
                                            event_name?: string;
                                            event_description?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications/:app_id/app_versions/:version_id`,
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
                        params: {
                            lang: "zh_cn" | "en_us" | "ja_jp";
                            page_size?: number;
                            page_token?: string;
                            order?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { app_id: string };
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
                                    `${this.domain}/open-apis/application/v6/applications/:app_id/app_versions`,
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
                                                        app_id: string;
                                                        version?: string;
                                                        version_id: string;
                                                        app_name?: string;
                                                        avatar_url?: string;
                                                        description?: string;
                                                        scopes?: Array<{
                                                            scope: string;
                                                            description?: string;
                                                            level?: number;
                                                            token_types?: Array<
                                                                | "tenant"
                                                                | "user"
                                                            >;
                                                        }>;
                                                        back_home_url?: string;
                                                        i18n?: Array<{
                                                            i18n_key:
                                                                | "zh_cn"
                                                                | "en_us"
                                                                | "ja_jp"
                                                                | "zh_hk"
                                                                | "zh_tw"
                                                                | "id_id"
                                                                | "ms_my"
                                                                | "de_de"
                                                                | "es_es"
                                                                | "fr_fr"
                                                                | "it_it"
                                                                | "pt_br"
                                                                | "vi_vn"
                                                                | "ru_ru"
                                                                | "th_th"
                                                                | "ko_kr";
                                                            name?: string;
                                                            description?: string;
                                                            help_use?: string;
                                                        }>;
                                                        common_categories?: Array<string>;
                                                        events?: Array<string>;
                                                        status?: number;
                                                        create_time?: string;
                                                        publish_time?: string;
                                                        ability?: {
                                                            gadget?: {
                                                                enable_pc_mode?: number;
                                                                schema_urls?: Array<string>;
                                                                pc_use_mobile_pkg?: boolean;
                                                                pc_version?: string;
                                                                mobile_version?: string;
                                                                mobile_min_lark_version?: string;
                                                                pc_min_lark_version?: string;
                                                            };
                                                            web_app?: {
                                                                pc_url?: string;
                                                                mobile_url?: string;
                                                            };
                                                            bot?: {
                                                                card_request_url?: string;
                                                                bot_menu_enable?: boolean;
                                                                bot_menus?: Array<{
                                                                    menu_id?: string;
                                                                    parent_menu_id?: string;
                                                                    sort?: number;
                                                                    default_name?: string;
                                                                    i18n_name?: Record<
                                                                        string,
                                                                        string
                                                                    >;
                                                                    redirect_link?: {
                                                                        pc_url?: string;
                                                                        mobile_url?: string;
                                                                    };
                                                                    event_key?: string;
                                                                    icon_file_key?: string;
                                                                    ud_icon?: {
                                                                        token?: string;
                                                                        color?: string;
                                                                    };
                                                                    menu_content_type?: number;
                                                                }>;
                                                                bot_menu_display_strategy?: number;
                                                            };
                                                            workplace_widgets?: Array<{
                                                                min_lark_version?: string;
                                                            }>;
                                                            navigate?: {
                                                                pc?: {
                                                                    version?: string;
                                                                    image_url?: string;
                                                                    hover_image_url?: string;
                                                                };
                                                                mobile?: {
                                                                    version?: string;
                                                                    image_url?: string;
                                                                    hover_image_url?: string;
                                                                };
                                                            };
                                                            cloud_doc?: {
                                                                space_url?: string;
                                                                i18n?: Array<{
                                                                    i18n_key:
                                                                        | "zh_cn"
                                                                        | "en_us"
                                                                        | "ja_jp";
                                                                    name?: string;
                                                                    read_description?: string;
                                                                    write_description?: string;
                                                                }>;
                                                                icon_url?: string;
                                                                mode?: number;
                                                            };
                                                            docs_blocks?: Array<{
                                                                block_type_id?: string;
                                                                i18n?: Array<{
                                                                    i18n_key?:
                                                                        | "zh_cn"
                                                                        | "en_us"
                                                                        | "ja_jp";
                                                                    name?: string;
                                                                }>;
                                                                mobile_icon_url?: string;
                                                                pc_icon_url?: string;
                                                            }>;
                                                            message_action?: {
                                                                pc_app_link?: string;
                                                                mobile_app_link?: string;
                                                                i18n?: Array<{
                                                                    i18n_key?:
                                                                        | "zh_cn"
                                                                        | "en_us"
                                                                        | "ja_jp";
                                                                    name?: string;
                                                                }>;
                                                            };
                                                            plus_menu?: {
                                                                pc_app_link?: string;
                                                                mobile_app_link?: string;
                                                            };
                                                        };
                                                        remark?: {
                                                            remark?: string;
                                                            update_remark?: string;
                                                            visibility?: {
                                                                is_all?: boolean;
                                                                visible_list?: {
                                                                    open_ids?: Array<string>;
                                                                    department_ids?: Array<string>;
                                                                    group_ids?: Array<string>;
                                                                };
                                                                invisible_list?: {
                                                                    open_ids?: Array<string>;
                                                                    department_ids?: Array<string>;
                                                                    group_ids?: Array<string>;
                                                                };
                                                            };
                                                        };
                                                        event_infos?: Array<{
                                                            event_type?: string;
                                                            event_name?: string;
                                                            event_description?: string;
                                                        }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=list&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=application.app_version&version=v6 document }
                 *
                 * 获取应用版本列表
                 *
                 * 根据 app_id 获取对应应用版本列表。
                 */
                list: async (
                    payload?: {
                        params: {
                            lang: "zh_cn" | "en_us" | "ja_jp";
                            page_size?: number;
                            page_token?: string;
                            order?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
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
                                    items?: Array<{
                                        app_id: string;
                                        version?: string;
                                        version_id: string;
                                        app_name?: string;
                                        avatar_url?: string;
                                        description?: string;
                                        scopes?: Array<{
                                            scope: string;
                                            description?: string;
                                            level?: number;
                                            token_types?: Array<
                                                "tenant" | "user"
                                            >;
                                        }>;
                                        back_home_url?: string;
                                        i18n?: Array<{
                                            i18n_key:
                                                | "zh_cn"
                                                | "en_us"
                                                | "ja_jp"
                                                | "zh_hk"
                                                | "zh_tw"
                                                | "id_id"
                                                | "ms_my"
                                                | "de_de"
                                                | "es_es"
                                                | "fr_fr"
                                                | "it_it"
                                                | "pt_br"
                                                | "vi_vn"
                                                | "ru_ru"
                                                | "th_th"
                                                | "ko_kr";
                                            name?: string;
                                            description?: string;
                                            help_use?: string;
                                        }>;
                                        common_categories?: Array<string>;
                                        events?: Array<string>;
                                        status?: number;
                                        create_time?: string;
                                        publish_time?: string;
                                        ability?: {
                                            gadget?: {
                                                enable_pc_mode?: number;
                                                schema_urls?: Array<string>;
                                                pc_use_mobile_pkg?: boolean;
                                                pc_version?: string;
                                                mobile_version?: string;
                                                mobile_min_lark_version?: string;
                                                pc_min_lark_version?: string;
                                            };
                                            web_app?: {
                                                pc_url?: string;
                                                mobile_url?: string;
                                            };
                                            bot?: {
                                                card_request_url?: string;
                                                bot_menu_enable?: boolean;
                                                bot_menus?: Array<{
                                                    menu_id?: string;
                                                    parent_menu_id?: string;
                                                    sort?: number;
                                                    default_name?: string;
                                                    i18n_name?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    redirect_link?: {
                                                        pc_url?: string;
                                                        mobile_url?: string;
                                                    };
                                                    event_key?: string;
                                                    icon_file_key?: string;
                                                    ud_icon?: {
                                                        token?: string;
                                                        color?: string;
                                                    };
                                                    menu_content_type?: number;
                                                }>;
                                                bot_menu_display_strategy?: number;
                                            };
                                            workplace_widgets?: Array<{
                                                min_lark_version?: string;
                                            }>;
                                            navigate?: {
                                                pc?: {
                                                    version?: string;
                                                    image_url?: string;
                                                    hover_image_url?: string;
                                                };
                                                mobile?: {
                                                    version?: string;
                                                    image_url?: string;
                                                    hover_image_url?: string;
                                                };
                                            };
                                            cloud_doc?: {
                                                space_url?: string;
                                                i18n?: Array<{
                                                    i18n_key:
                                                        | "zh_cn"
                                                        | "en_us"
                                                        | "ja_jp";
                                                    name?: string;
                                                    read_description?: string;
                                                    write_description?: string;
                                                }>;
                                                icon_url?: string;
                                                mode?: number;
                                            };
                                            docs_blocks?: Array<{
                                                block_type_id?: string;
                                                i18n?: Array<{
                                                    i18n_key?:
                                                        | "zh_cn"
                                                        | "en_us"
                                                        | "ja_jp";
                                                    name?: string;
                                                }>;
                                                mobile_icon_url?: string;
                                                pc_icon_url?: string;
                                            }>;
                                            message_action?: {
                                                pc_app_link?: string;
                                                mobile_app_link?: string;
                                                i18n?: Array<{
                                                    i18n_key?:
                                                        | "zh_cn"
                                                        | "en_us"
                                                        | "ja_jp";
                                                    name?: string;
                                                }>;
                                            };
                                            plus_menu?: {
                                                pc_app_link?: string;
                                                mobile_app_link?: string;
                                            };
                                        };
                                        remark?: {
                                            remark?: string;
                                            update_remark?: string;
                                            visibility?: {
                                                is_all?: boolean;
                                                visible_list?: {
                                                    open_ids?: Array<string>;
                                                    department_ids?: Array<string>;
                                                    group_ids?: Array<string>;
                                                };
                                                invisible_list?: {
                                                    open_ids?: Array<string>;
                                                    department_ids?: Array<string>;
                                                    group_ids?: Array<string>;
                                                };
                                            };
                                        };
                                        event_infos?: Array<{
                                            event_type?: string;
                                            event_name?: string;
                                            event_description?: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications/:app_id/app_versions`,
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
             * application.openapi_options
             */
            applicationOpenapiOptions: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.openapi_options&apiName=get&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=application&resource=application.openapi_options&version=v6 document }
                 *
                 * 获取应用下OpenAPI管控选项
                 *
                 * 根据app_id获取应用下OpenAPI管控选项，目前支持选项有"可访问性"，接口返回通过 [更新应用下OpenAPI管控选项](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-openapi_options/patch) 更新的最新数据，包含访问状态为停用("Disable") 与启用("Enable") 所有OpenAPI管控选项。
                 *
                 * 支持获取企业内自建应用OpenAPI管控选项，仅企业内特定应用可申请权限调用此OpenAPI。
                 */
                get: async (
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
                                    openapi_options?: Array<{
                                        http_method: string;
                                        url_pattern: string;
                                        accessibility: {
                                            reason?: string;
                                            state: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications/:app_id/openapi_options`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.openapi_options&apiName=patch&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.openapi_options&version=v6 document }
                 *
                 * 更新应用下OpenAPI管控选项
                 *
                 * 根据app_id更新应用下OpenAPI管控选项，目前支持选项有"可访问性"。
                 *
                 * 支持更新企业内自建应用OpenAPI管控选项，仅企业内特定应用可申请权限调用此OpenAPI。
                 */
                patch: async (
                    payload?: {
                        data: {
                            openapi_options: Array<{
                                http_method: string;
                                url_pattern: string;
                                accessibility: {
                                    reason?: string;
                                    state: string;
                                };
                            }>;
                        };
                        path: { app_id: string };
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
                                `${this.domain}/open-apis/application/v6/applications/:app_id/openapi_options`,
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
             * application.contacts_range
             */
            applicationContactsRange: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.contacts_range&apiName=patch&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.contacts_range&version=v6 document }
                 *
                 * 更新应用通讯录权限范围配置
                 *
                 * 该接口用于更新当前企业内自建应用或已安装的商店应用的通讯录权限范围配置。更新后线上立即生效。
                 */
                patch: async (
                    payload?: {
                        data: {
                            contacts_range_type:
                                | "equal_to_availability"
                                | "some"
                                | "all";
                            add_visible_list?: {
                                user_ids?: Array<string>;
                                department_ids?: Array<string>;
                                group_ids?: Array<string>;
                            };
                            del_visible_list?: {
                                user_ids?: Array<string>;
                                department_ids?: Array<string>;
                                group_ids?: Array<string>;
                            };
                        };
                        params?: {
                            user_id_type?: "open_id" | "user_id" | "union_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                        };
                        path: { app_id: string };
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
                                `${this.domain}/open-apis/application/v6/applications/:app_id/contacts_range`,
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
             * application.app_secret
             */
            applicationAppSecret: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_secret&apiName=create&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=application&resource=application.app_secret&version=v6 document }
                 *
                 * 刷新企业内自建应用的app secret
                 *
                 * 该接口用于管理与刷新企业内自建应用app secret
                 */
                create: async (
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
                                data?: { app_secret?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications/:app_id/app_secret`,
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
             * application.collaborators
             */
            applicationCollaborators: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.collaborators&apiName=get&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=application&resource=application.collaborators&version=v6 document }
                 *
                 * 获取应用协作者列表
                 *
                 * 根据 app_id 获取应用（包括自建应用和商店应用）的协作者信息，包括应用的所有者、管理员、开发者、运营人员
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
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
                                    collaborators?: Array<{
                                        type:
                                            | "administrator"
                                            | "developer"
                                            | "operator";
                                        user_id: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications/:app_id/collaborators`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.collaborators&apiName=update&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=application&resource=application.collaborators&version=v6 document }
                 *
                 * 更新应用协作者
                 *
                 * 某个应用（包括自建应用和商店应用）中添加/移除应用协作者，添加后协作者将会收到添加通知。
                 *
                 * 若用 user_access_token 代表某个终端用户操作API，则需确保该用户为应用的所有者或管理员，否则无法操作成功。
                 */
                update: async (
                    payload?: {
                        data?: {
                            adds?: Array<{
                                type:
                                    | "administrator"
                                    | "developer"
                                    | "operator";
                                user_id: string;
                            }>;
                            removes?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { app_id: string };
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
                                `${this.domain}/open-apis/application/v6/applications/:app_id/collaborators`,
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
             * application.owner
             */
            applicationOwner: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.owner&apiName=update&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=application&resource=application.owner&version=v6 document }
                 *
                 * 转移应用所有者
                 *
                 * 将某个自建应用的所有者转移给另外一个人。
                 *
                 * 若用 user_access_token 代表某个终端用户操作API，则需确保该用户为应用当前的所有者，否则无法操作成功。
                 */
                update: async (
                    payload?: {
                        data: { owner_id: string };
                        params?: {
                            user_id_type?: "open_id" | "user_id" | "union_id";
                        };
                        path: { app_id: string };
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
                                `${this.domain}/open-apis/application/v6/applications/:app_id/owner`,
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
             * app_avatar
             */
            appAvatar: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_avatar&apiName=upload&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=application&resource=app_avatar&version=v6 document }
                 *
                 * 上传应用图标
                 *
                 * 上传应用图标
                 */
                upload: async (
                    payload?: {
                        data: { avatar: Buffer | fs.ReadStream };
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
                                data?: { url?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/app_avatar/upload`,
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
            /**
             * application.ability
             */
            applicationAbility: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.ability&apiName=patch&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.ability&version=v6 document }
                 *
                 * 更新应用能力
                 *
                 * 通过该接口可更新自建应用的应用能力（机器人、网页应用等）相关配置，不传入的参数则保持不变，仅针对传入的参数则进行更新。如果应用正在审核中，则无法更新配置
                 *
                 * - 仅支持更新[开发者后台](https://open.feishu.cn/app)创建的自建应用，不包含通过机器人助手等其他渠道创建的自建应用;- 应用配置修改后需要[提交发布](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-publish/create)，并审核通过后才会在线上生效;;- 若用 user_access_token 代表某个终端用户操作API，则需确保该用户为应用的所有者、管理员、开发者，否则无法操作成功;;- 若用 tenant_access_token 代表应用操作API，则可以操作企业内的任何一个自建应用
                 */
                patch: async (
                    payload?: {
                        data?: {
                            web_app?: {
                                enable: boolean;
                                pc_url?: string;
                                pc_new_page_open_mode?: "new_tab" | "browser";
                                mobile_url?: string;
                            };
                            bot?: {
                                enable: boolean;
                                message_card_callback_url?: string;
                                i18ns?: Array<{
                                    i18n_key:
                                        | "zh_cn"
                                        | "en_us"
                                        | "ja_jp"
                                        | "zh_hk"
                                        | "zh_tw"
                                        | "id_id"
                                        | "ms_my"
                                        | "de_de"
                                        | "es_es"
                                        | "fr_fr"
                                        | "it_it"
                                        | "pt_br"
                                        | "vi_vn"
                                        | "ru_ru"
                                        | "th_th"
                                        | "ko_kr";
                                    get_started_desc: string;
                                }>;
                            };
                        };
                        path: { app_id: string };
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
                                `${this.domain}/open-apis/application/v6/applications/:app_id/ability`,
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
             * application.base
             */
            applicationBase: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.base&apiName=patch&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.base&version=v6 document }
                 *
                 * 更新应用基础信息配置
                 *
                 * 通过该接口可更新自建应用的基础信息（名称、头像等），不传入的参数则保持不变，仅针对传入的参数则进行更新。如果应用正在审核中，则无法更新配置
                 *
                 * - 仅支持更新[开发者后台](https://open.feishu.cn/app)创建的自建应用，不包含通过机器人助手等其他渠道创建的自建应用;- 应用配置修改后需要[提交发布](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-publish/create)，并审核通过后才会在线上生效;;- 若用 user_access_token 代表某个终端用户操作API，则需确保该用户为应用的所有者、管理员、开发者，否则无法操作成功;;- 若用 tenant_access_token 代表应用操作API，则可以操作企业内的任何一个自建应用
                 */
                patch: async (
                    payload?: {
                        data?: {
                            i18ns?: Array<{
                                i18n_key:
                                    | "zh_cn"
                                    | "en_us"
                                    | "ja_jp"
                                    | "zh_hk"
                                    | "zh_tw"
                                    | "id_id"
                                    | "ms_my"
                                    | "de_de"
                                    | "es_es"
                                    | "fr_fr"
                                    | "it_it"
                                    | "pt_br"
                                    | "vi_vn"
                                    | "ru_ru"
                                    | "th_th"
                                    | "ko_kr";
                                name?: string;
                                description?: string;
                                help_use?: string;
                            }>;
                            avatar_url?: string;
                            homepage_url?: string;
                        };
                        path: { app_id: string };
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
                                `${this.domain}/open-apis/application/v6/applications/:app_id/base`,
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
             * application.publish
             */
            applicationPublish: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.publish&apiName=create&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=application&resource=application.publish&version=v6 document }
                 *
                 * 提交发布自建应用
                 *
                 * 自建应用提交应用发布，如果当前自建应用没有待发布的版本，则会自动创建一个版本，如果有待发布的版本，则直接提交该版本。
                 *
                 * 仅支持发布[开发者后台](https://open.feishu.cn/app)创建的自建应用，不包含通过机器人助手等其他渠道创建的自建应用;;- 若用 user_access_token 代表某个终端用户操作API，则需确保该用户为应用的所有者、管理员，否则无法操作成功;;- 若用 tenant_access_token 代表应用操作API，则可以操作企业内的任何一个自建应用
                 */
                create: async (
                    payload?: {
                        data: {
                            mobile_default_ability?:
                                | "gadget"
                                | "web_app"
                                | "bot";
                            pc_default_ability?: "gadget" | "web_app" | "bot";
                            remark: string;
                            changelog: string;
                            version?: string;
                        };
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
                                    version_id?: string;
                                    version?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/applications/:app_id/publish`,
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
             * application.management
             */
            applicationManagement: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.management&apiName=update&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=application&resource=application.management&version=v6 document }
                 *
                 * 启停用应用
                 *
                 * 可停用或启用企业内已安装的自建应用与商店应用。
                 */
                update: async (
                    payload?: {
                        data?: { enable?: boolean };
                        path: { app_id: string };
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
                                `${this.domain}/open-apis/application/v6/applications/:app_id/management`,
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
             * scope
             */
            scope: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=scope&apiName=list&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=scope&version=v6 document }
                 *
                 * 查询租户授权状态
                 *
                 * 调用该接口查询当前应用向租户申请授权的状态。
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
                                    scopes?: Array<{
                                        scope_name: string;
                                        grant_status: number;
                                        scope_type?: "tenant" | "user";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/scopes`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=scope&apiName=apply&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=apply&project=application&resource=scope&version=v6 document }
                 *
                 * 向管理员申请授权
                 *
                 * 调用该接口以应用身份向租户管理员申请应用内需要审核的 API 权限。
                 *
                 * **注意**：同一租户下，其他员工在一个应用的同一个版本向管理员申请授权的次数不能超过 10 次。
                 */
                apply: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/scopes/apply`,
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
             * app_custom_category
             */
            appCustomCategory: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            lang: "zh_cn" | "en_us" | "ja_jp";
                            page_token?: string;
                            page_size?: number;
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
                                    `${this.domain}/open-apis/application/v6/app_custom_categories`,
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
                                                    items: Array<{
                                                        i18n_key:
                                                            | "zh_cn"
                                                            | "en_us"
                                                            | "ja_jp";
                                                        description: string;
                                                        app_ids?: Array<string>;
                                                    }>;
                                                    has_more: boolean;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_custom_category&apiName=list&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=app_custom_category&version=v6 document }
                 *
                 * 获取当前设置的自定义分组列表
                 *
                 * 获取当前设置的自定义分组列表。
                 */
                list: async (
                    payload?: {
                        params: {
                            lang: "zh_cn" | "en_us" | "ja_jp";
                            page_token?: string;
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
                                    items: Array<{
                                        i18n_key: "zh_cn" | "en_us" | "ja_jp";
                                        description: string;
                                        app_ids?: Array<string>;
                                    }>;
                                    has_more: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/app_custom_categories`,
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
             * app_badge
             */
            appBadge: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_badge&apiName=set&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=set&project=application&resource=app_badge&version=v6 document }
                 *
                 * 更新应用红点
                 *
                 * 更新应用红点信息，用于工作台场景
                 */
                set: async (
                    payload?: {
                        data: {
                            user_id: string;
                            version: string;
                            extra?: string;
                            pc?: { web_app?: number; gadget?: number };
                            mobile?: { web_app?: number; gadget?: number };
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
                                `${this.domain}/open-apis/application/v6/app_badge/set`,
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
             * app_admin_user
             */
            appAdminUser: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            admin_type?: string;
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
                                    `${this.domain}/open-apis/application/v6/app_admin_users`,
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
                                                    user_list?: Array<{
                                                        admin_type?: Array<string>;
                                                        user_id?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_admin_user&apiName=list&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=app_admin_user&version=v6 document }
                 *
                 * 查询应用管理员列表（新）
                 *
                 * 查询审核应用的管理员列表，返回 所有 管理员账户列表；返回管理员的角色（超级管理员或管理员）以及 用户ID。提示：如果该管理员同时是超级管理员 又是管理员，则同时返回两个角色。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            admin_type?: string;
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
                                    user_list?: Array<{
                                        admin_type?: Array<string>;
                                        user_id?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/app_admin_users`,
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
             * bot_display_info
             */
            botDisplayInfo: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=bot_display_info&apiName=mget&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=application&resource=bot_display_info&version=v6 document }
                 */
                mget: async (
                    payload?: {
                        data?: { bot_ids?: Array<string> };
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
                                    bot_infos?: Record<
                                        string,
                                        {
                                            id?: string;
                                            name?: string;
                                            avatar_url?: string;
                                            tenant_id?: string;
                                            i18n_names?: Record<string, string>;
                                            i18n_descriptions?: Record<
                                                string,
                                                string
                                            >;
                                        }
                                    >;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/bot_display_info/mget`,
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
             * user_visible_application
             */
            userVisibleApplication: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "user_id" | "union_id";
                            user_id: string;
                            lang?:
                                | "zh_cn"
                                | "en_us"
                                | "ja_jp"
                                | "zh_hk"
                                | "zh_tw"
                                | "id_id"
                                | "ms_my"
                                | "de_de"
                                | "es_es"
                                | "fr_fr"
                                | "it_it"
                                | "pt_br"
                                | "vi_vn"
                                | "ru_ru"
                                | "th_th"
                                | "ko_kr";
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
                                    `${this.domain}/open-apis/application/v6/user_visible_applications`,
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
                                                        app_id: string;
                                                        creator_id?: string;
                                                        status?: number;
                                                        scene_type?: number;
                                                        payment_type?: number;
                                                        create_source?:
                                                            | "developer_console"
                                                            | "base"
                                                            | "app_engine"
                                                            | "bot_builder"
                                                            | "aily"
                                                            | "unknown";
                                                        redirect_urls?: Array<string>;
                                                        online_version_id?: string;
                                                        unaudit_version_id?: string;
                                                        app_name?: string;
                                                        avatar_url?: string;
                                                        description?: string;
                                                        scopes?: Array<{
                                                            scope: string;
                                                            description?: string;
                                                            level?: number;
                                                            token_types?: Array<
                                                                | "tenant"
                                                                | "user"
                                                            >;
                                                        }>;
                                                        back_home_url?: string;
                                                        i18n?: Array<{
                                                            i18n_key:
                                                                | "zh_cn"
                                                                | "en_us"
                                                                | "ja_jp"
                                                                | "zh_hk"
                                                                | "zh_tw"
                                                                | "id_id"
                                                                | "ms_my"
                                                                | "de_de"
                                                                | "es_es"
                                                                | "fr_fr"
                                                                | "it_it"
                                                                | "pt_br"
                                                                | "vi_vn"
                                                                | "ru_ru"
                                                                | "th_th"
                                                                | "ko_kr";
                                                            name?: string;
                                                            description?: string;
                                                            help_use?: string;
                                                        }>;
                                                        primary_language?:
                                                            | "zh_cn"
                                                            | "en_us"
                                                            | "ja_jp";
                                                        common_categories?: Array<string>;
                                                        owner?: {
                                                            type: number;
                                                            owner_id?: string;
                                                            name?: string;
                                                            help_desk?: string;
                                                            email?: string;
                                                            phone?: string;
                                                            customer_service_account?: string;
                                                        };
                                                        mobile_default_ability?:
                                                            | "gadget"
                                                            | "web_app"
                                                            | "bot";
                                                        pc_default_ability?:
                                                            | "gadget"
                                                            | "web_app"
                                                            | "bot";
                                                        secret?: string;
                                                        event?: {
                                                            subscription_type?: string;
                                                            request_url?: string;
                                                            subscribed_events?: Array<string>;
                                                        };
                                                        callback?: {
                                                            callback_type?: string;
                                                            request_url?: string;
                                                            subscribed_callbacks?: Array<string>;
                                                        };
                                                        encryption?: {
                                                            encryption_key?: string;
                                                            verification_token?: string;
                                                        };
                                                        security?: {
                                                            redirect_urls?: Array<string>;
                                                            allowed_ips?: Array<string>;
                                                            h5_trusted_domains?: Array<string>;
                                                            web_view_trusted_domains?: Array<string>;
                                                            allowed_schemas?: Array<string>;
                                                            allowed_server_domains?: Array<string>;
                                                        };
                                                        allow_refresh_token?: boolean;
                                                        callback_info?: {
                                                            callback_type?:
                                                                | "webhook"
                                                                | "websocket";
                                                            request_url?: string;
                                                            subscribed_callbacks?: Array<string>;
                                                        };
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    total_count?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=user_visible_application&apiName=list&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=user_visible_application&version=v6 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "user_id" | "union_id";
                            user_id: string;
                            lang?:
                                | "zh_cn"
                                | "en_us"
                                | "ja_jp"
                                | "zh_hk"
                                | "zh_tw"
                                | "id_id"
                                | "ms_my"
                                | "de_de"
                                | "es_es"
                                | "fr_fr"
                                | "it_it"
                                | "pt_br"
                                | "vi_vn"
                                | "ru_ru"
                                | "th_th"
                                | "ko_kr";
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
                                        app_id: string;
                                        creator_id?: string;
                                        status?: number;
                                        scene_type?: number;
                                        payment_type?: number;
                                        create_source?:
                                            | "developer_console"
                                            | "base"
                                            | "app_engine"
                                            | "bot_builder"
                                            | "aily"
                                            | "unknown";
                                        redirect_urls?: Array<string>;
                                        online_version_id?: string;
                                        unaudit_version_id?: string;
                                        app_name?: string;
                                        avatar_url?: string;
                                        description?: string;
                                        scopes?: Array<{
                                            scope: string;
                                            description?: string;
                                            level?: number;
                                            token_types?: Array<
                                                "tenant" | "user"
                                            >;
                                        }>;
                                        back_home_url?: string;
                                        i18n?: Array<{
                                            i18n_key:
                                                | "zh_cn"
                                                | "en_us"
                                                | "ja_jp"
                                                | "zh_hk"
                                                | "zh_tw"
                                                | "id_id"
                                                | "ms_my"
                                                | "de_de"
                                                | "es_es"
                                                | "fr_fr"
                                                | "it_it"
                                                | "pt_br"
                                                | "vi_vn"
                                                | "ru_ru"
                                                | "th_th"
                                                | "ko_kr";
                                            name?: string;
                                            description?: string;
                                            help_use?: string;
                                        }>;
                                        primary_language?:
                                            | "zh_cn"
                                            | "en_us"
                                            | "ja_jp";
                                        common_categories?: Array<string>;
                                        owner?: {
                                            type: number;
                                            owner_id?: string;
                                            name?: string;
                                            help_desk?: string;
                                            email?: string;
                                            phone?: string;
                                            customer_service_account?: string;
                                        };
                                        mobile_default_ability?:
                                            | "gadget"
                                            | "web_app"
                                            | "bot";
                                        pc_default_ability?:
                                            | "gadget"
                                            | "web_app"
                                            | "bot";
                                        secret?: string;
                                        event?: {
                                            subscription_type?: string;
                                            request_url?: string;
                                            subscribed_events?: Array<string>;
                                        };
                                        callback?: {
                                            callback_type?: string;
                                            request_url?: string;
                                            subscribed_callbacks?: Array<string>;
                                        };
                                        encryption?: {
                                            encryption_key?: string;
                                            verification_token?: string;
                                        };
                                        security?: {
                                            redirect_urls?: Array<string>;
                                            allowed_ips?: Array<string>;
                                            h5_trusted_domains?: Array<string>;
                                            web_view_trusted_domains?: Array<string>;
                                            allowed_schemas?: Array<string>;
                                            allowed_server_domains?: Array<string>;
                                        };
                                        allow_refresh_token?: boolean;
                                        callback_info?: {
                                            callback_type?:
                                                | "webhook"
                                                | "websocket";
                                            request_url?: string;
                                            subscribed_callbacks?: Array<string>;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                    total_count?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v6/user_visible_applications`,
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
             * application.config
             */
            applicationConfig: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.config&apiName=patch&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.config&version=v6 document }
                 *
                 * 更新应用开发配置
                 *
                 * 通过该接口可更新自建应用的应用的开发配置（通讯录、安全、可见性等），不传入的参数则保持不变，仅针对传入的参数则进行更新。如果应用正在审核中，则无法更新配置
                 *
                 * - 仅支持更新[开发者后台](https://open.feishu.cn/app)创建的自建应用，不包含通过机器人助手等其他渠道创建的自建应用;- 免审权限、事件订阅服务器地址、重定向URL、IP白名单、H5可信域名、协议名白名单修改后立即生效，其他应用配置修改后需要[提交发布](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-publish/create)，并审核通过后才会在线上生效。为确保所有配置均能在线上生效，建议修改后提交应用发布。;;- 若用 user_access_token 代表某个终端用户操作API，则需确保该用户为应用的所有者、管理员、开发者，否则无法操作成功;;- 若用 tenant_access_token 代表应用操作API，则可以操作企业内的任何一个自建应用
                 */
                patch: async (
                    payload?: {
                        data?: {
                            scope?: {
                                add_scopes?: Array<{
                                    scope_name: string;
                                    token_type: "user" | "tenant";
                                }>;
                                remove_scopes?: Array<{
                                    scope_name: string;
                                    token_type: "user" | "tenant";
                                }>;
                            };
                            event?: {
                                subscription_type: "webhook";
                                request_url?: string;
                                add_events?: Array<string>;
                                remove_events?: Array<string>;
                            };
                            security?: {
                                add?: {
                                    redirect_urls?: Array<string>;
                                    allowed_ips?: Array<string>;
                                    h5_trusted_domains?: Array<string>;
                                    web_view_trusted_domains?: Array<string>;
                                    allowed_schemas?: Array<string>;
                                    allowed_server_domains?: Array<string>;
                                };
                                remove?: {
                                    redirect_urls?: Array<string>;
                                    allowed_ips?: Array<string>;
                                    h5_trusted_domains?: Array<string>;
                                    web_view_trusted_domains?: Array<string>;
                                    allowed_schemas?: Array<string>;
                                    allowed_server_domains?: Array<string>;
                                };
                            };
                            visibility?: {
                                is_visible_to_all: boolean;
                                visible_list?: {
                                    user_ids?: Array<string>;
                                    department_ids?: Array<string>;
                                };
                            };
                            contacts?: {
                                contacts_range_type:
                                    | "equal_to_availability"
                                    | "some"
                                    | "all";
                                visible_list?: {
                                    user_ids?: Array<string>;
                                    department_ids?: Array<string>;
                                };
                            };
                            event_and_callback_encrypt_strategy?: {
                                encryption_key?: string;
                                verification_token?: string;
                            };
                            callback?: {
                                callback_type: "webhook" | "websocket";
                                request_url?: string;
                                add_callbacks?: Array<string>;
                                remove_callbacks?: Array<string>;
                            };
                        };
                        params?: {
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            user_id_type?: "open_id" | "user_id" | "union_id";
                        };
                        path: { app_id: string };
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
                                `${this.domain}/open-apis/application/v6/applications/:app_id/config`,
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
             * larksuite_cli_app
             */
            larksuiteCliApp: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=larksuite_cli_app&apiName=probe&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=probe&project=application&resource=larksuite_cli_app&version=v6 document }
                 *
                 * 飞书cli应用探活接口
                 */
                probe: async (
                    payload?: {
                        data?: { from?: string };
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
                                `${this.domain}/open-apis/application/v6/larksuite_cli_app/probe`,
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
        v7: {
            /**
             * application
             */
            application: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=create&version=v7 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=application&resource=application&version=v7 document }
                 *
                 * 创建企业自建应用
                 *
                 * 创建一个企业自建应用，创建应用后的状态为待发布状态。可进入飞书开放平台查看该应用。
                 */
                create: async (
                    payload?: {
                        data: {
                            avatar?: string;
                            owner_id?: string;
                            i18n: Array<{
                                i18n_key:
                                    | "zh_cn"
                                    | "en_us"
                                    | "ja_jp"
                                    | "zh_hk"
                                    | "zh_tw"
                                    | "id_id"
                                    | "ms_my"
                                    | "de_de"
                                    | "es_es"
                                    | "fr_fr"
                                    | "it_it"
                                    | "pt_br"
                                    | "vi_vn"
                                    | "ru_ru"
                                    | "th_th"
                                    | "ko_kr";
                                name: string;
                                description?: string;
                                help_use?: string;
                            }>;
                            app_id?: string;
                            app_secret?: string;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: { app_id?: string; app_secret?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v7/applications`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=is_test_app&version=v7 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=is_test_app&project=application&resource=application&version=v7 document }
                 *
                 * 判定一个测试应用是否与当前应用的有测试关联关系
                 */
                isTestApp: async (
                    payload?: {
                        data: { test_app_id: string };
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
                                data?: { is_test_app?: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v7/applications/:app_id/is_test_app`,
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
             * application.base
             */
            applicationBase: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.base&apiName=patch&version=v7 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.base&version=v7 document }
                 *
                 * 更新应用基础信息配置
                 *
                 * 通过该接口可更新自建应用的基础信息（名称、头像等），不传入的参数则保持不变，仅针对传入的参数则进行更新。如果应用正在审核中，则无法更新配置
                 *
                 * - 仅支持更新[开发者后台](https://open.feishu.cn/app)创建的自建应用，不包含通过机器人助手等其他渠道创建的自建应用;- 应用配置修改后需要[提交发布](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v7/application-v7/application-publish/create)，并审核通过后才会在线上生效;;- 若用 user_access_token 代表某个终端用户操作API，则需确保该用户为应用的所有者、管理员、开发者，否则无法操作成功;;- 若用 tenant_access_token 代表应用操作API，则仅可以操作应用自身
                 */
                patch: async (
                    payload?: {
                        data?: {
                            i18ns?: Array<{
                                i18n_key:
                                    | "zh_cn"
                                    | "en_us"
                                    | "ja_jp"
                                    | "zh_hk"
                                    | "zh_tw"
                                    | "id_id"
                                    | "ms_my"
                                    | "de_de"
                                    | "es_es"
                                    | "fr_fr"
                                    | "it_it"
                                    | "pt_br"
                                    | "vi_vn"
                                    | "ru_ru"
                                    | "th_th"
                                    | "ko_kr";
                                name?: string;
                                description?: string;
                                help_use?: string;
                            }>;
                            avatar_url?: string;
                            homepage_url?: string;
                        };
                        path: { app_id: string };
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
                                `${this.domain}/open-apis/application/v7/applications/:app_id/base`,
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
             * application.publish
             */
            applicationPublish: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.publish&apiName=create&version=v7 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=application&resource=application.publish&version=v7 document }
                 *
                 * 提交发布自建应用
                 *
                 * 自建应用提交应用发布，如果当前自建应用没有待发布的版本，则会自动创建一个版本，如果有待发布的版本，则直接提交该版本。
                 *
                 * 仅支持发布[开发者后台](https://open.feishu.cn/app)创建的自建应用，不包含通过机器人助手等其他渠道创建的自建应用;;- 若用 user_access_token 代表某个终端用户操作API，则需确保该用户为应用的所有者、管理员，否则无法操作成功;;- 若用 tenant_access_token 代表应用操作API，则仅可操作自身
                 */
                create: async (
                    payload?: {
                        data: {
                            mobile_default_ability?:
                                | "gadget"
                                | "web_app"
                                | "bot";
                            pc_default_ability?: "gadget" | "web_app" | "bot";
                            remark: string;
                            changelog: string;
                            version?: string;
                        };
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
                                    version_id?: string;
                                    version?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v7/applications/:app_id/publish`,
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
             * app_avatar.upload
             */
            appAvatarUpload: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_avatar.upload&apiName=create&version=v7 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=application&resource=app_avatar.upload&version=v7 document }
                 *
                 * 上传应用图标
                 *
                 * 上传应用图标
                 */
                create: async (
                    payload?: {
                        data: { avatar: Buffer | fs.ReadStream };
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
                                data?: { url?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v7/app_avatar/upload`,
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
            /**
             * application.config
             */
            applicationConfig: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.config&apiName=patch&version=v7 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.config&version=v7 document }
                 *
                 * 更新应用开发配置
                 *
                 * 通过该接口可更新自建应用的应用的开发配置（通讯录、安全、可见性等），不传入的参数则保持不变，仅针对传入的参数则进行更新。如果应用正在审核中，则无法更新配置
                 *
                 * - 仅支持更新[开发者后台](https://open.feishu.cn/app)创建的自建应用，不包含通过机器人助手等其他渠道创建的自建应用;- 免审权限、事件订阅服务器地址、重定向URL、IP白名单、H5可信域名、协议名白名单修改后立即生效，其他应用配置修改后需要[提交发布](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v7/application-v7/application-publish/create)，并审核通过后才会在线上生效。为确保所有配置均能在线上生效，建议修改后提交应用发布。;;- 若用 user_access_token 代表某个终端用户操作API，则需确保该用户为应用的所有者、管理员、开发者，否则无法操作成功;;- 若用 tenant_access_token 代表应用操作API，则仅可以操作自身
                 */
                patch: async (
                    payload?: {
                        data?: {
                            scope?: {
                                add_scopes?: Array<{
                                    scope_name: string;
                                    token_type: "user" | "tenant";
                                }>;
                                remove_scopes?: Array<{
                                    scope_name: string;
                                    token_type: "user" | "tenant";
                                }>;
                            };
                            event?: {
                                subscription_type: "webhook" | "websocket";
                                request_url?: string;
                                add_events?: Array<string>;
                                remove_events?: Array<string>;
                            };
                            security?: {
                                add?: {
                                    redirect_urls?: Array<string>;
                                    allowed_ips?: Array<string>;
                                    h5_trusted_domains?: Array<string>;
                                    web_view_trusted_domains?: Array<string>;
                                    allowed_schemas?: Array<string>;
                                    allowed_server_domains?: Array<string>;
                                };
                                remove?: {
                                    redirect_urls?: Array<string>;
                                    allowed_ips?: Array<string>;
                                    h5_trusted_domains?: Array<string>;
                                    web_view_trusted_domains?: Array<string>;
                                    allowed_schemas?: Array<string>;
                                    allowed_server_domains?: Array<string>;
                                };
                                allow_refresh_token?: boolean;
                            };
                            visibility?: {
                                is_visible_to_all: boolean;
                                visible_list?: {
                                    user_ids?: Array<string>;
                                    department_ids?: Array<string>;
                                };
                            };
                            contacts?: {
                                contacts_range_type:
                                    | "equal_to_availability"
                                    | "some"
                                    | "all";
                                visible_list?: {
                                    user_ids?: Array<string>;
                                    department_ids?: Array<string>;
                                };
                            };
                            event_and_callback_encrypt_strategy?: {
                                encryption_key?: string;
                                verification_token?: string;
                            };
                            callback?: {
                                callback_type: "webhook" | "websocket";
                                request_url?: string;
                                add_callbacks?: Array<string>;
                                remove_callbacks?: Array<string>;
                            };
                        };
                        params?: {
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            user_id_type?: "open_id" | "user_id" | "union_id";
                        };
                        path: { app_id: string };
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
                                `${this.domain}/open-apis/application/v7/applications/:app_id/config`,
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
             * app_slash_command
             */
            appSlashCommand: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_slash_command&apiName=delete_app_slash_command&version=v7 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete_app_slash_command&project=application&resource=app_slash_command&version=v7 document }
                 *
                 * OAPI: 删除单条 Slash Command
                 */
                deleteAppSlashCommand: async (
                    payload?: {
                        path: { command_id: string };
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
                                `${this.domain}/open-apis/application/v7/app_slash_commands/:command_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_slash_command&apiName=patch_app_slash_command&version=v7 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch_app_slash_command&project=application&resource=app_slash_command&version=v7 document }
                 *
                 * 修改 App Slash Command
                 *
                 * 根据 Command ID 对 App Slash Command 的名称、描述等进行修改
                 */
                patchAppSlashCommand: async (
                    payload?: {
                        data?: {
                            command?: string;
                            description?: {
                                i18n?: {
                                    zh_cn?: string;
                                    en_us?: string;
                                    ja_jp?: string;
                                    zh_hk?: string;
                                    zh_tw?: string;
                                    de_de?: string;
                                    es_es?: string;
                                    fr_fr?: string;
                                    hi_in?: string;
                                    id_id?: string;
                                    it_it?: string;
                                    ko_kr?: string;
                                    pt_br?: string;
                                    ru_ru?: string;
                                    th_th?: string;
                                    vi_vn?: string;
                                };
                                default_value?: string;
                            };
                            icon?: { icon_key?: string };
                        };
                        path: { command_id: string };
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
                                    command_id?: string;
                                    command?: string;
                                    description?: {
                                        i18n?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                            zh_hk?: string;
                                            zh_tw?: string;
                                            de_de?: string;
                                            es_es?: string;
                                            fr_fr?: string;
                                            hi_in?: string;
                                            id_id?: string;
                                            it_it?: string;
                                            ko_kr?: string;
                                            pt_br?: string;
                                            ru_ru?: string;
                                            th_th?: string;
                                            vi_vn?: string;
                                        };
                                        default_value?: string;
                                    };
                                    update_time?: string;
                                    icon?: { icon_key?: string };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v7/app_slash_commands/:command_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_slash_command&apiName=list_app_slash_commands&version=v7 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_app_slash_commands&project=application&resource=app_slash_command&version=v7 document }
                 *
                 * OAPI: 查询 Slash Command 列表
                 */
                listAppSlashCommands: async (
                    payload?: {},
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
                                        command_id?: string;
                                        command?: string;
                                        description?: {
                                            i18n?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                                zh_hk?: string;
                                                zh_tw?: string;
                                                de_de?: string;
                                                es_es?: string;
                                                fr_fr?: string;
                                                hi_in?: string;
                                                id_id?: string;
                                                it_it?: string;
                                                ko_kr?: string;
                                                pt_br?: string;
                                                ru_ru?: string;
                                                th_th?: string;
                                                vi_vn?: string;
                                            };
                                            default_value?: string;
                                        };
                                        create_time?: string;
                                        update_time?: string;
                                        icon?: { icon_key?: string };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v7/app_slash_commands`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_slash_command&apiName=create_app_slash_command&version=v7 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_app_slash_command&project=application&resource=app_slash_command&version=v7 document }
                 *
                 * 创建 App Slash Command
                 *
                 * 根据 access_token 对应的应用，为应用新增 App Slash Command
                 */
                createAppSlashCommand: async (
                    payload?: {
                        data: {
                            command: string;
                            description: {
                                i18n?: {
                                    zh_cn?: string;
                                    en_us?: string;
                                    ja_jp?: string;
                                    zh_hk?: string;
                                    zh_tw?: string;
                                    de_de?: string;
                                    es_es?: string;
                                    fr_fr?: string;
                                    hi_in?: string;
                                    id_id?: string;
                                    it_it?: string;
                                    ko_kr?: string;
                                    pt_br?: string;
                                    ru_ru?: string;
                                    th_th?: string;
                                    vi_vn?: string;
                                };
                                default_value?: string;
                            };
                            icon?: { icon_key?: string };
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
                                    command_id?: string;
                                    command?: string;
                                    description?: {
                                        i18n?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                            zh_hk?: string;
                                            zh_tw?: string;
                                            de_de?: string;
                                            es_es?: string;
                                            fr_fr?: string;
                                            hi_in?: string;
                                            id_id?: string;
                                            it_it?: string;
                                            ko_kr?: string;
                                            pt_br?: string;
                                            ru_ru?: string;
                                            th_th?: string;
                                            vi_vn?: string;
                                        };
                                        default_value?: string;
                                    };
                                    create_time?: string;
                                    icon?: { icon_key?: string };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/application/v7/app_slash_commands`,
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
             * application.ability
             */
            applicationAbility: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.ability&apiName=patch&version=v7 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.ability&version=v7 document }
                 *
                 * 更新应用能力
                 *
                 * 通过该接口可更新自建应用的应用能力（机器人、网页应用等）相关配置，不传入的参数则保持不变，仅针对传入的参数则进行更新。如果应用正在审核中，则无法更新配置
                 *
                 * - 仅支持更新[开发者后台](https://open.feishu.cn/app)创建的自建应用，不包含通过机器人助手等其他渠道创建的自建应用;- 应用配置修改后需要[提交发布](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v7/application-v7/application-publish/create)，并审核通过后才会在线上生效;;- 若用 user_access_token 代表某个终端用户操作API，则需确保该用户为应用的所有者、管理员、开发者，否则无法操作成功;;- 若用 tenant_access_token 代表应用操作API，则仅可操作自身
                 */
                patch: async (
                    payload?: {
                        data?: {
                            web_app?: {
                                enable: boolean;
                                pc_url?: string;
                                pc_new_page_open_mode?: "new_tab" | "browser";
                                mobile_url?: string;
                            };
                            bot?: {
                                enable: boolean;
                                message_card_callback_url?: string;
                                i18ns?: Array<{
                                    i18n_key:
                                        | "zh_cn"
                                        | "en_us"
                                        | "ja_jp"
                                        | "zh_hk"
                                        | "zh_tw"
                                        | "id_id"
                                        | "ms_my"
                                        | "de_de"
                                        | "es_es"
                                        | "fr_fr"
                                        | "it_it"
                                        | "pt_br"
                                        | "vi_vn"
                                        | "ru_ru"
                                        | "th_th"
                                        | "ko_kr";
                                    get_started_desc: string;
                                }>;
                                bot_menu_enable?: boolean;
                                bot_menus?: Array<{
                                    menu_id?: string;
                                    parent_menu_id?: string;
                                    sort?: number;
                                    default_name?: string;
                                    i18n_name?: Record<string, string>;
                                    redirect_link?: {
                                        pc_url?: string;
                                        mobile_url?: string;
                                    };
                                    event_key?: string;
                                    icon_file_key?: string;
                                    ud_icon?: {
                                        token?: string;
                                        color?: string;
                                    };
                                    menu_content_type?: number;
                                }>;
                                bot_menu_display_strategy?: number;
                                allow_invited_to_group_by_other_app_switch_open?: boolean;
                            };
                        };
                        path: { app_id: string };
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
                                `${this.domain}/open-apis/application/v7/applications/:app_id/ability`,
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
        },
    };
}
