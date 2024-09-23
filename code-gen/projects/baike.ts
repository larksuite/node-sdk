import identity from "lodash.identity";
import pickBy from "lodash.pickby";
import get from "lodash.get";
import fs from "fs";
import { fillApiPath } from "@node-sdk/utils";
import { Logger } from "@node-sdk/typings";
import { formatErrors } from "@node-sdk/client/utils";
import { IRequestOptions } from "@node-sdk/code-gen/types";
import { IPayload } from "@node-sdk/client/types";
import { HttpInstance } from "@node-sdk/typings/http";
import { Readable } from "stream";
import aweme_ecosystem from "./aweme_ecosystem";

// auto gen
export default abstract class Client extends aweme_ecosystem {
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
     * 企业百科
     */
    baike = {
        /**
         * 分类
         */
        classification: {
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
                                `${this.domain}/open-apis/baike/v1/classifications`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
                                        {
                                            code?: number;
                                            msg?: string;
                                            data?: {
                                                items?: Array<{
                                                    id: string;
                                                    name?: string;
                                                    father_id?: string;
                                                }>;
                                                page_token?: string;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=baike&resource=classification&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/classification/list document }
             *
             * 获取百科分类
             *
             * 获取企业百科当前分类。;企业百科目前为二级分类体系，每个词条可添加多个二级分类，但每个一级分类下只能添加一个分类。
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
                                    name?: string;
                                    father_id?: string;
                                }>;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/baike/v1/classifications`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 草稿
         */
        draft: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=baike&resource=draft&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/draft/create document }
             *
             * 创建草稿
             *
             * 草稿并非百科词条，而是指通过 API 发起创建新词条或更新现有词条的申请。百科管理员审核通过后，草稿将变为新的词条或覆盖已有词条。
             *
             * · 创建新的百科词条时，无需传入 entity_id 字段;· 更新已有百科词条时，请传入对应词条的 entity_id 或 outer_info
             *
             * 以用户身份创建草稿（即 Authorization 使用 user_access_token），对应用户将收到由企业百科 Bot 发送的审核结果；以应用身份创建草稿（即 Authorization 使用 tenant_access_toke），不会收到任何通知。
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
                                                name?: string;
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
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/baike/v1/drafts`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=baike&resource=draft&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/draft/update document }
             *
             * 更新草稿
             *
             * 根据 draft_id 更新草稿内容，已审批的草稿无法编辑
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
                                                name?: string;
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
                                    };
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/baike/v1/drafts/:draft_id`,
                            path
                        ),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 词条
         */
        entity: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/create document }
             *
             * 创建免审词条
             *
             * 通过此接口创建的词条，不需要百科管理员审核可直接写入词库，请慎重使用【租户管理员请慎重审批】。
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
                                        abbreviations?: Array<{ id?: string }>;
                                        classifications?: Array<{
                                            id: string;
                                            name?: string;
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
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/baike/v1/entities`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=extract&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/extract document }
             *
             * 提取潜在的百科词条
             *
             * 提取文本中可能成为百科词条的词语，且不会过滤已经成为百科词条的词语。同时，会返回推荐的别名。
             */
            extract: async (
                payload?: {
                    data?: { text?: string };
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
                                entity_word: Array<{
                                    name: string;
                                    aliases?: Array<string>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/baike/v1/entities/extract`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/get document }
             *
             * 获取词条详情
             *
             * 通过词条 id 拉取对应的词条详情信息。
             *
             * 也支持通过 provider 和 outer_id 返回对应实体的详情数据。此时路径中的 entity_id 为固定的 enterprise_0
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
                                        abbreviations?: Array<{ id?: string }>;
                                        classifications?: Array<{
                                            id: string;
                                            name?: string;
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
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/baike/v1/entities/:entity_id`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=highlight&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/highlight document }
             *
             * 词条高亮
             *
             * 传入一句话，智能识别句中对应的词条，并返回词条位置和 entity_id，可在外部系统中快速实现百科词条智能高亮。
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
                            `${this.domain}/open-apis/baike/v1/entities/highlight`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
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
                                `${this.domain}/open-apis/baike/v1/entities`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
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
                                                            name?: string;
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
                                                }>;
                                                page_token?: string;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/list document }
             *
             * 获取词条列表
             *
             * 分页拉取词条列表数据，支持拉取租户内的全部词条。
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        provider?: string;
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
                                        abbreviations?: Array<{ id?: string }>;
                                        classifications?: Array<{
                                            id: string;
                                            name?: string;
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
                                }>;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/baike/v1/entities`,
                            path
                        ),
                        method: "GET",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=match&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/match document }
             *
             * 精准搜索词条
             *
             * 将关键词与词条名、别名精准匹配，并返回对应的 词条 ID。
             */
            match: async (
                payload?: {
                    data: { word: string };
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
                            `${this.domain}/open-apis/baike/v1/entities/match`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
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
                                `${this.domain}/open-apis/baike/v1/entities/search`,
                                path
                            ),
                            method: "POST",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
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
                                    get<
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
                                                            name?: string;
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
                                                }>;
                                                page_token?: string;
                                            };
                                        },
                                        "data"
                                    >(res, "data") || {};

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
             * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/search document }
             *
             * 模糊搜索词条
             *
             * 传入关键词，与词条名、别名、释义等信息进行模糊匹配，返回搜到的词条信息。
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
                                        abbreviations?: Array<{ id?: string }>;
                                        classifications?: Array<{
                                            id: string;
                                            name?: string;
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
                                }>;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/baike/v1/entities/search`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/update document }
             *
             * 更新免审词条
             *
             * 通过此接口更新已有的词条，不需要百科管理员审核可直接写入词库，请慎重使用【租户管理员请慎重审批】。
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
                                        abbreviations?: Array<{ id?: string }>;
                                        classifications?: Array<{
                                            id: string;
                                            name?: string;
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
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/baike/v1/entities/:entity_id`,
                            path
                        ),
                        method: "PUT",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * 文件
         */
        file: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=baike&resource=file&apiName=download&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/file/download document }
             *
             * 图片下载
             *
             * 通过 file_token 下载原图片
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
                            `${this.domain}/open-apis/baike/v1/files/:file_token/download`,
                            path
                        ),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                const checkIsReadable = () => {
                    const consumedError =
                        "The stream has already been consumed";
                    if (!res.readable) {
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
                            res.pipe(writableStream);
                        });
                    },
                    getReadableStream: () => {
                        checkIsReadable();
                        return res as Readable;
                    },
                };
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=baike&resource=file&apiName=upload&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/file/upload document }
             *
             * 图片上传
             *
             * 百科词条图片资源上传。
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
                            `${this.domain}/open-apis/baike/v1/files/upload`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers: {
                            ...headers,
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                return get(res, "data", null);
            },
        },
        v1: {
            /**
             * 分类
             */
            classification: {
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
                                    `${this.domain}/open-apis/baike/v1/classifications`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        id: string;
                                                        name?: string;
                                                        father_id?: string;
                                                    }>;
                                                    page_token?: string;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=classification&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/classification/list document }
                 *
                 * 获取百科分类
                 *
                 * 获取企业百科当前分类。;企业百科目前为二级分类体系，每个词条可添加多个二级分类，但每个一级分类下只能添加一个分类。
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
                                        name?: string;
                                        father_id?: string;
                                    }>;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/baike/v1/classifications`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 草稿
             */
            draft: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=draft&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/draft/create document }
                 *
                 * 创建草稿
                 *
                 * 草稿并非百科词条，而是指通过 API 发起创建新词条或更新现有词条的申请。百科管理员审核通过后，草稿将变为新的词条或覆盖已有词条。
                 *
                 * · 创建新的百科词条时，无需传入 entity_id 字段;· 更新已有百科词条时，请传入对应词条的 entity_id 或 outer_info
                 *
                 * 以用户身份创建草稿（即 Authorization 使用 user_access_token），对应用户将收到由企业百科 Bot 发送的审核结果；以应用身份创建草稿（即 Authorization 使用 tenant_access_toke），不会收到任何通知。
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
                                                    name?: string;
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
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/baike/v1/drafts`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=draft&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/draft/update document }
                 *
                 * 更新草稿
                 *
                 * 根据 draft_id 更新草稿内容，已审批的草稿无法编辑
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
                                                    name?: string;
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
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/baike/v1/drafts/:draft_id`,
                                path
                            ),
                            method: "PUT",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 词条
             */
            entity: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/create document }
                 *
                 * 创建免审词条
                 *
                 * 通过此接口创建的词条，不需要百科管理员审核可直接写入词库，请慎重使用【租户管理员请慎重审批】。
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
                                                name?: string;
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
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/baike/v1/entities`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=extract&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/extract document }
                 *
                 * 提取潜在的百科词条
                 *
                 * 提取文本中可能成为百科词条的词语，且不会过滤已经成为百科词条的词语。同时，会返回推荐的别名。
                 */
                extract: async (
                    payload?: {
                        data?: { text?: string };
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
                                    entity_word: Array<{
                                        name: string;
                                        aliases?: Array<string>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/baike/v1/entities/extract`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/get document }
                 *
                 * 获取词条详情
                 *
                 * 通过词条 id 拉取对应的词条详情信息。
                 *
                 * 也支持通过 provider 和 outer_id 返回对应实体的详情数据。此时路径中的 entity_id 为固定的 enterprise_0
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
                                                name?: string;
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
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/baike/v1/entities/:entity_id`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=highlight&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/highlight document }
                 *
                 * 词条高亮
                 *
                 * 传入一句话，智能识别句中对应的词条，并返回词条位置和 entity_id，可在外部系统中快速实现百科词条智能高亮。
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
                                `${this.domain}/open-apis/baike/v1/entities/highlight`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
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
                                    `${this.domain}/open-apis/baike/v1/entities`,
                                    path
                                ),
                                method: "GET",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
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
                                                                name?: string;
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
                                                    }>;
                                                    page_token?: string;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/list document }
                 *
                 * 获取词条列表
                 *
                 * 分页拉取词条列表数据，支持拉取租户内的全部词条。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            provider?: string;
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
                                                name?: string;
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
                                    }>;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/baike/v1/entities`,
                                path
                            ),
                            method: "GET",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=match&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/match document }
                 *
                 * 精准搜索词条
                 *
                 * 将关键词与词条名、别名精准匹配，并返回对应的 词条 ID。
                 */
                match: async (
                    payload?: {
                        data: { word: string };
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
                                `${this.domain}/open-apis/baike/v1/entities/match`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
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
                                    `${this.domain}/open-apis/baike/v1/entities/search`,
                                    path
                                ),
                                method: "POST",
                                headers: pickBy(innerPayload.headers, identity),
                                params: pickBy(innerPayload.params, identity),
                                data,
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
                                        get<
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
                                                                name?: string;
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
                                                    }>;
                                                    page_token?: string;
                                                };
                                            },
                                            "data"
                                        >(res, "data") || {};

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
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/search document }
                 *
                 * 模糊搜索词条
                 *
                 * 传入关键词，与词条名、别名、释义等信息进行模糊匹配，返回搜到的词条信息。
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
                                                name?: string;
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
                                    }>;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/baike/v1/entities/search`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=entity&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/entity/update document }
                 *
                 * 更新免审词条
                 *
                 * 通过此接口更新已有的词条，不需要百科管理员审核可直接写入词库，请慎重使用【租户管理员请慎重审批】。
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
                                                name?: string;
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
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/baike/v1/entities/:entity_id`,
                                path
                            ),
                            method: "PUT",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * 文件
             */
            file: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=file&apiName=download&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/file/download document }
                 *
                 * 图片下载
                 *
                 * 通过 file_token 下载原图片
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
                                `${this.domain}/open-apis/baike/v1/files/:file_token/download`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    const checkIsReadable = () => {
                        const consumedError =
                            "The stream has already been consumed";
                        if (!res.readable) {
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
                                res.pipe(writableStream);
                            });
                        },
                        getReadableStream: () => {
                            checkIsReadable();
                            return res as Readable;
                        },
                    };
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=baike&resource=file&apiName=upload&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/baike-v1/file/upload document }
                 *
                 * 图片上传
                 *
                 * 百科词条图片资源上传。
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
                                `${this.domain}/open-apis/baike/v1/files/upload`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    return get(res, "data", null);
                },
            },
        },
    };
}
