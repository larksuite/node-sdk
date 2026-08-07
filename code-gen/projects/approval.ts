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
import application from "./application";

// auto gen
export default abstract class Client extends application {
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
    approval = {
        /**
         * instance
         */
        instance: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=specified_rollback&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=specified_rollback&project=approval&resource=instance&version=v4 document }
             *
             * 退回审批任务
             *
             * 从当前审批任务，退回到已审批的一个或多个任务节点。退回后，已审批节点重新生成审批任务。
             */
            specifiedRollback: async (
                payload?: {
                    data: {
                        user_id: string;
                        task_id: string;
                        reason?: string;
                        extra?: string;
                        task_def_key_list: Array<string>;
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
                            `${this.domain}/open-apis/approval/v4/instances/specified_rollback`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=cc&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cc&project=approval&resource=instance&version=v4 document }
             *
             * 抄送审批实例
             *
             * 调用该接口将当前审批实例抄送给指定用户。被抄送的用户可以查看审批实例详情。例如，在飞书客户端的 **工作台 > 审批 > 审批中心 > 抄送我** 列表中查看到审批实例。
             */
            cc: async (
                payload?: {
                    data: {
                        approval_code: string;
                        instance_code: string;
                        user_id: string;
                        cc_user_ids: Array<string>;
                        comment?: string;
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
                            `${this.domain}/open-apis/approval/v4/instances/cc`,
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
                        approval_code: string;
                        start_time: string;
                        end_time: string;
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
                                `${this.domain}/open-apis/approval/v4/instances`,
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
                                                instance_code_list: Array<string>;
                                                page_token: string;
                                                has_more: boolean;
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=approval&resource=instance&version=v4 document }
             *
             * 批量获取审批实例 ID
             *
             * 根据审批定义的 approval_code 批量获取审批实例的 instance_code，用于拉取企业下某个审批定义的全部审批实例。默认以审批创建时间先后顺序排列。
             */
            list: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        approval_code: string;
                        start_time: string;
                        end_time: string;
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
                                instance_code_list: Array<string>;
                                page_token: string;
                                has_more: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=add_sign&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_sign&project=approval&resource=instance&version=v4 document }
             */
            addSign: async (
                payload?: {
                    data: {
                        user_id: string;
                        approval_code: string;
                        instance_code: string;
                        task_id: string;
                        comment?: string;
                        add_sign_user_ids: Array<string>;
                        add_sign_type: number;
                        approval_method?: number;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances/add_sign`,
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
            queryWithIterator: async (
                payload?: {
                    data?: {
                        user_id?: string;
                        approval_code?: string;
                        instance_code?: string;
                        instance_external_id?: string;
                        group_external_id?: string;
                        instance_title?: string;
                        instance_status?:
                            | "PENDING"
                            | "RECALL"
                            | "REJECT"
                            | "DELETED"
                            | "APPROVED"
                            | "ALL";
                        instance_start_time_from?: string;
                        instance_start_time_to?: string;
                        locale?:
                            | "zh-CN"
                            | "en-US"
                            | "ja-JP"
                            | "zh-HK"
                            | "zh-TW"
                            | "de-DE"
                            | "es-ES"
                            | "fr-FR"
                            | "id-ID"
                            | "it-IT"
                            | "ko-KR"
                            | "pt-BR"
                            | "th-TH"
                            | "vi-VN"
                            | "ms-MY"
                            | "ru-RU";
                        with_revoked_instance?: boolean;
                    };
                    params?: {
                        page_size?: number;
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
                                `${this.domain}/open-apis/approval/v4/instances/query`,
                                path
                            ),
                            method: "POST",
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
                                                count?: number;
                                                instance_list?: Array<{
                                                    approval?: {
                                                        code?: string;
                                                        name?: string;
                                                        is_external?: boolean;
                                                        external?: {
                                                            batch_cc_read?: boolean;
                                                        };
                                                        approval_id?: string;
                                                        icon?: string;
                                                    };
                                                    group?: {
                                                        external_id?: string;
                                                        name?: string;
                                                    };
                                                    instance?: {
                                                        code?: string;
                                                        external_id?: string;
                                                        user_id?: string;
                                                        start_time?: string;
                                                        end_time?: string;
                                                        status?:
                                                            | "rejected"
                                                            | "pending"
                                                            | "canceled"
                                                            | "deleted"
                                                            | "approved";
                                                        title?: string;
                                                        extra?: string;
                                                        serial_id?: string;
                                                        link?: {
                                                            pc_link?: string;
                                                            mobile_link?: string;
                                                        };
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=query&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=approval&resource=instance&version=v4 document }
             *
             * 查询实例列表
             *
             * 该接口通过不同条件查询审批系统中符合条件的审批实例列表。
             */
            query: async (
                payload?: {
                    data?: {
                        user_id?: string;
                        approval_code?: string;
                        instance_code?: string;
                        instance_external_id?: string;
                        group_external_id?: string;
                        instance_title?: string;
                        instance_status?:
                            | "PENDING"
                            | "RECALL"
                            | "REJECT"
                            | "DELETED"
                            | "APPROVED"
                            | "ALL";
                        instance_start_time_from?: string;
                        instance_start_time_to?: string;
                        locale?:
                            | "zh-CN"
                            | "en-US"
                            | "ja-JP"
                            | "zh-HK"
                            | "zh-TW"
                            | "de-DE"
                            | "es-ES"
                            | "fr-FR"
                            | "id-ID"
                            | "it-IT"
                            | "ko-KR"
                            | "pt-BR"
                            | "th-TH"
                            | "vi-VN"
                            | "ms-MY"
                            | "ru-RU";
                        with_revoked_instance?: boolean;
                    };
                    params?: {
                        page_size?: number;
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
                                count?: number;
                                instance_list?: Array<{
                                    approval?: {
                                        code?: string;
                                        name?: string;
                                        is_external?: boolean;
                                        external?: { batch_cc_read?: boolean };
                                        approval_id?: string;
                                        icon?: string;
                                    };
                                    group?: {
                                        external_id?: string;
                                        name?: string;
                                    };
                                    instance?: {
                                        code?: string;
                                        external_id?: string;
                                        user_id?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        status?:
                                            | "rejected"
                                            | "pending"
                                            | "canceled"
                                            | "deleted"
                                            | "approved";
                                        title?: string;
                                        extra?: string;
                                        serial_id?: string;
                                        link?: {
                                            pc_link?: string;
                                            mobile_link?: string;
                                        };
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances/query`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=search_cc&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_cc&project=approval&resource=instance&version=v4 document }
             *
             * 查询抄送列表
             *
             * 该接口通过不同条件查询审批系统中符合条件的审批抄送列表。
             */
            searchCc: async (
                payload?: {
                    data?: {
                        user_id?: string;
                        approval_code?: string;
                        instance_code?: string;
                        instance_external_id?: string;
                        group_external_id?: string;
                        cc_title?: string;
                        read_status?: "READ" | "UNREAD" | "ALL";
                        cc_create_time_from?: string;
                        cc_create_time_to?: string;
                        locale?:
                            | "zh-CN"
                            | "en-US"
                            | "ja-JP"
                            | "zh-HK"
                            | "zh-TW"
                            | "de-DE"
                            | "es-ES"
                            | "fr-FR"
                            | "id-ID"
                            | "it-IT"
                            | "ko-KR"
                            | "pt-BR"
                            | "th-TH"
                            | "vi-VN"
                            | "ms-MY"
                            | "ru-RU";
                        with_revoked_instance?: boolean;
                    };
                    params?: {
                        page_size?: number;
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
                                count?: number;
                                cc_list?: Array<{
                                    approval?: {
                                        code?: string;
                                        name?: string;
                                        is_external?: boolean;
                                        external?: { batch_cc_read?: boolean };
                                        approval_id?: string;
                                        icon?: string;
                                    };
                                    group?: {
                                        external_id?: string;
                                        name?: string;
                                    };
                                    instance?: {
                                        code?: string;
                                        external_id?: string;
                                        user_id?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        status?:
                                            | "rejected"
                                            | "pending"
                                            | "canceled"
                                            | "deleted"
                                            | "approved";
                                        title?: string;
                                        extra?: string;
                                        serial_id?: string;
                                        link?: {
                                            pc_link?: string;
                                            mobile_link?: string;
                                        };
                                    };
                                    cc?: {
                                        user_id?: string;
                                        create_time?: string;
                                        read_status?: "read" | "unread";
                                        title?: string;
                                        extra?: string;
                                        link?: {
                                            pc_link?: string;
                                            mobile_link?: string;
                                        };
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances/search_cc`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=cancel&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel&project=approval&resource=instance&version=v4 document }
             *
             * 撤回审批实例
             *
             * 如果企业管理员在审批后台的某一审批定义的 **更多设置** 中，勾选了 **允许撤销审批中的申请** 或者 **允许撤销 x 天内通过的审批**，则在符合撤销规则的情况下，你可以调用本接口将指定提交人的审批实例撤回。
             */
            cancel: async (
                payload?: {
                    data: {
                        approval_code: string;
                        instance_code: string;
                        user_id: string;
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
                            `${this.domain}/open-apis/approval/v4/instances/cancel`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=preview&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=preview&project=approval&resource=instance&version=v4 document }
             */
            preview: async (
                payload?: {
                    data: {
                        user_id: string;
                        approval_code?: string;
                        department_id?: string;
                        form?: string;
                        instance_code?: string;
                        locale?: string;
                        task_id?: string;
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
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                preview_nodes?: Array<{
                                    node_id?: string;
                                    node_name?: string;
                                    node_type?: string;
                                    comments?: Array<string>;
                                    custom_node_id?: string;
                                    user_id_list?: Array<string>;
                                    end_cc_id_list?: Array<string>;
                                    is_empty_logic?: boolean;
                                    is_approver_type_free?: boolean;
                                    has_cc_type_free?: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances/preview`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=approval&resource=instance&version=v4 document }
             *
             * 创建审批实例
             *
             * 调用本接口使用指定审批定义 Code 创建一个审批实例，接口调用者需对审批定义的表单有详细了解，按照定义的表单结构，将表单 Value 通过本接口传入。
             */
            create: async (
                payload?: {
                    data: {
                        approval_code: string;
                        user_id?: string;
                        open_id?: string;
                        department_id?: string;
                        form: string;
                        node_approver_user_id_list?: Array<{
                            key?: string;
                            value?: Array<string>;
                        }>;
                        node_approver_open_id_list?: Array<{
                            key?: string;
                            value?: Array<string>;
                        }>;
                        node_cc_user_id_list?: Array<{
                            key?: string;
                            value?: Array<string>;
                        }>;
                        node_cc_open_id_list?: Array<{
                            key?: string;
                            value?: Array<string>;
                        }>;
                        uuid?: string;
                        allow_resubmit?: boolean;
                        allow_submit_again?: boolean;
                        cancel_bot_notification?: string;
                        forbid_revoke?: boolean;
                        i18n_resources?: Array<{
                            locale:
                                | "zh-CN"
                                | "en-US"
                                | "ja-JP"
                                | "zh-HK"
                                | "zh-TW"
                                | "de-DE"
                                | "es-ES"
                                | "fr-FR"
                                | "id-ID"
                                | "it-IT"
                                | "ko-KR"
                                | "pt-BR"
                                | "th-TH"
                                | "vi-VN"
                                | "ms-MY"
                                | "ru-RU";
                            texts: Array<{ key: string; value: string }>;
                            is_default: boolean;
                        }>;
                        title?: string;
                        title_display_method?: number;
                        node_auto_approval_list?: Array<{
                            node_id_type?: "CUSTOM" | "NON_CUSTOM";
                            node_id?: string;
                        }>;
                        byte_extra?: string;
                        with_link?: boolean;
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
                                instance_code: string;
                                instance_link: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=remind&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remind&project=approval&resource=instance&version=v4 document }
             *
             * 发送催办消息
             *
             * 当需要催促审批人审批单据时，通过该接口给审批人发送催办消息
             */
            remind: async (
                payload?: {
                    data: {
                        instance_code: string;
                        task_ids: Array<string>;
                        comment?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances/remind`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=add_cc&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_cc&project=approval&resource=instance&version=v4 document }
             *
             * 抄送审批实例
             *
             * 调用该接口将当前审批实例抄送给指定用户。被抄送的用户可以查看审批实例详情。例如，在飞书客户端的 **工作台 > 审批 > 审批中心 > 抄送我** 列表中查看到审批实例。
             */
            addCc: async (
                payload?: {
                    data: {
                        instance_code: string;
                        cc_user_ids: Array<string>;
                        comment?: string;
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
                            `${this.domain}/open-apis/approval/v4/instances/add_cc`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=recall&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recall&project=approval&resource=instance&version=v4 document }
             *
             * 撤回审批实例
             *
             * 在符合撤销规则的情况下，你可以调用本接口将**当前用户身份提交的**的审批实例撤回。
             *
             * ![image.png](//sf3-cn.feishucdn.com/obj/open-platform-opendoc/0fa2d2e821074146781c1750e54fc7f6_FECsrbxOXW.png?height=278&maxWidth=550&width=1383);;## 注意事项;;- 如果撤回的是审批中的实例，则撤回后审批流程结束。;- 如果撤回的是已通过的实例，则审批实例会变更为 **审批中** 的状态。;- 撤销规则：企业管理员在审批后台的某一审批定义的 **更多设置** 中，勾选了 **允许撤销审批中的申请** 或者 **允许撤销 x 天内通过的审批**
             */
            recall: async (
                payload?: {
                    data: { instance_code: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances/recall`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=get&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=approval&resource=instance&version=v4 document }
             *
             * 获取单个审批实例详情
             *
             * 通过审批实例 Code 获取指定审批实例的详细信息，包括审批实例的名称、创建时间、发起审批的用户、状态以及任务列表等信息。
             */
            get: async (
                payload?: {
                    params?: {
                        locale?:
                            | "zh-CN"
                            | "en-US"
                            | "ja-JP"
                            | "zh-HK"
                            | "zh-TW"
                            | "de-DE"
                            | "es-ES"
                            | "fr-FR"
                            | "id-ID"
                            | "it-IT"
                            | "ko-KR"
                            | "pt-BR"
                            | "th-TH"
                            | "vi-VN"
                            | "ms-MY"
                            | "ru-RU";
                        user_id?: string;
                        user_id_type?: "user_id" | "open_id" | "union_id";
                        nested_mutable_group?: boolean;
                    };
                    path: { instance_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                approval_name: string;
                                start_time?: string;
                                end_time: string;
                                user_id: string;
                                open_id: string;
                                serial_number: string;
                                department_id: string;
                                status:
                                    | "PENDING"
                                    | "APPROVED"
                                    | "REJECTED"
                                    | "CANCELED"
                                    | "DELETED";
                                uuid: string;
                                form: string;
                                task_list: Array<{
                                    id: string;
                                    user_id: string;
                                    open_id?: string;
                                    status:
                                        | "PENDING"
                                        | "APPROVED"
                                        | "REJECTED"
                                        | "TRANSFERRED"
                                        | "DONE";
                                    node_id?: string;
                                    node_name?: string;
                                    custom_node_id?: string;
                                    type?:
                                        | "AND"
                                        | "OR"
                                        | "AUTO_PASS"
                                        | "AUTO_REJECT"
                                        | "SEQUENTIAL";
                                    start_time: string;
                                    end_time?: string;
                                }>;
                                comment_list: Array<{
                                    id: string;
                                    user_id: string;
                                    open_id: string;
                                    comment: string;
                                    create_time: string;
                                    files?: Array<{
                                        url?: string;
                                        file_size?: number;
                                        title?: string;
                                        type?: string;
                                    }>;
                                }>;
                                timeline: Array<{
                                    type:
                                        | "START"
                                        | "PASS"
                                        | "REJECT"
                                        | "AUTO_PASS"
                                        | "AUTO_REJECT"
                                        | "REMOVE_REPEAT"
                                        | "TRANSFER"
                                        | "ADD_APPROVER_BEFORE"
                                        | "ADD_APPROVER"
                                        | "ADD_APPROVER_AFTER"
                                        | "DELETE_APPROVER"
                                        | "ROLLBACK_SELECTED"
                                        | "ROLLBACK"
                                        | "CANCEL"
                                        | "DELETE"
                                        | "CC";
                                    create_time: string;
                                    user_id?: string;
                                    open_id?: string;
                                    user_id_list?: Array<string>;
                                    open_id_list?: Array<string>;
                                    task_id?: string;
                                    comment?: string;
                                    cc_user_list?: Array<{
                                        user_id?: string;
                                        cc_id?: string;
                                        open_id?: string;
                                    }>;
                                    ext: string;
                                    node_key?: string;
                                    files?: Array<{
                                        url?: string;
                                        file_size?: number;
                                        title?: string;
                                        type?: string;
                                    }>;
                                }>;
                                modified_instance_code?: string;
                                reverted_instance_code?: string;
                                approval_code: string;
                                reverted?: boolean;
                                instance_code: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances/:instance_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=detail&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=detail&project=approval&resource=instance&version=v4 document }
             *
             * 获取单个审批实例详情
             *
             * 通过审批实例 Code 获取指定审批实例的详细信息，包括审批实例的名称、创建时间、发起审批的用户、状态以及任务列表等信息。
             */
            detail: async (
                payload?: {
                    params: {
                        instance_code: string;
                        locale?:
                            | "zh-CN"
                            | "en-US"
                            | "ja-JP"
                            | "zh-HK"
                            | "zh-TW"
                            | "de-DE"
                            | "es-ES"
                            | "fr-FR"
                            | "id-ID"
                            | "it-IT"
                            | "ko-KR"
                            | "pt-BR"
                            | "th-TH"
                            | "vi-VN"
                            | "ms-MY"
                            | "ru-RU";
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
                                definition_name: string;
                                start_time?: string;
                                end_time: string;
                                user_id: string;
                                serial_number: string;
                                department_id: string;
                                status:
                                    | "PENDING"
                                    | "APPROVED"
                                    | "REJECTED"
                                    | "CANCELED"
                                    | "DELETED";
                                form: string;
                                tasks: Array<{
                                    id: string;
                                    user_id: string;
                                    status:
                                        | "PENDING"
                                        | "APPROVED"
                                        | "REJECTED"
                                        | "TRANSFERRED"
                                        | "DONE";
                                    node_id?: string;
                                    node_name?: string;
                                    type?:
                                        | "AND"
                                        | "OR"
                                        | "AUTO_PASS"
                                        | "AUTO_REJECT"
                                        | "SEQUENTIAL";
                                    start_time: string;
                                    end_time?: string;
                                }>;
                                comments: Array<{
                                    id: string;
                                    user_id: string;
                                    comment: string;
                                    create_time: string;
                                    files?: Array<{
                                        url?: string;
                                        file_size?: number;
                                        title?: string;
                                        type?: string;
                                    }>;
                                }>;
                                operation_records: Array<{
                                    type:
                                        | "START"
                                        | "PASS"
                                        | "REJECT"
                                        | "AUTO_PASS"
                                        | "AUTO_REJECT"
                                        | "REMOVE_REPEAT"
                                        | "TRANSFER"
                                        | "ADD_APPROVER_BEFORE"
                                        | "ADD_APPROVER"
                                        | "ADD_APPROVER_AFTER"
                                        | "DELETE_APPROVER"
                                        | "ROLLBACK_SELECTED"
                                        | "ROLLBACK"
                                        | "CANCEL"
                                        | "DELETE"
                                        | "CC";
                                    create_time: string;
                                    user_id?: string;
                                    cc_user_ids?: Array<string>;
                                    task_id?: string;
                                    comment?: string;
                                    node_id?: string;
                                    files?: Array<{
                                        url?: string;
                                        file_size?: number;
                                        title?: string;
                                        type?: string;
                                    }>;
                                }>;
                                definition_code: string;
                                reverted?: boolean;
                                instance_code: string;
                                current_nodes?: Array<{
                                    node_id?: string;
                                    node_name?: string;
                                    type?:
                                        | "AND"
                                        | "OR"
                                        | "AUTO_PASS"
                                        | "AUTO_REJECT"
                                        | "SEQUENTIAL";
                                    approvers?: Array<{
                                        task_id?: string;
                                        user_id?: string;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances/detail`,
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
            initiatedWithIterator: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        locale?: "zh-CN" | "en-US" | "ja-JP";
                        definition_code?: string;
                        start_timestamp?: string;
                        end_timestamp?: string;
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
                                `${this.domain}/open-apis/approval/v4/instances/initiated`,
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
                                                instances: Array<{
                                                    instance_status:
                                                        | "0"
                                                        | "1"
                                                        | "2"
                                                        | "3"
                                                        | "4"
                                                        | "5";
                                                    definition_code: string;
                                                    initiator?: string;
                                                    initiator_name?: string;
                                                    instance_code: string;
                                                    definition_group_id?: string;
                                                    definition_group_name?: string;
                                                    definition_name?: string;
                                                    summaries?: Array<{
                                                        key?: string;
                                                        value?: string;
                                                    }>;
                                                    instance_external_id?: string;
                                                    link?: string;
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                                count?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=initiated&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=initiated&project=approval&resource=instance&version=v4 document }
             *
             * 获取用户已发起审批列表
             *
             * 以用户身份获取用户已发起的审批列表，与飞书中审批->审批中心->已发起一致
             */
            initiated: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        locale?: "zh-CN" | "en-US" | "ja-JP";
                        definition_code?: string;
                        start_timestamp?: string;
                        end_timestamp?: string;
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
                                instances: Array<{
                                    instance_status:
                                        | "0"
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5";
                                    definition_code: string;
                                    initiator?: string;
                                    initiator_name?: string;
                                    instance_code: string;
                                    definition_group_id?: string;
                                    definition_group_name?: string;
                                    definition_name?: string;
                                    summaries?: Array<{
                                        key?: string;
                                        value?: string;
                                    }>;
                                    instance_external_id?: string;
                                    link?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                                count?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances/initiated`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=subscription&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=approval&resource=instance&version=v4 document }
             *
             * 订阅审批实例状态变更事件
             *
             * 当应用[订阅审批事件](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)后，对于事件type为[审批实例状态变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/events/status_changed)的事件;，需要调用该接口指定需要接收通知的审批任务范围，指定后才可以接收到对应范围内的事件。
             */
            subscription: async (
                payload?: {
                    data: {
                        subscription_type:
                            | "INVOLVED_APPROVAL"
                            | "MANAGED_APPROVAL";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances/subscription`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=unsubscription&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscription&project=approval&resource=instance&version=v4 document }
             *
             * 退订审批实例状态变更事件
             *
             * 当不再希望收到任务状态变更事件时，调用此接口，该接口用于撤销[订阅审批实例状态变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/subscription)中的操作
             */
            unsubscription: async (
                payload?: {
                    params?: {
                        subscription_type?:
                            | "INVOLVED_APPROVAL"
                            | "MANAGED_APPROVAL";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances/subscription`,
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
         * task
         */
        task: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=transfer&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=transfer&project=approval&resource=task&version=v4 document }
             *
             * 转交审批任务
             *
             * 对于单个审批任务进行转交操作。转交后审批流程流转给被转交人。
             */
            transfer: async (
                payload?: {
                    data: {
                        approval_code: string;
                        instance_code: string;
                        user_id: string;
                        comment?: string;
                        transfer_user_id: string;
                        task_id: string;
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
                            `${this.domain}/open-apis/approval/v4/tasks/transfer`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=reject&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reject&project=approval&resource=task&version=v4 document }
             *
             * 拒绝审批任务
             *
             * 对于单个审批任务进行拒绝操作。拒绝后审批流程结束。
             */
            reject: async (
                payload?: {
                    data: {
                        approval_code: string;
                        instance_code: string;
                        user_id: string;
                        comment?: string;
                        task_id: string;
                        form?: string;
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
                            `${this.domain}/open-apis/approval/v4/tasks/reject`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=resubmit&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=resubmit&project=approval&resource=task&version=v4 document }
             *
             * 重新提交审批任务
             *
             * 对于退回到发起人的审批任务进行重新发起操作。发起后审批流程会流转到下一个审批人。
             */
            resubmit: async (
                payload?: {
                    data: {
                        approval_code: string;
                        instance_code: string;
                        user_id: string;
                        comment?: string;
                        task_id: string;
                        form: string;
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
                            `${this.domain}/open-apis/approval/v4/tasks/resubmit`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=search&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=approval&resource=task&version=v4 document }
             *
             * 查询任务列表
             *
             * 该接口通过不同条件查询审批系统中符合条件的审批任务列表。
             */
            search: async (
                payload?: {
                    data?: {
                        user_id?: string;
                        approval_code?: string;
                        instance_code?: string;
                        instance_external_id?: string;
                        group_external_id?: string;
                        task_title?: string;
                        task_status?:
                            | "PENDING"
                            | "REJECTED"
                            | "APPROVED"
                            | "TRANSFERRED"
                            | "DONE"
                            | "RM_REPEAT"
                            | "PROCESSED"
                            | "ALL";
                        task_start_time_from?: string;
                        task_start_time_to?: string;
                        locale?:
                            | "zh-CN"
                            | "en-US"
                            | "ja-JP"
                            | "zh-HK"
                            | "zh-TW"
                            | "de-DE"
                            | "es-ES"
                            | "fr-FR"
                            | "id-ID"
                            | "it-IT"
                            | "ko-KR"
                            | "pt-BR"
                            | "th-TH"
                            | "vi-VN"
                            | "ms-MY"
                            | "ru-RU";
                        task_status_list?: Array<string>;
                        order?: number;
                        with_revoked_instance?: boolean;
                    };
                    params?: {
                        page_size?: number;
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
                                count?: number;
                                task_list?: Array<{
                                    approval?: {
                                        code?: string;
                                        name?: string;
                                        is_external?: boolean;
                                        external?: { batch_cc_read?: boolean };
                                        approval_id?: string;
                                        icon?: string;
                                    };
                                    group?: {
                                        external_id?: string;
                                        name?: string;
                                    };
                                    instance?: {
                                        code?: string;
                                        external_id?: string;
                                        user_id?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        status?:
                                            | "rejected"
                                            | "pending"
                                            | "canceled"
                                            | "deleted"
                                            | "approved";
                                        title?: string;
                                        extra?: string;
                                        serial_id?: string;
                                        link?: {
                                            pc_link?: string;
                                            mobile_link?: string;
                                        };
                                    };
                                    task?: {
                                        user_id?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        status?:
                                            | "rejected"
                                            | "pending"
                                            | "approved"
                                            | "transferred"
                                            | "done"
                                            | "rm_repeat"
                                            | "processed"
                                            | "hidden";
                                        title?: string;
                                        extra?: string;
                                        link?: {
                                            pc_link?: string;
                                            mobile_link?: string;
                                        };
                                        task_id?: string;
                                        update_time?: string;
                                        task_external_id?: string;
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/tasks/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=approve&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=approve&project=approval&resource=task&version=v4 document }
             *
             * 同意审批任务
             *
             * 对于单个审批任务进行同意操作。同意后审批流程会流转到下一个审批人。
             */
            approve: async (
                payload?: {
                    data: {
                        approval_code: string;
                        instance_code: string;
                        user_id: string;
                        comment?: string;
                        task_id: string;
                        form?: string;
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
                            `${this.domain}/open-apis/approval/v4/tasks/approve`,
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
            queryWithIterator: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        user_id: string;
                        topic: "1" | "2" | "3" | "17" | "18";
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
                                `${this.domain}/open-apis/approval/v4/tasks/query`,
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
                                                tasks: Array<{
                                                    topic:
                                                        | "1"
                                                        | "2"
                                                        | "3"
                                                        | "17"
                                                        | "18";
                                                    user_id: string;
                                                    title: string;
                                                    urls: {
                                                        helpdesk?: string;
                                                        mobile?: string;
                                                        pc?: string;
                                                    };
                                                    process_external_id?: string;
                                                    task_external_id?: string;
                                                    status:
                                                        | "1"
                                                        | "2"
                                                        | "17"
                                                        | "18"
                                                        | "33"
                                                        | "34";
                                                    process_status:
                                                        | "0"
                                                        | "1"
                                                        | "2"
                                                        | "3"
                                                        | "4"
                                                        | "5";
                                                    definition_code: string;
                                                    initiators?: Array<string>;
                                                    initiator_names?: Array<string>;
                                                    task_id: string;
                                                    process_id: string;
                                                    process_code: string;
                                                    definition_group_id?: string;
                                                    definition_group_name?: string;
                                                    definition_id?: string;
                                                    definition_name?: string;
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                                count?: {
                                                    total: number;
                                                    has_more?: boolean;
                                                };
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=query&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=approval&resource=task&version=v4 document }
             *
             * 查询用户的任务列表
             *
             * 通过设置用户、任务分组，查询任务信息。任务分组包括待办审批、已办审批以及已发起审批等。
             */
            query: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        user_id: string;
                        topic: "1" | "2" | "3" | "17" | "18";
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
                                tasks: Array<{
                                    topic: "1" | "2" | "3" | "17" | "18";
                                    user_id: string;
                                    title: string;
                                    urls: {
                                        helpdesk?: string;
                                        mobile?: string;
                                        pc?: string;
                                    };
                                    process_external_id?: string;
                                    task_external_id?: string;
                                    status:
                                        | "1"
                                        | "2"
                                        | "17"
                                        | "18"
                                        | "33"
                                        | "34";
                                    process_status:
                                        | "0"
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5";
                                    definition_code: string;
                                    initiators?: Array<string>;
                                    initiator_names?: Array<string>;
                                    task_id: string;
                                    process_id: string;
                                    process_code: string;
                                    definition_group_id?: string;
                                    definition_group_name?: string;
                                    definition_id?: string;
                                    definition_name?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                                count?: { total: number; has_more?: boolean };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/tasks/query`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=refuse&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=refuse&project=approval&resource=task&version=v4 document }
             *
             * 拒绝审批任务
             *
             * 对于单个审批任务进行拒绝操作。拒绝后审批流程结束。
             */
            refuse: async (
                payload?: {
                    data: {
                        instance_code: string;
                        task_id: string;
                        comment?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/tasks/refuse`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=pass&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=pass&project=approval&resource=task&version=v4 document }
             *
             * 同意审批任务
             *
             * 对于单个审批任务进行同意操作。同意后审批流程会流转到下一个审批人。
             */
            pass: async (
                payload?: {
                    data: {
                        instance_code: string;
                        task_id: string;
                        form?: string;
                        comment?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/tasks/pass`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=forward&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=forward&project=approval&resource=task&version=v4 document }
             *
             * 转交审批任务
             *
             * 对于单个审批任务进行转交操作。转交后审批流程流转给被转交人。;
             */
            forward: async (
                payload?: {
                    data: {
                        instance_code: string;
                        task_id: string;
                        transfer_user_id: string;
                        comment?: string;
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
                            `${this.domain}/open-apis/approval/v4/tasks/forward`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=add_sign&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_sign&project=approval&resource=task&version=v4 document }
             *
             * 加签审批任务
             *
             * 通过调用该接口在当前节点增加审批人
             */
            addSign: async (
                payload?: {
                    data: {
                        instance_code: string;
                        task_id: string;
                        comment?: string;
                        add_sign_user_ids: Array<string>;
                        add_sign_type: number;
                        approval_method?: number;
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
                            `${this.domain}/open-apis/approval/v4/tasks/add_sign`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=rollback&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=rollback&project=approval&resource=task&version=v4 document }
             *
             * 退回审批任务
             *
             * 从当前审批任务，退回到已审批的一个或多个任务节点。退回后，已审批节点重新生成审批任务。
             */
            rollback: async (
                payload?: {
                    data: {
                        instance_code: string;
                        task_id: string;
                        comment?: string;
                        node_ids: Array<string>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/tasks/rollback`,
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
                        topic: "1" | "2" | "3" | "17" | "18";
                        locale?: "zh-CN" | "en-US" | "ja-JP";
                        definition_code?: string;
                        start_timestamp?: string;
                        end_timestamp?: string;
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
                                `${this.domain}/open-apis/approval/v4/tasks`,
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
                                                tasks: Array<{
                                                    topic:
                                                        | "1"
                                                        | "2"
                                                        | "3"
                                                        | "17"
                                                        | "18";
                                                    user_id: string;
                                                    title: string;
                                                    status:
                                                        | "1"
                                                        | "2"
                                                        | "17"
                                                        | "18"
                                                        | "33"
                                                        | "34";
                                                    instance_status:
                                                        | "0"
                                                        | "1"
                                                        | "2"
                                                        | "3"
                                                        | "4"
                                                        | "5";
                                                    definition_code: string;
                                                    initiator?: string;
                                                    initiator_name?: string;
                                                    task_id: string;
                                                    instance_code: string;
                                                    definition_group_id?: string;
                                                    definition_group_name?: string;
                                                    definition_name?: string;
                                                    summaries?: Array<{
                                                        key?: string;
                                                        value?: string;
                                                    }>;
                                                    instance_external_id?: string;
                                                    task_external_id?: string;
                                                    support_api_operate?: boolean;
                                                    link?: string;
                                                }>;
                                                page_token?: string;
                                                has_more?: boolean;
                                                count?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=approval&resource=task&version=v4 document }
             *
             * 获取审批任务列表
             *
             * 通过设置任务分组、审批定义 Code（审批流程的唯一标识）等，查询任务列表。任务分组包括待办审批、已办审批等
             */
            list: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        topic: "1" | "2" | "3" | "17" | "18";
                        locale?: "zh-CN" | "en-US" | "ja-JP";
                        definition_code?: string;
                        start_timestamp?: string;
                        end_timestamp?: string;
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
                                tasks: Array<{
                                    topic: "1" | "2" | "3" | "17" | "18";
                                    user_id: string;
                                    title: string;
                                    status:
                                        | "1"
                                        | "2"
                                        | "17"
                                        | "18"
                                        | "33"
                                        | "34";
                                    instance_status:
                                        | "0"
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5";
                                    definition_code: string;
                                    initiator?: string;
                                    initiator_name?: string;
                                    task_id: string;
                                    instance_code: string;
                                    definition_group_id?: string;
                                    definition_group_name?: string;
                                    definition_name?: string;
                                    summaries?: Array<{
                                        key?: string;
                                        value?: string;
                                    }>;
                                    instance_external_id?: string;
                                    task_external_id?: string;
                                    support_api_operate?: boolean;
                                    link?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                                count?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/tasks`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=unsubscription&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscription&project=approval&resource=task&version=v4 document }
             *
             * 退订审批任务状态变更事件
             *
             * 当不再希望收到任务状态变更事件时，调用此接口，该接口用于撤销[订阅审批任务状态变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/subscription)中的操作
             */
            unsubscription: async (
                payload?: {
                    params?: {
                        subscription_type?:
                            | "INVOLVED_APPROVAL"
                            | "MANAGED_APPROVAL";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/tasks/subscription`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=subscription&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=approval&resource=task&version=v4 document }
             *
             * 订阅审批任务状态变更事件
             *
             * 当应用[订阅审批事件](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)后，对于事件type为[审批任务状态变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/events/status_changed)的事件;，需要调用该接口指定需要接收通知的审批任务范围，指定后才可以接收到对应范围内的事件。
             */
            subscription: async (
                payload?: {
                    data: {
                        subscription_type:
                            | "INVOLVED_APPROVAL"
                            | "MANAGED_APPROVAL";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/tasks/subscription`,
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
         * approval
         */
        approval: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=unsubscribe&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscribe&project=approval&resource=approval&version=v4 document }
             *
             * 取消订阅审批事件
             *
             * 调用[订阅审批事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/subscribe)接口订阅审批定义 Code 后，如果不再需要接收该审批定义下的事件订阅通知，可以调用本接口取消订阅审批定义 Code，取消后应用无法再收到该审批定义对应实例的事件通知。
             */
            unsubscribe: async (
                payload?: {
                    path?: { approval_code?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/approvals/:approval_code/unsubscribe`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=subscribe&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscribe&project=approval&resource=approval&version=v4 document }
             *
             * 订阅审批事件
             *
             * 当应用[订阅审批事件](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)后，需要调用该接口指定审批定义 Code（approval_code）开启订阅，开启后应用才可以接收该审批定义对应的事件。
             *
             * ## 注意事项;;- 该接口仅用于开启应用接收审批事件，实际使用时应用还需要订阅所需的审批事件。例如订阅[审批实例状态变更](https://open.feishu.cn/document/ukTMukTMukTM/uIDO24iM4YjLygjN/event/common-event/approval-instance-event)事件。;- 同一应用只需要调用该接口一次即可，无需重复调用该接口。;- 当应用不再需要接收审批事件时，可以调用[取消订阅审批事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/unsubscribe)接口，进行取消，取消后该应用将不再会收到事件订阅消息。;- 订阅和取消订阅接口的实现都是面向应用的，多个应用可以同时订阅同一个审批定义 Code（approval_code），每个应用在都能收到审批事件。
             */
            subscribe: async (
                payload?: {
                    path: { approval_code: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/approvals/:approval_code/subscribe`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=approval&resource=approval&version=v4 document }
             *
             * 创建审批定义
             *
             * 该接口用于创建审批定义，可以灵活指定审批定义的基础信息、表单和流程等。
             */
            create: async (
                payload?: {
                    data: {
                        approval_name: string;
                        approval_code?: string;
                        description?: string;
                        viewers: Array<{
                            viewer_type?:
                                | "TENANT"
                                | "DEPARTMENT"
                                | "USER"
                                | "NONE";
                            viewer_user_id?: string;
                            viewer_department_id?: string;
                        }>;
                        form: {
                            form_content: string;
                            widget_relation?: string;
                        };
                        node_list: Array<{
                            id: string;
                            name?: string;
                            node_type?: "AND" | "OR" | "SEQUENTIAL";
                            approver?: Array<{
                                type:
                                    | "Supervisor"
                                    | "SupervisorTopDown"
                                    | "DepartmentManager"
                                    | "DepartmentManagerTopDown"
                                    | "Personal"
                                    | "Free";
                                user_id?: string;
                                level?: string;
                            }>;
                            ccer?: Array<{
                                type:
                                    | "Supervisor"
                                    | "SupervisorTopDown"
                                    | "DepartmentManager"
                                    | "DepartmentManagerTopDown"
                                    | "Personal"
                                    | "Free";
                                user_id?: string;
                                level?: string;
                            }>;
                            privilege_field?: {
                                writable: Array<string>;
                                readable: Array<string>;
                            };
                            approver_chosen_multi?: boolean;
                            approver_chosen_range?: Array<{
                                type?: "ALL" | "PERSONAL" | "ROLE";
                                id_list?: Array<string>;
                            }>;
                            starter_assignee?:
                                | "STARTER"
                                | "AUTO_PASS"
                                | "SUPERVISOR"
                                | "DEPARTMENT_MANAGER";
                        }>;
                        settings?: {
                            revert_interval?: number;
                            revert_option?: number;
                            reject_option?: number;
                            quick_approval_option?: number;
                            overtime_disable?: boolean;
                            overtime_notice_time?: number;
                            overtime_close_time?: number;
                            overtime_recover_time?: number;
                        };
                        config?: {
                            can_update_viewer: boolean;
                            can_update_form: boolean;
                            can_update_process: boolean;
                            can_update_revert: boolean;
                            help_url?: string;
                        };
                        icon?: number;
                        i18n_resources: Array<{
                            locale:
                                | "zh-CN"
                                | "en-US"
                                | "ja-JP"
                                | "zh-HK"
                                | "zh-TW"
                                | "de-DE"
                                | "es-ES"
                                | "fr-FR"
                                | "id-ID"
                                | "it-IT"
                                | "ko-KR"
                                | "pt-BR"
                                | "th-TH"
                                | "vi-VN"
                                | "ms-MY"
                                | "ru-RU";
                            texts: Array<{ key: string; value: string }>;
                            is_default: boolean;
                        }>;
                        process_manager_ids?: Array<string>;
                    };
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
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
                                approval_code?: string;
                                approval_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/approvals`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=get&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=approval&resource=approval&version=v4 document }
             *
             * 查看指定审批定义
             *
             * 根据审批定义 Code 以及语言、用户 ID 等筛选条件获取指定审批定义的信息，包括审批定义名称、状态、表单控件以及节点等信息。获取审批定义信息后，可根据信息构造[创建审批实例](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/create)的请求。
             */
            get: async (
                payload?: {
                    params?: {
                        locale?:
                            | "zh-CN"
                            | "en-US"
                            | "ja-JP"
                            | "zh-HK"
                            | "zh-TW"
                            | "de-DE"
                            | "es-ES"
                            | "fr-FR"
                            | "id-ID"
                            | "it-IT"
                            | "ko-KR"
                            | "pt-BR"
                            | "th-TH"
                            | "vi-VN"
                            | "ms-MY"
                            | "ru-RU";
                        with_admin_id?: boolean;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        with_option?: boolean;
                        user_id?: string;
                        nested_mutable_group?: boolean;
                    };
                    path: { approval_code: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                approval_name: string;
                                status:
                                    | "ACTIVE"
                                    | "INACTIVE"
                                    | "DELETED"
                                    | "UNKNOWN";
                                form: string;
                                node_list: Array<{
                                    name: string;
                                    need_approver: boolean;
                                    node_id: string;
                                    custom_node_id?: string;
                                    node_type:
                                        | "AND"
                                        | "OR"
                                        | "SEQUENTIAL"
                                        | "CC_NODE";
                                    approver_chosen_multi: boolean;
                                    approver_chosen_range?: Array<{
                                        approver_range_type?: number;
                                        approver_range_ids?: Array<string>;
                                    }>;
                                    require_signature?: boolean;
                                }>;
                                viewers: Array<{
                                    type:
                                        | "TENANT"
                                        | "DEPARTMENT"
                                        | "USER"
                                        | "ROLE"
                                        | "USER_GROUP"
                                        | "NONE";
                                    id?: string;
                                    user_id?: string;
                                }>;
                                approval_admin_ids?: Array<string>;
                                form_widget_relation?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/approvals/:approval_code`,
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
         * instance.comment
         */
        instanceComment: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=approval&resource=instance.comment&version=v4 document }
             *
             * 创建评论
             *
             * 在指定审批实例下创建、修改评论或回复评论（不包含审批同意、拒绝、转交等附加的理由或意见）。;
             */
            create: async (
                payload?: {
                    data?: {
                        content?: string;
                        at_info_list?: Array<{
                            user_id: string;
                            name: string;
                            offset: string;
                        }>;
                        parent_comment_id?: string;
                        comment_id?: string;
                        disable_bot?: boolean;
                        extra?: string;
                    };
                    params: {
                        user_id_type?: "open_id" | "user_id" | "union_id";
                        user_id: string;
                    };
                    path: { instance_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { comment_id: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances/:instance_id/comments`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=delete&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=approval&resource=instance.comment&version=v4 document }
             *
             * 删除评论
             *
             * 删除某审批实例下的一条评论或评论回复（不包含审批同意、拒绝、转交等附加的理由或意见），删除后在审批中心的审批实例内不再显示评论内容，而是显示 **评论已删除**。
             */
            delete: async (
                payload?: {
                    params: {
                        user_id_type?: "open_id" | "user_id" | "union_id";
                        user_id: string;
                    };
                    path: { instance_id: string; comment_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { comment_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances/:instance_id/comments/:comment_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=remove&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove&project=approval&resource=instance.comment&version=v4 document }
             *
             * 清空评论
             *
             * 清空某审批实例下的全部评论与评论回复，包括显示为已删除的评论。
             */
            remove: async (
                payload?: {
                    params?: {
                        user_id_type?: "open_id" | "user_id" | "union_id";
                        user_id?: string;
                    };
                    path: { instance_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                instance_id?: string;
                                external_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances/:instance_id/comments/remove`,
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
                        user_id_type?: "open_id" | "user_id" | "union_id";
                        user_id: string;
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { instance_id: string };
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
                                `${this.domain}/open-apis/approval/v4/instances/:instance_id/comments`,
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
                                                comments: Array<{
                                                    id: string;
                                                    content: string;
                                                    create_time: string;
                                                    update_time: string;
                                                    is_delete: number;
                                                    replies?: Array<{
                                                        id: string;
                                                        content: string;
                                                        create_time?: string;
                                                        update_time?: string;
                                                        is_delete: number;
                                                        at_info_list?: Array<{
                                                            user_id: string;
                                                            name: string;
                                                            offset: string;
                                                        }>;
                                                        commentator: string;
                                                        extra?: string;
                                                    }>;
                                                    at_info_list?: Array<{
                                                        user_id: string;
                                                        name: string;
                                                        offset: string;
                                                    }>;
                                                    commentator: string;
                                                    extra?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=approval&resource=instance.comment&version=v4 document }
             *
             * 获取评论
             *
             * 根据审批实例 Code 获取某个审批实例下，全部评论与评论回复（不包含审批同意、拒绝、转交等附加的理由或意见）。
             */
            list: async (
                payload?: {
                    params: {
                        user_id_type?: "open_id" | "user_id" | "union_id";
                        user_id: string;
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { instance_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                comments: Array<{
                                    id: string;
                                    content: string;
                                    create_time: string;
                                    update_time: string;
                                    is_delete: number;
                                    replies?: Array<{
                                        id: string;
                                        content: string;
                                        create_time?: string;
                                        update_time?: string;
                                        is_delete: number;
                                        at_info_list?: Array<{
                                            user_id: string;
                                            name: string;
                                            offset: string;
                                        }>;
                                        commentator: string;
                                        extra?: string;
                                    }>;
                                    at_info_list?: Array<{
                                        user_id: string;
                                        name: string;
                                        offset: string;
                                    }>;
                                    commentator: string;
                                    extra?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/instances/:instance_id/comments`,
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
         * external_task
         */
        externalTask: {
            listWithIterator: async (
                payload?: {
                    data?: {
                        approval_codes?: Array<string>;
                        instance_ids?: Array<string>;
                        user_ids?: Array<string>;
                        status?:
                            | "PENDING"
                            | "APPROVED"
                            | "REJECTED"
                            | "TRANSFERRED"
                            | "DONE";
                    };
                    params?: { page_size?: number; page_token?: string };
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
                                `${this.domain}/open-apis/approval/v4/external_tasks`,
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
                                                data?: Array<{
                                                    instance_id: string;
                                                    approval_id: string;
                                                    approval_code: string;
                                                    status:
                                                        | "PENDING"
                                                        | "APPROVED"
                                                        | "REJECTED"
                                                        | "CANCELED"
                                                        | "DELETED"
                                                        | "HIDDEN";
                                                    update_time: string;
                                                    tasks?: Array<{
                                                        id: string;
                                                        status:
                                                            | "PENDING"
                                                            | "APPROVED"
                                                            | "REJECTED"
                                                            | "TRANSFERRED"
                                                            | "DONE";
                                                        update_time: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_task&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=approval&resource=external_task&version=v4 document }
             *
             * 获取三方审批任务状态
             *
             * 该接口用于获取三方审批的状态。支持传入三方审批定义 Code、三方审批实例 ID、审批人 ID 或 审批任务状态查询条件，获取满足条件的三方审批任务状态。
             *
             * ## 使用示例;;该接口支持多种参数的组合，具体请参考请求体示例：;;- 通过 instance_ids 获取指定实例的任务状态时，instance_ids为必须字段;;    ```json;    {;        "instance_ids": ["oa_159160304"];    };    ```;;- 通过 user_ids 获取指定用户的任务状态时，approval_codes、user_ids、status为必须字段;;    ```json;    {;        "approval_codes": ["B7B65FFE-C2GC-452F-9F0F-9AA8352363D6"],;        "user_ids": ["112321"],;        "status": "PENDING";    };    ```;;- 通过 status 获取指定状态的所有任务时，approval_codes、status为必须字段;;    ``` json;    {;        "approval_codes": [;            "E78F1022-A166-447C-8320-E151DA90D70F";        ],;        "status": "PENDING";    };    ```;;- 通过 page_token获取下一批数据时，page_token为必须字段
             */
            list: async (
                payload?: {
                    data?: {
                        approval_codes?: Array<string>;
                        instance_ids?: Array<string>;
                        user_ids?: Array<string>;
                        status?:
                            | "PENDING"
                            | "APPROVED"
                            | "REJECTED"
                            | "TRANSFERRED"
                            | "DONE";
                    };
                    params?: { page_size?: number; page_token?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    instance_id: string;
                                    approval_id: string;
                                    approval_code: string;
                                    status:
                                        | "PENDING"
                                        | "APPROVED"
                                        | "REJECTED"
                                        | "CANCELED"
                                        | "DELETED"
                                        | "HIDDEN";
                                    update_time: string;
                                    tasks?: Array<{
                                        id: string;
                                        status:
                                            | "PENDING"
                                            | "APPROVED"
                                            | "REJECTED"
                                            | "TRANSFERRED"
                                            | "DONE";
                                        update_time: string;
                                    }>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/external_tasks`,
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
         * external_instance
         */
        externalInstance: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_instance&apiName=check&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=check&project=approval&resource=external_instance&version=v4 document }
             *
             * 校验三方审批实例
             *
             * 调用该接口校验三方审批实例数据，用于判断服务端数据是否为最新的。请求时提交实例最新更新时间，如果服务端不存在该实例，或者服务端实例更新时间不是最新的，则返回对应实例 ID。;;例如，设置定时任务每隔 5 分钟，将最近 5 分钟产生的实例使用该接口进行对比。如果数据在服务端不存在或者不是最新，则可以根据本接口返回的实例 ID、任务 ID，前往[同步三方审批实例](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_instance/create)。
             */
            check: async (
                payload?: {
                    data: {
                        instances: Array<{
                            instance_id: string;
                            update_time: string;
                            tasks: Array<{
                                task_id: string;
                                update_time: string;
                            }>;
                        }>;
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
                                diff_instances?: Array<{
                                    instance_id: string;
                                    update_time?: string;
                                    tasks?: Array<{
                                        task_id: string;
                                        update_time: string;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/external_instances/check`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_instance&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=approval&resource=external_instance&version=v4 document }
             *
             * 同步三方审批实例
             *
             * 审批中心不负责审批的流转，审批的流转在三方系统。本接口用于把三方系统在审批流转后生成的审批实例、审批任务、审批抄送数据同步到审批中心。
             *
             * 需确保审批实例内各类实体（实例、任务、抄送） ID 在审批实例内的唯一性，不属于同一实体之间的 ID 也要确保唯一性。如果实例 ID、任务 ID、抄送 ID 重复，则会导致在审批中心任务看不到对应的审批数据。;;## 实现效果;;调用本接口同步三方审批实例后，企业员工可以在审批中心浏览同步过来的审批实例、任务、抄送信息，并可以跳转回三方系统查看和操作审批，其中，实例信息在审批中心的 **已发起** 列表、任务信息在 **待办** 和 **已办** 列表、抄送信息在 **抄送我** 列表。;;:::html;<img src="//sf3-cn.feishucdn.com/obj/open-platform-opendoc/1ae6658510d5bf5370cf9d92675d052e_ICznPXHJRl.png" alt="" style="zoom:40%;" />;:::;;[创建三方审批定义](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_approval/create)时如果设置了三方审批回调 URL，对于审批任务，可以配置[三方快捷审批回调](https://open.feishu.cn/document/ukTMukTMukTM/ukjNyYjL5YjM24SO2IjN/quick-approval-callback)，这样审批人可以在审批中心直接进行审批操作，审批中心会将审批结果回调至三方系统，三方系统收到回调后更新任务信息，并将新的任务信息同步回审批中心，形成闭环。;;:::html;<img src="//sf3-cn.feishucdn.com/obj/open-platform-opendoc/80ed32b0bbb5d18cf1159e4534fc80eb_Dm49iUKXUp.png" alt=""  style="zoom:17%;" />;:::;
             */
            create: async (
                payload?: {
                    data: {
                        approval_code: string;
                        status:
                            | "PENDING"
                            | "APPROVED"
                            | "REJECTED"
                            | "CANCELED"
                            | "DELETED"
                            | "HIDDEN"
                            | "TERMINATED";
                        extra?: string;
                        instance_id: string;
                        links: { pc_link: string; mobile_link?: string };
                        title?: string;
                        form?: Array<{ name?: string; value?: string }>;
                        user_id?: string;
                        user_name?: string;
                        open_id?: string;
                        department_id?: string;
                        department_name?: string;
                        start_time: string;
                        end_time: string;
                        update_time: string;
                        display_method?:
                            | "BROWSER"
                            | "SIDEBAR"
                            | "NORMAL"
                            | "TRUSTEESHIP";
                        update_mode?: "REPLACE" | "UPDATE";
                        task_list?: Array<{
                            task_id: string;
                            user_id?: string;
                            open_id?: string;
                            title?: string;
                            links: { pc_link: string; mobile_link?: string };
                            status:
                                | "PENDING"
                                | "APPROVED"
                                | "REJECTED"
                                | "TRANSFERRED"
                                | "DONE";
                            extra?: string;
                            create_time: string;
                            end_time: string;
                            update_time?: string;
                            action_context?: string;
                            action_configs?: Array<{
                                action_type: string;
                                action_name?: string;
                                is_need_reason?: boolean;
                                is_reason_required?: boolean;
                                is_need_attachment?: boolean;
                            }>;
                            display_method?:
                                | "BROWSER"
                                | "SIDEBAR"
                                | "NORMAL"
                                | "TRUSTEESHIP";
                            exclude_statistics?: boolean;
                            node_id?: string;
                            node_name?: string;
                            generate_type?: "EXTERNAL_CONSIGN" | "DEFAULT";
                        }>;
                        cc_list?: Array<{
                            cc_id: string;
                            user_id?: string;
                            open_id?: string;
                            links: { pc_link: string; mobile_link?: string };
                            read_status: "READ" | "UNREAD";
                            extra?: string;
                            title?: string;
                            create_time: string;
                            update_time: string;
                            display_method?:
                                | "BROWSER"
                                | "SIDEBAR"
                                | "NORMAL"
                                | "TRUSTEESHIP";
                        }>;
                        i18n_resources: Array<{
                            locale:
                                | "zh-CN"
                                | "en-US"
                                | "ja-JP"
                                | "zh-HK"
                                | "zh-TW"
                                | "de-DE"
                                | "es-ES"
                                | "fr-FR"
                                | "id-ID"
                                | "it-IT"
                                | "ko-KR"
                                | "pt-BR"
                                | "th-TH"
                                | "vi-VN"
                                | "ms-MY"
                                | "ru-RU";
                            texts: Array<{ key: string; value: string }>;
                            is_default: boolean;
                        }>;
                        trusteeship_url_token?: string;
                        trusteeship_user_id_type?: string;
                        trusteeship_urls?: {
                            form_detail_url?: string;
                            action_definition_url?: string;
                            approval_node_url?: string;
                            action_callback_url?: string;
                            pull_business_data_url?: string;
                        };
                        trusteeship_cache_config?: {
                            form_policy?:
                                | "DISABLE"
                                | "IMMUTABLE"
                                | "BY_NODE"
                                | "BY_USER";
                            form_vary_with_locale?: boolean;
                            form_version?: string;
                        };
                        resource_region?: string;
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
                                data?: {
                                    approval_code: string;
                                    status:
                                        | "PENDING"
                                        | "APPROVED"
                                        | "REJECTED"
                                        | "CANCELED"
                                        | "DELETED"
                                        | "HIDDEN"
                                        | "TERMINATED";
                                    extra?: string;
                                    instance_id: string;
                                    links: {
                                        pc_link: string;
                                        mobile_link?: string;
                                    };
                                    title?: string;
                                    form?: Array<{
                                        name?: string;
                                        value?: string;
                                    }>;
                                    user_id?: string;
                                    user_name?: string;
                                    open_id?: string;
                                    department_id?: string;
                                    department_name?: string;
                                    start_time: string;
                                    end_time: string;
                                    update_time: string;
                                    display_method?:
                                        | "BROWSER"
                                        | "SIDEBAR"
                                        | "NORMAL"
                                        | "TRUSTEESHIP";
                                    update_mode?: "REPLACE" | "UPDATE";
                                    task_list?: Array<{
                                        task_id: string;
                                        user_id?: string;
                                        open_id?: string;
                                        title?: string;
                                        links: {
                                            pc_link: string;
                                            mobile_link?: string;
                                        };
                                        status:
                                            | "PENDING"
                                            | "APPROVED"
                                            | "REJECTED"
                                            | "TRANSFERRED"
                                            | "DONE";
                                        extra?: string;
                                        create_time: string;
                                        end_time: string;
                                        update_time?: string;
                                        action_context?: string;
                                        action_configs?: Array<{
                                            action_type: string;
                                            action_name?: string;
                                            is_need_reason?: boolean;
                                            is_reason_required?: boolean;
                                            is_need_attachment?: boolean;
                                        }>;
                                        display_method?:
                                            | "BROWSER"
                                            | "SIDEBAR"
                                            | "NORMAL"
                                            | "TRUSTEESHIP";
                                        exclude_statistics?: boolean;
                                        node_id?: string;
                                        node_name?: string;
                                        generate_type?:
                                            | "EXTERNAL_CONSIGN"
                                            | "DEFAULT";
                                    }>;
                                    cc_list?: Array<{
                                        cc_id: string;
                                        user_id?: string;
                                        open_id?: string;
                                        links: {
                                            pc_link: string;
                                            mobile_link?: string;
                                        };
                                        read_status: "READ" | "UNREAD";
                                        extra?: string;
                                        title?: string;
                                        create_time: string;
                                        update_time: string;
                                        display_method?:
                                            | "BROWSER"
                                            | "SIDEBAR"
                                            | "NORMAL"
                                            | "TRUSTEESHIP";
                                    }>;
                                    i18n_resources: Array<{
                                        locale:
                                            | "zh-CN"
                                            | "en-US"
                                            | "ja-JP"
                                            | "zh-HK"
                                            | "zh-TW"
                                            | "de-DE"
                                            | "es-ES"
                                            | "fr-FR"
                                            | "id-ID"
                                            | "it-IT"
                                            | "ko-KR"
                                            | "pt-BR"
                                            | "th-TH"
                                            | "vi-VN"
                                            | "ms-MY"
                                            | "ru-RU";
                                        texts: Array<{
                                            key: string;
                                            value: string;
                                        }>;
                                        is_default: boolean;
                                    }>;
                                    trusteeship_url_token?: string;
                                    trusteeship_user_id_type?: string;
                                    trusteeship_urls?: {
                                        form_detail_url?: string;
                                        action_definition_url?: string;
                                        approval_node_url?: string;
                                        action_callback_url?: string;
                                        pull_business_data_url?: string;
                                    };
                                    trusteeship_cache_config?: {
                                        form_policy?:
                                            | "DISABLE"
                                            | "IMMUTABLE"
                                            | "BY_NODE"
                                            | "BY_USER";
                                        form_vary_with_locale?: boolean;
                                        form_version?: string;
                                    };
                                    resource_region?: string;
                                };
                                process_record?: {
                                    instance?: {
                                        insert_num?: number;
                                        update_num?: number;
                                        delete_num?: number;
                                    };
                                    task?: {
                                        insert_num?: number;
                                        update_num?: number;
                                        delete_num?: number;
                                    };
                                    cc?: {
                                        insert_num?: number;
                                        update_num?: number;
                                        delete_num?: number;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/external_instances`,
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
         * external_approval
         */
        externalApproval: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_approval&apiName=get&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=approval&resource=external_approval&version=v4 document }
             *
             * 查看指定三方审批定义
             *
             * 调用该接口通过三方审批定义 Code 获取审批定义的详细数据，包括三方审批定义的名称、说明、三方审批发起链接、回调 URL 以及审批定义可见人列表等信息。
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { approval_code: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                approval_name: string;
                                approval_code: string;
                                group_code: string;
                                group_name?: string;
                                description?: string;
                                external?: {
                                    biz_name?: string;
                                    biz_type?: string;
                                    create_link_mobile?: string;
                                    create_link_pc?: string;
                                    support_pc?: boolean;
                                    support_mobile?: boolean;
                                    support_batch_read?: boolean;
                                    enable_mark_readed?: boolean;
                                    enable_quick_operate?: boolean;
                                    action_callback_url?: string;
                                    action_callback_token?: string;
                                    action_callback_key?: string;
                                    allow_batch_operate?: boolean;
                                    exclude_efficiency_statistics?: boolean;
                                };
                                viewers?: Array<{
                                    viewer_type?:
                                        | "TENANT"
                                        | "DEPARTMENT"
                                        | "USER"
                                        | "NONE";
                                    viewer_user_id?: string;
                                    viewer_department_id?: string;
                                }>;
                                i18n_resources?: Array<{
                                    locale:
                                        | "zh-CN"
                                        | "en-US"
                                        | "ja-JP"
                                        | "zh-HK"
                                        | "zh-TW"
                                        | "de-DE"
                                        | "es-ES"
                                        | "fr-FR"
                                        | "id-ID"
                                        | "it-IT"
                                        | "ko-KR"
                                        | "pt-BR"
                                        | "th-TH"
                                        | "vi-VN"
                                        | "ms-MY"
                                        | "ru-RU";
                                    texts: Array<{
                                        key: string;
                                        value: string;
                                    }>;
                                    is_default: boolean;
                                }>;
                                managers?: Array<string>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/external_approvals/:approval_code`,
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_approval&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=approval&resource=external_approval&version=v4 document }
             *
             * 同步三方审批定义
             *
             * 该接口用于将其他系统的审批定义同步至飞书审批，配合[同步三方审批实例](https://open.feishu.cn/document%2FuAjLw4CM%2FukTMukTMukTM%2Freference%2Fapproval-v4%2Fexternal_instance%2Fcreate),[三方快捷审批回调](https://open.feishu.cn/document%2FukTMukTMukTM%2FukjNyYjL5YjM24SO2IjN%2Fquick-approval-callback)使用可将企业内所有审批流集中在飞书审批中统一处理。 方便企业员工在飞书审批内发起并操作三方审批。
             */
            create: async (
                payload?: {
                    data: {
                        approval_name: string;
                        approval_code: string;
                        group_code?: string;
                        group_name?: string;
                        description?: string;
                        external: {
                            biz_name?: string;
                            biz_type?: string;
                            create_link_mobile?: string;
                            create_link_pc?: string;
                            support_pc?: boolean;
                            support_mobile?: boolean;
                            support_batch_read?: boolean;
                            enable_mark_readed?: boolean;
                            enable_quick_operate?: boolean;
                            action_callback_url?: string;
                            action_callback_token?: string;
                            action_callback_key?: string;
                            allow_batch_operate?: boolean;
                            exclude_efficiency_statistics?: boolean;
                        };
                        viewers?: Array<{
                            viewer_type?:
                                | "TENANT"
                                | "DEPARTMENT"
                                | "USER"
                                | "NONE";
                            viewer_user_id?: string;
                            viewer_department_id?: string;
                        }>;
                        i18n_resources?: Array<{
                            locale:
                                | "zh-CN"
                                | "en-US"
                                | "ja-JP"
                                | "zh-HK"
                                | "zh-TW"
                                | "de-DE"
                                | "es-ES"
                                | "fr-FR"
                                | "id-ID"
                                | "it-IT"
                                | "ko-KR"
                                | "pt-BR"
                                | "th-TH"
                                | "vi-VN"
                                | "ms-MY"
                                | "ru-RU";
                            texts: Array<{ key: string; value: string }>;
                            is_default: boolean;
                        }>;
                        managers?: Array<string>;
                    };
                    params?: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
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
                            data?: { approval_code: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/external_approvals`,
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
         * district
         */
        district: {
            searchWithIterator: async (
                payload?: {
                    data?: { district_ids?: Array<string>; keyword?: string };
                    params?: {
                        locale?: "zh-CN" | "en-US";
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
                                `${this.domain}/open-apis/approval/v4/districts/search`,
                                path
                            ),
                            method: "POST",
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
                                                version?: string;
                                                items?: Array<{
                                                    id?: string;
                                                    name?: string;
                                                    level?: string;
                                                    has_sub_district?: boolean;
                                                    parent_districts?: Array<{
                                                        id?: string;
                                                        name?: string;
                                                        level?: string;
                                                    }>;
                                                }>;
                                                has_more?: boolean;
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=district&apiName=search&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=approval&resource=district&version=v4 document }
             *
             * 搜索地理库信息
             *
             * 搜索审批的地理库数据，可用于在发起审批时填写地址控件的区域信息
             */
            search: async (
                payload?: {
                    data?: { district_ids?: Array<string>; keyword?: string };
                    params?: {
                        locale?: "zh-CN" | "en-US";
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
                                version?: string;
                                items?: Array<{
                                    id?: string;
                                    name?: string;
                                    level?: string;
                                    has_sub_district?: boolean;
                                    parent_districts?: Array<{
                                        id?: string;
                                        name?: string;
                                        level?: string;
                                    }>;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/districts/search`,
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
                        root_district_id?: string;
                        list_type?: "sub_level" | "leaf_level";
                        locale?: "zh-CN" | "en-US";
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
                                `${this.domain}/open-apis/approval/v4/districts`,
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
                                                version?: string;
                                                has_more?: boolean;
                                                page_token?: string;
                                                items?: Array<{
                                                    id?: string;
                                                    name?: string;
                                                    level?: string;
                                                    has_sub_district?: boolean;
                                                    parent_districts?: Array<{
                                                        id?: string;
                                                        name?: string;
                                                        level?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=district&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=approval&resource=district&version=v4 document }
             *
             * 查询地理库信息
             *
             * 获取审批的地理库数据，用于在发起审批时填写地址控件的区域信息
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        root_district_id?: string;
                        list_type?: "sub_level" | "leaf_level";
                        locale?: "zh-CN" | "en-US";
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
                                version?: string;
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    id?: string;
                                    name?: string;
                                    level?: string;
                                    has_sub_district?: boolean;
                                    parent_districts?: Array<{
                                        id?: string;
                                        name?: string;
                                        level?: string;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/approval/v4/districts`,
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
        v4: {
            /**
             * instance
             */
            instance: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=specified_rollback&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=specified_rollback&project=approval&resource=instance&version=v4 document }
                 *
                 * 退回审批任务
                 *
                 * 从当前审批任务，退回到已审批的一个或多个任务节点。退回后，已审批节点重新生成审批任务。
                 */
                specifiedRollback: async (
                    payload?: {
                        data: {
                            user_id: string;
                            task_id: string;
                            reason?: string;
                            extra?: string;
                            task_def_key_list: Array<string>;
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
                                `${this.domain}/open-apis/approval/v4/instances/specified_rollback`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=cc&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cc&project=approval&resource=instance&version=v4 document }
                 *
                 * 抄送审批实例
                 *
                 * 调用该接口将当前审批实例抄送给指定用户。被抄送的用户可以查看审批实例详情。例如，在飞书客户端的 **工作台 > 审批 > 审批中心 > 抄送我** 列表中查看到审批实例。
                 */
                cc: async (
                    payload?: {
                        data: {
                            approval_code: string;
                            instance_code: string;
                            user_id: string;
                            cc_user_ids: Array<string>;
                            comment?: string;
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
                                `${this.domain}/open-apis/approval/v4/instances/cc`,
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
                            approval_code: string;
                            start_time: string;
                            end_time: string;
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
                                    `${this.domain}/open-apis/approval/v4/instances`,
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
                                                    instance_code_list: Array<string>;
                                                    page_token: string;
                                                    has_more: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=approval&resource=instance&version=v4 document }
                 *
                 * 批量获取审批实例 ID
                 *
                 * 根据审批定义的 approval_code 批量获取审批实例的 instance_code，用于拉取企业下某个审批定义的全部审批实例。默认以审批创建时间先后顺序排列。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            approval_code: string;
                            start_time: string;
                            end_time: string;
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
                                    instance_code_list: Array<string>;
                                    page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/instances`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=add_sign&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_sign&project=approval&resource=instance&version=v4 document }
                 */
                addSign: async (
                    payload?: {
                        data: {
                            user_id: string;
                            approval_code: string;
                            instance_code: string;
                            task_id: string;
                            comment?: string;
                            add_sign_user_ids: Array<string>;
                            add_sign_type: number;
                            approval_method?: number;
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
                                `${this.domain}/open-apis/approval/v4/instances/add_sign`,
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
                queryWithIterator: async (
                    payload?: {
                        data?: {
                            user_id?: string;
                            approval_code?: string;
                            instance_code?: string;
                            instance_external_id?: string;
                            group_external_id?: string;
                            instance_title?: string;
                            instance_status?:
                                | "PENDING"
                                | "RECALL"
                                | "REJECT"
                                | "DELETED"
                                | "APPROVED"
                                | "ALL";
                            instance_start_time_from?: string;
                            instance_start_time_to?: string;
                            locale?:
                                | "zh-CN"
                                | "en-US"
                                | "ja-JP"
                                | "zh-HK"
                                | "zh-TW"
                                | "de-DE"
                                | "es-ES"
                                | "fr-FR"
                                | "id-ID"
                                | "it-IT"
                                | "ko-KR"
                                | "pt-BR"
                                | "th-TH"
                                | "vi-VN"
                                | "ms-MY"
                                | "ru-RU";
                            with_revoked_instance?: boolean;
                        };
                        params?: {
                            page_size?: number;
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
                                    `${this.domain}/open-apis/approval/v4/instances/query`,
                                    path
                                ),
                                method: "POST",
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
                                                    count?: number;
                                                    instance_list?: Array<{
                                                        approval?: {
                                                            code?: string;
                                                            name?: string;
                                                            is_external?: boolean;
                                                            external?: {
                                                                batch_cc_read?: boolean;
                                                            };
                                                            approval_id?: string;
                                                            icon?: string;
                                                        };
                                                        group?: {
                                                            external_id?: string;
                                                            name?: string;
                                                        };
                                                        instance?: {
                                                            code?: string;
                                                            external_id?: string;
                                                            user_id?: string;
                                                            start_time?: string;
                                                            end_time?: string;
                                                            status?:
                                                                | "rejected"
                                                                | "pending"
                                                                | "canceled"
                                                                | "deleted"
                                                                | "approved";
                                                            title?: string;
                                                            extra?: string;
                                                            serial_id?: string;
                                                            link?: {
                                                                pc_link?: string;
                                                                mobile_link?: string;
                                                            };
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=query&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=approval&resource=instance&version=v4 document }
                 *
                 * 查询实例列表
                 *
                 * 该接口通过不同条件查询审批系统中符合条件的审批实例列表。
                 */
                query: async (
                    payload?: {
                        data?: {
                            user_id?: string;
                            approval_code?: string;
                            instance_code?: string;
                            instance_external_id?: string;
                            group_external_id?: string;
                            instance_title?: string;
                            instance_status?:
                                | "PENDING"
                                | "RECALL"
                                | "REJECT"
                                | "DELETED"
                                | "APPROVED"
                                | "ALL";
                            instance_start_time_from?: string;
                            instance_start_time_to?: string;
                            locale?:
                                | "zh-CN"
                                | "en-US"
                                | "ja-JP"
                                | "zh-HK"
                                | "zh-TW"
                                | "de-DE"
                                | "es-ES"
                                | "fr-FR"
                                | "id-ID"
                                | "it-IT"
                                | "ko-KR"
                                | "pt-BR"
                                | "th-TH"
                                | "vi-VN"
                                | "ms-MY"
                                | "ru-RU";
                            with_revoked_instance?: boolean;
                        };
                        params?: {
                            page_size?: number;
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
                                    count?: number;
                                    instance_list?: Array<{
                                        approval?: {
                                            code?: string;
                                            name?: string;
                                            is_external?: boolean;
                                            external?: {
                                                batch_cc_read?: boolean;
                                            };
                                            approval_id?: string;
                                            icon?: string;
                                        };
                                        group?: {
                                            external_id?: string;
                                            name?: string;
                                        };
                                        instance?: {
                                            code?: string;
                                            external_id?: string;
                                            user_id?: string;
                                            start_time?: string;
                                            end_time?: string;
                                            status?:
                                                | "rejected"
                                                | "pending"
                                                | "canceled"
                                                | "deleted"
                                                | "approved";
                                            title?: string;
                                            extra?: string;
                                            serial_id?: string;
                                            link?: {
                                                pc_link?: string;
                                                mobile_link?: string;
                                            };
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/instances/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=search_cc&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_cc&project=approval&resource=instance&version=v4 document }
                 *
                 * 查询抄送列表
                 *
                 * 该接口通过不同条件查询审批系统中符合条件的审批抄送列表。
                 */
                searchCc: async (
                    payload?: {
                        data?: {
                            user_id?: string;
                            approval_code?: string;
                            instance_code?: string;
                            instance_external_id?: string;
                            group_external_id?: string;
                            cc_title?: string;
                            read_status?: "READ" | "UNREAD" | "ALL";
                            cc_create_time_from?: string;
                            cc_create_time_to?: string;
                            locale?:
                                | "zh-CN"
                                | "en-US"
                                | "ja-JP"
                                | "zh-HK"
                                | "zh-TW"
                                | "de-DE"
                                | "es-ES"
                                | "fr-FR"
                                | "id-ID"
                                | "it-IT"
                                | "ko-KR"
                                | "pt-BR"
                                | "th-TH"
                                | "vi-VN"
                                | "ms-MY"
                                | "ru-RU";
                            with_revoked_instance?: boolean;
                        };
                        params?: {
                            page_size?: number;
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
                                    count?: number;
                                    cc_list?: Array<{
                                        approval?: {
                                            code?: string;
                                            name?: string;
                                            is_external?: boolean;
                                            external?: {
                                                batch_cc_read?: boolean;
                                            };
                                            approval_id?: string;
                                            icon?: string;
                                        };
                                        group?: {
                                            external_id?: string;
                                            name?: string;
                                        };
                                        instance?: {
                                            code?: string;
                                            external_id?: string;
                                            user_id?: string;
                                            start_time?: string;
                                            end_time?: string;
                                            status?:
                                                | "rejected"
                                                | "pending"
                                                | "canceled"
                                                | "deleted"
                                                | "approved";
                                            title?: string;
                                            extra?: string;
                                            serial_id?: string;
                                            link?: {
                                                pc_link?: string;
                                                mobile_link?: string;
                                            };
                                        };
                                        cc?: {
                                            user_id?: string;
                                            create_time?: string;
                                            read_status?: "read" | "unread";
                                            title?: string;
                                            extra?: string;
                                            link?: {
                                                pc_link?: string;
                                                mobile_link?: string;
                                            };
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/instances/search_cc`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=cancel&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel&project=approval&resource=instance&version=v4 document }
                 *
                 * 撤回审批实例
                 *
                 * 如果企业管理员在审批后台的某一审批定义的 **更多设置** 中，勾选了 **允许撤销审批中的申请** 或者 **允许撤销 x 天内通过的审批**，则在符合撤销规则的情况下，你可以调用本接口将指定提交人的审批实例撤回。
                 */
                cancel: async (
                    payload?: {
                        data: {
                            approval_code: string;
                            instance_code: string;
                            user_id: string;
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
                                `${this.domain}/open-apis/approval/v4/instances/cancel`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=preview&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=preview&project=approval&resource=instance&version=v4 document }
                 */
                preview: async (
                    payload?: {
                        data: {
                            user_id: string;
                            approval_code?: string;
                            department_id?: string;
                            form?: string;
                            instance_code?: string;
                            locale?: string;
                            task_id?: string;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    preview_nodes?: Array<{
                                        node_id?: string;
                                        node_name?: string;
                                        node_type?: string;
                                        comments?: Array<string>;
                                        custom_node_id?: string;
                                        user_id_list?: Array<string>;
                                        end_cc_id_list?: Array<string>;
                                        is_empty_logic?: boolean;
                                        is_approver_type_free?: boolean;
                                        has_cc_type_free?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/instances/preview`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=approval&resource=instance&version=v4 document }
                 *
                 * 创建审批实例
                 *
                 * 调用本接口使用指定审批定义 Code 创建一个审批实例，接口调用者需对审批定义的表单有详细了解，按照定义的表单结构，将表单 Value 通过本接口传入。
                 */
                create: async (
                    payload?: {
                        data: {
                            approval_code: string;
                            user_id?: string;
                            open_id?: string;
                            department_id?: string;
                            form: string;
                            node_approver_user_id_list?: Array<{
                                key?: string;
                                value?: Array<string>;
                            }>;
                            node_approver_open_id_list?: Array<{
                                key?: string;
                                value?: Array<string>;
                            }>;
                            node_cc_user_id_list?: Array<{
                                key?: string;
                                value?: Array<string>;
                            }>;
                            node_cc_open_id_list?: Array<{
                                key?: string;
                                value?: Array<string>;
                            }>;
                            uuid?: string;
                            allow_resubmit?: boolean;
                            allow_submit_again?: boolean;
                            cancel_bot_notification?: string;
                            forbid_revoke?: boolean;
                            i18n_resources?: Array<{
                                locale:
                                    | "zh-CN"
                                    | "en-US"
                                    | "ja-JP"
                                    | "zh-HK"
                                    | "zh-TW"
                                    | "de-DE"
                                    | "es-ES"
                                    | "fr-FR"
                                    | "id-ID"
                                    | "it-IT"
                                    | "ko-KR"
                                    | "pt-BR"
                                    | "th-TH"
                                    | "vi-VN"
                                    | "ms-MY"
                                    | "ru-RU";
                                texts: Array<{ key: string; value: string }>;
                                is_default: boolean;
                            }>;
                            title?: string;
                            title_display_method?: number;
                            node_auto_approval_list?: Array<{
                                node_id_type?: "CUSTOM" | "NON_CUSTOM";
                                node_id?: string;
                            }>;
                            byte_extra?: string;
                            with_link?: boolean;
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
                                    instance_code: string;
                                    instance_link: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/instances`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=remind&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remind&project=approval&resource=instance&version=v4 document }
                 *
                 * 发送催办消息
                 *
                 * 当需要催促审批人审批单据时，通过该接口给审批人发送催办消息
                 */
                remind: async (
                    payload?: {
                        data: {
                            instance_code: string;
                            task_ids: Array<string>;
                            comment?: string;
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
                                `${this.domain}/open-apis/approval/v4/instances/remind`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=add_cc&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_cc&project=approval&resource=instance&version=v4 document }
                 *
                 * 抄送审批实例
                 *
                 * 调用该接口将当前审批实例抄送给指定用户。被抄送的用户可以查看审批实例详情。例如，在飞书客户端的 **工作台 > 审批 > 审批中心 > 抄送我** 列表中查看到审批实例。
                 */
                addCc: async (
                    payload?: {
                        data: {
                            instance_code: string;
                            cc_user_ids: Array<string>;
                            comment?: string;
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
                                `${this.domain}/open-apis/approval/v4/instances/add_cc`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=recall&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recall&project=approval&resource=instance&version=v4 document }
                 *
                 * 撤回审批实例
                 *
                 * 在符合撤销规则的情况下，你可以调用本接口将**当前用户身份提交的**的审批实例撤回。
                 *
                 * ![image.png](//sf3-cn.feishucdn.com/obj/open-platform-opendoc/0fa2d2e821074146781c1750e54fc7f6_FECsrbxOXW.png?height=278&maxWidth=550&width=1383);;## 注意事项;;- 如果撤回的是审批中的实例，则撤回后审批流程结束。;- 如果撤回的是已通过的实例，则审批实例会变更为 **审批中** 的状态。;- 撤销规则：企业管理员在审批后台的某一审批定义的 **更多设置** 中，勾选了 **允许撤销审批中的申请** 或者 **允许撤销 x 天内通过的审批**
                 */
                recall: async (
                    payload?: {
                        data: { instance_code: string };
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
                                `${this.domain}/open-apis/approval/v4/instances/recall`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=get&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=approval&resource=instance&version=v4 document }
                 *
                 * 获取单个审批实例详情
                 *
                 * 通过审批实例 Code 获取指定审批实例的详细信息，包括审批实例的名称、创建时间、发起审批的用户、状态以及任务列表等信息。
                 */
                get: async (
                    payload?: {
                        params?: {
                            locale?:
                                | "zh-CN"
                                | "en-US"
                                | "ja-JP"
                                | "zh-HK"
                                | "zh-TW"
                                | "de-DE"
                                | "es-ES"
                                | "fr-FR"
                                | "id-ID"
                                | "it-IT"
                                | "ko-KR"
                                | "pt-BR"
                                | "th-TH"
                                | "vi-VN"
                                | "ms-MY"
                                | "ru-RU";
                            user_id?: string;
                            user_id_type?: "user_id" | "open_id" | "union_id";
                            nested_mutable_group?: boolean;
                        };
                        path: { instance_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    approval_name: string;
                                    start_time?: string;
                                    end_time: string;
                                    user_id: string;
                                    open_id: string;
                                    serial_number: string;
                                    department_id: string;
                                    status:
                                        | "PENDING"
                                        | "APPROVED"
                                        | "REJECTED"
                                        | "CANCELED"
                                        | "DELETED";
                                    uuid: string;
                                    form: string;
                                    task_list: Array<{
                                        id: string;
                                        user_id: string;
                                        open_id?: string;
                                        status:
                                            | "PENDING"
                                            | "APPROVED"
                                            | "REJECTED"
                                            | "TRANSFERRED"
                                            | "DONE";
                                        node_id?: string;
                                        node_name?: string;
                                        custom_node_id?: string;
                                        type?:
                                            | "AND"
                                            | "OR"
                                            | "AUTO_PASS"
                                            | "AUTO_REJECT"
                                            | "SEQUENTIAL";
                                        start_time: string;
                                        end_time?: string;
                                    }>;
                                    comment_list: Array<{
                                        id: string;
                                        user_id: string;
                                        open_id: string;
                                        comment: string;
                                        create_time: string;
                                        files?: Array<{
                                            url?: string;
                                            file_size?: number;
                                            title?: string;
                                            type?: string;
                                        }>;
                                    }>;
                                    timeline: Array<{
                                        type:
                                            | "START"
                                            | "PASS"
                                            | "REJECT"
                                            | "AUTO_PASS"
                                            | "AUTO_REJECT"
                                            | "REMOVE_REPEAT"
                                            | "TRANSFER"
                                            | "ADD_APPROVER_BEFORE"
                                            | "ADD_APPROVER"
                                            | "ADD_APPROVER_AFTER"
                                            | "DELETE_APPROVER"
                                            | "ROLLBACK_SELECTED"
                                            | "ROLLBACK"
                                            | "CANCEL"
                                            | "DELETE"
                                            | "CC";
                                        create_time: string;
                                        user_id?: string;
                                        open_id?: string;
                                        user_id_list?: Array<string>;
                                        open_id_list?: Array<string>;
                                        task_id?: string;
                                        comment?: string;
                                        cc_user_list?: Array<{
                                            user_id?: string;
                                            cc_id?: string;
                                            open_id?: string;
                                        }>;
                                        ext: string;
                                        node_key?: string;
                                        files?: Array<{
                                            url?: string;
                                            file_size?: number;
                                            title?: string;
                                            type?: string;
                                        }>;
                                    }>;
                                    modified_instance_code?: string;
                                    reverted_instance_code?: string;
                                    approval_code: string;
                                    reverted?: boolean;
                                    instance_code: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/instances/:instance_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=detail&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=detail&project=approval&resource=instance&version=v4 document }
                 *
                 * 获取单个审批实例详情
                 *
                 * 通过审批实例 Code 获取指定审批实例的详细信息，包括审批实例的名称、创建时间、发起审批的用户、状态以及任务列表等信息。
                 */
                detail: async (
                    payload?: {
                        params: {
                            instance_code: string;
                            locale?:
                                | "zh-CN"
                                | "en-US"
                                | "ja-JP"
                                | "zh-HK"
                                | "zh-TW"
                                | "de-DE"
                                | "es-ES"
                                | "fr-FR"
                                | "id-ID"
                                | "it-IT"
                                | "ko-KR"
                                | "pt-BR"
                                | "th-TH"
                                | "vi-VN"
                                | "ms-MY"
                                | "ru-RU";
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
                                    definition_name: string;
                                    start_time?: string;
                                    end_time: string;
                                    user_id: string;
                                    serial_number: string;
                                    department_id: string;
                                    status:
                                        | "PENDING"
                                        | "APPROVED"
                                        | "REJECTED"
                                        | "CANCELED"
                                        | "DELETED";
                                    form: string;
                                    tasks: Array<{
                                        id: string;
                                        user_id: string;
                                        status:
                                            | "PENDING"
                                            | "APPROVED"
                                            | "REJECTED"
                                            | "TRANSFERRED"
                                            | "DONE";
                                        node_id?: string;
                                        node_name?: string;
                                        type?:
                                            | "AND"
                                            | "OR"
                                            | "AUTO_PASS"
                                            | "AUTO_REJECT"
                                            | "SEQUENTIAL";
                                        start_time: string;
                                        end_time?: string;
                                    }>;
                                    comments: Array<{
                                        id: string;
                                        user_id: string;
                                        comment: string;
                                        create_time: string;
                                        files?: Array<{
                                            url?: string;
                                            file_size?: number;
                                            title?: string;
                                            type?: string;
                                        }>;
                                    }>;
                                    operation_records: Array<{
                                        type:
                                            | "START"
                                            | "PASS"
                                            | "REJECT"
                                            | "AUTO_PASS"
                                            | "AUTO_REJECT"
                                            | "REMOVE_REPEAT"
                                            | "TRANSFER"
                                            | "ADD_APPROVER_BEFORE"
                                            | "ADD_APPROVER"
                                            | "ADD_APPROVER_AFTER"
                                            | "DELETE_APPROVER"
                                            | "ROLLBACK_SELECTED"
                                            | "ROLLBACK"
                                            | "CANCEL"
                                            | "DELETE"
                                            | "CC";
                                        create_time: string;
                                        user_id?: string;
                                        cc_user_ids?: Array<string>;
                                        task_id?: string;
                                        comment?: string;
                                        node_id?: string;
                                        files?: Array<{
                                            url?: string;
                                            file_size?: number;
                                            title?: string;
                                            type?: string;
                                        }>;
                                    }>;
                                    definition_code: string;
                                    reverted?: boolean;
                                    instance_code: string;
                                    current_nodes?: Array<{
                                        node_id?: string;
                                        node_name?: string;
                                        type?:
                                            | "AND"
                                            | "OR"
                                            | "AUTO_PASS"
                                            | "AUTO_REJECT"
                                            | "SEQUENTIAL";
                                        approvers?: Array<{
                                            task_id?: string;
                                            user_id?: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/instances/detail`,
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
                initiatedWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            locale?: "zh-CN" | "en-US" | "ja-JP";
                            definition_code?: string;
                            start_timestamp?: string;
                            end_timestamp?: string;
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
                                    `${this.domain}/open-apis/approval/v4/instances/initiated`,
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
                                                    instances: Array<{
                                                        instance_status:
                                                            | "0"
                                                            | "1"
                                                            | "2"
                                                            | "3"
                                                            | "4"
                                                            | "5";
                                                        definition_code: string;
                                                        initiator?: string;
                                                        initiator_name?: string;
                                                        instance_code: string;
                                                        definition_group_id?: string;
                                                        definition_group_name?: string;
                                                        definition_name?: string;
                                                        summaries?: Array<{
                                                            key?: string;
                                                            value?: string;
                                                        }>;
                                                        instance_external_id?: string;
                                                        link?: string;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    count?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=initiated&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=initiated&project=approval&resource=instance&version=v4 document }
                 *
                 * 获取用户已发起审批列表
                 *
                 * 以用户身份获取用户已发起的审批列表，与飞书中审批->审批中心->已发起一致
                 */
                initiated: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            locale?: "zh-CN" | "en-US" | "ja-JP";
                            definition_code?: string;
                            start_timestamp?: string;
                            end_timestamp?: string;
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
                                    instances: Array<{
                                        instance_status:
                                            | "0"
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5";
                                        definition_code: string;
                                        initiator?: string;
                                        initiator_name?: string;
                                        instance_code: string;
                                        definition_group_id?: string;
                                        definition_group_name?: string;
                                        definition_name?: string;
                                        summaries?: Array<{
                                            key?: string;
                                            value?: string;
                                        }>;
                                        instance_external_id?: string;
                                        link?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                    count?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/instances/initiated`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=subscription&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=approval&resource=instance&version=v4 document }
                 *
                 * 订阅审批实例状态变更事件
                 *
                 * 当应用[订阅审批事件](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)后，对于事件type为[审批实例状态变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/events/status_changed)的事件;，需要调用该接口指定需要接收通知的审批任务范围，指定后才可以接收到对应范围内的事件。
                 */
                subscription: async (
                    payload?: {
                        data: {
                            subscription_type:
                                | "INVOLVED_APPROVAL"
                                | "MANAGED_APPROVAL";
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
                                `${this.domain}/open-apis/approval/v4/instances/subscription`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=unsubscription&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscription&project=approval&resource=instance&version=v4 document }
                 *
                 * 退订审批实例状态变更事件
                 *
                 * 当不再希望收到任务状态变更事件时，调用此接口，该接口用于撤销[订阅审批实例状态变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/subscription)中的操作
                 */
                unsubscription: async (
                    payload?: {
                        params?: {
                            subscription_type?:
                                | "INVOLVED_APPROVAL"
                                | "MANAGED_APPROVAL";
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
                                `${this.domain}/open-apis/approval/v4/instances/subscription`,
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
             * task
             */
            task: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=transfer&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=transfer&project=approval&resource=task&version=v4 document }
                 *
                 * 转交审批任务
                 *
                 * 对于单个审批任务进行转交操作。转交后审批流程流转给被转交人。
                 */
                transfer: async (
                    payload?: {
                        data: {
                            approval_code: string;
                            instance_code: string;
                            user_id: string;
                            comment?: string;
                            transfer_user_id: string;
                            task_id: string;
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
                                `${this.domain}/open-apis/approval/v4/tasks/transfer`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=reject&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reject&project=approval&resource=task&version=v4 document }
                 *
                 * 拒绝审批任务
                 *
                 * 对于单个审批任务进行拒绝操作。拒绝后审批流程结束。
                 */
                reject: async (
                    payload?: {
                        data: {
                            approval_code: string;
                            instance_code: string;
                            user_id: string;
                            comment?: string;
                            task_id: string;
                            form?: string;
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
                                `${this.domain}/open-apis/approval/v4/tasks/reject`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=resubmit&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=resubmit&project=approval&resource=task&version=v4 document }
                 *
                 * 重新提交审批任务
                 *
                 * 对于退回到发起人的审批任务进行重新发起操作。发起后审批流程会流转到下一个审批人。
                 */
                resubmit: async (
                    payload?: {
                        data: {
                            approval_code: string;
                            instance_code: string;
                            user_id: string;
                            comment?: string;
                            task_id: string;
                            form: string;
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
                                `${this.domain}/open-apis/approval/v4/tasks/resubmit`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=search&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=approval&resource=task&version=v4 document }
                 *
                 * 查询任务列表
                 *
                 * 该接口通过不同条件查询审批系统中符合条件的审批任务列表。
                 */
                search: async (
                    payload?: {
                        data?: {
                            user_id?: string;
                            approval_code?: string;
                            instance_code?: string;
                            instance_external_id?: string;
                            group_external_id?: string;
                            task_title?: string;
                            task_status?:
                                | "PENDING"
                                | "REJECTED"
                                | "APPROVED"
                                | "TRANSFERRED"
                                | "DONE"
                                | "RM_REPEAT"
                                | "PROCESSED"
                                | "ALL";
                            task_start_time_from?: string;
                            task_start_time_to?: string;
                            locale?:
                                | "zh-CN"
                                | "en-US"
                                | "ja-JP"
                                | "zh-HK"
                                | "zh-TW"
                                | "de-DE"
                                | "es-ES"
                                | "fr-FR"
                                | "id-ID"
                                | "it-IT"
                                | "ko-KR"
                                | "pt-BR"
                                | "th-TH"
                                | "vi-VN"
                                | "ms-MY"
                                | "ru-RU";
                            task_status_list?: Array<string>;
                            order?: number;
                            with_revoked_instance?: boolean;
                        };
                        params?: {
                            page_size?: number;
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
                                    count?: number;
                                    task_list?: Array<{
                                        approval?: {
                                            code?: string;
                                            name?: string;
                                            is_external?: boolean;
                                            external?: {
                                                batch_cc_read?: boolean;
                                            };
                                            approval_id?: string;
                                            icon?: string;
                                        };
                                        group?: {
                                            external_id?: string;
                                            name?: string;
                                        };
                                        instance?: {
                                            code?: string;
                                            external_id?: string;
                                            user_id?: string;
                                            start_time?: string;
                                            end_time?: string;
                                            status?:
                                                | "rejected"
                                                | "pending"
                                                | "canceled"
                                                | "deleted"
                                                | "approved";
                                            title?: string;
                                            extra?: string;
                                            serial_id?: string;
                                            link?: {
                                                pc_link?: string;
                                                mobile_link?: string;
                                            };
                                        };
                                        task?: {
                                            user_id?: string;
                                            start_time?: string;
                                            end_time?: string;
                                            status?:
                                                | "rejected"
                                                | "pending"
                                                | "approved"
                                                | "transferred"
                                                | "done"
                                                | "rm_repeat"
                                                | "processed"
                                                | "hidden";
                                            title?: string;
                                            extra?: string;
                                            link?: {
                                                pc_link?: string;
                                                mobile_link?: string;
                                            };
                                            task_id?: string;
                                            update_time?: string;
                                            task_external_id?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/tasks/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=approve&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=approve&project=approval&resource=task&version=v4 document }
                 *
                 * 同意审批任务
                 *
                 * 对于单个审批任务进行同意操作。同意后审批流程会流转到下一个审批人。
                 */
                approve: async (
                    payload?: {
                        data: {
                            approval_code: string;
                            instance_code: string;
                            user_id: string;
                            comment?: string;
                            task_id: string;
                            form?: string;
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
                                `${this.domain}/open-apis/approval/v4/tasks/approve`,
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
                queryWithIterator: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            user_id: string;
                            topic: "1" | "2" | "3" | "17" | "18";
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
                                    `${this.domain}/open-apis/approval/v4/tasks/query`,
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
                                                    tasks: Array<{
                                                        topic:
                                                            | "1"
                                                            | "2"
                                                            | "3"
                                                            | "17"
                                                            | "18";
                                                        user_id: string;
                                                        title: string;
                                                        urls: {
                                                            helpdesk?: string;
                                                            mobile?: string;
                                                            pc?: string;
                                                        };
                                                        process_external_id?: string;
                                                        task_external_id?: string;
                                                        status:
                                                            | "1"
                                                            | "2"
                                                            | "17"
                                                            | "18"
                                                            | "33"
                                                            | "34";
                                                        process_status:
                                                            | "0"
                                                            | "1"
                                                            | "2"
                                                            | "3"
                                                            | "4"
                                                            | "5";
                                                        definition_code: string;
                                                        initiators?: Array<string>;
                                                        initiator_names?: Array<string>;
                                                        task_id: string;
                                                        process_id: string;
                                                        process_code: string;
                                                        definition_group_id?: string;
                                                        definition_group_name?: string;
                                                        definition_id?: string;
                                                        definition_name?: string;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    count?: {
                                                        total: number;
                                                        has_more?: boolean;
                                                    };
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=query&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=approval&resource=task&version=v4 document }
                 *
                 * 查询用户的任务列表
                 *
                 * 通过设置用户、任务分组，查询任务信息。任务分组包括待办审批、已办审批以及已发起审批等。
                 */
                query: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            user_id: string;
                            topic: "1" | "2" | "3" | "17" | "18";
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
                                    tasks: Array<{
                                        topic: "1" | "2" | "3" | "17" | "18";
                                        user_id: string;
                                        title: string;
                                        urls: {
                                            helpdesk?: string;
                                            mobile?: string;
                                            pc?: string;
                                        };
                                        process_external_id?: string;
                                        task_external_id?: string;
                                        status:
                                            | "1"
                                            | "2"
                                            | "17"
                                            | "18"
                                            | "33"
                                            | "34";
                                        process_status:
                                            | "0"
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5";
                                        definition_code: string;
                                        initiators?: Array<string>;
                                        initiator_names?: Array<string>;
                                        task_id: string;
                                        process_id: string;
                                        process_code: string;
                                        definition_group_id?: string;
                                        definition_group_name?: string;
                                        definition_id?: string;
                                        definition_name?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                    count?: {
                                        total: number;
                                        has_more?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/tasks/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=refuse&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=refuse&project=approval&resource=task&version=v4 document }
                 *
                 * 拒绝审批任务
                 *
                 * 对于单个审批任务进行拒绝操作。拒绝后审批流程结束。
                 */
                refuse: async (
                    payload?: {
                        data: {
                            instance_code: string;
                            task_id: string;
                            comment?: string;
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
                                `${this.domain}/open-apis/approval/v4/tasks/refuse`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=pass&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=pass&project=approval&resource=task&version=v4 document }
                 *
                 * 同意审批任务
                 *
                 * 对于单个审批任务进行同意操作。同意后审批流程会流转到下一个审批人。
                 */
                pass: async (
                    payload?: {
                        data: {
                            instance_code: string;
                            task_id: string;
                            form?: string;
                            comment?: string;
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
                                `${this.domain}/open-apis/approval/v4/tasks/pass`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=forward&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=forward&project=approval&resource=task&version=v4 document }
                 *
                 * 转交审批任务
                 *
                 * 对于单个审批任务进行转交操作。转交后审批流程流转给被转交人。;
                 */
                forward: async (
                    payload?: {
                        data: {
                            instance_code: string;
                            task_id: string;
                            transfer_user_id: string;
                            comment?: string;
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
                                `${this.domain}/open-apis/approval/v4/tasks/forward`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=add_sign&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_sign&project=approval&resource=task&version=v4 document }
                 *
                 * 加签审批任务
                 *
                 * 通过调用该接口在当前节点增加审批人
                 */
                addSign: async (
                    payload?: {
                        data: {
                            instance_code: string;
                            task_id: string;
                            comment?: string;
                            add_sign_user_ids: Array<string>;
                            add_sign_type: number;
                            approval_method?: number;
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
                                `${this.domain}/open-apis/approval/v4/tasks/add_sign`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=rollback&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=rollback&project=approval&resource=task&version=v4 document }
                 *
                 * 退回审批任务
                 *
                 * 从当前审批任务，退回到已审批的一个或多个任务节点。退回后，已审批节点重新生成审批任务。
                 */
                rollback: async (
                    payload?: {
                        data: {
                            instance_code: string;
                            task_id: string;
                            comment?: string;
                            node_ids: Array<string>;
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
                                `${this.domain}/open-apis/approval/v4/tasks/rollback`,
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
                            topic: "1" | "2" | "3" | "17" | "18";
                            locale?: "zh-CN" | "en-US" | "ja-JP";
                            definition_code?: string;
                            start_timestamp?: string;
                            end_timestamp?: string;
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
                                    `${this.domain}/open-apis/approval/v4/tasks`,
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
                                                    tasks: Array<{
                                                        topic:
                                                            | "1"
                                                            | "2"
                                                            | "3"
                                                            | "17"
                                                            | "18";
                                                        user_id: string;
                                                        title: string;
                                                        status:
                                                            | "1"
                                                            | "2"
                                                            | "17"
                                                            | "18"
                                                            | "33"
                                                            | "34";
                                                        instance_status:
                                                            | "0"
                                                            | "1"
                                                            | "2"
                                                            | "3"
                                                            | "4"
                                                            | "5";
                                                        definition_code: string;
                                                        initiator?: string;
                                                        initiator_name?: string;
                                                        task_id: string;
                                                        instance_code: string;
                                                        definition_group_id?: string;
                                                        definition_group_name?: string;
                                                        definition_name?: string;
                                                        summaries?: Array<{
                                                            key?: string;
                                                            value?: string;
                                                        }>;
                                                        instance_external_id?: string;
                                                        task_external_id?: string;
                                                        support_api_operate?: boolean;
                                                        link?: string;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    count?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=approval&resource=task&version=v4 document }
                 *
                 * 获取审批任务列表
                 *
                 * 通过设置任务分组、审批定义 Code（审批流程的唯一标识）等，查询任务列表。任务分组包括待办审批、已办审批等
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            topic: "1" | "2" | "3" | "17" | "18";
                            locale?: "zh-CN" | "en-US" | "ja-JP";
                            definition_code?: string;
                            start_timestamp?: string;
                            end_timestamp?: string;
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
                                    tasks: Array<{
                                        topic: "1" | "2" | "3" | "17" | "18";
                                        user_id: string;
                                        title: string;
                                        status:
                                            | "1"
                                            | "2"
                                            | "17"
                                            | "18"
                                            | "33"
                                            | "34";
                                        instance_status:
                                            | "0"
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5";
                                        definition_code: string;
                                        initiator?: string;
                                        initiator_name?: string;
                                        task_id: string;
                                        instance_code: string;
                                        definition_group_id?: string;
                                        definition_group_name?: string;
                                        definition_name?: string;
                                        summaries?: Array<{
                                            key?: string;
                                            value?: string;
                                        }>;
                                        instance_external_id?: string;
                                        task_external_id?: string;
                                        support_api_operate?: boolean;
                                        link?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                    count?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/tasks`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=unsubscription&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscription&project=approval&resource=task&version=v4 document }
                 *
                 * 退订审批任务状态变更事件
                 *
                 * 当不再希望收到任务状态变更事件时，调用此接口，该接口用于撤销[订阅审批任务状态变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/subscription)中的操作
                 */
                unsubscription: async (
                    payload?: {
                        params?: {
                            subscription_type?:
                                | "INVOLVED_APPROVAL"
                                | "MANAGED_APPROVAL";
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
                                `${this.domain}/open-apis/approval/v4/tasks/subscription`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=subscription&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=approval&resource=task&version=v4 document }
                 *
                 * 订阅审批任务状态变更事件
                 *
                 * 当应用[订阅审批事件](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)后，对于事件type为[审批任务状态变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/events/status_changed)的事件;，需要调用该接口指定需要接收通知的审批任务范围，指定后才可以接收到对应范围内的事件。
                 */
                subscription: async (
                    payload?: {
                        data: {
                            subscription_type:
                                | "INVOLVED_APPROVAL"
                                | "MANAGED_APPROVAL";
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
                                `${this.domain}/open-apis/approval/v4/tasks/subscription`,
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
             * approval
             */
            approval: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=unsubscribe&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscribe&project=approval&resource=approval&version=v4 document }
                 *
                 * 取消订阅审批事件
                 *
                 * 调用[订阅审批事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/subscribe)接口订阅审批定义 Code 后，如果不再需要接收该审批定义下的事件订阅通知，可以调用本接口取消订阅审批定义 Code，取消后应用无法再收到该审批定义对应实例的事件通知。
                 */
                unsubscribe: async (
                    payload?: {
                        path?: { approval_code?: string };
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
                                `${this.domain}/open-apis/approval/v4/approvals/:approval_code/unsubscribe`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=subscribe&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscribe&project=approval&resource=approval&version=v4 document }
                 *
                 * 订阅审批事件
                 *
                 * 当应用[订阅审批事件](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)后，需要调用该接口指定审批定义 Code（approval_code）开启订阅，开启后应用才可以接收该审批定义对应的事件。
                 *
                 * ## 注意事项;;- 该接口仅用于开启应用接收审批事件，实际使用时应用还需要订阅所需的审批事件。例如订阅[审批实例状态变更](https://open.feishu.cn/document/ukTMukTMukTM/uIDO24iM4YjLygjN/event/common-event/approval-instance-event)事件。;- 同一应用只需要调用该接口一次即可，无需重复调用该接口。;- 当应用不再需要接收审批事件时，可以调用[取消订阅审批事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/unsubscribe)接口，进行取消，取消后该应用将不再会收到事件订阅消息。;- 订阅和取消订阅接口的实现都是面向应用的，多个应用可以同时订阅同一个审批定义 Code（approval_code），每个应用在都能收到审批事件。
                 */
                subscribe: async (
                    payload?: {
                        path: { approval_code: string };
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
                                `${this.domain}/open-apis/approval/v4/approvals/:approval_code/subscribe`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=approval&resource=approval&version=v4 document }
                 *
                 * 创建审批定义
                 *
                 * 该接口用于创建审批定义，可以灵活指定审批定义的基础信息、表单和流程等。
                 */
                create: async (
                    payload?: {
                        data: {
                            approval_name: string;
                            approval_code?: string;
                            description?: string;
                            viewers: Array<{
                                viewer_type?:
                                    | "TENANT"
                                    | "DEPARTMENT"
                                    | "USER"
                                    | "NONE";
                                viewer_user_id?: string;
                                viewer_department_id?: string;
                            }>;
                            form: {
                                form_content: string;
                                widget_relation?: string;
                            };
                            node_list: Array<{
                                id: string;
                                name?: string;
                                node_type?: "AND" | "OR" | "SEQUENTIAL";
                                approver?: Array<{
                                    type:
                                        | "Supervisor"
                                        | "SupervisorTopDown"
                                        | "DepartmentManager"
                                        | "DepartmentManagerTopDown"
                                        | "Personal"
                                        | "Free";
                                    user_id?: string;
                                    level?: string;
                                }>;
                                ccer?: Array<{
                                    type:
                                        | "Supervisor"
                                        | "SupervisorTopDown"
                                        | "DepartmentManager"
                                        | "DepartmentManagerTopDown"
                                        | "Personal"
                                        | "Free";
                                    user_id?: string;
                                    level?: string;
                                }>;
                                privilege_field?: {
                                    writable: Array<string>;
                                    readable: Array<string>;
                                };
                                approver_chosen_multi?: boolean;
                                approver_chosen_range?: Array<{
                                    type?: "ALL" | "PERSONAL" | "ROLE";
                                    id_list?: Array<string>;
                                }>;
                                starter_assignee?:
                                    | "STARTER"
                                    | "AUTO_PASS"
                                    | "SUPERVISOR"
                                    | "DEPARTMENT_MANAGER";
                            }>;
                            settings?: {
                                revert_interval?: number;
                                revert_option?: number;
                                reject_option?: number;
                                quick_approval_option?: number;
                                overtime_disable?: boolean;
                                overtime_notice_time?: number;
                                overtime_close_time?: number;
                                overtime_recover_time?: number;
                            };
                            config?: {
                                can_update_viewer: boolean;
                                can_update_form: boolean;
                                can_update_process: boolean;
                                can_update_revert: boolean;
                                help_url?: string;
                            };
                            icon?: number;
                            i18n_resources: Array<{
                                locale:
                                    | "zh-CN"
                                    | "en-US"
                                    | "ja-JP"
                                    | "zh-HK"
                                    | "zh-TW"
                                    | "de-DE"
                                    | "es-ES"
                                    | "fr-FR"
                                    | "id-ID"
                                    | "it-IT"
                                    | "ko-KR"
                                    | "pt-BR"
                                    | "th-TH"
                                    | "vi-VN"
                                    | "ms-MY"
                                    | "ru-RU";
                                texts: Array<{ key: string; value: string }>;
                                is_default: boolean;
                            }>;
                            process_manager_ids?: Array<string>;
                        };
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                    approval_code?: string;
                                    approval_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/approvals`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=get&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=approval&resource=approval&version=v4 document }
                 *
                 * 查看指定审批定义
                 *
                 * 根据审批定义 Code 以及语言、用户 ID 等筛选条件获取指定审批定义的信息，包括审批定义名称、状态、表单控件以及节点等信息。获取审批定义信息后，可根据信息构造[创建审批实例](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/create)的请求。
                 */
                get: async (
                    payload?: {
                        params?: {
                            locale?:
                                | "zh-CN"
                                | "en-US"
                                | "ja-JP"
                                | "zh-HK"
                                | "zh-TW"
                                | "de-DE"
                                | "es-ES"
                                | "fr-FR"
                                | "id-ID"
                                | "it-IT"
                                | "ko-KR"
                                | "pt-BR"
                                | "th-TH"
                                | "vi-VN"
                                | "ms-MY"
                                | "ru-RU";
                            with_admin_id?: boolean;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            with_option?: boolean;
                            user_id?: string;
                            nested_mutable_group?: boolean;
                        };
                        path: { approval_code: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    approval_name: string;
                                    status:
                                        | "ACTIVE"
                                        | "INACTIVE"
                                        | "DELETED"
                                        | "UNKNOWN";
                                    form: string;
                                    node_list: Array<{
                                        name: string;
                                        need_approver: boolean;
                                        node_id: string;
                                        custom_node_id?: string;
                                        node_type:
                                            | "AND"
                                            | "OR"
                                            | "SEQUENTIAL"
                                            | "CC_NODE";
                                        approver_chosen_multi: boolean;
                                        approver_chosen_range?: Array<{
                                            approver_range_type?: number;
                                            approver_range_ids?: Array<string>;
                                        }>;
                                        require_signature?: boolean;
                                    }>;
                                    viewers: Array<{
                                        type:
                                            | "TENANT"
                                            | "DEPARTMENT"
                                            | "USER"
                                            | "ROLE"
                                            | "USER_GROUP"
                                            | "NONE";
                                        id?: string;
                                        user_id?: string;
                                    }>;
                                    approval_admin_ids?: Array<string>;
                                    form_widget_relation?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/approvals/:approval_code`,
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
             * instance.comment
             */
            instanceComment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=approval&resource=instance.comment&version=v4 document }
                 *
                 * 创建评论
                 *
                 * 在指定审批实例下创建、修改评论或回复评论（不包含审批同意、拒绝、转交等附加的理由或意见）。;
                 */
                create: async (
                    payload?: {
                        data?: {
                            content?: string;
                            at_info_list?: Array<{
                                user_id: string;
                                name: string;
                                offset: string;
                            }>;
                            parent_comment_id?: string;
                            comment_id?: string;
                            disable_bot?: boolean;
                            extra?: string;
                        };
                        params: {
                            user_id_type?: "open_id" | "user_id" | "union_id";
                            user_id: string;
                        };
                        path: { instance_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { comment_id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/instances/:instance_id/comments`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=delete&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=approval&resource=instance.comment&version=v4 document }
                 *
                 * 删除评论
                 *
                 * 删除某审批实例下的一条评论或评论回复（不包含审批同意、拒绝、转交等附加的理由或意见），删除后在审批中心的审批实例内不再显示评论内容，而是显示 **评论已删除**。
                 */
                delete: async (
                    payload?: {
                        params: {
                            user_id_type?: "open_id" | "user_id" | "union_id";
                            user_id: string;
                        };
                        path: { instance_id: string; comment_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { comment_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/instances/:instance_id/comments/:comment_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=remove&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove&project=approval&resource=instance.comment&version=v4 document }
                 *
                 * 清空评论
                 *
                 * 清空某审批实例下的全部评论与评论回复，包括显示为已删除的评论。
                 */
                remove: async (
                    payload?: {
                        params?: {
                            user_id_type?: "open_id" | "user_id" | "union_id";
                            user_id?: string;
                        };
                        path: { instance_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    instance_id?: string;
                                    external_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/instances/:instance_id/comments/remove`,
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
                            user_id_type?: "open_id" | "user_id" | "union_id";
                            user_id: string;
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { instance_id: string };
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
                                    `${this.domain}/open-apis/approval/v4/instances/:instance_id/comments`,
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
                                                    comments: Array<{
                                                        id: string;
                                                        content: string;
                                                        create_time: string;
                                                        update_time: string;
                                                        is_delete: number;
                                                        replies?: Array<{
                                                            id: string;
                                                            content: string;
                                                            create_time?: string;
                                                            update_time?: string;
                                                            is_delete: number;
                                                            at_info_list?: Array<{
                                                                user_id: string;
                                                                name: string;
                                                                offset: string;
                                                            }>;
                                                            commentator: string;
                                                            extra?: string;
                                                        }>;
                                                        at_info_list?: Array<{
                                                            user_id: string;
                                                            name: string;
                                                            offset: string;
                                                        }>;
                                                        commentator: string;
                                                        extra?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=approval&resource=instance.comment&version=v4 document }
                 *
                 * 获取评论
                 *
                 * 根据审批实例 Code 获取某个审批实例下，全部评论与评论回复（不包含审批同意、拒绝、转交等附加的理由或意见）。
                 */
                list: async (
                    payload?: {
                        params: {
                            user_id_type?: "open_id" | "user_id" | "union_id";
                            user_id: string;
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { instance_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    comments: Array<{
                                        id: string;
                                        content: string;
                                        create_time: string;
                                        update_time: string;
                                        is_delete: number;
                                        replies?: Array<{
                                            id: string;
                                            content: string;
                                            create_time?: string;
                                            update_time?: string;
                                            is_delete: number;
                                            at_info_list?: Array<{
                                                user_id: string;
                                                name: string;
                                                offset: string;
                                            }>;
                                            commentator: string;
                                            extra?: string;
                                        }>;
                                        at_info_list?: Array<{
                                            user_id: string;
                                            name: string;
                                            offset: string;
                                        }>;
                                        commentator: string;
                                        extra?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/instances/:instance_id/comments`,
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
             * external_task
             */
            externalTask: {
                listWithIterator: async (
                    payload?: {
                        data?: {
                            approval_codes?: Array<string>;
                            instance_ids?: Array<string>;
                            user_ids?: Array<string>;
                            status?:
                                | "PENDING"
                                | "APPROVED"
                                | "REJECTED"
                                | "TRANSFERRED"
                                | "DONE";
                        };
                        params?: { page_size?: number; page_token?: string };
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
                                    `${this.domain}/open-apis/approval/v4/external_tasks`,
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
                                                    data?: Array<{
                                                        instance_id: string;
                                                        approval_id: string;
                                                        approval_code: string;
                                                        status:
                                                            | "PENDING"
                                                            | "APPROVED"
                                                            | "REJECTED"
                                                            | "CANCELED"
                                                            | "DELETED"
                                                            | "HIDDEN";
                                                        update_time: string;
                                                        tasks?: Array<{
                                                            id: string;
                                                            status:
                                                                | "PENDING"
                                                                | "APPROVED"
                                                                | "REJECTED"
                                                                | "TRANSFERRED"
                                                                | "DONE";
                                                            update_time: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_task&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=approval&resource=external_task&version=v4 document }
                 *
                 * 获取三方审批任务状态
                 *
                 * 该接口用于获取三方审批的状态。支持传入三方审批定义 Code、三方审批实例 ID、审批人 ID 或 审批任务状态查询条件，获取满足条件的三方审批任务状态。
                 *
                 * ## 使用示例;;该接口支持多种参数的组合，具体请参考请求体示例：;;- 通过 instance_ids 获取指定实例的任务状态时，instance_ids为必须字段;;    ```json;    {;        "instance_ids": ["oa_159160304"];    };    ```;;- 通过 user_ids 获取指定用户的任务状态时，approval_codes、user_ids、status为必须字段;;    ```json;    {;        "approval_codes": ["B7B65FFE-C2GC-452F-9F0F-9AA8352363D6"],;        "user_ids": ["112321"],;        "status": "PENDING";    };    ```;;- 通过 status 获取指定状态的所有任务时，approval_codes、status为必须字段;;    ``` json;    {;        "approval_codes": [;            "E78F1022-A166-447C-8320-E151DA90D70F";        ],;        "status": "PENDING";    };    ```;;- 通过 page_token获取下一批数据时，page_token为必须字段
                 */
                list: async (
                    payload?: {
                        data?: {
                            approval_codes?: Array<string>;
                            instance_ids?: Array<string>;
                            user_ids?: Array<string>;
                            status?:
                                | "PENDING"
                                | "APPROVED"
                                | "REJECTED"
                                | "TRANSFERRED"
                                | "DONE";
                        };
                        params?: { page_size?: number; page_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        instance_id: string;
                                        approval_id: string;
                                        approval_code: string;
                                        status:
                                            | "PENDING"
                                            | "APPROVED"
                                            | "REJECTED"
                                            | "CANCELED"
                                            | "DELETED"
                                            | "HIDDEN";
                                        update_time: string;
                                        tasks?: Array<{
                                            id: string;
                                            status:
                                                | "PENDING"
                                                | "APPROVED"
                                                | "REJECTED"
                                                | "TRANSFERRED"
                                                | "DONE";
                                            update_time: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/external_tasks`,
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
             * external_instance
             */
            externalInstance: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_instance&apiName=check&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=check&project=approval&resource=external_instance&version=v4 document }
                 *
                 * 校验三方审批实例
                 *
                 * 调用该接口校验三方审批实例数据，用于判断服务端数据是否为最新的。请求时提交实例最新更新时间，如果服务端不存在该实例，或者服务端实例更新时间不是最新的，则返回对应实例 ID。;;例如，设置定时任务每隔 5 分钟，将最近 5 分钟产生的实例使用该接口进行对比。如果数据在服务端不存在或者不是最新，则可以根据本接口返回的实例 ID、任务 ID，前往[同步三方审批实例](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_instance/create)。
                 */
                check: async (
                    payload?: {
                        data: {
                            instances: Array<{
                                instance_id: string;
                                update_time: string;
                                tasks: Array<{
                                    task_id: string;
                                    update_time: string;
                                }>;
                            }>;
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
                                    diff_instances?: Array<{
                                        instance_id: string;
                                        update_time?: string;
                                        tasks?: Array<{
                                            task_id: string;
                                            update_time: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/external_instances/check`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_instance&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=approval&resource=external_instance&version=v4 document }
                 *
                 * 同步三方审批实例
                 *
                 * 审批中心不负责审批的流转，审批的流转在三方系统。本接口用于把三方系统在审批流转后生成的审批实例、审批任务、审批抄送数据同步到审批中心。
                 *
                 * 需确保审批实例内各类实体（实例、任务、抄送） ID 在审批实例内的唯一性，不属于同一实体之间的 ID 也要确保唯一性。如果实例 ID、任务 ID、抄送 ID 重复，则会导致在审批中心任务看不到对应的审批数据。;;## 实现效果;;调用本接口同步三方审批实例后，企业员工可以在审批中心浏览同步过来的审批实例、任务、抄送信息，并可以跳转回三方系统查看和操作审批，其中，实例信息在审批中心的 **已发起** 列表、任务信息在 **待办** 和 **已办** 列表、抄送信息在 **抄送我** 列表。;;:::html;<img src="//sf3-cn.feishucdn.com/obj/open-platform-opendoc/1ae6658510d5bf5370cf9d92675d052e_ICznPXHJRl.png" alt="" style="zoom:40%;" />;:::;;[创建三方审批定义](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_approval/create)时如果设置了三方审批回调 URL，对于审批任务，可以配置[三方快捷审批回调](https://open.feishu.cn/document/ukTMukTMukTM/ukjNyYjL5YjM24SO2IjN/quick-approval-callback)，这样审批人可以在审批中心直接进行审批操作，审批中心会将审批结果回调至三方系统，三方系统收到回调后更新任务信息，并将新的任务信息同步回审批中心，形成闭环。;;:::html;<img src="//sf3-cn.feishucdn.com/obj/open-platform-opendoc/80ed32b0bbb5d18cf1159e4534fc80eb_Dm49iUKXUp.png" alt=""  style="zoom:17%;" />;:::;
                 */
                create: async (
                    payload?: {
                        data: {
                            approval_code: string;
                            status:
                                | "PENDING"
                                | "APPROVED"
                                | "REJECTED"
                                | "CANCELED"
                                | "DELETED"
                                | "HIDDEN"
                                | "TERMINATED";
                            extra?: string;
                            instance_id: string;
                            links: { pc_link: string; mobile_link?: string };
                            title?: string;
                            form?: Array<{ name?: string; value?: string }>;
                            user_id?: string;
                            user_name?: string;
                            open_id?: string;
                            department_id?: string;
                            department_name?: string;
                            start_time: string;
                            end_time: string;
                            update_time: string;
                            display_method?:
                                | "BROWSER"
                                | "SIDEBAR"
                                | "NORMAL"
                                | "TRUSTEESHIP";
                            update_mode?: "REPLACE" | "UPDATE";
                            task_list?: Array<{
                                task_id: string;
                                user_id?: string;
                                open_id?: string;
                                title?: string;
                                links: {
                                    pc_link: string;
                                    mobile_link?: string;
                                };
                                status:
                                    | "PENDING"
                                    | "APPROVED"
                                    | "REJECTED"
                                    | "TRANSFERRED"
                                    | "DONE";
                                extra?: string;
                                create_time: string;
                                end_time: string;
                                update_time?: string;
                                action_context?: string;
                                action_configs?: Array<{
                                    action_type: string;
                                    action_name?: string;
                                    is_need_reason?: boolean;
                                    is_reason_required?: boolean;
                                    is_need_attachment?: boolean;
                                }>;
                                display_method?:
                                    | "BROWSER"
                                    | "SIDEBAR"
                                    | "NORMAL"
                                    | "TRUSTEESHIP";
                                exclude_statistics?: boolean;
                                node_id?: string;
                                node_name?: string;
                                generate_type?: "EXTERNAL_CONSIGN" | "DEFAULT";
                            }>;
                            cc_list?: Array<{
                                cc_id: string;
                                user_id?: string;
                                open_id?: string;
                                links: {
                                    pc_link: string;
                                    mobile_link?: string;
                                };
                                read_status: "READ" | "UNREAD";
                                extra?: string;
                                title?: string;
                                create_time: string;
                                update_time: string;
                                display_method?:
                                    | "BROWSER"
                                    | "SIDEBAR"
                                    | "NORMAL"
                                    | "TRUSTEESHIP";
                            }>;
                            i18n_resources: Array<{
                                locale:
                                    | "zh-CN"
                                    | "en-US"
                                    | "ja-JP"
                                    | "zh-HK"
                                    | "zh-TW"
                                    | "de-DE"
                                    | "es-ES"
                                    | "fr-FR"
                                    | "id-ID"
                                    | "it-IT"
                                    | "ko-KR"
                                    | "pt-BR"
                                    | "th-TH"
                                    | "vi-VN"
                                    | "ms-MY"
                                    | "ru-RU";
                                texts: Array<{ key: string; value: string }>;
                                is_default: boolean;
                            }>;
                            trusteeship_url_token?: string;
                            trusteeship_user_id_type?: string;
                            trusteeship_urls?: {
                                form_detail_url?: string;
                                action_definition_url?: string;
                                approval_node_url?: string;
                                action_callback_url?: string;
                                pull_business_data_url?: string;
                            };
                            trusteeship_cache_config?: {
                                form_policy?:
                                    | "DISABLE"
                                    | "IMMUTABLE"
                                    | "BY_NODE"
                                    | "BY_USER";
                                form_vary_with_locale?: boolean;
                                form_version?: string;
                            };
                            resource_region?: string;
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
                                    data?: {
                                        approval_code: string;
                                        status:
                                            | "PENDING"
                                            | "APPROVED"
                                            | "REJECTED"
                                            | "CANCELED"
                                            | "DELETED"
                                            | "HIDDEN"
                                            | "TERMINATED";
                                        extra?: string;
                                        instance_id: string;
                                        links: {
                                            pc_link: string;
                                            mobile_link?: string;
                                        };
                                        title?: string;
                                        form?: Array<{
                                            name?: string;
                                            value?: string;
                                        }>;
                                        user_id?: string;
                                        user_name?: string;
                                        open_id?: string;
                                        department_id?: string;
                                        department_name?: string;
                                        start_time: string;
                                        end_time: string;
                                        update_time: string;
                                        display_method?:
                                            | "BROWSER"
                                            | "SIDEBAR"
                                            | "NORMAL"
                                            | "TRUSTEESHIP";
                                        update_mode?: "REPLACE" | "UPDATE";
                                        task_list?: Array<{
                                            task_id: string;
                                            user_id?: string;
                                            open_id?: string;
                                            title?: string;
                                            links: {
                                                pc_link: string;
                                                mobile_link?: string;
                                            };
                                            status:
                                                | "PENDING"
                                                | "APPROVED"
                                                | "REJECTED"
                                                | "TRANSFERRED"
                                                | "DONE";
                                            extra?: string;
                                            create_time: string;
                                            end_time: string;
                                            update_time?: string;
                                            action_context?: string;
                                            action_configs?: Array<{
                                                action_type: string;
                                                action_name?: string;
                                                is_need_reason?: boolean;
                                                is_reason_required?: boolean;
                                                is_need_attachment?: boolean;
                                            }>;
                                            display_method?:
                                                | "BROWSER"
                                                | "SIDEBAR"
                                                | "NORMAL"
                                                | "TRUSTEESHIP";
                                            exclude_statistics?: boolean;
                                            node_id?: string;
                                            node_name?: string;
                                            generate_type?:
                                                | "EXTERNAL_CONSIGN"
                                                | "DEFAULT";
                                        }>;
                                        cc_list?: Array<{
                                            cc_id: string;
                                            user_id?: string;
                                            open_id?: string;
                                            links: {
                                                pc_link: string;
                                                mobile_link?: string;
                                            };
                                            read_status: "READ" | "UNREAD";
                                            extra?: string;
                                            title?: string;
                                            create_time: string;
                                            update_time: string;
                                            display_method?:
                                                | "BROWSER"
                                                | "SIDEBAR"
                                                | "NORMAL"
                                                | "TRUSTEESHIP";
                                        }>;
                                        i18n_resources: Array<{
                                            locale:
                                                | "zh-CN"
                                                | "en-US"
                                                | "ja-JP"
                                                | "zh-HK"
                                                | "zh-TW"
                                                | "de-DE"
                                                | "es-ES"
                                                | "fr-FR"
                                                | "id-ID"
                                                | "it-IT"
                                                | "ko-KR"
                                                | "pt-BR"
                                                | "th-TH"
                                                | "vi-VN"
                                                | "ms-MY"
                                                | "ru-RU";
                                            texts: Array<{
                                                key: string;
                                                value: string;
                                            }>;
                                            is_default: boolean;
                                        }>;
                                        trusteeship_url_token?: string;
                                        trusteeship_user_id_type?: string;
                                        trusteeship_urls?: {
                                            form_detail_url?: string;
                                            action_definition_url?: string;
                                            approval_node_url?: string;
                                            action_callback_url?: string;
                                            pull_business_data_url?: string;
                                        };
                                        trusteeship_cache_config?: {
                                            form_policy?:
                                                | "DISABLE"
                                                | "IMMUTABLE"
                                                | "BY_NODE"
                                                | "BY_USER";
                                            form_vary_with_locale?: boolean;
                                            form_version?: string;
                                        };
                                        resource_region?: string;
                                    };
                                    process_record?: {
                                        instance?: {
                                            insert_num?: number;
                                            update_num?: number;
                                            delete_num?: number;
                                        };
                                        task?: {
                                            insert_num?: number;
                                            update_num?: number;
                                            delete_num?: number;
                                        };
                                        cc?: {
                                            insert_num?: number;
                                            update_num?: number;
                                            delete_num?: number;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/external_instances`,
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
             * external_approval
             */
            externalApproval: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_approval&apiName=get&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=approval&resource=external_approval&version=v4 document }
                 *
                 * 查看指定三方审批定义
                 *
                 * 调用该接口通过三方审批定义 Code 获取审批定义的详细数据，包括三方审批定义的名称、说明、三方审批发起链接、回调 URL 以及审批定义可见人列表等信息。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { approval_code: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    approval_name: string;
                                    approval_code: string;
                                    group_code: string;
                                    group_name?: string;
                                    description?: string;
                                    external?: {
                                        biz_name?: string;
                                        biz_type?: string;
                                        create_link_mobile?: string;
                                        create_link_pc?: string;
                                        support_pc?: boolean;
                                        support_mobile?: boolean;
                                        support_batch_read?: boolean;
                                        enable_mark_readed?: boolean;
                                        enable_quick_operate?: boolean;
                                        action_callback_url?: string;
                                        action_callback_token?: string;
                                        action_callback_key?: string;
                                        allow_batch_operate?: boolean;
                                        exclude_efficiency_statistics?: boolean;
                                    };
                                    viewers?: Array<{
                                        viewer_type?:
                                            | "TENANT"
                                            | "DEPARTMENT"
                                            | "USER"
                                            | "NONE";
                                        viewer_user_id?: string;
                                        viewer_department_id?: string;
                                    }>;
                                    i18n_resources?: Array<{
                                        locale:
                                            | "zh-CN"
                                            | "en-US"
                                            | "ja-JP"
                                            | "zh-HK"
                                            | "zh-TW"
                                            | "de-DE"
                                            | "es-ES"
                                            | "fr-FR"
                                            | "id-ID"
                                            | "it-IT"
                                            | "ko-KR"
                                            | "pt-BR"
                                            | "th-TH"
                                            | "vi-VN"
                                            | "ms-MY"
                                            | "ru-RU";
                                        texts: Array<{
                                            key: string;
                                            value: string;
                                        }>;
                                        is_default: boolean;
                                    }>;
                                    managers?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/external_approvals/:approval_code`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_approval&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=approval&resource=external_approval&version=v4 document }
                 *
                 * 同步三方审批定义
                 *
                 * 该接口用于将其他系统的审批定义同步至飞书审批，配合[同步三方审批实例](https://open.feishu.cn/document%2FuAjLw4CM%2FukTMukTMukTM%2Freference%2Fapproval-v4%2Fexternal_instance%2Fcreate),[三方快捷审批回调](https://open.feishu.cn/document%2FukTMukTMukTM%2FukjNyYjL5YjM24SO2IjN%2Fquick-approval-callback)使用可将企业内所有审批流集中在飞书审批中统一处理。 方便企业员工在飞书审批内发起并操作三方审批。
                 */
                create: async (
                    payload?: {
                        data: {
                            approval_name: string;
                            approval_code: string;
                            group_code?: string;
                            group_name?: string;
                            description?: string;
                            external: {
                                biz_name?: string;
                                biz_type?: string;
                                create_link_mobile?: string;
                                create_link_pc?: string;
                                support_pc?: boolean;
                                support_mobile?: boolean;
                                support_batch_read?: boolean;
                                enable_mark_readed?: boolean;
                                enable_quick_operate?: boolean;
                                action_callback_url?: string;
                                action_callback_token?: string;
                                action_callback_key?: string;
                                allow_batch_operate?: boolean;
                                exclude_efficiency_statistics?: boolean;
                            };
                            viewers?: Array<{
                                viewer_type?:
                                    | "TENANT"
                                    | "DEPARTMENT"
                                    | "USER"
                                    | "NONE";
                                viewer_user_id?: string;
                                viewer_department_id?: string;
                            }>;
                            i18n_resources?: Array<{
                                locale:
                                    | "zh-CN"
                                    | "en-US"
                                    | "ja-JP"
                                    | "zh-HK"
                                    | "zh-TW"
                                    | "de-DE"
                                    | "es-ES"
                                    | "fr-FR"
                                    | "id-ID"
                                    | "it-IT"
                                    | "ko-KR"
                                    | "pt-BR"
                                    | "th-TH"
                                    | "vi-VN"
                                    | "ms-MY"
                                    | "ru-RU";
                                texts: Array<{ key: string; value: string }>;
                                is_default: boolean;
                            }>;
                            managers?: Array<string>;
                        };
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                data?: { approval_code: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/external_approvals`,
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
             * district
             */
            district: {
                searchWithIterator: async (
                    payload?: {
                        data?: {
                            district_ids?: Array<string>;
                            keyword?: string;
                        };
                        params?: {
                            locale?: "zh-CN" | "en-US";
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
                                    `${this.domain}/open-apis/approval/v4/districts/search`,
                                    path
                                ),
                                method: "POST",
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
                                                    version?: string;
                                                    items?: Array<{
                                                        id?: string;
                                                        name?: string;
                                                        level?: string;
                                                        has_sub_district?: boolean;
                                                        parent_districts?: Array<{
                                                            id?: string;
                                                            name?: string;
                                                            level?: string;
                                                        }>;
                                                    }>;
                                                    has_more?: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=district&apiName=search&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=approval&resource=district&version=v4 document }
                 *
                 * 搜索地理库信息
                 *
                 * 搜索审批的地理库数据，可用于在发起审批时填写地址控件的区域信息
                 */
                search: async (
                    payload?: {
                        data?: {
                            district_ids?: Array<string>;
                            keyword?: string;
                        };
                        params?: {
                            locale?: "zh-CN" | "en-US";
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
                                    version?: string;
                                    items?: Array<{
                                        id?: string;
                                        name?: string;
                                        level?: string;
                                        has_sub_district?: boolean;
                                        parent_districts?: Array<{
                                            id?: string;
                                            name?: string;
                                            level?: string;
                                        }>;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/districts/search`,
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
                            root_district_id?: string;
                            list_type?: "sub_level" | "leaf_level";
                            locale?: "zh-CN" | "en-US";
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
                                    `${this.domain}/open-apis/approval/v4/districts`,
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
                                                    version?: string;
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        id?: string;
                                                        name?: string;
                                                        level?: string;
                                                        has_sub_district?: boolean;
                                                        parent_districts?: Array<{
                                                            id?: string;
                                                            name?: string;
                                                            level?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=district&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=approval&resource=district&version=v4 document }
                 *
                 * 查询地理库信息
                 *
                 * 获取审批的地理库数据，用于在发起审批时填写地址控件的区域信息
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            root_district_id?: string;
                            list_type?: "sub_level" | "leaf_level";
                            locale?: "zh-CN" | "en-US";
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
                                    version?: string;
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        id?: string;
                                        name?: string;
                                        level?: string;
                                        has_sub_district?: boolean;
                                        parent_districts?: Array<{
                                            id?: string;
                                            name?: string;
                                            level?: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/approval/v4/districts`,
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
