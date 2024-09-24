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
        },
    };
}
