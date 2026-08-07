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
import acs from "./acs";

// auto gen
export default abstract class Client extends acs {
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
    admin = {
        /**
         * splash_page_stat
         */
        splashPageStat: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=splash_page_stat&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=splash_page_stat&version=v1 document }
             */
            list: async (
                payload?: {
                    params: {
                        start_date?: string;
                        end_date: string;
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    date?: string;
                                    splash_id?: string;
                                    impression_count?: number;
                                    click_count?: number;
                                    skip_count?: number;
                                    impression_count_accumulate?: number;
                                    click_count_accumulate?: number;
                                    skip_count_accumulate?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/splash_page_stats`,
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=splash_page_stat&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=admin&resource=splash_page_stat&version=v1 document }
             */
            query: async (
                payload?: {
                    params: { start_date?: string; end_date: string };
                    path?: { splash_id?: string };
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
                                splash_page_stat?: {
                                    date?: string;
                                    splash_id?: string;
                                    impression_count?: number;
                                    click_count?: number;
                                    skip_count?: number;
                                    impression_count_accumulate?: number;
                                    click_count_accumulate?: number;
                                    skip_count_accumulate?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/splash_page_stats/:splash_id/query`,
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
         * administrator
         */
        administrator: {
            listWithIterator: async (
                payload?: {
                    params: {
                        response_user_id_type?:
                            | "open_id"
                            | "union_id"
                            | "user_id";
                        permission_filter: number;
                        page_size: number;
                        page_token?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/admin/v1/administrators`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                administrators?: Array<{
                                                    user_id?: string;
                                                    is_super_administrator: boolean;
                                                    is_administrator: boolean;
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=administrator&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=administrator&version=v1 document }
             */
            list: async (
                payload?: {
                    params: {
                        response_user_id_type?:
                            | "open_id"
                            | "union_id"
                            | "user_id";
                        permission_filter: number;
                        page_size: number;
                        page_token?: string;
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                administrators?: Array<{
                                    user_id?: string;
                                    is_super_administrator: boolean;
                                    is_administrator: boolean;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/administrators`,
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
         * file
         */
        file: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=file&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=admin&resource=file&version=v1 document }
             */
            delete: async (
                payload?: {
                    params: { type: "1" | "2" | "3" | "4" | "5" | "6" | "7" };
                    path: { file_token: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/files/:file_token`,
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=file&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=admin&resource=file&version=v1 document }
             */
            search: async (
                payload?: {
                    data?: { file_token?: string };
                    params?: {
                        email?: string;
                        user_id?: string;
                        user_id_type?: "user_id" | "open_id" | "union_id";
                        offset?: number;
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
                                files?: Array<{
                                    title?: string;
                                    type?:
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5"
                                        | "6"
                                        | "7";
                                    owner?: {
                                        name: string;
                                        avatar: string;
                                        id: string;
                                    };
                                    size?: string;
                                    last_op_time?: string;
                                    status?: "2" | "3";
                                    token?: string;
                                }>;
                                total?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/files/search`,
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=file&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=admin&resource=file&version=v1 document }
             */
            patch: async (
                payload?: {
                    params: {
                        target_user_id?: string;
                        user_id_type?: "user_id" | "open_id" | "union_id";
                        target_owner_email?: string;
                        type: "1" | "2" | "3" | "4" | "5" | "6" | "7";
                    };
                    path: { file_token: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/files/:file_token`,
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
        /**
         * badge.grant
         */
        badgeGrant: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=admin&resource=badge.grant&version=v1 document }
             *
             * 创建授予名单
             *
             * 通过该接口可以为特定勋章创建一份授予名单，一枚勋章下最多可创建1000份授予名单。
             */
            create: async (
                payload?: {
                    data: {
                        name: string;
                        grant_type: number;
                        time_zone: string;
                        rule_detail: {
                            effective_time?: string;
                            expiration_time?: string;
                            anniversary?: number;
                            effective_period?: number;
                        };
                        is_grant_all: boolean;
                        user_ids?: Array<string>;
                        department_ids?: Array<string>;
                        group_ids?: Array<string>;
                    };
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path: { badge_id: string };
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
                                grant?: {
                                    id?: string;
                                    badge_id?: string;
                                    name: string;
                                    grant_type: number;
                                    time_zone: string;
                                    rule_detail: {
                                        effective_time?: string;
                                        expiration_time?: string;
                                        anniversary?: number;
                                        effective_period?: number;
                                    };
                                    is_grant_all: boolean;
                                    user_ids?: Array<string>;
                                    department_ids?: Array<string>;
                                    group_ids?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants`,
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=admin&resource=badge.grant&version=v1 document }
             *
             * 修改授予名单
             *
             * 通过该接口可以修改特定授予名单的相关信息。
             */
            update: async (
                payload?: {
                    data: {
                        name: string;
                        grant_type: number;
                        time_zone: string;
                        rule_detail: {
                            effective_time?: string;
                            expiration_time?: string;
                            anniversary?: number;
                            effective_period?: number;
                        };
                        is_grant_all: boolean;
                        user_ids?: Array<string>;
                        department_ids?: Array<string>;
                        group_ids?: Array<string>;
                    };
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path: { badge_id: string; grant_id: string };
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
                                grant?: {
                                    id?: string;
                                    badge_id?: string;
                                    name: string;
                                    grant_type: number;
                                    time_zone: string;
                                    rule_detail: {
                                        effective_time?: string;
                                        expiration_time?: string;
                                        anniversary?: number;
                                        effective_period?: number;
                                    };
                                    is_grant_all: boolean;
                                    user_ids?: Array<string>;
                                    department_ids?: Array<string>;
                                    group_ids?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants/:grant_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=admin&resource=badge.grant&version=v1 document }
             *
             * 删除授予名单
             *
             * 通过该接口可以删除特定授予名单的信息。
             */
            delete: async (
                payload?: {
                    path: { badge_id: string; grant_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants/:grant_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=admin&resource=badge.grant&version=v1 document }
             *
             * 获取授予名单详情
             *
             * 通过该接口可以获取特定授予名单的信息。
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                    };
                    path: { badge_id: string; grant_id: string };
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
                                grant?: {
                                    id?: string;
                                    badge_id?: string;
                                    name: string;
                                    grant_type: number;
                                    time_zone: string;
                                    rule_detail: {
                                        effective_time?: string;
                                        expiration_time?: string;
                                        anniversary?: number;
                                        effective_period?: number;
                                    };
                                    is_grant_all: boolean;
                                    user_ids?: Array<string>;
                                    department_ids?: Array<string>;
                                    group_ids?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants/:grant_id`,
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
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        name?: string;
                    };
                    path: { badge_id: string };
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
                                `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                grants?: Array<{
                                                    id?: string;
                                                    badge_id?: string;
                                                    name: string;
                                                    grant_type: number;
                                                    time_zone: string;
                                                    rule_detail: {
                                                        effective_time?: string;
                                                        expiration_time?: string;
                                                        anniversary?: number;
                                                        effective_period?: number;
                                                    };
                                                    is_grant_all: boolean;
                                                    user_ids?: Array<string>;
                                                    department_ids?: Array<string>;
                                                    group_ids?: Array<string>;
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=badge.grant&version=v1 document }
             *
             * 获取授予名单列表
             *
             * 通过该接口可以获取特定勋章下的授予名单列表，授予名单的排列顺序按照创建时间倒序排列。
             */
            list: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        name?: string;
                    };
                    path: { badge_id: string };
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
                                grants?: Array<{
                                    id?: string;
                                    badge_id?: string;
                                    name: string;
                                    grant_type: number;
                                    time_zone: string;
                                    rule_detail: {
                                        effective_time?: string;
                                        expiration_time?: string;
                                        anniversary?: number;
                                        effective_period?: number;
                                    };
                                    is_grant_all: boolean;
                                    user_ids?: Array<string>;
                                    department_ids?: Array<string>;
                                    group_ids?: Array<string>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants`,
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
         * badge
         */
        badge: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=admin&resource=badge&version=v1 document }
             *
             * 修改勋章信息
             *
             * 通过该接口可以修改勋章的信息。
             */
            update: async (
                payload?: {
                    data: {
                        name: string;
                        explanation?: string;
                        detail_image: string;
                        show_image: string;
                        i18n_name?: {
                            zh_cn?: string;
                            en_us?: string;
                            ja_jp?: string;
                        };
                        i18n_explanation?: {
                            zh_cn?: string;
                            en_us?: string;
                            ja_jp?: string;
                        };
                    };
                    path: { badge_id: string };
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
                                badge?: {
                                    id?: string;
                                    name: string;
                                    explanation?: string;
                                    detail_image: string;
                                    show_image: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    i18n_explanation?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges/:badge_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=admin&resource=badge&version=v1 document }
             *
             * 获取勋章详情
             *
             * 可以通过该接口查询勋章的详情。
             */
            get: async (
                payload?: {
                    path: { badge_id: string };
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
                                badge?: {
                                    id?: string;
                                    name: string;
                                    explanation?: string;
                                    detail_image: string;
                                    show_image: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    i18n_explanation?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges/:badge_id`,
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
                        name?: string;
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
                                `${this.domain}/open-apis/admin/v1/badges`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                badges?: Array<{
                                                    id?: string;
                                                    name: string;
                                                    explanation?: string;
                                                    detail_image: string;
                                                    show_image: string;
                                                    i18n_name?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                        ja_jp?: string;
                                                    };
                                                    i18n_explanation?: {
                                                        zh_cn?: string;
                                                        en_us?: string;
                                                        ja_jp?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=badge&version=v1 document }
             *
             * 获取勋章列表
             *
             * 可以通过该接口列出租户下所有的勋章，勋章的排列顺序是按照创建时间倒序排列。
             */
            list: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
                        name?: string;
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
                                badges?: Array<{
                                    id?: string;
                                    name: string;
                                    explanation?: string;
                                    detail_image: string;
                                    show_image: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    i18n_explanation?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges`,
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=admin&resource=badge&version=v1 document }
             *
             * 创建勋章
             *
             * 使用该接口可以创建一枚完整的勋章信息，一个租户下最多可创建1000枚勋章。
             */
            create: async (
                payload?: {
                    data: {
                        name: string;
                        explanation?: string;
                        detail_image: string;
                        show_image: string;
                        i18n_name?: {
                            zh_cn?: string;
                            en_us?: string;
                            ja_jp?: string;
                        };
                        i18n_explanation?: {
                            zh_cn?: string;
                            en_us?: string;
                            ja_jp?: string;
                        };
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
                                badge?: {
                                    id?: string;
                                    name: string;
                                    explanation?: string;
                                    detail_image: string;
                                    show_image: string;
                                    i18n_name?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                    i18n_explanation?: {
                                        zh_cn?: string;
                                        en_us?: string;
                                        ja_jp?: string;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badges`,
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
         * password
         */
        password: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=password&apiName=reset&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reset&project=admin&resource=password&version=v1 document }
             *
             * 重置用户的企业邮箱密码
             *
             * 重置用户的企业邮箱密码，仅当用户的邮箱和企业邮箱(别名)一致时生效，可用于处理飞书企业邮箱登录死锁的问题。;;邮箱死锁：当用户的登录凭证与飞书企业邮箱一致时，目前飞书登录流程要求用户输入验证码，由于飞书邮箱无单独的帐号体系，则未登录时无法收取邮箱验证码，即陷入死锁。
             */
            reset: async (
                payload?: {
                    data: {
                        password: { ent_email_password: string };
                        user_id: string;
                    };
                    params: {
                        user_id_type: "open_id" | "union_id" | "user_id";
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/password/reset`,
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
         * badge_image
         */
        badgeImage: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge_image&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=admin&resource=badge_image&version=v1 document }
             *
             * 上传勋章图片
             *
             * 通过该接口可以上传勋章详情图、挂饰图的文件，获取对应的文件key。
             */
            create: async (
                payload?: {
                    data: {
                        image_file: Buffer | fs.ReadStream;
                        image_type: number;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<
                        any,
                        {
                            code?: number;
                            msg?: string;
                            data?: { image_key?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/badge_images`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers: {
                            ...headers,
                            "Content-Type": "multipart/form-data",
                        },
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
                return res?.data || null;
            },
        },
        /**
         * audit_info
         */
        auditInfo: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        latest?: number;
                        oldest?: number;
                        event_name?: string;
                        operator_type?: "user" | "bot";
                        operator_value?: string;
                        event_module?: number;
                        page_token?: string;
                        page_size?: number;
                        user_type?: number;
                        object_type?: number;
                        object_value?: string;
                        ext_filter_object_by_ccm_token?: string;
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
                                `${this.domain}/open-apis/admin/v1/audit_infos`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                has_more?: boolean;
                                                page_token?: string;
                                                items?: Array<{
                                                    event_id?: string;
                                                    unique_id?: string;
                                                    event_name: string;
                                                    department_ids?: Array<string>;
                                                    event_module: number;
                                                    operator_type?: number;
                                                    operator_value?: string;
                                                    objects?: Array<{
                                                        object_type?: string;
                                                        object_value?: string;
                                                        object_name?: string;
                                                        object_owner?: string;
                                                        object_detail?: {
                                                            clone_source?: string;
                                                            text_detail?: string;
                                                            file_name?: string;
                                                            third_party_appID?: string;
                                                            contain_file_num?: number;
                                                            permission_setting_type?: string;
                                                            permission_external_access_Type?: boolean;
                                                            permission_share_type?: string;
                                                            file_service_source?: string;
                                                            okr_download_content?: string;
                                                            container_type?: string;
                                                            container_id?: string;
                                                            current_page?: string;
                                                        };
                                                    }>;
                                                    recipients?: Array<{
                                                        recipient_type?: string;
                                                        recipient_value?: string;
                                                        recipient_detail?: {
                                                            permission_action_type?: string;
                                                            chat_id?: string;
                                                            chat_name?: string;
                                                            chat_type?: number;
                                                            external_flag?: boolean;
                                                        };
                                                    }>;
                                                    event_time?: number;
                                                    ip?: string;
                                                    operator_app?: string;
                                                    audit_context?: {
                                                        terminal_type?: number;
                                                        ios_context?: {
                                                            udid?: string;
                                                            did?: string;
                                                            app_ver?: string;
                                                            ver?: string;
                                                            os?: string;
                                                            STZone?: string;
                                                            ML?: string;
                                                            sjd?: string;
                                                            proxyip?: string;
                                                            wifip?: string;
                                                            location?: string;
                                                            active_ip?: string;
                                                            active_ip_detail?: string;
                                                            cell_base_station?: string;
                                                            IP?: string;
                                                        };
                                                        pc_context?: {
                                                            udid?: string;
                                                            did?: string;
                                                            app_ver?: string;
                                                            ver?: string;
                                                            os?: string;
                                                            wifip?: string;
                                                            region?: string;
                                                            IP?: string;
                                                        };
                                                        web_context?: {
                                                            user_agent?: string;
                                                            IP?: string;
                                                        };
                                                        android_context?: {
                                                            udid?: string;
                                                            did?: string;
                                                            app_ver?: string;
                                                            ver?: string;
                                                            region?: string;
                                                            id_i?: string;
                                                            id_r?: string;
                                                            hw_brand?: string;
                                                            hw_manuf?: string;
                                                            wifip?: string;
                                                            route_iip?: string;
                                                            route_gip?: string;
                                                            env_su?: string;
                                                            env_tz?: string;
                                                            env_ml?: string;
                                                            location?: string;
                                                            active_ip?: string;
                                                            active_ip_detail?: string;
                                                            cell_base_station?: string;
                                                            IP?: string;
                                                        };
                                                    };
                                                    extend?: {
                                                        comment_type?: string;
                                                        app_detail?: string;
                                                        two_step_validation?: boolean;
                                                        login_method?: string;
                                                        new_people_num_in_video?: number;
                                                        external_people_num_in_video?: number;
                                                        external_people_num_in_chat?: number;
                                                        join_group?: number;
                                                        quit_group?: number;
                                                        external_people_num_in_doc_share?: number;
                                                    };
                                                    operator_app_name?: string;
                                                    common_drawers?: {
                                                        common_draw_info_list?: Array<{
                                                            info_key?: string;
                                                            info_val?: string;
                                                            key_i18n_key?: string;
                                                            val_type?: string;
                                                            val_i18n_key?: string;
                                                        }>;
                                                    };
                                                    audit_detail?: {
                                                        mc?: string;
                                                        device_model?: string;
                                                        os?: string;
                                                        city?: string;
                                                    };
                                                    operator_tenant?: string;
                                                    operator_detail?: {
                                                        operator_name: {
                                                            default_name: string;
                                                            i18n_value?: {
                                                                zh_cn?: string;
                                                                en_us?: string;
                                                                ja_jp?: string;
                                                            };
                                                        };
                                                        tenant_name?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=audit_info&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=audit_info&version=v1 document }
             *
             * 用户行为日志搜索
             */
            list: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        latest?: number;
                        oldest?: number;
                        event_name?: string;
                        operator_type?: "user" | "bot";
                        operator_value?: string;
                        event_module?: number;
                        page_token?: string;
                        page_size?: number;
                        user_type?: number;
                        object_type?: number;
                        object_value?: string;
                        ext_filter_object_by_ccm_token?: string;
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    event_id?: string;
                                    unique_id?: string;
                                    event_name: string;
                                    department_ids?: Array<string>;
                                    event_module: number;
                                    operator_type?: number;
                                    operator_value?: string;
                                    objects?: Array<{
                                        object_type?: string;
                                        object_value?: string;
                                        object_name?: string;
                                        object_owner?: string;
                                        object_detail?: {
                                            clone_source?: string;
                                            text_detail?: string;
                                            file_name?: string;
                                            third_party_appID?: string;
                                            contain_file_num?: number;
                                            permission_setting_type?: string;
                                            permission_external_access_Type?: boolean;
                                            permission_share_type?: string;
                                            file_service_source?: string;
                                            okr_download_content?: string;
                                            container_type?: string;
                                            container_id?: string;
                                            current_page?: string;
                                        };
                                    }>;
                                    recipients?: Array<{
                                        recipient_type?: string;
                                        recipient_value?: string;
                                        recipient_detail?: {
                                            permission_action_type?: string;
                                            chat_id?: string;
                                            chat_name?: string;
                                            chat_type?: number;
                                            external_flag?: boolean;
                                        };
                                    }>;
                                    event_time?: number;
                                    ip?: string;
                                    operator_app?: string;
                                    audit_context?: {
                                        terminal_type?: number;
                                        ios_context?: {
                                            udid?: string;
                                            did?: string;
                                            app_ver?: string;
                                            ver?: string;
                                            os?: string;
                                            STZone?: string;
                                            ML?: string;
                                            sjd?: string;
                                            proxyip?: string;
                                            wifip?: string;
                                            location?: string;
                                            active_ip?: string;
                                            active_ip_detail?: string;
                                            cell_base_station?: string;
                                            IP?: string;
                                        };
                                        pc_context?: {
                                            udid?: string;
                                            did?: string;
                                            app_ver?: string;
                                            ver?: string;
                                            os?: string;
                                            wifip?: string;
                                            region?: string;
                                            IP?: string;
                                        };
                                        web_context?: {
                                            user_agent?: string;
                                            IP?: string;
                                        };
                                        android_context?: {
                                            udid?: string;
                                            did?: string;
                                            app_ver?: string;
                                            ver?: string;
                                            region?: string;
                                            id_i?: string;
                                            id_r?: string;
                                            hw_brand?: string;
                                            hw_manuf?: string;
                                            wifip?: string;
                                            route_iip?: string;
                                            route_gip?: string;
                                            env_su?: string;
                                            env_tz?: string;
                                            env_ml?: string;
                                            location?: string;
                                            active_ip?: string;
                                            active_ip_detail?: string;
                                            cell_base_station?: string;
                                            IP?: string;
                                        };
                                    };
                                    extend?: {
                                        comment_type?: string;
                                        app_detail?: string;
                                        two_step_validation?: boolean;
                                        login_method?: string;
                                        new_people_num_in_video?: number;
                                        external_people_num_in_video?: number;
                                        external_people_num_in_chat?: number;
                                        join_group?: number;
                                        quit_group?: number;
                                        external_people_num_in_doc_share?: number;
                                    };
                                    operator_app_name?: string;
                                    common_drawers?: {
                                        common_draw_info_list?: Array<{
                                            info_key?: string;
                                            info_val?: string;
                                            key_i18n_key?: string;
                                            val_type?: string;
                                            val_i18n_key?: string;
                                        }>;
                                    };
                                    audit_detail?: {
                                        mc?: string;
                                        device_model?: string;
                                        os?: string;
                                        city?: string;
                                    };
                                    operator_tenant?: string;
                                    operator_detail?: {
                                        operator_name: {
                                            default_name: string;
                                            i18n_value?: {
                                                zh_cn?: string;
                                                en_us?: string;
                                                ja_jp?: string;
                                            };
                                        };
                                        tenant_name?: string;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/audit_infos`,
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
         * admin_user_ext_contact_stat
         */
        adminUserExtContactStat: {
            listWithIterator: async (
                payload?: {
                    params: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        user_id?: string;
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        department_id?: string;
                        start_date: string;
                        end_date: string;
                        page_size?: number;
                        page_token?: string;
                        target_geo?: string;
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
                                `${this.domain}/open-apis/admin/v1/admin_user_ext_contact_stats`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                has_more?: boolean;
                                                page_token?: string;
                                                items?: Array<{
                                                    date?: string;
                                                    user_id?: string;
                                                    user_name?: string;
                                                    department_name?: string;
                                                    ref_contact_ucnt?: string;
                                                    ref_contact_tcnt?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=admin_user_ext_contact_stat&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=admin_user_ext_contact_stat&version=v1 document }
             *
             * 获取成员所拥有的外部联系人总数
             *
             * 获取成员拥有的外部联系人总数和外部租户总数：成员仅包含已激活未离职的用户；外部联系人仅包含当前关系状态为正常的用户（不限制外部联系人的离职状态）包含私有化租户的外部联系人。
             *
             * - 只有企业自建应用才有权限调用此接口;;- 当天的数据会在第二天的早上九点半产出 (CN时区: UTC+8，非CN时区: UTC+0);;- 日期范围不超过90天，超过90天接口容易超时;;- 仅支持13层级部门数据查询，超过13层级的数据汇聚到第13层级
             */
            list: async (
                payload?: {
                    params: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        user_id?: string;
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        department_id?: string;
                        start_date: string;
                        end_date: string;
                        page_size?: number;
                        page_token?: string;
                        target_geo?: string;
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    date?: string;
                                    user_id?: string;
                                    user_name?: string;
                                    department_name?: string;
                                    ref_contact_ucnt?: string;
                                    ref_contact_tcnt?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/admin_user_ext_contact_stats`,
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
         * task
         */
        task: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=task&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=admin&resource=task&version=v1 document }
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "union_id" | "open_id" | "user_id";
                    };
                    path?: { task_id?: string };
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
                                original_user_id?: string;
                                target_owner_id?: string;
                                file_list?: Array<{
                                    title?: string;
                                    type?:
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5"
                                        | "6"
                                        | "7";
                                    owner?: {
                                        name: string;
                                        avatar: string;
                                        id: string;
                                    };
                                    size?: string;
                                    last_op_time?: string;
                                    status?: "2" | "3";
                                    token?: string;
                                }>;
                                task_id?: string;
                                status?: number;
                                original_user_email?: string;
                                target_owner_email?: string;
                                type?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/tasks/:task_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=task&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=admin&resource=task&version=v1 document }
             */
            create: async (
                payload?: {
                    data?: {
                        original_user_id?: string;
                        target_owner_id?: string;
                        file_list?: Array<{
                            title?: string;
                            type?: "1" | "2" | "3" | "4" | "5" | "6" | "7";
                            owner?: {
                                name: string;
                                avatar: string;
                                id: string;
                            };
                            size?: string;
                            last_op_time?: string;
                            status?: "2" | "3";
                            token?: string;
                        }>;
                        task_id?: string;
                        status?: number;
                        original_user_email?: string;
                        target_owner_email?: string;
                        type?: number;
                    };
                    params?: {
                        user_id_type?: "union_id" | "open_id" | "user_id";
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
                                original_user_id?: string;
                                target_owner_id?: string;
                                file_list?: Array<{
                                    title?: string;
                                    type?:
                                        | "1"
                                        | "2"
                                        | "3"
                                        | "4"
                                        | "5"
                                        | "6"
                                        | "7";
                                    owner?: {
                                        name: string;
                                        avatar: string;
                                        id: string;
                                    };
                                    size?: string;
                                    last_op_time?: string;
                                    status?: "2" | "3";
                                    token?: string;
                                }>;
                                task_id?: string;
                                status?: number;
                                original_user_email?: string;
                                target_owner_email?: string;
                                type?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/tasks`,
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
         * user_annual_report
         */
        userAnnualReport: {
            listWithIterator: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        year: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                `${this.domain}/open-apis/admin/v1/user_annual_reports`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                    year_2021?: {
                                                        active_day_count?: number;
                                                        busy_week?: string;
                                                        p2p_chat_count?: string;
                                                        talked_chat_count?: string;
                                                        favorite_emoji?: string;
                                                        reaction_count?: string;
                                                        conference_create_count?: string;
                                                        total_parti_count?: string;
                                                        minutes_object_count?: string;
                                                        minutes_duration?: number;
                                                        create_edit_file_count?: string;
                                                        create_file_count?: string;
                                                        cooperate_edit_file_count?: string;
                                                        like_record_count?: string;
                                                        okr_cum_o_count?: string;
                                                        okr_cum_kr_count?: string;
                                                        okr_aligned_user_rankfirst?: string;
                                                        approval_start_count?: string;
                                                        approval_execute_count?: string;
                                                        approval_relation_user_rankfirst?: string;
                                                        user_id?: string;
                                                        busy_week_sum_duration?: string;
                                                        busy_week_mdate?: string;
                                                        busy_week_act_days?: number;
                                                        create_read_user_count?: string;
                                                    };
                                                    year_2022?: {
                                                        user_id?: string;
                                                        user_register_date?: string;
                                                        active_day_count?: number;
                                                        msg_busy_date?: string;
                                                        msg_busy_date_send_msg_count?: string;
                                                        p2p_chat_count?: string;
                                                        talked_chat_count?: string;
                                                        positive_reaction_count?: string;
                                                        first_positive_reaction?: string;
                                                        second_positive_reaction?: string;
                                                        third_positive_reaction?: string;
                                                        fourth_positive_reaction?: string;
                                                        fifth_positive_reaction?: string;
                                                        create_file_count?: string;
                                                        created_file_view_count?: string;
                                                        comment_file_count?: string;
                                                        attend_event_count?: string;
                                                        event_busy_date?: string;
                                                        event_busy_date_event_count?: string;
                                                        event_start_time_range1?: string;
                                                        conference_create_count?: string;
                                                        total_parti_count?: string;
                                                        okr_cum_o_count?: string;
                                                        okr_cum_kr_count?: string;
                                                        okr_aligned_user_count?: string;
                                                        people_interview_num?: string;
                                                        send_email_count?: string;
                                                        receive_email_count?: string;
                                                    };
                                                    year_2023?: {
                                                        user_id?: string;
                                                        tenant_all_cnt?: number;
                                                        user_register_date?: string;
                                                        all_day_cnt?: number;
                                                        active_day_cnt?: number;
                                                        duration_cnt_2?: Array<{
                                                            year?: string;
                                                            num?: number;
                                                        }>;
                                                        duration_cnt_rank?: string;
                                                        busy_month?: string;
                                                        busy_month_sum_duration?: number;
                                                        busy_month_send_msg_cnt?: number;
                                                        busy_month_meeting_cnt?: number;
                                                        busy_month_last_meeting_time?: string;
                                                        busy_month_create_edit_file_cnt?: number;
                                                        im_send_msg_cnt_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        im_send_msg_cnt_rank?: string;
                                                        im_busy_date?: string;
                                                        im_busy_date_send_msg_cnt?: number;
                                                        im_last_send_msg_time?: string;
                                                        im_talked_chat_cnt?: number;
                                                        im_private_chat_cnt?: number;
                                                        im_emoji_top1?: string;
                                                        im_emoji_top1_cnt?: string;
                                                        im_emoji_top2?: string;
                                                        im_emoji_top2_cnt?: string;
                                                        im_emoji_top3?: string;
                                                        im_emoji_top3_cnt?: string;
                                                        im_positive_reaction_cnt_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        im_positive_reaction_cnt_rank?: string;
                                                        ccm_create_cnt_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        ccm_create_cnt_rank?: string;
                                                        ccm_create_busy_month?: string;
                                                        ccm_create_busy_month_cnt?: number;
                                                        ccm_create_viewed_ucnt?: number;
                                                        ccm_create_liked_cnt?: number;
                                                        ccm_create_liked_cnt_rank?: string;
                                                        ccm_edit_comment_fcnt_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        ccm_edit_comment_fcnt_rank?: string;
                                                        ccm_view_other_fcnt?: number;
                                                        ccm_view_other_fcnt_rank?: string;
                                                        vc_sent_meeting_cnt_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        vc_sent_meeting_cnt_rank?: string;
                                                        vc_sent_meeting_ucnt?: number;
                                                        vc_join_meeting_cnt_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        vc_join_meeting_cnt_rank?: string;
                                                        vc_all_meeting_cnt?: number;
                                                        vc_all_meeting_cnt_rank?: string;
                                                        vc_all_meeting_duration_2?: Array<{
                                                            year?: string;
                                                            num?: number;
                                                        }>;
                                                        cal_comment_cal_time?: string;
                                                        people_profile_view_cnt?: string;
                                                        people_interview_num_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        people_interview_num_rank?: string;
                                                        people_interview_offer_num_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        people_interview_offer_num_rank?: string;
                                                        email_send_email_count?: number;
                                                        email_receive_email_count?: number;
                                                    };
                                                    year_2024?: {
                                                        user_id?: string;
                                                        tenant_all_cnt?: string;
                                                        user_register_date?: string;
                                                        feishu_day_cnt?: string;
                                                        duration_cnt_2?: Array<{
                                                            year?: string;
                                                            num?: number;
                                                        }>;
                                                        im_send_msg_cnt_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        avg_im_send_msg_cnt_2?: Array<{
                                                            year?: string;
                                                            num?: number;
                                                        }>;
                                                        im_talked_chat_cnt?: string;
                                                        im_private_chat_cnt?: string;
                                                        im_emoji_top1?: string;
                                                        im_emoji_top1_cnt_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        im_emoji_top2?: string;
                                                        im_emoji_top2_cnt_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        im_emoji_top3?: string;
                                                        im_emoji_top3_cnt_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        im_positive_reaction_cnt_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        im_positive_reaction_cnt_rank?: string;
                                                        im_positive_reaction_cnt_denominator?: string;
                                                        busy_day?: string;
                                                        busy_day_send_msg_cnt?: string;
                                                        ccm_create_cnt_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        ccm_create_viewed_ucnt?: string;
                                                        ccm_create_liked_cnt?: string;
                                                        ccm_create_liked_max_cnt?: string;
                                                        vc_join_meeting_cnt?: string;
                                                        vc_all_meeting_duration_2?: Array<{
                                                            year?: string;
                                                            num?: number;
                                                        }>;
                                                        vc_join_meeting_all_user_cnt?: string;
                                                        vc_last_meeting_time?: string;
                                                        base_create_fcnt_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        base_view_fcnt?: string;
                                                        base_create_dashboard_cnt?: string;
                                                        base_create_dashboard_rank?: string;
                                                        base_create_dashboard_rank_ucnt?: string;
                                                        base_create_chat_cnt?: string;
                                                        base_workflow_ins_cnt?: string;
                                                        base_workflow_ins_rank?: string;
                                                        base_workflow_ins_rank_ucnt?: string;
                                                        vc_all_read_notes_cnt?: string;
                                                        meego_role_wi_cnt_v2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        meego_common_wi_ucnt?: string;
                                                        meego_workflow_wi_cnt?: string;
                                                        people_interview_num_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                        people_interview_num_rank?: string;
                                                        people_interview_num_rank_ucnt?: string;
                                                        people_interview_offer_num_2?: Array<{
                                                            year?: string;
                                                            count?: string;
                                                        }>;
                                                    };
                                                    year_2025: {
                                                        user_id?: string;
                                                        tenant_all_cnt?: string;
                                                        user_register_date?: string;
                                                        feishu_active_days?: string;
                                                        feishu_duration_busy_month?: string;
                                                        feishu_duration_busy_month_hours?: number;
                                                        busy_month_send_msg_cnt?: string;
                                                        busy_month_edit_doc_cnt?: string;
                                                        busy_month_read_doc_cnt?: string;
                                                        busy_month_join_meeting_cnt?: string;
                                                        busy_month_meeting_duration?: number;
                                                        im_talked_chat_cnt?: string;
                                                        im_private_chat_cnt?: string;
                                                        im_send_msg_cnt?: string;
                                                        im_emoji_top1?: string;
                                                        im_emoji_top1_cnt?: string;
                                                        im_emoji_top2?: string;
                                                        im_emoji_top2_cnt?: string;
                                                        im_emoji_top3?: string;
                                                        im_emoji_top3_cnt?: string;
                                                        ccm_create_fcnt?: string;
                                                        ccm_create_rank?: string;
                                                        ccm_create_rank_ucnt?: string;
                                                        ccm_create_viewed_ucnt?: string;
                                                        ccm_create_liked_cnt?: string;
                                                        ccm_create_viewed_most_ucnt?: string;
                                                        ccm_all_read_doc_cnt?: string;
                                                        docs_ai_quickview_use_cnt?: string;
                                                        vc_join_meeting_cnt?: string;
                                                        vc_join_meeting_duration?: number;
                                                        vc_org_meeting_cnt?: Array<{
                                                            organized_meeting_cnt?: string;
                                                            organized_cal_meeting_cnt?: string;
                                                            organized_instant_meeting_cnt?: string;
                                                        }>;
                                                        ai_notes_create_cnt?: string;
                                                        ai_notes_read_cnt?: string;
                                                        knowledge_ai_use_cnt?: string;
                                                        knowledge_ai_use_busy_day?: string;
                                                        knowledge_ai_use_busy_day_cnt?: string;
                                                        base_create_fcnt?: string;
                                                        base_ai_top1_name_map?: Array<{
                                                            name_cn?: string;
                                                            name_en?: string;
                                                            name_cn_list?: string;
                                                            name_en_list?: string;
                                                        }>;
                                                        base_create_view_ucnt?: string;
                                                        base_most_rows_cnt?: string;
                                                        base_create_dashboard_cnt?: string;
                                                        base_workflow_create_cnt?: string;
                                                        base_workflow_ins_cnt?: string;
                                                        aily_develop_app_cnt?: string;
                                                        aily_develop_app_active_ucnt?: string;
                                                        aily_develop_active_most_app_intents?: string;
                                                        aily_chat_cnt?: string;
                                                        aily_artifact_create_cnt?: string;
                                                        apaas_develop_app_cnt?: string;
                                                        apaas_develop_app_active_ucnt?: string;
                                                        apaas_develop_active_most_app_ucnt?: string;
                                                        apaas_develop_ai_run_cnt?: string;
                                                        meego_is_project_admin?: string;
                                                        meego_create_wi_cnt?: string;
                                                        meego_create_wi_role_ucnt?: string;
                                                        meego_most_view_wi_ucnt?: string;
                                                        meego_set_ai_field_cnt?: string;
                                                        meego_ai_field_run_cnt?: string;
                                                        meego_ai_gantt_use_cnt?: string;
                                                        meego_ai_weekly_report_use_cnt?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=user_annual_report&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=user_annual_report&version=v1 document }
             *
             * 批量获取飞书用户的年度行为报告数据
             *
             * 用于分页获取用户的年度飞书行为报告，可以通过has_more字段遍历所有的用户。
             */
            list: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        year: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    year_2021?: {
                                        active_day_count?: number;
                                        busy_week?: string;
                                        p2p_chat_count?: string;
                                        talked_chat_count?: string;
                                        favorite_emoji?: string;
                                        reaction_count?: string;
                                        conference_create_count?: string;
                                        total_parti_count?: string;
                                        minutes_object_count?: string;
                                        minutes_duration?: number;
                                        create_edit_file_count?: string;
                                        create_file_count?: string;
                                        cooperate_edit_file_count?: string;
                                        like_record_count?: string;
                                        okr_cum_o_count?: string;
                                        okr_cum_kr_count?: string;
                                        okr_aligned_user_rankfirst?: string;
                                        approval_start_count?: string;
                                        approval_execute_count?: string;
                                        approval_relation_user_rankfirst?: string;
                                        user_id?: string;
                                        busy_week_sum_duration?: string;
                                        busy_week_mdate?: string;
                                        busy_week_act_days?: number;
                                        create_read_user_count?: string;
                                    };
                                    year_2022?: {
                                        user_id?: string;
                                        user_register_date?: string;
                                        active_day_count?: number;
                                        msg_busy_date?: string;
                                        msg_busy_date_send_msg_count?: string;
                                        p2p_chat_count?: string;
                                        talked_chat_count?: string;
                                        positive_reaction_count?: string;
                                        first_positive_reaction?: string;
                                        second_positive_reaction?: string;
                                        third_positive_reaction?: string;
                                        fourth_positive_reaction?: string;
                                        fifth_positive_reaction?: string;
                                        create_file_count?: string;
                                        created_file_view_count?: string;
                                        comment_file_count?: string;
                                        attend_event_count?: string;
                                        event_busy_date?: string;
                                        event_busy_date_event_count?: string;
                                        event_start_time_range1?: string;
                                        conference_create_count?: string;
                                        total_parti_count?: string;
                                        okr_cum_o_count?: string;
                                        okr_cum_kr_count?: string;
                                        okr_aligned_user_count?: string;
                                        people_interview_num?: string;
                                        send_email_count?: string;
                                        receive_email_count?: string;
                                    };
                                    year_2023?: {
                                        user_id?: string;
                                        tenant_all_cnt?: number;
                                        user_register_date?: string;
                                        all_day_cnt?: number;
                                        active_day_cnt?: number;
                                        duration_cnt_2?: Array<{
                                            year?: string;
                                            num?: number;
                                        }>;
                                        duration_cnt_rank?: string;
                                        busy_month?: string;
                                        busy_month_sum_duration?: number;
                                        busy_month_send_msg_cnt?: number;
                                        busy_month_meeting_cnt?: number;
                                        busy_month_last_meeting_time?: string;
                                        busy_month_create_edit_file_cnt?: number;
                                        im_send_msg_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        im_send_msg_cnt_rank?: string;
                                        im_busy_date?: string;
                                        im_busy_date_send_msg_cnt?: number;
                                        im_last_send_msg_time?: string;
                                        im_talked_chat_cnt?: number;
                                        im_private_chat_cnt?: number;
                                        im_emoji_top1?: string;
                                        im_emoji_top1_cnt?: string;
                                        im_emoji_top2?: string;
                                        im_emoji_top2_cnt?: string;
                                        im_emoji_top3?: string;
                                        im_emoji_top3_cnt?: string;
                                        im_positive_reaction_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        im_positive_reaction_cnt_rank?: string;
                                        ccm_create_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        ccm_create_cnt_rank?: string;
                                        ccm_create_busy_month?: string;
                                        ccm_create_busy_month_cnt?: number;
                                        ccm_create_viewed_ucnt?: number;
                                        ccm_create_liked_cnt?: number;
                                        ccm_create_liked_cnt_rank?: string;
                                        ccm_edit_comment_fcnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        ccm_edit_comment_fcnt_rank?: string;
                                        ccm_view_other_fcnt?: number;
                                        ccm_view_other_fcnt_rank?: string;
                                        vc_sent_meeting_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        vc_sent_meeting_cnt_rank?: string;
                                        vc_sent_meeting_ucnt?: number;
                                        vc_join_meeting_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        vc_join_meeting_cnt_rank?: string;
                                        vc_all_meeting_cnt?: number;
                                        vc_all_meeting_cnt_rank?: string;
                                        vc_all_meeting_duration_2?: Array<{
                                            year?: string;
                                            num?: number;
                                        }>;
                                        cal_comment_cal_time?: string;
                                        people_profile_view_cnt?: string;
                                        people_interview_num_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        people_interview_num_rank?: string;
                                        people_interview_offer_num_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        people_interview_offer_num_rank?: string;
                                        email_send_email_count?: number;
                                        email_receive_email_count?: number;
                                    };
                                    year_2024?: {
                                        user_id?: string;
                                        tenant_all_cnt?: string;
                                        user_register_date?: string;
                                        feishu_day_cnt?: string;
                                        duration_cnt_2?: Array<{
                                            year?: string;
                                            num?: number;
                                        }>;
                                        im_send_msg_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        avg_im_send_msg_cnt_2?: Array<{
                                            year?: string;
                                            num?: number;
                                        }>;
                                        im_talked_chat_cnt?: string;
                                        im_private_chat_cnt?: string;
                                        im_emoji_top1?: string;
                                        im_emoji_top1_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        im_emoji_top2?: string;
                                        im_emoji_top2_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        im_emoji_top3?: string;
                                        im_emoji_top3_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        im_positive_reaction_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        im_positive_reaction_cnt_rank?: string;
                                        im_positive_reaction_cnt_denominator?: string;
                                        busy_day?: string;
                                        busy_day_send_msg_cnt?: string;
                                        ccm_create_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        ccm_create_viewed_ucnt?: string;
                                        ccm_create_liked_cnt?: string;
                                        ccm_create_liked_max_cnt?: string;
                                        vc_join_meeting_cnt?: string;
                                        vc_all_meeting_duration_2?: Array<{
                                            year?: string;
                                            num?: number;
                                        }>;
                                        vc_join_meeting_all_user_cnt?: string;
                                        vc_last_meeting_time?: string;
                                        base_create_fcnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        base_view_fcnt?: string;
                                        base_create_dashboard_cnt?: string;
                                        base_create_dashboard_rank?: string;
                                        base_create_dashboard_rank_ucnt?: string;
                                        base_create_chat_cnt?: string;
                                        base_workflow_ins_cnt?: string;
                                        base_workflow_ins_rank?: string;
                                        base_workflow_ins_rank_ucnt?: string;
                                        vc_all_read_notes_cnt?: string;
                                        meego_role_wi_cnt_v2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        meego_common_wi_ucnt?: string;
                                        meego_workflow_wi_cnt?: string;
                                        people_interview_num_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        people_interview_num_rank?: string;
                                        people_interview_num_rank_ucnt?: string;
                                        people_interview_offer_num_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                    };
                                    year_2025: {
                                        user_id?: string;
                                        tenant_all_cnt?: string;
                                        user_register_date?: string;
                                        feishu_active_days?: string;
                                        feishu_duration_busy_month?: string;
                                        feishu_duration_busy_month_hours?: number;
                                        busy_month_send_msg_cnt?: string;
                                        busy_month_edit_doc_cnt?: string;
                                        busy_month_read_doc_cnt?: string;
                                        busy_month_join_meeting_cnt?: string;
                                        busy_month_meeting_duration?: number;
                                        im_talked_chat_cnt?: string;
                                        im_private_chat_cnt?: string;
                                        im_send_msg_cnt?: string;
                                        im_emoji_top1?: string;
                                        im_emoji_top1_cnt?: string;
                                        im_emoji_top2?: string;
                                        im_emoji_top2_cnt?: string;
                                        im_emoji_top3?: string;
                                        im_emoji_top3_cnt?: string;
                                        ccm_create_fcnt?: string;
                                        ccm_create_rank?: string;
                                        ccm_create_rank_ucnt?: string;
                                        ccm_create_viewed_ucnt?: string;
                                        ccm_create_liked_cnt?: string;
                                        ccm_create_viewed_most_ucnt?: string;
                                        ccm_all_read_doc_cnt?: string;
                                        docs_ai_quickview_use_cnt?: string;
                                        vc_join_meeting_cnt?: string;
                                        vc_join_meeting_duration?: number;
                                        vc_org_meeting_cnt?: Array<{
                                            organized_meeting_cnt?: string;
                                            organized_cal_meeting_cnt?: string;
                                            organized_instant_meeting_cnt?: string;
                                        }>;
                                        ai_notes_create_cnt?: string;
                                        ai_notes_read_cnt?: string;
                                        knowledge_ai_use_cnt?: string;
                                        knowledge_ai_use_busy_day?: string;
                                        knowledge_ai_use_busy_day_cnt?: string;
                                        base_create_fcnt?: string;
                                        base_ai_top1_name_map?: Array<{
                                            name_cn?: string;
                                            name_en?: string;
                                            name_cn_list?: string;
                                            name_en_list?: string;
                                        }>;
                                        base_create_view_ucnt?: string;
                                        base_most_rows_cnt?: string;
                                        base_create_dashboard_cnt?: string;
                                        base_workflow_create_cnt?: string;
                                        base_workflow_ins_cnt?: string;
                                        aily_develop_app_cnt?: string;
                                        aily_develop_app_active_ucnt?: string;
                                        aily_develop_active_most_app_intents?: string;
                                        aily_chat_cnt?: string;
                                        aily_artifact_create_cnt?: string;
                                        apaas_develop_app_cnt?: string;
                                        apaas_develop_app_active_ucnt?: string;
                                        apaas_develop_active_most_app_ucnt?: string;
                                        apaas_develop_ai_run_cnt?: string;
                                        meego_is_project_admin?: string;
                                        meego_create_wi_cnt?: string;
                                        meego_create_wi_role_ucnt?: string;
                                        meego_most_view_wi_ucnt?: string;
                                        meego_set_ai_field_cnt?: string;
                                        meego_ai_field_run_cnt?: string;
                                        meego_ai_gantt_use_cnt?: string;
                                        meego_ai_weekly_report_use_cnt?: string;
                                    };
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/user_annual_reports`,
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
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=user_annual_report&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=admin&resource=user_annual_report&version=v1 document }
             *
             * 获取单个飞书用户的年度行为报告数据
             *
             * 获取单个用户的年度飞书使用报告情况，包括活跃、使用习惯、文档创建数量、OKR数量、审批流使用情况等指标。
             */
            query: async (
                payload?: {
                    params: {
                        year: number;
                        user_id_type: "open_id" | "union_id" | "user_id";
                        user_id: string;
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
                                user_annual_report?: {
                                    year_2021?: {
                                        active_day_count?: number;
                                        busy_week?: string;
                                        p2p_chat_count?: string;
                                        talked_chat_count?: string;
                                        favorite_emoji?: string;
                                        reaction_count?: string;
                                        conference_create_count?: string;
                                        total_parti_count?: string;
                                        minutes_object_count?: string;
                                        minutes_duration?: number;
                                        create_edit_file_count?: string;
                                        create_file_count?: string;
                                        cooperate_edit_file_count?: string;
                                        like_record_count?: string;
                                        okr_cum_o_count?: string;
                                        okr_cum_kr_count?: string;
                                        okr_aligned_user_rankfirst?: string;
                                        approval_start_count?: string;
                                        approval_execute_count?: string;
                                        approval_relation_user_rankfirst?: string;
                                        user_id?: string;
                                        busy_week_sum_duration?: string;
                                        busy_week_mdate?: string;
                                        busy_week_act_days?: number;
                                        create_read_user_count?: string;
                                    };
                                    year_2022?: {
                                        user_id?: string;
                                        user_register_date?: string;
                                        active_day_count?: number;
                                        msg_busy_date?: string;
                                        msg_busy_date_send_msg_count?: string;
                                        p2p_chat_count?: string;
                                        talked_chat_count?: string;
                                        positive_reaction_count?: string;
                                        first_positive_reaction?: string;
                                        second_positive_reaction?: string;
                                        third_positive_reaction?: string;
                                        fourth_positive_reaction?: string;
                                        fifth_positive_reaction?: string;
                                        create_file_count?: string;
                                        created_file_view_count?: string;
                                        comment_file_count?: string;
                                        attend_event_count?: string;
                                        event_busy_date?: string;
                                        event_busy_date_event_count?: string;
                                        event_start_time_range1?: string;
                                        conference_create_count?: string;
                                        total_parti_count?: string;
                                        okr_cum_o_count?: string;
                                        okr_cum_kr_count?: string;
                                        okr_aligned_user_count?: string;
                                        people_interview_num?: string;
                                        send_email_count?: string;
                                        receive_email_count?: string;
                                    };
                                    year_2023?: {
                                        user_id?: string;
                                        tenant_all_cnt?: number;
                                        user_register_date?: string;
                                        all_day_cnt?: number;
                                        active_day_cnt?: number;
                                        duration_cnt_2?: Array<{
                                            year?: string;
                                            num?: number;
                                        }>;
                                        duration_cnt_rank?: string;
                                        busy_month?: string;
                                        busy_month_sum_duration?: number;
                                        busy_month_send_msg_cnt?: number;
                                        busy_month_meeting_cnt?: number;
                                        busy_month_last_meeting_time?: string;
                                        busy_month_create_edit_file_cnt?: number;
                                        im_send_msg_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        im_send_msg_cnt_rank?: string;
                                        im_busy_date?: string;
                                        im_busy_date_send_msg_cnt?: number;
                                        im_last_send_msg_time?: string;
                                        im_talked_chat_cnt?: number;
                                        im_private_chat_cnt?: number;
                                        im_emoji_top1?: string;
                                        im_emoji_top1_cnt?: string;
                                        im_emoji_top2?: string;
                                        im_emoji_top2_cnt?: string;
                                        im_emoji_top3?: string;
                                        im_emoji_top3_cnt?: string;
                                        im_positive_reaction_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        im_positive_reaction_cnt_rank?: string;
                                        ccm_create_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        ccm_create_cnt_rank?: string;
                                        ccm_create_busy_month?: string;
                                        ccm_create_busy_month_cnt?: number;
                                        ccm_create_viewed_ucnt?: number;
                                        ccm_create_liked_cnt?: number;
                                        ccm_create_liked_cnt_rank?: string;
                                        ccm_edit_comment_fcnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        ccm_edit_comment_fcnt_rank?: string;
                                        ccm_view_other_fcnt?: number;
                                        ccm_view_other_fcnt_rank?: string;
                                        vc_sent_meeting_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        vc_sent_meeting_cnt_rank?: string;
                                        vc_sent_meeting_ucnt?: number;
                                        vc_join_meeting_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        vc_join_meeting_cnt_rank?: string;
                                        vc_all_meeting_cnt?: number;
                                        vc_all_meeting_cnt_rank?: string;
                                        vc_all_meeting_duration_2?: Array<{
                                            year?: string;
                                            num?: number;
                                        }>;
                                        cal_comment_cal_time?: string;
                                        people_profile_view_cnt?: string;
                                        people_interview_num_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        people_interview_num_rank?: string;
                                        people_interview_offer_num_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        people_interview_offer_num_rank?: string;
                                        email_send_email_count?: number;
                                        email_receive_email_count?: number;
                                    };
                                    year_2024?: {
                                        user_id?: string;
                                        tenant_all_cnt?: string;
                                        user_register_date?: string;
                                        feishu_day_cnt?: string;
                                        duration_cnt_2?: Array<{
                                            year?: string;
                                            num?: number;
                                        }>;
                                        im_send_msg_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        avg_im_send_msg_cnt_2?: Array<{
                                            year?: string;
                                            num?: number;
                                        }>;
                                        im_talked_chat_cnt?: string;
                                        im_private_chat_cnt?: string;
                                        im_emoji_top1?: string;
                                        im_emoji_top1_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        im_emoji_top2?: string;
                                        im_emoji_top2_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        im_emoji_top3?: string;
                                        im_emoji_top3_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        im_positive_reaction_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        im_positive_reaction_cnt_rank?: string;
                                        im_positive_reaction_cnt_denominator?: string;
                                        busy_day?: string;
                                        busy_day_send_msg_cnt?: string;
                                        ccm_create_cnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        ccm_create_viewed_ucnt?: string;
                                        ccm_create_liked_cnt?: string;
                                        ccm_create_liked_max_cnt?: string;
                                        vc_join_meeting_cnt?: string;
                                        vc_all_meeting_duration_2?: Array<{
                                            year?: string;
                                            num?: number;
                                        }>;
                                        vc_join_meeting_all_user_cnt?: string;
                                        vc_last_meeting_time?: string;
                                        base_create_fcnt_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        base_view_fcnt?: string;
                                        base_create_dashboard_cnt?: string;
                                        base_create_dashboard_rank?: string;
                                        base_create_dashboard_rank_ucnt?: string;
                                        base_create_chat_cnt?: string;
                                        base_workflow_ins_cnt?: string;
                                        base_workflow_ins_rank?: string;
                                        base_workflow_ins_rank_ucnt?: string;
                                        vc_all_read_notes_cnt?: string;
                                        meego_role_wi_cnt_v2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        meego_common_wi_ucnt?: string;
                                        meego_workflow_wi_cnt?: string;
                                        people_interview_num_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                        people_interview_num_rank?: string;
                                        people_interview_num_rank_ucnt?: string;
                                        people_interview_offer_num_2?: Array<{
                                            year?: string;
                                            count?: string;
                                        }>;
                                    };
                                    year_2025: {
                                        user_id?: string;
                                        tenant_all_cnt?: string;
                                        user_register_date?: string;
                                        feishu_active_days?: string;
                                        feishu_duration_busy_month?: string;
                                        feishu_duration_busy_month_hours?: number;
                                        busy_month_send_msg_cnt?: string;
                                        busy_month_edit_doc_cnt?: string;
                                        busy_month_read_doc_cnt?: string;
                                        busy_month_join_meeting_cnt?: string;
                                        busy_month_meeting_duration?: number;
                                        im_talked_chat_cnt?: string;
                                        im_private_chat_cnt?: string;
                                        im_send_msg_cnt?: string;
                                        im_emoji_top1?: string;
                                        im_emoji_top1_cnt?: string;
                                        im_emoji_top2?: string;
                                        im_emoji_top2_cnt?: string;
                                        im_emoji_top3?: string;
                                        im_emoji_top3_cnt?: string;
                                        ccm_create_fcnt?: string;
                                        ccm_create_rank?: string;
                                        ccm_create_rank_ucnt?: string;
                                        ccm_create_viewed_ucnt?: string;
                                        ccm_create_liked_cnt?: string;
                                        ccm_create_viewed_most_ucnt?: string;
                                        ccm_all_read_doc_cnt?: string;
                                        docs_ai_quickview_use_cnt?: string;
                                        vc_join_meeting_cnt?: string;
                                        vc_join_meeting_duration?: number;
                                        vc_org_meeting_cnt?: Array<{
                                            organized_meeting_cnt?: string;
                                            organized_cal_meeting_cnt?: string;
                                            organized_instant_meeting_cnt?: string;
                                        }>;
                                        ai_notes_create_cnt?: string;
                                        ai_notes_read_cnt?: string;
                                        knowledge_ai_use_cnt?: string;
                                        knowledge_ai_use_busy_day?: string;
                                        knowledge_ai_use_busy_day_cnt?: string;
                                        base_create_fcnt?: string;
                                        base_ai_top1_name_map?: Array<{
                                            name_cn?: string;
                                            name_en?: string;
                                            name_cn_list?: string;
                                            name_en_list?: string;
                                        }>;
                                        base_create_view_ucnt?: string;
                                        base_most_rows_cnt?: string;
                                        base_create_dashboard_cnt?: string;
                                        base_workflow_create_cnt?: string;
                                        base_workflow_ins_cnt?: string;
                                        aily_develop_app_cnt?: string;
                                        aily_develop_app_active_ucnt?: string;
                                        aily_develop_active_most_app_intents?: string;
                                        aily_chat_cnt?: string;
                                        aily_artifact_create_cnt?: string;
                                        apaas_develop_app_cnt?: string;
                                        apaas_develop_app_active_ucnt?: string;
                                        apaas_develop_active_most_app_ucnt?: string;
                                        apaas_develop_ai_run_cnt?: string;
                                        meego_is_project_admin?: string;
                                        meego_create_wi_cnt?: string;
                                        meego_create_wi_role_ucnt?: string;
                                        meego_most_view_wi_ucnt?: string;
                                        meego_set_ai_field_cnt?: string;
                                        meego_ai_field_run_cnt?: string;
                                        meego_ai_gantt_use_cnt?: string;
                                        meego_ai_weekly_report_use_cnt?: string;
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/user_annual_reports/query`,
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
         * admin_dept_ext_contact_stat
         */
        adminDeptExtContactStat: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=admin_dept_ext_contact_stat&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=admin_dept_ext_contact_stat&version=v1 document }
             *
             * 获取部门所拥有的外部联系人总数
             *
             * 获取部门外部联系人总数包括：部门拥有外部联系人的成员数、部门拥有外部联系人的总数和总外部租户数。部门下纳入统计的成员仅包含已激活未离职的用户；外部联系人仅包含当前关系状态为正常的用户（不限制外部联系人的离职状态），包含私有化租户的外部联系人
             *
             * - 只有企业自建应用才有权限调用此接口;;- 当天的数据会在第二天的早上九点半产出 (CN时区: UTC+8，非CN时区: UTC+0);;- 日期范围不超过90天，超过90天接口容易超时;;- 仅支持13层级部门数据查询，超过13层级的数据汇聚到第13层级;;;不能简单将多区域的数据加总汇聚，例如一个部门对应多个区域，多个区域都包含同一个外部联系人，则部门下实际外部联系人是1，但是简单加总结果>1
             */
            list: async (
                payload?: {
                    params: {
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        department_id?: string;
                        start_date: string;
                        end_date: string;
                        page_size?: number;
                        page_token?: string;
                        target_geo?: string;
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    date?: string;
                                    department_id?: string;
                                    department_name?: string;
                                    has_ref_contact_ucnt?: string;
                                    ref_contact_ucnt?: string;
                                    ref_contact_tcnt?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/admin_dept_ext_contact_stats`,
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
         * ai_usage_detail
         */
        aiUsageDetail: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=ai_usage_detail&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=admin&resource=ai_usage_detail&version=v1 document }
             */
            query: async (
                payload?: {
                    data: {
                        date_start: number;
                        date_end: number;
                        subject_type: number;
                        subjects: Array<{
                            entity_type: number;
                            entity_ids: Array<string>;
                        }>;
                        filters?: {
                            feature_keys?: Array<number>;
                            usage_type?: number;
                            scenario_ids?: Array<{
                                biz_type: string;
                                biz1_type?: string;
                                biz2_type?: string;
                            }>;
                        };
                        locale?: "zh-CN" | "en-US" | "ja-JP";
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
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
                                items: Array<{
                                    entity_type?: number;
                                    entity_id?: string;
                                    usage_value_general_ai_quota?: number;
                                    usage_value_ai_notes_quota?: number;
                                    usage_value_feishu_aily_quota?: number;
                                }>;
                                has_more: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/ai_usage_detail/query`,
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
         * admin_user_stat
         */
        adminUserStat: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=admin_user_stat&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=admin_user_stat&version=v1 document }
             *
             * 获取用户维度的用户活跃和功能使用数据
             *
             * 用于获取用户维度的用户活跃和功能使用数据，即IM（即时通讯）、日历、云文档、音视频会议、邮箱功能的使用数据。
             *
             * - 只有企业自建应用才有权限调用此接口;;- 当天的数据会在第二天的早上九点半产出（CN时区: UTC+8，非CN时区: UTC+0）;;- 数据权限范围配置：目前只支持给每个应用配置部门级别数据权限范围，默认包含子部门
             */
            list: async (
                payload?: {
                    params: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
                        start_date: string;
                        end_date: string;
                        department_id?: string;
                        user_id?: string;
                        page_size?: number;
                        page_token?: string;
                        target_geo?: string;
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    date?: string;
                                    user_id?: string;
                                    user_name?: string;
                                    department_name?: string;
                                    department_path?: string;
                                    create_time?: string;
                                    user_active_flag?: number;
                                    register_time?: string;
                                    suite_active_flag?: number;
                                    last_active_time?: string;
                                    im_active_flag?: number;
                                    send_messenger_num?: number;
                                    docs_active_flag?: number;
                                    create_docs_num?: number;
                                    cal_active_flag?: number;
                                    create_cal_num?: number;
                                    vc_active_flag?: number;
                                    vc_duration?: number;
                                    active_os?: string;
                                    create_task_num?: number;
                                    vc_num?: number;
                                    app_package_type?: string;
                                    os_name?: string;
                                    email_send_count?: string;
                                    email_receive_count?: string;
                                    email_send_ext_count?: string;
                                    email_receive_ext_count?: string;
                                    email_send_in_count?: string;
                                    email_receive_in_count?: string;
                                    search_active_flag?: number;
                                    total_search_count?: string;
                                    quick_search_count?: string;
                                    tab_search_count?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/admin_user_stats`,
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
         * admin_dept_stat
         */
        adminDeptStat: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=admin_dept_stat&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=admin_dept_stat&version=v1 document }
             *
             * 获取部门维度的用户活跃和功能使用数据
             *
             * 该接口用于获取部门维度的用户活跃和功能使用数据，即IM（即时通讯）、日历、云文档、音视频会议、邮箱功能的使用数据。
             *
             * - 只有企业自建应用才有权限调用此接口;;- 当天的数据会在第二天的早上九点半产出（CN时区: UTC+8，非CN时区: UTC+0）;;- 数据权限范围配置：目前只支持给每个应用配置部门级别数据权限范围，默认包含子部门（应用数据权限在开放平台配置）
             */
            list: async (
                payload?: {
                    params: {
                        department_id_type:
                            | "department_id"
                            | "open_department_id";
                        start_date: string;
                        end_date: string;
                        department_id: string;
                        contains_child_dept: boolean;
                        page_size?: number;
                        page_token?: string;
                        target_geo?: string;
                        with_product_version?: boolean;
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    date?: string;
                                    department_id?: string;
                                    department_name?: string;
                                    department_path?: string;
                                    total_user_num?: number;
                                    active_user_num?: number;
                                    active_user_rate?: string;
                                    suite_dau?: number;
                                    suite_active_rate?: string;
                                    new_user_num?: number;
                                    new_active_num?: number;
                                    resign_user_num?: number;
                                    im_dau?: number;
                                    send_messenger_user_num?: number;
                                    send_messenger_num?: number;
                                    avg_send_messenger_num?: string;
                                    docs_dau?: number;
                                    create_docs_user_num?: number;
                                    create_docs_num?: number;
                                    avg_create_docs_num?: string;
                                    cal_dau?: number;
                                    create_cal_user_num?: number;
                                    create_cal_num?: number;
                                    avg_create_cal_num?: string;
                                    vc_dau?: number;
                                    vc_duration?: number;
                                    avg_vc_duration?: string;
                                    avg_duration?: string;
                                    task_dau?: number;
                                    create_task_user_num?: number;
                                    create_task_num?: number;
                                    avg_create_task_num?: string;
                                    email_send_count?: string;
                                    email_receive_count?: string;
                                    email_send_ext_count?: string;
                                    email_receive_ext_count?: string;
                                    email_send_in_count?: string;
                                    email_receive_in_count?: string;
                                    search_active_dau?: string;
                                    total_search_count?: string;
                                    quick_search_count?: string;
                                    tab_search_count?: string;
                                    product_version?: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/admin_dept_stats`,
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
         * ai_usage_log
         */
        aiUsageLog: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=admin&resource=ai_usage_log&apiName=query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=admin&resource=ai_usage_log&version=v1 document }
             */
            query: async (
                payload?: {
                    data: {
                        date_start: number;
                        date_end: number;
                        subject_type: number;
                        subjects: Array<{
                            entity_type: number;
                            entity_ids: Array<string>;
                        }>;
                        filters?: {
                            feature_keys?: Array<number>;
                            usage_type?: number;
                            scenario_ids?: Array<{
                                biz_type: string;
                                biz1_type?: string;
                                biz2_type?: string;
                            }>;
                        };
                        locale?: "zh-CN" | "en-US" | "ja-JP";
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        department_id_type?:
                            | "department_id"
                            | "open_department_id";
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
                                items: Array<{
                                    entity_type?: number;
                                    entity_id?: string;
                                    department_id?: string;
                                    time?: number;
                                    scenario_translate?: string;
                                    scenarios?: Array<{
                                        biz_type: string;
                                        biz1_type?: string;
                                        biz2_type?: string;
                                    }>;
                                    feature_key?: number;
                                    usage_type?: number;
                                    used_quota?: number;
                                    notes?: {
                                        key_name: string;
                                        key_type: number;
                                        value: string;
                                    };
                                    descriptions?: Array<{
                                        key_name: string;
                                        key_type: number;
                                        value: string;
                                    }>;
                                }>;
                                has_more: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/admin/v1/ai_usage_log/query`,
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
        v1: {
            /**
             * splash_page_stat
             */
            splashPageStat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=splash_page_stat&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=splash_page_stat&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            start_date?: string;
                            end_date: string;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        date?: string;
                                        splash_id?: string;
                                        impression_count?: number;
                                        click_count?: number;
                                        skip_count?: number;
                                        impression_count_accumulate?: number;
                                        click_count_accumulate?: number;
                                        skip_count_accumulate?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/splash_page_stats`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=splash_page_stat&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=admin&resource=splash_page_stat&version=v1 document }
                 */
                query: async (
                    payload?: {
                        params: { start_date?: string; end_date: string };
                        path?: { splash_id?: string };
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
                                    splash_page_stat?: {
                                        date?: string;
                                        splash_id?: string;
                                        impression_count?: number;
                                        click_count?: number;
                                        skip_count?: number;
                                        impression_count_accumulate?: number;
                                        click_count_accumulate?: number;
                                        skip_count_accumulate?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/splash_page_stats/:splash_id/query`,
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
             * administrator
             */
            administrator: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            response_user_id_type?:
                                | "open_id"
                                | "union_id"
                                | "user_id";
                            permission_filter: number;
                            page_size: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    `${this.domain}/open-apis/admin/v1/administrators`,
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
                                                    administrators?: Array<{
                                                        user_id?: string;
                                                        is_super_administrator: boolean;
                                                        is_administrator: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=administrator&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=administrator&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            response_user_id_type?:
                                | "open_id"
                                | "union_id"
                                | "user_id";
                            permission_filter: number;
                            page_size: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    administrators?: Array<{
                                        user_id?: string;
                                        is_super_administrator: boolean;
                                        is_administrator: boolean;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/administrators`,
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
             * file
             */
            file: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=file&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=admin&resource=file&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        params: {
                            type: "1" | "2" | "3" | "4" | "5" | "6" | "7";
                        };
                        path: { file_token: string };
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
                                `${this.domain}/open-apis/admin/v1/files/:file_token`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=file&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=admin&resource=file&version=v1 document }
                 */
                search: async (
                    payload?: {
                        data?: { file_token?: string };
                        params?: {
                            email?: string;
                            user_id?: string;
                            user_id_type?: "user_id" | "open_id" | "union_id";
                            offset?: number;
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
                                    files?: Array<{
                                        title?: string;
                                        type?:
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5"
                                            | "6"
                                            | "7";
                                        owner?: {
                                            name: string;
                                            avatar: string;
                                            id: string;
                                        };
                                        size?: string;
                                        last_op_time?: string;
                                        status?: "2" | "3";
                                        token?: string;
                                    }>;
                                    total?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/files/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=file&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=admin&resource=file&version=v1 document }
                 */
                patch: async (
                    payload?: {
                        params: {
                            target_user_id?: string;
                            user_id_type?: "user_id" | "open_id" | "union_id";
                            target_owner_email?: string;
                            type: "1" | "2" | "3" | "4" | "5" | "6" | "7";
                        };
                        path: { file_token: string };
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
                                `${this.domain}/open-apis/admin/v1/files/:file_token`,
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
            /**
             * badge.grant
             */
            badgeGrant: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=admin&resource=badge.grant&version=v1 document }
                 *
                 * 创建授予名单
                 *
                 * 通过该接口可以为特定勋章创建一份授予名单，一枚勋章下最多可创建1000份授予名单。
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            grant_type: number;
                            time_zone: string;
                            rule_detail: {
                                effective_time?: string;
                                expiration_time?: string;
                                anniversary?: number;
                                effective_period?: number;
                            };
                            is_grant_all: boolean;
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                            group_ids?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { badge_id: string };
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
                                    grant?: {
                                        id?: string;
                                        badge_id?: string;
                                        name: string;
                                        grant_type: number;
                                        time_zone: string;
                                        rule_detail: {
                                            effective_time?: string;
                                            expiration_time?: string;
                                            anniversary?: number;
                                            effective_period?: number;
                                        };
                                        is_grant_all: boolean;
                                        user_ids?: Array<string>;
                                        department_ids?: Array<string>;
                                        group_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=admin&resource=badge.grant&version=v1 document }
                 *
                 * 修改授予名单
                 *
                 * 通过该接口可以修改特定授予名单的相关信息。
                 */
                update: async (
                    payload?: {
                        data: {
                            name: string;
                            grant_type: number;
                            time_zone: string;
                            rule_detail: {
                                effective_time?: string;
                                expiration_time?: string;
                                anniversary?: number;
                                effective_period?: number;
                            };
                            is_grant_all: boolean;
                            user_ids?: Array<string>;
                            department_ids?: Array<string>;
                            group_ids?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { badge_id: string; grant_id: string };
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
                                    grant?: {
                                        id?: string;
                                        badge_id?: string;
                                        name: string;
                                        grant_type: number;
                                        time_zone: string;
                                        rule_detail: {
                                            effective_time?: string;
                                            expiration_time?: string;
                                            anniversary?: number;
                                            effective_period?: number;
                                        };
                                        is_grant_all: boolean;
                                        user_ids?: Array<string>;
                                        department_ids?: Array<string>;
                                        group_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants/:grant_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=admin&resource=badge.grant&version=v1 document }
                 *
                 * 删除授予名单
                 *
                 * 通过该接口可以删除特定授予名单的信息。
                 */
                delete: async (
                    payload?: {
                        path: { badge_id: string; grant_id: string };
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
                                `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants/:grant_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=admin&resource=badge.grant&version=v1 document }
                 *
                 * 获取授予名单详情
                 *
                 * 通过该接口可以获取特定授予名单的信息。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                        };
                        path: { badge_id: string; grant_id: string };
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
                                    grant?: {
                                        id?: string;
                                        badge_id?: string;
                                        name: string;
                                        grant_type: number;
                                        time_zone: string;
                                        rule_detail: {
                                            effective_time?: string;
                                            expiration_time?: string;
                                            anniversary?: number;
                                            effective_period?: number;
                                        };
                                        is_grant_all: boolean;
                                        user_ids?: Array<string>;
                                        department_ids?: Array<string>;
                                        group_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants/:grant_id`,
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
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            name?: string;
                        };
                        path: { badge_id: string };
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
                                    `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants`,
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
                                                    grants?: Array<{
                                                        id?: string;
                                                        badge_id?: string;
                                                        name: string;
                                                        grant_type: number;
                                                        time_zone: string;
                                                        rule_detail: {
                                                            effective_time?: string;
                                                            expiration_time?: string;
                                                            anniversary?: number;
                                                            effective_period?: number;
                                                        };
                                                        is_grant_all: boolean;
                                                        user_ids?: Array<string>;
                                                        department_ids?: Array<string>;
                                                        group_ids?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge.grant&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=badge.grant&version=v1 document }
                 *
                 * 获取授予名单列表
                 *
                 * 通过该接口可以获取特定勋章下的授予名单列表，授予名单的排列顺序按照创建时间倒序排列。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            name?: string;
                        };
                        path: { badge_id: string };
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
                                    grants?: Array<{
                                        id?: string;
                                        badge_id?: string;
                                        name: string;
                                        grant_type: number;
                                        time_zone: string;
                                        rule_detail: {
                                            effective_time?: string;
                                            expiration_time?: string;
                                            anniversary?: number;
                                            effective_period?: number;
                                        };
                                        is_grant_all: boolean;
                                        user_ids?: Array<string>;
                                        department_ids?: Array<string>;
                                        group_ids?: Array<string>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badges/:badge_id/grants`,
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
             * badge
             */
            badge: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=admin&resource=badge&version=v1 document }
                 *
                 * 修改勋章信息
                 *
                 * 通过该接口可以修改勋章的信息。
                 */
                update: async (
                    payload?: {
                        data: {
                            name: string;
                            explanation?: string;
                            detail_image: string;
                            show_image: string;
                            i18n_name?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
                            i18n_explanation?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
                        };
                        path: { badge_id: string };
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
                                    badge?: {
                                        id?: string;
                                        name: string;
                                        explanation?: string;
                                        detail_image: string;
                                        show_image: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        i18n_explanation?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badges/:badge_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=admin&resource=badge&version=v1 document }
                 *
                 * 获取勋章详情
                 *
                 * 可以通过该接口查询勋章的详情。
                 */
                get: async (
                    payload?: {
                        path: { badge_id: string };
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
                                    badge?: {
                                        id?: string;
                                        name: string;
                                        explanation?: string;
                                        detail_image: string;
                                        show_image: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        i18n_explanation?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badges/:badge_id`,
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
                            name?: string;
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
                                    `${this.domain}/open-apis/admin/v1/badges`,
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
                                                    badges?: Array<{
                                                        id?: string;
                                                        name: string;
                                                        explanation?: string;
                                                        detail_image: string;
                                                        show_image: string;
                                                        i18n_name?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                            ja_jp?: string;
                                                        };
                                                        i18n_explanation?: {
                                                            zh_cn?: string;
                                                            en_us?: string;
                                                            ja_jp?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=badge&version=v1 document }
                 *
                 * 获取勋章列表
                 *
                 * 可以通过该接口列出租户下所有的勋章，勋章的排列顺序是按照创建时间倒序排列。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            name?: string;
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
                                    badges?: Array<{
                                        id?: string;
                                        name: string;
                                        explanation?: string;
                                        detail_image: string;
                                        show_image: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        i18n_explanation?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badges`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=admin&resource=badge&version=v1 document }
                 *
                 * 创建勋章
                 *
                 * 使用该接口可以创建一枚完整的勋章信息，一个租户下最多可创建1000枚勋章。
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            explanation?: string;
                            detail_image: string;
                            show_image: string;
                            i18n_name?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
                            i18n_explanation?: {
                                zh_cn?: string;
                                en_us?: string;
                                ja_jp?: string;
                            };
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
                                    badge?: {
                                        id?: string;
                                        name: string;
                                        explanation?: string;
                                        detail_image: string;
                                        show_image: string;
                                        i18n_name?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                        i18n_explanation?: {
                                            zh_cn?: string;
                                            en_us?: string;
                                            ja_jp?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badges`,
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
             * password
             */
            password: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=password&apiName=reset&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reset&project=admin&resource=password&version=v1 document }
                 *
                 * 重置用户的企业邮箱密码
                 *
                 * 重置用户的企业邮箱密码，仅当用户的邮箱和企业邮箱(别名)一致时生效，可用于处理飞书企业邮箱登录死锁的问题。;;邮箱死锁：当用户的登录凭证与飞书企业邮箱一致时，目前飞书登录流程要求用户输入验证码，由于飞书邮箱无单独的帐号体系，则未登录时无法收取邮箱验证码，即陷入死锁。
                 */
                reset: async (
                    payload?: {
                        data: {
                            password: { ent_email_password: string };
                            user_id: string;
                        };
                        params: {
                            user_id_type: "open_id" | "union_id" | "user_id";
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
                                `${this.domain}/open-apis/admin/v1/password/reset`,
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
             * badge_image
             */
            badgeImage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=badge_image&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=admin&resource=badge_image&version=v1 document }
                 *
                 * 上传勋章图片
                 *
                 * 通过该接口可以上传勋章详情图、挂饰图的文件，获取对应的文件key。
                 */
                create: async (
                    payload?: {
                        data: {
                            image_file: Buffer | fs.ReadStream;
                            image_type: number;
                        };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { image_key?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/badge_images`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
            /**
             * audit_info
             */
            auditInfo: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            latest?: number;
                            oldest?: number;
                            event_name?: string;
                            operator_type?: "user" | "bot";
                            operator_value?: string;
                            event_module?: number;
                            page_token?: string;
                            page_size?: number;
                            user_type?: number;
                            object_type?: number;
                            object_value?: string;
                            ext_filter_object_by_ccm_token?: string;
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
                                    `${this.domain}/open-apis/admin/v1/audit_infos`,
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        event_id?: string;
                                                        unique_id?: string;
                                                        event_name: string;
                                                        department_ids?: Array<string>;
                                                        event_module: number;
                                                        operator_type?: number;
                                                        operator_value?: string;
                                                        objects?: Array<{
                                                            object_type?: string;
                                                            object_value?: string;
                                                            object_name?: string;
                                                            object_owner?: string;
                                                            object_detail?: {
                                                                clone_source?: string;
                                                                text_detail?: string;
                                                                file_name?: string;
                                                                third_party_appID?: string;
                                                                contain_file_num?: number;
                                                                permission_setting_type?: string;
                                                                permission_external_access_Type?: boolean;
                                                                permission_share_type?: string;
                                                                file_service_source?: string;
                                                                okr_download_content?: string;
                                                                container_type?: string;
                                                                container_id?: string;
                                                                current_page?: string;
                                                            };
                                                        }>;
                                                        recipients?: Array<{
                                                            recipient_type?: string;
                                                            recipient_value?: string;
                                                            recipient_detail?: {
                                                                permission_action_type?: string;
                                                                chat_id?: string;
                                                                chat_name?: string;
                                                                chat_type?: number;
                                                                external_flag?: boolean;
                                                            };
                                                        }>;
                                                        event_time?: number;
                                                        ip?: string;
                                                        operator_app?: string;
                                                        audit_context?: {
                                                            terminal_type?: number;
                                                            ios_context?: {
                                                                udid?: string;
                                                                did?: string;
                                                                app_ver?: string;
                                                                ver?: string;
                                                                os?: string;
                                                                STZone?: string;
                                                                ML?: string;
                                                                sjd?: string;
                                                                proxyip?: string;
                                                                wifip?: string;
                                                                location?: string;
                                                                active_ip?: string;
                                                                active_ip_detail?: string;
                                                                cell_base_station?: string;
                                                                IP?: string;
                                                            };
                                                            pc_context?: {
                                                                udid?: string;
                                                                did?: string;
                                                                app_ver?: string;
                                                                ver?: string;
                                                                os?: string;
                                                                wifip?: string;
                                                                region?: string;
                                                                IP?: string;
                                                            };
                                                            web_context?: {
                                                                user_agent?: string;
                                                                IP?: string;
                                                            };
                                                            android_context?: {
                                                                udid?: string;
                                                                did?: string;
                                                                app_ver?: string;
                                                                ver?: string;
                                                                region?: string;
                                                                id_i?: string;
                                                                id_r?: string;
                                                                hw_brand?: string;
                                                                hw_manuf?: string;
                                                                wifip?: string;
                                                                route_iip?: string;
                                                                route_gip?: string;
                                                                env_su?: string;
                                                                env_tz?: string;
                                                                env_ml?: string;
                                                                location?: string;
                                                                active_ip?: string;
                                                                active_ip_detail?: string;
                                                                cell_base_station?: string;
                                                                IP?: string;
                                                            };
                                                        };
                                                        extend?: {
                                                            comment_type?: string;
                                                            app_detail?: string;
                                                            two_step_validation?: boolean;
                                                            login_method?: string;
                                                            new_people_num_in_video?: number;
                                                            external_people_num_in_video?: number;
                                                            external_people_num_in_chat?: number;
                                                            join_group?: number;
                                                            quit_group?: number;
                                                            external_people_num_in_doc_share?: number;
                                                        };
                                                        operator_app_name?: string;
                                                        common_drawers?: {
                                                            common_draw_info_list?: Array<{
                                                                info_key?: string;
                                                                info_val?: string;
                                                                key_i18n_key?: string;
                                                                val_type?: string;
                                                                val_i18n_key?: string;
                                                            }>;
                                                        };
                                                        audit_detail?: {
                                                            mc?: string;
                                                            device_model?: string;
                                                            os?: string;
                                                            city?: string;
                                                        };
                                                        operator_tenant?: string;
                                                        operator_detail?: {
                                                            operator_name: {
                                                                default_name: string;
                                                                i18n_value?: {
                                                                    zh_cn?: string;
                                                                    en_us?: string;
                                                                    ja_jp?: string;
                                                                };
                                                            };
                                                            tenant_name?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=audit_info&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=audit_info&version=v1 document }
                 *
                 * 用户行为日志搜索
                 */
                list: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            latest?: number;
                            oldest?: number;
                            event_name?: string;
                            operator_type?: "user" | "bot";
                            operator_value?: string;
                            event_module?: number;
                            page_token?: string;
                            page_size?: number;
                            user_type?: number;
                            object_type?: number;
                            object_value?: string;
                            ext_filter_object_by_ccm_token?: string;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        event_id?: string;
                                        unique_id?: string;
                                        event_name: string;
                                        department_ids?: Array<string>;
                                        event_module: number;
                                        operator_type?: number;
                                        operator_value?: string;
                                        objects?: Array<{
                                            object_type?: string;
                                            object_value?: string;
                                            object_name?: string;
                                            object_owner?: string;
                                            object_detail?: {
                                                clone_source?: string;
                                                text_detail?: string;
                                                file_name?: string;
                                                third_party_appID?: string;
                                                contain_file_num?: number;
                                                permission_setting_type?: string;
                                                permission_external_access_Type?: boolean;
                                                permission_share_type?: string;
                                                file_service_source?: string;
                                                okr_download_content?: string;
                                                container_type?: string;
                                                container_id?: string;
                                                current_page?: string;
                                            };
                                        }>;
                                        recipients?: Array<{
                                            recipient_type?: string;
                                            recipient_value?: string;
                                            recipient_detail?: {
                                                permission_action_type?: string;
                                                chat_id?: string;
                                                chat_name?: string;
                                                chat_type?: number;
                                                external_flag?: boolean;
                                            };
                                        }>;
                                        event_time?: number;
                                        ip?: string;
                                        operator_app?: string;
                                        audit_context?: {
                                            terminal_type?: number;
                                            ios_context?: {
                                                udid?: string;
                                                did?: string;
                                                app_ver?: string;
                                                ver?: string;
                                                os?: string;
                                                STZone?: string;
                                                ML?: string;
                                                sjd?: string;
                                                proxyip?: string;
                                                wifip?: string;
                                                location?: string;
                                                active_ip?: string;
                                                active_ip_detail?: string;
                                                cell_base_station?: string;
                                                IP?: string;
                                            };
                                            pc_context?: {
                                                udid?: string;
                                                did?: string;
                                                app_ver?: string;
                                                ver?: string;
                                                os?: string;
                                                wifip?: string;
                                                region?: string;
                                                IP?: string;
                                            };
                                            web_context?: {
                                                user_agent?: string;
                                                IP?: string;
                                            };
                                            android_context?: {
                                                udid?: string;
                                                did?: string;
                                                app_ver?: string;
                                                ver?: string;
                                                region?: string;
                                                id_i?: string;
                                                id_r?: string;
                                                hw_brand?: string;
                                                hw_manuf?: string;
                                                wifip?: string;
                                                route_iip?: string;
                                                route_gip?: string;
                                                env_su?: string;
                                                env_tz?: string;
                                                env_ml?: string;
                                                location?: string;
                                                active_ip?: string;
                                                active_ip_detail?: string;
                                                cell_base_station?: string;
                                                IP?: string;
                                            };
                                        };
                                        extend?: {
                                            comment_type?: string;
                                            app_detail?: string;
                                            two_step_validation?: boolean;
                                            login_method?: string;
                                            new_people_num_in_video?: number;
                                            external_people_num_in_video?: number;
                                            external_people_num_in_chat?: number;
                                            join_group?: number;
                                            quit_group?: number;
                                            external_people_num_in_doc_share?: number;
                                        };
                                        operator_app_name?: string;
                                        common_drawers?: {
                                            common_draw_info_list?: Array<{
                                                info_key?: string;
                                                info_val?: string;
                                                key_i18n_key?: string;
                                                val_type?: string;
                                                val_i18n_key?: string;
                                            }>;
                                        };
                                        audit_detail?: {
                                            mc?: string;
                                            device_model?: string;
                                            os?: string;
                                            city?: string;
                                        };
                                        operator_tenant?: string;
                                        operator_detail?: {
                                            operator_name: {
                                                default_name: string;
                                                i18n_value?: {
                                                    zh_cn?: string;
                                                    en_us?: string;
                                                    ja_jp?: string;
                                                };
                                            };
                                            tenant_name?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/audit_infos`,
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
             * admin_user_ext_contact_stat
             */
            adminUserExtContactStat: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            user_id?: string;
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            department_id?: string;
                            start_date: string;
                            end_date: string;
                            page_size?: number;
                            page_token?: string;
                            target_geo?: string;
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
                                    `${this.domain}/open-apis/admin/v1/admin_user_ext_contact_stats`,
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        date?: string;
                                                        user_id?: string;
                                                        user_name?: string;
                                                        department_name?: string;
                                                        ref_contact_ucnt?: string;
                                                        ref_contact_tcnt?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=admin_user_ext_contact_stat&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=admin_user_ext_contact_stat&version=v1 document }
                 *
                 * 获取成员所拥有的外部联系人总数
                 *
                 * 获取成员拥有的外部联系人总数和外部租户总数：成员仅包含已激活未离职的用户；外部联系人仅包含当前关系状态为正常的用户（不限制外部联系人的离职状态）包含私有化租户的外部联系人。
                 *
                 * - 只有企业自建应用才有权限调用此接口;;- 当天的数据会在第二天的早上九点半产出 (CN时区: UTC+8，非CN时区: UTC+0);;- 日期范围不超过90天，超过90天接口容易超时;;- 仅支持13层级部门数据查询，超过13层级的数据汇聚到第13层级
                 */
                list: async (
                    payload?: {
                        params: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            user_id?: string;
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            department_id?: string;
                            start_date: string;
                            end_date: string;
                            page_size?: number;
                            page_token?: string;
                            target_geo?: string;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        date?: string;
                                        user_id?: string;
                                        user_name?: string;
                                        department_name?: string;
                                        ref_contact_ucnt?: string;
                                        ref_contact_tcnt?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/admin_user_ext_contact_stats`,
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
             * task
             */
            task: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=task&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=admin&resource=task&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "union_id" | "open_id" | "user_id";
                        };
                        path?: { task_id?: string };
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
                                    original_user_id?: string;
                                    target_owner_id?: string;
                                    file_list?: Array<{
                                        title?: string;
                                        type?:
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5"
                                            | "6"
                                            | "7";
                                        owner?: {
                                            name: string;
                                            avatar: string;
                                            id: string;
                                        };
                                        size?: string;
                                        last_op_time?: string;
                                        status?: "2" | "3";
                                        token?: string;
                                    }>;
                                    task_id?: string;
                                    status?: number;
                                    original_user_email?: string;
                                    target_owner_email?: string;
                                    type?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/tasks/:task_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=task&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=admin&resource=task&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            original_user_id?: string;
                            target_owner_id?: string;
                            file_list?: Array<{
                                title?: string;
                                type?: "1" | "2" | "3" | "4" | "5" | "6" | "7";
                                owner?: {
                                    name: string;
                                    avatar: string;
                                    id: string;
                                };
                                size?: string;
                                last_op_time?: string;
                                status?: "2" | "3";
                                token?: string;
                            }>;
                            task_id?: string;
                            status?: number;
                            original_user_email?: string;
                            target_owner_email?: string;
                            type?: number;
                        };
                        params?: {
                            user_id_type?: "union_id" | "open_id" | "user_id";
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
                                    original_user_id?: string;
                                    target_owner_id?: string;
                                    file_list?: Array<{
                                        title?: string;
                                        type?:
                                            | "1"
                                            | "2"
                                            | "3"
                                            | "4"
                                            | "5"
                                            | "6"
                                            | "7";
                                        owner?: {
                                            name: string;
                                            avatar: string;
                                            id: string;
                                        };
                                        size?: string;
                                        last_op_time?: string;
                                        status?: "2" | "3";
                                        token?: string;
                                    }>;
                                    task_id?: string;
                                    status?: number;
                                    original_user_email?: string;
                                    target_owner_email?: string;
                                    type?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/tasks`,
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
             * user_annual_report
             */
            userAnnualReport: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            year: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                    `${this.domain}/open-apis/admin/v1/user_annual_reports`,
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
                                                        year_2021?: {
                                                            active_day_count?: number;
                                                            busy_week?: string;
                                                            p2p_chat_count?: string;
                                                            talked_chat_count?: string;
                                                            favorite_emoji?: string;
                                                            reaction_count?: string;
                                                            conference_create_count?: string;
                                                            total_parti_count?: string;
                                                            minutes_object_count?: string;
                                                            minutes_duration?: number;
                                                            create_edit_file_count?: string;
                                                            create_file_count?: string;
                                                            cooperate_edit_file_count?: string;
                                                            like_record_count?: string;
                                                            okr_cum_o_count?: string;
                                                            okr_cum_kr_count?: string;
                                                            okr_aligned_user_rankfirst?: string;
                                                            approval_start_count?: string;
                                                            approval_execute_count?: string;
                                                            approval_relation_user_rankfirst?: string;
                                                            user_id?: string;
                                                            busy_week_sum_duration?: string;
                                                            busy_week_mdate?: string;
                                                            busy_week_act_days?: number;
                                                            create_read_user_count?: string;
                                                        };
                                                        year_2022?: {
                                                            user_id?: string;
                                                            user_register_date?: string;
                                                            active_day_count?: number;
                                                            msg_busy_date?: string;
                                                            msg_busy_date_send_msg_count?: string;
                                                            p2p_chat_count?: string;
                                                            talked_chat_count?: string;
                                                            positive_reaction_count?: string;
                                                            first_positive_reaction?: string;
                                                            second_positive_reaction?: string;
                                                            third_positive_reaction?: string;
                                                            fourth_positive_reaction?: string;
                                                            fifth_positive_reaction?: string;
                                                            create_file_count?: string;
                                                            created_file_view_count?: string;
                                                            comment_file_count?: string;
                                                            attend_event_count?: string;
                                                            event_busy_date?: string;
                                                            event_busy_date_event_count?: string;
                                                            event_start_time_range1?: string;
                                                            conference_create_count?: string;
                                                            total_parti_count?: string;
                                                            okr_cum_o_count?: string;
                                                            okr_cum_kr_count?: string;
                                                            okr_aligned_user_count?: string;
                                                            people_interview_num?: string;
                                                            send_email_count?: string;
                                                            receive_email_count?: string;
                                                        };
                                                        year_2023?: {
                                                            user_id?: string;
                                                            tenant_all_cnt?: number;
                                                            user_register_date?: string;
                                                            all_day_cnt?: number;
                                                            active_day_cnt?: number;
                                                            duration_cnt_2?: Array<{
                                                                year?: string;
                                                                num?: number;
                                                            }>;
                                                            duration_cnt_rank?: string;
                                                            busy_month?: string;
                                                            busy_month_sum_duration?: number;
                                                            busy_month_send_msg_cnt?: number;
                                                            busy_month_meeting_cnt?: number;
                                                            busy_month_last_meeting_time?: string;
                                                            busy_month_create_edit_file_cnt?: number;
                                                            im_send_msg_cnt_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            im_send_msg_cnt_rank?: string;
                                                            im_busy_date?: string;
                                                            im_busy_date_send_msg_cnt?: number;
                                                            im_last_send_msg_time?: string;
                                                            im_talked_chat_cnt?: number;
                                                            im_private_chat_cnt?: number;
                                                            im_emoji_top1?: string;
                                                            im_emoji_top1_cnt?: string;
                                                            im_emoji_top2?: string;
                                                            im_emoji_top2_cnt?: string;
                                                            im_emoji_top3?: string;
                                                            im_emoji_top3_cnt?: string;
                                                            im_positive_reaction_cnt_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            im_positive_reaction_cnt_rank?: string;
                                                            ccm_create_cnt_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            ccm_create_cnt_rank?: string;
                                                            ccm_create_busy_month?: string;
                                                            ccm_create_busy_month_cnt?: number;
                                                            ccm_create_viewed_ucnt?: number;
                                                            ccm_create_liked_cnt?: number;
                                                            ccm_create_liked_cnt_rank?: string;
                                                            ccm_edit_comment_fcnt_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            ccm_edit_comment_fcnt_rank?: string;
                                                            ccm_view_other_fcnt?: number;
                                                            ccm_view_other_fcnt_rank?: string;
                                                            vc_sent_meeting_cnt_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            vc_sent_meeting_cnt_rank?: string;
                                                            vc_sent_meeting_ucnt?: number;
                                                            vc_join_meeting_cnt_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            vc_join_meeting_cnt_rank?: string;
                                                            vc_all_meeting_cnt?: number;
                                                            vc_all_meeting_cnt_rank?: string;
                                                            vc_all_meeting_duration_2?: Array<{
                                                                year?: string;
                                                                num?: number;
                                                            }>;
                                                            cal_comment_cal_time?: string;
                                                            people_profile_view_cnt?: string;
                                                            people_interview_num_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            people_interview_num_rank?: string;
                                                            people_interview_offer_num_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            people_interview_offer_num_rank?: string;
                                                            email_send_email_count?: number;
                                                            email_receive_email_count?: number;
                                                        };
                                                        year_2024?: {
                                                            user_id?: string;
                                                            tenant_all_cnt?: string;
                                                            user_register_date?: string;
                                                            feishu_day_cnt?: string;
                                                            duration_cnt_2?: Array<{
                                                                year?: string;
                                                                num?: number;
                                                            }>;
                                                            im_send_msg_cnt_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            avg_im_send_msg_cnt_2?: Array<{
                                                                year?: string;
                                                                num?: number;
                                                            }>;
                                                            im_talked_chat_cnt?: string;
                                                            im_private_chat_cnt?: string;
                                                            im_emoji_top1?: string;
                                                            im_emoji_top1_cnt_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            im_emoji_top2?: string;
                                                            im_emoji_top2_cnt_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            im_emoji_top3?: string;
                                                            im_emoji_top3_cnt_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            im_positive_reaction_cnt_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            im_positive_reaction_cnt_rank?: string;
                                                            im_positive_reaction_cnt_denominator?: string;
                                                            busy_day?: string;
                                                            busy_day_send_msg_cnt?: string;
                                                            ccm_create_cnt_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            ccm_create_viewed_ucnt?: string;
                                                            ccm_create_liked_cnt?: string;
                                                            ccm_create_liked_max_cnt?: string;
                                                            vc_join_meeting_cnt?: string;
                                                            vc_all_meeting_duration_2?: Array<{
                                                                year?: string;
                                                                num?: number;
                                                            }>;
                                                            vc_join_meeting_all_user_cnt?: string;
                                                            vc_last_meeting_time?: string;
                                                            base_create_fcnt_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            base_view_fcnt?: string;
                                                            base_create_dashboard_cnt?: string;
                                                            base_create_dashboard_rank?: string;
                                                            base_create_dashboard_rank_ucnt?: string;
                                                            base_create_chat_cnt?: string;
                                                            base_workflow_ins_cnt?: string;
                                                            base_workflow_ins_rank?: string;
                                                            base_workflow_ins_rank_ucnt?: string;
                                                            vc_all_read_notes_cnt?: string;
                                                            meego_role_wi_cnt_v2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            meego_common_wi_ucnt?: string;
                                                            meego_workflow_wi_cnt?: string;
                                                            people_interview_num_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                            people_interview_num_rank?: string;
                                                            people_interview_num_rank_ucnt?: string;
                                                            people_interview_offer_num_2?: Array<{
                                                                year?: string;
                                                                count?: string;
                                                            }>;
                                                        };
                                                        year_2025: {
                                                            user_id?: string;
                                                            tenant_all_cnt?: string;
                                                            user_register_date?: string;
                                                            feishu_active_days?: string;
                                                            feishu_duration_busy_month?: string;
                                                            feishu_duration_busy_month_hours?: number;
                                                            busy_month_send_msg_cnt?: string;
                                                            busy_month_edit_doc_cnt?: string;
                                                            busy_month_read_doc_cnt?: string;
                                                            busy_month_join_meeting_cnt?: string;
                                                            busy_month_meeting_duration?: number;
                                                            im_talked_chat_cnt?: string;
                                                            im_private_chat_cnt?: string;
                                                            im_send_msg_cnt?: string;
                                                            im_emoji_top1?: string;
                                                            im_emoji_top1_cnt?: string;
                                                            im_emoji_top2?: string;
                                                            im_emoji_top2_cnt?: string;
                                                            im_emoji_top3?: string;
                                                            im_emoji_top3_cnt?: string;
                                                            ccm_create_fcnt?: string;
                                                            ccm_create_rank?: string;
                                                            ccm_create_rank_ucnt?: string;
                                                            ccm_create_viewed_ucnt?: string;
                                                            ccm_create_liked_cnt?: string;
                                                            ccm_create_viewed_most_ucnt?: string;
                                                            ccm_all_read_doc_cnt?: string;
                                                            docs_ai_quickview_use_cnt?: string;
                                                            vc_join_meeting_cnt?: string;
                                                            vc_join_meeting_duration?: number;
                                                            vc_org_meeting_cnt?: Array<{
                                                                organized_meeting_cnt?: string;
                                                                organized_cal_meeting_cnt?: string;
                                                                organized_instant_meeting_cnt?: string;
                                                            }>;
                                                            ai_notes_create_cnt?: string;
                                                            ai_notes_read_cnt?: string;
                                                            knowledge_ai_use_cnt?: string;
                                                            knowledge_ai_use_busy_day?: string;
                                                            knowledge_ai_use_busy_day_cnt?: string;
                                                            base_create_fcnt?: string;
                                                            base_ai_top1_name_map?: Array<{
                                                                name_cn?: string;
                                                                name_en?: string;
                                                                name_cn_list?: string;
                                                                name_en_list?: string;
                                                            }>;
                                                            base_create_view_ucnt?: string;
                                                            base_most_rows_cnt?: string;
                                                            base_create_dashboard_cnt?: string;
                                                            base_workflow_create_cnt?: string;
                                                            base_workflow_ins_cnt?: string;
                                                            aily_develop_app_cnt?: string;
                                                            aily_develop_app_active_ucnt?: string;
                                                            aily_develop_active_most_app_intents?: string;
                                                            aily_chat_cnt?: string;
                                                            aily_artifact_create_cnt?: string;
                                                            apaas_develop_app_cnt?: string;
                                                            apaas_develop_app_active_ucnt?: string;
                                                            apaas_develop_active_most_app_ucnt?: string;
                                                            apaas_develop_ai_run_cnt?: string;
                                                            meego_is_project_admin?: string;
                                                            meego_create_wi_cnt?: string;
                                                            meego_create_wi_role_ucnt?: string;
                                                            meego_most_view_wi_ucnt?: string;
                                                            meego_set_ai_field_cnt?: string;
                                                            meego_ai_field_run_cnt?: string;
                                                            meego_ai_gantt_use_cnt?: string;
                                                            meego_ai_weekly_report_use_cnt?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=user_annual_report&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=user_annual_report&version=v1 document }
                 *
                 * 批量获取飞书用户的年度行为报告数据
                 *
                 * 用于分页获取用户的年度飞书行为报告，可以通过has_more字段遍历所有的用户。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            year: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
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
                                        year_2021?: {
                                            active_day_count?: number;
                                            busy_week?: string;
                                            p2p_chat_count?: string;
                                            talked_chat_count?: string;
                                            favorite_emoji?: string;
                                            reaction_count?: string;
                                            conference_create_count?: string;
                                            total_parti_count?: string;
                                            minutes_object_count?: string;
                                            minutes_duration?: number;
                                            create_edit_file_count?: string;
                                            create_file_count?: string;
                                            cooperate_edit_file_count?: string;
                                            like_record_count?: string;
                                            okr_cum_o_count?: string;
                                            okr_cum_kr_count?: string;
                                            okr_aligned_user_rankfirst?: string;
                                            approval_start_count?: string;
                                            approval_execute_count?: string;
                                            approval_relation_user_rankfirst?: string;
                                            user_id?: string;
                                            busy_week_sum_duration?: string;
                                            busy_week_mdate?: string;
                                            busy_week_act_days?: number;
                                            create_read_user_count?: string;
                                        };
                                        year_2022?: {
                                            user_id?: string;
                                            user_register_date?: string;
                                            active_day_count?: number;
                                            msg_busy_date?: string;
                                            msg_busy_date_send_msg_count?: string;
                                            p2p_chat_count?: string;
                                            talked_chat_count?: string;
                                            positive_reaction_count?: string;
                                            first_positive_reaction?: string;
                                            second_positive_reaction?: string;
                                            third_positive_reaction?: string;
                                            fourth_positive_reaction?: string;
                                            fifth_positive_reaction?: string;
                                            create_file_count?: string;
                                            created_file_view_count?: string;
                                            comment_file_count?: string;
                                            attend_event_count?: string;
                                            event_busy_date?: string;
                                            event_busy_date_event_count?: string;
                                            event_start_time_range1?: string;
                                            conference_create_count?: string;
                                            total_parti_count?: string;
                                            okr_cum_o_count?: string;
                                            okr_cum_kr_count?: string;
                                            okr_aligned_user_count?: string;
                                            people_interview_num?: string;
                                            send_email_count?: string;
                                            receive_email_count?: string;
                                        };
                                        year_2023?: {
                                            user_id?: string;
                                            tenant_all_cnt?: number;
                                            user_register_date?: string;
                                            all_day_cnt?: number;
                                            active_day_cnt?: number;
                                            duration_cnt_2?: Array<{
                                                year?: string;
                                                num?: number;
                                            }>;
                                            duration_cnt_rank?: string;
                                            busy_month?: string;
                                            busy_month_sum_duration?: number;
                                            busy_month_send_msg_cnt?: number;
                                            busy_month_meeting_cnt?: number;
                                            busy_month_last_meeting_time?: string;
                                            busy_month_create_edit_file_cnt?: number;
                                            im_send_msg_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            im_send_msg_cnt_rank?: string;
                                            im_busy_date?: string;
                                            im_busy_date_send_msg_cnt?: number;
                                            im_last_send_msg_time?: string;
                                            im_talked_chat_cnt?: number;
                                            im_private_chat_cnt?: number;
                                            im_emoji_top1?: string;
                                            im_emoji_top1_cnt?: string;
                                            im_emoji_top2?: string;
                                            im_emoji_top2_cnt?: string;
                                            im_emoji_top3?: string;
                                            im_emoji_top3_cnt?: string;
                                            im_positive_reaction_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            im_positive_reaction_cnt_rank?: string;
                                            ccm_create_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            ccm_create_cnt_rank?: string;
                                            ccm_create_busy_month?: string;
                                            ccm_create_busy_month_cnt?: number;
                                            ccm_create_viewed_ucnt?: number;
                                            ccm_create_liked_cnt?: number;
                                            ccm_create_liked_cnt_rank?: string;
                                            ccm_edit_comment_fcnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            ccm_edit_comment_fcnt_rank?: string;
                                            ccm_view_other_fcnt?: number;
                                            ccm_view_other_fcnt_rank?: string;
                                            vc_sent_meeting_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            vc_sent_meeting_cnt_rank?: string;
                                            vc_sent_meeting_ucnt?: number;
                                            vc_join_meeting_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            vc_join_meeting_cnt_rank?: string;
                                            vc_all_meeting_cnt?: number;
                                            vc_all_meeting_cnt_rank?: string;
                                            vc_all_meeting_duration_2?: Array<{
                                                year?: string;
                                                num?: number;
                                            }>;
                                            cal_comment_cal_time?: string;
                                            people_profile_view_cnt?: string;
                                            people_interview_num_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            people_interview_num_rank?: string;
                                            people_interview_offer_num_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            people_interview_offer_num_rank?: string;
                                            email_send_email_count?: number;
                                            email_receive_email_count?: number;
                                        };
                                        year_2024?: {
                                            user_id?: string;
                                            tenant_all_cnt?: string;
                                            user_register_date?: string;
                                            feishu_day_cnt?: string;
                                            duration_cnt_2?: Array<{
                                                year?: string;
                                                num?: number;
                                            }>;
                                            im_send_msg_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            avg_im_send_msg_cnt_2?: Array<{
                                                year?: string;
                                                num?: number;
                                            }>;
                                            im_talked_chat_cnt?: string;
                                            im_private_chat_cnt?: string;
                                            im_emoji_top1?: string;
                                            im_emoji_top1_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            im_emoji_top2?: string;
                                            im_emoji_top2_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            im_emoji_top3?: string;
                                            im_emoji_top3_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            im_positive_reaction_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            im_positive_reaction_cnt_rank?: string;
                                            im_positive_reaction_cnt_denominator?: string;
                                            busy_day?: string;
                                            busy_day_send_msg_cnt?: string;
                                            ccm_create_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            ccm_create_viewed_ucnt?: string;
                                            ccm_create_liked_cnt?: string;
                                            ccm_create_liked_max_cnt?: string;
                                            vc_join_meeting_cnt?: string;
                                            vc_all_meeting_duration_2?: Array<{
                                                year?: string;
                                                num?: number;
                                            }>;
                                            vc_join_meeting_all_user_cnt?: string;
                                            vc_last_meeting_time?: string;
                                            base_create_fcnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            base_view_fcnt?: string;
                                            base_create_dashboard_cnt?: string;
                                            base_create_dashboard_rank?: string;
                                            base_create_dashboard_rank_ucnt?: string;
                                            base_create_chat_cnt?: string;
                                            base_workflow_ins_cnt?: string;
                                            base_workflow_ins_rank?: string;
                                            base_workflow_ins_rank_ucnt?: string;
                                            vc_all_read_notes_cnt?: string;
                                            meego_role_wi_cnt_v2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            meego_common_wi_ucnt?: string;
                                            meego_workflow_wi_cnt?: string;
                                            people_interview_num_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            people_interview_num_rank?: string;
                                            people_interview_num_rank_ucnt?: string;
                                            people_interview_offer_num_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                        };
                                        year_2025: {
                                            user_id?: string;
                                            tenant_all_cnt?: string;
                                            user_register_date?: string;
                                            feishu_active_days?: string;
                                            feishu_duration_busy_month?: string;
                                            feishu_duration_busy_month_hours?: number;
                                            busy_month_send_msg_cnt?: string;
                                            busy_month_edit_doc_cnt?: string;
                                            busy_month_read_doc_cnt?: string;
                                            busy_month_join_meeting_cnt?: string;
                                            busy_month_meeting_duration?: number;
                                            im_talked_chat_cnt?: string;
                                            im_private_chat_cnt?: string;
                                            im_send_msg_cnt?: string;
                                            im_emoji_top1?: string;
                                            im_emoji_top1_cnt?: string;
                                            im_emoji_top2?: string;
                                            im_emoji_top2_cnt?: string;
                                            im_emoji_top3?: string;
                                            im_emoji_top3_cnt?: string;
                                            ccm_create_fcnt?: string;
                                            ccm_create_rank?: string;
                                            ccm_create_rank_ucnt?: string;
                                            ccm_create_viewed_ucnt?: string;
                                            ccm_create_liked_cnt?: string;
                                            ccm_create_viewed_most_ucnt?: string;
                                            ccm_all_read_doc_cnt?: string;
                                            docs_ai_quickview_use_cnt?: string;
                                            vc_join_meeting_cnt?: string;
                                            vc_join_meeting_duration?: number;
                                            vc_org_meeting_cnt?: Array<{
                                                organized_meeting_cnt?: string;
                                                organized_cal_meeting_cnt?: string;
                                                organized_instant_meeting_cnt?: string;
                                            }>;
                                            ai_notes_create_cnt?: string;
                                            ai_notes_read_cnt?: string;
                                            knowledge_ai_use_cnt?: string;
                                            knowledge_ai_use_busy_day?: string;
                                            knowledge_ai_use_busy_day_cnt?: string;
                                            base_create_fcnt?: string;
                                            base_ai_top1_name_map?: Array<{
                                                name_cn?: string;
                                                name_en?: string;
                                                name_cn_list?: string;
                                                name_en_list?: string;
                                            }>;
                                            base_create_view_ucnt?: string;
                                            base_most_rows_cnt?: string;
                                            base_create_dashboard_cnt?: string;
                                            base_workflow_create_cnt?: string;
                                            base_workflow_ins_cnt?: string;
                                            aily_develop_app_cnt?: string;
                                            aily_develop_app_active_ucnt?: string;
                                            aily_develop_active_most_app_intents?: string;
                                            aily_chat_cnt?: string;
                                            aily_artifact_create_cnt?: string;
                                            apaas_develop_app_cnt?: string;
                                            apaas_develop_app_active_ucnt?: string;
                                            apaas_develop_active_most_app_ucnt?: string;
                                            apaas_develop_ai_run_cnt?: string;
                                            meego_is_project_admin?: string;
                                            meego_create_wi_cnt?: string;
                                            meego_create_wi_role_ucnt?: string;
                                            meego_most_view_wi_ucnt?: string;
                                            meego_set_ai_field_cnt?: string;
                                            meego_ai_field_run_cnt?: string;
                                            meego_ai_gantt_use_cnt?: string;
                                            meego_ai_weekly_report_use_cnt?: string;
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/user_annual_reports`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=user_annual_report&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=admin&resource=user_annual_report&version=v1 document }
                 *
                 * 获取单个飞书用户的年度行为报告数据
                 *
                 * 获取单个用户的年度飞书使用报告情况，包括活跃、使用习惯、文档创建数量、OKR数量、审批流使用情况等指标。
                 */
                query: async (
                    payload?: {
                        params: {
                            year: number;
                            user_id_type: "open_id" | "union_id" | "user_id";
                            user_id: string;
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
                                    user_annual_report?: {
                                        year_2021?: {
                                            active_day_count?: number;
                                            busy_week?: string;
                                            p2p_chat_count?: string;
                                            talked_chat_count?: string;
                                            favorite_emoji?: string;
                                            reaction_count?: string;
                                            conference_create_count?: string;
                                            total_parti_count?: string;
                                            minutes_object_count?: string;
                                            minutes_duration?: number;
                                            create_edit_file_count?: string;
                                            create_file_count?: string;
                                            cooperate_edit_file_count?: string;
                                            like_record_count?: string;
                                            okr_cum_o_count?: string;
                                            okr_cum_kr_count?: string;
                                            okr_aligned_user_rankfirst?: string;
                                            approval_start_count?: string;
                                            approval_execute_count?: string;
                                            approval_relation_user_rankfirst?: string;
                                            user_id?: string;
                                            busy_week_sum_duration?: string;
                                            busy_week_mdate?: string;
                                            busy_week_act_days?: number;
                                            create_read_user_count?: string;
                                        };
                                        year_2022?: {
                                            user_id?: string;
                                            user_register_date?: string;
                                            active_day_count?: number;
                                            msg_busy_date?: string;
                                            msg_busy_date_send_msg_count?: string;
                                            p2p_chat_count?: string;
                                            talked_chat_count?: string;
                                            positive_reaction_count?: string;
                                            first_positive_reaction?: string;
                                            second_positive_reaction?: string;
                                            third_positive_reaction?: string;
                                            fourth_positive_reaction?: string;
                                            fifth_positive_reaction?: string;
                                            create_file_count?: string;
                                            created_file_view_count?: string;
                                            comment_file_count?: string;
                                            attend_event_count?: string;
                                            event_busy_date?: string;
                                            event_busy_date_event_count?: string;
                                            event_start_time_range1?: string;
                                            conference_create_count?: string;
                                            total_parti_count?: string;
                                            okr_cum_o_count?: string;
                                            okr_cum_kr_count?: string;
                                            okr_aligned_user_count?: string;
                                            people_interview_num?: string;
                                            send_email_count?: string;
                                            receive_email_count?: string;
                                        };
                                        year_2023?: {
                                            user_id?: string;
                                            tenant_all_cnt?: number;
                                            user_register_date?: string;
                                            all_day_cnt?: number;
                                            active_day_cnt?: number;
                                            duration_cnt_2?: Array<{
                                                year?: string;
                                                num?: number;
                                            }>;
                                            duration_cnt_rank?: string;
                                            busy_month?: string;
                                            busy_month_sum_duration?: number;
                                            busy_month_send_msg_cnt?: number;
                                            busy_month_meeting_cnt?: number;
                                            busy_month_last_meeting_time?: string;
                                            busy_month_create_edit_file_cnt?: number;
                                            im_send_msg_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            im_send_msg_cnt_rank?: string;
                                            im_busy_date?: string;
                                            im_busy_date_send_msg_cnt?: number;
                                            im_last_send_msg_time?: string;
                                            im_talked_chat_cnt?: number;
                                            im_private_chat_cnt?: number;
                                            im_emoji_top1?: string;
                                            im_emoji_top1_cnt?: string;
                                            im_emoji_top2?: string;
                                            im_emoji_top2_cnt?: string;
                                            im_emoji_top3?: string;
                                            im_emoji_top3_cnt?: string;
                                            im_positive_reaction_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            im_positive_reaction_cnt_rank?: string;
                                            ccm_create_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            ccm_create_cnt_rank?: string;
                                            ccm_create_busy_month?: string;
                                            ccm_create_busy_month_cnt?: number;
                                            ccm_create_viewed_ucnt?: number;
                                            ccm_create_liked_cnt?: number;
                                            ccm_create_liked_cnt_rank?: string;
                                            ccm_edit_comment_fcnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            ccm_edit_comment_fcnt_rank?: string;
                                            ccm_view_other_fcnt?: number;
                                            ccm_view_other_fcnt_rank?: string;
                                            vc_sent_meeting_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            vc_sent_meeting_cnt_rank?: string;
                                            vc_sent_meeting_ucnt?: number;
                                            vc_join_meeting_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            vc_join_meeting_cnt_rank?: string;
                                            vc_all_meeting_cnt?: number;
                                            vc_all_meeting_cnt_rank?: string;
                                            vc_all_meeting_duration_2?: Array<{
                                                year?: string;
                                                num?: number;
                                            }>;
                                            cal_comment_cal_time?: string;
                                            people_profile_view_cnt?: string;
                                            people_interview_num_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            people_interview_num_rank?: string;
                                            people_interview_offer_num_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            people_interview_offer_num_rank?: string;
                                            email_send_email_count?: number;
                                            email_receive_email_count?: number;
                                        };
                                        year_2024?: {
                                            user_id?: string;
                                            tenant_all_cnt?: string;
                                            user_register_date?: string;
                                            feishu_day_cnt?: string;
                                            duration_cnt_2?: Array<{
                                                year?: string;
                                                num?: number;
                                            }>;
                                            im_send_msg_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            avg_im_send_msg_cnt_2?: Array<{
                                                year?: string;
                                                num?: number;
                                            }>;
                                            im_talked_chat_cnt?: string;
                                            im_private_chat_cnt?: string;
                                            im_emoji_top1?: string;
                                            im_emoji_top1_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            im_emoji_top2?: string;
                                            im_emoji_top2_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            im_emoji_top3?: string;
                                            im_emoji_top3_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            im_positive_reaction_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            im_positive_reaction_cnt_rank?: string;
                                            im_positive_reaction_cnt_denominator?: string;
                                            busy_day?: string;
                                            busy_day_send_msg_cnt?: string;
                                            ccm_create_cnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            ccm_create_viewed_ucnt?: string;
                                            ccm_create_liked_cnt?: string;
                                            ccm_create_liked_max_cnt?: string;
                                            vc_join_meeting_cnt?: string;
                                            vc_all_meeting_duration_2?: Array<{
                                                year?: string;
                                                num?: number;
                                            }>;
                                            vc_join_meeting_all_user_cnt?: string;
                                            vc_last_meeting_time?: string;
                                            base_create_fcnt_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            base_view_fcnt?: string;
                                            base_create_dashboard_cnt?: string;
                                            base_create_dashboard_rank?: string;
                                            base_create_dashboard_rank_ucnt?: string;
                                            base_create_chat_cnt?: string;
                                            base_workflow_ins_cnt?: string;
                                            base_workflow_ins_rank?: string;
                                            base_workflow_ins_rank_ucnt?: string;
                                            vc_all_read_notes_cnt?: string;
                                            meego_role_wi_cnt_v2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            meego_common_wi_ucnt?: string;
                                            meego_workflow_wi_cnt?: string;
                                            people_interview_num_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                            people_interview_num_rank?: string;
                                            people_interview_num_rank_ucnt?: string;
                                            people_interview_offer_num_2?: Array<{
                                                year?: string;
                                                count?: string;
                                            }>;
                                        };
                                        year_2025: {
                                            user_id?: string;
                                            tenant_all_cnt?: string;
                                            user_register_date?: string;
                                            feishu_active_days?: string;
                                            feishu_duration_busy_month?: string;
                                            feishu_duration_busy_month_hours?: number;
                                            busy_month_send_msg_cnt?: string;
                                            busy_month_edit_doc_cnt?: string;
                                            busy_month_read_doc_cnt?: string;
                                            busy_month_join_meeting_cnt?: string;
                                            busy_month_meeting_duration?: number;
                                            im_talked_chat_cnt?: string;
                                            im_private_chat_cnt?: string;
                                            im_send_msg_cnt?: string;
                                            im_emoji_top1?: string;
                                            im_emoji_top1_cnt?: string;
                                            im_emoji_top2?: string;
                                            im_emoji_top2_cnt?: string;
                                            im_emoji_top3?: string;
                                            im_emoji_top3_cnt?: string;
                                            ccm_create_fcnt?: string;
                                            ccm_create_rank?: string;
                                            ccm_create_rank_ucnt?: string;
                                            ccm_create_viewed_ucnt?: string;
                                            ccm_create_liked_cnt?: string;
                                            ccm_create_viewed_most_ucnt?: string;
                                            ccm_all_read_doc_cnt?: string;
                                            docs_ai_quickview_use_cnt?: string;
                                            vc_join_meeting_cnt?: string;
                                            vc_join_meeting_duration?: number;
                                            vc_org_meeting_cnt?: Array<{
                                                organized_meeting_cnt?: string;
                                                organized_cal_meeting_cnt?: string;
                                                organized_instant_meeting_cnt?: string;
                                            }>;
                                            ai_notes_create_cnt?: string;
                                            ai_notes_read_cnt?: string;
                                            knowledge_ai_use_cnt?: string;
                                            knowledge_ai_use_busy_day?: string;
                                            knowledge_ai_use_busy_day_cnt?: string;
                                            base_create_fcnt?: string;
                                            base_ai_top1_name_map?: Array<{
                                                name_cn?: string;
                                                name_en?: string;
                                                name_cn_list?: string;
                                                name_en_list?: string;
                                            }>;
                                            base_create_view_ucnt?: string;
                                            base_most_rows_cnt?: string;
                                            base_create_dashboard_cnt?: string;
                                            base_workflow_create_cnt?: string;
                                            base_workflow_ins_cnt?: string;
                                            aily_develop_app_cnt?: string;
                                            aily_develop_app_active_ucnt?: string;
                                            aily_develop_active_most_app_intents?: string;
                                            aily_chat_cnt?: string;
                                            aily_artifact_create_cnt?: string;
                                            apaas_develop_app_cnt?: string;
                                            apaas_develop_app_active_ucnt?: string;
                                            apaas_develop_active_most_app_ucnt?: string;
                                            apaas_develop_ai_run_cnt?: string;
                                            meego_is_project_admin?: string;
                                            meego_create_wi_cnt?: string;
                                            meego_create_wi_role_ucnt?: string;
                                            meego_most_view_wi_ucnt?: string;
                                            meego_set_ai_field_cnt?: string;
                                            meego_ai_field_run_cnt?: string;
                                            meego_ai_gantt_use_cnt?: string;
                                            meego_ai_weekly_report_use_cnt?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/user_annual_reports/query`,
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
             * admin_dept_ext_contact_stat
             */
            adminDeptExtContactStat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=admin_dept_ext_contact_stat&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=admin_dept_ext_contact_stat&version=v1 document }
                 *
                 * 获取部门所拥有的外部联系人总数
                 *
                 * 获取部门外部联系人总数包括：部门拥有外部联系人的成员数、部门拥有外部联系人的总数和总外部租户数。部门下纳入统计的成员仅包含已激活未离职的用户；外部联系人仅包含当前关系状态为正常的用户（不限制外部联系人的离职状态），包含私有化租户的外部联系人
                 *
                 * - 只有企业自建应用才有权限调用此接口;;- 当天的数据会在第二天的早上九点半产出 (CN时区: UTC+8，非CN时区: UTC+0);;- 日期范围不超过90天，超过90天接口容易超时;;- 仅支持13层级部门数据查询，超过13层级的数据汇聚到第13层级;;;不能简单将多区域的数据加总汇聚，例如一个部门对应多个区域，多个区域都包含同一个外部联系人，则部门下实际外部联系人是1，但是简单加总结果>1
                 */
                list: async (
                    payload?: {
                        params: {
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            department_id?: string;
                            start_date: string;
                            end_date: string;
                            page_size?: number;
                            page_token?: string;
                            target_geo?: string;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        date?: string;
                                        department_id?: string;
                                        department_name?: string;
                                        has_ref_contact_ucnt?: string;
                                        ref_contact_ucnt?: string;
                                        ref_contact_tcnt?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/admin_dept_ext_contact_stats`,
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
             * ai_usage_detail
             */
            aiUsageDetail: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=ai_usage_detail&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=admin&resource=ai_usage_detail&version=v1 document }
                 */
                query: async (
                    payload?: {
                        data: {
                            date_start: number;
                            date_end: number;
                            subject_type: number;
                            subjects: Array<{
                                entity_type: number;
                                entity_ids: Array<string>;
                            }>;
                            filters?: {
                                feature_keys?: Array<number>;
                                usage_type?: number;
                                scenario_ids?: Array<{
                                    biz_type: string;
                                    biz1_type?: string;
                                    biz2_type?: string;
                                }>;
                            };
                            locale?: "zh-CN" | "en-US" | "ja-JP";
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                    items: Array<{
                                        entity_type?: number;
                                        entity_id?: string;
                                        usage_value_general_ai_quota?: number;
                                        usage_value_ai_notes_quota?: number;
                                        usage_value_feishu_aily_quota?: number;
                                    }>;
                                    has_more: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/ai_usage_detail/query`,
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
             * admin_user_stat
             */
            adminUserStat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=admin_user_stat&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=admin_user_stat&version=v1 document }
                 *
                 * 获取用户维度的用户活跃和功能使用数据
                 *
                 * 用于获取用户维度的用户活跃和功能使用数据，即IM（即时通讯）、日历、云文档、音视频会议、邮箱功能的使用数据。
                 *
                 * - 只有企业自建应用才有权限调用此接口;;- 当天的数据会在第二天的早上九点半产出（CN时区: UTC+8，非CN时区: UTC+0）;;- 数据权限范围配置：目前只支持给每个应用配置部门级别数据权限范围，默认包含子部门
                 */
                list: async (
                    payload?: {
                        params: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
                            start_date: string;
                            end_date: string;
                            department_id?: string;
                            user_id?: string;
                            page_size?: number;
                            page_token?: string;
                            target_geo?: string;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        date?: string;
                                        user_id?: string;
                                        user_name?: string;
                                        department_name?: string;
                                        department_path?: string;
                                        create_time?: string;
                                        user_active_flag?: number;
                                        register_time?: string;
                                        suite_active_flag?: number;
                                        last_active_time?: string;
                                        im_active_flag?: number;
                                        send_messenger_num?: number;
                                        docs_active_flag?: number;
                                        create_docs_num?: number;
                                        cal_active_flag?: number;
                                        create_cal_num?: number;
                                        vc_active_flag?: number;
                                        vc_duration?: number;
                                        active_os?: string;
                                        create_task_num?: number;
                                        vc_num?: number;
                                        app_package_type?: string;
                                        os_name?: string;
                                        email_send_count?: string;
                                        email_receive_count?: string;
                                        email_send_ext_count?: string;
                                        email_receive_ext_count?: string;
                                        email_send_in_count?: string;
                                        email_receive_in_count?: string;
                                        search_active_flag?: number;
                                        total_search_count?: string;
                                        quick_search_count?: string;
                                        tab_search_count?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/admin_user_stats`,
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
             * admin_dept_stat
             */
            adminDeptStat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=admin_dept_stat&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=admin&resource=admin_dept_stat&version=v1 document }
                 *
                 * 获取部门维度的用户活跃和功能使用数据
                 *
                 * 该接口用于获取部门维度的用户活跃和功能使用数据，即IM（即时通讯）、日历、云文档、音视频会议、邮箱功能的使用数据。
                 *
                 * - 只有企业自建应用才有权限调用此接口;;- 当天的数据会在第二天的早上九点半产出（CN时区: UTC+8，非CN时区: UTC+0）;;- 数据权限范围配置：目前只支持给每个应用配置部门级别数据权限范围，默认包含子部门（应用数据权限在开放平台配置）
                 */
                list: async (
                    payload?: {
                        params: {
                            department_id_type:
                                | "department_id"
                                | "open_department_id";
                            start_date: string;
                            end_date: string;
                            department_id: string;
                            contains_child_dept: boolean;
                            page_size?: number;
                            page_token?: string;
                            target_geo?: string;
                            with_product_version?: boolean;
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        date?: string;
                                        department_id?: string;
                                        department_name?: string;
                                        department_path?: string;
                                        total_user_num?: number;
                                        active_user_num?: number;
                                        active_user_rate?: string;
                                        suite_dau?: number;
                                        suite_active_rate?: string;
                                        new_user_num?: number;
                                        new_active_num?: number;
                                        resign_user_num?: number;
                                        im_dau?: number;
                                        send_messenger_user_num?: number;
                                        send_messenger_num?: number;
                                        avg_send_messenger_num?: string;
                                        docs_dau?: number;
                                        create_docs_user_num?: number;
                                        create_docs_num?: number;
                                        avg_create_docs_num?: string;
                                        cal_dau?: number;
                                        create_cal_user_num?: number;
                                        create_cal_num?: number;
                                        avg_create_cal_num?: string;
                                        vc_dau?: number;
                                        vc_duration?: number;
                                        avg_vc_duration?: string;
                                        avg_duration?: string;
                                        task_dau?: number;
                                        create_task_user_num?: number;
                                        create_task_num?: number;
                                        avg_create_task_num?: string;
                                        email_send_count?: string;
                                        email_receive_count?: string;
                                        email_send_ext_count?: string;
                                        email_receive_ext_count?: string;
                                        email_send_in_count?: string;
                                        email_receive_in_count?: string;
                                        search_active_dau?: string;
                                        total_search_count?: string;
                                        quick_search_count?: string;
                                        tab_search_count?: string;
                                        product_version?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/admin_dept_stats`,
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
             * ai_usage_log
             */
            aiUsageLog: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=admin&resource=ai_usage_log&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=admin&resource=ai_usage_log&version=v1 document }
                 */
                query: async (
                    payload?: {
                        data: {
                            date_start: number;
                            date_end: number;
                            subject_type: number;
                            subjects: Array<{
                                entity_type: number;
                                entity_ids: Array<string>;
                            }>;
                            filters?: {
                                feature_keys?: Array<number>;
                                usage_type?: number;
                                scenario_ids?: Array<{
                                    biz_type: string;
                                    biz1_type?: string;
                                    biz2_type?: string;
                                }>;
                            };
                            locale?: "zh-CN" | "en-US" | "ja-JP";
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            department_id_type?:
                                | "department_id"
                                | "open_department_id";
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
                                    items: Array<{
                                        entity_type?: number;
                                        entity_id?: string;
                                        department_id?: string;
                                        time?: number;
                                        scenario_translate?: string;
                                        scenarios?: Array<{
                                            biz_type: string;
                                            biz1_type?: string;
                                            biz2_type?: string;
                                        }>;
                                        feature_key?: number;
                                        usage_type?: number;
                                        used_quota?: number;
                                        notes?: {
                                            key_name: string;
                                            key_type: number;
                                            value: string;
                                        };
                                        descriptions?: Array<{
                                            key_name: string;
                                            key_type: number;
                                            value: string;
                                        }>;
                                    }>;
                                    has_more: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/admin/v1/ai_usage_log/query`,
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
