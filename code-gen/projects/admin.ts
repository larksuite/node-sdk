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
import acs from "./acs";

// auto gen
export default abstract class Client extends acs {
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
     * 管理后台-企业勋章
     */
    admin = {
        /**
         * 部门维度的数据报表
         */
        adminDeptStat: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=admin_dept_stat&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/admin_dept_stat/list document }
             *
             * 获取部门维度的用户活跃和功能使用数据
             *
             * 该接口用于获取部门维度的用户活跃和功能使用数据，即IM（即时通讯）、日历、云文档、音视频会议功能的使用数据。
             *
             * - 只有企业自建应用才有权限调用此接口;;- 当天的数据会在第二天的早上九点半产出（UTC+8）
             */
            list: async (
                payload?: {
                    params: {
                        department_id_type:
                            | "department_id"
                            | "open_department_id";
                        start_date: string;
                        end_date: string;
                        department_id: string;
                        contains_child_dept: boolean;
                        page_size?: number;
                        page_token?: string;
                        target_geo?: string;
                        with_product_version?: boolean;
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
                                    date?: string;
                                    department_id?: string;
                                    department_name?: string;
                                    department_path?: string;
                                    total_user_num?: number;
                                    active_user_num?: number;
                                    active_user_rate?: string;
                                    suite_dau?: number;
                                    suite_active_rate?: string;
                                    new_user_num?: number;
                                    new_active_num?: number;
                                    resign_user_num?: number;
                                    im_dau?: number;
                                    send_messenger_user_num?: number;
                                    send_messenger_num?: number;
                                    avg_send_messenger_num?: string;
                                    docs_dau?: number;
                                    create_docs_user_num?: number;
                                    create_docs_num?: number;
                                    avg_create_docs_num?: string;
                                    cal_dau?: number;
                                    create_cal_user_num?: number;
                                    create_cal_num?: number;
                                    avg_create_cal_num?: string;
                                    vc_dau?: number;
                                    vc_duration?: number;
                                    avg_vc_duration?: string;
                                    avg_duration?: string;
                                    task_dau?: number;
                                    create_task_user_num?: number;
                                    create_task_num?: number;
                                    avg_create_task_num?: string;
                                    email_send_count?: string;
                                    email_receive_count?: string;
                                    email_send_ext_count?: string;
                                    email_receive_ext_count?: string;
                                    email_send_in_count?: string;
                                    email_receive_in_count?: string;
                                    search_active_dau?: string;
                                    total_search_count?: string;
                                    quick_search_count?: string;
                                    tab_search_count?: string;
                                    product_version?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/admin_dept_stats`,
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
         * 用户维度的数据报表
         */
        adminUserStat: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=admin_user_stat&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/admin_user_stat/list document }
             *
             * 获取用户维度的用户活跃和功能使用数据
             *
             * 用于获取用户维度的用户活跃和功能使用数据，即IM（即时通讯）、日历、云文档、音视频会议功能的使用数据。
             *
             * - 只有企业自建应用才有权限调用此接口;;- 当天的数据会在第二天的早上九点半产出（UTC+8）
             */
            list: async (
                payload?: {
                    params: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        start_date: string;
                        end_date: string;
                        department_id?: string;
                        user_id?: string;
                        page_size?: number;
                        page_token?: string;
                        target_geo?: string;
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
                                    date?: string;
                                    user_id?: string;
                                    user_name?: string;
                                    department_name?: string;
                                    department_path?: string;
                                    create_time?: string;
                                    user_active_flag?: number;
                                    register_time?: string;
                                    suite_active_flag?: number;
                                    last_active_time?: string;
                                    im_active_flag?: number;
                                    send_messenger_num?: number;
                                    docs_active_flag?: number;
                                    create_docs_num?: number;
                                    cal_active_flag?: number;
                                    create_cal_num?: number;
                                    vc_active_flag?: number;
                                    vc_duration?: number;
                                    active_os?: string;
                                    create_task_num?: number;
                                    vc_num?: number;
                                    app_package_type?: string;
                                    os_name?: string;
                                    email_send_count?: string;
                                    email_receive_count?: string;
                                    email_send_ext_count?: string;
                                    email_receive_ext_count?: string;
                                    email_send_in_count?: string;
                                    email_receive_in_count?: string;
                                    search_active_flag?: number;
                                    total_search_count?: string;
                                    quick_search_count?: string;
                                    tab_search_count?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/admin_user_stats`,
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
         * 行为审计日志（灰度租户可见）
         */
        auditInfo: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        latest?: number;
                        oldest?: number;
                        event_name?: string;
                        operator_type?: "user" | "bot";
                        operator_value?: string;
                        event_module?: number;
                        page_token?: string;
                        page_size?: number;
                        user_type?: number;
                        object_type?: number;
                        object_value?: string;
                        ext_filter_object_by_ccm_token?: string;
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
                                `${this.domain}/open-apis/admin/v1/audit_infos`,
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
                                                has_more?: boolean;
                                                page_token?: string;
                                                items?: Array<{
                                                    event_id?: string;
                                                    unique_id?: string;
                                                    event_name: string;
                                                    department_ids?: Array<string>;
                                                    event_module: number;
                                                    operator_type?: number;
                                                    operator_value?: string;
                                                    objects?: Array<{
                                                        object_type?: string;
                                                        object_value?: string;
                                                        object_name?: string;
                                                        object_owner?: string;
                                                        object_detail?: {
                                                            clone_source?: string;
                                                            text_detail?: string;
                                                            file_name?: string;
                                                            third_party_appID?: string;
                                                            contain_file_num?: number;
                                                            permission_setting_type?: string;
                                                            permission_external_access_Type?: boolean;
                                                            permission_share_type?: string;
                                                            file_service_source?: string;
                                                            okr_download_content?: string;
                                                            container_type?: string;
                                                            container_id?: string;
                                                            current_page?: string;
                                                        };
                                                    }>;
                                                    recipients?: Array<{
                                                        recipient_type?: string;
                                                        recipient_value?: string;
                                                        recipient_detail?: {
                                                            permission_action_type?: string;
                                                            chat_id?: string;
                                                            chat_name?: string;
                                                            chat_type?: number;
                                                            external_flag?: boolean;
                                                        };
                                                    }>;
                                                    event_time?: number;
                                                    ip?: string;
                                                    operator_app?: string;
                                                    audit_context?: {
                                                        terminal_type?: number;
                                                        ios_context?: {
                                                            udid?: string;
                                                            did?: string;
                                                            app_ver?: string;
                                                            ver?: string;
                                                            os?: string;
                                                            STZone?: string;
                                                            ML?: string;
                                                            sjd?: string;
                                                            proxyip?: string;
                                                            wifip?: string;
                                                            location?: string;
                                                            active_ip?: string;
                                                            active_ip_detail?: string;
                                                            cell_base_station?: string;
                                                            IP?: string;
                                                        };
                                                        pc_context?: {
                                                            udid?: string;
                                                            did?: string;
                                                            app_ver?: string;
                                                            ver?: string;
                                                            os?: string;
                                                            wifip?: string;
                                                            region?: string;
                                                            IP?: string;
                                                        };
                                                        web_context?: {
                                                            user_agent?: string;
                                                            IP?: string;
                                                        };
                                                        android_context?: {
                                                            udid?: string;
                                                            did?: string;
                                                            app_ver?: string;
                                                            ver?: string;
                                                            region?: string;
                                                            id_i?: string;
                                                            id_r?: string;
                                                            hw_brand?: string;
                                                            hw_manuf?: string;
                                                            wifip?: string;
                                                            route_iip?: string;
                                                            route_gip?: string;
                                                            env_su?: string;
                                                            env_tz?: string;
                                                            env_ml?: string;
                                                            location?: string;
                                                            active_ip?: string;
                                                            active_ip_detail?: string;
                                                            cell_base_station?: string;
                                                            IP?: string;
                                                        };
                                                    };
                                                    extend?: {
                                                        comment_type?: string;
                                                        app_detail?: string;
                                                        two_step_validation?: boolean;
                                                        login_method?: string;
                                                        new_people_num_in_video?: number;
                                                        external_people_num_in_video?: number;
                                                        external_people_num_in_chat?: number;
                                                        join_group?: number;
                                                        quit_group?: number;
                                                        external_people_num_in_doc_share?: number;
                                                    };
                                                    operator_app_name?: string;
                                                    common_drawers?: {
                                                        common_draw_info_list?: Array<{
                                                            info_key?: string;
                                                            info_val?: string;
                                                            key_i18n_key?: string;
                                                            val_type?: string;
                                                            val_i18n_key?: string;
                                                        }>;
                                                    };
                                                    audit_detail?: {
                                                        mc?: string;
                                                        device_model?: string;
                                                        os?: string;
                                                        city?: string;
                                                    };
                                                    operator_tenant?: string;
                                                    operator_detail?: {
                                                        operator_name: {
                                                            default_name: string;
                                                            i18n_value?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                                ja_jp?: string;
                                                            };
                                                        };
                                                        tenant_name?: string;
                                                    };
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=audit_info&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uQjM5YjL0ITO24CNykjN/audit_log/audit_data_get document }
             *
             * 用户行为日志搜索
             */
            list: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        latest?: number;
                        oldest?: number;
                        event_name?: string;
                        operator_type?: "user" | "bot";
                        operator_value?: string;
                        event_module?: number;
                        page_token?: string;
                        page_size?: number;
                        user_type?: number;
                        object_type?: number;
                        object_value?: string;
                        ext_filter_object_by_ccm_token?: string;
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
                                    event_id?: string;
                                    unique_id?: string;
                                    event_name: string;
                                    department_ids?: Array<string>;
                                    event_module: number;
                                    operator_type?: number;
                                    operator_value?: string;
                                    objects?: Array<{
                                        object_type?: string;
                                        object_value?: string;
                                        object_name?: string;
                                        object_owner?: string;
                                        object_detail?: {
                                            clone_source?: string;
                                            text_detail?: string;
                                            file_name?: string;
                                            third_party_appID?: string;
                                            contain_file_num?: number;
                                            permission_setting_type?: string;
                                            permission_external_access_Type?: boolean;
                                            permission_share_type?: string;
                                            file_service_source?: string;
                                            okr_download_content?: string;
                                            container_type?: string;
                                            container_id?: string;
                                            current_page?: string;
                                        };
                                    }>;
                                    recipients?: Array<{
                                        recipient_type?: string;
                                        recipient_value?: string;
                                        recipient_detail?: {
                                            permission_action_type?: string;
                                            chat_id?: string;
                                            chat_name?: string;
                                            chat_type?: number;
                                            external_flag?: boolean;
                                        };
                                    }>;
                                    event_time?: number;
                                    ip?: string;
                                    operator_app?: string;
                                    audit_context?: {
                                        terminal_type?: number;
                                        ios_context?: {
                                            udid?: string;
                                            did?: string;
                                            app_ver?: string;
                                            ver?: string;
                                            os?: string;
                                            STZone?: string;
                                            ML?: string;
                                            sjd?: string;
                                            proxyip?: string;
                                            wifip?: string;
                                            location?: string;
                                            active_ip?: string;
                                            active_ip_detail?: string;
                                            cell_base_station?: string;
                                            IP?: string;
                                        };
                                        pc_context?: {
                                            udid?: string;
                                            did?: string;
                                            app_ver?: string;
                                            ver?: string;
                                            os?: string;
                                            wifip?: string;
                                            region?: string;
                                            IP?: string;
                                        };
                                        web_context?: {
                                            user_agent?: string;
                                            IP?: string;
                                        };
                                        android_context?: {
                                            udid?: string;
                                            did?: string;
                                            app_ver?: string;
                                            ver?: string;
                                            region?: string;
                                            id_i?: string;
                                            id_r?: string;
                                            hw_brand?: string;
                                            hw_manuf?: string;
                                            wifip?: string;
                                            route_iip?: string;
                                            route_gip?: string;
                                            env_su?: string;
                                            env_tz?: string;
                                            env_ml?: string;
                                            location?: string;
                                            active_ip?: string;
                                            active_ip_detail?: string;
                                            cell_base_station?: string;
                                            IP?: string;
                                        };
                                    };
                                    extend?: {
                                        comment_type?: string;
                                        app_detail?: string;
                                        two_step_validation?: boolean;
                                        login_method?: string;
                                        new_people_num_in_video?: number;
                                        external_people_num_in_video?: number;
                                        external_people_num_in_chat?: number;
                                        join_group?: number;
                                        quit_group?: number;
                                        external_people_num_in_doc_share?: number;
                                    };
                                    operator_app_name?: string;
                                    common_drawers?: {
                                        common_draw_info_list?: Array<{
                                            info_key?: string;
                                            info_val?: string;
                                            key_i18n_key?: string;
                                            val_type?: string;
                                            val_i18n_key?: string;
                                        }>;
                                    };
                                    audit_detail?: {
                                        mc?: string;
                                        device_model?: string;
                                        os?: string;
                                        city?: string;
                                    };
                                    operator_tenant?: string;
                                    operator_detail?: {
                                        operator_name: {
                                            default_name: string;
                                            i18n_value?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                        };
                                        tenant_name?: string;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/audit_infos`,
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
         * 勋章
         */
        badge: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/create document }
             *
             * 创建勋章
             *
             * 使用该接口可以创建一枚完整的勋章信息，一个租户下最多可创建1000枚勋章。
             */
            create: async (
                payload?: {
                    data: {
                        name: string;
                        explanation?: string;
                        detail_image: string;
                        show_image: string;
                        i18n_name?: {
                            zh_cn?: string;
                            en_us?: string;
                            ja_jp?: string;
                        };
                        i18n_explanation?: {
                            zh_cn?: string;
                            en_us?: string;
                            ja_jp?: string;
                        };
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
                                badge?: {
                                    id?: string;
                                    name: string;
                                    explanation?: string;
                                    detail_image: string;
                                    show_image: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    i18n_explanation?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges`,
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/get document }
             *
             * 获取勋章详情
             *
             * 可以通过该接口查询勋章的详情
             */
            get: async (
                payload?: {
                    path: { badge_id: string };
                },
                options?: IRequestOptions
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
                                badge?: {
                                    id?: string;
                                    name: string;
                                    explanation?: string;
                                    detail_image: string;
                                    show_image: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    i18n_explanation?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges/:badge_id`,
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
                        page_size: number;
                        page_token?: string;
                        name?: string;
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
                                `${this.domain}/open-apis/admin/v1/badges`,
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
                                                badges?: Array<{
                                                    id?: string;
                                                    name: string;
                                                    explanation?: string;
                                                    detail_image: string;
                                                    show_image: string;
                                                    i18n_name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                        ja_jp?: string;
                                                    };
                                                    i18n_explanation?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                        ja_jp?: string;
                                                    };
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/list document }
             *
             * 获取勋章列表
             *
             * 可以通过该接口列出租户下所有的勋章，勋章的排列顺序是按照创建时间倒序排列。
             */
            list: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
                        name?: string;
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
                                badges?: Array<{
                                    id?: string;
                                    name: string;
                                    explanation?: string;
                                    detail_image: string;
                                    show_image: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    i18n_explanation?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges`,
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/update document }
             *
             * 修改勋章信息
             *
             * 通过该接口可以修改勋章的信息
             */
            update: async (
                payload?: {
                    data: {
                        name: string;
                        explanation?: string;
                        detail_image: string;
                        show_image: string;
                        i18n_name?: {
                            zh_cn?: string;
                            en_us?: string;
                            ja_jp?: string;
                        };
                        i18n_explanation?: {
                            zh_cn?: string;
                            en_us?: string;
                            ja_jp?: string;
                        };
                    };
                    path: { badge_id: string };
                },
                options?: IRequestOptions
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
                                badge?: {
                                    id?: string;
                                    name: string;
                                    explanation?: string;
                                    detail_image: string;
                                    show_image: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    i18n_explanation?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges/:badge_id`,
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
         * 勋章授予名单
         */
        badgeGrant: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/create document }
             *
             * 创建勋章的授予名单
             *
             * 通过该接口可以为特定勋章创建一份授予名单，一枚勋章下最多可创建1000份授予名单。
             */
            create: async (
                payload?: {
                    data: {
                        name: string;
                        grant_type: number;
                        time_zone: string;
                        rule_detail: {
                            effective_time?: string;
                            expiration_time?: string;
                            anniversary?: number;
                            effective_period?: number;
                        };
                        is_grant_all: boolean;
                        user_ids?: Array<string>;
                        department_ids?: Array<string>;
                        group_ids?: Array<string>;
                    };
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path: { badge_id: string };
                },
                options?: IRequestOptions
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
                                grant?: {
                                    id?: string;
                                    badge_id?: string;
                                    name: string;
                                    grant_type: number;
                                    time_zone: string;
                                    rule_detail: {
                                        effective_time?: string;
                                        expiration_time?: string;
                                        anniversary?: number;
                                        effective_period?: number;
                                    };
                                    is_grant_all: boolean;
                                    user_ids?: Array<string>;
                                    department_ids?: Array<string>;
                                    group_ids?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants`,
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/delete document }
             *
             * 删除授予名单
             *
             * 通过该接口可以删除特定授予名单的信息
             */
            delete: async (
                payload?: {
                    path: { badge_id: string; grant_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants/:grant_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/get document }
             *
             * 获取授予名单的信息
             *
             * 通过该接口可以获取特定授予名单的信息
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path: { badge_id: string; grant_id: string };
                },
                options?: IRequestOptions
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
                                grant?: {
                                    id?: string;
                                    badge_id?: string;
                                    name: string;
                                    grant_type: number;
                                    time_zone: string;
                                    rule_detail: {
                                        effective_time?: string;
                                        expiration_time?: string;
                                        anniversary?: number;
                                        effective_period?: number;
                                    };
                                    is_grant_all: boolean;
                                    user_ids?: Array<string>;
                                    department_ids?: Array<string>;
                                    group_ids?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants/:grant_id`,
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
                        page_size: number;
                        page_token?: string;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        name?: string;
                    };
                    path: { badge_id: string };
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
                                `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants`,
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
                                                grants?: Array<{
                                                    id?: string;
                                                    badge_id?: string;
                                                    name: string;
                                                    grant_type: number;
                                                    time_zone: string;
                                                    rule_detail: {
                                                        effective_time?: string;
                                                        expiration_time?: string;
                                                        anniversary?: number;
                                                        effective_period?: number;
                                                    };
                                                    is_grant_all: boolean;
                                                    user_ids?: Array<string>;
                                                    department_ids?: Array<string>;
                                                    group_ids?: Array<string>;
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/list document }
             *
             * 获取勋章的授予名单列表
             *
             * 通过该接口可以获取特定勋章下的授予名单列表，授予名单的排列顺序按照创建时间倒序排列。
             */
            list: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        name?: string;
                    };
                    path: { badge_id: string };
                },
                options?: IRequestOptions
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
                                grants?: Array<{
                                    id?: string;
                                    badge_id?: string;
                                    name: string;
                                    grant_type: number;
                                    time_zone: string;
                                    rule_detail: {
                                        effective_time?: string;
                                        expiration_time?: string;
                                        anniversary?: number;
                                        effective_period?: number;
                                    };
                                    is_grant_all: boolean;
                                    user_ids?: Array<string>;
                                    department_ids?: Array<string>;
                                    group_ids?: Array<string>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants`,
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/update document }
             *
             * 修改授予名单
             *
             * 通过该接口可以修改特定授予名单的相关信息
             */
            update: async (
                payload?: {
                    data: {
                        name: string;
                        grant_type: number;
                        time_zone: string;
                        rule_detail: {
                            effective_time?: string;
                            expiration_time?: string;
                            anniversary?: number;
                            effective_period?: number;
                        };
                        is_grant_all: boolean;
                        user_ids?: Array<string>;
                        department_ids?: Array<string>;
                        group_ids?: Array<string>;
                    };
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path: { badge_id: string; grant_id: string };
                },
                options?: IRequestOptions
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
                                grant?: {
                                    id?: string;
                                    badge_id?: string;
                                    name: string;
                                    grant_type: number;
                                    time_zone: string;
                                    rule_detail: {
                                        effective_time?: string;
                                        expiration_time?: string;
                                        anniversary?: number;
                                        effective_period?: number;
                                    };
                                    is_grant_all: boolean;
                                    user_ids?: Array<string>;
                                    department_ids?: Array<string>;
                                    group_ids?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants/:grant_id`,
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
         * 勋章图片
         */
        badgeImage: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge_image&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge_image/create document }
             *
             * 上传勋章图片
             *
             * 通过该接口可以上传勋章详情图、挂饰图的文件，获取对应的文件key
             */
            create: async (
                payload?: {
                    data: {
                        image_file: Buffer | fs.ReadStream;
                        image_type: number;
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
                            data?: { image_key?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badge_images`,
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

                return get(res, "data", null);
            },
        },
        /**
         * 登录密码管理
         */
        password: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=password&apiName=reset&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/password/reset document }
             *
             * 重置密码
             *
             * 重置用户的企业邮箱密码，仅当用户的邮箱和企业邮箱(别名)一致时生效，可用于处理飞书企业邮箱登录死锁的问题。;;邮箱死锁：当用户的登录凭证与飞书企业邮箱一致时，目前飞书登录流程要求用户输入验证码，由于飞书邮箱无单独的帐号体系，则未登录时无法收取邮箱验证码，即陷入死锁
             */
            reset: async (
                payload?: {
                    data: {
                        password: { ent_email_password: string };
                        user_id: string;
                    };
                    params: {
                        user_id_type: "open_id" | "union_id" | "user_id";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/password/reset`,
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
             * 部门维度的数据报表
             */
            adminDeptStat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=admin_dept_stat&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/admin_dept_stat/list document }
                 *
                 * 获取部门维度的用户活跃和功能使用数据
                 *
                 * 该接口用于获取部门维度的用户活跃和功能使用数据，即IM（即时通讯）、日历、云文档、音视频会议功能的使用数据。
                 *
                 * - 只有企业自建应用才有权限调用此接口;;- 当天的数据会在第二天的早上九点半产出（UTC+8）
                 */
                list: async (
                    payload?: {
                        params: {
                            department_id_type:
                                | "department_id"
                                | "open_department_id";
                            start_date: string;
                            end_date: string;
                            department_id: string;
                            contains_child_dept: boolean;
                            page_size?: number;
                            page_token?: string;
                            target_geo?: string;
                            with_product_version?: boolean;
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
                                        date?: string;
                                        department_id?: string;
                                        department_name?: string;
                                        department_path?: string;
                                        total_user_num?: number;
                                        active_user_num?: number;
                                        active_user_rate?: string;
                                        suite_dau?: number;
                                        suite_active_rate?: string;
                                        new_user_num?: number;
                                        new_active_num?: number;
                                        resign_user_num?: number;
                                        im_dau?: number;
                                        send_messenger_user_num?: number;
                                        send_messenger_num?: number;
                                        avg_send_messenger_num?: string;
                                        docs_dau?: number;
                                        create_docs_user_num?: number;
                                        create_docs_num?: number;
                                        avg_create_docs_num?: string;
                                        cal_dau?: number;
                                        create_cal_user_num?: number;
                                        create_cal_num?: number;
                                        avg_create_cal_num?: string;
                                        vc_dau?: number;
                                        vc_duration?: number;
                                        avg_vc_duration?: string;
                                        avg_duration?: string;
                                        task_dau?: number;
                                        create_task_user_num?: number;
                                        create_task_num?: number;
                                        avg_create_task_num?: string;
                                        email_send_count?: string;
                                        email_receive_count?: string;
                                        email_send_ext_count?: string;
                                        email_receive_ext_count?: string;
                                        email_send_in_count?: string;
                                        email_receive_in_count?: string;
                                        search_active_dau?: string;
                                        total_search_count?: string;
                                        quick_search_count?: string;
                                        tab_search_count?: string;
                                        product_version?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/admin_dept_stats`,
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
             * 用户维度的数据报表
             */
            adminUserStat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=admin_user_stat&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/admin_user_stat/list document }
                 *
                 * 获取用户维度的用户活跃和功能使用数据
                 *
                 * 用于获取用户维度的用户活跃和功能使用数据，即IM（即时通讯）、日历、云文档、音视频会议功能的使用数据。
                 *
                 * - 只有企业自建应用才有权限调用此接口;;- 当天的数据会在第二天的早上九点半产出（UTC+8）
                 */
                list: async (
                    payload?: {
                        params: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            start_date: string;
                            end_date: string;
                            department_id?: string;
                            user_id?: string;
                            page_size?: number;
                            page_token?: string;
                            target_geo?: string;
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
                                        date?: string;
                                        user_id?: string;
                                        user_name?: string;
                                        department_name?: string;
                                        department_path?: string;
                                        create_time?: string;
                                        user_active_flag?: number;
                                        register_time?: string;
                                        suite_active_flag?: number;
                                        last_active_time?: string;
                                        im_active_flag?: number;
                                        send_messenger_num?: number;
                                        docs_active_flag?: number;
                                        create_docs_num?: number;
                                        cal_active_flag?: number;
                                        create_cal_num?: number;
                                        vc_active_flag?: number;
                                        vc_duration?: number;
                                        active_os?: string;
                                        create_task_num?: number;
                                        vc_num?: number;
                                        app_package_type?: string;
                                        os_name?: string;
                                        email_send_count?: string;
                                        email_receive_count?: string;
                                        email_send_ext_count?: string;
                                        email_receive_ext_count?: string;
                                        email_send_in_count?: string;
                                        email_receive_in_count?: string;
                                        search_active_flag?: number;
                                        total_search_count?: string;
                                        quick_search_count?: string;
                                        tab_search_count?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/admin_user_stats`,
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
             * 行为审计日志（灰度租户可见）
             */
            auditInfo: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            latest?: number;
                            oldest?: number;
                            event_name?: string;
                            operator_type?: "user" | "bot";
                            operator_value?: string;
                            event_module?: number;
                            page_token?: string;
                            page_size?: number;
                            user_type?: number;
                            object_type?: number;
                            object_value?: string;
                            ext_filter_object_by_ccm_token?: string;
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
                                    `${this.domain}/open-apis/admin/v1/audit_infos`,
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        event_id?: string;
                                                        unique_id?: string;
                                                        event_name: string;
                                                        department_ids?: Array<string>;
                                                        event_module: number;
                                                        operator_type?: number;
                                                        operator_value?: string;
                                                        objects?: Array<{
                                                            object_type?: string;
                                                            object_value?: string;
                                                            object_name?: string;
                                                            object_owner?: string;
                                                            object_detail?: {
                                                                clone_source?: string;
                                                                text_detail?: string;
                                                                file_name?: string;
                                                                third_party_appID?: string;
                                                                contain_file_num?: number;
                                                                permission_setting_type?: string;
                                                                permission_external_access_Type?: boolean;
                                                                permission_share_type?: string;
                                                                file_service_source?: string;
                                                                okr_download_content?: string;
                                                                container_type?: string;
                                                                container_id?: string;
                                                                current_page?: string;
                                                            };
                                                        }>;
                                                        recipients?: Array<{
                                                            recipient_type?: string;
                                                            recipient_value?: string;
                                                            recipient_detail?: {
                                                                permission_action_type?: string;
                                                                chat_id?: string;
                                                                chat_name?: string;
                                                                chat_type?: number;
                                                                external_flag?: boolean;
                                                            };
                                                        }>;
                                                        event_time?: number;
                                                        ip?: string;
                                                        operator_app?: string;
                                                        audit_context?: {
                                                            terminal_type?: number;
                                                            ios_context?: {
                                                                udid?: string;
                                                                did?: string;
                                                                app_ver?: string;
                                                                ver?: string;
                                                                os?: string;
                                                                STZone?: string;
                                                                ML?: string;
                                                                sjd?: string;
                                                                proxyip?: string;
                                                                wifip?: string;
                                                                location?: string;
                                                                active_ip?: string;
                                                                active_ip_detail?: string;
                                                                cell_base_station?: string;
                                                                IP?: string;
                                                            };
                                                            pc_context?: {
                                                                udid?: string;
                                                                did?: string;
                                                                app_ver?: string;
                                                                ver?: string;
                                                                os?: string;
                                                                wifip?: string;
                                                                region?: string;
                                                                IP?: string;
                                                            };
                                                            web_context?: {
                                                                user_agent?: string;
                                                                IP?: string;
                                                            };
                                                            android_context?: {
                                                                udid?: string;
                                                                did?: string;
                                                                app_ver?: string;
                                                                ver?: string;
                                                                region?: string;
                                                                id_i?: string;
                                                                id_r?: string;
                                                                hw_brand?: string;
                                                                hw_manuf?: string;
                                                                wifip?: string;
                                                                route_iip?: string;
                                                                route_gip?: string;
                                                                env_su?: string;
                                                                env_tz?: string;
                                                                env_ml?: string;
                                                                location?: string;
                                                                active_ip?: string;
                                                                active_ip_detail?: string;
                                                                cell_base_station?: string;
                                                                IP?: string;
                                                            };
                                                        };
                                                        extend?: {
                                                            comment_type?: string;
                                                            app_detail?: string;
                                                            two_step_validation?: boolean;
                                                            login_method?: string;
                                                            new_people_num_in_video?: number;
                                                            external_people_num_in_video?: number;
                                                            external_people_num_in_chat?: number;
                                                            join_group?: number;
                                                            quit_group?: number;
                                                            external_people_num_in_doc_share?: number;
                                                        };
                                                        operator_app_name?: string;
                                                        common_drawers?: {
                                                            common_draw_info_list?: Array<{
                                                                info_key?: string;
                                                                info_val?: string;
                                                                key_i18n_key?: string;
                                                                val_type?: string;
                                                                val_i18n_key?: string;
                                                            }>;
                                                        };
                                                        audit_detail?: {
                                                            mc?: string;
                                                            device_model?: string;
                                                            os?: string;
                                                            city?: string;
                                                        };
                                                        operator_tenant?: string;
                                                        operator_detail?: {
                                                            operator_name: {
                                                                default_name: string;
                                                                i18n_value?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                    ja_jp?: string;
                                                                };
                                                            };
                                                            tenant_name?: string;
                                                        };
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=audit_info&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uQjM5YjL0ITO24CNykjN/audit_log/audit_data_get document }
                 *
                 * 用户行为日志搜索
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            latest?: number;
                            oldest?: number;
                            event_name?: string;
                            operator_type?: "user" | "bot";
                            operator_value?: string;
                            event_module?: number;
                            page_token?: string;
                            page_size?: number;
                            user_type?: number;
                            object_type?: number;
                            object_value?: string;
                            ext_filter_object_by_ccm_token?: string;
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
                                        event_id?: string;
                                        unique_id?: string;
                                        event_name: string;
                                        department_ids?: Array<string>;
                                        event_module: number;
                                        operator_type?: number;
                                        operator_value?: string;
                                        objects?: Array<{
                                            object_type?: string;
                                            object_value?: string;
                                            object_name?: string;
                                            object_owner?: string;
                                            object_detail?: {
                                                clone_source?: string;
                                                text_detail?: string;
                                                file_name?: string;
                                                third_party_appID?: string;
                                                contain_file_num?: number;
                                                permission_setting_type?: string;
                                                permission_external_access_Type?: boolean;
                                                permission_share_type?: string;
                                                file_service_source?: string;
                                                okr_download_content?: string;
                                                container_type?: string;
                                                container_id?: string;
                                                current_page?: string;
                                            };
                                        }>;
                                        recipients?: Array<{
                                            recipient_type?: string;
                                            recipient_value?: string;
                                            recipient_detail?: {
                                                permission_action_type?: string;
                                                chat_id?: string;
                                                chat_name?: string;
                                                chat_type?: number;
                                                external_flag?: boolean;
                                            };
                                        }>;
                                        event_time?: number;
                                        ip?: string;
                                        operator_app?: string;
                                        audit_context?: {
                                            terminal_type?: number;
                                            ios_context?: {
                                                udid?: string;
                                                did?: string;
                                                app_ver?: string;
                                                ver?: string;
                                                os?: string;
                                                STZone?: string;
                                                ML?: string;
                                                sjd?: string;
                                                proxyip?: string;
                                                wifip?: string;
                                                location?: string;
                                                active_ip?: string;
                                                active_ip_detail?: string;
                                                cell_base_station?: string;
                                                IP?: string;
                                            };
                                            pc_context?: {
                                                udid?: string;
                                                did?: string;
                                                app_ver?: string;
                                                ver?: string;
                                                os?: string;
                                                wifip?: string;
                                                region?: string;
                                                IP?: string;
                                            };
                                            web_context?: {
                                                user_agent?: string;
                                                IP?: string;
                                            };
                                            android_context?: {
                                                udid?: string;
                                                did?: string;
                                                app_ver?: string;
                                                ver?: string;
                                                region?: string;
                                                id_i?: string;
                                                id_r?: string;
                                                hw_brand?: string;
                                                hw_manuf?: string;
                                                wifip?: string;
                                                route_iip?: string;
                                                route_gip?: string;
                                                env_su?: string;
                                                env_tz?: string;
                                                env_ml?: string;
                                                location?: string;
                                                active_ip?: string;
                                                active_ip_detail?: string;
                                                cell_base_station?: string;
                                                IP?: string;
                                            };
                                        };
                                        extend?: {
                                            comment_type?: string;
                                            app_detail?: string;
                                            two_step_validation?: boolean;
                                            login_method?: string;
                                            new_people_num_in_video?: number;
                                            external_people_num_in_video?: number;
                                            external_people_num_in_chat?: number;
                                            join_group?: number;
                                            quit_group?: number;
                                            external_people_num_in_doc_share?: number;
                                        };
                                        operator_app_name?: string;
                                        common_drawers?: {
                                            common_draw_info_list?: Array<{
                                                info_key?: string;
                                                info_val?: string;
                                                key_i18n_key?: string;
                                                val_type?: string;
                                                val_i18n_key?: string;
                                            }>;
                                        };
                                        audit_detail?: {
                                            mc?: string;
                                            device_model?: string;
                                            os?: string;
                                            city?: string;
                                        };
                                        operator_tenant?: string;
                                        operator_detail?: {
                                            operator_name: {
                                                default_name: string;
                                                i18n_value?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                    ja_jp?: string;
                                                };
                                            };
                                            tenant_name?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/audit_infos`,
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
             * 勋章
             */
            badge: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/create document }
                 *
                 * 创建勋章
                 *
                 * 使用该接口可以创建一枚完整的勋章信息，一个租户下最多可创建1000枚勋章。
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            explanation?: string;
                            detail_image: string;
                            show_image: string;
                            i18n_name?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
                            i18n_explanation?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
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
                                    badge?: {
                                        id?: string;
                                        name: string;
                                        explanation?: string;
                                        detail_image: string;
                                        show_image: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        i18n_explanation?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badges`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/get document }
                 *
                 * 获取勋章详情
                 *
                 * 可以通过该接口查询勋章的详情
                 */
                get: async (
                    payload?: {
                        path: { badge_id: string };
                    },
                    options?: IRequestOptions
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
                                    badge?: {
                                        id?: string;
                                        name: string;
                                        explanation?: string;
                                        detail_image: string;
                                        show_image: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        i18n_explanation?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badges/:badge_id`,
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
                            page_size: number;
                            page_token?: string;
                            name?: string;
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
                                    `${this.domain}/open-apis/admin/v1/badges`,
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
                                                    badges?: Array<{
                                                        id?: string;
                                                        name: string;
                                                        explanation?: string;
                                                        detail_image: string;
                                                        show_image: string;
                                                        i18n_name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                            ja_jp?: string;
                                                        };
                                                        i18n_explanation?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                            ja_jp?: string;
                                                        };
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/list document }
                 *
                 * 获取勋章列表
                 *
                 * 可以通过该接口列出租户下所有的勋章，勋章的排列顺序是按照创建时间倒序排列。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            name?: string;
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
                                    badges?: Array<{
                                        id?: string;
                                        name: string;
                                        explanation?: string;
                                        detail_image: string;
                                        show_image: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        i18n_explanation?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badges`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge/update document }
                 *
                 * 修改勋章信息
                 *
                 * 通过该接口可以修改勋章的信息
                 */
                update: async (
                    payload?: {
                        data: {
                            name: string;
                            explanation?: string;
                            detail_image: string;
                            show_image: string;
                            i18n_name?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
                            i18n_explanation?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
                        };
                        path: { badge_id: string };
                    },
                    options?: IRequestOptions
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
                                    badge?: {
                                        id?: string;
                                        name: string;
                                        explanation?: string;
                                        detail_image: string;
                                        show_image: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        i18n_explanation?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badges/:badge_id`,
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
             * 勋章授予名单
             */
            badgeGrant: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/create document }
                 *
                 * 创建勋章的授予名单
                 *
                 * 通过该接口可以为特定勋章创建一份授予名单，一枚勋章下最多可创建1000份授予名单。
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            grant_type: number;
                            time_zone: string;
                            rule_detail: {
                                effective_time?: string;
                                expiration_time?: string;
                                anniversary?: number;
                                effective_period?: number;
                            };
                            is_grant_all: boolean;
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                            group_ids?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { badge_id: string };
                    },
                    options?: IRequestOptions
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
                                    grant?: {
                                        id?: string;
                                        badge_id?: string;
                                        name: string;
                                        grant_type: number;
                                        time_zone: string;
                                        rule_detail: {
                                            effective_time?: string;
                                            expiration_time?: string;
                                            anniversary?: number;
                                            effective_period?: number;
                                        };
                                        is_grant_all: boolean;
                                        user_ids?: Array<string>;
                                        department_ids?: Array<string>;
                                        group_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/delete document }
                 *
                 * 删除授予名单
                 *
                 * 通过该接口可以删除特定授予名单的信息
                 */
                delete: async (
                    payload?: {
                        path: { badge_id: string; grant_id: string };
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
                                `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants/:grant_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/get document }
                 *
                 * 获取授予名单的信息
                 *
                 * 通过该接口可以获取特定授予名单的信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { badge_id: string; grant_id: string };
                    },
                    options?: IRequestOptions
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
                                    grant?: {
                                        id?: string;
                                        badge_id?: string;
                                        name: string;
                                        grant_type: number;
                                        time_zone: string;
                                        rule_detail: {
                                            effective_time?: string;
                                            expiration_time?: string;
                                            anniversary?: number;
                                            effective_period?: number;
                                        };
                                        is_grant_all: boolean;
                                        user_ids?: Array<string>;
                                        department_ids?: Array<string>;
                                        group_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants/:grant_id`,
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
                            page_size: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            name?: string;
                        };
                        path: { badge_id: string };
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
                                    `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants`,
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
                                                    grants?: Array<{
                                                        id?: string;
                                                        badge_id?: string;
                                                        name: string;
                                                        grant_type: number;
                                                        time_zone: string;
                                                        rule_detail: {
                                                            effective_time?: string;
                                                            expiration_time?: string;
                                                            anniversary?: number;
                                                            effective_period?: number;
                                                        };
                                                        is_grant_all: boolean;
                                                        user_ids?: Array<string>;
                                                        department_ids?: Array<string>;
                                                        group_ids?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/list document }
                 *
                 * 获取勋章的授予名单列表
                 *
                 * 通过该接口可以获取特定勋章下的授予名单列表，授予名单的排列顺序按照创建时间倒序排列。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            name?: string;
                        };
                        path: { badge_id: string };
                    },
                    options?: IRequestOptions
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
                                    grants?: Array<{
                                        id?: string;
                                        badge_id?: string;
                                        name: string;
                                        grant_type: number;
                                        time_zone: string;
                                        rule_detail: {
                                            effective_time?: string;
                                            expiration_time?: string;
                                            anniversary?: number;
                                            effective_period?: number;
                                        };
                                        is_grant_all: boolean;
                                        user_ids?: Array<string>;
                                        department_ids?: Array<string>;
                                        group_ids?: Array<string>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge-grant/update document }
                 *
                 * 修改授予名单
                 *
                 * 通过该接口可以修改特定授予名单的相关信息
                 */
                update: async (
                    payload?: {
                        data: {
                            name: string;
                            grant_type: number;
                            time_zone: string;
                            rule_detail: {
                                effective_time?: string;
                                expiration_time?: string;
                                anniversary?: number;
                                effective_period?: number;
                            };
                            is_grant_all: boolean;
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                            group_ids?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { badge_id: string; grant_id: string };
                    },
                    options?: IRequestOptions
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
                                    grant?: {
                                        id?: string;
                                        badge_id?: string;
                                        name: string;
                                        grant_type: number;
                                        time_zone: string;
                                        rule_detail: {
                                            effective_time?: string;
                                            expiration_time?: string;
                                            anniversary?: number;
                                            effective_period?: number;
                                        };
                                        is_grant_all: boolean;
                                        user_ids?: Array<string>;
                                        department_ids?: Array<string>;
                                        group_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants/:grant_id`,
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
             * 勋章图片
             */
            badgeImage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge_image&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/badge_image/create document }
                 *
                 * 上传勋章图片
                 *
                 * 通过该接口可以上传勋章详情图、挂饰图的文件，获取对应的文件key
                 */
                create: async (
                    payload?: {
                        data: {
                            image_file: Buffer | fs.ReadStream;
                            image_type: number;
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
                                data?: { image_key?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badge_images`,
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

                    return get(res, "data", null);
                },
            },
            /**
             * 登录密码管理
             */
            password: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=password&apiName=reset&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/admin-v1/password/reset document }
                 *
                 * 重置密码
                 *
                 * 重置用户的企业邮箱密码，仅当用户的邮箱和企业邮箱(别名)一致时生效，可用于处理飞书企业邮箱登录死锁的问题。;;邮箱死锁：当用户的登录凭证与飞书企业邮箱一致时，目前飞书登录流程要求用户输入验证码，由于飞书邮箱无单独的帐号体系，则未登录时无法收取邮箱验证码，即陷入死锁
                 */
                reset: async (
                    payload?: {
                        data: {
                            password: { ent_email_password: string };
                            user_id: string;
                        };
                        params: {
                            user_id_type: "open_id" | "union_id" | "user_id";
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
                                `${this.domain}/open-apis/admin/v1/password/reset`,
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
