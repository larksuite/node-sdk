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
     * 应用信息
     */
    application = {
        /**
         * 应用红点
         */
        appBadge: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_badge&apiName=set&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/app_badge/set document }
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
        /**
         * 我的常用推荐规则
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
                                    get<
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_recommend_rule&apiName=list&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/app_recommend_rule/list document }
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
         * 应用使用情况
         */
        applicationAppUsage: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_usage&apiName=department_overview&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_usage/department_overview document }
             *
             * 获取多部门应用使用概览（灰度租户可见）
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_usage&apiName=message_push_overview&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_usage/message_push_overview document }
             *
             * 获取消息推送概览（灰度租户可见）
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_usage&apiName=overview&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_usage/overview document }
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
        },
        /**
         * 事件
         */
        applicationAppVersion: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=contacts_range_suggest&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=contacts_range_suggest&project=application&resource=application.app_version&version=v6 document }
             *
             * 获取应用版本通讯录权限范围建议
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=get&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/get document }
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
                                        bot?: { card_request_url?: string };
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
                                    get<
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=list&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/list document }
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
                                        bot?: { card_request_url?: string };
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=patch&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/patch document }
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
        },
        /**
         * application.collaborators
         */
        applicationCollaborators: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.collaborators&apiName=get&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=application&resource=application.collaborators&version=v6 document }
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
        /**
         * application.contacts_range
         */
        applicationContactsRange: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.contacts_range&apiName=patch&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.contacts_range&version=v6 document }
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
        /**
         * 应用
         */
        application: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=contacts_range_configuration&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=contacts_range_configuration&project=application&resource=application&version=v6 document }
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=get&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/get document }
             *
             * 获取应用信息
             *
             * 根据app_id获取应用的基础信息
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
                                    get<
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
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                                total_count?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=list&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/list document }
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=patch&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/patch document }
             *
             * 更新应用分组信息
             *
             * 更新应用的分组信息（分组会影响应用在工作台中的分类情况，请谨慎更新）
             */
            patch: async (
                payload?: {
                    data?: { common_categories?: Array<string> };
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
                                    get<
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
                                                }>;
                                                has_more: boolean;
                                                page_token?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=underauditlist&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/underauditlist document }
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
         * 应用反馈
         */
        applicationFeedback: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.feedback&apiName=list&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-feedback/list document }
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-feedback/patch document }
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
        /**
         * application.management
         */
        applicationManagement: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.management&apiName=update&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=application&resource=application.management&version=v6 document }
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
        /**
         * application.owner
         */
        applicationOwner: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.owner&apiName=update&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=application&resource=application.owner&version=v6 document }
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
        /**
         * 事件
         */
        applicationVisibility: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.visibility&apiName=check_white_black_list&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=check_white_black_list&project=application&resource=application.visibility&version=v6 document }
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
        /**
         * scope
         */
        scope: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=scope&apiName=apply&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=apply&project=application&resource=scope&version=v6 document }
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=application&resource=scope&apiName=list&version=v6 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=scope&version=v6 document }
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
        },
        v6: {
            /**
             * 应用红点
             */
            appBadge: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_badge&apiName=set&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/app_badge/set document }
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
             * 我的常用推荐规则
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
                                        get<
                                            {
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=app_recommend_rule&apiName=list&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/app_recommend_rule/list document }
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
             * 应用使用情况
             */
            applicationAppUsage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_usage&apiName=department_overview&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_usage/department_overview document }
                 *
                 * 获取多部门应用使用概览（灰度租户可见）
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_usage&apiName=message_push_overview&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_usage/message_push_overview document }
                 *
                 * 获取消息推送概览（灰度租户可见）
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_usage&apiName=overview&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_usage/overview document }
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
            },
            /**
             * 事件
             */
            applicationAppVersion: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=contacts_range_suggest&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=contacts_range_suggest&project=application&resource=application.app_version&version=v6 document }
                 *
                 * 获取应用版本通讯录权限范围建议
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=get&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/get document }
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
                                            bot?: { card_request_url?: string };
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
                                        get<
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=list&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/list document }
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
                                            bot?: { card_request_url?: string };
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.app_version&apiName=patch&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/patch document }
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
            },
            /**
             * application.collaborators
             */
            applicationCollaborators: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.collaborators&apiName=get&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=application&resource=application.collaborators&version=v6 document }
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
             * application.contacts_range
             */
            applicationContactsRange: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.contacts_range&apiName=patch&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=application&resource=application.contacts_range&version=v6 document }
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
             * 应用
             */
            application: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=contacts_range_configuration&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=contacts_range_configuration&project=application&resource=application&version=v6 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=get&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/get document }
                 *
                 * 获取应用信息
                 *
                 * 根据app_id获取应用的基础信息
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
                                        get<
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
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    total_count?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=list&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/list document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=patch&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/patch document }
                 *
                 * 更新应用分组信息
                 *
                 * 更新应用的分组信息（分组会影响应用在工作台中的分类情况，请谨慎更新）
                 */
                patch: async (
                    payload?: {
                        data?: { common_categories?: Array<string> };
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
                                        get<
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
                                                    }>;
                                                    has_more: boolean;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application&apiName=underauditlist&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/underauditlist document }
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
             * 应用反馈
             */
            applicationFeedback: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.feedback&apiName=list&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-feedback/list document }
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-feedback/patch document }
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
             * application.management
             */
            applicationManagement: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.management&apiName=update&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=application&resource=application.management&version=v6 document }
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
             * application.owner
             */
            applicationOwner: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.owner&apiName=update&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=application&resource=application.owner&version=v6 document }
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
             * 事件
             */
            applicationVisibility: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=application.visibility&apiName=check_white_black_list&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=check_white_black_list&project=application&resource=application.visibility&version=v6 document }
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
             * scope
             */
            scope: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=scope&apiName=apply&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=apply&project=application&resource=scope&version=v6 document }
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=application&resource=scope&apiName=list&version=v6 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=application&resource=scope&version=v6 document }
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
            },
        },
    };
}
