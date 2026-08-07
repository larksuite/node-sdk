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
import c360 from "./c360";

// auto gen
export default abstract class Client extends c360 {
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
    calendar = {
        /**
         * card
         */
        card: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=operate_event_card&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=operate_event_card&project=calendar&resource=card&version=v4 document }
             *
             * 更新确认日程消息卡片
             *
             * 更新确认日程消息卡片
             */
            operateEventCard: async (
                payload?: {
                    data: { message_id: string; body: string };
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
                                result?: {
                                    meeting_url?: string;
                                    meeting_no?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/cards/operate_event_card`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=user_common_free_time_v2&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=user_common_free_time_v2&project=calendar&resource=card&version=v4 document }
             */
            userCommonFreeTimeV2: async (
                payload?: {
                    data?: {
                        start_time?: string;
                        end_time?: string;
                        duration?: string;
                        start_timezone?: string;
                        participant_ids?: string;
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
                                result?: {
                                    free_time_start?: string;
                                    free_time_end?: string;
                                    free_time_list?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/cards/user_common_free_time_v2`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=get_can_book_meeting_room_id&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_can_book_meeting_room_id&project=calendar&resource=card&version=v4 document }
             *
             * 获取空闲会议室列表
             *
             * 获取空闲会议室列表
             */
            getCanBookMeetingRoomId: async (
                payload?: {
                    data?: {
                        start_time?: string;
                        end_time?: string;
                        recurrence_rule?: string;
                        start_timezone?: string;
                        meeting_room_equipment?: string;
                        meeting_building?: string;
                        meeting_floor?: string;
                        meeting_capacity?: string;
                        meeting_room_name?: string;
                        scenario_context_schema_version?: string;
                        scenario_context?: {
                            scenario?: string;
                            work_mode?: number;
                            extra?: {
                                ai_task_id?: string;
                                event_uid?: string;
                                origin_time?: string;
                            };
                            system_info?: {
                                session_id?: string;
                                lang?: string;
                                locale?: string;
                            };
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
                                result?: {
                                    meeting_room_id?: string;
                                    hint?: string;
                                    rooms?: Array<{
                                        name?: string;
                                        room_id?: string;
                                    }>;
                                    recurrence_rule?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/cards/get_can_book_meeting_room_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=get_user_common_free_time&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_user_common_free_time&project=calendar&resource=card&version=v4 document }
             *
             * 获取用户空闲时间段
             *
             * 获取用户空闲时间段
             */
            getUserCommonFreeTime: async (
                payload?: {
                    data?: {
                        start_time?: string;
                        end_time?: string;
                        scheduler_time_len?: string;
                        start_timezone?: string;
                        participant_ids?: string;
                        scenario_context_schema_version?: string;
                        scenario_context?: {
                            scenario?: string;
                            work_mode?: number;
                            extra?: {
                                ai_task_id?: string;
                                event_uid?: string;
                                origin_time?: string;
                            };
                            system_info?: {
                                session_id?: string;
                                lang?: string;
                                locale?: string;
                            };
                        };
                        summary?: string;
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
                                result?: {
                                    free_time_start?: string;
                                    free_time_end?: string;
                                    free_time_list?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/cards/get_user_common_free_time`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=inline_quick_action_basic&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=inline_quick_action_basic&project=calendar&resource=card&version=v4 document }
             */
            inlineQuickActionBasic: async (
                payload?: {
                    data?: {
                        quick_action_command?: string;
                        ai_task_id?: string;
                        summary?: string;
                        start_time?: string;
                        end_time?: string;
                        start_timezone?: string;
                        participant_ids?: string;
                        rec_rule?: string;
                        resource_ids?: string;
                        meeting_notes_url?: string;
                        event_uid?: string;
                        origin_time?: string;
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
                                summary?: string;
                                start_time?: string;
                                end_time?: string;
                                start_timezone?: string;
                                participant_ids?: string;
                                rec_rule?: string;
                                resource_ids?: string;
                                meeting_notes_url?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/cards/inline_quick_action_basic`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=inline_quick_action_adjust&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=inline_quick_action_adjust&project=calendar&resource=card&version=v4 document }
             */
            inlineQuickActionAdjust: async (
                payload?: {
                    data?: {
                        quick_action_command?: string;
                        ai_task_id?: string;
                        summary?: string;
                        start_time?: string;
                        end_time?: string;
                        start_timezone?: string;
                        participant_ids?: string;
                        rec_rule?: string;
                        resource_ids?: string;
                        meeting_notes_url?: string;
                        event_uid?: string;
                        origin_time?: string;
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
                                summary?: string;
                                start_time?: string;
                                end_time?: string;
                                start_timezone?: string;
                                participant_ids?: string;
                                rec_rule?: string;
                                resource_ids?: string;
                                meeting_notes_url?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/cards/inline_quick_action_adjust`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=inline_quick_action_template&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=inline_quick_action_template&project=calendar&resource=card&version=v4 document }
             */
            inlineQuickActionTemplate: async (
                payload?: {
                    data?: {
                        quick_action_command?: string;
                        ai_task_id?: string;
                        start_timezone?: string;
                        time_length?: string;
                        summary?: string;
                        participant_ids?: string;
                        event_uid?: string;
                        origin_time?: string;
                        meeting_notes_url?: string;
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
                                summary?: string;
                                start_time?: string;
                                end_time?: string;
                                start_timezone?: string;
                                participant_ids?: string;
                                rec_rule?: string;
                                resource_ids?: string;
                                meeting_notes_url?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/cards/inline_quick_action_template`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=general_event_card&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=general_event_card&project=calendar&resource=card&version=v4 document }
             *
             * 生成日程消息卡片内容
             *
             * 生成日程消息卡片内容
             */
            generalEventCard: async (
                payload?: {
                    data: {
                        summary: string;
                        start_time: string;
                        end_time: string;
                        start_timezone: string;
                        participant_ids: string;
                        recurrence_rule?: string;
                        meeting_room_ids?: string;
                        duration?: string;
                        need_meeting_notes?: string;
                        scenario_context_schema_version?: string;
                        scenario_context?: {
                            scenario?: string;
                            work_mode?: number;
                            extra?: {
                                ai_task_id?: string;
                                event_uid?: string;
                                origin_time?: string;
                            };
                            system_info?: {
                                session_id?: string;
                                lang?: string;
                                locale?: string;
                            };
                        };
                        event_id?: string;
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
                                hint?: string;
                                result?: {
                                    reply?: string;
                                    start_time?: string;
                                    end_time?: string;
                                    rooms?: Array<{
                                        name?: string;
                                        room_id?: string;
                                    }>;
                                    summary?: string;
                                    participants?: Array<{
                                        name?: string;
                                        user_id?: string;
                                    }>;
                                    event_id?: string;
                                    recurrence_rule?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/cards/general_event_card`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=obtain_meeting_room_for_bot&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=obtain_meeting_room_for_bot&project=calendar&resource=card&version=v4 document }
             */
            obtainMeetingRoomForBot: async (
                payload?: {
                    data?: {
                        start_time?: string;
                        end_time?: string;
                        timezone?: string;
                        meeting_room_equipment?: string;
                        meeting_building?: string;
                        meeting_floor?: string;
                        meeting_capacity?: string;
                        meeting_room_name?: string;
                        query?: string;
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
                                    name?: string;
                                    room_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/cards/obtain_meeting_room_for_bot`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=general_event_card_v2&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=general_event_card_v2&project=calendar&resource=card&version=v4 document }
             */
            generalEventCardV2: async (
                payload?: {
                    data: {
                        summary: string;
                        start_time: string;
                        end_time: string;
                        start_timezone: string;
                        participant_ids: string;
                        recurrence_rule?: string;
                        meeting_room_ids?: string;
                        duration?: string;
                        need_meeting_notes?: string;
                        scenario_context_schema_version?: string;
                        scenario_context?: {
                            scenario?: string;
                            work_mode?: number;
                            extra?: {
                                ai_task_id?: string;
                                event_uid?: string;
                                origin_time?: string;
                            };
                            system_info?: {
                                session_id?: string;
                                lang?: string;
                                locale?: string;
                            };
                        };
                        event_id?: string;
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
                                hint?: string;
                                result?: {
                                    reply?: string;
                                    start_time?: string;
                                    end_time?: string;
                                    rooms?: Array<{
                                        name?: string;
                                        room_id?: string;
                                    }>;
                                    summary?: string;
                                    participants?: Array<{
                                        name?: string;
                                        user_id?: string;
                                    }>;
                                    event_id?: string;
                                    recurrence_rule?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/cards/general_event_card_v2`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=callback&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=callback&project=calendar&resource=card&version=v4 document }
             */
            callback: async (
                payload?: {
                    data?: {
                        message_id?: string;
                        status?: { from_status?: string; to_status?: string };
                        callback_info?: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/cards/callback`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=obtain_free_time_for_bot&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=obtain_free_time_for_bot&project=calendar&resource=card&version=v4 document }
             */
            obtainFreeTimeForBot: async (
                payload?: {
                    data?: {
                        start_time?: string;
                        end_time?: string;
                        scheduler_time_len?: string;
                        timezone?: string;
                        participant_ids?: string;
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
                                free_times?: Array<{
                                    start_time?: string;
                                    end_time?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/cards/obtain_free_time_for_bot`,
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
         * calendar_ai
         */
        calendarAi: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=operate_event_card&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=operate_event_card&project=calendar&resource=calendar_ai&version=v4 document }
             */
            operateEventCard: async (
                payload?: {
                    data: { message_id: string; body: string };
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
                                result?: {
                                    meeting_url?: string;
                                    meeting_no?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai/operate_event_card`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=search_user&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_user&project=calendar&resource=calendar_ai&version=v4 document }
             */
            searchUser: async (
                payload?: {
                    data: { keywords: string };
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
                                result?: {
                                    search_results?: Array<{
                                        query_keyword: string;
                                        user_info?: {
                                            name?: string;
                                            user_id?: string;
                                        };
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai/search_user`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=create_event_card&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_event_card&project=calendar&resource=calendar_ai&version=v4 document }
             */
            createEventCard: async (
                payload?: {
                    data: {
                        summary: string;
                        start_time: string;
                        end_time: string;
                        start_timezone: string;
                        participant_ids: string;
                        recurrence_rule?: string;
                        meeting_room_ids?: string;
                        duration?: string;
                        need_meeting_notes?: string;
                        scenario_context_schema_version?: string;
                        scenario_context?: {
                            scenario?: string;
                            work_mode?: number;
                            extra?: {
                                ai_task_id?: string;
                                event_uid?: string;
                                origin_time?: string;
                            };
                            system_info?: {
                                session_id?: string;
                                lang?: string;
                                locale?: string;
                            };
                        };
                        event_id?: string;
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
                                hint?: string;
                                result?: {
                                    reply?: string;
                                    start_time?: string;
                                    end_time?: string;
                                    rooms?: Array<{
                                        name?: string;
                                        room_id?: string;
                                    }>;
                                    summary?: string;
                                    participants?: Array<{
                                        name?: string;
                                        user_id?: string;
                                    }>;
                                    event_id?: string;
                                    recurrence_rule?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai/create_event_card`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=edit_event&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=edit_event&project=calendar&resource=calendar_ai&version=v4 document }
             */
            editEvent: async (
                payload?: {
                    data?: {
                        event_id?: string;
                        summary?: string;
                        start_time?: string;
                        end_time?: string;
                        start_timezone?: string;
                        recurrence_rule?: string;
                        participant_ids?: string;
                        meeting_room_ids?: string;
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
                                result?: {
                                    reply?: string;
                                    start_time?: string;
                                    end_time?: string;
                                    rooms?: Array<{
                                        name?: string;
                                        room_id?: string;
                                    }>;
                                    summary?: string;
                                    participants?: Array<{
                                        name?: string;
                                        user_id?: string;
                                    }>;
                                    event_id?: string;
                                    recurrence_rule?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai/edit_event`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=create_event&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_event&project=calendar&resource=calendar_ai&version=v4 document }
             */
            createEvent: async (
                payload?: {
                    data?: {
                        event_id?: string;
                        summary?: string;
                        start_time?: string;
                        end_time?: string;
                        start_timezone?: string;
                        recurrence_rule?: string;
                        participant_ids?: string;
                        meeting_room_ids?: string;
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
                                result?: {
                                    reply?: string;
                                    start_time?: string;
                                    end_time?: string;
                                    rooms?: Array<{
                                        name?: string;
                                        room_id?: string;
                                    }>;
                                    summary?: string;
                                    participants?: Array<{
                                        name?: string;
                                        user_id?: string;
                                    }>;
                                    event_id?: string;
                                    recurrence_rule?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai/create_event`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=event_detail&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=event_detail&project=calendar&resource=calendar_ai&version=v4 document }
             */
            eventDetail: async (
                payload?: {
                    data?: { event_id?: string };
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
                                result?: {
                                    event_id?: string;
                                    summary?: string;
                                    start_time?: string;
                                    end_time?: string;
                                    timezone?: string;
                                    recurrence_rule?: string;
                                    participants?: Array<{
                                        name?: string;
                                        user_id?: string;
                                    }>;
                                    rooms?: Array<{
                                        name?: string;
                                        room_id?: string;
                                    }>;
                                    access_role?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai/event_detail`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=user_common_free_time&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=user_common_free_time&project=calendar&resource=calendar_ai&version=v4 document }
             */
            userCommonFreeTime: async (
                payload?: {
                    data?: {
                        start_time?: string;
                        end_time?: string;
                        scheduler_time_len?: string;
                        start_timezone?: string;
                        participant_ids?: string;
                        message_type?: number;
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
                                result?: { free_time_list?: string };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                                msg?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai/user_common_free_time`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=can_book_meeting_room_id&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=can_book_meeting_room_id&project=calendar&resource=calendar_ai&version=v4 document }
             */
            canBookMeetingRoomId: async (
                payload?: {
                    data?: {
                        start_time?: string;
                        end_time?: string;
                        recurrence_rule?: string;
                        start_timezone?: string;
                        meeting_room_equipment?: string;
                        meeting_building?: string;
                        meeting_floor?: string;
                        meeting_capacity?: string;
                        meeting_room_name?: string;
                        message_type?: number;
                        query?: string;
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
                                result?: {
                                    meeting_room_id?: string;
                                    hint?: string;
                                    rooms?: Array<{
                                        name?: string;
                                        room_id?: string;
                                    }>;
                                    recurrence_rule?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                                msg?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai/can_book_meeting_room_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=search_event&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_event&project=calendar&resource=calendar_ai&version=v4 document }
             */
            searchEvent: async (
                payload?: {
                    data?: {
                        start_time?: string;
                        end_time?: string;
                        timezone?: string;
                        query?: string;
                        message_type?: number;
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
                                result?: {
                                    events?: Array<{
                                        event_id: string;
                                        summary: string;
                                        start_time: string;
                                        end_time: string;
                                        app_link: string;
                                        organizer: {
                                            user_id?: string;
                                            display_name?: string;
                                        };
                                    }>;
                                    msg?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai/search_event`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=search_doc&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_doc&project=calendar&resource=calendar_ai&version=v4 document }
             */
            searchDoc: async (
                payload?: {
                    data?: {
                        query?: string;
                        query_type?: "recommend" | "search";
                        scenario_context?: {
                            scenario?: string;
                            work_mode?: number;
                            extra?: {
                                ai_task_id?: string;
                                event_uid?: string;
                                origin_time?: string;
                            };
                            system_info?: {
                                session_id?: string;
                                lang?: string;
                                locale?: string;
                            };
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
                                result?: {
                                    doc_items?: Array<{
                                        title?: string;
                                        url?: string;
                                        token?: string;
                                        doc_type?: string;
                                        extra?: string;
                                    }>;
                                    message?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai/search_doc`,
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
         * calendar_ai_beta
         */
        calendarAiBeta: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=operate_event_card&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=operate_event_card&project=calendar&resource=calendar_ai_beta&version=v4 document }
             */
            operateEventCard: async (
                payload?: {
                    data: { message_id: string; body: string };
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
                                result?: {
                                    meeting_url?: string;
                                    meeting_no?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/operate_event_card`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=search_user&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_user&project=calendar&resource=calendar_ai_beta&version=v4 document }
             */
            searchUser: async (
                payload?: {
                    data: { keywords: string };
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
                                result?: {
                                    search_results?: Array<{
                                        query_keyword: string;
                                        user_info?: {
                                            name?: string;
                                            user_id?: string;
                                        };
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/search_user`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=edit_event&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=edit_event&project=calendar&resource=calendar_ai_beta&version=v4 document }
             */
            editEvent: async (
                payload?: {
                    data?: {
                        event_id?: string;
                        summary?: string;
                        start_time?: string;
                        end_time?: string;
                        start_timezone?: string;
                        recurrence_rule?: string;
                        participant_ids?: string;
                        meeting_room_ids?: string;
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
                                result?: {
                                    reply?: string;
                                    start_time?: string;
                                    end_time?: string;
                                    rooms?: Array<{
                                        name?: string;
                                        room_id?: string;
                                    }>;
                                    summary?: string;
                                    participants?: Array<{
                                        name?: string;
                                        user_id?: string;
                                    }>;
                                    event_id?: string;
                                    recurrence_rule?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/edit_event`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=create_event&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_event&project=calendar&resource=calendar_ai_beta&version=v4 document }
             */
            createEvent: async (
                payload?: {
                    data?: {
                        event_id?: string;
                        summary?: string;
                        start_time?: string;
                        end_time?: string;
                        start_timezone?: string;
                        recurrence_rule?: string;
                        participant_ids?: string;
                        meeting_room_ids?: string;
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
                                result?: {
                                    reply?: string;
                                    start_time?: string;
                                    end_time?: string;
                                    rooms?: Array<{
                                        name?: string;
                                        room_id?: string;
                                    }>;
                                    summary?: string;
                                    participants?: Array<{
                                        name?: string;
                                        user_id?: string;
                                    }>;
                                    event_id?: string;
                                    recurrence_rule?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/create_event`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=cancel_event&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel_event&project=calendar&resource=calendar_ai_beta&version=v4 document }
             */
            cancelEvent: async (
                payload?: {
                    data?: { event_id?: string };
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
                                result?: {
                                    reply?: string;
                                    start_time?: string;
                                    end_time?: string;
                                    rooms?: Array<{
                                        name?: string;
                                        room_id?: string;
                                    }>;
                                    summary?: string;
                                    participants?: Array<{
                                        name?: string;
                                        user_id?: string;
                                    }>;
                                    event_id?: string;
                                    recurrence_rule?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/cancel_event`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=event_detail&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=event_detail&project=calendar&resource=calendar_ai_beta&version=v4 document }
             */
            eventDetail: async (
                payload?: {
                    data?: { event_id?: string };
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
                                result?: {
                                    event_id?: string;
                                    summary?: string;
                                    start_time?: string;
                                    end_time?: string;
                                    timezone?: string;
                                    recurrence_rule?: string;
                                    participants?: Array<{
                                        name?: string;
                                        user_id?: string;
                                    }>;
                                    rooms?: Array<{
                                        name?: string;
                                        room_id?: string;
                                    }>;
                                    access_role?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/event_detail`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=search_doc&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_doc&project=calendar&resource=calendar_ai_beta&version=v4 document }
             */
            searchDoc: async (
                payload?: {
                    data?: {
                        query?: string;
                        query_type?: "recommend" | "search";
                        scenario_context?: {
                            scenario?: string;
                            work_mode?: number;
                            extra?: {
                                ai_task_id?: string;
                                event_uid?: string;
                                origin_time?: string;
                            };
                            system_info?: {
                                session_id?: string;
                                lang?: string;
                                locale?: string;
                            };
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
                                result?: {
                                    doc_items?: Array<{
                                        title?: string;
                                        url?: string;
                                        token?: string;
                                        doc_type?: string;
                                        extra?: string;
                                    }>;
                                    message?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/search_doc`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=can_book_meeting_room_id&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=can_book_meeting_room_id&project=calendar&resource=calendar_ai_beta&version=v4 document }
             */
            canBookMeetingRoomId: async (
                payload?: {
                    data?: {
                        start_time?: string;
                        end_time?: string;
                        recurrence_rule?: string;
                        start_timezone?: string;
                        meeting_room_equipment?: string;
                        meeting_building?: string;
                        meeting_floor?: string;
                        meeting_capacity?: string;
                        meeting_room_name?: string;
                        message_type?: number;
                        query?: string;
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
                                result?: {
                                    meeting_room_id?: string;
                                    hint?: string;
                                    rooms?: Array<{
                                        name?: string;
                                        room_id?: string;
                                    }>;
                                    recurrence_rule?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                                msg?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/can_book_meeting_room_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=search_event&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_event&project=calendar&resource=calendar_ai_beta&version=v4 document }
             */
            searchEvent: async (
                payload?: {
                    data?: {
                        start_time?: string;
                        end_time?: string;
                        timezone?: string;
                        query?: string;
                        message_type?: number;
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
                                result?: {
                                    events?: Array<{
                                        event_id: string;
                                        summary: string;
                                        start_time: string;
                                        end_time: string;
                                        app_link: string;
                                        organizer: {
                                            user_id?: string;
                                            display_name?: string;
                                        };
                                    }>;
                                    msg?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/search_event`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=create_event_card&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_event_card&project=calendar&resource=calendar_ai_beta&version=v4 document }
             */
            createEventCard: async (
                payload?: {
                    data: {
                        summary: string;
                        start_time: string;
                        end_time: string;
                        start_timezone: string;
                        recurrence_rule?: string;
                        participant_ids: string;
                        meeting_room_ids?: string;
                        event_id?: string;
                        message_type?: number;
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
                                hint?: string;
                                result?: {
                                    reply?: string;
                                    start_time?: string;
                                    end_time?: string;
                                    rooms?: Array<{
                                        name?: string;
                                        room_id?: string;
                                    }>;
                                    summary?: string;
                                    participants?: Array<{
                                        name?: string;
                                        user_id?: string;
                                    }>;
                                    event_id?: string;
                                    recurrence_rule?: string;
                                };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/create_event_card`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=user_common_free_time&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=user_common_free_time&project=calendar&resource=calendar_ai_beta&version=v4 document }
             */
            userCommonFreeTime: async (
                payload?: {
                    data?: {
                        start_time?: string;
                        end_time?: string;
                        scheduler_time_len?: string;
                        start_timezone?: string;
                        participant_ids?: string;
                        message_type?: number;
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
                                result?: { free_time_list?: string };
                                present?: {
                                    body?: string;
                                    interactable?: boolean;
                                    type?: string;
                                    operation_type?: string;
                                    callback_info?: string;
                                };
                                msg?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/user_common_free_time`,
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
         * exchange_binding
         */
        exchangeBinding: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=exchange_binding&apiName=delete&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=calendar&resource=exchange_binding&version=v4 document }
             *
             * 解除 Exchange 账户绑定
             *
             * 调用该接口解除 Exchange 账户和飞书账户的绑定关系，Exchange 账户解除绑定后才能和其他飞书账户继续绑定。
             */
            delete: async (
                payload?: {
                    path: { exchange_binding_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/exchange_bindings/:exchange_binding_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=exchange_binding&apiName=get&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=calendar&resource=exchange_binding&version=v4 document }
             *
             * 查询 Exchange 账户的绑定状态
             *
             * 调用该接口获取 Exchange 账户的绑定状态，包括 Exchange 日历的同步状态。
             *
             * 当前身份需要是企业超级管理员。
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { exchange_binding_id: string };
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
                                admin_account?: string;
                                exchange_account?: string;
                                user_id?: string;
                                status?:
                                    | "doing"
                                    | "cal_done"
                                    | "timespan_done"
                                    | "done"
                                    | "err";
                                exchange_binding_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/exchange_bindings/:exchange_binding_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=exchange_binding&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=exchange_binding&version=v4 document }
             *
             * 将 Exchange 账户绑定到飞书账户
             *
             * 调用该接口将 Exchange 账户绑定到飞书账户，进而支持 Exchange 日历的导入。
             *
             * 当前身份需要是企业超级管理员。
             */
            create: async (
                payload?: {
                    data?: {
                        admin_account?: string;
                        exchange_account?: string;
                        user_id?: string;
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
                                admin_account?: string;
                                exchange_account?: string;
                                user_id?: string;
                                status?:
                                    | "doing"
                                    | "cal_done"
                                    | "timespan_done"
                                    | "done"
                                    | "err";
                                exchange_binding_id: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/exchange_bindings`,
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
         * calendar.event.attendee
         */
        calendarEventAttendee: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=create_attendees&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_attendees&project=calendar&resource=calendar.event.attendee&version=v4 document }
             */
            createAttendees: async (
                payload?: {
                    data?: {
                        attendees?: Array<{
                            type?: "user" | "chat" | "resource" | "third_party";
                            is_optional?: boolean;
                            user_id?: string;
                            chat_id?: string;
                            room_id?: string;
                            third_party_email?: string;
                            operate_id?: string;
                            resource_customization?: Array<{
                                index_key: string;
                                input_content?: string;
                                options?: Array<{
                                    option_key?: string;
                                    others_content?: string;
                                }>;
                            }>;
                            approval_reason?: string;
                        }>;
                        need_notification?: boolean;
                        instance_start_time_admin?: string;
                        is_enable_admin?: boolean;
                        add_operator_to_attendee?: boolean;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string; event_id: string };
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
                                attendees?: Array<{
                                    type?:
                                        | "user"
                                        | "chat"
                                        | "resource"
                                        | "third_party";
                                    attendee_id?: string;
                                    rsvp_status?:
                                        | "needs_action"
                                        | "accept"
                                        | "tentative"
                                        | "decline"
                                        | "removed";
                                    is_optional?: boolean;
                                    is_organizer?: boolean;
                                    is_external?: boolean;
                                    display_name?: string;
                                    chat_members?: Array<{
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        display_name?: string;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                    }>;
                                    user_id?: string;
                                    chat_id?: string;
                                    room_id?: string;
                                    third_party_email?: string;
                                    operate_id?: string;
                                    resource_customization?: Array<{
                                        index_key: string;
                                        input_content?: string;
                                        options?: Array<{
                                            option_key?: string;
                                            others_content?: string;
                                        }>;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/create_attendees`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=batch_patch&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_patch&project=calendar&resource=calendar.event.attendee&version=v4 document }
             *
             * 更新日程参与人
             *
             * 批量更新日程参与人信息。该接口不会给被更新的参与人发送消息。
             *
             * - 当前身份需要有日历或日程的 owner 或 writer 权限。;- 当前身份需要和日程归属同一企业。;- 该接口目前仅支持更新 个人参与人 和 邮箱参与人 的信息。;- 使用该接口更新 个人参与人 信息时，不支持更新其他企业下的参与人信息。;- 单次最多可更新 200 名参与人的信息。
             */
            batchPatch: async (
                payload?: {
                    data?: {
                        attendees?: Array<{
                            attendee_id?: string;
                            rsvp_status?:
                                | "needs_action"
                                | "accept"
                                | "tentative"
                                | "decline"
                                | "removed";
                            is_optional?: boolean;
                        }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string; event_id: string };
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
                                attendees?: Array<{
                                    type?:
                                        | "user"
                                        | "chat"
                                        | "resource"
                                        | "third_party";
                                    attendee_id?: string;
                                    rsvp_status?:
                                        | "needs_action"
                                        | "accept"
                                        | "tentative"
                                        | "decline"
                                        | "removed";
                                    is_optional?: boolean;
                                    is_organizer?: boolean;
                                    is_external?: boolean;
                                    display_name?: string;
                                    chat_members?: Array<{
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        display_name?: string;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                    }>;
                                    user_id?: string;
                                    chat_id?: string;
                                    room_id?: string;
                                    third_party_email?: string;
                                    operate_id?: string;
                                    resource_customization?: Array<{
                                        index_key: string;
                                        input_content?: string;
                                        options?: Array<{
                                            option_key?: string;
                                            others_content?: string;
                                        }>;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/batch_patch`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=batch_delete&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=calendar&resource=calendar.event.attendee&version=v4 document }
             *
             * 删除日程参与人
             *
             * 调用该接口以当前身份（应用或用户）删除指定日程的一个或多个参与人。
             */
            batchDelete: async (
                payload?: {
                    data?: {
                        attendee_ids?: Array<string>;
                        delete_ids?: Array<{
                            type?: "user" | "chat" | "resource" | "third_party";
                            user_id?: string;
                            chat_id?: string;
                            room_id?: string;
                            third_party_email?: string;
                        }>;
                        need_notification?: boolean;
                        instance_start_time_admin?: string;
                        is_enable_admin?: boolean;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string; event_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/batch_delete`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=calendar.event.attendee&version=v4 document }
             *
             * 添加日程参与人
             *
             * 调用该接口以当前身份（应用或用户）为指定日程添加一个或多个参与人，参与人类型包括用户、群组、会议室以及邮箱。
             *
             * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份需要有日历的 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取日历类型以及当前身份对该日历的访问权限。;- 当前身份需要是日程的组织者，或者是日程参与人且确保日程设置了**参与人可邀请其它参与人**权限。你可以调用[获取日程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/get)接口，获取日程的参与人权限（attendee_ability）。;- 新添加的日程参与人必须与日程组织者在同一个企业内。;- 每个日程最多只能有 3000 名参与人。;- 使用该接口添加会议室后，会议室会进入异步的预约流程，即请求结束不代表会议室预约成功，需后续再查询会议室的预约状态。;- 开启会议室管理员能力后，管理员预约会议室可不受会议室预约范围的限制（当前不支持用管理员身份给其他成员的日程预约会议室）。
             */
            create: async (
                payload?: {
                    data?: {
                        attendees?: Array<{
                            type?: "user" | "chat" | "resource" | "third_party";
                            is_optional?: boolean;
                            user_id?: string;
                            chat_id?: string;
                            room_id?: string;
                            third_party_email?: string;
                            operate_id?: string;
                            resource_customization?: Array<{
                                index_key: string;
                                input_content?: string;
                                options?: Array<{
                                    option_key?: string;
                                    others_content?: string;
                                }>;
                            }>;
                            approval_reason?: string;
                        }>;
                        need_notification?: boolean;
                        instance_start_time_admin?: string;
                        is_enable_admin?: boolean;
                        add_operator_to_attendee?: boolean;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string; event_id: string };
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
                                attendees?: Array<{
                                    type?:
                                        | "user"
                                        | "chat"
                                        | "resource"
                                        | "third_party";
                                    attendee_id?: string;
                                    rsvp_status?:
                                        | "needs_action"
                                        | "accept"
                                        | "tentative"
                                        | "decline"
                                        | "removed";
                                    is_optional?: boolean;
                                    is_organizer?: boolean;
                                    is_external?: boolean;
                                    display_name?: string;
                                    chat_members?: Array<{
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        display_name?: string;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                    }>;
                                    user_id?: string;
                                    chat_id?: string;
                                    room_id?: string;
                                    third_party_email?: string;
                                    operate_id?: string;
                                    resource_customization?: Array<{
                                        index_key: string;
                                        input_content?: string;
                                        options?: Array<{
                                            option_key?: string;
                                            others_content?: string;
                                        }>;
                                    }>;
                                    approval_reason?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees`,
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
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        need_resource_customization?: boolean;
                        page_token?: string;
                        page_size?: number;
                        op_user_id?: string;
                    };
                    path: { calendar_id: string; event_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees`,
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
                                                    type?:
                                                        | "user"
                                                        | "chat"
                                                        | "resource"
                                                        | "third_party";
                                                    attendee_id?: string;
                                                    rsvp_status?:
                                                        | "needs_action"
                                                        | "accept"
                                                        | "tentative"
                                                        | "decline"
                                                        | "removed";
                                                    is_optional?: boolean;
                                                    is_organizer?: boolean;
                                                    is_external?: boolean;
                                                    display_name?: string;
                                                    chat_members?: Array<{
                                                        rsvp_status?:
                                                            | "needs_action"
                                                            | "accept"
                                                            | "tentative"
                                                            | "decline"
                                                            | "removed";
                                                        is_optional?: boolean;
                                                        display_name?: string;
                                                        is_organizer?: boolean;
                                                        is_external?: boolean;
                                                    }>;
                                                    user_id?: string;
                                                    chat_id?: string;
                                                    room_id?: string;
                                                    third_party_email?: string;
                                                    operate_id?: string;
                                                    resource_customization?: Array<{
                                                        index_key: string;
                                                        input_content?: string;
                                                        options?: Array<{
                                                            option_key?: string;
                                                            others_content?: string;
                                                        }>;
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=calendar&resource=calendar.event.attendee&version=v4 document }
             *
             * 获取日程参与人列表
             *
             * 调用该接口以当前身份（应用或用户）获取日程的参与人列表。
             */
            list: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        need_resource_customization?: boolean;
                        page_token?: string;
                        page_size?: number;
                        op_user_id?: string;
                    };
                    path: { calendar_id: string; event_id: string };
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
                                    type?:
                                        | "user"
                                        | "chat"
                                        | "resource"
                                        | "third_party";
                                    attendee_id?: string;
                                    rsvp_status?:
                                        | "needs_action"
                                        | "accept"
                                        | "tentative"
                                        | "decline"
                                        | "removed";
                                    is_optional?: boolean;
                                    is_organizer?: boolean;
                                    is_external?: boolean;
                                    display_name?: string;
                                    chat_members?: Array<{
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        display_name?: string;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                    }>;
                                    user_id?: string;
                                    chat_id?: string;
                                    room_id?: string;
                                    third_party_email?: string;
                                    operate_id?: string;
                                    resource_customization?: Array<{
                                        index_key: string;
                                        input_content?: string;
                                        options?: Array<{
                                            option_key?: string;
                                            others_content?: string;
                                        }>;
                                    }>;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees`,
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
         * file
         */
        file: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=file&apiName=upload&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=calendar&resource=file&version=v4 document }
             *
             * 上传文件
             */
            upload: async (
                payload?: {
                    data: {
                        calendar_id: string;
                        event_id?: string;
                        file_name: string;
                        file_path: string;
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
                            data?: { file_token?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/file/upload`,
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
                return res?.data || null;
            },
        },
        /**
         * calendar
         */
        calendar: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=subscription&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=calendar&resource=calendar&version=v4 document }
             *
             * 订阅日历变更事件
             *
             * 调用该接口为当前用户身份订阅[日历变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/events/changed)。
             */
            subscription: async (payload?: {}, options?: IRequestOptions) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/subscription`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=get&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=calendar&resource=calendar&version=v4 document }
             *
             * 查询日历信息
             *
             * 调用该接口以当前身份（应用或用户）查询指定日历的信息。
             *
             * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 使用应用身份调用该接口前，需要确保该应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份必须对日历有访问权限。
             */
            get: async (
                payload?: {
                    path: { calendar_id: string };
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
                                calendar_id: string;
                                summary?: string;
                                description?: string;
                                permissions?:
                                    | "private"
                                    | "show_only_free_busy"
                                    | "public";
                                color?: number;
                                type?:
                                    | "unknown"
                                    | "primary"
                                    | "shared"
                                    | "google"
                                    | "resource"
                                    | "exchange";
                                summary_alias?: string;
                                is_deleted?: boolean;
                                is_third_party?: boolean;
                                role?:
                                    | "unknown"
                                    | "free_busy_reader"
                                    | "reader"
                                    | "writer"
                                    | "owner";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=delete&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=calendar&resource=calendar&version=v4 document }
             *
             * 删除共享日历
             *
             * 调用该接口以当前身份（应用或用户）删除某一指定的共享日历。
             *
             * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份必须对日历有 owner 权限才可以删除。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，通过响应字段 role 查看当前身份对日历的权限。
             */
            delete: async (
                payload?: {
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=unsubscribe&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscribe&project=calendar&resource=calendar&version=v4 document }
             *
             * 取消订阅日历
             *
             * 调用该接口以当前身份（应用或用户）取消指定日历的订阅状态。
             *
             * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 仅可操作已经被当前身份订阅的日历。
             */
            unsubscribe: async (
                payload?: {
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/unsubscribe`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=unsubscription&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscription&project=calendar&resource=calendar&version=v4 document }
             *
             * 取消订阅日历变更事件
             *
             * 调用该接口为当前用户身份取消订阅[日历变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/events/changed)。
             */
            unsubscription: async (payload?: {}, options?: IRequestOptions) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/unsubscription`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=calendar&resource=calendar&version=v4 document }
             *
             * 查询日历列表
             *
             * 调用该接口分页查询当前身份（应用或用户）的日历列表。
             *
             * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 调用该接口时，首先需要使用 page_token 分页查询存量的日历列表，然后再使用 sync_token 增量同步日历的变更数据。
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        sync_token?: string;
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
                                sync_token?: string;
                                calendar_list?: Array<{
                                    calendar_id: string;
                                    summary?: string;
                                    description?: string;
                                    permissions?:
                                        | "private"
                                        | "show_only_free_busy"
                                        | "public";
                                    color?: number;
                                    type?:
                                        | "unknown"
                                        | "primary"
                                        | "shared"
                                        | "google"
                                        | "resource"
                                        | "exchange";
                                    summary_alias?: string;
                                    is_deleted?: boolean;
                                    is_third_party?: boolean;
                                    role?:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars`,
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
            searchWithIterator: async (
                payload?: {
                    data: { query: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/search`,
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
                                                items?: Array<{
                                                    calendar_id: string;
                                                    summary?: string;
                                                    description?: string;
                                                    permissions?:
                                                        | "private"
                                                        | "show_only_free_busy"
                                                        | "public";
                                                    color?: number;
                                                    type?:
                                                        | "unknown"
                                                        | "primary"
                                                        | "shared"
                                                        | "google"
                                                        | "resource"
                                                        | "exchange";
                                                    summary_alias?: string;
                                                    is_deleted?: boolean;
                                                    is_third_party?: boolean;
                                                    role?:
                                                        | "unknown"
                                                        | "free_busy_reader"
                                                        | "reader"
                                                        | "writer"
                                                        | "owner";
                                                }>;
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=search&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=calendar&resource=calendar&version=v4 document }
             *
             * 搜索日历
             *
             * 调用该接口通过关键字搜索日历，搜索结果为标题或描述包含关键字的公共日历或用户主日历。
             *
             * - 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 应用身份不支持搜索用户主日历。
             */
            search: async (
                payload?: {
                    data: { query: string };
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
                                items?: Array<{
                                    calendar_id: string;
                                    summary?: string;
                                    description?: string;
                                    permissions?:
                                        | "private"
                                        | "show_only_free_busy"
                                        | "public";
                                    color?: number;
                                    type?:
                                        | "unknown"
                                        | "primary"
                                        | "shared"
                                        | "google"
                                        | "resource"
                                        | "exchange";
                                    summary_alias?: string;
                                    is_deleted?: boolean;
                                    is_third_party?: boolean;
                                    role?:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                }>;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=subscribe&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscribe&project=calendar&resource=calendar&version=v4 document }
             *
             * 订阅日历
             *
             * 调用该接口以当前身份（应用或用户）订阅指定的日历。
             *
             * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 仅可订阅以下属性的日历，你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，查看指定日历的属性。; - 日历类型（type）为 shared 或者 primary。; - 日历公开范围（permissions）为 public 或者 show_only_free_busy。;- 不允许订阅机器人的主日历。;- 当前身份可订阅的日历数量上限为 1000。
             */
            subscribe: async (
                payload?: {
                    path: { calendar_id: string };
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
                                calendar?: {
                                    calendar_id: string;
                                    summary?: string;
                                    description?: string;
                                    permissions?:
                                        | "private"
                                        | "show_only_free_busy"
                                        | "public";
                                    color?: number;
                                    type?:
                                        | "unknown"
                                        | "primary"
                                        | "shared"
                                        | "google"
                                        | "resource"
                                        | "exchange";
                                    summary_alias?: string;
                                    is_deleted?: boolean;
                                    is_third_party?: boolean;
                                    role?:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/subscribe`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=calendar&version=v4 document }
             *
             * 创建共享日历
             *
             * 调用该接口为当前身份（应用或用户）创建一个共享日历。
             *
             * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 调用该接口创建共享日历时，当前身份会自动订阅该日历。单个身份可订阅的日历数量上限为 1000。
             */
            create: async (
                payload?: {
                    data?: {
                        summary?: string;
                        description?: string;
                        permissions?:
                            | "private"
                            | "show_only_free_busy"
                            | "public";
                        color?: number;
                        summary_alias?: string;
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
                                calendar?: {
                                    calendar_id: string;
                                    summary?: string;
                                    description?: string;
                                    permissions?:
                                        | "private"
                                        | "show_only_free_busy"
                                        | "public";
                                    color?: number;
                                    type?:
                                        | "unknown"
                                        | "primary"
                                        | "shared"
                                        | "google"
                                        | "resource"
                                        | "exchange";
                                    summary_alias?: string;
                                    is_deleted?: boolean;
                                    is_third_party?: boolean;
                                    role?:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=patch&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=calendar&resource=calendar&version=v4 document }
             *
             * 更新日历信息
             *
             * 调用该接口以当前身份（应用或用户）修改指定日历的标题、描述、公开范围等信息。
             *
             * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 如果当前身份具有日历的 owner 访问权限，则可以更新日历的所有属性（包括全局生效的 summary、description、permission 和仅对当前身份生效的 color、summary_alias）。;- 如果当前身份不具有日历的 owner 访问权限，则只能更新对当前身份生效的 color、summary_alias。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，查看当前身份对日历的访问权限。;- 会议室日历不支持设置备注。
             */
            patch: async (
                payload?: {
                    data?: {
                        summary?: string;
                        description?: string;
                        permissions?:
                            | "private"
                            | "show_only_free_busy"
                            | "public";
                        color?: number;
                        summary_alias?: string;
                    };
                    path: { calendar_id: string };
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
                                calendar?: {
                                    calendar_id: string;
                                    summary?: string;
                                    description?: string;
                                    permissions?:
                                        | "private"
                                        | "show_only_free_busy"
                                        | "public";
                                    color?: number;
                                    type?:
                                        | "unknown"
                                        | "primary"
                                        | "shared"
                                        | "google"
                                        | "resource"
                                        | "exchange";
                                    summary_alias?: string;
                                    is_deleted?: boolean;
                                    is_third_party?: boolean;
                                    role?:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=mget&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=calendar&resource=calendar&version=v4 document }
             *
             * 批量查询日历信息
             *
             * 调用该接口批量查询指定日历的标题、描述、公开范围等信息。
             *
             * - 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份必须对日历有访问权限。
             */
            mget: async (
                payload?: {
                    data: { calendar_ids: Array<string> };
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
                                calendars?: Array<{
                                    calendar_id: string;
                                    summary?: string;
                                    description?: string;
                                    permissions?:
                                        | "private"
                                        | "show_only_free_busy"
                                        | "public";
                                    color?: number;
                                    type?:
                                        | "unknown"
                                        | "primary"
                                        | "shared"
                                        | "google"
                                        | "resource"
                                        | "exchange";
                                    summary_alias?: string;
                                    is_deleted?: boolean;
                                    is_third_party?: boolean;
                                    role?:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/mget`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=primarys&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=primarys&project=calendar&resource=calendar&version=v4 document }
             *
             * 批量获取主日历信息
             *
             * 根据user id列表批量查询指定用户的主日历信息。
             */
            primarys: async (
                payload?: {
                    data: { user_ids: Array<string> };
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
                                calendars?: Array<{
                                    calendar?: {
                                        calendar_id: string;
                                        summary?: string;
                                        description?: string;
                                        permissions?:
                                            | "private"
                                            | "show_only_free_busy"
                                            | "public";
                                        color?: number;
                                        type?:
                                            | "unknown"
                                            | "primary"
                                            | "shared"
                                            | "google"
                                            | "resource"
                                            | "exchange";
                                        summary_alias?: string;
                                        is_deleted?: boolean;
                                        is_third_party?: boolean;
                                        role?:
                                            | "unknown"
                                            | "free_busy_reader"
                                            | "reader"
                                            | "writer"
                                            | "owner";
                                    };
                                    user_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/primarys`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=primary&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=primary&project=calendar&resource=calendar&version=v4 document }
             *
             * 查询主日历信息
             *
             * 调用该接口获取当前身份（应用或用户）的主日历信息。
             *
             * **说明**;;- 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 使用应用身份调用该接口前，需要确保该应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 使用应用身份调用该接口时，查询参数 user_id_type 不能设置为 user_id。你可以选择 open_id 或者 union_id，在返回结果中，user_id 参数值会包含应用机器人对应的 open_id 或 union_id。
             */
            primary: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        op_user_id?: string;
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
                                calendars?: Array<{
                                    calendar?: {
                                        calendar_id: string;
                                        summary?: string;
                                        description?: string;
                                        permissions?:
                                            | "private"
                                            | "show_only_free_busy"
                                            | "public";
                                        color?: number;
                                        type?:
                                            | "unknown"
                                            | "primary"
                                            | "shared"
                                            | "google"
                                            | "resource"
                                            | "exchange";
                                        summary_alias?: string;
                                        is_deleted?: boolean;
                                        is_third_party?: boolean;
                                        role?:
                                            | "unknown"
                                            | "free_busy_reader"
                                            | "reader"
                                            | "writer"
                                            | "owner";
                                    };
                                    user_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/primary`,
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
         * freebusy
         */
        freebusy: {
            batchGetWithIterator: async (
                payload?: {
                    data: {
                        time_min: string;
                        time_max: string;
                        calendar_ids: Array<string>;
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
                                `${this.domain}/open-apis/calendar/v4/freebusy/batch_get`,
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
                                                error_calendar_list?: Array<{
                                                    calendar_id: string;
                                                    error_msg: string;
                                                }>;
                                                freebusy_list?: Array<{
                                                    start_time: string;
                                                    end_time: string;
                                                    calendar_id: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=freebusy&apiName=batch_get&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=calendar&resource=freebusy&version=v4 document }
             */
            batchGet: async (
                payload?: {
                    data: {
                        time_min: string;
                        time_max: string;
                        calendar_ids: Array<string>;
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
                                error_calendar_list?: Array<{
                                    calendar_id: string;
                                    error_msg: string;
                                }>;
                                freebusy_list?: Array<{
                                    start_time: string;
                                    end_time: string;
                                    calendar_id: string;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/freebusy/batch_get`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=freebusy&apiName=batch&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch&project=calendar&resource=freebusy&version=v4 document }
             *
             * 批量查询主日历日程忙闲信息
             *
             * 根据user id列表，批量查询指定用户的主日历在指定时间段内的忙碌时间段信息，适用于团队协作中，快速了解成员忙闲状态以安排会议或任务的场景。
             *
             * 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。
             */
            batch: async (
                payload?: {
                    data: {
                        time_min: string;
                        time_max: string;
                        user_ids: Array<string>;
                        include_external_calendar?: boolean;
                        only_busy?: boolean;
                        need_rsvp_status?: boolean;
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
                                freebusy_lists?: Array<{
                                    freebusy_items?: Array<{
                                        start_time: string;
                                        end_time: string;
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                    }>;
                                    user_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/freebusy/batch`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=freebusy&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=calendar&resource=freebusy&version=v4 document }
             *
             * 查询主日历日程忙闲信息
             *
             * 调用该接口查询指定用户的主日历忙闲信息，或者查询指定会议室的忙闲信息。
             *
             * 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。
             */
            list: async (
                payload?: {
                    data: {
                        time_min: string;
                        time_max: string;
                        user_id?: string;
                        room_id?: string;
                        include_external_calendar?: boolean;
                        only_busy?: boolean;
                        need_rsvp_status?: boolean;
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
                                freebusy_list?: Array<{
                                    start_time: string;
                                    end_time: string;
                                    rsvp_status?:
                                        | "needs_action"
                                        | "accept"
                                        | "tentative"
                                        | "decline"
                                        | "removed";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/freebusy/list`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=freebusy&apiName=suggestion&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=suggestion&project=calendar&resource=freebusy&version=v4 document }
             *
             * 给定期望的时间范围，结合用户、群成员的忙闲和预约习惯，推荐合适的日程预约时间段方案。
             */
            suggestion: async (
                payload?: {
                    data: {
                        search_start_time: string;
                        search_end_time: string;
                        timezone?: string;
                        event_rrule?: string;
                        duration_minutes?: number;
                        meeting_type?: "life" | "work";
                        attendee_user_ids?: Array<string>;
                        attendee_chat_ids?: Array<string>;
                        excluded_event_times?: Array<{
                            event_start_time?: string;
                            event_end_time?: string;
                        }>;
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
                                suggestions?: Array<{
                                    event_start_time?: string;
                                    event_end_time?: string;
                                    recommend_reason?: string;
                                }>;
                                ai_action_guidance?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/freebusy/suggestion`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=freebusy&apiName=room_find&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=room_find&project=calendar&resource=freebusy&version=v4 document }
             *
             * 给定期望的日程时间，结合用户、群成员的会议室约定习惯，推荐合适的可用会议室列表。
             */
            roomFind: async (
                payload?: {
                    data: {
                        query?: string;
                        min_capacity?: number;
                        max_capacity?: number;
                        event_start_time: string;
                        event_end_time: string;
                        timezone?: string;
                        event_rrule?: string;
                        attendee_user_ids?: Array<string>;
                        attendee_chat_ids?: Array<string>;
                        city?: string;
                        building?: string;
                        floor?: string;
                        room_name?: string;
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
                                available_rooms?: Array<{
                                    room_id?: string;
                                    room_name?: string;
                                    full_name?: string;
                                    capacity?: number;
                                    reserve_until_time?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/freebusy/room_find`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=freebusy&apiName=room_availability_check&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=room_availability_check&project=calendar&resource=freebusy&version=v4 document }
             *
             * 对于给定的日程时间，判断传入的会议室是否能够预定成功
             */
            roomAvailabilityCheck: async (
                payload?: {
                    data: {
                        calendar_id?: string;
                        event_id?: string;
                        start_time: string;
                        end_time: string;
                        start_timezone: string;
                        event_rrule?: string;
                        room_ids: Array<string>;
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
                                room_availabilitys?: Array<{
                                    room_id?: string;
                                    room_name?: string;
                                    status?:
                                        | "available"
                                        | "unavailable"
                                        | "need_approval";
                                    unavailable_reason_type?:
                                        | "unknown"
                                        | "reserved_by_other_event"
                                        | "past_time"
                                        | "beyond_advance_booking_window"
                                        | "over_max_duration"
                                        | "not_in_usable_time"
                                        | "during_requisition"
                                        | "before_daily_advance_window_release"
                                        | "recurring_exceed_approval_limit";
                                    room_strategy?: {
                                        timezone?: string;
                                        single_max_duration?: string;
                                        max_advance_booking_time?: string;
                                        daily_start_time?: string;
                                        daily_end_time?: string;
                                        daily_advance_window_release_time?: string;
                                    };
                                    room_requisition?: {
                                        start_time?: string;
                                        end_time?: string;
                                    };
                                    room_approval_info?: {
                                        approval_mode?:
                                            | "none"
                                            | "over_duration"
                                            | "all";
                                        approval_duration_threshold?: string;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/freebusy/room_availability_check`,
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
         * workhour_setting
         */
        workhourSetting: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=workhour_setting&apiName=mget&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=calendar&resource=workhour_setting&version=v4 document }
             *
             * 批量查询用户工作时间设置
             *
             * 调用该接口批量查询指定用户设置的工作时间信息。
             *
             * 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。
             */
            mget: async (
                payload?: {
                    data: { user_ids: Array<string> };
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
                                    timezone?: string;
                                    workhours?: Array<{
                                        day_of_week: number;
                                        start_time: number;
                                        end_time: number;
                                    }>;
                                    enable_work_hour: boolean;
                                    user_id: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/workhour_setting/mget`,
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
         * calendar.acl
         */
        calendarAcl: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=unsubscription&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscription&project=calendar&resource=calendar.acl&version=v4 document }
             *
             * 取消订阅日历访问控制变更事件
             *
             * 调用该接口以用户身份取消订阅指定日历下的访问控制变更事件。
             *
             * 用户必须对日历有访问权限。
             */
            unsubscription: async (
                payload?: {
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls/unsubscription`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=subscription&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=calendar&resource=calendar.acl&version=v4 document }
             *
             * 订阅日历访问控制变更事件;
             *
             * 调用该接口以用户身份订阅指定日历下的访问控制变更事件。
             *
             * 当前用户身份必须对日历有访问权限。
             */
            subscription: async (
                payload?: {
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls/subscription`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=delete&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=calendar&resource=calendar.acl&version=v4 document }
             *
             * 删除访问控制
             *
             * 调用该接口以当前身份（应用或用户）删除指定日历内的某一访问控制，即成员权限。
             *
             * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份需要有日历的 owner 权限，并且日历的类型只能为 primary 或 shared。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取日历类型以及当前身份对该日历的访问权限。
             */
            delete: async (
                payload?: {
                    path: { calendar_id: string; acl_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls/:acl_id`,
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
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls`,
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
                                                acls?: Array<{
                                                    acl_id: string;
                                                    role:
                                                        | "unknown"
                                                        | "free_busy_reader"
                                                        | "reader"
                                                        | "writer"
                                                        | "owner";
                                                    scope: {
                                                        type: "user";
                                                        user_id?: string;
                                                    };
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=calendar&resource=calendar.acl&version=v4 document }
             *
             * 获取访问控制列表
             *
             * 调用该接口以当前身份（应用或用户）获取指定日历的访问控制列表。
             *
             * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份需要有日历的 owner 权限，并且日历的类型只能为 primary 或 shared。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取日历类型以及当前身份对该日历的访问权限。
             */
            list: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { calendar_id: string };
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
                                acls?: Array<{
                                    acl_id: string;
                                    role:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                    scope: { type: "user"; user_id?: string };
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=calendar.acl&version=v4 document }
             *
             * 创建访问控制
             *
             * 调用该接口以当前身份（应用或用户）为指定日历添加访问控制，即日历成员权限。
             *
             * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份需要有日历的 owner 权限，并且日历的类型只能为 primary 或 shared。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取日历类型以及当前身份对该日历的访问权限。
             */
            create: async (
                payload?: {
                    data: {
                        role:
                            | "unknown"
                            | "free_busy_reader"
                            | "reader"
                            | "writer"
                            | "owner";
                        scope: { type: "user"; user_id?: string };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string };
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
                                acl_id: string;
                                role:
                                    | "unknown"
                                    | "free_busy_reader"
                                    | "reader"
                                    | "writer"
                                    | "owner";
                                scope: { type: "user"; user_id?: string };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls`,
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
         * calendar.event
         */
        calendarEvent: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=delete&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=calendar&resource=calendar.event&version=v4 document }
             *
             * 删除日程
             *
             * 调用该接口以当前身份（应用或用户）删除指定日历上的一个日程。
             *
             * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份必须对日历有 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取日历类型以及当前身份对该日历的访问权限。;- 当前身份必须是日程的组织者。
             */
            delete: async (
                payload?: {
                    params?: { need_notification?: "true" | "false" };
                    path: { calendar_id: string; event_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=reply&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reply&project=calendar&resource=calendar.event&version=v4 document }
             *
             * 回复日程
             *
             * 调用该接口以当前身份（应用或用户）回复日程。
             *
             * 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。
             */
            reply: async (
                payload?: {
                    data: { rsvp_status: "accept" | "decline" | "tentative" };
                    path: { calendar_id: string; event_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/reply`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=mget_meeting_chat&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget_meeting_chat&project=calendar&resource=calendar.event&version=v4 document }
             *
             * 批量获取会议群
             */
            mgetMeetingChat: async (
                payload?: {
                    data?: { event_ids?: Array<string> };
                    path: { calendar_id: string };
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
                                meeting_chats?: Array<{
                                    event_id?: string;
                                    meeting_chat_id?: string;
                                    applink?: string;
                                    meeting_chat_type?:
                                        | "meeting_chat"
                                        | "bound_chat";
                                }>;
                                failed_event_ids?: Array<{
                                    event_id?: string;
                                    fail_msg?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/mget_meeting_chat`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=unsubscription&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscription&project=calendar&resource=calendar.event&version=v4 document }
             *
             * 取消订阅日程变更事件
             *
             * 调用该接口以用户身份取消订阅指定日历下的日程变更事件。
             *
             * 当前身份必须对日历有 reader、writer 或 owner 权限。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取当前身份对该日历的访问权限。
             */
            unsubscription: async (
                payload?: {
                    params?: {
                        op_user_id?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/unsubscription`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=subscription&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=calendar&resource=calendar.event&version=v4 document }
             *
             * 订阅日程变更事件
             *
             * 调用该接口以用户身份订阅指定日历下的日程变更事件。
             *
             * 当前身份必须对日历有 reader、writer 或 owner 权限。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取当前身份对该日历的访问权限。
             */
            subscription: async (
                payload?: {
                    params?: {
                        op_user_id?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/subscription`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=share_info&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=share_info&project=calendar&resource=calendar.event&version=v4 document }
             *
             * 获取日程分享信息
             */
            shareInfo: async (
                payload?: {
                    path: { calendar_id: string; event_id: string };
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
                            data?: { share_link?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/share_info`,
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
            searchEventWithIterator: async (
                payload?: {
                    data: {
                        query: string;
                        filter?: {
                            calendar_ids?: Array<string>;
                            attendee_user_ids?: Array<string>;
                            attendee_chat_ids?: Array<string>;
                            meeting_room_ids?: Array<string>;
                            time_range?: {
                                start_time?: string;
                                end_time?: string;
                            };
                        };
                    };
                    params?: {
                        page_token?: string;
                        page_size?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/search_event`,
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
                                                has_more?: boolean;
                                                items?: Array<{
                                                    display_info?: string;
                                                    meta_data?: {
                                                        app_link?: string;
                                                        calendar_id?: string;
                                                        event_id?: string;
                                                        start?: {
                                                            date?: string;
                                                            date_time?: string;
                                                            timezone?: string;
                                                        };
                                                        end?: {
                                                            date?: string;
                                                            date_time?: string;
                                                            timezone?: string;
                                                        };
                                                        is_all_day?: boolean;
                                                        summary?: string;
                                                    };
                                                }>;
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=search_event&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_event&project=calendar&resource=calendar.event&version=v4 document }
             *
             * 搜索日程
             */
            searchEvent: async (
                payload?: {
                    data: {
                        query: string;
                        filter?: {
                            calendar_ids?: Array<string>;
                            attendee_user_ids?: Array<string>;
                            attendee_chat_ids?: Array<string>;
                            meeting_room_ids?: Array<string>;
                            time_range?: {
                                start_time?: string;
                                end_time?: string;
                            };
                        };
                    };
                    params?: {
                        page_token?: string;
                        page_size?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string };
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
                                items?: Array<{
                                    display_info?: string;
                                    meta_data?: {
                                        app_link?: string;
                                        calendar_id?: string;
                                        event_id?: string;
                                        start?: {
                                            date?: string;
                                            date_time?: string;
                                            timezone?: string;
                                        };
                                        end?: {
                                            date?: string;
                                            date_time?: string;
                                            timezone?: string;
                                        };
                                        is_all_day?: boolean;
                                        summary?: string;
                                    };
                                }>;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/search_event`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=instances&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=instances&project=calendar&resource=calendar.event&version=v4 document }
             *
             * 获取重复日程实例
             *
             * 调用该接口以当前身份（应用或用户）获取指定日历中的某一重复日程信息。
             *
             * 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。
             */
            instances: async (
                payload?: {
                    params: {
                        start_time: string;
                        end_time: string;
                        page_size?: number;
                        page_token?: string;
                    };
                    path: { calendar_id: string; event_id: string };
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
                                    event_id: string;
                                    summary?: string;
                                    description?: string;
                                    start_time?: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    end_time?: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    status?:
                                        | "tentative"
                                        | "confirmed"
                                        | "cancelled";
                                    is_exception?: boolean;
                                    app_link?: string;
                                    location?: {
                                        name?: string;
                                        address?: string;
                                        latitude?: number;
                                        longitude?: number;
                                    };
                                    description_rich?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/instances`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=patch_event&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch_event&project=calendar&resource=calendar.event&version=v4 document }
             */
            patchEvent: async (
                payload?: {
                    data?: {
                        summary?: string;
                        description?: string;
                        need_notification?: boolean;
                        start_time?: {
                            date?: string;
                            timestamp?: string;
                            timezone?: string;
                        };
                        end_time?: {
                            date?: string;
                            timestamp?: string;
                            timezone?: string;
                        };
                        vchat?: {
                            vc_type?:
                                | "vc"
                                | "third_party"
                                | "no_meeting"
                                | "lark_live"
                                | "unknown"
                                | "third_party_meeting";
                            icon_type?: "vc" | "live" | "default";
                            description?: string;
                            meeting_url?: string;
                            vc_info?: { unique_id: string; meeting_no: string };
                            meeting_settings?: {
                                owner_id?: string;
                                join_meeting_permission?:
                                    | "anyone_can_join"
                                    | "only_organization_employees"
                                    | "only_event_attendees";
                                assign_hosts?: Array<string>;
                                auto_record?: boolean;
                                open_lobby?: boolean;
                                allow_attendees_start?: boolean;
                            };
                        };
                        visibility?: "default" | "public" | "private";
                        attendee_ability?:
                            | "none"
                            | "can_see_others"
                            | "can_invite_others"
                            | "can_modify_event";
                        free_busy_status?: "busy" | "free";
                        location?: {
                            name?: string;
                            address?: string;
                            latitude?: number;
                            longitude?: number;
                        };
                        color?: number;
                        reminders?: Array<{ minutes?: number }>;
                        recurrence?: string;
                        schemas?: Array<{
                            ui_name?: string;
                            ui_status?:
                                | "hide"
                                | "readonly"
                                | "editable"
                                | "unknown";
                            app_link?: string;
                        }>;
                        attachments?: Array<{
                            file_token?: string;
                            file_size?: string;
                            is_deleted?: boolean;
                            name?: string;
                        }>;
                        event_check_in?: {
                            enable_check_in: boolean;
                            check_in_start_time?: {
                                time_type:
                                    | "before_event_start"
                                    | "after_event_start"
                                    | "after_event_end";
                                duration: number;
                            };
                            check_in_end_time?: {
                                time_type:
                                    | "before_event_start"
                                    | "after_event_start"
                                    | "after_event_end";
                                duration: number;
                            };
                            need_notify_attendees?: boolean;
                        };
                        source?: string;
                        self_rsvp_status?:
                            | "needs_action"
                            | "accept"
                            | "tentative"
                            | "decline"
                            | "removed";
                        description_rich?: string;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string; event_id: string };
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
                                event?: {
                                    event_id: string;
                                    organizer_calendar_id?: string;
                                    summary?: string;
                                    description?: string;
                                    start_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    end_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    vchat?: {
                                        vc_type?:
                                            | "vc"
                                            | "third_party"
                                            | "no_meeting"
                                            | "lark_live"
                                            | "unknown"
                                            | "third_party_meeting";
                                        icon_type?: "vc" | "live" | "default";
                                        description?: string;
                                        meeting_url?: string;
                                        live_link?: string;
                                        meeting_settings?: {
                                            owner_id?: string;
                                            join_meeting_permission?:
                                                | "anyone_can_join"
                                                | "only_organization_employees"
                                                | "only_event_attendees";
                                            assign_hosts?: Array<string>;
                                            auto_record?: boolean;
                                            open_lobby?: boolean;
                                            allow_attendees_start?: boolean;
                                        };
                                        third_party_meeting_settings?: {
                                            meeting_type?: string;
                                            meeting_id?: string;
                                            meeting_no?: string;
                                            password?: string;
                                            meeting_descriptions?: Array<{
                                                lang?: string;
                                                description?: string;
                                            }>;
                                        };
                                    };
                                    visibility?:
                                        | "default"
                                        | "public"
                                        | "private";
                                    attendee_ability?:
                                        | "none"
                                        | "can_see_others"
                                        | "can_invite_others"
                                        | "can_modify_event";
                                    free_busy_status?: "busy" | "free";
                                    location?: {
                                        name?: string;
                                        address?: string;
                                        latitude?: number;
                                        longitude?: number;
                                    };
                                    color?: number;
                                    reminders?: Array<{ minutes?: number }>;
                                    recurrence?: string;
                                    status?:
                                        | "tentative"
                                        | "confirmed"
                                        | "cancelled";
                                    is_exception?: boolean;
                                    recurring_event_id?: string;
                                    create_time?: string;
                                    schemas?: Array<{
                                        ui_name?: string;
                                        ui_status?:
                                            | "hide"
                                            | "readonly"
                                            | "editable"
                                            | "unknown";
                                        app_link?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/patch_event`,
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
            searchWithIterator: async (
                payload?: {
                    data: {
                        query: string;
                        filter?: {
                            start_time?: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            end_time?: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            user_ids?: Array<string>;
                            room_ids?: Array<string>;
                            chat_ids?: Array<string>;
                        };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/search`,
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
                                                items?: Array<{
                                                    event_id: string;
                                                    organizer_calendar_id?: string;
                                                    summary?: string;
                                                    description?: string;
                                                    start_time: {
                                                        date?: string;
                                                        timestamp?: string;
                                                        timezone?: string;
                                                    };
                                                    end_time: {
                                                        date?: string;
                                                        timestamp?: string;
                                                        timezone?: string;
                                                    };
                                                    visibility?:
                                                        | "default"
                                                        | "public"
                                                        | "private";
                                                    attendee_ability?:
                                                        | "none"
                                                        | "can_see_others"
                                                        | "can_invite_others"
                                                        | "can_modify_event";
                                                    free_busy_status?:
                                                        | "busy"
                                                        | "free";
                                                    location?: {
                                                        name?: string;
                                                        address?: string;
                                                        latitude?: number;
                                                        longitude?: number;
                                                    };
                                                    color?: number;
                                                    reminders?: Array<{
                                                        minutes?: number;
                                                    }>;
                                                    recurrence?: string;
                                                    status?:
                                                        | "tentative"
                                                        | "confirmed"
                                                        | "cancelled";
                                                    is_exception?: boolean;
                                                    recurring_event_id?: string;
                                                    event_organizer?: {
                                                        user_id?: string;
                                                        display_name?: string;
                                                    };
                                                    app_link?: string;
                                                    attachments?: Array<{
                                                        file_token?: string;
                                                        file_size?: string;
                                                        is_deleted?: boolean;
                                                        name?: string;
                                                    }>;
                                                    source?: string;
                                                    self_rsvp_status?:
                                                        | "needs_action"
                                                        | "accept"
                                                        | "tentative"
                                                        | "decline"
                                                        | "removed";
                                                    description_rich?: string;
                                                }>;
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=search&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=calendar&resource=calendar.event&version=v4 document }
             *
             * 搜索日程
             *
             * 调用该接口搜索指定日历下的相关日程，支持关键词搜索、过滤条件搜索。
             *
             * ## 注意事项;;适用于主日历和共享日历，且当前身份必须对日历有 reader、writer 或 owner 权限。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取当前身份对日历的访问权限。
             */
            search: async (
                payload?: {
                    data: {
                        query: string;
                        filter?: {
                            start_time?: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            end_time?: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            user_ids?: Array<string>;
                            room_ids?: Array<string>;
                            chat_ids?: Array<string>;
                        };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { calendar_id: string };
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
                                    event_id: string;
                                    organizer_calendar_id?: string;
                                    summary?: string;
                                    description?: string;
                                    start_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    end_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    visibility?:
                                        | "default"
                                        | "public"
                                        | "private";
                                    attendee_ability?:
                                        | "none"
                                        | "can_see_others"
                                        | "can_invite_others"
                                        | "can_modify_event";
                                    free_busy_status?: "busy" | "free";
                                    location?: {
                                        name?: string;
                                        address?: string;
                                        latitude?: number;
                                        longitude?: number;
                                    };
                                    color?: number;
                                    reminders?: Array<{ minutes?: number }>;
                                    recurrence?: string;
                                    status?:
                                        | "tentative"
                                        | "confirmed"
                                        | "cancelled";
                                    is_exception?: boolean;
                                    recurring_event_id?: string;
                                    event_organizer?: {
                                        user_id?: string;
                                        display_name?: string;
                                    };
                                    app_link?: string;
                                    attachments?: Array<{
                                        file_token?: string;
                                        file_size?: string;
                                        is_deleted?: boolean;
                                        name?: string;
                                    }>;
                                    source?: string;
                                    self_rsvp_status?:
                                        | "needs_action"
                                        | "accept"
                                        | "tentative"
                                        | "decline"
                                        | "removed";
                                    description_rich?: string;
                                }>;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=create_event&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_event&project=calendar&resource=calendar.event&version=v4 document }
             */
            createEvent: async (
                payload?: {
                    data: {
                        summary?: string;
                        description?: string;
                        need_notification?: boolean;
                        start_time: {
                            date?: string;
                            timestamp?: string;
                            timezone?: string;
                        };
                        end_time: {
                            date?: string;
                            timestamp?: string;
                            timezone?: string;
                        };
                        vchat?: {
                            vc_type?:
                                | "vc"
                                | "third_party"
                                | "no_meeting"
                                | "lark_live"
                                | "unknown"
                                | "third_party_meeting";
                            icon_type?: "vc" | "live" | "default";
                            description?: string;
                            meeting_url?: string;
                            vc_info?: { unique_id: string; meeting_no: string };
                            meeting_settings?: {
                                owner_id?: string;
                                join_meeting_permission?:
                                    | "anyone_can_join"
                                    | "only_organization_employees"
                                    | "only_event_attendees";
                                assign_hosts?: Array<string>;
                                auto_record?: boolean;
                                open_lobby?: boolean;
                                allow_attendees_start?: boolean;
                            };
                        };
                        visibility?: "default" | "public" | "private";
                        attendee_ability?:
                            | "none"
                            | "can_see_others"
                            | "can_invite_others"
                            | "can_modify_event";
                        free_busy_status?: "busy" | "free";
                        location?: {
                            name?: string;
                            address?: string;
                            latitude?: number;
                            longitude?: number;
                        };
                        color?: number;
                        reminders?: Array<{ minutes?: number }>;
                        recurrence?: string;
                        schemas?: Array<{
                            ui_name?: string;
                            ui_status?:
                                | "hide"
                                | "readonly"
                                | "editable"
                                | "unknown";
                            app_link?: string;
                        }>;
                        attachments?: Array<{
                            file_token?: string;
                            file_size?: string;
                            is_deleted?: boolean;
                            name?: string;
                        }>;
                        event_check_in?: {
                            enable_check_in: boolean;
                            check_in_start_time?: {
                                time_type:
                                    | "before_event_start"
                                    | "after_event_start"
                                    | "after_event_end";
                                duration: number;
                            };
                            check_in_end_time?: {
                                time_type:
                                    | "before_event_start"
                                    | "after_event_start"
                                    | "after_event_end";
                                duration: number;
                            };
                            need_notify_attendees?: boolean;
                        };
                        source?: string;
                        self_rsvp_status?:
                            | "needs_action"
                            | "accept"
                            | "tentative"
                            | "decline"
                            | "removed";
                        description_rich?: string;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string };
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
                                event?: {
                                    event_id: string;
                                    organizer_calendar_id?: string;
                                    summary?: string;
                                    description?: string;
                                    start_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    end_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    vchat?: {
                                        vc_type?:
                                            | "vc"
                                            | "third_party"
                                            | "no_meeting"
                                            | "lark_live"
                                            | "unknown"
                                            | "third_party_meeting";
                                        icon_type?: "vc" | "live" | "default";
                                        description?: string;
                                        meeting_url?: string;
                                        live_link?: string;
                                        meeting_settings?: {
                                            owner_id?: string;
                                            join_meeting_permission?:
                                                | "anyone_can_join"
                                                | "only_organization_employees"
                                                | "only_event_attendees";
                                            assign_hosts?: Array<string>;
                                            auto_record?: boolean;
                                            open_lobby?: boolean;
                                            allow_attendees_start?: boolean;
                                        };
                                        third_party_meeting_settings?: {
                                            meeting_type?: string;
                                            meeting_id?: string;
                                            meeting_no?: string;
                                            password?: string;
                                            meeting_descriptions?: Array<{
                                                lang?: string;
                                                description?: string;
                                            }>;
                                        };
                                    };
                                    visibility?:
                                        | "default"
                                        | "public"
                                        | "private";
                                    attendee_ability?:
                                        | "none"
                                        | "can_see_others"
                                        | "can_invite_others"
                                        | "can_modify_event";
                                    free_busy_status?: "busy" | "free";
                                    location?: {
                                        name?: string;
                                        address?: string;
                                        latitude?: number;
                                        longitude?: number;
                                    };
                                    color?: number;
                                    reminders?: Array<{ minutes?: number }>;
                                    recurrence?: string;
                                    status?:
                                        | "tentative"
                                        | "confirmed"
                                        | "cancelled";
                                    is_exception?: boolean;
                                    recurring_event_id?: string;
                                    create_time?: string;
                                    schemas?: Array<{
                                        ui_name?: string;
                                        ui_status?:
                                            | "hide"
                                            | "readonly"
                                            | "editable"
                                            | "unknown";
                                        app_link?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/create_event`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=mget_instance_relation_info&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget_instance_relation_info&project=calendar&resource=calendar.event&version=v4 document }
             *
             * 批量获取instance关联信息
             */
            mgetInstanceRelationInfo: async (
                payload?: {
                    data?: {
                        instance_ids?: Array<string>;
                        need_meeting_instance_ids?: boolean;
                        need_meeting_notes?: boolean;
                        need_ai_meeting_notes?: boolean;
                    };
                    path: { calendar_id: string };
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
                                instance_relation_infos?: Array<{
                                    instance_id?: string;
                                    meeting_instance_ids?: Array<string>;
                                    meeting_notes?: Array<string>;
                                    ai_meeting_notes?: Array<string>;
                                }>;
                                failed_instance_ids?: Array<{
                                    instance_id?: string;
                                    fail_msg?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/mget_instance_relation_info`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=instance_view&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=instance_view&project=calendar&resource=calendar.event&version=v4 document }
             *
             * 查询日程视图
             *
             * 调用该接口以用户身份查询指定日历下的日程视图。与[获取日程列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/list)不同的是，当前接口会按照重复日程的重复性规则展开成多个日程实例（instance），并根据查询的时间区间返回相应的日程实例信息。
             */
            instanceView: async (
                payload?: {
                    params: {
                        start_time: string;
                        end_time: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string };
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
                                    event_id: string;
                                    summary?: string;
                                    description?: string;
                                    start_time?: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    end_time?: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    status?:
                                        | "tentative"
                                        | "confirmed"
                                        | "cancelled";
                                    is_exception?: boolean;
                                    app_link?: string;
                                    organizer_calendar_id?: string;
                                    vchat?: {
                                        vc_type?:
                                            | "vc"
                                            | "third_party"
                                            | "no_meeting"
                                            | "lark_live"
                                            | "unknown"
                                            | "third_party_meeting";
                                        icon_type?: "vc" | "live" | "default";
                                        description?: string;
                                        meeting_url?: string;
                                        live_link?: string;
                                        vc_info?: {
                                            unique_id: string;
                                            meeting_no: string;
                                        };
                                    };
                                    visibility?:
                                        | "default"
                                        | "public"
                                        | "private";
                                    attendee_ability?:
                                        | "none"
                                        | "can_see_others"
                                        | "can_invite_others"
                                        | "can_modify_event";
                                    free_busy_status?: "busy" | "free";
                                    location?: {
                                        name?: string;
                                        address?: string;
                                        latitude?: number;
                                        longitude?: number;
                                    };
                                    color?: number;
                                    recurring_event_id?: string;
                                    event_organizer?: {
                                        user_id?: string;
                                        display_name?: string;
                                    };
                                    attendees?: Array<{
                                        type?:
                                            | "user"
                                            | "chat"
                                            | "resource"
                                            | "third_party";
                                        attendee_id?: string;
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                        display_name?: string;
                                        chat_members?: Array<{
                                            rsvp_status?:
                                                | "needs_action"
                                                | "accept"
                                                | "tentative"
                                                | "decline"
                                                | "removed";
                                            is_optional?: boolean;
                                            display_name?: string;
                                            is_organizer?: boolean;
                                            is_external?: boolean;
                                        }>;
                                        user_id?: string;
                                        chat_id?: string;
                                        room_id?: string;
                                        third_party_email?: string;
                                        operate_id?: string;
                                        resource_customization?: Array<{
                                            index_key: string;
                                            input_content?: string;
                                            options?: Array<{
                                                option_key?: string;
                                                others_content?: string;
                                            }>;
                                        }>;
                                        approval_reason?: string;
                                    }>;
                                    self_rsvp_status?:
                                        | "needs_action"
                                        | "accept"
                                        | "tentative"
                                        | "decline"
                                        | "removed";
                                    description_rich?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/instance_view`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=calendar.event&version=v4 document }
             *
             * 创建日程
             *
             * 调用该接口以当前身份（应用或用户）在指定日历上创建一个日程。
             *
             * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份必须对日历有 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取日历类型以及当前身份对该日历的访问权限。;- 该接口仅用于创建日程，如需为日程添加参与人或预约会议室，则需调用[添加日程参与人](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/create)接口。
             */
            create: async (
                payload?: {
                    data: {
                        summary?: string;
                        description?: string;
                        need_notification?: boolean;
                        start_time: {
                            date?: string;
                            timestamp?: string;
                            timezone?: string;
                        };
                        end_time: {
                            date?: string;
                            timestamp?: string;
                            timezone?: string;
                        };
                        vchat?: {
                            vc_type?:
                                | "vc"
                                | "third_party"
                                | "no_meeting"
                                | "lark_live"
                                | "unknown"
                                | "third_party_meeting";
                            icon_type?: "vc" | "live" | "default";
                            description?: string;
                            meeting_url?: string;
                            live_link?: string;
                            vc_info?: { unique_id: string; meeting_no: string };
                            meeting_settings?: {
                                owner_id?: string;
                                join_meeting_permission?:
                                    | "anyone_can_join"
                                    | "only_organization_employees"
                                    | "only_event_attendees";
                                password?: string;
                                assign_hosts?: Array<string>;
                                auto_record?: boolean;
                                open_lobby?: boolean;
                                allow_attendees_start?: boolean;
                            };
                            third_party_meeting_settings?: {
                                meeting_type?: string;
                                meeting_id?: string;
                                meeting_no?: string;
                                password?: string;
                                meeting_descriptions?: Array<{
                                    lang?: string;
                                    description?: string;
                                }>;
                            };
                        };
                        visibility?: "default" | "public" | "private";
                        attendee_ability?:
                            | "none"
                            | "can_see_others"
                            | "can_invite_others"
                            | "can_modify_event";
                        free_busy_status?: "busy" | "free";
                        location?: {
                            name?: string;
                            address?: string;
                            latitude?: number;
                            longitude?: number;
                        };
                        color?: number;
                        reminders?: Array<{ minutes?: number }>;
                        recurrence?: string;
                        schemas?: Array<{
                            ui_name?: string;
                            ui_status?:
                                | "hide"
                                | "readonly"
                                | "editable"
                                | "unknown";
                            app_link?: string;
                        }>;
                        attachments?: Array<{ file_token?: string }>;
                        event_check_in?: {
                            enable_check_in: boolean;
                            check_in_start_time?: {
                                time_type:
                                    | "before_event_start"
                                    | "after_event_start"
                                    | "after_event_end";
                                duration: number;
                            };
                            check_in_end_time?: {
                                time_type:
                                    | "before_event_start"
                                    | "after_event_start"
                                    | "after_event_end";
                                duration: number;
                            };
                            need_notify_attendees?: boolean;
                        };
                        source?: string;
                        description_rich?: string;
                    };
                    params?: {
                        idempotency_key?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string };
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
                                event?: {
                                    event_id: string;
                                    organizer_calendar_id?: string;
                                    summary?: string;
                                    description?: string;
                                    start_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    end_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    vchat?: {
                                        vc_type?:
                                            | "vc"
                                            | "third_party"
                                            | "no_meeting"
                                            | "lark_live"
                                            | "unknown"
                                            | "third_party_meeting";
                                        icon_type?: "vc" | "live" | "default";
                                        description?: string;
                                        meeting_url?: string;
                                        live_link?: string;
                                        vc_info?: {
                                            unique_id: string;
                                            meeting_no: string;
                                        };
                                        meeting_settings?: {
                                            owner_id?: string;
                                            join_meeting_permission?:
                                                | "anyone_can_join"
                                                | "only_organization_employees"
                                                | "only_event_attendees";
                                            password?: string;
                                            assign_hosts?: Array<string>;
                                            auto_record?: boolean;
                                            open_lobby?: boolean;
                                            allow_attendees_start?: boolean;
                                        };
                                        third_party_meeting_settings?: {
                                            meeting_type?: string;
                                            meeting_id?: string;
                                            meeting_no?: string;
                                            password?: string;
                                            meeting_descriptions?: Array<{
                                                lang?: string;
                                                description?: string;
                                            }>;
                                        };
                                    };
                                    visibility?:
                                        | "default"
                                        | "public"
                                        | "private";
                                    attendee_ability?:
                                        | "none"
                                        | "can_see_others"
                                        | "can_invite_others"
                                        | "can_modify_event";
                                    free_busy_status?: "busy" | "free";
                                    location?: {
                                        name?: string;
                                        address?: string;
                                        latitude?: number;
                                        longitude?: number;
                                    };
                                    color?: number;
                                    reminders?: Array<{ minutes?: number }>;
                                    recurrence?: string;
                                    status?:
                                        | "tentative"
                                        | "confirmed"
                                        | "cancelled";
                                    is_exception?: boolean;
                                    recurring_event_id?: string;
                                    create_time?: string;
                                    schemas?: Array<{
                                        ui_name?: string;
                                        ui_status?:
                                            | "hide"
                                            | "readonly"
                                            | "editable"
                                            | "unknown";
                                        app_link?: string;
                                    }>;
                                    event_organizer?: {
                                        user_id?: string;
                                        display_name?: string;
                                    };
                                    app_link?: string;
                                    attachments?: Array<{
                                        file_token?: string;
                                        file_size?: string;
                                        is_deleted?: boolean;
                                        name?: string;
                                    }>;
                                    event_check_in?: {
                                        enable_check_in: boolean;
                                        check_in_start_time?: {
                                            time_type:
                                                | "before_event_start"
                                                | "after_event_start"
                                                | "after_event_end";
                                            duration: number;
                                        };
                                        check_in_end_time?: {
                                            time_type:
                                                | "before_event_start"
                                                | "after_event_start"
                                                | "after_event_end";
                                            duration: number;
                                        };
                                        need_notify_attendees?: boolean;
                                    };
                                    source?: string;
                                    self_rsvp_status?:
                                        | "needs_action"
                                        | "accept"
                                        | "tentative"
                                        | "decline"
                                        | "removed";
                                    description_rich?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=get&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=calendar&resource=calendar.event&version=v4 document }
             *
             * 获取日程
             *
             * 调用该接口以当前身份（应用或用户）获取指定日历内的某一日程信息，包括日程的标题、时间段、视频会议信息、公开范围以及参与人权限等。
             *
             * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 当前身份必须对日历有 reader、writer 或 owner 权限。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取当前身份对该日历的访问权限。;- 你可以通过 event_id 的时间戳后缀来获取例外日程的时间信息。例如，event_id 为 `xxxxxxxxx_1602504000` 的例外日程时间戳为 160250400。关于例外日程说明可参见[日程资源介绍](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction)。
             */
            get: async (
                payload?: {
                    params?: {
                        need_meeting_settings?: boolean;
                        need_attendee?: boolean;
                        max_attendee_num?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        op_user_id?: string;
                    };
                    path: { calendar_id: string; event_id: string };
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
                                event?: {
                                    event_id: string;
                                    organizer_calendar_id?: string;
                                    summary?: string;
                                    description?: string;
                                    start_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    end_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    vchat?: {
                                        vc_type?:
                                            | "vc"
                                            | "third_party"
                                            | "no_meeting"
                                            | "lark_live"
                                            | "unknown"
                                            | "third_party_meeting";
                                        icon_type?: "vc" | "live" | "default";
                                        description?: string;
                                        meeting_url?: string;
                                        live_link?: string;
                                        vc_info?: {
                                            unique_id: string;
                                            meeting_no: string;
                                        };
                                        meeting_settings?: {
                                            owner_id?: string;
                                            join_meeting_permission?:
                                                | "anyone_can_join"
                                                | "only_organization_employees"
                                                | "only_event_attendees";
                                            password?: string;
                                            assign_hosts?: Array<string>;
                                            auto_record?: boolean;
                                            open_lobby?: boolean;
                                            allow_attendees_start?: boolean;
                                        };
                                        third_party_meeting_settings?: {
                                            meeting_type?: string;
                                            meeting_id?: string;
                                            meeting_no?: string;
                                            password?: string;
                                            meeting_descriptions?: Array<{
                                                lang?: string;
                                                description?: string;
                                            }>;
                                        };
                                    };
                                    visibility?:
                                        | "default"
                                        | "public"
                                        | "private";
                                    attendee_ability?:
                                        | "none"
                                        | "can_see_others"
                                        | "can_invite_others"
                                        | "can_modify_event";
                                    free_busy_status?: "busy" | "free";
                                    location?: {
                                        name?: string;
                                        address?: string;
                                        latitude?: number;
                                        longitude?: number;
                                    };
                                    color?: number;
                                    reminders?: Array<{ minutes?: number }>;
                                    recurrence?: string;
                                    status?:
                                        | "tentative"
                                        | "confirmed"
                                        | "cancelled";
                                    is_exception?: boolean;
                                    recurring_event_id?: string;
                                    create_time?: string;
                                    schemas?: Array<{
                                        ui_name?: string;
                                        ui_status?:
                                            | "hide"
                                            | "readonly"
                                            | "editable"
                                            | "unknown";
                                        app_link?: string;
                                    }>;
                                    event_organizer?: {
                                        user_id?: string;
                                        display_name?: string;
                                    };
                                    app_link?: string;
                                    attendees?: Array<{
                                        type?:
                                            | "user"
                                            | "chat"
                                            | "resource"
                                            | "third_party";
                                        attendee_id?: string;
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                        display_name?: string;
                                        chat_members?: Array<{
                                            rsvp_status?:
                                                | "needs_action"
                                                | "accept"
                                                | "tentative"
                                                | "decline"
                                                | "removed";
                                            is_optional?: boolean;
                                            display_name?: string;
                                            is_organizer?: boolean;
                                            is_external?: boolean;
                                        }>;
                                        user_id?: string;
                                        chat_id?: string;
                                        room_id?: string;
                                        third_party_email?: string;
                                        operate_id?: string;
                                    }>;
                                    has_more_attendee?: boolean;
                                    attachments?: Array<{
                                        file_token?: string;
                                        file_size?: string;
                                        name?: string;
                                    }>;
                                    event_check_in?: {
                                        enable_check_in: boolean;
                                        check_in_start_time?: {
                                            time_type:
                                                | "before_event_start"
                                                | "after_event_start"
                                                | "after_event_end";
                                            duration: number;
                                        };
                                        check_in_end_time?: {
                                            time_type:
                                                | "before_event_start"
                                                | "after_event_start"
                                                | "after_event_end";
                                            duration: number;
                                        };
                                        need_notify_attendees?: boolean;
                                    };
                                    source?: string;
                                    self_rsvp_status?:
                                        | "needs_action"
                                        | "accept"
                                        | "tentative"
                                        | "decline"
                                        | "removed";
                                    description_rich?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=calendar&resource=calendar.event&version=v4 document }
             *
             * 获取日程列表
             *
             * 调用该接口以当前身份（应用或用户）获取指定日历下的日程列表。
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        anchor_time?: string;
                        page_token?: string;
                        sync_token?: string;
                        start_time?: string;
                        end_time?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        op_user_id?: string;
                    };
                    path: { calendar_id: string };
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
                                sync_token?: string;
                                items?: Array<{
                                    event_id: string;
                                    organizer_calendar_id?: string;
                                    summary?: string;
                                    description?: string;
                                    start_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    end_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    vchat?: {
                                        vc_type?:
                                            | "vc"
                                            | "third_party"
                                            | "no_meeting"
                                            | "lark_live"
                                            | "unknown"
                                            | "third_party_meeting";
                                        icon_type?: "vc" | "live" | "default";
                                        description?: string;
                                        meeting_url?: string;
                                        live_link?: string;
                                        vc_info?: {
                                            unique_id: string;
                                            meeting_no: string;
                                        };
                                    };
                                    visibility?:
                                        | "default"
                                        | "public"
                                        | "private";
                                    attendee_ability?:
                                        | "none"
                                        | "can_see_others"
                                        | "can_invite_others"
                                        | "can_modify_event";
                                    free_busy_status?: "busy" | "free";
                                    location?: {
                                        name?: string;
                                        address?: string;
                                        latitude?: number;
                                        longitude?: number;
                                    };
                                    color?: number;
                                    reminders?: Array<{ minutes?: number }>;
                                    recurrence?: string;
                                    status?:
                                        | "tentative"
                                        | "confirmed"
                                        | "cancelled";
                                    is_exception?: boolean;
                                    recurring_event_id?: string;
                                    create_time?: string;
                                    schemas?: Array<{
                                        ui_name?: string;
                                        ui_status?:
                                            | "hide"
                                            | "readonly"
                                            | "editable"
                                            | "unknown";
                                        app_link?: string;
                                    }>;
                                    event_organizer?: {
                                        user_id?: string;
                                        display_name?: string;
                                    };
                                    app_link?: string;
                                    attachments?: Array<{
                                        file_token?: string;
                                        file_size?: string;
                                        name?: string;
                                    }>;
                                    source?: string;
                                    self_rsvp_status?:
                                        | "needs_action"
                                        | "accept"
                                        | "tentative"
                                        | "decline"
                                        | "removed";
                                    description_rich?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=patch&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=calendar&resource=calendar.event&version=v4 document }
             *
             * 更新日程
             *
             * 以当前身份（应用或用户）更新指定日历上的一个日程，包括日程标题、描述、开始与结束时间、视频会议以及日程地点等信息。
             *
             * ## 前提条件;;- 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份必须对日历有 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取日历类型以及当前身份对该日历的访问权限。;;## 使用限制;;- 当前身份为日程组织者时，可修改该接口内的所有可编辑字段。;- 当前身份为日程参与者时，仅可编辑部分字段（包括 visibility、free_busy_status、color、reminders）。
             */
            patch: async (
                payload?: {
                    data?: {
                        summary?: string;
                        description?: string;
                        need_notification?: boolean;
                        start_time?: {
                            date?: string;
                            timestamp?: string;
                            timezone?: string;
                        };
                        end_time?: {
                            date?: string;
                            timestamp?: string;
                            timezone?: string;
                        };
                        vchat?: {
                            vc_type?:
                                | "vc"
                                | "third_party"
                                | "no_meeting"
                                | "lark_live"
                                | "unknown"
                                | "third_party_meeting";
                            icon_type?: "vc" | "live" | "default";
                            description?: string;
                            meeting_url?: string;
                            live_link?: string;
                            vc_info?: { unique_id: string; meeting_no: string };
                            meeting_settings?: {
                                owner_id?: string;
                                join_meeting_permission?:
                                    | "anyone_can_join"
                                    | "only_organization_employees"
                                    | "only_event_attendees";
                                password?: string;
                                assign_hosts?: Array<string>;
                                auto_record?: boolean;
                                open_lobby?: boolean;
                                allow_attendees_start?: boolean;
                            };
                            third_party_meeting_settings?: {
                                meeting_type?: string;
                                meeting_id?: string;
                                meeting_no?: string;
                                password?: string;
                                meeting_descriptions?: Array<{
                                    lang?: string;
                                    description?: string;
                                }>;
                            };
                        };
                        visibility?: "default" | "public" | "private";
                        attendee_ability?:
                            | "none"
                            | "can_see_others"
                            | "can_invite_others"
                            | "can_modify_event";
                        free_busy_status?: "busy" | "free";
                        location?: {
                            name?: string;
                            address?: string;
                            latitude?: number;
                            longitude?: number;
                        };
                        color?: number;
                        reminders?: Array<{ minutes?: number }>;
                        recurrence?: string;
                        schemas?: Array<{
                            ui_name?: string;
                            ui_status?:
                                | "hide"
                                | "readonly"
                                | "editable"
                                | "unknown";
                            app_link?: string;
                        }>;
                        attachments?: Array<{
                            file_token?: string;
                            is_deleted?: boolean;
                        }>;
                        event_check_in?: {
                            enable_check_in: boolean;
                            check_in_start_time?: {
                                time_type:
                                    | "before_event_start"
                                    | "after_event_start"
                                    | "after_event_end";
                                duration: number;
                            };
                            check_in_end_time?: {
                                time_type:
                                    | "before_event_start"
                                    | "after_event_start"
                                    | "after_event_end";
                                duration: number;
                            };
                            need_notify_attendees?: boolean;
                        };
                        source?: string;
                        description_rich?: string;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { calendar_id: string; event_id: string };
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
                                event?: {
                                    event_id: string;
                                    organizer_calendar_id?: string;
                                    summary?: string;
                                    description?: string;
                                    start_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    end_time: {
                                        date?: string;
                                        timestamp?: string;
                                        timezone?: string;
                                    };
                                    vchat?: {
                                        vc_type?:
                                            | "vc"
                                            | "third_party"
                                            | "no_meeting"
                                            | "lark_live"
                                            | "unknown"
                                            | "third_party_meeting";
                                        icon_type?: "vc" | "live" | "default";
                                        description?: string;
                                        meeting_url?: string;
                                        live_link?: string;
                                        vc_info?: {
                                            unique_id: string;
                                            meeting_no: string;
                                        };
                                        meeting_settings?: {
                                            owner_id?: string;
                                            join_meeting_permission?:
                                                | "anyone_can_join"
                                                | "only_organization_employees"
                                                | "only_event_attendees";
                                            password?: string;
                                            assign_hosts?: Array<string>;
                                            auto_record?: boolean;
                                            open_lobby?: boolean;
                                            allow_attendees_start?: boolean;
                                        };
                                        third_party_meeting_settings?: {
                                            meeting_type?: string;
                                            meeting_id?: string;
                                            meeting_no?: string;
                                            password?: string;
                                            meeting_descriptions?: Array<{
                                                lang?: string;
                                                description?: string;
                                            }>;
                                        };
                                    };
                                    visibility?:
                                        | "default"
                                        | "public"
                                        | "private";
                                    attendee_ability?:
                                        | "none"
                                        | "can_see_others"
                                        | "can_invite_others"
                                        | "can_modify_event";
                                    free_busy_status?: "busy" | "free";
                                    location?: {
                                        name?: string;
                                        address?: string;
                                        latitude?: number;
                                        longitude?: number;
                                    };
                                    color?: number;
                                    reminders?: Array<{ minutes?: number }>;
                                    recurrence?: string;
                                    status?:
                                        | "tentative"
                                        | "confirmed"
                                        | "cancelled";
                                    is_exception?: boolean;
                                    recurring_event_id?: string;
                                    create_time?: string;
                                    schemas?: Array<{
                                        ui_name?: string;
                                        ui_status?:
                                            | "hide"
                                            | "readonly"
                                            | "editable"
                                            | "unknown";
                                        app_link?: string;
                                    }>;
                                    event_organizer?: {
                                        user_id?: string;
                                        display_name?: string;
                                    };
                                    app_link?: string;
                                    attachments?: Array<{
                                        file_token?: string;
                                        file_size?: string;
                                        is_deleted?: boolean;
                                        name?: string;
                                    }>;
                                    event_check_in?: {
                                        enable_check_in: boolean;
                                        check_in_start_time?: {
                                            time_type:
                                                | "before_event_start"
                                                | "after_event_start"
                                                | "after_event_end";
                                            duration: number;
                                        };
                                        check_in_end_time?: {
                                            time_type:
                                                | "before_event_start"
                                                | "after_event_start"
                                                | "after_event_end";
                                            duration: number;
                                        };
                                        need_notify_attendees?: boolean;
                                    };
                                    source?: string;
                                    self_rsvp_status?:
                                        | "needs_action"
                                        | "accept"
                                        | "tentative"
                                        | "decline"
                                        | "removed";
                                    description_rich?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id`,
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
         * common_freetime
         */
        commonFreetime: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=common_freetime&apiName=mget&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=calendar&resource=common_freetime&version=v4 document }
             *
             * 查询多个用户的公共空闲时间列表
             *
             * 调用该接口查询多个用户的公共空闲时间。
             *
             * 如果以应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。
             */
            mget: async (
                payload?: {
                    data: {
                        user_ids: Array<string>;
                        start_time: string;
                        end_time: string;
                        timezone: string;
                        only_busy?: boolean;
                        include_external_calendar?: boolean;
                        enable_work_hour?: boolean;
                        min_time_length?: number;
                        limit?: number;
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
                                items?: Array<{
                                    start_time: string;
                                    end_time: string;
                                    length: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/common_freetime/mget`,
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
         * setting
         */
        setting: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=setting&apiName=generate_caldav_conf&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=generate_caldav_conf&project=calendar&resource=setting&version=v4 document }
             *
             * 生成 CalDAV 配置
             *
             * 调用该接口为当前用户生成一个 CalDAV 账号密码，用于将飞书日历信息同步到本地设备日历。
             */
            generateCaldavConf: async (
                payload?: {
                    data?: { device_name?: string };
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
                                password?: string;
                                user_name?: string;
                                server_address?: string;
                                device_name?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/settings/generate_caldav_conf`,
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
         * timeoff_event
         */
        timeoffEvent: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=timeoff_event&apiName=delete&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=calendar&resource=timeoff_event&version=v4 document }
             *
             * 删除请假日程
             *
             * 调用该接口删除一个指定的请假日程。请假日程删除后，用户个人签名页的请假信息也会消失。
             *
             * - 使用应用身份调用该接口，需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前应用身份只能删除自己创建的请假日程。
             */
            delete: async (
                payload?: {
                    path: { timeoff_event_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/timeoff_events/:timeoff_event_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=timeoff_event&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=timeoff_event&version=v4 document }
             *
             * 创建请假日程
             *
             * 调用该接口为指定用户创建一个请假日程。请假日程分为普通日程和全天日程。创建请假日程后，在请假时间内，用户个人签名页会展示请假信息。
             */
            create: async (
                payload?: {
                    data: {
                        user_id: string;
                        timezone: string;
                        start_time: string;
                        end_time: string;
                        title?: string;
                        description?: string;
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
                                timeoff_event_id: string;
                                user_id: string;
                                timezone: string;
                                start_time: string;
                                end_time: string;
                                title?: string;
                                description?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/timeoff_events`,
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
         * calendar.event.meeting_minute
         */
        calendarEventMeetingMinute: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.meeting_minute&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=calendar.event.meeting_minute&version=v4 document }
             *
             * 创建会议纪要
             *
             * 调用该接口为指定的日程创建会议纪要。纪要以文档形式展示，成功创建后会返回纪要文档 URL。
             *
             * ## 注意事项;;- 所操作的日历需要是当前身份（身份由 Header Authorization 的 Token 类型决定）的主日历，且当前身份具有日历的 writer 权限（即编辑权限）。;- 所操作的日程内至少需要有 1 个参与人，且参与人权限不能为 none（即无法查看参与人列表）。;;
             */
            create: async (
                payload?: {
                    path: { calendar_id: string; event_id: string };
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
                            data?: { doc_url?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/meeting_minute`,
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
         * calendar.event.meeting_chat
         */
        calendarEventMeetingChat: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.meeting_chat&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=calendar.event.meeting_chat&version=v4 document }
             *
             * 创建会议群
             *
             * 调用该接口以当前身份（应用或用户）为指定日程创建一个会议群。
             */
            create: async (
                payload?: {
                    path: { calendar_id: string; event_id: string };
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
                                meeting_chat_id?: string;
                                applink?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/meeting_chat`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.meeting_chat&apiName=delete&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=calendar&resource=calendar.event.meeting_chat&version=v4 document }
             *
             * 解绑会议群
             *
             * 调用该接口以当前身份（应用或用户）为日程解绑已创建的会议群。
             *
             * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 日程所在的日历需要是当前身份的主日历，且具有日历的 writer 权限。你可以调用[查询主日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/primary)接口，获取当前身份的主日历信息。;- 当前的操作人需要是会议群的群主。
             */
            delete: async (
                payload?: {
                    params: { meeting_chat_id: string };
                    path: { calendar_id: string; event_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/meeting_chat`,
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
         * calendar.event.attendee.chat_member
         */
        calendarEventAttendeeChatMember: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        page_token?: string;
                        page_size?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        op_user_id?: string;
                    };
                    path: {
                        calendar_id: string;
                        event_id: string;
                        attendee_id: string;
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/:attendee_id/chat_members`,
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
                                                    rsvp_status?:
                                                        | "needs_action"
                                                        | "accept"
                                                        | "tentative"
                                                        | "decline"
                                                        | "removed";
                                                    is_optional?: boolean;
                                                    display_name?: string;
                                                    open_id?: string;
                                                    is_organizer?: boolean;
                                                    is_external?: boolean;
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee.chat_member&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=calendar&resource=calendar.event.attendee.chat_member&version=v4 document }
             *
             * 获取日程参与群成员列表
             *
             * 调用该接口以当前身份（应用或用户）获取日程的群组类型参与人的群成员列表。
             */
            list: async (
                payload?: {
                    params?: {
                        page_token?: string;
                        page_size?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        op_user_id?: string;
                    };
                    path: {
                        calendar_id: string;
                        event_id: string;
                        attendee_id: string;
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
                                    rsvp_status?:
                                        | "needs_action"
                                        | "accept"
                                        | "tentative"
                                        | "decline"
                                        | "removed";
                                    is_optional?: boolean;
                                    display_name?: string;
                                    open_id?: string;
                                    is_organizer?: boolean;
                                    is_external?: boolean;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/:attendee_id/chat_members`,
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
         * calendar.event.resource_waitlist
         */
        calendarEventResourceWaitlist: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.resource_waitlist&apiName=delete&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=calendar&resource=calendar.event.resource_waitlist&version=v4 document }
             *
             * 删除会议室候补单
             *
             * 调用该接口删除指定日程上的一个会议室候补单。
             */
            delete: async (
                payload?: {
                    path: {
                        calendar_id: string;
                        event_id: string;
                        resource_waitlist_id: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/resource_waitlists/:resource_waitlist_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.resource_waitlist&apiName=list&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=calendar&resource=calendar.event.resource_waitlist&version=v4 document }
             *
             * 获取会议室候补单列表
             *
             * 调用该接口以当前身份（应用或用户）获取指定日程下的会议室候补单列表。;
             */
            list: async (
                payload?: {
                    path: { calendar_id: string; event_id: string };
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
                                    resource_waitlist_id?: string;
                                    room_level_ids?: Array<string>;
                                    min_capacity?: number;
                                    max_capacity?: number;
                                    last_wait_time_type?:
                                        | "BeforeEventStartFiveMinutes"
                                        | "WhenEventStart"
                                        | "AfterEventStartFiveMinutes"
                                        | "WhenEventEnd";
                                    equipment_require_type?:
                                        | "RequireNoneEquipment"
                                        | "IncludeProjector";
                                    building_zone_codes?: Array<string>;
                                    status?: "Waiting" | "Failed";
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/resource_waitlists`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.resource_waitlist&apiName=get&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=calendar&resource=calendar.event.resource_waitlist&version=v4 document }
             *
             * 获取会议室候补单
             *
             * 调用该接口以当前身份（应用或用户）获取指定日程的某一会议室候补单信息。
             */
            get: async (
                payload?: {
                    path: {
                        calendar_id: string;
                        event_id: string;
                        resource_waitlist_id: string;
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
                                resource_waitlist?: {
                                    resource_waitlist_id?: string;
                                    room_level_ids?: Array<string>;
                                    min_capacity?: number;
                                    max_capacity?: number;
                                    last_wait_time_type?:
                                        | "BeforeEventStartFiveMinutes"
                                        | "WhenEventStart"
                                        | "AfterEventStartFiveMinutes"
                                        | "WhenEventEnd";
                                    equipment_require_type?:
                                        | "RequireNoneEquipment"
                                        | "IncludeProjector";
                                    building_zone_codes?: Array<string>;
                                    status?: "Waiting" | "Failed";
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/resource_waitlists/:resource_waitlist_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.resource_waitlist&apiName=create&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=calendar.event.resource_waitlist&version=v4 document }
             *
             * 创建会议室候补单
             *
             * 调用该接口创建一个会议室候补单。
             */
            create: async (
                payload?: {
                    data?: {
                        room_level_ids?: Array<string>;
                        min_capacity?: number;
                        max_capacity?: number;
                        last_wait_time_type?:
                            | "BeforeEventStartFiveMinutes"
                            | "WhenEventStart"
                            | "AfterEventStartFiveMinutes"
                            | "WhenEventEnd";
                        equipment_require_type?:
                            | "RequireNoneEquipment"
                            | "IncludeProjector";
                        building_zone_codes?: Array<string>;
                    };
                    path: { calendar_id: string; event_id: string };
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
                                resource_waitlist?: {
                                    resource_waitlist_id?: string;
                                    room_level_ids?: Array<string>;
                                    min_capacity?: number;
                                    max_capacity?: number;
                                    last_wait_time_type?:
                                        | "BeforeEventStartFiveMinutes"
                                        | "WhenEventStart"
                                        | "AfterEventStartFiveMinutes"
                                        | "WhenEventEnd";
                                    equipment_require_type?:
                                        | "RequireNoneEquipment"
                                        | "IncludeProjector";
                                    building_zone_codes?: Array<string>;
                                    status?: "Waiting" | "Failed";
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/resource_waitlists`,
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
             * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.resource_waitlist&apiName=patch&version=v4 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=calendar&resource=calendar.event.resource_waitlist&version=v4 document }
             *
             * 更新会议室候补单
             *
             * 更新指定日程上的一个会议室候补单信息。;
             */
            patch: async (
                payload?: {
                    data?: {
                        room_level_ids?: Array<string>;
                        min_capacity?: number;
                        max_capacity?: number;
                        last_wait_time_type?:
                            | "BeforeEventStartFiveMinutes"
                            | "WhenEventStart"
                            | "AfterEventStartFiveMinutes"
                            | "WhenEventEnd";
                        equipment_require_type?:
                            | "RequireNoneEquipment"
                            | "IncludeProjector";
                        building_zone_codes?: Array<string>;
                    };
                    path: {
                        calendar_id: string;
                        event_id: string;
                        resource_waitlist_id: string;
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
                                resource_waitlist?: {
                                    resource_waitlist_id?: string;
                                    room_level_ids?: Array<string>;
                                    min_capacity?: number;
                                    max_capacity?: number;
                                    last_wait_time_type?:
                                        | "BeforeEventStartFiveMinutes"
                                        | "WhenEventStart"
                                        | "AfterEventStartFiveMinutes"
                                        | "WhenEventEnd";
                                    equipment_require_type?:
                                        | "RequireNoneEquipment"
                                        | "IncludeProjector";
                                    building_zone_codes?: Array<string>;
                                    status?: "Waiting" | "Failed";
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/resource_waitlists/:resource_waitlist_id`,
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
        v4: {
            /**
             * card
             */
            card: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=operate_event_card&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=operate_event_card&project=calendar&resource=card&version=v4 document }
                 *
                 * 更新确认日程消息卡片
                 *
                 * 更新确认日程消息卡片
                 */
                operateEventCard: async (
                    payload?: {
                        data: { message_id: string; body: string };
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
                                    result?: {
                                        meeting_url?: string;
                                        meeting_no?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/cards/operate_event_card`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=user_common_free_time_v2&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=user_common_free_time_v2&project=calendar&resource=card&version=v4 document }
                 */
                userCommonFreeTimeV2: async (
                    payload?: {
                        data?: {
                            start_time?: string;
                            end_time?: string;
                            duration?: string;
                            start_timezone?: string;
                            participant_ids?: string;
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
                                    result?: {
                                        free_time_start?: string;
                                        free_time_end?: string;
                                        free_time_list?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/cards/user_common_free_time_v2`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=get_can_book_meeting_room_id&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_can_book_meeting_room_id&project=calendar&resource=card&version=v4 document }
                 *
                 * 获取空闲会议室列表
                 *
                 * 获取空闲会议室列表
                 */
                getCanBookMeetingRoomId: async (
                    payload?: {
                        data?: {
                            start_time?: string;
                            end_time?: string;
                            recurrence_rule?: string;
                            start_timezone?: string;
                            meeting_room_equipment?: string;
                            meeting_building?: string;
                            meeting_floor?: string;
                            meeting_capacity?: string;
                            meeting_room_name?: string;
                            scenario_context_schema_version?: string;
                            scenario_context?: {
                                scenario?: string;
                                work_mode?: number;
                                extra?: {
                                    ai_task_id?: string;
                                    event_uid?: string;
                                    origin_time?: string;
                                };
                                system_info?: {
                                    session_id?: string;
                                    lang?: string;
                                    locale?: string;
                                };
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
                                    result?: {
                                        meeting_room_id?: string;
                                        hint?: string;
                                        rooms?: Array<{
                                            name?: string;
                                            room_id?: string;
                                        }>;
                                        recurrence_rule?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/cards/get_can_book_meeting_room_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=get_user_common_free_time&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_user_common_free_time&project=calendar&resource=card&version=v4 document }
                 *
                 * 获取用户空闲时间段
                 *
                 * 获取用户空闲时间段
                 */
                getUserCommonFreeTime: async (
                    payload?: {
                        data?: {
                            start_time?: string;
                            end_time?: string;
                            scheduler_time_len?: string;
                            start_timezone?: string;
                            participant_ids?: string;
                            scenario_context_schema_version?: string;
                            scenario_context?: {
                                scenario?: string;
                                work_mode?: number;
                                extra?: {
                                    ai_task_id?: string;
                                    event_uid?: string;
                                    origin_time?: string;
                                };
                                system_info?: {
                                    session_id?: string;
                                    lang?: string;
                                    locale?: string;
                                };
                            };
                            summary?: string;
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
                                    result?: {
                                        free_time_start?: string;
                                        free_time_end?: string;
                                        free_time_list?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/cards/get_user_common_free_time`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=inline_quick_action_basic&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=inline_quick_action_basic&project=calendar&resource=card&version=v4 document }
                 */
                inlineQuickActionBasic: async (
                    payload?: {
                        data?: {
                            quick_action_command?: string;
                            ai_task_id?: string;
                            summary?: string;
                            start_time?: string;
                            end_time?: string;
                            start_timezone?: string;
                            participant_ids?: string;
                            rec_rule?: string;
                            resource_ids?: string;
                            meeting_notes_url?: string;
                            event_uid?: string;
                            origin_time?: string;
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
                                    summary?: string;
                                    start_time?: string;
                                    end_time?: string;
                                    start_timezone?: string;
                                    participant_ids?: string;
                                    rec_rule?: string;
                                    resource_ids?: string;
                                    meeting_notes_url?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/cards/inline_quick_action_basic`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=inline_quick_action_adjust&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=inline_quick_action_adjust&project=calendar&resource=card&version=v4 document }
                 */
                inlineQuickActionAdjust: async (
                    payload?: {
                        data?: {
                            quick_action_command?: string;
                            ai_task_id?: string;
                            summary?: string;
                            start_time?: string;
                            end_time?: string;
                            start_timezone?: string;
                            participant_ids?: string;
                            rec_rule?: string;
                            resource_ids?: string;
                            meeting_notes_url?: string;
                            event_uid?: string;
                            origin_time?: string;
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
                                    summary?: string;
                                    start_time?: string;
                                    end_time?: string;
                                    start_timezone?: string;
                                    participant_ids?: string;
                                    rec_rule?: string;
                                    resource_ids?: string;
                                    meeting_notes_url?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/cards/inline_quick_action_adjust`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=inline_quick_action_template&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=inline_quick_action_template&project=calendar&resource=card&version=v4 document }
                 */
                inlineQuickActionTemplate: async (
                    payload?: {
                        data?: {
                            quick_action_command?: string;
                            ai_task_id?: string;
                            start_timezone?: string;
                            time_length?: string;
                            summary?: string;
                            participant_ids?: string;
                            event_uid?: string;
                            origin_time?: string;
                            meeting_notes_url?: string;
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
                                    summary?: string;
                                    start_time?: string;
                                    end_time?: string;
                                    start_timezone?: string;
                                    participant_ids?: string;
                                    rec_rule?: string;
                                    resource_ids?: string;
                                    meeting_notes_url?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/cards/inline_quick_action_template`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=general_event_card&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=general_event_card&project=calendar&resource=card&version=v4 document }
                 *
                 * 生成日程消息卡片内容
                 *
                 * 生成日程消息卡片内容
                 */
                generalEventCard: async (
                    payload?: {
                        data: {
                            summary: string;
                            start_time: string;
                            end_time: string;
                            start_timezone: string;
                            participant_ids: string;
                            recurrence_rule?: string;
                            meeting_room_ids?: string;
                            duration?: string;
                            need_meeting_notes?: string;
                            scenario_context_schema_version?: string;
                            scenario_context?: {
                                scenario?: string;
                                work_mode?: number;
                                extra?: {
                                    ai_task_id?: string;
                                    event_uid?: string;
                                    origin_time?: string;
                                };
                                system_info?: {
                                    session_id?: string;
                                    lang?: string;
                                    locale?: string;
                                };
                            };
                            event_id?: string;
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
                                    hint?: string;
                                    result?: {
                                        reply?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        rooms?: Array<{
                                            name?: string;
                                            room_id?: string;
                                        }>;
                                        summary?: string;
                                        participants?: Array<{
                                            name?: string;
                                            user_id?: string;
                                        }>;
                                        event_id?: string;
                                        recurrence_rule?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/cards/general_event_card`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=obtain_meeting_room_for_bot&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=obtain_meeting_room_for_bot&project=calendar&resource=card&version=v4 document }
                 */
                obtainMeetingRoomForBot: async (
                    payload?: {
                        data?: {
                            start_time?: string;
                            end_time?: string;
                            timezone?: string;
                            meeting_room_equipment?: string;
                            meeting_building?: string;
                            meeting_floor?: string;
                            meeting_capacity?: string;
                            meeting_room_name?: string;
                            query?: string;
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
                                        name?: string;
                                        room_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/cards/obtain_meeting_room_for_bot`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=general_event_card_v2&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=general_event_card_v2&project=calendar&resource=card&version=v4 document }
                 */
                generalEventCardV2: async (
                    payload?: {
                        data: {
                            summary: string;
                            start_time: string;
                            end_time: string;
                            start_timezone: string;
                            participant_ids: string;
                            recurrence_rule?: string;
                            meeting_room_ids?: string;
                            duration?: string;
                            need_meeting_notes?: string;
                            scenario_context_schema_version?: string;
                            scenario_context?: {
                                scenario?: string;
                                work_mode?: number;
                                extra?: {
                                    ai_task_id?: string;
                                    event_uid?: string;
                                    origin_time?: string;
                                };
                                system_info?: {
                                    session_id?: string;
                                    lang?: string;
                                    locale?: string;
                                };
                            };
                            event_id?: string;
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
                                    hint?: string;
                                    result?: {
                                        reply?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        rooms?: Array<{
                                            name?: string;
                                            room_id?: string;
                                        }>;
                                        summary?: string;
                                        participants?: Array<{
                                            name?: string;
                                            user_id?: string;
                                        }>;
                                        event_id?: string;
                                        recurrence_rule?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/cards/general_event_card_v2`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=callback&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=callback&project=calendar&resource=card&version=v4 document }
                 */
                callback: async (
                    payload?: {
                        data?: {
                            message_id?: string;
                            status?: {
                                from_status?: string;
                                to_status?: string;
                            };
                            callback_info?: string;
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
                                `${this.domain}/open-apis/calendar/v4/cards/callback`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=card&apiName=obtain_free_time_for_bot&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=obtain_free_time_for_bot&project=calendar&resource=card&version=v4 document }
                 */
                obtainFreeTimeForBot: async (
                    payload?: {
                        data?: {
                            start_time?: string;
                            end_time?: string;
                            scheduler_time_len?: string;
                            timezone?: string;
                            participant_ids?: string;
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
                                    free_times?: Array<{
                                        start_time?: string;
                                        end_time?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/cards/obtain_free_time_for_bot`,
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
             * calendar_ai
             */
            calendarAi: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=operate_event_card&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=operate_event_card&project=calendar&resource=calendar_ai&version=v4 document }
                 */
                operateEventCard: async (
                    payload?: {
                        data: { message_id: string; body: string };
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
                                    result?: {
                                        meeting_url?: string;
                                        meeting_no?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai/operate_event_card`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=search_user&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_user&project=calendar&resource=calendar_ai&version=v4 document }
                 */
                searchUser: async (
                    payload?: {
                        data: { keywords: string };
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
                                    result?: {
                                        search_results?: Array<{
                                            query_keyword: string;
                                            user_info?: {
                                                name?: string;
                                                user_id?: string;
                                            };
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai/search_user`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=create_event_card&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_event_card&project=calendar&resource=calendar_ai&version=v4 document }
                 */
                createEventCard: async (
                    payload?: {
                        data: {
                            summary: string;
                            start_time: string;
                            end_time: string;
                            start_timezone: string;
                            participant_ids: string;
                            recurrence_rule?: string;
                            meeting_room_ids?: string;
                            duration?: string;
                            need_meeting_notes?: string;
                            scenario_context_schema_version?: string;
                            scenario_context?: {
                                scenario?: string;
                                work_mode?: number;
                                extra?: {
                                    ai_task_id?: string;
                                    event_uid?: string;
                                    origin_time?: string;
                                };
                                system_info?: {
                                    session_id?: string;
                                    lang?: string;
                                    locale?: string;
                                };
                            };
                            event_id?: string;
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
                                    hint?: string;
                                    result?: {
                                        reply?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        rooms?: Array<{
                                            name?: string;
                                            room_id?: string;
                                        }>;
                                        summary?: string;
                                        participants?: Array<{
                                            name?: string;
                                            user_id?: string;
                                        }>;
                                        event_id?: string;
                                        recurrence_rule?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai/create_event_card`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=edit_event&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=edit_event&project=calendar&resource=calendar_ai&version=v4 document }
                 */
                editEvent: async (
                    payload?: {
                        data?: {
                            event_id?: string;
                            summary?: string;
                            start_time?: string;
                            end_time?: string;
                            start_timezone?: string;
                            recurrence_rule?: string;
                            participant_ids?: string;
                            meeting_room_ids?: string;
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
                                    result?: {
                                        reply?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        rooms?: Array<{
                                            name?: string;
                                            room_id?: string;
                                        }>;
                                        summary?: string;
                                        participants?: Array<{
                                            name?: string;
                                            user_id?: string;
                                        }>;
                                        event_id?: string;
                                        recurrence_rule?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai/edit_event`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=create_event&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_event&project=calendar&resource=calendar_ai&version=v4 document }
                 */
                createEvent: async (
                    payload?: {
                        data?: {
                            event_id?: string;
                            summary?: string;
                            start_time?: string;
                            end_time?: string;
                            start_timezone?: string;
                            recurrence_rule?: string;
                            participant_ids?: string;
                            meeting_room_ids?: string;
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
                                    result?: {
                                        reply?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        rooms?: Array<{
                                            name?: string;
                                            room_id?: string;
                                        }>;
                                        summary?: string;
                                        participants?: Array<{
                                            name?: string;
                                            user_id?: string;
                                        }>;
                                        event_id?: string;
                                        recurrence_rule?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai/create_event`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=event_detail&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=event_detail&project=calendar&resource=calendar_ai&version=v4 document }
                 */
                eventDetail: async (
                    payload?: {
                        data?: { event_id?: string };
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
                                    result?: {
                                        event_id?: string;
                                        summary?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        timezone?: string;
                                        recurrence_rule?: string;
                                        participants?: Array<{
                                            name?: string;
                                            user_id?: string;
                                        }>;
                                        rooms?: Array<{
                                            name?: string;
                                            room_id?: string;
                                        }>;
                                        access_role?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai/event_detail`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=user_common_free_time&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=user_common_free_time&project=calendar&resource=calendar_ai&version=v4 document }
                 */
                userCommonFreeTime: async (
                    payload?: {
                        data?: {
                            start_time?: string;
                            end_time?: string;
                            scheduler_time_len?: string;
                            start_timezone?: string;
                            participant_ids?: string;
                            message_type?: number;
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
                                    result?: { free_time_list?: string };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                    msg?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai/user_common_free_time`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=can_book_meeting_room_id&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=can_book_meeting_room_id&project=calendar&resource=calendar_ai&version=v4 document }
                 */
                canBookMeetingRoomId: async (
                    payload?: {
                        data?: {
                            start_time?: string;
                            end_time?: string;
                            recurrence_rule?: string;
                            start_timezone?: string;
                            meeting_room_equipment?: string;
                            meeting_building?: string;
                            meeting_floor?: string;
                            meeting_capacity?: string;
                            meeting_room_name?: string;
                            message_type?: number;
                            query?: string;
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
                                    result?: {
                                        meeting_room_id?: string;
                                        hint?: string;
                                        rooms?: Array<{
                                            name?: string;
                                            room_id?: string;
                                        }>;
                                        recurrence_rule?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                    msg?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai/can_book_meeting_room_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=search_event&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_event&project=calendar&resource=calendar_ai&version=v4 document }
                 */
                searchEvent: async (
                    payload?: {
                        data?: {
                            start_time?: string;
                            end_time?: string;
                            timezone?: string;
                            query?: string;
                            message_type?: number;
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
                                    result?: {
                                        events?: Array<{
                                            event_id: string;
                                            summary: string;
                                            start_time: string;
                                            end_time: string;
                                            app_link: string;
                                            organizer: {
                                                user_id?: string;
                                                display_name?: string;
                                            };
                                        }>;
                                        msg?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai/search_event`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai&apiName=search_doc&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_doc&project=calendar&resource=calendar_ai&version=v4 document }
                 */
                searchDoc: async (
                    payload?: {
                        data?: {
                            query?: string;
                            query_type?: "recommend" | "search";
                            scenario_context?: {
                                scenario?: string;
                                work_mode?: number;
                                extra?: {
                                    ai_task_id?: string;
                                    event_uid?: string;
                                    origin_time?: string;
                                };
                                system_info?: {
                                    session_id?: string;
                                    lang?: string;
                                    locale?: string;
                                };
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
                                    result?: {
                                        doc_items?: Array<{
                                            title?: string;
                                            url?: string;
                                            token?: string;
                                            doc_type?: string;
                                            extra?: string;
                                        }>;
                                        message?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai/search_doc`,
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
             * calendar_ai_beta
             */
            calendarAiBeta: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=operate_event_card&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=operate_event_card&project=calendar&resource=calendar_ai_beta&version=v4 document }
                 */
                operateEventCard: async (
                    payload?: {
                        data: { message_id: string; body: string };
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
                                    result?: {
                                        meeting_url?: string;
                                        meeting_no?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/operate_event_card`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=search_user&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_user&project=calendar&resource=calendar_ai_beta&version=v4 document }
                 */
                searchUser: async (
                    payload?: {
                        data: { keywords: string };
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
                                    result?: {
                                        search_results?: Array<{
                                            query_keyword: string;
                                            user_info?: {
                                                name?: string;
                                                user_id?: string;
                                            };
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/search_user`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=edit_event&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=edit_event&project=calendar&resource=calendar_ai_beta&version=v4 document }
                 */
                editEvent: async (
                    payload?: {
                        data?: {
                            event_id?: string;
                            summary?: string;
                            start_time?: string;
                            end_time?: string;
                            start_timezone?: string;
                            recurrence_rule?: string;
                            participant_ids?: string;
                            meeting_room_ids?: string;
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
                                    result?: {
                                        reply?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        rooms?: Array<{
                                            name?: string;
                                            room_id?: string;
                                        }>;
                                        summary?: string;
                                        participants?: Array<{
                                            name?: string;
                                            user_id?: string;
                                        }>;
                                        event_id?: string;
                                        recurrence_rule?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/edit_event`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=create_event&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_event&project=calendar&resource=calendar_ai_beta&version=v4 document }
                 */
                createEvent: async (
                    payload?: {
                        data?: {
                            event_id?: string;
                            summary?: string;
                            start_time?: string;
                            end_time?: string;
                            start_timezone?: string;
                            recurrence_rule?: string;
                            participant_ids?: string;
                            meeting_room_ids?: string;
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
                                    result?: {
                                        reply?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        rooms?: Array<{
                                            name?: string;
                                            room_id?: string;
                                        }>;
                                        summary?: string;
                                        participants?: Array<{
                                            name?: string;
                                            user_id?: string;
                                        }>;
                                        event_id?: string;
                                        recurrence_rule?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/create_event`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=cancel_event&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel_event&project=calendar&resource=calendar_ai_beta&version=v4 document }
                 */
                cancelEvent: async (
                    payload?: {
                        data?: { event_id?: string };
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
                                    result?: {
                                        reply?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        rooms?: Array<{
                                            name?: string;
                                            room_id?: string;
                                        }>;
                                        summary?: string;
                                        participants?: Array<{
                                            name?: string;
                                            user_id?: string;
                                        }>;
                                        event_id?: string;
                                        recurrence_rule?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/cancel_event`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=event_detail&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=event_detail&project=calendar&resource=calendar_ai_beta&version=v4 document }
                 */
                eventDetail: async (
                    payload?: {
                        data?: { event_id?: string };
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
                                    result?: {
                                        event_id?: string;
                                        summary?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        timezone?: string;
                                        recurrence_rule?: string;
                                        participants?: Array<{
                                            name?: string;
                                            user_id?: string;
                                        }>;
                                        rooms?: Array<{
                                            name?: string;
                                            room_id?: string;
                                        }>;
                                        access_role?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/event_detail`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=search_doc&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_doc&project=calendar&resource=calendar_ai_beta&version=v4 document }
                 */
                searchDoc: async (
                    payload?: {
                        data?: {
                            query?: string;
                            query_type?: "recommend" | "search";
                            scenario_context?: {
                                scenario?: string;
                                work_mode?: number;
                                extra?: {
                                    ai_task_id?: string;
                                    event_uid?: string;
                                    origin_time?: string;
                                };
                                system_info?: {
                                    session_id?: string;
                                    lang?: string;
                                    locale?: string;
                                };
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
                                    result?: {
                                        doc_items?: Array<{
                                            title?: string;
                                            url?: string;
                                            token?: string;
                                            doc_type?: string;
                                            extra?: string;
                                        }>;
                                        message?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/search_doc`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=can_book_meeting_room_id&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=can_book_meeting_room_id&project=calendar&resource=calendar_ai_beta&version=v4 document }
                 */
                canBookMeetingRoomId: async (
                    payload?: {
                        data?: {
                            start_time?: string;
                            end_time?: string;
                            recurrence_rule?: string;
                            start_timezone?: string;
                            meeting_room_equipment?: string;
                            meeting_building?: string;
                            meeting_floor?: string;
                            meeting_capacity?: string;
                            meeting_room_name?: string;
                            message_type?: number;
                            query?: string;
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
                                    result?: {
                                        meeting_room_id?: string;
                                        hint?: string;
                                        rooms?: Array<{
                                            name?: string;
                                            room_id?: string;
                                        }>;
                                        recurrence_rule?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                    msg?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/can_book_meeting_room_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=search_event&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_event&project=calendar&resource=calendar_ai_beta&version=v4 document }
                 */
                searchEvent: async (
                    payload?: {
                        data?: {
                            start_time?: string;
                            end_time?: string;
                            timezone?: string;
                            query?: string;
                            message_type?: number;
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
                                    result?: {
                                        events?: Array<{
                                            event_id: string;
                                            summary: string;
                                            start_time: string;
                                            end_time: string;
                                            app_link: string;
                                            organizer: {
                                                user_id?: string;
                                                display_name?: string;
                                            };
                                        }>;
                                        msg?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/search_event`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=create_event_card&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_event_card&project=calendar&resource=calendar_ai_beta&version=v4 document }
                 */
                createEventCard: async (
                    payload?: {
                        data: {
                            summary: string;
                            start_time: string;
                            end_time: string;
                            start_timezone: string;
                            recurrence_rule?: string;
                            participant_ids: string;
                            meeting_room_ids?: string;
                            event_id?: string;
                            message_type?: number;
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
                                    hint?: string;
                                    result?: {
                                        reply?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        rooms?: Array<{
                                            name?: string;
                                            room_id?: string;
                                        }>;
                                        summary?: string;
                                        participants?: Array<{
                                            name?: string;
                                            user_id?: string;
                                        }>;
                                        event_id?: string;
                                        recurrence_rule?: string;
                                    };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/create_event_card`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar_ai_beta&apiName=user_common_free_time&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=user_common_free_time&project=calendar&resource=calendar_ai_beta&version=v4 document }
                 */
                userCommonFreeTime: async (
                    payload?: {
                        data?: {
                            start_time?: string;
                            end_time?: string;
                            scheduler_time_len?: string;
                            start_timezone?: string;
                            participant_ids?: string;
                            message_type?: number;
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
                                    result?: { free_time_list?: string };
                                    present?: {
                                        body?: string;
                                        interactable?: boolean;
                                        type?: string;
                                        operation_type?: string;
                                        callback_info?: string;
                                    };
                                    msg?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendar_ai_beta/user_common_free_time`,
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
             * exchange_binding
             */
            exchangeBinding: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=exchange_binding&apiName=delete&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=calendar&resource=exchange_binding&version=v4 document }
                 *
                 * 解除 Exchange 账户绑定
                 *
                 * 调用该接口解除 Exchange 账户和飞书账户的绑定关系，Exchange 账户解除绑定后才能和其他飞书账户继续绑定。
                 */
                delete: async (
                    payload?: {
                        path: { exchange_binding_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/exchange_bindings/:exchange_binding_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=exchange_binding&apiName=get&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=calendar&resource=exchange_binding&version=v4 document }
                 *
                 * 查询 Exchange 账户的绑定状态
                 *
                 * 调用该接口获取 Exchange 账户的绑定状态，包括 Exchange 日历的同步状态。
                 *
                 * 当前身份需要是企业超级管理员。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { exchange_binding_id: string };
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
                                    admin_account?: string;
                                    exchange_account?: string;
                                    user_id?: string;
                                    status?:
                                        | "doing"
                                        | "cal_done"
                                        | "timespan_done"
                                        | "done"
                                        | "err";
                                    exchange_binding_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/exchange_bindings/:exchange_binding_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=exchange_binding&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=exchange_binding&version=v4 document }
                 *
                 * 将 Exchange 账户绑定到飞书账户
                 *
                 * 调用该接口将 Exchange 账户绑定到飞书账户，进而支持 Exchange 日历的导入。
                 *
                 * 当前身份需要是企业超级管理员。
                 */
                create: async (
                    payload?: {
                        data?: {
                            admin_account?: string;
                            exchange_account?: string;
                            user_id?: string;
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
                                    admin_account?: string;
                                    exchange_account?: string;
                                    user_id?: string;
                                    status?:
                                        | "doing"
                                        | "cal_done"
                                        | "timespan_done"
                                        | "done"
                                        | "err";
                                    exchange_binding_id: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/exchange_bindings`,
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
             * calendar.event.attendee
             */
            calendarEventAttendee: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=create_attendees&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_attendees&project=calendar&resource=calendar.event.attendee&version=v4 document }
                 */
                createAttendees: async (
                    payload?: {
                        data?: {
                            attendees?: Array<{
                                type?:
                                    | "user"
                                    | "chat"
                                    | "resource"
                                    | "third_party";
                                is_optional?: boolean;
                                user_id?: string;
                                chat_id?: string;
                                room_id?: string;
                                third_party_email?: string;
                                operate_id?: string;
                                resource_customization?: Array<{
                                    index_key: string;
                                    input_content?: string;
                                    options?: Array<{
                                        option_key?: string;
                                        others_content?: string;
                                    }>;
                                }>;
                                approval_reason?: string;
                            }>;
                            need_notification?: boolean;
                            instance_start_time_admin?: string;
                            is_enable_admin?: boolean;
                            add_operator_to_attendee?: boolean;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string; event_id: string };
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
                                    attendees?: Array<{
                                        type?:
                                            | "user"
                                            | "chat"
                                            | "resource"
                                            | "third_party";
                                        attendee_id?: string;
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                        display_name?: string;
                                        chat_members?: Array<{
                                            rsvp_status?:
                                                | "needs_action"
                                                | "accept"
                                                | "tentative"
                                                | "decline"
                                                | "removed";
                                            is_optional?: boolean;
                                            display_name?: string;
                                            is_organizer?: boolean;
                                            is_external?: boolean;
                                        }>;
                                        user_id?: string;
                                        chat_id?: string;
                                        room_id?: string;
                                        third_party_email?: string;
                                        operate_id?: string;
                                        resource_customization?: Array<{
                                            index_key: string;
                                            input_content?: string;
                                            options?: Array<{
                                                option_key?: string;
                                                others_content?: string;
                                            }>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/create_attendees`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=batch_patch&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_patch&project=calendar&resource=calendar.event.attendee&version=v4 document }
                 *
                 * 更新日程参与人
                 *
                 * 批量更新日程参与人信息。该接口不会给被更新的参与人发送消息。
                 *
                 * - 当前身份需要有日历或日程的 owner 或 writer 权限。;- 当前身份需要和日程归属同一企业。;- 该接口目前仅支持更新 个人参与人 和 邮箱参与人 的信息。;- 使用该接口更新 个人参与人 信息时，不支持更新其他企业下的参与人信息。;- 单次最多可更新 200 名参与人的信息。
                 */
                batchPatch: async (
                    payload?: {
                        data?: {
                            attendees?: Array<{
                                attendee_id?: string;
                                rsvp_status?:
                                    | "needs_action"
                                    | "accept"
                                    | "tentative"
                                    | "decline"
                                    | "removed";
                                is_optional?: boolean;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string; event_id: string };
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
                                    attendees?: Array<{
                                        type?:
                                            | "user"
                                            | "chat"
                                            | "resource"
                                            | "third_party";
                                        attendee_id?: string;
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                        display_name?: string;
                                        chat_members?: Array<{
                                            rsvp_status?:
                                                | "needs_action"
                                                | "accept"
                                                | "tentative"
                                                | "decline"
                                                | "removed";
                                            is_optional?: boolean;
                                            display_name?: string;
                                            is_organizer?: boolean;
                                            is_external?: boolean;
                                        }>;
                                        user_id?: string;
                                        chat_id?: string;
                                        room_id?: string;
                                        third_party_email?: string;
                                        operate_id?: string;
                                        resource_customization?: Array<{
                                            index_key: string;
                                            input_content?: string;
                                            options?: Array<{
                                                option_key?: string;
                                                others_content?: string;
                                            }>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/batch_patch`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=batch_delete&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=calendar&resource=calendar.event.attendee&version=v4 document }
                 *
                 * 删除日程参与人
                 *
                 * 调用该接口以当前身份（应用或用户）删除指定日程的一个或多个参与人。
                 */
                batchDelete: async (
                    payload?: {
                        data?: {
                            attendee_ids?: Array<string>;
                            delete_ids?: Array<{
                                type?:
                                    | "user"
                                    | "chat"
                                    | "resource"
                                    | "third_party";
                                user_id?: string;
                                chat_id?: string;
                                room_id?: string;
                                third_party_email?: string;
                            }>;
                            need_notification?: boolean;
                            instance_start_time_admin?: string;
                            is_enable_admin?: boolean;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string; event_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/batch_delete`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=calendar.event.attendee&version=v4 document }
                 *
                 * 添加日程参与人
                 *
                 * 调用该接口以当前身份（应用或用户）为指定日程添加一个或多个参与人，参与人类型包括用户、群组、会议室以及邮箱。
                 *
                 * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份需要有日历的 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取日历类型以及当前身份对该日历的访问权限。;- 当前身份需要是日程的组织者，或者是日程参与人且确保日程设置了**参与人可邀请其它参与人**权限。你可以调用[获取日程](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/get)接口，获取日程的参与人权限（attendee_ability）。;- 新添加的日程参与人必须与日程组织者在同一个企业内。;- 每个日程最多只能有 3000 名参与人。;- 使用该接口添加会议室后，会议室会进入异步的预约流程，即请求结束不代表会议室预约成功，需后续再查询会议室的预约状态。;- 开启会议室管理员能力后，管理员预约会议室可不受会议室预约范围的限制（当前不支持用管理员身份给其他成员的日程预约会议室）。
                 */
                create: async (
                    payload?: {
                        data?: {
                            attendees?: Array<{
                                type?:
                                    | "user"
                                    | "chat"
                                    | "resource"
                                    | "third_party";
                                is_optional?: boolean;
                                user_id?: string;
                                chat_id?: string;
                                room_id?: string;
                                third_party_email?: string;
                                operate_id?: string;
                                resource_customization?: Array<{
                                    index_key: string;
                                    input_content?: string;
                                    options?: Array<{
                                        option_key?: string;
                                        others_content?: string;
                                    }>;
                                }>;
                                approval_reason?: string;
                            }>;
                            need_notification?: boolean;
                            instance_start_time_admin?: string;
                            is_enable_admin?: boolean;
                            add_operator_to_attendee?: boolean;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string; event_id: string };
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
                                    attendees?: Array<{
                                        type?:
                                            | "user"
                                            | "chat"
                                            | "resource"
                                            | "third_party";
                                        attendee_id?: string;
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                        display_name?: string;
                                        chat_members?: Array<{
                                            rsvp_status?:
                                                | "needs_action"
                                                | "accept"
                                                | "tentative"
                                                | "decline"
                                                | "removed";
                                            is_optional?: boolean;
                                            display_name?: string;
                                            is_organizer?: boolean;
                                            is_external?: boolean;
                                        }>;
                                        user_id?: string;
                                        chat_id?: string;
                                        room_id?: string;
                                        third_party_email?: string;
                                        operate_id?: string;
                                        resource_customization?: Array<{
                                            index_key: string;
                                            input_content?: string;
                                            options?: Array<{
                                                option_key?: string;
                                                others_content?: string;
                                            }>;
                                        }>;
                                        approval_reason?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees`,
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
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            need_resource_customization?: boolean;
                            page_token?: string;
                            page_size?: number;
                            op_user_id?: string;
                        };
                        path: { calendar_id: string; event_id: string };
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
                                    `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees`,
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
                                                        type?:
                                                            | "user"
                                                            | "chat"
                                                            | "resource"
                                                            | "third_party";
                                                        attendee_id?: string;
                                                        rsvp_status?:
                                                            | "needs_action"
                                                            | "accept"
                                                            | "tentative"
                                                            | "decline"
                                                            | "removed";
                                                        is_optional?: boolean;
                                                        is_organizer?: boolean;
                                                        is_external?: boolean;
                                                        display_name?: string;
                                                        chat_members?: Array<{
                                                            rsvp_status?:
                                                                | "needs_action"
                                                                | "accept"
                                                                | "tentative"
                                                                | "decline"
                                                                | "removed";
                                                            is_optional?: boolean;
                                                            display_name?: string;
                                                            is_organizer?: boolean;
                                                            is_external?: boolean;
                                                        }>;
                                                        user_id?: string;
                                                        chat_id?: string;
                                                        room_id?: string;
                                                        third_party_email?: string;
                                                        operate_id?: string;
                                                        resource_customization?: Array<{
                                                            index_key: string;
                                                            input_content?: string;
                                                            options?: Array<{
                                                                option_key?: string;
                                                                others_content?: string;
                                                            }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=calendar&resource=calendar.event.attendee&version=v4 document }
                 *
                 * 获取日程参与人列表
                 *
                 * 调用该接口以当前身份（应用或用户）获取日程的参与人列表。
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            need_resource_customization?: boolean;
                            page_token?: string;
                            page_size?: number;
                            op_user_id?: string;
                        };
                        path: { calendar_id: string; event_id: string };
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
                                        type?:
                                            | "user"
                                            | "chat"
                                            | "resource"
                                            | "third_party";
                                        attendee_id?: string;
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                        display_name?: string;
                                        chat_members?: Array<{
                                            rsvp_status?:
                                                | "needs_action"
                                                | "accept"
                                                | "tentative"
                                                | "decline"
                                                | "removed";
                                            is_optional?: boolean;
                                            display_name?: string;
                                            is_organizer?: boolean;
                                            is_external?: boolean;
                                        }>;
                                        user_id?: string;
                                        chat_id?: string;
                                        room_id?: string;
                                        third_party_email?: string;
                                        operate_id?: string;
                                        resource_customization?: Array<{
                                            index_key: string;
                                            input_content?: string;
                                            options?: Array<{
                                                option_key?: string;
                                                others_content?: string;
                                            }>;
                                        }>;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees`,
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
             * file
             */
            file: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=file&apiName=upload&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=calendar&resource=file&version=v4 document }
                 *
                 * 上传文件
                 */
                upload: async (
                    payload?: {
                        data: {
                            calendar_id: string;
                            event_id?: string;
                            file_name: string;
                            file_path: string;
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
                                data?: { file_token?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/file/upload`,
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
                    return res?.data || null;
                },
            },
            /**
             * calendar
             */
            calendar: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=subscription&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=calendar&resource=calendar&version=v4 document }
                 *
                 * 订阅日历变更事件
                 *
                 * 调用该接口为当前用户身份订阅[日历变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/events/changed)。
                 */
                subscription: async (
                    payload?: {},
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
                                `${this.domain}/open-apis/calendar/v4/calendars/subscription`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=get&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=calendar&resource=calendar&version=v4 document }
                 *
                 * 查询日历信息
                 *
                 * 调用该接口以当前身份（应用或用户）查询指定日历的信息。
                 *
                 * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 使用应用身份调用该接口前，需要确保该应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份必须对日历有访问权限。
                 */
                get: async (
                    payload?: {
                        path: { calendar_id: string };
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
                                    calendar_id: string;
                                    summary?: string;
                                    description?: string;
                                    permissions?:
                                        | "private"
                                        | "show_only_free_busy"
                                        | "public";
                                    color?: number;
                                    type?:
                                        | "unknown"
                                        | "primary"
                                        | "shared"
                                        | "google"
                                        | "resource"
                                        | "exchange";
                                    summary_alias?: string;
                                    is_deleted?: boolean;
                                    is_third_party?: boolean;
                                    role?:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=delete&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=calendar&resource=calendar&version=v4 document }
                 *
                 * 删除共享日历
                 *
                 * 调用该接口以当前身份（应用或用户）删除某一指定的共享日历。
                 *
                 * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份必须对日历有 owner 权限才可以删除。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，通过响应字段 role 查看当前身份对日历的权限。
                 */
                delete: async (
                    payload?: {
                        path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=unsubscribe&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscribe&project=calendar&resource=calendar&version=v4 document }
                 *
                 * 取消订阅日历
                 *
                 * 调用该接口以当前身份（应用或用户）取消指定日历的订阅状态。
                 *
                 * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 仅可操作已经被当前身份订阅的日历。
                 */
                unsubscribe: async (
                    payload?: {
                        path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/unsubscribe`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=unsubscription&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscription&project=calendar&resource=calendar&version=v4 document }
                 *
                 * 取消订阅日历变更事件
                 *
                 * 调用该接口为当前用户身份取消订阅[日历变更事件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/events/changed)。
                 */
                unsubscription: async (
                    payload?: {},
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
                                `${this.domain}/open-apis/calendar/v4/calendars/unsubscription`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=calendar&resource=calendar&version=v4 document }
                 *
                 * 查询日历列表
                 *
                 * 调用该接口分页查询当前身份（应用或用户）的日历列表。
                 *
                 * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 调用该接口时，首先需要使用 page_token 分页查询存量的日历列表，然后再使用 sync_token 增量同步日历的变更数据。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            sync_token?: string;
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
                                    sync_token?: string;
                                    calendar_list?: Array<{
                                        calendar_id: string;
                                        summary?: string;
                                        description?: string;
                                        permissions?:
                                            | "private"
                                            | "show_only_free_busy"
                                            | "public";
                                        color?: number;
                                        type?:
                                            | "unknown"
                                            | "primary"
                                            | "shared"
                                            | "google"
                                            | "resource"
                                            | "exchange";
                                        summary_alias?: string;
                                        is_deleted?: boolean;
                                        is_third_party?: boolean;
                                        role?:
                                            | "unknown"
                                            | "free_busy_reader"
                                            | "reader"
                                            | "writer"
                                            | "owner";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars`,
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
                searchWithIterator: async (
                    payload?: {
                        data: { query: string };
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
                                    `${this.domain}/open-apis/calendar/v4/calendars/search`,
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
                                                    items?: Array<{
                                                        calendar_id: string;
                                                        summary?: string;
                                                        description?: string;
                                                        permissions?:
                                                            | "private"
                                                            | "show_only_free_busy"
                                                            | "public";
                                                        color?: number;
                                                        type?:
                                                            | "unknown"
                                                            | "primary"
                                                            | "shared"
                                                            | "google"
                                                            | "resource"
                                                            | "exchange";
                                                        summary_alias?: string;
                                                        is_deleted?: boolean;
                                                        is_third_party?: boolean;
                                                        role?:
                                                            | "unknown"
                                                            | "free_busy_reader"
                                                            | "reader"
                                                            | "writer"
                                                            | "owner";
                                                    }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=search&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=calendar&resource=calendar&version=v4 document }
                 *
                 * 搜索日历
                 *
                 * 调用该接口通过关键字搜索日历，搜索结果为标题或描述包含关键字的公共日历或用户主日历。
                 *
                 * - 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 应用身份不支持搜索用户主日历。
                 */
                search: async (
                    payload?: {
                        data: { query: string };
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
                                    items?: Array<{
                                        calendar_id: string;
                                        summary?: string;
                                        description?: string;
                                        permissions?:
                                            | "private"
                                            | "show_only_free_busy"
                                            | "public";
                                        color?: number;
                                        type?:
                                            | "unknown"
                                            | "primary"
                                            | "shared"
                                            | "google"
                                            | "resource"
                                            | "exchange";
                                        summary_alias?: string;
                                        is_deleted?: boolean;
                                        is_third_party?: boolean;
                                        role?:
                                            | "unknown"
                                            | "free_busy_reader"
                                            | "reader"
                                            | "writer"
                                            | "owner";
                                    }>;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=subscribe&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscribe&project=calendar&resource=calendar&version=v4 document }
                 *
                 * 订阅日历
                 *
                 * 调用该接口以当前身份（应用或用户）订阅指定的日历。
                 *
                 * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 仅可订阅以下属性的日历，你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，查看指定日历的属性。; - 日历类型（type）为 shared 或者 primary。; - 日历公开范围（permissions）为 public 或者 show_only_free_busy。;- 不允许订阅机器人的主日历。;- 当前身份可订阅的日历数量上限为 1000。
                 */
                subscribe: async (
                    payload?: {
                        path: { calendar_id: string };
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
                                    calendar?: {
                                        calendar_id: string;
                                        summary?: string;
                                        description?: string;
                                        permissions?:
                                            | "private"
                                            | "show_only_free_busy"
                                            | "public";
                                        color?: number;
                                        type?:
                                            | "unknown"
                                            | "primary"
                                            | "shared"
                                            | "google"
                                            | "resource"
                                            | "exchange";
                                        summary_alias?: string;
                                        is_deleted?: boolean;
                                        is_third_party?: boolean;
                                        role?:
                                            | "unknown"
                                            | "free_busy_reader"
                                            | "reader"
                                            | "writer"
                                            | "owner";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/subscribe`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=calendar&version=v4 document }
                 *
                 * 创建共享日历
                 *
                 * 调用该接口为当前身份（应用或用户）创建一个共享日历。
                 *
                 * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 调用该接口创建共享日历时，当前身份会自动订阅该日历。单个身份可订阅的日历数量上限为 1000。
                 */
                create: async (
                    payload?: {
                        data?: {
                            summary?: string;
                            description?: string;
                            permissions?:
                                | "private"
                                | "show_only_free_busy"
                                | "public";
                            color?: number;
                            summary_alias?: string;
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
                                    calendar?: {
                                        calendar_id: string;
                                        summary?: string;
                                        description?: string;
                                        permissions?:
                                            | "private"
                                            | "show_only_free_busy"
                                            | "public";
                                        color?: number;
                                        type?:
                                            | "unknown"
                                            | "primary"
                                            | "shared"
                                            | "google"
                                            | "resource"
                                            | "exchange";
                                        summary_alias?: string;
                                        is_deleted?: boolean;
                                        is_third_party?: boolean;
                                        role?:
                                            | "unknown"
                                            | "free_busy_reader"
                                            | "reader"
                                            | "writer"
                                            | "owner";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=patch&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=calendar&resource=calendar&version=v4 document }
                 *
                 * 更新日历信息
                 *
                 * 调用该接口以当前身份（应用或用户）修改指定日历的标题、描述、公开范围等信息。
                 *
                 * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 如果当前身份具有日历的 owner 访问权限，则可以更新日历的所有属性（包括全局生效的 summary、description、permission 和仅对当前身份生效的 color、summary_alias）。;- 如果当前身份不具有日历的 owner 访问权限，则只能更新对当前身份生效的 color、summary_alias。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，查看当前身份对日历的访问权限。;- 会议室日历不支持设置备注。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            summary?: string;
                            description?: string;
                            permissions?:
                                | "private"
                                | "show_only_free_busy"
                                | "public";
                            color?: number;
                            summary_alias?: string;
                        };
                        path: { calendar_id: string };
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
                                    calendar?: {
                                        calendar_id: string;
                                        summary?: string;
                                        description?: string;
                                        permissions?:
                                            | "private"
                                            | "show_only_free_busy"
                                            | "public";
                                        color?: number;
                                        type?:
                                            | "unknown"
                                            | "primary"
                                            | "shared"
                                            | "google"
                                            | "resource"
                                            | "exchange";
                                        summary_alias?: string;
                                        is_deleted?: boolean;
                                        is_third_party?: boolean;
                                        role?:
                                            | "unknown"
                                            | "free_busy_reader"
                                            | "reader"
                                            | "writer"
                                            | "owner";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=mget&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=calendar&resource=calendar&version=v4 document }
                 *
                 * 批量查询日历信息
                 *
                 * 调用该接口批量查询指定日历的标题、描述、公开范围等信息。
                 *
                 * - 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份必须对日历有访问权限。
                 */
                mget: async (
                    payload?: {
                        data: { calendar_ids: Array<string> };
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
                                    calendars?: Array<{
                                        calendar_id: string;
                                        summary?: string;
                                        description?: string;
                                        permissions?:
                                            | "private"
                                            | "show_only_free_busy"
                                            | "public";
                                        color?: number;
                                        type?:
                                            | "unknown"
                                            | "primary"
                                            | "shared"
                                            | "google"
                                            | "resource"
                                            | "exchange";
                                        summary_alias?: string;
                                        is_deleted?: boolean;
                                        is_third_party?: boolean;
                                        role?:
                                            | "unknown"
                                            | "free_busy_reader"
                                            | "reader"
                                            | "writer"
                                            | "owner";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/mget`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=primarys&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=primarys&project=calendar&resource=calendar&version=v4 document }
                 *
                 * 批量获取主日历信息
                 *
                 * 根据user id列表批量查询指定用户的主日历信息。
                 */
                primarys: async (
                    payload?: {
                        data: { user_ids: Array<string> };
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
                                    calendars?: Array<{
                                        calendar?: {
                                            calendar_id: string;
                                            summary?: string;
                                            description?: string;
                                            permissions?:
                                                | "private"
                                                | "show_only_free_busy"
                                                | "public";
                                            color?: number;
                                            type?:
                                                | "unknown"
                                                | "primary"
                                                | "shared"
                                                | "google"
                                                | "resource"
                                                | "exchange";
                                            summary_alias?: string;
                                            is_deleted?: boolean;
                                            is_third_party?: boolean;
                                            role?:
                                                | "unknown"
                                                | "free_busy_reader"
                                                | "reader"
                                                | "writer"
                                                | "owner";
                                        };
                                        user_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/primarys`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar&apiName=primary&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=primary&project=calendar&resource=calendar&version=v4 document }
                 *
                 * 查询主日历信息
                 *
                 * 调用该接口获取当前身份（应用或用户）的主日历信息。
                 *
                 * **说明**;;- 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 使用应用身份调用该接口前，需要确保该应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 使用应用身份调用该接口时，查询参数 user_id_type 不能设置为 user_id。你可以选择 open_id 或者 union_id，在返回结果中，user_id 参数值会包含应用机器人对应的 open_id 或 union_id。
                 */
                primary: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            op_user_id?: string;
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
                                    calendars?: Array<{
                                        calendar?: {
                                            calendar_id: string;
                                            summary?: string;
                                            description?: string;
                                            permissions?:
                                                | "private"
                                                | "show_only_free_busy"
                                                | "public";
                                            color?: number;
                                            type?:
                                                | "unknown"
                                                | "primary"
                                                | "shared"
                                                | "google"
                                                | "resource"
                                                | "exchange";
                                            summary_alias?: string;
                                            is_deleted?: boolean;
                                            is_third_party?: boolean;
                                            role?:
                                                | "unknown"
                                                | "free_busy_reader"
                                                | "reader"
                                                | "writer"
                                                | "owner";
                                        };
                                        user_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/primary`,
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
             * freebusy
             */
            freebusy: {
                batchGetWithIterator: async (
                    payload?: {
                        data: {
                            time_min: string;
                            time_max: string;
                            calendar_ids: Array<string>;
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
                                    `${this.domain}/open-apis/calendar/v4/freebusy/batch_get`,
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
                                                    error_calendar_list?: Array<{
                                                        calendar_id: string;
                                                        error_msg: string;
                                                    }>;
                                                    freebusy_list?: Array<{
                                                        start_time: string;
                                                        end_time: string;
                                                        calendar_id: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=freebusy&apiName=batch_get&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get&project=calendar&resource=freebusy&version=v4 document }
                 */
                batchGet: async (
                    payload?: {
                        data: {
                            time_min: string;
                            time_max: string;
                            calendar_ids: Array<string>;
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
                                    error_calendar_list?: Array<{
                                        calendar_id: string;
                                        error_msg: string;
                                    }>;
                                    freebusy_list?: Array<{
                                        start_time: string;
                                        end_time: string;
                                        calendar_id: string;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/freebusy/batch_get`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=freebusy&apiName=batch&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch&project=calendar&resource=freebusy&version=v4 document }
                 *
                 * 批量查询主日历日程忙闲信息
                 *
                 * 根据user id列表，批量查询指定用户的主日历在指定时间段内的忙碌时间段信息，适用于团队协作中，快速了解成员忙闲状态以安排会议或任务的场景。
                 *
                 * 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。
                 */
                batch: async (
                    payload?: {
                        data: {
                            time_min: string;
                            time_max: string;
                            user_ids: Array<string>;
                            include_external_calendar?: boolean;
                            only_busy?: boolean;
                            need_rsvp_status?: boolean;
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
                                    freebusy_lists?: Array<{
                                        freebusy_items?: Array<{
                                            start_time: string;
                                            end_time: string;
                                            rsvp_status?:
                                                | "needs_action"
                                                | "accept"
                                                | "tentative"
                                                | "decline"
                                                | "removed";
                                        }>;
                                        user_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/freebusy/batch`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=freebusy&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=calendar&resource=freebusy&version=v4 document }
                 *
                 * 查询主日历日程忙闲信息
                 *
                 * 调用该接口查询指定用户的主日历忙闲信息，或者查询指定会议室的忙闲信息。
                 *
                 * 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。
                 */
                list: async (
                    payload?: {
                        data: {
                            time_min: string;
                            time_max: string;
                            user_id?: string;
                            room_id?: string;
                            include_external_calendar?: boolean;
                            only_busy?: boolean;
                            need_rsvp_status?: boolean;
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
                                    freebusy_list?: Array<{
                                        start_time: string;
                                        end_time: string;
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/freebusy/list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=freebusy&apiName=suggestion&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=suggestion&project=calendar&resource=freebusy&version=v4 document }
                 *
                 * 给定期望的时间范围，结合用户、群成员的忙闲和预约习惯，推荐合适的日程预约时间段方案。
                 */
                suggestion: async (
                    payload?: {
                        data: {
                            search_start_time: string;
                            search_end_time: string;
                            timezone?: string;
                            event_rrule?: string;
                            duration_minutes?: number;
                            meeting_type?: "life" | "work";
                            attendee_user_ids?: Array<string>;
                            attendee_chat_ids?: Array<string>;
                            excluded_event_times?: Array<{
                                event_start_time?: string;
                                event_end_time?: string;
                            }>;
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
                                    suggestions?: Array<{
                                        event_start_time?: string;
                                        event_end_time?: string;
                                        recommend_reason?: string;
                                    }>;
                                    ai_action_guidance?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/freebusy/suggestion`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=freebusy&apiName=room_find&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=room_find&project=calendar&resource=freebusy&version=v4 document }
                 *
                 * 给定期望的日程时间，结合用户、群成员的会议室约定习惯，推荐合适的可用会议室列表。
                 */
                roomFind: async (
                    payload?: {
                        data: {
                            query?: string;
                            min_capacity?: number;
                            max_capacity?: number;
                            event_start_time: string;
                            event_end_time: string;
                            timezone?: string;
                            event_rrule?: string;
                            attendee_user_ids?: Array<string>;
                            attendee_chat_ids?: Array<string>;
                            city?: string;
                            building?: string;
                            floor?: string;
                            room_name?: string;
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
                                    available_rooms?: Array<{
                                        room_id?: string;
                                        room_name?: string;
                                        full_name?: string;
                                        capacity?: number;
                                        reserve_until_time?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/freebusy/room_find`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=freebusy&apiName=room_availability_check&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=room_availability_check&project=calendar&resource=freebusy&version=v4 document }
                 *
                 * 对于给定的日程时间，判断传入的会议室是否能够预定成功
                 */
                roomAvailabilityCheck: async (
                    payload?: {
                        data: {
                            calendar_id?: string;
                            event_id?: string;
                            start_time: string;
                            end_time: string;
                            start_timezone: string;
                            event_rrule?: string;
                            room_ids: Array<string>;
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
                                    room_availabilitys?: Array<{
                                        room_id?: string;
                                        room_name?: string;
                                        status?:
                                            | "available"
                                            | "unavailable"
                                            | "need_approval";
                                        unavailable_reason_type?:
                                            | "unknown"
                                            | "reserved_by_other_event"
                                            | "past_time"
                                            | "beyond_advance_booking_window"
                                            | "over_max_duration"
                                            | "not_in_usable_time"
                                            | "during_requisition"
                                            | "before_daily_advance_window_release"
                                            | "recurring_exceed_approval_limit";
                                        room_strategy?: {
                                            timezone?: string;
                                            single_max_duration?: string;
                                            max_advance_booking_time?: string;
                                            daily_start_time?: string;
                                            daily_end_time?: string;
                                            daily_advance_window_release_time?: string;
                                        };
                                        room_requisition?: {
                                            start_time?: string;
                                            end_time?: string;
                                        };
                                        room_approval_info?: {
                                            approval_mode?:
                                                | "none"
                                                | "over_duration"
                                                | "all";
                                            approval_duration_threshold?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/freebusy/room_availability_check`,
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
             * workhour_setting
             */
            workhourSetting: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=workhour_setting&apiName=mget&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=calendar&resource=workhour_setting&version=v4 document }
                 *
                 * 批量查询用户工作时间设置
                 *
                 * 调用该接口批量查询指定用户设置的工作时间信息。
                 *
                 * 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。
                 */
                mget: async (
                    payload?: {
                        data: { user_ids: Array<string> };
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
                                        timezone?: string;
                                        workhours?: Array<{
                                            day_of_week: number;
                                            start_time: number;
                                            end_time: number;
                                        }>;
                                        enable_work_hour: boolean;
                                        user_id: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/workhour_setting/mget`,
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
             * calendar.acl
             */
            calendarAcl: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=unsubscription&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscription&project=calendar&resource=calendar.acl&version=v4 document }
                 *
                 * 取消订阅日历访问控制变更事件
                 *
                 * 调用该接口以用户身份取消订阅指定日历下的访问控制变更事件。
                 *
                 * 用户必须对日历有访问权限。
                 */
                unsubscription: async (
                    payload?: {
                        path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls/unsubscription`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=subscription&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=calendar&resource=calendar.acl&version=v4 document }
                 *
                 * 订阅日历访问控制变更事件;
                 *
                 * 调用该接口以用户身份订阅指定日历下的访问控制变更事件。
                 *
                 * 当前用户身份必须对日历有访问权限。
                 */
                subscription: async (
                    payload?: {
                        path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls/subscription`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=delete&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=calendar&resource=calendar.acl&version=v4 document }
                 *
                 * 删除访问控制
                 *
                 * 调用该接口以当前身份（应用或用户）删除指定日历内的某一访问控制，即成员权限。
                 *
                 * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份需要有日历的 owner 权限，并且日历的类型只能为 primary 或 shared。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取日历类型以及当前身份对该日历的访问权限。
                 */
                delete: async (
                    payload?: {
                        path: { calendar_id: string; acl_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls/:acl_id`,
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
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { calendar_id: string };
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
                                    `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls`,
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
                                                    acls?: Array<{
                                                        acl_id: string;
                                                        role:
                                                            | "unknown"
                                                            | "free_busy_reader"
                                                            | "reader"
                                                            | "writer"
                                                            | "owner";
                                                        scope: {
                                                            type: "user";
                                                            user_id?: string;
                                                        };
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=calendar&resource=calendar.acl&version=v4 document }
                 *
                 * 获取访问控制列表
                 *
                 * 调用该接口以当前身份（应用或用户）获取指定日历的访问控制列表。
                 *
                 * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份需要有日历的 owner 权限，并且日历的类型只能为 primary 或 shared。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取日历类型以及当前身份对该日历的访问权限。
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { calendar_id: string };
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
                                    acls?: Array<{
                                        acl_id: string;
                                        role:
                                            | "unknown"
                                            | "free_busy_reader"
                                            | "reader"
                                            | "writer"
                                            | "owner";
                                        scope: {
                                            type: "user";
                                            user_id?: string;
                                        };
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.acl&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=calendar.acl&version=v4 document }
                 *
                 * 创建访问控制
                 *
                 * 调用该接口以当前身份（应用或用户）为指定日历添加访问控制，即日历成员权限。
                 *
                 * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份需要有日历的 owner 权限，并且日历的类型只能为 primary 或 shared。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取日历类型以及当前身份对该日历的访问权限。
                 */
                create: async (
                    payload?: {
                        data: {
                            role:
                                | "unknown"
                                | "free_busy_reader"
                                | "reader"
                                | "writer"
                                | "owner";
                            scope: { type: "user"; user_id?: string };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string };
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
                                    acl_id: string;
                                    role:
                                        | "unknown"
                                        | "free_busy_reader"
                                        | "reader"
                                        | "writer"
                                        | "owner";
                                    scope: { type: "user"; user_id?: string };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/acls`,
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
             * calendar.event
             */
            calendarEvent: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=delete&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=calendar&resource=calendar.event&version=v4 document }
                 *
                 * 删除日程
                 *
                 * 调用该接口以当前身份（应用或用户）删除指定日历上的一个日程。
                 *
                 * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份必须对日历有 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取日历类型以及当前身份对该日历的访问权限。;- 当前身份必须是日程的组织者。
                 */
                delete: async (
                    payload?: {
                        params?: { need_notification?: "true" | "false" };
                        path: { calendar_id: string; event_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=reply&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reply&project=calendar&resource=calendar.event&version=v4 document }
                 *
                 * 回复日程
                 *
                 * 调用该接口以当前身份（应用或用户）回复日程。
                 *
                 * 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。
                 */
                reply: async (
                    payload?: {
                        data: {
                            rsvp_status: "accept" | "decline" | "tentative";
                        };
                        path: { calendar_id: string; event_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/reply`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=mget_meeting_chat&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget_meeting_chat&project=calendar&resource=calendar.event&version=v4 document }
                 *
                 * 批量获取会议群
                 */
                mgetMeetingChat: async (
                    payload?: {
                        data?: { event_ids?: Array<string> };
                        path: { calendar_id: string };
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
                                    meeting_chats?: Array<{
                                        event_id?: string;
                                        meeting_chat_id?: string;
                                        applink?: string;
                                        meeting_chat_type?:
                                            | "meeting_chat"
                                            | "bound_chat";
                                    }>;
                                    failed_event_ids?: Array<{
                                        event_id?: string;
                                        fail_msg?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/mget_meeting_chat`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=unsubscription&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscription&project=calendar&resource=calendar.event&version=v4 document }
                 *
                 * 取消订阅日程变更事件
                 *
                 * 调用该接口以用户身份取消订阅指定日历下的日程变更事件。
                 *
                 * 当前身份必须对日历有 reader、writer 或 owner 权限。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取当前身份对该日历的访问权限。
                 */
                unsubscription: async (
                    payload?: {
                        params?: {
                            op_user_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/unsubscription`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=subscription&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=calendar&resource=calendar.event&version=v4 document }
                 *
                 * 订阅日程变更事件
                 *
                 * 调用该接口以用户身份订阅指定日历下的日程变更事件。
                 *
                 * 当前身份必须对日历有 reader、writer 或 owner 权限。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取当前身份对该日历的访问权限。
                 */
                subscription: async (
                    payload?: {
                        params?: {
                            op_user_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/subscription`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=share_info&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=share_info&project=calendar&resource=calendar.event&version=v4 document }
                 *
                 * 获取日程分享信息
                 */
                shareInfo: async (
                    payload?: {
                        path: { calendar_id: string; event_id: string };
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
                                data?: { share_link?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/share_info`,
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
                searchEventWithIterator: async (
                    payload?: {
                        data: {
                            query: string;
                            filter?: {
                                calendar_ids?: Array<string>;
                                attendee_user_ids?: Array<string>;
                                attendee_chat_ids?: Array<string>;
                                meeting_room_ids?: Array<string>;
                                time_range?: {
                                    start_time?: string;
                                    end_time?: string;
                                };
                            };
                        };
                        params?: {
                            page_token?: string;
                            page_size?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string };
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
                                    `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/search_event`,
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
                                                    has_more?: boolean;
                                                    items?: Array<{
                                                        display_info?: string;
                                                        meta_data?: {
                                                            app_link?: string;
                                                            calendar_id?: string;
                                                            event_id?: string;
                                                            start?: {
                                                                date?: string;
                                                                date_time?: string;
                                                                timezone?: string;
                                                            };
                                                            end?: {
                                                                date?: string;
                                                                date_time?: string;
                                                                timezone?: string;
                                                            };
                                                            is_all_day?: boolean;
                                                            summary?: string;
                                                        };
                                                    }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=search_event&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_event&project=calendar&resource=calendar.event&version=v4 document }
                 *
                 * 搜索日程
                 */
                searchEvent: async (
                    payload?: {
                        data: {
                            query: string;
                            filter?: {
                                calendar_ids?: Array<string>;
                                attendee_user_ids?: Array<string>;
                                attendee_chat_ids?: Array<string>;
                                meeting_room_ids?: Array<string>;
                                time_range?: {
                                    start_time?: string;
                                    end_time?: string;
                                };
                            };
                        };
                        params?: {
                            page_token?: string;
                            page_size?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string };
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
                                    items?: Array<{
                                        display_info?: string;
                                        meta_data?: {
                                            app_link?: string;
                                            calendar_id?: string;
                                            event_id?: string;
                                            start?: {
                                                date?: string;
                                                date_time?: string;
                                                timezone?: string;
                                            };
                                            end?: {
                                                date?: string;
                                                date_time?: string;
                                                timezone?: string;
                                            };
                                            is_all_day?: boolean;
                                            summary?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/search_event`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=instances&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=instances&project=calendar&resource=calendar.event&version=v4 document }
                 *
                 * 获取重复日程实例
                 *
                 * 调用该接口以当前身份（应用或用户）获取指定日历中的某一重复日程信息。
                 *
                 * 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。
                 */
                instances: async (
                    payload?: {
                        params: {
                            start_time: string;
                            end_time: string;
                            page_size?: number;
                            page_token?: string;
                        };
                        path: { calendar_id: string; event_id: string };
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
                                        event_id: string;
                                        summary?: string;
                                        description?: string;
                                        start_time?: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        end_time?: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        status?:
                                            | "tentative"
                                            | "confirmed"
                                            | "cancelled";
                                        is_exception?: boolean;
                                        app_link?: string;
                                        location?: {
                                            name?: string;
                                            address?: string;
                                            latitude?: number;
                                            longitude?: number;
                                        };
                                        description_rich?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/instances`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=patch_event&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch_event&project=calendar&resource=calendar.event&version=v4 document }
                 */
                patchEvent: async (
                    payload?: {
                        data?: {
                            summary?: string;
                            description?: string;
                            need_notification?: boolean;
                            start_time?: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            end_time?: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            vchat?: {
                                vc_type?:
                                    | "vc"
                                    | "third_party"
                                    | "no_meeting"
                                    | "lark_live"
                                    | "unknown"
                                    | "third_party_meeting";
                                icon_type?: "vc" | "live" | "default";
                                description?: string;
                                meeting_url?: string;
                                vc_info?: {
                                    unique_id: string;
                                    meeting_no: string;
                                };
                                meeting_settings?: {
                                    owner_id?: string;
                                    join_meeting_permission?:
                                        | "anyone_can_join"
                                        | "only_organization_employees"
                                        | "only_event_attendees";
                                    assign_hosts?: Array<string>;
                                    auto_record?: boolean;
                                    open_lobby?: boolean;
                                    allow_attendees_start?: boolean;
                                };
                            };
                            visibility?: "default" | "public" | "private";
                            attendee_ability?:
                                | "none"
                                | "can_see_others"
                                | "can_invite_others"
                                | "can_modify_event";
                            free_busy_status?: "busy" | "free";
                            location?: {
                                name?: string;
                                address?: string;
                                latitude?: number;
                                longitude?: number;
                            };
                            color?: number;
                            reminders?: Array<{ minutes?: number }>;
                            recurrence?: string;
                            schemas?: Array<{
                                ui_name?: string;
                                ui_status?:
                                    | "hide"
                                    | "readonly"
                                    | "editable"
                                    | "unknown";
                                app_link?: string;
                            }>;
                            attachments?: Array<{
                                file_token?: string;
                                file_size?: string;
                                is_deleted?: boolean;
                                name?: string;
                            }>;
                            event_check_in?: {
                                enable_check_in: boolean;
                                check_in_start_time?: {
                                    time_type:
                                        | "before_event_start"
                                        | "after_event_start"
                                        | "after_event_end";
                                    duration: number;
                                };
                                check_in_end_time?: {
                                    time_type:
                                        | "before_event_start"
                                        | "after_event_start"
                                        | "after_event_end";
                                    duration: number;
                                };
                                need_notify_attendees?: boolean;
                            };
                            source?: string;
                            self_rsvp_status?:
                                | "needs_action"
                                | "accept"
                                | "tentative"
                                | "decline"
                                | "removed";
                            description_rich?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string; event_id: string };
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
                                    event?: {
                                        event_id: string;
                                        organizer_calendar_id?: string;
                                        summary?: string;
                                        description?: string;
                                        start_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        end_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        vchat?: {
                                            vc_type?:
                                                | "vc"
                                                | "third_party"
                                                | "no_meeting"
                                                | "lark_live"
                                                | "unknown"
                                                | "third_party_meeting";
                                            icon_type?:
                                                | "vc"
                                                | "live"
                                                | "default";
                                            description?: string;
                                            meeting_url?: string;
                                            live_link?: string;
                                            meeting_settings?: {
                                                owner_id?: string;
                                                join_meeting_permission?:
                                                    | "anyone_can_join"
                                                    | "only_organization_employees"
                                                    | "only_event_attendees";
                                                assign_hosts?: Array<string>;
                                                auto_record?: boolean;
                                                open_lobby?: boolean;
                                                allow_attendees_start?: boolean;
                                            };
                                            third_party_meeting_settings?: {
                                                meeting_type?: string;
                                                meeting_id?: string;
                                                meeting_no?: string;
                                                password?: string;
                                                meeting_descriptions?: Array<{
                                                    lang?: string;
                                                    description?: string;
                                                }>;
                                            };
                                        };
                                        visibility?:
                                            | "default"
                                            | "public"
                                            | "private";
                                        attendee_ability?:
                                            | "none"
                                            | "can_see_others"
                                            | "can_invite_others"
                                            | "can_modify_event";
                                        free_busy_status?: "busy" | "free";
                                        location?: {
                                            name?: string;
                                            address?: string;
                                            latitude?: number;
                                            longitude?: number;
                                        };
                                        color?: number;
                                        reminders?: Array<{ minutes?: number }>;
                                        recurrence?: string;
                                        status?:
                                            | "tentative"
                                            | "confirmed"
                                            | "cancelled";
                                        is_exception?: boolean;
                                        recurring_event_id?: string;
                                        create_time?: string;
                                        schemas?: Array<{
                                            ui_name?: string;
                                            ui_status?:
                                                | "hide"
                                                | "readonly"
                                                | "editable"
                                                | "unknown";
                                            app_link?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/patch_event`,
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
                searchWithIterator: async (
                    payload?: {
                        data: {
                            query: string;
                            filter?: {
                                start_time?: {
                                    date?: string;
                                    timestamp?: string;
                                    timezone?: string;
                                };
                                end_time?: {
                                    date?: string;
                                    timestamp?: string;
                                    timezone?: string;
                                };
                                user_ids?: Array<string>;
                                room_ids?: Array<string>;
                                chat_ids?: Array<string>;
                            };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { calendar_id: string };
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
                                    `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/search`,
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
                                                    items?: Array<{
                                                        event_id: string;
                                                        organizer_calendar_id?: string;
                                                        summary?: string;
                                                        description?: string;
                                                        start_time: {
                                                            date?: string;
                                                            timestamp?: string;
                                                            timezone?: string;
                                                        };
                                                        end_time: {
                                                            date?: string;
                                                            timestamp?: string;
                                                            timezone?: string;
                                                        };
                                                        visibility?:
                                                            | "default"
                                                            | "public"
                                                            | "private";
                                                        attendee_ability?:
                                                            | "none"
                                                            | "can_see_others"
                                                            | "can_invite_others"
                                                            | "can_modify_event";
                                                        free_busy_status?:
                                                            | "busy"
                                                            | "free";
                                                        location?: {
                                                            name?: string;
                                                            address?: string;
                                                            latitude?: number;
                                                            longitude?: number;
                                                        };
                                                        color?: number;
                                                        reminders?: Array<{
                                                            minutes?: number;
                                                        }>;
                                                        recurrence?: string;
                                                        status?:
                                                            | "tentative"
                                                            | "confirmed"
                                                            | "cancelled";
                                                        is_exception?: boolean;
                                                        recurring_event_id?: string;
                                                        event_organizer?: {
                                                            user_id?: string;
                                                            display_name?: string;
                                                        };
                                                        app_link?: string;
                                                        attachments?: Array<{
                                                            file_token?: string;
                                                            file_size?: string;
                                                            is_deleted?: boolean;
                                                            name?: string;
                                                        }>;
                                                        source?: string;
                                                        self_rsvp_status?:
                                                            | "needs_action"
                                                            | "accept"
                                                            | "tentative"
                                                            | "decline"
                                                            | "removed";
                                                        description_rich?: string;
                                                    }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=search&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=calendar&resource=calendar.event&version=v4 document }
                 *
                 * 搜索日程
                 *
                 * 调用该接口搜索指定日历下的相关日程，支持关键词搜索、过滤条件搜索。
                 *
                 * ## 注意事项;;适用于主日历和共享日历，且当前身份必须对日历有 reader、writer 或 owner 权限。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取当前身份对日历的访问权限。
                 */
                search: async (
                    payload?: {
                        data: {
                            query: string;
                            filter?: {
                                start_time?: {
                                    date?: string;
                                    timestamp?: string;
                                    timezone?: string;
                                };
                                end_time?: {
                                    date?: string;
                                    timestamp?: string;
                                    timezone?: string;
                                };
                                user_ids?: Array<string>;
                                room_ids?: Array<string>;
                                chat_ids?: Array<string>;
                            };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { calendar_id: string };
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
                                        event_id: string;
                                        organizer_calendar_id?: string;
                                        summary?: string;
                                        description?: string;
                                        start_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        end_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        visibility?:
                                            | "default"
                                            | "public"
                                            | "private";
                                        attendee_ability?:
                                            | "none"
                                            | "can_see_others"
                                            | "can_invite_others"
                                            | "can_modify_event";
                                        free_busy_status?: "busy" | "free";
                                        location?: {
                                            name?: string;
                                            address?: string;
                                            latitude?: number;
                                            longitude?: number;
                                        };
                                        color?: number;
                                        reminders?: Array<{ minutes?: number }>;
                                        recurrence?: string;
                                        status?:
                                            | "tentative"
                                            | "confirmed"
                                            | "cancelled";
                                        is_exception?: boolean;
                                        recurring_event_id?: string;
                                        event_organizer?: {
                                            user_id?: string;
                                            display_name?: string;
                                        };
                                        app_link?: string;
                                        attachments?: Array<{
                                            file_token?: string;
                                            file_size?: string;
                                            is_deleted?: boolean;
                                            name?: string;
                                        }>;
                                        source?: string;
                                        self_rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        description_rich?: string;
                                    }>;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=create_event&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_event&project=calendar&resource=calendar.event&version=v4 document }
                 */
                createEvent: async (
                    payload?: {
                        data: {
                            summary?: string;
                            description?: string;
                            need_notification?: boolean;
                            start_time: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            end_time: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            vchat?: {
                                vc_type?:
                                    | "vc"
                                    | "third_party"
                                    | "no_meeting"
                                    | "lark_live"
                                    | "unknown"
                                    | "third_party_meeting";
                                icon_type?: "vc" | "live" | "default";
                                description?: string;
                                meeting_url?: string;
                                vc_info?: {
                                    unique_id: string;
                                    meeting_no: string;
                                };
                                meeting_settings?: {
                                    owner_id?: string;
                                    join_meeting_permission?:
                                        | "anyone_can_join"
                                        | "only_organization_employees"
                                        | "only_event_attendees";
                                    assign_hosts?: Array<string>;
                                    auto_record?: boolean;
                                    open_lobby?: boolean;
                                    allow_attendees_start?: boolean;
                                };
                            };
                            visibility?: "default" | "public" | "private";
                            attendee_ability?:
                                | "none"
                                | "can_see_others"
                                | "can_invite_others"
                                | "can_modify_event";
                            free_busy_status?: "busy" | "free";
                            location?: {
                                name?: string;
                                address?: string;
                                latitude?: number;
                                longitude?: number;
                            };
                            color?: number;
                            reminders?: Array<{ minutes?: number }>;
                            recurrence?: string;
                            schemas?: Array<{
                                ui_name?: string;
                                ui_status?:
                                    | "hide"
                                    | "readonly"
                                    | "editable"
                                    | "unknown";
                                app_link?: string;
                            }>;
                            attachments?: Array<{
                                file_token?: string;
                                file_size?: string;
                                is_deleted?: boolean;
                                name?: string;
                            }>;
                            event_check_in?: {
                                enable_check_in: boolean;
                                check_in_start_time?: {
                                    time_type:
                                        | "before_event_start"
                                        | "after_event_start"
                                        | "after_event_end";
                                    duration: number;
                                };
                                check_in_end_time?: {
                                    time_type:
                                        | "before_event_start"
                                        | "after_event_start"
                                        | "after_event_end";
                                    duration: number;
                                };
                                need_notify_attendees?: boolean;
                            };
                            source?: string;
                            self_rsvp_status?:
                                | "needs_action"
                                | "accept"
                                | "tentative"
                                | "decline"
                                | "removed";
                            description_rich?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string };
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
                                    event?: {
                                        event_id: string;
                                        organizer_calendar_id?: string;
                                        summary?: string;
                                        description?: string;
                                        start_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        end_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        vchat?: {
                                            vc_type?:
                                                | "vc"
                                                | "third_party"
                                                | "no_meeting"
                                                | "lark_live"
                                                | "unknown"
                                                | "third_party_meeting";
                                            icon_type?:
                                                | "vc"
                                                | "live"
                                                | "default";
                                            description?: string;
                                            meeting_url?: string;
                                            live_link?: string;
                                            meeting_settings?: {
                                                owner_id?: string;
                                                join_meeting_permission?:
                                                    | "anyone_can_join"
                                                    | "only_organization_employees"
                                                    | "only_event_attendees";
                                                assign_hosts?: Array<string>;
                                                auto_record?: boolean;
                                                open_lobby?: boolean;
                                                allow_attendees_start?: boolean;
                                            };
                                            third_party_meeting_settings?: {
                                                meeting_type?: string;
                                                meeting_id?: string;
                                                meeting_no?: string;
                                                password?: string;
                                                meeting_descriptions?: Array<{
                                                    lang?: string;
                                                    description?: string;
                                                }>;
                                            };
                                        };
                                        visibility?:
                                            | "default"
                                            | "public"
                                            | "private";
                                        attendee_ability?:
                                            | "none"
                                            | "can_see_others"
                                            | "can_invite_others"
                                            | "can_modify_event";
                                        free_busy_status?: "busy" | "free";
                                        location?: {
                                            name?: string;
                                            address?: string;
                                            latitude?: number;
                                            longitude?: number;
                                        };
                                        color?: number;
                                        reminders?: Array<{ minutes?: number }>;
                                        recurrence?: string;
                                        status?:
                                            | "tentative"
                                            | "confirmed"
                                            | "cancelled";
                                        is_exception?: boolean;
                                        recurring_event_id?: string;
                                        create_time?: string;
                                        schemas?: Array<{
                                            ui_name?: string;
                                            ui_status?:
                                                | "hide"
                                                | "readonly"
                                                | "editable"
                                                | "unknown";
                                            app_link?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/create_event`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=mget_instance_relation_info&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget_instance_relation_info&project=calendar&resource=calendar.event&version=v4 document }
                 *
                 * 批量获取instance关联信息
                 */
                mgetInstanceRelationInfo: async (
                    payload?: {
                        data?: {
                            instance_ids?: Array<string>;
                            need_meeting_instance_ids?: boolean;
                            need_meeting_notes?: boolean;
                            need_ai_meeting_notes?: boolean;
                        };
                        path: { calendar_id: string };
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
                                    instance_relation_infos?: Array<{
                                        instance_id?: string;
                                        meeting_instance_ids?: Array<string>;
                                        meeting_notes?: Array<string>;
                                        ai_meeting_notes?: Array<string>;
                                    }>;
                                    failed_instance_ids?: Array<{
                                        instance_id?: string;
                                        fail_msg?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/mget_instance_relation_info`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=instance_view&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=instance_view&project=calendar&resource=calendar.event&version=v4 document }
                 *
                 * 查询日程视图
                 *
                 * 调用该接口以用户身份查询指定日历下的日程视图。与[获取日程列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/list)不同的是，当前接口会按照重复日程的重复性规则展开成多个日程实例（instance），并根据查询的时间区间返回相应的日程实例信息。
                 */
                instanceView: async (
                    payload?: {
                        params: {
                            start_time: string;
                            end_time: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string };
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
                                        event_id: string;
                                        summary?: string;
                                        description?: string;
                                        start_time?: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        end_time?: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        status?:
                                            | "tentative"
                                            | "confirmed"
                                            | "cancelled";
                                        is_exception?: boolean;
                                        app_link?: string;
                                        organizer_calendar_id?: string;
                                        vchat?: {
                                            vc_type?:
                                                | "vc"
                                                | "third_party"
                                                | "no_meeting"
                                                | "lark_live"
                                                | "unknown"
                                                | "third_party_meeting";
                                            icon_type?:
                                                | "vc"
                                                | "live"
                                                | "default";
                                            description?: string;
                                            meeting_url?: string;
                                            live_link?: string;
                                            vc_info?: {
                                                unique_id: string;
                                                meeting_no: string;
                                            };
                                        };
                                        visibility?:
                                            | "default"
                                            | "public"
                                            | "private";
                                        attendee_ability?:
                                            | "none"
                                            | "can_see_others"
                                            | "can_invite_others"
                                            | "can_modify_event";
                                        free_busy_status?: "busy" | "free";
                                        location?: {
                                            name?: string;
                                            address?: string;
                                            latitude?: number;
                                            longitude?: number;
                                        };
                                        color?: number;
                                        recurring_event_id?: string;
                                        event_organizer?: {
                                            user_id?: string;
                                            display_name?: string;
                                        };
                                        attendees?: Array<{
                                            type?:
                                                | "user"
                                                | "chat"
                                                | "resource"
                                                | "third_party";
                                            attendee_id?: string;
                                            rsvp_status?:
                                                | "needs_action"
                                                | "accept"
                                                | "tentative"
                                                | "decline"
                                                | "removed";
                                            is_optional?: boolean;
                                            is_organizer?: boolean;
                                            is_external?: boolean;
                                            display_name?: string;
                                            chat_members?: Array<{
                                                rsvp_status?:
                                                    | "needs_action"
                                                    | "accept"
                                                    | "tentative"
                                                    | "decline"
                                                    | "removed";
                                                is_optional?: boolean;
                                                display_name?: string;
                                                is_organizer?: boolean;
                                                is_external?: boolean;
                                            }>;
                                            user_id?: string;
                                            chat_id?: string;
                                            room_id?: string;
                                            third_party_email?: string;
                                            operate_id?: string;
                                            resource_customization?: Array<{
                                                index_key: string;
                                                input_content?: string;
                                                options?: Array<{
                                                    option_key?: string;
                                                    others_content?: string;
                                                }>;
                                            }>;
                                            approval_reason?: string;
                                        }>;
                                        self_rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        description_rich?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/instance_view`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=calendar.event&version=v4 document }
                 *
                 * 创建日程
                 *
                 * 调用该接口以当前身份（应用或用户）在指定日历上创建一个日程。
                 *
                 * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份必须对日历有 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取日历类型以及当前身份对该日历的访问权限。;- 该接口仅用于创建日程，如需为日程添加参与人或预约会议室，则需调用[添加日程参与人](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event-attendee/create)接口。
                 */
                create: async (
                    payload?: {
                        data: {
                            summary?: string;
                            description?: string;
                            need_notification?: boolean;
                            start_time: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            end_time: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            vchat?: {
                                vc_type?:
                                    | "vc"
                                    | "third_party"
                                    | "no_meeting"
                                    | "lark_live"
                                    | "unknown"
                                    | "third_party_meeting";
                                icon_type?: "vc" | "live" | "default";
                                description?: string;
                                meeting_url?: string;
                                live_link?: string;
                                vc_info?: {
                                    unique_id: string;
                                    meeting_no: string;
                                };
                                meeting_settings?: {
                                    owner_id?: string;
                                    join_meeting_permission?:
                                        | "anyone_can_join"
                                        | "only_organization_employees"
                                        | "only_event_attendees";
                                    password?: string;
                                    assign_hosts?: Array<string>;
                                    auto_record?: boolean;
                                    open_lobby?: boolean;
                                    allow_attendees_start?: boolean;
                                };
                                third_party_meeting_settings?: {
                                    meeting_type?: string;
                                    meeting_id?: string;
                                    meeting_no?: string;
                                    password?: string;
                                    meeting_descriptions?: Array<{
                                        lang?: string;
                                        description?: string;
                                    }>;
                                };
                            };
                            visibility?: "default" | "public" | "private";
                            attendee_ability?:
                                | "none"
                                | "can_see_others"
                                | "can_invite_others"
                                | "can_modify_event";
                            free_busy_status?: "busy" | "free";
                            location?: {
                                name?: string;
                                address?: string;
                                latitude?: number;
                                longitude?: number;
                            };
                            color?: number;
                            reminders?: Array<{ minutes?: number }>;
                            recurrence?: string;
                            schemas?: Array<{
                                ui_name?: string;
                                ui_status?:
                                    | "hide"
                                    | "readonly"
                                    | "editable"
                                    | "unknown";
                                app_link?: string;
                            }>;
                            attachments?: Array<{ file_token?: string }>;
                            event_check_in?: {
                                enable_check_in: boolean;
                                check_in_start_time?: {
                                    time_type:
                                        | "before_event_start"
                                        | "after_event_start"
                                        | "after_event_end";
                                    duration: number;
                                };
                                check_in_end_time?: {
                                    time_type:
                                        | "before_event_start"
                                        | "after_event_start"
                                        | "after_event_end";
                                    duration: number;
                                };
                                need_notify_attendees?: boolean;
                            };
                            source?: string;
                            description_rich?: string;
                        };
                        params?: {
                            idempotency_key?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string };
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
                                    event?: {
                                        event_id: string;
                                        organizer_calendar_id?: string;
                                        summary?: string;
                                        description?: string;
                                        start_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        end_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        vchat?: {
                                            vc_type?:
                                                | "vc"
                                                | "third_party"
                                                | "no_meeting"
                                                | "lark_live"
                                                | "unknown"
                                                | "third_party_meeting";
                                            icon_type?:
                                                | "vc"
                                                | "live"
                                                | "default";
                                            description?: string;
                                            meeting_url?: string;
                                            live_link?: string;
                                            vc_info?: {
                                                unique_id: string;
                                                meeting_no: string;
                                            };
                                            meeting_settings?: {
                                                owner_id?: string;
                                                join_meeting_permission?:
                                                    | "anyone_can_join"
                                                    | "only_organization_employees"
                                                    | "only_event_attendees";
                                                password?: string;
                                                assign_hosts?: Array<string>;
                                                auto_record?: boolean;
                                                open_lobby?: boolean;
                                                allow_attendees_start?: boolean;
                                            };
                                            third_party_meeting_settings?: {
                                                meeting_type?: string;
                                                meeting_id?: string;
                                                meeting_no?: string;
                                                password?: string;
                                                meeting_descriptions?: Array<{
                                                    lang?: string;
                                                    description?: string;
                                                }>;
                                            };
                                        };
                                        visibility?:
                                            | "default"
                                            | "public"
                                            | "private";
                                        attendee_ability?:
                                            | "none"
                                            | "can_see_others"
                                            | "can_invite_others"
                                            | "can_modify_event";
                                        free_busy_status?: "busy" | "free";
                                        location?: {
                                            name?: string;
                                            address?: string;
                                            latitude?: number;
                                            longitude?: number;
                                        };
                                        color?: number;
                                        reminders?: Array<{ minutes?: number }>;
                                        recurrence?: string;
                                        status?:
                                            | "tentative"
                                            | "confirmed"
                                            | "cancelled";
                                        is_exception?: boolean;
                                        recurring_event_id?: string;
                                        create_time?: string;
                                        schemas?: Array<{
                                            ui_name?: string;
                                            ui_status?:
                                                | "hide"
                                                | "readonly"
                                                | "editable"
                                                | "unknown";
                                            app_link?: string;
                                        }>;
                                        event_organizer?: {
                                            user_id?: string;
                                            display_name?: string;
                                        };
                                        app_link?: string;
                                        attachments?: Array<{
                                            file_token?: string;
                                            file_size?: string;
                                            is_deleted?: boolean;
                                            name?: string;
                                        }>;
                                        event_check_in?: {
                                            enable_check_in: boolean;
                                            check_in_start_time?: {
                                                time_type:
                                                    | "before_event_start"
                                                    | "after_event_start"
                                                    | "after_event_end";
                                                duration: number;
                                            };
                                            check_in_end_time?: {
                                                time_type:
                                                    | "before_event_start"
                                                    | "after_event_start"
                                                    | "after_event_end";
                                                duration: number;
                                            };
                                            need_notify_attendees?: boolean;
                                        };
                                        source?: string;
                                        self_rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        description_rich?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=get&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=calendar&resource=calendar.event&version=v4 document }
                 *
                 * 获取日程
                 *
                 * 调用该接口以当前身份（应用或用户）获取指定日历内的某一日程信息，包括日程的标题、时间段、视频会议信息、公开范围以及参与人权限等。
                 *
                 * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 当前身份必须对日历有 reader、writer 或 owner 权限。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取当前身份对该日历的访问权限。;- 你可以通过 event_id 的时间戳后缀来获取例外日程的时间信息。例如，event_id 为 `xxxxxxxxx_1602504000` 的例外日程时间戳为 160250400。关于例外日程说明可参见[日程资源介绍](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar-event/introduction)。
                 */
                get: async (
                    payload?: {
                        params?: {
                            need_meeting_settings?: boolean;
                            need_attendee?: boolean;
                            max_attendee_num?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            op_user_id?: string;
                        };
                        path: { calendar_id: string; event_id: string };
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
                                    event?: {
                                        event_id: string;
                                        organizer_calendar_id?: string;
                                        summary?: string;
                                        description?: string;
                                        start_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        end_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        vchat?: {
                                            vc_type?:
                                                | "vc"
                                                | "third_party"
                                                | "no_meeting"
                                                | "lark_live"
                                                | "unknown"
                                                | "third_party_meeting";
                                            icon_type?:
                                                | "vc"
                                                | "live"
                                                | "default";
                                            description?: string;
                                            meeting_url?: string;
                                            live_link?: string;
                                            vc_info?: {
                                                unique_id: string;
                                                meeting_no: string;
                                            };
                                            meeting_settings?: {
                                                owner_id?: string;
                                                join_meeting_permission?:
                                                    | "anyone_can_join"
                                                    | "only_organization_employees"
                                                    | "only_event_attendees";
                                                password?: string;
                                                assign_hosts?: Array<string>;
                                                auto_record?: boolean;
                                                open_lobby?: boolean;
                                                allow_attendees_start?: boolean;
                                            };
                                            third_party_meeting_settings?: {
                                                meeting_type?: string;
                                                meeting_id?: string;
                                                meeting_no?: string;
                                                password?: string;
                                                meeting_descriptions?: Array<{
                                                    lang?: string;
                                                    description?: string;
                                                }>;
                                            };
                                        };
                                        visibility?:
                                            | "default"
                                            | "public"
                                            | "private";
                                        attendee_ability?:
                                            | "none"
                                            | "can_see_others"
                                            | "can_invite_others"
                                            | "can_modify_event";
                                        free_busy_status?: "busy" | "free";
                                        location?: {
                                            name?: string;
                                            address?: string;
                                            latitude?: number;
                                            longitude?: number;
                                        };
                                        color?: number;
                                        reminders?: Array<{ minutes?: number }>;
                                        recurrence?: string;
                                        status?:
                                            | "tentative"
                                            | "confirmed"
                                            | "cancelled";
                                        is_exception?: boolean;
                                        recurring_event_id?: string;
                                        create_time?: string;
                                        schemas?: Array<{
                                            ui_name?: string;
                                            ui_status?:
                                                | "hide"
                                                | "readonly"
                                                | "editable"
                                                | "unknown";
                                            app_link?: string;
                                        }>;
                                        event_organizer?: {
                                            user_id?: string;
                                            display_name?: string;
                                        };
                                        app_link?: string;
                                        attendees?: Array<{
                                            type?:
                                                | "user"
                                                | "chat"
                                                | "resource"
                                                | "third_party";
                                            attendee_id?: string;
                                            rsvp_status?:
                                                | "needs_action"
                                                | "accept"
                                                | "tentative"
                                                | "decline"
                                                | "removed";
                                            is_optional?: boolean;
                                            is_organizer?: boolean;
                                            is_external?: boolean;
                                            display_name?: string;
                                            chat_members?: Array<{
                                                rsvp_status?:
                                                    | "needs_action"
                                                    | "accept"
                                                    | "tentative"
                                                    | "decline"
                                                    | "removed";
                                                is_optional?: boolean;
                                                display_name?: string;
                                                is_organizer?: boolean;
                                                is_external?: boolean;
                                            }>;
                                            user_id?: string;
                                            chat_id?: string;
                                            room_id?: string;
                                            third_party_email?: string;
                                            operate_id?: string;
                                        }>;
                                        has_more_attendee?: boolean;
                                        attachments?: Array<{
                                            file_token?: string;
                                            file_size?: string;
                                            name?: string;
                                        }>;
                                        event_check_in?: {
                                            enable_check_in: boolean;
                                            check_in_start_time?: {
                                                time_type:
                                                    | "before_event_start"
                                                    | "after_event_start"
                                                    | "after_event_end";
                                                duration: number;
                                            };
                                            check_in_end_time?: {
                                                time_type:
                                                    | "before_event_start"
                                                    | "after_event_start"
                                                    | "after_event_end";
                                                duration: number;
                                            };
                                            need_notify_attendees?: boolean;
                                        };
                                        source?: string;
                                        self_rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        description_rich?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=calendar&resource=calendar.event&version=v4 document }
                 *
                 * 获取日程列表
                 *
                 * 调用该接口以当前身份（应用或用户）获取指定日历下的日程列表。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            anchor_time?: string;
                            page_token?: string;
                            sync_token?: string;
                            start_time?: string;
                            end_time?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            op_user_id?: string;
                        };
                        path: { calendar_id: string };
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
                                    sync_token?: string;
                                    items?: Array<{
                                        event_id: string;
                                        organizer_calendar_id?: string;
                                        summary?: string;
                                        description?: string;
                                        start_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        end_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        vchat?: {
                                            vc_type?:
                                                | "vc"
                                                | "third_party"
                                                | "no_meeting"
                                                | "lark_live"
                                                | "unknown"
                                                | "third_party_meeting";
                                            icon_type?:
                                                | "vc"
                                                | "live"
                                                | "default";
                                            description?: string;
                                            meeting_url?: string;
                                            live_link?: string;
                                            vc_info?: {
                                                unique_id: string;
                                                meeting_no: string;
                                            };
                                        };
                                        visibility?:
                                            | "default"
                                            | "public"
                                            | "private";
                                        attendee_ability?:
                                            | "none"
                                            | "can_see_others"
                                            | "can_invite_others"
                                            | "can_modify_event";
                                        free_busy_status?: "busy" | "free";
                                        location?: {
                                            name?: string;
                                            address?: string;
                                            latitude?: number;
                                            longitude?: number;
                                        };
                                        color?: number;
                                        reminders?: Array<{ minutes?: number }>;
                                        recurrence?: string;
                                        status?:
                                            | "tentative"
                                            | "confirmed"
                                            | "cancelled";
                                        is_exception?: boolean;
                                        recurring_event_id?: string;
                                        create_time?: string;
                                        schemas?: Array<{
                                            ui_name?: string;
                                            ui_status?:
                                                | "hide"
                                                | "readonly"
                                                | "editable"
                                                | "unknown";
                                            app_link?: string;
                                        }>;
                                        event_organizer?: {
                                            user_id?: string;
                                            display_name?: string;
                                        };
                                        app_link?: string;
                                        attachments?: Array<{
                                            file_token?: string;
                                            file_size?: string;
                                            name?: string;
                                        }>;
                                        source?: string;
                                        self_rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        description_rich?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event&apiName=patch&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=calendar&resource=calendar.event&version=v4 document }
                 *
                 * 更新日程
                 *
                 * 以当前身份（应用或用户）更新指定日历上的一个日程，包括日程标题、描述、开始与结束时间、视频会议以及日程地点等信息。
                 *
                 * ## 前提条件;;- 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前身份必须对日历有 writer 或 owner 权限，并且日历的类型只能为 primary 或 shared。你可以调用[查询日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/get)接口，获取日历类型以及当前身份对该日历的访问权限。;;## 使用限制;;- 当前身份为日程组织者时，可修改该接口内的所有可编辑字段。;- 当前身份为日程参与者时，仅可编辑部分字段（包括 visibility、free_busy_status、color、reminders）。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            summary?: string;
                            description?: string;
                            need_notification?: boolean;
                            start_time?: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            end_time?: {
                                date?: string;
                                timestamp?: string;
                                timezone?: string;
                            };
                            vchat?: {
                                vc_type?:
                                    | "vc"
                                    | "third_party"
                                    | "no_meeting"
                                    | "lark_live"
                                    | "unknown"
                                    | "third_party_meeting";
                                icon_type?: "vc" | "live" | "default";
                                description?: string;
                                meeting_url?: string;
                                live_link?: string;
                                vc_info?: {
                                    unique_id: string;
                                    meeting_no: string;
                                };
                                meeting_settings?: {
                                    owner_id?: string;
                                    join_meeting_permission?:
                                        | "anyone_can_join"
                                        | "only_organization_employees"
                                        | "only_event_attendees";
                                    password?: string;
                                    assign_hosts?: Array<string>;
                                    auto_record?: boolean;
                                    open_lobby?: boolean;
                                    allow_attendees_start?: boolean;
                                };
                                third_party_meeting_settings?: {
                                    meeting_type?: string;
                                    meeting_id?: string;
                                    meeting_no?: string;
                                    password?: string;
                                    meeting_descriptions?: Array<{
                                        lang?: string;
                                        description?: string;
                                    }>;
                                };
                            };
                            visibility?: "default" | "public" | "private";
                            attendee_ability?:
                                | "none"
                                | "can_see_others"
                                | "can_invite_others"
                                | "can_modify_event";
                            free_busy_status?: "busy" | "free";
                            location?: {
                                name?: string;
                                address?: string;
                                latitude?: number;
                                longitude?: number;
                            };
                            color?: number;
                            reminders?: Array<{ minutes?: number }>;
                            recurrence?: string;
                            schemas?: Array<{
                                ui_name?: string;
                                ui_status?:
                                    | "hide"
                                    | "readonly"
                                    | "editable"
                                    | "unknown";
                                app_link?: string;
                            }>;
                            attachments?: Array<{
                                file_token?: string;
                                is_deleted?: boolean;
                            }>;
                            event_check_in?: {
                                enable_check_in: boolean;
                                check_in_start_time?: {
                                    time_type:
                                        | "before_event_start"
                                        | "after_event_start"
                                        | "after_event_end";
                                    duration: number;
                                };
                                check_in_end_time?: {
                                    time_type:
                                        | "before_event_start"
                                        | "after_event_start"
                                        | "after_event_end";
                                    duration: number;
                                };
                                need_notify_attendees?: boolean;
                            };
                            source?: string;
                            description_rich?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { calendar_id: string; event_id: string };
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
                                    event?: {
                                        event_id: string;
                                        organizer_calendar_id?: string;
                                        summary?: string;
                                        description?: string;
                                        start_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        end_time: {
                                            date?: string;
                                            timestamp?: string;
                                            timezone?: string;
                                        };
                                        vchat?: {
                                            vc_type?:
                                                | "vc"
                                                | "third_party"
                                                | "no_meeting"
                                                | "lark_live"
                                                | "unknown"
                                                | "third_party_meeting";
                                            icon_type?:
                                                | "vc"
                                                | "live"
                                                | "default";
                                            description?: string;
                                            meeting_url?: string;
                                            live_link?: string;
                                            vc_info?: {
                                                unique_id: string;
                                                meeting_no: string;
                                            };
                                            meeting_settings?: {
                                                owner_id?: string;
                                                join_meeting_permission?:
                                                    | "anyone_can_join"
                                                    | "only_organization_employees"
                                                    | "only_event_attendees";
                                                password?: string;
                                                assign_hosts?: Array<string>;
                                                auto_record?: boolean;
                                                open_lobby?: boolean;
                                                allow_attendees_start?: boolean;
                                            };
                                            third_party_meeting_settings?: {
                                                meeting_type?: string;
                                                meeting_id?: string;
                                                meeting_no?: string;
                                                password?: string;
                                                meeting_descriptions?: Array<{
                                                    lang?: string;
                                                    description?: string;
                                                }>;
                                            };
                                        };
                                        visibility?:
                                            | "default"
                                            | "public"
                                            | "private";
                                        attendee_ability?:
                                            | "none"
                                            | "can_see_others"
                                            | "can_invite_others"
                                            | "can_modify_event";
                                        free_busy_status?: "busy" | "free";
                                        location?: {
                                            name?: string;
                                            address?: string;
                                            latitude?: number;
                                            longitude?: number;
                                        };
                                        color?: number;
                                        reminders?: Array<{ minutes?: number }>;
                                        recurrence?: string;
                                        status?:
                                            | "tentative"
                                            | "confirmed"
                                            | "cancelled";
                                        is_exception?: boolean;
                                        recurring_event_id?: string;
                                        create_time?: string;
                                        schemas?: Array<{
                                            ui_name?: string;
                                            ui_status?:
                                                | "hide"
                                                | "readonly"
                                                | "editable"
                                                | "unknown";
                                            app_link?: string;
                                        }>;
                                        event_organizer?: {
                                            user_id?: string;
                                            display_name?: string;
                                        };
                                        app_link?: string;
                                        attachments?: Array<{
                                            file_token?: string;
                                            file_size?: string;
                                            is_deleted?: boolean;
                                            name?: string;
                                        }>;
                                        event_check_in?: {
                                            enable_check_in: boolean;
                                            check_in_start_time?: {
                                                time_type:
                                                    | "before_event_start"
                                                    | "after_event_start"
                                                    | "after_event_end";
                                                duration: number;
                                            };
                                            check_in_end_time?: {
                                                time_type:
                                                    | "before_event_start"
                                                    | "after_event_start"
                                                    | "after_event_end";
                                                duration: number;
                                            };
                                            need_notify_attendees?: boolean;
                                        };
                                        source?: string;
                                        self_rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        description_rich?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id`,
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
             * common_freetime
             */
            commonFreetime: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=common_freetime&apiName=mget&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=calendar&resource=common_freetime&version=v4 document }
                 *
                 * 查询多个用户的公共空闲时间列表
                 *
                 * 调用该接口查询多个用户的公共空闲时间。
                 *
                 * 如果以应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。
                 */
                mget: async (
                    payload?: {
                        data: {
                            user_ids: Array<string>;
                            start_time: string;
                            end_time: string;
                            timezone: string;
                            only_busy?: boolean;
                            include_external_calendar?: boolean;
                            enable_work_hour?: boolean;
                            min_time_length?: number;
                            limit?: number;
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
                                    items?: Array<{
                                        start_time: string;
                                        end_time: string;
                                        length: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/common_freetime/mget`,
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
             * setting
             */
            setting: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=setting&apiName=generate_caldav_conf&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=generate_caldav_conf&project=calendar&resource=setting&version=v4 document }
                 *
                 * 生成 CalDAV 配置
                 *
                 * 调用该接口为当前用户生成一个 CalDAV 账号密码，用于将飞书日历信息同步到本地设备日历。
                 */
                generateCaldavConf: async (
                    payload?: {
                        data?: { device_name?: string };
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
                                    password?: string;
                                    user_name?: string;
                                    server_address?: string;
                                    device_name?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/settings/generate_caldav_conf`,
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
             * timeoff_event
             */
            timeoffEvent: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=timeoff_event&apiName=delete&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=calendar&resource=timeoff_event&version=v4 document }
                 *
                 * 删除请假日程
                 *
                 * 调用该接口删除一个指定的请假日程。请假日程删除后，用户个人签名页的请假信息也会消失。
                 *
                 * - 使用应用身份调用该接口，需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 当前应用身份只能删除自己创建的请假日程。
                 */
                delete: async (
                    payload?: {
                        path: { timeoff_event_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/timeoff_events/:timeoff_event_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=timeoff_event&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=timeoff_event&version=v4 document }
                 *
                 * 创建请假日程
                 *
                 * 调用该接口为指定用户创建一个请假日程。请假日程分为普通日程和全天日程。创建请假日程后，在请假时间内，用户个人签名页会展示请假信息。
                 */
                create: async (
                    payload?: {
                        data: {
                            user_id: string;
                            timezone: string;
                            start_time: string;
                            end_time: string;
                            title?: string;
                            description?: string;
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
                                    timeoff_event_id: string;
                                    user_id: string;
                                    timezone: string;
                                    start_time: string;
                                    end_time: string;
                                    title?: string;
                                    description?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/timeoff_events`,
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
             * calendar.event.meeting_minute
             */
            calendarEventMeetingMinute: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.meeting_minute&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=calendar.event.meeting_minute&version=v4 document }
                 *
                 * 创建会议纪要
                 *
                 * 调用该接口为指定的日程创建会议纪要。纪要以文档形式展示，成功创建后会返回纪要文档 URL。
                 *
                 * ## 注意事项;;- 所操作的日历需要是当前身份（身份由 Header Authorization 的 Token 类型决定）的主日历，且当前身份具有日历的 writer 权限（即编辑权限）。;- 所操作的日程内至少需要有 1 个参与人，且参与人权限不能为 none（即无法查看参与人列表）。;;
                 */
                create: async (
                    payload?: {
                        path: { calendar_id: string; event_id: string };
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
                                data?: { doc_url?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/meeting_minute`,
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
             * calendar.event.meeting_chat
             */
            calendarEventMeetingChat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.meeting_chat&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=calendar.event.meeting_chat&version=v4 document }
                 *
                 * 创建会议群
                 *
                 * 调用该接口以当前身份（应用或用户）为指定日程创建一个会议群。
                 */
                create: async (
                    payload?: {
                        path: { calendar_id: string; event_id: string };
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
                                    meeting_chat_id?: string;
                                    applink?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/meeting_chat`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.meeting_chat&apiName=delete&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=calendar&resource=calendar.event.meeting_chat&version=v4 document }
                 *
                 * 解绑会议群
                 *
                 * 调用该接口以当前身份（应用或用户）为日程解绑已创建的会议群。
                 *
                 * - 当前身份由 Header Authorization 的 Token 类型决定。tenant_access_token 指应用身份，user_access_token 指用户身份。;- 如果使用应用身份调用该接口，则需要确保应用开启了[机器人能力](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-enable-bot-ability)。;- 日程所在的日历需要是当前身份的主日历，且具有日历的 writer 权限。你可以调用[查询主日历信息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/calendar-v4/calendar/primary)接口，获取当前身份的主日历信息。;- 当前的操作人需要是会议群的群主。
                 */
                delete: async (
                    payload?: {
                        params: { meeting_chat_id: string };
                        path: { calendar_id: string; event_id: string };
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/meeting_chat`,
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
             * calendar.event.attendee.chat_member
             */
            calendarEventAttendeeChatMember: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_token?: string;
                            page_size?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            op_user_id?: string;
                        };
                        path: {
                            calendar_id: string;
                            event_id: string;
                            attendee_id: string;
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
                                    `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/:attendee_id/chat_members`,
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
                                                        rsvp_status?:
                                                            | "needs_action"
                                                            | "accept"
                                                            | "tentative"
                                                            | "decline"
                                                            | "removed";
                                                        is_optional?: boolean;
                                                        display_name?: string;
                                                        open_id?: string;
                                                        is_organizer?: boolean;
                                                        is_external?: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.attendee.chat_member&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=calendar&resource=calendar.event.attendee.chat_member&version=v4 document }
                 *
                 * 获取日程参与群成员列表
                 *
                 * 调用该接口以当前身份（应用或用户）获取日程的群组类型参与人的群成员列表。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_token?: string;
                            page_size?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            op_user_id?: string;
                        };
                        path: {
                            calendar_id: string;
                            event_id: string;
                            attendee_id: string;
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
                                        rsvp_status?:
                                            | "needs_action"
                                            | "accept"
                                            | "tentative"
                                            | "decline"
                                            | "removed";
                                        is_optional?: boolean;
                                        display_name?: string;
                                        open_id?: string;
                                        is_organizer?: boolean;
                                        is_external?: boolean;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/attendees/:attendee_id/chat_members`,
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
             * calendar.event.resource_waitlist
             */
            calendarEventResourceWaitlist: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.resource_waitlist&apiName=delete&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=calendar&resource=calendar.event.resource_waitlist&version=v4 document }
                 *
                 * 删除会议室候补单
                 *
                 * 调用该接口删除指定日程上的一个会议室候补单。
                 */
                delete: async (
                    payload?: {
                        path: {
                            calendar_id: string;
                            event_id: string;
                            resource_waitlist_id: string;
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
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/resource_waitlists/:resource_waitlist_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.resource_waitlist&apiName=list&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=calendar&resource=calendar.event.resource_waitlist&version=v4 document }
                 *
                 * 获取会议室候补单列表
                 *
                 * 调用该接口以当前身份（应用或用户）获取指定日程下的会议室候补单列表。;
                 */
                list: async (
                    payload?: {
                        path: { calendar_id: string; event_id: string };
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
                                        resource_waitlist_id?: string;
                                        room_level_ids?: Array<string>;
                                        min_capacity?: number;
                                        max_capacity?: number;
                                        last_wait_time_type?:
                                            | "BeforeEventStartFiveMinutes"
                                            | "WhenEventStart"
                                            | "AfterEventStartFiveMinutes"
                                            | "WhenEventEnd";
                                        equipment_require_type?:
                                            | "RequireNoneEquipment"
                                            | "IncludeProjector";
                                        building_zone_codes?: Array<string>;
                                        status?: "Waiting" | "Failed";
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/resource_waitlists`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.resource_waitlist&apiName=get&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=calendar&resource=calendar.event.resource_waitlist&version=v4 document }
                 *
                 * 获取会议室候补单
                 *
                 * 调用该接口以当前身份（应用或用户）获取指定日程的某一会议室候补单信息。
                 */
                get: async (
                    payload?: {
                        path: {
                            calendar_id: string;
                            event_id: string;
                            resource_waitlist_id: string;
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
                                    resource_waitlist?: {
                                        resource_waitlist_id?: string;
                                        room_level_ids?: Array<string>;
                                        min_capacity?: number;
                                        max_capacity?: number;
                                        last_wait_time_type?:
                                            | "BeforeEventStartFiveMinutes"
                                            | "WhenEventStart"
                                            | "AfterEventStartFiveMinutes"
                                            | "WhenEventEnd";
                                        equipment_require_type?:
                                            | "RequireNoneEquipment"
                                            | "IncludeProjector";
                                        building_zone_codes?: Array<string>;
                                        status?: "Waiting" | "Failed";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/resource_waitlists/:resource_waitlist_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.resource_waitlist&apiName=create&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=calendar&resource=calendar.event.resource_waitlist&version=v4 document }
                 *
                 * 创建会议室候补单
                 *
                 * 调用该接口创建一个会议室候补单。
                 */
                create: async (
                    payload?: {
                        data?: {
                            room_level_ids?: Array<string>;
                            min_capacity?: number;
                            max_capacity?: number;
                            last_wait_time_type?:
                                | "BeforeEventStartFiveMinutes"
                                | "WhenEventStart"
                                | "AfterEventStartFiveMinutes"
                                | "WhenEventEnd";
                            equipment_require_type?:
                                | "RequireNoneEquipment"
                                | "IncludeProjector";
                            building_zone_codes?: Array<string>;
                        };
                        path: { calendar_id: string; event_id: string };
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
                                    resource_waitlist?: {
                                        resource_waitlist_id?: string;
                                        room_level_ids?: Array<string>;
                                        min_capacity?: number;
                                        max_capacity?: number;
                                        last_wait_time_type?:
                                            | "BeforeEventStartFiveMinutes"
                                            | "WhenEventStart"
                                            | "AfterEventStartFiveMinutes"
                                            | "WhenEventEnd";
                                        equipment_require_type?:
                                            | "RequireNoneEquipment"
                                            | "IncludeProjector";
                                        building_zone_codes?: Array<string>;
                                        status?: "Waiting" | "Failed";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/resource_waitlists`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=calendar&resource=calendar.event.resource_waitlist&apiName=patch&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=calendar&resource=calendar.event.resource_waitlist&version=v4 document }
                 *
                 * 更新会议室候补单
                 *
                 * 更新指定日程上的一个会议室候补单信息。;
                 */
                patch: async (
                    payload?: {
                        data?: {
                            room_level_ids?: Array<string>;
                            min_capacity?: number;
                            max_capacity?: number;
                            last_wait_time_type?:
                                | "BeforeEventStartFiveMinutes"
                                | "WhenEventStart"
                                | "AfterEventStartFiveMinutes"
                                | "WhenEventEnd";
                            equipment_require_type?:
                                | "RequireNoneEquipment"
                                | "IncludeProjector";
                            building_zone_codes?: Array<string>;
                        };
                        path: {
                            calendar_id: string;
                            event_id: string;
                            resource_waitlist_id: string;
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
                                    resource_waitlist?: {
                                        resource_waitlist_id?: string;
                                        room_level_ids?: Array<string>;
                                        min_capacity?: number;
                                        max_capacity?: number;
                                        last_wait_time_type?:
                                            | "BeforeEventStartFiveMinutes"
                                            | "WhenEventStart"
                                            | "AfterEventStartFiveMinutes"
                                            | "WhenEventEnd";
                                        equipment_require_type?:
                                            | "RequireNoneEquipment"
                                            | "IncludeProjector";
                                        building_zone_codes?: Array<string>;
                                        status?: "Waiting" | "Failed";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/calendar/v4/calendars/:calendar_id/events/:event_id/resource_waitlists/:resource_waitlist_id`,
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
        },
    };
}
