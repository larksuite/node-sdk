/* eslint-disable no-unused-vars */
import { IOtherEventHandles } from "./other-event-handles";

// auto gen
export interface IHandles extends IOtherEventHandles {
    /**
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
     * 机器人自定义菜单事件
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
     * 应用创建
     *
     * 当企业内有新的自建应用被创建时推送此事件（创建就会产生此事件，不需要发版）
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
                bot?: {
                    card_request_url?: string;
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
                        ud_icon?: { token?: string; color?: string };
                        menu_content_type?: number;
                    }>;
                    bot_menu_display_strategy?: number;
                };
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
                bot?: {
                    card_request_url?: string;
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
                        ud_icon?: { token?: string; color?: string };
                        menu_content_type?: number;
                    }>;
                    bot_menu_display_strategy?: number;
                };
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
     * 审批任务状态变更事件
     *
     * 审批任务状态发生变更时会触发该事件。状态变更包括：;;- 用户创建审批实例后，推送第一个审批节点的审批任务 `PENDING` 状态。;- 如果当前审批节点是会签（AND）节点：;   - 	任一审批任务被同意，推送该任务的 `APPROVED`（已通过）状态，并推送当前节点剩余任务的 `PENDING` 状态。;   - 	任一审批任务被拒绝，推送该任务的 `REJECTED`（已拒绝）状态，并推送当前节点剩余任务的 `DONE` 状态。;- 如果当前节点是或签（OR）节点：;   -    任一审批任务被同意，推送该任务的 `APPROVED`（已通过）状态，并推送当前节点剩余任务的 `DONE`（已完成）状态、下一个节点所有任务的 `PENDING`（进行中）状态。;   -    任一审批任务被拒绝，推送该任务的 `REJECTED`（已拒绝）状态，并推送当前节点剩余任务的 `DONE`（已完成）状态。;- 如果用户对审批任务进行转交，推送该任务的 `TRANSFERRED`（已转交）状态，和被转交人任务的 `PENDING`（进行中）状态。;- 发起人撤回审批后，推送剩余所有任务的 `DONE`（已完成）状态。;- 审批定义被管理员删除后，推送剩余所有任务的 `DONE`（已完成）状态。;- 如果用户对审批任务进行退回，推送该任务的 `ROLLBACK`（已退回）状态，和被退回人任务的 `PENDING`（进行中）状态。;- 如果进行中的审批任务超时未处理被关闭，推送该任务的 `OVERTIME_CLOSE`（超时未处理被关闭）状态。;- 如果超时已关闭的审批任务被手动恢复，推送该任务的 `OVERTIME_RECOVER`（超时已关闭的任务被手动恢复）状态。
     */
    "approval.task.status_changed_v4"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        approval_code?: string;
        instance_code?: string;
        task_id?: string;
        task_external_id?: string;
        assigned_user?: {
            union_id?: string;
            user_id?: string;
            open_id?: string;
        };
        status?: string;
        operate_time?: string;
    }) => Promise<any> | any;
    /**
     * 审批实例状态变更事件
     *
     * 审批实例状态发生变更时会触发该事件。状态变更包括：;;- 用户创建审批后，触发该事件并推送 PENDING（审批中）状态。;- 审批实例内，任一审批人拒绝审批任务后，触发该事件并推送 REJECTED（已拒绝）状态。;- 审批实例内，所有审批任务均同意后，触发该事件并推送 APPROVED（已通过）状态。;- 发起人撤回审批后，推送 CANCELED（已撤回）状态。;- 审批定义下存在审批中的审批实例时，若该审批定义被管理员删除，则触发该事件并推送 DELETED（已删除）状态。;- 发起人撤销已通过的审批时，触发该事件并推送 REVERTED（已撤销）状态。;- 审批实例超时未处理被关闭，触发该事件并推送 OVERTIME_CLOSE（超时被关闭）状态。;- 已超时的审批实例被手动恢复，触发该事件并推送 OVERTIME_RECOVER（超时实例被恢复）状态。
     */
    "approval.instance.status_changed_v4"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        approval_code?: string;
        instance_code?: string;
        external_id?: string;
        status?: string;
        operate_time?: string;
        start_user?: { union_id?: string; user_id?: string; open_id?: string };
    }) => Promise<any> | any;
    /**
     * 撤销用户授权事件
     *
     * 当用户 user_access_token 或 refresh_token 被撤销后，会触发此事件。
     */
    "auth.user_access_token.revoked_v4"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        revoke_token_type: string;
        revoke_reason: string;
        open_id: string;
        union_id: string;
        user_id?: string;
    }) => Promise<any> | any;
    /**
     * 日程变更
     *
     * 当用户订阅日程变更事件后，被订阅的日历下有日程发生变更时，将会触发该事件。
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
     * 删除 ACL
     *
     * 当订阅的日历上有访问控制被删除时，将会触发此事件。
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
     * 日历变更
     *
     * 当用户订阅日历变更事件后，如果用户日历列表内发生了日历变动，则会触发该事件。
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
     * 创建 ACL
     *
     * 当订阅的日历上有访问控制被创建时，将会触发此事件。
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
     * 薪资档案变更
     *
     * 当应用订阅该事件后，如果员工薪资档案发生变更（例如，通过管理后台对员工定薪、调薪、更正或删除），则会触发该事件。
     */
    "compensation.archive.changed_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        operate_type: "add" | "modify" | "delete";
        employment_id: string;
        effective_date: string;
        before_tid?: string;
        after_tid?: string;
    }) => Promise<any> | any;
    /**
     * 部门信息变化
     *
     * 当应用订阅该事件后，如果部门信息发生变化，则会触发该事件。部门信息发生变化的范围包括：;;- 企业管理员在管理后台修改部门信息。;- 企业开发者调用;[修改部门部分信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/patch)、[更新部门所有信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/update)、[更新部门ID](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/contact-v3/department/update_department_id) API 修改部门信息。
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
     * 成员字段变更
     *
     * 当成员字段发生变更时（变更动作包括「打开/关闭」开关、「增加/删除」成员字段），会触发该事件。事件体的 old_object 展示字段的原始值，object 展示字段的更新值。
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
     * 部门被删除
     *
     * 应用订阅该事件后，如果通讯录内有部门被删除，则会触发该事件。
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
     * 员工离职
     *
     * 当应用订阅该事件后，如果有员工离职（例如，通过管理后台离职成员、调用删除用户 API），则会触发该事件。
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
     * 部门新建
     *
     * 当应用订阅该事件后，如果通讯录内有部门被创建，则会触发该事件。
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
     * 员工入职
     *
     * 当应用订阅该事件后，如果有新员工入职（例如，通过管理后台添加成员、调用创建用户 API），则会触发该事件。
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
     * 员工信息被修改
     *
     * 应用订阅该事件后，当员工信息（包括：ID、用户名、英文名、别名、邮箱、企业邮箱、职务、手机号、性别、头像、状态、所属部门、直属主管、城市、国家、工位、入职时间、工号、类型、排序、自定义字段、职级、序列、虚线上级）被修改时将会触发该事件。你可以在事件的 old_object 字段中查看修改前的用户信息；在事件的 object 字段中可以查看修改后的用户信息。
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
     * 删除人员类型
     *
     * 当应用订阅该事件后，如果删除某一人员类型，则会触发该事件。
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
     * 启用人员类型
     *
     * 当应用订阅该事件后，如果将未激活的人员类型更新为激活状态，则会触发该事件。
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
     * 修改人员类型名称
     *
     * 当应用订阅该事件后，如果更新了人员类型的选项内容（包括默认内容 content 参数和国际化内容 i18n_content），则会触发该事件。
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
     * 通讯录权限范围变更
     *
     * 当应用订阅该事件后，如果应用的通讯录权限范围发生变更，则会触发该事件。
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
     * 新建人员类型
     *
     * 当应用订阅该事件后，如果新增了人员类型中的选项，则会触发该事件。
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
     * 停用人员类型
     *
     * 当应用订阅该事件后，如果将激活的人员类型更新为未激活状态，则会触发该事件。
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
     * 入职信息变更(不推荐)
     *
     * 待入职人员任职信息更新后，触发此事件，包括两种场景：;- 通过开放平台接口创建待入职、更新待入职;- 在飞书人事-入职系统，HR 补充任职信息;;如果有创建待入职后，更新数据的场景，请收到创建事件后延迟10s时间再执行更新操作
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
     * 任职信息创建
     *
     * 目前以下场景会触发该事件：;- 调用[【创建任职信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/create)、[【更新任职信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/patch)、[【添加人员】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/create)接口;- 人事系统【添加人员】、【发起异动】、【导入任职】、【创建兼职】功能
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
     * 任职信息删除
     *
     * 目前以下场景会触发事件：;- 调用[【删除任职信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/job_data/delete)接口;- 人事系统【删除任职】【删除兼职】功能
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
     * 任职信息更新
     *
     * 目前以下场景会触发该事件：;- 人事系统【编辑任职】【编辑兼职】【导入编辑任职】【发起异动】功能;- 仅对于当前生效的任职记录数据
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
     * 【事件】更新个人信息
     *
     * 员工个人信息发生变更时发送该事件，场景举例：;- 调用[【更新个人信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/person/patch)接口;- 人事系统【编辑个人信息】、【导入编辑人员】功能;- 计算字段变更;;注：籍贯、政治面貌、户口类型、户口所在地变化不会触发该事件
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
     * 【事件】个人信息创建
     *
     * 目前以下场景会触发该事件：;- 调用[【创建个人信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/person/create)、[【添加人员】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/create)接口;- 人事系统【添加人员】、【导入人员】功能
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
     * 【事件】更新雇佣信息
     *
     * 员工雇佣信息变更时发送该事件，场景举例：;- 调用[【更新雇佣信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/patch)接口;- 人事系统【编辑工作信息】、【导入编辑人员】功能;- 计算字段变更
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
     * 【事件】创建雇佣信息
     *
     * 员工雇佣信息被创建时发送该事件，场景举例：;- 调用[【创建雇佣信息】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/employment/create)、[【添加人员】](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/create)接口;- 人事系统【添加人员】、【导入人员】功能
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
     * 离职申请状态变更
     *
     * 在发起离职审批、产生审批结果、离职生效、离职状态回退等离职申请状态变更时触发该事件推送对应消息。审批结果产生的场景包括撤销、通过、拒绝审批。
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
     * 员工完成异动
     *
     * 员工在飞书人事异动生效后（到达异动生效时间）将触发该事件。
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
     * 异动状态变更
     *
     * 在异动审批状态变更、异动生效时都会触发该事件，审批结果产生的场景包括撤销、审批通过、审批拒绝。本事件没有数据范围鉴权。
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
     * 元数据信息变更
     *
     * People元数据定义变更会对外推送事件。例如在People系统中，设置-人员档案配置-个人信息-基本信息 中添加一个字段。就会收到person相关的元数据变更推送。;;可通过[获取飞书人事对象列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/custom_field/list_object_api_name)查询对象列表，包括了预置对象的字段变更以及自定义对象的字段变更，不保证顺序，所以要使用的话当监听到变更事件后需要判断是否关心该对象然后查询对象的字段来做业务逻辑。
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
     * 组织角色授权变更
     *
     * 当组织上的角色授权发生变更时，触发该事件。例如在部门上修改了角色，并在 2030-01-01 年生效，则事件将在 2030-01-01 触发。注意：当前事件只返回在飞书人事中组织角色的变化，下游组织的影响，可以通过 「获取组织类角色授权列表」获取。
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
     * 用户ID映射变更
     *
     * 用户ID映射变更事件
     */
    "corehr.common_data.id.user_mapping_changed_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        change_type?: string;
        id_transform_type?: number;
        corehr_id?: string;
        people_admin_id?: string;
        feishu_id?: { union_id?: string; user_id?: string; open_id?: string };
    }) => Promise<any> | any;
    /**
     * 【事件】个人信息删除
     *
     * 个人信息删除
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
     * 【事件】删除雇佣信息
     *
     * 员工在飞书人事的「雇佣信息被删除」时将触发此事件。
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
     * 员工完成入职
     *
     * 以下业务场景会触发此事件：;- 开放平台[操作员工完成入职](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/complete)接口;- 开放平台[添加人员](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/employee/create)接口;- 「飞书人事-人员管理-入职」将待入职员工操作“完成入职”;- 「飞书人事-人员管理-花名册」操作”添加人员”或”导入人员”
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
     * 【事件】删除部门
     *
     * 飞书人事中「部门被删除」时将触发此事件。
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
     * 员工完成转正
     *
     * 当员工转正生效时触发该事件
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
     * 【事件】更新部门
     *
     * 飞书人事中「部门信息被更新」时将触发此事件。
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
     * 【事件】创建部门
     *
     * 飞书人事中「部门被创建」时将触发此事件。
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
     * 【事件】更新职务
     *
     * 飞书人事中「职务信息被更新」时将触发此事件。注意：触发时间为职务实际生效时间，如在 2022-01-01 更新职务，职务生效时间设置为 2022-05-01，事件将在 2022-05-01 进行推送。
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
     * 【事件】删除职务
     *
     * 飞书人事中「职务被删除」时将触发此事件。
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
     * 【事件】创建职务
     *
     * 飞书人事中「职务被创建」时将触发此事件。注意：触发时间为职务实际生效时间，如在 2022-01-01 创建职务，职务生效时间设置为 2022-05-01，事件将在 2022-05-01 进行推送。
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
     * 合同更新
     *
     * 通过开放平台更新合同或者在飞书人事系统进行变更和续约等业务操作时，会触发本事件
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
     * 员工完成离职
     *
     * 员工完成离职，即离职日期的次日凌晨时，员工雇佣状态更改为“离职”后触发该事件。
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
     * 合同删除
     *
     * 通过开放平台删除合同时，会触发该事件。注意：删除后，无法通过搜索接口查询到合同信息。
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
     * 合同创建
     *
     * 通过开放平台创建合同或飞书人事系统中员工新签一份合同时，会触发合同创建事件
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
     * 试用期状态变更
     *
     * 当试用期记录状态发生变更时，触发该事件。
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
     * 抄送单据状态变更
     *
     * 流程中生成抄送单据后会触发该事件。抄送节点会生成抄送单据任务。如果一个节点有多个人抄送人，则会生成多个抄送单据（此功能不受数据权限范围控制）。
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
     * 离职申请状态变更
     *
     * 在发起离职审批、产生审批结果、离职生效、离职状态回退等离职申请状态变更时触发该事件推送对应消息。审批结果产生的场景包括撤销、通过、拒绝审批。;- 与原事件[离职申请状态变更](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/corehr-v1/offboarding/events/updated)相比，该事件多了直接离职产生的事件，且支持「员工数据」范围控制
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
     * 删除岗位事件
     *
     * 飞书人事中「岗位被删除」时将触发此事件。
     */
    "corehr.position.deleted_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        position_id?: string;
    }) => Promise<any> | any;
    /**
     * 更新岗位事件
     *
     * 飞书人事中「岗位信息被更新」时将触发此事件。注意：触发时间为岗位更新实际生效时间，如在 2022-01-01 更新岗位，岗位更新生效时间设置为 2022-05-01，事件将在 2022-05-01 进行推送。
     */
    "corehr.position.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        position_id?: string;
        field_changes?: Array<string>;
    }) => Promise<any> | any;
    /**
     * 离职流转状态变更
     *
     * 离职流转流程的状态变更消息，当离职流转流程发起和产生审批结果时，会触发该事件。离职流转流程是在离职申请审批通过之后发起的流程，一般用于审批核实离职员工的交接事宜。
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
     * 人员信息变更
     *
     * 人员领域事件变更，通过业务界面、开放平台接口对个人信息、工作信息（雇佣信息）、任职信息、兼职信息等进行操作时会触发相应事件
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
     * 离职信息变更
     *
     * 当员工的离职信息变更会发送消息。例如在 [离职管理](https://people.feishu.cn/people/members/dimission/management) > 离职详情页 > 编辑 中修改了离职信息，该事件会推送对应变更的消息。
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
     * 【事件】删除地点
     *
     * 飞书人事中「地点被删除」时将触发此事件。
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
     * 【事件】删除职等
     *
     * 飞书人事中「职等被删除」时将触发此事件。;
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
     * 【事件】创建职级;
     *
     * 飞书人事中「职级被创建」时将触发此事件。
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
     * 【事件】创建序列;
     *
     * 飞书人事中「序列被创建」时将触发此事件。
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
     * 【事件】创建成本中心
     *
     * 飞书人事中「成本中心被创建」时将触发此事件。
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
     * 创建岗位事件
     *
     * 飞书人事中「岗位被创建」时将触发此事件。注意：触发时间为岗位实际生效时间，如在 2022-01-01 创建岗位，岗位生效时间设置为 2022-05-01，事件将在 2022-05-01 进行推送。
     */
    "corehr.position.created_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        position_id?: string;
    }) => Promise<any> | any;
    /**
     * 【事件】更新职级
     *
     * 飞书人事中「职级信息被更新」时将触发此事件。
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
     * 【事件】更新职等
     *
     * 飞书人事中「职等被更新」时将触发此事件。
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
     * 【事件】删除成本中心
     *
     * 飞书人事中「成本中心被删除」时将触发此事件。;
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
     * 【事件】删除公司
     *
     * 飞书人事中「公司被删除」时将触发此事件。;
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
     * 【事件】更新成本中心
     *
     * 飞书人事中「成本中心信息被更新」时将触发此事件。
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
     * 电子签文件状态变更事件
     *
     * 当电子签文件状态发生变更的时候，会推送变更事件，包含文件变更前后的状态等信息
     */
    "corehr.signature_file.status_updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        signature_file_id?: string;
        before_status?: string;
        after_status?: string;
        biz_process_id?: string;
    }) => Promise<any> | any;
    /**
     * 【事件】创建职等;
     *
     * 飞书人事中「职等被创建」时将触发此事件。
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
     * 【事件】删除职级
     *
     * 飞书人事中「职级被删除」时将触发此事件。;
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
     * 【事件】更新序列
     *
     * 飞书人事中「序列信息被更新」时将触发此事件。
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
     * 【事件】更新地点
     *
     * 飞书人事中「地点被更新」时将触发此事件。
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
     * 【事件】更新部门
     *
     * 飞书人事中「部门信息被更新」时将触发此事件。
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
     * 【事件】删除序列
     *
     * 飞书人事中「序列被删除」时将触发此事件。;
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
     * 【事件】创建地点
     *
     * 飞书人事中「地点被创建」时将触发此事件。
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
     * 创建公司
     *
     * 飞书人事中「公司被创建」时将触发此事件。
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
     * 通道创建事件
     *
     * 通道创建后会发送该事件
     */
    "corehr.pathway.created_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        pathway_id?: string;
    }) => Promise<any> | any;
    /**
     * 【事件】删除自定义组织
     *
     * 飞书人事中「自定义组织被删除」时将触发此事件。
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
     * 【事件】更新自定义组织
     *
     * 飞书人事中「自定义组织被更新」时将触发此事件。
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
     * 流程实例状态变化
     *
     * 流程实例是指用户发起的具体流程(process_id是其唯一标识)，流程实例状态变化时会触发该事件（此功能不受数据权限范围控制）。
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
     * 【事件】创建部门
     *
     * 飞书人事中「部门被创建」时将触发此事件。
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
     * 组织架构调整状态变更事件
     *
     * - 当用户在『飞书人事-我的团队/人员管理-组织架构』，查看调整链接可以获取到 该用户发起的所有组织架构调整， 进入可找到审批流程。;- 当该审批单状态发生变更后， 用户会收到流程状态变更事件。 ;- 延迟说明：数据库主从延迟2s以内，即：用户接收到流程状态变更消息后2s内调用查询状态接口可能查不到变更信息。;;## 前提条件;你需要在应用中配置事件订阅，这样才可以在事件触发时接收到事件数据。了解事件订阅可参见[事件订阅概述](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)。
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
     * 【事件】更新公司
     *
     * 飞书人事中「公司被更新」时将触发此事件。
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
     * 通道更新事件
     *
     * 通道更新后会发送该事件
     */
    "corehr.pathway.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        pathway_id?: string;
        field_changes?: Array<string>;
    }) => Promise<any> | any;
    /**
     * 通道删除事件
     *
     * 通道删除后会发送该事件
     */
    "corehr.pathway.deleted_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        pathway_id?: string;
    }) => Promise<any> | any;
    /**
     * 【事件】创建自定义组织
     *
     * 飞书人事中「自定义组织被创建」时将触发此事件。
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
     * 入职流程状态变更
     *
     * 待入职员工的入职流程流转时，例如调用[流转入职任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/corehr-v2/pre_hire/transit_task)接口会触发本事件。
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
     * 流程实例信息变更
     *
     * 流程实例是指用户发起的具体流程(process_id是其唯一标识)，流程实例在以下时机会触发信息变更事件：流程中有审批人操作、流程数据更新、流程状态变化等。;;注意事项：若节点中有多个人时，可能会同时触发多个事件。例如流程运行到该节点，同时为多个人都生成了待办任务，就会导致触发多次事件（此功能不受数据权限范围控制）。
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
     * 流程节点状态变更
     *
     * 流程中节点状态发生变化会触发该事件。配置的节点为节点定义（node_definition_id 是唯一标识）。在流程实例中，每个流程实例生成的节点实例会不同（此功能不受数据权限范围控制）。
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
     * 审批任务状态变更
     *
     * 单个审批任务的状态变化会触发该事件。例如，审批任务从待办变为已完成。审批任务（approver_id 是唯一标识），比如一个多人会签节点，会分别生成多人的审批任务（此功能不受数据权限范围控制）。
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
        node_id_str?: string;
    }) => Promise<any> | any;
    /**
     * 流程评论事件
     *
     * 流程新增评论时会触发该事件，该事件包含评论所在的流程ID（process_id是其唯一标识）和评论唯一ID（comment_id）,此功能不受数据权限范围控制
     */
    "corehr.process_comment_info.updated_v2"?: (data: {
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
        comment_id?: string;
    }) => Promise<any> | any;
    /**
     * 异动状态变更
     *
     * 在异动审批状态变更、异动生效时都会触发该事件，审批结果产生的场景包括撤销、审批通过、审批拒绝;
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
        original_status?: number;
        transfer_key?: string;
        details_of_job_status_change?: Array<string>;
    }) => Promise<any> | any;
    /**
     * 异动信息变更
     *
     * 员工发起异动后，异动信息变更会触发该事件
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
     * 文件夹下文件创建
     *
     * 当用户订阅的文件夹下有新建文件时将触发此事件。
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
     * 多维表格记录变更
     *
     * 多维表格记录变更事件。被订阅的多维表格记录发生变更时，将会触发此事件。了解事件订阅的配置流程和使用场景，参考[事件概述](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)。
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
     * 多维表格字段变更
     *
     * 多维表格字段变更事件。被订阅的多维表格字段发生变更时，将会触发此事件。了解事件订阅的配置流程和使用场景，参考[事件概述](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)。
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
     * 文件协作者权限申请
     *
     * 当用户发起申请文件协作者权限时将触发此事件，协作者权限包括阅读、编辑和管理权限。
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
     * 添加评论、回复通知事件
     *
     * 当用户有新文档评论或回复通知会触发此事件。
     */
    "drive.notice.comment_add_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        notice_meta?: {
            file_type?:
                | "doc"
                | "docx"
                | "sheet"
                | "bitable"
                | "slides"
                | "file";
            file_token?: string;
            from_user_id?: {
                union_id?: string;
                user_id?: string;
                open_id?: string;
            };
            to_user_id?: {
                union_id?: string;
                user_id?: string;
                open_id?: string;
            };
            notice_type?: "add_comment" | "add_reply";
        };
        comment_id?: string;
        reply_id?: string;
        is_mentioned?: boolean;
    }) => Promise<any> | any;
    /**
     * 课程学习进度更新事件
     *
     * 课程学习进度更新时触发
     */
    "elearning.course_registration.updated_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        course_id?: string;
        learner?: {
            user_id?: { union_id?: string; user_id?: string; open_id?: string };
            email?: string;
            phone?: string;
        };
        enroll_at?: number;
        enroll_type?: number;
        learning_duration?: number;
        finished_at?: number;
        learning_state?: number;
        compulsory_lesson_ids?: Array<string>;
        learned_compulsory_lesson_ids?: Array<string>;
        optional_lesson_ids?: Array<string>;
        learned_optional_lesson_ids?: Array<string>;
    }) => Promise<any> | any;
    /**
     * 课程学习进度新增事件
     *
     * 课程学习进度新增时触发
     */
    "elearning.course_registration.created_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        course_id?: string;
        learner?: {
            user_id?: { union_id?: string; user_id?: string; open_id?: string };
            email?: string;
            phone?: string;
        };
        enroll_at?: number;
        enroll_type?: number;
        learning_duration?: number;
        finished_at?: number;
        learning_state?: number;
        compulsory_lesson_ids?: Array<string>;
        learned_compulsory_lesson_ids?: Array<string>;
        optional_lesson_ids?: Array<string>;
        learned_optional_lesson_ids?: Array<string>;
    }) => Promise<any> | any;
    /**
     * 课程学习进度删除事件
     *
     * 课程学习进度删除时触发
     */
    "elearning.course_registration.deleted_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        course_id?: string;
        learner?: {
            user_id?: { union_id?: string; user_id?: string; open_id?: string };
            email?: string;
            phone?: string;
        };
    }) => Promise<any> | any;
    /**
     * 推送审核通知
     *
     * 推送审核状态通知事件。
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
     * 创建工单
     *
     * 可监听服务台的工单创建事件。需使用订阅接口订阅：[事件订阅](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/event/subscribe)
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
     * 工单消息事件
     *
     * 该消息事件属于工单消息事件。需使用订阅接口订阅：[事件订阅](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/event/subscribe)。
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
            comments?: Array<{
                content?: string;
                created_at?: number;
                id?: number;
                user_avatar_url?: string;
                user_name?: string;
                user_id?: number;
            }>;
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
     * 工单状态变更
     *
     * 可监听工单状态和阶段变更事件。需使用订阅接口订阅：[事件订阅](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/helpdesk-v1/event/subscribe)。;;:::note;如果你需要监听工单的阶段变更，可以使用该事件。例如，使用该事件监听工单阶段由机器人变更为人工。
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
     * 账号绑定
     *
     * 飞书招聘客户在「飞书招聘」-「设置」-「生态对接」-「笔试/背景调查」添加三方服务商账号时，系统会推送「账号绑定」事件给服务商。服务商可通过本事件获取客户添加的**账号类型**、**飞书招聘账号 ID** 和 **账号自定义字段信息**，并根据这些信息识别出客户在服务商处的身份，从而完成客户的服务商账号和飞书招聘账号之间的绑定。之后服务商可依据账号绑定关系向客户推送对应的背调套餐或试卷列表。
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
     * Offer 状态变更
     *
     * 当 Offer 状态发生变更时发送该事件。除 Offer 创建时不会发送以外，其它 Offer 状态变更均会发送事件，Offer 状态变更场景可参考「Offer 状态流转图」。注意：仅推送正式 Offer 的状态变更信息，实习 Offer 相关状态不推送。
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
     * 投递删除
     *
     * 当投递被删除时，触发该事件的推送。;;
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
     * 删除人才
     *
     * 当人才被删除时，触发该事件。
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
     * 导入 e-HR
     *
     * 当用户在招聘系统中对候选人的投递操作「导入 e-HR」后，将会触发该事件，推送候选人信息至订阅系统。如需接收到该事件，则需先配置事件订阅。详情参考 [事件订阅概述](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)。
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
     * 创建背调
     *
     * 飞书招聘客户在招聘系统给候选人安排背调后，系统会推送「创建背调」事件给对应的背调服务商。服务商可根据此事件获取该背调的候选人、委托人和自定义字段等信息，并根据这些信息完成内部的背调订单的创建和绑定，之后可通过[更新背调订单进度](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/update_progress)、[回传背调订单的最终结果](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/update_result)将背调信息回传给招聘系统。
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
     * 导入 e-HR（实习 Offer）
     *
     * 飞书招聘系统内用户选择实习 Offer 导入 e-HR 系统之后，将通过该事件推送候选人信息。
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
     * 终止背调
     *
     * 飞书招聘客户在招聘系统内终止背调后，系统会推送「终止背调」事件给对应的背调服务商，服务商可根据此事件获取背调 ID，完成服务商内部的订单取消等后续操作。
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
     * 人才进展变更事件
     *
     * 支持单独订阅有指定标签的人才进展，人才进展包括阶段变更、锁定、解锁，需要提前在「飞书招聘」-「设置」- 「候选人标签管理」里对指定标签勾选支持事件订阅
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
     * 内推账户余额变更事件
     *
     * 当内推账户余额发生变更（增加或者减少）时，触发该事件。该事件将推送变更后的账户余额信息。收到事件后，如需将余额提现到三方平台发放给用户，请使用接口 [全额提取内推账户余额](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral_account/withdraw)。
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
     * 投递阶段变更
     *
     * 当投递阶段发生变更时，会触发此事件。了解事件订阅的使用场景和配置流程，请点击查看 [事件订阅概述](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)。
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
     * 创建笔试
     *
     * 飞书招聘客户在招聘系统安排笔试后，系统会推送「创建笔试」事件给对应的笔试服务商应用。服务商可根据此事件获取该场笔试的候选人信息和试卷信息，并根据这些信息为候选人安排笔试，之后可通过[回传笔试安排结果](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_exam/login_info)将笔试安排结果回传给招聘系统。
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
        talent_id?: string;
        application_id?: string;
    }) => Promise<any> | any;
    /**
     * 消息已读
     *
     * 用户阅读机器人发送的单聊消息后触发此事件。
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
     * 用户出群
     *
     * 用户主动退出群聊或被移出群聊时推触发此事件，在群组内的、已订阅该事件的机器人会收到事件数据。
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
     * 删除消息表情回复
     *
     * 应用订阅该事件后，消息被删除表情回复时会触发此事件。事件体包含被删除表情回复的消息 message_id、删除表情回复的操作人 ID、表情类型、添加时间等信息。
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
     * 群配置修改
     *
     * 群组配置被修改后触发此事件，在该群组内的、已订阅当前事件的应用机器人将会收到事件通知。修改操作包含：;;- 转移群主;- 修改群基本信息，包括：群头像、群名称、群描述、群国际化名称;- 修改群权限，包括：加人入群权限、群编辑权限、at 所有人权限、群分享权限等
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
     * 撤销拉用户进群
     *
     * 撤销拉用户进群后触发此事件，在群组内的、已订阅该事件的机器人会收到事件消息。撤销操作是指如下图所示的群内 **撤销邀请**。;;![image.png](//sf3-cn.feishucdn.com/obj/open-platform-opendoc/2faba42d3e4203e1dd899931da6dbfc8_DFXlHNscdw.png?height=278&maxWidth=550&width=1383)
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
     * 用户进入与机器人的会话
     *
     * 用户进入与机器人的会话时触发此事件。
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
     * 新增消息表情回复
     *
     * 应用订阅该事件后，消息被添加表情回复时会触发此事件。事件体包含被添加表情回复的消息 message_id、添加表情回复的操作人 ID、表情类型、添加时间等信息。
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
     * 撤回消息
     *
     * 机器人所在会话内的消息被撤回时触发此事件。
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
     * 机器人进群
     *
     * 机器人被用户添加至群聊时触发此事件，在群组内的、已订阅该事件的机器人会收到事件消息。
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
     * 机器人被移出群
     *
     * 机器人被移出群聊后触发此事件，仅被移除群组且订阅该事件的机器人会收到事件数据。
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
     * 用户进群
     *
     * 新用户进群（包含话题群）时触发此事件，在群组内的、已订阅该事件的机器人会收到事件数据。
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
     * 群解散
     *
     * 群组被解散后触发此事件，在该群组内的、已订阅当前事件的应用机器人将会收到事件通知。
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
     * 接收消息
     *
     * 机器人接收到用户/机器人发送的消息后触发此事件。
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
                mentioned_type?: string;
                name: string;
                tenant_key?: string;
            }>;
            user_agent?: string;
            lark_agent_context?: { active_chat_id?: string };
        };
    }) => Promise<any> | any;
    /**
     * 收信通知
     *
     * ## 前提条件;你需要在应用中配置事件订阅，这样才可以在事件触发时接收到事件数据。了解事件订阅可参见 [事件概述](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)。
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
     * 会议室删除
     *
     * 会议室被删除将触发此事件。
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
     * 会议室属性变更
     *
     * 会议室属性更新将触发此事件。
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
     * 会议室创建
     *
     * 会议室被创建将触发此事件。
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
     * 会议室状态信息变更
     *
     * 会议室被创建、更新、删除或者被预定时，将会触发此事件。
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
     * 妙记生成
     *
     * 当与用户有关联的妙记生成后，将会触发该事件。;;用户关联的妙记包括：;- 参与的会议所生成的妙记;- 录音或者上传音视频文件所生成的妙记
     */
    "minutes.minute.generated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        minute_token?: string;
        minute_source?: { source_type?: string; source_entity_id?: string };
        subscriber_ids?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
     * 删除评论
     *
     * 公司圈用户删除评论时触发此事件。
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
     * 发布帖子
     *
     * 公司圈用户发布帖子时触发此事件。
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
     * 删除帖子
     *
     * 公司圈用户删除帖子时触发此事件。
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
     * 帖子统计数据变更
     *
     * 公司圈帖子统计数据变更时触发此事件。
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
     * 发布评论
     *
     * 公司圈用户发布评论时触发此事件。
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
     * 取消表情互动
     *
     * 公司圈用户取消表情互动时触发此事件。
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
     * 表情互动
     *
     * 公司圈用户表情互动时触发此事件。
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
     * 发薪活动封存
     *
     * 当发薪活动封存后，订阅这个事件的应用会收到事件。;;;一个发薪活动封存后，可能会向事件监听方发送多条 `activity_id` 相同的事件通知，事件监听方需要针对  `activity_id` 做好幂等处理。;
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
     * 发薪活动变更事件
     *
     * 当发薪活动发生变更后，订阅这个事件的应用会收到事件。当前仅审批通过、审批撤销、跳过审批、封存、取消封存，会发送该事件。
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
     * 绩效结果开通
     *
     * 当员工的绩效结果开通时，订阅这个事件的应用会收到该事件。
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
     * 绩效详情变更
     *
     * 当员工的绩效详情发生变更时，订阅这个事件的应用会收到该事件。
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
     * 设备申报事件
     *
     * 订阅此事件后，成员提交设备自主申报后会收到通知，通知包含申报设备的参数以及申报人等信息
     */
    "security_and_compliance.device_apply_record.device_apply_event_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        device_apply_record_id: string;
        device_record?: {
            device_record_id: string;
            version: string;
            current_user_id?: {
                union_id?: string;
                user_id?: string;
                open_id?: string;
            };
            device_name?: string;
            model?: string;
            device_system: number;
            serial_number?: string;
            disk_serial_number?: string;
            uuid?: string;
            mac_address?: string;
            android_id?: string;
            idfv?: string;
            aaid?: string;
            device_ownership: number;
            device_status: number;
            certification_level: number;
            device_terminal_type: number;
            is_managed?: boolean;
            mdm_device_id?: string;
            mdm_provider_name?: string;
            device_env_detect_status?: number;
            is_public?: boolean;
            source?: number;
        };
        apply_time: string;
        apply_status: number;
        operator?: { union_id?: string; user_id?: string; open_id?: string };
        apply_device_ownership: number;
        apply_reason?: string;
    }) => Promise<any> | any;
    /**
     * 设备信息变更事件
     *
     * 使用该接口，可以订阅接收设备管理变更记录通知，包含设备新增、设备删除、设备归属变更、可信状态变更、设备特征如生产序列号、硬盘序列号等相关信息发生变化时事件通知
     */
    "security_and_compliance.device_record.device_change_event_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        device_record_id?: string;
        version?: string;
        change_type?: number;
        before?: {
            device_record_id: string;
            version: string;
            current_user_id?: {
                union_id?: string;
                user_id?: string;
                open_id?: string;
            };
            device_name?: string;
            model?: string;
            device_system: number;
            serial_number?: string;
            disk_serial_number?: string;
            uuid?: string;
            mac_address?: string;
            android_id?: string;
            idfv?: string;
            aaid?: string;
            device_ownership: number;
            device_status: number;
            certification_level: number;
            device_terminal_type: number;
            is_managed?: boolean;
            mdm_device_id?: string;
            mdm_provider_name?: string;
            device_env_detect_status?: number;
            is_public?: boolean;
        };
        after?: {
            device_record_id: string;
            version: string;
            current_user_id?: {
                union_id?: string;
                user_id?: string;
                open_id?: string;
            };
            device_name?: string;
            model?: string;
            device_system: number;
            serial_number?: string;
            disk_serial_number?: string;
            uuid?: string;
            mac_address?: string;
            android_id?: string;
            idfv?: string;
            aaid?: string;
            device_ownership: number;
            device_status: number;
            certification_level: number;
            device_terminal_type: number;
            is_managed?: boolean;
            mdm_device_id?: string;
            mdm_provider_name?: string;
            device_env_detect_status?: number;
            is_public?: boolean;
        };
    }) => Promise<any> | any;
    /**
     * 任务信息变更
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
     * 任务评论信息变更
     *
     * 当 APP 创建的任务评论信息发生变更时触发此事件，包括任务评论的创建、回复、更新、删除。;;**特别注意**: 订阅该事件只能接收到该 APP 创建的任务发生的评论信息变更，如果订阅后未收到事件，可以检查是否是下面几种不会推送的情况:;- 任务是user_access_token方式创建或者其他应用创建的。;- 任务是通过客户端或者文档创建的。
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
     * 任务信息变更
     *
     * 当 APP 订阅此事件后可以接收到由该 APP 创建的任务发生的变更，包括任务标题、描述、截止时间、协作者、关注者、提醒时间、状态（完成或取消完成）。;;;;**特别注意**: 订阅该事件只能接收到该 APP 创建的任务发生的变更，如果订阅后未收到事件，可以检查是否是下面几种不会推送的情况:;  - 任务是user_access_token方式创建或者其他应用创建的。;  - 任务是通过客户端或者文档创建的。;
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
     * 任务事件
     *
     * 任务事件，事件类型包括： 任务创建、任务删除、任务标题变更、任务负责人变更、任务完整状态变更、任务描述变更、任务关注人变更、任务提醒事件变更、任务开始和截止时间变更
     */
    "task.task.update_user_access_v2"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        event_types?: Array<string>;
        task_guid?: string;
    }) => Promise<any> | any;
    /**
     * 企业会议开始
     *
     * 发生在会议开始时，包含企业内所有会议开始事件。
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
     * 加入会议
     *
     * 发生在有人加入会议时【仅通过Open API预约的会议会产生此类事件】
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
     * 结束屏幕共享
     *
     * 发生在屏幕共享结束时【仅通过Open API预约的会议会产生此类事件】
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
     * 开始屏幕共享
     *
     * 发生在屏幕共享开始时【仅通过Open API预约的会议会产生此类事件】
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
     * 企业会议结束
     *
     * 发生在会议结束时，包含企业内所有会议结束事件。
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
     * 开始录制
     *
     * 发生在开始录制时【仅通过Open API预约的会议会产生此类事件】
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
     * 更新会议室
     *
     * 当更新会议室时，会触发该事件。
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
     * 创建会议室
     *
     * 当创建会议室时，会触发该事件。
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
     * 停止录制
     *
     * 发生在录制结束时【仅通过Open API预约的会议会产生此类事件】
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
     * 删除会议室
     *
     * 当删除会议室时，会触发该事件。
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
     * 会议开始
     *
     * 发生在会议开始时【仅通过Open API预约的会议会产生此类事件】
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
     * 删除会议室层级
     *
     * 当删除会议室层级时，会触发该事件。
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
     * 会议结束
     *
     * 发生在会议结束时【仅通过Open API预约的会议会产生此类事件】
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
     * 离开会议
     *
     * 发生在有人离开会议时【仅通过Open API预约的会议会产生此类事件】
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
     * 完成录制
     *
     * 发生在录制文件上传完毕时【仅通过Open API预约的会议会产生此类事件】
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
     * 更新会议室层级
     *
     * 当更新会议室层级时，会触发该事件。
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
    /**
     * 创建会议室层级
     *
     * 当创建会议室层级时，会触发该事件。
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
     * 更新会议室预定限制
     *
     * 当更新会议室预定限制时，会触发该事件。
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
            allow_depts?: Array<{
                department_id: string;
                department_name?: string;
            }>;
        };
    }) => Promise<any> | any;
    /**
     * 纪要生成
     *
     * 当与用户有关联的纪要生成后，将会触发该事件。;;用户关联的纪要包括：;- 参与的会议所生成的纪要;- 录音或者上传音视频文件所生成的纪要
     */
    "vc.note.generated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        note_id?: string;
        subscriber_ids?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
     * 参与的会议结束
     *
     * 当用户加入过的会议结束后，将会触发该事件。
     */
    "vc.meeting.participant_meeting_ended_v1"?: (data: {
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
        subscriber_ids?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
         
         */
    "vc.material.review_result_v1"?: (data: {
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
        results?: Array<{ file_token?: string; result?: number }>;
    }) => Promise<any> | any;
    /**
         
         */
    "vc.meeting.send_meeting_im_v1"?: (data: {
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
            meeting_source?: number;
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
            user_type?: number;
        };
        content?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "vc.recording.recording_started_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        unique_key?: string;
        source?: string;
        subscriber_ids?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
         
         */
    "vc.recording.recording_ended_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        unique_key?: string;
        source?: string;
        subscriber_ids?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
         
         */
    "vc.recording.recording_transcript_generated_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        unique_key?: string;
        source?: string;
        subscriber_ids?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
        transcript_items?: Array<{
            speaker?: {
                id?: string;
                user_type?: number;
                user_role?: number;
                user_name?: string;
            };
            text?: string;
            language?: string;
            start_time_ms?: string;
            end_time_ms?: string;
            sentence_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
         
         */
    "vc.bot.meeting_invited_v1"?: (data: {
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
            start_time?: string;
            end_time?: string;
            host_user?: {
                id?: string;
                user_type?: number;
                user_role?: number;
                user_name?: string;
            };
        };
        bot?: {
            id?: string;
            user_type?: number;
            user_role?: number;
            user_name?: string;
        };
        inviter?: {
            id?: string;
            user_type?: number;
            user_role?: number;
            user_name?: string;
        };
        invite_time?: string;
        call_id?: string;
    }) => Promise<any> | any;
    /**
         
         */
    "vc.meeting.participant_meeting_started_v1"?: (data: {
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
        subscriber_ids?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
         
         */
    "vc.meeting.participant_meeting_joined_v1"?: (data: {
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
        subscriber_ids?: Array<{
            union_id?: string;
            user_id?: string;
            open_id?: string;
        }>;
    }) => Promise<any> | any;
    /**
         
         */
    "vc.bot.meeting_ended_v1"?: (data: {
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
            start_time?: string;
            end_time?: string;
            host_user?: {
                id?: string;
                user_type?: number;
                user_role?: number;
                user_name?: string;
            };
        };
    }) => Promise<any> | any;
    /**
         
         */
    "vc.bot.meeting_started_v1"?: (data: {
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
            start_time?: string;
            end_time?: string;
            host_user?: {
                id?: string;
                user_type?: number;
                user_role?: number;
                user_name?: string;
            };
        };
    }) => Promise<any> | any;
    /**
         
         */
    "vc.bot.meeting_activity_v1"?: (data: {
        event_id?: string;
        token?: string;
        create_time?: string;
        event_type?: string;
        tenant_key?: string;
        ts?: string;
        uuid?: string;
        type?: string;
        app_id?: string;
        meeting_activity_items?: Array<{
            meeting?: {
                id?: string;
                topic?: string;
                meeting_no?: string;
                start_time?: string;
                end_time?: string;
                host_user?: {
                    id?: string;
                    user_type?: number;
                    user_role?: number;
                    user_name?: string;
                };
            };
            activity_event_type?: string;
            participant_joined_items?: Array<{
                participant?: {
                    id?: string;
                    user_type?: number;
                    user_role?: number;
                    user_name?: string;
                };
                join_time?: string;
            }>;
            participant_left_items?: Array<{
                participant?: {
                    id?: string;
                    user_type?: number;
                    user_role?: number;
                    user_name?: string;
                };
                leave_reason?: number;
                leave_time?: string;
            }>;
            transcript_received_items?: Array<{
                speaker?: {
                    id?: string;
                    user_type?: number;
                    user_role?: number;
                    user_name?: string;
                };
                text?: string;
                language?: string;
                start_time_ms?: string;
                end_time_ms?: string;
                sentence_id?: string;
            }>;
            chat_received_items?: Array<{
                operator?: {
                    id?: string;
                    user_type?: number;
                    user_role?: number;
                    user_name?: string;
                };
                message_id?: string;
                message_type?: number;
                content?: string;
                send_time?: string;
            }>;
            magic_share_started_items?: Array<{
                operator?: {
                    id?: string;
                    user_type?: number;
                    user_role?: number;
                    user_name?: string;
                };
                share_id?: string;
                share_doc?: { url?: string; title?: string };
                time?: string;
            }>;
            magic_share_ended_items?: Array<{
                operator?: {
                    id?: string;
                    user_type?: number;
                    user_role?: number;
                    user_name?: string;
                };
                share_id?: string;
                time?: string;
            }>;
            document_context_changed_items?: Array<{
                operator?: {
                    id?: string;
                    user_type?: number;
                    user_role?: number;
                    user_name?: string;
                };
                share_id?: string;
                share_doc?: { url?: string; title?: string };
                time?: string;
                comment_focus?: { comment_id?: string; focused?: boolean };
                section_location?: {
                    title?: string;
                    level?: number;
                    parent_titles?: Array<string>;
                };
                element_preview?: {
                    action?: string;
                    element_type?: string;
                    element_token?: string;
                    block_id?: string;
                };
            }>;
        }>;
    }) => Promise<any> | any;
}
