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
import rule_engine from "./rule_engine";

// auto gen
export default abstract class Client extends rule_engine {
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
    saasbi = {
        v1: {
            /**
             * report_info
             */
            reportInfo: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=saasbi&resource=report_info&apiName=list_corehr&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_corehr&project=saasbi&resource=report_info&version=v1 document }
                 *
                 * 获取corehr报表列表
                 */
                listCorehr: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    report_infos?: Array<{ schema?: string }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/saasbi/v1/report_info/list_corehr`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=saasbi&resource=report_info&apiName=corehr&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=corehr&project=saasbi&resource=report_info&version=v1 document }
                 *
                 * 根据ReportKey查询报表schema
                 */
                corehr: async (
                    payload?: {
                        params?: { report_key?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { report_info?: { schema?: string } };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/saasbi/v1/report_info/corehr`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=saasbi&resource=report_info&apiName=list_atsx&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_atsx&project=saasbi&resource=report_info&version=v1 document }
                 *
                 * 查询招聘报表列表
                 */
                listAtsx: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    report_infos?: Array<{ schema?: string }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/saasbi/v1/report_info/list_atsx`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=saasbi&resource=report_info&apiName=atsx&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=atsx&project=saasbi&resource=report_info&version=v1 document }
                 *
                 * 根据ReportKey查询报表schema
                 */
                atsx: async (
                    payload?: {
                        params?: { report_key?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { report_info?: { schema?: string } };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/saasbi/v1/report_info/atsx`,
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
             * filter
             */
            filter: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=saasbi&resource=filter&apiName=list_corehr_filter_options&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_corehr_filter_options&project=saasbi&resource=filter&version=v1 document }
                 *
                 * 查询筛选项数据
                 */
                listCorehrFilterOptions: async (
                    payload?: {
                        data: {
                            field_id: string;
                            dataset_id: string;
                            keyword?: string;
                            offset?: number;
                            limit?: number;
                            report_key: string;
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
                                    options?: Array<{
                                        value?: string;
                                        label?: string;
                                        children?: Array<{}>;
                                        render_type?: string;
                                        render_value?: string;
                                        has_children?: boolean;
                                    }>;
                                    count?: string;
                                    is_tree?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/saasbi/v1/filter/list_corehr_filter_options`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=saasbi&resource=filter&apiName=list_corehr_filter&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_corehr_filter&project=saasbi&resource=filter&version=v1 document }
                 *
                 * 查询可筛选字段
                 */
                listCorehrFilter: async (
                    payload?: {
                        params: { report_key: string; dataset_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    filters?: Array<{
                                        name?: {
                                            zh?: string;
                                            en?: string;
                                            i18n?: string;
                                        };
                                        desc?: {
                                            zh?: string;
                                            en?: string;
                                            i18n?: string;
                                        };
                                        disp_type?: string;
                                        field_id?: string;
                                        field_type?: string;
                                        value_type?: string;
                                        enumerable?: boolean;
                                        is_tree?: boolean;
                                        children?: Array<{}>;
                                        render_data?: string;
                                        folder_path?: string;
                                        display_card?: boolean;
                                        is_batch_filterable?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/saasbi/v1/filter/list_corehr_filter`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=saasbi&resource=filter&apiName=list_atsx_filter&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_atsx_filter&project=saasbi&resource=filter&version=v1 document }
                 *
                 * 查询可筛选字段
                 */
                listAtsxFilter: async (
                    payload?: {
                        params: { report_key: string; dataset_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    filters?: Array<{
                                        name?: {
                                            zh?: string;
                                            en?: string;
                                            i18n?: string;
                                        };
                                        desc?: {
                                            zh?: string;
                                            en?: string;
                                            i18n?: string;
                                        };
                                        disp_type?: string;
                                        field_id?: string;
                                        field_type?: string;
                                        value_type?: string;
                                        enumerable?: boolean;
                                        is_tree?: boolean;
                                        children?: Array<{}>;
                                        render_data?: string;
                                        folder_path?: string;
                                        display_card?: boolean;
                                        is_batch_filterable?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/saasbi/v1/filter/list_atsx_filter`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=saasbi&resource=filter&apiName=list_atsx_filter_options&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_atsx_filter_options&project=saasbi&resource=filter&version=v1 document }
                 *
                 * 查询筛选项数据
                 */
                listAtsxFilterOptions: async (
                    payload?: {
                        data: {
                            field_id: string;
                            dataset_id: string;
                            keyword?: string;
                            offset?: number;
                            limit?: number;
                            report_key: string;
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
                                    options?: Array<{
                                        value?: string;
                                        label?: string;
                                        children?: Array<{}>;
                                        render_type?: string;
                                        render_value?: string;
                                        has_children?: boolean;
                                    }>;
                                    count?: string;
                                    is_tree?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/saasbi/v1/filter/list_atsx_filter_options`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
             * report_dt
             */
            reportDt: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=saasbi&resource=report_dt&apiName=query_corehr&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query_corehr&project=saasbi&resource=report_dt&version=v1 document }
                 *
                 * 查询人事报表数据（需要人事系统报表权限）
                 */
                queryCorehr: async (
                    payload?: {
                        data: {
                            report_key: string;
                            conditions?: Array<{
                                exclude_children?: boolean;
                                op?: string;
                                field_id?: string;
                                field_data_type?: string;
                                options?: Array<{
                                    label?: string;
                                    value?: string;
                                    select_exclude?: boolean;
                                }>;
                                values?: Array<string>;
                                uniq_key?: string;
                                is_batch?: boolean;
                                time_range?: { from?: string; to?: string };
                            }>;
                            limit?: string;
                            offset?: string;
                            query_id?: string;
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
                                    report_data?: {
                                        data?: string;
                                        total?: number;
                                        query_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/saasbi/v1/report_dt/query_corehr`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=saasbi&resource=report_dt&apiName=query_atsx&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query_atsx&project=saasbi&resource=report_dt&version=v1 document }
                 *
                 * 查询招聘报表数据（需要有招聘系统报表权限）
                 */
                queryAtsx: async (
                    payload?: {
                        data: {
                            report_key: string;
                            conditions?: Array<{
                                exclude_children?: boolean;
                                op?: string;
                                field_id?: string;
                                field_data_type?: string;
                                options?: Array<{
                                    label?: string;
                                    value?: string;
                                    select_exclude?: boolean;
                                }>;
                                values?: Array<string>;
                                uniq_key?: string;
                                is_batch?: boolean;
                                time_range?: { from?: string; to?: string };
                            }>;
                            limit?: string;
                            offset?: string;
                            query_id?: string;
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
                                    report_data?: {
                                        data?: string;
                                        total?: number;
                                        query_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/saasbi/v1/report_dt/query_atsx`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=saasbi&resource=report_dt&apiName=change_dashboard_report_owner_by_manager&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=change_dashboard_report_owner_by_manager&project=saasbi&resource=report_dt&version=v1 document }
                 *
                 * 管理员通过指定新旧Owner，转移报表所有者
                 */
                changeDashboardReportOwnerByManager: async (
                    payload?: {
                        data: {
                            report_key: string;
                            new_owner_id: string;
                            old_owner_id: string;
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
                                data?: { data?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/saasbi/v1/report_dt/change_dashboard_report_owner_by_manager`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
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
