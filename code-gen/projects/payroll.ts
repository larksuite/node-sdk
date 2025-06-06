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
import passport from "./passport";

// auto gen
export default abstract class Client extends passport {
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
    payroll = {
        v1: {
            /**
             * acct_item
             */
            acctItem: {
                listWithIterator: async (
                    payload?: {
                        params: { page_size: number; page_token?: string };
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
                                    `${this.domain}/open-apis/payroll/v1/acct_items`,
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
                                                        id?: string;
                                                        i18n_names?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                            id?: string;
                                                        }>;
                                                        category_id?: string;
                                                        data_type?: number;
                                                        decimal_places?: number;
                                                        active_status?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=acct_item&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=acct_item&version=v1 document }
                 *
                 * 批量查询算薪项
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
                                    items?: Array<{
                                        id?: string;
                                        i18n_names?: Array<{
                                            locale?: string;
                                            value?: string;
                                            id?: string;
                                        }>;
                                        category_id?: string;
                                        data_type?: number;
                                        decimal_places?: number;
                                        active_status?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/acct_items`,
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
             * cost_allocation_plan
             */
            costAllocationPlan: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            pay_period: string;
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
                                    `${this.domain}/open-apis/payroll/v1/cost_allocation_plans`,
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
                                                        id?: string;
                                                        names?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                            id?: string;
                                                        }>;
                                                        applicable_country_region?: string;
                                                        dimensions?: Array<{
                                                            i18n_names?: Array<{
                                                                locale?: string;
                                                                value?: string;
                                                                id?: string;
                                                            }>;
                                                            api_name?: string;
                                                            obj_api_name?: string;
                                                        }>;
                                                        cost_items?: Array<{
                                                            id?: string;
                                                            name?: Array<{
                                                                locale?: string;
                                                                value?: string;
                                                                id?: string;
                                                            }>;
                                                            enable_correct?: boolean;
                                                        }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=cost_allocation_plan&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=cost_allocation_plan&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            pay_period: string;
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
                                        names?: Array<{
                                            locale?: string;
                                            value?: string;
                                            id?: string;
                                        }>;
                                        applicable_country_region?: string;
                                        dimensions?: Array<{
                                            i18n_names?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                            api_name?: string;
                                            obj_api_name?: string;
                                        }>;
                                        cost_items?: Array<{
                                            id?: string;
                                            name?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                            enable_correct?: boolean;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/cost_allocation_plans`,
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
             * cost_allocation_report
             */
            costAllocationReport: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            cost_allocation_plan_id: string;
                            pay_period: string;
                            report_type: number;
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
                                    `${this.domain}/open-apis/payroll/v1/cost_allocation_reports`,
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
                                                    pay_period?: string;
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    cost_allocation_report_names?: Array<{
                                                        locale?: string;
                                                        value?: string;
                                                        id?: string;
                                                    }>;
                                                    cost_allocation_report_datas?: Array<{
                                                        data_summary_dimensions?: Array<{
                                                            dimension_level?: number;
                                                            dimension_type?: number;
                                                            dimension_value_id?: string;
                                                            enum_dimension?: {
                                                                enum_value_id?: string;
                                                                enum_key?: string;
                                                            };
                                                            dimension_value_lookup_info?: {
                                                                type?: string;
                                                                id?: string;
                                                                code?: string;
                                                            };
                                                            dimension_names?: Array<{
                                                                locale?: string;
                                                                value?: string;
                                                                id?: string;
                                                            }>;
                                                            dimension_titles?: Array<{
                                                                locale?: string;
                                                                value?: string;
                                                                id?: string;
                                                            }>;
                                                        }>;
                                                        compensation_cost_item?: {
                                                            number_of_individuals_for_payment?: number;
                                                            compensation_costs?: Array<{
                                                                compensation_cost_value?: string;
                                                                i18n_names?: Array<{
                                                                    locale?: string;
                                                                    value?: string;
                                                                    id?: string;
                                                                }>;
                                                            }>;
                                                        };
                                                        employment_id?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=cost_allocation_report&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=cost_allocation_report&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            cost_allocation_plan_id: string;
                            pay_period: string;
                            report_type: number;
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
                                    pay_period?: string;
                                    page_token?: string;
                                    has_more?: boolean;
                                    cost_allocation_report_names?: Array<{
                                        locale?: string;
                                        value?: string;
                                        id?: string;
                                    }>;
                                    cost_allocation_report_datas?: Array<{
                                        data_summary_dimensions?: Array<{
                                            dimension_level?: number;
                                            dimension_type?: number;
                                            dimension_value_id?: string;
                                            enum_dimension?: {
                                                enum_value_id?: string;
                                                enum_key?: string;
                                            };
                                            dimension_value_lookup_info?: {
                                                type?: string;
                                                id?: string;
                                                code?: string;
                                            };
                                            dimension_names?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                            dimension_titles?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                        }>;
                                        compensation_cost_item?: {
                                            number_of_individuals_for_payment?: number;
                                            compensation_costs?: Array<{
                                                compensation_cost_value?: string;
                                                i18n_names?: Array<{
                                                    locale?: string;
                                                    value?: string;
                                                    id?: string;
                                                }>;
                                            }>;
                                        };
                                        employment_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/cost_allocation_reports`,
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
             * datasource
             */
            datasource: {
                listWithIterator: async (
                    payload?: {
                        params: { page_size: number; page_token?: string };
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
                                    `${this.domain}/open-apis/payroll/v1/datasources`,
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
                                                    has_more: boolean;
                                                    datasources: Array<{
                                                        code: string;
                                                        i18n_names: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                            id?: string;
                                                        }>;
                                                        active_status: number;
                                                        fields: Array<{
                                                            code: string;
                                                            i18n_names: Array<{
                                                                locale?: string;
                                                                value?: string;
                                                                id?: string;
                                                            }>;
                                                            field_type: number;
                                                            active_status: number;
                                                            i18n_description?: Array<{
                                                                locale?: string;
                                                                value?: string;
                                                                id?: string;
                                                            }>;
                                                            decimal_places?: number;
                                                        }>;
                                                        i18n_description?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                            id?: string;
                                                        }>;
                                                        data_period_type?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=datasource&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=datasource&version=v1 document }
                 *
                 * 获取外部数据源设置列表
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
                                    has_more: boolean;
                                    datasources: Array<{
                                        code: string;
                                        i18n_names: Array<{
                                            locale?: string;
                                            value?: string;
                                            id?: string;
                                        }>;
                                        active_status: number;
                                        fields: Array<{
                                            code: string;
                                            i18n_names: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                            field_type: number;
                                            active_status: number;
                                            i18n_description?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                            decimal_places?: number;
                                        }>;
                                        i18n_description?: Array<{
                                            locale?: string;
                                            value?: string;
                                            id?: string;
                                        }>;
                                        data_period_type?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/datasources`,
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
             * datasource_record
             */
            datasourceRecord: {
                queryWithIterator: async (
                    payload?: {
                        data: {
                            source_code: string;
                            selected_fields?: Array<string>;
                            field_filters?: Array<{
                                field_code: string;
                                field_values?: Array<string>;
                                operator?: number;
                            }>;
                        };
                        params: { page_size: number; page_token?: string };
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
                                    `${this.domain}/open-apis/payroll/v1/datasource_records/query`,
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
                                                    page_token?: string;
                                                    has_more: boolean;
                                                    records: Array<{
                                                        active_status: number;
                                                        field_values: Array<{
                                                            field_code: string;
                                                            value: string;
                                                            field_type?: number;
                                                        }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=datasource_record&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=payroll&resource=datasource_record&version=v1 document }
                 *
                 * 获取外部数据源记录
                 */
                query: async (
                    payload?: {
                        data: {
                            source_code: string;
                            selected_fields?: Array<string>;
                            field_filters?: Array<{
                                field_code: string;
                                field_values?: Array<string>;
                                operator?: number;
                            }>;
                        };
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
                                    has_more: boolean;
                                    records: Array<{
                                        active_status: number;
                                        field_values: Array<{
                                            field_code: string;
                                            value: string;
                                            field_type?: number;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/datasource_records/query`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=datasource_record&apiName=save&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=save&project=payroll&resource=datasource_record&version=v1 document }
                 *
                 * 外部数据记录批量保存接口
                 */
                save: async (
                    payload?: {
                        data: {
                            source_code: string;
                            records: Array<{
                                active_status: number;
                                field_values: Array<{
                                    field_code: string;
                                    value: string;
                                    field_type?: number;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: { affect_counts: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/datasource_records/save`,
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
             * paygroup
             */
            paygroup: {
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
                                    `${this.domain}/open-apis/payroll/v1/paygroups`,
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
                                                        pay_group_id: string;
                                                        name: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        code: string;
                                                        status: number;
                                                        country_region?: {
                                                            id?: string;
                                                            alpha3_code?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=paygroup&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=paygroup&version=v1 document }
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
                                        pay_group_id: string;
                                        name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        code: string;
                                        status: number;
                                        country_region?: {
                                            id?: string;
                                            alpha3_code?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/paygroups`,
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
             * payment_activity
             */
            paymentActivity: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=payment_activity&apiName=archive&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=archive&project=payroll&resource=payment_activity&version=v1 document }
                 *
                 * 封存发薪活动
                 */
                archive: async (
                    payload?: {
                        data: { activity_id: string };
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
                                `${this.domain}/open-apis/payroll/v1/payment_activitys/archive`,
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
                        params: {
                            pay_period_start_date: string;
                            pay_period_end_date: string;
                            page_size: number;
                            page_token?: string;
                            statuses?: Array<number>;
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
                                    `${this.domain}/open-apis/payroll/v1/payment_activitys`,
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
                                                    payment_activitys?: Array<{
                                                        activity_id?: string;
                                                        activity_names?: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                            id?: string;
                                                        }>;
                                                        pay_date?: string;
                                                        total_number_of_payroll?: number;
                                                        number_of_calculation_activities?: number;
                                                        calculation_activities?: Array<{
                                                            calculation_activity_id?: string;
                                                            calculation_activity_names?: Array<{
                                                                locale?: string;
                                                                value?: string;
                                                                id?: string;
                                                            }>;
                                                        }>;
                                                        activity_status?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=payment_activity&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=payment_activity&version=v1 document }
                 *
                 * 根据发薪起止日和审批状态分页查询发薪活动列表
                 */
                list: async (
                    payload?: {
                        params: {
                            pay_period_start_date: string;
                            pay_period_end_date: string;
                            page_size: number;
                            page_token?: string;
                            statuses?: Array<number>;
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
                                    payment_activitys?: Array<{
                                        activity_id?: string;
                                        activity_names?: Array<{
                                            locale?: string;
                                            value?: string;
                                            id?: string;
                                        }>;
                                        pay_date?: string;
                                        total_number_of_payroll?: number;
                                        number_of_calculation_activities?: number;
                                        calculation_activities?: Array<{
                                            calculation_activity_id?: string;
                                            calculation_activity_names?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                        }>;
                                        activity_status?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/payment_activitys`,
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
             * payment_activity_detail
             */
            paymentActivityDetail: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=payment_activity_detail&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=payroll&resource=payment_activity_detail&version=v1 document }
                 *
                 * 根据发薪活动 ID 和分页参数获取发薪活动明细列表
                 */
                list: async (
                    payload?: {
                        params: {
                            page_index: number;
                            page_size: number;
                            activity_id: string;
                            include_segment_data?: boolean;
                            acct_item_ids?: Array<string>;
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
                                    payment_activity_details?: Array<{
                                        employee_id?: string;
                                        payment_details?: Array<{
                                            id?: string;
                                            accounting_item_names?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                            accounting_item_value?: {
                                                original_value?: string;
                                                reference_values?: Array<{
                                                    locale?: string;
                                                    value?: string;
                                                    id?: string;
                                                }>;
                                            };
                                            segment_values?: Array<{
                                                start_time?: string;
                                                end_time?: string;
                                                reference_values?: Array<{
                                                    locale?: string;
                                                    value?: string;
                                                    id?: string;
                                                }>;
                                                original_value?: string;
                                            }>;
                                            accounting_item_type?: number;
                                        }>;
                                    }>;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/payment_activity_details`,
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
             * payment_detail
             */
            paymentDetail: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=payroll&resource=payment_detail&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=payroll&resource=payment_detail&version=v1 document }
                 */
                query: async (
                    payload?: {
                        data: {
                            page_index: number;
                            page_size: number;
                            acct_item_ids?: Array<string>;
                            employee_ids: Array<string>;
                            pay_period_start_date?: string;
                            pay_period_end_date?: string;
                            activity_ids?: Array<string>;
                            include_segment_data?: boolean;
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
                                    payment_details?: Array<{
                                        employee_id?: string;
                                        activity_id?: string;
                                        payment_accounting_items?: Array<{
                                            id?: string;
                                            accounting_item_names?: Array<{
                                                locale?: string;
                                                value?: string;
                                                id?: string;
                                            }>;
                                            accounting_item_value?: {
                                                original_value?: string;
                                                reference_values?: Array<{
                                                    locale?: string;
                                                    value?: string;
                                                    id?: string;
                                                }>;
                                            };
                                            segment_values?: Array<{
                                                start_time?: string;
                                                end_time?: string;
                                                reference_values?: Array<{
                                                    locale?: string;
                                                    value?: string;
                                                    id?: string;
                                                }>;
                                                original_value?: string;
                                            }>;
                                            accounting_item_type?: number;
                                        }>;
                                    }>;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/payroll/v1/payment_detail/query`,
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
