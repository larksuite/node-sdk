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
import people_admin from "./people_admin";

// auto gen
export default abstract class Client extends people_admin {
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
    people_ai = {
        v1: {
            /**
             * table_datum
             */
            tableDatum: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=people_ai&resource=table_datum&apiName=pull_data&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=pull_data&project=people_ai&resource=table_datum&version=v1 document }
                 *
                 * 通过 task_token 拉取数据
                 */
                pullData: async (
                    payload?: {
                        data?: {
                            task_token?: string;
                            cursor?: string;
                            limit?: number;
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
                                    table_data?: {
                                        fields?: Array<{
                                            name?: string;
                                            label?: string;
                                            type?: string;
                                            nullable?: boolean;
                                            default?: string;
                                            comment?: string;
                                            sort_field_name?: string;
                                            complete_data_source?: string;
                                            search_type?: string;
                                            is_strand?: boolean;
                                            supported_operators?: string;
                                        }>;
                                        records?: string;
                                        cursor?: string;
                                        has_more?: boolean;
                                    };
                                    data_status?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_ai/v1/table_data/pull_data`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_ai&resource=table_datum&apiName=submit_task&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=submit_task&project=people_ai&resource=table_datum&version=v1 document }
                 *
                 * 提交一个 SQL 任务
                 */
                submitTask: async (
                    payload?: {
                        data?: {
                            sql?: string;
                            timeout?: number;
                            language?: string;
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
                                data?: { task_token?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_ai/v1/table_data/submit_task`,
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
             * general_knowledge
             */
            generalKnowledge: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=people_ai&resource=general_knowledge&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=people_ai&resource=general_knowledge&version=v1 document }
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
                                    general_knowledge?: {
                                        companys?: Array<{
                                            id: string;
                                            country_region_alpha_2_code?: string;
                                            tags?: Array<string>;
                                            std_names?: Array<string>;
                                            alias_names?: Array<string>;
                                        }>;
                                        schools?: Array<{
                                            id: string;
                                            country_region_alpha_2_code?: string;
                                            tags?: Array<string>;
                                            std_names?: Array<string>;
                                            alias_names?: Array<string>;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_ai/v1/general_knowledge`,
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
             * landing_page
             */
            landingPage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=people_ai&resource=landing_page&apiName=sync_data&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=sync_data&project=people_ai&resource=landing_page&version=v1 document }
                 *
                 * 上传数据
                 */
                syncData: async (
                    payload?: {
                        data?: {
                            diffuse_words?: Array<{
                                original_word?: string;
                                diffuse_words?: Array<string>;
                                table_name?: string;
                                table_field_name?: string;
                            }>;
                            landing_page?: {
                                table_data?: string;
                                table_title?: string;
                                field_relations?: Array<{
                                    table_name?: string;
                                    field_name?: string;
                                    column_name?: string;
                                }>;
                            };
                            data_total?: string;
                            user_query_intentions?: Array<string>;
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
                                    message_dsl?: string;
                                    query_id?: string;
                                    message?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_ai/v1/landing_pages/sync_data`,
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
             * table
             */
            table: {
                searchWithIterator: async (
                    payload?: {
                        data?: {
                            names?: Array<string>;
                            is_contain_field_info?: boolean;
                        };
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
                                    `${this.domain}/open-apis/people_ai/v1/tables/search`,
                                    path
                                ),
                                method: "POST",
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
                                                        name?: string;
                                                        description?: string;
                                                        query_must_fields?: Array<string>;
                                                        fields?: Array<{
                                                            name?: string;
                                                            label?: string;
                                                            type?: string;
                                                            nullable?: boolean;
                                                            default?: string;
                                                            comment?: string;
                                                            sort_field_name?: string;
                                                            complete_data_source?: string;
                                                            search_type?: string;
                                                            is_strand?: boolean;
                                                            supported_operators?: string;
                                                        }>;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    total_count?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_ai&resource=table&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=people_ai&resource=table&version=v1 document }
                 *
                 * 获取表列表
                 */
                search: async (
                    payload?: {
                        data?: {
                            names?: Array<string>;
                            is_contain_field_info?: boolean;
                        };
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
                                        name?: string;
                                        description?: string;
                                        query_must_fields?: Array<string>;
                                        fields?: Array<{
                                            name?: string;
                                            label?: string;
                                            type?: string;
                                            nullable?: boolean;
                                            default?: string;
                                            comment?: string;
                                            sort_field_name?: string;
                                            complete_data_source?: string;
                                            search_type?: string;
                                            is_strand?: boolean;
                                            supported_operators?: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                    total_count?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_ai/v1/tables/search`,
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
             * enum_value
             */
            enumValue: {
                searchWithIterator: async (
                    payload?: {
                        data?: {
                            table_name?: string;
                            enum_field_name?: string;
                        };
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
                                    `${this.domain}/open-apis/people_ai/v1/enum_values/search`,
                                    path
                                ),
                                method: "POST",
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
                                                        id?: string;
                                                        name?: Array<{
                                                            language?: string;
                                                            value?: string;
                                                        }>;
                                                        order?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=people_ai&resource=enum_value&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=people_ai&resource=enum_value&version=v1 document }
                 *
                 * 获取指定枚举值列表
                 */
                search: async (
                    payload?: {
                        data?: {
                            table_name?: string;
                            enum_field_name?: string;
                        };
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
                                        name?: Array<{
                                            language?: string;
                                            value?: string;
                                        }>;
                                        order?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_ai/v1/enum_values/search`,
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
             * finder
             */
            finder: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=people_ai&resource=finder&apiName=employee_search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=employee_search&project=people_ai&resource=finder&version=v1 document }
                 *
                 * 找人、统计
                 */
                employeeSearch: async (
                    payload?: {
                        data?: {
                            query?: string;
                            aily_tenant_id?: string;
                            message_history?: string;
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
                                    extra?: { infos?: Array<string> };
                                    reason_for_sql_generation?: string;
                                    z_dsl?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/people_ai/v1/finder/employee_search`,
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
