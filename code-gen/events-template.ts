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
        create_source?:
            | "developer_console"
            | "base"
            | "app_engine"
            | "bot_builder"
            | "aily"
            | "unknown";
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
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/bot/events/menu document }
     *
     * 机器人自定义菜单
     *
     * 当用户点击类型为事件的机器人菜单时触发
     */
    "application.bot.menu_v6"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        operator?: {
            operator_name?: string;
            operator_id?: {
                union_id?: string;
                user_id?: string;
                open_id?: string;
            };
        };
        event_key?: string;
        timestamp?: number;
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
        calendar_event_id?: string;
        change_type?: string;
        rsvp_infos?: Array<{
            from_user_id?: {
                union_id?: string;
                user_id?: string;
                open_id?: string;
            };
            rsvp_status?: string;
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
                primary_member_count?: number;
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
                dotted_line_leader_user_ids?: Array<string>;
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
                primary_member_count?: number;
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
                dotted_line_leader_user_ids?: Array<string>;
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
                is_primary_dept?: boolean;
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
            dotted_line_leader_user_ids?: Array<string>;
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
                is_primary_dept?: boolean;
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
            dotted_line_leader_user_ids?: Array<string>;
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
                is_primary_dept?: boolean;
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
            dotted_line_leader_user_ids?: Array<string>;
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
                is_primary_dept?: boolean;
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
            dotted_line_leader_user_ids?: Array<string>;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.common_data.meta_data.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        api_name?: string;
        field_changes?: Array<string>;
        metadata_type?: string;
        enum_value_changes?: Array<string>;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.contract.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        contract_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.contract.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        contract_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.contract.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        contract_id?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/events/created document }
     *
     * 部门创建
     *
     * 飞书人事中「部门被创建」时将触发此事件。触发时间为部门实际生效时间，如在 2022-01-01 创建部门，部门生效时间设置为 2022-05-01，事件将在 2022-05-01 进行推送。
     */
    "corehr.department.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        department_id?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/events/deleted document }
     *
     * 部门删除
     *
     * 飞书人事中「部门被删除」时将触发此事件
     */
    "corehr.department.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        department_id?: string;
        code?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/department/events/updated document }
     *
     * 部门更新
     *
     * 飞书人事中「部门信息被更新」时将触发此事件。触发时间为部门更新实际生效时间，如在 2022-01-01 更新部门，部门更新生效时间设置为 2022-05-01，事件将在 2022-05-01 进行推送。
     */
    "corehr.department.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        department_id?: string;
        field_changes?: Array<string>;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/events/converted document }
     *
     * 员工转正
     *
     * 员工在飞书人事转正完成后将触发该事件
     */
    "corehr.employment.converted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employment_id?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/events/created document }
     *
     * 雇佣信息创建
     *
     * 员工在飞书人事的「雇佣信息被创建」时将触发此事件
     */
    "corehr.employment.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employment_id?: string;
        target_user_id?: {
            union_id?: string;
            user_id?: string;
            open_id?: string;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/events/deleted document }
     *
     * 雇佣信息删除
     *
     * 员工在飞书人事的「雇佣信息被删除」时将触发此事件
     */
    "corehr.employment.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employment_id?: string;
        target_user_id?: {
            union_id?: string;
            user_id?: string;
            open_id?: string;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/events/resigned document }
     *
     * 员工完成离职
     *
     * 员工完成离职，即离职日期的次日凌晨时，员工雇佣状态更改为“离职”后触发该事件
     */
    "corehr.employment.resigned_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employment_id?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/events/updated document }
     *
     * 雇佣信息更新
     *
     * 员工在飞书人事的「雇佣信息被更新」时将触发此事件
     */
    "corehr.employment.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employment_id?: string;
        target_user_id?: {
            union_id?: string;
            user_id?: string;
            open_id?: string;
        };
        field_changes?: Array<string>;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_id?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_change/events/updated document }
     *
     * 异动状态变更事件
     *
     * 在异动发起审批和产生审批结果时触发该事件，审批结果产生的场景包括撤销、审批通过、审批拒绝
     */
    "corehr.job_change.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employment_id?: string;
        target_user_id?: {
            union_id?: string;
            user_id?: string;
            open_id?: string;
        };
        job_change_id?: string;
        transfer_mode?: number;
        transfer_type_unique_identifier?: string;
        transfer_reason_unique_identifier?: string;
        process_id?: string;
        effective_date?: string;
        status?: number;
        transfer_key?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/events/changed document }
     *
     * 员工异动
     *
     * 员工在飞书人事异动完成后将触发该事件
     */
    "corehr.job_data.changed_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_data_id?: string;
        employment_id?: string;
        target_user_id?: {
            union_id?: string;
            user_id?: string;
            open_id?: string;
        };
        job_change_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job_data.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_data_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job_data.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_data_id?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/events/employed document }
     *
     * 员工完成入职
     *
     * 在「飞书人事」将待入职员工手动操作“完成入职”后，触发该事件
     */
    "corehr.job_data.employed_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_data_id?: string;
        employment_id?: string;
        target_user_id?: {
            union_id?: string;
            user_id?: string;
            open_id?: string;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job_data.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_data_id?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/events/updated document }
     *
     * 离职状态变更事件
     *
     * 在离职发起审批和产生审批结果时触发该事件，审批结果产生的场景包括撤销、审批通过、审批拒绝
     */
    "corehr.offboarding.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employment_id?: string;
        target_user_id?: {
            union_id?: string;
            user_id?: string;
            open_id?: string;
        };
        offboarding_id?: string;
        process_id?: string;
        status?: number;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.org_role_authorization.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        role_id?: string;
        management_scope_list?: Array<{
            management_dimension: string;
            obj_id: string;
        }>;
        employment_id_list?: Array<string>;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.person.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        person_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.person.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        person_id?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/person/events/updated document }
     *
     * 个人信息更新
     *
     * 员工在飞书人事的「个人信息被更新」时将触发此事件
     */
    "corehr.person.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        person_id?: string;
        field_changes?: Array<string>;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.pre_hire.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        pre_hire_id?: string;
        field_changes?: Array<string>;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.approval_groups.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        approval_group_id?: string;
        process_id?: string;
        approval_group_status?: number;
        topic?: string;
        adjust_reason?: string;
        effective_date?: string;
        created_by?: string;
        draft_id?: string;
        draft_status?: number;
        approval_group_status_v2?: number;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.company.created_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        company_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.company.deleted_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        company_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.company.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        company_id?: string;
        field_changes?: Array<string>;
        sub_events?: Array<{
            id?: string;
            entity?: string;
            agg_entity?: string;
            agg_entity_id?: string;
            agg_entity_field?: string;
            opt_type?: number;
            field_changes?: Array<string>;
        }>;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.cost_center.created_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        cost_center_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.cost_center.deleted_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        cost_center_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.cost_center.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        cost_center_id?: string;
        field_changes?: Array<string>;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.custom_org.created_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        org_id?: string;
        object_api_name?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.custom_org.deleted_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        org_id?: string;
        object_api_name?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.custom_org.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        org_id?: string;
        field_changes?: Array<string>;
        object_api_name?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.department.created_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        department_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.department.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        department_id?: string;
        field_changes?: Array<string>;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.employee.domain_event_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: number;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        sub_event_type?: number;
        operator_user_id?: string;
        opt_scene?: string;
        opt_desc?: string;
        opt_time?: string;
        opt_id?: string;
        employment_id?: string;
        data?: Array<{
            id?: string;
            entity?: string;
            agg_entity?: string;
            agg_entity_id?: string;
            opt_type?: number;
            fields?: Array<string>;
        }>;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job_change.status_updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employment_id?: string;
        target_user_id?: {
            union_id?: string;
            user_id?: string;
            open_id?: string;
        };
        job_change_id?: string;
        transfer_mode?: number;
        transfer_type_unique_identifier?: string;
        transfer_reason_unique_identifier?: string;
        process_id?: string;
        effective_date?: string;
        status?: number;
        transfer_key?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job_change.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employment_id?: string;
        tenant_id?: string;
        process_id?: string;
        initiator?: string;
        operator?: string;
        updated_time?: string;
        job_change_id?: string;
        status?: number;
        operate_reason?: string;
        transfer_type?: number;
        updated_fields?: Array<string>;
        transform_type?: string;
        transform_reason?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job_family.created_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_family_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job_family.deleted_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_family_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job_family.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_family_id?: string;
        field_changes?: Array<string>;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job_grade.created_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_grade_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job_grade.deleted_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_grade_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job_grade.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_grade_id?: string;
        field_changes?: Array<string>;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job_level.created_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_level_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job_level.deleted_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_level_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.job_level.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        job_level_id?: string;
        field_changes?: Array<string>;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.location.created_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        location_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.location.deleted_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        location_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.location.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        location_id?: string;
        field_changes?: Array<string>;
        sub_events?: Array<{
            id?: string;
            entity?: string;
            agg_entity?: string;
            agg_entity_id?: string;
            agg_entity_field?: string;
            opt_type?: number;
            field_changes?: Array<string>;
        }>;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.offboarding.checklist_updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employment_id?: string;
        target_user_id?: {
            union_id?: string;
            user_id?: string;
            open_id?: string;
        };
        offboarding_id?: string;
        checklist_process_id?: string;
        checklist_status?: number;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.offboarding.status_updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employment_id?: string;
        target_user_id?: {
            union_id?: string;
            user_id?: string;
            open_id?: string;
        };
        offboarding_id?: string;
        process_id?: string;
        status?: number;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.offboarding.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        tenant_id?: string;
        offboarding_info_id?: string;
        process_id?: string;
        checklist_process_id?: string;
        employment_id?: string;
        operator?: string;
        status?: number;
        checklist_status?: number;
        updated_time?: string;
        updated_fields?: Array<string>;
        target_user_id?: {
            union_id?: string;
            user_id?: string;
            open_id?: string;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.pre_hire.onboarding_task_changed_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        tenant_id?: string;
        pre_hire_id?: string;
        onboarding_task_changes?: Array<{
            after_status?:
                | "uninitialized"
                | "not_started"
                | "in_progress"
                | "in_review"
                | "rejected"
                | "failed"
                | "skipped"
                | "completed"
                | "terminated"
                | "initiating"
                | "exception"
                | "manual_skipped";
            task_code?: string;
        }>;
        onboarding_flow_change?: {
            after_status?:
                | "not_started"
                | "in_progress"
                | "completed"
                | "withdrawn"
                | "others"
                | "expired";
        };
        onboarding_flow_id?: string;
        flow_info?: { id?: string; name?: { zh_cn?: string; en_us?: string } };
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.probation.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employment_id?: string;
        probation_status?:
            | "pending"
            | "rejected"
            | "waiting"
            | "approved"
            | "converted"
            | "offboarded";
        actual_probation_end_date?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.process.approver.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: number;
        app_id?: string;
        process_id?: string;
        approver_id?: string;
        status?: number;
        biz_type?: string;
        flow_definition_id?: string;
        node_definition_id?: string;
        node_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.process.cc.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        process_id?: string;
        approver_id?: string;
        status?: number;
        biz_type?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.process.node.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        flow_definition_id?: string;
        node_definition_id?: string;
        process_id?: string;
        process_node_id?: string;
        node_type?: number;
        node_status?: number;
        biz_type?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.process.status.update_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        process_id?: string;
        status?: number;
        biz_type?: string;
        flow_definition_id?: string;
        properties?: number;
    }) => Promise<any> | any;
    /**
         
         */
    "corehr.process.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        process_id?: string;
        status?: number;
        biz_type?: string;
        flow_definition_id?: string;
        properties?: number;
    }) => Promise<any> | any;
    /**
         
         */
    "directory.department.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        department?: {
            department_id: string;
            leaders?: Array<{ leader_type: number; leader_id: string }>;
            parent_department_id?: string;
            name?: {
                default_value: string;
                i18n_value?: Record<string, string>;
                default_locale?: string;
            };
            enabled_status?: boolean;
            order_weight?: string;
            custom_field_values?: Array<{
                field_key?: string;
                field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                text_value?: {
                    default_value: string;
                    i18n_value?: Record<string, string>;
                    default_locale?: string;
                };
                url_value?: {
                    link_text: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    url: string;
                    pcurl: string;
                };
                enum_value?: { enum_ids: Array<string>; enum_type: "1" | "2" };
                user_values?: Array<{ ids: Array<string>; user_type: "1" }>;
            }>;
            org_dimension?: string;
        };
        abnormal?: {
            id?: string;
            row_error?: number;
            field_errors?: Record<string, number>;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "directory.department.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        department?: {
            department_id: string;
            leaders?: Array<{ leader_type: number; leader_id: string }>;
            parent_department_id?: string;
            name?: {
                default_value: string;
                i18n_value?: Record<string, string>;
                default_locale?: string;
            };
            enabled_status?: boolean;
            order_weight?: string;
            custom_field_values?: Array<{
                field_key?: string;
                field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                text_value?: {
                    default_value: string;
                    i18n_value?: Record<string, string>;
                    default_locale?: string;
                };
                url_value?: {
                    link_text: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    url: string;
                    pcurl: string;
                };
                enum_value?: { enum_ids: Array<string>; enum_type: "1" | "2" };
                user_values?: Array<{ ids: Array<string>; user_type: "1" }>;
            }>;
            org_dimension?: string;
        };
        abnormal?: {
            id?: string;
            row_error?: number;
            field_errors?: Record<string, number>;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "directory.department.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        changed_properties?: Array<string>;
        department_prev?: {
            department_id: string;
            leaders?: Array<{ leader_type: number; leader_id: string }>;
            parent_department_id?: string;
            name?: {
                default_value: string;
                i18n_value?: Record<string, string>;
                default_locale?: string;
            };
            enabled_status?: boolean;
            order_weight?: string;
            custom_field_values?: Array<{
                field_key?: string;
                field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                text_value?: {
                    default_value: string;
                    i18n_value?: Record<string, string>;
                    default_locale?: string;
                };
                url_value?: {
                    link_text: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    url: string;
                    pcurl: string;
                };
                enum_value?: { enum_ids: Array<string>; enum_type: "1" | "2" };
                user_values?: Array<{ ids: Array<string>; user_type: "1" }>;
            }>;
            org_dimension?: string;
        };
        department_curr?: {
            department_id: string;
            leaders?: Array<{ leader_type: number; leader_id: string }>;
            parent_department_id?: string;
            name?: {
                default_value: string;
                i18n_value?: Record<string, string>;
                default_locale?: string;
            };
            enabled_status?: boolean;
            order_weight?: string;
            custom_field_values?: Array<{
                field_key?: string;
                field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                text_value?: {
                    default_value: string;
                    i18n_value?: Record<string, string>;
                    default_locale?: string;
                };
                url_value?: {
                    link_text: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    url: string;
                    pcurl: string;
                };
                enum_value?: { enum_ids: Array<string>; enum_type: "1" | "2" };
                user_values?: Array<{ ids: Array<string>; user_type: "1" }>;
            }>;
            org_dimension?: string;
        };
        abnormal?: {
            id?: string;
            row_error?: number;
            field_errors?: Record<string, number>;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "directory.employee.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employee?: {
            base_info?: {
                employee_id: string;
                name: {
                    last_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    first_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    another_name?: string;
                };
                mobile?: string;
                email?: string;
                gender?: number;
                departments?: Array<{
                    department_id: string;
                    org_dimension?: string;
                }>;
                employee_order_in_departments?: Array<{
                    department_id?: string;
                    order_weight_in_deparment?: string;
                    order_weight_among_deparments?: string;
                }>;
                description?: string;
                active_status?: number;
                is_resigned?: boolean;
                leader_id?: string;
                dotted_line_leader_ids?: Array<string>;
                custom_field_values?: Array<{
                    field_key?: string;
                    field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                    text_value?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    url_value?: {
                        link_text: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                        url: string;
                        pcurl: string;
                    };
                    enum_value?: {
                        enum_ids: Array<string>;
                        enum_type: "1" | "2";
                    };
                    user_values?: Array<{ ids: Array<string>; user_type: "1" }>;
                }>;
                resign_time?: string;
                avatar?: {
                    avatar_72?: string;
                    avatar_240?: string;
                    avatar_640?: string;
                    avatar_origin?: string;
                };
                background_image?: string;
                virtual_org_infos?: Array<{
                    id: string;
                    departments?: Array<{
                        department_id: string;
                        department_count?: {
                            recursive_members_count?: string;
                            direct_members_count?: string;
                            recursive_members_count_exclude_leaders?: string;
                            recursive_departments_count?: string;
                            direct_departments_count?: string;
                        };
                        has_child?: boolean;
                        leaders?: Array<{
                            leader_type: number;
                            leader_id: string;
                        }>;
                        parent_department_id?: string;
                        name?: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                        enabled_status?: boolean;
                        order_weight?: string;
                        custom_field_values?: Array<{
                            field_key?: string;
                            field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                            text_value?: {
                                default_value: string;
                                i18n_value?: Record<string, string>;
                                default_locale?: string;
                            };
                            url_value?: {
                                link_text: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                                url: string;
                                pcurl: string;
                            };
                            enum_value?: {
                                enum_ids: Array<string>;
                                enum_type: "1" | "2";
                            };
                            user_values?: Array<{
                                ids: Array<string>;
                                user_type: "1";
                            }>;
                        }>;
                        department_path_infos?: Array<{
                            department_id?: string;
                            department_name?: {
                                default_value: string;
                                i18n_value?: Record<string, string>;
                                default_locale?: string;
                            };
                        }>;
                        data_source?: number;
                        org_dimension?: string;
                    }>;
                    department_path_base_infos?: Array<{
                        department_id?: string;
                        department_name?: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                    }>;
                    employee_order_in_departments?: Array<{
                        department_id?: string;
                        order_weight_in_deparment?: string;
                        order_weight_among_deparments?: string;
                    }>;
                    leaders?: Array<string>;
                }>;
            };
            work_info?: {
                work_country_or_region?: string;
                work_place?: { place_id: string };
                work_station?: {
                    default_value: string;
                    i18n_value?: Record<string, string>;
                    default_locale?: string;
                };
                job_number?: string;
                extension_number?: string;
                join_date?: string;
                employment_type?: number;
                staff_status?: number;
                positions?: Array<{
                    position_code: string;
                    position_name: string;
                    leader_id?: string;
                    leader_position_code?: string;
                    is_main_position: boolean;
                    department_id: string;
                }>;
                job_title?: { job_title_id: string };
                job_level?: {
                    job_level_id: string;
                    job_level_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    is_enabled?: boolean;
                    is_deleted?: boolean;
                    order?: string;
                    description?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                };
                job_family?: {
                    job_family_id: string;
                    job_family_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    is_enabled?: boolean;
                    parent_job_family_id?: string;
                    description?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                };
                resign_date?: string;
                resign_reason?: string;
                resign_remark?: string;
                resign_type?: string;
            };
        };
        abnormal?: {
            id?: string;
            row_error?: number;
            field_errors?: Record<string, number>;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "directory.employee.regular_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employee?: {
            base_info?: {
                employee_id: string;
                name: {
                    last_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    first_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    another_name?: string;
                };
                mobile?: string;
                email?: string;
                gender?: number;
                departments?: Array<{
                    department_id: string;
                    org_dimension?: string;
                }>;
                employee_order_in_departments?: Array<{
                    department_id?: string;
                    order_weight_in_deparment?: string;
                    order_weight_among_deparments?: string;
                }>;
                description?: string;
                active_status?: number;
                is_resigned?: boolean;
                leader_id?: string;
                dotted_line_leader_ids?: Array<string>;
                custom_field_values?: Array<{
                    field_key?: string;
                    field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                    text_value?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    url_value?: {
                        link_text: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                        url: string;
                        pcurl: string;
                    };
                    enum_value?: {
                        enum_ids: Array<string>;
                        enum_type: "1" | "2";
                    };
                    user_values?: Array<{ ids: Array<string>; user_type: "1" }>;
                }>;
                resign_time?: string;
                avatar?: {
                    avatar_72?: string;
                    avatar_240?: string;
                    avatar_640?: string;
                    avatar_origin?: string;
                };
                background_image?: string;
                virtual_org_infos?: Array<{
                    id: string;
                    departments?: Array<{
                        department_id: string;
                        department_count?: {
                            recursive_members_count?: string;
                            direct_members_count?: string;
                            recursive_members_count_exclude_leaders?: string;
                            recursive_departments_count?: string;
                            direct_departments_count?: string;
                        };
                        has_child?: boolean;
                        leaders?: Array<{
                            leader_type: number;
                            leader_id: string;
                        }>;
                        parent_department_id?: string;
                        name?: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                        enabled_status?: boolean;
                        order_weight?: string;
                        custom_field_values?: Array<{
                            field_key?: string;
                            field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                            text_value?: {
                                default_value: string;
                                i18n_value?: Record<string, string>;
                                default_locale?: string;
                            };
                            url_value?: {
                                link_text: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                                url: string;
                                pcurl: string;
                            };
                            enum_value?: {
                                enum_ids: Array<string>;
                                enum_type: "1" | "2";
                            };
                            user_values?: Array<{
                                ids: Array<string>;
                                user_type: "1";
                            }>;
                        }>;
                        department_path_infos?: Array<{
                            department_id?: string;
                            department_name?: {
                                default_value: string;
                                i18n_value?: Record<string, string>;
                                default_locale?: string;
                            };
                        }>;
                        data_source?: number;
                        org_dimension?: string;
                    }>;
                    department_path_base_infos?: Array<{
                        department_id?: string;
                        department_name?: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                    }>;
                    employee_order_in_departments?: Array<{
                        department_id?: string;
                        order_weight_in_deparment?: string;
                        order_weight_among_deparments?: string;
                    }>;
                    leaders?: Array<string>;
                }>;
                is_forbidden_delete_employee?: boolean;
            };
            work_info?: {
                work_country_or_region?: string;
                work_place?: { place_id: string };
                work_station?: {
                    default_value: string;
                    i18n_value?: Record<string, string>;
                    default_locale?: string;
                };
                job_number?: string;
                extension_number?: string;
                join_date?: string;
                employment_type?: number;
                staff_status?: number;
                positions?: Array<{
                    position_code: string;
                    position_name: string;
                    leader_id?: string;
                    leader_position_code?: string;
                    is_main_position: boolean;
                    department_id: string;
                }>;
                job_title?: { job_title_id: string };
                job_level?: {
                    job_level_id: string;
                    job_level_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    is_enabled?: boolean;
                    is_deleted?: boolean;
                    order?: string;
                    description?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                };
                job_family?: {
                    job_family_id: string;
                    job_family_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    is_enabled?: boolean;
                    parent_job_family_id?: string;
                    description?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                };
                resign_date?: string;
                resign_reason?: string;
                resign_remark?: string;
                resign_type?: string;
            };
        };
        abnormal?: {
            id?: string;
            row_error?: number;
            field_errors?: Record<string, number>;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "directory.employee.resigned_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employee?: {
            base_info?: {
                employee_id: string;
                name: {
                    last_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    first_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    another_name?: string;
                };
                mobile?: string;
                email?: string;
                gender?: number;
                departments?: Array<{
                    department_id: string;
                    org_dimension?: string;
                }>;
                employee_order_in_departments?: Array<{
                    department_id?: string;
                    order_weight_in_deparment?: string;
                    order_weight_among_deparments?: string;
                }>;
                description?: string;
                active_status?: number;
                is_resigned?: boolean;
                leader_id?: string;
                dotted_line_leader_ids?: Array<string>;
                custom_field_values?: Array<{
                    field_key?: string;
                    field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                    text_value?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    url_value?: {
                        link_text: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                        url: string;
                        pcurl: string;
                    };
                    enum_value?: {
                        enum_ids: Array<string>;
                        enum_type: "1" | "2";
                    };
                    user_values?: Array<{ ids: Array<string>; user_type: "1" }>;
                }>;
                resign_time?: string;
                avatar?: {
                    avatar_72?: string;
                    avatar_240?: string;
                    avatar_640?: string;
                    avatar_origin?: string;
                };
                background_image?: string;
                virtual_org_infos?: Array<{
                    id: string;
                    departments?: Array<{
                        department_id: string;
                        department_count?: {
                            recursive_members_count?: string;
                            direct_members_count?: string;
                            recursive_members_count_exclude_leaders?: string;
                            recursive_departments_count?: string;
                            direct_departments_count?: string;
                        };
                        has_child?: boolean;
                        leaders?: Array<{
                            leader_type: number;
                            leader_id: string;
                        }>;
                        parent_department_id?: string;
                        name?: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                        enabled_status?: boolean;
                        order_weight?: string;
                        custom_field_values?: Array<{
                            field_key?: string;
                            field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                            text_value?: {
                                default_value: string;
                                i18n_value?: Record<string, string>;
                                default_locale?: string;
                            };
                            url_value?: {
                                link_text: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                                url: string;
                                pcurl: string;
                            };
                            enum_value?: {
                                enum_ids: Array<string>;
                                enum_type: "1" | "2";
                            };
                            user_values?: Array<{
                                ids: Array<string>;
                                user_type: "1";
                            }>;
                        }>;
                        department_path_infos?: Array<{
                            department_id?: string;
                            department_name?: {
                                default_value: string;
                                i18n_value?: Record<string, string>;
                                default_locale?: string;
                            };
                        }>;
                        data_source?: number;
                        org_dimension?: string;
                    }>;
                    department_path_base_infos?: Array<{
                        department_id?: string;
                        department_name?: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                    }>;
                    employee_order_in_departments?: Array<{
                        department_id?: string;
                        order_weight_in_deparment?: string;
                        order_weight_among_deparments?: string;
                    }>;
                    leaders?: Array<string>;
                }>;
                is_forbidden_delete_employee?: boolean;
            };
            work_info?: {
                work_country_or_region?: string;
                work_place?: { place_id: string };
                work_station?: {
                    default_value: string;
                    i18n_value?: Record<string, string>;
                    default_locale?: string;
                };
                job_number?: string;
                extension_number?: string;
                join_date?: string;
                employment_type?: number;
                staff_status?: number;
                positions?: Array<{
                    position_code: string;
                    position_name: string;
                    leader_id?: string;
                    leader_position_code?: string;
                    is_main_position: boolean;
                    department_id: string;
                }>;
                job_title?: { job_title_id: string };
                job_level?: {
                    job_level_id: string;
                    job_level_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    is_enabled?: boolean;
                    is_deleted?: boolean;
                    order?: string;
                    description?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                };
                job_family?: {
                    job_family_id: string;
                    job_family_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    is_enabled?: boolean;
                    parent_job_family_id?: string;
                    description?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                };
                resign_date?: string;
                resign_reason?: string;
                resign_remark?: string;
                resign_type?: string;
            };
        };
        abnormal?: {
            id?: string;
            row_error?: number;
            field_errors?: Record<string, number>;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "directory.employee.resurrect_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employee?: {
            base_info?: {
                employee_id: string;
                name: {
                    last_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    first_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    another_name?: string;
                };
                mobile?: string;
                email?: string;
                gender?: number;
                departments?: Array<{
                    department_id: string;
                    org_dimension?: string;
                }>;
                employee_order_in_departments?: Array<{
                    department_id?: string;
                    order_weight_in_deparment?: string;
                    order_weight_among_deparments?: string;
                }>;
                description?: string;
                active_status?: number;
                is_resigned?: boolean;
                leader_id?: string;
                dotted_line_leader_ids?: Array<string>;
                custom_field_values?: Array<{
                    field_key?: string;
                    field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                    text_value?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    url_value?: {
                        link_text: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                        url: string;
                        pcurl: string;
                    };
                    enum_value?: {
                        enum_ids: Array<string>;
                        enum_type: "1" | "2";
                    };
                    user_values?: Array<{ ids: Array<string>; user_type: "1" }>;
                }>;
                resign_time?: string;
                avatar?: {
                    avatar_72?: string;
                    avatar_240?: string;
                    avatar_640?: string;
                    avatar_origin?: string;
                };
                background_image?: string;
                virtual_org_infos?: Array<{
                    id: string;
                    departments?: Array<{
                        department_id: string;
                        department_count?: {
                            recursive_members_count?: string;
                            direct_members_count?: string;
                            recursive_members_count_exclude_leaders?: string;
                            recursive_departments_count?: string;
                            direct_departments_count?: string;
                        };
                        has_child?: boolean;
                        leaders?: Array<{
                            leader_type: number;
                            leader_id: string;
                        }>;
                        parent_department_id?: string;
                        name?: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                        enabled_status?: boolean;
                        order_weight?: string;
                        custom_field_values?: Array<{
                            field_key?: string;
                            field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                            text_value?: {
                                default_value: string;
                                i18n_value?: Record<string, string>;
                                default_locale?: string;
                            };
                            url_value?: {
                                link_text: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                                url: string;
                                pcurl: string;
                            };
                            enum_value?: {
                                enum_ids: Array<string>;
                                enum_type: "1" | "2";
                            };
                            user_values?: Array<{
                                ids: Array<string>;
                                user_type: "1";
                            }>;
                        }>;
                        department_path_infos?: Array<{
                            department_id?: string;
                            department_name?: {
                                default_value: string;
                                i18n_value?: Record<string, string>;
                                default_locale?: string;
                            };
                        }>;
                        data_source?: number;
                        org_dimension?: string;
                    }>;
                    department_path_base_infos?: Array<{
                        department_id?: string;
                        department_name?: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                    }>;
                    employee_order_in_departments?: Array<{
                        department_id?: string;
                        order_weight_in_deparment?: string;
                        order_weight_among_deparments?: string;
                    }>;
                    leaders?: Array<string>;
                }>;
                is_forbidden_delete_employee?: boolean;
            };
            work_info?: {
                work_country_or_region?: string;
                work_place?: { place_id: string };
                work_station?: {
                    default_value: string;
                    i18n_value?: Record<string, string>;
                    default_locale?: string;
                };
                job_number?: string;
                extension_number?: string;
                join_date?: string;
                employment_type?: number;
                staff_status?: number;
                positions?: Array<{
                    position_code: string;
                    position_name: string;
                    leader_id?: string;
                    leader_position_code?: string;
                    is_main_position: boolean;
                    department_id: string;
                }>;
                job_title?: { job_title_id: string };
                job_level?: {
                    job_level_id: string;
                    job_level_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    is_enabled?: boolean;
                    is_deleted?: boolean;
                    order?: string;
                    description?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                };
                job_family?: {
                    job_family_id: string;
                    job_family_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    is_enabled?: boolean;
                    parent_job_family_id?: string;
                    description?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                };
                resign_date?: string;
                resign_reason?: string;
                resign_remark?: string;
                resign_type?: string;
            };
        };
        abnormal?: {
            id?: string;
            row_error?: number;
            field_errors?: Record<string, number>;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "directory.employee.to_be_resigned_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        employee?: {
            base_info?: {
                employee_id: string;
                name: {
                    last_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    first_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    another_name?: string;
                };
                mobile?: string;
                email?: string;
                gender?: number;
                departments?: Array<{
                    department_id: string;
                    org_dimension?: string;
                }>;
                employee_order_in_departments?: Array<{
                    department_id?: string;
                    order_weight_in_deparment?: string;
                    order_weight_among_deparments?: string;
                }>;
                description?: string;
                active_status?: number;
                is_resigned?: boolean;
                leader_id?: string;
                dotted_line_leader_ids?: Array<string>;
                custom_field_values?: Array<{
                    field_key?: string;
                    field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                    text_value?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    url_value?: {
                        link_text: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                        url: string;
                        pcurl: string;
                    };
                    enum_value?: {
                        enum_ids: Array<string>;
                        enum_type: "1" | "2";
                    };
                    user_values?: Array<{ ids: Array<string>; user_type: "1" }>;
                }>;
                resign_time?: string;
                avatar?: {
                    avatar_72?: string;
                    avatar_240?: string;
                    avatar_640?: string;
                    avatar_origin?: string;
                };
                background_image?: string;
                virtual_org_infos?: Array<{
                    id: string;
                    departments?: Array<{
                        department_id: string;
                        department_count?: {
                            recursive_members_count?: string;
                            direct_members_count?: string;
                            recursive_members_count_exclude_leaders?: string;
                            recursive_departments_count?: string;
                            direct_departments_count?: string;
                        };
                        has_child?: boolean;
                        leaders?: Array<{
                            leader_type: number;
                            leader_id: string;
                        }>;
                        parent_department_id?: string;
                        name?: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                        enabled_status?: boolean;
                        order_weight?: string;
                        custom_field_values?: Array<{
                            field_key?: string;
                            field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                            text_value?: {
                                default_value: string;
                                i18n_value?: Record<string, string>;
                                default_locale?: string;
                            };
                            url_value?: {
                                link_text: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                                url: string;
                                pcurl: string;
                            };
                            enum_value?: {
                                enum_ids: Array<string>;
                                enum_type: "1" | "2";
                            };
                            user_values?: Array<{
                                ids: Array<string>;
                                user_type: "1";
                            }>;
                        }>;
                        department_path_infos?: Array<{
                            department_id?: string;
                            department_name?: {
                                default_value: string;
                                i18n_value?: Record<string, string>;
                                default_locale?: string;
                            };
                        }>;
                        data_source?: number;
                        org_dimension?: string;
                    }>;
                    department_path_base_infos?: Array<{
                        department_id?: string;
                        department_name?: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                    }>;
                    employee_order_in_departments?: Array<{
                        department_id?: string;
                        order_weight_in_deparment?: string;
                        order_weight_among_deparments?: string;
                    }>;
                    leaders?: Array<string>;
                }>;
                is_forbidden_delete_employee?: boolean;
            };
            work_info?: {
                work_country_or_region?: string;
                work_place?: { place_id: string };
                work_station?: {
                    default_value: string;
                    i18n_value?: Record<string, string>;
                    default_locale?: string;
                };
                job_number?: string;
                extension_number?: string;
                join_date?: string;
                employment_type?: number;
                staff_status?: number;
                positions?: Array<{
                    position_code: string;
                    position_name: string;
                    leader_id?: string;
                    leader_position_code?: string;
                    is_main_position: boolean;
                    department_id: string;
                }>;
                job_title?: { job_title_id: string };
                job_level?: {
                    job_level_id: string;
                    job_level_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    is_enabled?: boolean;
                    is_deleted?: boolean;
                    order?: string;
                    description?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                };
                job_family?: {
                    job_family_id: string;
                    job_family_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    is_enabled?: boolean;
                    parent_job_family_id?: string;
                    description?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                };
                resign_date?: string;
                resign_reason?: string;
                resign_remark?: string;
                resign_type?: string;
            };
        };
        abnormal?: {
            id?: string;
            row_error?: number;
            field_errors?: Record<string, number>;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "directory.employee.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        changed_properties?: Array<string>;
        employee_prev?: {
            base_info?: {
                employee_id: string;
                name: {
                    last_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    first_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    another_name?: string;
                };
                mobile?: string;
                email?: string;
                gender?: number;
                departments?: Array<{
                    department_id: string;
                    org_dimension?: string;
                }>;
                employee_order_in_departments?: Array<{
                    department_id?: string;
                    order_weight_in_deparment?: string;
                    order_weight_among_deparments?: string;
                }>;
                description?: string;
                active_status?: number;
                is_resigned?: boolean;
                leader_id?: string;
                dotted_line_leader_ids?: Array<string>;
                custom_field_values?: Array<{
                    field_key?: string;
                    field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                    text_value?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    url_value?: {
                        link_text: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                        url: string;
                        pcurl: string;
                    };
                    enum_value?: {
                        enum_ids: Array<string>;
                        enum_type: "1" | "2";
                    };
                    user_values?: Array<{ ids: Array<string>; user_type: "1" }>;
                }>;
                resign_time?: string;
                avatar?: {
                    avatar_72?: string;
                    avatar_240?: string;
                    avatar_640?: string;
                    avatar_origin?: string;
                };
                background_image?: string;
                virtual_org_infos?: Array<{
                    id: string;
                    departments?: Array<{
                        department_id: string;
                        department_count?: {
                            recursive_members_count?: string;
                            direct_members_count?: string;
                            recursive_members_count_exclude_leaders?: string;
                            recursive_departments_count?: string;
                            direct_departments_count?: string;
                        };
                        has_child?: boolean;
                        leaders?: Array<{
                            leader_type: number;
                            leader_id: string;
                        }>;
                        parent_department_id?: string;
                        name?: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                        enabled_status?: boolean;
                        order_weight?: string;
                        custom_field_values?: Array<{
                            field_key?: string;
                            field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                            text_value?: {
                                default_value: string;
                                i18n_value?: Record<string, string>;
                                default_locale?: string;
                            };
                            url_value?: {
                                link_text: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                                url: string;
                                pcurl: string;
                            };
                            enum_value?: {
                                enum_ids: Array<string>;
                                enum_type: "1" | "2";
                            };
                            user_values?: Array<{
                                ids: Array<string>;
                                user_type: "1";
                            }>;
                        }>;
                        department_path_infos?: Array<{
                            department_id?: string;
                            department_name?: {
                                default_value: string;
                                i18n_value?: Record<string, string>;
                                default_locale?: string;
                            };
                        }>;
                        data_source?: number;
                        org_dimension?: string;
                    }>;
                    department_path_base_infos?: Array<{
                        department_id?: string;
                        department_name?: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                    }>;
                    employee_order_in_departments?: Array<{
                        department_id?: string;
                        order_weight_in_deparment?: string;
                        order_weight_among_deparments?: string;
                    }>;
                    leaders?: Array<string>;
                }>;
            };
            work_info?: {
                work_country_or_region?: string;
                work_place?: { place_id: string };
                work_station?: {
                    default_value: string;
                    i18n_value?: Record<string, string>;
                    default_locale?: string;
                };
                job_number?: string;
                extension_number?: string;
                join_date?: string;
                employment_type?: number;
                staff_status?: number;
                positions?: Array<{
                    position_code: string;
                    position_name: string;
                    leader_id?: string;
                    leader_position_code?: string;
                    is_main_position: boolean;
                    department_id: string;
                }>;
                job_title?: { job_title_id: string };
                job_level?: {
                    job_level_id: string;
                    job_level_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    is_enabled?: boolean;
                    is_deleted?: boolean;
                    order?: string;
                    description?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                };
                job_family?: {
                    job_family_id: string;
                    job_family_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    is_enabled?: boolean;
                    parent_job_family_id?: string;
                    description?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                };
                resign_date?: string;
                resign_reason?: string;
                resign_remark?: string;
                resign_type?: string;
            };
        };
        employee_curr?: {
            base_info?: {
                employee_id: string;
                name: {
                    last_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    first_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    another_name?: string;
                };
                mobile?: string;
                email?: string;
                gender?: number;
                departments?: Array<{
                    department_id: string;
                    org_dimension?: string;
                }>;
                employee_order_in_departments?: Array<{
                    department_id?: string;
                    order_weight_in_deparment?: string;
                    order_weight_among_deparments?: string;
                }>;
                description?: string;
                active_status?: number;
                is_resigned?: boolean;
                leader_id?: string;
                dotted_line_leader_ids?: Array<string>;
                custom_field_values?: Array<{
                    field_key?: string;
                    field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                    text_value?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    url_value?: {
                        link_text: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                        url: string;
                        pcurl: string;
                    };
                    enum_value?: {
                        enum_ids: Array<string>;
                        enum_type: "1" | "2";
                    };
                    user_values?: Array<{ ids: Array<string>; user_type: "1" }>;
                }>;
                resign_time?: string;
                avatar?: {
                    avatar_72?: string;
                    avatar_240?: string;
                    avatar_640?: string;
                    avatar_origin?: string;
                };
                background_image?: string;
                virtual_org_infos?: Array<{
                    id: string;
                    departments?: Array<{
                        department_id: string;
                        department_count?: {
                            recursive_members_count?: string;
                            direct_members_count?: string;
                            recursive_members_count_exclude_leaders?: string;
                            recursive_departments_count?: string;
                            direct_departments_count?: string;
                        };
                        has_child?: boolean;
                        leaders?: Array<{
                            leader_type: number;
                            leader_id: string;
                        }>;
                        parent_department_id?: string;
                        name?: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                        enabled_status?: boolean;
                        order_weight?: string;
                        custom_field_values?: Array<{
                            field_key?: string;
                            field_type?: "1" | "2" | "3" | "4" | "10" | "11";
                            text_value?: {
                                default_value: string;
                                i18n_value?: Record<string, string>;
                                default_locale?: string;
                            };
                            url_value?: {
                                link_text: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                                url: string;
                                pcurl: string;
                            };
                            enum_value?: {
                                enum_ids: Array<string>;
                                enum_type: "1" | "2";
                            };
                            user_values?: Array<{
                                ids: Array<string>;
                                user_type: "1";
                            }>;
                        }>;
                        department_path_infos?: Array<{
                            department_id?: string;
                            department_name?: {
                                default_value: string;
                                i18n_value?: Record<string, string>;
                                default_locale?: string;
                            };
                        }>;
                        data_source?: number;
                        org_dimension?: string;
                    }>;
                    department_path_base_infos?: Array<{
                        department_id?: string;
                        department_name?: {
                            default_value: string;
                            i18n_value?: Record<string, string>;
                            default_locale?: string;
                        };
                    }>;
                    employee_order_in_departments?: Array<{
                        department_id?: string;
                        order_weight_in_deparment?: string;
                        order_weight_among_deparments?: string;
                    }>;
                    leaders?: Array<string>;
                }>;
                is_forbidden_delete_employee?: boolean;
            };
            work_info?: {
                work_country_or_region?: string;
                work_place?: { place_id: string };
                work_station?: {
                    default_value: string;
                    i18n_value?: Record<string, string>;
                    default_locale?: string;
                };
                job_number?: string;
                extension_number?: string;
                join_date?: string;
                employment_type?: number;
                staff_status?: number;
                positions?: Array<{
                    position_code: string;
                    position_name: string;
                    leader_id?: string;
                    leader_position_code?: string;
                    is_main_position: boolean;
                    department_id: string;
                }>;
                job_title?: { job_title_id: string };
                job_level?: {
                    job_level_id: string;
                    job_level_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    is_enabled?: boolean;
                    is_deleted?: boolean;
                    order?: string;
                    description?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                };
                job_family?: {
                    job_family_id: string;
                    job_family_name?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                    is_enabled?: boolean;
                    parent_job_family_id?: string;
                    description?: {
                        default_value: string;
                        i18n_value?: Record<string, string>;
                        default_locale?: string;
                    };
                };
                resign_date?: string;
                resign_reason?: string;
                resign_remark?: string;
                resign_type?: string;
            };
        };
        abnormal?: {
            id?: string;
            row_error?: number;
            field_errors?: Record<string, number>;
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
         
         */
    "drive.file.bitable_record_changed_v1"?: (data: {
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
        revision?: number;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        action_list?: Array<{
            record_id: string;
            action: string;
            before_value?: Array<{
                field_id: string;
                field_value: string;
                field_identity_value?: {
                    users?: Array<{
                        user_id: {
                            union_id?: string;
                            user_id?: string;
                            open_id?: string;
                        };
                        name: string;
                        en_name: string;
                        avatar_url: string;
                    }>;
                };
            }>;
            after_value?: Array<{
                field_id: string;
                field_value: string;
                field_identity_value?: {
                    users?: Array<{
                        user_id: {
                            union_id?: string;
                            user_id?: string;
                            open_id?: string;
                        };
                        name: string;
                        en_name: string;
                        avatar_url: string;
                    }>;
                };
            }>;
        }>;
        subscriber_id_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
        update_time?: number;
    }) => Promise<any> | any;
    /**
         
         */
    "drive.file.created_in_folder_v1"?: (data: {
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
        folder_token?: string;
        operator_id?: { union_id?: string; user_id?: string; open_id?: string };
        subscriber_ids?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
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
         
         */
    "drive.file.permission_member_applied_v1"?: (data: {
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
        approver_id?: { union_id?: string; user_id?: string; open_id?: string };
        application_user_list?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
        application_chat_list?: Array<string>;
        application_department_list?: Array<string>;
        application_remark?: string;
        permission?: "view" | "edit" | "full_access";
        subscriber_ids?: Array<{
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
     * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/events/deleted document }
     *
     * 删除投递
     *
     * 删除投递
     */
    "hire.application.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        application_ids?: Array<string>;
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
     * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account/events/created document }
     *
     * 帐号绑定
     *
     * 招聘管理员添加三方服务商帐号时，系统会推送事件给应用开发者，开发者可根据事件获取用户添加的帐号类型（背调 或 笔试）和 帐号自定义字段信息，并根据这些信息识别用户在服务商处的身份，完成三方服务商帐号 和 招聘帐号之间的绑定，并根据用户服务商身份推送对应的背调套餐或试卷列表。
     */
    "hire.eco_account.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        scope?: number;
        account_id?: string;
        account_name?: string;
        usage_list?: Array<number>;
        custom_field_list?: Array<{ key?: string; value?: string }>;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/events/canceled document }
     *
     * 终止背调
     *
     * 用户在招聘系统终止背调后，系统会推送事件给对应的应用开发者。开发者可根据事件获取背调 ID，完成在三方服务商处的订单取消等后续操作。
     */
    "hire.eco_background_check.canceled_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        background_check_id?: string;
        termination_reason?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/events/created document }
     *
     * 创建背调
     *
     * 用户在招聘系统安排背调后，系统会推送事件给对应的应用开发者。开发者可根据事件获取候选人信息、委托人信息和自定义字段信息，并根据这些信息完成在三方服务商处的背调订单创建。
     */
    "hire.eco_background_check.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        background_check_id?: string;
        account_id?: string;
        package_id?: string;
        additional_item_id_list?: Array<string>;
        comment?: string;
        candidate_info?: {
            name?: string;
            mobile?: { code?: string; number?: string };
            email?: string;
            first_name?: string;
            last_name?: string;
        };
        client_contact_info?: {
            name?: string;
            mobile?: { code?: string; number?: string };
            email?: string;
        };
        custom_field_list?: Array<{ key?: string; value?: string }>;
    }) => Promise<any> | any;
    /**
         
         */
    "hire.eco_exam.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        exam_id?: string;
        account_id?: string;
        paper_id?: string;
        candidate_info?: {
            name?: string;
            mobile?: { code?: string; number?: string };
            email?: string;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/event/import-ehr document }
     */
    "hire.ehr_import_task.imported_v1"?: (data: {
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
        application_id?: string;
        ehr_department_id?: string;
        ehr_requirement_id?: string;
        operator_id?: string;
        operator_user_id?: {
            union_id?: string;
            user_id?: string;
            open_id?: string;
        };
        ehr_department?: {
            department_id?: string;
            open_department_id?: string;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "hire.ehr_import_task_for_internship_offer.imported_v1"?: (data: {
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
        application_id?: string;
        offer_id?: string;
        pre_onboard_id?: string;
        ehr_department_id?: string;
        operator_id?: string;
        operator_user_id?: {
            union_id?: string;
            user_id?: string;
            open_id?: string;
        };
        ehr_department?: {
            department_id?: string;
            open_department_id?: string;
        };
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/events/status_changed document }
     *
     * Offer 状态变更
     *
     * 当 Offer 状态发生变更时将触发该事件。
     */
    "hire.offer.status_changed_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        offer_id?: string;
        offer_status?: number;
    }) => Promise<any> | any;
    /**
         
         */
    "hire.referral_account.assets_update_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        account_id?: string;
        assets?: {
            confirmed_bonus?: {
                bonus_type?: number;
                point_bonus?: number;
                cash?: { currency_type: string; amount: number };
                cash_bonus?: Array<{ currency_type: string; amount: number }>;
            };
            paid_bonus?: {
                bonus_type?: number;
                point_bonus?: number;
                cash?: { currency_type: string; amount: number };
                cash_bonus?: Array<{ currency_type: string; amount: number }>;
            };
        };
        modify_time?: string;
    }) => Promise<any> | any;
    /**
     * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/events/deleted document }
     *
     * 删除人才
     *
     * 删除人才
     */
    "hire.talent.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        talent_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "hire.talent.tag_subscription_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: number;
        app_id?: string;
        talent_id?: string;
        application_id?: string;
        tag?: {
            id?: string;
            name?: { zh_cn?: string; en_us?: string };
            description?: { zh_cn?: string; en_us?: string };
            type?: number;
            active_status?: number;
        };
        lock_status?: number;
        application_stage?: {
            id?: string;
            zh_name?: string;
            en_name?: string;
            type?: number;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "im.chat.access_event.bot_p2p_chat_entered_v1"?: (data: {
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
        last_message_id?: string;
        last_message_create_time?: string;
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
            restricted_mode_setting?: {
                status?: boolean;
                screenshot_has_permission_setting?:
                    | "all_members"
                    | "not_anyone";
                download_has_permission_setting?: "all_members" | "not_anyone";
                message_has_permission_setting?: "all_members" | "not_anyone";
            };
            group_message_type?: string;
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
            restricted_mode_setting?: {
                status?: boolean;
                screenshot_has_permission_setting?:
                    | "all_members"
                    | "not_anyone";
                download_has_permission_setting?: "all_members" | "not_anyone";
                message_has_permission_setting?: "all_members" | "not_anyone";
            };
            group_message_type?: string;
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
            update_time?: string;
            chat_id: string;
            thread_id?: string;
            chat_type: string;
            message_type: string;
            content: string;
            mentions?: Array<{
                key: string;
                id: { union_id?: string; user_id?: string; open_id?: string };
                name: string;
                tenant_key?: string;
            }>;
            user_agent?: string;
        };
    }) => Promise<any> | any;
    /**
         
         */
    "mail.user_mailbox.event.message_received_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        mail_address?: string;
        message_id?: string;
        mailbox_type?: number;
        subscriber?: {
            user_ids?: Array<{
                union_id?: string;
                user_id?: string;
                open_id?: string;
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
         
         */
    "moments.comment.created_v1"?: (data: {
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
        id?: string;
        post_id?: string;
        reply_comment_id?: string;
        root_comment_id?: string;
        user_type?: number;
    }) => Promise<any> | any;
    /**
         
         */
    "moments.comment.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        id?: string;
        post_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "moments.post.created_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        id?: string;
        user_id?: { union_id?: string; user_id?: string; open_id?: string };
        category_ids?: Array<string>;
        link?: string;
        user_type?: number;
    }) => Promise<any> | any;
    /**
         
         */
    "moments.post.deleted_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "moments.post_statistics.updated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        post_id?: string;
        statistics_type?: number;
        statistics?: { share_count?: number };
    }) => Promise<any> | any;
    /**
         
         */
    "moments.reaction.created_v1"?: (data: {
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
        entity_id?: string;
        id?: string;
        entity_type?: number;
        user_type?: number;
    }) => Promise<any> | any;
    /**
         
         */
    "moments.reaction.deleted_v1"?: (data: {
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
        entity_id?: string;
        id?: string;
        entity_type?: number;
        user_type?: number;
    }) => Promise<any> | any;
    /**
         
         */
    "payroll.payment_activity.approved_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        activity_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "payroll.payment_activity.status_changed_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        activity_id?: string;
        status?: number;
    }) => Promise<any> | any;
    /**
         
         */
    "performance.review_data.changed_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        items?: Array<{
            user_id?: { union_id?: string; user_id?: string; open_id?: string };
            semester_id?: string;
            activity_id?: string;
            stage_changes?: Array<{
                stage_id?: string;
                stage_type?:
                    | "summarize_key_outputs"
                    | "review"
                    | "communication_and_open_result"
                    | "view_result"
                    | "reconsideration"
                    | "leader_review";
                review_stage_role?:
                    | "reviewee"
                    | "invited_reviewer"
                    | "solid_line_leader"
                    | "dotted_line_leader"
                    | "secondary_solid_line_leader"
                    | "direct_project_leader"
                    | "custom_review_role";
            }>;
        }>;
    }) => Promise<any> | any;
    /**
         
         */
    "performance.stage_task.open_result_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        items?: Array<{
            user_id?: { union_id?: string; user_id?: string; open_id?: string };
            semester_id?: string;
            activity_id?: string;
            open_time?: string;
        }>;
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
            calendar_event_id?: string;
            meeting_sub_type?: number;
            security_setting?: {
                security_level?: number;
                group_ids?: Array<string>;
                user_ids?: Array<{
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                }>;
                room_ids?: Array<string>;
                has_set_security_contacts_and_group?: boolean;
            };
            webinar_setting?: { webinar_type?: number };
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
            calendar_event_id?: string;
            meeting_sub_type?: number;
            security_setting?: {
                security_level?: number;
                group_ids?: Array<string>;
                user_ids?: Array<{
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                }>;
                room_ids?: Array<string>;
                has_set_security_contacts_and_group?: boolean;
            };
            webinar_setting?: { webinar_type?: number };
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
            meeting_sub_type?: number;
            security_setting?: {
                security_level?: number;
                group_ids?: Array<string>;
                user_ids?: Array<{
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                }>;
                room_ids?: Array<string>;
                has_set_security_contacts_and_group?: boolean;
            };
            webinar_setting?: { webinar_type?: number };
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
            meeting_sub_type?: number;
            security_setting?: {
                security_level?: number;
                group_ids?: Array<string>;
                user_ids?: Array<{
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                }>;
                room_ids?: Array<string>;
                has_set_security_contacts_and_group?: boolean;
            };
            webinar_setting?: { webinar_type?: number };
        };
        operator?: {
            id?: { union_id?: string; user_id?: string; open_id?: string };
            user_role?: number;
            user_type?: number;
        };
        leave_reason?: number;
        leave_user?: {
            id?: { union_id?: string; user_id?: string; open_id?: string };
            user_role?: number;
            user_type?: number;
        };
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
            calendar_event_id?: string;
            meeting_sub_type?: number;
            security_setting?: {
                security_level?: number;
                group_ids?: Array<string>;
                user_ids?: Array<{
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                }>;
                room_ids?: Array<string>;
                has_set_security_contacts_and_group?: boolean;
            };
            webinar_setting?: { webinar_type?: number };
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
            calendar_event_id?: string;
            meeting_sub_type?: number;
            security_setting?: {
                security_level?: number;
                group_ids?: Array<string>;
                user_ids?: Array<{
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                }>;
                room_ids?: Array<string>;
                has_set_security_contacts_and_group?: boolean;
            };
            webinar_setting?: { webinar_type?: number };
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
            meeting_sub_type?: number;
            security_setting?: {
                security_level?: number;
                group_ids?: Array<string>;
                user_ids?: Array<{
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                }>;
                room_ids?: Array<string>;
                has_set_security_contacts_and_group?: boolean;
            };
            webinar_setting?: { webinar_type?: number };
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
            meeting_sub_type?: number;
            security_setting?: {
                security_level?: number;
                group_ids?: Array<string>;
                user_ids?: Array<{
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                }>;
                room_ids?: Array<string>;
                has_set_security_contacts_and_group?: boolean;
            };
            webinar_setting?: { webinar_type?: number };
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
            meeting_sub_type?: number;
            security_setting?: {
                security_level?: number;
                group_ids?: Array<string>;
                user_ids?: Array<{
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                }>;
                room_ids?: Array<string>;
                has_set_security_contacts_and_group?: boolean;
            };
            webinar_setting?: { webinar_type?: number };
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
            meeting_sub_type?: number;
            security_setting?: {
                security_level?: number;
                group_ids?: Array<string>;
                user_ids?: Array<{
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                }>;
                room_ids?: Array<string>;
                has_set_security_contacts_and_group?: boolean;
            };
            webinar_setting?: { webinar_type?: number };
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
            meeting_sub_type?: number;
            security_setting?: {
                security_level?: number;
                group_ids?: Array<string>;
                user_ids?: Array<{
                    union_id?: string;
                    user_id?: string;
                    open_id?: string;
                }>;
                room_ids?: Array<string>;
                has_set_security_contacts_and_group?: boolean;
            };
            webinar_setting?: { webinar_type?: number };
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
            if_cover_child_scope?: boolean;
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
