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
import bot from "./bot";

// auto gen
export default abstract class Client extends bot {
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
    c360 = {
        v1: {
            /**
             * namespace.opportunity
             */
            namespaceOpportunity: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=c360&resource=namespace.opportunity&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=c360&resource=namespace.opportunity&version=v1 document }
                 *
                 * 获取商机信息
                 *
                 * 获取商机信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string; opportunity_id: string };
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
                                    opportunity: {
                                        fields: Array<{
                                            field_type: number;
                                            field_name: string;
                                            field_label?: string;
                                            field_value: {
                                                text?: string;
                                                multi_line_text?: string;
                                                number?: string;
                                                currency?: string;
                                                date?: string;
                                                pick_list?: string;
                                                multi_pick_list?: Array<string>;
                                                url?: { link: string };
                                                profile_list?: Array<{
                                                    user_id?: string;
                                                    chat_id?: string;
                                                    profile_type:
                                                        | "Group"
                                                        | "Person";
                                                }>;
                                                lookup?: {
                                                    object_type: string;
                                                    records: Array<string>;
                                                };
                                                single_lookup?: {
                                                    object_type: string;
                                                    record_id: string;
                                                };
                                                personnel?: string;
                                                personnel_list?: Array<string>;
                                                editor_rich_text?: {
                                                    plaintext: string;
                                                };
                                            };
                                        }>;
                                        opportunity_id: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/opportunities/:opportunity_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=c360&resource=namespace.opportunity&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=c360&resource=namespace.opportunity&version=v1 document }
                 *
                 * 更新商机
                 *
                 * 更新商机
                 */
                patch: async (
                    payload?: {
                        data: {
                            opportunity: {
                                fields: Array<{
                                    field_type: number;
                                    field_name: string;
                                    field_value: {
                                        text?: string;
                                        multi_line_text?: string;
                                        number?: string;
                                        currency?: string;
                                        date?: string;
                                        pick_list?: string;
                                        multi_pick_list?: Array<string>;
                                        url?: { link: string };
                                        profile_list?: Array<{
                                            user_id?: string;
                                            chat_id?: string;
                                            profile_type: "Group" | "Person";
                                        }>;
                                        lookup?: {
                                            object_type: string;
                                            records: Array<string>;
                                        };
                                        single_lookup?: {
                                            object_type: string;
                                            record_id: string;
                                        };
                                        personnel?: string;
                                        personnel_list?: Array<string>;
                                    };
                                }>;
                            };
                            modifier_id: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string; opportunity_id: string };
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
                                `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/opportunities/:opportunity_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=c360&resource=namespace.opportunity&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=c360&resource=namespace.opportunity&version=v1 document }
                 *
                 * 创建商机
                 *
                 * 创建商机
                 */
                create: async (
                    payload?: {
                        data: {
                            opportunity: {
                                fields: Array<{
                                    field_type: number;
                                    field_name: string;
                                    field_value: {
                                        text?: string;
                                        multi_line_text?: string;
                                        number?: string;
                                        currency?: string;
                                        date?: string;
                                        pick_list?: string;
                                        multi_pick_list?: Array<string>;
                                        url?: { link: string };
                                        profile_list?: Array<{
                                            user_id?: string;
                                            chat_id?: string;
                                            profile_type: "Group" | "Person";
                                        }>;
                                        lookup?: {
                                            object_type: string;
                                            records: Array<string>;
                                        };
                                        single_lookup?: {
                                            object_type: string;
                                            record_id: string;
                                        };
                                        personnel?: string;
                                        personnel_list?: Array<string>;
                                    };
                                }>;
                            };
                            creator_id: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string };
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
                                data?: { opportunity_id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/opportunities`,
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
                            page_size: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string };
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
                                    `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/opportunities`,
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
                                                    opportunities: Array<{
                                                        fields: Array<{
                                                            field_type: number;
                                                            field_name: string;
                                                            field_label?: string;
                                                            field_value: {
                                                                text?: string;
                                                                multi_line_text?: string;
                                                                number?: string;
                                                                currency?: string;
                                                                date?: string;
                                                                pick_list?: string;
                                                                multi_pick_list?: Array<string>;
                                                                url?: {
                                                                    link: string;
                                                                };
                                                                profile_list?: Array<{
                                                                    user_id?: string;
                                                                    chat_id?: string;
                                                                    profile_type:
                                                                        | "Group"
                                                                        | "Person";
                                                                }>;
                                                                lookup?: {
                                                                    object_type: string;
                                                                    records: Array<string>;
                                                                };
                                                                single_lookup?: {
                                                                    object_type: string;
                                                                    record_id: string;
                                                                };
                                                                personnel?: string;
                                                                personnel_list?: Array<string>;
                                                                editor_rich_text?: {
                                                                    plaintext: string;
                                                                };
                                                            };
                                                        }>;
                                                        opportunity_id: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=c360&resource=namespace.opportunity&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=c360&resource=namespace.opportunity&version=v1 document }
                 *
                 * 获取商机信息列表
                 *
                 * 获取商机信息列表
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string };
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
                                    opportunities: Array<{
                                        fields: Array<{
                                            field_type: number;
                                            field_name: string;
                                            field_label?: string;
                                            field_value: {
                                                text?: string;
                                                multi_line_text?: string;
                                                number?: string;
                                                currency?: string;
                                                date?: string;
                                                pick_list?: string;
                                                multi_pick_list?: Array<string>;
                                                url?: { link: string };
                                                profile_list?: Array<{
                                                    user_id?: string;
                                                    chat_id?: string;
                                                    profile_type:
                                                        | "Group"
                                                        | "Person";
                                                }>;
                                                lookup?: {
                                                    object_type: string;
                                                    records: Array<string>;
                                                };
                                                single_lookup?: {
                                                    object_type: string;
                                                    record_id: string;
                                                };
                                                personnel?: string;
                                                personnel_list?: Array<string>;
                                                editor_rich_text?: {
                                                    plaintext: string;
                                                };
                                            };
                                        }>;
                                        opportunity_id: string;
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/opportunities`,
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
             * namespace.order
             */
            namespaceOrder: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=c360&resource=namespace.order&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=c360&resource=namespace.order&version=v1 document }
                 *
                 * 获取订单信息
                 *
                 * 获取订单信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string; order_id: string };
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
                                    order: {
                                        fields: Array<{
                                            field_type: number;
                                            field_name: string;
                                            field_label?: string;
                                            field_value: {
                                                text?: string;
                                                multi_line_text?: string;
                                                number?: string;
                                                currency?: string;
                                                date?: string;
                                                pick_list?: string;
                                                multi_pick_list?: Array<string>;
                                                url?: { link: string };
                                                profile_list?: Array<{
                                                    user_id?: string;
                                                    chat_id?: string;
                                                    profile_type:
                                                        | "Group"
                                                        | "Person";
                                                }>;
                                                lookup?: {
                                                    object_type: string;
                                                    records: Array<string>;
                                                };
                                                single_lookup?: {
                                                    object_type: string;
                                                    record_id: string;
                                                };
                                                personnel?: string;
                                                personnel_list?: Array<string>;
                                                editor_rich_text?: {
                                                    plaintext: string;
                                                };
                                            };
                                        }>;
                                        order_id: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/orders/:order_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=c360&resource=namespace.order&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=c360&resource=namespace.order&version=v1 document }
                 *
                 * 创建订单
                 *
                 * 创建订单
                 */
                create: async (
                    payload?: {
                        data: {
                            order: {
                                fields: Array<{
                                    field_type: number;
                                    field_name: string;
                                    field_value: {
                                        text?: string;
                                        multi_line_text?: string;
                                        number?: string;
                                        currency?: string;
                                        date?: string;
                                        pick_list?: string;
                                        multi_pick_list?: Array<string>;
                                        url?: { link: string };
                                        profile_list?: Array<{
                                            user_id?: string;
                                            chat_id?: string;
                                            profile_type: "Group" | "Person";
                                        }>;
                                        lookup?: {
                                            object_type: string;
                                            records: Array<string>;
                                        };
                                        single_lookup?: {
                                            object_type: string;
                                            record_id: string;
                                        };
                                        personnel?: string;
                                        personnel_list?: Array<string>;
                                    };
                                }>;
                            };
                            creator_id: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string };
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
                                data?: { order_id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/orders`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=c360&resource=namespace.order&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=c360&resource=namespace.order&version=v1 document }
                 *
                 * 更新订单
                 *
                 * 更新订单
                 */
                patch: async (
                    payload?: {
                        data: {
                            order: {
                                fields: Array<{
                                    field_type: number;
                                    field_name: string;
                                    field_value: {
                                        text?: string;
                                        multi_line_text?: string;
                                        number?: string;
                                        currency?: string;
                                        date?: string;
                                        pick_list?: string;
                                        multi_pick_list?: Array<string>;
                                        url?: { link: string };
                                        profile_list?: Array<{
                                            user_id?: string;
                                            chat_id?: string;
                                            profile_type: "Group" | "Person";
                                        }>;
                                        lookup?: {
                                            object_type: string;
                                            records: Array<string>;
                                        };
                                        single_lookup?: {
                                            object_type: string;
                                            record_id: string;
                                        };
                                        personnel?: string;
                                        personnel_list?: Array<string>;
                                    };
                                }>;
                            };
                            modifier_id: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string; order_id: string };
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
                                `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/orders/:order_id`,
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
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string };
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
                                    `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/orders`,
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
                                                    orders: Array<{
                                                        fields: Array<{
                                                            field_type: number;
                                                            field_name: string;
                                                            field_label?: string;
                                                            field_value: {
                                                                text?: string;
                                                                multi_line_text?: string;
                                                                number?: string;
                                                                currency?: string;
                                                                date?: string;
                                                                pick_list?: string;
                                                                multi_pick_list?: Array<string>;
                                                                url?: {
                                                                    link: string;
                                                                };
                                                                profile_list?: Array<{
                                                                    user_id?: string;
                                                                    chat_id?: string;
                                                                    profile_type:
                                                                        | "Group"
                                                                        | "Person";
                                                                }>;
                                                                lookup?: {
                                                                    object_type: string;
                                                                    records: Array<string>;
                                                                };
                                                                single_lookup?: {
                                                                    object_type: string;
                                                                    record_id: string;
                                                                };
                                                                personnel?: string;
                                                                personnel_list?: Array<string>;
                                                                editor_rich_text?: {
                                                                    plaintext: string;
                                                                };
                                                            };
                                                        }>;
                                                        order_id: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=c360&resource=namespace.order&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=c360&resource=namespace.order&version=v1 document }
                 *
                 * 获取订单信息列表
                 *
                 * 获取订单信息列表
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string };
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
                                    orders: Array<{
                                        fields: Array<{
                                            field_type: number;
                                            field_name: string;
                                            field_label?: string;
                                            field_value: {
                                                text?: string;
                                                multi_line_text?: string;
                                                number?: string;
                                                currency?: string;
                                                date?: string;
                                                pick_list?: string;
                                                multi_pick_list?: Array<string>;
                                                url?: { link: string };
                                                profile_list?: Array<{
                                                    user_id?: string;
                                                    chat_id?: string;
                                                    profile_type:
                                                        | "Group"
                                                        | "Person";
                                                }>;
                                                lookup?: {
                                                    object_type: string;
                                                    records: Array<string>;
                                                };
                                                single_lookup?: {
                                                    object_type: string;
                                                    record_id: string;
                                                };
                                                personnel?: string;
                                                personnel_list?: Array<string>;
                                                editor_rich_text?: {
                                                    plaintext: string;
                                                };
                                            };
                                        }>;
                                        order_id: string;
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/orders`,
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
             * namespace.record_follow
             */
            namespaceRecordFollow: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=c360&resource=namespace.record_follow&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=c360&resource=namespace.record_follow&version=v1 document }
                 *
                 * 获取跟进记录信息
                 *
                 * 获取跟进记录信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            namespace_id: string;
                            record_follow_id: string;
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
                                    record_follow: {
                                        fields: Array<{
                                            field_type: number;
                                            field_name: string;
                                            field_label?: string;
                                            field_value: {
                                                text?: string;
                                                multi_line_text?: string;
                                                number?: string;
                                                currency?: string;
                                                date?: string;
                                                pick_list?: string;
                                                multi_pick_list?: Array<string>;
                                                url?: { link: string };
                                                profile_list?: Array<{
                                                    user_id?: string;
                                                    chat_id?: string;
                                                    profile_type:
                                                        | "Group"
                                                        | "Person";
                                                }>;
                                                lookup?: {
                                                    object_type: string;
                                                    records: Array<string>;
                                                };
                                                single_lookup?: {
                                                    object_type: string;
                                                    record_id: string;
                                                };
                                                personnel?: string;
                                                personnel_list?: Array<string>;
                                                editor_rich_text?: {
                                                    plaintext: string;
                                                };
                                            };
                                        }>;
                                        record_follow_id: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/record_follows/:record_follow_id`,
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
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string };
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
                                    `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/record_follows`,
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
                                                    record_follows: Array<{
                                                        fields: Array<{
                                                            field_type: number;
                                                            field_name: string;
                                                            field_label?: string;
                                                            field_value: {
                                                                text?: string;
                                                                multi_line_text?: string;
                                                                number?: string;
                                                                currency?: string;
                                                                date?: string;
                                                                pick_list?: string;
                                                                multi_pick_list?: Array<string>;
                                                                url?: {
                                                                    link: string;
                                                                };
                                                                profile_list?: Array<{
                                                                    user_id?: string;
                                                                    chat_id?: string;
                                                                    profile_type:
                                                                        | "Group"
                                                                        | "Person";
                                                                }>;
                                                                lookup?: {
                                                                    object_type: string;
                                                                    records: Array<string>;
                                                                };
                                                                single_lookup?: {
                                                                    object_type: string;
                                                                    record_id: string;
                                                                };
                                                                personnel?: string;
                                                                personnel_list?: Array<string>;
                                                                editor_rich_text?: {
                                                                    plaintext: string;
                                                                };
                                                            };
                                                        }>;
                                                        record_follow_id: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=c360&resource=namespace.record_follow&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=c360&resource=namespace.record_follow&version=v1 document }
                 *
                 * 获取跟进记录信息列表
                 *
                 * 获取跟进记录信息列表
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string };
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
                                    record_follows: Array<{
                                        fields: Array<{
                                            field_type: number;
                                            field_name: string;
                                            field_label?: string;
                                            field_value: {
                                                text?: string;
                                                multi_line_text?: string;
                                                number?: string;
                                                currency?: string;
                                                date?: string;
                                                pick_list?: string;
                                                multi_pick_list?: Array<string>;
                                                url?: { link: string };
                                                profile_list?: Array<{
                                                    user_id?: string;
                                                    chat_id?: string;
                                                    profile_type:
                                                        | "Group"
                                                        | "Person";
                                                }>;
                                                lookup?: {
                                                    object_type: string;
                                                    records: Array<string>;
                                                };
                                                single_lookup?: {
                                                    object_type: string;
                                                    record_id: string;
                                                };
                                                personnel?: string;
                                                personnel_list?: Array<string>;
                                                editor_rich_text?: {
                                                    plaintext: string;
                                                };
                                            };
                                        }>;
                                        record_follow_id: string;
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/record_follows`,
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
             * namespace.account
             */
            namespaceAccount: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=c360&resource=namespace.account&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=c360&resource=namespace.account&version=v1 document }
                 *
                 * 获取客户信息
                 *
                 * 获取客户信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string; account_id: string };
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
                                    account: {
                                        fields: Array<{
                                            field_type: number;
                                            field_name: string;
                                            field_label?: string;
                                            field_value: {
                                                text?: string;
                                                multi_line_text?: string;
                                                number?: string;
                                                currency?: string;
                                                date?: string;
                                                pick_list?: string;
                                                multi_pick_list?: Array<string>;
                                                url?: { link: string };
                                                profile_list?: Array<{
                                                    user_id?: string;
                                                    chat_id?: string;
                                                    profile_type:
                                                        | "Group"
                                                        | "Person";
                                                }>;
                                                lookup?: {
                                                    object_type: string;
                                                    records: Array<string>;
                                                };
                                                single_lookup?: {
                                                    object_type: string;
                                                    record_id: string;
                                                };
                                                personnel?: string;
                                                personnel_list?: Array<string>;
                                                editor_rich_text?: {
                                                    plaintext: string;
                                                };
                                            };
                                        }>;
                                        account_id: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/accounts/:account_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=c360&resource=namespace.account&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=c360&resource=namespace.account&version=v1 document }
                 *
                 * 创建客户
                 *
                 * 创建客户
                 */
                create: async (
                    payload?: {
                        data: {
                            account: {
                                fields: Array<{
                                    field_type: number;
                                    field_name: string;
                                    field_value: {
                                        text?: string;
                                        multi_line_text?: string;
                                        number?: string;
                                        currency?: string;
                                        date?: string;
                                        pick_list?: string;
                                        multi_pick_list?: Array<string>;
                                        url?: { link: string };
                                        profile_list?: Array<{
                                            user_id?: string;
                                            chat_id?: string;
                                            profile_type: "Group" | "Person";
                                        }>;
                                        lookup?: {
                                            object_type: string;
                                            records: Array<string>;
                                        };
                                        single_lookup?: {
                                            object_type: string;
                                            record_id: string;
                                        };
                                        personnel?: string;
                                        personnel_list?: Array<string>;
                                    };
                                }>;
                            };
                            creator_id: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string };
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
                                data?: { account_id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/accounts`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=c360&resource=namespace.account&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=c360&resource=namespace.account&version=v1 document }
                 *
                 * 更新客户
                 *
                 * 更新客户
                 */
                patch: async (
                    payload?: {
                        data: {
                            account: {
                                fields: Array<{
                                    field_type: number;
                                    field_name: string;
                                    field_value: {
                                        text?: string;
                                        multi_line_text?: string;
                                        number?: string;
                                        currency?: string;
                                        date?: string;
                                        pick_list?: string;
                                        multi_pick_list?: Array<string>;
                                        url?: { link: string };
                                        profile_list?: Array<{
                                            user_id?: string;
                                            chat_id?: string;
                                            profile_type: "Group" | "Person";
                                        }>;
                                        lookup?: {
                                            object_type: string;
                                            records: Array<string>;
                                        };
                                        single_lookup?: {
                                            object_type: string;
                                            record_id: string;
                                        };
                                        personnel?: string;
                                        personnel_list?: Array<string>;
                                    };
                                }>;
                            };
                            modifier_id: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string; account_id: string };
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
                                `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/accounts/:account_id`,
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
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string };
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
                                    `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/accounts`,
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
                                                    accounts: Array<{
                                                        fields: Array<{
                                                            field_type: number;
                                                            field_name: string;
                                                            field_label?: string;
                                                            field_value: {
                                                                text?: string;
                                                                multi_line_text?: string;
                                                                number?: string;
                                                                currency?: string;
                                                                date?: string;
                                                                pick_list?: string;
                                                                multi_pick_list?: Array<string>;
                                                                url?: {
                                                                    link: string;
                                                                };
                                                                profile_list?: Array<{
                                                                    user_id?: string;
                                                                    chat_id?: string;
                                                                    profile_type:
                                                                        | "Group"
                                                                        | "Person";
                                                                }>;
                                                                lookup?: {
                                                                    object_type: string;
                                                                    records: Array<string>;
                                                                };
                                                                single_lookup?: {
                                                                    object_type: string;
                                                                    record_id: string;
                                                                };
                                                                personnel?: string;
                                                                personnel_list?: Array<string>;
                                                                editor_rich_text?: {
                                                                    plaintext: string;
                                                                };
                                                            };
                                                        }>;
                                                        account_id: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=c360&resource=namespace.account&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=c360&resource=namespace.account&version=v1 document }
                 *
                 * 获取客户信息列表
                 *
                 * 获取客户信息列表
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { namespace_id: string };
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
                                    accounts: Array<{
                                        fields: Array<{
                                            field_type: number;
                                            field_name: string;
                                            field_label?: string;
                                            field_value: {
                                                text?: string;
                                                multi_line_text?: string;
                                                number?: string;
                                                currency?: string;
                                                date?: string;
                                                pick_list?: string;
                                                multi_pick_list?: Array<string>;
                                                url?: { link: string };
                                                profile_list?: Array<{
                                                    user_id?: string;
                                                    chat_id?: string;
                                                    profile_type:
                                                        | "Group"
                                                        | "Person";
                                                }>;
                                                lookup?: {
                                                    object_type: string;
                                                    records: Array<string>;
                                                };
                                                single_lookup?: {
                                                    object_type: string;
                                                    record_id: string;
                                                };
                                                personnel?: string;
                                                personnel_list?: Array<string>;
                                                editor_rich_text?: {
                                                    plaintext: string;
                                                };
                                            };
                                        }>;
                                        account_id: string;
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/c360/v1/namespaces/:namespace_id/accounts`,
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
