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
import payroll from "./payroll";

// auto gen
export default abstract class Client extends payroll {
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
    people_admin = {
        /**
         * job_category
         */
        jobCategory: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=job_category&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=people_admin&resource=job_category&version=v1 document }
             *
             * 删除职务序列
             *
             * 删除职务序列。
             */
            delete: async (
                payload?: {
                    path: { job_category_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/job_categories/:job_category_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=job_category&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=people_admin&resource=job_category&version=v1 document }
             *
             * 更新职务序列
             *
             * 更新职务序列。
             */
            update: async (
                payload?: {
                    data: {
                        i18n_name: { zh_cn?: string; en_us?: string };
                        active: boolean;
                        parent_id?: string;
                    };
                    path: { job_category_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/job_categories/:job_category_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=job_category&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_admin&resource=job_category&version=v1 document }
             *
             * 获取职务序列列表
             *
             * 获取职务序列列表。
             */
            list: async (
                payload?: {
                    params: { page_size: number; page_token?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    id: string;
                                    i18n_name: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    active: boolean;
                                    parent_id?: string;
                                    external_id: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/job_categories`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=job_category&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=people_admin&resource=job_category&version=v1 document }
             *
             * 创建职务序列
             *
             * 创建职务序列。
             */
            create: async (
                payload?: {
                    data: {
                        i18n_name: { zh_cn?: string; en_us?: string };
                        active: boolean;
                        parent_id?: string;
                        external_id: string;
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
                            `${this.domain}/open-apis/people_admin/v1/job_categories`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=job_level&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=people_admin&resource=job_level&version=v1 document }
             *
             * 更新职级
             *
             * 更新职级。
             */
            update: async (
                payload?: {
                    data: {
                        i18n_name: { zh_cn?: string; en_us?: string };
                        active: boolean;
                        order: number;
                    };
                    path: { job_level_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/job_levels/:job_level_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=job_level&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=people_admin&resource=job_level&version=v1 document }
             *
             * 删除职级
             *
             * 删除职级。
             */
            delete: async (
                payload?: {
                    path: { job_level_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/job_levels/:job_level_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=job_level&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_admin&resource=job_level&version=v1 document }
             *
             * 获取职级列表
             *
             * 获取职级列表。
             */
            list: async (
                payload?: {
                    params: { page_size: number; page_token?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    id: string;
                                    i18n_name: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    active: boolean;
                                    order: number;
                                    external_id: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/job_levels`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=job_level&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=people_admin&resource=job_level&version=v1 document }
             *
             * 创建职级
             *
             * 创建职级。
             */
            create: async (
                payload?: {
                    data: {
                        i18n_name: { zh_cn?: string; en_us?: string };
                        active: boolean;
                        order: number;
                        external_id: string;
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
                            `${this.domain}/open-apis/people_admin/v1/job_levels`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * custom_field.custom_enum
         */
        customFieldCustomEnum: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field.custom_enum&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=people_admin&resource=custom_field.custom_enum&version=v1 document }
             *
             * 删除自定义枚举值
             *
             * 删除自定义枚举值。
             */
            delete: async (
                payload?: {
                    path: { custom_field_id: string; custom_enum_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/custom_fields/:custom_field_id/custom_enums/:custom_enum_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field.custom_enum&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=people_admin&resource=custom_field.custom_enum&version=v1 document }
             *
             * 查询自定义枚举值
             *
             * 查询自定义枚举值。
             */
            get: async (
                payload?: {
                    params?: { custom_enum_id_type?: "id" | "key" };
                    path: { custom_field_id: string; custom_enum_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                custom_enum?: {
                                    id: string;
                                    key: string;
                                    i18n_name: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    description?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/custom_fields/:custom_field_id/custom_enums/:custom_enum_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field.custom_enum&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=people_admin&resource=custom_field.custom_enum&version=v1 document }
             *
             * 修改自定义枚举值
             *
             * 修改自定义枚举值。
             */
            update: async (
                payload?: {
                    data: {
                        i18n_name: { zh_cn?: string; en_us?: string };
                        description?: { zh_cn?: string; en_us?: string };
                    };
                    path: { custom_field_id: string; custom_enum_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/custom_fields/:custom_field_id/custom_enums/:custom_enum_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field.custom_enum&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=people_admin&resource=custom_field.custom_enum&version=v1 document }
             *
             * 创建自定义枚举值
             *
             * 创建自定义枚举值。
             */
            create: async (
                payload?: {
                    data: {
                        key: string;
                        i18n_name: { zh_cn?: string; en_us?: string };
                        description?: { zh_cn?: string; en_us?: string };
                    };
                    path: { custom_field_id: string };
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
                            `${this.domain}/open-apis/people_admin/v1/custom_fields/:custom_field_id/custom_enums`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=people_admin&resource=custom_field&version=v1 document }
             *
             * 删除自定义字段
             *
             * 删除自定义字段。
             */
            delete: async (
                payload?: {
                    path?: { custom_field_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/custom_fields/:custom_field_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=people_admin&resource=custom_field&version=v1 document }
             *
             * 查询指定自定义字段
             *
             * 查询指定自定义字段。
             */
            get: async (
                payload?: {
                    params?: { custom_field_id_type?: "id" | "external_id" };
                    path: { custom_field_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                custom_field?: {
                                    id: string;
                                    external_id: string;
                                    i18n_name: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    feishu_custom_field_id?: string;
                                    entity_type: number;
                                    type: number;
                                    description?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    custom_enums?: Array<{
                                        id: string;
                                        key: string;
                                        i18n_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/custom_fields/:custom_field_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=people_admin&resource=custom_field&version=v1 document }
             *
             * 修改自定义字段
             *
             * 修改自定义字段。
             */
            update: async (
                payload?: {
                    data: {
                        i18n_name: { zh_cn?: string; en_us?: string };
                        feishu_custom_field_id?: string;
                        description?: { zh_cn?: string; en_us?: string };
                    };
                    path?: { custom_field_id?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/custom_fields/:custom_field_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_admin&resource=custom_field&version=v1 document }
             *
             * 查询所有自定义字段
             *
             * 查询所有自定义字段。
             */
            list: async (
                payload?: {
                    params: { page_size: string; page_token?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                has_more: boolean;
                                page_token: string;
                                items?: Array<{
                                    id: string;
                                    external_id: string;
                                    i18n_name: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    feishu_custom_field_id?: string;
                                    entity_type: number;
                                    type: number;
                                    description?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    custom_enums?: Array<{
                                        id: string;
                                        key: string;
                                        i18n_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/custom_fields`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=people_admin&resource=custom_field&version=v1 document }
             *
             * 创建自定义字段
             *
             * 创建自定义字段。
             */
            create: async (
                payload?: {
                    data: {
                        external_id: string;
                        i18n_name: { zh_cn?: string; en_us?: string };
                        feishu_custom_field_id?: string;
                        entity_type: number;
                        type: number;
                        description?: { zh_cn?: string; en_us?: string };
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        { code?: number; msg?: string; data?: { id: string } }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/custom_fields`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * employee_type
         */
        employeeType: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee_type&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_admin&resource=employee_type&version=v1 document }
             *
             * 获取员工类型列表
             *
             * 获取员工类型列表。
             */
            list: async (
                payload?: {
                    params: { page_size: number; page_token?: string };
                },
                options?: IRequestOptions
            ) => {
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
                                    id: string;
                                    i18n_name: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    active: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/employee_types`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=department&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=people_admin&resource=department&version=v1 document }
             *
             * 删除部门
             *
             * 删除部门。
             */
            delete: async (
                payload?: {
                    params?: {
                        department_id_type?:
                            | "open_department_id"
                            | "people_admin_department_id";
                    };
                    path: { department_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/departments/:department_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=department&apiName=get_by_external_id&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_by_external_id&project=people_admin&resource=department&version=v1 document }
             *
             * 根据外部 ID 获取部门信息
             *
             * 根据外部 ID 获取部门信息。
             */
            getByExternalId: async (
                payload?: {
                    params: {
                        external_id: string;
                        department_id_type?:
                            | "open_department_id"
                            | "people_admin_department_id";
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
                                department?: {
                                    id: string;
                                    external_id: string;
                                    i18n_name: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    parent_department_id?: string;
                                    leader_id?: string;
                                    hrbp_employee_ids?: Array<string>;
                                    custom_fields?: Array<{
                                        id: string;
                                        value: string;
                                    }>;
                                    chat_id?: string;
                                    create_group_chat?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/departments/get_by_external_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=department&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=people_admin&resource=department&version=v1 document }
             *
             * 更新部门所有信息
             *
             * 全量更新部门，未赋值参数将被置空。
             */
            update: async (
                payload?: {
                    data: {
                        i18n_name: { zh_cn?: string; en_us?: string };
                        parent_department_id?: string;
                        leader_id?: string;
                        hrbp_employee_ids?: Array<string>;
                        custom_fields?: Array<{ id: string; value: string }>;
                        create_group_chat?: boolean;
                    };
                    params?: {
                        department_id_type?:
                            | "open_department_id"
                            | "people_admin_department_id";
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                    };
                    path: { department_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/departments/:department_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=department&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=people_admin&resource=department&version=v1 document }
             *
             * 创建部门
             *
             * 创建部门。
             */
            create: async (
                payload?: {
                    data: {
                        external_id: string;
                        i18n_name: { zh_cn?: string; en_us?: string };
                        parent_department_id?: string;
                        leader_id?: string;
                        hrbp_employee_ids?: Array<string>;
                        custom_fields?: Array<{ id: string; value: string }>;
                        create_group_chat?: boolean;
                    };
                    params?: {
                        department_id_type?:
                            | "open_department_id"
                            | "people_admin_department_id";
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
                        { code?: number; msg?: string; data?: { id?: string } }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/departments`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=department&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=people_admin&resource=department&version=v1 document }
             *
             * 修改部门部分信息
             *
             * 修改部门部分信息。
             */
            patch: async (
                payload?: {
                    data?: {
                        i18n_name?: { zh_cn?: string; en_us?: string };
                        parent_department_id?: string;
                        leader_id?: string;
                        hrbp_employee_ids?: Array<string>;
                        custom_fields?: Array<{ id: string; value: string }>;
                        create_group_chat?: boolean;
                    };
                    params?: {
                        department_id_type?:
                            | "open_department_id"
                            | "people_admin_department_id";
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                    };
                    path: { department_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/departments/:department_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=department&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_admin&resource=department&version=v1 document }
             *
             * 获取部门信息列表
             *
             * 获取部门信息列表。
             */
            list: async (
                payload?: {
                    params: {
                        parent_department_id?: string;
                        department_id_type?:
                            | "open_department_id"
                            | "people_admin_department_id";
                        page_size: number;
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
                                page_token?: string;
                                has_more?: boolean;
                                items?: Array<{
                                    id: string;
                                    external_id: string;
                                    i18n_name: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    parent_department_id?: string;
                                    leader_id?: string;
                                    hrbp_employee_ids?: Array<string>;
                                    custom_fields?: Array<{
                                        id: string;
                                        value: string;
                                    }>;
                                    sync_info: {
                                        sync_status: number;
                                        open_department_id?: string;
                                    };
                                    chat_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/departments`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=department&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=people_admin&resource=department&version=v1 document }
             *
             * 获取指定部门信息
             *
             * 获取指定部门信息。
             */
            get: async (
                payload?: {
                    params?: {
                        department_id_type?:
                            | "open_department_id"
                            | "people_admin_department_id";
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
                            data?: {
                                department?: {
                                    id: string;
                                    external_id: string;
                                    i18n_name: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    parent_department_id?: string;
                                    leader_id?: string;
                                    hrbp_employee_ids?: Array<string>;
                                    custom_fields?: Array<{
                                        id: string;
                                        value: string;
                                    }>;
                                    sync_info: {
                                        sync_status: number;
                                        open_department_id?: string;
                                    };
                                    chat_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/departments/:department_id`,
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
         * employee
         */
        employee: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=people_admin&resource=employee&version=v1 document }
             *
             * 删除员工
             *
             * 该接口向 People admin 删除一个用户信息，可以理解为员工离职。
             */
            delete: async (
                payload?: {
                    data?: { resigned_time?: string };
                    params?: {
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                    };
                    path: { employee_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/employees/:employee_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=people_admin&resource=employee&version=v1 document }
             *
             * 更新员工所有信息
             *
             * 全量更新员工，未赋值参数将被置空。
             */
            update: async (
                payload?: {
                    data: {
                        i18n_name: { zh_cn?: string; en_us?: string };
                        mobile: { phone: string; code?: string };
                        employee_type_id: string;
                        email?: string;
                        job_category_id?: string;
                        job_level_id?: string;
                        join_time?: number;
                        leader_id?: string;
                        dotted_line_leader_ids?: Array<string>;
                        employee_no?: string;
                        department_ids: Array<string>;
                        custom_fields?: Array<{ id: string; value: string }>;
                        gender?: number;
                        work_station?: string;
                        country_id?: string;
                        city_id?: string;
                        frozen_status?: number;
                    };
                    params?: {
                        department_id_type?:
                            | "open_department_id"
                            | "people_admin_department_id";
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                    };
                    path: { employee_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/employees/:employee_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=get_by_external_id&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_by_external_id&project=people_admin&resource=employee&version=v1 document }
             *
             * 根据外部 ID 获取员工信息
             *
             * 根据外部 ID 获取员工信息。
             */
            getByExternalId: async (
                payload?: {
                    params: {
                        external_id: string;
                        department_id_type?:
                            | "open_department_id"
                            | "people_admin_department_id";
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
                                employee?: {
                                    id: string;
                                    external_id: string;
                                    i18n_name: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    mobile: { phone: string; code?: string };
                                    employee_type_id: string;
                                    email?: string;
                                    job_category_id?: string;
                                    job_level_id?: string;
                                    join_time?: number;
                                    leader_id?: string;
                                    dotted_line_leader_ids?: Array<string>;
                                    employee_no?: string;
                                    department_ids: Array<string>;
                                    custom_fields?: Array<{
                                        id: string;
                                        value: string;
                                    }>;
                                    is_deactived: boolean;
                                    is_terminated: boolean;
                                    sync_info: {
                                        sync_status: number;
                                        open_id?: string;
                                        union_id?: string;
                                        user_id?: string;
                                    };
                                    avatar?: {
                                        avatar?: string;
                                        avatar72?: string;
                                        avatar240?: string;
                                        avatar640?: string;
                                    };
                                    gender?: number;
                                    work_station?: string;
                                    country_id?: string;
                                    city_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/employees/get_by_external_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=people_admin&resource=employee&version=v1 document }
             *
             * 根据条件查询用户 ID
             *
             * 根据条件查询用户 ID，请求中需至少传入一个选填字段。
             */
            query: async (
                payload?: {
                    data?: {
                        mobile?: string;
                        email?: string;
                        employee_no?: string;
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
                            data?: { user_id_list?: Array<string> };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/employees/query`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=people_admin&resource=employee&version=v1 document }
             *
             * 创建员工
             *
             * 创建员工。
             */
            create: async (
                payload?: {
                    data: {
                        external_id: string;
                        i18n_name: { zh_cn?: string; en_us?: string };
                        mobile: { phone: string; code?: string };
                        employee_type_id: string;
                        email?: string;
                        job_category_id?: string;
                        job_level_id?: string;
                        join_time?: number;
                        leader_id?: string;
                        dotted_line_leader_ids?: Array<string>;
                        employee_no?: string;
                        department_ids: Array<string>;
                        custom_fields?: Array<{ id: string; value: string }>;
                        gender?: number;
                        work_station?: string;
                        country_id?: string;
                        city_id?: string;
                    };
                    params?: {
                        department_id_type?:
                            | "open_department_id"
                            | "people_admin_department_id";
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
                        { code?: number; msg?: string; data?: { id?: string } }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/employees`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=people_admin&resource=employee&version=v1 document }
             *
             * 修改员工部分信息
             *
             * 修改员工部分信息。
             */
            patch: async (
                payload?: {
                    data?: {
                        i18n_name?: { zh_cn?: string; en_us?: string };
                        mobile?: { phone: string; code?: string };
                        employee_type_id?: string;
                        email?: string;
                        job_category_id?: string;
                        job_level_id?: string;
                        join_time?: number;
                        leader_id?: string;
                        dotted_line_leader_ids?: Array<string>;
                        employee_no?: string;
                        department_ids?: Array<string>;
                        custom_fields?: Array<{ id: string; value: string }>;
                        gender?: number;
                        work_station?: string;
                        country_id?: string;
                        city_id?: string;
                        frozen_status?: number;
                    };
                    params?: {
                        department_id_type?:
                            | "open_department_id"
                            | "people_admin_department_id";
                        user_id_type?:
                            | "user_id"
                            | "union_id"
                            | "open_id"
                            | "people_admin_id";
                    };
                    path: { employee_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/employees/:employee_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=people_admin&resource=employee&version=v1 document }
             *
             * 获取指定员工信息
             *
             * 获取指定员工信息。
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
                                    id: string;
                                    external_id: string;
                                    i18n_name: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    mobile: { phone: string; code?: string };
                                    employee_type_id: string;
                                    email?: string;
                                    job_category_id?: string;
                                    job_level_id?: string;
                                    join_time?: number;
                                    leader_id?: string;
                                    dotted_line_leader_ids?: Array<string>;
                                    employee_no?: string;
                                    department_ids: Array<string>;
                                    custom_fields?: Array<{
                                        id: string;
                                        value: string;
                                    }>;
                                    is_deactived: boolean;
                                    is_terminated: boolean;
                                    sync_info: {
                                        sync_status: number;
                                        open_id?: string;
                                        union_id?: string;
                                        user_id?: string;
                                    };
                                    avatar?: {
                                        avatar?: string;
                                        avatar72?: string;
                                        avatar240?: string;
                                        avatar640?: string;
                                    };
                                    gender?: number;
                                    work_station?: string;
                                    country_id?: string;
                                    city_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/employees/:employee_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_admin&resource=employee&version=v1 document }
             *
             * 获取员工信息列表
             *
             * 获取员工信息列表。
             */
            list: async (
                payload?: {
                    params: {
                        department_id?: string;
                        department_id_type?:
                            | "open_department_id"
                            | "people_admin_department_id";
                        is_deactived?: boolean;
                        is_terminated?: boolean;
                        page_size: number;
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
                                page_token?: string;
                                has_more?: boolean;
                                items?: Array<{
                                    id: string;
                                    external_id: string;
                                    i18n_name: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    mobile: { phone: string; code?: string };
                                    employee_type_id: string;
                                    email?: string;
                                    job_category_id?: string;
                                    job_level_id?: string;
                                    join_time?: number;
                                    leader_id?: string;
                                    dotted_line_leader_ids?: Array<string>;
                                    employee_no?: string;
                                    department_ids: Array<string>;
                                    custom_fields?: Array<{
                                        id: string;
                                        value: string;
                                    }>;
                                    is_deactived: boolean;
                                    is_terminated: boolean;
                                    sync_info: {
                                        sync_status: number;
                                        open_id?: string;
                                        union_id?: string;
                                        user_id?: string;
                                    };
                                    avatar?: {
                                        avatar?: string;
                                        avatar72?: string;
                                        avatar240?: string;
                                        avatar640?: string;
                                    };
                                    gender?: number;
                                    work_station?: string;
                                    country_id?: string;
                                    city_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/employees`,
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
             * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=all&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=all&project=people_admin&resource=employee&version=v1 document }
             *
             * 获取员工列表
             */
            all: async (
                payload?: {
                    params: {
                        department_id?: string;
                        department_id_type?:
                            | "department_id"
                            | "open_department_id"
                            | "people_admin_department_id";
                        is_deactived?: boolean;
                        is_terminated?: boolean;
                        page_size: number;
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
                                page_token?: string;
                                has_more?: boolean;
                                items?: Array<{
                                    id: string;
                                    external_id: string;
                                    i18n_name: {
                                        zh_cn?: string;
                                        en_us?: string;
                                    };
                                    mobile: { phone: string; code?: string };
                                    employee_type_id: string;
                                    email?: string;
                                    job_category_id?: string;
                                    job_level_id?: string;
                                    join_time?: number;
                                    leader_id?: string;
                                    dotted_line_leader_ids?: Array<string>;
                                    employee_no?: string;
                                    department_ids: Array<string>;
                                    custom_fields?: Array<{
                                        id: string;
                                        value: string;
                                    }>;
                                    is_deactived: boolean;
                                    is_terminated: boolean;
                                    sync_info: {
                                        sync_status: number;
                                        open_id?: string;
                                        union_id?: string;
                                        user_id?: string;
                                    };
                                    avatar?: {
                                        avatar?: string;
                                        avatar72?: string;
                                        avatar240?: string;
                                        avatar640?: string;
                                    };
                                    gender?: number;
                                    work_station?: string;
                                    country_id?: string;
                                    city_id?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/people_admin/v1/employees/all`,
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
             * job_category
             */
            jobCategory: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=job_category&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=people_admin&resource=job_category&version=v1 document }
                 *
                 * 删除职务序列
                 *
                 * 删除职务序列。
                 */
                delete: async (
                    payload?: {
                        path: { job_category_id: string };
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
                                `${this.domain}/open-apis/people_admin/v1/job_categories/:job_category_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=job_category&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=people_admin&resource=job_category&version=v1 document }
                 *
                 * 更新职务序列
                 *
                 * 更新职务序列。
                 */
                update: async (
                    payload?: {
                        data: {
                            i18n_name: { zh_cn?: string; en_us?: string };
                            active: boolean;
                            parent_id?: string;
                        };
                        path: { job_category_id: string };
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
                                `${this.domain}/open-apis/people_admin/v1/job_categories/:job_category_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=job_category&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_admin&resource=job_category&version=v1 document }
                 *
                 * 获取职务序列列表
                 *
                 * 获取职务序列列表。
                 */
                list: async (
                    payload?: {
                        params: { page_size: number; page_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        id: string;
                                        i18n_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        active: boolean;
                                        parent_id?: string;
                                        external_id: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/job_categories`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=job_category&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=people_admin&resource=job_category&version=v1 document }
                 *
                 * 创建职务序列
                 *
                 * 创建职务序列。
                 */
                create: async (
                    payload?: {
                        data: {
                            i18n_name: { zh_cn?: string; en_us?: string };
                            active: boolean;
                            parent_id?: string;
                            external_id: string;
                        };
                    },
                    options?: IRequestOptions
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
                                `${this.domain}/open-apis/people_admin/v1/job_categories`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=job_level&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=people_admin&resource=job_level&version=v1 document }
                 *
                 * 更新职级
                 *
                 * 更新职级。
                 */
                update: async (
                    payload?: {
                        data: {
                            i18n_name: { zh_cn?: string; en_us?: string };
                            active: boolean;
                            order: number;
                        };
                        path: { job_level_id: string };
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
                                `${this.domain}/open-apis/people_admin/v1/job_levels/:job_level_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=job_level&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=people_admin&resource=job_level&version=v1 document }
                 *
                 * 删除职级
                 *
                 * 删除职级。
                 */
                delete: async (
                    payload?: {
                        path: { job_level_id: string };
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
                                `${this.domain}/open-apis/people_admin/v1/job_levels/:job_level_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=job_level&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_admin&resource=job_level&version=v1 document }
                 *
                 * 获取职级列表
                 *
                 * 获取职级列表。
                 */
                list: async (
                    payload?: {
                        params: { page_size: number; page_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        id: string;
                                        i18n_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        active: boolean;
                                        order: number;
                                        external_id: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/job_levels`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=job_level&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=people_admin&resource=job_level&version=v1 document }
                 *
                 * 创建职级
                 *
                 * 创建职级。
                 */
                create: async (
                    payload?: {
                        data: {
                            i18n_name: { zh_cn?: string; en_us?: string };
                            active: boolean;
                            order: number;
                            external_id: string;
                        };
                    },
                    options?: IRequestOptions
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
                                `${this.domain}/open-apis/people_admin/v1/job_levels`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * custom_field.custom_enum
             */
            customFieldCustomEnum: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field.custom_enum&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=people_admin&resource=custom_field.custom_enum&version=v1 document }
                 *
                 * 删除自定义枚举值
                 *
                 * 删除自定义枚举值。
                 */
                delete: async (
                    payload?: {
                        path: {
                            custom_field_id: string;
                            custom_enum_id: string;
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
                                `${this.domain}/open-apis/people_admin/v1/custom_fields/:custom_field_id/custom_enums/:custom_enum_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field.custom_enum&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=people_admin&resource=custom_field.custom_enum&version=v1 document }
                 *
                 * 查询自定义枚举值
                 *
                 * 查询自定义枚举值。
                 */
                get: async (
                    payload?: {
                        params?: { custom_enum_id_type?: "id" | "key" };
                        path: {
                            custom_field_id: string;
                            custom_enum_id: string;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    custom_enum?: {
                                        id: string;
                                        key: string;
                                        i18n_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/custom_fields/:custom_field_id/custom_enums/:custom_enum_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field.custom_enum&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=people_admin&resource=custom_field.custom_enum&version=v1 document }
                 *
                 * 修改自定义枚举值
                 *
                 * 修改自定义枚举值。
                 */
                update: async (
                    payload?: {
                        data: {
                            i18n_name: { zh_cn?: string; en_us?: string };
                            description?: { zh_cn?: string; en_us?: string };
                        };
                        path: {
                            custom_field_id: string;
                            custom_enum_id: string;
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
                                `${this.domain}/open-apis/people_admin/v1/custom_fields/:custom_field_id/custom_enums/:custom_enum_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field.custom_enum&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=people_admin&resource=custom_field.custom_enum&version=v1 document }
                 *
                 * 创建自定义枚举值
                 *
                 * 创建自定义枚举值。
                 */
                create: async (
                    payload?: {
                        data: {
                            key: string;
                            i18n_name: { zh_cn?: string; en_us?: string };
                            description?: { zh_cn?: string; en_us?: string };
                        };
                        path: { custom_field_id: string };
                    },
                    options?: IRequestOptions
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
                                `${this.domain}/open-apis/people_admin/v1/custom_fields/:custom_field_id/custom_enums`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=people_admin&resource=custom_field&version=v1 document }
                 *
                 * 删除自定义字段
                 *
                 * 删除自定义字段。
                 */
                delete: async (
                    payload?: {
                        path?: { custom_field_id?: string };
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
                                `${this.domain}/open-apis/people_admin/v1/custom_fields/:custom_field_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=people_admin&resource=custom_field&version=v1 document }
                 *
                 * 查询指定自定义字段
                 *
                 * 查询指定自定义字段。
                 */
                get: async (
                    payload?: {
                        params?: {
                            custom_field_id_type?: "id" | "external_id";
                        };
                        path: { custom_field_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    custom_field?: {
                                        id: string;
                                        external_id: string;
                                        i18n_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        feishu_custom_field_id?: string;
                                        entity_type: number;
                                        type: number;
                                        description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        custom_enums?: Array<{
                                            id: string;
                                            key: string;
                                            i18n_name: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            description?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/custom_fields/:custom_field_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=people_admin&resource=custom_field&version=v1 document }
                 *
                 * 修改自定义字段
                 *
                 * 修改自定义字段。
                 */
                update: async (
                    payload?: {
                        data: {
                            i18n_name: { zh_cn?: string; en_us?: string };
                            feishu_custom_field_id?: string;
                            description?: { zh_cn?: string; en_us?: string };
                        };
                        path?: { custom_field_id?: string };
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
                                `${this.domain}/open-apis/people_admin/v1/custom_fields/:custom_field_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_admin&resource=custom_field&version=v1 document }
                 *
                 * 查询所有自定义字段
                 *
                 * 查询所有自定义字段。
                 */
                list: async (
                    payload?: {
                        params: { page_size: string; page_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    has_more: boolean;
                                    page_token: string;
                                    items?: Array<{
                                        id: string;
                                        external_id: string;
                                        i18n_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        feishu_custom_field_id?: string;
                                        entity_type: number;
                                        type: number;
                                        description?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        custom_enums?: Array<{
                                            id: string;
                                            key: string;
                                            i18n_name: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            description?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/custom_fields`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=custom_field&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=people_admin&resource=custom_field&version=v1 document }
                 *
                 * 创建自定义字段
                 *
                 * 创建自定义字段。
                 */
                create: async (
                    payload?: {
                        data: {
                            external_id: string;
                            i18n_name: { zh_cn?: string; en_us?: string };
                            feishu_custom_field_id?: string;
                            entity_type: number;
                            type: number;
                            description?: { zh_cn?: string; en_us?: string };
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/custom_fields`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * employee_type
             */
            employeeType: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee_type&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_admin&resource=employee_type&version=v1 document }
                 *
                 * 获取员工类型列表
                 *
                 * 获取员工类型列表。
                 */
                list: async (
                    payload?: {
                        params: { page_size: number; page_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        id: string;
                                        i18n_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        active: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/employee_types`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=department&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=people_admin&resource=department&version=v1 document }
                 *
                 * 删除部门
                 *
                 * 删除部门。
                 */
                delete: async (
                    payload?: {
                        params?: {
                            department_id_type?:
                                | "open_department_id"
                                | "people_admin_department_id";
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
                                `${this.domain}/open-apis/people_admin/v1/departments/:department_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=department&apiName=get_by_external_id&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_by_external_id&project=people_admin&resource=department&version=v1 document }
                 *
                 * 根据外部 ID 获取部门信息
                 *
                 * 根据外部 ID 获取部门信息。
                 */
                getByExternalId: async (
                    payload?: {
                        params: {
                            external_id: string;
                            department_id_type?:
                                | "open_department_id"
                                | "people_admin_department_id";
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
                                    department?: {
                                        id: string;
                                        external_id: string;
                                        i18n_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        parent_department_id?: string;
                                        leader_id?: string;
                                        hrbp_employee_ids?: Array<string>;
                                        custom_fields?: Array<{
                                            id: string;
                                            value: string;
                                        }>;
                                        chat_id?: string;
                                        create_group_chat?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/departments/get_by_external_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=department&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=people_admin&resource=department&version=v1 document }
                 *
                 * 更新部门所有信息
                 *
                 * 全量更新部门，未赋值参数将被置空。
                 */
                update: async (
                    payload?: {
                        data: {
                            i18n_name: { zh_cn?: string; en_us?: string };
                            parent_department_id?: string;
                            leader_id?: string;
                            hrbp_employee_ids?: Array<string>;
                            custom_fields?: Array<{
                                id: string;
                                value: string;
                            }>;
                            create_group_chat?: boolean;
                        };
                        params?: {
                            department_id_type?:
                                | "open_department_id"
                                | "people_admin_department_id";
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                `${this.domain}/open-apis/people_admin/v1/departments/:department_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=department&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=people_admin&resource=department&version=v1 document }
                 *
                 * 创建部门
                 *
                 * 创建部门。
                 */
                create: async (
                    payload?: {
                        data: {
                            external_id: string;
                            i18n_name: { zh_cn?: string; en_us?: string };
                            parent_department_id?: string;
                            leader_id?: string;
                            hrbp_employee_ids?: Array<string>;
                            custom_fields?: Array<{
                                id: string;
                                value: string;
                            }>;
                            create_group_chat?: boolean;
                        };
                        params?: {
                            department_id_type?:
                                | "open_department_id"
                                | "people_admin_department_id";
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
                                data?: { id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/departments`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=department&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=people_admin&resource=department&version=v1 document }
                 *
                 * 修改部门部分信息
                 *
                 * 修改部门部分信息。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            i18n_name?: { zh_cn?: string; en_us?: string };
                            parent_department_id?: string;
                            leader_id?: string;
                            hrbp_employee_ids?: Array<string>;
                            custom_fields?: Array<{
                                id: string;
                                value: string;
                            }>;
                            create_group_chat?: boolean;
                        };
                        params?: {
                            department_id_type?:
                                | "open_department_id"
                                | "people_admin_department_id";
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                `${this.domain}/open-apis/people_admin/v1/departments/:department_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=department&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_admin&resource=department&version=v1 document }
                 *
                 * 获取部门信息列表
                 *
                 * 获取部门信息列表。
                 */
                list: async (
                    payload?: {
                        params: {
                            parent_department_id?: string;
                            department_id_type?:
                                | "open_department_id"
                                | "people_admin_department_id";
                            page_size: number;
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
                                    page_token?: string;
                                    has_more?: boolean;
                                    items?: Array<{
                                        id: string;
                                        external_id: string;
                                        i18n_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        parent_department_id?: string;
                                        leader_id?: string;
                                        hrbp_employee_ids?: Array<string>;
                                        custom_fields?: Array<{
                                            id: string;
                                            value: string;
                                        }>;
                                        sync_info: {
                                            sync_status: number;
                                            open_department_id?: string;
                                        };
                                        chat_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/departments`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=department&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=people_admin&resource=department&version=v1 document }
                 *
                 * 获取指定部门信息
                 *
                 * 获取指定部门信息。
                 */
                get: async (
                    payload?: {
                        params?: {
                            department_id_type?:
                                | "open_department_id"
                                | "people_admin_department_id";
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
                                data?: {
                                    department?: {
                                        id: string;
                                        external_id: string;
                                        i18n_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        parent_department_id?: string;
                                        leader_id?: string;
                                        hrbp_employee_ids?: Array<string>;
                                        custom_fields?: Array<{
                                            id: string;
                                            value: string;
                                        }>;
                                        sync_info: {
                                            sync_status: number;
                                            open_department_id?: string;
                                        };
                                        chat_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/departments/:department_id`,
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
             * employee
             */
            employee: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=people_admin&resource=employee&version=v1 document }
                 *
                 * 删除员工
                 *
                 * 该接口向 People admin 删除一个用户信息，可以理解为员工离职。
                 */
                delete: async (
                    payload?: {
                        data?: { resigned_time?: string };
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                `${this.domain}/open-apis/people_admin/v1/employees/:employee_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=people_admin&resource=employee&version=v1 document }
                 *
                 * 更新员工所有信息
                 *
                 * 全量更新员工，未赋值参数将被置空。
                 */
                update: async (
                    payload?: {
                        data: {
                            i18n_name: { zh_cn?: string; en_us?: string };
                            mobile: { phone: string; code?: string };
                            employee_type_id: string;
                            email?: string;
                            job_category_id?: string;
                            job_level_id?: string;
                            join_time?: number;
                            leader_id?: string;
                            dotted_line_leader_ids?: Array<string>;
                            employee_no?: string;
                            department_ids: Array<string>;
                            custom_fields?: Array<{
                                id: string;
                                value: string;
                            }>;
                            gender?: number;
                            work_station?: string;
                            country_id?: string;
                            city_id?: string;
                            frozen_status?: number;
                        };
                        params?: {
                            department_id_type?:
                                | "open_department_id"
                                | "people_admin_department_id";
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                `${this.domain}/open-apis/people_admin/v1/employees/:employee_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=get_by_external_id&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_by_external_id&project=people_admin&resource=employee&version=v1 document }
                 *
                 * 根据外部 ID 获取员工信息
                 *
                 * 根据外部 ID 获取员工信息。
                 */
                getByExternalId: async (
                    payload?: {
                        params: {
                            external_id: string;
                            department_id_type?:
                                | "open_department_id"
                                | "people_admin_department_id";
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
                                    employee?: {
                                        id: string;
                                        external_id: string;
                                        i18n_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        mobile: {
                                            phone: string;
                                            code?: string;
                                        };
                                        employee_type_id: string;
                                        email?: string;
                                        job_category_id?: string;
                                        job_level_id?: string;
                                        join_time?: number;
                                        leader_id?: string;
                                        dotted_line_leader_ids?: Array<string>;
                                        employee_no?: string;
                                        department_ids: Array<string>;
                                        custom_fields?: Array<{
                                            id: string;
                                            value: string;
                                        }>;
                                        is_deactived: boolean;
                                        is_terminated: boolean;
                                        sync_info: {
                                            sync_status: number;
                                            open_id?: string;
                                            union_id?: string;
                                            user_id?: string;
                                        };
                                        avatar?: {
                                            avatar?: string;
                                            avatar72?: string;
                                            avatar240?: string;
                                            avatar640?: string;
                                        };
                                        gender?: number;
                                        work_station?: string;
                                        country_id?: string;
                                        city_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/employees/get_by_external_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=people_admin&resource=employee&version=v1 document }
                 *
                 * 根据条件查询用户 ID
                 *
                 * 根据条件查询用户 ID，请求中需至少传入一个选填字段。
                 */
                query: async (
                    payload?: {
                        data?: {
                            mobile?: string;
                            email?: string;
                            employee_no?: string;
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
                                data?: { user_id_list?: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/employees/query`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=people_admin&resource=employee&version=v1 document }
                 *
                 * 创建员工
                 *
                 * 创建员工。
                 */
                create: async (
                    payload?: {
                        data: {
                            external_id: string;
                            i18n_name: { zh_cn?: string; en_us?: string };
                            mobile: { phone: string; code?: string };
                            employee_type_id: string;
                            email?: string;
                            job_category_id?: string;
                            job_level_id?: string;
                            join_time?: number;
                            leader_id?: string;
                            dotted_line_leader_ids?: Array<string>;
                            employee_no?: string;
                            department_ids: Array<string>;
                            custom_fields?: Array<{
                                id: string;
                                value: string;
                            }>;
                            gender?: number;
                            work_station?: string;
                            country_id?: string;
                            city_id?: string;
                        };
                        params?: {
                            department_id_type?:
                                | "open_department_id"
                                | "people_admin_department_id";
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
                                data?: { id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/employees`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=people_admin&resource=employee&version=v1 document }
                 *
                 * 修改员工部分信息
                 *
                 * 修改员工部分信息。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            i18n_name?: { zh_cn?: string; en_us?: string };
                            mobile?: { phone: string; code?: string };
                            employee_type_id?: string;
                            email?: string;
                            job_category_id?: string;
                            job_level_id?: string;
                            join_time?: number;
                            leader_id?: string;
                            dotted_line_leader_ids?: Array<string>;
                            employee_no?: string;
                            department_ids?: Array<string>;
                            custom_fields?: Array<{
                                id: string;
                                value: string;
                            }>;
                            gender?: number;
                            work_station?: string;
                            country_id?: string;
                            city_id?: string;
                            frozen_status?: number;
                        };
                        params?: {
                            department_id_type?:
                                | "open_department_id"
                                | "people_admin_department_id";
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_admin_id";
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
                                `${this.domain}/open-apis/people_admin/v1/employees/:employee_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=people_admin&resource=employee&version=v1 document }
                 *
                 * 获取指定员工信息
                 *
                 * 获取指定员工信息。
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
                                        id: string;
                                        external_id: string;
                                        i18n_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        mobile: {
                                            phone: string;
                                            code?: string;
                                        };
                                        employee_type_id: string;
                                        email?: string;
                                        job_category_id?: string;
                                        job_level_id?: string;
                                        join_time?: number;
                                        leader_id?: string;
                                        dotted_line_leader_ids?: Array<string>;
                                        employee_no?: string;
                                        department_ids: Array<string>;
                                        custom_fields?: Array<{
                                            id: string;
                                            value: string;
                                        }>;
                                        is_deactived: boolean;
                                        is_terminated: boolean;
                                        sync_info: {
                                            sync_status: number;
                                            open_id?: string;
                                            union_id?: string;
                                            user_id?: string;
                                        };
                                        avatar?: {
                                            avatar?: string;
                                            avatar72?: string;
                                            avatar240?: string;
                                            avatar640?: string;
                                        };
                                        gender?: number;
                                        work_station?: string;
                                        country_id?: string;
                                        city_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/employees/:employee_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=people_admin&resource=employee&version=v1 document }
                 *
                 * 获取员工信息列表
                 *
                 * 获取员工信息列表。
                 */
                list: async (
                    payload?: {
                        params: {
                            department_id?: string;
                            department_id_type?:
                                | "open_department_id"
                                | "people_admin_department_id";
                            is_deactived?: boolean;
                            is_terminated?: boolean;
                            page_size: number;
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
                                    page_token?: string;
                                    has_more?: boolean;
                                    items?: Array<{
                                        id: string;
                                        external_id: string;
                                        i18n_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        mobile: {
                                            phone: string;
                                            code?: string;
                                        };
                                        employee_type_id: string;
                                        email?: string;
                                        job_category_id?: string;
                                        job_level_id?: string;
                                        join_time?: number;
                                        leader_id?: string;
                                        dotted_line_leader_ids?: Array<string>;
                                        employee_no?: string;
                                        department_ids: Array<string>;
                                        custom_fields?: Array<{
                                            id: string;
                                            value: string;
                                        }>;
                                        is_deactived: boolean;
                                        is_terminated: boolean;
                                        sync_info: {
                                            sync_status: number;
                                            open_id?: string;
                                            union_id?: string;
                                            user_id?: string;
                                        };
                                        avatar?: {
                                            avatar?: string;
                                            avatar72?: string;
                                            avatar240?: string;
                                            avatar640?: string;
                                        };
                                        gender?: number;
                                        work_station?: string;
                                        country_id?: string;
                                        city_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/employees`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_admin&resource=employee&apiName=all&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=all&project=people_admin&resource=employee&version=v1 document }
                 *
                 * 获取员工列表
                 */
                all: async (
                    payload?: {
                        params: {
                            department_id?: string;
                            department_id_type?:
                                | "department_id"
                                | "open_department_id"
                                | "people_admin_department_id";
                            is_deactived?: boolean;
                            is_terminated?: boolean;
                            page_size: number;
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
                                    page_token?: string;
                                    has_more?: boolean;
                                    items?: Array<{
                                        id: string;
                                        external_id: string;
                                        i18n_name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        mobile: {
                                            phone: string;
                                            code?: string;
                                        };
                                        employee_type_id: string;
                                        email?: string;
                                        job_category_id?: string;
                                        job_level_id?: string;
                                        join_time?: number;
                                        leader_id?: string;
                                        dotted_line_leader_ids?: Array<string>;
                                        employee_no?: string;
                                        department_ids: Array<string>;
                                        custom_fields?: Array<{
                                            id: string;
                                            value: string;
                                        }>;
                                        is_deactived: boolean;
                                        is_terminated: boolean;
                                        sync_info: {
                                            sync_status: number;
                                            open_id?: string;
                                            union_id?: string;
                                            user_id?: string;
                                        };
                                        avatar?: {
                                            avatar?: string;
                                            avatar72?: string;
                                            avatar240?: string;
                                            avatar640?: string;
                                        };
                                        gender?: number;
                                        work_station?: string;
                                        country_id?: string;
                                        city_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_admin/v1/employees/all`,
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
