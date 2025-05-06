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
        },
    };
}
