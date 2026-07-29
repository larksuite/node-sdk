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
import vault from "./vault";

// auto gen
export default abstract class Client extends vault {
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
    vc = {
        /**
         * meeting.recording
         */
        meetingRecording: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting.recording&apiName=start&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=start&project=vc&resource=meeting.recording&version=v1 document }
             *
             * 开始录制
             *
             * 在会议中开始录制。
             *
             * 会议正在进行中，且操作者具有相应权限（如果操作者为用户，必须是会中当前主持人）
             */
            start: async (
                payload?: {
                    data?: { timezone?: number };
                    path?: { meeting_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/meetings/:meeting_id/recording/start`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting.recording&apiName=stop&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=stop&project=vc&resource=meeting.recording&version=v1 document }
             *
             * 停止录制
             *
             * 在会议中停止录制。
             *
             * 会议正在录制中，且操作者具有相应权限（如果操作者为用户，必须是会中当前主持人）
             */
            stop: async (
                payload?: {
                    path?: { meeting_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/meetings/:meeting_id/recording/stop`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting.recording&apiName=set_permission&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=set_permission&project=vc&resource=meeting.recording&version=v1 document }
             *
             * 授权录制文件
             *
             * 将一个会议的录制文件授权给组织、用户或公开到公网。
             *
             * 会议结束后并且收到了"录制完成"的事件方可进行授权；会议owner（通过开放平台预约的会议即为预约人）才有权限操作
             */
            setPermission: async (
                payload?: {
                    data: {
                        permission_objects: Array<{
                            id?: string;
                            type: number;
                            permission: number;
                        }>;
                        action_type?: number;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { meeting_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/meetings/:meeting_id/recording/set_permission`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting.recording&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=meeting.recording&version=v1 document }
             *
             * 获取录制文件
             *
             * 获取一个会议的录制文件。
             */
            get: async (
                payload?: {
                    path?: { meeting_id?: string };
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
                                recording?: {
                                    id?: string;
                                    meeting_id?: string;
                                    url?: string;
                                    duration?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/meetings/:meeting_id/recording`,
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
         * room_config
         */
        roomConfig: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_config&apiName=set_checkboard_access_code&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=set_checkboard_access_code&project=vc&resource=room_config&version=v1 document }
             *
             * 创建签到板部署码
             *
             * 创建一个范围内的签到板部署码
             */
            setCheckboardAccessCode: async (
                payload?: {
                    data: {
                        scope: number;
                        country_id?: string;
                        district_id?: string;
                        building_id?: string;
                        floor_name?: string;
                        room_id?: string;
                        valid_day: number;
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
                            data?: { access_code?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/room_configs/set_checkboard_access_code`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_config&apiName=set_room_access_code&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=set_room_access_code&project=vc&resource=room_config&version=v1 document }
             *
             * 创建会议室部署码
             *
             * 创建一个范围内的会议室部署码
             */
            setRoomAccessCode: async (
                payload?: {
                    data: {
                        scope: number;
                        country_id?: string;
                        district_id?: string;
                        building_id?: string;
                        floor_name?: string;
                        room_id?: string;
                        valid_day: number;
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
                            data?: { access_code?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/room_configs/set_room_access_code`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_config&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=vc&resource=room_config&version=v1 document }
             *
             * 查询会议室配置
             *
             * 查询一个范围内的会议室配置。
             *
             * 根据查询范围传入对应的参数
             */
            query: async (
                payload?: {
                    params: {
                        scope: number;
                        country_id?: string;
                        district_id?: string;
                        building_id?: string;
                        floor_name?: string;
                        room_id?: string;
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
                                room_background?: string;
                                display_background?: string;
                                digital_signage?: {
                                    if_cover_child_scope?: boolean;
                                    enable?: boolean;
                                    mute?: boolean;
                                    start_display?: number;
                                    stop_display?: number;
                                    materials?: Array<{
                                        id?: string;
                                        name?: string;
                                        material_type?: number;
                                        url?: string;
                                        duration?: number;
                                        cover?: string;
                                        md5?: string;
                                        vid?: string;
                                        size?: string;
                                    }>;
                                };
                                room_box_digital_signage?: {
                                    if_cover_child_scope?: boolean;
                                    enable?: boolean;
                                    mute?: boolean;
                                    start_display?: number;
                                    stop_display?: number;
                                    materials?: Array<{
                                        id?: string;
                                        name?: string;
                                        material_type?: number;
                                        url?: string;
                                        duration?: number;
                                        cover?: string;
                                        md5?: string;
                                        vid?: string;
                                        size?: string;
                                    }>;
                                };
                                room_status?: {
                                    status: boolean;
                                    schedule_status?: boolean;
                                    disable_start_time?: string;
                                    disable_end_time?: string;
                                    disable_reason?: string;
                                    contact_ids?: Array<string>;
                                    disable_notice?: boolean;
                                    resume_notice?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/room_configs/query`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_config&apiName=set&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=set&project=vc&resource=room_config&version=v1 document }
             *
             * 设置会议室配置
             *
             * 设置一个范围内的会议室配置。
             *
             * 根据设置范围传入对应的参数
             */
            set: async (
                payload?: {
                    data: {
                        scope: number;
                        country_id?: string;
                        district_id?: string;
                        building_id?: string;
                        floor_name?: string;
                        room_id?: string;
                        room_config: {
                            room_background?: string;
                            display_background?: string;
                            digital_signage?: {
                                if_cover_child_scope?: boolean;
                                enable?: boolean;
                                mute?: boolean;
                                start_display?: number;
                                stop_display?: number;
                                materials?: Array<{
                                    id?: string;
                                    name?: string;
                                    material_type?: number;
                                    url?: string;
                                    duration?: number;
                                    cover?: string;
                                    md5?: string;
                                    vid?: string;
                                    size?: string;
                                }>;
                            };
                            room_box_digital_signage?: {
                                if_cover_child_scope?: boolean;
                                enable?: boolean;
                                mute?: boolean;
                                start_display?: number;
                                stop_display?: number;
                                materials?: Array<{
                                    id?: string;
                                    name?: string;
                                    material_type?: number;
                                    url?: string;
                                    duration?: number;
                                    cover?: string;
                                    md5?: string;
                                    vid?: string;
                                    size?: string;
                                }>;
                            };
                            room_status?: {
                                status: boolean;
                                disable_start_time?: string;
                                disable_end_time?: string;
                                disable_reason?: string;
                                contact_ids?: Array<string>;
                                disable_notice?: boolean;
                                resume_notice?: boolean;
                            };
                        };
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
                            `${this.domain}/open-apis/vc/v1/room_configs/set`,
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
         * reserve
         */
        reserve: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=vc&resource=reserve&version=v1 document }
             *
             * 删除预约
             *
             * 删除一个预约。
             *
             * 只能删除归属于自己的预约；删除后数据不可恢复
             */
            delete: async (
                payload?: {
                    path?: { reserve_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/reserves/:reserve_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=reserve&version=v1 document }
             *
             * 获取预约
             *
             * 获取一个预约的详情。
             *
             * 只能获取归属于自己的预约
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { reserve_id?: string };
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
                                reserve?: {
                                    id?: string;
                                    meeting_no?: string;
                                    password?: string;
                                    url?: string;
                                    app_link?: string;
                                    live_link?: string;
                                    end_time?: string;
                                    expire_status?: number;
                                    reserve_user_id?: string;
                                    meeting_settings?: {
                                        topic?: string;
                                        action_permissions?: Array<{
                                            permission: number;
                                            permission_checkers: Array<{
                                                check_field: number;
                                                check_mode: number;
                                                check_list: Array<string>;
                                            }>;
                                        }>;
                                        meeting_initial_type?: number;
                                        meeting_connect?: boolean;
                                        call_setting?: {
                                            callee: {
                                                id?: string;
                                                user_type: number;
                                                pstn_sip_info?: {
                                                    nickname?: string;
                                                    main_address: string;
                                                };
                                            };
                                        };
                                        auto_record?: boolean;
                                        assign_host_list?: Array<{
                                            user_type?: number;
                                            id?: string;
                                        }>;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/reserves/:reserve_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=vc&resource=reserve&version=v1 document }
             *
             * 更新预约
             *
             * 更新一个预约。
             *
             * 只能更新归属于自己的预约，不需要更新的字段不传（如果传空则会被更新为空）；可用于续期操作，到期时间距离当前时间不超过30天
             */
            update: async (
                payload?: {
                    data?: {
                        end_time?: string;
                        meeting_settings?: {
                            topic?: string;
                            action_permissions?: Array<{
                                permission: number;
                                permission_checkers: Array<{
                                    check_field: number;
                                    check_mode: number;
                                    check_list: Array<string>;
                                }>;
                            }>;
                            meeting_initial_type?: number;
                            meeting_connect?: boolean;
                            call_setting?: {
                                callee: {
                                    id?: string;
                                    user_type: number;
                                    pstn_sip_info?: {
                                        nickname?: string;
                                        main_address: string;
                                    };
                                };
                            };
                            auto_record?: boolean;
                            assign_host_list?: Array<{
                                user_type?: number;
                                id?: string;
                            }>;
                            password?: string;
                        };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { reserve_id?: string };
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
                                reserve?: {
                                    id?: string;
                                    meeting_no?: string;
                                    password?: string;
                                    url?: string;
                                    live_link?: string;
                                    end_time?: string;
                                    expire_status?: number;
                                };
                                reserve_correction_check_info?: {
                                    invalid_host_id_list?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/reserves/:reserve_id`,
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve&apiName=apply&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=apply&project=vc&resource=reserve&version=v1 document }
             *
             * 预约会议
             *
             * 创建一个会议预约。
             *
             * 支持预约最近30天内的会议（到期时间距离当前时间不超过30天），预约到期后会议号将被释放，如需继续使用可通过"更新预约"接口进行续期；预约会议时可配置参会人在会中的权限，以达到控制会议的目的。;;以此方式预约的会议「不会」生成日程，「不会」显示在日历中
             */
            apply: async (
                payload?: {
                    data: {
                        end_time?: string;
                        owner_id?: string;
                        meeting_settings: {
                            topic?: string;
                            action_permissions?: Array<{
                                permission: number;
                                permission_checkers: Array<{
                                    check_field: number;
                                    check_mode: number;
                                    check_list: Array<string>;
                                }>;
                            }>;
                            meeting_initial_type?: number;
                            meeting_connect?: boolean;
                            call_setting?: {
                                callee: {
                                    id?: string;
                                    user_type: number;
                                    pstn_sip_info?: {
                                        nickname?: string;
                                        main_address: string;
                                    };
                                };
                            };
                            auto_record?: boolean;
                            assign_host_list?: Array<{
                                user_type?: number;
                                id?: string;
                            }>;
                            password?: string;
                        };
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
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                reserve?: {
                                    id?: string;
                                    meeting_no?: string;
                                    password?: string;
                                    url?: string;
                                    app_link?: string;
                                    live_link?: string;
                                    end_time?: string;
                                };
                                reserve_correction_check_info?: {
                                    invalid_host_id_list?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/reserves/apply`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve&apiName=get_active_meeting&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_active_meeting&project=vc&resource=reserve&version=v1 document }
             *
             * 获取活跃会议
             *
             * 获取一个预约的当前活跃会议。
             *
             * 只能获取归属于自己的预约的活跃会议（一个预约最多有一个正在进行中的会议）
             */
            getActiveMeeting: async (
                payload?: {
                    params?: {
                        with_participants?: boolean;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { reserve_id?: string };
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
                                meeting?: {
                                    id?: string;
                                    topic?: string;
                                    url?: string;
                                    meeting_no?: string;
                                    password?: string;
                                    create_time?: string;
                                    start_time?: string;
                                    end_time?: string;
                                    host_user?: {
                                        id?: string;
                                        user_type?: number;
                                    };
                                    meeting_connect?: boolean;
                                    status?: number;
                                    participant_count?: string;
                                    participant_count_accumulated?: string;
                                    participants?: Array<{
                                        id?: string;
                                        first_join_time?: string;
                                        final_leave_time?: string;
                                        in_meeting_duration?: string;
                                        user_type?: number;
                                        is_host?: boolean;
                                        is_cohost?: boolean;
                                        is_external?: boolean;
                                        status?: number;
                                    }>;
                                    ability?: {
                                        use_video?: boolean;
                                        use_audio?: boolean;
                                        use_share_screen?: boolean;
                                        use_follow_screen?: boolean;
                                        use_recording?: boolean;
                                        use_pstn?: boolean;
                                    };
                                    note_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/reserves/:reserve_id/get_active_meeting`,
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
         * meeting
         */
        meeting: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=end&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=end&project=vc&resource=meeting&version=v1 document }
             *
             * 结束会议
             *
             * 结束一个进行中的会议。
             *
             * 会议正在进行中，且操作者须具有相应的权限（如果操作者为用户，必须是会中当前主持人）
             */
            end: async (
                payload?: {
                    path?: { meeting_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/meetings/:meeting_id/end`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=kickout&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=kickout&project=vc&resource=meeting&version=v1 document }
             *
             * 移除参会人
             *
             * 将参会人从会议中移除。
             */
            kickout: async (
                payload?: {
                    data: {
                        kickout_users: Array<{
                            id?: string;
                            user_type?: number;
                        }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { meeting_id?: string };
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
                                kickout_results?: Array<{
                                    id?: string;
                                    user_type?: number;
                                    result?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/meetings/:meeting_id/kickout`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=set_host&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=set_host&project=vc&resource=meeting&version=v1 document }
             *
             * 设置主持人
             *
             * 设置会议的主持人。
             *
             * 发起设置主持人的操作者必须具有相应的权限（如果操作者为用户，必须是会中当前主持人）；该操作使用CAS并发安全机制，需传入会中当前主持人，如果操作失败可使用返回的最新数据重试
             */
            setHost: async (
                payload?: {
                    data: {
                        host_user: { id?: string; user_type?: number };
                        old_host_user?: { id?: string; user_type?: number };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { meeting_id?: string };
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
                                host_user?: { id?: string; user_type?: number };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/meetings/:meeting_id/set_host`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=invite&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=invite&project=vc&resource=meeting&version=v1 document }
             *
             * 邀请参会人
             *
             * 邀请参会人进入会议。
             *
             * 发起邀请的操作者必须具有相应的权限（如果操作者为用户，则必须在会中），如果会议被锁定、或参会人数如果达到上限，则会邀请失败
             */
            invite: async (
                payload?: {
                    data: {
                        invitees: Array<{ id?: string; user_type?: number }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { meeting_id?: string };
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
                                invite_results?: Array<{
                                    id?: string;
                                    user_type?: number;
                                    status?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/meetings/:meeting_id/invite`,
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
            listByNoWithIterator: async (
                payload?: {
                    params: {
                        meeting_no: string;
                        start_time: string;
                        end_time: string;
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
                                `${this.domain}/open-apis/vc/v1/meetings/list_by_no`,
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
                                                has_more?: boolean;
                                                page_token?: string;
                                                meeting_briefs?: Array<{
                                                    id?: string;
                                                    topic?: string;
                                                    url?: string;
                                                    meeting_no?: string;
                                                    password?: string;
                                                    meeting_connect?: boolean;
                                                    note_id?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=list_by_no&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_by_no&project=vc&resource=meeting&version=v1 document }
             *
             * 获取与会议号关联的会议列表
             *
             * 获取指定时间范围内与会议号关联的会议简要信息列表。
             *
             * 仅支持查询 90 天内的数据。
             */
            listByNo: async (
                payload?: {
                    params: {
                        meeting_no: string;
                        start_time: string;
                        end_time: string;
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
                                has_more?: boolean;
                                page_token?: string;
                                meeting_briefs?: Array<{
                                    id?: string;
                                    topic?: string;
                                    url?: string;
                                    meeting_no?: string;
                                    password?: string;
                                    meeting_connect?: boolean;
                                    note_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/meetings/list_by_no`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=meeting&version=v1 document }
             *
             * 获取会议详情
             *
             * 根据会议 ID 获取指定会议的详细信息，包括会议主题、链接、主持人、参会人员、状态、时间信息及关联纪要 ID。
             *
             * 只能获取归属于自己的会议，支持查询最近90天内的会议
             */
            get: async (
                payload?: {
                    params?: {
                        with_participants?: boolean;
                        with_meeting_ability?: boolean;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        query_mode?: number;
                    };
                    path?: { meeting_id?: string };
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
                                meeting?: {
                                    id?: string;
                                    topic?: string;
                                    url?: string;
                                    meeting_no?: string;
                                    password?: string;
                                    create_time?: string;
                                    start_time?: string;
                                    end_time?: string;
                                    host_user?: {
                                        id?: string;
                                        user_type?: number;
                                    };
                                    meeting_connect?: boolean;
                                    status?: number;
                                    participant_count?: string;
                                    participant_count_accumulated?: string;
                                    participants?: Array<{
                                        id?: string;
                                        first_join_time?: string;
                                        final_leave_time?: string;
                                        in_meeting_duration?: string;
                                        user_type?: number;
                                        is_host?: boolean;
                                        is_cohost?: boolean;
                                        is_external?: boolean;
                                        status?: number;
                                    }>;
                                    ability?: {
                                        use_video?: boolean;
                                        use_audio?: boolean;
                                        use_share_screen?: boolean;
                                        use_follow_screen?: boolean;
                                        use_recording?: boolean;
                                        use_pstn?: boolean;
                                    };
                                    note_id?: string;
                                };
                                related_artifacts?: {
                                    note_doc_token?: string;
                                    verbatim_doc_token?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/meetings/:meeting_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=subscription&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=vc&resource=meeting&version=v1 document }
             *
             * 订阅会议变更事件
             *
             * 订阅当前用户身份相关的会议资源变更事件。通过指定事件类型，来订阅会议资源不同的事件变更。
             */
            subscription: async (
                payload?: {
                    data?: { event_type?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/meetings/subscription`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=unsubscription&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscription&project=vc&resource=meeting&version=v1 document }
             *
             * 取消订阅会议变更事件
             *
             * 取消订阅当前用户身份相关的会议资源变更事件。通过指定事件类型，来取消订阅会议资源对应的事件变更。
             */
            unsubscription: async (
                payload?: {
                    data?: { event_type?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/meetings/unsubscription`,
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
            searchWithIterator: async (
                payload?: {
                    data?: {
                        query?: string;
                        meeting_filter?: {
                            organizer_ids?: Array<string>;
                            participant_ids?: Array<string>;
                            open_room_ids?: Array<string>;
                            start_time?: {
                                start_time?: string;
                                end_time?: string;
                            };
                        };
                    };
                    params?: { page_token?: string; page_size?: number };
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
                                `${this.domain}/open-apis/vc/v1/meetings/search`,
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
                                                total?: number;
                                                has_more: boolean;
                                                items?: Array<{
                                                    id?: string;
                                                    display_info?: string;
                                                    meta_data?: {
                                                        app_link?: string;
                                                        avatar?: string;
                                                        description?: string;
                                                    };
                                                }>;
                                                page_token?: string;
                                                notice?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=vc&resource=meeting&version=v1 document }
             *
             * 搜索会议记录（测试）
             *
             * 根据关键词、时间范围等条件搜索会议记录，返回符合条件的会议列表，包含会议 ID、主题、开始时间及参与者等信息。
             */
            search: async (
                payload?: {
                    data?: {
                        query?: string;
                        meeting_filter?: {
                            organizer_ids?: Array<string>;
                            participant_ids?: Array<string>;
                            open_room_ids?: Array<string>;
                            start_time?: {
                                start_time?: string;
                                end_time?: string;
                            };
                        };
                    };
                    params?: { page_token?: string; page_size?: number };
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
                                total?: number;
                                has_more: boolean;
                                items?: Array<{
                                    id?: string;
                                    display_info?: string;
                                    meta_data?: {
                                        app_link?: string;
                                        avatar?: string;
                                        description?: string;
                                    };
                                }>;
                                page_token?: string;
                                notice?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/meetings/search`,
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
         * alert
         */
        alert: {
            listWithIterator: async (
                payload?: {
                    params: {
                        start_time: string;
                        end_time: string;
                        query_type?: number;
                        query_value?: string;
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
                                `${this.domain}/open-apis/vc/v1/alerts`,
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
                                                has_more?: boolean;
                                                page_token?: string;
                                                items?: Array<{
                                                    alert_id?: string;
                                                    resource_scope?: string;
                                                    monitor_target?: number;
                                                    alert_strategy?: string;
                                                    alert_time?: string;
                                                    alert_level?: number;
                                                    contacts?: Array<{
                                                        contact_type?: number;
                                                        contact_name?: string;
                                                    }>;
                                                    notifyMethods?: Array<number>;
                                                    alertRule?: string;
                                                    process_time?: string;
                                                    recover_time?: string;
                                                    process_status?: number;
                                                    alert_rule_id?: string;
                                                    monitor_target_room_id?: string;
                                                    monitor_target_room_mac?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=alert&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=vc&resource=alert&version=v1 document }
             *
             * 获取告警记录
             *
             * 获取特定条件下租户的设备告警记录。
             */
            list: async (
                payload?: {
                    params: {
                        start_time: string;
                        end_time: string;
                        query_type?: number;
                        query_value?: string;
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    alert_id?: string;
                                    resource_scope?: string;
                                    monitor_target?: number;
                                    alert_strategy?: string;
                                    alert_time?: string;
                                    alert_level?: number;
                                    contacts?: Array<{
                                        contact_type?: number;
                                        contact_name?: string;
                                    }>;
                                    notifyMethods?: Array<number>;
                                    alertRule?: string;
                                    process_time?: string;
                                    recover_time?: string;
                                    process_status?: number;
                                    alert_rule_id?: string;
                                    monitor_target_room_id?: string;
                                    monitor_target_room_mac?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/alerts`,
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
         * report
         */
        report: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=report&apiName=get_daily&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_daily&project=vc&resource=report&version=v1 document }
             *
             * 获取会议报告
             *
             * 获取一段时间内组织的每日会议使用报告。
             *
             * 支持最近90天内的数据查询
             */
            getDaily: async (
                payload?: {
                    params: {
                        start_time: string;
                        end_time: string;
                        unit?: number;
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
                                meeting_report?: {
                                    total_meeting_count?: string;
                                    total_meeting_duration?: string;
                                    total_participant_count?: string;
                                    daily_report?: Array<{
                                        date?: string;
                                        meeting_count?: string;
                                        meeting_duration?: string;
                                        participant_count?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/reports/get_daily`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=report&apiName=get_top_user&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_top_user&project=vc&resource=report&version=v1 document }
             *
             * 获取 Top 用户列表
             *
             * 获取一段时间内组织内会议使用的 Top 用户列表。
             *
             * 支持最近90天内的数据查询；默认返回前10位，最多可查询前100位
             */
            getTopUser: async (
                payload?: {
                    params: {
                        start_time: string;
                        end_time: string;
                        limit: number;
                        order_by: number;
                        unit?: number;
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
                                top_user_report?: Array<{
                                    id?: string;
                                    name?: string;
                                    user_type?: number;
                                    meeting_count?: string;
                                    meeting_duration?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/reports/get_top_user`,
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
         * room
         */
        room: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=vc&resource=room&version=v1 document }
             *
             * 搜索会议室
             *
             * 该接口可以用来搜索会议室，支持使用关键词进行搜索，也支持使用自定义会议室 ID 进行查询。该接口只会返回用户有预定权限的会议室列表。
             */
            search: async (
                payload?: {
                    data?: {
                        custom_room_ids?: Array<string>;
                        keyword?: string;
                        room_level_id?: string;
                        search_level_name?: boolean;
                        page_size?: number;
                        page_token?: string;
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
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                rooms?: Array<{
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
                                        contact_ids?: Array<string>;
                                        disable_notice?: boolean;
                                        resume_notice?: boolean;
                                    };
                                    device?: Array<{ name: string }>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/rooms/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room&apiName=mget&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=vc&resource=room&version=v1 document }
             *
             * 批量查询会议室详情
             *
             * 该接口可以使用会议室 ID 批量查询会议室详情。
             */
            mget: async (
                payload?: {
                    data: { room_ids: Array<string> };
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
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                items?: Array<{
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
                                        contact_ids?: Array<string>;
                                        disable_notice?: boolean;
                                        resume_notice?: boolean;
                                    };
                                    device?: Array<{ name: string }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/rooms/mget`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=room&version=v1 document }
             *
             * 查询会议室详情
             *
             * 该接口可以使用会议室 ID 查询会议室详情。
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { room_id: string };
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
                                        contact_ids?: Array<string>;
                                        disable_notice?: boolean;
                                        resume_notice?: boolean;
                                    };
                                    device?: Array<{ name: string }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/rooms/:room_id`,
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
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        room_level_id?: string;
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
                                `${this.domain}/open-apis/vc/v1/rooms`,
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
                                                rooms?: Array<{
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
                                                        contact_ids?: Array<string>;
                                                        disable_notice?: boolean;
                                                        resume_notice?: boolean;
                                                    };
                                                    device?: Array<{
                                                        name: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=vc&resource=room&version=v1 document }
             *
             * 查询会议室列表
             *
             * 该接口可以用来查询某个会议室层级下会议室列表。
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        room_level_id?: string;
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
                                rooms?: Array<{
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
                                        contact_ids?: Array<string>;
                                        disable_notice?: boolean;
                                        resume_notice?: boolean;
                                    };
                                    device?: Array<{ name: string }>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/rooms`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=vc&resource=room&version=v1 document }
             *
             * 删除会议室
             *
             * 该接口可以用来删除某个会议室。
             */
            delete: async (
                payload?: {
                    path: { room_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/rooms/:room_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=vc&resource=room&version=v1 document }
             *
             * 创建会议室
             *
             * 该接口用于创建会议室。
             */
            create: async (
                payload?: {
                    data: {
                        name: string;
                        capacity: number;
                        description?: string;
                        custom_room_id?: string;
                        room_level_id: string;
                        room_status?: {
                            status: boolean;
                            schedule_status?: boolean;
                            disable_start_time?: string;
                            disable_end_time?: string;
                            disable_reason?: string;
                            contact_ids?: Array<string>;
                            disable_notice?: boolean;
                            resume_notice?: boolean;
                        };
                        device?: Array<{ name: string }>;
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
                        {
                            code?: number;
                            msg?: string;
                            data?: {
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
                                        contact_ids?: Array<string>;
                                        disable_notice?: boolean;
                                        resume_notice?: boolean;
                                    };
                                    device?: Array<{ name: string }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/rooms`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=vc&resource=room&version=v1 document }
             *
             * 更新会议室
             *
             * 该接口可以用来更新某个会议室的信息。
             */
            patch: async (
                payload?: {
                    data?: {
                        name?: string;
                        capacity?: number;
                        description?: string;
                        custom_room_id?: string;
                        room_level_id?: string;
                        room_status?: {
                            status: boolean;
                            schedule_status?: boolean;
                            disable_start_time?: string;
                            disable_end_time?: string;
                            disable_reason?: string;
                            contact_ids?: Array<string>;
                            disable_notice?: boolean;
                            resume_notice?: boolean;
                        };
                        device?: Array<{ name: string }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { room_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/rooms/:room_id`,
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
         * resource_reservation_list
         */
        resourceReservationList: {
            getWithIterator: async (
                payload?: {
                    params: {
                        room_level_id: string;
                        need_topic?: boolean;
                        start_time: string;
                        end_time: string;
                        room_ids: Array<string>;
                        is_exclude?: boolean;
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
                                `${this.domain}/open-apis/vc/v1/resource_reservation_list`,
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
                                                room_reservation_list?: Array<{
                                                    room_id?: string;
                                                    room_name?: string;
                                                    event_title?: string;
                                                    reserver?: string;
                                                    reserver_user_id?: string;
                                                    department_of_reserver?: string;
                                                    guests_number?: string;
                                                    accepted_number?: string;
                                                    event_start_time?: string;
                                                    event_end_time?: string;
                                                    event_duration?: string;
                                                    reservation_status?: string;
                                                    check_in_device?: string;
                                                    room_check_in_status?: string;
                                                    check_in_time?: string;
                                                    is_release_early?: string;
                                                    releasing_person?: string;
                                                    releasing_time?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=resource_reservation_list&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=resource_reservation_list&version=v1 document }
             *
             * 查询会议室预定数据
             *
             * 查询会议室预定数据，具体权限要求请参考「资源介绍」。
             */
            get: async (
                payload?: {
                    params: {
                        room_level_id: string;
                        need_topic?: boolean;
                        start_time: string;
                        end_time: string;
                        room_ids: Array<string>;
                        is_exclude?: boolean;
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
                                room_reservation_list?: Array<{
                                    room_id?: string;
                                    room_name?: string;
                                    event_title?: string;
                                    reserver?: string;
                                    reserver_user_id?: string;
                                    department_of_reserver?: string;
                                    guests_number?: string;
                                    accepted_number?: string;
                                    event_start_time?: string;
                                    event_end_time?: string;
                                    event_duration?: string;
                                    reservation_status?: string;
                                    check_in_device?: string;
                                    room_check_in_status?: string;
                                    check_in_time?: string;
                                    is_release_early?: string;
                                    releasing_person?: string;
                                    releasing_time?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/resource_reservation_list`,
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
         * participant_quality_list
         */
        participantQualityList: {
            getWithIterator: async (
                payload?: {
                    params: {
                        meeting_start_time: string;
                        meeting_end_time: string;
                        meeting_no: string;
                        join_time: string;
                        user_id?: string;
                        room_id?: string;
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
                                `${this.domain}/open-apis/vc/v1/participant_quality_list`,
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
                                                participant_quality_list?: Array<{
                                                    network?: {
                                                        time?: string;
                                                        network_delay?: string;
                                                        bitrate_received?: string;
                                                        packet_loss_avg_received?: string;
                                                        packet_loss_max_received?: string;
                                                        bitrate_sent?: string;
                                                        packet_loss_avg_sent?: string;
                                                        packet_loss_max_sent?: string;
                                                    };
                                                    audio?: {
                                                        time?: string;
                                                        mic_input_volume?: string;
                                                        speaker_volume?: string;
                                                        bitrate_received?: string;
                                                        latency_received?: string;
                                                        jitter_received?: string;
                                                        bitrate_sent?: string;
                                                        latency_sent?: string;
                                                        jitter_sent?: string;
                                                    };
                                                    video?: {
                                                        time?: string;
                                                        bitrate_received?: string;
                                                        latency_received?: string;
                                                        jitter_received?: string;
                                                        maximum_resolution_received?: string;
                                                        framerate_received?: string;
                                                        bitrate_sent?: string;
                                                        latency_sent?: string;
                                                        jitter_sent?: string;
                                                        maximum_resolution_sent?: string;
                                                        framerate_sent?: string;
                                                    };
                                                    screen_sharing?: {
                                                        time?: string;
                                                        bitrate_received?: string;
                                                        latency_received?: string;
                                                        jitter_received?: string;
                                                        maximum_resolution_received?: string;
                                                        framerate_received?: string;
                                                        bitrate_sent?: string;
                                                        latency_sent?: string;
                                                        jitter_sent?: string;
                                                        maximum_resolution_sent?: string;
                                                        framerate_sent?: string;
                                                    };
                                                    cpu_usage?: {
                                                        time?: string;
                                                        client_avg_cpu_usage?: string;
                                                        client_max_cpu_usage?: string;
                                                        system_avg_cpu_usage?: string;
                                                        system_max_cpu_usage?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=participant_quality_list&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=participant_quality_list&version=v1 document }
             *
             * 查询参会人会议质量数据
             *
             * 查询参会人会议质量数据（仅支持已结束会议），具体权限要求请参考「资源介绍」。
             */
            get: async (
                payload?: {
                    params: {
                        meeting_start_time: string;
                        meeting_end_time: string;
                        meeting_no: string;
                        join_time: string;
                        user_id?: string;
                        room_id?: string;
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
                                participant_quality_list?: Array<{
                                    network?: {
                                        time?: string;
                                        network_delay?: string;
                                        bitrate_received?: string;
                                        packet_loss_avg_received?: string;
                                        packet_loss_max_received?: string;
                                        bitrate_sent?: string;
                                        packet_loss_avg_sent?: string;
                                        packet_loss_max_sent?: string;
                                    };
                                    audio?: {
                                        time?: string;
                                        mic_input_volume?: string;
                                        speaker_volume?: string;
                                        bitrate_received?: string;
                                        latency_received?: string;
                                        jitter_received?: string;
                                        bitrate_sent?: string;
                                        latency_sent?: string;
                                        jitter_sent?: string;
                                    };
                                    video?: {
                                        time?: string;
                                        bitrate_received?: string;
                                        latency_received?: string;
                                        jitter_received?: string;
                                        maximum_resolution_received?: string;
                                        framerate_received?: string;
                                        bitrate_sent?: string;
                                        latency_sent?: string;
                                        jitter_sent?: string;
                                        maximum_resolution_sent?: string;
                                        framerate_sent?: string;
                                    };
                                    screen_sharing?: {
                                        time?: string;
                                        bitrate_received?: string;
                                        latency_received?: string;
                                        jitter_received?: string;
                                        maximum_resolution_received?: string;
                                        framerate_received?: string;
                                        bitrate_sent?: string;
                                        latency_sent?: string;
                                        jitter_sent?: string;
                                        maximum_resolution_sent?: string;
                                        framerate_sent?: string;
                                    };
                                    cpu_usage?: {
                                        time?: string;
                                        client_avg_cpu_usage?: string;
                                        client_max_cpu_usage?: string;
                                        system_avg_cpu_usage?: string;
                                        system_max_cpu_usage?: string;
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/participant_quality_list`,
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
         * room_level
         */
        roomLevel: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_level&apiName=mget&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=vc&resource=room_level&version=v1 document }
             *
             * 批量查询会议室层级详情
             *
             * 该接口可以使用会议室层级 ID 批量查询会议室层级详情。
             */
            mget: async (
                payload?: {
                    data: { level_ids: Array<string> };
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
                                    room_level_id?: string;
                                    name?: string;
                                    parent_id?: string;
                                    path?: Array<string>;
                                    has_child?: boolean;
                                    custom_group_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/room_levels/mget`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_level&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=room_level&version=v1 document }
             *
             * 查询会议室层级详情
             *
             * 该接口可以使用会议室层级 ID 查询会议室层级详情。
             */
            get: async (
                payload?: {
                    path: { room_level_id: string };
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
                                room_level?: {
                                    room_level_id?: string;
                                    name?: string;
                                    parent_id?: string;
                                    path?: Array<string>;
                                    has_child?: boolean;
                                    custom_group_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/room_levels/:room_level_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_level&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=vc&resource=room_level&version=v1 document }
             *
             * 搜索会议室层级
             *
             * 该接口可以用来搜索会议室层级，支持使用自定义会议室层级 ID 进行查询。
             */
            search: async (
                payload?: {
                    params: { custom_level_ids: string };
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
                            data?: { level_ids?: Array<string> };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/room_levels/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_level&apiName=del&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=del&project=vc&resource=room_level&version=v1 document }
             *
             * 删除会议室层级
             *
             * 该接口可以用来删除某个会议室层级。
             */
            del: async (
                payload?: {
                    data: { room_level_id: string; delete_child?: boolean };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/room_levels/del`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_level&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=vc&resource=room_level&version=v1 document }
             *
             * 更新会议室层级
             *
             * 该接口可以用来更新某个会议室层级的信息。
             */
            patch: async (
                payload?: {
                    data: {
                        name: string;
                        parent_id: string;
                        custom_group_id?: string;
                    };
                    path: { room_level_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/room_levels/:room_level_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_level&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=vc&resource=room_level&version=v1 document }
             *
             * 创建会议室层级
             *
             * 该接口用于创建会议室层级。
             */
            create: async (
                payload?: {
                    data: {
                        name: string;
                        parent_id: string;
                        custom_group_id?: string;
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
                                room_level?: {
                                    room_level_id?: string;
                                    name?: string;
                                    parent_id?: string;
                                    path?: Array<string>;
                                    has_child?: boolean;
                                    custom_group_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/room_levels`,
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
                        room_level_id?: string;
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
                                `${this.domain}/open-apis/vc/v1/room_levels`,
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
                                                    room_level_id?: string;
                                                    name?: string;
                                                    parent_id?: string;
                                                    path?: Array<string>;
                                                    has_child?: boolean;
                                                    custom_group_id?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_level&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=vc&resource=room_level&version=v1 document }
             *
             * 查询会议室层级列表
             *
             * 该接口用来查询某个会议室层级下的子层级列表。
             */
            list: async (
                payload?: {
                    params?: {
                        room_level_id?: string;
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
                                items?: Array<{
                                    room_level_id?: string;
                                    name?: string;
                                    parent_id?: string;
                                    path?: Array<string>;
                                    has_child?: boolean;
                                    custom_group_id?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/room_levels`,
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
         * scope_config
         */
        scopeConfig: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=scope_config&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=scope_config&version=v1 document }
             *
             * 查询会议室配置
             *
             * 该接口可以用来查询某个会议层级范围下或者某个会议室的配置。
             */
            get: async (
                payload?: {
                    params: {
                        scope_type: number;
                        scope_id: string;
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
                                current_config?: {
                                    scope_type: number;
                                    scope_id: string;
                                    scope_config?: {
                                        room_background?: string;
                                        display_background?: string;
                                        digital_signage?: {
                                            if_cover_child_scope?: boolean;
                                            enable?: boolean;
                                            mute?: boolean;
                                            start_display?: number;
                                            stop_display?: number;
                                            materials?: Array<{
                                                id?: string;
                                                name?: string;
                                                material_type?: number;
                                                url?: string;
                                                duration?: number;
                                                cover?: string;
                                                md5?: string;
                                                vid?: string;
                                                size?: string;
                                            }>;
                                        };
                                        room_box_digital_signage?: {
                                            if_cover_child_scope?: boolean;
                                            enable?: boolean;
                                            mute?: boolean;
                                            start_display?: number;
                                            stop_display?: number;
                                            materials?: Array<{
                                                id?: string;
                                                name?: string;
                                                material_type?: number;
                                                url?: string;
                                                duration?: number;
                                                cover?: string;
                                                md5?: string;
                                                vid?: string;
                                                size?: string;
                                            }>;
                                        };
                                        room_status?: {
                                            status: boolean;
                                            schedule_status?: boolean;
                                            disable_start_time?: string;
                                            disable_end_time?: string;
                                            disable_reason?: string;
                                            contact_ids?: Array<string>;
                                            disable_notice?: boolean;
                                            resume_notice?: boolean;
                                        };
                                    };
                                };
                                origin_configs?: Array<{
                                    scope_type: number;
                                    scope_id: string;
                                    scope_config?: {
                                        room_background?: string;
                                        display_background?: string;
                                        digital_signage?: {
                                            if_cover_child_scope?: boolean;
                                            enable?: boolean;
                                            mute?: boolean;
                                            start_display?: number;
                                            stop_display?: number;
                                            materials?: Array<{
                                                id?: string;
                                                name?: string;
                                                material_type?: number;
                                                url?: string;
                                                duration?: number;
                                                cover?: string;
                                                md5?: string;
                                                vid?: string;
                                                size?: string;
                                            }>;
                                        };
                                        room_box_digital_signage?: {
                                            if_cover_child_scope?: boolean;
                                            enable?: boolean;
                                            mute?: boolean;
                                            start_display?: number;
                                            stop_display?: number;
                                            materials?: Array<{
                                                id?: string;
                                                name?: string;
                                                material_type?: number;
                                                url?: string;
                                                duration?: number;
                                                cover?: string;
                                                md5?: string;
                                                vid?: string;
                                                size?: string;
                                            }>;
                                        };
                                        room_status?: {
                                            status: boolean;
                                            schedule_status?: boolean;
                                            disable_start_time?: string;
                                            disable_end_time?: string;
                                            disable_reason?: string;
                                            contact_ids?: Array<string>;
                                            disable_notice?: boolean;
                                            resume_notice?: boolean;
                                        };
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/scope_config`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=scope_config&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=vc&resource=scope_config&version=v1 document }
             *
             * 设置会议室配置
             *
             * 该接口可以用来设置某个会议层级范围下或者某个会议室的配置。
             */
            create: async (
                payload?: {
                    data: {
                        scope_type: number;
                        scope_id: string;
                        scope_config?: {
                            room_background?: string;
                            display_background?: string;
                            digital_signage?: {
                                if_cover_child_scope?: boolean;
                                enable?: boolean;
                                mute?: boolean;
                                start_display?: number;
                                stop_display?: number;
                                materials?: Array<{
                                    id?: string;
                                    name?: string;
                                    material_type?: number;
                                    url?: string;
                                    duration?: number;
                                    cover?: string;
                                    md5?: string;
                                    vid?: string;
                                    size?: string;
                                }>;
                            };
                            room_box_digital_signage?: {
                                if_cover_child_scope?: boolean;
                                enable?: boolean;
                                mute?: boolean;
                                start_display?: number;
                                stop_display?: number;
                                materials?: Array<{
                                    id?: string;
                                    name?: string;
                                    material_type?: number;
                                    url?: string;
                                    duration?: number;
                                    cover?: string;
                                    md5?: string;
                                    vid?: string;
                                    size?: string;
                                }>;
                            };
                            room_status?: {
                                status: boolean;
                                schedule_status?: boolean;
                                disable_start_time?: string;
                                disable_end_time?: string;
                                disable_reason?: string;
                                contact_ids?: Array<string>;
                                disable_notice?: boolean;
                                resume_notice?: boolean;
                            };
                        };
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
                            `${this.domain}/open-apis/vc/v1/scope_config`,
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
         * reserve_config.form
         */
        reserveConfigForm: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve_config.form&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=reserve_config.form&version=v1 document }
             *
             * 查询会议室预定表单
             *
             * 查询会议室预定表单。
             */
            get: async (
                payload?: {
                    params: {
                        scope_type: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { reserve_config_id?: string };
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
                                reserve_form_config: {
                                    if_cover_child_scope?: boolean;
                                    reserve_form: boolean;
                                    notified_users?: Array<{
                                        user_id: string;
                                        user_name?: string;
                                    }>;
                                    notified_time?: number;
                                    time_unit?: number;
                                    custom_list?: Array<{
                                        custom_type: number;
                                        key: string;
                                        need_fill: boolean;
                                        title: string;
                                        placeholder?: string;
                                        options?: Array<{
                                            text: string;
                                            key: string;
                                            is_other?: boolean;
                                        }>;
                                        conditions?: Array<{
                                            custom_key?: string;
                                            option_keys?: Array<string>;
                                        }>;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/reserve_configs/:reserve_config_id/form`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve_config.form&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=vc&resource=reserve_config.form&version=v1 document }
             *
             * 更新会议室预定表单
             *
             * 更新会议室预定表单。
             */
            patch: async (
                payload?: {
                    data: {
                        scope_type: number;
                        reserve_form_config: {
                            if_cover_child_scope?: boolean;
                            reserve_form: boolean;
                            notified_users?: Array<{
                                user_id: string;
                                user_name?: string;
                            }>;
                            notified_time?: number;
                            time_unit?: number;
                            custom_list?: Array<{
                                custom_type: number;
                                key: string;
                                need_fill: boolean;
                                title: string;
                                placeholder?: string;
                                options?: Array<{
                                    text: string;
                                    key: string;
                                    is_other?: boolean;
                                }>;
                                conditions?: Array<{
                                    custom_key?: string;
                                    option_keys?: Array<string>;
                                }>;
                            }>;
                        };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { reserve_config_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/reserve_configs/:reserve_config_id/form`,
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
         * reserve_config.admin
         */
        reserveConfigAdmin: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve_config.admin&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=reserve_config.admin&version=v1 document }
             *
             * 查询会议室预定管理员
             *
             * 查询会议室预定管理员。
             */
            get: async (
                payload?: {
                    params: {
                        scope_type: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { reserve_config_id?: string };
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
                                reserve_admin_config: {
                                    depts?: Array<{
                                        department_id: string;
                                        department_name?: string;
                                    }>;
                                    users?: Array<{
                                        user_id: string;
                                        user_name?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/reserve_configs/:reserve_config_id/admin`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve_config.admin&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=vc&resource=reserve_config.admin&version=v1 document }
             *
             * 更新会议室预定管理员
             *
             * 更新会议室预定管理员。
             */
            patch: async (
                payload?: {
                    data: {
                        scope_type: number;
                        reserve_admin_config: {
                            depts?: Array<{
                                department_id: string;
                                department_name?: string;
                            }>;
                            users?: Array<{
                                user_id: string;
                                user_name?: string;
                            }>;
                        };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { reserve_config_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/reserve_configs/:reserve_config_id/admin`,
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
         * reserve_config.disable_inform
         */
        reserveConfigDisableInform: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve_config.disable_inform&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=reserve_config.disable_inform&version=v1 document }
             *
             * 查询禁用状态变更通知
             *
             * 查询禁用状态变更通知
             */
            get: async (
                payload?: {
                    params: {
                        scope_type: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { reserve_config_id: string };
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
                                disable_inform?: {
                                    if_cover_child_scope?: boolean;
                                    if_inform: boolean;
                                    informed_users?: Array<{
                                        user_id: string;
                                        user_name?: string;
                                    }>;
                                    informed_depts?: Array<{
                                        department_id: string;
                                        department_name?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/reserve_configs/:reserve_config_id/disable_inform`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve_config.disable_inform&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=vc&resource=reserve_config.disable_inform&version=v1 document }
             *
             * 更新禁用状态变更通知
             *
             * 更新禁用状态变更通知
             */
            patch: async (
                payload?: {
                    data: {
                        scope_type: number;
                        disable_inform: {
                            if_cover_child_scope?: boolean;
                            if_inform: boolean;
                            informed_users?: Array<{
                                user_id: string;
                                user_name?: string;
                            }>;
                            informed_depts?: Array<{
                                department_id: string;
                                department_name?: string;
                            }>;
                        };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { reserve_config_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/reserve_configs/:reserve_config_id/disable_inform`,
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
         * reserve_config
         */
        reserveConfig: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve_config&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=vc&resource=reserve_config&version=v1 document }
             *
             * 更新会议室预定限制
             *
             * 更新会议室预定限制。
             */
            patch: async (
                payload?: {
                    data: {
                        scope_type: string;
                        approval_config?: {
                            approval_switch?: number;
                            approval_condition?: number;
                            meeting_duration?: number;
                            approvers?: Array<{
                                user_id: string;
                                user_name?: string;
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
                            if_cover_child_scope?: boolean;
                            allow_all_users?: number;
                            allow_users?: Array<{
                                user_id: string;
                                user_name?: string;
                            }>;
                            allow_depts?: Array<{
                                department_id: string;
                                department_name?: string;
                            }>;
                        };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { reserve_config_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/reserve_configs/:reserve_config_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve_config&apiName=reserve_scope&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reserve_scope&project=vc&resource=reserve_config&version=v1 document }
             *
             * 查询会议室预定限制
             *
             * 查询会议室预定限制。
             */
            reserveScope: async (
                payload?: {
                    params: {
                        scope_id: string;
                        scope_type: string;
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
                                approve_config?: {
                                    approval_switch?: number;
                                    approval_condition?: number;
                                    meeting_duration?: number;
                                    approvers?: Array<{
                                        user_id: string;
                                        user_name?: string;
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
                                    if_cover_child_scope?: boolean;
                                    allow_all_users?: number;
                                    allow_users?: Array<{
                                        user_id: string;
                                        user_name?: string;
                                    }>;
                                    allow_depts?: Array<{
                                        department_id: string;
                                        department_name?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/reserve_configs/reserve_scope`,
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
         * export
         */
        export: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=export&version=v1 document }
             *
             * 查询导出任务结果
             *
             * 查看异步导出的进度。
             */
            get: async (
                payload?: {
                    path?: { task_id?: string };
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
                                status: number;
                                url?: string;
                                file_token?: string;
                                fail_msg?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/exports/:task_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=download&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download&project=vc&resource=export&version=v1 document }
             *
             * 下载导出文件
             *
             * 下载导出文件。
             */
            download: async (
                payload?: {
                    params: { file_token: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, any>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/exports/download`,
                            path
                        ),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                        $return_headers: true,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                const checkIsReadable = () => {
                    const consumedError =
                        "The stream has already been consumed";
                    if (!res.data.readable) {
                        this.logger.error(consumedError);
                        throw new Error(consumedError);
                    }
                };

                return {
                    writeFile: async (filePath: string) => {
                        checkIsReadable();
                        return new Promise((resolve, reject) => {
                            const writableStream =
                                fs.createWriteStream(filePath);
                            writableStream.on("finish", () => {
                                resolve(filePath);
                            });
                            writableStream.on("error", (e) => {
                                reject(e);
                            });
                            res.data.pipe(writableStream);
                        });
                    },
                    getReadableStream: () => {
                        checkIsReadable();
                        return res.data as Readable;
                    },
                    headers: res.headers,
                };
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=resource_reservation_list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=resource_reservation_list&project=vc&resource=export&version=v1 document }
             *
             * 导出会议室预定数据
             *
             * 导出会议室预定数据，具体权限要求请参考「资源介绍」。
             */
            resourceReservationList: async (
                payload?: {
                    data: {
                        room_level_id: string;
                        need_topic?: boolean;
                        start_time: string;
                        end_time: string;
                        room_ids?: Array<string>;
                        is_exclude?: boolean;
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
                            data?: { task_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/exports/resource_reservation_list`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=participant_quality_list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=participant_quality_list&project=vc&resource=export&version=v1 document }
             *
             * 导出参会人会议质量数据
             *
             * 导出某场会议某个参会人的音视频&共享质量数据;（仅支持已结束会议），具体权限要求请参考「资源介绍」。
             */
            participantQualityList: async (
                payload?: {
                    data: {
                        meeting_start_time: string;
                        meeting_end_time: string;
                        meeting_no: string;
                        join_time: string;
                        user_id?: string;
                        room_id?: string;
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
                        {
                            code?: number;
                            msg?: string;
                            data?: { task_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/exports/participant_quality_list`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=participant_list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=participant_list&project=vc&resource=export&version=v1 document }
             *
             * 导出参会人明细
             *
             * 导出某个会议的参会人详情列表，具体权限要求请参考「资源介绍」。
             */
            participantList: async (
                payload?: {
                    data: {
                        meeting_start_time: string;
                        meeting_end_time: string;
                        meeting_status?: number;
                        meeting_no: string;
                        user_id?: string;
                        room_id?: string;
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
                        {
                            code?: number;
                            msg?: string;
                            data?: { task_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/exports/participant_list`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=meeting_list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=meeting_list&project=vc&resource=export&version=v1 document }
             *
             * 导出会议明细
             *
             * 导出会议明细，具体权限要求请参考资源介绍。
             */
            meetingList: async (
                payload?: {
                    data: {
                        start_time: string;
                        end_time: string;
                        meeting_status?: number;
                        meeting_no?: string;
                        user_id?: string;
                        room_id?: string;
                        meeting_type?: number;
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
                        {
                            code?: number;
                            msg?: string;
                            data?: { task_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/exports/meeting_list`,
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
         * meeting_list
         */
        meetingList: {
            getWithIterator: async (
                payload?: {
                    params: {
                        start_time: string;
                        end_time: string;
                        meeting_status?: number;
                        meeting_no?: string;
                        user_id?: string;
                        room_id?: string;
                        meeting_type?: number;
                        page_size?: number;
                        page_token?: string;
                        include_external_meetings?: boolean;
                        include_webinar?: boolean;
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
                                `${this.domain}/open-apis/vc/v1/meeting_list`,
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
                                                meeting_list?: Array<{
                                                    meeting_id?: string;
                                                    meeting_topic?: string;
                                                    meeting_type?: number;
                                                    organizer?: string;
                                                    department?: string;
                                                    user_id?: string;
                                                    employee_id?: string;
                                                    email?: string;
                                                    mobile?: string;
                                                    meeting_start_time?: string;
                                                    meeting_end_time?: string;
                                                    meeting_duration?: string;
                                                    number_of_participants?: string;
                                                    number_of_devices?: string;
                                                    audio?: boolean;
                                                    video?: boolean;
                                                    sharing?: boolean;
                                                    recording?: boolean;
                                                    telephone?: boolean;
                                                    reserved_rooms?: Array<{
                                                        room_id?: string;
                                                        room_name?: string;
                                                    }>;
                                                    has_related_document?: boolean;
                                                    ai_note?: boolean;
                                                    is_external?: boolean;
                                                    meeting_subtype?: number;
                                                    meeting_instance_id?: string;
                                                    number_of_webinar_viewers?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting_list&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=meeting_list&version=v1 document }
             *
             * 查询会议明细
             *
             * 查询会议明细，具体权限要求请参考[资源介绍](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-room-data/resource-introduction)
             *
             * **说明**;;本接口适用于查询 **进行中** 或者 **已结束** 的会议明细。
             */
            get: async (
                payload?: {
                    params: {
                        start_time: string;
                        end_time: string;
                        meeting_status?: number;
                        meeting_no?: string;
                        user_id?: string;
                        room_id?: string;
                        meeting_type?: number;
                        page_size?: number;
                        page_token?: string;
                        include_external_meetings?: boolean;
                        include_webinar?: boolean;
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
                                meeting_list?: Array<{
                                    meeting_id?: string;
                                    meeting_topic?: string;
                                    meeting_type?: number;
                                    organizer?: string;
                                    department?: string;
                                    user_id?: string;
                                    employee_id?: string;
                                    email?: string;
                                    mobile?: string;
                                    meeting_start_time?: string;
                                    meeting_end_time?: string;
                                    meeting_duration?: string;
                                    number_of_participants?: string;
                                    number_of_devices?: string;
                                    audio?: boolean;
                                    video?: boolean;
                                    sharing?: boolean;
                                    recording?: boolean;
                                    telephone?: boolean;
                                    reserved_rooms?: Array<{
                                        room_id?: string;
                                        room_name?: string;
                                    }>;
                                    has_related_document?: boolean;
                                    ai_note?: boolean;
                                    is_external?: boolean;
                                    meeting_subtype?: number;
                                    meeting_instance_id?: string;
                                    number_of_webinar_viewers?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/meeting_list`,
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
         * participant_list
         */
        participantList: {
            getWithIterator: async (
                payload?: {
                    params: {
                        meeting_start_time: string;
                        meeting_end_time: string;
                        meeting_status?: number;
                        meeting_no: string;
                        user_id?: string;
                        room_id?: string;
                        page_size?: number;
                        page_token?: string;
                        webinar_user_role?: string;
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
                                `${this.domain}/open-apis/vc/v1/participant_list`,
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
                                                participants?: Array<{
                                                    participant_name?: string;
                                                    department?: string;
                                                    user_id?: string;
                                                    meeting_room_id?: string;
                                                    employee_id?: string;
                                                    phone?: string;
                                                    email?: string;
                                                    device?: string;
                                                    app_version?: string;
                                                    public_ip?: string;
                                                    internal_ip?: string;
                                                    use_rtc_proxy?: boolean;
                                                    location?: string;
                                                    network_type?: string;
                                                    protocol?: string;
                                                    microphone?: string;
                                                    speaker?: string;
                                                    camera?: string;
                                                    audio?: boolean;
                                                    video?: boolean;
                                                    sharing?: boolean;
                                                    join_time?: string;
                                                    leave_time?: string;
                                                    time_in_meeting?: string;
                                                    leave_reason?: string;
                                                    accept_status?: number;
                                                    is_external?: boolean;
                                                    webinar_user_role?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=participant_list&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=participant_list&version=v1 document }
             *
             * 查询参会人明细
             *
             * 查询参会人明细，具体权限要求请参考[资源介绍](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-room-data/resource-introduction)
             */
            get: async (
                payload?: {
                    params: {
                        meeting_start_time: string;
                        meeting_end_time: string;
                        meeting_status?: number;
                        meeting_no: string;
                        user_id?: string;
                        room_id?: string;
                        page_size?: number;
                        page_token?: string;
                        webinar_user_role?: string;
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
                                participants?: Array<{
                                    participant_name?: string;
                                    department?: string;
                                    user_id?: string;
                                    meeting_room_id?: string;
                                    employee_id?: string;
                                    phone?: string;
                                    email?: string;
                                    device?: string;
                                    app_version?: string;
                                    public_ip?: string;
                                    internal_ip?: string;
                                    use_rtc_proxy?: boolean;
                                    location?: string;
                                    network_type?: string;
                                    protocol?: string;
                                    microphone?: string;
                                    speaker?: string;
                                    camera?: string;
                                    audio?: boolean;
                                    video?: boolean;
                                    sharing?: boolean;
                                    join_time?: string;
                                    leave_time?: string;
                                    time_in_meeting?: string;
                                    leave_reason?: string;
                                    accept_status?: number;
                                    is_external?: boolean;
                                    webinar_user_role?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/participant_list`,
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
         * note
         */
        note: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=note&apiName=subscription&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=vc&resource=note&version=v1 document }
             *
             * 订阅纪要变更事件
             *
             * 订阅当前用户身份相关的纪要资源变更事件。通过指定事件类型，来订阅纪要资源不同的事件变更。
             */
            subscription: async (
                payload?: {
                    data?: { event_type?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/notes/subscription`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=note&apiName=unsubscription&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscription&project=vc&resource=note&version=v1 document }
             *
             * 取消订阅纪要变更事件
             *
             * 取消订阅当前用户身份相关的纪要资源变更事件。通过指定事件类型，来取消订阅纪要资源对应的事件变更。
             */
            unsubscription: async (
                payload?: {
                    data?: { event_type?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/notes/unsubscription`,
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=note&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=note&version=v1 document }
             *
             * 获取纪要详情
             *
             * 获取一篇纪要的详细数据。
             *
             * 只能获取自己可见纪要文档，以及相关联的产物、关联引用信息。
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { note_id: string };
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
                                note?: {
                                    creator_id: string;
                                    create_time: string;
                                    artifacts: Array<{
                                        artifact_type: number;
                                        create_time: string;
                                        doc_token: string;
                                    }>;
                                    references: Array<{
                                        reference_type: number;
                                        doc_token: string;
                                    }>;
                                    note_source?: {
                                        source_type?: string;
                                        source_entity_id?: string;
                                    };
                                    note_display_type?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/notes/:note_id`,
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
         * bot
         */
        bot: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=bot&apiName=user_active_meeting&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=user_active_meeting&project=vc&resource=bot&version=v1 document }
             *
             * 获取用户活跃会议列表
             *
             * 查询指定用户当前正在参与的所有会议，返回该用户处于活跃状态的会议列表，包含会议号、会议 ID 及会议标题等核心信息。;;
             *
             * 返回结果仅包含用户当前处于活跃状态的会议，已结束或尚未开始的会议不会被返回。
             */
            userActiveMeeting: async (
                payload?: {
                    params?: {
                        user_id?: string;
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
                                meetings?: Array<{
                                    meeting_no?: string;
                                    meeting_id?: string;
                                    meeting_title?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/bots/user_active_meeting`,
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
            eventsWithIterator: async (
                payload?: {
                    params: {
                        meeting_id: string;
                        page_token?: string;
                        start_time?: string;
                        end_time?: string;
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
                                `${this.domain}/open-apis/vc/v1/bots/events`,
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
                                                has_more?: boolean;
                                                page_token?: string;
                                                events?: Array<{
                                                    event_id?: string;
                                                    event_type?: string;
                                                    event_time?: string;
                                                    payload?: {
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
                                                            share_doc?: {
                                                                url?: string;
                                                                title?: string;
                                                            };
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
                                                    };
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
             * {@link https://open.feishu.cn/api-explorer?project=vc&resource=bot&apiName=events&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=events&project=vc&resource=bot&version=v1 document }
             *
             * 获取会议事件列表
             *
             * 获取会议中的事件列表，包括参会人加入或离开、发言、聊天、共享等事件
             */
            events: async (
                payload?: {
                    params: {
                        meeting_id: string;
                        page_token?: string;
                        start_time?: string;
                        end_time?: string;
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
                                has_more?: boolean;
                                page_token?: string;
                                events?: Array<{
                                    event_id?: string;
                                    event_type?: string;
                                    event_time?: string;
                                    payload?: {
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
                                            share_doc?: {
                                                url?: string;
                                                title?: string;
                                            };
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
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/vc/v1/bots/events`,
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
        v1: {
            /**
             * meeting.recording
             */
            meetingRecording: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting.recording&apiName=start&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=start&project=vc&resource=meeting.recording&version=v1 document }
                 *
                 * 开始录制
                 *
                 * 在会议中开始录制。
                 *
                 * 会议正在进行中，且操作者具有相应权限（如果操作者为用户，必须是会中当前主持人）
                 */
                start: async (
                    payload?: {
                        data?: { timezone?: number };
                        path?: { meeting_id?: string };
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
                                `${this.domain}/open-apis/vc/v1/meetings/:meeting_id/recording/start`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting.recording&apiName=stop&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=stop&project=vc&resource=meeting.recording&version=v1 document }
                 *
                 * 停止录制
                 *
                 * 在会议中停止录制。
                 *
                 * 会议正在录制中，且操作者具有相应权限（如果操作者为用户，必须是会中当前主持人）
                 */
                stop: async (
                    payload?: {
                        path?: { meeting_id?: string };
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
                                `${this.domain}/open-apis/vc/v1/meetings/:meeting_id/recording/stop`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting.recording&apiName=set_permission&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=set_permission&project=vc&resource=meeting.recording&version=v1 document }
                 *
                 * 授权录制文件
                 *
                 * 将一个会议的录制文件授权给组织、用户或公开到公网。
                 *
                 * 会议结束后并且收到了"录制完成"的事件方可进行授权；会议owner（通过开放平台预约的会议即为预约人）才有权限操作
                 */
                setPermission: async (
                    payload?: {
                        data: {
                            permission_objects: Array<{
                                id?: string;
                                type: number;
                                permission: number;
                            }>;
                            action_type?: number;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { meeting_id?: string };
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
                                `${this.domain}/open-apis/vc/v1/meetings/:meeting_id/recording/set_permission`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting.recording&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=meeting.recording&version=v1 document }
                 *
                 * 获取录制文件
                 *
                 * 获取一个会议的录制文件。
                 */
                get: async (
                    payload?: {
                        path?: { meeting_id?: string };
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
                                    recording?: {
                                        id?: string;
                                        meeting_id?: string;
                                        url?: string;
                                        duration?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/meetings/:meeting_id/recording`,
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
             * room_config
             */
            roomConfig: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_config&apiName=set_checkboard_access_code&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=set_checkboard_access_code&project=vc&resource=room_config&version=v1 document }
                 *
                 * 创建签到板部署码
                 *
                 * 创建一个范围内的签到板部署码
                 */
                setCheckboardAccessCode: async (
                    payload?: {
                        data: {
                            scope: number;
                            country_id?: string;
                            district_id?: string;
                            building_id?: string;
                            floor_name?: string;
                            room_id?: string;
                            valid_day: number;
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
                                data?: { access_code?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/room_configs/set_checkboard_access_code`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_config&apiName=set_room_access_code&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=set_room_access_code&project=vc&resource=room_config&version=v1 document }
                 *
                 * 创建会议室部署码
                 *
                 * 创建一个范围内的会议室部署码
                 */
                setRoomAccessCode: async (
                    payload?: {
                        data: {
                            scope: number;
                            country_id?: string;
                            district_id?: string;
                            building_id?: string;
                            floor_name?: string;
                            room_id?: string;
                            valid_day: number;
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
                                data?: { access_code?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/room_configs/set_room_access_code`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_config&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=vc&resource=room_config&version=v1 document }
                 *
                 * 查询会议室配置
                 *
                 * 查询一个范围内的会议室配置。
                 *
                 * 根据查询范围传入对应的参数
                 */
                query: async (
                    payload?: {
                        params: {
                            scope: number;
                            country_id?: string;
                            district_id?: string;
                            building_id?: string;
                            floor_name?: string;
                            room_id?: string;
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
                                    room_background?: string;
                                    display_background?: string;
                                    digital_signage?: {
                                        if_cover_child_scope?: boolean;
                                        enable?: boolean;
                                        mute?: boolean;
                                        start_display?: number;
                                        stop_display?: number;
                                        materials?: Array<{
                                            id?: string;
                                            name?: string;
                                            material_type?: number;
                                            url?: string;
                                            duration?: number;
                                            cover?: string;
                                            md5?: string;
                                            vid?: string;
                                            size?: string;
                                        }>;
                                    };
                                    room_box_digital_signage?: {
                                        if_cover_child_scope?: boolean;
                                        enable?: boolean;
                                        mute?: boolean;
                                        start_display?: number;
                                        stop_display?: number;
                                        materials?: Array<{
                                            id?: string;
                                            name?: string;
                                            material_type?: number;
                                            url?: string;
                                            duration?: number;
                                            cover?: string;
                                            md5?: string;
                                            vid?: string;
                                            size?: string;
                                        }>;
                                    };
                                    room_status?: {
                                        status: boolean;
                                        schedule_status?: boolean;
                                        disable_start_time?: string;
                                        disable_end_time?: string;
                                        disable_reason?: string;
                                        contact_ids?: Array<string>;
                                        disable_notice?: boolean;
                                        resume_notice?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/room_configs/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_config&apiName=set&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=set&project=vc&resource=room_config&version=v1 document }
                 *
                 * 设置会议室配置
                 *
                 * 设置一个范围内的会议室配置。
                 *
                 * 根据设置范围传入对应的参数
                 */
                set: async (
                    payload?: {
                        data: {
                            scope: number;
                            country_id?: string;
                            district_id?: string;
                            building_id?: string;
                            floor_name?: string;
                            room_id?: string;
                            room_config: {
                                room_background?: string;
                                display_background?: string;
                                digital_signage?: {
                                    if_cover_child_scope?: boolean;
                                    enable?: boolean;
                                    mute?: boolean;
                                    start_display?: number;
                                    stop_display?: number;
                                    materials?: Array<{
                                        id?: string;
                                        name?: string;
                                        material_type?: number;
                                        url?: string;
                                        duration?: number;
                                        cover?: string;
                                        md5?: string;
                                        vid?: string;
                                        size?: string;
                                    }>;
                                };
                                room_box_digital_signage?: {
                                    if_cover_child_scope?: boolean;
                                    enable?: boolean;
                                    mute?: boolean;
                                    start_display?: number;
                                    stop_display?: number;
                                    materials?: Array<{
                                        id?: string;
                                        name?: string;
                                        material_type?: number;
                                        url?: string;
                                        duration?: number;
                                        cover?: string;
                                        md5?: string;
                                        vid?: string;
                                        size?: string;
                                    }>;
                                };
                                room_status?: {
                                    status: boolean;
                                    disable_start_time?: string;
                                    disable_end_time?: string;
                                    disable_reason?: string;
                                    contact_ids?: Array<string>;
                                    disable_notice?: boolean;
                                    resume_notice?: boolean;
                                };
                            };
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
                                `${this.domain}/open-apis/vc/v1/room_configs/set`,
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
             * reserve
             */
            reserve: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=vc&resource=reserve&version=v1 document }
                 *
                 * 删除预约
                 *
                 * 删除一个预约。
                 *
                 * 只能删除归属于自己的预约；删除后数据不可恢复
                 */
                delete: async (
                    payload?: {
                        path?: { reserve_id?: string };
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
                                `${this.domain}/open-apis/vc/v1/reserves/:reserve_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=reserve&version=v1 document }
                 *
                 * 获取预约
                 *
                 * 获取一个预约的详情。
                 *
                 * 只能获取归属于自己的预约
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { reserve_id?: string };
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
                                    reserve?: {
                                        id?: string;
                                        meeting_no?: string;
                                        password?: string;
                                        url?: string;
                                        app_link?: string;
                                        live_link?: string;
                                        end_time?: string;
                                        expire_status?: number;
                                        reserve_user_id?: string;
                                        meeting_settings?: {
                                            topic?: string;
                                            action_permissions?: Array<{
                                                permission: number;
                                                permission_checkers: Array<{
                                                    check_field: number;
                                                    check_mode: number;
                                                    check_list: Array<string>;
                                                }>;
                                            }>;
                                            meeting_initial_type?: number;
                                            meeting_connect?: boolean;
                                            call_setting?: {
                                                callee: {
                                                    id?: string;
                                                    user_type: number;
                                                    pstn_sip_info?: {
                                                        nickname?: string;
                                                        main_address: string;
                                                    };
                                                };
                                            };
                                            auto_record?: boolean;
                                            assign_host_list?: Array<{
                                                user_type?: number;
                                                id?: string;
                                            }>;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/reserves/:reserve_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=vc&resource=reserve&version=v1 document }
                 *
                 * 更新预约
                 *
                 * 更新一个预约。
                 *
                 * 只能更新归属于自己的预约，不需要更新的字段不传（如果传空则会被更新为空）；可用于续期操作，到期时间距离当前时间不超过30天
                 */
                update: async (
                    payload?: {
                        data?: {
                            end_time?: string;
                            meeting_settings?: {
                                topic?: string;
                                action_permissions?: Array<{
                                    permission: number;
                                    permission_checkers: Array<{
                                        check_field: number;
                                        check_mode: number;
                                        check_list: Array<string>;
                                    }>;
                                }>;
                                meeting_initial_type?: number;
                                meeting_connect?: boolean;
                                call_setting?: {
                                    callee: {
                                        id?: string;
                                        user_type: number;
                                        pstn_sip_info?: {
                                            nickname?: string;
                                            main_address: string;
                                        };
                                    };
                                };
                                auto_record?: boolean;
                                assign_host_list?: Array<{
                                    user_type?: number;
                                    id?: string;
                                }>;
                                password?: string;
                            };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { reserve_id?: string };
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
                                    reserve?: {
                                        id?: string;
                                        meeting_no?: string;
                                        password?: string;
                                        url?: string;
                                        live_link?: string;
                                        end_time?: string;
                                        expire_status?: number;
                                    };
                                    reserve_correction_check_info?: {
                                        invalid_host_id_list?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/reserves/:reserve_id`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve&apiName=apply&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=apply&project=vc&resource=reserve&version=v1 document }
                 *
                 * 预约会议
                 *
                 * 创建一个会议预约。
                 *
                 * 支持预约最近30天内的会议（到期时间距离当前时间不超过30天），预约到期后会议号将被释放，如需继续使用可通过"更新预约"接口进行续期；预约会议时可配置参会人在会中的权限，以达到控制会议的目的。;;以此方式预约的会议「不会」生成日程，「不会」显示在日历中
                 */
                apply: async (
                    payload?: {
                        data: {
                            end_time?: string;
                            owner_id?: string;
                            meeting_settings: {
                                topic?: string;
                                action_permissions?: Array<{
                                    permission: number;
                                    permission_checkers: Array<{
                                        check_field: number;
                                        check_mode: number;
                                        check_list: Array<string>;
                                    }>;
                                }>;
                                meeting_initial_type?: number;
                                meeting_connect?: boolean;
                                call_setting?: {
                                    callee: {
                                        id?: string;
                                        user_type: number;
                                        pstn_sip_info?: {
                                            nickname?: string;
                                            main_address: string;
                                        };
                                    };
                                };
                                auto_record?: boolean;
                                assign_host_list?: Array<{
                                    user_type?: number;
                                    id?: string;
                                }>;
                                password?: string;
                            };
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
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    reserve?: {
                                        id?: string;
                                        meeting_no?: string;
                                        password?: string;
                                        url?: string;
                                        app_link?: string;
                                        live_link?: string;
                                        end_time?: string;
                                    };
                                    reserve_correction_check_info?: {
                                        invalid_host_id_list?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/reserves/apply`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve&apiName=get_active_meeting&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_active_meeting&project=vc&resource=reserve&version=v1 document }
                 *
                 * 获取活跃会议
                 *
                 * 获取一个预约的当前活跃会议。
                 *
                 * 只能获取归属于自己的预约的活跃会议（一个预约最多有一个正在进行中的会议）
                 */
                getActiveMeeting: async (
                    payload?: {
                        params?: {
                            with_participants?: boolean;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { reserve_id?: string };
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
                                    meeting?: {
                                        id?: string;
                                        topic?: string;
                                        url?: string;
                                        meeting_no?: string;
                                        password?: string;
                                        create_time?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        host_user?: {
                                            id?: string;
                                            user_type?: number;
                                        };
                                        meeting_connect?: boolean;
                                        status?: number;
                                        participant_count?: string;
                                        participant_count_accumulated?: string;
                                        participants?: Array<{
                                            id?: string;
                                            first_join_time?: string;
                                            final_leave_time?: string;
                                            in_meeting_duration?: string;
                                            user_type?: number;
                                            is_host?: boolean;
                                            is_cohost?: boolean;
                                            is_external?: boolean;
                                            status?: number;
                                        }>;
                                        ability?: {
                                            use_video?: boolean;
                                            use_audio?: boolean;
                                            use_share_screen?: boolean;
                                            use_follow_screen?: boolean;
                                            use_recording?: boolean;
                                            use_pstn?: boolean;
                                        };
                                        note_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/reserves/:reserve_id/get_active_meeting`,
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
             * meeting
             */
            meeting: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=end&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=end&project=vc&resource=meeting&version=v1 document }
                 *
                 * 结束会议
                 *
                 * 结束一个进行中的会议。
                 *
                 * 会议正在进行中，且操作者须具有相应的权限（如果操作者为用户，必须是会中当前主持人）
                 */
                end: async (
                    payload?: {
                        path?: { meeting_id?: string };
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
                                `${this.domain}/open-apis/vc/v1/meetings/:meeting_id/end`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=kickout&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=kickout&project=vc&resource=meeting&version=v1 document }
                 *
                 * 移除参会人
                 *
                 * 将参会人从会议中移除。
                 */
                kickout: async (
                    payload?: {
                        data: {
                            kickout_users: Array<{
                                id?: string;
                                user_type?: number;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { meeting_id?: string };
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
                                    kickout_results?: Array<{
                                        id?: string;
                                        user_type?: number;
                                        result?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/meetings/:meeting_id/kickout`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=set_host&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=set_host&project=vc&resource=meeting&version=v1 document }
                 *
                 * 设置主持人
                 *
                 * 设置会议的主持人。
                 *
                 * 发起设置主持人的操作者必须具有相应的权限（如果操作者为用户，必须是会中当前主持人）；该操作使用CAS并发安全机制，需传入会中当前主持人，如果操作失败可使用返回的最新数据重试
                 */
                setHost: async (
                    payload?: {
                        data: {
                            host_user: { id?: string; user_type?: number };
                            old_host_user?: { id?: string; user_type?: number };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { meeting_id?: string };
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
                                    host_user?: {
                                        id?: string;
                                        user_type?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/meetings/:meeting_id/set_host`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=invite&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=invite&project=vc&resource=meeting&version=v1 document }
                 *
                 * 邀请参会人
                 *
                 * 邀请参会人进入会议。
                 *
                 * 发起邀请的操作者必须具有相应的权限（如果操作者为用户，则必须在会中），如果会议被锁定、或参会人数如果达到上限，则会邀请失败
                 */
                invite: async (
                    payload?: {
                        data: {
                            invitees: Array<{
                                id?: string;
                                user_type?: number;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { meeting_id?: string };
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
                                    invite_results?: Array<{
                                        id?: string;
                                        user_type?: number;
                                        status?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/meetings/:meeting_id/invite`,
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
                listByNoWithIterator: async (
                    payload?: {
                        params: {
                            meeting_no: string;
                            start_time: string;
                            end_time: string;
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
                                    `${this.domain}/open-apis/vc/v1/meetings/list_by_no`,
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    meeting_briefs?: Array<{
                                                        id?: string;
                                                        topic?: string;
                                                        url?: string;
                                                        meeting_no?: string;
                                                        password?: string;
                                                        meeting_connect?: boolean;
                                                        note_id?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=list_by_no&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_by_no&project=vc&resource=meeting&version=v1 document }
                 *
                 * 获取与会议号关联的会议列表
                 *
                 * 获取指定时间范围内与会议号关联的会议简要信息列表。
                 *
                 * 仅支持查询 90 天内的数据。
                 */
                listByNo: async (
                    payload?: {
                        params: {
                            meeting_no: string;
                            start_time: string;
                            end_time: string;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    meeting_briefs?: Array<{
                                        id?: string;
                                        topic?: string;
                                        url?: string;
                                        meeting_no?: string;
                                        password?: string;
                                        meeting_connect?: boolean;
                                        note_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/meetings/list_by_no`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=meeting&version=v1 document }
                 *
                 * 获取会议详情
                 *
                 * 根据会议 ID 获取指定会议的详细信息，包括会议主题、链接、主持人、参会人员、状态、时间信息及关联纪要 ID。
                 *
                 * 只能获取归属于自己的会议，支持查询最近90天内的会议
                 */
                get: async (
                    payload?: {
                        params?: {
                            with_participants?: boolean;
                            with_meeting_ability?: boolean;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            query_mode?: number;
                        };
                        path?: { meeting_id?: string };
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
                                    meeting?: {
                                        id?: string;
                                        topic?: string;
                                        url?: string;
                                        meeting_no?: string;
                                        password?: string;
                                        create_time?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        host_user?: {
                                            id?: string;
                                            user_type?: number;
                                        };
                                        meeting_connect?: boolean;
                                        status?: number;
                                        participant_count?: string;
                                        participant_count_accumulated?: string;
                                        participants?: Array<{
                                            id?: string;
                                            first_join_time?: string;
                                            final_leave_time?: string;
                                            in_meeting_duration?: string;
                                            user_type?: number;
                                            is_host?: boolean;
                                            is_cohost?: boolean;
                                            is_external?: boolean;
                                            status?: number;
                                        }>;
                                        ability?: {
                                            use_video?: boolean;
                                            use_audio?: boolean;
                                            use_share_screen?: boolean;
                                            use_follow_screen?: boolean;
                                            use_recording?: boolean;
                                            use_pstn?: boolean;
                                        };
                                        note_id?: string;
                                    };
                                    related_artifacts?: {
                                        note_doc_token?: string;
                                        verbatim_doc_token?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/meetings/:meeting_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=subscription&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=vc&resource=meeting&version=v1 document }
                 *
                 * 订阅会议变更事件
                 *
                 * 订阅当前用户身份相关的会议资源变更事件。通过指定事件类型，来订阅会议资源不同的事件变更。
                 */
                subscription: async (
                    payload?: {
                        data?: { event_type?: string };
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
                                `${this.domain}/open-apis/vc/v1/meetings/subscription`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=unsubscription&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscription&project=vc&resource=meeting&version=v1 document }
                 *
                 * 取消订阅会议变更事件
                 *
                 * 取消订阅当前用户身份相关的会议资源变更事件。通过指定事件类型，来取消订阅会议资源对应的事件变更。
                 */
                unsubscription: async (
                    payload?: {
                        data?: { event_type?: string };
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
                                `${this.domain}/open-apis/vc/v1/meetings/unsubscription`,
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
                searchWithIterator: async (
                    payload?: {
                        data?: {
                            query?: string;
                            meeting_filter?: {
                                organizer_ids?: Array<string>;
                                participant_ids?: Array<string>;
                                open_room_ids?: Array<string>;
                                start_time?: {
                                    start_time?: string;
                                    end_time?: string;
                                };
                            };
                        };
                        params?: { page_token?: string; page_size?: number };
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
                                    `${this.domain}/open-apis/vc/v1/meetings/search`,
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
                                                    total?: number;
                                                    has_more: boolean;
                                                    items?: Array<{
                                                        id?: string;
                                                        display_info?: string;
                                                        meta_data?: {
                                                            app_link?: string;
                                                            avatar?: string;
                                                            description?: string;
                                                        };
                                                    }>;
                                                    page_token?: string;
                                                    notice?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=vc&resource=meeting&version=v1 document }
                 *
                 * 搜索会议记录（测试）
                 *
                 * 根据关键词、时间范围等条件搜索会议记录，返回符合条件的会议列表，包含会议 ID、主题、开始时间及参与者等信息。
                 */
                search: async (
                    payload?: {
                        data?: {
                            query?: string;
                            meeting_filter?: {
                                organizer_ids?: Array<string>;
                                participant_ids?: Array<string>;
                                open_room_ids?: Array<string>;
                                start_time?: {
                                    start_time?: string;
                                    end_time?: string;
                                };
                            };
                        };
                        params?: { page_token?: string; page_size?: number };
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
                                    total?: number;
                                    has_more: boolean;
                                    items?: Array<{
                                        id?: string;
                                        display_info?: string;
                                        meta_data?: {
                                            app_link?: string;
                                            avatar?: string;
                                            description?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                    notice?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/meetings/search`,
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
             * alert
             */
            alert: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            start_time: string;
                            end_time: string;
                            query_type?: number;
                            query_value?: string;
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
                                    `${this.domain}/open-apis/vc/v1/alerts`,
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        alert_id?: string;
                                                        resource_scope?: string;
                                                        monitor_target?: number;
                                                        alert_strategy?: string;
                                                        alert_time?: string;
                                                        alert_level?: number;
                                                        contacts?: Array<{
                                                            contact_type?: number;
                                                            contact_name?: string;
                                                        }>;
                                                        notifyMethods?: Array<number>;
                                                        alertRule?: string;
                                                        process_time?: string;
                                                        recover_time?: string;
                                                        process_status?: number;
                                                        alert_rule_id?: string;
                                                        monitor_target_room_id?: string;
                                                        monitor_target_room_mac?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=alert&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=vc&resource=alert&version=v1 document }
                 *
                 * 获取告警记录
                 *
                 * 获取特定条件下租户的设备告警记录。
                 */
                list: async (
                    payload?: {
                        params: {
                            start_time: string;
                            end_time: string;
                            query_type?: number;
                            query_value?: string;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        alert_id?: string;
                                        resource_scope?: string;
                                        monitor_target?: number;
                                        alert_strategy?: string;
                                        alert_time?: string;
                                        alert_level?: number;
                                        contacts?: Array<{
                                            contact_type?: number;
                                            contact_name?: string;
                                        }>;
                                        notifyMethods?: Array<number>;
                                        alertRule?: string;
                                        process_time?: string;
                                        recover_time?: string;
                                        process_status?: number;
                                        alert_rule_id?: string;
                                        monitor_target_room_id?: string;
                                        monitor_target_room_mac?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/alerts`,
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
             * report
             */
            report: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=report&apiName=get_daily&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_daily&project=vc&resource=report&version=v1 document }
                 *
                 * 获取会议报告
                 *
                 * 获取一段时间内组织的每日会议使用报告。
                 *
                 * 支持最近90天内的数据查询
                 */
                getDaily: async (
                    payload?: {
                        params: {
                            start_time: string;
                            end_time: string;
                            unit?: number;
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
                                    meeting_report?: {
                                        total_meeting_count?: string;
                                        total_meeting_duration?: string;
                                        total_participant_count?: string;
                                        daily_report?: Array<{
                                            date?: string;
                                            meeting_count?: string;
                                            meeting_duration?: string;
                                            participant_count?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/reports/get_daily`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=report&apiName=get_top_user&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_top_user&project=vc&resource=report&version=v1 document }
                 *
                 * 获取 Top 用户列表
                 *
                 * 获取一段时间内组织内会议使用的 Top 用户列表。
                 *
                 * 支持最近90天内的数据查询；默认返回前10位，最多可查询前100位
                 */
                getTopUser: async (
                    payload?: {
                        params: {
                            start_time: string;
                            end_time: string;
                            limit: number;
                            order_by: number;
                            unit?: number;
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
                                    top_user_report?: Array<{
                                        id?: string;
                                        name?: string;
                                        user_type?: number;
                                        meeting_count?: string;
                                        meeting_duration?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/reports/get_top_user`,
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
             * room
             */
            room: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=vc&resource=room&version=v1 document }
                 *
                 * 搜索会议室
                 *
                 * 该接口可以用来搜索会议室，支持使用关键词进行搜索，也支持使用自定义会议室 ID 进行查询。该接口只会返回用户有预定权限的会议室列表。
                 */
                search: async (
                    payload?: {
                        data?: {
                            custom_room_ids?: Array<string>;
                            keyword?: string;
                            room_level_id?: string;
                            search_level_name?: boolean;
                            page_size?: number;
                            page_token?: string;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    rooms?: Array<{
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
                                            contact_ids?: Array<string>;
                                            disable_notice?: boolean;
                                            resume_notice?: boolean;
                                        };
                                        device?: Array<{ name: string }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/rooms/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room&apiName=mget&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=vc&resource=room&version=v1 document }
                 *
                 * 批量查询会议室详情
                 *
                 * 该接口可以使用会议室 ID 批量查询会议室详情。
                 */
                mget: async (
                    payload?: {
                        data: { room_ids: Array<string> };
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
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    items?: Array<{
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
                                            contact_ids?: Array<string>;
                                            disable_notice?: boolean;
                                            resume_notice?: boolean;
                                        };
                                        device?: Array<{ name: string }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/rooms/mget`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=room&version=v1 document }
                 *
                 * 查询会议室详情
                 *
                 * 该接口可以使用会议室 ID 查询会议室详情。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { room_id: string };
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
                                            contact_ids?: Array<string>;
                                            disable_notice?: boolean;
                                            resume_notice?: boolean;
                                        };
                                        device?: Array<{ name: string }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/rooms/:room_id`,
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
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            room_level_id?: string;
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
                                    `${this.domain}/open-apis/vc/v1/rooms`,
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
                                                    rooms?: Array<{
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
                                                            contact_ids?: Array<string>;
                                                            disable_notice?: boolean;
                                                            resume_notice?: boolean;
                                                        };
                                                        device?: Array<{
                                                            name: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=vc&resource=room&version=v1 document }
                 *
                 * 查询会议室列表
                 *
                 * 该接口可以用来查询某个会议室层级下会议室列表。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            room_level_id?: string;
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
                                    rooms?: Array<{
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
                                            contact_ids?: Array<string>;
                                            disable_notice?: boolean;
                                            resume_notice?: boolean;
                                        };
                                        device?: Array<{ name: string }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/rooms`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=vc&resource=room&version=v1 document }
                 *
                 * 删除会议室
                 *
                 * 该接口可以用来删除某个会议室。
                 */
                delete: async (
                    payload?: {
                        path: { room_id: string };
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
                                `${this.domain}/open-apis/vc/v1/rooms/:room_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=vc&resource=room&version=v1 document }
                 *
                 * 创建会议室
                 *
                 * 该接口用于创建会议室。
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            capacity: number;
                            description?: string;
                            custom_room_id?: string;
                            room_level_id: string;
                            room_status?: {
                                status: boolean;
                                schedule_status?: boolean;
                                disable_start_time?: string;
                                disable_end_time?: string;
                                disable_reason?: string;
                                contact_ids?: Array<string>;
                                disable_notice?: boolean;
                                resume_notice?: boolean;
                            };
                            device?: Array<{ name: string }>;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: {
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
                                            contact_ids?: Array<string>;
                                            disable_notice?: boolean;
                                            resume_notice?: boolean;
                                        };
                                        device?: Array<{ name: string }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/rooms`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=vc&resource=room&version=v1 document }
                 *
                 * 更新会议室
                 *
                 * 该接口可以用来更新某个会议室的信息。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            name?: string;
                            capacity?: number;
                            description?: string;
                            custom_room_id?: string;
                            room_level_id?: string;
                            room_status?: {
                                status: boolean;
                                schedule_status?: boolean;
                                disable_start_time?: string;
                                disable_end_time?: string;
                                disable_reason?: string;
                                contact_ids?: Array<string>;
                                disable_notice?: boolean;
                                resume_notice?: boolean;
                            };
                            device?: Array<{ name: string }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { room_id: string };
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
                                `${this.domain}/open-apis/vc/v1/rooms/:room_id`,
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
             * resource_reservation_list
             */
            resourceReservationList: {
                getWithIterator: async (
                    payload?: {
                        params: {
                            room_level_id: string;
                            need_topic?: boolean;
                            start_time: string;
                            end_time: string;
                            room_ids: Array<string>;
                            is_exclude?: boolean;
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
                                    `${this.domain}/open-apis/vc/v1/resource_reservation_list`,
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
                                                    room_reservation_list?: Array<{
                                                        room_id?: string;
                                                        room_name?: string;
                                                        event_title?: string;
                                                        reserver?: string;
                                                        reserver_user_id?: string;
                                                        department_of_reserver?: string;
                                                        guests_number?: string;
                                                        accepted_number?: string;
                                                        event_start_time?: string;
                                                        event_end_time?: string;
                                                        event_duration?: string;
                                                        reservation_status?: string;
                                                        check_in_device?: string;
                                                        room_check_in_status?: string;
                                                        check_in_time?: string;
                                                        is_release_early?: string;
                                                        releasing_person?: string;
                                                        releasing_time?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=resource_reservation_list&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=resource_reservation_list&version=v1 document }
                 *
                 * 查询会议室预定数据
                 *
                 * 查询会议室预定数据，具体权限要求请参考「资源介绍」。
                 */
                get: async (
                    payload?: {
                        params: {
                            room_level_id: string;
                            need_topic?: boolean;
                            start_time: string;
                            end_time: string;
                            room_ids: Array<string>;
                            is_exclude?: boolean;
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
                                    room_reservation_list?: Array<{
                                        room_id?: string;
                                        room_name?: string;
                                        event_title?: string;
                                        reserver?: string;
                                        reserver_user_id?: string;
                                        department_of_reserver?: string;
                                        guests_number?: string;
                                        accepted_number?: string;
                                        event_start_time?: string;
                                        event_end_time?: string;
                                        event_duration?: string;
                                        reservation_status?: string;
                                        check_in_device?: string;
                                        room_check_in_status?: string;
                                        check_in_time?: string;
                                        is_release_early?: string;
                                        releasing_person?: string;
                                        releasing_time?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/resource_reservation_list`,
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
             * participant_quality_list
             */
            participantQualityList: {
                getWithIterator: async (
                    payload?: {
                        params: {
                            meeting_start_time: string;
                            meeting_end_time: string;
                            meeting_no: string;
                            join_time: string;
                            user_id?: string;
                            room_id?: string;
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
                                    `${this.domain}/open-apis/vc/v1/participant_quality_list`,
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
                                                    participant_quality_list?: Array<{
                                                        network?: {
                                                            time?: string;
                                                            network_delay?: string;
                                                            bitrate_received?: string;
                                                            packet_loss_avg_received?: string;
                                                            packet_loss_max_received?: string;
                                                            bitrate_sent?: string;
                                                            packet_loss_avg_sent?: string;
                                                            packet_loss_max_sent?: string;
                                                        };
                                                        audio?: {
                                                            time?: string;
                                                            mic_input_volume?: string;
                                                            speaker_volume?: string;
                                                            bitrate_received?: string;
                                                            latency_received?: string;
                                                            jitter_received?: string;
                                                            bitrate_sent?: string;
                                                            latency_sent?: string;
                                                            jitter_sent?: string;
                                                        };
                                                        video?: {
                                                            time?: string;
                                                            bitrate_received?: string;
                                                            latency_received?: string;
                                                            jitter_received?: string;
                                                            maximum_resolution_received?: string;
                                                            framerate_received?: string;
                                                            bitrate_sent?: string;
                                                            latency_sent?: string;
                                                            jitter_sent?: string;
                                                            maximum_resolution_sent?: string;
                                                            framerate_sent?: string;
                                                        };
                                                        screen_sharing?: {
                                                            time?: string;
                                                            bitrate_received?: string;
                                                            latency_received?: string;
                                                            jitter_received?: string;
                                                            maximum_resolution_received?: string;
                                                            framerate_received?: string;
                                                            bitrate_sent?: string;
                                                            latency_sent?: string;
                                                            jitter_sent?: string;
                                                            maximum_resolution_sent?: string;
                                                            framerate_sent?: string;
                                                        };
                                                        cpu_usage?: {
                                                            time?: string;
                                                            client_avg_cpu_usage?: string;
                                                            client_max_cpu_usage?: string;
                                                            system_avg_cpu_usage?: string;
                                                            system_max_cpu_usage?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=participant_quality_list&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=participant_quality_list&version=v1 document }
                 *
                 * 查询参会人会议质量数据
                 *
                 * 查询参会人会议质量数据（仅支持已结束会议），具体权限要求请参考「资源介绍」。
                 */
                get: async (
                    payload?: {
                        params: {
                            meeting_start_time: string;
                            meeting_end_time: string;
                            meeting_no: string;
                            join_time: string;
                            user_id?: string;
                            room_id?: string;
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
                                    participant_quality_list?: Array<{
                                        network?: {
                                            time?: string;
                                            network_delay?: string;
                                            bitrate_received?: string;
                                            packet_loss_avg_received?: string;
                                            packet_loss_max_received?: string;
                                            bitrate_sent?: string;
                                            packet_loss_avg_sent?: string;
                                            packet_loss_max_sent?: string;
                                        };
                                        audio?: {
                                            time?: string;
                                            mic_input_volume?: string;
                                            speaker_volume?: string;
                                            bitrate_received?: string;
                                            latency_received?: string;
                                            jitter_received?: string;
                                            bitrate_sent?: string;
                                            latency_sent?: string;
                                            jitter_sent?: string;
                                        };
                                        video?: {
                                            time?: string;
                                            bitrate_received?: string;
                                            latency_received?: string;
                                            jitter_received?: string;
                                            maximum_resolution_received?: string;
                                            framerate_received?: string;
                                            bitrate_sent?: string;
                                            latency_sent?: string;
                                            jitter_sent?: string;
                                            maximum_resolution_sent?: string;
                                            framerate_sent?: string;
                                        };
                                        screen_sharing?: {
                                            time?: string;
                                            bitrate_received?: string;
                                            latency_received?: string;
                                            jitter_received?: string;
                                            maximum_resolution_received?: string;
                                            framerate_received?: string;
                                            bitrate_sent?: string;
                                            latency_sent?: string;
                                            jitter_sent?: string;
                                            maximum_resolution_sent?: string;
                                            framerate_sent?: string;
                                        };
                                        cpu_usage?: {
                                            time?: string;
                                            client_avg_cpu_usage?: string;
                                            client_max_cpu_usage?: string;
                                            system_avg_cpu_usage?: string;
                                            system_max_cpu_usage?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/participant_quality_list`,
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
             * room_level
             */
            roomLevel: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_level&apiName=mget&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=vc&resource=room_level&version=v1 document }
                 *
                 * 批量查询会议室层级详情
                 *
                 * 该接口可以使用会议室层级 ID 批量查询会议室层级详情。
                 */
                mget: async (
                    payload?: {
                        data: { level_ids: Array<string> };
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
                                        room_level_id?: string;
                                        name?: string;
                                        parent_id?: string;
                                        path?: Array<string>;
                                        has_child?: boolean;
                                        custom_group_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/room_levels/mget`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_level&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=room_level&version=v1 document }
                 *
                 * 查询会议室层级详情
                 *
                 * 该接口可以使用会议室层级 ID 查询会议室层级详情。
                 */
                get: async (
                    payload?: {
                        path: { room_level_id: string };
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
                                    room_level?: {
                                        room_level_id?: string;
                                        name?: string;
                                        parent_id?: string;
                                        path?: Array<string>;
                                        has_child?: boolean;
                                        custom_group_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/room_levels/:room_level_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_level&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=vc&resource=room_level&version=v1 document }
                 *
                 * 搜索会议室层级
                 *
                 * 该接口可以用来搜索会议室层级，支持使用自定义会议室层级 ID 进行查询。
                 */
                search: async (
                    payload?: {
                        params: { custom_level_ids: string };
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
                                data?: { level_ids?: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/room_levels/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_level&apiName=del&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=del&project=vc&resource=room_level&version=v1 document }
                 *
                 * 删除会议室层级
                 *
                 * 该接口可以用来删除某个会议室层级。
                 */
                del: async (
                    payload?: {
                        data: { room_level_id: string; delete_child?: boolean };
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
                                `${this.domain}/open-apis/vc/v1/room_levels/del`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_level&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=vc&resource=room_level&version=v1 document }
                 *
                 * 更新会议室层级
                 *
                 * 该接口可以用来更新某个会议室层级的信息。
                 */
                patch: async (
                    payload?: {
                        data: {
                            name: string;
                            parent_id: string;
                            custom_group_id?: string;
                        };
                        path: { room_level_id: string };
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
                                `${this.domain}/open-apis/vc/v1/room_levels/:room_level_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_level&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=vc&resource=room_level&version=v1 document }
                 *
                 * 创建会议室层级
                 *
                 * 该接口用于创建会议室层级。
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            parent_id: string;
                            custom_group_id?: string;
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
                                    room_level?: {
                                        room_level_id?: string;
                                        name?: string;
                                        parent_id?: string;
                                        path?: Array<string>;
                                        has_child?: boolean;
                                        custom_group_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/room_levels`,
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
                            room_level_id?: string;
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
                                    `${this.domain}/open-apis/vc/v1/room_levels`,
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
                                                        room_level_id?: string;
                                                        name?: string;
                                                        parent_id?: string;
                                                        path?: Array<string>;
                                                        has_child?: boolean;
                                                        custom_group_id?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=room_level&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=vc&resource=room_level&version=v1 document }
                 *
                 * 查询会议室层级列表
                 *
                 * 该接口用来查询某个会议室层级下的子层级列表。
                 */
                list: async (
                    payload?: {
                        params?: {
                            room_level_id?: string;
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
                                    items?: Array<{
                                        room_level_id?: string;
                                        name?: string;
                                        parent_id?: string;
                                        path?: Array<string>;
                                        has_child?: boolean;
                                        custom_group_id?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/room_levels`,
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
             * scope_config
             */
            scopeConfig: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=scope_config&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=scope_config&version=v1 document }
                 *
                 * 查询会议室配置
                 *
                 * 该接口可以用来查询某个会议层级范围下或者某个会议室的配置。
                 */
                get: async (
                    payload?: {
                        params: {
                            scope_type: number;
                            scope_id: string;
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
                                    current_config?: {
                                        scope_type: number;
                                        scope_id: string;
                                        scope_config?: {
                                            room_background?: string;
                                            display_background?: string;
                                            digital_signage?: {
                                                if_cover_child_scope?: boolean;
                                                enable?: boolean;
                                                mute?: boolean;
                                                start_display?: number;
                                                stop_display?: number;
                                                materials?: Array<{
                                                    id?: string;
                                                    name?: string;
                                                    material_type?: number;
                                                    url?: string;
                                                    duration?: number;
                                                    cover?: string;
                                                    md5?: string;
                                                    vid?: string;
                                                    size?: string;
                                                }>;
                                            };
                                            room_box_digital_signage?: {
                                                if_cover_child_scope?: boolean;
                                                enable?: boolean;
                                                mute?: boolean;
                                                start_display?: number;
                                                stop_display?: number;
                                                materials?: Array<{
                                                    id?: string;
                                                    name?: string;
                                                    material_type?: number;
                                                    url?: string;
                                                    duration?: number;
                                                    cover?: string;
                                                    md5?: string;
                                                    vid?: string;
                                                    size?: string;
                                                }>;
                                            };
                                            room_status?: {
                                                status: boolean;
                                                schedule_status?: boolean;
                                                disable_start_time?: string;
                                                disable_end_time?: string;
                                                disable_reason?: string;
                                                contact_ids?: Array<string>;
                                                disable_notice?: boolean;
                                                resume_notice?: boolean;
                                            };
                                        };
                                    };
                                    origin_configs?: Array<{
                                        scope_type: number;
                                        scope_id: string;
                                        scope_config?: {
                                            room_background?: string;
                                            display_background?: string;
                                            digital_signage?: {
                                                if_cover_child_scope?: boolean;
                                                enable?: boolean;
                                                mute?: boolean;
                                                start_display?: number;
                                                stop_display?: number;
                                                materials?: Array<{
                                                    id?: string;
                                                    name?: string;
                                                    material_type?: number;
                                                    url?: string;
                                                    duration?: number;
                                                    cover?: string;
                                                    md5?: string;
                                                    vid?: string;
                                                    size?: string;
                                                }>;
                                            };
                                            room_box_digital_signage?: {
                                                if_cover_child_scope?: boolean;
                                                enable?: boolean;
                                                mute?: boolean;
                                                start_display?: number;
                                                stop_display?: number;
                                                materials?: Array<{
                                                    id?: string;
                                                    name?: string;
                                                    material_type?: number;
                                                    url?: string;
                                                    duration?: number;
                                                    cover?: string;
                                                    md5?: string;
                                                    vid?: string;
                                                    size?: string;
                                                }>;
                                            };
                                            room_status?: {
                                                status: boolean;
                                                schedule_status?: boolean;
                                                disable_start_time?: string;
                                                disable_end_time?: string;
                                                disable_reason?: string;
                                                contact_ids?: Array<string>;
                                                disable_notice?: boolean;
                                                resume_notice?: boolean;
                                            };
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/scope_config`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=scope_config&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=vc&resource=scope_config&version=v1 document }
                 *
                 * 设置会议室配置
                 *
                 * 该接口可以用来设置某个会议层级范围下或者某个会议室的配置。
                 */
                create: async (
                    payload?: {
                        data: {
                            scope_type: number;
                            scope_id: string;
                            scope_config?: {
                                room_background?: string;
                                display_background?: string;
                                digital_signage?: {
                                    if_cover_child_scope?: boolean;
                                    enable?: boolean;
                                    mute?: boolean;
                                    start_display?: number;
                                    stop_display?: number;
                                    materials?: Array<{
                                        id?: string;
                                        name?: string;
                                        material_type?: number;
                                        url?: string;
                                        duration?: number;
                                        cover?: string;
                                        md5?: string;
                                        vid?: string;
                                        size?: string;
                                    }>;
                                };
                                room_box_digital_signage?: {
                                    if_cover_child_scope?: boolean;
                                    enable?: boolean;
                                    mute?: boolean;
                                    start_display?: number;
                                    stop_display?: number;
                                    materials?: Array<{
                                        id?: string;
                                        name?: string;
                                        material_type?: number;
                                        url?: string;
                                        duration?: number;
                                        cover?: string;
                                        md5?: string;
                                        vid?: string;
                                        size?: string;
                                    }>;
                                };
                                room_status?: {
                                    status: boolean;
                                    schedule_status?: boolean;
                                    disable_start_time?: string;
                                    disable_end_time?: string;
                                    disable_reason?: string;
                                    contact_ids?: Array<string>;
                                    disable_notice?: boolean;
                                    resume_notice?: boolean;
                                };
                            };
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
                                `${this.domain}/open-apis/vc/v1/scope_config`,
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
             * reserve_config.form
             */
            reserveConfigForm: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve_config.form&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=reserve_config.form&version=v1 document }
                 *
                 * 查询会议室预定表单
                 *
                 * 查询会议室预定表单。
                 */
                get: async (
                    payload?: {
                        params: {
                            scope_type: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { reserve_config_id?: string };
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
                                    reserve_form_config: {
                                        if_cover_child_scope?: boolean;
                                        reserve_form: boolean;
                                        notified_users?: Array<{
                                            user_id: string;
                                            user_name?: string;
                                        }>;
                                        notified_time?: number;
                                        time_unit?: number;
                                        custom_list?: Array<{
                                            custom_type: number;
                                            key: string;
                                            need_fill: boolean;
                                            title: string;
                                            placeholder?: string;
                                            options?: Array<{
                                                text: string;
                                                key: string;
                                                is_other?: boolean;
                                            }>;
                                            conditions?: Array<{
                                                custom_key?: string;
                                                option_keys?: Array<string>;
                                            }>;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/reserve_configs/:reserve_config_id/form`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve_config.form&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=vc&resource=reserve_config.form&version=v1 document }
                 *
                 * 更新会议室预定表单
                 *
                 * 更新会议室预定表单。
                 */
                patch: async (
                    payload?: {
                        data: {
                            scope_type: number;
                            reserve_form_config: {
                                if_cover_child_scope?: boolean;
                                reserve_form: boolean;
                                notified_users?: Array<{
                                    user_id: string;
                                    user_name?: string;
                                }>;
                                notified_time?: number;
                                time_unit?: number;
                                custom_list?: Array<{
                                    custom_type: number;
                                    key: string;
                                    need_fill: boolean;
                                    title: string;
                                    placeholder?: string;
                                    options?: Array<{
                                        text: string;
                                        key: string;
                                        is_other?: boolean;
                                    }>;
                                    conditions?: Array<{
                                        custom_key?: string;
                                        option_keys?: Array<string>;
                                    }>;
                                }>;
                            };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { reserve_config_id?: string };
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
                                `${this.domain}/open-apis/vc/v1/reserve_configs/:reserve_config_id/form`,
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
             * reserve_config.admin
             */
            reserveConfigAdmin: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve_config.admin&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=reserve_config.admin&version=v1 document }
                 *
                 * 查询会议室预定管理员
                 *
                 * 查询会议室预定管理员。
                 */
                get: async (
                    payload?: {
                        params: {
                            scope_type: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { reserve_config_id?: string };
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
                                    reserve_admin_config: {
                                        depts?: Array<{
                                            department_id: string;
                                            department_name?: string;
                                        }>;
                                        users?: Array<{
                                            user_id: string;
                                            user_name?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/reserve_configs/:reserve_config_id/admin`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve_config.admin&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=vc&resource=reserve_config.admin&version=v1 document }
                 *
                 * 更新会议室预定管理员
                 *
                 * 更新会议室预定管理员。
                 */
                patch: async (
                    payload?: {
                        data: {
                            scope_type: number;
                            reserve_admin_config: {
                                depts?: Array<{
                                    department_id: string;
                                    department_name?: string;
                                }>;
                                users?: Array<{
                                    user_id: string;
                                    user_name?: string;
                                }>;
                            };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { reserve_config_id?: string };
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
                                `${this.domain}/open-apis/vc/v1/reserve_configs/:reserve_config_id/admin`,
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
             * reserve_config.disable_inform
             */
            reserveConfigDisableInform: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve_config.disable_inform&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=reserve_config.disable_inform&version=v1 document }
                 *
                 * 查询禁用状态变更通知
                 *
                 * 查询禁用状态变更通知
                 */
                get: async (
                    payload?: {
                        params: {
                            scope_type: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { reserve_config_id: string };
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
                                    disable_inform?: {
                                        if_cover_child_scope?: boolean;
                                        if_inform: boolean;
                                        informed_users?: Array<{
                                            user_id: string;
                                            user_name?: string;
                                        }>;
                                        informed_depts?: Array<{
                                            department_id: string;
                                            department_name?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/reserve_configs/:reserve_config_id/disable_inform`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve_config.disable_inform&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=vc&resource=reserve_config.disable_inform&version=v1 document }
                 *
                 * 更新禁用状态变更通知
                 *
                 * 更新禁用状态变更通知
                 */
                patch: async (
                    payload?: {
                        data: {
                            scope_type: number;
                            disable_inform: {
                                if_cover_child_scope?: boolean;
                                if_inform: boolean;
                                informed_users?: Array<{
                                    user_id: string;
                                    user_name?: string;
                                }>;
                                informed_depts?: Array<{
                                    department_id: string;
                                    department_name?: string;
                                }>;
                            };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { reserve_config_id: string };
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
                                `${this.domain}/open-apis/vc/v1/reserve_configs/:reserve_config_id/disable_inform`,
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
             * reserve_config
             */
            reserveConfig: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve_config&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=vc&resource=reserve_config&version=v1 document }
                 *
                 * 更新会议室预定限制
                 *
                 * 更新会议室预定限制。
                 */
                patch: async (
                    payload?: {
                        data: {
                            scope_type: string;
                            approval_config?: {
                                approval_switch?: number;
                                approval_condition?: number;
                                meeting_duration?: number;
                                approvers?: Array<{
                                    user_id: string;
                                    user_name?: string;
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
                                if_cover_child_scope?: boolean;
                                allow_all_users?: number;
                                allow_users?: Array<{
                                    user_id: string;
                                    user_name?: string;
                                }>;
                                allow_depts?: Array<{
                                    department_id: string;
                                    department_name?: string;
                                }>;
                            };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { reserve_config_id: string };
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
                                `${this.domain}/open-apis/vc/v1/reserve_configs/:reserve_config_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=reserve_config&apiName=reserve_scope&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reserve_scope&project=vc&resource=reserve_config&version=v1 document }
                 *
                 * 查询会议室预定限制
                 *
                 * 查询会议室预定限制。
                 */
                reserveScope: async (
                    payload?: {
                        params: {
                            scope_id: string;
                            scope_type: string;
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
                                    approve_config?: {
                                        approval_switch?: number;
                                        approval_condition?: number;
                                        meeting_duration?: number;
                                        approvers?: Array<{
                                            user_id: string;
                                            user_name?: string;
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
                                        if_cover_child_scope?: boolean;
                                        allow_all_users?: number;
                                        allow_users?: Array<{
                                            user_id: string;
                                            user_name?: string;
                                        }>;
                                        allow_depts?: Array<{
                                            department_id: string;
                                            department_name?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/reserve_configs/reserve_scope`,
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
             * export
             */
            export: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=export&version=v1 document }
                 *
                 * 查询导出任务结果
                 *
                 * 查看异步导出的进度。
                 */
                get: async (
                    payload?: {
                        path?: { task_id?: string };
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
                                    status: number;
                                    url?: string;
                                    file_token?: string;
                                    fail_msg?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/exports/:task_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=download&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download&project=vc&resource=export&version=v1 document }
                 *
                 * 下载导出文件
                 *
                 * 下载导出文件。
                 */
                download: async (
                    payload?: {
                        params: { file_token: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/exports/download`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                            $return_headers: true,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    const checkIsReadable = () => {
                        const consumedError =
                            "The stream has already been consumed";
                        if (!res.data.readable) {
                            this.logger.error(consumedError);
                            throw new Error(consumedError);
                        }
                    };

                    return {
                        writeFile: async (filePath: string) => {
                            checkIsReadable();
                            return new Promise((resolve, reject) => {
                                const writableStream =
                                    fs.createWriteStream(filePath);
                                writableStream.on("finish", () => {
                                    resolve(filePath);
                                });
                                writableStream.on("error", (e) => {
                                    reject(e);
                                });
                                res.data.pipe(writableStream);
                            });
                        },
                        getReadableStream: () => {
                            checkIsReadable();
                            return res.data as Readable;
                        },
                        headers: res.headers,
                    };
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=resource_reservation_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=resource_reservation_list&project=vc&resource=export&version=v1 document }
                 *
                 * 导出会议室预定数据
                 *
                 * 导出会议室预定数据，具体权限要求请参考「资源介绍」。
                 */
                resourceReservationList: async (
                    payload?: {
                        data: {
                            room_level_id: string;
                            need_topic?: boolean;
                            start_time: string;
                            end_time: string;
                            room_ids?: Array<string>;
                            is_exclude?: boolean;
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
                                data?: { task_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/exports/resource_reservation_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=participant_quality_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=participant_quality_list&project=vc&resource=export&version=v1 document }
                 *
                 * 导出参会人会议质量数据
                 *
                 * 导出某场会议某个参会人的音视频&共享质量数据;（仅支持已结束会议），具体权限要求请参考「资源介绍」。
                 */
                participantQualityList: async (
                    payload?: {
                        data: {
                            meeting_start_time: string;
                            meeting_end_time: string;
                            meeting_no: string;
                            join_time: string;
                            user_id?: string;
                            room_id?: string;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: { task_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/exports/participant_quality_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=participant_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=participant_list&project=vc&resource=export&version=v1 document }
                 *
                 * 导出参会人明细
                 *
                 * 导出某个会议的参会人详情列表，具体权限要求请参考「资源介绍」。
                 */
                participantList: async (
                    payload?: {
                        data: {
                            meeting_start_time: string;
                            meeting_end_time: string;
                            meeting_status?: number;
                            meeting_no: string;
                            user_id?: string;
                            room_id?: string;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: { task_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/exports/participant_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=export&apiName=meeting_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=meeting_list&project=vc&resource=export&version=v1 document }
                 *
                 * 导出会议明细
                 *
                 * 导出会议明细，具体权限要求请参考资源介绍。
                 */
                meetingList: async (
                    payload?: {
                        data: {
                            start_time: string;
                            end_time: string;
                            meeting_status?: number;
                            meeting_no?: string;
                            user_id?: string;
                            room_id?: string;
                            meeting_type?: number;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: { task_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/exports/meeting_list`,
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
             * meeting_list
             */
            meetingList: {
                getWithIterator: async (
                    payload?: {
                        params: {
                            start_time: string;
                            end_time: string;
                            meeting_status?: number;
                            meeting_no?: string;
                            user_id?: string;
                            room_id?: string;
                            meeting_type?: number;
                            page_size?: number;
                            page_token?: string;
                            include_external_meetings?: boolean;
                            include_webinar?: boolean;
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
                                    `${this.domain}/open-apis/vc/v1/meeting_list`,
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
                                                    meeting_list?: Array<{
                                                        meeting_id?: string;
                                                        meeting_topic?: string;
                                                        meeting_type?: number;
                                                        organizer?: string;
                                                        department?: string;
                                                        user_id?: string;
                                                        employee_id?: string;
                                                        email?: string;
                                                        mobile?: string;
                                                        meeting_start_time?: string;
                                                        meeting_end_time?: string;
                                                        meeting_duration?: string;
                                                        number_of_participants?: string;
                                                        number_of_devices?: string;
                                                        audio?: boolean;
                                                        video?: boolean;
                                                        sharing?: boolean;
                                                        recording?: boolean;
                                                        telephone?: boolean;
                                                        reserved_rooms?: Array<{
                                                            room_id?: string;
                                                            room_name?: string;
                                                        }>;
                                                        has_related_document?: boolean;
                                                        ai_note?: boolean;
                                                        is_external?: boolean;
                                                        meeting_subtype?: number;
                                                        meeting_instance_id?: string;
                                                        number_of_webinar_viewers?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=meeting_list&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=meeting_list&version=v1 document }
                 *
                 * 查询会议明细
                 *
                 * 查询会议明细，具体权限要求请参考[资源介绍](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-room-data/resource-introduction)
                 *
                 * **说明**;;本接口适用于查询 **进行中** 或者 **已结束** 的会议明细。
                 */
                get: async (
                    payload?: {
                        params: {
                            start_time: string;
                            end_time: string;
                            meeting_status?: number;
                            meeting_no?: string;
                            user_id?: string;
                            room_id?: string;
                            meeting_type?: number;
                            page_size?: number;
                            page_token?: string;
                            include_external_meetings?: boolean;
                            include_webinar?: boolean;
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
                                    meeting_list?: Array<{
                                        meeting_id?: string;
                                        meeting_topic?: string;
                                        meeting_type?: number;
                                        organizer?: string;
                                        department?: string;
                                        user_id?: string;
                                        employee_id?: string;
                                        email?: string;
                                        mobile?: string;
                                        meeting_start_time?: string;
                                        meeting_end_time?: string;
                                        meeting_duration?: string;
                                        number_of_participants?: string;
                                        number_of_devices?: string;
                                        audio?: boolean;
                                        video?: boolean;
                                        sharing?: boolean;
                                        recording?: boolean;
                                        telephone?: boolean;
                                        reserved_rooms?: Array<{
                                            room_id?: string;
                                            room_name?: string;
                                        }>;
                                        has_related_document?: boolean;
                                        ai_note?: boolean;
                                        is_external?: boolean;
                                        meeting_subtype?: number;
                                        meeting_instance_id?: string;
                                        number_of_webinar_viewers?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/meeting_list`,
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
             * participant_list
             */
            participantList: {
                getWithIterator: async (
                    payload?: {
                        params: {
                            meeting_start_time: string;
                            meeting_end_time: string;
                            meeting_status?: number;
                            meeting_no: string;
                            user_id?: string;
                            room_id?: string;
                            page_size?: number;
                            page_token?: string;
                            webinar_user_role?: string;
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
                                    `${this.domain}/open-apis/vc/v1/participant_list`,
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
                                                    participants?: Array<{
                                                        participant_name?: string;
                                                        department?: string;
                                                        user_id?: string;
                                                        meeting_room_id?: string;
                                                        employee_id?: string;
                                                        phone?: string;
                                                        email?: string;
                                                        device?: string;
                                                        app_version?: string;
                                                        public_ip?: string;
                                                        internal_ip?: string;
                                                        use_rtc_proxy?: boolean;
                                                        location?: string;
                                                        network_type?: string;
                                                        protocol?: string;
                                                        microphone?: string;
                                                        speaker?: string;
                                                        camera?: string;
                                                        audio?: boolean;
                                                        video?: boolean;
                                                        sharing?: boolean;
                                                        join_time?: string;
                                                        leave_time?: string;
                                                        time_in_meeting?: string;
                                                        leave_reason?: string;
                                                        accept_status?: number;
                                                        is_external?: boolean;
                                                        webinar_user_role?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=participant_list&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=participant_list&version=v1 document }
                 *
                 * 查询参会人明细
                 *
                 * 查询参会人明细，具体权限要求请参考[资源介绍](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/vc-v1/meeting-room-data/resource-introduction)
                 */
                get: async (
                    payload?: {
                        params: {
                            meeting_start_time: string;
                            meeting_end_time: string;
                            meeting_status?: number;
                            meeting_no: string;
                            user_id?: string;
                            room_id?: string;
                            page_size?: number;
                            page_token?: string;
                            webinar_user_role?: string;
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
                                    participants?: Array<{
                                        participant_name?: string;
                                        department?: string;
                                        user_id?: string;
                                        meeting_room_id?: string;
                                        employee_id?: string;
                                        phone?: string;
                                        email?: string;
                                        device?: string;
                                        app_version?: string;
                                        public_ip?: string;
                                        internal_ip?: string;
                                        use_rtc_proxy?: boolean;
                                        location?: string;
                                        network_type?: string;
                                        protocol?: string;
                                        microphone?: string;
                                        speaker?: string;
                                        camera?: string;
                                        audio?: boolean;
                                        video?: boolean;
                                        sharing?: boolean;
                                        join_time?: string;
                                        leave_time?: string;
                                        time_in_meeting?: string;
                                        leave_reason?: string;
                                        accept_status?: number;
                                        is_external?: boolean;
                                        webinar_user_role?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/participant_list`,
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
             * note
             */
            note: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=note&apiName=subscription&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=vc&resource=note&version=v1 document }
                 *
                 * 订阅纪要变更事件
                 *
                 * 订阅当前用户身份相关的纪要资源变更事件。通过指定事件类型，来订阅纪要资源不同的事件变更。
                 */
                subscription: async (
                    payload?: {
                        data?: { event_type?: string };
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
                                `${this.domain}/open-apis/vc/v1/notes/subscription`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=note&apiName=unsubscription&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscription&project=vc&resource=note&version=v1 document }
                 *
                 * 取消订阅纪要变更事件
                 *
                 * 取消订阅当前用户身份相关的纪要资源变更事件。通过指定事件类型，来取消订阅纪要资源对应的事件变更。
                 */
                unsubscription: async (
                    payload?: {
                        data?: { event_type?: string };
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
                                `${this.domain}/open-apis/vc/v1/notes/unsubscription`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=note&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=vc&resource=note&version=v1 document }
                 *
                 * 获取纪要详情
                 *
                 * 获取一篇纪要的详细数据。
                 *
                 * 只能获取自己可见纪要文档，以及相关联的产物、关联引用信息。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { note_id: string };
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
                                    note?: {
                                        creator_id: string;
                                        create_time: string;
                                        artifacts: Array<{
                                            artifact_type: number;
                                            create_time: string;
                                            doc_token: string;
                                        }>;
                                        references: Array<{
                                            reference_type: number;
                                            doc_token: string;
                                        }>;
                                        note_source?: {
                                            source_type?: string;
                                            source_entity_id?: string;
                                        };
                                        note_display_type?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/notes/:note_id`,
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
             * bot
             */
            bot: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=bot&apiName=user_active_meeting&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=user_active_meeting&project=vc&resource=bot&version=v1 document }
                 *
                 * 获取用户活跃会议列表
                 *
                 * 查询指定用户当前正在参与的所有会议，返回该用户处于活跃状态的会议列表，包含会议号、会议 ID 及会议标题等核心信息。;;
                 *
                 * 返回结果仅包含用户当前处于活跃状态的会议，已结束或尚未开始的会议不会被返回。
                 */
                userActiveMeeting: async (
                    payload?: {
                        params?: {
                            user_id?: string;
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
                                    meetings?: Array<{
                                        meeting_no?: string;
                                        meeting_id?: string;
                                        meeting_title?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/bots/user_active_meeting`,
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
                eventsWithIterator: async (
                    payload?: {
                        params: {
                            meeting_id: string;
                            page_token?: string;
                            start_time?: string;
                            end_time?: string;
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
                                    `${this.domain}/open-apis/vc/v1/bots/events`,
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    events?: Array<{
                                                        event_id?: string;
                                                        event_type?: string;
                                                        event_time?: string;
                                                        payload?: {
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
                                                                share_doc?: {
                                                                    url?: string;
                                                                    title?: string;
                                                                };
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
                                                        };
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
                 * {@link https://open.feishu.cn/api-explorer?project=vc&resource=bot&apiName=events&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=events&project=vc&resource=bot&version=v1 document }
                 *
                 * 获取会议事件列表
                 *
                 * 获取会议中的事件列表，包括参会人加入或离开、发言、聊天、共享等事件
                 */
                events: async (
                    payload?: {
                        params: {
                            meeting_id: string;
                            page_token?: string;
                            start_time?: string;
                            end_time?: string;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    events?: Array<{
                                        event_id?: string;
                                        event_type?: string;
                                        event_time?: string;
                                        payload?: {
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
                                                share_doc?: {
                                                    url?: string;
                                                    title?: string;
                                                };
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
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/vc/v1/bots/events`,
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
