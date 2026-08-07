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
import laps from "./laps";

// auto gen
export default abstract class Client extends laps {
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
             * file
             */
            file: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=file&apiName=download&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download&project=lingo&resource=file&version=v1 document }
                 *
                 * 下载图片
                 *
                 * 通过 file_token 下载原图片。
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
                 *
                 * 上传图片
                 *
                 * 词条图片资源上传。
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
             * statistical_report
             */
            statisticalReport: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=statistical_report&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=lingo&resource=statistical_report&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params: { date_interval: number };
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
                                    statistical_report?: {
                                        date_interval: number;
                                        word_info?: {
                                            input_total?: number;
                                            dedup_input_total?: number;
                                            eachday_input?: Array<number>;
                                            eachday_dedup_input?: Array<number>;
                                            send_message_total?: number;
                                            send_en_message_total?: number;
                                            receive_message_total?: number;
                                            receive_en_message_total?: number;
                                            history_words_total?: number;
                                            new_words_total?: number;
                                            eachday_send_en_message?: Array<number>;
                                            eachday_send_message?: Array<number>;
                                            eachday_receive_en_message?: Array<number>;
                                            eachday_receive_message?: Array<number>;
                                            send_eng_message_rate_ring_growth?: number;
                                            send_eng_words_ring_growth?: number;
                                        };
                                        correct_info?: {
                                            correct_total?: number;
                                            eachday_correct?: Array<number>;
                                            grammar_error?: {
                                                type?: number;
                                                total?: number;
                                                correct_pairs?: Array<{
                                                    source_text?: string;
                                                    target_text?: string;
                                                    total?: number;
                                                }>;
                                            };
                                            spell_error?: {
                                                type?: number;
                                                total?: number;
                                                correct_pairs?: Array<{
                                                    source_text?: string;
                                                    target_text?: string;
                                                    total?: number;
                                                }>;
                                            };
                                            noun_error?: {
                                                type?: number;
                                                total?: number;
                                                correct_pairs?: Array<{
                                                    source_text?: string;
                                                    target_text?: string;
                                                    total?: number;
                                                }>;
                                            };
                                            verb_tense_error?: {
                                                type?: number;
                                                total?: number;
                                                correct_pairs?: Array<{
                                                    source_text?: string;
                                                    target_text?: string;
                                                    total?: number;
                                                }>;
                                            };
                                        };
                                        update_date: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/statistical_report`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=statistical_report&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=lingo&resource=statistical_report&version=v1 document }
                 */
                create: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/statistical_report`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=statistical_report&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=lingo&resource=statistical_report&version=v1 document }
                 */
                delete: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/statistical_report`,
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
             * entity
             */
            entity: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=entity&apiName=extract&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=extract&project=lingo&resource=entity&version=v1 document }
                 *
                 * 提取潜在的词条
                 *
                 * 提取文本中可能成为词条的词语，且不会过滤已经成为词条的词语。同时返回推荐的别名。
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
                                `${this.domain}/open-apis/lingo/v1/entities/extract`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=entity&apiName=match&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=match&project=lingo&resource=entity&version=v1 document }
                 *
                 * 精准搜索词条
                 *
                 * 将关键词与词条名、别名精准匹配，并返回对应的 词条 ID。
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=entity&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=lingo&resource=entity&version=v1 document }
                 *
                 * 获取词条详情
                 *
                 * 通过词条 id 拉取对应的词条详情信息。
                 */
                get: async (
                    payload?: {
                        params?: {
                            provider?: string;
                            outer_id?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { entity_id?: string; repo_id?: string };
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
                 *
                 * 词条高亮
                 *
                 * 传入一句话，智能识别句中对应的词条，并返回词条位置和 entity_id，可在外部系统中快速实现词条智能高亮。
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=entity&apiName=batch_highlight&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_highlight&project=lingo&resource=entity&version=v1 document }
                 *
                 * 批量高亮词条
                 *
                 * 通过这个接口，可以传入一段文本，获取这段文本中所有词条的 ID
                 */
                batchHighlight: async (
                    payload?: {
                        data: { texts: Array<string> };
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
                                    phrases?: Array<
                                        Array<{
                                            name: string;
                                            entity_ids: Array<string>;
                                            span: {
                                                start: number;
                                                end: number;
                                            };
                                        }>
                                    >;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/entities/batch_highlight`,
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
                 *
                 * 获取词条列表
                 *
                 * 分页拉取词条列表数据，支持拉取租户内(或指定词库内)的全部词条。
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
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=entity&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=lingo&resource=entity&version=v1 document }
                 *
                 * 删除免审词条
                 *
                 * 通过 entity_id 删除已有的词条，无需经过词典管理员审核。因此，调用该接口时应当慎重操作。
                 *
                 * 也支持通过 provider 和 outer_id 删除对应的词条。此时路径中的 entity_id 为固定的 enterprise_0
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
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=entity&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=lingo&resource=entity&version=v1 document }
                 *
                 * 创建免审词条
                 *
                 * 通过此接口创建的词条，无需经过词典管理员审核，直接写入词库。因此，调用此接口时，应当慎重操作。
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
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=entity&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=lingo&resource=entity&version=v1 document }
                 *
                 * 更新免审词条
                 *
                 * 通过此接口更新已有的词条，无需经过词典管理员审核，直接写入词库。因此，调用该接口时应当慎重操作。
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
             * repo
             */
            repo: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=repo&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=lingo&resource=repo&version=v1 document }
                 *
                 * 获取词库列表
                 *
                 * 获取有权限访问的飞书词典词库列表。;;如以应用身份获取，需要在“词库设置”页面添加应用；若以用户身份获取，该用户需要拥有对应词库的可见权限。
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
            /**
             * entity_card
             */
            entityCard: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=entity_card&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=lingo&resource=entity_card&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params?: {
                            entity_ids?: Array<string>;
                            key?: string;
                            is_group?: boolean;
                            render_type?: number;
                            biz?: string;
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
                                    cards?: Array<{
                                        card: string;
                                        id: string;
                                        key?: string;
                                        card_type?: number;
                                        template_name?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/entity_card`,
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
             * aigc
             */
            aigc: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=lingo&resource=aigc&apiName=generate_entity&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=generate_entity&project=lingo&resource=aigc&version=v1 document }
                 */
                generateEntity: async (
                    payload?: {
                        data?: {
                            data_type?: number;
                            config?: {
                                need_review?: boolean;
                                repo_id?: string;
                            };
                            doc_data?: {
                                doc_token?: string;
                                created_at?: string;
                                updated_at?: string;
                                doc_contents?: Array<{
                                    id: string;
                                    children?: Array<string>;
                                    content_type: number;
                                    text?: { text?: string };
                                    heading?: {
                                        text?: string;
                                        heading_level?: number;
                                    };
                                    bullet?: { text?: string };
                                    ordered?: { text?: string };
                                    code?: { text?: string };
                                    link?: { title?: string; url?: string };
                                    image?: { image_key?: string };
                                    user?: { user_id?: string };
                                    divider?: {};
                                    container?: {};
                                }>;
                                root_content_id?: string;
                            };
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/lingo/v1/aigc/generate_entity`,
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
                 *
                 * 获取词典分类
                 *
                 * 获取飞书词典当前分类。;飞书词典目前为二级分类体系，每个词条可添加多个二级分类，但选择的二级分类必须从属于不同的一级分类。
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
                 *
                 * 创建草稿
                 *
                 * 草稿并非词条，而是指通过 API 发起创建新词条或更新现有词条的申请。;词典管理员审核通过后，草稿将变为新的词条或覆盖已有词条。
                 *
                 * 以用户身份创建草稿（即 Authorization 使用 user_access_token），对应用户将收到由飞书词典 Bot 发送的审核结果；以应用身份创建草稿（即 Authorization 使用 tenant_access_toke），不会收到任何通知。;;- 创建新的词条时，无需传入 entity_id 字段;- 更新已有词条时，请传入对应词条的 entity_id 或 outer_info
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
                 *
                 * 更新草稿
                 *
                 * 根据 draft_id 更新草稿内容，已审批的草稿无法编辑。
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
        },
    };
}
