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
import minutes from "./minutes";

// auto gen
export default abstract class Client extends minutes {
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
    moments = {
        /**
         * post
         */
        post: {
            listWithIterator: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id?: string;
                        category_id?: string;
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
                                `${this.domain}/open-apis/moments/v1/posts`,
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
                                                    user_id?: string;
                                                    content: string;
                                                    image_key_list?: Array<string>;
                                                    media_file_token?: string;
                                                    comment_count?: number;
                                                    reaction_set?: {
                                                        reactions?: Array<{
                                                            type?: string;
                                                            count?: number;
                                                        }>;
                                                        total_count?: number;
                                                    };
                                                    id?: string;
                                                    create_time?: string;
                                                    media_cover_image_key?: string;
                                                    category_ids?: Array<string>;
                                                    link?: string;
                                                    user_type?: number;
                                                    dislike_count?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=moments&resource=post&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=moments&resource=post&version=v1 document }
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id?: string;
                        category_id?: string;
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
                                    user_id?: string;
                                    content: string;
                                    image_key_list?: Array<string>;
                                    media_file_token?: string;
                                    comment_count?: number;
                                    reaction_set?: {
                                        reactions?: Array<{
                                            type?: string;
                                            count?: number;
                                        }>;
                                        total_count?: number;
                                    };
                                    id?: string;
                                    create_time?: string;
                                    media_cover_image_key?: string;
                                    category_ids?: Array<string>;
                                    link?: string;
                                    user_type?: number;
                                    dislike_count?: number;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/moments/v1/posts`,
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
             * {@link https://open.feishu.cn/api-explorer?project=moments&resource=post&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=moments&resource=post&version=v1 document }
             *
             * 删除帖子
             */
            delete: async (
                payload?: {
                    path: { post_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/moments/v1/posts/:post_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=moments&resource=post&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=moments&resource=post&version=v1 document }
             *
             * 查询帖子信息
             *
             * 通过 ID 查询帖子实体数据信息
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { post_id: string };
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
                                post?: {
                                    user_id?: string;
                                    content: string;
                                    image_key_list?: Array<string>;
                                    media_file_token?: string;
                                    comment_count?: number;
                                    reaction_set?: {
                                        reactions?: Array<{
                                            type?: string;
                                            count?: number;
                                        }>;
                                        total_count?: number;
                                    };
                                    id?: string;
                                    create_time?: string;
                                    media_cover_image_key?: string;
                                    category_ids?: Array<string>;
                                    link?: string;
                                    user_type?: number;
                                    dislike_count?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/moments/v1/posts/:post_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=moments&resource=post&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=moments&resource=post&version=v1 document }
             *
             * 发布帖子
             */
            create: async (
                payload?: {
                    data: {
                        user_id?: string;
                        content: string;
                        image_key_list?: Array<string>;
                        media_file_token?: string;
                        create_time?: string;
                        media_cover_image_key?: string;
                        cid: string;
                        category_ids?: Array<string>;
                        user_type?: number;
                    };
                    params?: {
                        need_publish?: boolean;
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
                                post?: {
                                    user_id?: string;
                                    content: string;
                                    image_key_list?: Array<string>;
                                    media_file_token?: string;
                                    comment_count?: number;
                                    reaction_set?: {
                                        reactions?: Array<{
                                            type?: string;
                                            count?: number;
                                        }>;
                                        total_count?: number;
                                    };
                                    id?: string;
                                    create_time?: string;
                                    media_cover_image_key?: string;
                                    cid: string;
                                    category_ids?: Array<string>;
                                    link?: string;
                                    user_type?: number;
                                    dislike_count?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/moments/v1/posts`,
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
         * comment
         */
        comment: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=moments&resource=comment&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=moments&resource=comment&version=v1 document }
             *
             * 发布评论
             */
            create: async (
                payload?: {
                    data: {
                        user_id?: string;
                        content: string;
                        image_key?: string;
                        create_time?: string;
                        post_id: string;
                        reply_comment_id?: string;
                        cid: string;
                        user_type?: number;
                    };
                    params?: {
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
                                comment?: {
                                    user_id?: string;
                                    content: string;
                                    image_key?: string;
                                    is_hot?: boolean;
                                    reaction_set?: {
                                        reactions?: Array<{
                                            type?: string;
                                            count?: number;
                                        }>;
                                        total_count?: number;
                                    };
                                    id?: string;
                                    create_time?: string;
                                    post_id: string;
                                    reply_comment_id?: string;
                                    root_comment_id?: string;
                                    cid: string;
                                    user_type?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/moments/v1/comments`,
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
                        post_id: string;
                        page_size?: number;
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
                                `${this.domain}/open-apis/moments/v1/comments`,
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
                                                    user_id?: string;
                                                    content: string;
                                                    image_key?: string;
                                                    is_hot?: boolean;
                                                    reaction_set?: {
                                                        reactions?: Array<{
                                                            type?: string;
                                                            count?: number;
                                                        }>;
                                                        total_count?: number;
                                                    };
                                                    id?: string;
                                                    create_time?: string;
                                                    post_id: string;
                                                    reply_comment_id?: string;
                                                    root_comment_id?: string;
                                                    user_type?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=moments&resource=comment&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=moments&resource=comment&version=v1 document }
             */
            list: async (
                payload?: {
                    params: {
                        post_id: string;
                        page_size?: number;
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
                                items?: Array<{
                                    user_id?: string;
                                    content: string;
                                    image_key?: string;
                                    is_hot?: boolean;
                                    reaction_set?: {
                                        reactions?: Array<{
                                            type?: string;
                                            count?: number;
                                        }>;
                                        total_count?: number;
                                    };
                                    id?: string;
                                    create_time?: string;
                                    post_id: string;
                                    reply_comment_id?: string;
                                    root_comment_id?: string;
                                    user_type?: number;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/moments/v1/comments`,
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
             * {@link https://open.feishu.cn/api-explorer?project=moments&resource=comment&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=moments&resource=comment&version=v1 document }
             *
             * 查询帖子实体
             */
            get: async (
                payload?: {
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { comment_id: string };
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
                                comment?: {
                                    user_id?: string;
                                    content: string;
                                    image_key?: string;
                                    is_hot?: boolean;
                                    reaction_set?: {
                                        reactions?: Array<{
                                            type?: string;
                                            count?: number;
                                        }>;
                                        total_count?: number;
                                    };
                                    id?: string;
                                    create_time?: string;
                                    post_id: string;
                                    reply_comment_id?: string;
                                    root_comment_id?: string;
                                    user_type?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/moments/v1/comments/:comment_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=moments&resource=comment&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=moments&resource=comment&version=v1 document }
             *
             * 删除评论
             */
            delete: async (
                payload?: {
                    path: { comment_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/moments/v1/comments/:comment_id`,
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
        },
        /**
         * category
         */
        category: {
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
                                `${this.domain}/open-apis/moments/v1/categories`,
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
                                                    id?: string;
                                                    name?: string;
                                                    description?: string;
                                                    create_time?: string;
                                                    post_count?: number;
                                                    participant_count?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=moments&resource=category&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=moments&resource=category&version=v1 document }
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
                                    id?: string;
                                    name?: string;
                                    description?: string;
                                    create_time?: string;
                                    post_count?: number;
                                    participant_count?: number;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/moments/v1/categories`,
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
         * reaction
         */
        reaction: {
            listWithIterator: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        entity_id: string;
                        type?: string;
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
                                `${this.domain}/open-apis/moments/v1/reactions`,
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
                                                    type: string;
                                                    user_id: string;
                                                    entity_id: string;
                                                    id?: string;
                                                    create_time?: string;
                                                    entity_type?: number;
                                                    user_type?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=moments&resource=reaction&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=moments&resource=reaction&version=v1 document }
             */
            list: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        entity_id: string;
                        type?: string;
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
                                    type: string;
                                    user_id: string;
                                    entity_id: string;
                                    id?: string;
                                    create_time?: string;
                                    entity_type?: number;
                                    user_type?: number;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/moments/v1/reactions`,
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
             * {@link https://open.feishu.cn/api-explorer?project=moments&resource=reaction&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=moments&resource=reaction&version=v1 document }
             *
             * 删除表情回复
             */
            delete: async (
                payload?: {
                    path: { reaction_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/moments/v1/reactions/:reaction_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=moments&resource=reaction&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=moments&resource=reaction&version=v1 document }
             *
             * 发布表情回复
             */
            create: async (
                payload?: {
                    data: {
                        type: string;
                        user_id: string;
                        entity_id: string;
                        create_time?: string;
                        entity_type?: number;
                        user_type?: number;
                    };
                    params?: {
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
                                reaction?: {
                                    type: string;
                                    user_id: string;
                                    entity_id: string;
                                    id?: string;
                                    create_time?: string;
                                    entity_type?: number;
                                    user_type?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/moments/v1/reactions`,
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
             * post
             */
            post: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id?: string;
                            category_id?: string;
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
                                    `${this.domain}/open-apis/moments/v1/posts`,
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
                                                        user_id?: string;
                                                        content: string;
                                                        image_key_list?: Array<string>;
                                                        media_file_token?: string;
                                                        comment_count?: number;
                                                        reaction_set?: {
                                                            reactions?: Array<{
                                                                type?: string;
                                                                count?: number;
                                                            }>;
                                                            total_count?: number;
                                                        };
                                                        id?: string;
                                                        create_time?: string;
                                                        media_cover_image_key?: string;
                                                        category_ids?: Array<string>;
                                                        link?: string;
                                                        user_type?: number;
                                                        dislike_count?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=moments&resource=post&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=moments&resource=post&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id?: string;
                            category_id?: string;
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
                                        user_id?: string;
                                        content: string;
                                        image_key_list?: Array<string>;
                                        media_file_token?: string;
                                        comment_count?: number;
                                        reaction_set?: {
                                            reactions?: Array<{
                                                type?: string;
                                                count?: number;
                                            }>;
                                            total_count?: number;
                                        };
                                        id?: string;
                                        create_time?: string;
                                        media_cover_image_key?: string;
                                        category_ids?: Array<string>;
                                        link?: string;
                                        user_type?: number;
                                        dislike_count?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/moments/v1/posts`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=moments&resource=post&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=moments&resource=post&version=v1 document }
                 *
                 * 删除帖子
                 */
                delete: async (
                    payload?: {
                        path: { post_id: string };
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
                                `${this.domain}/open-apis/moments/v1/posts/:post_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=moments&resource=post&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=moments&resource=post&version=v1 document }
                 *
                 * 查询帖子信息
                 *
                 * 通过 ID 查询帖子实体数据信息
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { post_id: string };
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
                                    post?: {
                                        user_id?: string;
                                        content: string;
                                        image_key_list?: Array<string>;
                                        media_file_token?: string;
                                        comment_count?: number;
                                        reaction_set?: {
                                            reactions?: Array<{
                                                type?: string;
                                                count?: number;
                                            }>;
                                            total_count?: number;
                                        };
                                        id?: string;
                                        create_time?: string;
                                        media_cover_image_key?: string;
                                        category_ids?: Array<string>;
                                        link?: string;
                                        user_type?: number;
                                        dislike_count?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/moments/v1/posts/:post_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=moments&resource=post&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=moments&resource=post&version=v1 document }
                 *
                 * 发布帖子
                 */
                create: async (
                    payload?: {
                        data: {
                            user_id?: string;
                            content: string;
                            image_key_list?: Array<string>;
                            media_file_token?: string;
                            create_time?: string;
                            media_cover_image_key?: string;
                            cid: string;
                            category_ids?: Array<string>;
                            user_type?: number;
                        };
                        params?: {
                            need_publish?: boolean;
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
                                    post?: {
                                        user_id?: string;
                                        content: string;
                                        image_key_list?: Array<string>;
                                        media_file_token?: string;
                                        comment_count?: number;
                                        reaction_set?: {
                                            reactions?: Array<{
                                                type?: string;
                                                count?: number;
                                            }>;
                                            total_count?: number;
                                        };
                                        id?: string;
                                        create_time?: string;
                                        media_cover_image_key?: string;
                                        cid: string;
                                        category_ids?: Array<string>;
                                        link?: string;
                                        user_type?: number;
                                        dislike_count?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/moments/v1/posts`,
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
             * comment
             */
            comment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=moments&resource=comment&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=moments&resource=comment&version=v1 document }
                 *
                 * 发布评论
                 */
                create: async (
                    payload?: {
                        data: {
                            user_id?: string;
                            content: string;
                            image_key?: string;
                            create_time?: string;
                            post_id: string;
                            reply_comment_id?: string;
                            cid: string;
                            user_type?: number;
                        };
                        params?: {
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
                                    comment?: {
                                        user_id?: string;
                                        content: string;
                                        image_key?: string;
                                        is_hot?: boolean;
                                        reaction_set?: {
                                            reactions?: Array<{
                                                type?: string;
                                                count?: number;
                                            }>;
                                            total_count?: number;
                                        };
                                        id?: string;
                                        create_time?: string;
                                        post_id: string;
                                        reply_comment_id?: string;
                                        root_comment_id?: string;
                                        cid: string;
                                        user_type?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/moments/v1/comments`,
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
                            post_id: string;
                            page_size?: number;
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
                                    `${this.domain}/open-apis/moments/v1/comments`,
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
                                                        user_id?: string;
                                                        content: string;
                                                        image_key?: string;
                                                        is_hot?: boolean;
                                                        reaction_set?: {
                                                            reactions?: Array<{
                                                                type?: string;
                                                                count?: number;
                                                            }>;
                                                            total_count?: number;
                                                        };
                                                        id?: string;
                                                        create_time?: string;
                                                        post_id: string;
                                                        reply_comment_id?: string;
                                                        root_comment_id?: string;
                                                        user_type?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=moments&resource=comment&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=moments&resource=comment&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            post_id: string;
                            page_size?: number;
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
                                    items?: Array<{
                                        user_id?: string;
                                        content: string;
                                        image_key?: string;
                                        is_hot?: boolean;
                                        reaction_set?: {
                                            reactions?: Array<{
                                                type?: string;
                                                count?: number;
                                            }>;
                                            total_count?: number;
                                        };
                                        id?: string;
                                        create_time?: string;
                                        post_id: string;
                                        reply_comment_id?: string;
                                        root_comment_id?: string;
                                        user_type?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/moments/v1/comments`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=moments&resource=comment&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=moments&resource=comment&version=v1 document }
                 *
                 * 查询帖子实体
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { comment_id: string };
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
                                    comment?: {
                                        user_id?: string;
                                        content: string;
                                        image_key?: string;
                                        is_hot?: boolean;
                                        reaction_set?: {
                                            reactions?: Array<{
                                                type?: string;
                                                count?: number;
                                            }>;
                                            total_count?: number;
                                        };
                                        id?: string;
                                        create_time?: string;
                                        post_id: string;
                                        reply_comment_id?: string;
                                        root_comment_id?: string;
                                        user_type?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/moments/v1/comments/:comment_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=moments&resource=comment&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=moments&resource=comment&version=v1 document }
                 *
                 * 删除评论
                 */
                delete: async (
                    payload?: {
                        path: { comment_id: string };
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
                                `${this.domain}/open-apis/moments/v1/comments/:comment_id`,
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
            },
            /**
             * category
             */
            category: {
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
                                    `${this.domain}/open-apis/moments/v1/categories`,
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
                                                        name?: string;
                                                        description?: string;
                                                        create_time?: string;
                                                        post_count?: number;
                                                        participant_count?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=moments&resource=category&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=moments&resource=category&version=v1 document }
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
                                        id?: string;
                                        name?: string;
                                        description?: string;
                                        create_time?: string;
                                        post_count?: number;
                                        participant_count?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/moments/v1/categories`,
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
             * reaction
             */
            reaction: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            entity_id: string;
                            type?: string;
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
                                    `${this.domain}/open-apis/moments/v1/reactions`,
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
                                                        type: string;
                                                        user_id: string;
                                                        entity_id: string;
                                                        id?: string;
                                                        create_time?: string;
                                                        entity_type?: number;
                                                        user_type?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=moments&resource=reaction&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=moments&resource=reaction&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            entity_id: string;
                            type?: string;
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
                                        type: string;
                                        user_id: string;
                                        entity_id: string;
                                        id?: string;
                                        create_time?: string;
                                        entity_type?: number;
                                        user_type?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/moments/v1/reactions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=moments&resource=reaction&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=moments&resource=reaction&version=v1 document }
                 *
                 * 删除表情回复
                 */
                delete: async (
                    payload?: {
                        path: { reaction_id: string };
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
                                `${this.domain}/open-apis/moments/v1/reactions/:reaction_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=moments&resource=reaction&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=moments&resource=reaction&version=v1 document }
                 *
                 * 发布表情回复
                 */
                create: async (
                    payload?: {
                        data: {
                            type: string;
                            user_id: string;
                            entity_id: string;
                            create_time?: string;
                            entity_type?: number;
                            user_type?: number;
                        };
                        params?: {
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
                                    reaction?: {
                                        type: string;
                                        user_id: string;
                                        entity_id: string;
                                        id?: string;
                                        create_time?: string;
                                        entity_type?: number;
                                        user_type?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/moments/v1/reactions`,
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
