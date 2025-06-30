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
import im from "./im";

// auto gen
export default abstract class Client extends im {
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
    lingo = {
        v1: {
            /**
             * classification
             */
            classification: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            repo_id?: string;
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
                                    `${this.domain}/open-apis/lingo/v1/classifications`,
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
                                                        name?: string;
                                                        father_id?: string;
                                                        i18n_names?: Array<{
                                                            language: number;
                                                            name: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=classification&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=lingo&resource=classification&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            repo_id?: string;
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
                                        id: string;
                                        name?: string;
                                        father_id?: string;
                                        i18n_names?: Array<{
                                            language: number;
                                            name: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/classifications`,
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
             * draft
             */
            draft: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=draft&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=lingo&resource=draft&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            id?: string;
                            main_keys: Array<{
                                key: string;
                                display_status: {
                                    allow_highlight: boolean;
                                    allow_search: boolean;
                                };
                            }>;
                            full_names?: Array<{
                                key: string;
                                display_status: {
                                    allow_highlight: boolean;
                                    allow_search: boolean;
                                };
                            }>;
                            aliases?: Array<{
                                key: string;
                                display_status: {
                                    allow_highlight: boolean;
                                    allow_search: boolean;
                                };
                            }>;
                            description?: string;
                            related_meta?: {
                                users?: Array<{ id: string; title?: string }>;
                                chats?: Array<{ id: string }>;
                                docs?: Array<{ title?: string; url?: string }>;
                                oncalls?: Array<{ id: string }>;
                                links?: Array<{ title?: string; url?: string }>;
                                abbreviations?: Array<{ id?: string }>;
                                classifications?: Array<{
                                    id: string;
                                    father_id?: string;
                                }>;
                                images?: Array<{ token: string }>;
                            };
                            outer_info?: { provider: string; outer_id: string };
                            rich_text?: string;
                            i18n_descs?: Array<{
                                language: number;
                                description?: string;
                                rich_text?: string;
                            }>;
                        };
                        params?: {
                            repo_id?: string;
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
                                    draft?: {
                                        draft_id?: string;
                                        entity?: {
                                            id?: string;
                                            main_keys: Array<{
                                                key: string;
                                                display_status: {
                                                    allow_highlight: boolean;
                                                    allow_search: boolean;
                                                };
                                            }>;
                                            full_names?: Array<{
                                                key: string;
                                                display_status: {
                                                    allow_highlight: boolean;
                                                    allow_search: boolean;
                                                };
                                            }>;
                                            aliases?: Array<{
                                                key: string;
                                                display_status: {
                                                    allow_highlight: boolean;
                                                    allow_search: boolean;
                                                };
                                            }>;
                                            description?: string;
                                            creator?: string;
                                            create_time?: string;
                                            updater?: string;
                                            update_time?: string;
                                            related_meta?: {
                                                users?: Array<{
                                                    id: string;
                                                    title?: string;
                                                    url?: string;
                                                }>;
                                                chats?: Array<{
                                                    id: string;
                                                    title?: string;
                                                    url?: string;
                                                }>;
                                                docs?: Array<{
                                                    title?: string;
                                                    url?: string;
                                                }>;
                                                oncalls?: Array<{
                                                    id: string;
                                                    title?: string;
                                                    url?: string;
                                                }>;
                                                links?: Array<{
                                                    title?: string;
                                                    url?: string;
                                                }>;
                                                abbreviations?: Array<{
                                                    id?: string;
                                                }>;
                                                classifications?: Array<{
                                                    id: string;
                                                    father_id?: string;
                                                }>;
                                                images?: Array<{
                                                    token: string;
                                                }>;
                                            };
                                            statistics?: {
                                                like_count: number;
                                                dislike_count: number;
                                            };
                                            outer_info?: {
                                                provider: string;
                                                outer_id: string;
                                            };
                                            rich_text?: string;
                                            source?: number;
                                            i18n_descs?: Array<{
                                                language: number;
                                                description?: string;
                                                rich_text?: string;
                                            }>;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/drafts`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=draft&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=lingo&resource=draft&version=v1 document }
                 */
                update: async (
                    payload?: {
                        data: {
                            id?: string;
                            main_keys: Array<{
                                key: string;
                                display_status: {
                                    allow_highlight: boolean;
                                    allow_search: boolean;
                                };
                            }>;
                            full_names?: Array<{
                                key: string;
                                display_status: {
                                    allow_highlight: boolean;
                                    allow_search: boolean;
                                };
                            }>;
                            aliases?: Array<{
                                key: string;
                                display_status: {
                                    allow_highlight: boolean;
                                    allow_search: boolean;
                                };
                            }>;
                            description?: string;
                            related_meta?: {
                                users?: Array<{ id: string; title?: string }>;
                                chats?: Array<{ id: string }>;
                                docs?: Array<{ title?: string; url?: string }>;
                                oncalls?: Array<{ id: string }>;
                                links?: Array<{ title?: string; url?: string }>;
                                abbreviations?: Array<{ id?: string }>;
                                classifications?: Array<{
                                    id: string;
                                    father_id?: string;
                                }>;
                                images?: Array<{ token: string }>;
                            };
                            rich_text?: string;
                            i18n_descs?: Array<{
                                language: number;
                                description?: string;
                                rich_text?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { draft_id: string };
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
                                    draft?: {
                                        draft_id?: string;
                                        entity?: {
                                            id?: string;
                                            main_keys: Array<{
                                                key: string;
                                                display_status: {
                                                    allow_highlight: boolean;
                                                    allow_search: boolean;
                                                };
                                            }>;
                                            full_names?: Array<{
                                                key: string;
                                                display_status: {
                                                    allow_highlight: boolean;
                                                    allow_search: boolean;
                                                };
                                            }>;
                                            aliases?: Array<{
                                                key: string;
                                                display_status: {
                                                    allow_highlight: boolean;
                                                    allow_search: boolean;
                                                };
                                            }>;
                                            description?: string;
                                            creator?: string;
                                            create_time?: string;
                                            updater?: string;
                                            update_time?: string;
                                            related_meta?: {
                                                users?: Array<{
                                                    id: string;
                                                    title?: string;
                                                    url?: string;
                                                }>;
                                                chats?: Array<{
                                                    id: string;
                                                    title?: string;
                                                    url?: string;
                                                }>;
                                                docs?: Array<{
                                                    title?: string;
                                                    url?: string;
                                                }>;
                                                oncalls?: Array<{
                                                    id: string;
                                                    title?: string;
                                                    url?: string;
                                                }>;
                                                links?: Array<{
                                                    title?: string;
                                                    url?: string;
                                                }>;
                                                abbreviations?: Array<{
                                                    id?: string;
                                                }>;
                                                classifications?: Array<{
                                                    id: string;
                                                    father_id?: string;
                                                }>;
                                                images?: Array<{
                                                    token: string;
                                                }>;
                                            };
                                            statistics?: {
                                                like_count: number;
                                                dislike_count: number;
                                            };
                                            outer_info?: {
                                                provider: string;
                                                outer_id: string;
                                            };
                                            rich_text?: string;
                                            source?: number;
                                            i18n_descs?: Array<{
                                                language: number;
                                                description?: string;
                                                rich_text?: string;
                                            }>;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/drafts/:draft_id`,
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
             * entity
             */
            entity: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=entity&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=lingo&resource=entity&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data: {
                            main_keys: Array<{
                                key: string;
                                display_status: {
                                    allow_highlight: boolean;
                                    allow_search: boolean;
                                };
                            }>;
                            full_names?: Array<{
                                key: string;
                                display_status: {
                                    allow_highlight: boolean;
                                    allow_search: boolean;
                                };
                            }>;
                            aliases?: Array<{
                                key: string;
                                display_status: {
                                    allow_highlight: boolean;
                                    allow_search: boolean;
                                };
                            }>;
                            description?: string;
                            related_meta?: {
                                users?: Array<{ id: string; title?: string }>;
                                chats?: Array<{ id: string }>;
                                docs?: Array<{ title?: string; url?: string }>;
                                oncalls?: Array<{ id: string }>;
                                links?: Array<{ title?: string; url?: string }>;
                                abbreviations?: Array<{ id?: string }>;
                                classifications?: Array<{
                                    id: string;
                                    father_id?: string;
                                }>;
                                images?: Array<{ token: string }>;
                            };
                            outer_info?: { provider: string; outer_id: string };
                            rich_text?: string;
                            i18n_descs?: Array<{
                                language: number;
                                description?: string;
                                rich_text?: string;
                            }>;
                        };
                        params?: {
                            repo_id?: string;
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
                                    entity?: {
                                        id?: string;
                                        main_keys: Array<{
                                            key: string;
                                            display_status: {
                                                allow_highlight: boolean;
                                                allow_search: boolean;
                                            };
                                        }>;
                                        full_names?: Array<{
                                            key: string;
                                            display_status: {
                                                allow_highlight: boolean;
                                                allow_search: boolean;
                                            };
                                        }>;
                                        aliases?: Array<{
                                            key: string;
                                            display_status: {
                                                allow_highlight: boolean;
                                                allow_search: boolean;
                                            };
                                        }>;
                                        description?: string;
                                        creator?: string;
                                        create_time?: string;
                                        updater?: string;
                                        update_time?: string;
                                        related_meta?: {
                                            users?: Array<{
                                                id: string;
                                                title?: string;
                                                url?: string;
                                            }>;
                                            chats?: Array<{
                                                id: string;
                                                title?: string;
                                                url?: string;
                                            }>;
                                            docs?: Array<{
                                                title?: string;
                                                url?: string;
                                            }>;
                                            oncalls?: Array<{
                                                id: string;
                                                title?: string;
                                                url?: string;
                                            }>;
                                            links?: Array<{
                                                title?: string;
                                                url?: string;
                                            }>;
                                            abbreviations?: Array<{
                                                id?: string;
                                            }>;
                                            classifications?: Array<{
                                                id: string;
                                                father_id?: string;
                                            }>;
                                            images?: Array<{ token: string }>;
                                        };
                                        statistics?: {
                                            like_count: number;
                                            dislike_count: number;
                                        };
                                        outer_info?: {
                                            provider: string;
                                            outer_id: string;
                                        };
                                        rich_text?: string;
                                        source?: number;
                                        i18n_descs?: Array<{
                                            language: number;
                                            description?: string;
                                            rich_text?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/entities`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=entity&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=lingo&resource=entity&version=v1 document }
                 */
                delete: async (
                    payload?: {
                        params?: { provider?: string; outer_id?: string };
                        path: { entity_id: string };
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
                                `${this.domain}/open-apis/lingo/v1/entities/:entity_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=entity&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=lingo&resource=entity&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params?: {
                            provider?: string;
                            outer_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { entity_id?: string };
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
                                    entity?: {
                                        id?: string;
                                        main_keys: Array<{
                                            key: string;
                                            display_status: {
                                                allow_highlight: boolean;
                                                allow_search: boolean;
                                            };
                                        }>;
                                        full_names?: Array<{
                                            key: string;
                                            display_status: {
                                                allow_highlight: boolean;
                                                allow_search: boolean;
                                            };
                                        }>;
                                        aliases?: Array<{
                                            key: string;
                                            display_status: {
                                                allow_highlight: boolean;
                                                allow_search: boolean;
                                            };
                                        }>;
                                        description?: string;
                                        creator?: string;
                                        create_time?: string;
                                        updater?: string;
                                        update_time?: string;
                                        related_meta?: {
                                            users?: Array<{
                                                id: string;
                                                title?: string;
                                                url?: string;
                                            }>;
                                            chats?: Array<{
                                                id: string;
                                                title?: string;
                                                url?: string;
                                            }>;
                                            docs?: Array<{
                                                title?: string;
                                                url?: string;
                                            }>;
                                            oncalls?: Array<{
                                                id: string;
                                                title?: string;
                                                url?: string;
                                            }>;
                                            links?: Array<{
                                                title?: string;
                                                url?: string;
                                            }>;
                                            abbreviations?: Array<{
                                                id?: string;
                                            }>;
                                            classifications?: Array<{
                                                id: string;
                                                father_id?: string;
                                            }>;
                                            images?: Array<{ token: string }>;
                                        };
                                        statistics?: {
                                            like_count: number;
                                            dislike_count: number;
                                        };
                                        outer_info?: {
                                            provider: string;
                                            outer_id: string;
                                        };
                                        rich_text?: string;
                                        source?: number;
                                        i18n_descs?: Array<{
                                            language: number;
                                            description?: string;
                                            rich_text?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/entities/:entity_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=entity&apiName=highlight&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=highlight&project=lingo&resource=entity&version=v1 document }
                 */
                highlight: async (
                    payload?: {
                        data: { text: string };
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
                                    phrases?: Array<{
                                        name: string;
                                        entity_ids: Array<string>;
                                        span: { start: number; end: number };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/entities/highlight`,
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
                            provider?: string;
                            repo_id?: string;
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
                                    `${this.domain}/open-apis/lingo/v1/entities`,
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
                                                    entities?: Array<{
                                                        id?: string;
                                                        main_keys: Array<{
                                                            key: string;
                                                            display_status: {
                                                                allow_highlight: boolean;
                                                                allow_search: boolean;
                                                            };
                                                        }>;
                                                        full_names?: Array<{
                                                            key: string;
                                                            display_status: {
                                                                allow_highlight: boolean;
                                                                allow_search: boolean;
                                                            };
                                                        }>;
                                                        aliases?: Array<{
                                                            key: string;
                                                            display_status: {
                                                                allow_highlight: boolean;
                                                                allow_search: boolean;
                                                            };
                                                        }>;
                                                        description?: string;
                                                        creator?: string;
                                                        create_time?: string;
                                                        updater?: string;
                                                        update_time?: string;
                                                        related_meta?: {
                                                            users?: Array<{
                                                                id: string;
                                                                title?: string;
                                                                url?: string;
                                                            }>;
                                                            chats?: Array<{
                                                                id: string;
                                                                title?: string;
                                                                url?: string;
                                                            }>;
                                                            docs?: Array<{
                                                                title?: string;
                                                                url?: string;
                                                            }>;
                                                            oncalls?: Array<{
                                                                id: string;
                                                                title?: string;
                                                                url?: string;
                                                            }>;
                                                            links?: Array<{
                                                                title?: string;
                                                                url?: string;
                                                            }>;
                                                            abbreviations?: Array<{
                                                                id?: string;
                                                            }>;
                                                            classifications?: Array<{
                                                                id: string;
                                                                father_id?: string;
                                                            }>;
                                                            images?: Array<{
                                                                token: string;
                                                            }>;
                                                        };
                                                        statistics?: {
                                                            like_count: number;
                                                            dislike_count: number;
                                                        };
                                                        outer_info?: {
                                                            provider: string;
                                                            outer_id: string;
                                                        };
                                                        rich_text?: string;
                                                        source?: number;
                                                        i18n_descs?: Array<{
                                                            language: number;
                                                            description?: string;
                                                            rich_text?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=entity&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=lingo&resource=entity&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            provider?: string;
                            repo_id?: string;
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
                                    entities?: Array<{
                                        id?: string;
                                        main_keys: Array<{
                                            key: string;
                                            display_status: {
                                                allow_highlight: boolean;
                                                allow_search: boolean;
                                            };
                                        }>;
                                        full_names?: Array<{
                                            key: string;
                                            display_status: {
                                                allow_highlight: boolean;
                                                allow_search: boolean;
                                            };
                                        }>;
                                        aliases?: Array<{
                                            key: string;
                                            display_status: {
                                                allow_highlight: boolean;
                                                allow_search: boolean;
                                            };
                                        }>;
                                        description?: string;
                                        creator?: string;
                                        create_time?: string;
                                        updater?: string;
                                        update_time?: string;
                                        related_meta?: {
                                            users?: Array<{
                                                id: string;
                                                title?: string;
                                                url?: string;
                                            }>;
                                            chats?: Array<{
                                                id: string;
                                                title?: string;
                                                url?: string;
                                            }>;
                                            docs?: Array<{
                                                title?: string;
                                                url?: string;
                                            }>;
                                            oncalls?: Array<{
                                                id: string;
                                                title?: string;
                                                url?: string;
                                            }>;
                                            links?: Array<{
                                                title?: string;
                                                url?: string;
                                            }>;
                                            abbreviations?: Array<{
                                                id?: string;
                                            }>;
                                            classifications?: Array<{
                                                id: string;
                                                father_id?: string;
                                            }>;
                                            images?: Array<{ token: string }>;
                                        };
                                        statistics?: {
                                            like_count: number;
                                            dislike_count: number;
                                        };
                                        outer_info?: {
                                            provider: string;
                                            outer_id: string;
                                        };
                                        rich_text?: string;
                                        source?: number;
                                        i18n_descs?: Array<{
                                            language: number;
                                            description?: string;
                                            rich_text?: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/entities`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=entity&apiName=match&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=match&project=lingo&resource=entity&version=v1 document }
                 */
                match: async (
                    payload?: {
                        data: { word: string };
                        params?: { repo_id?: string };
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
                                    results?: Array<{
                                        entity_id?: string;
                                        type?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/entities/match`,
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
                searchWithIterator: async (
                    payload?: {
                        data?: {
                            query?: string;
                            classification_filter?: {
                                include?: Array<string>;
                                exclude?: Array<string>;
                            };
                            sources?: Array<number>;
                            creators?: Array<string>;
                        };
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            repo_id?: string;
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
                                    `${this.domain}/open-apis/lingo/v1/entities/search`,
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
                                                    entities?: Array<{
                                                        id?: string;
                                                        main_keys: Array<{
                                                            key: string;
                                                            display_status: {
                                                                allow_highlight: boolean;
                                                                allow_search: boolean;
                                                            };
                                                        }>;
                                                        full_names?: Array<{
                                                            key: string;
                                                            display_status: {
                                                                allow_highlight: boolean;
                                                                allow_search: boolean;
                                                            };
                                                        }>;
                                                        aliases?: Array<{
                                                            key: string;
                                                            display_status: {
                                                                allow_highlight: boolean;
                                                                allow_search: boolean;
                                                            };
                                                        }>;
                                                        description?: string;
                                                        creator?: string;
                                                        create_time?: string;
                                                        updater?: string;
                                                        update_time?: string;
                                                        related_meta?: {
                                                            users?: Array<{
                                                                id: string;
                                                                title?: string;
                                                                url?: string;
                                                            }>;
                                                            chats?: Array<{
                                                                id: string;
                                                                title?: string;
                                                                url?: string;
                                                            }>;
                                                            docs?: Array<{
                                                                title?: string;
                                                                url?: string;
                                                            }>;
                                                            oncalls?: Array<{
                                                                id: string;
                                                                title?: string;
                                                                url?: string;
                                                            }>;
                                                            links?: Array<{
                                                                title?: string;
                                                                url?: string;
                                                            }>;
                                                            abbreviations?: Array<{
                                                                id?: string;
                                                            }>;
                                                            classifications?: Array<{
                                                                id: string;
                                                                father_id?: string;
                                                            }>;
                                                            images?: Array<{
                                                                token: string;
                                                            }>;
                                                        };
                                                        statistics?: {
                                                            like_count: number;
                                                            dislike_count: number;
                                                        };
                                                        outer_info?: {
                                                            provider: string;
                                                            outer_id: string;
                                                        };
                                                        rich_text?: string;
                                                        source?: number;
                                                        i18n_descs?: Array<{
                                                            language: number;
                                                            description?: string;
                                                            rich_text?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=entity&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=lingo&resource=entity&version=v1 document }
                 */
                search: async (
                    payload?: {
                        data?: {
                            query?: string;
                            classification_filter?: {
                                include?: Array<string>;
                                exclude?: Array<string>;
                            };
                            sources?: Array<number>;
                            creators?: Array<string>;
                        };
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            repo_id?: string;
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
                                    entities?: Array<{
                                        id?: string;
                                        main_keys: Array<{
                                            key: string;
                                            display_status: {
                                                allow_highlight: boolean;
                                                allow_search: boolean;
                                            };
                                        }>;
                                        full_names?: Array<{
                                            key: string;
                                            display_status: {
                                                allow_highlight: boolean;
                                                allow_search: boolean;
                                            };
                                        }>;
                                        aliases?: Array<{
                                            key: string;
                                            display_status: {
                                                allow_highlight: boolean;
                                                allow_search: boolean;
                                            };
                                        }>;
                                        description?: string;
                                        creator?: string;
                                        create_time?: string;
                                        updater?: string;
                                        update_time?: string;
                                        related_meta?: {
                                            users?: Array<{
                                                id: string;
                                                title?: string;
                                                url?: string;
                                            }>;
                                            chats?: Array<{
                                                id: string;
                                                title?: string;
                                                url?: string;
                                            }>;
                                            docs?: Array<{
                                                title?: string;
                                                url?: string;
                                            }>;
                                            oncalls?: Array<{
                                                id: string;
                                                title?: string;
                                                url?: string;
                                            }>;
                                            links?: Array<{
                                                title?: string;
                                                url?: string;
                                            }>;
                                            abbreviations?: Array<{
                                                id?: string;
                                            }>;
                                            classifications?: Array<{
                                                id: string;
                                                father_id?: string;
                                            }>;
                                            images?: Array<{ token: string }>;
                                        };
                                        statistics?: {
                                            like_count: number;
                                            dislike_count: number;
                                        };
                                        outer_info?: {
                                            provider: string;
                                            outer_id: string;
                                        };
                                        rich_text?: string;
                                        source?: number;
                                        i18n_descs?: Array<{
                                            language: number;
                                            description?: string;
                                            rich_text?: string;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/entities/search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=entity&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=lingo&resource=entity&version=v1 document }
                 */
                update: async (
                    payload?: {
                        data: {
                            main_keys: Array<{
                                key: string;
                                display_status: {
                                    allow_highlight: boolean;
                                    allow_search: boolean;
                                };
                            }>;
                            full_names?: Array<{
                                key: string;
                                display_status: {
                                    allow_highlight: boolean;
                                    allow_search: boolean;
                                };
                            }>;
                            aliases?: Array<{
                                key: string;
                                display_status: {
                                    allow_highlight: boolean;
                                    allow_search: boolean;
                                };
                            }>;
                            description?: string;
                            related_meta?: {
                                users?: Array<{ id: string; title?: string }>;
                                chats?: Array<{ id: string }>;
                                docs?: Array<{ title?: string; url?: string }>;
                                oncalls?: Array<{ id: string }>;
                                links?: Array<{ title?: string; url?: string }>;
                                abbreviations?: Array<{ id?: string }>;
                                classifications?: Array<{
                                    id: string;
                                    father_id?: string;
                                }>;
                                images?: Array<{ token: string }>;
                            };
                            outer_info?: { provider: string; outer_id: string };
                            rich_text?: string;
                            i18n_descs?: Array<{
                                language: number;
                                description?: string;
                                rich_text?: string;
                            }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { entity_id?: string };
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
                                    entity?: {
                                        id?: string;
                                        main_keys: Array<{
                                            key: string;
                                            display_status: {
                                                allow_highlight: boolean;
                                                allow_search: boolean;
                                            };
                                        }>;
                                        full_names?: Array<{
                                            key: string;
                                            display_status: {
                                                allow_highlight: boolean;
                                                allow_search: boolean;
                                            };
                                        }>;
                                        aliases?: Array<{
                                            key: string;
                                            display_status: {
                                                allow_highlight: boolean;
                                                allow_search: boolean;
                                            };
                                        }>;
                                        description?: string;
                                        creator?: string;
                                        create_time?: string;
                                        updater?: string;
                                        update_time?: string;
                                        related_meta?: {
                                            users?: Array<{
                                                id: string;
                                                title?: string;
                                                url?: string;
                                            }>;
                                            chats?: Array<{
                                                id: string;
                                                title?: string;
                                                url?: string;
                                            }>;
                                            docs?: Array<{
                                                title?: string;
                                                url?: string;
                                            }>;
                                            oncalls?: Array<{
                                                id: string;
                                                title?: string;
                                                url?: string;
                                            }>;
                                            links?: Array<{
                                                title?: string;
                                                url?: string;
                                            }>;
                                            abbreviations?: Array<{
                                                id?: string;
                                            }>;
                                            classifications?: Array<{
                                                id: string;
                                                father_id?: string;
                                            }>;
                                            images?: Array<{ token: string }>;
                                        };
                                        statistics?: {
                                            like_count: number;
                                            dislike_count: number;
                                        };
                                        outer_info?: {
                                            provider: string;
                                            outer_id: string;
                                        };
                                        rich_text?: string;
                                        source?: number;
                                        i18n_descs?: Array<{
                                            language: number;
                                            description?: string;
                                            rich_text?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/entities/:entity_id`,
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
             * file
             */
            file: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=file&apiName=download&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download&project=lingo&resource=file&version=v1 document }
                 */
                download: async (
                    payload?: {
                        path?: { file_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/files/:file_token/download`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                            $return_headers: true,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    const checkIsReadable = () => {
                        const consumedError =
                            "The stream has already been consumed";
                        if (!res.data.readable) {
                            this.logger.error(consumedError);
                            throw new Error(consumedError);
                        }
                    };

                    return {
                        writeFile: async (filePath: string) => {
                            checkIsReadable();
                            return new Promise((resolve, reject) => {
                                const writableStream =
                                    fs.createWriteStream(filePath);
                                writableStream.on("finish", () => {
                                    resolve(filePath);
                                });
                                writableStream.on("error", (e) => {
                                    reject(e);
                                });
                                res.data.pipe(writableStream);
                            });
                        },
                        getReadableStream: () => {
                            checkIsReadable();
                            return res.data as Readable;
                        },
                        headers: res.headers,
                    };
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=file&apiName=upload&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=lingo&resource=file&version=v1 document }
                 */
                upload: async (
                    payload?: {
                        data: { name: string; file: Buffer | fs.ReadStream };
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
                                data?: { file_token?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/files/upload`,
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
             * repo
             */
            repo: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=repo&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=lingo&resource=repo&version=v1 document }
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
                                    items?: Array<{ id: string; name: string }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/repos`,
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
