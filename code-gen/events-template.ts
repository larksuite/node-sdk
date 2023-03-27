/* eslint-disable no-unused-vars */
import { IOtherEventHandles } from "./other-event-handles";

// auto gen
export interface IHandles extends IOtherEventHandles {
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/access_record/events/created document }
     *
     * 新增门禁访问记录
     *
     * 门禁设备识别用户成功后发送该事件给订阅应用。
     */
    "acs.access_record.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        access_record_id?: string;
        user_id?: { union_id?: string; user_id?: string; open_id?: string };
        device_id?: string;
        is_clock_in?: boolean;
        is_door_open?: boolean;
        access_time?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/acs-v1/user/events/updated document }
     *
     * 用户信息变更
     *
     * 智能门禁用户特征值变化时，发送此事件。
     */
    "acs.user.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        user_id?: { union_id?: string; user_id?: string; open_id?: string };
        card?: number;
        face_uploaded?: boolean;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/events/audit document }
     *
     * 应用审核
     *
     * 通过订阅该事件，可接收应用审核（通过 / 拒绝）事件
     */
    "application.application.app_version.audit_v6"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        version_id?: string;
        creator_id?: { union_id?: string; user_id?: string; open_id?: string };
        operation?: "audited" | "reject";
        remark?: string;
        audit_source?: "administrator" | "auto";
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/events/publish_apply document }
     *
     * 申请发布应用
     *
     * 通过订阅该事件，可接收应用提交发布申请事件
     */
    "application.application.app_version.publish_apply_v6"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        online_version?: {
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
            }>;
            back_home_url?: string;
            i18n?: Array<{
                i18n_key: "zh_cn" | "en_us" | "ja_jp";
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
                web_app?: { pc_url?: string; mobile_url?: string };
                bot?: { card_request_url?: string };
                workplace_widgets?: Array<{ min_lark_version?: string }>;
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
                        i18n_key: "zh_cn" | "en_us" | "ja_jp";
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
                        i18n_key?: "zh_cn" | "en_us" | "ja_jp";
                        name?: string;
                    }>;
                    mobile_icon_url?: string;
                    pc_icon_url?: string;
                }>;
                message_action?: {
                    pc_app_link?: string;
                    mobile_app_link?: string;
                    i18n?: Array<{
                        i18n_key?: "zh_cn" | "en_us" | "ja_jp";
                        name?: string;
                    }>;
                };
                plus_menu?: { pc_app_link?: string; mobile_app_link?: string };
            };
            remark?: {
                remark?: string;
                update_remark?: string;
                visibility?: {
                    is_all?: boolean;
                    visible_list?: {
                        open_ids?: Array<{
                            union_id?: string;
                            user_id?: string;
                            open_id?: string;
                        }>;
                        department_ids?: Array<string>;
                    };
                    invisible_list?: {
                        open_ids?: Array<{
                            union_id?: string;
                            user_id?: string;
                            open_id?: string;
                        }>;
                        department_ids?: Array<string>;
                    };
                };
            };
        };
        under_audit_version?: {
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
            }>;
            back_home_url?: string;
            i18n?: Array<{
                i18n_key: "zh_cn" | "en_us" | "ja_jp";
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
                web_app?: { pc_url?: string; mobile_url?: string };
                bot?: { card_request_url?: string };
                workplace_widgets?: Array<{ min_lark_version?: string }>;
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
                        i18n_key: "zh_cn" | "en_us" | "ja_jp";
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
                        i18n_key?: "zh_cn" | "en_us" | "ja_jp";
                        name?: string;
                    }>;
                    mobile_icon_url?: string;
                    pc_icon_url?: string;
                }>;
                message_action?: {
                    pc_app_link?: string;
                    mobile_app_link?: string;
                    i18n?: Array<{
                        i18n_key?: "zh_cn" | "en_us" | "ja_jp";
                        name?: string;
                    }>;
                };
                plus_menu?: { pc_app_link?: string; mobile_app_link?: string };
            };
            remark?: {
                remark?: string;
                update_remark?: string;
                visibility?: {
                    is_all?: boolean;
                    visible_list?: {
                        open_ids?: Array<{
                            union_id?: string;
                            user_id?: string;
                            open_id?: string;
                        }>;
                        department_ids?: Array<string>;
                    };
                    invisible_list?: {
                        open_ids?: Array<{
                            union_id?: string;
                            user_id?: string;
                            open_id?: string;
                        }>;
                        department_ids?: Array<string>;
                    };
                };
            };
        };
        app_status?: number;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-app_version/events/publish_revoke document }
     *
     * 撤回应用发布申请
     *
     * 通过订阅该事件，可接收应用撤回发布申请事件
     */
    "application.application.app_version.publish_revoke_v6"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        creator_id?: { union_id?: string; user_id?: string; open_id?: string };
        version_id?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/events/created document }
     *
     * 应用创建
     *
     * 当企业内有新的应用被创建时推送此事件
     */
    "application.application.created_v6"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        name?: string;
        description?: string;
        avatar?: string;
        app_scene_type?: number;
        primary_language?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-feedback/events/created document }
     *
     * 新增应用反馈
     *
     * 当应用收到新反馈时，触发该事件
     */
    "application.application.feedback.created_v6"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        user_id?: { union_id?: string; user_id?: string; open_id?: string };
        feedback_time?: string;
        tenant_name?: string;
        feedback_type?: number;
        fault_type?: Array<number>;
        fault_time?: string;
        source?: number;
        contact?: string;
        description?: string;
        images?: Array<string>;
        feedback_id?: string;
        feedback_path?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application-feedback/events/updated document }
     *
     * 反馈更新
     *
     * 当反馈的处理状态被更新时，触发该事件
     */
    "application.application.feedback.updated_v6"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        feedback_ids?: Array<string>;
        status?: number;
        update_time?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/event/app-availability-scope-extended document }
     */
    "application.application.visibility.added_v6"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        users?: Array<{
            user_id?: { union_id?: string; user_id?: string; open_id?: string };
        }>;
        source?: number;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/ukTMukTMukTM/uIDO24iM4YjLygjN/event/custom-approval-event document }
     */
    "approval.approval.updated_v4"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        object?: {
            approval_id?: string;
            approval_code?: string;
            version_id?: string;
            widget_group_type?: number;
            form_definition_id?: string;
            process_obj?: string;
            timestamp?: string;
            extra?: string;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/events/created document }
     *
     * ACL新建
     *
     * 当被订阅的日历上有ACL被创建时触发此事件。
     *
     * 特殊说明：应用首先需要调用上述接口建立订阅关系。
     */
    "calendar.calendar.acl.created_v4"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        acl_id: string;
        role: "unknown" | "free_busy_reader" | "reader" | "writer" | "owner";
        scope: {
            type: "user";
            user_id?: { union_id?: string; user_id?: string; open_id?: string };
        };
        user_id_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-acl/events/deleted document }
     *
     * ACL移除
     *
     * 当被订阅的日历上有ACL被删除时触发此事件。
     *
     * 特殊说明：应用首先需要调用上述接口建立订阅关系。
     */
    "calendar.calendar.acl.deleted_v4"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        acl_id: string;
        role: "unknown" | "free_busy_reader" | "reader" | "writer" | "owner";
        scope: {
            type: "user";
            user_id?: { union_id?: string; user_id?: string; open_id?: string };
        };
        user_id_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/events/changed document }
     *
     * 日历变更
     *
     * 当订阅用户的日历列表有日历变动时触发此事件。
     *
     * 应用首先需要调用上述接口建立订阅关系。应用收到该事件后，使用事件的 user_list 字段中的用户对应的 user_access_token 调用[获取日历列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/list)接口拉取增量的变更数据
     */
    "calendar.calendar.changed_v4"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        user_id_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/events/changed document }
     *
     * 日程变更
     *
     * 当被订阅的用户日历下有日程变更时触发此事件。
     *
     * 应用首先需要调用[订阅日程变更事件接口](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/subscription)建立订阅关系。应用收到该事件后，使用事件的 user_list 字段中的用户对应的 user_access_token 调用[获取日程列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/list)接口拉取事件中 calendar_id 字段对应的日历下的日程数据
     */
    "calendar.calendar.event.changed_v4"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        calendar_id?: string;
        user_id_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/custom_attr_event/events/updated document }
     *
     * 成员字段变更
     *
     * 通过该事件订阅成员字段变更。old_object 展示更新字段的原始值。
     *
     * 触发事件的动作有「打开/关闭」开关、「增加/删除」成员字段。
     */
    "contact.custom_attr_event.updated_v3"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        object?: {
            contact_field_key?: Array<string>;
            allow_open_query?: boolean;
        };
        old_object?: {
            contact_field_key?: Array<string>;
            allow_open_query?: boolean;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/events/created document }
     *
     * 部门被创建
     *
     * 创建通讯录部门时发送该事件给订阅应用。
     *
     * 只有当应用拥有被改动字段的数据权限时，才会接收到事件。具体的数据权限与字段的关系请参考[应用权限](https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN)，或查看事件体参数列表的字段描述。
     */
    "contact.department.created_v3"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        object?: {
            name: string;
            parent_department_id: string;
            department_id?: string;
            open_department_id?: string;
            leader_user_id?: string;
            chat_id?: string;
            order?: number;
            unit_ids?: Array<string>;
            status?: { is_deleted?: boolean };
            leaders?: Array<{ leaderType: number; leaderID: string }>;
            department_hrbps?: Array<{
                union_id?: string;
                user_id?: string;
                open_id?: string;
            }>;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/events/deleted document }
     *
     * 部门被删除
     *
     * 订阅这一事件可以获得被删除部门的信息。
     *
     * 只有当应用拥有被改动字段的数据权限时，才会接收到事件。具体的数据权限与字段的关系请参考[应用权限](https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN)，或查看事件体参数列表的字段描述。
     */
    "contact.department.deleted_v3"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        object?: {
            name: string;
            parent_department_id: string;
            department_id?: string;
            open_department_id?: string;
            leader_user_id?: string;
            chat_id?: string;
            order?: number;
            unit_ids?: Array<string>;
            status?: { is_deleted?: boolean };
            leaders?: Array<{ leaderType: number; leaderID: string }>;
            department_hrbps?: Array<{
                union_id?: string;
                user_id?: string;
                open_id?: string;
            }>;
        };
        old_object?: {
            status?: { is_deleted?: boolean };
            open_department_id?: string;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/events/updated document }
     *
     * 部门信息被修改
     *
     * 通过该事件订阅部门更新。`old_object`只展示被更新字段的原始值。应用身份访问通讯录的权限为历史版本，不推荐申请。
     *
     * 只有当应用拥有被改动字段的数据权限时，才会接收到事件。具体的数据权限与字段的关系请参考[应用权限](https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN)，或查看事件体参数列表的字段描述。
     */
    "contact.department.updated_v3"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        object?: {
            name: string;
            parent_department_id: string;
            department_id?: string;
            open_department_id?: string;
            leader_user_id?: string;
            chat_id?: string;
            order?: number;
            unit_ids?: Array<string>;
            status?: { is_deleted?: boolean };
            leaders?: Array<{ leaderType: number; leaderID: string }>;
            department_hrbps?: Array<{
                union_id?: string;
                user_id?: string;
                open_id?: string;
            }>;
        };
        old_object?: {
            name: string;
            parent_department_id: string;
            department_id?: string;
            open_department_id?: string;
            leader_user_id?: string;
            chat_id?: string;
            order?: number;
            unit_ids?: Array<string>;
            status?: { is_deleted?: boolean };
            leaders?: Array<{ leaderType: number; leaderID: string }>;
            department_hrbps?: Array<{
                union_id?: string;
                user_id?: string;
                open_id?: string;
            }>;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/events/actived document }
     *
     * 启用人员类型事件
     *
     * 启用人员类型会发出对应事件。
     */
    "contact.employee_type_enum.actived_v3"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        old_enum?: {
            enum_id?: string;
            enum_value?: string;
            content: string;
            enum_type: number;
            enum_status: number;
            i18n_content?: Array<{ locale?: string; value?: string }>;
        };
        new_enum?: {
            enum_id?: string;
            enum_value?: string;
            content: string;
            enum_type: number;
            enum_status: number;
            i18n_content?: Array<{ locale?: string; value?: string }>;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/events/created document }
     *
     * 新建人员类型事件
     *
     * 新建人员类型会发出对应事件。
     */
    "contact.employee_type_enum.created_v3"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        new_enum?: {
            enum_id?: string;
            enum_value?: string;
            content: string;
            enum_type: number;
            enum_status: number;
            i18n_content?: Array<{ locale?: string; value?: string }>;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/events/deactivated document }
     *
     * 停用人员类型事件
     *
     * 停用人员类型会发出对应事件。
     */
    "contact.employee_type_enum.deactivated_v3"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        old_enum?: {
            enum_id?: string;
            enum_value?: string;
            content: string;
            enum_type: number;
            enum_status: number;
            i18n_content?: Array<{ locale?: string; value?: string }>;
        };
        new_enum?: {
            enum_id?: string;
            enum_value?: string;
            content: string;
            enum_type: number;
            enum_status: number;
            i18n_content?: Array<{ locale?: string; value?: string }>;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/events/deleted document }
     *
     * 删除人员类型事件
     *
     * 删除人员类型会发出对应事件。
     */
    "contact.employee_type_enum.deleted_v3"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        old_enum?: {
            enum_id?: string;
            enum_value?: string;
            content: string;
            enum_type: number;
            enum_status: number;
            i18n_content?: Array<{ locale?: string; value?: string }>;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/employee_type_enum/events/updated document }
     *
     * 修改人员类型名称事件
     *
     * 修改人员类型名称会发出对应事件。
     */
    "contact.employee_type_enum.updated_v3"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        old_enum?: {
            enum_id?: string;
            enum_value?: string;
            content: string;
            enum_type: number;
            enum_status: number;
            i18n_content?: Array<{ locale?: string; value?: string }>;
        };
        new_enum?: {
            enum_id?: string;
            enum_value?: string;
            content: string;
            enum_type: number;
            enum_status: number;
            i18n_content?: Array<{ locale?: string; value?: string }>;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/scope/events/updated document }
     *
     * 通讯录范围权限被更新
     *
     * 当应用通讯录范围权限发生变更时，订阅这个事件的应用会收到事件。
     */
    "contact.scope.updated_v3"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        added?: {
            departments?: Array<{
                name: string;
                i18n_name?: { zh_cn?: string; ja_jp?: string; en_us?: string };
                parent_department_id: string;
                department_id?: string;
                open_department_id?: string;
                leader_user_id?: string;
                chat_id?: string;
                order?: string;
                unit_ids?: Array<string>;
                member_count?: number;
                status?: { is_deleted?: boolean };
                leaders?: Array<{ leaderType: number; leaderID: string }>;
                group_chat_employee_types?: Array<number>;
            }>;
            users?: Array<{
                union_id?: string;
                user_id?: string;
                open_id?: string;
                name: string;
                en_name?: string;
                nickname?: string;
                email?: string;
                mobile: string;
                gender?: number;
                avatar?: {
                    avatar_72?: string;
                    avatar_240?: string;
                    avatar_640?: string;
                    avatar_origin?: string;
                };
                status?: {
                    is_frozen?: boolean;
                    is_resigned?: boolean;
                    is_activated?: boolean;
                    is_exited?: boolean;
                    is_unjoin?: boolean;
                };
                leader_user_id?: string;
                city?: string;
                country?: string;
                work_station?: string;
                join_time?: number;
                employee_no?: string;
                employee_type?: number;
                positions?: Array<{
                    position_code?: string;
                    position_name?: string;
                    department_id?: string;
                    leader_user_id?: string;
                    leader_position_code?: string;
                    is_major?: boolean;
                }>;
                custom_attrs?: Array<{
                    type?: string;
                    id?: string;
                    value?: {
                        text?: string;
                        url?: string;
                        pc_url?: string;
                        option_id?: string;
                        option_value?: string;
                        name?: string;
                        picture_url?: string;
                        generic_user?: { id: string; type: number };
                    };
                }>;
                enterprise_email?: string;
                description?: string;
                job_title?: string;
                need_send_notification?: boolean;
                notification_option?: {
                    channels?: Array<string>;
                    language?: "zh-CN" | "en-US" | "ja-JP";
                };
                is_frozen?: boolean;
                geo?: string;
                job_level_id?: string;
                job_family_id?: string;
                subscription_ids?: Array<string>;
                assign_info?: Array<{
                    subscription_id?: string;
                    license_plan_key?: string;
                    product_name?: string;
                    i18n_name?: {
                        zh_cn?: string;
                        ja_jp?: string;
                        en_us?: string;
                    };
                    start_time?: string;
                    end_time?: string;
                }>;
                department_path?: Array<{
                    department_id?: string;
                    department_name?: {
                        name?: string;
                        i18n_name?: {
                            zh_cn?: string;
                            ja_jp?: string;
                            en_us?: string;
                        };
                    };
                    department_path?: {
                        department_ids?: Array<string>;
                        department_path_name?: {
                            name?: string;
                            i18n_name?: {
                                zh_cn?: string;
                                ja_jp?: string;
                                en_us?: string;
                            };
                        };
                    };
                }>;
            }>;
            user_groups?: Array<{
                user_group_id: string;
                name: string;
                type: number;
                member_count?: number;
                status?: number;
            }>;
        };
        removed?: {
            departments?: Array<{
                name: string;
                i18n_name?: { zh_cn?: string; ja_jp?: string; en_us?: string };
                parent_department_id: string;
                department_id?: string;
                open_department_id?: string;
                leader_user_id?: string;
                chat_id?: string;
                order?: string;
                unit_ids?: Array<string>;
                member_count?: number;
                status?: { is_deleted?: boolean };
                leaders?: Array<{ leaderType: number; leaderID: string }>;
                group_chat_employee_types?: Array<number>;
            }>;
            users?: Array<{
                union_id?: string;
                user_id?: string;
                open_id?: string;
                name: string;
                en_name?: string;
                nickname?: string;
                email?: string;
                mobile: string;
                gender?: number;
                avatar?: {
                    avatar_72?: string;
                    avatar_240?: string;
                    avatar_640?: string;
                    avatar_origin?: string;
                };
                status?: {
                    is_frozen?: boolean;
                    is_resigned?: boolean;
                    is_activated?: boolean;
                    is_exited?: boolean;
                    is_unjoin?: boolean;
                };
                leader_user_id?: string;
                city?: string;
                country?: string;
                work_station?: string;
                join_time?: number;
                employee_no?: string;
                employee_type?: number;
                positions?: Array<{
                    position_code?: string;
                    position_name?: string;
                    department_id?: string;
                    leader_user_id?: string;
                    leader_position_code?: string;
                    is_major?: boolean;
                }>;
                custom_attrs?: Array<{
                    type?: string;
                    id?: string;
                    value?: {
                        text?: string;
                        url?: string;
                        pc_url?: string;
                        option_id?: string;
                        option_value?: string;
                        name?: string;
                        picture_url?: string;
                        generic_user?: { id: string; type: number };
                    };
                }>;
                enterprise_email?: string;
                description?: string;
                job_title?: string;
                need_send_notification?: boolean;
                notification_option?: {
                    channels?: Array<string>;
                    language?: "zh-CN" | "en-US" | "ja-JP";
                };
                is_frozen?: boolean;
                geo?: string;
                job_level_id?: string;
                job_family_id?: string;
                subscription_ids?: Array<string>;
                assign_info?: Array<{
                    subscription_id?: string;
                    license_plan_key?: string;
                    product_name?: string;
                    i18n_name?: {
                        zh_cn?: string;
                        ja_jp?: string;
                        en_us?: string;
                    };
                    start_time?: string;
                    end_time?: string;
                }>;
                department_path?: Array<{
                    department_id?: string;
                    department_name?: {
                        name?: string;
                        i18n_name?: {
                            zh_cn?: string;
                            ja_jp?: string;
                            en_us?: string;
                        };
                    };
                    department_path?: {
                        department_ids?: Array<string>;
                        department_path_name?: {
                            name?: string;
                            i18n_name?: {
                                zh_cn?: string;
                                ja_jp?: string;
                                en_us?: string;
                            };
                        };
                    };
                }>;
            }>;
            user_groups?: Array<{
                user_group_id: string;
                name: string;
                type: number;
                member_count?: number;
                status?: number;
            }>;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/events/created document }
     *
     * 员工入职
     *
     * 通过该事件订阅员工入职。
     *
     * 只有当应用拥有被改动字段的数据权限时，才会接收到事件。具体的数据权限与字段的关系请参考[应用权限](https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN)，或查看事件体参数列表的字段描述。
     */
    "contact.user.created_v3"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        object?: {
            open_id?: string;
            union_id?: string;
            user_id?: string;
            name: string;
            en_name?: string;
            nickname?: string;
            email?: string;
            enterprise_email?: string;
            job_title?: string;
            mobile: string;
            mobile_visible?: boolean;
            gender?: number;
            avatar?: {
                avatar_72?: string;
                avatar_240?: string;
                avatar_640?: string;
                avatar_origin?: string;
            };
            status?: {
                is_frozen?: boolean;
                is_resigned?: boolean;
                is_activated?: boolean;
                is_exited?: boolean;
                is_unjoin?: boolean;
            };
            department_ids?: Array<string>;
            leader_user_id?: string;
            city?: string;
            country?: string;
            work_station?: string;
            join_time?: number;
            is_tenant_manager?: boolean;
            employee_no?: string;
            employee_type?: number;
            positions?: Array<{
                position_code?: string;
                position_name?: string;
                department_id?: string;
                leader_user_id?: string;
                leader_position_code?: string;
                is_major?: boolean;
            }>;
            orders?: Array<{
                department_id?: string;
                user_order?: number;
                department_order?: number;
            }>;
            time_zone?: string;
            custom_attrs?: Array<{
                type?: string;
                id?: string;
                value?: {
                    text?: string;
                    url?: string;
                    pc_url?: string;
                    option_id?: string;
                    option_value?: string;
                    name?: string;
                    picture_url?: string;
                    generic_user?: { id: string; type: number };
                };
            }>;
            job_level_id?: string;
            job_family_id?: string;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/events/deleted document }
     *
     * 员工离职
     *
     * 通过该事件订阅员工离职。应用身份访问通讯录的权限为历史版本，不推荐申请。
     *
     * 只有当应用拥有被改动字段的数据权限时，才会接收到事件。具体的数据权限与字段的关系请参考[应用权限](https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN)，或查看事件体参数列表的字段描述。
     */
    "contact.user.deleted_v3"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        object?: {
            open_id?: string;
            union_id?: string;
            user_id?: string;
            name: string;
            en_name?: string;
            nickname?: string;
            email?: string;
            enterprise_email?: string;
            job_title?: string;
            mobile: string;
            mobile_visible?: boolean;
            gender?: number;
            avatar?: {
                avatar_72?: string;
                avatar_240?: string;
                avatar_640?: string;
                avatar_origin?: string;
            };
            status?: {
                is_frozen?: boolean;
                is_resigned?: boolean;
                is_activated?: boolean;
                is_exited?: boolean;
                is_unjoin?: boolean;
            };
            department_ids?: Array<string>;
            leader_user_id?: string;
            city?: string;
            country?: string;
            work_station?: string;
            join_time?: number;
            is_tenant_manager?: boolean;
            employee_no?: string;
            employee_type?: number;
            positions?: Array<{
                position_code?: string;
                position_name?: string;
                department_id?: string;
                leader_user_id?: string;
                leader_position_code?: string;
                is_major?: boolean;
            }>;
            orders?: Array<{
                department_id?: string;
                user_order?: number;
                department_order?: number;
            }>;
            time_zone?: string;
            custom_attrs?: Array<{
                type?: string;
                id?: string;
                value?: {
                    text?: string;
                    url?: string;
                    pc_url?: string;
                    option_id?: string;
                    option_value?: string;
                    name?: string;
                    picture_url?: string;
                    generic_user?: { id: string; type: number };
                };
            }>;
            job_level_id?: string;
            job_family_id?: string;
        };
        old_object?: { department_ids?: Array<string>; open_id?: string };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/user/events/updated document }
     *
     * 员工变更
     *
     * 通过该事件订阅员工变更。old_object中只展示更新的字段的原始值。
     *
     * 只有当应用拥有被改动字段的数据权限时，才会接收到事件。具体的数据权限与字段的关系请参考[应用权限](https://open.feishu.cn/document/ukTMukTMukTM/uQjN3QjL0YzN04CN2cDN)，或查看事件体参数列表的字段描述。
     */
    "contact.user.updated_v3"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        object?: {
            open_id?: string;
            union_id?: string;
            user_id?: string;
            name: string;
            en_name?: string;
            nickname?: string;
            email?: string;
            enterprise_email?: string;
            job_title?: string;
            mobile: string;
            mobile_visible?: boolean;
            gender?: number;
            avatar?: {
                avatar_72?: string;
                avatar_240?: string;
                avatar_640?: string;
                avatar_origin?: string;
            };
            status?: {
                is_frozen?: boolean;
                is_resigned?: boolean;
                is_activated?: boolean;
                is_exited?: boolean;
                is_unjoin?: boolean;
            };
            department_ids?: Array<string>;
            leader_user_id?: string;
            city?: string;
            country?: string;
            work_station?: string;
            join_time?: number;
            is_tenant_manager?: boolean;
            employee_no?: string;
            employee_type?: number;
            positions?: Array<{
                position_code?: string;
                position_name?: string;
                department_id?: string;
                leader_user_id?: string;
                leader_position_code?: string;
                is_major?: boolean;
            }>;
            orders?: Array<{
                department_id?: string;
                user_order?: number;
                department_order?: number;
            }>;
            time_zone?: string;
            custom_attrs?: Array<{
                type?: string;
                id?: string;
                value?: {
                    text?: string;
                    url?: string;
                    pc_url?: string;
                    option_id?: string;
                    option_value?: string;
                    name?: string;
                    picture_url?: string;
                    generic_user?: { id: string; type: number };
                };
            }>;
            job_level_id?: string;
            job_family_id?: string;
        };
        old_object?: {
            open_id?: string;
            union_id?: string;
            user_id?: string;
            name: string;
            en_name?: string;
            nickname?: string;
            email?: string;
            enterprise_email?: string;
            job_title?: string;
            mobile: string;
            mobile_visible?: boolean;
            gender?: number;
            avatar?: {
                avatar_72?: string;
                avatar_240?: string;
                avatar_640?: string;
                avatar_origin?: string;
            };
            status?: {
                is_frozen?: boolean;
                is_resigned?: boolean;
                is_activated?: boolean;
                is_exited?: boolean;
                is_unjoin?: boolean;
            };
            department_ids?: Array<string>;
            leader_user_id?: string;
            city?: string;
            country?: string;
            work_station?: string;
            join_time?: number;
            is_tenant_manager?: boolean;
            employee_no?: string;
            employee_type?: number;
            positions?: Array<{
                position_code?: string;
                position_name?: string;
                department_id?: string;
                leader_user_id?: string;
                leader_position_code?: string;
                is_major?: boolean;
            }>;
            orders?: Array<{
                department_id?: string;
                user_order?: number;
                department_order?: number;
            }>;
            time_zone?: string;
            custom_attrs?: Array<{
                type?: string;
                id?: string;
                value?: {
                    text?: string;
                    url?: string;
                    pc_url?: string;
                    option_id?: string;
                    option_value?: string;
                    name?: string;
                    picture_url?: string;
                    generic_user?: { id: string; type: number };
                };
            }>;
            job_level_id?: string;
            job_family_id?: string;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/events/bitable_field_changed document }
     *
     * 多维表格字段变更
     *
     * 多维表格字段变更
     */
    "drive.file.bitable_field_changed_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        file_type?: string;
        file_token?: string;
        table_id?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        action_list?: Array<{
            action: string;
            field_id: string;
            before_value?: {
                id: string;
                name: string;
                type: number;
                description: string;
                property: {
                    formatter?: string;
                    date_formatter?: string;
                    auto_fill?: boolean;
                    multiple?: boolean;
                    table_id?: string;
                    table_name?: string;
                    back_field_name?: string;
                    input_type?: string;
                    back_field_id?: string;
                    auto_serial?: {
                        type: string;
                        options?: Array<{ type: string; value: string }>;
                    };
                    options?: Array<{
                        name?: string;
                        id?: string;
                        color?: number;
                    }>;
                    formula_expression?: string;
                };
            };
            after_value?: {
                id: string;
                name: string;
                type: number;
                description: string;
                property: {
                    formatter?: string;
                    date_formatter?: string;
                    auto_fill?: boolean;
                    multiple?: boolean;
                    table_id?: string;
                    table_name?: string;
                    back_field_name?: string;
                    input_type?: string;
                    back_field_id?: string;
                    auto_serial?: {
                        type: string;
                        options?: Array<{ type: string; value: string }>;
                    };
                    options?: Array<{
                        name?: string;
                        id?: string;
                        color?: number;
                    }>;
                    formula_expression?: string;
                };
            };
        }>;
        revision?: number;
        subscriber_id_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
        update_time?: number;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/event/file-deleted-completely document }
     */
    "drive.file.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        file_type?: string;
        file_token?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        subscriber_id_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/event/file-edited document }
     */
    "drive.file.edit_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        file_type?: string;
        file_token?: string;
        operator_id_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
        subscriber_id_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
        sheet_id?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/event/file-collaborator-add document }
     */
    "drive.file.permission_member_added_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        file_type?: string;
        file_token?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        user_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
        chat_list?: Array<string>;
        open_department_id_list?: Array<string>;
        subscriber_id_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/event/file-collaborator-remove document }
     */
    "drive.file.permission_member_removed_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        file_type?: string;
        file_token?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        user_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
        chat_list?: Array<string>;
        open_department_id_list?: Array<string>;
        subscriber_id_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/event/file-read document }
     */
    "drive.file.read_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        file_type?: string;
        file_token?: string;
        operator_id_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
        subscriber_id_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/event/file-title-update document }
     */
    "drive.file.title_updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        file_type?: string;
        file_token?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        subscriber_id_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/ukTMukTMukTM/uUDN04SN0QjL1QDN/event/delete-file-to-trash-can document }
     */
    "drive.file.trashed_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        file_type?: string;
        file_token?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        subscriber_id_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/notification/events/approve document }
     *
     * 审核事件
     *
     * Push审核状态通知事件
     */
    "helpdesk.notification.approve_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        notification_id?: string;
        helpdesk_id?: string;
        approve_status?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/events/created document }
     *
     * 工单创建事件
     *
     * 可监听服务台的工单创建事件。需使用订阅接口订阅：[事件订阅](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/event/overview)
     */
    "helpdesk.ticket.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        ticket_id: string;
        helpdesk_id?: string;
        guest?: {
            id?: { union_id?: string; user_id?: string; open_id?: string };
            name?: string;
        };
        stage?: number;
        status?: number;
        score?: number;
        created_at?: number;
        updated_at?: number;
        closed_at?: number;
        channel?: number;
        solve?: number;
        customized_fields?: Array<{
            id?: string;
            value?: string;
            key_name?: string;
            display_name?: string;
            position?: number;
            required?: boolean;
            editable?: boolean;
        }>;
        chat_id?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket/events/updated document }
     *
     * 工单状态变更事件
     *
     * 可监听工单状态和阶段变更事件。需使用订阅接口订阅：[事件订阅](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/event/overview)
     */
    "helpdesk.ticket.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        object?: {
            ticket_id: string;
            helpdesk_id?: string;
            guest?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                name?: string;
            };
            stage?: number;
            status?: number;
            score?: number;
            created_at?: number;
            updated_at?: number;
            closed_at?: number;
            channel?: number;
            solve?: number;
            customized_fields?: Array<{
                id?: string;
                value?: string;
                key_name?: string;
                display_name?: string;
                position?: number;
                required?: boolean;
                editable?: boolean;
            }>;
            chat_id?: string;
        };
        old_object?: { stage?: number; status?: number; updated_at?: number };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/ticket_message/events/created document }
     *
     * 工单消息事件
     *
     * 该消息事件属于工单消息事件。需使用订阅接口订阅：[事件订阅](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/event/overview)
     */
    "helpdesk.ticket_message.created_v1"?: (data: {
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        ticket_message_id: string;
        message_id: string;
        msg_type: string;
        position: string;
        sender_id?: { union_id?: string; user_id?: string; open_id?: string };
        sender_type: number;
        text: string;
        ticket?: {
            ticket_id: string;
            comments?: {
                content?: string;
                created_at?: number;
                id?: number;
                user_avatar_url?: string;
                user_name?: string;
                user_id?: number;
            };
            ticket_type?: number;
            status?: number;
            dissatisfaction_reason?: {
                zh_cn?: string;
                en_us?: string;
                ja_jp?: string;
            };
            customized_fields?: Array<{
                id?: string;
                value?: string;
                key_name?: string;
                display_name?: string;
                position?: number;
                required?: boolean;
                editable?: boolean;
            }>;
            agent_service_duration?: number;
            agent_first_response_duration?: number;
            bot_service_duration?: number;
            agent_resolution_time?: number;
            actual_processing_time?: number;
            agent_entry_time?: number;
            agent_first_response_time?: number;
            agent_last_response_time?: number;
            agent_owner?: {
                id?: string;
                avatar_url?: string;
                name?: string;
                email?: string;
                department?: string;
                city?: string;
                country?: string;
            };
        };
        event_id: string;
        chat_id?: string;
        content?: {
            content?: string;
            msg_type?: string;
            image_keys?: Array<string>;
            image_key?: string;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/event/application-stage-changed document }
     */
    "hire.application.stage_changed_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        application_id?: string;
        origin_stage_id?: string;
        target_stage_id?: string;
        update_time?: number;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/events/disbanded document }
     *
     * 群解散
     *
     * 群组被解散后触发此事件。
     *
     * 注意事项：;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 需要订阅 ==消息与群组== 分类下的 ==解散群== 事件;- 事件会向群内订阅了该事件的机器人进行推送
     */
    "im.chat.disbanded_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        chat_id?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        external?: boolean;
        operator_tenant_key?: string;
        name?: string;
        i18n_names?: { zh_cn?: string; en_us?: string; ja_jp?: string };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-member-bot/events/added document }
     *
     * 机器人进群
     *
     * 机器人被用户添加至群聊时触发此事件。
     *
     * 注意事项：;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 需要订阅 ==消息与群组== 分类下的 ==机器人进群== 事件;- 事件会向进群的机器人进行推送;- 机器人邀请机器人不会触发事件
     */
    "im.chat.member.bot.added_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        chat_id?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        external?: boolean;
        operator_tenant_key?: string;
        name?: string;
        i18n_names?: { zh_cn?: string; en_us?: string; ja_jp?: string };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-member-bot/events/deleted document }
     *
     * 机器人被移出群
     *
     * 机器人被移出群聊后触发此事件。
     *
     * 注意事项：;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 需要订阅 ==消息与群组== 分类下的 ==机器人被移出群== 事件;- 事件会向被移出群的机器人进行推送
     */
    "im.chat.member.bot.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        chat_id?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        external?: boolean;
        operator_tenant_key?: string;
        name?: string;
        i18n_names?: { zh_cn?: string; en_us?: string; ja_jp?: string };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-member-user/events/added document }
     *
     * 用户进群
     *
     * 新用户进群（包含话题群）触发此事件。
     *
     * 注意事项：;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 需要订阅 ==消息与群组== 分类下的 ==用户进群== 事件;- 事件会向群内订阅了该事件的机器人进行推送
     */
    "im.chat.member.user.added_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        chat_id?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        external?: boolean;
        operator_tenant_key?: string;
        users?: Array<{
            name?: string;
            tenant_key?: string;
            user_id?: { union_id?: string; user_id?: string; open_id?: string };
        }>;
        name?: string;
        i18n_names?: { zh_cn?: string; en_us?: string; ja_jp?: string };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-member-user/events/deleted document }
     *
     * 用户出群
     *
     * 用户主动退群或被移出群聊时推送事件。
     *
     * 注意事项：;- 应用需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)并且机器人所在群发生上述变化;- 机器人需要订阅 ==消息与群组== 分类下的 ==用户主动退群或被移出群聊== 事件;- 事件会向群内订阅了该事件的机器人进行推送
     */
    "im.chat.member.user.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        chat_id?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        external?: boolean;
        operator_tenant_key?: string;
        users?: Array<{
            name?: string;
            tenant_key?: string;
            user_id?: { union_id?: string; user_id?: string; open_id?: string };
        }>;
        name?: string;
        i18n_names?: { zh_cn?: string; en_us?: string; ja_jp?: string };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat-member-user/events/withdrawn document }
     *
     * 撤销拉用户进群
     *
     * 撤销拉用户进群后触发此事件。
     *
     * 注意事项：;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 需要订阅 ==消息与群组== 分类下的 ==撤销拉用户进群== 事件;- 事件会向群内订阅了该事件的机器人进行推送
     */
    "im.chat.member.user.withdrawn_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        chat_id?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        external?: boolean;
        operator_tenant_key?: string;
        users?: Array<{
            name?: string;
            tenant_key?: string;
            user_id?: { union_id?: string; user_id?: string; open_id?: string };
        }>;
        name?: string;
        i18n_names?: { zh_cn?: string; en_us?: string; ja_jp?: string };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/chat/events/updated document }
     *
     * 群配置修改
     *
     * 群组配置被修改后触发此事件，包含：;- 群主转移;- 群基本信息修改(群头像/群名称/群描述/群国际化名称);- 群权限修改(加人入群权限/群编辑权限/at所有人权限/群分享权限)。
     *
     * 注意事项：; - 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability);- 需要订阅 ==消息与群组== 分类下的 ==群配置修改== 事件;- 事件会向群内订阅了该事件的机器人进行推送
     */
    "im.chat.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        chat_id?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        external?: boolean;
        operator_tenant_key?: string;
        after_change?: {
            avatar?: string;
            name?: string;
            description?: string;
            i18n_names?: { zh_cn?: string; en_us?: string; ja_jp?: string };
            add_member_permission?: string;
            share_card_permission?: string;
            at_all_permission?: string;
            edit_permission?: string;
            membership_approval?: string;
            join_message_visibility?: string;
            leave_message_visibility?: string;
            moderation_permission?: string;
            owner_id?: {
                union_id?: string;
                user_id?: string;
                open_id?: string;
            };
            labels?: Array<string>;
        };
        before_change?: {
            avatar?: string;
            name?: string;
            description?: string;
            i18n_names?: { zh_cn?: string; en_us?: string; ja_jp?: string };
            add_member_permission?: string;
            share_card_permission?: string;
            at_all_permission?: string;
            edit_permission?: string;
            membership_approval?: string;
            join_message_visibility?: string;
            leave_message_visibility?: string;
            moderation_permission?: string;
            owner_id?: {
                union_id?: string;
                user_id?: string;
                open_id?: string;
            };
            labels?: Array<string>;
        };
        moderator_list?: {
            added_member_list?: Array<{
                tenant_key?: string;
                user_id?: {
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                };
            }>;
            removed_member_list?: Array<{
                tenant_key?: string;
                user_id?: {
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                };
            }>;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/events/message_read document }
     *
     * 消息已读
     *
     * 用户阅读机器人发送的单聊消息后触发此事件。
     *
     * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 需要订阅 ==消息与群组== 分类下的 ==消息已读== 事件
     */
    "im.message.message_read_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        reader?: {
            reader_id?: {
                union_id?: string;
                user_id?: string;
                open_id?: string;
            };
            read_time: string;
            tenant_key?: string;
        };
        message_id_list?: Array<string>;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/events/created document }
     *
     * 新增消息表情回复
     *
     * 消息被添加某一个表情回复后触发此事件
     *
     * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 具备==获取单聊、群组消息== 或 ==获取与发送单聊、群组消息==权限，并订阅 ==消息与群组== 分类下的 ==消息被reaction== 事件才可接收推送;- 机器人只能收到所在群聊内的消息被添加表情回复事件
     */
    "im.message.reaction.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        message_id?: string;
        reaction_type?: { emoji_type: string };
        operator_type?: string;
        user_id?: { union_id?: string; user_id?: string; open_id?: string };
        action_time?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message-reaction/events/deleted document }
     *
     * 删除消息表情回复
     *
     * 消息被删除某一个表情回复后触发此事件
     *
     * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)  ;- 具备==获取单聊、群组消息== 或 ==获取与发送单聊、群组消息==权限，并订阅 ==消息与群组== 分类下的 ==消息被取消reaction== 事件才可接收推送;- 机器人只能收到所在群聊内的消息被删除表情回复事件
     */
    "im.message.reaction.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        message_id?: string;
        reaction_type?: { emoji_type: string };
        operator_type?: string;
        user_id?: { union_id?: string; user_id?: string; open_id?: string };
        action_time?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/events/recalled document }
     *
     * 消息撤回事件
     *
     * 消息被撤回后触发此事件。
     */
    "im.message.recalled_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        message_id?: string;
        chat_id?: string;
        recall_time?: string;
        recall_type?:
            | "message_owner"
            | "group_owner"
            | "group_manager"
            | "enterprise_manager";
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/events/receive document }
     *
     * 接收消息
     *
     * 机器人接收到用户发送的消息后触发此事件。
     *
     * 注意事项:;- 需要开启[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)，并订阅 ==消息与群组== 分类下的 ==接收消息v2.0== 事件才可接收推送;- 同时，将根据应用具备的权限，判断可推送的信息：;	- 当具备==获取用户发给机器人的单聊消息==权限或者==读取用户发给机器人的单聊消息（历史权限）==，可接收与机器人单聊会话中用户发送的所有消息;	- 当具备==获取群组中所有消息== 权限时，可接收与机器人所在群聊会话中用户发送的所有消息;	- 当具备==获取用户在群组中@机器人的消息== 权限或者==获取用户在群聊中@机器人的消息（历史权限）==，可接收机器人所在群聊中用户 @ 机器人的消息
     */
    "im.message.receive_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        sender: {
            sender_id?: {
                union_id?: string;
                user_id?: string;
                open_id?: string;
            };
            sender_type: string;
            tenant_key?: string;
        };
        message: {
            message_id: string;
            root_id?: string;
            parent_id?: string;
            create_time: string;
            chat_id: string;
            chat_type: string;
            message_type: string;
            content: string;
            mentions?: Array<{
                key: string;
                id: { union_id?: string; user_id?: string; open_id?: string };
                name: string;
                tenant_key?: string;
            }>;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "meeting_room.meeting_room.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        room_name?: string;
        room_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "meeting_room.meeting_room.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        room_name?: string;
        room_id?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/meeting_room-v1/meeting_room/events/status_changed document }
     *
     * 会议室状态信息变更
     *
     * 会议室状态信息变更将触发此事件。
     *
     * 了解事件订阅的使用场景和配置流程，请点击查看 [事件订阅概述](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)
     */
    "meeting_room.meeting_room.status_changed_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        room_name?: string;
        room_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "meeting_room.meeting_room.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        room_name?: string;
        room_id?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task-comment/events/updated document }
     *
     * 任务评论信息变更
     *
     * 当 APP 创建的任务评论信息发生变更时触发此事件，包括任务评论的创建、回复、更新、删除。
     */
    "task.task.comment.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        task_id?: string;
        comment_id?: string;
        parent_id?: string;
        obj_type?: number;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/events/update_tenant document }
     *
     * 任务信息变更（租户维度）
     *
     * APP 订阅此事件后可接收到该 APP 所在租户的所有来源接口创建的任务的变更事件。事件体为发生变更任务的相关用户的 open_id，可用此 open_id ，通过 获取任务列表接口获取与该用户相关的所有任务。
     */
    "task.task.update_tenant_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        user_id_list?: {
            user_id_list?: Array<{
                union_id?: string;
                user_id?: string;
                open_id?: string;
            }>;
        };
        task_id?: string;
        object_type?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/task-v1/task/events/updated document }
     *
     * 任务信息变更
     *
     * 当 APP 订阅此事件后可以接收到由该 APP 创建的任务发生的变更，包括任务标题、描述、截止时间、协作者、关注者、提醒时间、状态（完成或取消完成）。
     */
    "task.task.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        task_id?: string;
        obj_type?: number;
    }) => Promise<any> | any;
    /**
         
         */
    "vc.meeting.all_meeting_ended_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        meeting?: {
            id?: string;
            topic?: string;
            meeting_no?: string;
            meeting_source?: number;
            start_time?: string;
            end_time?: string;
            host_user?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
            owner?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
        };
        operator?: {
            id?: { union_id?: string; user_id?: string; open_id?: string };
            user_role?: number;
            user_type?: number;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "vc.meeting.all_meeting_started_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        meeting?: {
            id?: string;
            topic?: string;
            meeting_no?: string;
            meeting_source?: number;
            start_time?: string;
            end_time?: string;
            host_user?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
            owner?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
        };
        operator?: {
            id?: { union_id?: string; user_id?: string; open_id?: string };
            user_role?: number;
            user_type?: number;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/events/join_meeting document }
     *
     * 加入会议
     *
     * 发生在有人加入会议时
     */
    "vc.meeting.join_meeting_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        meeting?: {
            id?: string;
            topic?: string;
            meeting_no?: string;
            meeting_source?: number;
            start_time?: string;
            end_time?: string;
            host_user?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
            owner?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
        };
        operator?: {
            id?: { union_id?: string; user_id?: string; open_id?: string };
            user_role?: number;
            user_type?: number;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/events/leave_meeting document }
     *
     * 离开会议
     *
     * 发生在有人离开会议时
     */
    "vc.meeting.leave_meeting_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        meeting?: {
            id?: string;
            topic?: string;
            meeting_no?: string;
            meeting_source?: number;
            start_time?: string;
            end_time?: string;
            host_user?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
            owner?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
        };
        operator?: {
            id?: { union_id?: string; user_id?: string; open_id?: string };
            user_role?: number;
            user_type?: number;
        };
        leave_reason?: number;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/events/meeting_ended document }
     *
     * 会议结束
     *
     * 发生在会议结束时
     */
    "vc.meeting.meeting_ended_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        meeting?: {
            id?: string;
            topic?: string;
            meeting_no?: string;
            meeting_source?: number;
            start_time?: string;
            end_time?: string;
            host_user?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
            owner?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
        };
        operator?: {
            id?: { union_id?: string; user_id?: string; open_id?: string };
            user_role?: number;
            user_type?: number;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/events/meeting_started document }
     *
     * 会议开始
     *
     * 发生在会议开始时，目前仅提供预约会议的相关事件。
     */
    "vc.meeting.meeting_started_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        meeting?: {
            id?: string;
            topic?: string;
            meeting_no?: string;
            meeting_source?: number;
            start_time?: string;
            end_time?: string;
            host_user?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
            owner?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
        };
        operator?: {
            id?: { union_id?: string; user_id?: string; open_id?: string };
            user_role?: number;
            user_type?: number;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/events/recording_ended document }
     *
     * 录制停止
     *
     * 发生在录制结束时
     */
    "vc.meeting.recording_ended_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        meeting?: {
            id?: string;
            topic?: string;
            meeting_no?: string;
            meeting_source?: number;
            start_time?: string;
            end_time?: string;
            host_user?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
            owner?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
        };
        operator?: {
            id?: { union_id?: string; user_id?: string; open_id?: string };
            user_role?: number;
            user_type?: number;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/events/recording_ready document }
     *
     * 录制完成
     *
     * 发生在录制文件上传完毕时
     *
     * 收到该事件后，方可进行录制文件获取、授权等操作
     */
    "vc.meeting.recording_ready_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        meeting?: {
            id?: string;
            topic?: string;
            meeting_no?: string;
            meeting_source?: number;
            owner?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
            };
        };
        url?: string;
        duration?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/events/recording_started document }
     *
     * 录制开始
     *
     * 发生在开始录制时
     */
    "vc.meeting.recording_started_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        meeting?: {
            id?: string;
            topic?: string;
            meeting_no?: string;
            meeting_source?: number;
            start_time?: string;
            end_time?: string;
            host_user?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
            owner?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
        };
        operator?: {
            id?: { union_id?: string; user_id?: string; open_id?: string };
            user_role?: number;
            user_type?: number;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/events/share_ended document }
     *
     * 屏幕共享结束
     *
     * 发生在屏幕共享结束时
     */
    "vc.meeting.share_ended_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        meeting?: {
            id?: string;
            topic?: string;
            meeting_no?: string;
            meeting_source?: number;
            start_time?: string;
            end_time?: string;
            host_user?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
            owner?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
        };
        operator?: {
            id?: { union_id?: string; user_id?: string; open_id?: string };
            user_role?: number;
            user_type?: number;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting/events/share_started document }
     *
     * 屏幕共享开始
     *
     * 发生在屏幕共享开始时
     */
    "vc.meeting.share_started_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        meeting?: {
            id?: string;
            topic?: string;
            meeting_no?: string;
            meeting_source?: number;
            start_time?: string;
            end_time?: string;
            host_user?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
            owner?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
                user_role?: number;
                user_type?: number;
            };
        };
        operator?: {
            id?: { union_id?: string; user_id?: string; open_id?: string };
            user_role?: number;
            user_type?: number;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "vc.reserve_config.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        scope_id?: string;
        scope_type?: number;
        approve_config?: {
            approval_switch?: number;
            approval_condition?: number;
            meeting_duration?: number;
            approvers?: Array<{
                user_id?: {
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                };
            }>;
        };
        time_config?: {
            time_switch: number;
            days_in_advance?: number;
            opening_hour?: string;
            start_time?: string;
            end_time?: string;
            max_duration?: number;
        };
        reserve_scope_config?: {
            allow_all_users?: number;
            allow_users?: Array<{
                user_id?: {
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                };
            }>;
            allow_depts?: Array<{ department_id: string }>;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/events/created document }
     *
     * 创建会议室
     *
     * 当创建会议室时，会触发该事件
     */
    "vc.room.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        room?: {
            room_id?: string;
            name?: string;
            capacity?: number;
            description?: string;
            display_id?: string;
            custom_room_id?: string;
            room_level_id?: string;
            path?: Array<string>;
            room_status?: {
                status: boolean;
                schedule_status?: boolean;
                disable_start_time?: string;
                disable_end_time?: string;
                disable_reason?: string;
                contact_ids?: Array<{
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                }>;
                disable_notice?: boolean;
                resume_notice?: boolean;
            };
            device?: Array<{ name: string }>;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/events/deleted document }
     *
     * 删除会议室
     *
     * 当删除会议室时，会触发该事件
     */
    "vc.room.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        room?: { room_id?: string };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/room/events/updated document }
     *
     * 更新会议室
     *
     * 当更新会议室时，会触发该事件
     */
    "vc.room.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        room?: {
            room_id?: string;
            name?: string;
            capacity?: number;
            description?: string;
            display_id?: string;
            custom_room_id?: string;
            room_level_id?: string;
            path?: Array<string>;
            room_status?: {
                status: boolean;
                schedule_status?: boolean;
                disable_start_time?: string;
                disable_end_time?: string;
                disable_reason?: string;
                contact_ids?: Array<{
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                }>;
                disable_notice?: boolean;
                resume_notice?: boolean;
            };
            device?: Array<{ name: string }>;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "vc.room_level.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        room_level?: {
            room_level_id?: string;
            name?: string;
            parent_id?: string;
            path?: Array<string>;
            has_child?: boolean;
            custom_group_id?: string;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "vc.room_level.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        room_level_id: string;
        delete_child?: boolean;
    }) => Promise<any> | any;
    /**
         
         */
    "vc.room_level.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        room_level?: {
            room_level_id?: string;
            name?: string;
            parent_id?: string;
            path?: Array<string>;
            has_child?: boolean;
            custom_group_id?: string;
        };
    }) => Promise<any> | any;
}
