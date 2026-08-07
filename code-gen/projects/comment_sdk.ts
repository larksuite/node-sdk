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
import collab_plugins from "./collab_plugins";

// auto gen
export default abstract class Client extends collab_plugins {
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
    comment_sdk = {
        /**
         * entity.user_permission
         */
        entityUserPermission: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.user_permission&apiName=config&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=config&project=comment_sdk&resource=entity.user_permission&version=v1 document }
             *
             * 设置用户评论权限
             *
             * 在评论组件内发起评论请求前，需要通过该接口设置用户对类文档的评论权限，权限有效期24h
             *
             * 不再接入新业务方，已接入业务不受影响。
             */
            config: async (
                payload?: {
                    data: { user_permission: { levels: Array<number> } };
                    path: { entity_token: string };
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
                                user_permission?: { levels: Array<number> };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/user_permission/config`,
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
         * entity.comment.reply
         */
        entityCommentReply: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.comment.reply&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=comment_sdk&resource=entity.comment.reply&version=v1 document }
             */
            create: async (
                payload?: {
                    data?: {
                        user_id?: string;
                        content?: {
                            elements?: Array<{
                                type: "0" | "1" | "2";
                                text_run?: { text: string };
                                person?: { user_id: string };
                                link?: { url: string };
                            }>;
                        };
                        extra?: {
                            image_list?: Array<string>;
                            extra: string;
                            attachment?: Array<{
                                document_token: string;
                                document_type: string;
                                extra?: string;
                            }>;
                        };
                    };
                    params?: {
                        entity_type?: number;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path: { entity_token: string; comment_id: string };
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
                                comment_id?: string;
                                user_id?: string;
                                create_time?: string;
                                update_time?: string;
                                is_solved?: boolean;
                                solved_time?: string;
                                solved_user_id?: string;
                                has_more?: boolean;
                                page_token?: string;
                                position?: string;
                                quote?: string;
                                uniqued_id?: string;
                                is_whole?: boolean;
                                reply_list?: Array<{
                                    reply_id?: string;
                                    user_id?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    unique_id?: string;
                                    content?: {
                                        elements?: Array<{
                                            type: "0" | "1" | "2";
                                            text_run?: { text: string };
                                            person?: { user_id: string };
                                            link?: { url: string };
                                        }>;
                                    };
                                    extra?: {
                                        image_list?: Array<string>;
                                        extra: string;
                                        attachment?: Array<{
                                            document_token: string;
                                            document_type: string;
                                            extra?: string;
                                        }>;
                                    };
                                    delete_flag?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments/:comment_id/replies`,
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
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path: { entity_token: string; comment_id: string };
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
                                `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments/:comment_id/replies`,
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
                                                    reply_id?: string;
                                                    user_id?: string;
                                                    create_time?: string;
                                                    update_time?: string;
                                                    unique_id?: string;
                                                    content?: {
                                                        elements?: Array<{
                                                            type:
                                                                | "0"
                                                                | "1"
                                                                | "2";
                                                            text_run?: {
                                                                text: string;
                                                            };
                                                            person?: {
                                                                user_id: string;
                                                            };
                                                            link?: {
                                                                url: string;
                                                            };
                                                        }>;
                                                    };
                                                    extra?: {
                                                        image_list?: Array<string>;
                                                        extra: string;
                                                        attachment?: Array<{
                                                            document_token: string;
                                                            document_type: string;
                                                            extra?: string;
                                                        }>;
                                                    };
                                                    delete_flag?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.comment.reply&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=comment_sdk&resource=entity.comment.reply&version=v1 document }
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path: { entity_token: string; comment_id: string };
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
                                    reply_id?: string;
                                    user_id?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    unique_id?: string;
                                    content?: {
                                        elements?: Array<{
                                            type: "0" | "1" | "2";
                                            text_run?: { text: string };
                                            person?: { user_id: string };
                                            link?: { url: string };
                                        }>;
                                    };
                                    extra?: {
                                        image_list?: Array<string>;
                                        extra: string;
                                        attachment?: Array<{
                                            document_token: string;
                                            document_type: string;
                                            extra?: string;
                                        }>;
                                    };
                                    delete_flag?: number;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments/:comment_id/replies`,
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
             * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.comment.reply&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=comment_sdk&resource=entity.comment.reply&version=v1 document }
             */
            delete: async (
                payload?: {
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path: {
                        entity_token: string;
                        comment_id: string;
                        reply_id: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments/:comment_id/replies/:reply_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.comment.reply&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=comment_sdk&resource=entity.comment.reply&version=v1 document }
             */
            update: async (
                payload?: {
                    data?: {
                        user_id?: string;
                        content?: {
                            elements?: Array<{
                                type: "0" | "1" | "2";
                                text_run?: { text: string };
                                person?: { user_id: string };
                                link?: { url: string };
                            }>;
                        };
                        extra?: {
                            image_list?: Array<string>;
                            extra: string;
                            attachment?: Array<{
                                document_token: string;
                                document_type: string;
                                extra?: string;
                            }>;
                        };
                    };
                    params?: {
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path: {
                        entity_token: string;
                        comment_id: string;
                        reply_id: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments/:comment_id/replies/:reply_id`,
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
         * entity.comment
         */
        entityComment: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.comment&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=comment_sdk&resource=entity.comment&version=v1 document }
             */
            patch: async (
                payload?: {
                    params: {
                        is_solved: boolean;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path: { entity_token: string; comment_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments/:comment_id`,
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
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        entity_type?: number;
                    };
                    path: { entity_token: string };
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
                                `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments`,
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
                                                    comment_id?: string;
                                                    user_id?: string;
                                                    create_time?: string;
                                                    update_time?: string;
                                                    is_solved?: boolean;
                                                    solved_time?: string;
                                                    solved_user_id?: string;
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    position?: string;
                                                    quote?: string;
                                                    uniqued_id?: string;
                                                    is_whole?: boolean;
                                                    reply_list?: Array<{
                                                        reply_id?: string;
                                                        user_id?: string;
                                                        create_time?: string;
                                                        update_time?: string;
                                                        unique_id?: string;
                                                        content?: {
                                                            elements?: Array<{
                                                                type:
                                                                    | "0"
                                                                    | "1"
                                                                    | "2";
                                                                text_run?: {
                                                                    text: string;
                                                                };
                                                                person?: {
                                                                    user_id: string;
                                                                };
                                                                link?: {
                                                                    url: string;
                                                                };
                                                            }>;
                                                        };
                                                        extra?: {
                                                            image_list?: Array<string>;
                                                            extra: string;
                                                            attachment?: Array<{
                                                                document_token: string;
                                                                document_type: string;
                                                                extra?: string;
                                                            }>;
                                                        };
                                                        delete_flag?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.comment&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=comment_sdk&resource=entity.comment&version=v1 document }
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        entity_type?: number;
                    };
                    path: { entity_token: string };
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
                                    comment_id?: string;
                                    user_id?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    is_solved?: boolean;
                                    solved_time?: string;
                                    solved_user_id?: string;
                                    has_more?: boolean;
                                    page_token?: string;
                                    position?: string;
                                    quote?: string;
                                    uniqued_id?: string;
                                    is_whole?: boolean;
                                    reply_list?: Array<{
                                        reply_id?: string;
                                        user_id?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        unique_id?: string;
                                        content?: {
                                            elements?: Array<{
                                                type: "0" | "1" | "2";
                                                text_run?: { text: string };
                                                person?: { user_id: string };
                                                link?: { url: string };
                                            }>;
                                        };
                                        extra?: {
                                            image_list?: Array<string>;
                                            extra: string;
                                            attachment?: Array<{
                                                document_token: string;
                                                document_type: string;
                                                extra?: string;
                                            }>;
                                        };
                                        delete_flag?: number;
                                    }>;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments`,
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
            getWithIterator: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path: { entity_token: string; comment_id: string };
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
                                `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments/:comment_id`,
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
                                                comment_id?: string;
                                                user_id?: string;
                                                create_time?: string;
                                                update_time?: string;
                                                is_solved?: boolean;
                                                solved_time?: string;
                                                solved_user_id?: string;
                                                has_more?: boolean;
                                                page_token?: string;
                                                position?: string;
                                                quote?: string;
                                                uniqued_id?: string;
                                                is_whole?: boolean;
                                                reply_list?: Array<{
                                                    reply_id?: string;
                                                    user_id?: string;
                                                    create_time?: string;
                                                    update_time?: string;
                                                    unique_id?: string;
                                                    content?: {
                                                        elements?: Array<{
                                                            type:
                                                                | "0"
                                                                | "1"
                                                                | "2";
                                                            text_run?: {
                                                                text: string;
                                                            };
                                                            person?: {
                                                                user_id: string;
                                                            };
                                                            link?: {
                                                                url: string;
                                                            };
                                                        }>;
                                                    };
                                                    extra?: {
                                                        image_list?: Array<string>;
                                                        extra: string;
                                                        attachment?: Array<{
                                                            document_token: string;
                                                            document_type: string;
                                                            extra?: string;
                                                        }>;
                                                    };
                                                    delete_flag?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.comment&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=comment_sdk&resource=entity.comment&version=v1 document }
             */
            get: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path: { entity_token: string; comment_id: string };
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
                                comment_id?: string;
                                user_id?: string;
                                create_time?: string;
                                update_time?: string;
                                is_solved?: boolean;
                                solved_time?: string;
                                solved_user_id?: string;
                                has_more?: boolean;
                                page_token?: string;
                                position?: string;
                                quote?: string;
                                uniqued_id?: string;
                                is_whole?: boolean;
                                reply_list?: Array<{
                                    reply_id?: string;
                                    user_id?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    unique_id?: string;
                                    content?: {
                                        elements?: Array<{
                                            type: "0" | "1" | "2";
                                            text_run?: { text: string };
                                            person?: { user_id: string };
                                            link?: { url: string };
                                        }>;
                                    };
                                    extra?: {
                                        image_list?: Array<string>;
                                        extra: string;
                                        attachment?: Array<{
                                            document_token: string;
                                            document_type: string;
                                            extra?: string;
                                        }>;
                                    };
                                    delete_flag?: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments/:comment_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.comment&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=comment_sdk&resource=entity.comment&version=v1 document }
             */
            create: async (
                payload?: {
                    data?: {
                        user_id?: string;
                        create_time?: string;
                        is_solved?: boolean;
                        has_more?: boolean;
                        page_token?: string;
                        position?: string;
                        quote?: string;
                        is_whole?: boolean;
                        reply_list?: Array<{
                            user_id?: string;
                            content?: {
                                elements?: Array<{
                                    type: "0" | "1" | "2";
                                    text_run?: { text: string };
                                    person?: { user_id: string };
                                    link?: { url: string };
                                }>;
                            };
                            extra?: {
                                image_list?: Array<string>;
                                extra: string;
                                attachment?: Array<{
                                    document_token: string;
                                    document_type: string;
                                    extra?: string;
                                }>;
                            };
                        }>;
                    };
                    params?: {
                        entity_type?: number;
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path: { entity_token: string };
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
                                    comment_id?: string;
                                    user_id?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    is_solved?: boolean;
                                    solved_time?: string;
                                    solved_user_id?: string;
                                    has_more?: boolean;
                                    page_token?: string;
                                    position?: string;
                                    quote?: string;
                                    uniqued_id?: string;
                                    is_whole?: boolean;
                                    reply_list?: Array<{
                                        reply_id?: string;
                                        user_id?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        unique_id?: string;
                                        content?: {
                                            elements?: Array<{
                                                type: "0" | "1" | "2";
                                                text_run?: { text: string };
                                                person?: { user_id: string };
                                                link?: { url: string };
                                            }>;
                                        };
                                        extra?: {
                                            image_list?: Array<string>;
                                            extra: string;
                                            attachment?: Array<{
                                                document_token: string;
                                                document_type: string;
                                                extra?: string;
                                            }>;
                                        };
                                        delete_flag?: number;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments`,
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
             * entity.user_permission
             */
            entityUserPermission: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.user_permission&apiName=config&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=config&project=comment_sdk&resource=entity.user_permission&version=v1 document }
                 *
                 * 设置用户评论权限
                 *
                 * 在评论组件内发起评论请求前，需要通过该接口设置用户对类文档的评论权限，权限有效期24h
                 *
                 * 不再接入新业务方，已接入业务不受影响。
                 */
                config: async (
                    payload?: {
                        data: { user_permission: { levels: Array<number> } };
                        path: { entity_token: string };
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
                                    user_permission?: { levels: Array<number> };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/user_permission/config`,
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
             * entity.comment.reply
             */
            entityCommentReply: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.comment.reply&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=comment_sdk&resource=entity.comment.reply&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            user_id?: string;
                            content?: {
                                elements?: Array<{
                                    type: "0" | "1" | "2";
                                    text_run?: { text: string };
                                    person?: { user_id: string };
                                    link?: { url: string };
                                }>;
                            };
                            extra?: {
                                image_list?: Array<string>;
                                extra: string;
                                attachment?: Array<{
                                    document_token: string;
                                    document_type: string;
                                    extra?: string;
                                }>;
                            };
                        };
                        params?: {
                            entity_type?: number;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { entity_token: string; comment_id: string };
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
                                    comment_id?: string;
                                    user_id?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    is_solved?: boolean;
                                    solved_time?: string;
                                    solved_user_id?: string;
                                    has_more?: boolean;
                                    page_token?: string;
                                    position?: string;
                                    quote?: string;
                                    uniqued_id?: string;
                                    is_whole?: boolean;
                                    reply_list?: Array<{
                                        reply_id?: string;
                                        user_id?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        unique_id?: string;
                                        content?: {
                                            elements?: Array<{
                                                type: "0" | "1" | "2";
                                                text_run?: { text: string };
                                                person?: { user_id: string };
                                                link?: { url: string };
                                            }>;
                                        };
                                        extra?: {
                                            image_list?: Array<string>;
                                            extra: string;
                                            attachment?: Array<{
                                                document_token: string;
                                                document_type: string;
                                                extra?: string;
                                            }>;
                                        };
                                        delete_flag?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments/:comment_id/replies`,
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
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { entity_token: string; comment_id: string };
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
                                    `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments/:comment_id/replies`,
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
                                                        reply_id?: string;
                                                        user_id?: string;
                                                        create_time?: string;
                                                        update_time?: string;
                                                        unique_id?: string;
                                                        content?: {
                                                            elements?: Array<{
                                                                type:
                                                                    | "0"
                                                                    | "1"
                                                                    | "2";
                                                                text_run?: {
                                                                    text: string;
                                                                };
                                                                person?: {
                                                                    user_id: string;
                                                                };
                                                                link?: {
                                                                    url: string;
                                                                };
                                                            }>;
                                                        };
                                                        extra?: {
                                                            image_list?: Array<string>;
                                                            extra: string;
                                                            attachment?: Array<{
                                                                document_token: string;
                                                                document_type: string;
                                                                extra?: string;
                                                            }>;
                                                        };
                                                        delete_flag?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.comment.reply&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=comment_sdk&resource=entity.comment.reply&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { entity_token: string; comment_id: string };
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
                                        reply_id?: string;
                                        user_id?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        unique_id?: string;
                                        content?: {
                                            elements?: Array<{
                                                type: "0" | "1" | "2";
                                                text_run?: { text: string };
                                                person?: { user_id: string };
                                                link?: { url: string };
                                            }>;
                                        };
                                        extra?: {
                                            image_list?: Array<string>;
                                            extra: string;
                                            attachment?: Array<{
                                                document_token: string;
                                                document_type: string;
                                                extra?: string;
                                            }>;
                                        };
                                        delete_flag?: number;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments/:comment_id/replies`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.comment.reply&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=comment_sdk&resource=entity.comment.reply&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: {
                            entity_token: string;
                            comment_id: string;
                            reply_id: string;
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
                                `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments/:comment_id/replies/:reply_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.comment.reply&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=comment_sdk&resource=entity.comment.reply&version=v1 document }
                 */
                update: async (
                    payload?: {
                        data?: {
                            user_id?: string;
                            content?: {
                                elements?: Array<{
                                    type: "0" | "1" | "2";
                                    text_run?: { text: string };
                                    person?: { user_id: string };
                                    link?: { url: string };
                                }>;
                            };
                            extra?: {
                                image_list?: Array<string>;
                                extra: string;
                                attachment?: Array<{
                                    document_token: string;
                                    document_type: string;
                                    extra?: string;
                                }>;
                            };
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: {
                            entity_token: string;
                            comment_id: string;
                            reply_id: string;
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
                                `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments/:comment_id/replies/:reply_id`,
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
             * entity.comment
             */
            entityComment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.comment&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=comment_sdk&resource=entity.comment&version=v1 document }
                 */
                patch: async (
                    payload?: {
                        params: {
                            is_solved: boolean;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { entity_token: string; comment_id: string };
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
                                `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments/:comment_id`,
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
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            entity_type?: number;
                        };
                        path: { entity_token: string };
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
                                    `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments`,
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
                                                        comment_id?: string;
                                                        user_id?: string;
                                                        create_time?: string;
                                                        update_time?: string;
                                                        is_solved?: boolean;
                                                        solved_time?: string;
                                                        solved_user_id?: string;
                                                        has_more?: boolean;
                                                        page_token?: string;
                                                        position?: string;
                                                        quote?: string;
                                                        uniqued_id?: string;
                                                        is_whole?: boolean;
                                                        reply_list?: Array<{
                                                            reply_id?: string;
                                                            user_id?: string;
                                                            create_time?: string;
                                                            update_time?: string;
                                                            unique_id?: string;
                                                            content?: {
                                                                elements?: Array<{
                                                                    type:
                                                                        | "0"
                                                                        | "1"
                                                                        | "2";
                                                                    text_run?: {
                                                                        text: string;
                                                                    };
                                                                    person?: {
                                                                        user_id: string;
                                                                    };
                                                                    link?: {
                                                                        url: string;
                                                                    };
                                                                }>;
                                                            };
                                                            extra?: {
                                                                image_list?: Array<string>;
                                                                extra: string;
                                                                attachment?: Array<{
                                                                    document_token: string;
                                                                    document_type: string;
                                                                    extra?: string;
                                                                }>;
                                                            };
                                                            delete_flag?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.comment&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=comment_sdk&resource=entity.comment&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            entity_type?: number;
                        };
                        path: { entity_token: string };
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
                                        comment_id?: string;
                                        user_id?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        is_solved?: boolean;
                                        solved_time?: string;
                                        solved_user_id?: string;
                                        has_more?: boolean;
                                        page_token?: string;
                                        position?: string;
                                        quote?: string;
                                        uniqued_id?: string;
                                        is_whole?: boolean;
                                        reply_list?: Array<{
                                            reply_id?: string;
                                            user_id?: string;
                                            create_time?: string;
                                            update_time?: string;
                                            unique_id?: string;
                                            content?: {
                                                elements?: Array<{
                                                    type: "0" | "1" | "2";
                                                    text_run?: { text: string };
                                                    person?: {
                                                        user_id: string;
                                                    };
                                                    link?: { url: string };
                                                }>;
                                            };
                                            extra?: {
                                                image_list?: Array<string>;
                                                extra: string;
                                                attachment?: Array<{
                                                    document_token: string;
                                                    document_type: string;
                                                    extra?: string;
                                                }>;
                                            };
                                            delete_flag?: number;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments`,
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
                getWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { entity_token: string; comment_id: string };
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
                                    `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments/:comment_id`,
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
                                                    comment_id?: string;
                                                    user_id?: string;
                                                    create_time?: string;
                                                    update_time?: string;
                                                    is_solved?: boolean;
                                                    solved_time?: string;
                                                    solved_user_id?: string;
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    position?: string;
                                                    quote?: string;
                                                    uniqued_id?: string;
                                                    is_whole?: boolean;
                                                    reply_list?: Array<{
                                                        reply_id?: string;
                                                        user_id?: string;
                                                        create_time?: string;
                                                        update_time?: string;
                                                        unique_id?: string;
                                                        content?: {
                                                            elements?: Array<{
                                                                type:
                                                                    | "0"
                                                                    | "1"
                                                                    | "2";
                                                                text_run?: {
                                                                    text: string;
                                                                };
                                                                person?: {
                                                                    user_id: string;
                                                                };
                                                                link?: {
                                                                    url: string;
                                                                };
                                                            }>;
                                                        };
                                                        extra?: {
                                                            image_list?: Array<string>;
                                                            extra: string;
                                                            attachment?: Array<{
                                                                document_token: string;
                                                                document_type: string;
                                                                extra?: string;
                                                            }>;
                                                        };
                                                        delete_flag?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.comment&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=comment_sdk&resource=entity.comment&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { entity_token: string; comment_id: string };
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
                                    comment_id?: string;
                                    user_id?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    is_solved?: boolean;
                                    solved_time?: string;
                                    solved_user_id?: string;
                                    has_more?: boolean;
                                    page_token?: string;
                                    position?: string;
                                    quote?: string;
                                    uniqued_id?: string;
                                    is_whole?: boolean;
                                    reply_list?: Array<{
                                        reply_id?: string;
                                        user_id?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        unique_id?: string;
                                        content?: {
                                            elements?: Array<{
                                                type: "0" | "1" | "2";
                                                text_run?: { text: string };
                                                person?: { user_id: string };
                                                link?: { url: string };
                                            }>;
                                        };
                                        extra?: {
                                            image_list?: Array<string>;
                                            extra: string;
                                            attachment?: Array<{
                                                document_token: string;
                                                document_type: string;
                                                extra?: string;
                                            }>;
                                        };
                                        delete_flag?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments/:comment_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=comment_sdk&resource=entity.comment&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=comment_sdk&resource=entity.comment&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            user_id?: string;
                            create_time?: string;
                            is_solved?: boolean;
                            has_more?: boolean;
                            page_token?: string;
                            position?: string;
                            quote?: string;
                            is_whole?: boolean;
                            reply_list?: Array<{
                                user_id?: string;
                                content?: {
                                    elements?: Array<{
                                        type: "0" | "1" | "2";
                                        text_run?: { text: string };
                                        person?: { user_id: string };
                                        link?: { url: string };
                                    }>;
                                };
                                extra?: {
                                    image_list?: Array<string>;
                                    extra: string;
                                    attachment?: Array<{
                                        document_token: string;
                                        document_type: string;
                                        extra?: string;
                                    }>;
                                };
                            }>;
                        };
                        params?: {
                            entity_type?: number;
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { entity_token: string };
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
                                        comment_id?: string;
                                        user_id?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        is_solved?: boolean;
                                        solved_time?: string;
                                        solved_user_id?: string;
                                        has_more?: boolean;
                                        page_token?: string;
                                        position?: string;
                                        quote?: string;
                                        uniqued_id?: string;
                                        is_whole?: boolean;
                                        reply_list?: Array<{
                                            reply_id?: string;
                                            user_id?: string;
                                            create_time?: string;
                                            update_time?: string;
                                            unique_id?: string;
                                            content?: {
                                                elements?: Array<{
                                                    type: "0" | "1" | "2";
                                                    text_run?: { text: string };
                                                    person?: {
                                                        user_id: string;
                                                    };
                                                    link?: { url: string };
                                                }>;
                                            };
                                            extra?: {
                                                image_list?: Array<string>;
                                                extra: string;
                                                attachment?: Array<{
                                                    document_token: string;
                                                    document_type: string;
                                                    extra?: string;
                                                }>;
                                            };
                                            delete_flag?: number;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/comment_sdk/v1/entities/:entity_token/comments`,
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
