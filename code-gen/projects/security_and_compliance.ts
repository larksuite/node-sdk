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
import search from "./search";

// auto gen
export default abstract class Client extends search {
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
    security_and_compliance = {
        /**
         * openapi_log
         */
        openapiLog: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=openapi_log&apiName=list_data&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_data&project=security_and_compliance&resource=openapi_log&version=v1 document }
             *
             * 获取OpenAPI审计日志数据
             *
             * 该接口用于获取OpenAPI审计日志数据
             */
            listData: async (
                payload?: {
                    data?: {
                        api_keys?: Array<string>;
                        start_time?: number;
                        end_time?: number;
                        app_id?: string;
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
                                    id: string;
                                    api_key: string;
                                    event_time?: number;
                                    app_id?: string;
                                    ip?: string;
                                    log_detail?: {
                                        path?: string;
                                        method?: string;
                                        query_param?: string;
                                        payload?: string;
                                        status_code?: number;
                                        response?: string;
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/openapi_logs/list_data`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * user_migration
         */
        userMigration: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=user_migration&apiName=cancel&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel&project=security_and_compliance&resource=user_migration&version=v1 document }
             *
             * 取消用户迁移任务
             *
             * 取消用户迁移任务，仅能对未启动迁移的用户做此操作。用户迁移状态可通过「获取单个用户迁移状态」查询。
             */
            cancel: async (
                payload?: {
                    data: { user_ids: Array<string> };
                    params: {
                        user_id_type: "user_id" | "union_id" | "open_id";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/user_migrations/cancel`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=user_migration&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=user_migration&version=v1 document }
             *
             * 获取单个用户迁移状态
             *
             * 通过user_id获取指定用户当前的迁移状态
             */
            get: async (
                payload?: {
                    params: {
                        user_id_type: "user_id" | "union_id" | "open_id";
                    };
                    path: { user_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_migration?: {
                                    user_id?: string;
                                    dest_geo?: string;
                                    task_id?: string;
                                    status?: "0" | "1" | "2";
                                    progress?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/user_migrations/:user_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=user_migration&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=security_and_compliance&resource=user_migration&version=v1 document }
             *
             * 批量获取用户迁移状态
             *
             * 传入用户 ID 列表，批量获取用户迁移状态
             */
            search: async (
                payload?: {
                    data: { user_ids: Array<string> };
                    params: {
                        user_id_type: "user_id" | "union_id" | "open_id";
                    };
                },
                options?: IRequestOptions
            ) => {
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
                                    user_id?: string;
                                    dest_geo?: string;
                                    task_id?: string;
                                    status?: "0" | "1" | "2";
                                    progress?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/user_migrations/search`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=user_migration&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=user_migration&version=v1 document }
             *
             * 迁移用户数据驻留位置
             *
             * 将用户的数据驻留位置迁移到目标地理位置。
             */
            create: async (
                payload?: {
                    data: { user_ids: Array<string>; dest_geo: string };
                    params: {
                        user_id_type: "user_id" | "union_id" | "open_id";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                user_migrations?: Array<{
                                    user_id?: string;
                                    dest_geo?: string;
                                    task_id?: string;
                                    status?: "0" | "1" | "2";
                                    progress?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/user_migrations`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
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
         * multi_geo_entity.tenant
         */
        multiGeoEntityTenant: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=multi_geo_entity.tenant&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=multi_geo_entity.tenant&version=v1 document }
             *
             * 获取数据驻留地理位置列表
             *
             * 获取租户可用的数据驻留地理位置列表
             */
            get: async (payload?: {}, options?: IRequestOptions) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: {
                                tenant?: {
                                    available_geo_locations: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/security_and_compliance/v1/multi_geo_entity/tenant`,
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
             * openapi_log
             */
            openapiLog: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=openapi_log&apiName=list_data&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_data&project=security_and_compliance&resource=openapi_log&version=v1 document }
                 *
                 * 获取OpenAPI审计日志数据
                 *
                 * 该接口用于获取OpenAPI审计日志数据
                 */
                listData: async (
                    payload?: {
                        data?: {
                            api_keys?: Array<string>;
                            start_time?: number;
                            end_time?: number;
                            app_id?: string;
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
                                        id: string;
                                        api_key: string;
                                        event_time?: number;
                                        app_id?: string;
                                        ip?: string;
                                        log_detail?: {
                                            path?: string;
                                            method?: string;
                                            query_param?: string;
                                            payload?: string;
                                            status_code?: number;
                                            response?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/openapi_logs/list_data`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * user_migration
             */
            userMigration: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=user_migration&apiName=cancel&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel&project=security_and_compliance&resource=user_migration&version=v1 document }
                 *
                 * 取消用户迁移任务
                 *
                 * 取消用户迁移任务，仅能对未启动迁移的用户做此操作。用户迁移状态可通过「获取单个用户迁移状态」查询。
                 */
                cancel: async (
                    payload?: {
                        data: { user_ids: Array<string> };
                        params: {
                            user_id_type: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/security_and_compliance/v1/user_migrations/cancel`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=user_migration&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=user_migration&version=v1 document }
                 *
                 * 获取单个用户迁移状态
                 *
                 * 通过user_id获取指定用户当前的迁移状态
                 */
                get: async (
                    payload?: {
                        params: {
                            user_id_type: "user_id" | "union_id" | "open_id";
                        };
                        path: { user_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    user_migration?: {
                                        user_id?: string;
                                        dest_geo?: string;
                                        task_id?: string;
                                        status?: "0" | "1" | "2";
                                        progress?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/user_migrations/:user_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=user_migration&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=security_and_compliance&resource=user_migration&version=v1 document }
                 *
                 * 批量获取用户迁移状态
                 *
                 * 传入用户 ID 列表，批量获取用户迁移状态
                 */
                search: async (
                    payload?: {
                        data: { user_ids: Array<string> };
                        params: {
                            user_id_type: "user_id" | "union_id" | "open_id";
                        };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        user_id?: string;
                                        dest_geo?: string;
                                        task_id?: string;
                                        status?: "0" | "1" | "2";
                                        progress?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/user_migrations/search`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=user_migration&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=user_migration&version=v1 document }
                 *
                 * 迁移用户数据驻留位置
                 *
                 * 将用户的数据驻留位置迁移到目标地理位置。
                 */
                create: async (
                    payload?: {
                        data: { user_ids: Array<string>; dest_geo: string };
                        params: {
                            user_id_type: "user_id" | "union_id" | "open_id";
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    user_migrations?: Array<{
                                        user_id?: string;
                                        dest_geo?: string;
                                        task_id?: string;
                                        status?: "0" | "1" | "2";
                                        progress?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/user_migrations`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * multi_geo_entity.tenant
             */
            multiGeoEntityTenant: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=multi_geo_entity.tenant&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=multi_geo_entity.tenant&version=v1 document }
                 *
                 * 获取数据驻留地理位置列表
                 *
                 * 获取租户可用的数据驻留地理位置列表
                 */
                get: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    tenant?: {
                                        available_geo_locations: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v1/multi_geo_entity/tenant`,
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
        v2: {
            /**
             * device_apply_record
             */
            deviceApplyRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_apply_record&apiName=update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=security_and_compliance&resource=device_apply_record&version=v2 document }
                 *
                 * 审批设备申报
                 *
                 * 使用该接口在设备管理中通过或驳回一条成员自主申报申请
                 */
                update: async (
                    payload?: {
                        data: { is_approved: boolean };
                        path: { device_apply_record_id: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v2/device_apply_records/:device_apply_record_id`,
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
             * device_record
             */
            deviceRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=delete&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=security_and_compliance&resource=device_record&version=v2 document }
                 *
                 * 删除设备
                 *
                 * 使用该接口在设备管理中删除一台设备
                 */
                delete: async (
                    payload?: {
                        path: { device_record_id: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v2/device_records/:device_record_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=mine&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=mine&project=security_and_compliance&resource=device_record&version=v2 document }
                 *
                 * 获取设备认证信息
                 *
                 * 通过客户端授权信息获取对应设备认证信息，包含设备归属、可信状态等
                 */
                mine: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    device_record_id?: string;
                                    device_ownership?: number;
                                    device_status?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/device_records/mine`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=security_and_compliance&resource=device_record&version=v2 document }
                 *
                 * 更新设备
                 *
                 * 使用该接口在设备管理中修改一台设备的设备归属、设备状态等信息
                 */
                update: async (
                    payload?: {
                        data?: {
                            device_ownership?: number;
                            device_status?: number;
                            is_public?: boolean;
                        };
                        params: { version: string };
                        path: { device_record_id: string };
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
                                `${this.domain}/open-apis/security_and_compliance/v2/device_records/:device_record_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=security_and_compliance&resource=device_record&version=v2 document }
                 *
                 * 新增设备
                 *
                 * 使用该接口在设备管理中新增一台设备。新增设备的类型为管理员导入
                 */
                create: async (
                    payload?: {
                        data?: {
                            device_system?: number;
                            device_ownership?: number;
                            device_status?: number;
                            is_public?: boolean;
                            serial_number?: string;
                            disk_serial_number?: string;
                            uuid?: string;
                            mac_address?: string;
                            android_id?: string;
                            idfv?: string;
                            aaid?: string;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { device_record_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/device_records`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=security_and_compliance&resource=device_record&version=v2 document }
                 *
                 * 获取设备信息
                 *
                 * 使用该接口在设备管理中获取设备的设备参数、设备归属、设备状态等信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { device_record_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    device_record?: {
                                        device_record_id: string;
                                        version: string;
                                        current_user_id?: string;
                                        device_name?: string;
                                        model?: string;
                                        device_system: number;
                                        serial_number?: string;
                                        disk_serial_number?: string;
                                        uuid?: string;
                                        mac_address?: string;
                                        android_id?: string;
                                        idfv?: string;
                                        aaid?: string;
                                        device_ownership: number;
                                        device_status: number;
                                        certification_level: number;
                                        device_terminal_type: number;
                                        latest_user_id?: string;
                                        dids?: Array<string>;
                                        is_managed?: boolean;
                                        mdm_device_id?: string;
                                        mdm_provider_name?: string;
                                        lsa_info?: string;
                                        device_env_info?: string;
                                        created_at?: number;
                                        updated_at?: number;
                                        is_public?: boolean;
                                        source?: number;
                                        cert_verified_at_unix?: string;
                                        cert_serial_number?: string;
                                        cert_issuer?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/device_records/:device_record_id`,
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
                        params: {
                            page_size: number;
                            page_token?: string;
                            device_record_id?: string;
                            current_user_id?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            device_name?: string;
                            serial_number?: string;
                            disk_serial_number?: string;
                            mac_address?: string;
                            android_id?: string;
                            uuid?: string;
                            idfv?: string;
                            aaid?: string;
                            device_ownership?: number;
                            device_status?: number;
                            device_terminal_type?: number;
                            os?: number;
                            latest_user_id?: string;
                            did?: string;
                            is_managed?: boolean;
                            mdm_device_id?: string;
                            mdm_provider_name?: string;
                            lsa_client_status?: number;
                            device_env_detect_status?: number;
                            is_public?: boolean;
                            source?: number;
                            cert_serial_number?: string;
                            cert_issuer?: string;
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
                                    `${this.domain}/open-apis/security_and_compliance/v2/device_records`,
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
                                                        device_record_id: string;
                                                        version: string;
                                                        current_user_id?: string;
                                                        device_name?: string;
                                                        model?: string;
                                                        device_system: number;
                                                        serial_number?: string;
                                                        disk_serial_number?: string;
                                                        uuid?: string;
                                                        mac_address?: string;
                                                        android_id?: string;
                                                        idfv?: string;
                                                        aaid?: string;
                                                        device_ownership: number;
                                                        device_status: number;
                                                        certification_level: number;
                                                        device_terminal_type: number;
                                                        latest_user_id?: string;
                                                        dids?: Array<string>;
                                                        is_managed?: boolean;
                                                        mdm_device_id?: string;
                                                        mdm_provider_name?: string;
                                                        lsa_info?: string;
                                                        device_env_info?: string;
                                                        created_at?: number;
                                                        updated_at?: number;
                                                        is_public?: boolean;
                                                        source?: number;
                                                        cert_verified_at_unix?: string;
                                                        cert_serial_number?: string;
                                                        cert_issuer?: string;
                                                    }>;
                                                    page_token: string;
                                                    has_more: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=security_and_compliance&resource=device_record&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=security_and_compliance&resource=device_record&version=v2 document }
                 *
                 * 查询设备信息
                 *
                 * 使用该接口可分页查询设备列表信息
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            device_record_id?: string;
                            current_user_id?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            device_name?: string;
                            serial_number?: string;
                            disk_serial_number?: string;
                            mac_address?: string;
                            android_id?: string;
                            uuid?: string;
                            idfv?: string;
                            aaid?: string;
                            device_ownership?: number;
                            device_status?: number;
                            device_terminal_type?: number;
                            os?: number;
                            latest_user_id?: string;
                            did?: string;
                            is_managed?: boolean;
                            mdm_device_id?: string;
                            mdm_provider_name?: string;
                            lsa_client_status?: number;
                            device_env_detect_status?: number;
                            is_public?: boolean;
                            source?: number;
                            cert_serial_number?: string;
                            cert_issuer?: string;
                        };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        device_record_id: string;
                                        version: string;
                                        current_user_id?: string;
                                        device_name?: string;
                                        model?: string;
                                        device_system: number;
                                        serial_number?: string;
                                        disk_serial_number?: string;
                                        uuid?: string;
                                        mac_address?: string;
                                        android_id?: string;
                                        idfv?: string;
                                        aaid?: string;
                                        device_ownership: number;
                                        device_status: number;
                                        certification_level: number;
                                        device_terminal_type: number;
                                        latest_user_id?: string;
                                        dids?: Array<string>;
                                        is_managed?: boolean;
                                        mdm_device_id?: string;
                                        mdm_provider_name?: string;
                                        lsa_info?: string;
                                        device_env_info?: string;
                                        created_at?: number;
                                        updated_at?: number;
                                        is_public?: boolean;
                                        source?: number;
                                        cert_verified_at_unix?: string;
                                        cert_serial_number?: string;
                                        cert_issuer?: string;
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/security_and_compliance/v2/device_records`,
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
