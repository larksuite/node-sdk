export interface IOtherEventHandles {
    p2p_chat_create?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        chat_id: string;
        operator: {
            open_id: string;
            user_id: string;
        };
        tenant_key: string;
        user: {
            name: string;
            open_id: string;
            user_id: string;
        };
    }) => Promise<any> | any;
    third_party_meeting_room_event_created?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        tenant_key: string;
        event_time: string;
        uid: string;
        original_time: number;
        start: {
            time_stamp: string;
        };
        end: {
            time_stamp: string;
        };
        meeting_rooms: [
            {
                open_id: string;
            },
            {
                open_id: string;
            }
        ];
        organizer: {
            open_id: string;
            user_id: string;
        };
    }) => Promise<any> | any;
    remedy_approval?: (data: {
        event_id: string;
        token: string;
        app_id: string;
        tenant_key: string;
        type: string;
        instance_code: string;
        employee_id: string;
        open_id: string;
        start_time: number;
        end_time: number;
        shift_time: string;
        return_time: string;
        shift_reason: string;
    }) => Promise<any> | any;
    leave_approvalV2?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        tenant_key: string;
        instance_code: string;
        user_id: string;
        open_id: string;
        origin_instance_code: string;
        start_time: number;
        end_time: number;
        leave_feeding_arrive_late: number;
        leave_feeding_leave_early: number;
        leave_feeding_rest_daily: number;
        leave_name: string;
        leave_unit: string;
        leave_start_time: string;
        leave_end_time: string;
        leave_detail: Array<[number, number]>;
        leave_range: Array<[number, number]>;
        leave_interval: number;
        leave_reason: string;
        i18n_resources: Array<{
            locale: string;
            is_default: boolean;
            texts: Record<string, string>;
        }>;
    }) => Promise<any> | any;
    work_approval?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        tenant_key: string;
        instance_code: string;
        employee_id: string;
        open_id: string;
        start_time: number;
        end_time: number;
        work_type: string;
        work_start_time: string;
        work_end_time: string;
        work_interval: number;
        work_reason: string;
    }) => Promise<any> | any;
    shift_approval?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        tenant_key: string;
        instance_code: string;
        employee_id: string;
        open_id: string;
        start_time: number;
        end_time: number;
        shift_time: string;
        return_time: string;
        shift_reason: string;
    }) => Promise<any> | any;
    trip_approval?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        tenant_key: string;
        instance_code: string;
        employee_id: string;
        open_id: string;
        start_time: number;
        end_time: number;
        schedules: Array<{
            trip_start_time: string;
            trip_end_time: string;
            trip_interval: number;
            departure: string;
            destination: string;
            transportation: string;
            trip_type: string;
            remark: string;
        }>;
        trip_interval: number;
        trip_reason: string;
        trip_peers: Array<string>;
    }) => Promise<any> | any;
    out_approval?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        i18n_resources: Array<{
            is_default: boolean;
            locale: string;
            texts: Record<string, string>;
        }>;
        instance_code: string;
        out_image: string;
        out_interval: number;
        out_name: string;
        out_reason: string;
        out_start_time: string;
        out_end_time: string;
        out_unit: string;
        start_time: number;
        end_time: number;
        tenant_key: string;
        open_id: string;
        user_id: string;
    }) => Promise<any> | any;
    app_open?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        tenant_key: string;
        applicants: Array<{
            open_id: string;
        }>;
        installer: {
            open_id: string;
        };
        installer_employee: {
            open_id: string;
        };
    }) => Promise<any> | any;
    app_status_change?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        tenant_key: string;
        status: string;
        operator: {
            open_id: string;
            user_id: string;
            union_id: string;
        };
    }) => Promise<any> | any;
    order_paid?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        order_id: string;
        price_plan_id: string;
        price_plan_type: string;
        seats: number;
        buy_count: number;
        create_time: string;
        pay_time: string;
        buy_type: string;
        src_order_id: string;
        order_pay_price: number;
        tenant_key: string;
    }) => Promise<any> | any;
    app_ticket?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        app_ticket: string;
    }) => Promise<any> | any;
    app_uninstalled?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        tenant_key: string;
    }) => Promise<any> | any;
    /**
     * @deprecated: https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM//event/employee-change
     */
    user_status_change?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        tenant_key: string;
        open_id: string;
        employee_id: string;
        union_id: string;
        before_status: {
            is_active: boolean;
            is_frozen: boolean;
            is_resigned: boolean;
        };
        change_time: string;
        current_status: {
            is_active: boolean;
            is_frozen: boolean;
            is_resigned: boolean;
        };
    }) => Promise<any> | any;
    /**
     * @deprecated: https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM//event/employee-change
     */
    user_add?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        tenant_key: string;
        open_id: string;
        employee_id: string;
        union_id: string;
    }) => Promise<any> | any;
    /**
     * @deprecated: https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM//event/department-update
     */
    dept_add?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        tenant_key: string;
        open_department_id: string;
        department: {
            open_id: string;
            custom_id: string;
        };
    }) => Promise<any> | any;
    /**
     * @deprecated: https://open.feishu.cn/document/ukTMukTMukTM/uETNz4SM1MjLxUzM//event/scope-change
     */
    contact_scope_change?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        tenant_key: string;
    }) => Promise<any> | any;
    /**
     * @deprecated: https://open.feishu.cn/document/ukTMukTMukTM/ugzMugzMugzM/event/bot-added-to-group
     */
    add_bot?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        chat_i18n_names: {
            en_us: string;
            zh_cn: string;
        };
        chat_name: string;
        chat_owner_employee_id: string;
        chat_owner_name: string;
        chat_owner_open_id: string;
        open_chat_id: string;
        operator_employee_id: string;
        operator_name: string;
        operator_open_id: string;
        owner_is_bot: boolean;
        tenant_key: string;
    }) => Promise<any> | any;
    /**
     * @deprecated: https://open.feishu.cn/document/ukTMukTMukTM/ugzMugzMugzM/event/bot-removed-from-group
     */
    remove_bot?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        chat_i18n_names: {
            en_us: string;
            zh_cn: string;
        };
        chat_name: string;
        chat_owner_employee_id: string;
        chat_owner_name: string;
        chat_owner_open_id: string;
        open_chat_id: string;
        operator_employee_id: string;
        operator_name: string;
        operator_open_id: string;
        owner_is_bot: boolean;
        tenant_key: string;
    }) => Promise<any> | any;
    /**
     * @deprecated: https://open.feishu.cn/document/ukTMukTMukTM/ugzMugzMugzM/event/receive-message
     */
    message?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        app_id: string;
        tenant_key: string;
        root_id: string;
        parent_id: string;
        open_chat_id: string;
        chat_type: string;
        msg_type: string;
        open_id: string;
        employee_id: string;
        union_id: string;
        open_message_id: string;
        is_mention: boolean;
        text: string;
        text_without_at_bot: string;
    }) => Promise<any> | any;
    /**
     * @deprecated: https://open.feishu.cn/document/ukTMukTMukTM/ugzMugzMugzM/event/message-read
     */
    message_read?: (data: {
        ts: string;
        uuid: string;
        token: string;
        app_id: string;
        open_chat_id: string;
        open_id: string;
        open_message_ids: Array<string>;
        tenant_key: string;
        type: string;
    }) => Promise<any> | any;
    /**
     * @deprecated: https://open.feishu.cn/document/ukTMukTMukTM/uQDOwUjL0gDM14CN4ATN/event/user-joins-or-leave-group
     */
    add_user_to_chat?: (data: {
        ts: string;
        uuid: string;
        token: string;
        app_id: string;
        chat_id: string;
        operator: {
            open_id: string;
            user_id: string;
        };
        tenant_key: string;
        type: string;
        users: Array<{
            name: string;
            open_id: string;
            user_id: string;
        }>;
    }) => Promise<any> | any;
    /**
     * @deprecated: https://open.feishu.cn/document/ukTMukTMukTM/uQDOwUjL0gDM14CN4ATN/event/group-closed
     */
    chat_disband?: (data: {
        ts: string;
        uuid: string;
        token: string;
        app_id: string;
        chat_id: string;
        operator: {
            open_id: string;
            user_id: string;
        };
        tenant_key: string;
        type: string;
    }) => Promise<any> | any;
    /**
     * @deprecated: https://open.feishu.cn/document/ukTMukTMukTM/uQDOwUjL0gDM14CN4ATN/event/group-configuration-changes
     */
    group_setting_update?: (data: {
        ts: string;
        uuid: string;
        token: string;
        type: string;
        tenant_key: string;
        app_id: string;
        chat_id: string;
        after_change: {
            owner_open_id: string;
            owner_user_id: string;
            add_member_permission: string;
            message_notification: boolean;
        };
        before_change: any;
        operator: {
            open_id: string;
            user_id: string;
        };
    }) => Promise<any> | any;
}
