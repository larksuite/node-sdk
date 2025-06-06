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
import corehr from "./corehr";

// auto gen
export default abstract class Client extends corehr {
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
             * collaboration_rule
             */
            collaborationRule: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=collaboration_rule&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=collaboration_rule&version=v1 document }
                 *
                 * 创建关联组织规则
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=collaboration_rule&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=collaboration_rule&version=v1 document }
                 *
                 * 删除关联组织的规则
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
                 * 获取关联组织规则列表
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=collaboration_rule&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=directory&resource=collaboration_rule&version=v1 document }
                 *
                 * 更新关联组织规则
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
                 * 在创建规则时，需要知道对方租户的tenant key，为拿到有效的tenant key，这里提供一个专门给管理员获取关联组织租户的接口，该接口可以直接请求到所有关联组织列表。
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
                 * 获取双方租户分享的实体ID,完成可见性规则的设置
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
                 * 创建部门信息
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
                                    field_key?: string;
                                    field_type?:
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
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
                 * 删除部门信息
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=department&apiName=filter&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=filter&project=directory&resource=department&version=v1 document }
                 *
                 * 查询部门ID列表
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
                                            field_key?: string;
                                            field_type?:
                                                | "1"
                                                | "2"
                                                | "3"
                                                | "4"
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=department&apiName=mget&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=directory&resource=department&version=v1 document }
                 *
                 * 查询部门
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
                                            field_key?: string;
                                            field_type?:
                                                | "1"
                                                | "2"
                                                | "3"
                                                | "4"
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
                 * 更新部门信息
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
                                    field_key?: string;
                                    field_type?:
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=department&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=directory&resource=department&version=v1 document }
                 *
                 * 搜索租户内部门
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
                                            field_key?: string;
                                            field_type?:
                                                | "1"
                                                | "2"
                                                | "3"
                                                | "4"
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
            },
            /**
             * employee
             */
            employee: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=directory&resource=employee&version=v1 document }
                 *
                 * 创建员工信息
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
                                    field_key?: string;
                                    field_type?:
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=directory&resource=employee&version=v1 document }
                 *
                 * 离职员工信息
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=filter&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=filter&project=directory&resource=employee&version=v1 document }
                 *
                 * 查询员工ID列表
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
                                                    field_key?: string;
                                                    field_type?:
                                                        | "1"
                                                        | "2"
                                                        | "3"
                                                        | "4"
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
                                                field_key?: string;
                                                field_type?:
                                                    | "1"
                                                    | "2"
                                                    | "3"
                                                    | "4"
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
                                            subscription_ids?: Array<string>;
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
                                                        field_key?: string;
                                                        field_type?:
                                                            | "1"
                                                            | "2"
                                                            | "3"
                                                            | "4"
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=mget&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mget&project=directory&resource=employee&version=v1 document }
                 *
                 * 批量获取员工数据
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
                                                    field_key?: string;
                                                    field_type?:
                                                        | "1"
                                                        | "2"
                                                        | "3"
                                                        | "4"
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
                                                field_key?: string;
                                                field_type?:
                                                    | "1"
                                                    | "2"
                                                    | "3"
                                                    | "4"
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
                                            subscription_ids?: Array<string>;
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
                                                        field_key?: string;
                                                        field_type?:
                                                            | "1"
                                                            | "2"
                                                            | "3"
                                                            | "4"
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=directory&resource=employee&version=v1 document }
                 *
                 * 更新员工信息
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
                                    field_key?: string;
                                    field_type?:
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=regular&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=regular&project=directory&resource=employee&version=v1 document }
                 *
                 * 待离职雇员恢复成在职状态
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=resurrect&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=resurrect&project=directory&resource=employee&version=v1 document }
                 *
                 * 恢复员工信息
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=directory&resource=employee&version=v1 document }
                 *
                 * 搜索租户内员工
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
                                                    field_key?: string;
                                                    field_type?:
                                                        | "1"
                                                        | "2"
                                                        | "3"
                                                        | "4"
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
                                                field_key?: string;
                                                field_type?:
                                                    | "1"
                                                    | "2"
                                                    | "3"
                                                    | "4"
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
                                            subscription_ids?: Array<string>;
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
                                                        field_key?: string;
                                                        field_type?:
                                                            | "1"
                                                            | "2"
                                                            | "3"
                                                            | "4"
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
                 * {@link https://open.feishu.cn/api-explorer?project=directory&resource=employee&apiName=to_be_resigned&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=to_be_resigned&project=directory&resource=employee&version=v1 document }
                 *
                 * 更新在职雇员到待离职状态
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
            },
        },
    };
}
