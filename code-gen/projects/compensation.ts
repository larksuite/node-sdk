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
import comment_sdk from "./comment_sdk";

// auto gen
export default abstract class Client extends comment_sdk {
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
    compensation = {
        v1: {
            /**
             * archive
             */
            archive: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=archive&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=compensation&resource=archive&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            unique_id: string;
                            operator_id?: string;
                            user_id: string;
                            effective_time: string;
                            currency_id: string;
                            plan_id: string;
                            plan_tid: string;
                            change_reason_id: string;
                            item_value_lists: Array<{
                                item_id: string;
                                item_value: string;
                                item_value_regular?: string;
                            }>;
                            description?: string;
                            edit_remark?: string;
                        };
                        params: {
                            user_id_type:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_corehr_id";
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
                                    unique_id?: string;
                                    archive_tid?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/archives`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=archive&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=compensation&resource=archive&version=v1 document }
                 */
                query: async (
                    payload?: {
                        data: {
                            user_id_list: Array<string>;
                            tid_list?: Array<string>;
                            effective_start_date?: string;
                            effective_end_date?: string;
                        };
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_corehr_id";
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
                                    items: Array<{
                                        user_id: string;
                                        id: string;
                                        tid: string;
                                        plan_id: string;
                                        plan_tid: string;
                                        currency_id?: string;
                                        change_reason_id: string;
                                        change_description: string;
                                        effective_date: string;
                                        expiration_date?: string;
                                        salary_level_id?: string;
                                        created_time?: string;
                                        updated_time?: string;
                                        archive_items: Array<{
                                            item_id: string;
                                            item_result: string;
                                            item_result_regular?: string;
                                        }>;
                                        archive_indicators: Array<{
                                            indicator_id: string;
                                            indicator_result: string;
                                            indicator_result_regular?: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/archives/query`,
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
             * change_reason
             */
            changeReason: {
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
                                    `${this.domain}/open-apis/compensation/v1/change_reasons`,
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
                                                    items: Array<{
                                                        id: string;
                                                        name: string;
                                                        note: string;
                                                        active_status: number;
                                                        i18n_names: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                        }>;
                                                        i18n_notes: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                        }>;
                                                    }>;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=change_reason&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=compensation&resource=change_reason&version=v1 document }
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
                                    items: Array<{
                                        id: string;
                                        name: string;
                                        note: string;
                                        active_status: number;
                                        i18n_names: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        i18n_notes: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/change_reasons`,
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
             * indicator
             */
            indicator: {
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
                                    `${this.domain}/open-apis/compensation/v1/indicators`,
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
                                                    items: Array<{
                                                        id: string;
                                                        name: string;
                                                        value_type:
                                                            | "money"
                                                            | "number"
                                                            | "percent";
                                                        active_status: number;
                                                        i18n_names: Array<{
                                                            locale?: string;
                                                            value?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=indicator&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=compensation&resource=indicator&version=v1 document }
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
                                    items: Array<{
                                        id: string;
                                        name: string;
                                        value_type:
                                            | "money"
                                            | "number"
                                            | "percent";
                                        active_status: number;
                                        i18n_names: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/indicators`,
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
             * item
             */
            item: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            item_type?:
                                | "salary"
                                | "bonus"
                                | "recurring_payment";
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
                                    `${this.domain}/open-apis/compensation/v1/items`,
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
                                                    items: Array<{
                                                        id: string;
                                                        name: string;
                                                        description: string;
                                                        category_id: string;
                                                        value_type:
                                                            | "money"
                                                            | "number"
                                                            | "percent";
                                                        pay_off_frequency_type:
                                                            | "year"
                                                            | "half_year"
                                                            | "quarterly"
                                                            | "bimonthly"
                                                            | "month"
                                                            | "biweekly"
                                                            | "week"
                                                            | "day"
                                                            | "hour";
                                                        decimal_places?: number;
                                                        active_status: number;
                                                        i18n_names: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                        }>;
                                                        i18n_descriptions: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                        }>;
                                                        item_type?:
                                                            | "salary"
                                                            | "bonus"
                                                            | "recurring_payment";
                                                    }>;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=item&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=compensation&resource=item&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            item_type?:
                                | "salary"
                                | "bonus"
                                | "recurring_payment";
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
                                    items: Array<{
                                        id: string;
                                        name: string;
                                        description: string;
                                        category_id: string;
                                        value_type:
                                            | "money"
                                            | "number"
                                            | "percent";
                                        pay_off_frequency_type:
                                            | "year"
                                            | "half_year"
                                            | "quarterly"
                                            | "bimonthly"
                                            | "month"
                                            | "biweekly"
                                            | "week"
                                            | "day"
                                            | "hour";
                                        decimal_places?: number;
                                        active_status: number;
                                        i18n_names: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        i18n_descriptions: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        item_type?:
                                            | "salary"
                                            | "bonus"
                                            | "recurring_payment";
                                    }>;
                                    page_token?: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/items`,
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
             * item_category
             */
            itemCategory: {
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
                                    `${this.domain}/open-apis/compensation/v1/item_categories`,
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
                                                        id: string;
                                                        name: string;
                                                        i18n_names?: Array<{
                                                            locale?: string;
                                                            value?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=item_category&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=compensation&resource=item_category&version=v1 document }
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
                                        id: string;
                                        name: string;
                                        i18n_names?: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/item_categories`,
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
             * lump_sum_payment
             */
            lumpSumPayment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=lump_sum_payment&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=compensation&resource=lump_sum_payment&version=v1 document }
                 */
                batchCreate: async (
                    payload?: {
                        data?: {
                            records?: Array<{
                                unique_id: string;
                                user_id: string;
                                total_amount: string;
                                binding_period: number;
                                currency_id: string;
                                issuance_frequency: number;
                                item_id: string;
                                reference_period_start_date?: string;
                                reference_period_end_date?: string;
                                details: Array<{
                                    issuance_amount: string;
                                    issuance_status:
                                        | "to_be_issued"
                                        | "not_issued";
                                    issuance_way:
                                        | "with_salary"
                                        | "with_cash"
                                        | "with_year_end_bonus";
                                    issuance_time: string;
                                    belong_time: string;
                                    issuance_country_region_id?: string;
                                    issuance_pay_group_id?: string;
                                }>;
                                remark?: string;
                                binding_period_decimal?: string;
                            }>;
                        };
                        params: {
                            user_id_type:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_corehr_id";
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
                                    operate_results?: Array<{
                                        id?: string;
                                        unique_id?: string;
                                        code?: number;
                                        message?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/lump_sum_payment/batch_create`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=lump_sum_payment&apiName=batch_remove&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_remove&project=compensation&resource=lump_sum_payment&version=v1 document }
                 */
                batchRemove: async (
                    payload?: {
                        data?: { record_ids?: Array<string>; reason?: string };
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
                                    operate_results?: Array<{
                                        id?: string;
                                        unique_id?: string;
                                        code?: number;
                                        message?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/lump_sum_payment/batch_remove`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=lump_sum_payment&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=compensation&resource=lump_sum_payment&version=v1 document }
                 */
                batchUpdate: async (
                    payload?: {
                        data?: {
                            records?: Array<{
                                id?: string;
                                total_amount: string;
                                binding_period?: number;
                                currency_id: string;
                                issuance_frequency: number;
                                remark?: string;
                                reference_period_start_date?: string;
                                reference_period_end_date?: string;
                                details: Array<{
                                    id?: string;
                                    issuance_amount?: string;
                                    issuance_status?:
                                        | "to_be_issued"
                                        | "not_issued";
                                    issuance_way?:
                                        | "with_salary"
                                        | "with_cash"
                                        | "with_year_end_bonus";
                                    issuance_time?: string;
                                    belong_time?: string;
                                    issuance_country_region_id?: string;
                                    issuance_pay_group_id?: string;
                                }>;
                                binding_period_decimal?: string;
                                operation_source?: string;
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
                                    operate_results?: Array<{
                                        id?: string;
                                        unique_id?: string;
                                        code?: number;
                                        message?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/lump_sum_payment/batch_update`,
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
                queryWithIterator: async (
                    payload?: {
                        data?: {
                            ids?: Array<string>;
                            unique_ids?: Array<string>;
                            user_ids?: Array<string>;
                            item_ids?: Array<string>;
                            create_time_gte?: string;
                            create_time_lte?: string;
                            modify_time_gte?: string;
                            modify_time_lte?: string;
                            company_ids?: Array<string>;
                            service_company_ids?: Array<string>;
                            department_ids?: Array<string>;
                            job_family_ids?: Array<string>;
                            job_level_ids?: Array<string>;
                            work_location_ids?: Array<string>;
                            employee_type_ids?: Array<string>;
                            onboard_date_gte?: string;
                            onboard_date_lte?: string;
                            offboard_date_gte?: string;
                            offboard_date_lte?: string;
                        };
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_corehr_id";
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
                                    `${this.domain}/open-apis/compensation/v1/lump_sum_payment/query`,
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
                                                    has_more?: boolean;
                                                    records?: Array<{
                                                        id?: string;
                                                        unique_id?: string;
                                                        user_id?: string;
                                                        total_amount?: string;
                                                        binding_period?: number;
                                                        currency_id?: string;
                                                        issuance_frequency?: number;
                                                        item_id?: string;
                                                        remark?: string;
                                                        issuance_detail_text?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        apply_source?: number;
                                                        return_amount_before_tax?: string;
                                                        return_amount_after_tax?: string;
                                                        binding_period_offboarding_type?:
                                                            | "yes"
                                                            | "no"
                                                            | "default";
                                                        create_time?: string;
                                                        modify_time?: string;
                                                        reference_period_start_date?: string;
                                                        reference_period_end_date?: string;
                                                        details?: Array<{
                                                            id?: string;
                                                            record_id?: string;
                                                            user_id?: string;
                                                            issuance_amount?: string;
                                                            issuance_status?:
                                                                | "to_be_issued"
                                                                | "not_issued";
                                                            issuance_way?:
                                                                | "with_salary"
                                                                | "with_cash"
                                                                | "with_year_end_bonus";
                                                            issuance_time?: string;
                                                            currency_id?: string;
                                                            belong_time?: string;
                                                            create_time?: string;
                                                            modify_time?: string;
                                                            issuance_country_region_id?: string;
                                                            issuance_pay_group_id?: string;
                                                        }>;
                                                        binding_period_decimal?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=lump_sum_payment&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=compensation&resource=lump_sum_payment&version=v1 document }
                 */
                query: async (
                    payload?: {
                        data?: {
                            ids?: Array<string>;
                            unique_ids?: Array<string>;
                            user_ids?: Array<string>;
                            item_ids?: Array<string>;
                            create_time_gte?: string;
                            create_time_lte?: string;
                            modify_time_gte?: string;
                            modify_time_lte?: string;
                            company_ids?: Array<string>;
                            service_company_ids?: Array<string>;
                            department_ids?: Array<string>;
                            job_family_ids?: Array<string>;
                            job_level_ids?: Array<string>;
                            work_location_ids?: Array<string>;
                            employee_type_ids?: Array<string>;
                            onboard_date_gte?: string;
                            onboard_date_lte?: string;
                            offboard_date_gte?: string;
                            offboard_date_lte?: string;
                        };
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_corehr_id";
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
                                    records?: Array<{
                                        id?: string;
                                        unique_id?: string;
                                        user_id?: string;
                                        total_amount?: string;
                                        binding_period?: number;
                                        currency_id?: string;
                                        issuance_frequency?: number;
                                        item_id?: string;
                                        remark?: string;
                                        issuance_detail_text?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        apply_source?: number;
                                        return_amount_before_tax?: string;
                                        return_amount_after_tax?: string;
                                        binding_period_offboarding_type?:
                                            | "yes"
                                            | "no"
                                            | "default";
                                        create_time?: string;
                                        modify_time?: string;
                                        reference_period_start_date?: string;
                                        reference_period_end_date?: string;
                                        details?: Array<{
                                            id?: string;
                                            record_id?: string;
                                            user_id?: string;
                                            issuance_amount?: string;
                                            issuance_status?:
                                                | "to_be_issued"
                                                | "not_issued";
                                            issuance_way?:
                                                | "with_salary"
                                                | "with_cash"
                                                | "with_year_end_bonus";
                                            issuance_time?: string;
                                            currency_id?: string;
                                            belong_time?: string;
                                            create_time?: string;
                                            modify_time?: string;
                                            issuance_country_region_id?: string;
                                            issuance_pay_group_id?: string;
                                        }>;
                                        binding_period_decimal?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/lump_sum_payment/query`,
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
                queryDetailWithIterator: async (
                    payload?: {
                        data?: {
                            ids?: Array<string>;
                            record_ids?: Array<string>;
                            record_unique_ids?: Array<string>;
                            issuance_ways?: Array<
                                | "with_salary"
                                | "with_cash"
                                | "with_physical_distribution"
                                | "with_year_end_bonus"
                            >;
                            issuance_statuses?: Array<
                                "to_be_issued" | "not_issued"
                            >;
                            user_ids?: Array<string>;
                            item_ids?: Array<string>;
                            issuance_date_gte?: string;
                            issuance_date_lte?: string;
                            create_time_gte?: string;
                            create_time_lte?: string;
                            modify_time_gte?: string;
                            modify_time_lte?: string;
                            company_ids?: Array<string>;
                            service_company_ids?: Array<string>;
                            department_ids?: Array<string>;
                            job_family_ids?: Array<string>;
                            job_level_ids?: Array<string>;
                            work_location_ids?: Array<string>;
                            employee_type_ids?: Array<string>;
                            onboard_date_gte?: string;
                            onboard_date_lte?: string;
                            offboard_date_gte?: string;
                            offboard_date_lte?: string;
                        };
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_corehr_id";
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
                                    `${this.domain}/open-apis/compensation/v1/lump_sum_payment/query_detail`,
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
                                                    has_more?: boolean;
                                                    records?: Array<{
                                                        id?: string;
                                                        record_id?: string;
                                                        user_id?: string;
                                                        issuance_amount?: string;
                                                        issuance_status?:
                                                            | "to_be_issued"
                                                            | "not_issued";
                                                        issuance_way?:
                                                            | "with_salary"
                                                            | "with_cash"
                                                            | "with_year_end_bonus";
                                                        issuance_time?: string;
                                                        currency_id?: string;
                                                        belong_time?: string;
                                                        create_time?: string;
                                                        modify_time?: string;
                                                        issuance_country_region_id?: string;
                                                        issuance_pay_group_id?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=lump_sum_payment&apiName=query_detail&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query_detail&project=compensation&resource=lump_sum_payment&version=v1 document }
                 */
                queryDetail: async (
                    payload?: {
                        data?: {
                            ids?: Array<string>;
                            record_ids?: Array<string>;
                            record_unique_ids?: Array<string>;
                            issuance_ways?: Array<
                                | "with_salary"
                                | "with_cash"
                                | "with_physical_distribution"
                                | "with_year_end_bonus"
                            >;
                            issuance_statuses?: Array<
                                "to_be_issued" | "not_issued"
                            >;
                            user_ids?: Array<string>;
                            item_ids?: Array<string>;
                            issuance_date_gte?: string;
                            issuance_date_lte?: string;
                            create_time_gte?: string;
                            create_time_lte?: string;
                            modify_time_gte?: string;
                            modify_time_lte?: string;
                            company_ids?: Array<string>;
                            service_company_ids?: Array<string>;
                            department_ids?: Array<string>;
                            job_family_ids?: Array<string>;
                            job_level_ids?: Array<string>;
                            work_location_ids?: Array<string>;
                            employee_type_ids?: Array<string>;
                            onboard_date_gte?: string;
                            onboard_date_lte?: string;
                            offboard_date_gte?: string;
                            offboard_date_lte?: string;
                        };
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_corehr_id";
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
                                    records?: Array<{
                                        id?: string;
                                        record_id?: string;
                                        user_id?: string;
                                        issuance_amount?: string;
                                        issuance_status?:
                                            | "to_be_issued"
                                            | "not_issued";
                                        issuance_way?:
                                            | "with_salary"
                                            | "with_cash"
                                            | "with_year_end_bonus";
                                        issuance_time?: string;
                                        currency_id?: string;
                                        belong_time?: string;
                                        create_time?: string;
                                        modify_time?: string;
                                        issuance_country_region_id?: string;
                                        issuance_pay_group_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/lump_sum_payment/query_detail`,
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
             * plan
             */
            plan: {
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
                                    `${this.domain}/open-apis/compensation/v1/plans`,
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
                                                    items: Array<{
                                                        id: string;
                                                        tid: string;
                                                        name: string;
                                                        description: string;
                                                        effective_date: string;
                                                        plan_scope?: {
                                                            is_all?: boolean;
                                                            plan_conditions?: Array<{
                                                                left_type?: number;
                                                                operator?: number;
                                                                right_value?: Array<string>;
                                                            }>;
                                                        };
                                                        currency_id?: string;
                                                        probation_salary_status: boolean;
                                                        plan_items: Array<{
                                                            adjustment_type?:
                                                                | "manual"
                                                                | "formula"
                                                                | "fixed";
                                                            item_id?: string;
                                                            plan_item_logic?: {
                                                                fixed?: string;
                                                                formula?: {
                                                                    expr?: string;
                                                                    formula_params?: Array<{
                                                                        ref_type?: number;
                                                                        id?: string;
                                                                    }>;
                                                                };
                                                            };
                                                            probation_discount_type?:
                                                                | "percentum"
                                                                | "manual_input"
                                                                | "none"
                                                                | "fixed"
                                                                | "formula"
                                                                | "not_set";
                                                            probation_discount_percentum?: string;
                                                        }>;
                                                        plan_indicators: Array<{
                                                            indicator_id: string;
                                                            plan_indicator_logic?: {
                                                                fixed?: string;
                                                                formula?: {
                                                                    expr?: string;
                                                                    formula_params?: Array<{
                                                                        ref_type?: number;
                                                                        id?: string;
                                                                    }>;
                                                                };
                                                            };
                                                        }>;
                                                        i18n_names: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                        }>;
                                                        i18n_descriptions: Array<{
                                                            locale?: string;
                                                            value?: string;
                                                        }>;
                                                    }>;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=plan&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=compensation&resource=plan&version=v1 document }
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
                                    items: Array<{
                                        id: string;
                                        tid: string;
                                        name: string;
                                        description: string;
                                        effective_date: string;
                                        plan_scope?: {
                                            is_all?: boolean;
                                            plan_conditions?: Array<{
                                                left_type?: number;
                                                operator?: number;
                                                right_value?: Array<string>;
                                            }>;
                                        };
                                        currency_id?: string;
                                        probation_salary_status: boolean;
                                        plan_items: Array<{
                                            adjustment_type?:
                                                | "manual"
                                                | "formula"
                                                | "fixed";
                                            item_id?: string;
                                            plan_item_logic?: {
                                                fixed?: string;
                                                formula?: {
                                                    expr?: string;
                                                    formula_params?: Array<{
                                                        ref_type?: number;
                                                        id?: string;
                                                    }>;
                                                };
                                            };
                                            probation_discount_type?:
                                                | "percentum"
                                                | "manual_input"
                                                | "none"
                                                | "fixed"
                                                | "formula"
                                                | "not_set";
                                            probation_discount_percentum?: string;
                                        }>;
                                        plan_indicators: Array<{
                                            indicator_id: string;
                                            plan_indicator_logic?: {
                                                fixed?: string;
                                                formula?: {
                                                    expr?: string;
                                                    formula_params?: Array<{
                                                        ref_type?: number;
                                                        id?: string;
                                                    }>;
                                                };
                                            };
                                        }>;
                                        i18n_names: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                        i18n_descriptions: Array<{
                                            locale?: string;
                                            value?: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/plans`,
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
             * recurring_payment
             */
            recurringPayment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=recurring_payment&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=compensation&resource=recurring_payment&version=v1 document }
                 *
                 * 创建经常性支付记录
                 */
                batchCreate: async (
                    payload?: {
                        data?: {
                            records?: Array<{
                                unique_id: string;
                                user_id: string;
                                item_id: string;
                                each_amount: string;
                                start_date: string;
                                end_date: string;
                                currency_id: string;
                                issuance_type:
                                    | "with_salary"
                                    | "with_cash"
                                    | "with_physical_distribution"
                                    | "with_year_end_bonus";
                                issuance_period:
                                    | "year"
                                    | "half_year"
                                    | "quarterly"
                                    | "bimonthly"
                                    | "month"
                                    | "biweekly"
                                    | "week"
                                    | "day"
                                    | "hour";
                                remark?: string;
                                issuance_country_region_id?: string;
                            }>;
                        };
                        params: {
                            user_id_type:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_corehr_id";
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
                                    operate_results?: Array<{
                                        id?: string;
                                        unique_id?: string;
                                        code?: number;
                                        message?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/recurring_payment/batch_create`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=recurring_payment&apiName=batch_remove&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_remove&project=compensation&resource=recurring_payment&version=v1 document }
                 *
                 * 删除经常性支付记录
                 */
                batchRemove: async (
                    payload?: {
                        data: { record_ids: Array<string>; reason?: string };
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
                                    operate_results?: Array<{
                                        id?: string;
                                        unique_id?: string;
                                        code?: number;
                                        message?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/recurring_payment/batch_remove`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=recurring_payment&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=compensation&resource=recurring_payment&version=v1 document }
                 *
                 * 更新经常性支付记录
                 */
                batchUpdate: async (
                    payload?: {
                        data?: {
                            records?: Array<{
                                id: string;
                                each_amount: string;
                                start_date: string;
                                end_date: string;
                                currency_id: string;
                                issuance_type:
                                    | "with_salary"
                                    | "with_cash"
                                    | "with_physical_distribution"
                                    | "with_year_end_bonus";
                                remark?: string;
                                issuance_country_region_id?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_corehr_id";
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
                                    operate_results?: Array<{
                                        id?: string;
                                        unique_id?: string;
                                        code?: number;
                                        message?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/recurring_payment/batch_update`,
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
                queryWithIterator: async (
                    payload?: {
                        data?: {
                            ids?: Array<string>;
                            unique_ids?: Array<string>;
                            user_ids?: Array<string>;
                            item_ids?: Array<string>;
                            start_date_gte?: string;
                            start_date_lte?: string;
                            end_date_gte?: string;
                            end_date_lte?: string;
                            create_time_gte?: string;
                            create_time_lte?: string;
                            modify_time_gte?: string;
                            modify_time_lte?: string;
                            company_ids?: Array<string>;
                            service_company_ids?: Array<string>;
                            department_ids?: Array<string>;
                            job_family_ids?: Array<string>;
                            job_level_ids?: Array<string>;
                            work_location_ids?: Array<string>;
                            employee_type_ids?: Array<string>;
                            onboard_date_gte?: string;
                            onboard_date_lte?: string;
                            offboard_date_gte?: string;
                            offboard_date_lte?: string;
                        };
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_corehr_id";
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
                                    `${this.domain}/open-apis/compensation/v1/recurring_payment/query`,
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
                                                    has_more?: boolean;
                                                    records?: Array<{
                                                        id?: string;
                                                        unique_id?: string;
                                                        user_id?: string;
                                                        item_id?: string;
                                                        issuance_type?:
                                                            | "with_salary"
                                                            | "with_cash"
                                                            | "with_physical_distribution"
                                                            | "with_year_end_bonus";
                                                        each_amount?: string;
                                                        start_date?: string;
                                                        end_date?: string;
                                                        issuance_period?:
                                                            | "year"
                                                            | "half_year"
                                                            | "quarterly"
                                                            | "bimonthly"
                                                            | "month"
                                                            | "biweekly"
                                                            | "week"
                                                            | "day"
                                                            | "hour";
                                                        currency_id?: string;
                                                        remark?: string;
                                                        issuance_country_region_id?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=recurring_payment&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=compensation&resource=recurring_payment&version=v1 document }
                 *
                 * 查询经常性支付记录
                 */
                query: async (
                    payload?: {
                        data?: {
                            ids?: Array<string>;
                            unique_ids?: Array<string>;
                            user_ids?: Array<string>;
                            item_ids?: Array<string>;
                            start_date_gte?: string;
                            start_date_lte?: string;
                            end_date_gte?: string;
                            end_date_lte?: string;
                            create_time_gte?: string;
                            create_time_lte?: string;
                            modify_time_gte?: string;
                            modify_time_lte?: string;
                            company_ids?: Array<string>;
                            service_company_ids?: Array<string>;
                            department_ids?: Array<string>;
                            job_family_ids?: Array<string>;
                            job_level_ids?: Array<string>;
                            work_location_ids?: Array<string>;
                            employee_type_ids?: Array<string>;
                            onboard_date_gte?: string;
                            onboard_date_lte?: string;
                            offboard_date_gte?: string;
                            offboard_date_lte?: string;
                        };
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_corehr_id";
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
                                    records?: Array<{
                                        id?: string;
                                        unique_id?: string;
                                        user_id?: string;
                                        item_id?: string;
                                        issuance_type?:
                                            | "with_salary"
                                            | "with_cash"
                                            | "with_physical_distribution"
                                            | "with_year_end_bonus";
                                        each_amount?: string;
                                        start_date?: string;
                                        end_date?: string;
                                        issuance_period?:
                                            | "year"
                                            | "half_year"
                                            | "quarterly"
                                            | "bimonthly"
                                            | "month"
                                            | "biweekly"
                                            | "week"
                                            | "day"
                                            | "hour";
                                        currency_id?: string;
                                        remark?: string;
                                        issuance_country_region_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/recurring_payment/query`,
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
             * social_archive
             */
            socialArchive: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=social_archive&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=compensation&resource=social_archive&version=v1 document }
                 *
                 * 通过员工ID和生效时间查询参保档案
                 */
                query: async (
                    payload?: {
                        data: {
                            user_id_list: Array<string>;
                            effective_date: string;
                        };
                        params: {
                            user_id_type:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_corehr_id";
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
                                    archives: Array<{
                                        user_id: string;
                                        details: Array<{
                                            description: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            insurance_type:
                                                | "social_insurance"
                                                | "provident_fund";
                                            insurance_status:
                                                | "contribution"
                                                | "not_contribution"
                                                | "stopped_contribution";
                                            id?: string;
                                            tid?: string;
                                            plan_id?: string;
                                            plan_tid?: string;
                                            location_id?: string;
                                            company_id?: string;
                                            account_type?:
                                                | "associated_company"
                                                | "supplier";
                                            insurance_account?: string;
                                            base_salary?: string;
                                            insurance_details?: Array<{
                                                insurance_id: string;
                                                company_deduction: string;
                                                company_setting: {
                                                    lower_limit: string;
                                                    upper_limit: string;
                                                    payment_ratio: string;
                                                    payment_rounding_rule:
                                                        | "rounding"
                                                        | "round_up"
                                                        | "round_down";
                                                    payment_decimals: number;
                                                    fixed_payment: string;
                                                };
                                                personal_deduction: string;
                                                personal_setting: {
                                                    lower_limit: string;
                                                    upper_limit: string;
                                                    payment_ratio: string;
                                                    payment_rounding_rule:
                                                        | "rounding"
                                                        | "round_up"
                                                        | "round_down";
                                                    payment_decimals: number;
                                                    fixed_payment: string;
                                                };
                                                payment_frequency:
                                                    | "annually"
                                                    | "monthly"
                                                    | "quarterly";
                                                payment_months: Array<number>;
                                            }>;
                                            effective_date?: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/social_archive/query`,
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
             * social_archive_adjust_record
             */
            socialArchiveAdjustRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=social_archive_adjust_record&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=compensation&resource=social_archive_adjust_record&version=v1 document }
                 *
                 * 根据员工ID查询待增员、待减员记录
                 */
                query: async (
                    payload?: {
                        data: {
                            user_id_list: Array<string>;
                            record_type: "increase" | "attrition";
                        };
                        params: {
                            user_id_type:
                                | "user_id"
                                | "union_id"
                                | "open_id"
                                | "people_corehr_id";
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
                                    records?: Array<{
                                        user_id?: string;
                                        record_type?: "increase" | "attrition";
                                        details?: Array<{
                                            description: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            insurance_type:
                                                | "social_insurance"
                                                | "provident_fund";
                                            insurance_status:
                                                | "contribution"
                                                | "not_contribution"
                                                | "stopped_contribution";
                                            id?: string;
                                            tid?: string;
                                            plan_id?: string;
                                            plan_tid?: string;
                                            location_id?: string;
                                            company_id?: string;
                                            account_type?:
                                                | "associated_company"
                                                | "supplier";
                                            insurance_account?: string;
                                            base_salary?: string;
                                            insurance_details?: Array<{
                                                insurance_id: string;
                                                company_deduction: string;
                                                company_setting: {
                                                    lower_limit: string;
                                                    upper_limit: string;
                                                    payment_ratio: string;
                                                    payment_rounding_rule:
                                                        | "rounding"
                                                        | "round_up"
                                                        | "round_down";
                                                    payment_decimals: number;
                                                    fixed_payment: string;
                                                };
                                                personal_deduction: string;
                                                personal_setting: {
                                                    lower_limit: string;
                                                    upper_limit: string;
                                                    payment_ratio: string;
                                                    payment_rounding_rule:
                                                        | "rounding"
                                                        | "round_up"
                                                        | "round_down";
                                                    payment_decimals: number;
                                                    fixed_payment: string;
                                                };
                                                payment_frequency:
                                                    | "annually"
                                                    | "monthly"
                                                    | "quarterly";
                                                payment_months: Array<number>;
                                            }>;
                                            effective_date?: string;
                                        }>;
                                        record_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/social_archive_adjust_record/query`,
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
             * social_insurance
             */
            socialInsurance: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=social_insurance&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=compensation&resource=social_insurance&version=v1 document }
                 *
                 * 获取险种列表
                 */
                list: async (payload?: {}, options?: IRequestOptions) => {
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
                                        name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        insurance_type:
                                            | "social_insurance"
                                            | "provident_fund";
                                        active: boolean;
                                        is_system: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/social_insurances`,
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
             * social_plan
             */
            socialPlan: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            effective_date: string;
                            page_size: number;
                            page_token?: string;
                            insurance_type?:
                                | "social_insurance"
                                | "provident_fund";
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
                                    `${this.domain}/open-apis/compensation/v1/social_plans`,
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
                                                    plans?: Array<{
                                                        plan_id: string;
                                                        plan_tid: string;
                                                        name: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                        effective_date: string;
                                                        active: boolean;
                                                        insurance_type:
                                                            | "social_insurance"
                                                            | "provident_fund";
                                                        scope?: {
                                                            is_all: boolean;
                                                            rules?: Array<
                                                                Array<{
                                                                    left_type?: number;
                                                                    operator?: number;
                                                                    right_values?: Array<string>;
                                                                }>
                                                            >;
                                                        };
                                                        item_detail: Array<{
                                                            item_id: string;
                                                            item_name: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                            };
                                                            item_setting_of_person: {
                                                                lower_limit: string;
                                                                upper_limit: string;
                                                                payment_ratio: string;
                                                                payment_rounding_rule:
                                                                    | "rounding"
                                                                    | "round_up"
                                                                    | "round_down";
                                                                payment_decimals: number;
                                                                fixed_payment: string;
                                                            };
                                                            item_setting_of_company: {
                                                                lower_limit: string;
                                                                upper_limit: string;
                                                                payment_ratio: string;
                                                                payment_rounding_rule:
                                                                    | "rounding"
                                                                    | "round_up"
                                                                    | "round_down";
                                                                payment_decimals: number;
                                                                fixed_payment: string;
                                                            };
                                                            payment_frequency:
                                                                | "annually"
                                                                | "monthly"
                                                                | "quarterly";
                                                            payment_months: Array<number>;
                                                        }>;
                                                        remark: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                        };
                                                    }>;
                                                    has_more?: boolean;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=social_plan&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=compensation&resource=social_plan&version=v1 document }
                 *
                 * 分页获取参保方案列表
                 */
                list: async (
                    payload?: {
                        params: {
                            effective_date: string;
                            page_size: number;
                            page_token?: string;
                            insurance_type?:
                                | "social_insurance"
                                | "provident_fund";
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
                                    plans?: Array<{
                                        plan_id: string;
                                        plan_tid: string;
                                        name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        effective_date: string;
                                        active: boolean;
                                        insurance_type:
                                            | "social_insurance"
                                            | "provident_fund";
                                        scope?: {
                                            is_all: boolean;
                                            rules?: Array<
                                                Array<{
                                                    left_type?: number;
                                                    operator?: number;
                                                    right_values?: Array<string>;
                                                }>
                                            >;
                                        };
                                        item_detail: Array<{
                                            item_id: string;
                                            item_name: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            item_setting_of_person: {
                                                lower_limit: string;
                                                upper_limit: string;
                                                payment_ratio: string;
                                                payment_rounding_rule:
                                                    | "rounding"
                                                    | "round_up"
                                                    | "round_down";
                                                payment_decimals: number;
                                                fixed_payment: string;
                                            };
                                            item_setting_of_company: {
                                                lower_limit: string;
                                                upper_limit: string;
                                                payment_ratio: string;
                                                payment_rounding_rule:
                                                    | "rounding"
                                                    | "round_up"
                                                    | "round_down";
                                                payment_decimals: number;
                                                fixed_payment: string;
                                            };
                                            payment_frequency:
                                                | "annually"
                                                | "monthly"
                                                | "quarterly";
                                            payment_months: Array<number>;
                                        }>;
                                        remark: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/social_plans`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=compensation&resource=social_plan&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=compensation&resource=social_plan&version=v1 document }
                 *
                 * 批量查询参保方案
                 */
                query: async (
                    payload?: {
                        data: {
                            plan_ids: Array<string>;
                            effective_date: string;
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
                                    plans?: Array<{
                                        plan_id: string;
                                        plan_tid: string;
                                        name: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                        effective_date: string;
                                        active: boolean;
                                        insurance_type:
                                            | "social_insurance"
                                            | "provident_fund";
                                        scope?: {
                                            is_all: boolean;
                                            rules?: Array<
                                                Array<{
                                                    left_type?: number;
                                                    operator?: number;
                                                    right_values?: Array<string>;
                                                }>
                                            >;
                                        };
                                        item_detail: Array<{
                                            item_id: string;
                                            item_name: {
                                                zh_cn?: string;
                                                en_us?: string;
                                            };
                                            item_setting_of_person: {
                                                lower_limit: string;
                                                upper_limit: string;
                                                payment_ratio: string;
                                                payment_rounding_rule:
                                                    | "rounding"
                                                    | "round_up"
                                                    | "round_down";
                                                payment_decimals: number;
                                                fixed_payment: string;
                                            };
                                            item_setting_of_company: {
                                                lower_limit: string;
                                                upper_limit: string;
                                                payment_ratio: string;
                                                payment_rounding_rule:
                                                    | "rounding"
                                                    | "round_up"
                                                    | "round_down";
                                                payment_decimals: number;
                                                fixed_payment: string;
                                            };
                                            payment_frequency:
                                                | "annually"
                                                | "monthly"
                                                | "quarterly";
                                            payment_months: Array<number>;
                                        }>;
                                        remark: {
                                            zh_cn?: string;
                                            en_us?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/compensation/v1/social_plans/query`,
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
