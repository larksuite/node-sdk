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
import mindnote from "./mindnote";

// auto gen
export default abstract class Client extends mindnote {
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
    minutes = {
        v1: {
            /**
             * minute.transcript
             */
            minuteTranscript: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=minutes&resource=minute.transcript&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=minutes&resource=minute.transcript&version=v1 document }
                 *
                 * 导出妙记文字记录
                 *
                 * 获取妙记的对话文本
                 */
                get: async (
                    payload?: {
                        params?: {
                            need_speaker?: boolean;
                            need_timestamp?: boolean;
                            file_format?: string;
                        };
                        path: { minute_token: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/minutes/v1/minutes/:minute_token/transcript`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=minutes&resource=minute.transcript&apiName=word&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=word&project=minutes&resource=minute.transcript&version=v1 document }
                 *
                 * 妙记文字记录关键词批量替换
                 */
                word: async (
                    payload?: {
                        data?: {
                            replace_words?: Array<{
                                source_word?: string;
                                target_word?: string;
                            }>;
                        };
                        path: { minute_token: string };
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
                                `${this.domain}/open-apis/minutes/v1/minutes/:minute_token/transcript/word`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=minutes&resource=minute.transcript&apiName=speakerlist&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=speakerlist&project=minutes&resource=minute.transcript&version=v1 document }
                 *
                 * 获取文字记录说话人信息
                 */
                speakerlist: async (
                    payload?: {
                        path: { minute_token: string };
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
                                    speakers?: Array<{
                                        speaker_id?: string;
                                        name?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/minutes/v1/minutes/:minute_token/transcript/speakerlist`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=minutes&resource=minute.transcript&apiName=speaker&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=speaker&project=minutes&resource=minute.transcript&version=v1 document }
                 */
                speaker: async (
                    payload?: {
                        data: {
                            from_user_id?: string;
                            to_user_id: string;
                            from_speaker_id?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { minute_token: string };
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
                                `${this.domain}/open-apis/minutes/v1/minutes/:minute_token/transcript/speaker`,
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
             * minute.statistics
             */
            minuteStatistics: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=minutes&resource=minute.statistics&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=minutes&resource=minute.statistics&version=v1 document }
                 *
                 * 获取妙记统计数据
                 *
                 * 通过这个接口，可以获得妙记的访问情况统计，包含PV、UV、访问过的 user id、访问过的 user timestamp。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { minute_token: string };
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
                                    statistics?: {
                                        user_view_count?: string;
                                        page_view_count?: string;
                                        user_view_list?: Array<{
                                            user_id?: string;
                                            view_time?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/minutes/v1/minutes/:minute_token/statistics`,
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
             * minute.media
             */
            minuteMedia: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=minutes&resource=minute.media&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=minutes&resource=minute.media&version=v1 document }
                 *
                 * 下载妙记音视频文件
                 *
                 * 获取妙记的音视频文件
                 */
                get: async (
                    payload?: {
                        path: { minute_token: string };
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
                                data?: { download_url?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/minutes/v1/minutes/:minute_token/media`,
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
             * minute
             */
            minute: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=minutes&resource=minute&apiName=upload&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=minutes&resource=minute&version=v1 document }
                 */
                upload: async (
                    payload?: {
                        data: { file_token: string };
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
                                data?: { minute_url?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/minutes/v1/minutes/upload`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=minutes&resource=minute&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=minutes&resource=minute&version=v1 document }
                 */
                patch: async (
                    payload?: {
                        data?: { topic?: string };
                        path: { minute_token: string };
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
                                `${this.domain}/open-apis/minutes/v1/minutes/:minute_token`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=minutes&resource=minute&apiName=subscription&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=minutes&resource=minute&version=v1 document }
                 *
                 * 订阅妙记变更事件
                 *
                 * 订阅当前用户身份相关的妙记资源变更事件。通过指定事件类型，来订阅妙记资源不同的事件变更。
                 */
                subscription: async (
                    payload?: {
                        data?: { event_type?: string };
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
                                `${this.domain}/open-apis/minutes/v1/minutes/subscription`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=minutes&resource=minute&apiName=unsubscription&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unsubscription&project=minutes&resource=minute&version=v1 document }
                 *
                 * 取消订阅妙记变更事件
                 *
                 * 取消订阅当前用户身份相关的妙记资源变更事件。通过指定事件类型，来取消订阅妙记资源对应的事件变更。
                 */
                unsubscription: async (
                    payload?: {
                        data?: { event_type?: string };
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
                                `${this.domain}/open-apis/minutes/v1/minutes/unsubscription`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=minutes&resource=minute&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=minutes&resource=minute&version=v1 document }
                 *
                 * 获取单个妙记信息
                 *
                 * 获取一篇妙记的基础概述信息，包含 `owner_id`（妙记所有者）、`create_time`（妙记创建时间）、标题、封面、时长和 URL
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { minute_token: string };
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
                                    minute?: {
                                        token?: string;
                                        owner_id?: string;
                                        create_time?: string;
                                        title?: string;
                                        cover?: string;
                                        duration?: string;
                                        url?: string;
                                        note_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/minutes/v1/minutes/:minute_token`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=minutes&resource=minute&apiName=summary&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=summary&project=minutes&resource=minute&version=v1 document }
                 *
                 * 替换妙记内 AI 总结
                 */
                summary: async (
                    payload?: {
                        data?: { summary?: string };
                        path: { minute_token: string };
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
                                `${this.domain}/open-apis/minutes/v1/minutes/:minute_token/summary`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=minutes&resource=minute&apiName=todo&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=todo&project=minutes&resource=minute&version=v1 document }
                 *
                 * 支持妙记待办的增删改
                 */
                todo: async (
                    payload?: {
                        data?: {
                            todo_items?: Array<{
                                content?: string;
                                assignees?: Array<string>;
                                is_done?: boolean;
                                todo_id?: string;
                                operation?: string;
                            }>;
                        };
                        path: { minute_token: string };
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
                                `${this.domain}/open-apis/minutes/v1/minutes/:minute_token/todo`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=minutes&resource=minute&apiName=artifacts&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=artifacts&project=minutes&resource=minute&version=v1 document }
                 *
                 * 获取妙记AI产物
                 *
                 * 通过妙记唯一标识minute_token获取AI产物
                 */
                artifacts: async (
                    payload?: {
                        path: { minute_token: string };
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
                                    summary?: string;
                                    minute_chapters?: Array<{
                                        title?: string;
                                        start_ms?: string;
                                        stop_ms?: string;
                                        summary_content?: string;
                                    }>;
                                    minute_todos?: Array<{
                                        content?: string;
                                        assignees?: Array<string>;
                                        is_done?: boolean;
                                        todo_id?: string;
                                        operation?: string;
                                    }>;
                                    keywords?: Array<string>;
                                    transcript?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/minutes/v1/minutes/:minute_token/artifacts`,
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
                            filter?: {
                                owner_ids?: Array<string>;
                                participant_ids?: Array<string>;
                                create_time?: {
                                    start_time?: string;
                                    end_time?: string;
                                };
                            };
                            sorter?: "create_time_desc";
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
                                    `${this.domain}/open-apis/minutes/v1/minutes/search`,
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
                                                    items: Array<{
                                                        token: string;
                                                        display_info?: string;
                                                        meta_data?: {
                                                            app_link?: string;
                                                            avatar?: string;
                                                            description?: string;
                                                        };
                                                    }>;
                                                    total?: number;
                                                    has_more: boolean;
                                                    page_token?: string;
                                                    notice?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=minutes&resource=minute&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=minutes&resource=minute&version=v1 document }
                 *
                 * 搜索妙记
                 *
                 * 根据关键词、时间范围等条件搜索妙记，返回符合条件的妙记列表，包含妙记 token（用于标识妙记的唯一身份）、标题、开始时间等信息。
                 */
                search: async (
                    payload?: {
                        data?: {
                            query?: string;
                            filter?: {
                                owner_ids?: Array<string>;
                                participant_ids?: Array<string>;
                                create_time?: {
                                    start_time?: string;
                                    end_time?: string;
                                };
                            };
                            sorter?: "create_time_desc";
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
                                    items: Array<{
                                        token: string;
                                        display_info?: string;
                                        meta_data?: {
                                            app_link?: string;
                                            avatar?: string;
                                            description?: string;
                                        };
                                    }>;
                                    total?: number;
                                    has_more: boolean;
                                    page_token?: string;
                                    notice?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/minutes/v1/minutes/search`,
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
             * minute.permission
             */
            minutePermission: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=minutes&resource=minute.permission&apiName=apply&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=apply&project=minutes&resource=minute.permission&version=v1 document }
                 */
                apply: async (
                    payload?: {
                        data: { perm: string };
                        path: { minute_token: string };
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
                                `${this.domain}/open-apis/minutes/v1/minutes/:minute_token/permissions/apply`,
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
