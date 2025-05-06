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
import aily from "./aily";

// auto gen
export default abstract class Client extends aily {
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
    apaas = {
        v1: {
            /**
             * application.audit_log
             */
            applicationAuditLog: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.audit_log&apiName=audit_log_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=audit_log_list&project=apaas&resource=application.audit_log&version=v1 document }
                 *
                 * 获取审计日志列表
                 */
                auditLogList: async (
                    payload?: {
                        params: {
                            page_size: string;
                            offset: string;
                            quick_query?: string;
                            from: string;
                            to: string;
                            log_type: string;
                            filter?: string;
                            columns?: Array<string>;
                            sort_by?: string;
                            sort_order?: string;
                            app_type?: string;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        log_id?: string;
                                        op_time?: string;
                                        log_type?: string;
                                        operator?: {
                                            id?: string;
                                            name?: string;
                                            tenant_id?: string;
                                            email?: string;
                                        };
                                        outsider?: boolean;
                                        login_type?: string;
                                        lark_tenant_id?: string;
                                        apaas_tenant_id?: string;
                                        user_geo?: string;
                                        client_ip?: string;
                                        ip_loc?: string;
                                        ip_provider?: string;
                                        referer?: string;
                                        origin?: string;
                                        api_path?: string;
                                        full_path?: string;
                                        user_agent?: string;
                                        device_id?: string;
                                        web_device_id?: string;
                                        terminal_type?: string;
                                        os_type?: string;
                                        os_version?: string;
                                        module?: string;
                                        data_object?: string;
                                        audit_scope?: string;
                                        tenant_id?: string;
                                        namespace?: string;
                                        env_type?: string;
                                        op_type?: string;
                                        op_detail?: Record<string, string>;
                                        op_source?: string;
                                        status?: string;
                                        failed_reason_i18n?: Record<
                                            string,
                                            string
                                        >;
                                        data_changes?: Array<string>;
                                        app_name?: Record<string, string>;
                                        keyword_field_app_version?: string;
                                        keyword_field_functional_sub_module?: string;
                                    }>;
                                    total?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/audit_log/audit_log_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.audit_log&apiName=data_change_log_detail&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=data_change_log_detail&project=apaas&resource=application.audit_log&version=v1 document }
                 *
                 * 获取数据变更日志详情
                 */
                dataChangeLogDetail: async (
                    payload?: {
                        params: { log_id: string };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    data?: {
                                        log_id?: string;
                                        basic_info?: {
                                            log_type?: string;
                                            audit_scope?: string;
                                            env_type?: string;
                                            app_id?: string;
                                            module?: string;
                                            op_type?: string;
                                            app_name?: Record<string, string>;
                                        };
                                        op_info?: {
                                            operator?: {
                                                id?: string;
                                                name?: string;
                                                tenant_id?: string;
                                                email?: string;
                                            };
                                            outsider?: boolean;
                                            op_detail?: Record<string, string>;
                                            status?: string;
                                            failed_reason?: string;
                                            failed_reason_i18n?: Record<
                                                string,
                                                string
                                            >;
                                            op_time?: string;
                                            data_object?: string;
                                            op_source?: string;
                                            data_changes?: Array<string>;
                                        };
                                        login_info?: { login_type?: string };
                                        device_info?: {
                                            device_id?: string;
                                            web_device_id?: string;
                                            terminal_type?: string;
                                            os_type?: string;
                                            os_version?: string;
                                        };
                                        net_info?: {
                                            client_ip?: string;
                                            ip_loc?: string;
                                            ip_provider?: string;
                                            referer?: string;
                                            origin?: string;
                                            user_agent?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/audit_log/data_change_log_detail`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.audit_log&apiName=data_change_logs_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=data_change_logs_list&project=apaas&resource=application.audit_log&version=v1 document }
                 *
                 * 获取数据变更日志列表
                 */
                dataChangeLogsList: async (
                    payload?: {
                        params: {
                            quick_query?: string;
                            page_size: string;
                            offset: string;
                            from?: string;
                            to?: string;
                            log_type: string;
                            filter?: string;
                            columns?: Array<string>;
                            sort_by?: string;
                            sort_order?: string;
                            app_type?: string;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        log_id?: string;
                                        op_time?: string;
                                        log_type?: string;
                                        operator?: {
                                            id?: string;
                                            name?: string;
                                            tenant_id?: string;
                                            email?: string;
                                        };
                                        outsider?: boolean;
                                        login_type?: string;
                                        lark_tenant_id?: string;
                                        apaas_tenant_id?: string;
                                        user_geo?: string;
                                        client_ip?: string;
                                        ip_loc?: string;
                                        ip_provider?: string;
                                        referer?: string;
                                        origin?: string;
                                        api_path?: string;
                                        full_path?: string;
                                        user_agent?: string;
                                        device_id?: string;
                                        web_device_id?: string;
                                        terminal_type?: string;
                                        os_type?: string;
                                        os_version?: string;
                                        module?: string;
                                        data_object?: string;
                                        audit_scope?: string;
                                        tenant_id?: string;
                                        namespace?: string;
                                        env_type?: string;
                                        op_type?: string;
                                        op_detail?: Record<string, string>;
                                        op_source?: string;
                                        status?: string;
                                        failed_reason_i18n?: Record<
                                            string,
                                            string
                                        >;
                                        data_changes?: Array<string>;
                                        app_name?: Record<string, string>;
                                        keyword_field_app_version?: string;
                                        keyword_field_functional_sub_module?: string;
                                    }>;
                                    total?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/audit_log/data_change_logs_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.audit_log&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.audit_log&version=v1 document }
                 *
                 * 获取审计日志详情
                 */
                get: async (
                    payload?: {
                        params: { log_id: string };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    data?: {
                                        log_id?: string;
                                        basic_info?: {
                                            log_type?: string;
                                            audit_scope?: string;
                                            env_type?: string;
                                            app_id?: string;
                                            module?: string;
                                            op_type?: string;
                                            app_name?: Record<string, string>;
                                        };
                                        op_info?: {
                                            operator?: {
                                                id?: string;
                                                name?: string;
                                                tenant_id?: string;
                                                email?: string;
                                            };
                                            outsider?: boolean;
                                            op_detail?: Record<string, string>;
                                            status?: string;
                                            failed_reason?: string;
                                            failed_reason_i18n?: Record<
                                                string,
                                                string
                                            >;
                                            op_time?: string;
                                            data_object?: string;
                                            op_source?: string;
                                            data_changes?: Array<string>;
                                        };
                                        login_info?: { login_type?: string };
                                        device_info?: {
                                            device_id?: string;
                                            web_device_id?: string;
                                            terminal_type?: string;
                                            os_type?: string;
                                            os_version?: string;
                                        };
                                        net_info?: {
                                            client_ip?: string;
                                            ip_loc?: string;
                                            ip_provider?: string;
                                            referer?: string;
                                            origin?: string;
                                            user_agent?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/audit_log`,
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
             * application.environment_variable
             */
            applicationEnvironmentVariable: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.environment_variable&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.environment_variable&version=v1 document }
                 *
                 * 查询环境变量详情
                 */
                get: async (
                    payload?: {
                        path: {
                            namespace: string;
                            environment_variable_api_name: string;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    item?: {
                                        api_name: string;
                                        label: { zh_cn: string; en_us: string };
                                        description: string;
                                        value: string;
                                        is_encrypted?: boolean;
                                        object_api_name?: string;
                                        object_label?: {
                                            zh_cn: string;
                                            en_us: string;
                                        };
                                        created_at?: number;
                                        updated_at: number;
                                        type?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/environment_variables/:environment_variable_api_name`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.environment_variable&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=application.environment_variable&version=v1 document }
                 *
                 * 查询环境变量列表
                 */
                query: async (
                    payload?: {
                        data?: {
                            filter?: { quick_query?: string };
                            limit?: number;
                            offset?: number;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        api_name: string;
                                        label: { zh_cn: string; en_us: string };
                                        description: string;
                                        value: string;
                                        is_encrypted?: boolean;
                                        object_api_name?: string;
                                        object_label?: {
                                            zh_cn: string;
                                            en_us: string;
                                        };
                                        created_at?: number;
                                        updated_at: number;
                                        type?: string;
                                    }>;
                                    total: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/environment_variables/query`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * application.flow
             */
            applicationFlow: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.flow&apiName=execute&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=execute&project=apaas&resource=application.flow&version=v1 document }
                 *
                 * 流程执行接口
                 */
                execute: async (
                    payload?: {
                        data: {
                            is_async?: boolean;
                            idempotent_key?: string;
                            loop_masks?: Array<string>;
                            params?: string;
                            operator: string;
                        };
                        path: { namespace: string; flow_id: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                    out_params?: string;
                                    execution_id?: string;
                                    error_msg?: string;
                                    code?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/flows/:flow_id/execute`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * application.function
             */
            applicationFunction: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.function&apiName=invoke&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=invoke&project=apaas&resource=application.function&version=v1 document }
                 *
                 * 执行函数
                 */
                invoke: async (
                    payload?: {
                        data?: { params?: string };
                        path: { namespace: string; function_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { result?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/functions/:function_api_name/invoke`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * application.object
             */
            applicationObject: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object&apiName=oql_query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=oql_query&project=apaas&resource=application.object&version=v1 document }
                 *
                 * 执行 OQL
                 */
                oqlQuery: async (
                    payload?: {
                        data: {
                            query: string;
                            args?: string;
                            named_args?: string;
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { columns: Array<string>; rows: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/oql_query`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=apaas&resource=application.object&version=v1 document }
                 *
                 * 搜索记录
                 */
                search: async (
                    payload?: {
                        data?: {
                            q?: string;
                            search_objects?: Array<{
                                api_name?: string;
                                search_fields?: Array<string>;
                                select?: Array<string>;
                                filter?: {
                                    conditions?: Array<{
                                        index?: string;
                                        left?: {
                                            type?: string;
                                            settings?: string;
                                            display_names?: Array<string>;
                                        };
                                        right?: {
                                            type?: string;
                                            settings?: string;
                                            display_names?: Array<string>;
                                        };
                                        operator?: string;
                                    }>;
                                    logic_expression?: string;
                                };
                                order_by?: {
                                    field?: string;
                                    order_type?: "asc" | "desc";
                                };
                            }>;
                            page_token?: string;
                            page_size?: string;
                            metadata?: "Label" | "SearchLayout";
                        };
                        path: { namespace: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    records?: string;
                                    has_more?: boolean;
                                    next_page_token?: string;
                                    objects?: Array<{
                                        object?: {
                                            id?: number;
                                            api_name?: string;
                                            label?: Record<string, string>;
                                            settings?: {
                                                display_name?: string;
                                                allow_search_fields?: Array<string>;
                                                search_layout?: {
                                                    display_fields?: Array<string>;
                                                };
                                            };
                                        };
                                        fields?: Array<{
                                            id?: number;
                                            api_name?: string;
                                            type?: string;
                                            label?: Record<string, string>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/search`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * application.object.record
             */
            applicationObjectRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 记录批量创建
                 */
                batchCreate: async (
                    payload?: {
                        data: { records: string };
                        path: { namespace: string; object_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        success: boolean;
                                        id?: string;
                                        errors?: Array<{
                                            code: string;
                                            message: string;
                                            sub_code?: string;
                                            fields?: Array<string>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/batch_create`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=batch_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 记录批量删除
                 */
                batchDelete: async (
                    payload?: {
                        data: { ids: Array<string> };
                        path: { namespace: string; object_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        success: boolean;
                                        id?: string;
                                        errors?: Array<{
                                            code: string;
                                            message: string;
                                            sub_code?: string;
                                            fields?: Array<string>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/batch_delete`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=batch_query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_query&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 批量查询对象记录
                 */
                batchQuery: async (
                    payload?: {
                        data: {
                            select: Array<string>;
                            filter?: {
                                conditions?: Array<{
                                    index?: string;
                                    left?: {
                                        type?: string;
                                        settings?: string;
                                        display_names?: Array<string>;
                                    };
                                    right?: {
                                        type?: string;
                                        settings?: string;
                                        display_names?: Array<string>;
                                    };
                                    operator?: string;
                                }>;
                                logic_expression?: string;
                            };
                            order_by?: Array<{
                                field: string;
                                direction: "ASC" | "DESC";
                            }>;
                            group_by?: Array<{ field: string }>;
                            page_token?: string;
                            use_page_token?: boolean;
                            page_size?: number;
                            offset?: number;
                            need_total_count?: boolean;
                        };
                        path: { namespace: string; object_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    items: string;
                                    total?: number;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/batch_query`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 记录批量更新
                 */
                batchUpdate: async (
                    payload?: {
                        data: { records: string };
                        path: { namespace: string; object_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
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
                                        success: boolean;
                                        id?: string;
                                        errors?: Array<{
                                            code: string;
                                            message: string;
                                            sub_code?: string;
                                            fields?: Array<string>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/batch_update`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 创建记录
                 */
                create: async (
                    payload?: {
                        data: { record: string };
                        path: { namespace: string; object_api_name: string };
                    },
                    options?: IRequestOptions
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 删除记录
                 */
                delete: async (
                    payload?: {
                        path: {
                            namespace: string;
                            object_api_name: string;
                            id: string;
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/:id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 更新记录
                 */
                patch: async (
                    payload?: {
                        data: { record: string };
                        path: {
                            namespace: string;
                            object_api_name: string;
                            id: string;
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/:id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.object.record&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=application.object.record&version=v1 document }
                 *
                 * 获取记录
                 */
                query: async (
                    payload?: {
                        data?: { select?: Array<string> };
                        path: {
                            namespace: string;
                            object_api_name: string;
                            id: string;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { item: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/objects/:object_api_name/records/:id/query`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * application.record_permission.member
             */
            applicationRecordPermissionMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.record_permission.member&apiName=batch_create_authorization&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create_authorization&project=apaas&resource=application.record_permission.member&version=v1 document }
                 */
                batchCreateAuthorization: async (
                    payload?: {
                        data?: { user_ids?: Array<string> };
                        path: {
                            namespace: string;
                            record_permission_api_name: string;
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/record_permissions/:record_permission_api_name/member/batch_create_authorization`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.record_permission.member&apiName=batch_remove_authorization&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_remove_authorization&project=apaas&resource=application.record_permission.member&version=v1 document }
                 */
                batchRemoveAuthorization: async (
                    payload?: {
                        data?: { user_ids?: Array<string> };
                        path: {
                            namespace: string;
                            record_permission_api_name: string;
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/record_permissions/:record_permission_api_name/member/batch_remove_authorization`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * application.role.member
             */
            applicationRoleMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.member&apiName=batch_create_authorization&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create_authorization&project=apaas&resource=application.role.member&version=v1 document }
                 *
                 * 批量添加角色成员用户和部门
                 */
                batchCreateAuthorization: async (
                    payload?: {
                        data?: {
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                        };
                        path: { namespace: string; role_api_name: string };
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/roles/:role_api_name/member/batch_create_authorization`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.member&apiName=batch_remove_authorization&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_remove_authorization&project=apaas&resource=application.role.member&version=v1 document }
                 *
                 * 批量删除角色成员用户和部门
                 */
                batchRemoveAuthorization: async (
                    payload?: {
                        data?: {
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                        };
                        path: { namespace: string; role_api_name: string };
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
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/roles/:role_api_name/member/batch_remove_authorization`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=application.role.member&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=apaas&resource=application.role.member&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params?: {
                            need_display_name?: boolean;
                            use_api_id?: boolean;
                        };
                        path: { namespace: string; role_api_name: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    role_member?: {
                                        role_api_id?: string;
                                        role_api_name?: string;
                                        users?: Array<string>;
                                        departments?: Array<string>;
                                        user_filter?: {
                                            conditions?: Array<{
                                                index?: string;
                                                left?: {
                                                    type?: string;
                                                    settings?: string;
                                                    display_names?: Array<string>;
                                                };
                                                right?: {
                                                    type?: string;
                                                    settings?: string;
                                                    display_names?: Array<string>;
                                                };
                                                operator?: string;
                                            }>;
                                            logic_expression?: string;
                                        };
                                        user_display_infos?: Array<{
                                            id?: string;
                                            name?: string;
                                        }>;
                                        department_display_infos?: Array<{
                                            id?: string;
                                            name?: string;
                                        }>;
                                        type?: "all" | "custom";
                                        updated_by?: string;
                                        updated_at?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/applications/:namespace/roles/:role_api_name/member`,
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
             * approval_instance
             */
            approvalInstance: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=approval_instance&apiName=cancel&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel&project=apaas&resource=approval_instance&version=v1 document }
                 */
                cancel: async (
                    payload?: {
                        data: { user_id: string; opinion: string };
                        path: { approval_instance_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/approval_instances/:approval_instance_id/cancel`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * approval_task
             */
            approvalTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=approval_task&apiName=add_assignee&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=add_assignee&project=apaas&resource=approval_task&version=v1 document }
                 */
                addAssignee: async (
                    payload?: {
                        data: {
                            user_id: string;
                            approvers?: Array<string>;
                            add_assignee_type?: string;
                            opinion?: string;
                        };
                        path: { approval_task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/approval_tasks/:approval_task_id/add_assignee`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=approval_task&apiName=agree&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=agree&project=apaas&resource=approval_task&version=v1 document }
                 */
                agree: async (
                    payload?: {
                        data: { user_id: string; opinion?: string };
                        path: { approval_task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/approval_tasks/:approval_task_id/agree`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=approval_task&apiName=reject&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reject&project=apaas&resource=approval_task&version=v1 document }
                 */
                reject: async (
                    payload?: {
                        data: { user_id: string; opinion?: string };
                        path: { approval_task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/approval_tasks/:approval_task_id/reject`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=approval_task&apiName=transfer&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=transfer&project=apaas&resource=approval_task&version=v1 document }
                 */
                transfer: async (
                    payload?: {
                        data: {
                            user_id: string;
                            from_user_ids?: Array<string>;
                            to_user_ids?: Array<string>;
                            opinion?: string;
                        };
                        path: { approval_task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/approval_tasks/:approval_task_id/transfer`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * seat_activity
             */
            seatActivity: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            seat_type: "per_user" | "per_user_per_app";
                            page_size: string;
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
                                    `${this.domain}/open-apis/apaas/v1/seat_activities`,
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
                                                        user_id?: number;
                                                        namespace?: string;
                                                        status?:
                                                            | "in_use"
                                                            | "released";
                                                        active_time?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=seat_activity&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=apaas&resource=seat_activity&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            seat_type: "per_user" | "per_user_per_app";
                            page_size: string;
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
                                        user_id?: number;
                                        namespace?: string;
                                        status?: "in_use" | "released";
                                        active_time?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/seat_activities`,
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
             * seat_assignment
             */
            seatAssignment: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            seat_type: "per_user" | "per_user_per_app";
                            page_size: string;
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
                                    `${this.domain}/open-apis/apaas/v1/seat_assignments`,
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
                                                        user_id?: number;
                                                        namespace?: string;
                                                        status?:
                                                            | "in_use"
                                                            | "released";
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
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=seat_assignment&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=apaas&resource=seat_assignment&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            seat_type: "per_user" | "per_user_per_app";
                            page_size: string;
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
                                        user_id?: number;
                                        namespace?: string;
                                        status?: "in_use" | "released";
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/seat_assignments`,
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
             * user_task
             */
            userTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=cc&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cc&project=apaas&resource=user_task&version=v1 document }
                 */
                cc: async (
                    payload?: {
                        data: {
                            cc_user_ids: Array<string>;
                            operator_user_id: string;
                        };
                        path: { task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/user_tasks/:task_id/cc`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=chat_group&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=chat_group&project=apaas&resource=user_task&version=v1 document }
                 */
                chatGroup: async (
                    payload?: {
                        data: {
                            operator_user_id: string;
                            invite_user_ids?: Array<string>;
                            chat_id?: string;
                            chat_name?: string;
                        };
                        path: { task_id: string };
                    },
                    options?: IRequestOptions
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
                                `${this.domain}/open-apis/apaas/v1/user_tasks/:task_id/chat_group`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=expediting&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=expediting&project=apaas&resource=user_task&version=v1 document }
                 */
                expediting: async (
                    payload?: {
                        data: {
                            operator_user_id: string;
                            expediting_user_ids: Array<string>;
                            opinion?: string;
                        };
                        path: { task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/user_tasks/:task_id/expediting`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=apaas&resource=user_task&version=v1 document }
                 *
                 * 获取任务列表
                 */
                query: async (
                    payload?: {
                        data: {
                            type?: string;
                            source?: string;
                            limit?: string;
                            offset?: string;
                            start_time?: string;
                            end_time?: string;
                            api_ids?: Array<string>;
                            kunlun_user_id: string;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    count?: string;
                                    tasks?: Array<{
                                        task_id?: string;
                                        task_start_time?: string;
                                        workflow_instance?: {
                                            id?: string;
                                            label?: Array<{
                                                language_code?: string;
                                                text?: string;
                                            }>;
                                            status?: string;
                                        };
                                        initiator?: {
                                            user_id?: string;
                                            name?: string;
                                        };
                                        summarys?: Array<{
                                            file_key?: {
                                                language_code?: string;
                                                text?: string;
                                            };
                                            file_value?: Array<{
                                                language_code?: string;
                                                text?: string;
                                            }>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/user_task/query`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=rollback&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=rollback&project=apaas&resource=user_task&version=v1 document }
                 */
                rollback: async (
                    payload?: {
                        data: {
                            operator_user_id: string;
                            to_task_id: string;
                            opinion: string;
                        };
                        path: { task_id: string };
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
                                `${this.domain}/open-apis/apaas/v1/user_tasks/:task_id/rollback`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=apaas&resource=user_task&apiName=rollback_points&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=rollback_points&project=apaas&resource=user_task&version=v1 document }
                 */
                rollbackPoints: async (
                    payload?: {
                        data: { operator_user_id: string };
                        path: { task_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    tasks?: Array<{
                                        id?: string;
                                        activity_label?: Array<{
                                            language_code?: string;
                                            text?: string;
                                        }>;
                                        is_start?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/apaas/v1/user_tasks/:task_id/rollback_points`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
