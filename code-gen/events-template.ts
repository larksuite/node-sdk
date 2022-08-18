/* eslint-disable no-unused-vars */
import { IOtherEventHandles } from "./other-event-handles";

// auto gen
export interface IHandles extends IOtherEventHandles {
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
        };
    }) => Promise<any> | any;
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
        };
        old_object?: { department_ids?: Array<string>; open_id?: string };
    }) => Promise<any> | any;
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
        };
    }) => Promise<any> | any;
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
        };
    }) => Promise<any> | any;
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
        };
    }) => Promise<any> | any;
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
        };
        old_object?: {
            status?: { is_deleted?: boolean };
            open_department_id?: string;
        };
    }) => Promise<any> | any;
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
    }) => Promise<any> | any;
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
            dissatisfaction_reason?: Array<string>;
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
    }) => Promise<any> | any;
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
    }) => Promise<any> | any;
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
    }) => Promise<any> | any;
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
    }) => Promise<any> | any;
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
    }) => Promise<any> | any;
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
    }) => Promise<any> | any;
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
            owner?: {
                id?: { union_id?: string; user_id?: string; open_id?: string };
            };
        };
        url?: string;
        duration?: string;
    }) => Promise<any> | any;
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
}
