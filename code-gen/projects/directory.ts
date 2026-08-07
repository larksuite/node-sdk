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
                 * 注意：;- 恢复离职员工为在职，需要企业的版本在商业专业版及以上，可通过管理后台>设置>版本信息查看企业当前版本，且员工需要在离职 30 天内。恢复后，部分用户数据仍不可恢复，请谨慎调用。;- 待恢复成员的用户 ID 不能被企业内其他成员使用，可通过[批量获取员工列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/filter)接口查询用户ID是否存在。如有重复，请先离职对应的成员，否则接口会报错。;- 待恢复成员的手机号和邮箱不能被企业内其他成员使用，可通过[批量获取员工列表](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/filter)接口查询手机号/邮箱是否存在。如有重复，请先修改对应成员的信息，否则接口会报错。;- 本接口支持tenant_access_token和user_access_token，两种token的获取方式可参照[获取访问凭证](https://open.feishu.cn/document/ukTMukTMukTM/uMTNz4yM1MjLzUzM)。;  - 使用tenant_access_token时，只能在将离职员工恢复到当前应用通讯录授权范围内的部门之下。;  - 使用user_access_token 时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可恢复离职员工时，管理员管理范围取最大集。
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=employee&version=v1 document }
                 *
                 * 离职员工
                 *
                 * 本接口用于离职员工。
                 *
                 * 注意：;- 本接口支持tenant_access_token和user_access_token。;  - 使用tenant_access_token时，只能在当前应用的通讯录授权范围内离职员工。;    - 若员工归属于多个部门，应用需要有员工所有所属部门的权限，才能离职成功。;  - 使用user_access_token 时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可离职员工时，管理员管理范围取最大集。
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
                 * - 员工状态的修改遵循生命周期流转的规则，具体规则详见 [Directory-员工管理-资源介绍](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/directory-v1/employee/resources-introduction) 。;- 本接口支持tenant_access_token和user_access_token，接口获取方式参考[获取访问凭证](https://open.feishu.cn/document/ukTMukTMukTM/uMTNz4yM1MjLzUzM);。;  - 使用tenant_access_token时，只能在当前应用的通讯录授权范围内更新员工信息。可在开发者后台 > 权限管理 > 通讯录权限 中查看。;    - 当变更员工的部门信息时，应用需要有变更前后的部门权限，才能变更成功。;  - 使用user_access_token 时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可更新员工信息时，管理员管理范围取最大集。管理员权限可查看帮助中心文档：[管理员创建管理员角色及分配权限](https://www.feishu.cn/hc/zh-CN/articles/360043495213-%E7%AE%A1%E7%90%86%E5%91%98%E5%88%9B%E5%BB%BA%E7%AE%A1%E7%90%86%E5%91%98%E8%A7%92%E8%89%B2%E5%8F%8A%E5%88%86%E9%85%8D%E6%9D%83%E9%99%90#tabs0|lineguid-dU31C);- 变更「未加入」、「未激活」状态的员工的联系手机号、工作邮箱，会修改员工的登录凭证，并将员工重置为「未加入」状态，并发送邀请短信/邮件。其他状态的员工修改联系方式不影响登录凭证。;- 修改员工ID（employee_id）需要悉知以下影响：;  - 员工ID（employee_id）是员工在企业内的唯一ID，可能会被应用引用来实现各种内部逻辑，唯一ID修改之后可能会导致引用失败，导致所有引用且保存了‘被修改 ID 员工’的业务全部受影响。;- 更新离职状态的员工信息时，以下字段不可更新：;  - email、mobile、department_ids、leader_id、is_frozen、work_city_id
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
                 * 注意：;- 本接口支持tenant_access_token和user_access_token;  - 使用tenant_access_token时，数据权限遵循应用的通讯录权限范围，返回的字段数据为应用有权限的字段。可通过[获取应用通讯录权限范围配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/contacts_range_configuration)确定应用的通讯录权限范围。;  - 使用user_access_token时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可查看员工信息时，管理员管理范围取最大集。管理员权限可查看帮助中心文档： [管理员创建管理员角色及分配权限](https://www.feishu.cn/hc/zh-CN/articles/360043495213-%E7%AE%A1%E7%90%86%E5%91%98%E5%88%9B%E5%BB%BA%E7%AE%A1%E7%90%86%E5%91%98%E8%A7%92%E8%89%B2%E5%8F%8A%E5%88%86%E9%85%8D%E6%9D%83%E9%99%90#tabs0|lineguid-dU31C)
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
                 * 注意：;- 本接口支持tenant_access_token和user_access_token。;  - 使用tenant_access_token时，数据权限遵循应用的通讯录权限范围，返回的字段数据为应用有权限的字段。可通过[获取应用通讯录权限范围配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/contacts_range_configuration)确定应用的通讯录权限范围。;  - 使用user_access_token时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可查看员工信息时，管理员管理范围取最大集。管理员权限可查看帮助中心文档：[管理员创建管理员角色及分配权限](https://www.feishu.cn/hc/zh-CN/articles/360043495213-%E7%AE%A1%E7%90%86%E5%91%98%E5%88%9B%E5%BB%BA%E7%AE%A1%E7%90%86%E5%91%98%E8%A7%92%E8%89%B2%E5%8F%8A%E5%88%86%E9%85%8D%E6%9D%83%E9%99%90#tabs0|lineguid-dU31C);- 本接口无法搜索到外部企业或已离职的用户。
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
                 * 注意：;- 本接口支持tenant_access_token和user_access_token。;  - 使用tenant_access_token时，数据权限遵循应用的通讯录权限范围，返回的字段数据为应用有权限的字段。可通过[获取应用通讯录权限范围配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/contacts_range_configuration)确定应用的通讯录权限范围。;  - 使用user_access_token时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可查看员工信息时，管理员管理范围取最大集。管理员权限可查看帮助中心文档： [管理员创建管理员角色及分配权限](https://www.feishu.cn/hc/zh-CN/articles/360043495213-%E7%AE%A1%E7%90%86%E5%91%98%E5%88%9B%E5%BB%BA%E7%AE%A1%E7%90%86%E5%91%98%E8%A7%92%E8%89%B2%E5%8F%8A%E5%88%86%E9%85%8D%E6%9D%83%E9%99%90#tabs0|lineguid-dU31C)
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
             * department
             */
            department: {
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
                 * 注意：;- 本接口支持tenant_access_token和user_access_token。;  - 使用tenant_access_token时，数据权限遵循应用的通讯录权限范围，返回的字段数据为应用有权限的字段。**考虑到数据安全仅返回最多前100条匹配项**，若需精准结果需要更准确的输入。;  - 使用user_access_token时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可查看员工信息时，管理员管理范围取最大集。
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
                 * **注意**：;- 本接口支持tenant_access_token和user_access_token。;  - 使用tenant_access_token时，数据权限遵循应用的通讯录权限范围，返回的字段数据为应用有权限的字段。可通过[获取应用通讯录权限范围配置](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/application-v6/application/contacts_range_configuration)确定应用的通讯录权限范围。;  - 使用user_access_token时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可查看部门信息时，管理员管理范围取最大集。管理员权限可查看帮助中心文档： [管理员创建管理员角色及分配权限](https://www.feishu.cn/hc/zh-CN/articles/360043495213-%E7%AE%A1%E7%90%86%E5%91%98%E5%88%9B%E5%BB%BA%E7%AE%A1%E7%90%86%E5%91%98%E8%A7%92%E8%89%B2%E5%8F%8A%E5%88%86%E9%85%8D%E6%9D%83%E9%99%90#tabs0|lineguid-dU31C);- 为增强飞书组织架构 OpenAPI 的灵活性，于 **2024 年 10 月 21 日**对该 API 接口做出了更新升级，升级内容包括：优化查询已删除部门信息的返回数据结构。;  - 升级前，查询已删除部门的信息时，不会返回部门负责人信息；升级后，查询已删除部门的信息时，返回数据中将包括部门负责人信息。
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
                 * 注意：;- 本接口支持tenant_access_token和user_access_token。;  - 使用tenant_access_token时，数据权限遵循应用的通讯录权限范围，返回的字段数据为应用有权限的字段。可以在开发者后台-应用详情-权限管理中查看通讯录授权范围。;  - 使用user_access_token时，默认为管理员用户，将校验管理员管理范围。当用户有多个管理员身份均可查看部门信息时，管理员管理范围取最大集。管理员权限可查看帮助中心文档： [管理员创建管理员角色及分配权限](https://www.feishu.cn/hc/zh-CN/articles/360043495213-%E7%AE%A1%E7%90%86%E5%91%98%E5%88%9B%E5%BB%BA%E7%AE%A1%E7%90%86%E5%91%98%E8%A7%92%E8%89%B2%E5%8F%8A%E5%88%86%E9%85%8D%E6%9D%83%E9%99%90#tabs0|lineguid-dU31C)
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
        },
    };
}
