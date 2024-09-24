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
import approval from "./approval";

// auto gen
export default abstract class Client extends approval {
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
     * 打卡
     */
    attendance = {
        /**
         * approval_info
         */
        approvalInfo: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=approval_info&apiName=process&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/approval_info/process document }
             *
             * 通知审批状态更新
             *
             * 对于只使用飞书考勤系统而未使用飞书审批系统的企业，可以通过该接口更新写入飞书考勤系统中的三方系统审批状态，例如请假、加班、外出、出差、补卡等审批，状态包括通过、不通过、撤销等。
             *
             * 发起状态的审批才可以被更新为通过、不通过，已经通过的审批才可以被更新为撤销。
             */
            process: async (
                payload?: {
                    data: {
                        approval_id: string;
                        approval_type: string;
                        status: number;
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
                                approval_info?: {
                                    approval_id: string;
                                    approval_type:
                                        | "leave"
                                        | "overtime"
                                        | "trip"
                                        | "out"
                                        | "remedy";
                                    status: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/approval_infos/process`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * archive_rule
         */
        archiveRule: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=archive_rule&apiName=del_report&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=del_report&project=attendance&resource=archive_rule&version=v1 document }
             */
            delReport: async (
                payload?: {
                    data: {
                        month: string;
                        operator_id: string;
                        archive_rule_id: string;
                        user_ids?: Array<string>;
                    };
                    params: { employee_type: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/archive_rule/del_report`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
                                `${this.domain}/open-apis/attendance/v1/archive_rule`,
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
                                                items?: Array<{
                                                    report_id?: string;
                                                    report_name?: {
                                                        zh?: string;
                                                        en?: string;
                                                        ja?: string;
                                                    };
                                                    archive_rule_id?: string;
                                                    archive_rule_name?: {
                                                        zh?: string;
                                                        en?: string;
                                                        ja?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=archive_rule&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=attendance&resource=archive_rule&version=v1 document }
             */
            list: async (
                payload?: {
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
                                items?: Array<{
                                    report_id?: string;
                                    report_name?: {
                                        zh?: string;
                                        en?: string;
                                        ja?: string;
                                    };
                                    archive_rule_id?: string;
                                    archive_rule_name?: {
                                        zh?: string;
                                        en?: string;
                                        ja?: string;
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/archive_rule`,
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
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=archive_rule&apiName=upload_report&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_report&project=attendance&resource=archive_rule&version=v1 document }
             */
            uploadReport: async (
                payload?: {
                    data: {
                        month: string;
                        operator_id: string;
                        archive_report_datas?: Array<{
                            member_id: string;
                            start_time: string;
                            end_time: string;
                            field_datas?: Array<{
                                code: string;
                                value?: string;
                            }>;
                        }>;
                        archive_rule_id: string;
                    };
                    params: { employee_type: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                invalid_code?: Array<string>;
                                invalid_member_id?: Array<string>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/archive_rule/upload_report`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=archive_rule&apiName=user_stats_fields_query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=user_stats_fields_query&project=attendance&resource=archive_rule&version=v1 document }
             */
            userStatsFieldsQuery: async (
                payload?: {
                    data: {
                        locale?: string;
                        month: string;
                        archive_rule_id: string;
                        operator_id: string;
                    };
                    params: { employee_type: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                archive_report_fields?: Array<{
                                    code?: string;
                                    title?: string;
                                    upper_titles?: Array<string>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/archive_rule/user_stats_fields_query`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * 文件
         */
        file: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=file&apiName=download&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/file/download document }
             *
             * 下载文件
             *
             * 通过文件 ID 下载指定的文件。
             */
            download: async (
                payload?: {
                    path: { file_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, any>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/files/:file_id/download`,
                            path
                        ),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                const checkIsReadable = () => {
                    const consumedError =
                        "The stream has already been consumed";
                    if (!res.readable) {
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
                            res.pipe(writableStream);
                        });
                    },
                    getReadableStream: () => {
                        checkIsReadable();
                        return res as Readable;
                    },
                };
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=file&apiName=upload&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/file/upload document }
             *
             * 上传文件
             *
             * 上传文件并获取文件 ID，可用于“修改用户设置”接口中的 face_key 参数。
             */
            upload: async (
                payload?: {
                    data?: { file?: Buffer | fs.ReadStream };
                    params: { file_name: string };
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
                            data?: { file?: { file_id: string } };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/files/upload`,
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
         * 考勤组管理
         */
        group: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=group&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/create document }
             *
             * 创建或修改考勤组
             *
             * 考勤组，是对部门或者员工在某个特定场所及特定时间段内的出勤情况（包括上下班、迟到、早退、病假、婚假、丧假、公休、工作时间、加班情况等）的一种规则设定。;;通过设置考勤组，可以从部门、员工两个维度，来设定考勤方式、考勤时间、考勤地点等考勤规则。
             *
             * 出于安全考虑，目前通过该接口只允许修改自己创建的考勤组。
             */
            create: async (
                payload?: {
                    data: {
                        group: {
                            group_id?: string;
                            group_name: string;
                            time_zone: string;
                            bind_dept_ids?: Array<string>;
                            except_dept_ids?: Array<string>;
                            bind_user_ids?: Array<string>;
                            except_user_ids?: Array<string>;
                            group_leader_ids: Array<string>;
                            sub_group_leader_ids?: Array<string>;
                            allow_out_punch?: boolean;
                            out_punch_need_approval?: boolean;
                            out_punch_need_post_approval?: boolean;
                            out_punch_need_remark?: boolean;
                            out_punch_need_photo?: boolean;
                            out_punch_allowed_hide_addr?: boolean;
                            out_punch_allowed_adjust_addr?: boolean;
                            adjust_range?: number;
                            allow_pc_punch?: boolean;
                            allow_remedy?: boolean;
                            remedy_limit?: boolean;
                            remedy_limit_count?: number;
                            remedy_date_limit?: boolean;
                            remedy_date_num?: number;
                            allow_remedy_type_lack?: boolean;
                            allow_remedy_type_late?: boolean;
                            allow_remedy_type_early?: boolean;
                            allow_remedy_type_normal?: boolean;
                            show_cumulative_time?: boolean;
                            show_over_time?: boolean;
                            hide_staff_punch_time?: boolean;
                            face_punch?: boolean;
                            face_punch_cfg?: number;
                            face_live_need_action?: boolean;
                            face_downgrade?: boolean;
                            replace_basic_pic?: boolean;
                            machines?: Array<{
                                machine_sn: string;
                                machine_name: string;
                            }>;
                            gps_range?: number;
                            locations?: Array<{
                                location_name: string;
                                location_type: number;
                                latitude?: number;
                                longitude?: number;
                                ssid?: string;
                                bssid?: string;
                                map_type?: number;
                                address?: string;
                                ip?: string;
                                feature?: string;
                                gps_range?: number;
                            }>;
                            group_type: number;
                            punch_day_shift_ids: Array<string>;
                            free_punch_cfg?: {
                                free_start_time: string;
                                free_end_time: string;
                                punch_day: number;
                                work_day_no_punch_as_lack?: boolean;
                                work_hours_demand?: boolean;
                                work_hours?: number;
                            };
                            calendar_id: number;
                            need_punch_special_days?: Array<{
                                punch_day: number;
                                shift_id: string;
                            }>;
                            no_need_punch_special_days?: Array<{
                                punch_day: number;
                                shift_id: string;
                            }>;
                            work_day_no_punch_as_lack?: boolean;
                            effect_now?: boolean;
                            remedy_period_type?: number;
                            remedy_period_custom_date?: number;
                            punch_type?: number;
                            rest_clockIn_need_approval?: boolean;
                            clockIn_need_photo?: boolean;
                            member_status_change?: {
                                onboarding_on_no_need_punch?: boolean;
                                onboarding_off_no_need_punch?: boolean;
                                offboarding_on_no_need_punch?: boolean;
                                offboarding_off_no_need_punch?: boolean;
                            };
                            leave_need_punch?: boolean;
                            leave_need_punch_cfg?: {
                                late_minutes_as_late?: number;
                                late_minutes_as_lack?: number;
                                early_minutes_as_early?: number;
                                early_minutes_as_lack?: number;
                            };
                            go_out_need_punch?: number;
                            go_out_need_punch_cfg?: {
                                late_minutes_as_late?: number;
                                late_minutes_as_lack?: number;
                                early_minutes_as_early?: number;
                                early_minutes_as_lack?: number;
                            };
                            travel_need_punch?: number;
                            travel_need_punch_cfg?: {
                                late_minutes_as_late?: number;
                                late_minutes_as_lack?: number;
                                early_minutes_as_early?: number;
                                early_minutes_as_lack?: number;
                            };
                            need_punch_members?: Array<{
                                rule_scope_type?: number;
                                scope_group_list?: {
                                    scope_value_type?: number;
                                    operation_type?: number;
                                    right?: Array<{
                                        key?: string;
                                        name?: string;
                                    }>;
                                    member_ids?: Array<string>;
                                    custom_field_ID?: string;
                                    custom_field_obj_type?: string;
                                };
                            }>;
                            no_need_punch_members?: Array<{
                                rule_scope_type?: number;
                                scope_group_list?: {
                                    scope_value_type?: number;
                                    operation_type?: number;
                                    right?: Array<{
                                        key?: string;
                                        name?: string;
                                    }>;
                                    member_ids?: Array<string>;
                                    custom_field_ID?: string;
                                    custom_field_obj_type?: string;
                                };
                            }>;
                            save_auto_changes?: boolean;
                            org_change_auto_adjust?: boolean;
                            bind_default_dept_ids?: Array<string>;
                            bind_default_user_ids?: Array<string>;
                            overtime_clock_cfg?: {
                                allow_punch_approval?: boolean;
                                need_clock_over_time_start_and_end?: boolean;
                            };
                            new_calendar_id?: string;
                            allow_apply_punch?: boolean;
                        };
                        operator_id?: string;
                    };
                    params: {
                        employee_type: "employee_id" | "employee_no";
                        dept_type: "open_id";
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
                                group?: {
                                    group_id?: string;
                                    group_name: string;
                                    time_zone: string;
                                    bind_dept_ids?: Array<string>;
                                    except_dept_ids?: Array<string>;
                                    bind_user_ids?: Array<string>;
                                    except_user_ids?: Array<string>;
                                    group_leader_ids: Array<string>;
                                    sub_group_leader_ids?: Array<string>;
                                    allow_out_punch?: boolean;
                                    out_punch_need_approval?: boolean;
                                    out_punch_need_post_approval?: boolean;
                                    out_punch_need_remark?: boolean;
                                    out_punch_need_photo?: boolean;
                                    out_punch_allowed_hide_addr?: boolean;
                                    out_punch_allowed_adjust_addr?: boolean;
                                    adjust_range?: number;
                                    allow_pc_punch?: boolean;
                                    allow_remedy?: boolean;
                                    remedy_limit?: boolean;
                                    remedy_limit_count?: number;
                                    remedy_date_limit?: boolean;
                                    remedy_date_num?: number;
                                    allow_remedy_type_lack?: boolean;
                                    allow_remedy_type_late?: boolean;
                                    allow_remedy_type_early?: boolean;
                                    allow_remedy_type_normal?: boolean;
                                    show_cumulative_time?: boolean;
                                    show_over_time?: boolean;
                                    hide_staff_punch_time?: boolean;
                                    face_punch?: boolean;
                                    face_punch_cfg?: number;
                                    face_live_need_action?: boolean;
                                    face_downgrade?: boolean;
                                    replace_basic_pic?: boolean;
                                    machines?: Array<{
                                        machine_sn: string;
                                        machine_name: string;
                                    }>;
                                    gps_range?: number;
                                    locations?: Array<{
                                        location_id?: string;
                                        location_name: string;
                                        location_type: number;
                                        latitude?: number;
                                        longitude?: number;
                                        ssid?: string;
                                        bssid?: string;
                                        map_type?: number;
                                        address?: string;
                                        ip?: string;
                                        feature?: string;
                                        gps_range?: number;
                                    }>;
                                    group_type: number;
                                    punch_day_shift_ids: Array<string>;
                                    free_punch_cfg?: {
                                        free_start_time: string;
                                        free_end_time: string;
                                        punch_day: number;
                                        work_day_no_punch_as_lack?: boolean;
                                        work_hours_demand?: boolean;
                                        work_hours?: number;
                                    };
                                    calendar_id: number;
                                    need_punch_special_days?: Array<{
                                        punch_day: number;
                                        shift_id: string;
                                    }>;
                                    no_need_punch_special_days?: Array<{
                                        punch_day: number;
                                        shift_id: string;
                                    }>;
                                    work_day_no_punch_as_lack?: boolean;
                                    effect_now?: boolean;
                                    remedy_period_type?: number;
                                    remedy_period_custom_date?: number;
                                    punch_type?: number;
                                    effect_time?: string;
                                    fixshift_effect_time?: string;
                                    member_effect_time?: string;
                                    rest_clockIn_need_approval?: boolean;
                                    clockIn_need_photo?: boolean;
                                    member_status_change?: {
                                        onboarding_on_no_need_punch?: boolean;
                                        onboarding_off_no_need_punch?: boolean;
                                        offboarding_on_no_need_punch?: boolean;
                                        offboarding_off_no_need_punch?: boolean;
                                    };
                                    leave_need_punch?: boolean;
                                    leave_need_punch_cfg?: {
                                        late_minutes_as_late?: number;
                                        late_minutes_as_lack?: number;
                                        early_minutes_as_early?: number;
                                        early_minutes_as_lack?: number;
                                    };
                                    go_out_need_punch?: number;
                                    go_out_need_punch_cfg?: {
                                        late_minutes_as_late?: number;
                                        late_minutes_as_lack?: number;
                                        early_minutes_as_early?: number;
                                        early_minutes_as_lack?: number;
                                    };
                                    travel_need_punch?: number;
                                    travel_need_punch_cfg?: {
                                        late_minutes_as_late?: number;
                                        late_minutes_as_lack?: number;
                                        early_minutes_as_early?: number;
                                        early_minutes_as_lack?: number;
                                    };
                                    need_punch_members?: Array<{
                                        rule_scope_type?: number;
                                        scope_group_list?: {
                                            scope_value_type?: number;
                                            operation_type?: number;
                                            right?: Array<{
                                                key?: string;
                                                name?: string;
                                            }>;
                                            member_ids?: Array<string>;
                                            custom_field_ID?: string;
                                            custom_field_obj_type?: string;
                                        };
                                    }>;
                                    no_need_punch_members?: Array<{
                                        rule_scope_type?: number;
                                        scope_group_list?: {
                                            scope_value_type?: number;
                                            operation_type?: number;
                                            right?: Array<{
                                                key?: string;
                                                name?: string;
                                            }>;
                                            member_ids?: Array<string>;
                                            custom_field_ID?: string;
                                            custom_field_obj_type?: string;
                                        };
                                    }>;
                                    save_auto_changes?: boolean;
                                    org_change_auto_adjust?: boolean;
                                    bind_default_dept_ids?: Array<string>;
                                    bind_default_user_ids?: Array<string>;
                                    overtime_clock_cfg?: {
                                        allow_punch_approval?: boolean;
                                        need_clock_over_time_start_and_end?: boolean;
                                    };
                                    new_calendar_id?: string;
                                    allow_apply_punch?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/groups`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=group&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/delete document }
             *
             * 删除考勤组
             *
             * 通过班次 ID 删除班次。
             */
            delete: async (
                payload?: {
                    path: { group_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/groups/:group_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=group&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/get document }
             *
             * 获取考勤组详情
             *
             * 通过考勤组 ID 获取考勤组详情。
             */
            get: async (
                payload?: {
                    params: {
                        employee_type: "employee_id" | "employee_no";
                        dept_type: "open_id";
                    };
                    path: { group_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                group_id?: string;
                                group_name: string;
                                time_zone: string;
                                bind_dept_ids?: Array<string>;
                                except_dept_ids?: Array<string>;
                                bind_user_ids?: Array<string>;
                                except_user_ids?: Array<string>;
                                group_leader_ids: Array<string>;
                                sub_group_leader_ids?: Array<string>;
                                allow_out_punch?: boolean;
                                out_punch_need_approval?: boolean;
                                out_punch_need_post_approval?: boolean;
                                out_punch_need_remark?: boolean;
                                out_punch_need_photo?: boolean;
                                out_punch_allowed_hide_addr?: boolean;
                                out_punch_allowed_adjust_addr?: boolean;
                                adjust_range?: number;
                                allow_pc_punch?: boolean;
                                allow_remedy?: boolean;
                                remedy_limit?: boolean;
                                remedy_limit_count?: number;
                                remedy_date_limit?: boolean;
                                remedy_date_num?: number;
                                allow_remedy_type_lack?: boolean;
                                allow_remedy_type_late?: boolean;
                                allow_remedy_type_early?: boolean;
                                allow_remedy_type_normal?: boolean;
                                show_cumulative_time?: boolean;
                                show_over_time?: boolean;
                                hide_staff_punch_time?: boolean;
                                face_punch?: boolean;
                                face_punch_cfg?: number;
                                face_live_need_action?: boolean;
                                face_downgrade?: boolean;
                                replace_basic_pic?: boolean;
                                machines?: Array<{
                                    machine_sn: string;
                                    machine_name: string;
                                }>;
                                gps_range?: number;
                                locations?: Array<{
                                    location_id?: string;
                                    location_name: string;
                                    location_type: number;
                                    latitude?: number;
                                    longitude?: number;
                                    ssid?: string;
                                    bssid?: string;
                                    map_type?: number;
                                    address?: string;
                                    ip?: string;
                                    feature?: string;
                                    gps_range?: number;
                                }>;
                                group_type: number;
                                punch_day_shift_ids: Array<string>;
                                free_punch_cfg?: {
                                    free_start_time: string;
                                    free_end_time: string;
                                    punch_day: number;
                                    work_day_no_punch_as_lack?: boolean;
                                    work_hours_demand?: boolean;
                                    work_hours?: number;
                                };
                                calendar_id: number;
                                need_punch_special_days?: Array<{
                                    punch_day: number;
                                    shift_id: string;
                                }>;
                                no_need_punch_special_days?: Array<{
                                    punch_day: number;
                                    shift_id: string;
                                }>;
                                work_day_no_punch_as_lack?: boolean;
                                remedy_period_type?: number;
                                remedy_period_custom_date?: number;
                                punch_type?: number;
                                effect_time?: string;
                                fixshift_effect_time?: string;
                                member_effect_time?: string;
                                rest_clockIn_need_approval?: boolean;
                                clockIn_need_photo?: boolean;
                                member_status_change?: {
                                    onboarding_on_no_need_punch?: boolean;
                                    onboarding_off_no_need_punch?: boolean;
                                    offboarding_on_no_need_punch?: boolean;
                                    offboarding_off_no_need_punch?: boolean;
                                };
                                leave_need_punch?: boolean;
                                leave_need_punch_cfg?: {
                                    late_minutes_as_late?: number;
                                    late_minutes_as_lack?: number;
                                    early_minutes_as_early?: number;
                                    early_minutes_as_lack?: number;
                                };
                                go_out_need_punch?: number;
                                go_out_need_punch_cfg?: {
                                    late_minutes_as_late?: number;
                                    late_minutes_as_lack?: number;
                                    early_minutes_as_early?: number;
                                    early_minutes_as_lack?: number;
                                };
                                travel_need_punch?: number;
                                travel_need_punch_cfg?: {
                                    late_minutes_as_late?: number;
                                    late_minutes_as_lack?: number;
                                    early_minutes_as_early?: number;
                                    early_minutes_as_lack?: number;
                                };
                                need_punch_members?: Array<{
                                    rule_scope_type?: number;
                                    scope_group_list?: {
                                        scope_value_type?: number;
                                        operation_type?: number;
                                        right?: Array<{
                                            key?: string;
                                            name?: string;
                                        }>;
                                        member_ids?: Array<string>;
                                        custom_field_ID?: string;
                                        custom_field_obj_type?: string;
                                    };
                                }>;
                                no_need_punch_members?: Array<{
                                    rule_scope_type?: number;
                                    scope_group_list?: {
                                        scope_value_type?: number;
                                        operation_type?: number;
                                        right?: Array<{
                                            key?: string;
                                            name?: string;
                                        }>;
                                        member_ids?: Array<string>;
                                        custom_field_ID?: string;
                                        custom_field_obj_type?: string;
                                    };
                                }>;
                                save_auto_changes?: boolean;
                                org_change_auto_adjust?: boolean;
                                bind_default_dept_ids?: Array<string>;
                                bind_default_user_ids?: Array<string>;
                                overtime_clock_cfg?: {
                                    allow_punch_approval?: boolean;
                                    need_clock_over_time_start_and_end?: boolean;
                                };
                                new_calendar_id?: string;
                                allow_apply_punch?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/groups/:group_id`,
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
                                `${this.domain}/open-apis/attendance/v1/groups`,
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
                                                group_list?: Array<{
                                                    group_id: string;
                                                    group_name: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=group&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/list document }
             *
             * 获取考勤组列表
             *
             * 翻页获取所有考勤组列表。
             */
            list: async (
                payload?: {
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
                                group_list?: Array<{
                                    group_id: string;
                                    group_name: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/groups`,
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
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=group&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/search document }
             *
             * 按名称查询考勤组
             *
             * 按考勤组名称查询考勤组摘要信息。查询条件支持名称精确匹配和模糊匹配两种方式。查询结果按考勤组修改时间 desc 排序，且最大记录数为 10 条。
             *
             * 该接口依赖的数据和考勤组主数据间存在数据同步延时（正常数据同步 2 秒以内），因此在使用该接口时需注意评估数据延迟潜在风险。
             */
            search: async (
                payload?: {
                    data: { group_name: string; exactly_matched?: boolean };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                group_list?: Array<{
                                    group_id: string;
                                    group_name: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/groups/search`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * leave_accrual_record
         */
        leaveAccrualRecord: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=leave_accrual_record&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=attendance&resource=leave_accrual_record&version=v1 document }
             */
            patch: async (
                payload?: {
                    data: {
                        leave_granting_record_id: string;
                        employment_id: string;
                        leave_type_id: string;
                        reason: Array<{ lang: string; value: string }>;
                        time_offset?: number;
                        expiration_date?: string;
                        quantity?: string;
                        section_type?: number;
                    };
                    params?: {
                        user_id_type?:
                            | "open_id"
                            | "people_corehr_id"
                            | "union_id"
                            | "user_id";
                    };
                    path?: { leave_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                record: {
                                    id: string;
                                    employment_id: string;
                                    leave_type_id: string;
                                    granting_quantity: string;
                                    granting_unit: number;
                                    effective_date: string;
                                    expiration_date: string;
                                    granted_by: number;
                                    reason: Array<{
                                        lang: string;
                                        value: string;
                                    }>;
                                    created_at: string;
                                    created_by: string;
                                    updated_at: string;
                                    updated_by: string;
                                    section_type?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/leave_accrual_record/:leave_id`,
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
         * leave_employ_expire_record
         */
        leaveEmployExpireRecord: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=leave_employ_expire_record&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=attendance&resource=leave_employ_expire_record&version=v1 document }
             */
            get: async (
                payload?: {
                    data: {
                        employment_id: string;
                        leave_type_id: string;
                        start_expiration_date: string;
                        end_expiration_date: string;
                        time_offset?: number;
                    };
                    params?: {
                        user_id_type?:
                            | "open_id"
                            | "people_corehr_id"
                            | "union_id"
                            | "user_id";
                    };
                    path?: { leave_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                records: Array<{
                                    id: string;
                                    employment_id: string;
                                    leave_type_id: string;
                                    granting_quantity: string;
                                    left_granting_quantity: string;
                                    granting_unit: number;
                                    effective_date: string;
                                    expiration_date: string;
                                    reason: Array<{
                                        lang: string;
                                        value: string;
                                    }>;
                                    is_update_by_external: boolean;
                                    accrual_source: number;
                                    leave_sub_type_id: string;
                                    section_type?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/leave_employ_expire_records/:leave_id`,
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
         * 考勤班次
         */
        shift: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=shift&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/create document }
             *
             * 创建班次
             *
             * 班次是描述一次考勤任务时间规则的统称，比如一天打多少次卡，每次卡的上下班时间，晚到多长时间算迟到，晚到多长时间算缺卡等。
             *
             * - 创建一个考勤组前，必须先创建一个或者多个班次。;- 一个公司内的班次是共享的，你可以直接引用他人创建的班次，但是需要注意的是，若他人修改了班次，会影响到你的考勤组及其考勤结果。
             */
            create: async (
                payload?: {
                    data: {
                        shift_name: string;
                        punch_times: number;
                        sub_shift_leader_ids?: Array<string>;
                        is_flexible?: boolean;
                        flexible_minutes?: number;
                        flexible_rule?: Array<{
                            flexible_early_minutes: number;
                            flexible_late_minutes: number;
                        }>;
                        no_need_off?: boolean;
                        punch_time_rule: Array<{
                            on_time: string;
                            off_time: string;
                            late_minutes_as_late: number;
                            late_minutes_as_lack: number;
                            on_advance_minutes: number;
                            early_minutes_as_early: number;
                            early_minutes_as_lack: number;
                            off_delay_minutes: number;
                            late_minutes_as_serious_late?: number;
                            no_need_on?: boolean;
                            no_need_off?: boolean;
                        }>;
                        late_off_late_on_rule?: Array<{
                            late_off_minutes: number;
                            late_on_minutes: number;
                        }>;
                        rest_time_rule?: Array<{
                            rest_begin_time: string;
                            rest_end_time: string;
                        }>;
                        overtime_rule?: Array<{
                            on_overtime: string;
                            off_overtime: string;
                        }>;
                        day_type?: number;
                        overtime_rest_time_rule?: Array<{
                            rest_begin_time: string;
                            rest_end_time: string;
                        }>;
                        late_minutes_as_serious_late?: number;
                        shift_middle_time_rule?: {
                            middle_time_type?: number;
                            fixed_middle_time?: string;
                        };
                        late_off_late_on_setting?: {
                            late_off_base_on_time_type?: number;
                            late_on_base_on_time_type?: number;
                        };
                    };
                    params?: { employee_type?: "employee_id" | "employee_no" };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                shift?: {
                                    shift_id: string;
                                    shift_name: string;
                                    punch_times: number;
                                    sub_shift_leader_ids?: Array<string>;
                                    is_flexible?: boolean;
                                    flexible_minutes?: number;
                                    flexible_rule?: Array<{
                                        flexible_early_minutes: number;
                                        flexible_late_minutes: number;
                                    }>;
                                    no_need_off?: boolean;
                                    punch_time_rule: Array<{
                                        on_time: string;
                                        off_time: string;
                                        late_minutes_as_late: number;
                                        late_minutes_as_lack: number;
                                        on_advance_minutes: number;
                                        early_minutes_as_early: number;
                                        early_minutes_as_lack: number;
                                        off_delay_minutes: number;
                                        late_minutes_as_serious_late?: number;
                                        no_need_on?: boolean;
                                        no_need_off?: boolean;
                                    }>;
                                    late_off_late_on_rule?: Array<{
                                        late_off_minutes: number;
                                        late_on_minutes: number;
                                    }>;
                                    rest_time_rule?: Array<{
                                        rest_begin_time: string;
                                        rest_end_time: string;
                                    }>;
                                    overtime_rule?: Array<{
                                        on_overtime: string;
                                        off_overtime: string;
                                    }>;
                                    day_type?: number;
                                    overtime_rest_time_rule?: Array<{
                                        rest_begin_time: string;
                                        rest_end_time: string;
                                    }>;
                                    late_minutes_as_serious_late?: number;
                                    shift_middle_time_rule?: {
                                        middle_time_type?: number;
                                        fixed_middle_time?: string;
                                    };
                                    late_off_late_on_setting?: {
                                        late_off_base_on_time_type?: number;
                                        late_on_base_on_time_type?: number;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/shifts`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=shift&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/delete document }
             *
             * 删除班次
             *
             * 通过班次 ID 删除班次。
             */
            delete: async (
                payload?: {
                    path: { shift_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/shifts/:shift_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=shift&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/get document }
             *
             * 获取班次详情
             *
             * 通过班次 ID 获取班次详情。
             */
            get: async (
                payload?: {
                    path: { shift_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                shift_id: string;
                                shift_name: string;
                                punch_times: number;
                                sub_shift_leader_ids?: Array<string>;
                                is_flexible?: boolean;
                                flexible_minutes?: number;
                                flexible_rule?: Array<{
                                    flexible_early_minutes: number;
                                    flexible_late_minutes: number;
                                }>;
                                no_need_off?: boolean;
                                punch_time_rule: Array<{
                                    on_time: string;
                                    off_time: string;
                                    late_minutes_as_late: number;
                                    late_minutes_as_lack: number;
                                    on_advance_minutes: number;
                                    early_minutes_as_early: number;
                                    early_minutes_as_lack: number;
                                    off_delay_minutes: number;
                                    late_minutes_as_serious_late?: number;
                                    no_need_on?: boolean;
                                    no_need_off?: boolean;
                                }>;
                                late_off_late_on_rule?: Array<{
                                    late_off_minutes: number;
                                    late_on_minutes: number;
                                }>;
                                rest_time_rule?: Array<{
                                    rest_begin_time: string;
                                    rest_end_time: string;
                                }>;
                                overtime_rule?: Array<{
                                    on_overtime: string;
                                    off_overtime: string;
                                }>;
                                day_type?: number;
                                overtime_rest_time_rule?: Array<{
                                    rest_begin_time: string;
                                    rest_end_time: string;
                                }>;
                                late_minutes_as_serious_late?: number;
                                shift_middle_time_rule?: {
                                    middle_time_type?: number;
                                    fixed_middle_time?: string;
                                };
                                late_off_late_on_setting?: {
                                    late_off_base_on_time_type?: number;
                                    late_on_base_on_time_type?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/shifts/:shift_id`,
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
                                `${this.domain}/open-apis/attendance/v1/shifts`,
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
                                                shift_list?: Array<{
                                                    shift_id: string;
                                                    shift_name: string;
                                                    punch_times: number;
                                                    sub_shift_leader_ids?: Array<string>;
                                                    is_flexible?: boolean;
                                                    flexible_minutes?: number;
                                                    flexible_rule?: Array<{
                                                        flexible_early_minutes: number;
                                                        flexible_late_minutes: number;
                                                    }>;
                                                    no_need_off?: boolean;
                                                    punch_time_rule: Array<{
                                                        on_time: string;
                                                        off_time: string;
                                                        late_minutes_as_late: number;
                                                        late_minutes_as_lack: number;
                                                        on_advance_minutes: number;
                                                        early_minutes_as_early: number;
                                                        early_minutes_as_lack: number;
                                                        off_delay_minutes: number;
                                                        late_minutes_as_serious_late?: number;
                                                        no_need_on?: boolean;
                                                        no_need_off?: boolean;
                                                    }>;
                                                    late_off_late_on_rule?: Array<{
                                                        late_off_minutes: number;
                                                        late_on_minutes: number;
                                                    }>;
                                                    rest_time_rule?: Array<{
                                                        rest_begin_time: string;
                                                        rest_end_time: string;
                                                    }>;
                                                    overtime_rule?: Array<{
                                                        on_overtime: string;
                                                        off_overtime: string;
                                                    }>;
                                                    day_type?: number;
                                                    overtime_rest_time_rule?: Array<{
                                                        rest_begin_time: string;
                                                        rest_end_time: string;
                                                    }>;
                                                    late_minutes_as_serious_late?: number;
                                                    shift_middle_time_rule?: {
                                                        middle_time_type?: number;
                                                        fixed_middle_time?: string;
                                                    };
                                                    late_off_late_on_setting?: {
                                                        late_off_base_on_time_type?: number;
                                                        late_on_base_on_time_type?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=shift&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/list document }
             *
             * 获取班次列表
             *
             * 翻页获取所有班次列表。
             */
            list: async (
                payload?: {
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
                                shift_list?: Array<{
                                    shift_id: string;
                                    shift_name: string;
                                    punch_times: number;
                                    sub_shift_leader_ids?: Array<string>;
                                    is_flexible?: boolean;
                                    flexible_minutes?: number;
                                    flexible_rule?: Array<{
                                        flexible_early_minutes: number;
                                        flexible_late_minutes: number;
                                    }>;
                                    no_need_off?: boolean;
                                    punch_time_rule: Array<{
                                        on_time: string;
                                        off_time: string;
                                        late_minutes_as_late: number;
                                        late_minutes_as_lack: number;
                                        on_advance_minutes: number;
                                        early_minutes_as_early: number;
                                        early_minutes_as_lack: number;
                                        off_delay_minutes: number;
                                        late_minutes_as_serious_late?: number;
                                        no_need_on?: boolean;
                                        no_need_off?: boolean;
                                    }>;
                                    late_off_late_on_rule?: Array<{
                                        late_off_minutes: number;
                                        late_on_minutes: number;
                                    }>;
                                    rest_time_rule?: Array<{
                                        rest_begin_time: string;
                                        rest_end_time: string;
                                    }>;
                                    overtime_rule?: Array<{
                                        on_overtime: string;
                                        off_overtime: string;
                                    }>;
                                    day_type?: number;
                                    overtime_rest_time_rule?: Array<{
                                        rest_begin_time: string;
                                        rest_end_time: string;
                                    }>;
                                    late_minutes_as_serious_late?: number;
                                    shift_middle_time_rule?: {
                                        middle_time_type?: number;
                                        fixed_middle_time?: string;
                                    };
                                    late_off_late_on_setting?: {
                                        late_off_base_on_time_type?: number;
                                        late_on_base_on_time_type?: number;
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/shifts`,
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
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=shift&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/query document }
             *
             * 按名称查询班次
             *
             * 通过班次的名称查询班次信息。
             */
            query: async (
                payload?: {
                    params: { shift_name: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                shift_id: string;
                                shift_name: string;
                                punch_times: number;
                                sub_shift_leader_ids?: Array<string>;
                                is_flexible?: boolean;
                                flexible_minutes?: number;
                                flexible_rule?: Array<{
                                    flexible_early_minutes: number;
                                    flexible_late_minutes: number;
                                }>;
                                no_need_off?: boolean;
                                punch_time_rule: Array<{
                                    on_time: string;
                                    off_time: string;
                                    late_minutes_as_late: number;
                                    late_minutes_as_lack: number;
                                    on_advance_minutes: number;
                                    early_minutes_as_early: number;
                                    early_minutes_as_lack: number;
                                    off_delay_minutes: number;
                                    late_minutes_as_serious_late?: number;
                                    no_need_on?: boolean;
                                    no_need_off?: boolean;
                                }>;
                                late_off_late_on_rule?: Array<{
                                    late_off_minutes: number;
                                    late_on_minutes: number;
                                }>;
                                rest_time_rule?: Array<{
                                    rest_begin_time: string;
                                    rest_end_time: string;
                                }>;
                                overtime_rule?: Array<{
                                    on_overtime: string;
                                    off_overtime: string;
                                }>;
                                day_type?: number;
                                overtime_rest_time_rule?: Array<{
                                    rest_begin_time: string;
                                    rest_end_time: string;
                                }>;
                                late_minutes_as_serious_late?: number;
                                shift_middle_time_rule?: {
                                    middle_time_type?: number;
                                    fixed_middle_time?: string;
                                };
                                late_off_late_on_setting?: {
                                    late_off_base_on_time_type?: number;
                                    late_on_base_on_time_type?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/shifts/query`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * 假勤审批
         */
        userApproval: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_approval&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/create document }
             *
             * 写入审批结果
             *
             * 由于部分企业使用的是自己的审批系统，而不是飞书审批系统，因此员工的请假、加班等数据无法流入到飞书考勤系统中，导致员工在请假时间段内依然收到打卡提醒，并且被记为缺卡。;;对于这些只使用飞书考勤系统，而未使用飞书审批系统的企业，可以通过考勤开放接口的形式，将三方审批结果数据回写到飞书考勤系统中。
             *
             * 目前支持写入加班、请假、出差和外出这四种审批结果，写入只会追加(insert)，不会覆盖(update)（开放接口导入的加班假期记录，在管理后台的假期加班里查不到，只能通过[获取审批通过数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/query)来查询）
             */
            create: async (
                payload?: {
                    data?: {
                        user_approval?: {
                            user_id: string;
                            date: string;
                            outs?: Array<{
                                uniq_id: string;
                                unit: number;
                                interval: number;
                                start_time: string;
                                end_time: string;
                                i18n_names: {
                                    ch?: string;
                                    en?: string;
                                    ja?: string;
                                };
                                default_locale: string;
                                reason: string;
                                idempotent_id?: string;
                            }>;
                            leaves?: Array<{
                                uniq_id?: string;
                                unit: number;
                                interval: number;
                                start_time: string;
                                end_time: string;
                                i18n_names: {
                                    ch?: string;
                                    en?: string;
                                    ja?: string;
                                };
                                default_locale: "ch" | "en" | "ja";
                                reason: string;
                                idempotent_id?: string;
                            }>;
                            overtime_works?: Array<{
                                duration: number;
                                unit: number;
                                category: number;
                                type: number;
                                start_time: string;
                                end_time: string;
                                reason?: string;
                                idempotent_id?: string;
                            }>;
                            trips?: Array<{
                                start_time: string;
                                end_time: string;
                                reason: string;
                                approve_pass_time: string;
                                approve_apply_time: string;
                                idempotent_id?: string;
                            }>;
                            time_zone?: string;
                        };
                    };
                    params: { employee_type: "employee_id" | "employee_no" };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_approval?: {
                                    user_id: string;
                                    date: string;
                                    outs?: Array<{
                                        approval_id?: string;
                                        uniq_id: string;
                                        unit: number;
                                        interval: number;
                                        start_time: string;
                                        end_time: string;
                                        i18n_names: {
                                            ch?: string;
                                            en?: string;
                                            ja?: string;
                                        };
                                        default_locale: string;
                                        reason: string;
                                        approve_pass_time?: string;
                                        approve_apply_time?: string;
                                        idempotent_id?: string;
                                    }>;
                                    leaves?: Array<{
                                        approval_id?: string;
                                        uniq_id?: string;
                                        unit: number;
                                        interval: number;
                                        start_time: string;
                                        end_time: string;
                                        i18n_names: {
                                            ch?: string;
                                            en?: string;
                                            ja?: string;
                                        };
                                        default_locale: "ch" | "en" | "ja";
                                        reason: string;
                                        approve_pass_time?: string;
                                        approve_apply_time?: string;
                                        idempotent_id?: string;
                                    }>;
                                    overtime_works?: Array<{
                                        approval_id?: string;
                                        duration: number;
                                        unit: number;
                                        category: number;
                                        type: number;
                                        start_time: string;
                                        end_time: string;
                                        reason?: string;
                                        idempotent_id?: string;
                                    }>;
                                    trips?: Array<{
                                        approval_id?: string;
                                        start_time: string;
                                        end_time: string;
                                        reason: string;
                                        approve_pass_time: string;
                                        approve_apply_time: string;
                                        idempotent_id?: string;
                                    }>;
                                    time_zone?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_approvals`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_approval&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/query document }
             *
             * 获取审批通过数据
             *
             * 获取员工在某段时间内的请假、加班、外出和出差四种审批的通过数据。
             *
             * 请假的假期时长字段，暂未开放提供，待后续提供。
             */
            query: async (
                payload?: {
                    data: {
                        user_ids: Array<string>;
                        check_date_from: number;
                        check_date_to: number;
                        check_date_type?:
                            | "PeriodTime"
                            | "CreateTime"
                            | "UpdateTime";
                        status?: number;
                        check_time_from?: string;
                        check_time_to?: string;
                    };
                    params: { employee_type: "employee_id" | "employee_no" };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_approvals?: Array<{
                                    user_id: string;
                                    date: string;
                                    outs?: Array<{
                                        approval_id?: string;
                                        uniq_id: string;
                                        unit: number;
                                        interval: number;
                                        start_time: string;
                                        end_time: string;
                                        i18n_names: {
                                            ch?: string;
                                            en?: string;
                                            ja?: string;
                                        };
                                        default_locale: string;
                                        reason: string;
                                        approve_pass_time?: string;
                                        approve_apply_time?: string;
                                        idempotent_id?: string;
                                    }>;
                                    leaves?: Array<{
                                        approval_id?: string;
                                        uniq_id?: string;
                                        unit: number;
                                        interval: number;
                                        start_time: string;
                                        end_time: string;
                                        i18n_names: {
                                            ch?: string;
                                            en?: string;
                                            ja?: string;
                                        };
                                        default_locale: "ch" | "en" | "ja";
                                        reason: string;
                                        approve_pass_time?: string;
                                        approve_apply_time?: string;
                                        idempotent_id?: string;
                                    }>;
                                    overtime_works?: Array<{
                                        approval_id?: string;
                                        duration: number;
                                        unit: number;
                                        category: number;
                                        type: number;
                                        start_time: string;
                                        end_time: string;
                                        reason?: string;
                                        idempotent_id?: string;
                                    }>;
                                    trips?: Array<{
                                        approval_id?: string;
                                        start_time: string;
                                        end_time: string;
                                        reason: string;
                                        approve_pass_time: string;
                                        approve_apply_time: string;
                                        idempotent_id?: string;
                                    }>;
                                    time_zone?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_approvals/query`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * 考勤排班
         */
        userDailyShift: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_daily_shift&apiName=batch_create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/batch_create document }
             *
             * 创建或修改班表
             *
             * 班表是用来描述考勤组内人员每天按哪个班次进行上班。目前班表支持按一个整月对一位或多位人员进行排班。
             */
            batchCreate: async (
                payload?: {
                    data: {
                        user_daily_shifts: Array<{
                            group_id: string;
                            shift_id: string;
                            month: number;
                            user_id: string;
                            day_no: number;
                            is_clear_schedule?: boolean;
                        }>;
                        operator_id?: string;
                    };
                    params: { employee_type: "employee_id" | "employee_no" };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_daily_shifts?: Array<{
                                    group_id: string;
                                    shift_id: string;
                                    month: number;
                                    user_id: string;
                                    day_no: number;
                                    is_clear_schedule?: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_daily_shifts/batch_create`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_daily_shift&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/query document }
             *
             * 查询班表信息
             *
             * 支持查询多个用户的排班情况，查询的时间跨度不能超过 30 天。
             */
            query: async (
                payload?: {
                    data: {
                        user_ids: Array<string>;
                        check_date_from: number;
                        check_date_to: number;
                    };
                    params: { employee_type: "employee_id" | "employee_no" };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_daily_shifts?: Array<{
                                    group_id: string;
                                    shift_id: string;
                                    month: number;
                                    user_id: string;
                                    day_no: number;
                                    is_clear_schedule?: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_daily_shifts/query`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * user_flow
         */
        userFlow: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_flow&apiName=batch_create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/batch_create document }
             *
             * 导入打卡流水记录
             *
             * 导入授权内员工的打卡流水记录。导入后，会根据员工所在的考勤组班次规则，计算最终的打卡状态与结果。
             *
             * 适用于考勤机数据导入等场景。
             */
            batchCreate: async (
                payload?: {
                    data: {
                        flow_records: Array<{
                            user_id: string;
                            creator_id: string;
                            location_name: string;
                            check_time: string;
                            comment: string;
                            record_id?: string;
                            longitude?: number;
                            latitude?: number;
                            ssid?: string;
                            bssid?: string;
                            is_field?: boolean;
                            is_wifi?: boolean;
                            type?: number;
                            photo_urls?: Array<string>;
                            device_id?: string;
                            check_result?:
                                | "NoNeedCheck"
                                | "SystemCheck"
                                | "Normal"
                                | "Early"
                                | "Late"
                                | "SeriousLate"
                                | "Lack"
                                | "Invalid"
                                | "None"
                                | "Todo";
                            external_id?: string;
                            idempotent_id?: string;
                        }>;
                    };
                    params: { employee_type: "employee_id" | "employee_no" };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                flow_records?: Array<{
                                    user_id: string;
                                    creator_id: string;
                                    location_name: string;
                                    check_time: string;
                                    comment: string;
                                    record_id?: string;
                                    longitude?: number;
                                    latitude?: number;
                                    ssid?: string;
                                    bssid?: string;
                                    is_field?: boolean;
                                    is_wifi?: boolean;
                                    type?: number;
                                    photo_urls?: Array<string>;
                                    device_id?: string;
                                    check_result?:
                                        | "NoNeedCheck"
                                        | "SystemCheck"
                                        | "Normal"
                                        | "Early"
                                        | "Late"
                                        | "SeriousLate"
                                        | "Lack"
                                        | "Invalid"
                                        | "None"
                                        | "Todo";
                                    external_id?: string;
                                    idempotent_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_flows/batch_create`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_flow&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/get document }
             *
             * 获取打卡流水记录
             *
             * 通过打卡记录 ID 获取用户的打卡流水记录。
             */
            get: async (
                payload?: {
                    params: { employee_type: "employee_id" | "employee_no" };
                    path: { user_flow_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_id: string;
                                creator_id: string;
                                location_name: string;
                                check_time: string;
                                comment: string;
                                record_id?: string;
                                longitude?: number;
                                latitude?: number;
                                ssid?: string;
                                bssid?: string;
                                is_field?: boolean;
                                is_wifi?: boolean;
                                type?: number;
                                photo_urls?: Array<string>;
                                device_id?: string;
                                check_result?:
                                    | "NoNeedCheck"
                                    | "SystemCheck"
                                    | "Normal"
                                    | "Early"
                                    | "Late"
                                    | "SeriousLate"
                                    | "Lack"
                                    | "Invalid"
                                    | "None"
                                    | "Todo";
                                external_id?: string;
                                idempotent_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_flows/:user_flow_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_flow&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/query document }
             *
             * 批量查询打卡流水记录
             *
             * 批量查询授权内员工的实际打卡流水记录。例如，企业给一个员工设定的班次是上午 9 点和下午 6 点各打一次上下班卡，但是该员工在这期间打了多次卡，该接口会把所有的打卡记录都返回。
             *
             * 如果只需获取打卡结果，而不需要详细的打卡数据，可使用“获取打卡结果”的接口。
             */
            query: async (
                payload?: {
                    data: {
                        user_ids: Array<string>;
                        check_time_from: string;
                        check_time_to: string;
                    };
                    params: {
                        employee_type: "employee_id" | "employee_no";
                        include_terminated_user?: boolean;
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
                                user_flow_results?: Array<{
                                    user_id: string;
                                    creator_id: string;
                                    location_name: string;
                                    check_time: string;
                                    comment: string;
                                    record_id?: string;
                                    longitude?: number;
                                    latitude?: number;
                                    ssid?: string;
                                    bssid?: string;
                                    is_field?: boolean;
                                    is_wifi?: boolean;
                                    type?: number;
                                    photo_urls?: Array<string>;
                                    device_id?: string;
                                    check_result?:
                                        | "NoNeedCheck"
                                        | "SystemCheck"
                                        | "Normal"
                                        | "Early"
                                        | "Late"
                                        | "SeriousLate"
                                        | "Lack"
                                        | "Invalid"
                                        | "None"
                                        | "Todo";
                                    external_id?: string;
                                    idempotent_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_flows/query`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * 用户设置
         */
        userSetting: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_setting&apiName=modify&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_setting/modify document }
             *
             * 修改用户设置
             *
             * 修改授权内员工的用户设置信息，包括人脸照片文件 ID。
             */
            modify: async (
                payload?: {
                    data?: {
                        user_setting?: {
                            user_id: string;
                            face_key: string;
                            face_key_update_time?: string;
                        };
                    };
                    params: { employee_type: "employee_id" | "employee_no" };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_setting?: {
                                    user_id: string;
                                    face_key: string;
                                    face_key_update_time?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_settings/modify`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_setting&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_setting/query document }
             *
             * 批量查询用户设置
             *
             * 批量查询授权内员工的用户设置信息，包括人脸照片文件 ID、人脸照片更新时间。
             */
            query: async (
                payload?: {
                    data: { user_ids: Array<string> };
                    params: { employee_type: "employee_id" | "employee_no" };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_settings?: Array<{
                                    user_id: string;
                                    face_key: string;
                                    face_key_update_time?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_settings/query`,
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
         * 考勤统计
         */
        userStatsData: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_stats_data&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_data/query document }
             *
             * 查询统计数据
             *
             * 查询日度统计或月度统计的统计数据。
             */
            query: async (
                payload?: {
                    data: {
                        locale: "en" | "ja" | "zh";
                        stats_type: "daily" | "month";
                        start_date: number;
                        end_date: number;
                        user_ids?: Array<string>;
                        need_history?: boolean;
                        current_group_only?: boolean;
                        user_id?: string;
                    };
                    params: { employee_type: "employee_id" | "employee_no" };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_datas?: Array<{
                                    name: string;
                                    user_id: string;
                                    datas?: Array<{
                                        code: string;
                                        value: string;
                                        features?: Array<{
                                            key: string;
                                            value: string;
                                        }>;
                                        title?: string;
                                        duration_num?: {
                                            day?: string;
                                            half_day?: string;
                                            hour?: string;
                                            half_hour?: string;
                                            minute?: string;
                                        };
                                    }>;
                                }>;
                                invalid_user_list?: Array<string>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_stats_datas/query`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * user_stats_field
         */
        userStatsField: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_stats_field&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_field/query document }
             *
             * 查询统计表头
             *
             * 查询考勤统计支持的日度统计或月度统计的统计表头。
             */
            query: async (
                payload?: {
                    data: {
                        locale: "en" | "ja" | "zh";
                        stats_type: "daily" | "month";
                        start_date: number;
                        end_date: number;
                    };
                    params: { employee_type: "employee_id" | "employee_no" };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_stats_field?: {
                                    stats_type: "daily" | "month";
                                    user_id: string;
                                    fields: Array<{
                                        code: string;
                                        title: string;
                                        child_fields?: Array<{
                                            code: string;
                                            title: string;
                                            time_unit?: string;
                                        }>;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_stats_fields/query`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * user_stats_view
         */
        userStatsView: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_stats_view&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_view/query document }
             *
             * 查询统计设置
             *
             * 查询开发者定制的日度统计或月度统计的统计报表表头设置信息。
             */
            query: async (
                payload?: {
                    data: {
                        locale: "en" | "ja" | "zh";
                        stats_type: "daily" | "month";
                        user_id?: string;
                    };
                    params: { employee_type: "employee_id" | "employee_no" };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                view?: {
                                    view_id: string;
                                    stats_type: "daily" | "month";
                                    user_id: string;
                                    items?: Array<{
                                        code: string;
                                        title?: string;
                                        child_items?: Array<{
                                            code: string;
                                            value: string;
                                            title?: string;
                                            column_type?: number;
                                            read_only?: boolean;
                                            min_value?: string;
                                            max_value?: string;
                                        }>;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_stats_views/query`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_stats_view&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_view/update document }
             *
             * 更新统计设置
             *
             * 更新开发者定制的日度统计或月度统计的统计报表表头设置信息。
             */
            update: async (
                payload?: {
                    data: {
                        view: {
                            view_id: string;
                            stats_type: "daily" | "month";
                            user_id: string;
                            items?: Array<{
                                code: string;
                                child_items?: Array<{
                                    code: string;
                                    value: string;
                                }>;
                            }>;
                        };
                    };
                    params: { employee_type: "employee_id" | "employee_no" };
                    path: { user_stats_view_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                view?: {
                                    view_id: string;
                                    stats_type: "daily" | "month";
                                    user_id: string;
                                    items?: Array<{
                                        code: string;
                                        title?: string;
                                        child_items?: Array<{
                                            code: string;
                                            value: string;
                                            title?: string;
                                            column_type?: number;
                                            read_only?: boolean;
                                            min_value?: string;
                                            max_value?: string;
                                        }>;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_stats_views/:user_stats_view_id`,
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
         * 考勤记录
         */
        userTask: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_task&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task/query document }
             *
             * 获取打卡结果
             *
             * 获取企业内员工的实际打卡结果，包括上班打卡结果和下班打卡结果。
             *
             * - 如果企业给一个员工设定的班次是上午 9 点和下午 6 点各打一次上下班卡，即使员工在这期间打了多次卡，该接口也只会返回 1 条记录。;- 如果要获取打卡的详细数据，如打卡位置等信息，可使用“获取打卡流水记录”或“批量查询打卡流水记录”的接口。
             */
            query: async (
                payload?: {
                    data: {
                        user_ids: Array<string>;
                        check_date_from: number;
                        check_date_to: number;
                        need_overtime_result?: boolean;
                    };
                    params: {
                        employee_type: "employee_id" | "employee_no";
                        ignore_invalid_users?: boolean;
                        include_terminated_user?: boolean;
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
                                user_task_results?: Array<{
                                    result_id: string;
                                    user_id: string;
                                    employee_name: string;
                                    day: number;
                                    group_id: string;
                                    shift_id: string;
                                    records: Array<{
                                        check_in_record_id: string;
                                        check_in_record?: {
                                            user_id: string;
                                            creator_id: string;
                                            location_name: string;
                                            check_time: string;
                                            comment: string;
                                            record_id?: string;
                                            longitude?: number;
                                            latitude?: number;
                                            ssid?: string;
                                            bssid?: string;
                                            is_field?: boolean;
                                            is_wifi?: boolean;
                                            type?: number;
                                            photo_urls?: Array<string>;
                                            device_id?: string;
                                            check_result?:
                                                | "NoNeedCheck"
                                                | "SystemCheck"
                                                | "Normal"
                                                | "Early"
                                                | "Late"
                                                | "SeriousLate"
                                                | "Lack"
                                                | "Invalid"
                                                | "None"
                                                | "Todo";
                                            external_id?: string;
                                            idempotent_id?: string;
                                        };
                                        check_out_record_id: string;
                                        check_out_record?: {
                                            user_id: string;
                                            creator_id: string;
                                            location_name: string;
                                            check_time: string;
                                            comment: string;
                                            record_id?: string;
                                            longitude?: number;
                                            latitude?: number;
                                            ssid?: string;
                                            bssid?: string;
                                            is_field?: boolean;
                                            is_wifi?: boolean;
                                            type?: number;
                                            photo_urls?: Array<string>;
                                            device_id?: string;
                                            check_result?:
                                                | "NoNeedCheck"
                                                | "SystemCheck"
                                                | "Normal"
                                                | "Early"
                                                | "Late"
                                                | "SeriousLate"
                                                | "Lack"
                                                | "Invalid"
                                                | "None"
                                                | "Todo";
                                            external_id?: string;
                                            idempotent_id?: string;
                                        };
                                        check_in_result:
                                            | "NoNeedCheck"
                                            | "SystemCheck"
                                            | "Normal"
                                            | "Early"
                                            | "Late"
                                            | "Lack";
                                        check_out_result:
                                            | "NoNeedCheck"
                                            | "SystemCheck"
                                            | "Normal"
                                            | "Early"
                                            | "Late"
                                            | "Lack";
                                        check_in_result_supplement:
                                            | "None"
                                            | "ManagerModification"
                                            | "CardReplacement"
                                            | "ShiftChange"
                                            | "Travel"
                                            | "Leave"
                                            | "GoOut"
                                            | "CardReplacementApplication"
                                            | "FieldPunch";
                                        check_out_result_supplement:
                                            | "None"
                                            | "ManagerModification"
                                            | "CardReplacement"
                                            | "ShiftChange"
                                            | "Travel"
                                            | "Leave"
                                            | "GoOut"
                                            | "CardReplacementApplication"
                                            | "FieldPunch";
                                        check_in_shift_time?: string;
                                        check_out_shift_time?: string;
                                        task_shift_type?: number;
                                    }>;
                                }>;
                                invalid_user_ids?: Array<string>;
                                unauthorized_user_ids?: Array<string>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_tasks/query`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * 考勤补卡
         */
        userTaskRemedy: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_task_remedy&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/create document }
             *
             * 通知补卡审批发起
             *
             * 对于只使用飞书考勤系统而未使用飞书审批系统的企业，可以通过该接口，将在三方审批系统中发起的补卡审批数据，写入到飞书考勤系统中，状态为审批中。写入后可以由[通知审批状态更新](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/approval_info/process) 进行状态更新
             */
            create: async (
                payload?: {
                    data: {
                        user_id: string;
                        remedy_date: number;
                        punch_no: number;
                        work_type: number;
                        remedy_time: string;
                        reason: string;
                        time?: string;
                    };
                    params: { employee_type: "employee_id" | "employee_no" };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_remedy?: {
                                    user_id: string;
                                    remedy_date: number;
                                    punch_no: number;
                                    work_type: number;
                                    approval_id?: string;
                                    remedy_time: string;
                                    status?: number;
                                    reason: string;
                                    time?: string;
                                    time_zone?: string;
                                    create_time?: string;
                                    update_time?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_task_remedys`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_task_remedy&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/query document }
             *
             * 获取补卡记录
             *
             * 获取授权内员工的补卡记录。
             */
            query: async (
                payload?: {
                    data: {
                        user_ids: Array<string>;
                        check_time_from: string;
                        check_time_to: string;
                        check_date_type?:
                            | "PeriodTime"
                            | "CreateTime"
                            | "UpdateTime";
                        status?: number;
                    };
                    params: { employee_type: "employee_id" | "employee_no" };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_remedys?: Array<{
                                    user_id: string;
                                    remedy_date: number;
                                    punch_no: number;
                                    work_type: number;
                                    approval_id?: string;
                                    remedy_time: string;
                                    status?: number;
                                    reason: string;
                                    time?: string;
                                    time_zone?: string;
                                    create_time?: string;
                                    update_time?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_task_remedys/query`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_task_remedy&apiName=query_user_allowed_remedys&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/query_user_allowed_remedys document }
             *
             * 获取用户可补卡时间
             *
             * 获取用户某天可以补的第几次上 / 下班卡的时间。
             */
            queryUserAllowedRemedys: async (
                payload?: {
                    data: { user_id: string; remedy_date: number };
                    params: { employee_type: "employee_id" | "employee_no" };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_allowed_remedys?: Array<{
                                    user_id: string;
                                    remedy_date: number;
                                    is_free_punch?: boolean;
                                    punch_no?: number;
                                    work_type?: number;
                                    punch_status?: string;
                                    normal_punch_time?: string;
                                    remedy_start_time?: string;
                                    remedy_end_time?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/attendance/v1/user_task_remedys/query_user_allowed_remedys`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
             * approval_info
             */
            approvalInfo: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=approval_info&apiName=process&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/approval_info/process document }
                 *
                 * 通知审批状态更新
                 *
                 * 对于只使用飞书考勤系统而未使用飞书审批系统的企业，可以通过该接口更新写入飞书考勤系统中的三方系统审批状态，例如请假、加班、外出、出差、补卡等审批，状态包括通过、不通过、撤销等。
                 *
                 * 发起状态的审批才可以被更新为通过、不通过，已经通过的审批才可以被更新为撤销。
                 */
                process: async (
                    payload?: {
                        data: {
                            approval_id: string;
                            approval_type: string;
                            status: number;
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
                                    approval_info?: {
                                        approval_id: string;
                                        approval_type:
                                            | "leave"
                                            | "overtime"
                                            | "trip"
                                            | "out"
                                            | "remedy";
                                        status: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/approval_infos/process`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * archive_rule
             */
            archiveRule: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=archive_rule&apiName=del_report&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=del_report&project=attendance&resource=archive_rule&version=v1 document }
                 */
                delReport: async (
                    payload?: {
                        data: {
                            month: string;
                            operator_id: string;
                            archive_rule_id: string;
                            user_ids?: Array<string>;
                        };
                        params: { employee_type: string };
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
                                `${this.domain}/open-apis/attendance/v1/archive_rule/del_report`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
                                    `${this.domain}/open-apis/attendance/v1/archive_rule`,
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
                                                    items?: Array<{
                                                        report_id?: string;
                                                        report_name?: {
                                                            zh?: string;
                                                            en?: string;
                                                            ja?: string;
                                                        };
                                                        archive_rule_id?: string;
                                                        archive_rule_name?: {
                                                            zh?: string;
                                                            en?: string;
                                                            ja?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=archive_rule&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=attendance&resource=archive_rule&version=v1 document }
                 */
                list: async (
                    payload?: {
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
                                    items?: Array<{
                                        report_id?: string;
                                        report_name?: {
                                            zh?: string;
                                            en?: string;
                                            ja?: string;
                                        };
                                        archive_rule_id?: string;
                                        archive_rule_name?: {
                                            zh?: string;
                                            en?: string;
                                            ja?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/archive_rule`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=archive_rule&apiName=upload_report&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_report&project=attendance&resource=archive_rule&version=v1 document }
                 */
                uploadReport: async (
                    payload?: {
                        data: {
                            month: string;
                            operator_id: string;
                            archive_report_datas?: Array<{
                                member_id: string;
                                start_time: string;
                                end_time: string;
                                field_datas?: Array<{
                                    code: string;
                                    value?: string;
                                }>;
                            }>;
                            archive_rule_id: string;
                        };
                        params: { employee_type: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    invalid_code?: Array<string>;
                                    invalid_member_id?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/archive_rule/upload_report`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=archive_rule&apiName=user_stats_fields_query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=user_stats_fields_query&project=attendance&resource=archive_rule&version=v1 document }
                 */
                userStatsFieldsQuery: async (
                    payload?: {
                        data: {
                            locale?: string;
                            month: string;
                            archive_rule_id: string;
                            operator_id: string;
                        };
                        params: { employee_type: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    archive_report_fields?: Array<{
                                        code?: string;
                                        title?: string;
                                        upper_titles?: Array<string>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/archive_rule/user_stats_fields_query`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * 文件
             */
            file: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=file&apiName=download&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/file/download document }
                 *
                 * 下载文件
                 *
                 * 通过文件 ID 下载指定的文件。
                 */
                download: async (
                    payload?: {
                        path: { file_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/files/:file_id/download`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    const checkIsReadable = () => {
                        const consumedError =
                            "The stream has already been consumed";
                        if (!res.readable) {
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
                                res.pipe(writableStream);
                            });
                        },
                        getReadableStream: () => {
                            checkIsReadable();
                            return res as Readable;
                        },
                    };
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=file&apiName=upload&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/file/upload document }
                 *
                 * 上传文件
                 *
                 * 上传文件并获取文件 ID，可用于“修改用户设置”接口中的 face_key 参数。
                 */
                upload: async (
                    payload?: {
                        data?: { file?: Buffer | fs.ReadStream };
                        params: { file_name: string };
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
                                data?: { file?: { file_id: string } };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/files/upload`,
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
             * 考勤组管理
             */
            group: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=group&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/create document }
                 *
                 * 创建或修改考勤组
                 *
                 * 考勤组，是对部门或者员工在某个特定场所及特定时间段内的出勤情况（包括上下班、迟到、早退、病假、婚假、丧假、公休、工作时间、加班情况等）的一种规则设定。;;通过设置考勤组，可以从部门、员工两个维度，来设定考勤方式、考勤时间、考勤地点等考勤规则。
                 *
                 * 出于安全考虑，目前通过该接口只允许修改自己创建的考勤组。
                 */
                create: async (
                    payload?: {
                        data: {
                            group: {
                                group_id?: string;
                                group_name: string;
                                time_zone: string;
                                bind_dept_ids?: Array<string>;
                                except_dept_ids?: Array<string>;
                                bind_user_ids?: Array<string>;
                                except_user_ids?: Array<string>;
                                group_leader_ids: Array<string>;
                                sub_group_leader_ids?: Array<string>;
                                allow_out_punch?: boolean;
                                out_punch_need_approval?: boolean;
                                out_punch_need_post_approval?: boolean;
                                out_punch_need_remark?: boolean;
                                out_punch_need_photo?: boolean;
                                out_punch_allowed_hide_addr?: boolean;
                                out_punch_allowed_adjust_addr?: boolean;
                                adjust_range?: number;
                                allow_pc_punch?: boolean;
                                allow_remedy?: boolean;
                                remedy_limit?: boolean;
                                remedy_limit_count?: number;
                                remedy_date_limit?: boolean;
                                remedy_date_num?: number;
                                allow_remedy_type_lack?: boolean;
                                allow_remedy_type_late?: boolean;
                                allow_remedy_type_early?: boolean;
                                allow_remedy_type_normal?: boolean;
                                show_cumulative_time?: boolean;
                                show_over_time?: boolean;
                                hide_staff_punch_time?: boolean;
                                face_punch?: boolean;
                                face_punch_cfg?: number;
                                face_live_need_action?: boolean;
                                face_downgrade?: boolean;
                                replace_basic_pic?: boolean;
                                machines?: Array<{
                                    machine_sn: string;
                                    machine_name: string;
                                }>;
                                gps_range?: number;
                                locations?: Array<{
                                    location_name: string;
                                    location_type: number;
                                    latitude?: number;
                                    longitude?: number;
                                    ssid?: string;
                                    bssid?: string;
                                    map_type?: number;
                                    address?: string;
                                    ip?: string;
                                    feature?: string;
                                    gps_range?: number;
                                }>;
                                group_type: number;
                                punch_day_shift_ids: Array<string>;
                                free_punch_cfg?: {
                                    free_start_time: string;
                                    free_end_time: string;
                                    punch_day: number;
                                    work_day_no_punch_as_lack?: boolean;
                                    work_hours_demand?: boolean;
                                    work_hours?: number;
                                };
                                calendar_id: number;
                                need_punch_special_days?: Array<{
                                    punch_day: number;
                                    shift_id: string;
                                }>;
                                no_need_punch_special_days?: Array<{
                                    punch_day: number;
                                    shift_id: string;
                                }>;
                                work_day_no_punch_as_lack?: boolean;
                                effect_now?: boolean;
                                remedy_period_type?: number;
                                remedy_period_custom_date?: number;
                                punch_type?: number;
                                rest_clockIn_need_approval?: boolean;
                                clockIn_need_photo?: boolean;
                                member_status_change?: {
                                    onboarding_on_no_need_punch?: boolean;
                                    onboarding_off_no_need_punch?: boolean;
                                    offboarding_on_no_need_punch?: boolean;
                                    offboarding_off_no_need_punch?: boolean;
                                };
                                leave_need_punch?: boolean;
                                leave_need_punch_cfg?: {
                                    late_minutes_as_late?: number;
                                    late_minutes_as_lack?: number;
                                    early_minutes_as_early?: number;
                                    early_minutes_as_lack?: number;
                                };
                                go_out_need_punch?: number;
                                go_out_need_punch_cfg?: {
                                    late_minutes_as_late?: number;
                                    late_minutes_as_lack?: number;
                                    early_minutes_as_early?: number;
                                    early_minutes_as_lack?: number;
                                };
                                travel_need_punch?: number;
                                travel_need_punch_cfg?: {
                                    late_minutes_as_late?: number;
                                    late_minutes_as_lack?: number;
                                    early_minutes_as_early?: number;
                                    early_minutes_as_lack?: number;
                                };
                                need_punch_members?: Array<{
                                    rule_scope_type?: number;
                                    scope_group_list?: {
                                        scope_value_type?: number;
                                        operation_type?: number;
                                        right?: Array<{
                                            key?: string;
                                            name?: string;
                                        }>;
                                        member_ids?: Array<string>;
                                        custom_field_ID?: string;
                                        custom_field_obj_type?: string;
                                    };
                                }>;
                                no_need_punch_members?: Array<{
                                    rule_scope_type?: number;
                                    scope_group_list?: {
                                        scope_value_type?: number;
                                        operation_type?: number;
                                        right?: Array<{
                                            key?: string;
                                            name?: string;
                                        }>;
                                        member_ids?: Array<string>;
                                        custom_field_ID?: string;
                                        custom_field_obj_type?: string;
                                    };
                                }>;
                                save_auto_changes?: boolean;
                                org_change_auto_adjust?: boolean;
                                bind_default_dept_ids?: Array<string>;
                                bind_default_user_ids?: Array<string>;
                                overtime_clock_cfg?: {
                                    allow_punch_approval?: boolean;
                                    need_clock_over_time_start_and_end?: boolean;
                                };
                                new_calendar_id?: string;
                                allow_apply_punch?: boolean;
                            };
                            operator_id?: string;
                        };
                        params: {
                            employee_type: "employee_id" | "employee_no";
                            dept_type: "open_id";
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
                                    group?: {
                                        group_id?: string;
                                        group_name: string;
                                        time_zone: string;
                                        bind_dept_ids?: Array<string>;
                                        except_dept_ids?: Array<string>;
                                        bind_user_ids?: Array<string>;
                                        except_user_ids?: Array<string>;
                                        group_leader_ids: Array<string>;
                                        sub_group_leader_ids?: Array<string>;
                                        allow_out_punch?: boolean;
                                        out_punch_need_approval?: boolean;
                                        out_punch_need_post_approval?: boolean;
                                        out_punch_need_remark?: boolean;
                                        out_punch_need_photo?: boolean;
                                        out_punch_allowed_hide_addr?: boolean;
                                        out_punch_allowed_adjust_addr?: boolean;
                                        adjust_range?: number;
                                        allow_pc_punch?: boolean;
                                        allow_remedy?: boolean;
                                        remedy_limit?: boolean;
                                        remedy_limit_count?: number;
                                        remedy_date_limit?: boolean;
                                        remedy_date_num?: number;
                                        allow_remedy_type_lack?: boolean;
                                        allow_remedy_type_late?: boolean;
                                        allow_remedy_type_early?: boolean;
                                        allow_remedy_type_normal?: boolean;
                                        show_cumulative_time?: boolean;
                                        show_over_time?: boolean;
                                        hide_staff_punch_time?: boolean;
                                        face_punch?: boolean;
                                        face_punch_cfg?: number;
                                        face_live_need_action?: boolean;
                                        face_downgrade?: boolean;
                                        replace_basic_pic?: boolean;
                                        machines?: Array<{
                                            machine_sn: string;
                                            machine_name: string;
                                        }>;
                                        gps_range?: number;
                                        locations?: Array<{
                                            location_id?: string;
                                            location_name: string;
                                            location_type: number;
                                            latitude?: number;
                                            longitude?: number;
                                            ssid?: string;
                                            bssid?: string;
                                            map_type?: number;
                                            address?: string;
                                            ip?: string;
                                            feature?: string;
                                            gps_range?: number;
                                        }>;
                                        group_type: number;
                                        punch_day_shift_ids: Array<string>;
                                        free_punch_cfg?: {
                                            free_start_time: string;
                                            free_end_time: string;
                                            punch_day: number;
                                            work_day_no_punch_as_lack?: boolean;
                                            work_hours_demand?: boolean;
                                            work_hours?: number;
                                        };
                                        calendar_id: number;
                                        need_punch_special_days?: Array<{
                                            punch_day: number;
                                            shift_id: string;
                                        }>;
                                        no_need_punch_special_days?: Array<{
                                            punch_day: number;
                                            shift_id: string;
                                        }>;
                                        work_day_no_punch_as_lack?: boolean;
                                        effect_now?: boolean;
                                        remedy_period_type?: number;
                                        remedy_period_custom_date?: number;
                                        punch_type?: number;
                                        effect_time?: string;
                                        fixshift_effect_time?: string;
                                        member_effect_time?: string;
                                        rest_clockIn_need_approval?: boolean;
                                        clockIn_need_photo?: boolean;
                                        member_status_change?: {
                                            onboarding_on_no_need_punch?: boolean;
                                            onboarding_off_no_need_punch?: boolean;
                                            offboarding_on_no_need_punch?: boolean;
                                            offboarding_off_no_need_punch?: boolean;
                                        };
                                        leave_need_punch?: boolean;
                                        leave_need_punch_cfg?: {
                                            late_minutes_as_late?: number;
                                            late_minutes_as_lack?: number;
                                            early_minutes_as_early?: number;
                                            early_minutes_as_lack?: number;
                                        };
                                        go_out_need_punch?: number;
                                        go_out_need_punch_cfg?: {
                                            late_minutes_as_late?: number;
                                            late_minutes_as_lack?: number;
                                            early_minutes_as_early?: number;
                                            early_minutes_as_lack?: number;
                                        };
                                        travel_need_punch?: number;
                                        travel_need_punch_cfg?: {
                                            late_minutes_as_late?: number;
                                            late_minutes_as_lack?: number;
                                            early_minutes_as_early?: number;
                                            early_minutes_as_lack?: number;
                                        };
                                        need_punch_members?: Array<{
                                            rule_scope_type?: number;
                                            scope_group_list?: {
                                                scope_value_type?: number;
                                                operation_type?: number;
                                                right?: Array<{
                                                    key?: string;
                                                    name?: string;
                                                }>;
                                                member_ids?: Array<string>;
                                                custom_field_ID?: string;
                                                custom_field_obj_type?: string;
                                            };
                                        }>;
                                        no_need_punch_members?: Array<{
                                            rule_scope_type?: number;
                                            scope_group_list?: {
                                                scope_value_type?: number;
                                                operation_type?: number;
                                                right?: Array<{
                                                    key?: string;
                                                    name?: string;
                                                }>;
                                                member_ids?: Array<string>;
                                                custom_field_ID?: string;
                                                custom_field_obj_type?: string;
                                            };
                                        }>;
                                        save_auto_changes?: boolean;
                                        org_change_auto_adjust?: boolean;
                                        bind_default_dept_ids?: Array<string>;
                                        bind_default_user_ids?: Array<string>;
                                        overtime_clock_cfg?: {
                                            allow_punch_approval?: boolean;
                                            need_clock_over_time_start_and_end?: boolean;
                                        };
                                        new_calendar_id?: string;
                                        allow_apply_punch?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/groups`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=group&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/delete document }
                 *
                 * 删除考勤组
                 *
                 * 通过班次 ID 删除班次。
                 */
                delete: async (
                    payload?: {
                        path: { group_id: string };
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
                                `${this.domain}/open-apis/attendance/v1/groups/:group_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=group&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/get document }
                 *
                 * 获取考勤组详情
                 *
                 * 通过考勤组 ID 获取考勤组详情。
                 */
                get: async (
                    payload?: {
                        params: {
                            employee_type: "employee_id" | "employee_no";
                            dept_type: "open_id";
                        };
                        path: { group_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    group_id?: string;
                                    group_name: string;
                                    time_zone: string;
                                    bind_dept_ids?: Array<string>;
                                    except_dept_ids?: Array<string>;
                                    bind_user_ids?: Array<string>;
                                    except_user_ids?: Array<string>;
                                    group_leader_ids: Array<string>;
                                    sub_group_leader_ids?: Array<string>;
                                    allow_out_punch?: boolean;
                                    out_punch_need_approval?: boolean;
                                    out_punch_need_post_approval?: boolean;
                                    out_punch_need_remark?: boolean;
                                    out_punch_need_photo?: boolean;
                                    out_punch_allowed_hide_addr?: boolean;
                                    out_punch_allowed_adjust_addr?: boolean;
                                    adjust_range?: number;
                                    allow_pc_punch?: boolean;
                                    allow_remedy?: boolean;
                                    remedy_limit?: boolean;
                                    remedy_limit_count?: number;
                                    remedy_date_limit?: boolean;
                                    remedy_date_num?: number;
                                    allow_remedy_type_lack?: boolean;
                                    allow_remedy_type_late?: boolean;
                                    allow_remedy_type_early?: boolean;
                                    allow_remedy_type_normal?: boolean;
                                    show_cumulative_time?: boolean;
                                    show_over_time?: boolean;
                                    hide_staff_punch_time?: boolean;
                                    face_punch?: boolean;
                                    face_punch_cfg?: number;
                                    face_live_need_action?: boolean;
                                    face_downgrade?: boolean;
                                    replace_basic_pic?: boolean;
                                    machines?: Array<{
                                        machine_sn: string;
                                        machine_name: string;
                                    }>;
                                    gps_range?: number;
                                    locations?: Array<{
                                        location_id?: string;
                                        location_name: string;
                                        location_type: number;
                                        latitude?: number;
                                        longitude?: number;
                                        ssid?: string;
                                        bssid?: string;
                                        map_type?: number;
                                        address?: string;
                                        ip?: string;
                                        feature?: string;
                                        gps_range?: number;
                                    }>;
                                    group_type: number;
                                    punch_day_shift_ids: Array<string>;
                                    free_punch_cfg?: {
                                        free_start_time: string;
                                        free_end_time: string;
                                        punch_day: number;
                                        work_day_no_punch_as_lack?: boolean;
                                        work_hours_demand?: boolean;
                                        work_hours?: number;
                                    };
                                    calendar_id: number;
                                    need_punch_special_days?: Array<{
                                        punch_day: number;
                                        shift_id: string;
                                    }>;
                                    no_need_punch_special_days?: Array<{
                                        punch_day: number;
                                        shift_id: string;
                                    }>;
                                    work_day_no_punch_as_lack?: boolean;
                                    remedy_period_type?: number;
                                    remedy_period_custom_date?: number;
                                    punch_type?: number;
                                    effect_time?: string;
                                    fixshift_effect_time?: string;
                                    member_effect_time?: string;
                                    rest_clockIn_need_approval?: boolean;
                                    clockIn_need_photo?: boolean;
                                    member_status_change?: {
                                        onboarding_on_no_need_punch?: boolean;
                                        onboarding_off_no_need_punch?: boolean;
                                        offboarding_on_no_need_punch?: boolean;
                                        offboarding_off_no_need_punch?: boolean;
                                    };
                                    leave_need_punch?: boolean;
                                    leave_need_punch_cfg?: {
                                        late_minutes_as_late?: number;
                                        late_minutes_as_lack?: number;
                                        early_minutes_as_early?: number;
                                        early_minutes_as_lack?: number;
                                    };
                                    go_out_need_punch?: number;
                                    go_out_need_punch_cfg?: {
                                        late_minutes_as_late?: number;
                                        late_minutes_as_lack?: number;
                                        early_minutes_as_early?: number;
                                        early_minutes_as_lack?: number;
                                    };
                                    travel_need_punch?: number;
                                    travel_need_punch_cfg?: {
                                        late_minutes_as_late?: number;
                                        late_minutes_as_lack?: number;
                                        early_minutes_as_early?: number;
                                        early_minutes_as_lack?: number;
                                    };
                                    need_punch_members?: Array<{
                                        rule_scope_type?: number;
                                        scope_group_list?: {
                                            scope_value_type?: number;
                                            operation_type?: number;
                                            right?: Array<{
                                                key?: string;
                                                name?: string;
                                            }>;
                                            member_ids?: Array<string>;
                                            custom_field_ID?: string;
                                            custom_field_obj_type?: string;
                                        };
                                    }>;
                                    no_need_punch_members?: Array<{
                                        rule_scope_type?: number;
                                        scope_group_list?: {
                                            scope_value_type?: number;
                                            operation_type?: number;
                                            right?: Array<{
                                                key?: string;
                                                name?: string;
                                            }>;
                                            member_ids?: Array<string>;
                                            custom_field_ID?: string;
                                            custom_field_obj_type?: string;
                                        };
                                    }>;
                                    save_auto_changes?: boolean;
                                    org_change_auto_adjust?: boolean;
                                    bind_default_dept_ids?: Array<string>;
                                    bind_default_user_ids?: Array<string>;
                                    overtime_clock_cfg?: {
                                        allow_punch_approval?: boolean;
                                        need_clock_over_time_start_and_end?: boolean;
                                    };
                                    new_calendar_id?: string;
                                    allow_apply_punch?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/groups/:group_id`,
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
                                    `${this.domain}/open-apis/attendance/v1/groups`,
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
                                                    group_list?: Array<{
                                                        group_id: string;
                                                        group_name: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=group&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/list document }
                 *
                 * 获取考勤组列表
                 *
                 * 翻页获取所有考勤组列表。
                 */
                list: async (
                    payload?: {
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
                                    group_list?: Array<{
                                        group_id: string;
                                        group_name: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/groups`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=group&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/group/search document }
                 *
                 * 按名称查询考勤组
                 *
                 * 按考勤组名称查询考勤组摘要信息。查询条件支持名称精确匹配和模糊匹配两种方式。查询结果按考勤组修改时间 desc 排序，且最大记录数为 10 条。
                 *
                 * 该接口依赖的数据和考勤组主数据间存在数据同步延时（正常数据同步 2 秒以内），因此在使用该接口时需注意评估数据延迟潜在风险。
                 */
                search: async (
                    payload?: {
                        data: { group_name: string; exactly_matched?: boolean };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    group_list?: Array<{
                                        group_id: string;
                                        group_name: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/groups/search`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * leave_accrual_record
             */
            leaveAccrualRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=leave_accrual_record&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=attendance&resource=leave_accrual_record&version=v1 document }
                 */
                patch: async (
                    payload?: {
                        data: {
                            leave_granting_record_id: string;
                            employment_id: string;
                            leave_type_id: string;
                            reason: Array<{ lang: string; value: string }>;
                            time_offset?: number;
                            expiration_date?: string;
                            quantity?: string;
                            section_type?: number;
                        };
                        params?: {
                            user_id_type?:
                                | "open_id"
                                | "people_corehr_id"
                                | "union_id"
                                | "user_id";
                        };
                        path?: { leave_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    record: {
                                        id: string;
                                        employment_id: string;
                                        leave_type_id: string;
                                        granting_quantity: string;
                                        granting_unit: number;
                                        effective_date: string;
                                        expiration_date: string;
                                        granted_by: number;
                                        reason: Array<{
                                            lang: string;
                                            value: string;
                                        }>;
                                        created_at: string;
                                        created_by: string;
                                        updated_at: string;
                                        updated_by: string;
                                        section_type?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/leave_accrual_record/:leave_id`,
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
             * leave_employ_expire_record
             */
            leaveEmployExpireRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=leave_employ_expire_record&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=attendance&resource=leave_employ_expire_record&version=v1 document }
                 */
                get: async (
                    payload?: {
                        data: {
                            employment_id: string;
                            leave_type_id: string;
                            start_expiration_date: string;
                            end_expiration_date: string;
                            time_offset?: number;
                        };
                        params?: {
                            user_id_type?:
                                | "open_id"
                                | "people_corehr_id"
                                | "union_id"
                                | "user_id";
                        };
                        path?: { leave_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    records: Array<{
                                        id: string;
                                        employment_id: string;
                                        leave_type_id: string;
                                        granting_quantity: string;
                                        left_granting_quantity: string;
                                        granting_unit: number;
                                        effective_date: string;
                                        expiration_date: string;
                                        reason: Array<{
                                            lang: string;
                                            value: string;
                                        }>;
                                        is_update_by_external: boolean;
                                        accrual_source: number;
                                        leave_sub_type_id: string;
                                        section_type?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/leave_employ_expire_records/:leave_id`,
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
             * 考勤班次
             */
            shift: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=shift&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/create document }
                 *
                 * 创建班次
                 *
                 * 班次是描述一次考勤任务时间规则的统称，比如一天打多少次卡，每次卡的上下班时间，晚到多长时间算迟到，晚到多长时间算缺卡等。
                 *
                 * - 创建一个考勤组前，必须先创建一个或者多个班次。;- 一个公司内的班次是共享的，你可以直接引用他人创建的班次，但是需要注意的是，若他人修改了班次，会影响到你的考勤组及其考勤结果。
                 */
                create: async (
                    payload?: {
                        data: {
                            shift_name: string;
                            punch_times: number;
                            sub_shift_leader_ids?: Array<string>;
                            is_flexible?: boolean;
                            flexible_minutes?: number;
                            flexible_rule?: Array<{
                                flexible_early_minutes: number;
                                flexible_late_minutes: number;
                            }>;
                            no_need_off?: boolean;
                            punch_time_rule: Array<{
                                on_time: string;
                                off_time: string;
                                late_minutes_as_late: number;
                                late_minutes_as_lack: number;
                                on_advance_minutes: number;
                                early_minutes_as_early: number;
                                early_minutes_as_lack: number;
                                off_delay_minutes: number;
                                late_minutes_as_serious_late?: number;
                                no_need_on?: boolean;
                                no_need_off?: boolean;
                            }>;
                            late_off_late_on_rule?: Array<{
                                late_off_minutes: number;
                                late_on_minutes: number;
                            }>;
                            rest_time_rule?: Array<{
                                rest_begin_time: string;
                                rest_end_time: string;
                            }>;
                            overtime_rule?: Array<{
                                on_overtime: string;
                                off_overtime: string;
                            }>;
                            day_type?: number;
                            overtime_rest_time_rule?: Array<{
                                rest_begin_time: string;
                                rest_end_time: string;
                            }>;
                            late_minutes_as_serious_late?: number;
                            shift_middle_time_rule?: {
                                middle_time_type?: number;
                                fixed_middle_time?: string;
                            };
                            late_off_late_on_setting?: {
                                late_off_base_on_time_type?: number;
                                late_on_base_on_time_type?: number;
                            };
                        };
                        params?: {
                            employee_type?: "employee_id" | "employee_no";
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
                                    shift?: {
                                        shift_id: string;
                                        shift_name: string;
                                        punch_times: number;
                                        sub_shift_leader_ids?: Array<string>;
                                        is_flexible?: boolean;
                                        flexible_minutes?: number;
                                        flexible_rule?: Array<{
                                            flexible_early_minutes: number;
                                            flexible_late_minutes: number;
                                        }>;
                                        no_need_off?: boolean;
                                        punch_time_rule: Array<{
                                            on_time: string;
                                            off_time: string;
                                            late_minutes_as_late: number;
                                            late_minutes_as_lack: number;
                                            on_advance_minutes: number;
                                            early_minutes_as_early: number;
                                            early_minutes_as_lack: number;
                                            off_delay_minutes: number;
                                            late_minutes_as_serious_late?: number;
                                            no_need_on?: boolean;
                                            no_need_off?: boolean;
                                        }>;
                                        late_off_late_on_rule?: Array<{
                                            late_off_minutes: number;
                                            late_on_minutes: number;
                                        }>;
                                        rest_time_rule?: Array<{
                                            rest_begin_time: string;
                                            rest_end_time: string;
                                        }>;
                                        overtime_rule?: Array<{
                                            on_overtime: string;
                                            off_overtime: string;
                                        }>;
                                        day_type?: number;
                                        overtime_rest_time_rule?: Array<{
                                            rest_begin_time: string;
                                            rest_end_time: string;
                                        }>;
                                        late_minutes_as_serious_late?: number;
                                        shift_middle_time_rule?: {
                                            middle_time_type?: number;
                                            fixed_middle_time?: string;
                                        };
                                        late_off_late_on_setting?: {
                                            late_off_base_on_time_type?: number;
                                            late_on_base_on_time_type?: number;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/shifts`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=shift&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/delete document }
                 *
                 * 删除班次
                 *
                 * 通过班次 ID 删除班次。
                 */
                delete: async (
                    payload?: {
                        path: { shift_id: string };
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
                                `${this.domain}/open-apis/attendance/v1/shifts/:shift_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=shift&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/get document }
                 *
                 * 获取班次详情
                 *
                 * 通过班次 ID 获取班次详情。
                 */
                get: async (
                    payload?: {
                        path: { shift_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    shift_id: string;
                                    shift_name: string;
                                    punch_times: number;
                                    sub_shift_leader_ids?: Array<string>;
                                    is_flexible?: boolean;
                                    flexible_minutes?: number;
                                    flexible_rule?: Array<{
                                        flexible_early_minutes: number;
                                        flexible_late_minutes: number;
                                    }>;
                                    no_need_off?: boolean;
                                    punch_time_rule: Array<{
                                        on_time: string;
                                        off_time: string;
                                        late_minutes_as_late: number;
                                        late_minutes_as_lack: number;
                                        on_advance_minutes: number;
                                        early_minutes_as_early: number;
                                        early_minutes_as_lack: number;
                                        off_delay_minutes: number;
                                        late_minutes_as_serious_late?: number;
                                        no_need_on?: boolean;
                                        no_need_off?: boolean;
                                    }>;
                                    late_off_late_on_rule?: Array<{
                                        late_off_minutes: number;
                                        late_on_minutes: number;
                                    }>;
                                    rest_time_rule?: Array<{
                                        rest_begin_time: string;
                                        rest_end_time: string;
                                    }>;
                                    overtime_rule?: Array<{
                                        on_overtime: string;
                                        off_overtime: string;
                                    }>;
                                    day_type?: number;
                                    overtime_rest_time_rule?: Array<{
                                        rest_begin_time: string;
                                        rest_end_time: string;
                                    }>;
                                    late_minutes_as_serious_late?: number;
                                    shift_middle_time_rule?: {
                                        middle_time_type?: number;
                                        fixed_middle_time?: string;
                                    };
                                    late_off_late_on_setting?: {
                                        late_off_base_on_time_type?: number;
                                        late_on_base_on_time_type?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/shifts/:shift_id`,
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
                                    `${this.domain}/open-apis/attendance/v1/shifts`,
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
                                                    shift_list?: Array<{
                                                        shift_id: string;
                                                        shift_name: string;
                                                        punch_times: number;
                                                        sub_shift_leader_ids?: Array<string>;
                                                        is_flexible?: boolean;
                                                        flexible_minutes?: number;
                                                        flexible_rule?: Array<{
                                                            flexible_early_minutes: number;
                                                            flexible_late_minutes: number;
                                                        }>;
                                                        no_need_off?: boolean;
                                                        punch_time_rule: Array<{
                                                            on_time: string;
                                                            off_time: string;
                                                            late_minutes_as_late: number;
                                                            late_minutes_as_lack: number;
                                                            on_advance_minutes: number;
                                                            early_minutes_as_early: number;
                                                            early_minutes_as_lack: number;
                                                            off_delay_minutes: number;
                                                            late_minutes_as_serious_late?: number;
                                                            no_need_on?: boolean;
                                                            no_need_off?: boolean;
                                                        }>;
                                                        late_off_late_on_rule?: Array<{
                                                            late_off_minutes: number;
                                                            late_on_minutes: number;
                                                        }>;
                                                        rest_time_rule?: Array<{
                                                            rest_begin_time: string;
                                                            rest_end_time: string;
                                                        }>;
                                                        overtime_rule?: Array<{
                                                            on_overtime: string;
                                                            off_overtime: string;
                                                        }>;
                                                        day_type?: number;
                                                        overtime_rest_time_rule?: Array<{
                                                            rest_begin_time: string;
                                                            rest_end_time: string;
                                                        }>;
                                                        late_minutes_as_serious_late?: number;
                                                        shift_middle_time_rule?: {
                                                            middle_time_type?: number;
                                                            fixed_middle_time?: string;
                                                        };
                                                        late_off_late_on_setting?: {
                                                            late_off_base_on_time_type?: number;
                                                            late_on_base_on_time_type?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=shift&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/list document }
                 *
                 * 获取班次列表
                 *
                 * 翻页获取所有班次列表。
                 */
                list: async (
                    payload?: {
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
                                    shift_list?: Array<{
                                        shift_id: string;
                                        shift_name: string;
                                        punch_times: number;
                                        sub_shift_leader_ids?: Array<string>;
                                        is_flexible?: boolean;
                                        flexible_minutes?: number;
                                        flexible_rule?: Array<{
                                            flexible_early_minutes: number;
                                            flexible_late_minutes: number;
                                        }>;
                                        no_need_off?: boolean;
                                        punch_time_rule: Array<{
                                            on_time: string;
                                            off_time: string;
                                            late_minutes_as_late: number;
                                            late_minutes_as_lack: number;
                                            on_advance_minutes: number;
                                            early_minutes_as_early: number;
                                            early_minutes_as_lack: number;
                                            off_delay_minutes: number;
                                            late_minutes_as_serious_late?: number;
                                            no_need_on?: boolean;
                                            no_need_off?: boolean;
                                        }>;
                                        late_off_late_on_rule?: Array<{
                                            late_off_minutes: number;
                                            late_on_minutes: number;
                                        }>;
                                        rest_time_rule?: Array<{
                                            rest_begin_time: string;
                                            rest_end_time: string;
                                        }>;
                                        overtime_rule?: Array<{
                                            on_overtime: string;
                                            off_overtime: string;
                                        }>;
                                        day_type?: number;
                                        overtime_rest_time_rule?: Array<{
                                            rest_begin_time: string;
                                            rest_end_time: string;
                                        }>;
                                        late_minutes_as_serious_late?: number;
                                        shift_middle_time_rule?: {
                                            middle_time_type?: number;
                                            fixed_middle_time?: string;
                                        };
                                        late_off_late_on_setting?: {
                                            late_off_base_on_time_type?: number;
                                            late_on_base_on_time_type?: number;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/shifts`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=shift&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/shift/query document }
                 *
                 * 按名称查询班次
                 *
                 * 通过班次的名称查询班次信息。
                 */
                query: async (
                    payload?: {
                        params: { shift_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    shift_id: string;
                                    shift_name: string;
                                    punch_times: number;
                                    sub_shift_leader_ids?: Array<string>;
                                    is_flexible?: boolean;
                                    flexible_minutes?: number;
                                    flexible_rule?: Array<{
                                        flexible_early_minutes: number;
                                        flexible_late_minutes: number;
                                    }>;
                                    no_need_off?: boolean;
                                    punch_time_rule: Array<{
                                        on_time: string;
                                        off_time: string;
                                        late_minutes_as_late: number;
                                        late_minutes_as_lack: number;
                                        on_advance_minutes: number;
                                        early_minutes_as_early: number;
                                        early_minutes_as_lack: number;
                                        off_delay_minutes: number;
                                        late_minutes_as_serious_late?: number;
                                        no_need_on?: boolean;
                                        no_need_off?: boolean;
                                    }>;
                                    late_off_late_on_rule?: Array<{
                                        late_off_minutes: number;
                                        late_on_minutes: number;
                                    }>;
                                    rest_time_rule?: Array<{
                                        rest_begin_time: string;
                                        rest_end_time: string;
                                    }>;
                                    overtime_rule?: Array<{
                                        on_overtime: string;
                                        off_overtime: string;
                                    }>;
                                    day_type?: number;
                                    overtime_rest_time_rule?: Array<{
                                        rest_begin_time: string;
                                        rest_end_time: string;
                                    }>;
                                    late_minutes_as_serious_late?: number;
                                    shift_middle_time_rule?: {
                                        middle_time_type?: number;
                                        fixed_middle_time?: string;
                                    };
                                    late_off_late_on_setting?: {
                                        late_off_base_on_time_type?: number;
                                        late_on_base_on_time_type?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/shifts/query`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * 假勤审批
             */
            userApproval: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_approval&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/create document }
                 *
                 * 写入审批结果
                 *
                 * 由于部分企业使用的是自己的审批系统，而不是飞书审批系统，因此员工的请假、加班等数据无法流入到飞书考勤系统中，导致员工在请假时间段内依然收到打卡提醒，并且被记为缺卡。;;对于这些只使用飞书考勤系统，而未使用飞书审批系统的企业，可以通过考勤开放接口的形式，将三方审批结果数据回写到飞书考勤系统中。
                 *
                 * 目前支持写入加班、请假、出差和外出这四种审批结果，写入只会追加(insert)，不会覆盖(update)（开放接口导入的加班假期记录，在管理后台的假期加班里查不到，只能通过[获取审批通过数据](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/query)来查询）
                 */
                create: async (
                    payload?: {
                        data?: {
                            user_approval?: {
                                user_id: string;
                                date: string;
                                outs?: Array<{
                                    uniq_id: string;
                                    unit: number;
                                    interval: number;
                                    start_time: string;
                                    end_time: string;
                                    i18n_names: {
                                        ch?: string;
                                        en?: string;
                                        ja?: string;
                                    };
                                    default_locale: string;
                                    reason: string;
                                    idempotent_id?: string;
                                }>;
                                leaves?: Array<{
                                    uniq_id?: string;
                                    unit: number;
                                    interval: number;
                                    start_time: string;
                                    end_time: string;
                                    i18n_names: {
                                        ch?: string;
                                        en?: string;
                                        ja?: string;
                                    };
                                    default_locale: "ch" | "en" | "ja";
                                    reason: string;
                                    idempotent_id?: string;
                                }>;
                                overtime_works?: Array<{
                                    duration: number;
                                    unit: number;
                                    category: number;
                                    type: number;
                                    start_time: string;
                                    end_time: string;
                                    reason?: string;
                                    idempotent_id?: string;
                                }>;
                                trips?: Array<{
                                    start_time: string;
                                    end_time: string;
                                    reason: string;
                                    approve_pass_time: string;
                                    approve_apply_time: string;
                                    idempotent_id?: string;
                                }>;
                                time_zone?: string;
                            };
                        };
                        params: {
                            employee_type: "employee_id" | "employee_no";
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
                                    user_approval?: {
                                        user_id: string;
                                        date: string;
                                        outs?: Array<{
                                            approval_id?: string;
                                            uniq_id: string;
                                            unit: number;
                                            interval: number;
                                            start_time: string;
                                            end_time: string;
                                            i18n_names: {
                                                ch?: string;
                                                en?: string;
                                                ja?: string;
                                            };
                                            default_locale: string;
                                            reason: string;
                                            approve_pass_time?: string;
                                            approve_apply_time?: string;
                                            idempotent_id?: string;
                                        }>;
                                        leaves?: Array<{
                                            approval_id?: string;
                                            uniq_id?: string;
                                            unit: number;
                                            interval: number;
                                            start_time: string;
                                            end_time: string;
                                            i18n_names: {
                                                ch?: string;
                                                en?: string;
                                                ja?: string;
                                            };
                                            default_locale: "ch" | "en" | "ja";
                                            reason: string;
                                            approve_pass_time?: string;
                                            approve_apply_time?: string;
                                            idempotent_id?: string;
                                        }>;
                                        overtime_works?: Array<{
                                            approval_id?: string;
                                            duration: number;
                                            unit: number;
                                            category: number;
                                            type: number;
                                            start_time: string;
                                            end_time: string;
                                            reason?: string;
                                            idempotent_id?: string;
                                        }>;
                                        trips?: Array<{
                                            approval_id?: string;
                                            start_time: string;
                                            end_time: string;
                                            reason: string;
                                            approve_pass_time: string;
                                            approve_apply_time: string;
                                            idempotent_id?: string;
                                        }>;
                                        time_zone?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_approvals`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_approval&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_approval/query document }
                 *
                 * 获取审批通过数据
                 *
                 * 获取员工在某段时间内的请假、加班、外出和出差四种审批的通过数据。
                 *
                 * 请假的假期时长字段，暂未开放提供，待后续提供。
                 */
                query: async (
                    payload?: {
                        data: {
                            user_ids: Array<string>;
                            check_date_from: number;
                            check_date_to: number;
                            check_date_type?:
                                | "PeriodTime"
                                | "CreateTime"
                                | "UpdateTime";
                            status?: number;
                            check_time_from?: string;
                            check_time_to?: string;
                        };
                        params: {
                            employee_type: "employee_id" | "employee_no";
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
                                    user_approvals?: Array<{
                                        user_id: string;
                                        date: string;
                                        outs?: Array<{
                                            approval_id?: string;
                                            uniq_id: string;
                                            unit: number;
                                            interval: number;
                                            start_time: string;
                                            end_time: string;
                                            i18n_names: {
                                                ch?: string;
                                                en?: string;
                                                ja?: string;
                                            };
                                            default_locale: string;
                                            reason: string;
                                            approve_pass_time?: string;
                                            approve_apply_time?: string;
                                            idempotent_id?: string;
                                        }>;
                                        leaves?: Array<{
                                            approval_id?: string;
                                            uniq_id?: string;
                                            unit: number;
                                            interval: number;
                                            start_time: string;
                                            end_time: string;
                                            i18n_names: {
                                                ch?: string;
                                                en?: string;
                                                ja?: string;
                                            };
                                            default_locale: "ch" | "en" | "ja";
                                            reason: string;
                                            approve_pass_time?: string;
                                            approve_apply_time?: string;
                                            idempotent_id?: string;
                                        }>;
                                        overtime_works?: Array<{
                                            approval_id?: string;
                                            duration: number;
                                            unit: number;
                                            category: number;
                                            type: number;
                                            start_time: string;
                                            end_time: string;
                                            reason?: string;
                                            idempotent_id?: string;
                                        }>;
                                        trips?: Array<{
                                            approval_id?: string;
                                            start_time: string;
                                            end_time: string;
                                            reason: string;
                                            approve_pass_time: string;
                                            approve_apply_time: string;
                                            idempotent_id?: string;
                                        }>;
                                        time_zone?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_approvals/query`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * 考勤排班
             */
            userDailyShift: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_daily_shift&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/batch_create document }
                 *
                 * 创建或修改班表
                 *
                 * 班表是用来描述考勤组内人员每天按哪个班次进行上班。目前班表支持按一个整月对一位或多位人员进行排班。
                 */
                batchCreate: async (
                    payload?: {
                        data: {
                            user_daily_shifts: Array<{
                                group_id: string;
                                shift_id: string;
                                month: number;
                                user_id: string;
                                day_no: number;
                                is_clear_schedule?: boolean;
                            }>;
                            operator_id?: string;
                        };
                        params: {
                            employee_type: "employee_id" | "employee_no";
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
                                    user_daily_shifts?: Array<{
                                        group_id: string;
                                        shift_id: string;
                                        month: number;
                                        user_id: string;
                                        day_no: number;
                                        is_clear_schedule?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_daily_shifts/batch_create`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_daily_shift&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_daily_shift/query document }
                 *
                 * 查询班表信息
                 *
                 * 支持查询多个用户的排班情况，查询的时间跨度不能超过 30 天。
                 */
                query: async (
                    payload?: {
                        data: {
                            user_ids: Array<string>;
                            check_date_from: number;
                            check_date_to: number;
                        };
                        params: {
                            employee_type: "employee_id" | "employee_no";
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
                                    user_daily_shifts?: Array<{
                                        group_id: string;
                                        shift_id: string;
                                        month: number;
                                        user_id: string;
                                        day_no: number;
                                        is_clear_schedule?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_daily_shifts/query`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * user_flow
             */
            userFlow: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_flow&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/batch_create document }
                 *
                 * 导入打卡流水记录
                 *
                 * 导入授权内员工的打卡流水记录。导入后，会根据员工所在的考勤组班次规则，计算最终的打卡状态与结果。
                 *
                 * 适用于考勤机数据导入等场景。
                 */
                batchCreate: async (
                    payload?: {
                        data: {
                            flow_records: Array<{
                                user_id: string;
                                creator_id: string;
                                location_name: string;
                                check_time: string;
                                comment: string;
                                record_id?: string;
                                longitude?: number;
                                latitude?: number;
                                ssid?: string;
                                bssid?: string;
                                is_field?: boolean;
                                is_wifi?: boolean;
                                type?: number;
                                photo_urls?: Array<string>;
                                device_id?: string;
                                check_result?:
                                    | "NoNeedCheck"
                                    | "SystemCheck"
                                    | "Normal"
                                    | "Early"
                                    | "Late"
                                    | "SeriousLate"
                                    | "Lack"
                                    | "Invalid"
                                    | "None"
                                    | "Todo";
                                external_id?: string;
                                idempotent_id?: string;
                            }>;
                        };
                        params: {
                            employee_type: "employee_id" | "employee_no";
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
                                    flow_records?: Array<{
                                        user_id: string;
                                        creator_id: string;
                                        location_name: string;
                                        check_time: string;
                                        comment: string;
                                        record_id?: string;
                                        longitude?: number;
                                        latitude?: number;
                                        ssid?: string;
                                        bssid?: string;
                                        is_field?: boolean;
                                        is_wifi?: boolean;
                                        type?: number;
                                        photo_urls?: Array<string>;
                                        device_id?: string;
                                        check_result?:
                                            | "NoNeedCheck"
                                            | "SystemCheck"
                                            | "Normal"
                                            | "Early"
                                            | "Late"
                                            | "SeriousLate"
                                            | "Lack"
                                            | "Invalid"
                                            | "None"
                                            | "Todo";
                                        external_id?: string;
                                        idempotent_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_flows/batch_create`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_flow&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/get document }
                 *
                 * 获取打卡流水记录
                 *
                 * 通过打卡记录 ID 获取用户的打卡流水记录。
                 */
                get: async (
                    payload?: {
                        params: {
                            employee_type: "employee_id" | "employee_no";
                        };
                        path: { user_flow_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    user_id: string;
                                    creator_id: string;
                                    location_name: string;
                                    check_time: string;
                                    comment: string;
                                    record_id?: string;
                                    longitude?: number;
                                    latitude?: number;
                                    ssid?: string;
                                    bssid?: string;
                                    is_field?: boolean;
                                    is_wifi?: boolean;
                                    type?: number;
                                    photo_urls?: Array<string>;
                                    device_id?: string;
                                    check_result?:
                                        | "NoNeedCheck"
                                        | "SystemCheck"
                                        | "Normal"
                                        | "Early"
                                        | "Late"
                                        | "SeriousLate"
                                        | "Lack"
                                        | "Invalid"
                                        | "None"
                                        | "Todo";
                                    external_id?: string;
                                    idempotent_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_flows/:user_flow_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_flow&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_flow/query document }
                 *
                 * 批量查询打卡流水记录
                 *
                 * 批量查询授权内员工的实际打卡流水记录。例如，企业给一个员工设定的班次是上午 9 点和下午 6 点各打一次上下班卡，但是该员工在这期间打了多次卡，该接口会把所有的打卡记录都返回。
                 *
                 * 如果只需获取打卡结果，而不需要详细的打卡数据，可使用“获取打卡结果”的接口。
                 */
                query: async (
                    payload?: {
                        data: {
                            user_ids: Array<string>;
                            check_time_from: string;
                            check_time_to: string;
                        };
                        params: {
                            employee_type: "employee_id" | "employee_no";
                            include_terminated_user?: boolean;
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
                                    user_flow_results?: Array<{
                                        user_id: string;
                                        creator_id: string;
                                        location_name: string;
                                        check_time: string;
                                        comment: string;
                                        record_id?: string;
                                        longitude?: number;
                                        latitude?: number;
                                        ssid?: string;
                                        bssid?: string;
                                        is_field?: boolean;
                                        is_wifi?: boolean;
                                        type?: number;
                                        photo_urls?: Array<string>;
                                        device_id?: string;
                                        check_result?:
                                            | "NoNeedCheck"
                                            | "SystemCheck"
                                            | "Normal"
                                            | "Early"
                                            | "Late"
                                            | "SeriousLate"
                                            | "Lack"
                                            | "Invalid"
                                            | "None"
                                            | "Todo";
                                        external_id?: string;
                                        idempotent_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_flows/query`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * 用户设置
             */
            userSetting: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_setting&apiName=modify&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_setting/modify document }
                 *
                 * 修改用户设置
                 *
                 * 修改授权内员工的用户设置信息，包括人脸照片文件 ID。
                 */
                modify: async (
                    payload?: {
                        data?: {
                            user_setting?: {
                                user_id: string;
                                face_key: string;
                                face_key_update_time?: string;
                            };
                        };
                        params: {
                            employee_type: "employee_id" | "employee_no";
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
                                    user_setting?: {
                                        user_id: string;
                                        face_key: string;
                                        face_key_update_time?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_settings/modify`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_setting&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_setting/query document }
                 *
                 * 批量查询用户设置
                 *
                 * 批量查询授权内员工的用户设置信息，包括人脸照片文件 ID、人脸照片更新时间。
                 */
                query: async (
                    payload?: {
                        data: { user_ids: Array<string> };
                        params: {
                            employee_type: "employee_id" | "employee_no";
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
                                    user_settings?: Array<{
                                        user_id: string;
                                        face_key: string;
                                        face_key_update_time?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_settings/query`,
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
             * 考勤统计
             */
            userStatsData: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_stats_data&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_data/query document }
                 *
                 * 查询统计数据
                 *
                 * 查询日度统计或月度统计的统计数据。
                 */
                query: async (
                    payload?: {
                        data: {
                            locale: "en" | "ja" | "zh";
                            stats_type: "daily" | "month";
                            start_date: number;
                            end_date: number;
                            user_ids?: Array<string>;
                            need_history?: boolean;
                            current_group_only?: boolean;
                            user_id?: string;
                        };
                        params: {
                            employee_type: "employee_id" | "employee_no";
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
                                    user_datas?: Array<{
                                        name: string;
                                        user_id: string;
                                        datas?: Array<{
                                            code: string;
                                            value: string;
                                            features?: Array<{
                                                key: string;
                                                value: string;
                                            }>;
                                            title?: string;
                                            duration_num?: {
                                                day?: string;
                                                half_day?: string;
                                                hour?: string;
                                                half_hour?: string;
                                                minute?: string;
                                            };
                                        }>;
                                    }>;
                                    invalid_user_list?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_stats_datas/query`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * user_stats_field
             */
            userStatsField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_stats_field&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_field/query document }
                 *
                 * 查询统计表头
                 *
                 * 查询考勤统计支持的日度统计或月度统计的统计表头。
                 */
                query: async (
                    payload?: {
                        data: {
                            locale: "en" | "ja" | "zh";
                            stats_type: "daily" | "month";
                            start_date: number;
                            end_date: number;
                        };
                        params: {
                            employee_type: "employee_id" | "employee_no";
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
                                    user_stats_field?: {
                                        stats_type: "daily" | "month";
                                        user_id: string;
                                        fields: Array<{
                                            code: string;
                                            title: string;
                                            child_fields?: Array<{
                                                code: string;
                                                title: string;
                                                time_unit?: string;
                                            }>;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_stats_fields/query`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * user_stats_view
             */
            userStatsView: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_stats_view&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_view/query document }
                 *
                 * 查询统计设置
                 *
                 * 查询开发者定制的日度统计或月度统计的统计报表表头设置信息。
                 */
                query: async (
                    payload?: {
                        data: {
                            locale: "en" | "ja" | "zh";
                            stats_type: "daily" | "month";
                            user_id?: string;
                        };
                        params: {
                            employee_type: "employee_id" | "employee_no";
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
                                    view?: {
                                        view_id: string;
                                        stats_type: "daily" | "month";
                                        user_id: string;
                                        items?: Array<{
                                            code: string;
                                            title?: string;
                                            child_items?: Array<{
                                                code: string;
                                                value: string;
                                                title?: string;
                                                column_type?: number;
                                                read_only?: boolean;
                                                min_value?: string;
                                                max_value?: string;
                                            }>;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_stats_views/query`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_stats_view&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_stats_view/update document }
                 *
                 * 更新统计设置
                 *
                 * 更新开发者定制的日度统计或月度统计的统计报表表头设置信息。
                 */
                update: async (
                    payload?: {
                        data: {
                            view: {
                                view_id: string;
                                stats_type: "daily" | "month";
                                user_id: string;
                                items?: Array<{
                                    code: string;
                                    child_items?: Array<{
                                        code: string;
                                        value: string;
                                    }>;
                                }>;
                            };
                        };
                        params: {
                            employee_type: "employee_id" | "employee_no";
                        };
                        path: { user_stats_view_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    view?: {
                                        view_id: string;
                                        stats_type: "daily" | "month";
                                        user_id: string;
                                        items?: Array<{
                                            code: string;
                                            title?: string;
                                            child_items?: Array<{
                                                code: string;
                                                value: string;
                                                title?: string;
                                                column_type?: number;
                                                read_only?: boolean;
                                                min_value?: string;
                                                max_value?: string;
                                            }>;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_stats_views/:user_stats_view_id`,
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
             * 考勤记录
             */
            userTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_task&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task/query document }
                 *
                 * 获取打卡结果
                 *
                 * 获取企业内员工的实际打卡结果，包括上班打卡结果和下班打卡结果。
                 *
                 * - 如果企业给一个员工设定的班次是上午 9 点和下午 6 点各打一次上下班卡，即使员工在这期间打了多次卡，该接口也只会返回 1 条记录。;- 如果要获取打卡的详细数据，如打卡位置等信息，可使用“获取打卡流水记录”或“批量查询打卡流水记录”的接口。
                 */
                query: async (
                    payload?: {
                        data: {
                            user_ids: Array<string>;
                            check_date_from: number;
                            check_date_to: number;
                            need_overtime_result?: boolean;
                        };
                        params: {
                            employee_type: "employee_id" | "employee_no";
                            ignore_invalid_users?: boolean;
                            include_terminated_user?: boolean;
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
                                    user_task_results?: Array<{
                                        result_id: string;
                                        user_id: string;
                                        employee_name: string;
                                        day: number;
                                        group_id: string;
                                        shift_id: string;
                                        records: Array<{
                                            check_in_record_id: string;
                                            check_in_record?: {
                                                user_id: string;
                                                creator_id: string;
                                                location_name: string;
                                                check_time: string;
                                                comment: string;
                                                record_id?: string;
                                                longitude?: number;
                                                latitude?: number;
                                                ssid?: string;
                                                bssid?: string;
                                                is_field?: boolean;
                                                is_wifi?: boolean;
                                                type?: number;
                                                photo_urls?: Array<string>;
                                                device_id?: string;
                                                check_result?:
                                                    | "NoNeedCheck"
                                                    | "SystemCheck"
                                                    | "Normal"
                                                    | "Early"
                                                    | "Late"
                                                    | "SeriousLate"
                                                    | "Lack"
                                                    | "Invalid"
                                                    | "None"
                                                    | "Todo";
                                                external_id?: string;
                                                idempotent_id?: string;
                                            };
                                            check_out_record_id: string;
                                            check_out_record?: {
                                                user_id: string;
                                                creator_id: string;
                                                location_name: string;
                                                check_time: string;
                                                comment: string;
                                                record_id?: string;
                                                longitude?: number;
                                                latitude?: number;
                                                ssid?: string;
                                                bssid?: string;
                                                is_field?: boolean;
                                                is_wifi?: boolean;
                                                type?: number;
                                                photo_urls?: Array<string>;
                                                device_id?: string;
                                                check_result?:
                                                    | "NoNeedCheck"
                                                    | "SystemCheck"
                                                    | "Normal"
                                                    | "Early"
                                                    | "Late"
                                                    | "SeriousLate"
                                                    | "Lack"
                                                    | "Invalid"
                                                    | "None"
                                                    | "Todo";
                                                external_id?: string;
                                                idempotent_id?: string;
                                            };
                                            check_in_result:
                                                | "NoNeedCheck"
                                                | "SystemCheck"
                                                | "Normal"
                                                | "Early"
                                                | "Late"
                                                | "Lack";
                                            check_out_result:
                                                | "NoNeedCheck"
                                                | "SystemCheck"
                                                | "Normal"
                                                | "Early"
                                                | "Late"
                                                | "Lack";
                                            check_in_result_supplement:
                                                | "None"
                                                | "ManagerModification"
                                                | "CardReplacement"
                                                | "ShiftChange"
                                                | "Travel"
                                                | "Leave"
                                                | "GoOut"
                                                | "CardReplacementApplication"
                                                | "FieldPunch";
                                            check_out_result_supplement:
                                                | "None"
                                                | "ManagerModification"
                                                | "CardReplacement"
                                                | "ShiftChange"
                                                | "Travel"
                                                | "Leave"
                                                | "GoOut"
                                                | "CardReplacementApplication"
                                                | "FieldPunch";
                                            check_in_shift_time?: string;
                                            check_out_shift_time?: string;
                                            task_shift_type?: number;
                                        }>;
                                    }>;
                                    invalid_user_ids?: Array<string>;
                                    unauthorized_user_ids?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_tasks/query`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * 考勤补卡
             */
            userTaskRemedy: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_task_remedy&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/create document }
                 *
                 * 通知补卡审批发起
                 *
                 * 对于只使用飞书考勤系统而未使用飞书审批系统的企业，可以通过该接口，将在三方审批系统中发起的补卡审批数据，写入到飞书考勤系统中，状态为审批中。写入后可以由[通知审批状态更新](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/approval_info/process) 进行状态更新
                 */
                create: async (
                    payload?: {
                        data: {
                            user_id: string;
                            remedy_date: number;
                            punch_no: number;
                            work_type: number;
                            remedy_time: string;
                            reason: string;
                            time?: string;
                        };
                        params: {
                            employee_type: "employee_id" | "employee_no";
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
                                    user_remedy?: {
                                        user_id: string;
                                        remedy_date: number;
                                        punch_no: number;
                                        work_type: number;
                                        approval_id?: string;
                                        remedy_time: string;
                                        status?: number;
                                        reason: string;
                                        time?: string;
                                        time_zone?: string;
                                        create_time?: string;
                                        update_time?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_task_remedys`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_task_remedy&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/query document }
                 *
                 * 获取补卡记录
                 *
                 * 获取授权内员工的补卡记录。
                 */
                query: async (
                    payload?: {
                        data: {
                            user_ids: Array<string>;
                            check_time_from: string;
                            check_time_to: string;
                            check_date_type?:
                                | "PeriodTime"
                                | "CreateTime"
                                | "UpdateTime";
                            status?: number;
                        };
                        params: {
                            employee_type: "employee_id" | "employee_no";
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
                                    user_remedys?: Array<{
                                        user_id: string;
                                        remedy_date: number;
                                        punch_no: number;
                                        work_type: number;
                                        approval_id?: string;
                                        remedy_time: string;
                                        status?: number;
                                        reason: string;
                                        time?: string;
                                        time_zone?: string;
                                        create_time?: string;
                                        update_time?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_task_remedys/query`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=attendance&resource=user_task_remedy&apiName=query_user_allowed_remedys&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/attendance-v1/user_task_remedy/query_user_allowed_remedys document }
                 *
                 * 获取用户可补卡时间
                 *
                 * 获取用户某天可以补的第几次上 / 下班卡的时间。
                 */
                queryUserAllowedRemedys: async (
                    payload?: {
                        data: { user_id: string; remedy_date: number };
                        params: {
                            employee_type: "employee_id" | "employee_no";
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
                                    user_allowed_remedys?: Array<{
                                        user_id: string;
                                        remedy_date: number;
                                        is_free_punch?: boolean;
                                        punch_no?: number;
                                        work_type?: number;
                                        punch_status?: string;
                                        normal_punch_time?: string;
                                        remedy_start_time?: string;
                                        remedy_end_time?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/attendance/v1/user_task_remedys/query_user_allowed_remedys`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
