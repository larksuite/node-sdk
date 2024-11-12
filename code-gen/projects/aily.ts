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
import { stringify } from "qs";
import admin from "./admin";

// auto gen
export default abstract class Client extends admin {
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
    aily = {
        v1: {
            /**
             * aily_session.aily_message
             */
            ailySessionAilyMessage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session.aily_message&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=aily&resource=aily_session.aily_message&version=v1 document }
                 *
                 * 该 API 用于向某个飞书智能伙伴应用发送一条消息（Message）。
                 */
                create: async (
                    payload?: {
                        data: {
                            idempotent_id: string;
                            content_type: string;
                            content: string;
                            file_ids?: Array<string>;
                            quote_message_id?: string;
                            mentions?: Array<{
                                entity_id?: string;
                                identity_provider?: string;
                                key?: string;
                                name?: string;
                                aily_id?: string;
                            }>;
                        };
                        path: { aily_session_id: string };
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
                                    message?: {
                                        id?: string;
                                        session_id?: string;
                                        run_id?: string;
                                        content_type?: string;
                                        content?: string;
                                        files?: Array<{
                                            id?: string;
                                            mime_type?: string;
                                            file_name?: string;
                                            metadata?: string;
                                            created_at?: string;
                                            preview_url?: {
                                                url: string;
                                                expired_at?: string;
                                            };
                                        }>;
                                        quote_message_id?: string;
                                        sender?: {
                                            entity_id?: string;
                                            identity_provider?: string;
                                            sender_type?: string;
                                            aily_id?: string;
                                        };
                                        mentions?: Array<{
                                            entity_id?: string;
                                            identity_provider?: string;
                                            key?: string;
                                            name?: string;
                                            aily_id?: string;
                                        }>;
                                        plain_text?: string;
                                        created_at?: string;
                                        status?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/sessions/:aily_session_id/messages`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session.aily_message&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=aily_session.aily_message&version=v1 document }
                 *
                 * 该 API 用于获取某个飞书智能伙伴应用的消息（Message）的详细信息；包括消息的内容、发送人等。
                 */
                get: async (
                    payload?: {
                        path: {
                            aily_session_id: string;
                            aily_message_id: string;
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
                                    message?: {
                                        id?: string;
                                        session_id?: string;
                                        run_id?: string;
                                        content_type?: string;
                                        content?: string;
                                        files?: Array<{
                                            id?: string;
                                            mime_type?: string;
                                            file_name?: string;
                                            metadata?: string;
                                            created_at?: string;
                                            preview_url?: {
                                                url: string;
                                                expired_at?: string;
                                            };
                                        }>;
                                        quote_message_id?: string;
                                        sender?: {
                                            entity_id?: string;
                                            identity_provider?: string;
                                            sender_type?: string;
                                            aily_id?: string;
                                        };
                                        mentions?: Array<{
                                            entity_id?: string;
                                            identity_provider?: string;
                                            key?: string;
                                            name?: string;
                                            aily_id?: string;
                                        }>;
                                        plain_text?: string;
                                        created_at?: string;
                                        status?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/sessions/:aily_session_id/messages/:aily_message_id`,
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
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            run_id?: string;
                            with_partial_message?: boolean;
                        };
                        path: { aily_session_id: string };
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
                                    `${this.domain}/open-apis/aily/v1/sessions/:aily_session_id/messages`,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    messages?: Array<{
                                                        id?: string;
                                                        session_id?: string;
                                                        run_id?: string;
                                                        content_type?: string;
                                                        content?: string;
                                                        files?: Array<{
                                                            id?: string;
                                                            mime_type?: string;
                                                            file_name?: string;
                                                            metadata?: string;
                                                            created_at?: string;
                                                            preview_url?: {
                                                                url: string;
                                                                expired_at?: string;
                                                            };
                                                        }>;
                                                        quote_message_id?: string;
                                                        sender?: {
                                                            entity_id?: string;
                                                            identity_provider?: string;
                                                            sender_type?: string;
                                                            aily_id?: string;
                                                        };
                                                        mentions?: Array<{
                                                            entity_id?: string;
                                                            identity_provider?: string;
                                                            key?: string;
                                                            name?: string;
                                                            aily_id?: string;
                                                        }>;
                                                        plain_text?: string;
                                                        created_at?: string;
                                                        status?: string;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session.aily_message&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=aily_session.aily_message&version=v1 document }
                 *
                 * 该 API 用于批量获取飞书智能伙伴应用的消息（Message）的详细信息
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            run_id?: string;
                            with_partial_message?: boolean;
                        };
                        path: { aily_session_id: string };
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
                                    messages?: Array<{
                                        id?: string;
                                        session_id?: string;
                                        run_id?: string;
                                        content_type?: string;
                                        content?: string;
                                        files?: Array<{
                                            id?: string;
                                            mime_type?: string;
                                            file_name?: string;
                                            metadata?: string;
                                            created_at?: string;
                                            preview_url?: {
                                                url: string;
                                                expired_at?: string;
                                            };
                                        }>;
                                        quote_message_id?: string;
                                        sender?: {
                                            entity_id?: string;
                                            identity_provider?: string;
                                            sender_type?: string;
                                            aily_id?: string;
                                        };
                                        mentions?: Array<{
                                            entity_id?: string;
                                            identity_provider?: string;
                                            key?: string;
                                            name?: string;
                                            aily_id?: string;
                                        }>;
                                        plain_text?: string;
                                        created_at?: string;
                                        status?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/sessions/:aily_session_id/messages`,
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
             * aily_session
             */
            ailySession: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=aily&resource=aily_session&version=v1 document }
                 *
                 * 该 API 用于创建与某个飞书智能伙伴应用的一次会话（Session）。
                 */
                create: async (
                    payload?: {
                        data?: { channel_context?: string; metadata?: string };
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
                                    session?: {
                                        id: string;
                                        created_at: string;
                                        modified_at: string;
                                        created_by: string;
                                        channel_context?: string;
                                        metadata?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/sessions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=aily&resource=aily_session&version=v1 document }
                 *
                 * 该 API 用于销毁与某个飞书智能伙伴应用的一次会话（Session），当会话销毁后、无法继续在会话中创建 / 拉取消息。
                 */
                delete: async (
                    payload?: {
                        path: { aily_session_id: string };
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
                                `${this.domain}/open-apis/aily/v1/sessions/:aily_session_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=aily_session&version=v1 document }
                 *
                 * 该 API 用于获取与某个飞书智能伙伴应用的一次会话（Session）的详细信息，包括会话的状态、渠道信息、创建时间等。
                 */
                get: async (
                    payload?: {
                        path: { aily_session_id: string };
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
                                    session?: {
                                        id: string;
                                        created_at: string;
                                        modified_at: string;
                                        created_by: string;
                                        channel_context?: string;
                                        metadata?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/sessions/:aily_session_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=aily&resource=aily_session&version=v1 document }
                 *
                 * 该 API 用于更新与某个飞书智能伙伴应用的一次会话（Session）。
                 */
                update: async (
                    payload?: {
                        data?: { channel_context?: string; metadata?: string };
                        path: { aily_session_id: string };
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
                                    session?: {
                                        id: string;
                                        created_at: string;
                                        modified_at: string;
                                        created_by: string;
                                        channel_context?: string;
                                        metadata?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/sessions/:aily_session_id`,
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
             * aily_session.run
             */
            ailySessionRun: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session.run&apiName=cancel&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel&project=aily&resource=aily_session.run&version=v1 document }
                 *
                 * 该 API 用于取消指定的运行（Run）。
                 */
                cancel: async (
                    payload?: {
                        path: { aily_session_id: string; run_id: string };
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
                                    run?: {
                                        id: string;
                                        created_at: string;
                                        app_id: string;
                                        session_id: string;
                                        status: string;
                                        started_at?: string;
                                        ended_at?: string;
                                        error?: {
                                            code: string;
                                            message: string;
                                        };
                                        metadata?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/sessions/:aily_session_id/runs/:run_id/cancel`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session.run&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=aily&resource=aily_session.run&version=v1 document }
                 *
                 * 该 API 用于启动一次运行（Run）。
                 */
                create: async (
                    payload?: {
                        data: {
                            app_id: string;
                            skill_id?: string;
                            skill_input?: string;
                            metadata?: string;
                        };
                        path: { aily_session_id: string };
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
                                    run?: {
                                        id: string;
                                        created_at: string;
                                        app_id: string;
                                        session_id: string;
                                        status: string;
                                        started_at?: string;
                                        ended_at?: string;
                                        error?: {
                                            code: string;
                                            message: string;
                                        };
                                        metadata?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/sessions/:aily_session_id/runs`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session.run&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=aily_session.run&version=v1 document }
                 *
                 * 该 API 用于获取运行（Run）的详细信息。
                 */
                get: async (
                    payload?: {
                        path: { aily_session_id: string; run_id: string };
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
                                    run?: {
                                        id: string;
                                        created_at: string;
                                        app_id: string;
                                        session_id: string;
                                        status: string;
                                        started_at?: string;
                                        ended_at?: string;
                                        error?: {
                                            code: string;
                                            message: string;
                                        };
                                        metadata?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/sessions/:aily_session_id/runs/:run_id`,
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
                        params?: { page_size?: number; page_token?: string };
                        path: { aily_session_id: string };
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
                                    `${this.domain}/open-apis/aily/v1/sessions/:aily_session_id/runs`,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    runs?: Array<{
                                                        id: string;
                                                        created_at: string;
                                                        app_id: string;
                                                        session_id: string;
                                                        status: string;
                                                        started_at?: string;
                                                        ended_at?: string;
                                                        error?: {
                                                            code: string;
                                                            message: string;
                                                        };
                                                        metadata?: string;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session.run&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=aily_session.run&version=v1 document }
                 *
                 * 该 API 用于批量获取运行（Run）的详细信息。
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { aily_session_id: string };
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
                                    runs?: Array<{
                                        id: string;
                                        created_at: string;
                                        app_id: string;
                                        session_id: string;
                                        status: string;
                                        started_at?: string;
                                        ended_at?: string;
                                        error?: {
                                            code: string;
                                            message: string;
                                        };
                                        metadata?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/sessions/:aily_session_id/runs`,
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
             * app.data_asset
             */
            appDataAsset: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            keyword?: string;
                            data_asset_ids?: Array<string>;
                            data_asset_tag_ids?: Array<string>;
                            with_data_asset_item?: boolean;
                            with_connect_status?: boolean;
                            with_import_setting?: boolean;
                        };
                        path: { app_id: string };
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
                                    `${this.domain}/open-apis/aily/v1/apps/:app_id/data_assets`,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        data_asset_id?: string;
                                                        label?: Record<
                                                            string,
                                                            string
                                                        >;
                                                        description?: Record<
                                                            string,
                                                            string
                                                        >;
                                                        data_source_type?:
                                                            | "excel"
                                                            | "pdf"
                                                            | "pptx"
                                                            | "txt"
                                                            | "docx"
                                                            | "mysql"
                                                            | "postgresql"
                                                            | "larkbase"
                                                            | "salesforce"
                                                            | "fenxiangxiaoke"
                                                            | "qianchuan"
                                                            | "clickhouse"
                                                            | "databricks"
                                                            | "servicedesk"
                                                            | "larkbiz_wiki"
                                                            | "larkbiz_doc"
                                                            | "larkbiz_docs"
                                                            | "larkbiz_docx"
                                                            | "larkbiz_pdf"
                                                            | "larkbiz_word"
                                                            | "larkbiz_pptx"
                                                            | "larkbiz_sheets"
                                                            | "larkbiz_base"
                                                            | "larkbiz_personalfolder"
                                                            | "larkbiz_sharedfolder"
                                                            | "object";
                                                        connect_status?:
                                                            | "awaiting"
                                                            | "syncing"
                                                            | "successful"
                                                            | "continuously_syncing"
                                                            | "partially_successful"
                                                            | "failed";
                                                        tags?: Array<{
                                                            data_asset_tag_id?: string;
                                                            name?: string;
                                                        }>;
                                                        items?: Array<{
                                                            data_asset_item_id?: string;
                                                            api_name?: string;
                                                            label?: Record<
                                                                string,
                                                                string
                                                            >;
                                                            description?: Record<
                                                                string,
                                                                string
                                                            >;
                                                            resources?: Array<{
                                                                resource_id?: string;
                                                                resource_type?:
                                                                    | "dataset"
                                                                    | "vector";
                                                            }>;
                                                        }>;
                                                        connect_failed_reason?: string;
                                                        import_knowledge_setting?: {
                                                            chunk_setting?: {
                                                                rule_type:
                                                                    | "separator"
                                                                    | "intelligent";
                                                                separate_type?:
                                                                    | "paragraph"
                                                                    | "title";
                                                                size?: number;
                                                                overlap?: number;
                                                            };
                                                            file?: {
                                                                title?: string;
                                                                token?: string;
                                                                content?: string;
                                                                mime_type?: string;
                                                                url?: string;
                                                            };
                                                            lark_doc?: {
                                                                type:
                                                                    | "doc"
                                                                    | "file"
                                                                    | "wiki"
                                                                    | "docx"
                                                                    | "folder";
                                                                token: string;
                                                                with_sub_docs?: boolean;
                                                                url?: string;
                                                            };
                                                            lark_wiki_space?: {
                                                                space_id: string;
                                                                sub_docs?: Array<{
                                                                    type: "wiki";
                                                                    token: string;
                                                                    url?: string;
                                                                }>;
                                                                url?: string;
                                                            };
                                                            lark_helpdesk?: {
                                                                helpdesk_id: string;
                                                            };
                                                        };
                                                        connect_type?:
                                                            | "import"
                                                            | "direct";
                                                        created_time?: string;
                                                        updated_time?: string;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.data_asset&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=app.data_asset&version=v1 document }
                 *
                 * 获取数据与知识列表
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            keyword?: string;
                            data_asset_ids?: Array<string>;
                            data_asset_tag_ids?: Array<string>;
                            with_data_asset_item?: boolean;
                            with_connect_status?: boolean;
                            with_import_setting?: boolean;
                        };
                        path: { app_id: string };
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
                                        data_asset_id?: string;
                                        label?: Record<string, string>;
                                        description?: Record<string, string>;
                                        data_source_type?:
                                            | "excel"
                                            | "pdf"
                                            | "pptx"
                                            | "txt"
                                            | "docx"
                                            | "mysql"
                                            | "postgresql"
                                            | "larkbase"
                                            | "salesforce"
                                            | "fenxiangxiaoke"
                                            | "qianchuan"
                                            | "clickhouse"
                                            | "databricks"
                                            | "servicedesk"
                                            | "larkbiz_wiki"
                                            | "larkbiz_doc"
                                            | "larkbiz_docs"
                                            | "larkbiz_docx"
                                            | "larkbiz_pdf"
                                            | "larkbiz_word"
                                            | "larkbiz_pptx"
                                            | "larkbiz_sheets"
                                            | "larkbiz_base"
                                            | "larkbiz_personalfolder"
                                            | "larkbiz_sharedfolder"
                                            | "object";
                                        connect_status?:
                                            | "awaiting"
                                            | "syncing"
                                            | "successful"
                                            | "continuously_syncing"
                                            | "partially_successful"
                                            | "failed";
                                        tags?: Array<{
                                            data_asset_tag_id?: string;
                                            name?: string;
                                        }>;
                                        items?: Array<{
                                            data_asset_item_id?: string;
                                            api_name?: string;
                                            label?: Record<string, string>;
                                            description?: Record<
                                                string,
                                                string
                                            >;
                                            resources?: Array<{
                                                resource_id?: string;
                                                resource_type?:
                                                    | "dataset"
                                                    | "vector";
                                            }>;
                                        }>;
                                        connect_failed_reason?: string;
                                        import_knowledge_setting?: {
                                            chunk_setting?: {
                                                rule_type:
                                                    | "separator"
                                                    | "intelligent";
                                                separate_type?:
                                                    | "paragraph"
                                                    | "title";
                                                size?: number;
                                                overlap?: number;
                                            };
                                            file?: {
                                                title?: string;
                                                token?: string;
                                                content?: string;
                                                mime_type?: string;
                                                url?: string;
                                            };
                                            lark_doc?: {
                                                type:
                                                    | "doc"
                                                    | "file"
                                                    | "wiki"
                                                    | "docx"
                                                    | "folder";
                                                token: string;
                                                with_sub_docs?: boolean;
                                                url?: string;
                                            };
                                            lark_wiki_space?: {
                                                space_id: string;
                                                sub_docs?: Array<{
                                                    type: "wiki";
                                                    token: string;
                                                    url?: string;
                                                }>;
                                                url?: string;
                                            };
                                            lark_helpdesk?: {
                                                helpdesk_id: string;
                                            };
                                        };
                                        connect_type?: "import" | "direct";
                                        created_time?: string;
                                        updated_time?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/data_assets`,
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
             * app.data_asset_tag
             */
            appDataAssetTag: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            keyword?: string;
                            data_asset_tag_ids?: Array<string>;
                        };
                        path: { app_id: string };
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
                                    `${this.domain}/open-apis/aily/v1/apps/:app_id/data_asset_tags`,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    items?: Array<{
                                                        data_asset_tag_id?: string;
                                                        name?: string;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.data_asset_tag&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=app.data_asset_tag&version=v1 document }
                 *
                 * 获取数据与知识分类列表
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            keyword?: string;
                            data_asset_tag_ids?: Array<string>;
                        };
                        path: { app_id: string };
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
                                        data_asset_tag_id?: string;
                                        name?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/data_asset_tags`,
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
             * app.knowledge
             */
            appKnowledge: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.knowledge&apiName=ask&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=ask&project=aily&resource=app.knowledge&version=v1 document }
                 *
                 * 执行一次数据知识问答
                 */
                ask: async (
                    payload?: {
                        data: {
                            message: { content?: string };
                            data_asset_ids?: Array<string>;
                            data_asset_tag_ids?: Array<string>;
                        };
                        path: { app_id: string };
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
                                    status?: "processing" | "finished";
                                    finish_type?: "qa" | "faq";
                                    message?: { content?: string };
                                    process_data?: {
                                        chart_dsls?: Array<string>;
                                        chunks?: Array<string>;
                                        sql_data?: Array<string>;
                                    };
                                    faq_result?: {
                                        question?: string;
                                        answer?: string;
                                    };
                                    has_answer?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/knowledges/ask`,
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
             * app.skill
             */
            appSkill: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.skill&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=app.skill&version=v1 document }
                 *
                 * 该 API 用于获取某个飞书智能伙伴应用的技能（Skill）的详细信息。
                 */
                get: async (
                    payload?: {
                        path: { app_id: string; skill_id: string };
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
                                    skill?: {
                                        id?: string;
                                        label?: string;
                                        description?: string;
                                        samples?: Array<string>;
                                        input_schema?: string;
                                        output_schema?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/skills/:skill_id`,
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
                        params?: { page_size?: number; page_token?: string };
                        path: { app_id: string };
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
                                    `${this.domain}/open-apis/aily/v1/apps/:app_id/skills`,
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
                                        get<
                                            {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    skills?: Array<{
                                                        id?: string;
                                                        label?: string;
                                                        description?: string;
                                                        samples?: Array<string>;
                                                        input_schema?: string;
                                                        output_schema?: string;
                                                    }>;
                                                    page_token?: string;
                                                    has_more?: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.skill&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=app.skill&version=v1 document }
                 *
                 * 该 API 用于批量获取飞书智能伙伴应用的技能（Skill）的详细信息
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { app_id: string };
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
                                    skills?: Array<{
                                        id?: string;
                                        label?: string;
                                        description?: string;
                                        samples?: Array<string>;
                                        input_schema?: string;
                                        output_schema?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/skills`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.skill&apiName=start&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=start&project=aily&resource=app.skill&version=v1 document }
                 *
                 * 该 API 用于执行飞书智能伙伴应用的技能（Skill）获取输出
                 */
                start: async (
                    payload?: {
                        data?: {
                            global_variable?: {
                                query?: string;
                                files?: Array<string>;
                                channel?: { variables?: string };
                            };
                            input?: string;
                        };
                        path: { app_id: string; skill_id: string };
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
                                data?: { output?: string; status?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/skills/:skill_id/start`,
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
