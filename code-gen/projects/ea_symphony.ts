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
import drive from "./drive";

// auto gen
export default abstract class Client extends drive {
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
    ea_symphony = {
        v1: {
            /**
             * lawfirm_attorney_capacity
             */
            lawfirmAttorneyCapacity: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=ea_symphony&resource=lawfirm_attorney_capacity&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=ea_symphony&resource=lawfirm_attorney_capacity&version=v1 document }
                 *
                 * 获取律所和律师容量
                 *
                 * 获取律所和律师容量
                 */
                get: async (
                    payload?: {
                        params?: { active?: boolean };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    lawfirm_attorney_capacity?: {
                                        lawfirm_capacities?: Array<{
                                            id: string;
                                            name: string;
                                            total_capacity: number;
                                            remaining_capaticy: number;
                                        }>;
                                        attorney_capacities?: Array<{
                                            lawfirm_id: string;
                                            id: string;
                                            name: string;
                                            total_capacity: number;
                                            remaining_capacity: number;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/ea_symphony/v1/lawfirm_attorney_capacity`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=ea_symphony&resource=lawfirm_attorney_capacity&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=ea_symphony&resource=lawfirm_attorney_capacity&version=v1 document }
                 *
                 * 更新律所和律师容量
                 *
                 * 更新律所和律师容量
                 */
                update: async (
                    payload?: {
                        data: {
                            data: Array<{
                                bytedance_idf_ids: Array<{
                                    bytedance_idf_id: string;
                                }>;
                                lawfirm_id: string;
                                lawfirm_name: string;
                                attorney_infos: Array<{
                                    id: string;
                                    name: string;
                                }>;
                                amount_of_family: number;
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
                                    status?: string;
                                    reason?: string;
                                    code?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/ea_symphony/v1/lawfirm_attorney_capacity`,
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
             * idf
             */
            idf: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=ea_symphony&resource=idf&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=ea_symphony&resource=idf&version=v1 document }
                 *
                 * 创建 IDF
                 *
                 * 创建 IDF
                 */
                create: async (
                    payload?: {
                        data: {
                            idfs: Array<{
                                bytedance_idf_ids: Array<{
                                    bytedance_idf_id: string;
                                }>;
                                idf_name: string;
                                idf_type: string;
                                proposal_types: Array<string>;
                                application_type: string;
                                application_department_id: string;
                                application_department_name: string;
                                tech_owner_name: string;
                                tech_owner_employee_id: string;
                                tech_owner_email: string;
                                tech_owner_department_id: string;
                                tech_owner_department_name: string;
                                tech_owner_nationality: string;
                                patent_bp_name: string;
                                patent_bp_employee_id: string;
                                patent_bp_email: string;
                                patent_bp_department_id: string;
                                patent_bp_department_name: string;
                                patent_bp_nationality: string;
                                apply_level: string;
                                grant_possibility: string;
                                contention_difficulty: string;
                                industrial_applicable: string;
                                jurisdictions: Array<{
                                    name?: string;
                                    code?: string;
                                }>;
                                product_tags: Array<{
                                    name?: string;
                                    full_name?: string;
                                }>;
                                project_tags: Array<{
                                    name?: string;
                                    full_name?: string;
                                }>;
                                category_tags: Array<{
                                    name?: string;
                                    full_name?: string;
                                }>;
                                technology_tags: Array<{
                                    name?: string;
                                    full_name?: string;
                                }>;
                                search_requirement: boolean;
                                ffl: string;
                                ddl_for_first_draft: string;
                                ddl_for_filing: string;
                                amount_of_family: string;
                                internal_inventors: Array<{
                                    sequence?: string;
                                    employee_id?: string;
                                    chinese_legal_name?: string;
                                    english_legal_name?: string;
                                    email?: string;
                                    contribution_percentage?: string;
                                    nationality?: string;
                                    applicant?: string;
                                }>;
                                external_inventors: Array<{
                                    sequence?: string;
                                    chinese_legal_name?: string;
                                    english_legal_name?: string;
                                    email?: string;
                                    nationality?: string;
                                    applicant?: string;
                                }>;
                                files: Array<{ file_id?: string }>;
                                substantive_examination_within_filing_requirement?: boolean;
                                advanced_announcement_requirement?: boolean;
                                priority_examination_requirement?: boolean;
                                delayed_examination_requirement?: boolean;
                                urgent_requirement?: boolean;
                                cost_reduction_requirement?: boolean;
                                remark?: string;
                                bp_remark?: string;
                                idf_group_id?: string;
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
                                    code: string;
                                    msg: string;
                                    data: Array<{
                                        bytedance_idf_id?: string;
                                        symphony_idf_id?: string;
                                        symphony_idf_family_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/ea_symphony/v1/idf`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
