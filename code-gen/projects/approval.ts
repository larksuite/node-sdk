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
     * 审批
     */
    approval = {
        /**
         * 事件
         */
        approval: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/create document }
             *
             * 创建审批定义
             *
             * 用于通过接口创建简单的审批定义，可以灵活指定定义的基础信息、表单和流程等。创建成功后，不支持从审批管理后台删除该定义。不推荐企业自建应用使用，如有需要尽量联系管理员在审批管理后台创建定义。
             *
             * 接口谨慎调用，创建后的审批定义无法停用/删除
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
                            locale: "zh-CN" | "en-US" | "ja-JP";
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/get document }
             *
             * 查看审批定义
             *
             * 根据 Approval Code 获取某个审批定义的详情，用于构造创建审批实例的请求。
             */
            get: async (
                payload?: {
                    params?: {
                        locale?: "zh-CN" | "en-US" | "ja-JP";
                        with_admin_id?: boolean;
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=subscribe&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/subscribe document }
             *
             * 订阅审批事件
             *
             * 应用订阅 approval_code 后，该应用就可以收到该审批定义对应实例的事件通知。同一应用只需要订阅一次，无需重复订阅。;;当应用不希望再收到审批事件时，可以使用取消订阅接口进行取消，取消后将不再给应用推送消息。;;订阅和取消订阅都是应用维度的，多个应用可以同时订阅同一个 approval_code，每个应用都能收到审批事件。
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=unsubscribe&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/unsubscribe document }
             *
             * 取消订阅审批事件
             *
             * 取消订阅 approval_code 后，无法再收到该审批定义对应实例的事件通知
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
        },
        /**
         * 三方审批定义
         */
        externalApproval: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_approval&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_approval/create document }
             *
             * 三方审批定义创建
             *
             * 审批定义是审批的描述，包括审批名称、图标、描述等基础信息。创建好审批定义，用户就可以在审批应用的发起页中看到审批，如果用户点击发起，则会跳转到配置的发起三方系统地址去发起审批。;;另外，审批定义还配置了审批操作时的回调地址：审批人在待审批列表中进行【同意】【拒绝】操作时，审批中心会调用回调地址通知三方系统。
             *
             * 注意，审批中心不负责审批流程的流转，只负责展示、操作、消息通知。因此审批定义创建时没有审批流程的信息。
             */
            create: async (
                payload?: {
                    data: {
                        approval_name: string;
                        approval_code: string;
                        group_code: string;
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
                            locale: "zh-CN" | "en-US" | "ja-JP";
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_approval&apiName=get&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=approval&resource=external_approval&version=v4 document }
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
                                    locale: "zh-CN" | "en-US" | "ja-JP";
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
        },
        /**
         * 三方审批实例
         */
        externalInstance: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_instance&apiName=check&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_instance/check document }
             *
             * 三方审批实例校验
             *
             * 校验三方审批实例数据，用于判断服务端数据是否为最新的。用户提交实例最新更新时间，如果服务端不存在该实例，或者服务端实例更新时间不是最新的，则返回对应实例 id。;;例如，用户可以每隔5分钟，将最近5分钟产生的实例使用该接口进行对比。
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_instance/create document }
             *
             * 三方审批实例同步
             *
             * 审批中心不负责审批的流转，审批的流转在三方系统，三方系统在审批流转后生成的审批实例、审批任务、审批抄送数据同步到审批中心。;;用户可以在审批中心中浏览三方系统同步过来的实例、任务、抄送信息，并且可以跳转回三方系统进行更详细的查看和操作，其中实例信息在【已发起】列表，任务信息在【待审批】和【已审批】列表，抄送信息在【抄送我】列表;;:::html;<img src="//sf3-cn.feishucdn.com/obj/open-platform-opendoc/9dff4434afbeb0ef69de7f36b9a6e995_z5iwmTzEgg.png" alt="" style="zoom:17%;" />;;;<img src="//sf3-cn.feishucdn.com/obj/open-platform-opendoc/ca6e0e984a7a6d64e1b16a0bac4bf868_tfqjCiaJQM.png" alt="" style="zoom:17%;" />;;;<img src="//sf3-cn.feishucdn.com/obj/open-platform-opendoc/529377e238df78d391bbd22e962ad195_T7eefLI1GA.png" alt="" style="zoom:17%;" />;:::;;对于审批任务，三方系统也可以配置审批任务的回调接口，这样审批人可以在审批中心中直接进行审批操作，审批中心会回调三方系统，三方系统收到回调后更新任务信息，并将新的任务信息同步回审批中心，形成闭环。;;:::html;<img src="//sf3-cn.feishucdn.com/obj/open-platform-opendoc/721c35428bc1187db3318c572f9979ad_je75QpElcg.png" alt=""  style="zoom:25%;" />;:::;<br>
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
                            locale: "zh-CN" | "en-US" | "ja-JP";
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
                                        locale: "zh-CN" | "en-US" | "ja-JP";
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
         * 三方审批任务
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_task/list document }
             *
             * 获取三方审批任务状态
             *
             * 该接口用于获取三方审批的状态。用户传入查询条件，接口返回满足条件的审批实例的状态。该接口支持多种参数的组合，包括如下组合：;;1.通过 instance_ids 获取指定实例的任务状态;;2.通过 user_ids 获取指定用户的任务状态;;3.通过 status 获取指定状态的所有任务;;4.通过page_token获取下一批数据
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
         * 审批查询
         */
        instance: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=add_sign&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/ukTM5UjL5ETO14SOxkTN/approval-task-addsign document }
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=cancel&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/cancel document }
             *
             * 审批实例撤回
             *
             * 对于状态为“审批中”的单个审批实例进行撤销操作，撤销后审批流程结束
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=cc&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/cc document }
             *
             * 审批实例抄送
             *
             * 通过接口可以将当前审批实例抄送给其他人。
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/create document }
             *
             * 创建审批实例
             *
             * 创建一个审批实例，调用方需对审批定义的表单有详细了解，将按照定义的表单结构，将表单 Value 通过接口传入
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
                            locale: "zh-CN" | "en-US" | "ja-JP";
                            texts: Array<{ key: string; value: string }>;
                            is_default: boolean;
                        }>;
                        title?: string;
                        title_display_method?: number;
                        node_auto_approval_list?: Array<{
                            node_id_type?: "CUSTOM" | "NON_CUSTOM";
                            node_id?: string;
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
                            data?: { instance_code: string };
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=get&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/get document }
             *
             * 获取单个审批实例详情
             *
             * 通过审批实例 Instance Code  获取审批实例详情。Instance Code 由 [批量获取审批实例](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/list) 接口获取。
             */
            get: async (
                payload?: {
                    params?: {
                        locale?: "zh-CN" | "en-US" | "ja-JP";
                        user_id?: string;
                        user_id_type?: "user_id" | "open_id" | "union_id";
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/list document }
             *
             * 批量获取审批实例ID
             *
             * 根据 approval_code 批量获取审批实例的 instance_code，用于拉取租户下某个审批定义的全部审批实例。默认以审批创建时间先后顺序排列
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=preview&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/ukTM5UjL5ETO14SOxkTN/approval-preview document }
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
                        locale?: "zh-CN" | "en-US" | "ja-JP";
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/query document }
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
                        locale?: "zh-CN" | "en-US" | "ja-JP";
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/search_cc document }
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
                        locale?: "zh-CN" | "en-US" | "ja-JP";
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=specified_rollback&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/specified_rollback document }
             *
             * 审批任务退回
             *
             * 从当前审批任务，退回到已审批的一个或多个任务节点。退回后，已审批节点重新生成审批任务
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
        },
        /**
         * 原生审批评论
         */
        instanceComment: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/create document }
             *
             * 创建评论
             *
             * 在某审批实例下创建、修改评论或评论回复（不包含审批同意、拒绝、转交等附加的理由或意见）。
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/delete document }
             *
             * 删除评论
             *
             * 逻辑删除某审批实例下的一条评论或评论回复（不包含审批同意、拒绝、转交等附加的理由或意见）。
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/list document }
             *
             * 获取评论
             *
             * 根据 Instance Code 获取某个审批实例下的全部评论与评论回复（不包含审批同意、拒绝、转交等附加的理由或意见）。
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=remove&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/remove document }
             *
             * 清空评论
             *
             * 删除某审批实例下的全部评论与评论回复。
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
        },
        /**
         * 审批查询
         */
        task: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=approve&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/approve document }
             *
             * 审批任务同意
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/query document }
             *
             * 用户角度列出任务
             *
             * 根据用户和任务分组查询任务列表
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=reject&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/reject document }
             *
             * 审批任务拒绝
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/resubmit document }
             *
             * 审批任务重新提交
             *
             * 对于单个退回到发起人的审批任务进行重新发起操作。发起后审批流程会流转到下一个审批人。
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/search document }
             *
             * 查询任务列表
             *
             * 该接口通过不同条件查询审批系统中符合条件的审批任务列表
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
                        locale?: "zh-CN" | "en-US" | "ja-JP";
                        task_status_list?: Array<string>;
                        order?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=transfer&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/transfer document }
             *
             * 审批任务转交
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
        },
        v4: {
            /**
             * 事件
             */
            approval: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/create document }
                 *
                 * 创建审批定义
                 *
                 * 用于通过接口创建简单的审批定义，可以灵活指定定义的基础信息、表单和流程等。创建成功后，不支持从审批管理后台删除该定义。不推荐企业自建应用使用，如有需要尽量联系管理员在审批管理后台创建定义。
                 *
                 * 接口谨慎调用，创建后的审批定义无法停用/删除
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
                                locale: "zh-CN" | "en-US" | "ja-JP";
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/get document }
                 *
                 * 查看审批定义
                 *
                 * 根据 Approval Code 获取某个审批定义的详情，用于构造创建审批实例的请求。
                 */
                get: async (
                    payload?: {
                        params?: {
                            locale?: "zh-CN" | "en-US" | "ja-JP";
                            with_admin_id?: boolean;
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=subscribe&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/subscribe document }
                 *
                 * 订阅审批事件
                 *
                 * 应用订阅 approval_code 后，该应用就可以收到该审批定义对应实例的事件通知。同一应用只需要订阅一次，无需重复订阅。;;当应用不希望再收到审批事件时，可以使用取消订阅接口进行取消，取消后将不再给应用推送消息。;;订阅和取消订阅都是应用维度的，多个应用可以同时订阅同一个 approval_code，每个应用都能收到审批事件。
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=approval&apiName=unsubscribe&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/approval/unsubscribe document }
                 *
                 * 取消订阅审批事件
                 *
                 * 取消订阅 approval_code 后，无法再收到该审批定义对应实例的事件通知
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
            },
            /**
             * 三方审批定义
             */
            externalApproval: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_approval&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_approval/create document }
                 *
                 * 三方审批定义创建
                 *
                 * 审批定义是审批的描述，包括审批名称、图标、描述等基础信息。创建好审批定义，用户就可以在审批应用的发起页中看到审批，如果用户点击发起，则会跳转到配置的发起三方系统地址去发起审批。;;另外，审批定义还配置了审批操作时的回调地址：审批人在待审批列表中进行【同意】【拒绝】操作时，审批中心会调用回调地址通知三方系统。
                 *
                 * 注意，审批中心不负责审批流程的流转，只负责展示、操作、消息通知。因此审批定义创建时没有审批流程的信息。
                 */
                create: async (
                    payload?: {
                        data: {
                            approval_name: string;
                            approval_code: string;
                            group_code: string;
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
                                locale: "zh-CN" | "en-US" | "ja-JP";
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_approval&apiName=get&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=approval&resource=external_approval&version=v4 document }
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
                                        locale: "zh-CN" | "en-US" | "ja-JP";
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
            },
            /**
             * 三方审批实例
             */
            externalInstance: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=external_instance&apiName=check&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_instance/check document }
                 *
                 * 三方审批实例校验
                 *
                 * 校验三方审批实例数据，用于判断服务端数据是否为最新的。用户提交实例最新更新时间，如果服务端不存在该实例，或者服务端实例更新时间不是最新的，则返回对应实例 id。;;例如，用户可以每隔5分钟，将最近5分钟产生的实例使用该接口进行对比。
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_instance/create document }
                 *
                 * 三方审批实例同步
                 *
                 * 审批中心不负责审批的流转，审批的流转在三方系统，三方系统在审批流转后生成的审批实例、审批任务、审批抄送数据同步到审批中心。;;用户可以在审批中心中浏览三方系统同步过来的实例、任务、抄送信息，并且可以跳转回三方系统进行更详细的查看和操作，其中实例信息在【已发起】列表，任务信息在【待审批】和【已审批】列表，抄送信息在【抄送我】列表;;:::html;<img src="//sf3-cn.feishucdn.com/obj/open-platform-opendoc/9dff4434afbeb0ef69de7f36b9a6e995_z5iwmTzEgg.png" alt="" style="zoom:17%;" />;;;<img src="//sf3-cn.feishucdn.com/obj/open-platform-opendoc/ca6e0e984a7a6d64e1b16a0bac4bf868_tfqjCiaJQM.png" alt="" style="zoom:17%;" />;;;<img src="//sf3-cn.feishucdn.com/obj/open-platform-opendoc/529377e238df78d391bbd22e962ad195_T7eefLI1GA.png" alt="" style="zoom:17%;" />;:::;;对于审批任务，三方系统也可以配置审批任务的回调接口，这样审批人可以在审批中心中直接进行审批操作，审批中心会回调三方系统，三方系统收到回调后更新任务信息，并将新的任务信息同步回审批中心，形成闭环。;;:::html;<img src="//sf3-cn.feishucdn.com/obj/open-platform-opendoc/721c35428bc1187db3318c572f9979ad_je75QpElcg.png" alt=""  style="zoom:25%;" />;:::;<br>
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
                                locale: "zh-CN" | "en-US" | "ja-JP";
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
                                            locale: "zh-CN" | "en-US" | "ja-JP";
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
             * 三方审批任务
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/external_task/list document }
                 *
                 * 获取三方审批任务状态
                 *
                 * 该接口用于获取三方审批的状态。用户传入查询条件，接口返回满足条件的审批实例的状态。该接口支持多种参数的组合，包括如下组合：;;1.通过 instance_ids 获取指定实例的任务状态;;2.通过 user_ids 获取指定用户的任务状态;;3.通过 status 获取指定状态的所有任务;;4.通过page_token获取下一批数据
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
             * 审批查询
             */
            instance: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=add_sign&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/ukTM5UjL5ETO14SOxkTN/approval-task-addsign document }
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=cancel&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/cancel document }
                 *
                 * 审批实例撤回
                 *
                 * 对于状态为“审批中”的单个审批实例进行撤销操作，撤销后审批流程结束
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=cc&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/cc document }
                 *
                 * 审批实例抄送
                 *
                 * 通过接口可以将当前审批实例抄送给其他人。
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/create document }
                 *
                 * 创建审批实例
                 *
                 * 创建一个审批实例，调用方需对审批定义的表单有详细了解，将按照定义的表单结构，将表单 Value 通过接口传入
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
                                locale: "zh-CN" | "en-US" | "ja-JP";
                                texts: Array<{ key: string; value: string }>;
                                is_default: boolean;
                            }>;
                            title?: string;
                            title_display_method?: number;
                            node_auto_approval_list?: Array<{
                                node_id_type?: "CUSTOM" | "NON_CUSTOM";
                                node_id?: string;
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
                                data?: { instance_code: string };
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=get&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/get document }
                 *
                 * 获取单个审批实例详情
                 *
                 * 通过审批实例 Instance Code  获取审批实例详情。Instance Code 由 [批量获取审批实例](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/list) 接口获取。
                 */
                get: async (
                    payload?: {
                        params?: {
                            locale?: "zh-CN" | "en-US" | "ja-JP";
                            user_id?: string;
                            user_id_type?: "user_id" | "open_id" | "union_id";
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/list document }
                 *
                 * 批量获取审批实例ID
                 *
                 * 根据 approval_code 批量获取审批实例的 instance_code，用于拉取租户下某个审批定义的全部审批实例。默认以审批创建时间先后顺序排列
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=preview&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/ukTM5UjL5ETO14SOxkTN/approval-preview document }
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
                            locale?: "zh-CN" | "en-US" | "ja-JP";
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/query document }
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
                            locale?: "zh-CN" | "en-US" | "ja-JP";
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/search_cc document }
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
                            locale?: "zh-CN" | "en-US" | "ja-JP";
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance&apiName=specified_rollback&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance/specified_rollback document }
                 *
                 * 审批任务退回
                 *
                 * 从当前审批任务，退回到已审批的一个或多个任务节点。退回后，已审批节点重新生成审批任务
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
            },
            /**
             * 原生审批评论
             */
            instanceComment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/create document }
                 *
                 * 创建评论
                 *
                 * 在某审批实例下创建、修改评论或评论回复（不包含审批同意、拒绝、转交等附加的理由或意见）。
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/delete document }
                 *
                 * 删除评论
                 *
                 * 逻辑删除某审批实例下的一条评论或评论回复（不包含审批同意、拒绝、转交等附加的理由或意见）。
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/list document }
                 *
                 * 获取评论
                 *
                 * 根据 Instance Code 获取某个审批实例下的全部评论与评论回复（不包含审批同意、拒绝、转交等附加的理由或意见）。
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=instance.comment&apiName=remove&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/instance-comment/remove document }
                 *
                 * 清空评论
                 *
                 * 删除某审批实例下的全部评论与评论回复。
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
            },
            /**
             * 审批查询
             */
            task: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=approve&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/approve document }
                 *
                 * 审批任务同意
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/query document }
                 *
                 * 用户角度列出任务
                 *
                 * 根据用户和任务分组查询任务列表
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=reject&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/reject document }
                 *
                 * 审批任务拒绝
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/resubmit document }
                 *
                 * 审批任务重新提交
                 *
                 * 对于单个退回到发起人的审批任务进行重新发起操作。发起后审批流程会流转到下一个审批人。
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/search document }
                 *
                 * 查询任务列表
                 *
                 * 该接口通过不同条件查询审批系统中符合条件的审批任务列表
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
                            locale?: "zh-CN" | "en-US" | "ja-JP";
                            task_status_list?: Array<string>;
                            order?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=approval&resource=task&apiName=transfer&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/approval-v4/task/transfer document }
                 *
                 * 审批任务转交
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
            },
        },
    };
}
