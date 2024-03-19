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
import helpdesk from "./helpdesk";

// auto gen
export default abstract class Client extends helpdesk {
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
     * 招聘
     */
    hire = {
        /**
         * 投递
         */
        application: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/create document }
             *
             * 创建投递
             *
             * 根据人才 ID 和职位 ID 创建投递
             */
            create: async (
                payload?: {
                    data: {
                        talent_id: string;
                        job_id: string;
                        resume_source_id?: string;
                        application_preferred_city_code_list?: Array<string>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        { code?: number; msg?: string; data?: { id?: string } }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/applications`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/get document }
             *
             * 获取投递信息
             *
             * 根据投递 ID 获取单个投递信息
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        options?: number;
                    };
                    path: { application_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                application?: {
                                    id?: string;
                                    job_id?: string;
                                    talent_id?: string;
                                    resume_source_id?: string;
                                    stage?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        type?: number;
                                    };
                                    active_status?: number;
                                    delivery_type?: number;
                                    resume_source_info?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        resume_source_type?: number;
                                    };
                                    website_resume_source?: {
                                        website_id?: string;
                                        website_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        channel?: {
                                            channel_id?: string;
                                            channel_name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                    };
                                    talent_attachment_resume_id?: string;
                                    create_time?: string;
                                    modify_time?: string;
                                    stage_time_list?: Array<{
                                        stage_id?: string;
                                        enter_time?: string;
                                        exit_time?: string;
                                    }>;
                                    termination_type?: number;
                                    termination_reason_list?: Array<string>;
                                    termination_reason_note?: string;
                                    application_preferred_city_list?: Array<{
                                        code?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    creator_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/applications/:application_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/list document }
             *
             * 获取投递列表
             *
             * 根据限定条件获取投递列表信息
             */
            list: async (
                payload?: {
                    params?: {
                        process_id?: string;
                        stage_id?: string;
                        talent_id?: string;
                        active_status?: string;
                        job_id?: string;
                        page_token?: string;
                        page_size?: number;
                        update_start_time?: string;
                        update_end_time?: string;
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
                                items?: Array<string>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/applications`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=offer&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/offer document }
             *
             * 获取 Offer 信息
             *
             * 根据投递 ID 获取 Offer 信息
             */
            offer: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                        job_family_id_type?:
                            | "people_admin_job_category_id"
                            | "job_family_id";
                        employee_type_id_type?:
                            | "people_admin_employee_type_id"
                            | "employee_type_enum_id";
                    };
                    path: { application_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                offer?: {
                                    id?: string;
                                    application_id?: string;
                                    basic_info?: {
                                        offer_type?: number;
                                        remark?: string;
                                        expire_time?: number;
                                        owner_user_id?: string;
                                        creator_user_id?: string;
                                        employee_type?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        create_time?: string;
                                        leader_user_id?: string;
                                        onboard_date?: string;
                                        department_id?: string;
                                        probation_month?: number;
                                        contract_year?: number;
                                        contract_period?: {
                                            period_type: number;
                                            period: number;
                                        };
                                        recruitment_type?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        sequence?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        level?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        onboard_address?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            district?: {
                                                zh_name?: string;
                                                en_name?: string;
                                                code?: string;
                                                location_type?: number;
                                            };
                                            city?: {
                                                zh_name?: string;
                                                en_name?: string;
                                                code?: string;
                                                location_type?: number;
                                            };
                                            state?: {
                                                zh_name?: string;
                                                en_name?: string;
                                                code?: string;
                                                location_type?: number;
                                            };
                                            country?: {
                                                zh_name?: string;
                                                en_name?: string;
                                                code?: string;
                                                location_type?: number;
                                            };
                                        };
                                        work_address?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            district?: {
                                                zh_name?: string;
                                                en_name?: string;
                                                code?: string;
                                                location_type?: number;
                                            };
                                            city?: {
                                                zh_name?: string;
                                                en_name?: string;
                                                code?: string;
                                                location_type?: number;
                                            };
                                            state?: {
                                                zh_name?: string;
                                                en_name?: string;
                                                code?: string;
                                                location_type?: number;
                                            };
                                            country?: {
                                                zh_name?: string;
                                                en_name?: string;
                                                code?: string;
                                                location_type?: number;
                                            };
                                        };
                                        customize_info_list?: Array<{
                                            object_id?: string;
                                            customize_value?: string;
                                        }>;
                                        work_location_address_info?: {
                                            location_info?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            address_info?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                        };
                                    };
                                    salary_plan?: {
                                        currency?: string;
                                        basic_salary?: string;
                                        probation_salary_percentage?: string;
                                        award_salary_multiple?: string;
                                        option_shares?: string;
                                        quarterly_bonus?: string;
                                        half_year_bonus?: string;
                                        total_annual_cash?: string;
                                        customize_info_list?: Array<{
                                            object_id?: string;
                                            customize_value?: string;
                                        }>;
                                    };
                                    schema_id?: string;
                                    offer_status?: number;
                                    job_info?: {
                                        job_id?: string;
                                        job_name?: string;
                                    };
                                    customized_module_list?: Array<{
                                        ID?: string;
                                        object_list?: Array<{
                                            object_id?: string;
                                            customize_value?: string;
                                        }>;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/applications/:application_id/offer`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=terminate&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/terminate document }
             *
             * 终止投递
             *
             * 根据投递 ID 修改投递状态为「已终止」
             */
            terminate: async (
                payload?: {
                    data: {
                        termination_type: number;
                        termination_reason_list?: Array<string>;
                        termination_reason_note?: string;
                    };
                    path: { application_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/applications/:application_id/terminate`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=transfer_onboard&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/transfer_onboard document }
             *
             * 操作候选人入职
             *
             * 根据投递 ID 操作候选人入职并创建员工。投递须处于「待入职」阶段，可通过「转移阶段」接口变更投递状态
             */
            transferOnboard: async (
                payload?: {
                    data?: {
                        actual_onboard_time?: number;
                        expected_conversion_time?: number;
                        job_requirement_id?: string;
                        operator_id?: string;
                        onboard_city_code?: string;
                        department?: string;
                        leader?: string;
                        sequence?: string;
                        level?: string;
                        employee_type?: string;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id"
                            | "people_admin_department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                        job_family_id_type?:
                            | "people_admin_job_category_id"
                            | "job_family_id";
                        employee_type_id_type?:
                            | "people_admin_employee_type_id"
                            | "employee_type_enum_id";
                    };
                    path: { application_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                employee?: {
                                    id?: string;
                                    application_id?: string;
                                    onboard_status?: number;
                                    conversion_status?: number;
                                    onboard_time?: number;
                                    expected_conversion_time?: number;
                                    actual_conversion_time?: number;
                                    overboard_time?: number;
                                    overboard_note?: string;
                                    onboard_city_code?: string;
                                    department?: string;
                                    leader?: string;
                                    sequence?: string;
                                    level?: string;
                                    employee_type?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/applications/:application_id/transfer_onboard`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * application.interview
         */
        applicationInterview: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application.interview&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=hire&resource=application.interview&version=v1 document }
             */
            list: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                    };
                    path: { application_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                page_token?: string;
                                has_more?: boolean;
                                items?: Array<{
                                    id?: string;
                                    begin_time?: number;
                                    end_time?: number;
                                    round?: number;
                                    stage_id?: string;
                                    interview_record_list?: Array<{
                                        id?: string;
                                        user_id?: string;
                                        content?: string;
                                        min_job_level_id?: string;
                                        max_job_level_id?: string;
                                        commit_status?: number;
                                        feedback_submit_time?: number;
                                        conclusion?: number;
                                        interview_score?: {
                                            id?: string;
                                            level?: number;
                                            zh_name?: string;
                                            zh_description?: string;
                                            en_name?: string;
                                            en_description?: string;
                                        };
                                        assessment_score?: {
                                            calculate_type: number;
                                            score: number;
                                            full_score?: number;
                                        };
                                        question_list?: Array<{
                                            id: string;
                                            title?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            description?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            content?: string;
                                            ability_list?: Array<{
                                                id: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                description?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            }>;
                                        }>;
                                        code_question_list?: Array<{
                                            id: string;
                                            title?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            description?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            content?: string;
                                            ability_list?: Array<{
                                                id: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                description?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            }>;
                                        }>;
                                        interviewer?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        image_list?: Array<{
                                            id: string;
                                            url: string;
                                            name?: string;
                                            mime?: string;
                                            create_time?: string;
                                        }>;
                                        dimension_assessment_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            full_score?: number;
                                            content?: string;
                                            dimension_id?: string;
                                            dimension_score?: {
                                                id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                score_val?: number;
                                            };
                                            dimension_score_list?: Array<{
                                                id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                score_val?: number;
                                            }>;
                                            dimension_custom_score?: number;
                                            ability_list?: Array<{
                                                id: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                description?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            }>;
                                            question_list?: Array<{
                                                id: string;
                                                title?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                description?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                content?: string;
                                                ability_list?: Array<{
                                                    id: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    description?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                            }>;
                                            dimension_type?: number;
                                        }>;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/applications/:application_id/interviews`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 附件
         */
        attachment: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=attachment&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/attachment/get document }
             *
             * 获取附件信息
             *
             * 获取招聘系统中附件的元信息，比如文件名、创建时间、文件url等
             */
            get: async (
                payload?: {
                    params?: { type?: number };
                    path: { attachment_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                attachment?: {
                                    id?: string;
                                    url?: string;
                                    name?: string;
                                    mime?: string;
                                    create_time?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/attachments/:attachment_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=attachment&apiName=preview&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/attachment/preview document }
             *
             * 获取附件预览信息
             *
             * 根据附件 ID 获取附件预览信息
             */
            preview: async (
                payload?: {
                    path: { attachment_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        { code?: number; msg?: string; data?: { url: string } }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/attachments/:attachment_id/preview`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 生态对接账号自定义字段
         */
        ecoAccountCustomField: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_account_custom_field&apiName=batch_delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/batch_delete document }
             *
             * 删除帐号自定义字段
             *
             * 删除用户在服务商处的身份标示字段（如用户在服务商处的租户 ID）。删除后，不影响已添加帐号对应的自定义字段的值。但在添加新帐号时，将不能再使用此自定义字段。删除不支持撤销，对应的 key 将无法再次复用。
             */
            batchDelete: async (
                payload?: {
                    data?: {
                        scope?: number;
                        custom_field_key_list?: Array<string>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_account_custom_fields/batch_delete`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_account_custom_field&apiName=batch_update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/batch_update document }
             *
             * 更新帐号自定义字段
             *
             * 更新用户在服务商处的身份标示字段（如用户在服务商处的租户 ID），此方法只会更新同一 scope 内 key 一致的自定义字段。
             */
            batchUpdate: async (
                payload?: {
                    data: {
                        scope: number;
                        custom_field_list: Array<{
                            key: string;
                            name: { zh_cn?: string; en_us?: string };
                            is_required: boolean;
                            description?: { zh_cn?: string; en_us?: string };
                        }>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_account_custom_fields/batch_update`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_account_custom_field&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/create document }
             *
             * 创建帐号自定义字段
             *
             * 定制用户在服务商处的身份标示字段（如用户在服务商处的租户 ID）。用户在飞书招聘后台添加帐号后，系统会推送「帐号绑定」事件给开发者，事件将携带用户填写的自定义字段信息，开发者可根据此信息识别飞书招聘用户在服务商处的身份信息，完成飞书招聘用户和服务商帐号的绑定，并以此来推送对应的套餐或试卷列表等。
             */
            create: async (
                payload?: {
                    data: {
                        scope: number;
                        custom_field_list: Array<{
                            key: string;
                            name: { zh_cn?: string; en_us?: string };
                            is_required: boolean;
                            description?: { zh_cn?: string; en_us?: string };
                        }>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_account_custom_fields`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 背调订单
         */
        ecoBackgroundCheck: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check&apiName=cancel&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/cancel document }
             *
             * 终止背调订单
             *
             * 终止背调订单
             */
            cancel: async (
                payload?: {
                    data: { background_check_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_background_checks/cancel`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check&apiName=update_progress&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/update_progress document }
             *
             * 更新背调进度
             *
             * 更新指定背调的进度信息
             */
            updateProgress: async (
                payload?: {
                    data: {
                        background_check_id: string;
                        stage_id: string;
                        stage_en_name?: string;
                        stage_name: string;
                        stage_time: string;
                        result?: string;
                        report_file_list?: Array<{
                            report_name: string;
                            report_url: string;
                            report_url_type?: number;
                        }>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_background_checks/update_progress`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check&apiName=update_result&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/update_result document }
             *
             * 回传背调的最终结果
             *
             * 回传背调的最终结果
             */
            updateResult: async (
                payload?: {
                    data: {
                        background_check_id: string;
                        result: string;
                        result_time: string;
                        report_file_list?: Array<{
                            report_name: string;
                            report_url: string;
                            report_url_type?: number;
                        }>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_background_checks/update_result`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 背调自定义字段
         */
        ecoBackgroundCheckCustomField: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check_custom_field&apiName=batch_delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/batch_delete document }
             *
             * 删除背调自定义字段
             *
             * 删除用户在发起背调时的自定义字段，删除不影响已创建的背调，删除后对应的自定义字段的 key 不能再复用。
             */
            batchDelete: async (
                payload?: {
                    data: { account_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_background_check_custom_fields/batch_delete`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check_custom_field&apiName=batch_update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/batch_update document }
             *
             * 更新背调自定义字段
             *
             * 更新用户在发起背调时的自定义字段。更新操作不支持更新自定义字段类型，且将影响已发起的背调表单展示。
             */
            batchUpdate: async (
                payload?: {
                    data: {
                        account_id: string;
                        custom_field_list: Array<{
                            type:
                                | "text"
                                | "textarea"
                                | "number"
                                | "boolean"
                                | "select"
                                | "multiselect"
                                | "date"
                                | "file"
                                | "resume";
                            key: string;
                            name: { zh_cn?: string; en_us?: string };
                            is_required: boolean;
                            description?: { zh_cn?: string; en_us?: string };
                            options?: Array<{
                                key: string;
                                name: { zh_cn?: string; en_us?: string };
                            }>;
                        }>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_background_check_custom_fields/batch_update`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check_custom_field&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/create document }
             *
             * 创建背调自定义字段
             *
             * 定制用户在发起背调时的自定义字段
             */
            create: async (
                payload?: {
                    data: {
                        account_id: string;
                        custom_field_list: Array<{
                            type:
                                | "text"
                                | "textarea"
                                | "number"
                                | "boolean"
                                | "select"
                                | "multiselect"
                                | "date"
                                | "file"
                                | "resume";
                            key: string;
                            name: { zh_cn?: string; en_us?: string };
                            is_required: boolean;
                            description?: { zh_cn?: string; en_us?: string };
                            options?: Array<{
                                key: string;
                                name: { zh_cn?: string; en_us?: string };
                            }>;
                        }>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_background_check_custom_fields`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 背调套餐和附加调查项
         */
        ecoBackgroundCheckPackage: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check_package&apiName=batch_delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/batch_delete document }
             *
             * 删除背调套餐和附加调查项
             *
             * 删除指定帐号的指定背调套餐和附加调查项信息，删除不会影响已创建的背调。
             */
            batchDelete: async (
                payload?: {
                    data: {
                        account_id: string;
                        package_id_list?: Array<string>;
                        additional_item_id_list?: Array<string>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_background_check_packages/batch_delete`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check_package&apiName=batch_update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/batch_update document }
             *
             * 更新背调套餐和附加调查项
             *
             * 更新指定帐号可用的背调套餐和附加调查项信息，更新将影响已发起背调的表单项展示
             */
            batchUpdate: async (
                payload?: {
                    data: {
                        account_id: string;
                        package_list: Array<{
                            id: string;
                            name: string;
                            description?: string;
                        }>;
                        additional_item_list?: Array<{
                            id: string;
                            name: string;
                            description?: string;
                        }>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_background_check_packages/batch_update`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check_package&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/create document }
             *
             * 推送背调套餐和附加调查项
             *
             * 定制指定帐号可用的背调套餐和附加调查项信息
             */
            create: async (
                payload?: {
                    data: {
                        account_id: string;
                        package_list: Array<{
                            id: string;
                            name: string;
                            description?: string;
                        }>;
                        additional_item_list?: Array<{
                            id: string;
                            name: string;
                            description?: string;
                        }>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_background_check_packages`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * eco_exam
         */
        ecoExam: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_exam&apiName=login_info&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=login_info&project=hire&resource=eco_exam&version=v1 document }
             */
            loginInfo: async (
                payload?: {
                    data: {
                        result?: number;
                        msg?: string;
                        exam_login_info: {
                            exam_url: string;
                            username?: string;
                            password?: string;
                        };
                    };
                    path: { exam_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_exams/:exam_id/login_info`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_exam&apiName=update_result&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_result&project=hire&resource=eco_exam&version=v1 document }
             */
            updateResult: async (
                payload?: {
                    data: {
                        result: string;
                        result_time?: string;
                        report_list?: Array<{
                            name: string;
                            url: string;
                            answer_time?: string;
                        }>;
                        detail_list?: Array<{
                            id?: string;
                            name: string;
                            result: string;
                        }>;
                    };
                    path: { exam_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_exams/:exam_id/update_result`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * eco_exam_paper
         */
        ecoExamPaper: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_exam_paper&apiName=batch_delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=hire&resource=eco_exam_paper&version=v1 document }
             */
            batchDelete: async (
                payload?: {
                    data: { account_id: string; paper_id_list: Array<string> };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_exam_papers/batch_delete`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_exam_paper&apiName=batch_update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=hire&resource=eco_exam_paper&version=v1 document }
             */
            batchUpdate: async (
                payload?: {
                    data: {
                        account_id: string;
                        paper_list: Array<{
                            id: string;
                            name: string;
                            duration?: number;
                            question_count?: number;
                            start_time?: string;
                            end_time?: string;
                        }>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_exam_papers/batch_update`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_exam_paper&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=hire&resource=eco_exam_paper&version=v1 document }
             */
            create: async (
                payload?: {
                    data: {
                        account_id: string;
                        paper_list: Array<{
                            id: string;
                            name: string;
                            duration?: number;
                            question_count?: number;
                            start_time?: string;
                            end_time?: string;
                        }>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/eco_exam_papers`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 导入 e-HR
         */
        ehrImportTask: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=ehr_import_task&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/ehr_import_task/patch document }
             *
             * 更新 e-HR 导入任务结果
             *
             * 在处理完导入 e-HR 事件后，可调用该接口，更新  e-HR 导入任务结果
             */
            patch: async (
                payload?: {
                    data: {
                        fail_reason?: string;
                        redirect_url?: string;
                        state: number;
                    };
                    path: { ehr_import_task_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/ehr_import_tasks/:ehr_import_task_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 入职
         */
        employee: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=employee&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/get document }
             *
             * 通过员工 ID 获取入职信息
             *
             * 通过员工 ID 获取入职信息
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id"
                            | "people_admin_department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                        job_family_id_type?:
                            | "people_admin_job_category_id"
                            | "job_family_id";
                        employee_type_id_type?:
                            | "people_admin_employee_type_id"
                            | "employee_type_enum_id";
                    };
                    path: { employee_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                employee?: {
                                    id?: string;
                                    application_id?: string;
                                    onboard_status?: number;
                                    conversion_status?: number;
                                    onboard_time?: number;
                                    expected_conversion_time?: number;
                                    actual_conversion_time?: number;
                                    overboard_time?: number;
                                    overboard_note?: string;
                                    onboard_city_code?: string;
                                    department?: string;
                                    leader?: string;
                                    sequence?: string;
                                    level?: string;
                                    employee_type?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/employees/:employee_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=employee&apiName=get_by_application&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/get_by_application document }
             *
             * 通过投递 ID 获取入职信息
             *
             * 通过投递 ID 获取入职信息
             */
            getByApplication: async (
                payload?: {
                    params: {
                        application_id: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id"
                            | "people_admin_department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                        job_family_id_type?:
                            | "people_admin_job_category_id"
                            | "job_family_id";
                        employee_type_id_type?:
                            | "people_admin_employee_type_id"
                            | "employee_type_enum_id";
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
                                employee?: {
                                    id?: string;
                                    application_id?: string;
                                    onboard_status?: number;
                                    conversion_status?: number;
                                    onboard_time?: number;
                                    expected_conversion_time?: number;
                                    actual_conversion_time?: number;
                                    overboard_time?: number;
                                    overboard_note?: string;
                                    onboard_city_code?: string;
                                    department?: string;
                                    leader?: string;
                                    sequence?: string;
                                    level?: string;
                                    employee_type?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/employees/get_by_application`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=employee&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/patch document }
             *
             * 更新入职状态
             *
             * 根据员工 ID 更新员工转正、离职状态
             */
            patch: async (
                payload?: {
                    data: {
                        operation: number;
                        conversion_info?: { actual_conversion_time?: number };
                        overboard_info?: {
                            actual_overboard_time?: number;
                            overboard_note?: string;
                        };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id"
                            | "people_admin_department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                        job_family_id_type?:
                            | "people_admin_job_category_id"
                            | "job_family_id";
                        employee_type_id_type?:
                            | "people_admin_employee_type_id"
                            | "employee_type_enum_id";
                    };
                    path: { employee_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                employee?: {
                                    id?: string;
                                    application_id?: string;
                                    onboard_status?: number;
                                    conversion_status?: number;
                                    onboard_time?: number;
                                    expected_conversion_time?: number;
                                    actual_conversion_time?: number;
                                    overboard_time?: number;
                                    overboard_note?: string;
                                    onboard_city_code?: string;
                                    department?: string;
                                    leader?: string;
                                    sequence?: string;
                                    level?: string;
                                    employee_type?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/employees/:employee_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 评估（灰度租户可见）
         */
        evaluation: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        page_token?: string;
                        page_size?: number;
                        application_id?: string;
                        update_start_time?: string;
                        update_end_time?: string;
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
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
                                `${this.domain}/open-apis/hire/v1/evaluations`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
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
                                                has_more?: boolean;
                                                page_token?: string;
                                                items?: Array<{
                                                    id?: string;
                                                    application_id?: string;
                                                    stage_id?: string;
                                                    creator_id?: string;
                                                    evaluator_id?: string;
                                                    commit_status?: number;
                                                    conclusion?: number;
                                                    content?: string;
                                                    create_time?: string;
                                                    update_time?: string;
                                                }>;
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
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=evaluation&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/evaluation/list document }
             *
             * 获取简历评估信息
             *
             * 获取简历评估信息
             */
            list: async (
                payload?: {
                    params?: {
                        page_token?: string;
                        page_size?: number;
                        application_id?: string;
                        update_start_time?: string;
                        update_end_time?: string;
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
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
                                    id?: string;
                                    application_id?: string;
                                    stage_id?: string;
                                    creator_id?: string;
                                    evaluator_id?: string;
                                    commit_status?: number;
                                    conclusion?: number;
                                    content?: string;
                                    create_time?: string;
                                    update_time?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/evaluations`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 导入外部系统信息（灰度租户可见）
         */
        externalApplication: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=external_application&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/create document }
             *
             * 创建外部投递
             *
             * 导入来自其他系统的投递信息，创建为外部投递
             */
            create: async (
                payload?: {
                    data: {
                        external_id?: string;
                        job_recruitment_type?: number;
                        job_title?: string;
                        resume_source?: string;
                        stage?: string;
                        talent_id: string;
                        termination_reason?: string;
                        delivery_type?: number;
                        modify_time?: number;
                        create_time?: number;
                        termination_type?: string;
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
                                external_application?: {
                                    id?: string;
                                    external_id?: string;
                                    job_recruitment_type?: number;
                                    job_title?: string;
                                    resume_source?: string;
                                    stage?: string;
                                    talent_id: string;
                                    termination_reason?: string;
                                    delivery_type?: number;
                                    modify_time?: number;
                                    create_time?: number;
                                    termination_type?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/external_applications`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=external_application&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=hire&resource=external_application&version=v1 document }
             *
             * 删除外部投递
             */
            delete: async (
                payload?: {
                    params?: { talent_id?: string };
                    path?: { external_application_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                external_application?: {
                                    id?: string;
                                    external_id?: string;
                                    job_recruitment_type?: number;
                                    job_title?: string;
                                    resume_source?: string;
                                    stage?: string;
                                    talent_id: string;
                                    termination_reason?: string;
                                    delivery_type?: number;
                                    modify_time?: number;
                                    create_time?: number;
                                    termination_type?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/external_applications/:external_application_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=external_application&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=hire&resource=external_application&version=v1 document }
             *
             * 更新外部投递
             */
            update: async (
                payload?: {
                    data: {
                        external_id?: string;
                        job_recruitment_type?: number;
                        job_title?: string;
                        resume_source?: string;
                        stage?: string;
                        talent_id: string;
                        termination_reason?: string;
                        delivery_type?: number;
                        modify_time?: number;
                        create_time?: number;
                        termination_type?: string;
                    };
                    path?: { external_application_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                external_application?: {
                                    id?: string;
                                    external_id?: string;
                                    job_recruitment_type?: number;
                                    job_title?: string;
                                    resume_source?: string;
                                    stage?: string;
                                    talent_id: string;
                                    termination_reason?: string;
                                    delivery_type?: number;
                                    modify_time?: number;
                                    create_time?: number;
                                    termination_type?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/external_applications/:external_application_id`,
                            path
                        ),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 导入外部系统信息（灰度租户可见）
         */
        externalBackgroundCheck: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=external_background_check&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_background_check/create document }
             *
             * 创建外部背调
             *
             * 导入来自其他系统的背调信息，创建为外部背调
             */
            create: async (
                payload?: {
                    data: {
                        external_id?: string;
                        external_application_id: string;
                        date?: number;
                        name?: string;
                        result?: string;
                        attachment_id_list?: Array<string>;
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
                                external_background_check?: {
                                    id?: string;
                                    external_id?: string;
                                    external_application_id: string;
                                    date?: number;
                                    name?: string;
                                    result?: string;
                                    attachment_id_list?: Array<string>;
                                    attachment_list?: Array<{
                                        id?: string;
                                        name?: string;
                                        size?: number;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/external_background_checks`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 导入外部系统信息（灰度租户可见）
         */
        externalInterview: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=external_interview&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview/create document }
             *
             * 创建外部面试
             *
             * 导入来自其他系统的面试信息，创建为外部面试
             */
            create: async (
                payload?: {
                    data: {
                        external_id?: string;
                        external_application_id: string;
                        participate_status?: number;
                        begin_time?: number;
                        end_time?: number;
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
                                external_interview?: {
                                    external_id?: string;
                                    external_application_id: string;
                                    id?: string;
                                    participate_status?: number;
                                    begin_time?: number;
                                    end_time?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/external_interviews`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 导入外部系统信息（灰度租户可见）
         */
        externalInterviewAssessment: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=external_interview_assessment&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview_assessment/create document }
             *
             * 创建外部面评
             *
             * 导入来自其他系统的面评信息，创建为外部面评
             */
            create: async (
                payload?: {
                    data: {
                        external_id?: string;
                        username?: string;
                        conclusion?: number;
                        assessment_dimension_list?: Array<{
                            score?: number;
                            option?: string;
                            options?: Array<string>;
                            content?: string;
                            assessment_type?: number;
                            title?: string;
                            description?: string;
                        }>;
                        content?: string;
                        external_interview_id: string;
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
                                external_interview_assessment?: {
                                    id?: string;
                                    external_id?: string;
                                    username?: string;
                                    conclusion?: number;
                                    assessment_dimension_list?: Array<{
                                        score?: number;
                                        option?: string;
                                        options?: Array<string>;
                                        content?: string;
                                        assessment_type?: number;
                                        title?: string;
                                        description?: string;
                                    }>;
                                    content?: string;
                                    external_interview_id: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/external_interview_assessments`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 面试
         */
        interview: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=interview&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview/list document }
             *
             * 获取面试信息
             *
             * 根据投递 ID 或面试时间获取面试信息
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        application_id?: string;
                        interview_id?: string;
                        start_time?: string;
                        end_time?: string;
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
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
                                    id?: string;
                                    begin_time?: number;
                                    end_time?: number;
                                    round?: number;
                                    interview_record_list?: Array<{
                                        id?: string;
                                        user_id?: string;
                                        content?: string;
                                        min_job_level_id?: string;
                                        max_job_level_id?: string;
                                        commit_status?: number;
                                        conclusion?: number;
                                        interview_score?: {
                                            id?: string;
                                            level?: number;
                                            zh_name?: string;
                                            zh_description?: string;
                                            en_name?: string;
                                            en_description?: string;
                                        };
                                        assessment_score?: {
                                            calculate_type: number;
                                            score: number;
                                            full_score?: number;
                                        };
                                        question_list?: Array<{
                                            id: string;
                                            title?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            description?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            content?: string;
                                            ability_list?: Array<{
                                                id: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                description?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            }>;
                                        }>;
                                        code_question_list?: Array<{
                                            id: string;
                                            title?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            description?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            content?: string;
                                            ability_list?: Array<{
                                                id: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                description?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            }>;
                                        }>;
                                        interviewer?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        image_list?: Array<{
                                            id: string;
                                            url: string;
                                            name?: string;
                                            mime?: string;
                                            create_time?: string;
                                        }>;
                                        dimension_assessment_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            full_score?: number;
                                            content?: string;
                                            dimension_id?: string;
                                            dimension_score?: {
                                                id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                score_val?: number;
                                            };
                                            dimension_score_list?: Array<{
                                                id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                score_val?: number;
                                            }>;
                                            dimension_custom_score?: number;
                                            ability_list?: Array<{
                                                id: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                description?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            }>;
                                            question_list?: Array<{
                                                id: string;
                                                title?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                description?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                content?: string;
                                                ability_list?: Array<{
                                                    id: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    description?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                            }>;
                                            dimension_type?: number;
                                        }>;
                                    }>;
                                    feedback_submit_time?: number;
                                    stage_id?: string;
                                    application_id?: string;
                                    stage?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    creator?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    biz_create_time?: number;
                                    biz_modify_time?: number;
                                    interview_round_summary?: number;
                                    interview_arrangement_id?: string;
                                    interview_type?: number;
                                    talent_time_zone?: {
                                        code?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    contact_user?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    contact_mobile?: string;
                                    remark?: string;
                                    address?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        district?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        city?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        state?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        country?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                    };
                                    video_type?: number;
                                    arrangement_status?: number;
                                    arrangement_type?: number;
                                    arrangement_appointment_kind?: number;
                                    meeting_room_list?: Array<{
                                        room_id?: string;
                                        room_name?: string;
                                        building_name?: string;
                                        reserved_status?: number;
                                        floor_name?: string;
                                    }>;
                                    interview_round_type?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/interviews`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 职位
         */
        job: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job&apiName=combined_create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/combined_create document }
             *
             * 新建职位
             *
             * 新建职位，字段的是否必填，以系统中的「职位字段管理」中的设置为准。
             */
            combinedCreate: async (
                payload?: {
                    data: {
                        code?: string;
                        experience?: number;
                        expiry_time?: number;
                        customized_data_list?: Array<{
                            object_id?: string;
                            value?: string;
                        }>;
                        min_level_id?: string;
                        min_salary?: number;
                        title: string;
                        job_managers: {
                            id?: string;
                            recruiter_id: string;
                            hiring_manager_id_list: Array<string>;
                            assistant_id_list?: Array<string>;
                        };
                        job_process_id: string;
                        process_type: number;
                        subject_id?: string;
                        job_function_id?: string;
                        department_id: string;
                        head_count?: number;
                        is_never_expired: boolean;
                        max_salary?: number;
                        requirement?: string;
                        address_id?: string;
                        description?: string;
                        highlight_list?: Array<string>;
                        job_type_id: string;
                        max_level_id?: string;
                        recruitment_type_id: string;
                        required_degree?: number;
                        job_category_id?: string;
                        address_id_list?: Array<string>;
                        job_attribute?: number;
                        expiry_timestamp?: string;
                        interview_registration_schema_id?: string;
                        onboard_registration_schema_id?: string;
                        target_major_id_list?: Array<string>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                        job_family_id_type?:
                            | "people_admin_job_category_id"
                            | "job_family_id";
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
                                default_job_post?: { id?: string };
                                job?: {
                                    id?: string;
                                    title?: string;
                                    description?: string;
                                    code?: string;
                                    requirement?: string;
                                    recruitment_type?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                    };
                                    department?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    };
                                    city?: {
                                        city_code?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    };
                                    min_job_level?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                    };
                                    max_job_level?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                    };
                                    highlight_list?: Array<{
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    }>;
                                    job_category?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                    };
                                    job_type?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    };
                                    active_status?: number;
                                    create_user_id?: string;
                                    create_time?: number;
                                    update_time?: number;
                                    process_type?: number;
                                    process_id?: string;
                                    process_name?: string;
                                    process_en_name?: string;
                                    customized_data_list?: Array<{
                                        object_id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        object_type?: number;
                                        value?: {
                                            content?: string;
                                            option?: {
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            option_list?: Array<{
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            }>;
                                            time_range?: {
                                                start_time?: string;
                                                end_time?: string;
                                            };
                                            time?: string;
                                            number?: string;
                                        };
                                    }>;
                                    job_function?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    subject?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    head_count?: number;
                                    experience?: number;
                                    expiry_time?: number;
                                    min_salary?: number;
                                    max_salary?: number;
                                    required_degree?: number;
                                    city_list?: Array<{
                                        code?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    job_attribute?: number;
                                    create_timestamp?: string;
                                    update_timestamp?: string;
                                    expiry_timestamp?: string;
                                    target_major_list?: Array<{
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    }>;
                                };
                                job_manager?: {
                                    id?: string;
                                    recruiter_id: string;
                                    hiring_manager_id_list: Array<string>;
                                    assistant_id_list?: Array<string>;
                                };
                                interview_registration_schema_info?: {
                                    schema_id?: string;
                                    name?: string;
                                };
                                onboard_registration_schema_info?: {
                                    schema_id?: string;
                                    name?: string;
                                };
                                target_major_list?: Array<{
                                    id?: string;
                                    zh_name?: string;
                                    en_name?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/jobs/combined_create`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job&apiName=combined_update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/combined_update document }
             *
             * 更新职位
             *
             * 更新职位信息，该接口为全量更新，若字段没有返回值，则原有值将会被清空。字段的是否必填，将以系统中的「职位字段管理」中的设置为准。
             */
            combinedUpdate: async (
                payload?: {
                    data: {
                        id?: string;
                        experience?: number;
                        expiry_time?: number;
                        customized_data_list?: Array<{
                            object_id?: string;
                            value?: string;
                        }>;
                        min_level_id?: string;
                        min_salary?: number;
                        title?: string;
                        job_managers?: {
                            id?: string;
                            recruiter_id: string;
                            hiring_manager_id_list: Array<string>;
                            assistant_id_list?: Array<string>;
                        };
                        job_process_id?: string;
                        subject_id?: string;
                        job_function_id?: string;
                        department_id?: string;
                        head_count?: number;
                        is_never_expired: boolean;
                        max_salary?: number;
                        requirement?: string;
                        address_id?: string;
                        description?: string;
                        highlight_list?: Array<string>;
                        job_type_id: string;
                        max_level_id?: string;
                        required_degree?: number;
                        job_category_id?: string;
                        address_id_list?: Array<string>;
                        job_attribute?: number;
                        expiry_timestamp?: string;
                        target_major_id_list?: Array<string>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                        job_family_id_type?:
                            | "people_admin_job_category_id"
                            | "job_family_id";
                    };
                    path: { job_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                default_job_post?: { id?: string };
                                job?: {
                                    id?: string;
                                    title?: string;
                                    description?: string;
                                    code?: string;
                                    requirement?: string;
                                    recruitment_type?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                    };
                                    department?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    };
                                    city?: {
                                        city_code?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    };
                                    min_job_level?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                    };
                                    max_job_level?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                    };
                                    highlight_list?: Array<{
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    }>;
                                    job_category?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                    };
                                    job_type?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    };
                                    active_status?: number;
                                    create_user_id?: string;
                                    create_time?: number;
                                    update_time?: number;
                                    process_type?: number;
                                    process_id?: string;
                                    process_name?: string;
                                    process_en_name?: string;
                                    customized_data_list?: Array<{
                                        object_id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        object_type?: number;
                                        value?: {
                                            content?: string;
                                            option?: {
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            option_list?: Array<{
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            }>;
                                            time_range?: {
                                                start_time?: string;
                                                end_time?: string;
                                            };
                                            time?: string;
                                            number?: string;
                                        };
                                    }>;
                                    job_function?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    subject?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    head_count?: number;
                                    experience?: number;
                                    expiry_time?: number;
                                    min_salary?: number;
                                    max_salary?: number;
                                    required_degree?: number;
                                    city_list?: Array<{
                                        code?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    job_attribute?: number;
                                    create_timestamp?: string;
                                    update_timestamp?: string;
                                    expiry_timestamp?: string;
                                    target_major_list?: Array<{
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    }>;
                                };
                                job_manager?: {
                                    id?: string;
                                    recruiter_id: string;
                                    hiring_manager_id_list: Array<string>;
                                    assistant_id_list?: Array<string>;
                                };
                                interview_registration_schema_info?: {
                                    schema_id?: string;
                                    name?: string;
                                };
                                onboard_registration_schema_info?: {
                                    schema_id?: string;
                                    name?: string;
                                };
                                target_major_list?: Array<{
                                    id?: string;
                                    zh_name?: string;
                                    en_name?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/jobs/:job_id/combined_update`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job&apiName=config&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/config document }
             *
             * 获取职位设置
             *
             * 获取职位设置
             */
            config: async (
                payload?: {
                    params?: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                    };
                    path: { job_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                job_config?: {
                                    offer_apply_schema?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    offer_process_conf?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    recommended_evaluator_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    assessment_template?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    id?: string;
                                    interview_round_list?: Array<{
                                        interviewer_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        round?: number;
                                    }>;
                                    job_requirement_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    interview_registration?: {
                                        schema_id?: string;
                                        name?: string;
                                    };
                                    onboard_registration?: {
                                        schema_id?: string;
                                        name?: string;
                                    };
                                    interview_round_type_list?: Array<{
                                        assessment_round?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        assessment_template?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                    }>;
                                    related_job_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    job_attribute?: number;
                                    interview_appointment_config?: {
                                        enable_interview_appointment_by_interviewer?: boolean;
                                        config?: {
                                            interview_type?: number;
                                            talent_timezone_code?: string;
                                            contact_user_id?: string;
                                            contact_mobile?: string;
                                            contact_email?: string;
                                            address_id?: string;
                                            video_type?: number;
                                            cc?: Array<string>;
                                            remark?: string;
                                            interview_notification_template_id?: string;
                                            appointment_notification_template_id?: string;
                                            cancel_interview_notification_template_id?: string;
                                        };
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/jobs/:job_id/config`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/get document }
             *
             * 获取职位信息
             *
             * 根据职位 ID 获取职位信息
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                        job_family_id_type?:
                            | "people_admin_job_category_id"
                            | "job_family_id";
                    };
                    path: { job_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                job?: {
                                    id?: string;
                                    title?: string;
                                    description?: string;
                                    code?: string;
                                    requirement?: string;
                                    recruitment_type?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                    };
                                    department?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    };
                                    city?: {
                                        city_code?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    };
                                    min_job_level?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                    };
                                    max_job_level?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                    };
                                    highlight_list?: Array<{
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    }>;
                                    job_category?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                    };
                                    job_type?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    };
                                    active_status?: number;
                                    create_user_id?: string;
                                    create_time?: number;
                                    update_time?: number;
                                    process_type?: number;
                                    process_id?: string;
                                    process_name?: string;
                                    process_en_name?: string;
                                    customized_data_list?: Array<{
                                        object_id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        object_type?: number;
                                        value?: {
                                            content?: string;
                                            option?: {
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            option_list?: Array<{
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            }>;
                                            time_range?: {
                                                start_time?: string;
                                                end_time?: string;
                                            };
                                            time?: string;
                                            number?: string;
                                        };
                                    }>;
                                    job_function?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    subject?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    head_count?: number;
                                    experience?: number;
                                    expiry_time?: number;
                                    min_salary?: number;
                                    max_salary?: number;
                                    required_degree?: number;
                                    city_list?: Array<{
                                        code?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    job_attribute?: number;
                                    create_timestamp?: string;
                                    update_timestamp?: string;
                                    expiry_timestamp?: string;
                                    target_major_list?: Array<{
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/jobs/:job_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/list document }
             *
             * 获取职位列表
             *
             * 根据更新时间获取职位列表，仅支持获取默认字段信息，获取详细信息可调用[获取职位详细](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/get)接口
             */
            list: async (
                payload?: {
                    params?: {
                        update_start_time?: string;
                        update_end_time?: string;
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                        job_family_id_type?:
                            | "people_admin_job_category_id"
                            | "job_family_id";
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
                                    id?: string;
                                    title?: string;
                                    description?: string;
                                    code?: string;
                                    requirement?: string;
                                    recruitment_type?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                    };
                                    department?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    };
                                    city?: {
                                        city_code?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    };
                                    min_job_level?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                    };
                                    max_job_level?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                    };
                                    highlight_list?: Array<{
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    }>;
                                    job_category?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                    };
                                    job_type?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    };
                                    active_status?: number;
                                    create_user_id?: string;
                                    create_time?: number;
                                    update_time?: number;
                                    process_type?: number;
                                    process_id?: string;
                                    process_name?: string;
                                    process_en_name?: string;
                                    job_function?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    subject?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    head_count?: number;
                                    experience?: number;
                                    expiry_time?: number;
                                    min_salary?: number;
                                    max_salary?: number;
                                    required_degree?: number;
                                    city_list?: Array<{
                                        code?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    job_attribute?: number;
                                    create_timestamp?: string;
                                    update_timestamp?: string;
                                    expiry_timestamp?: string;
                                    target_major_list?: Array<{
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/jobs`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job&apiName=recruiter&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recruiter&project=hire&resource=job&version=v1 document }
             */
            recruiter: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { job_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                info?: {
                                    id?: string;
                                    recruiter_id?: string;
                                    hiring_manager_id_list?: Array<string>;
                                    assistant_id_list?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/jobs/:job_id/recruiter`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job&apiName=update_config&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/update_config document }
             *
             * 更新职位设置
             *
             * 更新职位设置，包括面试评价表、Offer 申请表等。接口将按照所选择的「更新选项」进行设置参数校验和更新。
             */
            updateConfig: async (
                payload?: {
                    data: {
                        offer_apply_schema_id?: string;
                        offer_process_conf?: string;
                        recommended_evaluator_id_list?: Array<string>;
                        update_option_list: Array<number>;
                        assessment_template_biz_id?: string;
                        interview_round_conf_list?: Array<{
                            interviewer_id_list?: Array<string>;
                            round?: number;
                        }>;
                        jr_id_list?: Array<string>;
                        interview_registration_schema_id?: string;
                        onboard_registration_schema_id?: string;
                        interview_round_type_conf_list?: Array<{
                            round_biz_id?: string;
                            assessment_template_biz_id?: string;
                        }>;
                        related_job_id_list?: Array<string>;
                        interview_appointment_config?: {
                            enable_interview_appointment_by_interviewer?: boolean;
                            config?: {
                                interview_type?: number;
                                talent_timezone_code?: string;
                                contact_user_id?: string;
                                contact_mobile?: string;
                                contact_email?: string;
                                address_id?: string;
                                video_type?: number;
                                cc?: Array<string>;
                                remark?: string;
                                interview_notification_template_id?: string;
                                appointment_notification_template_id?: string;
                                cancel_interview_notification_template_id?: string;
                            };
                        };
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { job_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                job_config?: {
                                    offer_apply_schema?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    offer_process_conf?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    recommended_evaluator_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    assessment_template?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    id?: string;
                                    interview_round_list?: Array<{
                                        interviewer_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        round?: number;
                                    }>;
                                    job_requirement_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    interview_registration?: {
                                        schema_id?: string;
                                        name?: string;
                                    };
                                    onboard_registration?: {
                                        schema_id?: string;
                                        name?: string;
                                    };
                                    interview_round_type_list?: Array<{
                                        assessment_round?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        assessment_template?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                    }>;
                                    related_job_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    job_attribute?: number;
                                    interview_appointment_config?: {
                                        enable_interview_appointment_by_interviewer?: boolean;
                                        config?: {
                                            interview_type?: number;
                                            talent_timezone_code?: string;
                                            contact_user_id?: string;
                                            contact_mobile?: string;
                                            contact_email?: string;
                                            address_id?: string;
                                            video_type?: number;
                                            cc?: Array<string>;
                                            remark?: string;
                                            interview_notification_template_id?: string;
                                            appointment_notification_template_id?: string;
                                            cancel_interview_notification_template_id?: string;
                                        };
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/jobs/:job_id/update_config`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * job.manager
         */
        jobManager: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job.manager&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job-manager/get document }
             *
             * 获取职位上的招聘人员信息
             *
             * 根据职位 ID 获取职位上的招聘人员信息，如招聘负责人、用人经理
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                    };
                    path: { job_id: string; manager_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                info?: {
                                    id?: string;
                                    recruiter_id: string;
                                    hiring_manager_id_list: Array<string>;
                                    assistant_id_list?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/jobs/:job_id/managers/:manager_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 流程
         */
        jobProcess: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_process&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_process/list document }
             *
             * 获取招聘流程信息
             *
             * 获取全部招聘流程信息
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    id?: string;
                                    zh_name?: string;
                                    en_name?: string;
                                    type?: number;
                                    stage_list?: Array<{
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        type?: number;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/job_processes`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 招聘需求（灰度租户可见）
         */
        jobRequirement: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_requirement&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/create document }
             *
             * 创建招聘需求
             *
             * 创建招聘需求，除招聘需求编号为必填外，其他字段是否必填与飞书招聘「招聘需求字段管理」内设置一致
             */
            create: async (
                payload?: {
                    data: {
                        short_code: string;
                        name: string;
                        display_progress: number;
                        head_count: number;
                        recruitment_type_id?: string;
                        employee_type_id?: string;
                        max_level_id?: string;
                        min_level_id?: string;
                        sequence_id?: string;
                        category?: number;
                        department_id?: string;
                        recruiter_id_list?: Array<string>;
                        jr_hiring_manager_id_list?: Array<string>;
                        direct_leader_id_list?: Array<string>;
                        start_time?: string;
                        deadline?: string;
                        priority?: number;
                        required_degree?: number;
                        max_salary?: string;
                        min_salary?: string;
                        address_id?: string;
                        description?: string;
                        customized_data_list?: Array<{
                            object_id?: string;
                            value?: string;
                        }>;
                        process_type?: number;
                        job_type_id?: string;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                        job_family_id_type?:
                            | "people_admin_job_category_id"
                            | "job_family_id";
                        employee_type_id_type?:
                            | "people_admin_employee_type_id"
                            | "employee_type_enum_id";
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
                                job_requirement?: {
                                    id?: string;
                                    short_code?: string;
                                    name?: string;
                                    display_progress?: number;
                                    head_count?: number;
                                    recruitment_type?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    employee_type?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    max_level?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    min_level?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    sequence?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    category?: number;
                                    department?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    recruiter_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    jr_hiring_managers?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    direct_leader_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    start_time?: string;
                                    deadline?: string;
                                    priority?: number;
                                    required_degree?: number;
                                    max_salary?: string;
                                    min_salary?: string;
                                    address?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    description?: string;
                                    customized_data_list?: Array<{
                                        object_id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        object_type?: number;
                                        value?: {
                                            content?: string;
                                            option?: {
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            option_list?: Array<{
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            }>;
                                            time_range?: {
                                                start_time?: string;
                                                end_time?: string;
                                            };
                                            time?: string;
                                            number?: string;
                                        };
                                    }>;
                                    job_id_list?: Array<string>;
                                    process_type?: number;
                                    job_type?: {
                                        id: string;
                                        name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        parent_id?: string;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/job_requirements`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_requirement&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/delete document }
             *
             * 删除招聘需求
             *
             * 删除招聘需求
             */
            delete: async (
                payload?: {
                    path: { job_requirement_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/job_requirements/:job_requirement_id`,
                            path
                        ),
                        method: "DELETE",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_requirement&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/list document }
             *
             * 获取招聘需求列表
             *
             * 获取招聘需求列表
             */
            list: async (
                payload?: {
                    params?: {
                        page_token?: string;
                        page_size?: number;
                        job_id?: string;
                        create_time_begin?: string;
                        create_time_end?: string;
                        update_time_begin?: string;
                        update_time_end?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                        job_family_id_type?:
                            | "people_admin_job_category_id"
                            | "job_family_id";
                        employee_type_id_type?:
                            | "people_admin_employee_type_id"
                            | "employee_type_enum_id";
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
                                    id?: string;
                                    short_code?: string;
                                    name?: string;
                                    display_progress?: number;
                                    head_count?: number;
                                    recruitment_type?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    employee_type?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    max_level?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    min_level?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    sequence?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    category?: number;
                                    department?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    recruiter_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    jr_hiring_managers?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    direct_leader_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    start_time?: string;
                                    deadline?: string;
                                    priority?: number;
                                    required_degree?: number;
                                    max_salary?: string;
                                    min_salary?: string;
                                    address?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    description?: string;
                                    customized_data_list?: Array<{
                                        object_id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        object_type?: number;
                                        value?: {
                                            content?: string;
                                            option?: {
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            option_list?: Array<{
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            }>;
                                            time_range?: {
                                                start_time?: string;
                                                end_time?: string;
                                            };
                                            time?: string;
                                            number?: string;
                                        };
                                    }>;
                                    job_id_list?: Array<string>;
                                    process_type?: number;
                                    job_type?: {
                                        id: string;
                                        name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        parent_id?: string;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/job_requirements`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_requirement&apiName=list_by_id&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_by_id&project=hire&resource=job_requirement&version=v1 document }
             *
             * 获取招聘需求信息
             */
            listById: async (
                payload?: {
                    data?: { id_list?: Array<string> };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                        job_family_id_type?:
                            | "people_admin_job_category_id"
                            | "job_family_id";
                        employee_type_id_type?:
                            | "people_admin_employee_type_id"
                            | "employee_type_enum_id";
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
                                    id?: string;
                                    short_code?: string;
                                    name?: string;
                                    display_progress?: number;
                                    head_count?: number;
                                    recruitment_type?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    employee_type?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    max_level?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    min_level?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    sequence?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    category?: number;
                                    department?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    recruiter_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    jr_hiring_managers?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    direct_leader_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    start_time?: string;
                                    deadline?: string;
                                    priority?: number;
                                    required_degree?: number;
                                    max_salary?: string;
                                    min_salary?: string;
                                    address?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    description?: string;
                                    customized_data_list?: Array<{
                                        object_id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        object_type?: number;
                                        value?: {
                                            content?: string;
                                            option?: {
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            option_list?: Array<{
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            }>;
                                            time_range?: {
                                                start_time?: string;
                                                end_time?: string;
                                            };
                                            time?: string;
                                            number?: string;
                                        };
                                    }>;
                                    job_id_list?: Array<string>;
                                    process_type?: number;
                                    job_type?: {
                                        id: string;
                                        name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        parent_id?: string;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/job_requirements/search`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_requirement&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/update document }
             *
             * 更新招聘需求
             *
             * 更新招聘需求
             */
            update: async (
                payload?: {
                    data: {
                        name: string;
                        display_progress: number;
                        head_count: number;
                        recruitment_type_id?: string;
                        employee_type_id?: string;
                        max_level_id?: string;
                        min_level_id?: string;
                        sequence_id?: string;
                        category?: number;
                        department_id?: string;
                        recruiter_id_list?: Array<string>;
                        jr_hiring_manager_id_list?: Array<string>;
                        direct_leader_id_list?: Array<string>;
                        start_time?: string;
                        deadline?: string;
                        priority?: number;
                        required_degree?: number;
                        max_salary?: string;
                        min_salary?: string;
                        address_id?: string;
                        description?: string;
                        customized_data_list?: Array<{
                            object_id?: string;
                            value?: string;
                        }>;
                        process_type?: number;
                        job_type_id?: string;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                        job_family_id_type?:
                            | "people_admin_job_category_id"
                            | "job_family_id";
                        employee_type_id_type?:
                            | "people_admin_employee_type_id"
                            | "employee_type_enum_id";
                    };
                    path: { job_requirement_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/job_requirements/:job_requirement_id`,
                            path
                        ),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * job_requirement_schema
         */
        jobRequirementSchema: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_requirement_schema&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement_schema/list document }
             *
             * 获取招聘需求模板
             *
             * 获取招聘需求模板
             */
            list: async (
                payload?: {
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
                                    id?: string;
                                    name?: { zh_cn?: string; en_us?: string };
                                    object_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        setting?: {
                                            object_type?: number;
                                            config?: {
                                                options?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    description?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    active_status?: number;
                                                }>;
                                            };
                                        };
                                        is_customized?: boolean;
                                        is_required?: boolean;
                                        active_status?: number;
                                        children_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            description?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            setting?: {
                                                object_type?: number;
                                                config?: {
                                                    options?: Array<{
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        description?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        active_status?: number;
                                                    }>;
                                                };
                                            };
                                            parent_id?: string;
                                            is_customized?: boolean;
                                            is_required?: boolean;
                                            active_status?: number;
                                        }>;
                                    }>;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/job_requirement_schemas`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * job_type
         */
        jobType: {
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
                                `${this.domain}/open-apis/hire/v1/job_types`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
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
                                                    id: string;
                                                    name: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    parent_id?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_type&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=hire&resource=job_type&version=v1 document }
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
                                    id: string;
                                    name: { zh_cn?: string; en_us?: string };
                                    parent_id?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/job_types`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 备注
         */
        note: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=note&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/create document }
             *
             * 创建备注
             *
             * 创建备注信息
             */
            create: async (
                payload?: {
                    data: {
                        talent_id: string;
                        application_id?: string;
                        creator_id?: string;
                        content: string;
                        privacy?: number;
                    };
                    params?: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
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
                                note?: {
                                    id?: string;
                                    talent_id: string;
                                    application_id?: string;
                                    is_private?: boolean;
                                    create_time?: number;
                                    modify_time?: number;
                                    creator_id?: string;
                                    content: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/notes`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=note&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/get document }
             *
             * 获取备注
             *
             * 根据备注 ID 获取备注信息
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
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
                                    id?: string;
                                    talent_id: string;
                                    application_id?: string;
                                    is_private?: boolean;
                                    create_time?: number;
                                    modify_time?: number;
                                    creator_id?: string;
                                    content: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/notes/:note_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=note&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/list document }
             *
             * 获取备注列表
             *
             * 获取备注列表
             */
            list: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        talent_id: string;
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
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
                                    id?: string;
                                    talent_id: string;
                                    application_id?: string;
                                    is_private?: boolean;
                                    create_time?: number;
                                    modify_time?: number;
                                    creator_id?: string;
                                    content: string;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/notes`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=note&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/patch document }
             *
             * 更新备注
             *
             * 根据备注 ID 更新备注信息
             */
            patch: async (
                payload?: {
                    data: { content: string };
                    params?: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
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
                                    id?: string;
                                    talent_id: string;
                                    application_id?: string;
                                    is_private?: boolean;
                                    create_time?: number;
                                    modify_time?: number;
                                    creator_id?: string;
                                    content: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/notes/:note_id`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * Offer
         */
        offer: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=offer&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/create document }
             *
             * 创建 Offer
             *
             * 创建 Offer 时，需传入本文档中标注为必传的参数，其余参数是否必传参考「获取 Offer 申请表模板信息」的参数定义
             */
            create: async (
                payload?: {
                    data: {
                        application_id: string;
                        schema_id: string;
                        offer_type?: number;
                        basic_info: {
                            department_id: string;
                            leader_user_id: string;
                            employment_job_id?: string;
                            employee_type_id?: string;
                            job_family_id?: string;
                            job_level_id?: string;
                            probation_month?: number;
                            contract_year?: number;
                            contract_period?: {
                                period_type: number;
                                period: number;
                            };
                            expected_onboard_date?: string;
                            onboard_address_id?: string;
                            work_address_id?: string;
                            owner_user_id: string;
                            recommended_words?: string;
                            job_requirement_id?: string;
                            job_process_type_id?: number;
                            attachment_id_list?: Array<string>;
                            attachment_description?: string;
                            operator_user_id: string;
                        };
                        salary_info?: {
                            currency: string;
                            basic_salary?: string;
                            probation_salary_percentage?: string;
                            award_salary_multiple?: string;
                            option_shares?: string;
                            quarterly_bonus?: string;
                            half_year_bonus?: string;
                        };
                        customized_info_list?: Array<{
                            id?: string;
                            value?: string;
                        }>;
                    };
                    params?: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                        job_family_id_type?:
                            | "people_admin_job_category_id"
                            | "job_family_id";
                        employee_type_id_type?:
                            | "people_admin_employee_type_id"
                            | "employee_type_enum_id";
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
                                offer_id?: string;
                                application_id?: string;
                                schema_id?: string;
                                offer_type?: number;
                                basic_info?: {
                                    department_id?: string;
                                    leader_user_id?: string;
                                    employment_job_id?: string;
                                    employee_type_id?: string;
                                    job_family_id?: string;
                                    job_level_id?: string;
                                    probation_month?: number;
                                    contract_year?: number;
                                    contract_period?: {
                                        period_type: number;
                                        period: number;
                                    };
                                    expected_onboard_date?: string;
                                    onboard_address_id?: string;
                                    work_address_id?: string;
                                    owner_user_id?: string;
                                    recommended_words?: string;
                                    job_requirement_id?: string;
                                    job_process_type_id?: number;
                                    attachment_id_list?: Array<string>;
                                    attachment_description?: string;
                                    operator_user_id: string;
                                };
                                salary_info?: {
                                    currency: string;
                                    basic_salary?: string;
                                    probation_salary_percentage?: string;
                                    award_salary_multiple?: string;
                                    option_shares?: string;
                                    quarterly_bonus?: string;
                                    half_year_bonus?: string;
                                };
                                customized_info_list?: Array<{
                                    id?: string;
                                    value?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/offers`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=offer&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/get document }
             *
             * 获取 Offer 详情
             *
             * 根据 Offer ID 获取 Offer 详细信息
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                        job_family_id_type?:
                            | "people_admin_job_category_id"
                            | "job_family_id";
                        employee_type_id_type?:
                            | "people_admin_employee_type_id"
                            | "employee_type_enum_id";
                    };
                    path?: { offer_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                offer?: {
                                    id?: string;
                                    application_id?: string;
                                    basic_info?: {
                                        offer_type?: number;
                                        remark?: string;
                                        expire_time?: number;
                                        owner_user_id?: string;
                                        creator_user_id?: string;
                                        employee_type?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        create_time?: string;
                                        leader_user_id?: string;
                                        onboard_date?: string;
                                        department_id?: string;
                                        probation_month?: number;
                                        contract_year?: number;
                                        contract_period?: {
                                            period_type: number;
                                            period: number;
                                        };
                                        recruitment_type?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        sequence?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        level?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        onboard_address?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            district?: {
                                                zh_name?: string;
                                                en_name?: string;
                                                code?: string;
                                                location_type?: number;
                                            };
                                            city?: {
                                                zh_name?: string;
                                                en_name?: string;
                                                code?: string;
                                                location_type?: number;
                                            };
                                            state?: {
                                                zh_name?: string;
                                                en_name?: string;
                                                code?: string;
                                                location_type?: number;
                                            };
                                            country?: {
                                                zh_name?: string;
                                                en_name?: string;
                                                code?: string;
                                                location_type?: number;
                                            };
                                        };
                                        work_address?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            district?: {
                                                zh_name?: string;
                                                en_name?: string;
                                                code?: string;
                                                location_type?: number;
                                            };
                                            city?: {
                                                zh_name?: string;
                                                en_name?: string;
                                                code?: string;
                                                location_type?: number;
                                            };
                                            state?: {
                                                zh_name?: string;
                                                en_name?: string;
                                                code?: string;
                                                location_type?: number;
                                            };
                                            country?: {
                                                zh_name?: string;
                                                en_name?: string;
                                                code?: string;
                                                location_type?: number;
                                            };
                                        };
                                        customize_info_list?: Array<{
                                            object_id?: string;
                                            customize_value?: string;
                                        }>;
                                        work_location_address_info?: {
                                            location_info?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            address_info?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                        };
                                    };
                                    salary_plan?: {
                                        currency?: string;
                                        basic_salary?: string;
                                        probation_salary_percentage?: string;
                                        award_salary_multiple?: string;
                                        option_shares?: string;
                                        quarterly_bonus?: string;
                                        half_year_bonus?: string;
                                        total_annual_cash?: string;
                                        customize_info_list?: Array<{
                                            object_id?: string;
                                            customize_value?: string;
                                        }>;
                                    };
                                    schema_id?: string;
                                    offer_status?: number;
                                    offer_type?: number;
                                    job_info?: {
                                        job_id?: string;
                                        job_name?: string;
                                    };
                                    customized_module_list?: Array<{
                                        ID?: string;
                                        object_list?: Array<{
                                            object_id?: string;
                                            customize_value?: string;
                                        }>;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/offers/:offer_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=offer&apiName=intern_offer_status&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/intern_offer_status document }
             *
             * 更新实习 Offer 入/离职状态
             *
             * 对「实习待入职」状态的实习 Offer 确认入职、放弃入职，或对「实习已入职」状态的实习 Offer 操作离职
             */
            internOfferStatus: async (
                payload?: {
                    data: {
                        operation:
                            | "confirm_onboarding"
                            | "cancel_onboarding"
                            | "offboard";
                        onboarding_info?: { actual_onboarding_date: string };
                        offboarding_info?: {
                            actual_offboarding_date: string;
                            notes?: string;
                        };
                    };
                    path?: { offer_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                offer_id?: string;
                                operation:
                                    | "confirm_onboarding"
                                    | "cancel_onboarding"
                                    | "offboard";
                                onboarding_info?: {
                                    actual_onboarding_date: string;
                                };
                                offboarding_info?: {
                                    actual_offboarding_date: string;
                                    notes?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/offers/:offer_id/intern_offer_status`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=offer&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/list document }
             *
             * 获取 Offer 列表
             *
             * 根据人才 ID 获取 Offer 列表
             */
            list: async (
                payload?: {
                    params: {
                        page_token?: string;
                        page_size?: number;
                        talent_id: string;
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                        employee_type_id_type?:
                            | "people_admin_employee_type_id"
                            | "employee_type_enum_id";
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
                                    id?: string;
                                    job_info?: {
                                        job_id?: string;
                                        job_name?: string;
                                    };
                                    create_time?: string;
                                    offer_status?: number;
                                    offer_type?: number;
                                    employee_type?: {
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    };
                                    application_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/offers`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=offer&apiName=offer_status&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=offer_status&project=hire&resource=offer&version=v1 document }
             */
            offerStatus: async (
                payload?: {
                    data: {
                        offer_status: number;
                        expiration_date?: string;
                        termination_reason_id_list?: Array<string>;
                        termination_reason_note?: string;
                    };
                    path?: { offer_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/offers/:offer_id/offer_status`,
                            path
                        ),
                        method: "PATCH",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=offer&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/update document }
             *
             * 更新 Offer 信息
             *
             * 1. 更新 Offer 时，需传入本文档中标注为必传的参数，其余参数是否必传参考「获取 Offer 申请表模板信息」的参数定义；;2. 对系统中已存在的 offer 进行更新的，若更新 offer 中含有「修改需审批」的字段，更新后原 Offer 的审批会自动撤回，需要重新发起审批
             */
            update: async (
                payload?: {
                    data: {
                        schema_id: string;
                        basic_info: {
                            department_id: string;
                            leader_user_id: string;
                            employment_job_id?: string;
                            employee_type_id?: string;
                            job_family_id?: string;
                            job_level_id?: string;
                            probation_month?: number;
                            contract_year?: number;
                            contract_period?: {
                                period_type: number;
                                period: number;
                            };
                            expected_onboard_date?: string;
                            onboard_address_id?: string;
                            work_address_id?: string;
                            owner_user_id: string;
                            recommended_words?: string;
                            job_requirement_id?: string;
                            job_process_type_id?: number;
                            attachment_id_list?: Array<string>;
                            attachment_description?: string;
                            operator_user_id: string;
                        };
                        salary_info?: {
                            currency: string;
                            basic_salary?: string;
                            probation_salary_percentage?: string;
                            award_salary_multiple?: string;
                            option_shares?: string;
                            quarterly_bonus?: string;
                            half_year_bonus?: string;
                        };
                        customized_info_list?: Array<{
                            id?: string;
                            value?: string;
                        }>;
                    };
                    params?: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                        job_family_id_type?:
                            | "people_admin_job_category_id"
                            | "job_family_id";
                        employee_type_id_type?:
                            | "people_admin_employee_type_id"
                            | "employee_type_enum_id";
                    };
                    path?: { offer_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                offer_id?: string;
                                schema_id?: string;
                                basic_info?: {
                                    department_id?: string;
                                    leader_user_id?: string;
                                    employment_job_id?: string;
                                    employee_type_id?: string;
                                    job_family_id?: string;
                                    job_level_id?: string;
                                    probation_month?: number;
                                    contract_year?: number;
                                    contract_period?: {
                                        period_type: number;
                                        period: number;
                                    };
                                    expected_onboard_date?: string;
                                    onboard_address_id?: string;
                                    work_address_id?: string;
                                    owner_user_id?: string;
                                    recommended_words?: string;
                                    job_requirement_id?: string;
                                    job_process_type_id?: number;
                                    attachment_id_list?: Array<string>;
                                    attachment_description?: string;
                                    operator_user_id: string;
                                };
                                salary_info?: {
                                    currency: string;
                                    basic_salary?: string;
                                    probation_salary_percentage?: string;
                                    award_salary_multiple?: string;
                                    option_shares?: string;
                                    quarterly_bonus?: string;
                                    half_year_bonus?: string;
                                };
                                customized_info_list?: Array<{
                                    id?: string;
                                    value?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/offers/:offer_id`,
                            path
                        ),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * offer_schema
         */
        offerSchema: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=offer_schema&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=hire&resource=offer_schema&version=v1 document }
             */
            get: async (
                payload?: {
                    path: { offer_schema_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                id?: string;
                                scenario?: number;
                                version?: number;
                                object_list?: Array<{
                                    id?: string;
                                    name?: { zh_cn?: string; en_us?: string };
                                    type?: string;
                                    is_customized?: boolean;
                                    option_list?: Array<{
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        index?: number;
                                        active_status?: number;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/offer_schemas/:offer_schema_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 问卷（灰度租户可见）
         */
        questionnaire: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=questionnaire&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/questionnaire/list document }
             *
             * 获取面试满意度问卷列表
             *
             * 获取面试满意度问卷列表
             */
            list: async (
                payload?: {
                    params?: {
                        page_token?: string;
                        page_size?: number;
                        application_id?: string;
                        interview_id?: string;
                        update_start_time?: string;
                        update_end_time?: string;
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
                                    questionnaire_id?: string;
                                    application_id?: string;
                                    interview_id?: string;
                                    version?: number;
                                    questions?: Array<{
                                        question_id?: string;
                                        question_name?: string;
                                        question_en_name?: string;
                                        question_desc?: string;
                                        question_en_desc?: string;
                                        question_type?: number;
                                        is_required?: boolean;
                                        select_option_result_list?: Array<{
                                            option_id?: string;
                                            option_name?: string;
                                            option_en_name?: string;
                                            option_desc?: string;
                                            option_en_desc?: string;
                                            is_selected?: boolean;
                                        }>;
                                        five_start_scoring_result?: {
                                            highest_score_desc?: string;
                                            highest_score_en_desc?: string;
                                            lowest_score_desc?: string;
                                            lowest_score_en_desc?: string;
                                            score_result?: number;
                                        };
                                        description_result?: string;
                                    }>;
                                    has_answers?: boolean;
                                    update_time?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/questionnaires`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 内推
         */
        referral: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=referral&apiName=get_by_application&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral/get_by_application document }
             *
             * 获取内推信息
             *
             * 根据投递 ID 获取内推信息
             */
            getByApplication: async (
                payload?: {
                    params: {
                        application_id: string;
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
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
                                referral?: {
                                    id: string;
                                    application_id: string;
                                    create_time: number;
                                    referral_user_id: string;
                                    referral_user?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/referrals/get_by_application`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * referral_account
         */
        referralAccount: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=referral_account&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=hire&resource=referral_account&version=v1 document }
             */
            create: async (
                payload?: {
                    data?: {
                        mobile?: { code?: string; number?: string };
                        email?: string;
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
                                account?: {
                                    account_id: string;
                                    assets?: {
                                        confirmed_bonus?: {
                                            bonus_type?: number;
                                            point_bonus?: number;
                                            cash?: {
                                                currency_type: string;
                                                amount: number;
                                            };
                                        };
                                        paid_bonus?: {
                                            bonus_type?: number;
                                            point_bonus?: number;
                                            cash?: {
                                                currency_type: string;
                                                amount: number;
                                            };
                                        };
                                    };
                                    status?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/referral_account`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=referral_account&apiName=deactivate&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=deactivate&project=hire&resource=referral_account&version=v1 document }
             */
            deactivate: async (
                payload?: {
                    path?: { referral_account_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                account?: {
                                    account_id: string;
                                    assets?: {
                                        confirmed_bonus?: {
                                            bonus_type?: number;
                                            point_bonus?: number;
                                            cash?: {
                                                currency_type: string;
                                                amount: number;
                                            };
                                        };
                                        paid_bonus?: {
                                            bonus_type?: number;
                                            point_bonus?: number;
                                            cash?: {
                                                currency_type: string;
                                                amount: number;
                                            };
                                        };
                                    };
                                    status?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/referral_account/:referral_account_id/deactivate`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=referral_account&apiName=reconciliation&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reconciliation&project=hire&resource=referral_account&version=v1 document }
             */
            reconciliation: async (
                payload?: {
                    data?: {
                        start_trans_time?: string;
                        end_trans_time?: string;
                        trade_details?: Array<{
                            account_id: string;
                            total_recharge_reward_info?: {
                                bonus_type?: number;
                                point_bonus?: number;
                                cash?: {
                                    currency_type: string;
                                    amount: number;
                                };
                            };
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
                                check_failed_list?: Array<{
                                    account_id?: string;
                                    total_withdraw_reward_info?: {
                                        bonus_type?: number;
                                        point_bonus?: number;
                                        cash?: {
                                            currency_type: string;
                                            amount: number;
                                        };
                                    };
                                    total_recharge_reward_info?: {
                                        bonus_type?: number;
                                        point_bonus?: number;
                                        cash?: {
                                            currency_type: string;
                                            amount: number;
                                        };
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/referral_account/reconciliation`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=referral_account&apiName=withdraw&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=withdraw&project=hire&resource=referral_account&version=v1 document }
             */
            withdraw: async (
                payload?: {
                    data?: {
                        withdraw_bonus_type?: Array<number>;
                        external_order_id?: string;
                    };
                    path?: { referral_account_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                external_order_id?: string;
                                trans_time?: string;
                                withdrawal_details?: {
                                    bonus_type?: number;
                                    point_bonus?: number;
                                    cash?: {
                                        currency_type: string;
                                        amount: number;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/referral_account/:referral_account_id/withdraw`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * referral_website.job_post
         */
        referralWebsiteJobPost: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=referral_website.job_post&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=hire&resource=referral_website.job_post&version=v1 document }
             *
             * 获取内推官网下职位广告详情
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
                    };
                    path: { job_post_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                job_post?: {
                                    id?: string;
                                    title?: string;
                                    job_id?: string;
                                    job_code?: string;
                                    job_expire_time?: string;
                                    job_active_status?: number;
                                    job_process_type?: number;
                                    job_recruitment_type?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    job_department?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    job_type?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    min_job_level?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    max_job_level?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    address?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        district?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        city?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        state?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        country?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                    };
                                    min_salary?: string;
                                    max_salary?: string;
                                    required_degree?: number;
                                    experience?: number;
                                    headcount?: number;
                                    high_light_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    description?: string;
                                    requirement?: string;
                                    creator?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    create_time?: string;
                                    modify_time?: string;
                                    customized_data_list?: Array<{
                                        object_id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        object_type?: number;
                                        value?: {
                                            content?: string;
                                            option?: {
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            option_list?: Array<{
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            }>;
                                            time_range?: {
                                                start_time?: string;
                                                end_time?: string;
                                            };
                                            time?: string;
                                            number?: string;
                                        };
                                    }>;
                                    job_function?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    subject?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    address_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        district?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        city?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        state?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        country?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/referral_websites/job_posts/:job_post_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            listWithIterator: async (
                payload?: {
                    params?: {
                        process_type?: number;
                        page_token?: string;
                        page_size?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
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
                                `${this.domain}/open-apis/hire/v1/referral_websites/job_posts`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
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
                                                    id?: string;
                                                    title?: string;
                                                    job_id?: string;
                                                    job_code?: string;
                                                    job_expire_time?: string;
                                                    job_active_status?: number;
                                                    job_process_type?: number;
                                                    job_recruitment_type?: {
                                                        id?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    };
                                                    job_department?: {
                                                        id?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    };
                                                    job_type?: {
                                                        id?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    };
                                                    min_job_level?: {
                                                        id?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    };
                                                    max_job_level?: {
                                                        id?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    };
                                                    address?: {
                                                        id?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        district?: {
                                                            code?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                        city?: {
                                                            code?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                        state?: {
                                                            code?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                        country?: {
                                                            code?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                    };
                                                    min_salary?: string;
                                                    max_salary?: string;
                                                    required_degree?: number;
                                                    experience?: number;
                                                    headcount?: number;
                                                    high_light_list?: Array<{
                                                        id?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    }>;
                                                    description?: string;
                                                    requirement?: string;
                                                    creator?: {
                                                        id?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    };
                                                    create_time?: string;
                                                    modify_time?: string;
                                                    customized_data_list?: Array<{
                                                        object_id?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        object_type?: number;
                                                        value?: {
                                                            content?: string;
                                                            option?: {
                                                                key?: string;
                                                                name?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                            };
                                                            option_list?: Array<{
                                                                key?: string;
                                                                name?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                            }>;
                                                            time_range?: {
                                                                start_time?: string;
                                                                end_time?: string;
                                                            };
                                                            time?: string;
                                                            number?: string;
                                                        };
                                                    }>;
                                                    job_function?: {
                                                        id?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    };
                                                    address_list?: Array<{
                                                        id?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        district?: {
                                                            code?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                        city?: {
                                                            code?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                        state?: {
                                                            code?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                        country?: {
                                                            code?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                    }>;
                                                }>;
                                                has_more?: boolean;
                                                page_token?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=referral_website.job_post&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=hire&resource=referral_website.job_post&version=v1 document }
             *
             * 获取内推官网下的职位列表。自定义数据暂不支持列表获取，请从「获取内推官网下职位广告详情」接口获取
             */
            list: async (
                payload?: {
                    params?: {
                        process_type?: number;
                        page_token?: string;
                        page_size?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "open_department_id"
                            | "department_id";
                        job_level_id_type?:
                            | "people_admin_job_level_id"
                            | "job_level_id";
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
                                    id?: string;
                                    title?: string;
                                    job_id?: string;
                                    job_code?: string;
                                    job_expire_time?: string;
                                    job_active_status?: number;
                                    job_process_type?: number;
                                    job_recruitment_type?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    job_department?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    job_type?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    min_job_level?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    max_job_level?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    address?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        district?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        city?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        state?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        country?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                    };
                                    min_salary?: string;
                                    max_salary?: string;
                                    required_degree?: number;
                                    experience?: number;
                                    headcount?: number;
                                    high_light_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    description?: string;
                                    requirement?: string;
                                    creator?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    create_time?: string;
                                    modify_time?: string;
                                    customized_data_list?: Array<{
                                        object_id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        object_type?: number;
                                        value?: {
                                            content?: string;
                                            option?: {
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            option_list?: Array<{
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            }>;
                                            time_range?: {
                                                start_time?: string;
                                                end_time?: string;
                                            };
                                            time?: string;
                                            number?: string;
                                        };
                                    }>;
                                    job_function?: {
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                    address_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        district?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        city?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        state?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        country?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                    }>;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/referral_websites/job_posts`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * registration_schema
         */
        registrationSchema: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        scenario?: number;
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
                                `${this.domain}/open-apis/hire/v1/registration_schemas`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
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
                                                    id?: string;
                                                    name?: string;
                                                    scenarios?: Array<number>;
                                                    objects?: Array<{
                                                        id?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        description?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        setting?: {
                                                            object_type?: number;
                                                            config?: {
                                                                options?: Array<{
                                                                    key?: string;
                                                                    name?: {
                                                                        zh_cn?: string;
                                                                        en_us?: string;
                                                                    };
                                                                    description?: {
                                                                        zh_cn?: string;
                                                                        en_us?: string;
                                                                    };
                                                                    active_status?: number;
                                                                }>;
                                                            };
                                                        };
                                                        is_customized?: boolean;
                                                        is_required?: boolean;
                                                        is_visible?: boolean;
                                                        active_status?: number;
                                                        children_list?: Array<{
                                                            id?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            description?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            setting?: {
                                                                object_type?: number;
                                                                config?: {
                                                                    options?: Array<{
                                                                        key?: string;
                                                                        name?: {
                                                                            zh_cn?: string;
                                                                            en_us?: string;
                                                                        };
                                                                        description?: {
                                                                            zh_cn?: string;
                                                                            en_us?: string;
                                                                        };
                                                                        active_status?: number;
                                                                    }>;
                                                                };
                                                            };
                                                            parent_id?: string;
                                                            is_customized?: boolean;
                                                            is_required?: boolean;
                                                            is_visible?: boolean;
                                                            active_status?: number;
                                                        }>;
                                                    }>;
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
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=registration_schema&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=hire&resource=registration_schema&version=v1 document }
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        scenario?: number;
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
                                    id?: string;
                                    name?: string;
                                    scenarios?: Array<number>;
                                    objects?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        setting?: {
                                            object_type?: number;
                                            config?: {
                                                options?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    description?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    active_status?: number;
                                                }>;
                                            };
                                        };
                                        is_customized?: boolean;
                                        is_required?: boolean;
                                        is_visible?: boolean;
                                        active_status?: number;
                                        children_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            description?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            setting?: {
                                                object_type?: number;
                                                config?: {
                                                    options?: Array<{
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        description?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        active_status?: number;
                                                    }>;
                                                };
                                            };
                                            parent_id?: string;
                                            is_customized?: boolean;
                                            is_required?: boolean;
                                            is_visible?: boolean;
                                            active_status?: number;
                                        }>;
                                    }>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/registration_schemas`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 简历来源
         */
        resumeSource: {
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
                                `${this.domain}/open-apis/hire/v1/resume_sources`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
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
                                                    id?: string;
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    active_status?: number;
                                                    resume_source_type?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=resume_source&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/resume_source/list document }
             *
             * 获取简历来源列表
             *
             * 获取简历来源列表
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
                                    id?: string;
                                    zh_name?: string;
                                    en_name?: string;
                                    active_status?: number;
                                    resume_source_type?: number;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/resume_sources`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 人才
         */
        talent: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=talent&apiName=add_to_folder&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/add_to_folder document }
             *
             * 将人才加入指定文件夹
             *
             * 将人才加入指定文件夹
             */
            addToFolder: async (
                payload?: {
                    data?: {
                        talent_id_list?: Array<string>;
                        folder_id?: string;
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
                                talent_id_list?: Array<string>;
                                folder_id?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/talents/add_to_folder`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=talent&apiName=batch_get_id&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/batch_get_id document }
             *
             * 通过人才信息获取人才 ID
             *
             * 通过人才信息获取人才 ID
             */
            batchGetId: async (
                payload?: {
                    data?: {
                        mobile_code?: string;
                        mobile_number_list?: Array<string>;
                        email_list?: Array<string>;
                        identification_type?: number;
                        identification_number_list?: Array<string>;
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
                                talent_list?: Array<{
                                    talent_id?: string;
                                    mobile_code?: string;
                                    mobile_number?: string;
                                    email?: string;
                                    identification_type?: number;
                                    identification_number?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/talents/batch_get_id`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=talent&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/get document }
             *
             * 获取人才信息
             *
             * 根据人才 ID 获取人才信息
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                    };
                    path: { talent_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                talent?: {
                                    id?: string;
                                    is_in_agency_period?: boolean;
                                    is_onboarded?: boolean;
                                    basic_info?: {
                                        name: string;
                                        mobile?: string;
                                        mobile_code?: string;
                                        mobile_country_code?: string;
                                        email?: string;
                                        experience_years?: number;
                                        age?: number;
                                        nationality?: {
                                            nationality_code?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        gender?: number;
                                        current_city?: {
                                            city_code?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        hometown_city?: {
                                            city_code?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        preferred_city_list?: Array<{
                                            city_code?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        }>;
                                        identification_type?: number;
                                        identification_number?: string;
                                        identification?: {
                                            identification_type?: number;
                                            identification_number?: string;
                                        };
                                        birthday?: number;
                                        creator_id?: string;
                                        marital_status?: number;
                                        current_home_address?: string;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                                customized_attachment?: Array<{
                                                    file_id?: string;
                                                    name?: string;
                                                    content_type?: string;
                                                    file_size?: number;
                                                }>;
                                            };
                                        }>;
                                        modify_time?: string;
                                        hukou_location_code?: string;
                                    };
                                    education_list?: Array<{
                                        id?: string;
                                        degree?: number;
                                        school?: string;
                                        field_of_study?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        end_time_v2?: string;
                                        education_type?: number;
                                        academic_ranking?: number;
                                        tag_list?: Array<number>;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                                customized_attachment?: Array<{
                                                    file_id?: string;
                                                    name?: string;
                                                    content_type?: string;
                                                    file_size?: number;
                                                }>;
                                            };
                                        }>;
                                    }>;
                                    career_list?: Array<{
                                        id?: string;
                                        company?: string;
                                        title?: string;
                                        desc?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        career_type?: number;
                                        tag_list?: Array<number>;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                                customized_attachment?: Array<{
                                                    file_id?: string;
                                                    name?: string;
                                                    content_type?: string;
                                                    file_size?: number;
                                                }>;
                                            };
                                        }>;
                                    }>;
                                    project_list?: Array<{
                                        id?: string;
                                        name?: string;
                                        role?: string;
                                        link?: string;
                                        desc?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                                customized_attachment?: Array<{
                                                    file_id?: string;
                                                    name?: string;
                                                    content_type?: string;
                                                    file_size?: number;
                                                }>;
                                            };
                                        }>;
                                    }>;
                                    works_list?: Array<{
                                        id?: string;
                                        link?: string;
                                        desc?: string;
                                        name?: string;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                                customized_attachment?: Array<{
                                                    file_id?: string;
                                                    name?: string;
                                                    content_type?: string;
                                                    file_size?: number;
                                                }>;
                                            };
                                        }>;
                                    }>;
                                    award_list?: Array<{
                                        id?: string;
                                        title?: string;
                                        award_time?: string;
                                        desc?: string;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                                customized_attachment?: Array<{
                                                    file_id?: string;
                                                    name?: string;
                                                    content_type?: string;
                                                    file_size?: number;
                                                }>;
                                            };
                                        }>;
                                    }>;
                                    language_list?: Array<{
                                        id?: string;
                                        language?: number;
                                        proficiency?: number;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                                customized_attachment?: Array<{
                                                    file_id?: string;
                                                    name?: string;
                                                    content_type?: string;
                                                    file_size?: number;
                                                }>;
                                            };
                                        }>;
                                    }>;
                                    sns_list?: Array<{
                                        id?: string;
                                        sns_type?: number;
                                        link?: string;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                                customized_attachment?: Array<{
                                                    file_id?: string;
                                                    name?: string;
                                                    content_type?: string;
                                                    file_size?: number;
                                                }>;
                                            };
                                        }>;
                                    }>;
                                    resume_source_list?: Array<{
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    }>;
                                    interview_registration_list?: Array<{
                                        id?: string;
                                        registration_time?: number;
                                        download_url?: string;
                                    }>;
                                    registration_list?: Array<{
                                        id?: string;
                                        registration_time?: number;
                                        download_url?: string;
                                        scenario?: number;
                                    }>;
                                    resume_attachment_id_list?: Array<string>;
                                    customized_data_list?: Array<{
                                        object_id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        object_type?: number;
                                        children?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                                customized_attachment?: Array<{
                                                    file_id?: string;
                                                    name?: string;
                                                    content_type?: string;
                                                    file_size?: number;
                                                }>;
                                            };
                                        }>;
                                    }>;
                                    top_degree?: number;
                                    first_degree?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/talents/:talent_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=talent&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/list document }
             *
             * 获取人才列表
             *
             * 根据更新时间获取人才列表，仅支持获取默认字段信息，获取详细信息可调用「获取人才详细」接口
             */
            list: async (
                payload?: {
                    params?: {
                        update_start_time?: string;
                        update_end_time?: string;
                        page_size?: number;
                        page_token?: string;
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                        query_option?: "ignore_empty_error";
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
                                    id?: string;
                                    is_in_agency_period?: boolean;
                                    is_onboarded?: boolean;
                                    basic_info?: {
                                        name: string;
                                        mobile?: string;
                                        mobile_code?: string;
                                        mobile_country_code?: string;
                                        email?: string;
                                        experience_years?: number;
                                        age?: number;
                                        nationality?: {
                                            nationality_code?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        gender?: number;
                                        current_city?: {
                                            city_code?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        hometown_city?: {
                                            city_code?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        preferred_city_list?: Array<{
                                            city_code?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        }>;
                                        identification_type?: number;
                                        identification_number?: string;
                                        identification?: {
                                            identification_type?: number;
                                            identification_number?: string;
                                        };
                                        birthday?: number;
                                        creator_id?: string;
                                        marital_status?: number;
                                        current_home_address?: string;
                                        modify_time?: string;
                                    };
                                    education_list?: Array<{
                                        id?: string;
                                        degree?: number;
                                        school?: string;
                                        field_of_study?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        end_time_v2?: string;
                                        education_type?: number;
                                        academic_ranking?: number;
                                        tag_list?: Array<number>;
                                    }>;
                                    career_list?: Array<{
                                        id?: string;
                                        company?: string;
                                        title?: string;
                                        desc?: string;
                                        start_time?: string;
                                        end_time?: string;
                                        career_type?: number;
                                        tag_list?: Array<number>;
                                    }>;
                                    project_list?: Array<{
                                        id?: string;
                                        name?: string;
                                        role?: string;
                                        link?: string;
                                        desc?: string;
                                        start_time?: string;
                                        end_time?: string;
                                    }>;
                                    works_list?: Array<{
                                        id?: string;
                                        link?: string;
                                        desc?: string;
                                        name?: string;
                                    }>;
                                    award_list?: Array<{
                                        id?: string;
                                        title?: string;
                                        award_time?: string;
                                        desc?: string;
                                    }>;
                                    language_list?: Array<{
                                        id?: string;
                                        language?: number;
                                        proficiency?: number;
                                    }>;
                                    sns_list?: Array<{
                                        id?: string;
                                        sns_type?: number;
                                        link?: string;
                                    }>;
                                    resume_source_list?: Array<{
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    }>;
                                    interview_registration_list?: Array<{
                                        id?: string;
                                        registration_time?: number;
                                    }>;
                                    resume_attachment_id_list?: Array<string>;
                                    top_degree?: number;
                                    first_degree?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/talents`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * talent_folder
         */
        talentFolder: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        page_token?: string;
                        page_size?: number;
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
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
                                `${this.domain}/open-apis/hire/v1/talent_folders`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
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
                                                has_more?: boolean;
                                                page_token?: string;
                                                items?: Array<{
                                                    folder_id?: string;
                                                    folder_name: string;
                                                    owner_id?: string;
                                                }>;
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
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=talent_folder&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_folder/list document }
             *
             * 获取人才文件夹信息
             *
             * 用于获取招聘系统中人才文件夹信息
             */
            list: async (
                payload?: {
                    params?: {
                        page_token?: string;
                        page_size?: number;
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
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
                                    folder_id?: string;
                                    folder_name: string;
                                    owner_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/talent_folders`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * talent_object
         */
        talentObject: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=hire&resource=talent_object&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_object/query document }
             *
             * 获取人才字段
             *
             * 获取人才字段
             */
            query: async (payload?: {}, options?: IRequestOptions) => {
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
                                    id?: string;
                                    name?: { zh_cn?: string; en_us?: string };
                                    description?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    setting?: {
                                        object_type?: number;
                                        config?: {
                                            options?: Array<{
                                                key?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                description?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                active_status?: number;
                                            }>;
                                        };
                                    };
                                    is_customized?: boolean;
                                    is_required?: boolean;
                                    active_status?: number;
                                    children_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        setting?: {
                                            object_type?: number;
                                            config?: {
                                                options?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    description?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    active_status?: number;
                                                }>;
                                            };
                                        };
                                        parent_id?: string;
                                        is_customized?: boolean;
                                        is_required?: boolean;
                                        active_status?: number;
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/hire/v1/talent_objects/query`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        v1: {
            /**
             * 投递
             */
            application: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/create document }
                 *
                 * 创建投递
                 *
                 * 根据人才 ID 和职位 ID 创建投递
                 */
                create: async (
                    payload?: {
                        data: {
                            talent_id: string;
                            job_id: string;
                            resume_source_id?: string;
                            application_preferred_city_code_list?: Array<string>;
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
                                data?: { id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/applications`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/get document }
                 *
                 * 获取投递信息
                 *
                 * 根据投递 ID 获取单个投递信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            options?: number;
                        };
                        path: { application_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    application?: {
                                        id?: string;
                                        job_id?: string;
                                        talent_id?: string;
                                        resume_source_id?: string;
                                        stage?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            type?: number;
                                        };
                                        active_status?: number;
                                        delivery_type?: number;
                                        resume_source_info?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            resume_source_type?: number;
                                        };
                                        website_resume_source?: {
                                            website_id?: string;
                                            website_name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            channel?: {
                                                channel_id?: string;
                                                channel_name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                        };
                                        talent_attachment_resume_id?: string;
                                        create_time?: string;
                                        modify_time?: string;
                                        stage_time_list?: Array<{
                                            stage_id?: string;
                                            enter_time?: string;
                                            exit_time?: string;
                                        }>;
                                        termination_type?: number;
                                        termination_reason_list?: Array<string>;
                                        termination_reason_note?: string;
                                        application_preferred_city_list?: Array<{
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        creator_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/applications/:application_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/list document }
                 *
                 * 获取投递列表
                 *
                 * 根据限定条件获取投递列表信息
                 */
                list: async (
                    payload?: {
                        params?: {
                            process_id?: string;
                            stage_id?: string;
                            talent_id?: string;
                            active_status?: string;
                            job_id?: string;
                            page_token?: string;
                            page_size?: number;
                            update_start_time?: string;
                            update_end_time?: string;
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
                                    items?: Array<string>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/applications`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=offer&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/offer document }
                 *
                 * 获取 Offer 信息
                 *
                 * 根据投递 ID 获取 Offer 信息
                 */
                offer: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                            job_family_id_type?:
                                | "people_admin_job_category_id"
                                | "job_family_id";
                            employee_type_id_type?:
                                | "people_admin_employee_type_id"
                                | "employee_type_enum_id";
                        };
                        path: { application_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    offer?: {
                                        id?: string;
                                        application_id?: string;
                                        basic_info?: {
                                            offer_type?: number;
                                            remark?: string;
                                            expire_time?: number;
                                            owner_user_id?: string;
                                            creator_user_id?: string;
                                            employee_type?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            create_time?: string;
                                            leader_user_id?: string;
                                            onboard_date?: string;
                                            department_id?: string;
                                            probation_month?: number;
                                            contract_year?: number;
                                            contract_period?: {
                                                period_type: number;
                                                period: number;
                                            };
                                            recruitment_type?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            sequence?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            level?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            onboard_address?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                                district?: {
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    code?: string;
                                                    location_type?: number;
                                                };
                                                city?: {
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    code?: string;
                                                    location_type?: number;
                                                };
                                                state?: {
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    code?: string;
                                                    location_type?: number;
                                                };
                                                country?: {
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    code?: string;
                                                    location_type?: number;
                                                };
                                            };
                                            work_address?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                                district?: {
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    code?: string;
                                                    location_type?: number;
                                                };
                                                city?: {
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    code?: string;
                                                    location_type?: number;
                                                };
                                                state?: {
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    code?: string;
                                                    location_type?: number;
                                                };
                                                country?: {
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    code?: string;
                                                    location_type?: number;
                                                };
                                            };
                                            customize_info_list?: Array<{
                                                object_id?: string;
                                                customize_value?: string;
                                            }>;
                                            work_location_address_info?: {
                                                location_info?: {
                                                    id?: string;
                                                    zh_name?: string;
                                                    en_name?: string;
                                                };
                                                address_info?: {
                                                    id?: string;
                                                    zh_name?: string;
                                                    en_name?: string;
                                                };
                                            };
                                        };
                                        salary_plan?: {
                                            currency?: string;
                                            basic_salary?: string;
                                            probation_salary_percentage?: string;
                                            award_salary_multiple?: string;
                                            option_shares?: string;
                                            quarterly_bonus?: string;
                                            half_year_bonus?: string;
                                            total_annual_cash?: string;
                                            customize_info_list?: Array<{
                                                object_id?: string;
                                                customize_value?: string;
                                            }>;
                                        };
                                        schema_id?: string;
                                        offer_status?: number;
                                        job_info?: {
                                            job_id?: string;
                                            job_name?: string;
                                        };
                                        customized_module_list?: Array<{
                                            ID?: string;
                                            object_list?: Array<{
                                                object_id?: string;
                                                customize_value?: string;
                                            }>;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/applications/:application_id/offer`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=terminate&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/terminate document }
                 *
                 * 终止投递
                 *
                 * 根据投递 ID 修改投递状态为「已终止」
                 */
                terminate: async (
                    payload?: {
                        data: {
                            termination_type: number;
                            termination_reason_list?: Array<string>;
                            termination_reason_note?: string;
                        };
                        path: { application_id: string };
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
                                `${this.domain}/open-apis/hire/v1/applications/:application_id/terminate`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application&apiName=transfer_onboard&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/application/transfer_onboard document }
                 *
                 * 操作候选人入职
                 *
                 * 根据投递 ID 操作候选人入职并创建员工。投递须处于「待入职」阶段，可通过「转移阶段」接口变更投递状态
                 */
                transferOnboard: async (
                    payload?: {
                        data?: {
                            actual_onboard_time?: number;
                            expected_conversion_time?: number;
                            job_requirement_id?: string;
                            operator_id?: string;
                            onboard_city_code?: string;
                            department?: string;
                            leader?: string;
                            sequence?: string;
                            level?: string;
                            employee_type?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id"
                                | "people_admin_department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                            job_family_id_type?:
                                | "people_admin_job_category_id"
                                | "job_family_id";
                            employee_type_id_type?:
                                | "people_admin_employee_type_id"
                                | "employee_type_enum_id";
                        };
                        path: { application_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    employee?: {
                                        id?: string;
                                        application_id?: string;
                                        onboard_status?: number;
                                        conversion_status?: number;
                                        onboard_time?: number;
                                        expected_conversion_time?: number;
                                        actual_conversion_time?: number;
                                        overboard_time?: number;
                                        overboard_note?: string;
                                        onboard_city_code?: string;
                                        department?: string;
                                        leader?: string;
                                        sequence?: string;
                                        level?: string;
                                        employee_type?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/applications/:application_id/transfer_onboard`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * application.interview
             */
            applicationInterview: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=application.interview&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=hire&resource=application.interview&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                        };
                        path: { application_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    page_token?: string;
                                    has_more?: boolean;
                                    items?: Array<{
                                        id?: string;
                                        begin_time?: number;
                                        end_time?: number;
                                        round?: number;
                                        stage_id?: string;
                                        interview_record_list?: Array<{
                                            id?: string;
                                            user_id?: string;
                                            content?: string;
                                            min_job_level_id?: string;
                                            max_job_level_id?: string;
                                            commit_status?: number;
                                            feedback_submit_time?: number;
                                            conclusion?: number;
                                            interview_score?: {
                                                id?: string;
                                                level?: number;
                                                zh_name?: string;
                                                zh_description?: string;
                                                en_name?: string;
                                                en_description?: string;
                                            };
                                            assessment_score?: {
                                                calculate_type: number;
                                                score: number;
                                                full_score?: number;
                                            };
                                            question_list?: Array<{
                                                id: string;
                                                title?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                description?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                content?: string;
                                                ability_list?: Array<{
                                                    id: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    description?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                            }>;
                                            code_question_list?: Array<{
                                                id: string;
                                                title?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                description?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                content?: string;
                                                ability_list?: Array<{
                                                    id: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    description?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                            }>;
                                            interviewer?: {
                                                id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            image_list?: Array<{
                                                id: string;
                                                url: string;
                                                name?: string;
                                                mime?: string;
                                                create_time?: string;
                                            }>;
                                            dimension_assessment_list?: Array<{
                                                id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                full_score?: number;
                                                content?: string;
                                                dimension_id?: string;
                                                dimension_score?: {
                                                    id?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    score_val?: number;
                                                };
                                                dimension_score_list?: Array<{
                                                    id?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    score_val?: number;
                                                }>;
                                                dimension_custom_score?: number;
                                                ability_list?: Array<{
                                                    id: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    description?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                question_list?: Array<{
                                                    id: string;
                                                    title?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    description?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    content?: string;
                                                    ability_list?: Array<{
                                                        id: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        description?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    }>;
                                                }>;
                                                dimension_type?: number;
                                            }>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/applications/:application_id/interviews`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 附件
             */
            attachment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=attachment&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/attachment/get document }
                 *
                 * 获取附件信息
                 *
                 * 获取招聘系统中附件的元信息，比如文件名、创建时间、文件url等
                 */
                get: async (
                    payload?: {
                        params?: { type?: number };
                        path: { attachment_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    attachment?: {
                                        id?: string;
                                        url?: string;
                                        name?: string;
                                        mime?: string;
                                        create_time?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/attachments/:attachment_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=attachment&apiName=preview&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/attachment/preview document }
                 *
                 * 获取附件预览信息
                 *
                 * 根据附件 ID 获取附件预览信息
                 */
                preview: async (
                    payload?: {
                        path: { attachment_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { url: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/attachments/:attachment_id/preview`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 生态对接账号自定义字段
             */
            ecoAccountCustomField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_account_custom_field&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/batch_delete document }
                 *
                 * 删除帐号自定义字段
                 *
                 * 删除用户在服务商处的身份标示字段（如用户在服务商处的租户 ID）。删除后，不影响已添加帐号对应的自定义字段的值。但在添加新帐号时，将不能再使用此自定义字段。删除不支持撤销，对应的 key 将无法再次复用。
                 */
                batchDelete: async (
                    payload?: {
                        data?: {
                            scope?: number;
                            custom_field_key_list?: Array<string>;
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
                                `${this.domain}/open-apis/hire/v1/eco_account_custom_fields/batch_delete`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_account_custom_field&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/batch_update document }
                 *
                 * 更新帐号自定义字段
                 *
                 * 更新用户在服务商处的身份标示字段（如用户在服务商处的租户 ID），此方法只会更新同一 scope 内 key 一致的自定义字段。
                 */
                batchUpdate: async (
                    payload?: {
                        data: {
                            scope: number;
                            custom_field_list: Array<{
                                key: string;
                                name: { zh_cn?: string; en_us?: string };
                                is_required: boolean;
                                description?: {
                                    zh_cn?: string;
                                    en_us?: string;
                                };
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/eco_account_custom_fields/batch_update`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_account_custom_field&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_account_custom_field/create document }
                 *
                 * 创建帐号自定义字段
                 *
                 * 定制用户在服务商处的身份标示字段（如用户在服务商处的租户 ID）。用户在飞书招聘后台添加帐号后，系统会推送「帐号绑定」事件给开发者，事件将携带用户填写的自定义字段信息，开发者可根据此信息识别飞书招聘用户在服务商处的身份信息，完成飞书招聘用户和服务商帐号的绑定，并以此来推送对应的套餐或试卷列表等。
                 */
                create: async (
                    payload?: {
                        data: {
                            scope: number;
                            custom_field_list: Array<{
                                key: string;
                                name: { zh_cn?: string; en_us?: string };
                                is_required: boolean;
                                description?: {
                                    zh_cn?: string;
                                    en_us?: string;
                                };
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/eco_account_custom_fields`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 背调订单
             */
            ecoBackgroundCheck: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check&apiName=cancel&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/cancel document }
                 *
                 * 终止背调订单
                 *
                 * 终止背调订单
                 */
                cancel: async (
                    payload?: {
                        data: { background_check_id: string };
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
                                `${this.domain}/open-apis/hire/v1/eco_background_checks/cancel`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check&apiName=update_progress&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/update_progress document }
                 *
                 * 更新背调进度
                 *
                 * 更新指定背调的进度信息
                 */
                updateProgress: async (
                    payload?: {
                        data: {
                            background_check_id: string;
                            stage_id: string;
                            stage_en_name?: string;
                            stage_name: string;
                            stage_time: string;
                            result?: string;
                            report_file_list?: Array<{
                                report_name: string;
                                report_url: string;
                                report_url_type?: number;
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/eco_background_checks/update_progress`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check&apiName=update_result&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check/update_result document }
                 *
                 * 回传背调的最终结果
                 *
                 * 回传背调的最终结果
                 */
                updateResult: async (
                    payload?: {
                        data: {
                            background_check_id: string;
                            result: string;
                            result_time: string;
                            report_file_list?: Array<{
                                report_name: string;
                                report_url: string;
                                report_url_type?: number;
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/eco_background_checks/update_result`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 背调自定义字段
             */
            ecoBackgroundCheckCustomField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check_custom_field&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/batch_delete document }
                 *
                 * 删除背调自定义字段
                 *
                 * 删除用户在发起背调时的自定义字段，删除不影响已创建的背调，删除后对应的自定义字段的 key 不能再复用。
                 */
                batchDelete: async (
                    payload?: {
                        data: { account_id: string };
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
                                `${this.domain}/open-apis/hire/v1/eco_background_check_custom_fields/batch_delete`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check_custom_field&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/batch_update document }
                 *
                 * 更新背调自定义字段
                 *
                 * 更新用户在发起背调时的自定义字段。更新操作不支持更新自定义字段类型，且将影响已发起的背调表单展示。
                 */
                batchUpdate: async (
                    payload?: {
                        data: {
                            account_id: string;
                            custom_field_list: Array<{
                                type:
                                    | "text"
                                    | "textarea"
                                    | "number"
                                    | "boolean"
                                    | "select"
                                    | "multiselect"
                                    | "date"
                                    | "file"
                                    | "resume";
                                key: string;
                                name: { zh_cn?: string; en_us?: string };
                                is_required: boolean;
                                description?: {
                                    zh_cn?: string;
                                    en_us?: string;
                                };
                                options?: Array<{
                                    key: string;
                                    name: { zh_cn?: string; en_us?: string };
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/eco_background_check_custom_fields/batch_update`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check_custom_field&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_custom_field/create document }
                 *
                 * 创建背调自定义字段
                 *
                 * 定制用户在发起背调时的自定义字段
                 */
                create: async (
                    payload?: {
                        data: {
                            account_id: string;
                            custom_field_list: Array<{
                                type:
                                    | "text"
                                    | "textarea"
                                    | "number"
                                    | "boolean"
                                    | "select"
                                    | "multiselect"
                                    | "date"
                                    | "file"
                                    | "resume";
                                key: string;
                                name: { zh_cn?: string; en_us?: string };
                                is_required: boolean;
                                description?: {
                                    zh_cn?: string;
                                    en_us?: string;
                                };
                                options?: Array<{
                                    key: string;
                                    name: { zh_cn?: string; en_us?: string };
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/eco_background_check_custom_fields`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 背调套餐和附加调查项
             */
            ecoBackgroundCheckPackage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check_package&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/batch_delete document }
                 *
                 * 删除背调套餐和附加调查项
                 *
                 * 删除指定帐号的指定背调套餐和附加调查项信息，删除不会影响已创建的背调。
                 */
                batchDelete: async (
                    payload?: {
                        data: {
                            account_id: string;
                            package_id_list?: Array<string>;
                            additional_item_id_list?: Array<string>;
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
                                `${this.domain}/open-apis/hire/v1/eco_background_check_packages/batch_delete`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check_package&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/batch_update document }
                 *
                 * 更新背调套餐和附加调查项
                 *
                 * 更新指定帐号可用的背调套餐和附加调查项信息，更新将影响已发起背调的表单项展示
                 */
                batchUpdate: async (
                    payload?: {
                        data: {
                            account_id: string;
                            package_list: Array<{
                                id: string;
                                name: string;
                                description?: string;
                            }>;
                            additional_item_list?: Array<{
                                id: string;
                                name: string;
                                description?: string;
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/eco_background_check_packages/batch_update`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_background_check_package&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/eco_background_check_package/create document }
                 *
                 * 推送背调套餐和附加调查项
                 *
                 * 定制指定帐号可用的背调套餐和附加调查项信息
                 */
                create: async (
                    payload?: {
                        data: {
                            account_id: string;
                            package_list: Array<{
                                id: string;
                                name: string;
                                description?: string;
                            }>;
                            additional_item_list?: Array<{
                                id: string;
                                name: string;
                                description?: string;
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/eco_background_check_packages`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * eco_exam
             */
            ecoExam: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_exam&apiName=login_info&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=login_info&project=hire&resource=eco_exam&version=v1 document }
                 */
                loginInfo: async (
                    payload?: {
                        data: {
                            result?: number;
                            msg?: string;
                            exam_login_info: {
                                exam_url: string;
                                username?: string;
                                password?: string;
                            };
                        };
                        path: { exam_id: string };
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
                                `${this.domain}/open-apis/hire/v1/eco_exams/:exam_id/login_info`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_exam&apiName=update_result&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_result&project=hire&resource=eco_exam&version=v1 document }
                 */
                updateResult: async (
                    payload?: {
                        data: {
                            result: string;
                            result_time?: string;
                            report_list?: Array<{
                                name: string;
                                url: string;
                                answer_time?: string;
                            }>;
                            detail_list?: Array<{
                                id?: string;
                                name: string;
                                result: string;
                            }>;
                        };
                        path: { exam_id: string };
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
                                `${this.domain}/open-apis/hire/v1/eco_exams/:exam_id/update_result`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * eco_exam_paper
             */
            ecoExamPaper: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_exam_paper&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=hire&resource=eco_exam_paper&version=v1 document }
                 */
                batchDelete: async (
                    payload?: {
                        data: {
                            account_id: string;
                            paper_id_list: Array<string>;
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
                                `${this.domain}/open-apis/hire/v1/eco_exam_papers/batch_delete`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_exam_paper&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=hire&resource=eco_exam_paper&version=v1 document }
                 */
                batchUpdate: async (
                    payload?: {
                        data: {
                            account_id: string;
                            paper_list: Array<{
                                id: string;
                                name: string;
                                duration?: number;
                                question_count?: number;
                                start_time?: string;
                                end_time?: string;
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/eco_exam_papers/batch_update`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=eco_exam_paper&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=hire&resource=eco_exam_paper&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            account_id: string;
                            paper_list: Array<{
                                id: string;
                                name: string;
                                duration?: number;
                                question_count?: number;
                                start_time?: string;
                                end_time?: string;
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/eco_exam_papers`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 导入 e-HR
             */
            ehrImportTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=ehr_import_task&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/ehr_import_task/patch document }
                 *
                 * 更新 e-HR 导入任务结果
                 *
                 * 在处理完导入 e-HR 事件后，可调用该接口，更新  e-HR 导入任务结果
                 */
                patch: async (
                    payload?: {
                        data: {
                            fail_reason?: string;
                            redirect_url?: string;
                            state: number;
                        };
                        path: { ehr_import_task_id: string };
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
                                `${this.domain}/open-apis/hire/v1/ehr_import_tasks/:ehr_import_task_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 入职
             */
            employee: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=employee&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/get document }
                 *
                 * 通过员工 ID 获取入职信息
                 *
                 * 通过员工 ID 获取入职信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id"
                                | "people_admin_department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                            job_family_id_type?:
                                | "people_admin_job_category_id"
                                | "job_family_id";
                            employee_type_id_type?:
                                | "people_admin_employee_type_id"
                                | "employee_type_enum_id";
                        };
                        path: { employee_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    employee?: {
                                        id?: string;
                                        application_id?: string;
                                        onboard_status?: number;
                                        conversion_status?: number;
                                        onboard_time?: number;
                                        expected_conversion_time?: number;
                                        actual_conversion_time?: number;
                                        overboard_time?: number;
                                        overboard_note?: string;
                                        onboard_city_code?: string;
                                        department?: string;
                                        leader?: string;
                                        sequence?: string;
                                        level?: string;
                                        employee_type?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/employees/:employee_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=employee&apiName=get_by_application&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/get_by_application document }
                 *
                 * 通过投递 ID 获取入职信息
                 *
                 * 通过投递 ID 获取入职信息
                 */
                getByApplication: async (
                    payload?: {
                        params: {
                            application_id: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id"
                                | "people_admin_department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                            job_family_id_type?:
                                | "people_admin_job_category_id"
                                | "job_family_id";
                            employee_type_id_type?:
                                | "people_admin_employee_type_id"
                                | "employee_type_enum_id";
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
                                    employee?: {
                                        id?: string;
                                        application_id?: string;
                                        onboard_status?: number;
                                        conversion_status?: number;
                                        onboard_time?: number;
                                        expected_conversion_time?: number;
                                        actual_conversion_time?: number;
                                        overboard_time?: number;
                                        overboard_note?: string;
                                        onboard_city_code?: string;
                                        department?: string;
                                        leader?: string;
                                        sequence?: string;
                                        level?: string;
                                        employee_type?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/employees/get_by_application`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=employee&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/employee/patch document }
                 *
                 * 更新入职状态
                 *
                 * 根据员工 ID 更新员工转正、离职状态
                 */
                patch: async (
                    payload?: {
                        data: {
                            operation: number;
                            conversion_info?: {
                                actual_conversion_time?: number;
                            };
                            overboard_info?: {
                                actual_overboard_time?: number;
                                overboard_note?: string;
                            };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id"
                                | "people_admin_department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                            job_family_id_type?:
                                | "people_admin_job_category_id"
                                | "job_family_id";
                            employee_type_id_type?:
                                | "people_admin_employee_type_id"
                                | "employee_type_enum_id";
                        };
                        path: { employee_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    employee?: {
                                        id?: string;
                                        application_id?: string;
                                        onboard_status?: number;
                                        conversion_status?: number;
                                        onboard_time?: number;
                                        expected_conversion_time?: number;
                                        actual_conversion_time?: number;
                                        overboard_time?: number;
                                        overboard_note?: string;
                                        onboard_city_code?: string;
                                        department?: string;
                                        leader?: string;
                                        sequence?: string;
                                        level?: string;
                                        employee_type?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/employees/:employee_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 评估（灰度租户可见）
             */
            evaluation: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_token?: string;
                            page_size?: number;
                            application_id?: string;
                            update_start_time?: string;
                            update_end_time?: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                    `${this.domain}/open-apis/hire/v1/evaluations`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        id?: string;
                                                        application_id?: string;
                                                        stage_id?: string;
                                                        creator_id?: string;
                                                        evaluator_id?: string;
                                                        commit_status?: number;
                                                        conclusion?: number;
                                                        content?: string;
                                                        create_time?: string;
                                                        update_time?: string;
                                                    }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=evaluation&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/evaluation/list document }
                 *
                 * 获取简历评估信息
                 *
                 * 获取简历评估信息
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_token?: string;
                            page_size?: number;
                            application_id?: string;
                            update_start_time?: string;
                            update_end_time?: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                        id?: string;
                                        application_id?: string;
                                        stage_id?: string;
                                        creator_id?: string;
                                        evaluator_id?: string;
                                        commit_status?: number;
                                        conclusion?: number;
                                        content?: string;
                                        create_time?: string;
                                        update_time?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/evaluations`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 导入外部系统信息（灰度租户可见）
             */
            externalApplication: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=external_application&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_application/create document }
                 *
                 * 创建外部投递
                 *
                 * 导入来自其他系统的投递信息，创建为外部投递
                 */
                create: async (
                    payload?: {
                        data: {
                            external_id?: string;
                            job_recruitment_type?: number;
                            job_title?: string;
                            resume_source?: string;
                            stage?: string;
                            talent_id: string;
                            termination_reason?: string;
                            delivery_type?: number;
                            modify_time?: number;
                            create_time?: number;
                            termination_type?: string;
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
                                    external_application?: {
                                        id?: string;
                                        external_id?: string;
                                        job_recruitment_type?: number;
                                        job_title?: string;
                                        resume_source?: string;
                                        stage?: string;
                                        talent_id: string;
                                        termination_reason?: string;
                                        delivery_type?: number;
                                        modify_time?: number;
                                        create_time?: number;
                                        termination_type?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/external_applications`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=external_application&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=hire&resource=external_application&version=v1 document }
                 *
                 * 删除外部投递
                 */
                delete: async (
                    payload?: {
                        params?: { talent_id?: string };
                        path?: { external_application_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    external_application?: {
                                        id?: string;
                                        external_id?: string;
                                        job_recruitment_type?: number;
                                        job_title?: string;
                                        resume_source?: string;
                                        stage?: string;
                                        talent_id: string;
                                        termination_reason?: string;
                                        delivery_type?: number;
                                        modify_time?: number;
                                        create_time?: number;
                                        termination_type?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/external_applications/:external_application_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=external_application&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=hire&resource=external_application&version=v1 document }
                 *
                 * 更新外部投递
                 */
                update: async (
                    payload?: {
                        data: {
                            external_id?: string;
                            job_recruitment_type?: number;
                            job_title?: string;
                            resume_source?: string;
                            stage?: string;
                            talent_id: string;
                            termination_reason?: string;
                            delivery_type?: number;
                            modify_time?: number;
                            create_time?: number;
                            termination_type?: string;
                        };
                        path?: { external_application_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    external_application?: {
                                        id?: string;
                                        external_id?: string;
                                        job_recruitment_type?: number;
                                        job_title?: string;
                                        resume_source?: string;
                                        stage?: string;
                                        talent_id: string;
                                        termination_reason?: string;
                                        delivery_type?: number;
                                        modify_time?: number;
                                        create_time?: number;
                                        termination_type?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/external_applications/:external_application_id`,
                                path
                            ),
                            method: "PUT",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 导入外部系统信息（灰度租户可见）
             */
            externalBackgroundCheck: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=external_background_check&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_background_check/create document }
                 *
                 * 创建外部背调
                 *
                 * 导入来自其他系统的背调信息，创建为外部背调
                 */
                create: async (
                    payload?: {
                        data: {
                            external_id?: string;
                            external_application_id: string;
                            date?: number;
                            name?: string;
                            result?: string;
                            attachment_id_list?: Array<string>;
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
                                    external_background_check?: {
                                        id?: string;
                                        external_id?: string;
                                        external_application_id: string;
                                        date?: number;
                                        name?: string;
                                        result?: string;
                                        attachment_id_list?: Array<string>;
                                        attachment_list?: Array<{
                                            id?: string;
                                            name?: string;
                                            size?: number;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/external_background_checks`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 导入外部系统信息（灰度租户可见）
             */
            externalInterview: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=external_interview&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview/create document }
                 *
                 * 创建外部面试
                 *
                 * 导入来自其他系统的面试信息，创建为外部面试
                 */
                create: async (
                    payload?: {
                        data: {
                            external_id?: string;
                            external_application_id: string;
                            participate_status?: number;
                            begin_time?: number;
                            end_time?: number;
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
                                    external_interview?: {
                                        external_id?: string;
                                        external_application_id: string;
                                        id?: string;
                                        participate_status?: number;
                                        begin_time?: number;
                                        end_time?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/external_interviews`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 导入外部系统信息（灰度租户可见）
             */
            externalInterviewAssessment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=external_interview_assessment&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/external_interview_assessment/create document }
                 *
                 * 创建外部面评
                 *
                 * 导入来自其他系统的面评信息，创建为外部面评
                 */
                create: async (
                    payload?: {
                        data: {
                            external_id?: string;
                            username?: string;
                            conclusion?: number;
                            assessment_dimension_list?: Array<{
                                score?: number;
                                option?: string;
                                options?: Array<string>;
                                content?: string;
                                assessment_type?: number;
                                title?: string;
                                description?: string;
                            }>;
                            content?: string;
                            external_interview_id: string;
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
                                    external_interview_assessment?: {
                                        id?: string;
                                        external_id?: string;
                                        username?: string;
                                        conclusion?: number;
                                        assessment_dimension_list?: Array<{
                                            score?: number;
                                            option?: string;
                                            options?: Array<string>;
                                            content?: string;
                                            assessment_type?: number;
                                            title?: string;
                                            description?: string;
                                        }>;
                                        content?: string;
                                        external_interview_id: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/external_interview_assessments`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 面试
             */
            interview: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=interview&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/interview/list document }
                 *
                 * 获取面试信息
                 *
                 * 根据投递 ID 或面试时间获取面试信息
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            application_id?: string;
                            interview_id?: string;
                            start_time?: string;
                            end_time?: string;
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
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
                                        id?: string;
                                        begin_time?: number;
                                        end_time?: number;
                                        round?: number;
                                        interview_record_list?: Array<{
                                            id?: string;
                                            user_id?: string;
                                            content?: string;
                                            min_job_level_id?: string;
                                            max_job_level_id?: string;
                                            commit_status?: number;
                                            conclusion?: number;
                                            interview_score?: {
                                                id?: string;
                                                level?: number;
                                                zh_name?: string;
                                                zh_description?: string;
                                                en_name?: string;
                                                en_description?: string;
                                            };
                                            assessment_score?: {
                                                calculate_type: number;
                                                score: number;
                                                full_score?: number;
                                            };
                                            question_list?: Array<{
                                                id: string;
                                                title?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                description?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                content?: string;
                                                ability_list?: Array<{
                                                    id: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    description?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                            }>;
                                            code_question_list?: Array<{
                                                id: string;
                                                title?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                description?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                content?: string;
                                                ability_list?: Array<{
                                                    id: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    description?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                            }>;
                                            interviewer?: {
                                                id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            image_list?: Array<{
                                                id: string;
                                                url: string;
                                                name?: string;
                                                mime?: string;
                                                create_time?: string;
                                            }>;
                                            dimension_assessment_list?: Array<{
                                                id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                full_score?: number;
                                                content?: string;
                                                dimension_id?: string;
                                                dimension_score?: {
                                                    id?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    score_val?: number;
                                                };
                                                dimension_score_list?: Array<{
                                                    id?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    score_val?: number;
                                                }>;
                                                dimension_custom_score?: number;
                                                ability_list?: Array<{
                                                    id: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    description?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                question_list?: Array<{
                                                    id: string;
                                                    title?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    description?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    content?: string;
                                                    ability_list?: Array<{
                                                        id: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        description?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    }>;
                                                }>;
                                                dimension_type?: number;
                                            }>;
                                        }>;
                                        feedback_submit_time?: number;
                                        stage_id?: string;
                                        application_id?: string;
                                        stage?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        creator?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        biz_create_time?: number;
                                        biz_modify_time?: number;
                                        interview_round_summary?: number;
                                        interview_arrangement_id?: string;
                                        interview_type?: number;
                                        talent_time_zone?: {
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        contact_user?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        contact_mobile?: string;
                                        remark?: string;
                                        address?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            district?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            city?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            state?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            country?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                        };
                                        video_type?: number;
                                        arrangement_status?: number;
                                        arrangement_type?: number;
                                        arrangement_appointment_kind?: number;
                                        meeting_room_list?: Array<{
                                            room_id?: string;
                                            room_name?: string;
                                            building_name?: string;
                                            reserved_status?: number;
                                            floor_name?: string;
                                        }>;
                                        interview_round_type?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/interviews`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 职位
             */
            job: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job&apiName=combined_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/combined_create document }
                 *
                 * 新建职位
                 *
                 * 新建职位，字段的是否必填，以系统中的「职位字段管理」中的设置为准。
                 */
                combinedCreate: async (
                    payload?: {
                        data: {
                            code?: string;
                            experience?: number;
                            expiry_time?: number;
                            customized_data_list?: Array<{
                                object_id?: string;
                                value?: string;
                            }>;
                            min_level_id?: string;
                            min_salary?: number;
                            title: string;
                            job_managers: {
                                id?: string;
                                recruiter_id: string;
                                hiring_manager_id_list: Array<string>;
                                assistant_id_list?: Array<string>;
                            };
                            job_process_id: string;
                            process_type: number;
                            subject_id?: string;
                            job_function_id?: string;
                            department_id: string;
                            head_count?: number;
                            is_never_expired: boolean;
                            max_salary?: number;
                            requirement?: string;
                            address_id?: string;
                            description?: string;
                            highlight_list?: Array<string>;
                            job_type_id: string;
                            max_level_id?: string;
                            recruitment_type_id: string;
                            required_degree?: number;
                            job_category_id?: string;
                            address_id_list?: Array<string>;
                            job_attribute?: number;
                            expiry_timestamp?: string;
                            interview_registration_schema_id?: string;
                            onboard_registration_schema_id?: string;
                            target_major_id_list?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                            job_family_id_type?:
                                | "people_admin_job_category_id"
                                | "job_family_id";
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
                                    default_job_post?: { id?: string };
                                    job?: {
                                        id?: string;
                                        title?: string;
                                        description?: string;
                                        code?: string;
                                        requirement?: string;
                                        recruitment_type?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            active_status?: number;
                                        };
                                        department?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        city?: {
                                            city_code?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        min_job_level?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            active_status?: number;
                                        };
                                        max_job_level?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            active_status?: number;
                                        };
                                        highlight_list?: Array<{
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        }>;
                                        job_category?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            active_status?: number;
                                        };
                                        job_type?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        active_status?: number;
                                        create_user_id?: string;
                                        create_time?: number;
                                        update_time?: number;
                                        process_type?: number;
                                        process_id?: string;
                                        process_name?: string;
                                        process_en_name?: string;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                            };
                                        }>;
                                        job_function?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        subject?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        head_count?: number;
                                        experience?: number;
                                        expiry_time?: number;
                                        min_salary?: number;
                                        max_salary?: number;
                                        required_degree?: number;
                                        city_list?: Array<{
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        job_attribute?: number;
                                        create_timestamp?: string;
                                        update_timestamp?: string;
                                        expiry_timestamp?: string;
                                        target_major_list?: Array<{
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        }>;
                                    };
                                    job_manager?: {
                                        id?: string;
                                        recruiter_id: string;
                                        hiring_manager_id_list: Array<string>;
                                        assistant_id_list?: Array<string>;
                                    };
                                    interview_registration_schema_info?: {
                                        schema_id?: string;
                                        name?: string;
                                    };
                                    onboard_registration_schema_info?: {
                                        schema_id?: string;
                                        name?: string;
                                    };
                                    target_major_list?: Array<{
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/jobs/combined_create`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job&apiName=combined_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/combined_update document }
                 *
                 * 更新职位
                 *
                 * 更新职位信息，该接口为全量更新，若字段没有返回值，则原有值将会被清空。字段的是否必填，将以系统中的「职位字段管理」中的设置为准。
                 */
                combinedUpdate: async (
                    payload?: {
                        data: {
                            id?: string;
                            experience?: number;
                            expiry_time?: number;
                            customized_data_list?: Array<{
                                object_id?: string;
                                value?: string;
                            }>;
                            min_level_id?: string;
                            min_salary?: number;
                            title?: string;
                            job_managers?: {
                                id?: string;
                                recruiter_id: string;
                                hiring_manager_id_list: Array<string>;
                                assistant_id_list?: Array<string>;
                            };
                            job_process_id?: string;
                            subject_id?: string;
                            job_function_id?: string;
                            department_id?: string;
                            head_count?: number;
                            is_never_expired: boolean;
                            max_salary?: number;
                            requirement?: string;
                            address_id?: string;
                            description?: string;
                            highlight_list?: Array<string>;
                            job_type_id: string;
                            max_level_id?: string;
                            required_degree?: number;
                            job_category_id?: string;
                            address_id_list?: Array<string>;
                            job_attribute?: number;
                            expiry_timestamp?: string;
                            target_major_id_list?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                            job_family_id_type?:
                                | "people_admin_job_category_id"
                                | "job_family_id";
                        };
                        path: { job_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    default_job_post?: { id?: string };
                                    job?: {
                                        id?: string;
                                        title?: string;
                                        description?: string;
                                        code?: string;
                                        requirement?: string;
                                        recruitment_type?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            active_status?: number;
                                        };
                                        department?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        city?: {
                                            city_code?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        min_job_level?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            active_status?: number;
                                        };
                                        max_job_level?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            active_status?: number;
                                        };
                                        highlight_list?: Array<{
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        }>;
                                        job_category?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            active_status?: number;
                                        };
                                        job_type?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        active_status?: number;
                                        create_user_id?: string;
                                        create_time?: number;
                                        update_time?: number;
                                        process_type?: number;
                                        process_id?: string;
                                        process_name?: string;
                                        process_en_name?: string;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                            };
                                        }>;
                                        job_function?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        subject?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        head_count?: number;
                                        experience?: number;
                                        expiry_time?: number;
                                        min_salary?: number;
                                        max_salary?: number;
                                        required_degree?: number;
                                        city_list?: Array<{
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        job_attribute?: number;
                                        create_timestamp?: string;
                                        update_timestamp?: string;
                                        expiry_timestamp?: string;
                                        target_major_list?: Array<{
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        }>;
                                    };
                                    job_manager?: {
                                        id?: string;
                                        recruiter_id: string;
                                        hiring_manager_id_list: Array<string>;
                                        assistant_id_list?: Array<string>;
                                    };
                                    interview_registration_schema_info?: {
                                        schema_id?: string;
                                        name?: string;
                                    };
                                    onboard_registration_schema_info?: {
                                        schema_id?: string;
                                        name?: string;
                                    };
                                    target_major_list?: Array<{
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/jobs/:job_id/combined_update`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job&apiName=config&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/config document }
                 *
                 * 获取职位设置
                 *
                 * 获取职位设置
                 */
                config: async (
                    payload?: {
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                        };
                        path: { job_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    job_config?: {
                                        offer_apply_schema?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        offer_process_conf?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        recommended_evaluator_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        assessment_template?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        id?: string;
                                        interview_round_list?: Array<{
                                            interviewer_list?: Array<{
                                                id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            }>;
                                            round?: number;
                                        }>;
                                        job_requirement_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        interview_registration?: {
                                            schema_id?: string;
                                            name?: string;
                                        };
                                        onboard_registration?: {
                                            schema_id?: string;
                                            name?: string;
                                        };
                                        interview_round_type_list?: Array<{
                                            assessment_round?: {
                                                id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            assessment_template?: {
                                                id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                        }>;
                                        related_job_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        job_attribute?: number;
                                        interview_appointment_config?: {
                                            enable_interview_appointment_by_interviewer?: boolean;
                                            config?: {
                                                interview_type?: number;
                                                talent_timezone_code?: string;
                                                contact_user_id?: string;
                                                contact_mobile?: string;
                                                contact_email?: string;
                                                address_id?: string;
                                                video_type?: number;
                                                cc?: Array<string>;
                                                remark?: string;
                                                interview_notification_template_id?: string;
                                                appointment_notification_template_id?: string;
                                                cancel_interview_notification_template_id?: string;
                                            };
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/jobs/:job_id/config`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/get document }
                 *
                 * 获取职位信息
                 *
                 * 根据职位 ID 获取职位信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                            job_family_id_type?:
                                | "people_admin_job_category_id"
                                | "job_family_id";
                        };
                        path: { job_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    job?: {
                                        id?: string;
                                        title?: string;
                                        description?: string;
                                        code?: string;
                                        requirement?: string;
                                        recruitment_type?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            active_status?: number;
                                        };
                                        department?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        city?: {
                                            city_code?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        min_job_level?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            active_status?: number;
                                        };
                                        max_job_level?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            active_status?: number;
                                        };
                                        highlight_list?: Array<{
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        }>;
                                        job_category?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            active_status?: number;
                                        };
                                        job_type?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        active_status?: number;
                                        create_user_id?: string;
                                        create_time?: number;
                                        update_time?: number;
                                        process_type?: number;
                                        process_id?: string;
                                        process_name?: string;
                                        process_en_name?: string;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                            };
                                        }>;
                                        job_function?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        subject?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        head_count?: number;
                                        experience?: number;
                                        expiry_time?: number;
                                        min_salary?: number;
                                        max_salary?: number;
                                        required_degree?: number;
                                        city_list?: Array<{
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        job_attribute?: number;
                                        create_timestamp?: string;
                                        update_timestamp?: string;
                                        expiry_timestamp?: string;
                                        target_major_list?: Array<{
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/jobs/:job_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/list document }
                 *
                 * 获取职位列表
                 *
                 * 根据更新时间获取职位列表，仅支持获取默认字段信息，获取详细信息可调用[获取职位详细](https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/get)接口
                 */
                list: async (
                    payload?: {
                        params?: {
                            update_start_time?: string;
                            update_end_time?: string;
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                            job_family_id_type?:
                                | "people_admin_job_category_id"
                                | "job_family_id";
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
                                        id?: string;
                                        title?: string;
                                        description?: string;
                                        code?: string;
                                        requirement?: string;
                                        recruitment_type?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            active_status?: number;
                                        };
                                        department?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        city?: {
                                            city_code?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        min_job_level?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            active_status?: number;
                                        };
                                        max_job_level?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            active_status?: number;
                                        };
                                        highlight_list?: Array<{
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        }>;
                                        job_category?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            active_status?: number;
                                        };
                                        job_type?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        active_status?: number;
                                        create_user_id?: string;
                                        create_time?: number;
                                        update_time?: number;
                                        process_type?: number;
                                        process_id?: string;
                                        process_name?: string;
                                        process_en_name?: string;
                                        job_function?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        subject?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        head_count?: number;
                                        experience?: number;
                                        expiry_time?: number;
                                        min_salary?: number;
                                        max_salary?: number;
                                        required_degree?: number;
                                        city_list?: Array<{
                                            code?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        job_attribute?: number;
                                        create_timestamp?: string;
                                        update_timestamp?: string;
                                        expiry_timestamp?: string;
                                        target_major_list?: Array<{
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/jobs`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job&apiName=recruiter&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=recruiter&project=hire&resource=job&version=v1 document }
                 */
                recruiter: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { job_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    info?: {
                                        id?: string;
                                        recruiter_id?: string;
                                        hiring_manager_id_list?: Array<string>;
                                        assistant_id_list?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/jobs/:job_id/recruiter`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job&apiName=update_config&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job/update_config document }
                 *
                 * 更新职位设置
                 *
                 * 更新职位设置，包括面试评价表、Offer 申请表等。接口将按照所选择的「更新选项」进行设置参数校验和更新。
                 */
                updateConfig: async (
                    payload?: {
                        data: {
                            offer_apply_schema_id?: string;
                            offer_process_conf?: string;
                            recommended_evaluator_id_list?: Array<string>;
                            update_option_list: Array<number>;
                            assessment_template_biz_id?: string;
                            interview_round_conf_list?: Array<{
                                interviewer_id_list?: Array<string>;
                                round?: number;
                            }>;
                            jr_id_list?: Array<string>;
                            interview_registration_schema_id?: string;
                            onboard_registration_schema_id?: string;
                            interview_round_type_conf_list?: Array<{
                                round_biz_id?: string;
                                assessment_template_biz_id?: string;
                            }>;
                            related_job_id_list?: Array<string>;
                            interview_appointment_config?: {
                                enable_interview_appointment_by_interviewer?: boolean;
                                config?: {
                                    interview_type?: number;
                                    talent_timezone_code?: string;
                                    contact_user_id?: string;
                                    contact_mobile?: string;
                                    contact_email?: string;
                                    address_id?: string;
                                    video_type?: number;
                                    cc?: Array<string>;
                                    remark?: string;
                                    interview_notification_template_id?: string;
                                    appointment_notification_template_id?: string;
                                    cancel_interview_notification_template_id?: string;
                                };
                            };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { job_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    job_config?: {
                                        offer_apply_schema?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        offer_process_conf?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        recommended_evaluator_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        assessment_template?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        id?: string;
                                        interview_round_list?: Array<{
                                            interviewer_list?: Array<{
                                                id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            }>;
                                            round?: number;
                                        }>;
                                        job_requirement_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        interview_registration?: {
                                            schema_id?: string;
                                            name?: string;
                                        };
                                        onboard_registration?: {
                                            schema_id?: string;
                                            name?: string;
                                        };
                                        interview_round_type_list?: Array<{
                                            assessment_round?: {
                                                id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            assessment_template?: {
                                                id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                        }>;
                                        related_job_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        job_attribute?: number;
                                        interview_appointment_config?: {
                                            enable_interview_appointment_by_interviewer?: boolean;
                                            config?: {
                                                interview_type?: number;
                                                talent_timezone_code?: string;
                                                contact_user_id?: string;
                                                contact_mobile?: string;
                                                contact_email?: string;
                                                address_id?: string;
                                                video_type?: number;
                                                cc?: Array<string>;
                                                remark?: string;
                                                interview_notification_template_id?: string;
                                                appointment_notification_template_id?: string;
                                                cancel_interview_notification_template_id?: string;
                                            };
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/jobs/:job_id/update_config`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * job.manager
             */
            jobManager: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job.manager&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job-manager/get document }
                 *
                 * 获取职位上的招聘人员信息
                 *
                 * 根据职位 ID 获取职位上的招聘人员信息，如招聘负责人、用人经理
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                        };
                        path: { job_id: string; manager_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    info?: {
                                        id?: string;
                                        recruiter_id: string;
                                        hiring_manager_id_list: Array<string>;
                                        assistant_id_list?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/jobs/:job_id/managers/:manager_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 流程
             */
            jobProcess: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_process&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_process/list document }
                 *
                 * 获取招聘流程信息
                 *
                 * 获取全部招聘流程信息
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        type?: number;
                                        stage_list?: Array<{
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                            type?: number;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/job_processes`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 招聘需求（灰度租户可见）
             */
            jobRequirement: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_requirement&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/create document }
                 *
                 * 创建招聘需求
                 *
                 * 创建招聘需求，除招聘需求编号为必填外，其他字段是否必填与飞书招聘「招聘需求字段管理」内设置一致
                 */
                create: async (
                    payload?: {
                        data: {
                            short_code: string;
                            name: string;
                            display_progress: number;
                            head_count: number;
                            recruitment_type_id?: string;
                            employee_type_id?: string;
                            max_level_id?: string;
                            min_level_id?: string;
                            sequence_id?: string;
                            category?: number;
                            department_id?: string;
                            recruiter_id_list?: Array<string>;
                            jr_hiring_manager_id_list?: Array<string>;
                            direct_leader_id_list?: Array<string>;
                            start_time?: string;
                            deadline?: string;
                            priority?: number;
                            required_degree?: number;
                            max_salary?: string;
                            min_salary?: string;
                            address_id?: string;
                            description?: string;
                            customized_data_list?: Array<{
                                object_id?: string;
                                value?: string;
                            }>;
                            process_type?: number;
                            job_type_id?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                            job_family_id_type?:
                                | "people_admin_job_category_id"
                                | "job_family_id";
                            employee_type_id_type?:
                                | "people_admin_employee_type_id"
                                | "employee_type_enum_id";
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
                                    job_requirement?: {
                                        id?: string;
                                        short_code?: string;
                                        name?: string;
                                        display_progress?: number;
                                        head_count?: number;
                                        recruitment_type?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        employee_type?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        max_level?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        min_level?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        sequence?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        category?: number;
                                        department?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        recruiter_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        jr_hiring_managers?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        direct_leader_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        start_time?: string;
                                        deadline?: string;
                                        priority?: number;
                                        required_degree?: number;
                                        max_salary?: string;
                                        min_salary?: string;
                                        address?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        description?: string;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                            };
                                        }>;
                                        job_id_list?: Array<string>;
                                        process_type?: number;
                                        job_type?: {
                                            id: string;
                                            name: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            parent_id?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/job_requirements`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_requirement&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/delete document }
                 *
                 * 删除招聘需求
                 *
                 * 删除招聘需求
                 */
                delete: async (
                    payload?: {
                        path: { job_requirement_id: string };
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
                                `${this.domain}/open-apis/hire/v1/job_requirements/:job_requirement_id`,
                                path
                            ),
                            method: "DELETE",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_requirement&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/list document }
                 *
                 * 获取招聘需求列表
                 *
                 * 获取招聘需求列表
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_token?: string;
                            page_size?: number;
                            job_id?: string;
                            create_time_begin?: string;
                            create_time_end?: string;
                            update_time_begin?: string;
                            update_time_end?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                            job_family_id_type?:
                                | "people_admin_job_category_id"
                                | "job_family_id";
                            employee_type_id_type?:
                                | "people_admin_employee_type_id"
                                | "employee_type_enum_id";
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
                                        id?: string;
                                        short_code?: string;
                                        name?: string;
                                        display_progress?: number;
                                        head_count?: number;
                                        recruitment_type?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        employee_type?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        max_level?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        min_level?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        sequence?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        category?: number;
                                        department?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        recruiter_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        jr_hiring_managers?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        direct_leader_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        start_time?: string;
                                        deadline?: string;
                                        priority?: number;
                                        required_degree?: number;
                                        max_salary?: string;
                                        min_salary?: string;
                                        address?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        description?: string;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                            };
                                        }>;
                                        job_id_list?: Array<string>;
                                        process_type?: number;
                                        job_type?: {
                                            id: string;
                                            name: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            parent_id?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/job_requirements`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_requirement&apiName=list_by_id&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_by_id&project=hire&resource=job_requirement&version=v1 document }
                 *
                 * 获取招聘需求信息
                 */
                listById: async (
                    payload?: {
                        data?: { id_list?: Array<string> };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                            job_family_id_type?:
                                | "people_admin_job_category_id"
                                | "job_family_id";
                            employee_type_id_type?:
                                | "people_admin_employee_type_id"
                                | "employee_type_enum_id";
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
                                        id?: string;
                                        short_code?: string;
                                        name?: string;
                                        display_progress?: number;
                                        head_count?: number;
                                        recruitment_type?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        employee_type?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        max_level?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        min_level?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        sequence?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        category?: number;
                                        department?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        recruiter_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        jr_hiring_managers?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        direct_leader_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        start_time?: string;
                                        deadline?: string;
                                        priority?: number;
                                        required_degree?: number;
                                        max_salary?: string;
                                        min_salary?: string;
                                        address?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        description?: string;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                            };
                                        }>;
                                        job_id_list?: Array<string>;
                                        process_type?: number;
                                        job_type?: {
                                            id: string;
                                            name: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            parent_id?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/job_requirements/search`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_requirement&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement/update document }
                 *
                 * 更新招聘需求
                 *
                 * 更新招聘需求
                 */
                update: async (
                    payload?: {
                        data: {
                            name: string;
                            display_progress: number;
                            head_count: number;
                            recruitment_type_id?: string;
                            employee_type_id?: string;
                            max_level_id?: string;
                            min_level_id?: string;
                            sequence_id?: string;
                            category?: number;
                            department_id?: string;
                            recruiter_id_list?: Array<string>;
                            jr_hiring_manager_id_list?: Array<string>;
                            direct_leader_id_list?: Array<string>;
                            start_time?: string;
                            deadline?: string;
                            priority?: number;
                            required_degree?: number;
                            max_salary?: string;
                            min_salary?: string;
                            address_id?: string;
                            description?: string;
                            customized_data_list?: Array<{
                                object_id?: string;
                                value?: string;
                            }>;
                            process_type?: number;
                            job_type_id?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                            job_family_id_type?:
                                | "people_admin_job_category_id"
                                | "job_family_id";
                            employee_type_id_type?:
                                | "people_admin_employee_type_id"
                                | "employee_type_enum_id";
                        };
                        path: { job_requirement_id: string };
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
                                `${this.domain}/open-apis/hire/v1/job_requirements/:job_requirement_id`,
                                path
                            ),
                            method: "PUT",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * job_requirement_schema
             */
            jobRequirementSchema: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_requirement_schema&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/job_requirement_schema/list document }
                 *
                 * 获取招聘需求模板
                 *
                 * 获取招聘需求模板
                 */
                list: async (
                    payload?: {
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
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        object_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            description?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            setting?: {
                                                object_type?: number;
                                                config?: {
                                                    options?: Array<{
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        description?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        active_status?: number;
                                                    }>;
                                                };
                                            };
                                            is_customized?: boolean;
                                            is_required?: boolean;
                                            active_status?: number;
                                            children_list?: Array<{
                                                id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                description?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                setting?: {
                                                    object_type?: number;
                                                    config?: {
                                                        options?: Array<{
                                                            key?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            description?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            active_status?: number;
                                                        }>;
                                                    };
                                                };
                                                parent_id?: string;
                                                is_customized?: boolean;
                                                is_required?: boolean;
                                                active_status?: number;
                                            }>;
                                        }>;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/job_requirement_schemas`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * job_type
             */
            jobType: {
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
                                    `${this.domain}/open-apis/hire/v1/job_types`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
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
                                                        id: string;
                                                        name: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        parent_id?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=job_type&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=hire&resource=job_type&version=v1 document }
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
                                        id: string;
                                        name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        parent_id?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/job_types`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 备注
             */
            note: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=note&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/create document }
                 *
                 * 创建备注
                 *
                 * 创建备注信息
                 */
                create: async (
                    payload?: {
                        data: {
                            talent_id: string;
                            application_id?: string;
                            creator_id?: string;
                            content: string;
                            privacy?: number;
                        };
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                    note?: {
                                        id?: string;
                                        talent_id: string;
                                        application_id?: string;
                                        is_private?: boolean;
                                        create_time?: number;
                                        modify_time?: number;
                                        creator_id?: string;
                                        content: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/notes`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=note&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/get document }
                 *
                 * 获取备注
                 *
                 * 根据备注 ID 获取备注信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                        id?: string;
                                        talent_id: string;
                                        application_id?: string;
                                        is_private?: boolean;
                                        create_time?: number;
                                        modify_time?: number;
                                        creator_id?: string;
                                        content: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/notes/:note_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=note&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/list document }
                 *
                 * 获取备注列表
                 *
                 * 获取备注列表
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            talent_id: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                        id?: string;
                                        talent_id: string;
                                        application_id?: string;
                                        is_private?: boolean;
                                        create_time?: number;
                                        modify_time?: number;
                                        creator_id?: string;
                                        content: string;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/notes`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=note&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/note/patch document }
                 *
                 * 更新备注
                 *
                 * 根据备注 ID 更新备注信息
                 */
                patch: async (
                    payload?: {
                        data: { content: string };
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                        id?: string;
                                        talent_id: string;
                                        application_id?: string;
                                        is_private?: boolean;
                                        create_time?: number;
                                        modify_time?: number;
                                        creator_id?: string;
                                        content: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/notes/:note_id`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * Offer
             */
            offer: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=offer&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/create document }
                 *
                 * 创建 Offer
                 *
                 * 创建 Offer 时，需传入本文档中标注为必传的参数，其余参数是否必传参考「获取 Offer 申请表模板信息」的参数定义
                 */
                create: async (
                    payload?: {
                        data: {
                            application_id: string;
                            schema_id: string;
                            offer_type?: number;
                            basic_info: {
                                department_id: string;
                                leader_user_id: string;
                                employment_job_id?: string;
                                employee_type_id?: string;
                                job_family_id?: string;
                                job_level_id?: string;
                                probation_month?: number;
                                contract_year?: number;
                                contract_period?: {
                                    period_type: number;
                                    period: number;
                                };
                                expected_onboard_date?: string;
                                onboard_address_id?: string;
                                work_address_id?: string;
                                owner_user_id: string;
                                recommended_words?: string;
                                job_requirement_id?: string;
                                job_process_type_id?: number;
                                attachment_id_list?: Array<string>;
                                attachment_description?: string;
                                operator_user_id: string;
                            };
                            salary_info?: {
                                currency: string;
                                basic_salary?: string;
                                probation_salary_percentage?: string;
                                award_salary_multiple?: string;
                                option_shares?: string;
                                quarterly_bonus?: string;
                                half_year_bonus?: string;
                            };
                            customized_info_list?: Array<{
                                id?: string;
                                value?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                            job_family_id_type?:
                                | "people_admin_job_category_id"
                                | "job_family_id";
                            employee_type_id_type?:
                                | "people_admin_employee_type_id"
                                | "employee_type_enum_id";
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
                                    offer_id?: string;
                                    application_id?: string;
                                    schema_id?: string;
                                    offer_type?: number;
                                    basic_info?: {
                                        department_id?: string;
                                        leader_user_id?: string;
                                        employment_job_id?: string;
                                        employee_type_id?: string;
                                        job_family_id?: string;
                                        job_level_id?: string;
                                        probation_month?: number;
                                        contract_year?: number;
                                        contract_period?: {
                                            period_type: number;
                                            period: number;
                                        };
                                        expected_onboard_date?: string;
                                        onboard_address_id?: string;
                                        work_address_id?: string;
                                        owner_user_id?: string;
                                        recommended_words?: string;
                                        job_requirement_id?: string;
                                        job_process_type_id?: number;
                                        attachment_id_list?: Array<string>;
                                        attachment_description?: string;
                                        operator_user_id: string;
                                    };
                                    salary_info?: {
                                        currency: string;
                                        basic_salary?: string;
                                        probation_salary_percentage?: string;
                                        award_salary_multiple?: string;
                                        option_shares?: string;
                                        quarterly_bonus?: string;
                                        half_year_bonus?: string;
                                    };
                                    customized_info_list?: Array<{
                                        id?: string;
                                        value?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/offers`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=offer&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/get document }
                 *
                 * 获取 Offer 详情
                 *
                 * 根据 Offer ID 获取 Offer 详细信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                            job_family_id_type?:
                                | "people_admin_job_category_id"
                                | "job_family_id";
                            employee_type_id_type?:
                                | "people_admin_employee_type_id"
                                | "employee_type_enum_id";
                        };
                        path?: { offer_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    offer?: {
                                        id?: string;
                                        application_id?: string;
                                        basic_info?: {
                                            offer_type?: number;
                                            remark?: string;
                                            expire_time?: number;
                                            owner_user_id?: string;
                                            creator_user_id?: string;
                                            employee_type?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            create_time?: string;
                                            leader_user_id?: string;
                                            onboard_date?: string;
                                            department_id?: string;
                                            probation_month?: number;
                                            contract_year?: number;
                                            contract_period?: {
                                                period_type: number;
                                                period: number;
                                            };
                                            recruitment_type?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            sequence?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            level?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            onboard_address?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                                district?: {
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    code?: string;
                                                    location_type?: number;
                                                };
                                                city?: {
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    code?: string;
                                                    location_type?: number;
                                                };
                                                state?: {
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    code?: string;
                                                    location_type?: number;
                                                };
                                                country?: {
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    code?: string;
                                                    location_type?: number;
                                                };
                                            };
                                            work_address?: {
                                                id?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                                district?: {
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    code?: string;
                                                    location_type?: number;
                                                };
                                                city?: {
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    code?: string;
                                                    location_type?: number;
                                                };
                                                state?: {
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    code?: string;
                                                    location_type?: number;
                                                };
                                                country?: {
                                                    zh_name?: string;
                                                    en_name?: string;
                                                    code?: string;
                                                    location_type?: number;
                                                };
                                            };
                                            customize_info_list?: Array<{
                                                object_id?: string;
                                                customize_value?: string;
                                            }>;
                                            work_location_address_info?: {
                                                location_info?: {
                                                    id?: string;
                                                    zh_name?: string;
                                                    en_name?: string;
                                                };
                                                address_info?: {
                                                    id?: string;
                                                    zh_name?: string;
                                                    en_name?: string;
                                                };
                                            };
                                        };
                                        salary_plan?: {
                                            currency?: string;
                                            basic_salary?: string;
                                            probation_salary_percentage?: string;
                                            award_salary_multiple?: string;
                                            option_shares?: string;
                                            quarterly_bonus?: string;
                                            half_year_bonus?: string;
                                            total_annual_cash?: string;
                                            customize_info_list?: Array<{
                                                object_id?: string;
                                                customize_value?: string;
                                            }>;
                                        };
                                        schema_id?: string;
                                        offer_status?: number;
                                        offer_type?: number;
                                        job_info?: {
                                            job_id?: string;
                                            job_name?: string;
                                        };
                                        customized_module_list?: Array<{
                                            ID?: string;
                                            object_list?: Array<{
                                                object_id?: string;
                                                customize_value?: string;
                                            }>;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/offers/:offer_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=offer&apiName=intern_offer_status&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/intern_offer_status document }
                 *
                 * 更新实习 Offer 入/离职状态
                 *
                 * 对「实习待入职」状态的实习 Offer 确认入职、放弃入职，或对「实习已入职」状态的实习 Offer 操作离职
                 */
                internOfferStatus: async (
                    payload?: {
                        data: {
                            operation:
                                | "confirm_onboarding"
                                | "cancel_onboarding"
                                | "offboard";
                            onboarding_info?: {
                                actual_onboarding_date: string;
                            };
                            offboarding_info?: {
                                actual_offboarding_date: string;
                                notes?: string;
                            };
                        };
                        path?: { offer_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    offer_id?: string;
                                    operation:
                                        | "confirm_onboarding"
                                        | "cancel_onboarding"
                                        | "offboard";
                                    onboarding_info?: {
                                        actual_onboarding_date: string;
                                    };
                                    offboarding_info?: {
                                        actual_offboarding_date: string;
                                        notes?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/offers/:offer_id/intern_offer_status`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=offer&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/list document }
                 *
                 * 获取 Offer 列表
                 *
                 * 根据人才 ID 获取 Offer 列表
                 */
                list: async (
                    payload?: {
                        params: {
                            page_token?: string;
                            page_size?: number;
                            talent_id: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            employee_type_id_type?:
                                | "people_admin_employee_type_id"
                                | "employee_type_enum_id";
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
                                        id?: string;
                                        job_info?: {
                                            job_id?: string;
                                            job_name?: string;
                                        };
                                        create_time?: string;
                                        offer_status?: number;
                                        offer_type?: number;
                                        employee_type?: {
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        };
                                        application_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/offers`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=offer&apiName=offer_status&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=offer_status&project=hire&resource=offer&version=v1 document }
                 */
                offerStatus: async (
                    payload?: {
                        data: {
                            offer_status: number;
                            expiration_date?: string;
                            termination_reason_id_list?: Array<string>;
                            termination_reason_note?: string;
                        };
                        path?: { offer_id?: string };
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
                                `${this.domain}/open-apis/hire/v1/offers/:offer_id/offer_status`,
                                path
                            ),
                            method: "PATCH",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=offer&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/offer/update document }
                 *
                 * 更新 Offer 信息
                 *
                 * 1. 更新 Offer 时，需传入本文档中标注为必传的参数，其余参数是否必传参考「获取 Offer 申请表模板信息」的参数定义；;2. 对系统中已存在的 offer 进行更新的，若更新 offer 中含有「修改需审批」的字段，更新后原 Offer 的审批会自动撤回，需要重新发起审批
                 */
                update: async (
                    payload?: {
                        data: {
                            schema_id: string;
                            basic_info: {
                                department_id: string;
                                leader_user_id: string;
                                employment_job_id?: string;
                                employee_type_id?: string;
                                job_family_id?: string;
                                job_level_id?: string;
                                probation_month?: number;
                                contract_year?: number;
                                contract_period?: {
                                    period_type: number;
                                    period: number;
                                };
                                expected_onboard_date?: string;
                                onboard_address_id?: string;
                                work_address_id?: string;
                                owner_user_id: string;
                                recommended_words?: string;
                                job_requirement_id?: string;
                                job_process_type_id?: number;
                                attachment_id_list?: Array<string>;
                                attachment_description?: string;
                                operator_user_id: string;
                            };
                            salary_info?: {
                                currency: string;
                                basic_salary?: string;
                                probation_salary_percentage?: string;
                                award_salary_multiple?: string;
                                option_shares?: string;
                                quarterly_bonus?: string;
                                half_year_bonus?: string;
                            };
                            customized_info_list?: Array<{
                                id?: string;
                                value?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                            job_family_id_type?:
                                | "people_admin_job_category_id"
                                | "job_family_id";
                            employee_type_id_type?:
                                | "people_admin_employee_type_id"
                                | "employee_type_enum_id";
                        };
                        path?: { offer_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    offer_id?: string;
                                    schema_id?: string;
                                    basic_info?: {
                                        department_id?: string;
                                        leader_user_id?: string;
                                        employment_job_id?: string;
                                        employee_type_id?: string;
                                        job_family_id?: string;
                                        job_level_id?: string;
                                        probation_month?: number;
                                        contract_year?: number;
                                        contract_period?: {
                                            period_type: number;
                                            period: number;
                                        };
                                        expected_onboard_date?: string;
                                        onboard_address_id?: string;
                                        work_address_id?: string;
                                        owner_user_id?: string;
                                        recommended_words?: string;
                                        job_requirement_id?: string;
                                        job_process_type_id?: number;
                                        attachment_id_list?: Array<string>;
                                        attachment_description?: string;
                                        operator_user_id: string;
                                    };
                                    salary_info?: {
                                        currency: string;
                                        basic_salary?: string;
                                        probation_salary_percentage?: string;
                                        award_salary_multiple?: string;
                                        option_shares?: string;
                                        quarterly_bonus?: string;
                                        half_year_bonus?: string;
                                    };
                                    customized_info_list?: Array<{
                                        id?: string;
                                        value?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/offers/:offer_id`,
                                path
                            ),
                            method: "PUT",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * offer_schema
             */
            offerSchema: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=offer_schema&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=hire&resource=offer_schema&version=v1 document }
                 */
                get: async (
                    payload?: {
                        path: { offer_schema_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    id?: string;
                                    scenario?: number;
                                    version?: number;
                                    object_list?: Array<{
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        type?: string;
                                        is_customized?: boolean;
                                        option_list?: Array<{
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            index?: number;
                                            active_status?: number;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/offer_schemas/:offer_schema_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 问卷（灰度租户可见）
             */
            questionnaire: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=questionnaire&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/questionnaire/list document }
                 *
                 * 获取面试满意度问卷列表
                 *
                 * 获取面试满意度问卷列表
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_token?: string;
                            page_size?: number;
                            application_id?: string;
                            interview_id?: string;
                            update_start_time?: string;
                            update_end_time?: string;
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
                                        questionnaire_id?: string;
                                        application_id?: string;
                                        interview_id?: string;
                                        version?: number;
                                        questions?: Array<{
                                            question_id?: string;
                                            question_name?: string;
                                            question_en_name?: string;
                                            question_desc?: string;
                                            question_en_desc?: string;
                                            question_type?: number;
                                            is_required?: boolean;
                                            select_option_result_list?: Array<{
                                                option_id?: string;
                                                option_name?: string;
                                                option_en_name?: string;
                                                option_desc?: string;
                                                option_en_desc?: string;
                                                is_selected?: boolean;
                                            }>;
                                            five_start_scoring_result?: {
                                                highest_score_desc?: string;
                                                highest_score_en_desc?: string;
                                                lowest_score_desc?: string;
                                                lowest_score_en_desc?: string;
                                                score_result?: number;
                                            };
                                            description_result?: string;
                                        }>;
                                        has_answers?: boolean;
                                        update_time?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/questionnaires`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 内推
             */
            referral: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=referral&apiName=get_by_application&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/referral/get_by_application document }
                 *
                 * 获取内推信息
                 *
                 * 根据投递 ID 获取内推信息
                 */
                getByApplication: async (
                    payload?: {
                        params: {
                            application_id: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                    referral?: {
                                        id: string;
                                        application_id: string;
                                        create_time: number;
                                        referral_user_id: string;
                                        referral_user?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/referrals/get_by_application`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * referral_account
             */
            referralAccount: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=referral_account&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=hire&resource=referral_account&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            mobile?: { code?: string; number?: string };
                            email?: string;
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
                                    account?: {
                                        account_id: string;
                                        assets?: {
                                            confirmed_bonus?: {
                                                bonus_type?: number;
                                                point_bonus?: number;
                                                cash?: {
                                                    currency_type: string;
                                                    amount: number;
                                                };
                                            };
                                            paid_bonus?: {
                                                bonus_type?: number;
                                                point_bonus?: number;
                                                cash?: {
                                                    currency_type: string;
                                                    amount: number;
                                                };
                                            };
                                        };
                                        status?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/referral_account`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=referral_account&apiName=deactivate&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=deactivate&project=hire&resource=referral_account&version=v1 document }
                 */
                deactivate: async (
                    payload?: {
                        path?: { referral_account_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    account?: {
                                        account_id: string;
                                        assets?: {
                                            confirmed_bonus?: {
                                                bonus_type?: number;
                                                point_bonus?: number;
                                                cash?: {
                                                    currency_type: string;
                                                    amount: number;
                                                };
                                            };
                                            paid_bonus?: {
                                                bonus_type?: number;
                                                point_bonus?: number;
                                                cash?: {
                                                    currency_type: string;
                                                    amount: number;
                                                };
                                            };
                                        };
                                        status?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/referral_account/:referral_account_id/deactivate`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=referral_account&apiName=reconciliation&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reconciliation&project=hire&resource=referral_account&version=v1 document }
                 */
                reconciliation: async (
                    payload?: {
                        data?: {
                            start_trans_time?: string;
                            end_trans_time?: string;
                            trade_details?: Array<{
                                account_id: string;
                                total_recharge_reward_info?: {
                                    bonus_type?: number;
                                    point_bonus?: number;
                                    cash?: {
                                        currency_type: string;
                                        amount: number;
                                    };
                                };
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
                                    check_failed_list?: Array<{
                                        account_id?: string;
                                        total_withdraw_reward_info?: {
                                            bonus_type?: number;
                                            point_bonus?: number;
                                            cash?: {
                                                currency_type: string;
                                                amount: number;
                                            };
                                        };
                                        total_recharge_reward_info?: {
                                            bonus_type?: number;
                                            point_bonus?: number;
                                            cash?: {
                                                currency_type: string;
                                                amount: number;
                                            };
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/referral_account/reconciliation`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=referral_account&apiName=withdraw&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=withdraw&project=hire&resource=referral_account&version=v1 document }
                 */
                withdraw: async (
                    payload?: {
                        data?: {
                            withdraw_bonus_type?: Array<number>;
                            external_order_id?: string;
                        };
                        path?: { referral_account_id?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    external_order_id?: string;
                                    trans_time?: string;
                                    withdrawal_details?: {
                                        bonus_type?: number;
                                        point_bonus?: number;
                                        cash?: {
                                            currency_type: string;
                                            amount: number;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/referral_account/:referral_account_id/withdraw`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * referral_website.job_post
             */
            referralWebsiteJobPost: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=referral_website.job_post&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=hire&resource=referral_website.job_post&version=v1 document }
                 *
                 * 获取内推官网下职位广告详情
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
                        };
                        path: { job_post_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    job_post?: {
                                        id?: string;
                                        title?: string;
                                        job_id?: string;
                                        job_code?: string;
                                        job_expire_time?: string;
                                        job_active_status?: number;
                                        job_process_type?: number;
                                        job_recruitment_type?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        job_department?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        job_type?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        min_job_level?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        max_job_level?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        address?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            district?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            city?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            state?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            country?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                        };
                                        min_salary?: string;
                                        max_salary?: string;
                                        required_degree?: number;
                                        experience?: number;
                                        headcount?: number;
                                        high_light_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        description?: string;
                                        requirement?: string;
                                        creator?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        create_time?: string;
                                        modify_time?: string;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                            };
                                        }>;
                                        job_function?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        subject?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        address_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            district?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            city?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            state?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            country?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/referral_websites/job_posts/:job_post_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                listWithIterator: async (
                    payload?: {
                        params?: {
                            process_type?: number;
                            page_token?: string;
                            page_size?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
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
                                    `${this.domain}/open-apis/hire/v1/referral_websites/job_posts`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
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
                                                        id?: string;
                                                        title?: string;
                                                        job_id?: string;
                                                        job_code?: string;
                                                        job_expire_time?: string;
                                                        job_active_status?: number;
                                                        job_process_type?: number;
                                                        job_recruitment_type?: {
                                                            id?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                        job_department?: {
                                                            id?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                        job_type?: {
                                                            id?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                        min_job_level?: {
                                                            id?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                        max_job_level?: {
                                                            id?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                        address?: {
                                                            id?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            district?: {
                                                                code?: string;
                                                                name?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                            };
                                                            city?: {
                                                                code?: string;
                                                                name?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                            };
                                                            state?: {
                                                                code?: string;
                                                                name?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                            };
                                                            country?: {
                                                                code?: string;
                                                                name?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                            };
                                                        };
                                                        min_salary?: string;
                                                        max_salary?: string;
                                                        required_degree?: number;
                                                        experience?: number;
                                                        headcount?: number;
                                                        high_light_list?: Array<{
                                                            id?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        }>;
                                                        description?: string;
                                                        requirement?: string;
                                                        creator?: {
                                                            id?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                        create_time?: string;
                                                        modify_time?: string;
                                                        customized_data_list?: Array<{
                                                            object_id?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            object_type?: number;
                                                            value?: {
                                                                content?: string;
                                                                option?: {
                                                                    key?: string;
                                                                    name?: {
                                                                        zh_cn?: string;
                                                                        en_us?: string;
                                                                    };
                                                                };
                                                                option_list?: Array<{
                                                                    key?: string;
                                                                    name?: {
                                                                        zh_cn?: string;
                                                                        en_us?: string;
                                                                    };
                                                                }>;
                                                                time_range?: {
                                                                    start_time?: string;
                                                                    end_time?: string;
                                                                };
                                                                time?: string;
                                                                number?: string;
                                                            };
                                                        }>;
                                                        job_function?: {
                                                            id?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                        };
                                                        address_list?: Array<{
                                                            id?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            district?: {
                                                                code?: string;
                                                                name?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                            };
                                                            city?: {
                                                                code?: string;
                                                                name?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                            };
                                                            state?: {
                                                                code?: string;
                                                                name?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                            };
                                                            country?: {
                                                                code?: string;
                                                                name?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                            };
                                                        }>;
                                                    }>;
                                                    has_more?: boolean;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=referral_website.job_post&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=hire&resource=referral_website.job_post&version=v1 document }
                 *
                 * 获取内推官网下的职位列表。自定义数据暂不支持列表获取，请从「获取内推官网下职位广告详情」接口获取
                 */
                list: async (
                    payload?: {
                        params?: {
                            process_type?: number;
                            page_token?: string;
                            page_size?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            job_level_id_type?:
                                | "people_admin_job_level_id"
                                | "job_level_id";
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
                                        id?: string;
                                        title?: string;
                                        job_id?: string;
                                        job_code?: string;
                                        job_expire_time?: string;
                                        job_active_status?: number;
                                        job_process_type?: number;
                                        job_recruitment_type?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        job_department?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        job_type?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        min_job_level?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        max_job_level?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        address?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            district?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            city?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            state?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            country?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                        };
                                        min_salary?: string;
                                        max_salary?: string;
                                        required_degree?: number;
                                        experience?: number;
                                        headcount?: number;
                                        high_light_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                        description?: string;
                                        requirement?: string;
                                        creator?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        create_time?: string;
                                        modify_time?: string;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            value?: {
                                                content?: string;
                                                option?: {
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                };
                                                option_list?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                }>;
                                                time_range?: {
                                                    start_time?: string;
                                                    end_time?: string;
                                                };
                                                time?: string;
                                                number?: string;
                                            };
                                        }>;
                                        job_function?: {
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        };
                                        address_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            district?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            city?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            state?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                            country?: {
                                                code?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                            };
                                        }>;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/referral_websites/job_posts`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * registration_schema
             */
            registrationSchema: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            scenario?: number;
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
                                    `${this.domain}/open-apis/hire/v1/registration_schemas`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
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
                                                        id?: string;
                                                        name?: string;
                                                        scenarios?: Array<number>;
                                                        objects?: Array<{
                                                            id?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            description?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            setting?: {
                                                                object_type?: number;
                                                                config?: {
                                                                    options?: Array<{
                                                                        key?: string;
                                                                        name?: {
                                                                            zh_cn?: string;
                                                                            en_us?: string;
                                                                        };
                                                                        description?: {
                                                                            zh_cn?: string;
                                                                            en_us?: string;
                                                                        };
                                                                        active_status?: number;
                                                                    }>;
                                                                };
                                                            };
                                                            is_customized?: boolean;
                                                            is_required?: boolean;
                                                            is_visible?: boolean;
                                                            active_status?: number;
                                                            children_list?: Array<{
                                                                id?: string;
                                                                name?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                                description?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                };
                                                                setting?: {
                                                                    object_type?: number;
                                                                    config?: {
                                                                        options?: Array<{
                                                                            key?: string;
                                                                            name?: {
                                                                                zh_cn?: string;
                                                                                en_us?: string;
                                                                            };
                                                                            description?: {
                                                                                zh_cn?: string;
                                                                                en_us?: string;
                                                                            };
                                                                            active_status?: number;
                                                                        }>;
                                                                    };
                                                                };
                                                                parent_id?: string;
                                                                is_customized?: boolean;
                                                                is_required?: boolean;
                                                                is_visible?: boolean;
                                                                active_status?: number;
                                                            }>;
                                                        }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=registration_schema&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=hire&resource=registration_schema&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            scenario?: number;
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
                                        id?: string;
                                        name?: string;
                                        scenarios?: Array<number>;
                                        objects?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            description?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            setting?: {
                                                object_type?: number;
                                                config?: {
                                                    options?: Array<{
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        description?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        active_status?: number;
                                                    }>;
                                                };
                                            };
                                            is_customized?: boolean;
                                            is_required?: boolean;
                                            is_visible?: boolean;
                                            active_status?: number;
                                            children_list?: Array<{
                                                id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                description?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                setting?: {
                                                    object_type?: number;
                                                    config?: {
                                                        options?: Array<{
                                                            key?: string;
                                                            name?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            description?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            active_status?: number;
                                                        }>;
                                                    };
                                                };
                                                parent_id?: string;
                                                is_customized?: boolean;
                                                is_required?: boolean;
                                                is_visible?: boolean;
                                                active_status?: number;
                                            }>;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/registration_schemas`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 简历来源
             */
            resumeSource: {
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
                                    `${this.domain}/open-apis/hire/v1/resume_sources`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
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
                                                        id?: string;
                                                        zh_name?: string;
                                                        en_name?: string;
                                                        active_status?: number;
                                                        resume_source_type?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=resume_source&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/resume_source/list document }
                 *
                 * 获取简历来源列表
                 *
                 * 获取简历来源列表
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
                                        id?: string;
                                        zh_name?: string;
                                        en_name?: string;
                                        active_status?: number;
                                        resume_source_type?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/resume_sources`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 人才
             */
            talent: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=talent&apiName=add_to_folder&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/add_to_folder document }
                 *
                 * 将人才加入指定文件夹
                 *
                 * 将人才加入指定文件夹
                 */
                addToFolder: async (
                    payload?: {
                        data?: {
                            talent_id_list?: Array<string>;
                            folder_id?: string;
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
                                    talent_id_list?: Array<string>;
                                    folder_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/talents/add_to_folder`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=talent&apiName=batch_get_id&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/batch_get_id document }
                 *
                 * 通过人才信息获取人才 ID
                 *
                 * 通过人才信息获取人才 ID
                 */
                batchGetId: async (
                    payload?: {
                        data?: {
                            mobile_code?: string;
                            mobile_number_list?: Array<string>;
                            email_list?: Array<string>;
                            identification_type?: number;
                            identification_number_list?: Array<string>;
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
                                    talent_list?: Array<{
                                        talent_id?: string;
                                        mobile_code?: string;
                                        mobile_number?: string;
                                        email?: string;
                                        identification_type?: number;
                                        identification_number?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/talents/batch_get_id`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=talent&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/get document }
                 *
                 * 获取人才信息
                 *
                 * 根据人才 ID 获取人才信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                        };
                        path: { talent_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    talent?: {
                                        id?: string;
                                        is_in_agency_period?: boolean;
                                        is_onboarded?: boolean;
                                        basic_info?: {
                                            name: string;
                                            mobile?: string;
                                            mobile_code?: string;
                                            mobile_country_code?: string;
                                            email?: string;
                                            experience_years?: number;
                                            age?: number;
                                            nationality?: {
                                                nationality_code?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            gender?: number;
                                            current_city?: {
                                                city_code?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            hometown_city?: {
                                                city_code?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            preferred_city_list?: Array<{
                                                city_code?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            }>;
                                            identification_type?: number;
                                            identification_number?: string;
                                            identification?: {
                                                identification_type?: number;
                                                identification_number?: string;
                                            };
                                            birthday?: number;
                                            creator_id?: string;
                                            marital_status?: number;
                                            current_home_address?: string;
                                            customized_data_list?: Array<{
                                                object_id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                object_type?: number;
                                                value?: {
                                                    content?: string;
                                                    option?: {
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    };
                                                    option_list?: Array<{
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    }>;
                                                    time_range?: {
                                                        start_time?: string;
                                                        end_time?: string;
                                                    };
                                                    time?: string;
                                                    number?: string;
                                                    customized_attachment?: Array<{
                                                        file_id?: string;
                                                        name?: string;
                                                        content_type?: string;
                                                        file_size?: number;
                                                    }>;
                                                };
                                            }>;
                                            modify_time?: string;
                                            hukou_location_code?: string;
                                        };
                                        education_list?: Array<{
                                            id?: string;
                                            degree?: number;
                                            school?: string;
                                            field_of_study?: string;
                                            start_time?: string;
                                            end_time?: string;
                                            end_time_v2?: string;
                                            education_type?: number;
                                            academic_ranking?: number;
                                            tag_list?: Array<number>;
                                            customized_data_list?: Array<{
                                                object_id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                object_type?: number;
                                                value?: {
                                                    content?: string;
                                                    option?: {
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    };
                                                    option_list?: Array<{
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    }>;
                                                    time_range?: {
                                                        start_time?: string;
                                                        end_time?: string;
                                                    };
                                                    time?: string;
                                                    number?: string;
                                                    customized_attachment?: Array<{
                                                        file_id?: string;
                                                        name?: string;
                                                        content_type?: string;
                                                        file_size?: number;
                                                    }>;
                                                };
                                            }>;
                                        }>;
                                        career_list?: Array<{
                                            id?: string;
                                            company?: string;
                                            title?: string;
                                            desc?: string;
                                            start_time?: string;
                                            end_time?: string;
                                            career_type?: number;
                                            tag_list?: Array<number>;
                                            customized_data_list?: Array<{
                                                object_id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                object_type?: number;
                                                value?: {
                                                    content?: string;
                                                    option?: {
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    };
                                                    option_list?: Array<{
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    }>;
                                                    time_range?: {
                                                        start_time?: string;
                                                        end_time?: string;
                                                    };
                                                    time?: string;
                                                    number?: string;
                                                    customized_attachment?: Array<{
                                                        file_id?: string;
                                                        name?: string;
                                                        content_type?: string;
                                                        file_size?: number;
                                                    }>;
                                                };
                                            }>;
                                        }>;
                                        project_list?: Array<{
                                            id?: string;
                                            name?: string;
                                            role?: string;
                                            link?: string;
                                            desc?: string;
                                            start_time?: string;
                                            end_time?: string;
                                            customized_data_list?: Array<{
                                                object_id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                object_type?: number;
                                                value?: {
                                                    content?: string;
                                                    option?: {
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    };
                                                    option_list?: Array<{
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    }>;
                                                    time_range?: {
                                                        start_time?: string;
                                                        end_time?: string;
                                                    };
                                                    time?: string;
                                                    number?: string;
                                                    customized_attachment?: Array<{
                                                        file_id?: string;
                                                        name?: string;
                                                        content_type?: string;
                                                        file_size?: number;
                                                    }>;
                                                };
                                            }>;
                                        }>;
                                        works_list?: Array<{
                                            id?: string;
                                            link?: string;
                                            desc?: string;
                                            name?: string;
                                            customized_data_list?: Array<{
                                                object_id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                object_type?: number;
                                                value?: {
                                                    content?: string;
                                                    option?: {
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    };
                                                    option_list?: Array<{
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    }>;
                                                    time_range?: {
                                                        start_time?: string;
                                                        end_time?: string;
                                                    };
                                                    time?: string;
                                                    number?: string;
                                                    customized_attachment?: Array<{
                                                        file_id?: string;
                                                        name?: string;
                                                        content_type?: string;
                                                        file_size?: number;
                                                    }>;
                                                };
                                            }>;
                                        }>;
                                        award_list?: Array<{
                                            id?: string;
                                            title?: string;
                                            award_time?: string;
                                            desc?: string;
                                            customized_data_list?: Array<{
                                                object_id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                object_type?: number;
                                                value?: {
                                                    content?: string;
                                                    option?: {
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    };
                                                    option_list?: Array<{
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    }>;
                                                    time_range?: {
                                                        start_time?: string;
                                                        end_time?: string;
                                                    };
                                                    time?: string;
                                                    number?: string;
                                                    customized_attachment?: Array<{
                                                        file_id?: string;
                                                        name?: string;
                                                        content_type?: string;
                                                        file_size?: number;
                                                    }>;
                                                };
                                            }>;
                                        }>;
                                        language_list?: Array<{
                                            id?: string;
                                            language?: number;
                                            proficiency?: number;
                                            customized_data_list?: Array<{
                                                object_id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                object_type?: number;
                                                value?: {
                                                    content?: string;
                                                    option?: {
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    };
                                                    option_list?: Array<{
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    }>;
                                                    time_range?: {
                                                        start_time?: string;
                                                        end_time?: string;
                                                    };
                                                    time?: string;
                                                    number?: string;
                                                    customized_attachment?: Array<{
                                                        file_id?: string;
                                                        name?: string;
                                                        content_type?: string;
                                                        file_size?: number;
                                                    }>;
                                                };
                                            }>;
                                        }>;
                                        sns_list?: Array<{
                                            id?: string;
                                            sns_type?: number;
                                            link?: string;
                                            customized_data_list?: Array<{
                                                object_id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                object_type?: number;
                                                value?: {
                                                    content?: string;
                                                    option?: {
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    };
                                                    option_list?: Array<{
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    }>;
                                                    time_range?: {
                                                        start_time?: string;
                                                        end_time?: string;
                                                    };
                                                    time?: string;
                                                    number?: string;
                                                    customized_attachment?: Array<{
                                                        file_id?: string;
                                                        name?: string;
                                                        content_type?: string;
                                                        file_size?: number;
                                                    }>;
                                                };
                                            }>;
                                        }>;
                                        resume_source_list?: Array<{
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        }>;
                                        interview_registration_list?: Array<{
                                            id?: string;
                                            registration_time?: number;
                                            download_url?: string;
                                        }>;
                                        registration_list?: Array<{
                                            id?: string;
                                            registration_time?: number;
                                            download_url?: string;
                                            scenario?: number;
                                        }>;
                                        resume_attachment_id_list?: Array<string>;
                                        customized_data_list?: Array<{
                                            object_id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            object_type?: number;
                                            children?: Array<{
                                                object_id?: string;
                                                name?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                };
                                                object_type?: number;
                                                value?: {
                                                    content?: string;
                                                    option?: {
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    };
                                                    option_list?: Array<{
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    }>;
                                                    time_range?: {
                                                        start_time?: string;
                                                        end_time?: string;
                                                    };
                                                    time?: string;
                                                    number?: string;
                                                    customized_attachment?: Array<{
                                                        file_id?: string;
                                                        name?: string;
                                                        content_type?: string;
                                                        file_size?: number;
                                                    }>;
                                                };
                                            }>;
                                        }>;
                                        top_degree?: number;
                                        first_degree?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/talents/:talent_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=talent&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent/list document }
                 *
                 * 获取人才列表
                 *
                 * 根据更新时间获取人才列表，仅支持获取默认字段信息，获取详细信息可调用「获取人才详细」接口
                 */
                list: async (
                    payload?: {
                        params?: {
                            update_start_time?: string;
                            update_end_time?: string;
                            page_size?: number;
                            page_token?: string;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
                            query_option?: "ignore_empty_error";
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
                                        id?: string;
                                        is_in_agency_period?: boolean;
                                        is_onboarded?: boolean;
                                        basic_info?: {
                                            name: string;
                                            mobile?: string;
                                            mobile_code?: string;
                                            mobile_country_code?: string;
                                            email?: string;
                                            experience_years?: number;
                                            age?: number;
                                            nationality?: {
                                                nationality_code?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            gender?: number;
                                            current_city?: {
                                                city_code?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            hometown_city?: {
                                                city_code?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            };
                                            preferred_city_list?: Array<{
                                                city_code?: string;
                                                zh_name?: string;
                                                en_name?: string;
                                            }>;
                                            identification_type?: number;
                                            identification_number?: string;
                                            identification?: {
                                                identification_type?: number;
                                                identification_number?: string;
                                            };
                                            birthday?: number;
                                            creator_id?: string;
                                            marital_status?: number;
                                            current_home_address?: string;
                                            modify_time?: string;
                                        };
                                        education_list?: Array<{
                                            id?: string;
                                            degree?: number;
                                            school?: string;
                                            field_of_study?: string;
                                            start_time?: string;
                                            end_time?: string;
                                            end_time_v2?: string;
                                            education_type?: number;
                                            academic_ranking?: number;
                                            tag_list?: Array<number>;
                                        }>;
                                        career_list?: Array<{
                                            id?: string;
                                            company?: string;
                                            title?: string;
                                            desc?: string;
                                            start_time?: string;
                                            end_time?: string;
                                            career_type?: number;
                                            tag_list?: Array<number>;
                                        }>;
                                        project_list?: Array<{
                                            id?: string;
                                            name?: string;
                                            role?: string;
                                            link?: string;
                                            desc?: string;
                                            start_time?: string;
                                            end_time?: string;
                                        }>;
                                        works_list?: Array<{
                                            id?: string;
                                            link?: string;
                                            desc?: string;
                                            name?: string;
                                        }>;
                                        award_list?: Array<{
                                            id?: string;
                                            title?: string;
                                            award_time?: string;
                                            desc?: string;
                                        }>;
                                        language_list?: Array<{
                                            id?: string;
                                            language?: number;
                                            proficiency?: number;
                                        }>;
                                        sns_list?: Array<{
                                            id?: string;
                                            sns_type?: number;
                                            link?: string;
                                        }>;
                                        resume_source_list?: Array<{
                                            id?: string;
                                            zh_name?: string;
                                            en_name?: string;
                                        }>;
                                        interview_registration_list?: Array<{
                                            id?: string;
                                            registration_time?: number;
                                        }>;
                                        resume_attachment_id_list?: Array<string>;
                                        top_degree?: number;
                                        first_degree?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/talents`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * talent_folder
             */
            talentFolder: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_token?: string;
                            page_size?: number;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                    `${this.domain}/open-apis/hire/v1/talent_folders`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        folder_id?: string;
                                                        folder_name: string;
                                                        owner_id?: string;
                                                    }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=talent_folder&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_folder/list document }
                 *
                 * 获取人才文件夹信息
                 *
                 * 用于获取招聘系统中人才文件夹信息
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_token?: string;
                            page_size?: number;
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                        folder_id?: string;
                                        folder_name: string;
                                        owner_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/talent_folders`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * talent_object
             */
            talentObject: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=hire&resource=talent_object&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/ukTMukTMukTM/uMzM1YjLzMTN24yMzUjN/hire-v1/talent_object/query document }
                 *
                 * 获取人才字段
                 *
                 * 获取人才字段
                 */
                query: async (payload?: {}, options?: IRequestOptions) => {
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
                                        id?: string;
                                        name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        setting?: {
                                            object_type?: number;
                                            config?: {
                                                options?: Array<{
                                                    key?: string;
                                                    name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    description?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                    };
                                                    active_status?: number;
                                                }>;
                                            };
                                        };
                                        is_customized?: boolean;
                                        is_required?: boolean;
                                        active_status?: number;
                                        children_list?: Array<{
                                            id?: string;
                                            name?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            description?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            setting?: {
                                                object_type?: number;
                                                config?: {
                                                    options?: Array<{
                                                        key?: string;
                                                        name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        description?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        active_status?: number;
                                                    }>;
                                                };
                                            };
                                            parent_id?: string;
                                            is_customized?: boolean;
                                            is_required?: boolean;
                                            active_status?: number;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/hire/v1/talent_objects/query`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
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
