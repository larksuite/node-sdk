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
import device from "./device";

// auto gen
export default abstract class Client extends device {
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
    directory = {
        v1: {
            /**
             * org_dimension
             */
            orgDimension: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=org_dimension&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=org_dimension&version=v1 document }
                 *
                 * 删除自定义组织维度
                 *
                 * 本接口用于删除自定义的组织维度。删除自定义组织维度需要先删除关联的所有部门数据，否则无法删除。
                 */
                delete: async (
                    payload?: {
                        params?: { tenant_id?: string };
                        path: { org_dimension_id: string };
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
                                `${this.domain}/open-apis/directory/v1/org_dimensions/:org_dimension_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=org_dimension&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=org_dimension&version=v1 document }
                 *
                 * 更新自定义组织维度
                 *
                 * 本接口用于更新自定义的组织维度信息。未传递的参数不会进行更新。
                 */
                patch: async (
                    payload?: {
                        data: {
                            org_dimension: {
                                name?: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                                is_enable?: boolean;
                                order?: string;
                                description?: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                            };
                        };
                        params?: { tenant_id?: string };
                        path: { org_dimension_id: string };
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
                                `${this.domain}/open-apis/directory/v1/org_dimensions/:org_dimension_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=org_dimension&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=org_dimension&version=v1 document }
                 *
                 * 创建自定义组织维度
                 *
                 * 本接口用于创建自定义的组织维度。;系统会预置「行政组织」这一个组织维度，如企业需要其他组织维度用于管理企业数据，可使用此API创建自定义组织维度。
                 */
                create: async (
                    payload?: {
                        data: {
                            org_dimension: {
                                name?: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                                is_enable?: boolean;
                                order?: string;
                                description?: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                            };
                        };
                        params?: { tenant_id?: string };
                    },
                    options?: IRequestOptions
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
                                `${this.domain}/open-apis/directory/v1/org_dimensions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=org_dimension&apiName=mget&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=directory&resource=org_dimension&version=v1 document }
                 *
                 * 批量获取组织维度信息
                 *
                 * 本接口用于批量根据组织维度的ID查询详情。例如名称、类型等。
                 */
                mget: async (
                    payload?: {
                        data: {
                            org_dimension_ids: Array<string>;
                            required_fields: Array<string>;
                        };
                        params?: {
                            tenant_id?: string;
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            employee_id_type?:
                                | "open_id"
                                | "employee_id"
                                | "union_id";
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
                                    org_dimension_infos?: Array<{
                                        id: string;
                                        name?: {
                                            default_value: string;
                                            i18n_value?: Record<string, string>;
                                            default_locale?: string;
                                        };
                                        enum_type?: number;
                                        is_enable?: boolean;
                                        order?: string;
                                        description?: {
                                            default_value: string;
                                            i18n_value?: Record<string, string>;
                                            default_locale?: string;
                                        };
                                        root_department_id?: string;
                                    }>;
                                    abnormals?: Array<{
                                        id?: string;
                                        row_error?: number;
                                        field_errors?: Record<string, number>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/org_dimensions/mget`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=org_dimension&apiName=filter&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=filter&project=directory&resource=org_dimension&version=v1 document }
                 *
                 * 批量获取组织维度列表
                 *
                 * 本接口用于依据指定条件，批量获取符合条件的组织维度详情列表，详情包括如名称、类型等。
                 */
                filter: async (
                    payload?: {
                        data?: {
                            filter?: {
                                conditions: Array<{
                                    field: string;
                                    operator: string;
                                    value: string;
                                }>;
                            };
                            required_fields?: Array<string>;
                            page_request?: {
                                page_size?: number;
                                page_token?: string;
                            };
                        };
                        params?: {
                            tenant_id?: string;
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            employee_id_type?:
                                | "open_id"
                                | "employee_id"
                                | "union_id";
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
                                    org_dimensions?: Array<{
                                        id: string;
                                        name?: {
                                            default_value: string;
                                            i18n_value?: Record<string, string>;
                                            default_locale?: string;
                                        };
                                        enum_type?: number;
                                        is_enable?: boolean;
                                        order?: string;
                                        description?: {
                                            default_value: string;
                                            i18n_value?: Record<string, string>;
                                            default_locale?: string;
                                        };
                                        root_department_id?: string;
                                    }>;
                                    abnormals?: Array<{
                                        id?: string;
                                        row_error?: number;
                                        field_errors?: Record<string, number>;
                                    }>;
                                    page_response?: {
                                        has_more?: boolean;
                                        page_token?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/org_dimensions/filter`,
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
             * org_visibilities
             */
            orgVisibilities: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=org_visibilities&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=org_visibilities&version=v1 document }
                 *
                 * 批量删除组织架构可见性规则
                 *
                 * 本接口用于批量删除组织架构可见性的补充规则
                 */
                delete: async (
                    payload?: {
                        data: { rule_ids: Array<string> };
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
                                `${this.domain}/open-apis/directory/v1/org_visibilities`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=org_visibilities&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=org_visibilities&version=v1 document }
                 *
                 * 批量更新组织架构可见性规则
                 *
                 * 本接口用于批量更新组织架构可见性的主规则、补充规则。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            main_rule?: {
                                main_rule_type: number;
                                unit_type?: string;
                                dept_leader_visible_the_dept?: boolean;
                                sub_depts_visible?: boolean;
                            };
                            assist_rules?: Array<{
                                rule_id: string;
                                subjects: Array<{
                                    id: string;
                                    entity_type: number;
                                }>;
                                objects: Array<{
                                    id: string;
                                    entity_type: number;
                                }>;
                                effect: number;
                                match_condition?: number;
                            }>;
                        };
                        params?: {
                            employee_id_type?:
                                | "open_id"
                                | "employee_id"
                                | "union_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                `${this.domain}/open-apis/directory/v1/org_visibilities`,
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
             * employee
             */
            employee: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=resurrect&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=resurrect&project=directory&resource=employee&version=v1 document }
                 *
                 * 恢复离职员工
                 *
                 * 该接口用于恢复已离职的成员，恢复已离职成员至在职状态。
                 *
                 * 注意：;- 恢复离职员工为在职，需要企业的版本在商业专业版及以上，可通过管理后台>设置>版本信息查看企业当前版本，且员工需要在离职 30 天内。恢复后，部分用户数据仍不可恢复，请谨慎调用。;- 待恢复成员的用户 ID 不能被企业内其他成员使用，可通过[批量获取员工列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/filter)接口查询用户ID是否存在。如有重复，请先离职对应的成员，否则接口会报错。;- 待恢复成员的手机号和邮箱不能被企业内其他成员使用，可通过[批量获取员工列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/filter)接口查询手机号/邮箱是否存在。如有重复，请先修改对应成员的信息，否则接口会报错。;- 本接口支持tenant_access_token和user_access_token，两种token的获取方式可参照[获取访问凭证](https://open.feishu.cn/document/ukTMukTMukTM/uMTNz4yM1MjLzUzM)。; - 使用tenant_access_token时，只能在将离职员工恢复到当前应用通讯录授权范围内的部门之下。; - 使用user_access_token 时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可恢复离职员工时，管理员管理范围取最大集。
                 */
                resurrect: async (
                    payload?: {
                        data?: {
                            employee_order_in_departments?: Array<{
                                department_id?: string;
                                order_weight_in_deparment?: string;
                                order_weight_among_deparments?: string;
                                is_main_department?: boolean;
                            }>;
                            options?: { subscription_ids?: Array<string> };
                        };
                        params?: {
                            employee_id_type?:
                                | "open_id"
                                | "employee_id"
                                | "union_id";
                            is_admin_role?: boolean;
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/employees/:employee_id/resurrect`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=list_employee_ids&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_employee_ids&project=directory&resource=employee&version=v1 document }
                 *
                 * 根据状态筛选可见的雇员ID列表
                 */
                listEmployeeIds: async (
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
                                `${this.domain}/open-apis/directory`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=m_get_visible_employee_ids&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=m_get_visible_employee_ids&project=directory&resource=employee&version=v1 document }
                 *
                 * 获取可见的雇员ID
                 */
                mGetVisibleEmployeeIds: async (
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
                                `${this.domain}/open-apis/directory`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=regular&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=regular&project=directory&resource=employee&version=v1 document }
                 *
                 * 更新待离职成员为在职
                 *
                 * 本接口用于为待离职员工取消离职，将其更新为「在职」状态。取消离职时会清空离职信息。;使用user_access_token时默认为管理员用户，仅可操作「人事管理模式」的管理员可操作。
                 */
                regular: async (
                    payload?: {
                        data?: {
                            openapi_options?: {
                                employee_id_type?:
                                    | "open_id"
                                    | "union_id"
                                    | "employee_id";
                                department_id_type?:
                                    | "department_id"
                                    | "open_department_id";
                                job_title_id_type?: string;
                                work_place_id_type?: string;
                                org_dimension_id_type?: string;
                                group_id_type?: string;
                                group_set_id_type?: string;
                            };
                        };
                        params?: {
                            is_admin_role?: boolean;
                            employee_id_type?:
                                | "open_id"
                                | "union_id"
                                | "employee_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/employees/:employee_id/regular`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=is_forbidden_delete_employee&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=is_forbidden_delete_employee&project=directory&resource=employee&version=v1 document }
                 *
                 * 更新员工的拦截离职
                 */
                isForbiddenDeleteEmployee: async (
                    payload?: {
                        data: { is_forbidden_delete: boolean };
                        params?: {
                            employee_id_type?:
                                | "open_id"
                                | "union_id"
                                | "employee_id";
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/employees/:employee_id/is_forbidden_delete_employee`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=to_be_resigned&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=to_be_resigned&project=directory&resource=employee&version=v1 document }
                 *
                 * 更新在职员工为待离职
                 *
                 * 本接口用于为在职员工办理离职，将其更新为「待离职」状态。「待离职」员工不会自动离职，需要使用「离职员工」API操作离职和资源转交。;使用user_access_token时默认为管理员用户，仅「人事管理模式」的管理员可操作。
                 */
                toBeResigned: async (
                    payload?: {
                        data: {
                            employee: {
                                resign_date: string;
                                resign_reason:
                                    | "1"
                                    | "2"
                                    | "3"
                                    | "4"
                                    | "5"
                                    | "6"
                                    | "7"
                                    | "8"
                                    | "9"
                                    | "10"
                                    | "11"
                                    | "12"
                                    | "13"
                                    | "14"
                                    | "15"
                                    | "16"
                                    | "17"
                                    | "18"
                                    | "19"
                                    | "20"
                                    | "21"
                                    | "22"
                                    | "23"
                                    | "24"
                                    | "25";
                                resign_type: "1" | "2" | "3";
                                resign_remark?: string;
                            };
                        };
                        params?: {
                            is_admin_role?: boolean;
                            employee_id_type?:
                                | "open_id"
                                | "union_id"
                                | "employee_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/employees/:employee_id/to_be_resigned`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=idconvert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=idconvert&project=directory&resource=employee&version=v1 document }
                 */
                idconvert: async (
                    payload?: {
                        data: { employee_ids: Array<string> };
                        params?: {
                            employee_id_type?:
                                | "open_id"
                                | "union_id"
                                | "employee_id";
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
                                    id_convert_results?: Array<{
                                        id: string;
                                        employee_id?: string;
                                        open_employee_id?: string;
                                        union_employee_id?: string;
                                    }>;
                                    abnormals?: Array<{
                                        id?: string;
                                        row_error?: number;
                                        field_errors?: Record<string, number>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/employees/idconvert`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=employee&version=v1 document }
                 *
                 * 离职员工
                 *
                 * 本接口用于离职员工。
                 *
                 * 注意：;- 本接口支持tenant_access_token和user_access_token。; - 使用tenant_access_token时，只能在当前应用的通讯录授权范围内离职员工。; - 若员工归属于多个部门，应用需要有员工所有所属部门的权限，才能离职成功。; - 使用user_access_token 时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可离职员工时，管理员管理范围取最大集。
                 */
                delete: async (
                    payload?: {
                        data?: {
                            options?: {
                                resigned_employee_resource_receiver?: {
                                    department_chat_acceptor_employee_id?: string;
                                    external_chat_acceptor_employee_id?: string;
                                    docs_acceptor_employee_id?: string;
                                    calendar_acceptor_employee_id?: string;
                                    application_acceptor_employee_id?: string;
                                    helpdesk_acceptor_employee_id?: string;
                                    approval_acceptor_employee_id?: string;
                                    email_acceptor_employee_id?: string;
                                    minutes_acceptor_employee_id?: string;
                                    survey_acceptor_employee_id?: string;
                                    anycross_acceptor_employee_id?: string;
                                };
                            };
                        };
                        params?: {
                            employee_id_type?:
                                | "open_id"
                                | "employee_id"
                                | "union_id";
                            is_admin_role?: boolean;
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/employees/:employee_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=create_resigned&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_resigned&project=directory&resource=employee&version=v1 document }
                 *
                 * 创建离职员工
                 */
                createResigned: async (
                    payload?: {
                        data: {
                            employee: {
                                name?: {
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
                                    name: {
                                        default_value: string;
                                        i18n_value?: Record<string, string>;
                                        default_locale?: string;
                                    };
                                    another_name?: string;
                                };
                                mobile?: string;
                                custom_employee_id?: string;
                                avatar_key?: string;
                                email?: string;
                                gender?: number;
                                department_ids?: Array<string>;
                                leader_id?: string;
                                dotted_line_leader_ids?: Array<string>;
                                work_country_or_region?: string;
                                work_place_id?: string;
                                work_station?: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                                job_number?: string;
                                join_date?: string;
                                employment_type?: number;
                                positions?: Array<{
                                    position_code: string;
                                    position_name: string;
                                    leader_id?: string;
                                    leader_position_code?: string;
                                    is_main_position: boolean;
                                    department_id: string;
                                }>;
                                job_title_id?: string;
                                job_level_id?: string;
                                job_family_id?: string;
                                resign_date: string;
                            };
                            options?: { geo_name?: string };
                        };
                        params?: {
                            tenant_id?: string;
                            employee_id_type?:
                                | "open_id"
                                | "employee_id"
                                | "union_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            is_admin_role?: boolean;
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
                                data?: { employee_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/employees/create_resigned`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=employee&version=v1 document }
                 *
                 * 创建员工
                 *
                 * 本接口用于在企业下创建员工。支持传入姓名、手机号等信息，生成在职状态的员工对象。;员工指飞书企业内身份为「Employee」的成员，等同于通讯录OpenAPI中的「User」。
                 *
                 * 注意：;- 只能在当前应用的通讯录授权范围内的部门下创建员工，如果要在根部门下创建员工，必须拥有全员权限。可以在开发者后台-应用详情-权限管理中查看通讯录授权范围。;- 本接口中支持的user_access_token 默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可创建员工时，管理员管理范围取最大集。管理员权限可查看帮助中心文档：[管理员创建管理员角色及分配权限](https://www.feishu.cn/hc/zh-CN/articles/360043495213-%E7%AE%A1%E7%90%86%E5%91%98%E5%88%9B%E5%BB%BA%E7%AE%A1%E7%90%86%E5%91%98%E8%A7%92%E8%89%B2%E5%8F%8A%E5%88%86%E9%85%8D%E6%9D%83%E9%99%90#tabs0|lineguid-dU31C);- 拥有本接口权限后，即可写入员工信息。但创建员工后仅返回应用有权限的字段数据，如果需要指定字段请按照文档中的描述申请对应权限。;- 本接口仅对自建应用开放。;- 创建出来的是在职状态的员工。;- 创建员工后，会发送邀请短信/邮件，需被邀请人点击同意后才可加入企业。
                 */
                create: async (
                    payload?: {
                        data: {
                            employee: {
                                name?: {
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
                                    name: {
                                        default_value: string;
                                        i18n_value?: Record<string, string>;
                                        default_locale?: string;
                                    };
                                    another_name?: string;
                                };
                                mobile?: string;
                                custom_employee_id?: string;
                                avatar_key?: string;
                                email?: string;
                                enterprise_email?: string;
                                gender?: number;
                                employee_order_in_departments?: Array<{
                                    department_id?: string;
                                    order_weight_in_deparment?: string;
                                    order_weight_among_deparments?: string;
                                    is_main_department?: boolean;
                                }>;
                                leader_id?: string;
                                dotted_line_leader_ids?: Array<string>;
                                work_country_or_region?: string;
                                work_place_id?: string;
                                work_station?: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                                job_number?: string;
                                extension_number?: string;
                                join_date?: string;
                                employment_type?: number;
                                positions?: Array<{
                                    position_code: string;
                                    position_name: string;
                                    leader_id?: string;
                                    leader_position_code?: string;
                                    is_main_position: boolean;
                                    department_id: string;
                                }>;
                                job_title_id?: string;
                                custom_field_values?: Array<{
                                    field_type?:
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "9"
                                        | "10"
                                        | "11";
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
                                    phone_value?: {
                                        phone_number: string;
                                        extension_number?: string;
                                    };
                                    field_key?: string;
                                }>;
                                virtual_org_infos?: Array<{
                                    id: string;
                                    employee_order_in_departments?: Array<{
                                        department_id?: string;
                                        order_weight_in_deparment?: string;
                                        order_weight_among_deparments?: string;
                                        is_main_department?: boolean;
                                    }>;
                                    leaders?: Array<string>;
                                }>;
                            };
                            options?: {
                                geo_name?: string;
                                subscription_ids?: Array<string>;
                                need_send_notification?: {
                                    need_send_notification?: boolean;
                                    language?: number;
                                };
                            };
                        };
                        params?: {
                            employee_id_type?:
                                | "open_id"
                                | "employee_id"
                                | "union_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            is_admin_role?: boolean;
                            tenant_id?: string;
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
                                data?: { employee_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/employees`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=employee&version=v1 document }
                 *
                 * 更新员工信息
                 *
                 * 本接口用于更新在职/离职员工的信息、冻结/恢复员工。未传递的参数不会进行更新。;员工指飞书企业内身份为「Employee」的成员，等同于通讯录OpenAPI中的「User」。
                 *
                 * - 员工状态的修改遵循生命周期流转的规则，具体规则详见 [Directory-员工管理-资源介绍](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/resources-introduction) 。;- 本接口支持tenant_access_token和user_access_token，接口获取方式参考[获取访问凭证](https://open.feishu.cn/document/ukTMukTMukTM/uMTNz4yM1MjLzUzM);。; - 使用tenant_access_token时，只能在当前应用的通讯录授权范围内更新员工信息。可在开发者后台 > 权限管理 > 通讯录权限 中查看。; - 当变更员工的部门信息时，应用需要有变更前后的部门权限，才能变更成功。; - 使用user_access_token 时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可更新员工信息时，管理员管理范围取最大集。管理员权限可查看帮助中心文档：[管理员创建管理员角色及分配权限](https://www.feishu.cn/hc/zh-CN/articles/360043495213-%E7%AE%A1%E7%90%86%E5%91%98%E5%88%9B%E5%BB%BA%E7%AE%A1%E7%90%86%E5%91%98%E8%A7%92%E8%89%B2%E5%8F%8A%E5%88%86%E9%85%8D%E6%9D%83%E9%99%90#tabs0|lineguid-dU31C);- 变更「未加入」、「未激活」状态的员工的联系手机号、工作邮箱，会修改员工的登录凭证，并将员工重置为「未加入」状态，并发送邀请短信/邮件。其他状态的员工修改联系方式不影响登录凭证。;- 修改员工ID（employee_id）需要悉知以下影响：; - 员工ID（employee_id）是员工在企业内的唯一ID，可能会被应用引用来实现各种内部逻辑，唯一ID修改之后可能会导致引用失败，导致所有引用且保存了‘被修改 ID 员工’的业务全部受影响。;- 更新离职状态的员工信息时，以下字段不可更新：; - email、mobile、department_ids、leader_id、is_frozen、work_city_id
                 */
                patch: async (
                    payload?: {
                        data: {
                            employee: {
                                name?: {
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
                                    name: {
                                        default_value: string;
                                        i18n_value?: Record<string, string>;
                                        default_locale?: string;
                                    };
                                    another_name?: string;
                                };
                                mobile?: string;
                                custom_employee_id?: string;
                                avatar_key?: string;
                                email?: string;
                                enterprise_email?: string;
                                gender?: number;
                                employee_order_in_departments?: Array<{
                                    department_id?: string;
                                    order_weight_in_deparment?: string;
                                    order_weight_among_deparments?: string;
                                    is_main_department?: boolean;
                                }>;
                                background_image_key?: string;
                                description?: string;
                                leader_id?: string;
                                dotted_line_leader_ids?: Array<string>;
                                work_country_or_region?: string;
                                work_place_id?: string;
                                work_station?: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                                job_number?: string;
                                extension_number?: string;
                                join_date?: string;
                                employment_type?: number;
                                positions?: Array<{
                                    position_code: string;
                                    position_name: string;
                                    leader_id?: string;
                                    leader_position_code?: string;
                                    is_main_position: boolean;
                                    department_id: string;
                                }>;
                                job_title_id?: string;
                                job_level_id?: string;
                                job_family_id?: string;
                                resign_date?: string;
                                resign_reason?:
                                    | "0"
                                    | "1"
                                    | "2"
                                    | "3"
                                    | "4"
                                    | "5"
                                    | "6"
                                    | "7"
                                    | "8"
                                    | "9"
                                    | "10"
                                    | "11"
                                    | "12"
                                    | "13"
                                    | "14"
                                    | "15"
                                    | "16"
                                    | "17"
                                    | "18"
                                    | "19"
                                    | "20"
                                    | "21"
                                    | "22"
                                    | "23"
                                    | "24"
                                    | "25";
                                resign_remark?: string;
                                resign_type?: "0" | "1" | "2" | "3";
                                is_frozen?: boolean;
                                custom_field_values?: Array<{
                                    field_type?:
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "9"
                                        | "10"
                                        | "11";
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
                                    phone_value?: {
                                        phone_number: string;
                                        extension_number?: string;
                                    };
                                    field_key?: string;
                                }>;
                                virtual_org_infos?: Array<{
                                    id: string;
                                    employee_order_in_departments?: Array<{
                                        department_id?: string;
                                        order_weight_in_deparment?: string;
                                        order_weight_among_deparments?: string;
                                        is_main_department?: boolean;
                                    }>;
                                    leaders?: Array<string>;
                                }>;
                            };
                        };
                        params?: {
                            employee_id_type?:
                                | "open_id"
                                | "union_id"
                                | "employee_id";
                            is_admin_role?: boolean;
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/employees/:employee_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=filter&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=filter&project=directory&resource=employee&version=v1 document }
                 *
                 * 批量获取员工列表
                 *
                 * 本接口用于依据指定条件，批量获取符合条件的员工详情列表。;员工指飞书企业内身份为「Employee」的成员，等同于通讯录OpenAPI中的「User」
                 *
                 * 注意：;- 本接口支持tenant_access_token和user_access_token; - 使用tenant_access_token时，数据权限遵循应用的通讯录权限范围，返回的字段数据为应用有权限的字段。可通过[获取应用通讯录权限范围配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/contacts_range_configuration)确定应用的通讯录权限范围。; - 使用user_access_token时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可查看员工信息时，管理员管理范围取最大集。管理员权限可查看帮助中心文档： [管理员创建管理员角色及分配权限](https://www.feishu.cn/hc/zh-CN/articles/360043495213-%E7%AE%A1%E7%90%86%E5%91%98%E5%88%9B%E5%BB%BA%E7%AE%A1%E7%90%86%E5%91%98%E8%A7%92%E8%89%B2%E5%8F%8A%E5%88%86%E9%85%8D%E6%9D%83%E9%99%90#tabs0|lineguid-dU31C)
                 */
                filter: async (
                    payload?: {
                        data: {
                            filter: {
                                conditions: Array<{
                                    field: string;
                                    operator: string;
                                    value: string;
                                }>;
                            };
                            required_fields: Array<string>;
                            page_request: {
                                page_size?: number;
                                page_token?: string;
                            };
                        };
                        params?: {
                            employee_id_type?:
                                | "open_id"
                                | "union_id"
                                | "employee_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            is_admin_role?: boolean;
                            tenant_id?: string;
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
                                    employees?: Array<{
                                        base_info?: {
                                            employee_id: string;
                                            name: {
                                                last_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                first_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                another_name?: string;
                                            };
                                            mobile?: string;
                                            email?: string;
                                            enterprise_email?: string;
                                            gender?: number;
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
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                enabled_status?: boolean;
                                                order_weight?: string;
                                                custom_field_values?: Array<{
                                                    field_type?:
                                                        | "1"
                                                        | "2"
                                                        | "3"
                                                        | "4"
                                                        | "9"
                                                        | "10"
                                                        | "11";
                                                    text_value?: {
                                                        default_value: string;
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
                                                        default_locale?: string;
                                                    };
                                                    url_value?: {
                                                        link_text: {
                                                            default_value: string;
                                                            i18n_value?: Record<
                                                                string,
                                                                string
                                                            >;
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
                                                    phone_value?: {
                                                        phone_number: string;
                                                        extension_number?: string;
                                                    };
                                                    field_key?: string;
                                                }>;
                                                department_path_infos?: Array<{
                                                    department_id?: string;
                                                    department_name?: {
                                                        default_value: string;
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
                                                        default_locale?: string;
                                                    };
                                                }>;
                                                data_source?: number;
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
                                            is_primary_admin?: boolean;
                                            enterprise_email_aliases?: Array<string>;
                                            custom_field_values?: Array<{
                                                field_type?:
                                                    | "1"
                                                    | "2"
                                                    | "3"
                                                    | "4"
                                                    | "9"
                                                    | "10"
                                                    | "11";
                                                text_value?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                url_value?: {
                                                    link_text: {
                                                        default_value: string;
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
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
                                                phone_value?: {
                                                    phone_number: string;
                                                    extension_number?: string;
                                                };
                                                field_key?: string;
                                            }>;
                                            department_path_infos?: Array<
                                                Array<{
                                                    department_id?: string;
                                                    department_name?: {
                                                        default_value: string;
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
                                                        default_locale?: string;
                                                    };
                                                }>
                                            >;
                                            resign_time?: string;
                                            avatar?: {
                                                avatar_72?: string;
                                                avatar_240?: string;
                                                avatar_640?: string;
                                                avatar_origin?: string;
                                            };
                                            background_image?: string;
                                            is_admin?: boolean;
                                            data_source?: number;
                                            geo_name?: string;
                                            subscription_ids?: Array<number>;
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
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
                                                        default_locale?: string;
                                                    };
                                                    enabled_status?: boolean;
                                                    order_weight?: string;
                                                    custom_field_values?: Array<{
                                                        field_type?:
                                                            | "1"
                                                            | "2"
                                                            | "3"
                                                            | "4"
                                                            | "9"
                                                            | "10"
                                                            | "11";
                                                        text_value?: {
                                                            default_value: string;
                                                            i18n_value?: Record<
                                                                string,
                                                                string
                                                            >;
                                                            default_locale?: string;
                                                        };
                                                        url_value?: {
                                                            link_text: {
                                                                default_value: string;
                                                                i18n_value?: Record<
                                                                    string,
                                                                    string
                                                                >;
                                                                default_locale?: string;
                                                            };
                                                            url: string;
                                                            pcurl: string;
                                                        };
                                                        enum_value?: {
                                                            enum_ids: Array<string>;
                                                            enum_type:
                                                                | "1"
                                                                | "2";
                                                        };
                                                        user_values?: Array<{
                                                            ids: Array<string>;
                                                            user_type: "1";
                                                        }>;
                                                        phone_value?: {
                                                            phone_number: string;
                                                            extension_number?: string;
                                                        };
                                                        field_key?: string;
                                                    }>;
                                                    department_path_infos?: Array<{
                                                        department_id?: string;
                                                        department_name?: {
                                                            default_value: string;
                                                            i18n_value?: Record<
                                                                string,
                                                                string
                                                            >;
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
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
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
                                            work_place?: {
                                                place_id: string;
                                                place_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                is_enabled?: boolean;
                                                description?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                            };
                                            work_station?: {
                                                default_value: string;
                                                i18n_value?: Record<
                                                    string,
                                                    string
                                                >;
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
                                            job_title?: {
                                                job_title_id: string;
                                                job_title_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                is_enabled?: boolean;
                                                description?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                            };
                                            job_level?: {
                                                job_level_id: string;
                                                job_level_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                is_enabled?: boolean;
                                                is_deleted?: boolean;
                                                order?: string;
                                                description?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                            };
                                            job_family?: {
                                                job_family_id: string;
                                                job_family_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                is_enabled?: boolean;
                                                parent_job_family_id?: string;
                                                description?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                            };
                                            resign_date?: string;
                                            resign_reason?: string;
                                            resign_remark?: string;
                                            resign_type?: string;
                                        };
                                    }>;
                                    page_response?: {
                                        has_more?: boolean;
                                        page_token?: string;
                                    };
                                    abnormals?: Array<{
                                        id?: string;
                                        row_error?: number;
                                        field_errors?: Record<string, number>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/employees/filter`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=directory&resource=employee&version=v1 document }
                 *
                 * 搜索员工信息
                 *
                 * 本接口用于搜索员工信息，如通过关键词搜索员工的名称、手机号、邮箱等信息。;员工指飞书企业内身份为「Employee」的成员，等同于通讯录OpenAPI中的「User」。
                 *
                 * 注意：;- 本接口支持tenant_access_token和user_access_token。; - 使用tenant_access_token时，数据权限遵循应用的通讯录权限范围，返回的字段数据为应用有权限的字段。可通过[获取应用通讯录权限范围配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/contacts_range_configuration)确定应用的通讯录权限范围。; - 使用user_access_token时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可查看员工信息时，管理员管理范围取最大集。管理员权限可查看帮助中心文档：[管理员创建管理员角色及分配权限](https://www.feishu.cn/hc/zh-CN/articles/360043495213-%E7%AE%A1%E7%90%86%E5%91%98%E5%88%9B%E5%BB%BA%E7%AE%A1%E7%90%86%E5%91%98%E8%A7%92%E8%89%B2%E5%8F%8A%E5%88%86%E9%85%8D%E6%9D%83%E9%99%90#tabs0|lineguid-dU31C);- 本接口无法搜索到外部企业或已离职的用户。
                 */
                search: async (
                    payload?: {
                        data: {
                            query: string;
                            page_request: {
                                page_size?: number;
                                page_token?: string;
                            };
                            required_fields: Array<string>;
                            filter?: {
                                contain_resigned_employee?: boolean;
                                options?: {
                                    filter_permission_resource: string;
                                    admin_role_permission_type?: string;
                                };
                            };
                        };
                        params?: {
                            employee_id_type?:
                                | "open_id"
                                | "union_id"
                                | "employee_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            is_admin_role?: boolean;
                            tenant_id?: string;
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
                                    employees?: Array<{
                                        base_info?: {
                                            employee_id: string;
                                            name: {
                                                last_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                first_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                another_name?: string;
                                            };
                                            mobile?: string;
                                            email?: string;
                                            enterprise_email?: string;
                                            gender?: number;
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
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                enabled_status?: boolean;
                                                order_weight?: string;
                                                custom_field_values?: Array<{
                                                    field_type?:
                                                        | "1"
                                                        | "2"
                                                        | "3"
                                                        | "4"
                                                        | "9"
                                                        | "10"
                                                        | "11";
                                                    text_value?: {
                                                        default_value: string;
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
                                                        default_locale?: string;
                                                    };
                                                    url_value?: {
                                                        link_text: {
                                                            default_value: string;
                                                            i18n_value?: Record<
                                                                string,
                                                                string
                                                            >;
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
                                                    phone_value?: {
                                                        phone_number: string;
                                                        extension_number?: string;
                                                    };
                                                    field_key?: string;
                                                }>;
                                                department_path_infos?: Array<{
                                                    department_id?: string;
                                                    department_name?: {
                                                        default_value: string;
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
                                                        default_locale?: string;
                                                    };
                                                }>;
                                                data_source?: number;
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
                                            is_primary_admin?: boolean;
                                            enterprise_email_aliases?: Array<string>;
                                            custom_field_values?: Array<{
                                                field_type?:
                                                    | "1"
                                                    | "2"
                                                    | "3"
                                                    | "4"
                                                    | "9"
                                                    | "10"
                                                    | "11";
                                                text_value?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                url_value?: {
                                                    link_text: {
                                                        default_value: string;
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
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
                                                phone_value?: {
                                                    phone_number: string;
                                                    extension_number?: string;
                                                };
                                                field_key?: string;
                                            }>;
                                            department_path_infos?: Array<
                                                Array<{
                                                    department_id?: string;
                                                    department_name?: {
                                                        default_value: string;
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
                                                        default_locale?: string;
                                                    };
                                                }>
                                            >;
                                            resign_time?: string;
                                            avatar?: {
                                                avatar_72?: string;
                                                avatar_240?: string;
                                                avatar_640?: string;
                                                avatar_origin?: string;
                                            };
                                            background_image?: string;
                                            is_admin?: boolean;
                                            data_source?: number;
                                            geo_name?: string;
                                            subscription_ids?: Array<number>;
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
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
                                                        default_locale?: string;
                                                    };
                                                    enabled_status?: boolean;
                                                    order_weight?: string;
                                                    custom_field_values?: Array<{
                                                        field_type?:
                                                            | "1"
                                                            | "2"
                                                            | "3"
                                                            | "4"
                                                            | "9"
                                                            | "10"
                                                            | "11";
                                                        text_value?: {
                                                            default_value: string;
                                                            i18n_value?: Record<
                                                                string,
                                                                string
                                                            >;
                                                            default_locale?: string;
                                                        };
                                                        url_value?: {
                                                            link_text: {
                                                                default_value: string;
                                                                i18n_value?: Record<
                                                                    string,
                                                                    string
                                                                >;
                                                                default_locale?: string;
                                                            };
                                                            url: string;
                                                            pcurl: string;
                                                        };
                                                        enum_value?: {
                                                            enum_ids: Array<string>;
                                                            enum_type:
                                                                | "1"
                                                                | "2";
                                                        };
                                                        user_values?: Array<{
                                                            ids: Array<string>;
                                                            user_type: "1";
                                                        }>;
                                                        phone_value?: {
                                                            phone_number: string;
                                                            extension_number?: string;
                                                        };
                                                        field_key?: string;
                                                    }>;
                                                    department_path_infos?: Array<{
                                                        department_id?: string;
                                                        department_name?: {
                                                            default_value: string;
                                                            i18n_value?: Record<
                                                                string,
                                                                string
                                                            >;
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
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
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
                                            work_place?: {
                                                place_id: string;
                                                place_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                is_enabled?: boolean;
                                                description?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                            };
                                            work_station?: {
                                                default_value: string;
                                                i18n_value?: Record<
                                                    string,
                                                    string
                                                >;
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
                                            job_title?: {
                                                job_title_id: string;
                                                job_title_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                is_enabled?: boolean;
                                                description?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                            };
                                            job_level?: {
                                                job_level_id: string;
                                                job_level_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                is_enabled?: boolean;
                                                is_deleted?: boolean;
                                                order?: string;
                                                description?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                            };
                                            job_family?: {
                                                job_family_id: string;
                                                job_family_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                is_enabled?: boolean;
                                                parent_job_family_id?: string;
                                                description?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                            };
                                            resign_date?: string;
                                            resign_reason?: string;
                                            resign_remark?: string;
                                            resign_type?: string;
                                        };
                                    }>;
                                    page_response?: {
                                        has_more?: boolean;
                                        page_token?: string;
                                    };
                                    abnormals?: Array<{
                                        id?: string;
                                        row_error?: number;
                                        field_errors?: Record<string, number>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/employees/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=mget&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=directory&resource=employee&version=v1 document }
                 *
                 * 批量获取员工信息
                 *
                 * 本接口用于批量根据员工的ID查询员工的详情，比如员工姓名，手机号，邮箱，部门等信息。;员工指飞书企业内身份为「Employee」的成员，等同于通讯录OpenAPI中的「User」
                 *
                 * 注意：;- 本接口支持tenant_access_token和user_access_token。; - 使用tenant_access_token时，数据权限遵循应用的通讯录权限范围，返回的字段数据为应用有权限的字段。可通过[获取应用通讯录权限范围配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/contacts_range_configuration)确定应用的通讯录权限范围。; - 使用user_access_token时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可查看员工信息时，管理员管理范围取最大集。管理员权限可查看帮助中心文档： [管理员创建管理员角色及分配权限](https://www.feishu.cn/hc/zh-CN/articles/360043495213-%E7%AE%A1%E7%90%86%E5%91%98%E5%88%9B%E5%BB%BA%E7%AE%A1%E7%90%86%E5%91%98%E8%A7%92%E8%89%B2%E5%8F%8A%E5%88%86%E9%85%8D%E6%9D%83%E9%99%90#tabs0|lineguid-dU31C)
                 */
                mget: async (
                    payload?: {
                        data: {
                            employee_ids: Array<string>;
                            required_fields: Array<string>;
                        };
                        params: {
                            is_admin_role: boolean;
                            employee_id_type?:
                                | "open_id"
                                | "employee_id"
                                | "union_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                    employees?: Array<{
                                        base_info?: {
                                            employee_id: string;
                                            name: {
                                                last_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                first_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                another_name?: string;
                                            };
                                            mobile?: string;
                                            email?: string;
                                            enterprise_email?: string;
                                            gender?: number;
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
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                enabled_status?: boolean;
                                                order_weight?: string;
                                                custom_field_values?: Array<{
                                                    field_type?:
                                                        | "1"
                                                        | "2"
                                                        | "3"
                                                        | "4"
                                                        | "9"
                                                        | "10"
                                                        | "11";
                                                    text_value?: {
                                                        default_value: string;
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
                                                        default_locale?: string;
                                                    };
                                                    url_value?: {
                                                        link_text: {
                                                            default_value: string;
                                                            i18n_value?: Record<
                                                                string,
                                                                string
                                                            >;
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
                                                    phone_value?: {
                                                        phone_number: string;
                                                        extension_number?: string;
                                                    };
                                                    field_key?: string;
                                                }>;
                                                department_path_infos?: Array<{
                                                    department_id?: string;
                                                    department_name?: {
                                                        default_value: string;
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
                                                        default_locale?: string;
                                                    };
                                                }>;
                                                data_source?: number;
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
                                            is_primary_admin?: boolean;
                                            enterprise_email_aliases?: Array<string>;
                                            custom_field_values?: Array<{
                                                field_type?:
                                                    | "1"
                                                    | "2"
                                                    | "3"
                                                    | "4"
                                                    | "9"
                                                    | "10"
                                                    | "11";
                                                text_value?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                url_value?: {
                                                    link_text: {
                                                        default_value: string;
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
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
                                                phone_value?: {
                                                    phone_number: string;
                                                    extension_number?: string;
                                                };
                                                field_key?: string;
                                            }>;
                                            department_path_infos?: Array<
                                                Array<{
                                                    department_id?: string;
                                                    department_name?: {
                                                        default_value: string;
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
                                                        default_locale?: string;
                                                    };
                                                }>
                                            >;
                                            resign_time?: string;
                                            avatar?: {
                                                avatar_72?: string;
                                                avatar_240?: string;
                                                avatar_640?: string;
                                                avatar_origin?: string;
                                            };
                                            background_image?: string;
                                            is_admin?: boolean;
                                            data_source?: number;
                                            geo_name?: string;
                                            subscription_ids?: Array<number>;
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
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
                                                        default_locale?: string;
                                                    };
                                                    enabled_status?: boolean;
                                                    order_weight?: string;
                                                    custom_field_values?: Array<{
                                                        field_type?:
                                                            | "1"
                                                            | "2"
                                                            | "3"
                                                            | "4"
                                                            | "9"
                                                            | "10"
                                                            | "11";
                                                        text_value?: {
                                                            default_value: string;
                                                            i18n_value?: Record<
                                                                string,
                                                                string
                                                            >;
                                                            default_locale?: string;
                                                        };
                                                        url_value?: {
                                                            link_text: {
                                                                default_value: string;
                                                                i18n_value?: Record<
                                                                    string,
                                                                    string
                                                                >;
                                                                default_locale?: string;
                                                            };
                                                            url: string;
                                                            pcurl: string;
                                                        };
                                                        enum_value?: {
                                                            enum_ids: Array<string>;
                                                            enum_type:
                                                                | "1"
                                                                | "2";
                                                        };
                                                        user_values?: Array<{
                                                            ids: Array<string>;
                                                            user_type: "1";
                                                        }>;
                                                        phone_value?: {
                                                            phone_number: string;
                                                            extension_number?: string;
                                                        };
                                                        field_key?: string;
                                                    }>;
                                                    department_path_infos?: Array<{
                                                        department_id?: string;
                                                        department_name?: {
                                                            default_value: string;
                                                            i18n_value?: Record<
                                                                string,
                                                                string
                                                            >;
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
                                                        i18n_value?: Record<
                                                            string,
                                                            string
                                                        >;
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
                                            work_place?: {
                                                place_id: string;
                                                place_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                is_enabled?: boolean;
                                                description?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                            };
                                            work_station?: {
                                                default_value: string;
                                                i18n_value?: Record<
                                                    string,
                                                    string
                                                >;
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
                                            job_title?: {
                                                job_title_id: string;
                                                job_title_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                is_enabled?: boolean;
                                                description?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                            };
                                            job_level?: {
                                                job_level_id: string;
                                                job_level_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                is_enabled?: boolean;
                                                is_deleted?: boolean;
                                                order?: string;
                                                description?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                            };
                                            job_family?: {
                                                job_family_id: string;
                                                job_family_name?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                                is_enabled?: boolean;
                                                parent_job_family_id?: string;
                                                description?: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
                                                    default_locale?: string;
                                                };
                                            };
                                            resign_date?: string;
                                            resign_reason?: string;
                                            resign_remark?: string;
                                            resign_type?: string;
                                        };
                                    }>;
                                    abnormals?: Array<{
                                        id?: string;
                                        row_error?: number;
                                        field_errors?: Record<string, number>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/employees/mget`,
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
             * user
             */
            user: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=user&apiName=m_get_user_entity&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=m_get_user_entity&project=directory&resource=user&version=v1 document }
                 *
                 * 批量获取用户数据 1p=3p接口
                 */
                mGetUserEntity: async (
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
                                `${this.domain}/open-apis/directory/v1/user/m_get_user_entity`,
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
             * bank_account
             */
            bankAccount: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=bank_account&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=bank_account&version=v1 document }
                 *
                 * 删除雇员银行账户信息
                 */
                delete: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/bank_account`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=bank_account&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=bank_account&version=v1 document }
                 *
                 * 创建雇员银行账户信息
                 */
                create: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/bank_account`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=bank_account&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=bank_account&version=v1 document }
                 *
                 * 更新雇员银行账户信息
                 */
                patch: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/bank_account`,
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
             * certificate
             */
            certificate: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=certificate&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=certificate&version=v1 document }
                 *
                 * 创建雇员证件信息
                 */
                create: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/certificate`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=certificate&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=certificate&version=v1 document }
                 *
                 * 更新雇员证件信息
                 */
                patch: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/certificate`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=certificate&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=certificate&version=v1 document }
                 *
                 * 删除雇员证件信息
                 */
                delete: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/certificate`,
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
             * department
             */
            department: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=department&apiName=m_get_department_children&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=m_get_department_children&project=directory&resource=department&version=v1 document }
                 *
                 * 批量获取部门的子部门列表
                 */
                mGetDepartmentChildren: async (
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
                                `${this.domain}/open-apis/directory`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=department&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=department&version=v1 document }
                 *
                 * 创建部门
                 *
                 * 本接口用于用于在企业通讯录中创建新部门，支持设置部门名称、父部门、负责人等信息。
                 *
                 * 注意：;- 只能在当前应用的通讯录授权范围内的部门下创建部门，如果要在根部门下创建子部门，必须拥有全员权限。可以在 开发者后台-应用详情-权限管理中 查看通讯录授权范围。;- 本接口中支持的user_access_token 默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可创建部门时，管理员管理范围取最大集。管理员权限可查看帮助中心文档：[管理员创建管理员角色及分配权限](https://www.feishu.cn/hc/zh-CN/articles/360043495213-%E7%AE%A1%E7%90%86%E5%91%98%E5%88%9B%E5%BB%BA%E7%AE%A1%E7%90%86%E5%91%98%E8%A7%92%E8%89%B2%E5%8F%8A%E5%88%86%E9%85%8D%E6%9D%83%E9%99%90#tabs0|lineguid-dU31C);- 拥有本接口权限后，即可写入部门信息。但创建部门后仅返回应用有权限的字段数据，如果需要指定字段请按照文档中的描述申请对应权限。;- 本接口仅对自建应用开放。
                 */
                create: async (
                    payload?: {
                        data: {
                            department: {
                                custom_department_id?: string;
                                name?: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                                parent_department_id?: string;
                                leaders?: Array<{
                                    leader_type: number;
                                    leader_id: string;
                                }>;
                                order_weight?: string;
                                enabled_status?: boolean;
                                custom_field_values?: Array<{
                                    field_type?:
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "9"
                                        | "10"
                                        | "11";
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
                                    phone_value?: {
                                        phone_number: string;
                                        extension_number?: string;
                                    };
                                    field_key?: string;
                                }>;
                                org_dimension?: string;
                            };
                        };
                        params?: {
                            employee_id_type?:
                                | "open_id"
                                | "union_id"
                                | "employee_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            is_admin_role?: boolean;
                            tenant_id?: string;
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
                                data?: { department_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/departments`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=department&apiName=idconvert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=idconvert&project=directory&resource=department&version=v1 document }
                 */
                idconvert: async (
                    payload?: {
                        data: { department_ids: Array<string> };
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                    id_convert_results?: Array<{
                                        id: string;
                                        department_id?: string;
                                        open_department_id?: string;
                                    }>;
                                    abnormals?: Array<{
                                        id?: string;
                                        row_error?: number;
                                        field_errors?: Record<string, number>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/departments/idconvert`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=department&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=department&version=v1 document }
                 *
                 * 删除部门
                 *
                 * 本接口用于删除部门。
                 *
                 * 注意：;- 删除部门需要有待删除部门及其父部门的应用数据权限[配置应用数据权限](https://open.feishu.cn/document/home/introduction-to-scope-and-authorization/configure-app-data-permissions)
                 */
                delete: async (
                    payload?: {
                        params?: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            is_admin_role?: boolean;
                            employee_id_type?:
                                | "open_id"
                                | "employee_id"
                                | "union_id";
                        };
                        path: { department_id: string };
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
                                `${this.domain}/open-apis/directory/v1/departments/:department_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=department&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=directory&resource=department&version=v1 document }
                 *
                 * 搜索部门
                 *
                 * 本接口用于搜索部门信息，通过部门名称等关键词搜索部门信息，返回符合条件的部门列表。
                 *
                 * 注意：;- 本接口支持tenant_access_token和user_access_token。; - 使用tenant_access_token时，数据权限遵循应用的通讯录权限范围，返回的字段数据为应用有权限的字段。**考虑到数据安全仅返回最多前100条匹配项**，若需精准结果需要更准确的输入。; - 使用user_access_token时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可查看员工信息时，管理员管理范围取最大集。
                 */
                search: async (
                    payload?: {
                        data: {
                            query: string;
                            page_request: {
                                page_size?: number;
                                page_token?: string;
                            };
                            required_fields: Array<string>;
                            filter?: {
                                exactly_match_by_name?: boolean;
                                options?: {
                                    filter_permission_resource: string;
                                    admin_role_permission_type?: string;
                                };
                            };
                        };
                        params?: {
                            employee_id_type?:
                                | "open_id"
                                | "employee_id"
                                | "union_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            is_admin_role?: boolean;
                            tenant_id?: string;
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
                                            field_type?:
                                                | "1"
                                                | "2"
                                                | "3"
                                                | "4"
                                                | "9"
                                                | "10"
                                                | "11";
                                            text_value?: {
                                                default_value: string;
                                                i18n_value?: Record<
                                                    string,
                                                    string
                                                >;
                                                default_locale?: string;
                                            };
                                            url_value?: {
                                                link_text: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
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
                                            phone_value?: {
                                                phone_number: string;
                                                extension_number?: string;
                                            };
                                            field_key?: string;
                                        }>;
                                        department_path_infos?: Array<{
                                            department_id?: string;
                                            department_name?: {
                                                default_value: string;
                                                i18n_value?: Record<
                                                    string,
                                                    string
                                                >;
                                                default_locale?: string;
                                            };
                                        }>;
                                        data_source?: number;
                                        org_dimension?: string;
                                    }>;
                                    page_response?: {
                                        has_more?: boolean;
                                        page_token?: string;
                                    };
                                    abnormals?: Array<{
                                        id?: string;
                                        row_error?: number;
                                        field_errors?: Record<string, number>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/departments/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=department&apiName=mget&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=directory&resource=department&version=v1 document }
                 *
                 * 批量获取部门信息
                 *
                 * 该接口支持传入多个部门ID，返回每个部门的详细信息（如名称、负责人、子部门等）。
                 *
                 * **注意**：;- 本接口支持tenant_access_token和user_access_token。; - 使用tenant_access_token时，数据权限遵循应用的通讯录权限范围，返回的字段数据为应用有权限的字段。可通过[获取应用通讯录权限范围配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/contacts_range_configuration)确定应用的通讯录权限范围。; - 使用user_access_token时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可查看部门信息时，管理员管理范围取最大集。管理员权限可查看帮助中心文档： [管理员创建管理员角色及分配权限](https://www.feishu.cn/hc/zh-CN/articles/360043495213-%E7%AE%A1%E7%90%86%E5%91%98%E5%88%9B%E5%BB%BA%E7%AE%A1%E7%90%86%E5%91%98%E8%A7%92%E8%89%B2%E5%8F%8A%E5%88%86%E9%85%8D%E6%9D%83%E9%99%90#tabs0|lineguid-dU31C);- 为增强飞书组织架构 OpenAPI 的灵活性，于 **2024 年 10 月 21 日**对该 API 接口做出了更新升级，升级内容包括：优化查询已删除部门信息的返回数据结构。; - 升级前，查询已删除部门的信息时，不会返回部门负责人信息；升级后，查询已删除部门的信息时，返回数据中将包括部门负责人信息。
                 */
                mget: async (
                    payload?: {
                        data: {
                            department_ids: Array<string>;
                            required_fields: Array<string>;
                        };
                        params?: {
                            employee_id_type?:
                                | "open_id"
                                | "employee_id"
                                | "union_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            is_admin_role?: boolean;
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
                                            field_type?:
                                                | "1"
                                                | "2"
                                                | "3"
                                                | "4"
                                                | "9"
                                                | "10"
                                                | "11";
                                            text_value?: {
                                                default_value: string;
                                                i18n_value?: Record<
                                                    string,
                                                    string
                                                >;
                                                default_locale?: string;
                                            };
                                            url_value?: {
                                                link_text: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
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
                                            phone_value?: {
                                                phone_number: string;
                                                extension_number?: string;
                                            };
                                            field_key?: string;
                                        }>;
                                        department_path_infos?: Array<{
                                            department_id?: string;
                                            department_name?: {
                                                default_value: string;
                                                i18n_value?: Record<
                                                    string,
                                                    string
                                                >;
                                                default_locale?: string;
                                            };
                                        }>;
                                        data_source?: number;
                                        org_dimension?: string;
                                    }>;
                                    abnormals?: Array<{
                                        id?: string;
                                        row_error?: number;
                                        field_errors?: Record<string, number>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/departments/mget`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=department&apiName=chat&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=chat&project=directory&resource=department&version=v1 document }
                 *
                 * 创建部门群或将已有群绑定为部门群
                 */
                chat: async (
                    payload?: {
                        data?: {
                            chat_id?: string;
                            owner_id?: string;
                            chat_name?: string;
                            group_chat_employee_types?: Array<number>;
                        };
                        params?: {
                            employee_id_type?:
                                | "open_id"
                                | "union_id"
                                | "employee_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            is_admin_role?: boolean;
                        };
                        path: { department_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { chat_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/departments/:department_id/chat`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=department&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=department&version=v1 document }
                 *
                 * 更新部门
                 *
                 * 本接口用于更新部门信息。仅更新显式传参的部分。
                 */
                patch: async (
                    payload?: {
                        data: {
                            department: {
                                custom_department_id?: string;
                                name?: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                                parent_department_id?: string;
                                leaders?: Array<{
                                    leader_type: number;
                                    leader_id: string;
                                }>;
                                order_weight?: string;
                                description?: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                                enabled_status?: boolean;
                                custom_field_values?: Array<{
                                    field_type?:
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "9"
                                        | "10"
                                        | "11";
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
                                    phone_value?: {
                                        phone_number: string;
                                        extension_number?: string;
                                    };
                                    field_key?: string;
                                }>;
                            };
                        };
                        params?: {
                            employee_id_type?:
                                | "open_id"
                                | "union_id"
                                | "employee_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            is_admin_role?: boolean;
                        };
                        path: { department_id: string };
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
                                `${this.domain}/open-apis/directory/v1/departments/:department_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=department&apiName=filter&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=filter&project=directory&resource=department&version=v1 document }
                 *
                 * 获取部门列表
                 *
                 * 本接口用于依据指定条件，批量获取符合条件的部门详情列表。
                 *
                 * 注意：;- 本接口支持tenant_access_token和user_access_token。; - 使用tenant_access_token时，数据权限遵循应用的通讯录权限范围，返回的字段数据为应用有权限的字段。可以在开发者后台-应用详情-权限管理中查看通讯录授权范围。; - 使用user_access_token时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可查看部门信息时，管理员管理范围取最大集。管理员权限可查看帮助中心文档： [管理员创建管理员角色及分配权限](https://www.feishu.cn/hc/zh-CN/articles/360043495213-%E7%AE%A1%E7%90%86%E5%91%98%E5%88%9B%E5%BB%BA%E7%AE%A1%E7%90%86%E5%91%98%E8%A7%92%E8%89%B2%E5%8F%8A%E5%88%86%E9%85%8D%E6%9D%83%E9%99%90#tabs0|lineguid-dU31C)
                 */
                filter: async (
                    payload?: {
                        data: {
                            filter: {
                                conditions: Array<{
                                    field: string;
                                    operator: string;
                                    value: string;
                                }>;
                            };
                            required_fields: Array<string>;
                            page_request: {
                                page_size?: number;
                                page_token?: string;
                            };
                        };
                        params?: {
                            employee_id_type?:
                                | "open_id"
                                | "employee_id"
                                | "union_id";
                            department_id_type?:
                                | "open_department_id"
                                | "department_id";
                            is_admin_role?: boolean;
                            tenant_id?: string;
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
                                            field_type?:
                                                | "1"
                                                | "2"
                                                | "3"
                                                | "4"
                                                | "9"
                                                | "10"
                                                | "11";
                                            text_value?: {
                                                default_value: string;
                                                i18n_value?: Record<
                                                    string,
                                                    string
                                                >;
                                                default_locale?: string;
                                            };
                                            url_value?: {
                                                link_text: {
                                                    default_value: string;
                                                    i18n_value?: Record<
                                                        string,
                                                        string
                                                    >;
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
                                            phone_value?: {
                                                phone_number: string;
                                                extension_number?: string;
                                            };
                                            field_key?: string;
                                        }>;
                                        department_path_infos?: Array<{
                                            department_id?: string;
                                            department_name?: {
                                                default_value: string;
                                                i18n_value?: Record<
                                                    string,
                                                    string
                                                >;
                                                default_locale?: string;
                                            };
                                        }>;
                                        data_source?: number;
                                        org_dimension?: string;
                                    }>;
                                    page_response?: {
                                        has_more?: boolean;
                                        page_token?: string;
                                    };
                                    abnormals?: Array<{
                                        id?: string;
                                        row_error?: number;
                                        field_errors?: Record<string, number>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/departments/filter`,
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
             * job_family
             */
            jobFamily: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=job_family&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=job_family&version=v1 document }
                 *
                 * ---------------- JobFamily ----------------\n创建序列
                 */
                create: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/job_family`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=job_family&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=job_family&version=v1 document }
                 *
                 * 更新序列
                 */
                patch: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/job_family`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=job_family&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=job_family&version=v1 document }
                 *
                 * 删除序列
                 */
                delete: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/job_family`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=job_family&apiName=m_get_job_family&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=m_get_job_family&project=directory&resource=job_family&version=v1 document }
                 *
                 * 批量按ID查询序列
                 */
                mGetJobFamily: async (
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
                                `${this.domain}/open-apis/directory/v1/job_family/m_get_job_family`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=job_family&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=directory&resource=job_family&version=v1 document }
                 *
                 * 批量查询序列
                 */
                list: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory`,
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
             * job_title
             */
            jobTitle: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=job_title&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=job_title&version=v1 document }
                 *
                 * ---------------- JobTitle ----------------\n创建职务
                 */
                create: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/job_title`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=job_title&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=directory&resource=job_title&version=v1 document }
                 *
                 * 更新职务
                 */
                get: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/job_title`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=job_title&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=job_title&version=v1 document }
                 *
                 * 删除职务
                 */
                delete: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/job_title`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=job_title&apiName=m_get_job_title&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=m_get_job_title&project=directory&resource=job_title&version=v1 document }
                 *
                 * 批量按ID查询职务
                 */
                mGetJobTitle: async (
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
                                `${this.domain}/open-apis/directory/v1/job_title/m_get_job_title`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=job_title&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=directory&resource=job_title&version=v1 document }
                 *
                 * 批量查询职务
                 */
                list: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory`,
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
             * job_level
             */
            jobLevel: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=job_level&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=job_level&version=v1 document }
                 *
                 * ---------------- JobLevel ----------------\n创建职级
                 */
                create: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/job_level`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=job_level&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=job_level&version=v1 document }
                 *
                 * 更新职级
                 */
                patch: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/job_level`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=job_level&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=job_level&version=v1 document }
                 *
                 * 删除职级
                 */
                delete: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/job_level`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=job_level&apiName=m_get_job_level&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=m_get_job_level&project=directory&resource=job_level&version=v1 document }
                 *
                 * 批量按ID查询职级
                 */
                mGetJobLevel: async (
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
                                `${this.domain}/open-apis/directory/v1/job_level/m_get_job_level`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=job_level&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=directory&resource=job_level&version=v1 document }
                 *
                 * 批量查询
                 */
                list: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory`,
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
             * place
             */
            place: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=place&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=place&version=v1 document }
                 *
                 * ---------------- Place ----------------\n创建地点
                 */
                create: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/place`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=place&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=place&version=v1 document }
                 *
                 * 更新地点
                 */
                patch: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/place`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=place&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=place&version=v1 document }
                 *
                 * 删除地点
                 */
                delete: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/place`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=place&apiName=m_get_place&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=m_get_place&project=directory&resource=place&version=v1 document }
                 *
                 * 批量按ID查询地点
                 */
                mGetPlace: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/place/m_get_place`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=place&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=directory&resource=place&version=v1 document }
                 *
                 * 批量查询
                 */
                get: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/place`,
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
             * address
             */
            address: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=address&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=address&version=v1 document }
                 *
                 * ---------------- Address ----------------\n创建地址
                 */
                create: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/address`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=address&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=address&version=v1 document }
                 *
                 * 更新地址
                 */
                patch: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/address`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=address&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=address&version=v1 document }
                 *
                 * 删除地址
                 */
                delete: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/address`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=address&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=directory&resource=address&version=v1 document }
                 *
                 * 批量查询地址
                 */
                list: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=address&apiName=m_get_address&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=m_get_address&project=directory&resource=address&version=v1 document }
                 *
                 * 批量按ID查询地址
                 */
                mGetAddress: async (
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
                                `${this.domain}/open-apis/directory/v1/address/m_get_address`,
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
             * contract_company
             */
            contractCompany: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=contract_company&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=contract_company&version=v1 document }
                 *
                 * 更新公司
                 */
                patch: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/contract_company`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=contract_company&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=contract_company&version=v1 document }
                 *
                 * 删除公司
                 */
                delete: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/contract_company`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=contract_company&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=contract_company&version=v1 document }
                 *
                 * ---------------- Company ----------------\n创建公司
                 */
                create: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/contract_company`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=contract_company&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=directory&resource=contract_company&version=v1 document }
                 *
                 * 批量查询
                 */
                list: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=contract_company&apiName=m_get_company&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=m_get_company&project=directory&resource=contract_company&version=v1 document }
                 *
                 * 批量按ID查询公司
                 */
                mGetCompany: async (
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
                                `${this.domain}/open-apis/directory/v1/contract_company/m_get_company`,
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
             * guest
             */
            guest: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=guest&apiName=m_get_guest&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=m_get_guest&project=directory&resource=guest&version=v1 document }
                 *
                 * 批量按ID查询访客
                 */
                mGetGuest: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/guest/m_get_guest`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=guest&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=directory&resource=guest&version=v1 document }
                 *
                 * 批量查询访客
                 */
                list: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=guest&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=guest&version=v1 document }
                 *
                 * 更新访客
                 */
                patch: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/guest`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=guest&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=guest&version=v1 document }
                 *
                 * ---------------- Guest ----------------\n创建访客
                 */
                create: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/guest`,
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
             * tenant
             */
            tenant: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=tenant&apiName=m_get_tenant&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=m_get_tenant&project=directory&resource=tenant&version=v1 document }
                 *
                 * 根据ID查询租户
                 */
                mGetTenant: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/tenant/m_get_tenant`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=tenant&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=tenant&version=v1 document }
                 *
                 * ---------------- Tenant ----------------\n创建租户
                 */
                create: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/tenant`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=tenant&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=tenant&version=v1 document }
                 *
                 * 更新租户
                 */
                patch: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/tenant`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=tenant&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=tenant&version=v1 document }
                 *
                 * 解散租户
                 */
                delete: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/tenant`,
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
             * custom_field
             */
            customField: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=custom_field&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=directory&resource=custom_field&version=v1 document }
                 *
                 * 查询租户内自定义字段
                 */
                list: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=custom_field&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=custom_field&version=v1 document }
                 *
                 * ------------------ CustomField --------------\n创建租户内自定义字段
                 */
                create: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/custom_field`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=custom_field&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=custom_field&version=v1 document }
                 *
                 * 删除租户内自定义字段
                 */
                delete: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/custom_field`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=custom_field&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=custom_field&version=v1 document }
                 *
                 * 更新租户内自定义字段
                 */
                patch: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/custom_field`,
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
             * employee_type_enum
             */
            employeeTypeEnum: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee_type_enum&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=employee_type_enum&version=v1 document }
                 *
                 * ------------------ EmployeeTypeEnum --------------\n创建人员类型枚举
                 */
                create: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/employee_type_enum`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee_type_enum&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=employee_type_enum&version=v1 document }
                 *
                 * 更新人员类型枚举
                 */
                patch: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/employee_type_enum`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee_type_enum&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=directory&resource=employee_type_enum&version=v1 document }
                 *
                 * 查询人员类型枚举列表
                 */
                list: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee_type_enum&apiName=m_get_employee_type_enum&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=m_get_employee_type_enum&project=directory&resource=employee_type_enum&version=v1 document }
                 *
                 * 根据EnumID查询人员类型枚举
                 */
                mGetEmployeeTypeEnum: async (
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
                                `${this.domain}/open-apis/directory/v1/employee_type_enum/m_get_employee_type_enum`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee_type_enum&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=employee_type_enum&version=v1 document }
                 *
                 * 删除人员类型枚举
                 */
                delete: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/employee_type_enum`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee_type_enum&apiName=replace_tenant_employee_type_enum&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=replace_tenant_employee_type_enum&project=directory&resource=employee_type_enum&version=v1 document }
                 *
                 * 覆盖租户下的人员类型枚举
                 */
                replaceTenantEmployeeTypeEnum: async (
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
                                `${this.domain}/open-apis/directory/v1/employee_type_enum/replace_tenant_employee_type_enum`,
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
             * group_set
             */
            groupSet: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=group_set&apiName=m_get_group_set_id_by_external_id&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=m_get_group_set_id_by_external_id&project=directory&resource=group_set&version=v1 document }
                 *
                 * 使用圈人组分组的 ExternalID 查询圈人组分组 ID
                 */
                mGetGroupSetIdByExternalId: async (
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
                                `${this.domain}/open-apis/directory`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=group_set&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=group_set&version=v1 document }
                 *
                 * 创建用户组分组
                 */
                create: async (
                    payload?: {
                        data: {
                            group_set: {
                                external_id?: string;
                                name: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                                type: number;
                            };
                        };
                        params?: {
                            group_set_id_type?: string;
                            default_tenant_id?: string;
                            default_namespace?: string;
                            default_source?: number;
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
                                data?: { group_set_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/group_sets`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=group_set&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=group_set&version=v1 document }
                 *
                 * 删除用户组分组
                 */
                delete: async (
                    payload?: {
                        params?: {
                            group_set_id_type?: string;
                            default_tenant_id?: string;
                        };
                        path: { group_set_id: string };
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
                                `${this.domain}/open-apis/directory/v1/group_sets/:group_set_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=group_set&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=group_set&version=v1 document }
                 *
                 * 更新用户组分组信息
                 */
                patch: async (
                    payload?: {
                        data: {
                            group_set: {
                                name?: {
                                    default_value: string;
                                    i18n_value?: Record<string, string>;
                                    default_locale?: string;
                                };
                            };
                        };
                        params?: {
                            group_set_id_type?: string;
                            default_tenant_id?: string;
                        };
                        path: { group_set_id: string };
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
                                `${this.domain}/open-apis/directory/v1/group_sets/:group_set_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=group_set&apiName=mget&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=directory&resource=group_set&version=v1 document }
                 *
                 * 查询分组数据
                 */
                mget: async (
                    payload?: {
                        data: {
                            group_set_ids: Array<string>;
                            required_fields: Array<string>;
                        };
                        params?: {
                            group_set_id_type?: string;
                            default_tenant_id?: string;
                            default_namespace?: string;
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
                                    group_sets?: Array<{
                                        id?: string;
                                        name?: {
                                            default_value: string;
                                            i18n_value?: Record<string, string>;
                                            default_locale?: string;
                                        };
                                        type?: number;
                                        group_count?: number;
                                    }>;
                                    abnormals?: Array<{
                                        id?: string;
                                        row_error?: number;
                                        field_errors?: Record<string, number>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/group_sets/mget`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=group_set&apiName=filter&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=filter&project=directory&resource=group_set&version=v1 document }
                 *
                 * 查看用户组分组列表
                 */
                filter: async (
                    payload?: {
                        data: {
                            page_request: {
                                page_size?: number;
                                page_token?: string;
                            };
                            required_fields: Array<string>;
                            filter: {
                                conditions: Array<{
                                    field: string;
                                    operator: string;
                                    value: string;
                                }>;
                            };
                        };
                        params?: {
                            group_set_id_type?: string;
                            default_tenant_id?: string;
                            default_namespace?: string;
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
                                    group_sets?: Array<{
                                        id?: string;
                                        name?: {
                                            default_value: string;
                                            i18n_value?: Record<string, string>;
                                            default_locale?: string;
                                        };
                                        type?: number;
                                        group_count?: number;
                                    }>;
                                    abnormals?: Array<{
                                        id?: string;
                                        row_error?: number;
                                        field_errors?: Record<string, number>;
                                    }>;
                                    page_response?: {
                                        has_more?: boolean;
                                        page_token?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/group_sets/filter`,
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
             * group_set_member
             */
            groupSetMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=group_set_member&apiName=patch_group_set_member&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch_group_set_member&project=directory&resource=group_set_member&version=v1 document }
                 *
                 * 修改用户组所属的用户组分组
                 */
                patchGroupSetMember: async (
                    payload?: {
                        data?: {
                            add_members?: Array<{
                                group_set_id?: string;
                                group_id?: string;
                            }>;
                            delete_members?: Array<{
                                group_set_id?: string;
                                group_id?: string;
                            }>;
                        };
                        params?: {
                            group_id_type?: string;
                            group_set_id_type?: string;
                            default_tenant_id?: string;
                            default_namespace?: string;
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
                                `${this.domain}/open-apis/directory/v1/group_set_members/patch_group_set_member`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=group_set_member&apiName=filter&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=filter&project=directory&resource=group_set_member&version=v1 document }
                 *
                 * 查询用户组分组下的用户组
                 */
                filter: async (
                    payload?: {
                        data: {
                            page_request?: {
                                page_size?: number;
                                page_token?: string;
                            };
                            group_set_id: string;
                        };
                        params?: {
                            group_id_type?: string;
                            group_set_id_type?: string;
                            default_tenant_id?: string;
                            default_namespace?: string;
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
                                    group_set_members?: Array<{
                                        group_set_id?: string;
                                        group_id?: string;
                                    }>;
                                    page_response?: {
                                        has_more?: boolean;
                                        page_token?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/group_set_members/filter`,
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
             * collaboration_tenant
             */
            collaborationTenant: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            tenant_id?: string;
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
                                    `${this.domain}/open-apis/directory/v1/collaboration_tenants`,
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
                                                        tenant_key?: string;
                                                        connect_time?: number;
                                                        avatar?: {
                                                            avatar_72?: string;
                                                            avatar_240?: string;
                                                            avatar_640?: string;
                                                            avatar_origin?: string;
                                                        };
                                                        brand?: string;
                                                        name?: {
                                                            default_value: string;
                                                            i18n_value?: Record<
                                                                string,
                                                                string
                                                            >;
                                                            default_locale?: string;
                                                        };
                                                        short_name?: {
                                                            default_value: string;
                                                            i18n_value?: Record<
                                                                string,
                                                                string
                                                            >;
                                                            default_locale?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=collaboration_tenant&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=directory&resource=collaboration_tenant&version=v1 document }
                 *
                 * 管理员获取所有关联组织列表
                 *
                 * 在创建规则时，需要知道对方组织的tenant key，可通过该接口获取有效的tenant key。只允许关联组织管理员权限调用。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            tenant_id?: string;
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
                                        tenant_key?: string;
                                        connect_time?: number;
                                        avatar?: {
                                            avatar_72?: string;
                                            avatar_240?: string;
                                            avatar_640?: string;
                                            avatar_origin?: string;
                                        };
                                        brand?: string;
                                        name?: {
                                            default_value: string;
                                            i18n_value?: Record<string, string>;
                                            default_locale?: string;
                                        };
                                        short_name?: {
                                            default_value: string;
                                            i18n_value?: Record<string, string>;
                                            default_locale?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/collaboration_tenants`,
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
             * collaboration_rule
             */
            collaborationRule: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=collaboration_rule&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=collaboration_rule&version=v1 document }
                 *
                 * 删除可搜可见规则
                 *
                 * 管理员视角删除可搜可见规则。用户需具备关联组织管理员权限。
                 */
                delete: async (
                    payload?: {
                        params: {
                            target_tenant_key: string;
                            tenant_id?: string;
                        };
                        path: { collaboration_rule_id: string };
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
                                `${this.domain}/open-apis/directory/v1/collaboration_rules/:collaboration_rule_id`,
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
                        params: {
                            page_size?: number;
                            page_token?: string;
                            target_tenant_key: string;
                            tenant_id?: string;
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
                                    `${this.domain}/open-apis/directory/v1/collaboration_rules`,
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
                                                        rule_id?: string;
                                                        subjects?: {
                                                            open_user_ids?: Array<string>;
                                                            open_department_ids?: Array<string>;
                                                            open_group_ids?: Array<string>;
                                                        };
                                                        subject_is_valid?: boolean;
                                                        objects?: {
                                                            open_user_ids?: Array<string>;
                                                            open_department_ids?: Array<string>;
                                                            open_group_ids?: Array<string>;
                                                        };
                                                        object_is_valid?: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=collaboration_rule&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=directory&resource=collaboration_rule&version=v1 document }
                 *
                 * 查询可搜可见规则
                 *
                 * 管理员视角查询可搜可见规则。用户需具备关联组织管理员权限。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            target_tenant_key: string;
                            tenant_id?: string;
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
                                        rule_id?: string;
                                        subjects?: {
                                            open_user_ids?: Array<string>;
                                            open_department_ids?: Array<string>;
                                            open_group_ids?: Array<string>;
                                        };
                                        subject_is_valid?: boolean;
                                        objects?: {
                                            open_user_ids?: Array<string>;
                                            open_department_ids?: Array<string>;
                                            open_group_ids?: Array<string>;
                                        };
                                        object_is_valid?: boolean;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/collaboration_rules`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=collaboration_rule&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=collaboration_rule&version=v1 document }
                 *
                 * 新增可搜可见规则
                 *
                 * 管理员视角新增可搜可见规则。用户需具备关联组织管理员权限。
                 */
                create: async (
                    payload?: {
                        data: {
                            subjects: {
                                open_user_ids?: Array<string>;
                                open_department_ids?: Array<string>;
                                open_group_ids?: Array<string>;
                            };
                            objects: {
                                open_user_ids?: Array<string>;
                                open_department_ids?: Array<string>;
                                open_group_ids?: Array<string>;
                            };
                        };
                        params: {
                            target_tenant_key: string;
                            tenant_id?: string;
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
                                data?: { add_rule_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/collaboration_rules`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=collaboration_rule&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=directory&resource=collaboration_rule&version=v1 document }
                 *
                 * 更新可搜可见规则
                 *
                 * 管理员视角更新可搜可见规则。用户需具备关联组织管理员权限。
                 */
                update: async (
                    payload?: {
                        data: {
                            subjects: {
                                open_user_ids?: Array<string>;
                                open_department_ids?: Array<string>;
                                open_group_ids?: Array<string>;
                            };
                            objects: {
                                open_user_ids?: Array<string>;
                                open_department_ids?: Array<string>;
                                open_group_ids?: Array<string>;
                            };
                        };
                        params: {
                            target_tenant_key: string;
                            tenant_id?: string;
                        };
                        path: { collaboration_rule_id: string };
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
                                `${this.domain}/open-apis/directory/v1/collaboration_rules/:collaboration_rule_id`,
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
             * collboration_share_entity
             */
            collborationShareEntity: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            target_tenant_key: string;
                            target_department_id?: string;
                            target_group_id?: string;
                            is_select_subject?: boolean;
                            page_token?: string;
                            page_size?: number;
                            tenant_id?: string;
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
                                    `${this.domain}/open-apis/directory/v1/share_entities`,
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
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    share_departments?: Array<{
                                                        open_department_id?: string;
                                                        name?: {
                                                            default_value: string;
                                                            i18n_value?: Record<
                                                                string,
                                                                string
                                                            >;
                                                            default_locale?: string;
                                                        };
                                                    }>;
                                                    share_groups?: Array<{
                                                        open_group_id?: string;
                                                        name?: {
                                                            default_value: string;
                                                            i18n_value?: Record<
                                                                string,
                                                                string
                                                            >;
                                                            default_locale?: string;
                                                        };
                                                    }>;
                                                    share_users?: Array<{
                                                        open_user_id?: string;
                                                        name?: {
                                                            default_value: string;
                                                            i18n_value?: Record<
                                                                string,
                                                                string
                                                            >;
                                                            default_locale?: string;
                                                        };
                                                        avatar?: {
                                                            avatar_72?: string;
                                                            avatar_240?: string;
                                                            avatar_640?: string;
                                                            avatar_origin?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=collboration_share_entity&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=directory&resource=collboration_share_entity&version=v1 document }
                 *
                 * 获取关联组织双方共享成员范围
                 *
                 * 在创建规则时，需要获取本组织以及对方组织人员、部门和用户组的ID，且这些实体都应该在关联组织的共享范围内。本接口可获取关联组织双方的共享范围下的人员、部门和用户组。
                 */
                list: async (
                    payload?: {
                        params: {
                            target_tenant_key: string;
                            target_department_id?: string;
                            target_group_id?: string;
                            is_select_subject?: boolean;
                            page_token?: string;
                            page_size?: number;
                            tenant_id?: string;
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
                                    page_token?: string;
                                    has_more?: boolean;
                                    share_departments?: Array<{
                                        open_department_id?: string;
                                        name?: {
                                            default_value: string;
                                            i18n_value?: Record<string, string>;
                                            default_locale?: string;
                                        };
                                    }>;
                                    share_groups?: Array<{
                                        open_group_id?: string;
                                        name?: {
                                            default_value: string;
                                            i18n_value?: Record<string, string>;
                                            default_locale?: string;
                                        };
                                    }>;
                                    share_users?: Array<{
                                        open_user_id?: string;
                                        name?: {
                                            default_value: string;
                                            i18n_value?: Record<string, string>;
                                            default_locale?: string;
                                        };
                                        avatar?: {
                                            avatar_72?: string;
                                            avatar_240?: string;
                                            avatar_640?: string;
                                            avatar_origin?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/share_entities`,
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
             * org_visibility
             */
            orgVisibility: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=org_visibility&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=org_visibility&version=v1 document }
                 *
                 * 批量新增组织架构可见性规则
                 *
                 * 本接口用于批量新增组织架构可见性的补充规则
                 */
                create: async (
                    payload?: {
                        data: {
                            assist_rules: Array<{
                                assist_rule_type: number;
                                subjects: Array<{
                                    id: string;
                                    entity_type: number;
                                }>;
                                objects: Array<{
                                    id: string;
                                    entity_type: number;
                                }>;
                                effect: number;
                                match_condition?: number;
                            }>;
                        };
                        params?: {
                            employee_id_type?:
                                | "open_id"
                                | "employee_id"
                                | "union_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                data?: { rule_ids?: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/org_visibilities`,
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
                            page_size?: number;
                            page_token?: string;
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            employee_id_type?:
                                | "open_id"
                                | "employee_id"
                                | "union_id";
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
                                    `${this.domain}/open-apis/directory/v1/org_visibilities`,
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
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    assist_rules?: Array<{
                                                        id?: string;
                                                        assist_rule_type?: number;
                                                        subjects: Array<{
                                                            id: string;
                                                            entity_type: number;
                                                        }>;
                                                        objects: Array<{
                                                            id: string;
                                                            entity_type: number;
                                                        }>;
                                                        effect?: number;
                                                        match_condition?: number;
                                                    }>;
                                                    main_rule?: {
                                                        main_rule_type: number;
                                                        unit_type?: string;
                                                        dept_leader_visible_the_dept?: boolean;
                                                        sub_depts_visible?: boolean;
                                                    };
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=org_visibility&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=directory&resource=org_visibility&version=v1 document }
                 *
                 * 获取所有组织架构可见性规则
                 *
                 * 本接口用于获取企业组织架构可见性的整体规则
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            employee_id_type?:
                                | "open_id"
                                | "employee_id"
                                | "union_id";
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
                                    page_token?: string;
                                    has_more?: boolean;
                                    assist_rules?: Array<{
                                        id?: string;
                                        assist_rule_type?: number;
                                        subjects: Array<{
                                            id: string;
                                            entity_type: number;
                                        }>;
                                        objects: Array<{
                                            id: string;
                                            entity_type: number;
                                        }>;
                                        effect?: number;
                                        match_condition?: number;
                                    }>;
                                    main_rule?: {
                                        main_rule_type: number;
                                        unit_type?: string;
                                        dept_leader_visible_the_dept?: boolean;
                                        sub_depts_visible?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/org_visibilities`,
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
             * group
             */
            group: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=group&apiName=mget&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=directory&resource=group&version=v1 document }
                 *
                 * 查询用户组详情
                 */
                mget: async (
                    payload?: {
                        data: {
                            group_ids: Array<string>;
                            required_fields: Array<string>;
                        };
                        params?: {
                            group_id_type?: string;
                            group_set_id_type?: string;
                            default_tenant_id?: string;
                            default_namespace?: string;
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
                                    groups?: Array<{
                                        id?: string;
                                        base?: {
                                            id?: string;
                                            name?: {
                                                default_value: string;
                                                i18n_value?: Record<
                                                    string,
                                                    string
                                                >;
                                                default_locale?: string;
                                            };
                                            external_id?: string;
                                            group_type?: number;
                                            member_count?: number;
                                            status?: number;
                                            description?: string;
                                        };
                                        preceding_group_sets?: Array<string>;
                                    }>;
                                    abnormals?: Array<{
                                        id?: string;
                                        row_error?: number;
                                        field_errors?: Record<string, number>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/groups/mget`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=group&apiName=filter&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=filter&project=directory&resource=group&version=v1 document }
                 *
                 * 查询圈人组列表
                 */
                filter: async (
                    payload?: {
                        data: {
                            page_request: {
                                page_size?: number;
                                page_token?: string;
                            };
                            required_fields: Array<string>;
                            filter: {
                                conditions: Array<{
                                    field: string;
                                    operator: string;
                                    value: string;
                                }>;
                            };
                        };
                        params?: {
                            group_id_type?: string;
                            group_set_id_type?: string;
                            default_tenant_id?: string;
                            default_namespace?: string;
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
                                    groups?: Array<{
                                        id?: string;
                                        base?: {
                                            id?: string;
                                            name?: {
                                                default_value: string;
                                                i18n_value?: Record<
                                                    string,
                                                    string
                                                >;
                                                default_locale?: string;
                                            };
                                            external_id?: string;
                                            group_type?: number;
                                            member_count?: number;
                                            status?: number;
                                            description?: string;
                                        };
                                        preceding_group_sets?: Array<string>;
                                    }>;
                                    abnormals?: Array<{
                                        id?: string;
                                        row_error?: number;
                                        field_errors?: Record<string, number>;
                                    }>;
                                    page_response?: {
                                        has_more?: boolean;
                                        page_token?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/directory/v1/groups/filter`,
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
