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
import aily_rag from "./aily_rag";

// auto gen
export default abstract class Client extends aily_rag {
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
             * app.skill_instance
             */
            appSkillInstance: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.skill_instance&apiName=cancel&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel&project=aily&resource=app.skill_instance&version=v1 document }
                 *
                 * 取消技能实例的执行
                 *
                 * 取消技能实例的执行
                 */
                cancel: async (
                    payload?: {
                        path: { app_id: string; skill_instance_id: string };
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
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/skill_instances/:skill_instance_id/cancel`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.skill_instance&apiName=start_async&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=start_async&project=aily&resource=app.skill_instance&version=v1 document }
                 *
                 * 创建技能的实例并异步开始执行
                 *
                 * 创建技能的实例并异步开始执行
                 */
                startAsync: async (
                    payload?: {
                        data: {
                            input?: string;
                            skill_id: string;
                            enable_debug?: boolean;
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
                                data?: { skill_instance_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/skill_instances/start_async`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.skill_instance&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=app.skill_instance&version=v1 document }
                 *
                 * 查询技能实例
                 *
                 * 查询技能实例
                 */
                get: async (
                    payload?: {
                        path: { app_id: string; skill_instance_id: string };
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
                                    skill_instance?: {
                                        skill_instance_id: string;
                                        status: string;
                                        input?: string;
                                        output?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/skill_instances/:skill_instance_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.skill_instance&apiName=resume_async&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=resume_async&project=aily&resource=app.skill_instance&version=v1 document }
                 *
                 * 从中断点继续 skill instance 并异步 run
                 */
                resumeAsync: async (
                    payload?: {
                        data: {
                            skill_id?: string;
                            skill_calls: Array<{
                                skill_call_id: string;
                                input?: string;
                                waiting_type?: string;
                                input_dsl?: string;
                            }>;
                            enable_debug?: boolean;
                        };
                        path: { app_id: string; skill_instance_id: string };
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
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/skill_instances/:skill_instance_id/resume_async`,
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
             * app
             */
            app: {
                listWithIterator: async (
                    payload?: {
                        params: { page_size: number; page_token?: string };
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
                                    `${this.domain}/open-apis/aily/v1/apps`,
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
                                                        label: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=app&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params: { page_size: number; page_token?: string };
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
                                        label: string;
                                    }>;
                                    page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps`,
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
             * app.session.intent
             */
            appSessionIntent: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.session.intent&apiName=respond_user_action&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=respond_user_action&project=aily&resource=app.session.intent&version=v1 document }
                 *
                 * 提交补充信息到意图以继续执行
                 *
                 * 提交补充信息到意图以继续执行
                 */
                respondUserAction: async (
                    payload?: {
                        data: { result: string };
                        path: {
                            app_id: string;
                            session_id: string;
                            intent_id: string;
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
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/sessions/:session_id/intents/:intent_id/respond_user_action`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.session.intent&apiName=cancel&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel&project=aily&resource=app.session.intent&version=v1 document }
                 *
                 * 取消意图执行
                 *
                 * 取消意图执行
                 */
                cancel: async (
                    payload?: {
                        path: {
                            app_id: string;
                            session_id: string;
                            intent_id: string;
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
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/sessions/:session_id/intents/:intent_id/cancel`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.session.intent&apiName=regenerate&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=regenerate&project=aily&resource=app.session.intent&version=v1 document }
                 *
                 * 重新执行意图
                 *
                 * 重新执行意图
                 */
                regenerate: async (
                    payload?: {
                        path: {
                            app_id: string;
                            session_id: string;
                            intent_id: string;
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
                                data?: { intent_id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/sessions/:session_id/intents/:intent_id/regenerate`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.session.intent&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=app.session.intent&version=v1 document }
                 *
                 * 获取意图信息
                 *
                 * 获取意图信息
                 */
                get: async (
                    payload?: {
                        path: {
                            app_id: string;
                            session_id: string;
                            intent_id: string;
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
                                    intent: {
                                        id: string;
                                        created_at: string;
                                        session_id: string;
                                        status:
                                            | "CREATED"
                                            | "RUNNING"
                                            | "WAITING"
                                            | "CANCELED"
                                            | "FINISHED"
                                            | "FAILED"
                                            | "EXPIRED";
                                        sub_status?:
                                            | "WAITING_USER_MESSAGE"
                                            | "WAITING_USER_RESPOND";
                                        channel_type?: "LARK_OPEN_API";
                                        error?: {
                                            code: string;
                                            message?: string;
                                            error_type?:
                                                | "SYSTEM"
                                                | "MAKER"
                                                | "USER";
                                            log_id?: string;
                                            title?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/sessions/:session_id/intents/:intent_id`,
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
             * app.session
             */
            appSession: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.session&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=aily&resource=app.session&version=v1 document }
                 *
                 * 创建会话
                 *
                 * 该 API 用于创建与某个飞书智能伙伴应用的一次会话（Session）；当创建会话成功后，可以创建 / 拉取消息（Message）。
                 */
                create: async (
                    payload?: {
                        data?: {
                            enable_debug?: boolean;
                            channel_context?: string;
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
                                data?: { session_id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/sessions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.session&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=app.session&version=v1 document }
                 *
                 * 获取会话信息
                 *
                 * 该 API 用于获取与某个飞书智能伙伴应用的一次会话（Session）的详细信息，包括会话的状态、渠道信息、创建时间等。
                 */
                get: async (
                    payload?: {
                        path: { app_id: string; session_id: string };
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
                                    session: {
                                        id: string;
                                        created_at: string;
                                        effected_at: string;
                                        type:
                                            | "PERMANENT"
                                            | "LONG-TERM"
                                            | "INSTANT";
                                        status: "VALID" | "INVALID";
                                        active_intent_id: string;
                                        channel_type: "LARK_OPEN_API";
                                        enable_debug: boolean;
                                        kvs?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/sessions/:session_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.session&apiName=destroy&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=destroy&project=aily&resource=app.session&version=v1 document }
                 *
                 * 销毁会话
                 *
                 * 该 API 用于销毁与某个飞书智能伙伴应用的一次会话（Session），当会话销毁后、无法继续在会话中创建 / 拉取消息。
                 */
                destroy: async (
                    payload?: {
                        path: { app_id: string; session_id: string };
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
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/sessions/:session_id/destroy`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.session&apiName=poll&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=poll&project=aily&resource=app.session&version=v1 document }
                 *
                 * 拉取会话中的消息操作
                 *
                 * 该 API 用于获取与某个飞书智能伙伴应用的一次会话（Session）的一组消息。
                 */
                poll: async (
                    payload?: {
                        data?: { last_operation_id?: string };
                        path: { app_id: string; session_id: string };
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
                                    last_operation_id: string;
                                    operations: Array<{
                                        message?: {
                                            id?: string;
                                            title?: string;
                                            content?: string;
                                            message_status?:
                                                | "RUNNING"
                                                | "FINISHED";
                                            builtin_actions?: Array<{
                                                builtin_action_type?:
                                                    | "FEEDBACK"
                                                    | "REVOKE"
                                                    | "REGENERATE"
                                                    | "PIN"
                                                    | "DETAIL"
                                                    | "CANCEL";
                                                enable?: boolean;
                                                action_status?: string;
                                                extra?: string;
                                            }>;
                                            skill_base_infos?: Array<{
                                                name: string;
                                                skill_id: string;
                                                type: string;
                                                builtin_type?: string;
                                            }>;
                                            message_progress?: {
                                                progress_type: "LIST";
                                                progress_items?: Array<{
                                                    progress_item_state?:
                                                        | "RUNNING"
                                                        | "FINISHED"
                                                        | "FAILED";
                                                    content?: string;
                                                    skill_id?: string;
                                                    node_id?: string;
                                                    node_type?: string;
                                                    input?: string;
                                                    output?: string;
                                                    usages?: Array<string>;
                                                    skill_strategy?:
                                                        | "AUTO"
                                                        | "SLASH";
                                                }>;
                                            };
                                            sender?: {
                                                id?: string;
                                                sender_type?:
                                                    | "USER"
                                                    | "SYSTEM"
                                                    | "SKILL";
                                                name?: string;
                                                desc?: string;
                                                sender_id?: string;
                                            };
                                            error?: {
                                                code: string;
                                                message?: string;
                                                error_type?:
                                                    | "SYSTEM"
                                                    | "MAKER"
                                                    | "USER";
                                                log_id?: string;
                                                title?: string;
                                            };
                                            trigger_type?:
                                                | "SCHEDULER"
                                                | "PIN"
                                                | "REGENERATE";
                                            visibility?: "SELF" | "ALL";
                                        };
                                        operation_type?:
                                            | "APPEND"
                                            | "UPDATE"
                                            | "WITHDRAW";
                                        operation_id?: string;
                                        intent_id?: string;
                                    }>;
                                    intent_finished: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/sessions/:session_id/poll`,
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
             * app.session.message
             */
            appSessionMessage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.session.message&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=app.session.message&version=v1 document }
                 *
                 * 获取消息
                 *
                 * 该 API 用于获取某个飞书智能伙伴应用的消息（Message）的详细信息；包括消息的内容、发送人等。
                 */
                get: async (
                    payload?: {
                        path: {
                            app_id: string;
                            session_id: string;
                            message_id: string;
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
                                    message: {
                                        id?: string;
                                        title?: string;
                                        content?: string;
                                        message_status?: "RUNNING" | "FINISHED";
                                        builtin_actions?: Array<{
                                            builtin_action_type?:
                                                | "FEEDBACK"
                                                | "REVOKE"
                                                | "REGENERATE"
                                                | "PIN"
                                                | "DETAIL"
                                                | "CANCEL";
                                            enable?: boolean;
                                            action_status?: string;
                                            extra?: string;
                                        }>;
                                        skill_base_infos?: Array<{
                                            name: string;
                                            skill_id: string;
                                            type: string;
                                            builtin_type?: string;
                                        }>;
                                        message_progress?: {
                                            progress_type: "LIST";
                                            progress_items?: Array<{
                                                progress_item_state?:
                                                    | "RUNNING"
                                                    | "FINISHED"
                                                    | "FAILED";
                                                content?: string;
                                                skill_id?: string;
                                                node_id?: string;
                                                node_type?: string;
                                                input?: string;
                                                output?: string;
                                                usages?: Array<string>;
                                                skill_strategy?:
                                                    | "AUTO"
                                                    | "SLASH";
                                            }>;
                                        };
                                        sender?: {
                                            id?: string;
                                            sender_type?:
                                                | "USER"
                                                | "SYSTEM"
                                                | "SKILL";
                                            name?: string;
                                            desc?: string;
                                            sender_id?: string;
                                        };
                                        error?: {
                                            code: string;
                                            message?: string;
                                            error_type?:
                                                | "SYSTEM"
                                                | "MAKER"
                                                | "USER";
                                            log_id?: string;
                                            title?: string;
                                        };
                                        trigger_type?:
                                            | "SCHEDULER"
                                            | "PIN"
                                            | "REGENERATE";
                                        visibility?: "SELF" | "ALL";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/sessions/:session_id/messages/:message_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.session.message&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=aily&resource=app.session.message&version=v1 document }
                 *
                 * 发送消息
                 *
                 * 该 API 用于向某个飞书智能伙伴应用发送一条消息（Message）；每个消息从属于一个活跃的会话（Session）。
                 */
                create: async (
                    payload?: {
                        data: {
                            idempotent_id: string;
                            message: {
                                id?: string;
                                title?: string;
                                content?: string;
                                message_status?: "RUNNING" | "FINISHED";
                                builtin_actions?: Array<{
                                    builtin_action_type?:
                                        | "FEEDBACK"
                                        | "REVOKE"
                                        | "REGENERATE"
                                        | "PIN"
                                        | "DETAIL"
                                        | "CANCEL";
                                    enable?: boolean;
                                    action_status?: string;
                                    extra?: string;
                                }>;
                                skill_base_infos?: Array<{
                                    name: string;
                                    skill_id: string;
                                    type: string;
                                    builtin_type?: string;
                                }>;
                                message_progress?: {
                                    progress_type: "LIST";
                                    progress_items?: Array<{
                                        progress_item_state?:
                                            | "RUNNING"
                                            | "FINISHED"
                                            | "FAILED";
                                        content?: string;
                                        skill_id?: string;
                                        node_id?: string;
                                        node_type?: string;
                                        input?: string;
                                        output?: string;
                                        usages?: Array<string>;
                                        skill_strategy?: "AUTO" | "SLASH";
                                    }>;
                                };
                                sender?: {
                                    id?: string;
                                    sender_type?: "USER" | "SYSTEM" | "SKILL";
                                    name?: string;
                                    desc?: string;
                                    sender_id?: string;
                                };
                                error?: {
                                    code: string;
                                    message?: string;
                                    error_type?: "SYSTEM" | "MAKER" | "USER";
                                    log_id?: string;
                                    title?: string;
                                };
                                trigger_type?:
                                    | "SCHEDULER"
                                    | "PIN"
                                    | "REGENERATE";
                                visibility?: "SELF" | "ALL";
                            };
                            skill_id?: string;
                            channel_context?: string;
                        };
                        path: { app_id: string; session_id: string };
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
                                    message_id: string;
                                    intent_id: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/sessions/:session_id/messages`,
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
             * aily_session
             */
            ailySession: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=aily&resource=aily_session&version=v1 document }
                 *
                 * 更新会话
                 *
                 * 该 API 用于更新与某个飞书 Aily 应用的一次会话（Session）的信息。
                 *
                 * 更多信息及示例代码，可参考 Aily OpenAPI 接入与接口说明。
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=aily&resource=aily_session&version=v1 document }
                 *
                 * 删除会话
                 *
                 * 该 API 用于删除与某个飞书 Aily 应用的一次会话（Session）。
                 *
                 * 更多信息及示例代码，可参考 Aily OpenAPI 接入与接口说明。
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
                 * 获取会话
                 *
                 * 该 API 用于获取与某个飞书 Aily 应用的一次会话（Session）的详细信息，包括会话的状态、渠道上下文、创建时间等。
                 *
                 * 更多信息及示例代码，可参考 Aily OpenAPI 接入与接口说明。
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=aily&resource=aily_session&version=v1 document }
                 *
                 * 创建会话
                 *
                 * 该 API 用于创建与某个飞书 Aily 应用的一次会话（Session）；当创建会话成功后，可以发送消息、创建运行。
                 *
                 * ## 实体概念说明;;- **会话**（Session）：管理用户与 Aily 助手之间的交互会话；每次会话记录了用户发送给 Aily 助手的消息以及 Aily 助手的响应。;- **消息**（Message）：消息可以包含文本、表格、图片等多种类型的内容。;- **运行**（Run）：Aily 助手基于会话内消息进行意图判定、调用匹配的技能，并返回技能执行后的结果消息。
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
            },
            /**
             * aily_message_file
             */
            ailyMessageFile: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_message_file&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=aily&resource=aily_message_file&version=v1 document }
                 *
                 * 上传文件
                 *
                 * 该 API 用于上传临时文件（如富文本消息内的图片、文档），并在飞书 Aily 应用的消息内引用该文件（请详见[发送消息](https://open.larkoffice.com/document/uAjLw4CM/ukTMukTMukTM/aily-v1/aily_session-aily_message/create)接口说明文档）。
                 */
                create: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
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
                                data?: {
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
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/files`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_message_file&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=aily_message_file&version=v1 document }
                 *
                 * 读取消息文件详情
                 *
                 * 该 API 用于获取某个飞书 Aily 应用的消息内的文件信息，包括文件名、文件类型、上传时间等。
                 */
                get: async (
                    payload?: {
                        params?: { with_preview_url?: boolean };
                        path: { aily_message_file_id: string };
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
                                    file?: {
                                        id?: string;
                                        mime_type?: string;
                                        file_name?: string;
                                        metadata?: string;
                                        created_at?: string;
                                        preview_url?: {
                                            url: string;
                                            expired_at?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/files/:aily_message_file_id`,
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
             * aily_session.run.suggestion
             */
            ailySessionRunSuggestion: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session.run.suggestion&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=aily_session.run.suggestion&version=v1 document }
                 *
                 * 该 API 用于批量获取飞书智能伙伴应用运行后生产的用户推荐（Suggestion）信息
                 */
                list: async (
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
                                    suggestions?: Array<{
                                        content: string;
                                        skill_id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/sessions/:aily_session_id/runs/:run_id/suggestions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.knowledge&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=aily&resource=app.knowledge&version=v1 document }
                 *
                 * 删除知识
                 *
                 * 此API用于删除知识库内的知识记录
                 */
                delete: async (
                    payload?: {
                        path: { app_id: string; knowledge_id: string };
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
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/knowledges/:knowledge_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.knowledge&apiName=ask&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=ask&project=aily&resource=app.knowledge&version=v1 document }
                 *
                 * 执行数据知识问答
                 *
                 * 执行飞书 Aily 的数据知识问答，返回基于指定数据知识的问答结果
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.knowledge&apiName=upload&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=aily&resource=app.knowledge&version=v1 document }
                 *
                 * 上传文件为知识
                 *
                 * 该API允许上传多个本地文件，作为知识添加到知识库中并进行学习。学习成功的内容可用于问答。
                 *
                 * - 单个文件大小上限为30MB。;- 单次请求最多上传十个文件。;- 目前仅支持txt、pdf、docx、ppt类型文件。
                 */
                upload: async (
                    payload?: {
                        data: {
                            file: Buffer | fs.ReadStream;
                            source_url?: Array<string>;
                            knowledge_base_id?: string;
                        };
                        path: { app_id: string };
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
                                data?: {
                                    knowledges?: Array<{
                                        id?: string;
                                        knowledge_base_id?: string;
                                        status?:
                                            | "learned"
                                            | "learning"
                                            | "failed"
                                            | "partially";
                                        title?: string;
                                        type:
                                            | "docs"
                                            | "wiki_space"
                                            | "helpdesk"
                                            | "file"
                                            | "datatable"
                                            | "dataset"
                                            | "web"
                                            | "folder";
                                        file?: {
                                            title?: string;
                                            mime_type?: string;
                                            content?: string;
                                            source_url?: string;
                                        };
                                        docs?: {
                                            title?: string;
                                            type:
                                                | "docx"
                                                | "sheets"
                                                | "base"
                                                | "wiki";
                                            token: string;
                                            url?: string;
                                        };
                                        wiki_space?: {
                                            title?: string;
                                            space_id: string;
                                            sub_docs?: Array<{
                                                title?: string;
                                                type:
                                                    | "docx"
                                                    | "sheets"
                                                    | "base"
                                                    | "wiki";
                                                token: string;
                                                url?: string;
                                            }>;
                                        };
                                        folder?: {
                                            title?: string;
                                            token: string;
                                            url?: string;
                                        };
                                        helpdesk?: {
                                            helpdesk_id: string;
                                            title?: string;
                                        };
                                        datatable?: {
                                            api_name: string;
                                            title?: string;
                                        };
                                        dataset?: {
                                            api_name: string;
                                            title?: string;
                                        };
                                        web?: { url?: string; title?: string };
                                        chunk_count?: number;
                                        create_time?: number;
                                        update_time?: number;
                                        fail_message?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/knowledges/upload`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.knowledge&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=aily&resource=app.knowledge&version=v1 document }
                 *
                 * 批量创建知识
                 *
                 * 该API用于创建知识到飞书智能伙伴应用的指定知识库中。知识库中学习成功的知识可用于问答。
                 *
                 * - 如果重复添加已有知识（除文件外），会返回已有知识的ID。;- 对于飞书知识空间类型的知识，会进行分组：同一知识空间为一条知识，并返回相同的知识ID。;- 如需添加大文件，请使用上传文件为知识API。;- 暂不支持通过API创建表类型的知识。
                 */
                batchCreate: async (
                    payload?: {
                        data: {
                            knowledge_base_id?: string;
                            knowledges: Array<{
                                id?: string;
                                knowledge_base_id?: string;
                                status?:
                                    | "learned"
                                    | "learning"
                                    | "failed"
                                    | "partially";
                                title?: string;
                                type:
                                    | "docs"
                                    | "wiki_space"
                                    | "helpdesk"
                                    | "file"
                                    | "datatable"
                                    | "dataset"
                                    | "web"
                                    | "folder";
                                file?: {
                                    title?: string;
                                    mime_type?: string;
                                    content?: string;
                                    source_url?: string;
                                };
                                docs?: {
                                    title?: string;
                                    type: "docx" | "sheets" | "base" | "wiki";
                                    token: string;
                                    url?: string;
                                };
                                wiki_space?: {
                                    title?: string;
                                    space_id: string;
                                    sub_docs?: Array<{
                                        title?: string;
                                        type:
                                            | "docx"
                                            | "sheets"
                                            | "base"
                                            | "wiki";
                                        token: string;
                                        url?: string;
                                    }>;
                                };
                                folder?: {
                                    title?: string;
                                    token: string;
                                    url?: string;
                                };
                                helpdesk?: {
                                    helpdesk_id: string;
                                    title?: string;
                                };
                                datatable?: {
                                    api_name: string;
                                    title?: string;
                                };
                                dataset?: { api_name: string; title?: string };
                                web?: { url?: string; title?: string };
                                chunk_count?: number;
                                create_time?: number;
                                update_time?: number;
                                fail_message?: string;
                            }>;
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
                                    knowledges?: Array<{
                                        id?: string;
                                        knowledge_base_id?: string;
                                        status?:
                                            | "learned"
                                            | "learning"
                                            | "failed"
                                            | "partially";
                                        title?: string;
                                        type:
                                            | "docs"
                                            | "wiki_space"
                                            | "helpdesk"
                                            | "file"
                                            | "datatable"
                                            | "dataset"
                                            | "web"
                                            | "folder";
                                        file?: {
                                            title?: string;
                                            mime_type?: string;
                                            content?: string;
                                            source_url?: string;
                                        };
                                        docs?: {
                                            title?: string;
                                            type:
                                                | "docx"
                                                | "sheets"
                                                | "base"
                                                | "wiki";
                                            token: string;
                                            url?: string;
                                        };
                                        wiki_space?: {
                                            title?: string;
                                            space_id: string;
                                            sub_docs?: Array<{
                                                title?: string;
                                                type:
                                                    | "docx"
                                                    | "sheets"
                                                    | "base"
                                                    | "wiki";
                                                token: string;
                                                url?: string;
                                            }>;
                                        };
                                        folder?: {
                                            title?: string;
                                            token: string;
                                            url?: string;
                                        };
                                        helpdesk?: {
                                            helpdesk_id: string;
                                            title?: string;
                                        };
                                        datatable?: {
                                            api_name: string;
                                            title?: string;
                                        };
                                        dataset?: {
                                            api_name: string;
                                            title?: string;
                                        };
                                        web?: { url?: string; title?: string };
                                        chunk_count?: number;
                                        create_time?: number;
                                        update_time?: number;
                                        fail_message?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/knowledges/batch_create`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.knowledge&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=app.knowledge&version=v1 document }
                 *
                 * 获取单条知识信息
                 *
                 * 此API用于获取单条知识的详情信息。
                 */
                get: async (
                    payload?: {
                        path: { app_id: string; knowledge_id: string };
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
                                    knowledge?: {
                                        id?: string;
                                        knowledge_base_id?: string;
                                        status?:
                                            | "learned"
                                            | "learning"
                                            | "failed"
                                            | "partially";
                                        title?: string;
                                        type:
                                            | "docs"
                                            | "wiki_space"
                                            | "helpdesk"
                                            | "file"
                                            | "datatable"
                                            | "dataset"
                                            | "web"
                                            | "folder";
                                        file?: {
                                            title?: string;
                                            mime_type?: string;
                                            source_url?: string;
                                        };
                                        docs?: {
                                            title?: string;
                                            type:
                                                | "docx"
                                                | "sheets"
                                                | "base"
                                                | "wiki";
                                            token: string;
                                            url?: string;
                                        };
                                        wiki_space?: {
                                            title?: string;
                                            space_id: string;
                                            sub_docs?: Array<{
                                                title?: string;
                                                type:
                                                    | "docx"
                                                    | "sheets"
                                                    | "base"
                                                    | "wiki";
                                                token: string;
                                                url?: string;
                                            }>;
                                        };
                                        folder?: {
                                            title?: string;
                                            token: string;
                                            url?: string;
                                        };
                                        helpdesk?: {
                                            helpdesk_id: string;
                                            title?: string;
                                        };
                                        datatable?: {
                                            api_name: string;
                                            title?: string;
                                        };
                                        dataset?: {
                                            api_name: string;
                                            title?: string;
                                        };
                                        web?: { url?: string; title?: string };
                                        chunk_count?: number;
                                        create_time?: number;
                                        update_time?: number;
                                        fail_message?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/knowledges/:knowledge_id`,
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
                            knowledge_base_id?: string;
                            page_size?: number;
                            page_token?: string;
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
                                    `${this.domain}/open-apis/aily/v1/apps/:app_id/knowledges`,
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
                                                    knowledges?: Array<{
                                                        id?: string;
                                                        knowledge_base_id?: string;
                                                        status?:
                                                            | "learned"
                                                            | "learning"
                                                            | "failed"
                                                            | "partially";
                                                        title?: string;
                                                        type:
                                                            | "docs"
                                                            | "wiki_space"
                                                            | "helpdesk"
                                                            | "file"
                                                            | "datatable"
                                                            | "dataset"
                                                            | "web"
                                                            | "folder";
                                                        file?: {
                                                            title?: string;
                                                            mime_type?: string;
                                                            source_url?: string;
                                                        };
                                                        docs?: {
                                                            title?: string;
                                                            type:
                                                                | "docx"
                                                                | "sheets"
                                                                | "base"
                                                                | "wiki";
                                                            token: string;
                                                            url?: string;
                                                        };
                                                        wiki_space?: {
                                                            title?: string;
                                                            space_id: string;
                                                            sub_docs?: Array<{
                                                                title?: string;
                                                                type:
                                                                    | "docx"
                                                                    | "sheets"
                                                                    | "base"
                                                                    | "wiki";
                                                                token: string;
                                                                url?: string;
                                                            }>;
                                                        };
                                                        folder?: {
                                                            title?: string;
                                                            token: string;
                                                            url?: string;
                                                        };
                                                        helpdesk?: {
                                                            helpdesk_id: string;
                                                            title?: string;
                                                        };
                                                        datatable?: {
                                                            api_name: string;
                                                            title?: string;
                                                        };
                                                        dataset?: {
                                                            api_name: string;
                                                            title?: string;
                                                        };
                                                        web?: {
                                                            url?: string;
                                                            title?: string;
                                                        };
                                                        chunk_count?: number;
                                                        create_time?: number;
                                                        update_time?: number;
                                                        fail_message?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.knowledge&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=app.knowledge&version=v1 document }
                 *
                 * 获取知识列表
                 *
                 * 此API用于分页获取指定知识库的知识列表
                 */
                list: async (
                    payload?: {
                        params?: {
                            knowledge_base_id?: string;
                            page_size?: number;
                            page_token?: string;
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
                                    knowledges?: Array<{
                                        id?: string;
                                        knowledge_base_id?: string;
                                        status?:
                                            | "learned"
                                            | "learning"
                                            | "failed"
                                            | "partially";
                                        title?: string;
                                        type:
                                            | "docs"
                                            | "wiki_space"
                                            | "helpdesk"
                                            | "file"
                                            | "datatable"
                                            | "dataset"
                                            | "web"
                                            | "folder";
                                        file?: {
                                            title?: string;
                                            mime_type?: string;
                                            source_url?: string;
                                        };
                                        docs?: {
                                            title?: string;
                                            type:
                                                | "docx"
                                                | "sheets"
                                                | "base"
                                                | "wiki";
                                            token: string;
                                            url?: string;
                                        };
                                        wiki_space?: {
                                            title?: string;
                                            space_id: string;
                                            sub_docs?: Array<{
                                                title?: string;
                                                type:
                                                    | "docx"
                                                    | "sheets"
                                                    | "base"
                                                    | "wiki";
                                                token: string;
                                                url?: string;
                                            }>;
                                        };
                                        folder?: {
                                            title?: string;
                                            token: string;
                                            url?: string;
                                        };
                                        helpdesk?: {
                                            helpdesk_id: string;
                                            title?: string;
                                        };
                                        datatable?: {
                                            api_name: string;
                                            title?: string;
                                        };
                                        dataset?: {
                                            api_name: string;
                                            title?: string;
                                        };
                                        web?: { url?: string; title?: string };
                                        chunk_count?: number;
                                        create_time?: number;
                                        update_time?: number;
                                        fail_message?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/knowledges`,
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
             * app.record
             */
            appRecord: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.record&apiName=batch_upsert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_upsert&project=aily&resource=app.record&version=v1 document }
                 *
                 * 写入记录
                 *
                 * 批量创建或更新数据表下的多条记录
                 */
                batchUpsert: async (
                    payload?: {
                        data: {
                            table_type: string;
                            table_api_name: string;
                            primary_key: string;
                            records: string;
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
                                        success?: boolean;
                                        primary_key_value?: string;
                                        errors?: Array<{
                                            code?: string;
                                            message?: string;
                                        }>;
                                        _id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/records/batch_upsert`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.record&apiName=query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query&project=aily&resource=app.record&version=v1 document }
                 *
                 * SQL 方式查询记录
                 *
                 * - 使用 SQL 语法查询;- 当前仅支持分析表类型
                 */
                query: async (
                    payload?: {
                        data: {
                            query?: string;
                            option?: {
                                stringify_number?: boolean;
                                normalize_column_name?: boolean;
                            };
                            table_type: string;
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
                                    sql?: string;
                                    column_names?: Array<string>;
                                    records?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/records/query`,
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
                        data: {
                            table_type: string;
                            table_api_name: string;
                            selects: Array<string>;
                            page_size?: number;
                            page_token?: string;
                            need_total_count?: boolean;
                            filter?: string;
                            order_bys?: Array<{
                                field?: string;
                                direction?: "asc" | "desc";
                            }>;
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
                                    `${this.domain}/open-apis/aily/v1/apps/:app_id/records`,
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
                                                    next_page_token?: string;
                                                    has_more?: boolean;
                                                    total?: string;
                                                    records?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.record&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=app.record&version=v1 document }
                 *
                 * 查询记录列表
                 *
                 * 批量获取表下的多条记录
                 */
                list: async (
                    payload?: {
                        data: {
                            table_type: string;
                            table_api_name: string;
                            selects: Array<string>;
                            page_size?: number;
                            page_token?: string;
                            need_total_count?: boolean;
                            filter?: string;
                            order_bys?: Array<{
                                field?: string;
                                direction?: "asc" | "desc";
                            }>;
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
                                    next_page_token?: string;
                                    has_more?: boolean;
                                    total?: string;
                                    records?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.record&apiName=batch_remove&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_remove&project=aily&resource=app.record&version=v1 document }
                 *
                 * 删除记录
                 *
                 * 批量删除某数据表下的多条记录
                 */
                batchRemove: async (
                    payload?: {
                        data: {
                            table_type: string;
                            table_api_name: string;
                            primary_key: string;
                            records: string;
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
                                        success?: boolean;
                                        primary_key_value?: string;
                                        errors?: Array<{
                                            code?: string;
                                            message?: string;
                                        }>;
                                        _id?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/records/batch_remove`,
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
             * app.table
             */
            appTable: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.table&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=app.table&version=v1 document }
                 *
                 * 查询元信息详情
                 *
                 * 获取一个表的元信息详情，会填充所有字段信息
                 */
                get: async (
                    payload?: {
                        params: { table_type: string; fill_fields?: boolean };
                        path: { app_id: string; api_name: string };
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
                                    table?: {
                                        table_type: "dataset" | "datatable";
                                        api_name: string;
                                        label?: Record<string, string>;
                                        access_items?: Array<"read" | "write">;
                                        ai_description?: string;
                                        fields?: Array<{
                                            api_name: string;
                                            label?: Record<string, string>;
                                            ai_description?: string;
                                            access_items?: Array<
                                                "read" | "write"
                                            >;
                                            type_name?: string;
                                            field_setting?: {
                                                required?: boolean;
                                                unique?: boolean;
                                                case_sensitive?: boolean;
                                                text_max_length?: number;
                                                multiple?: boolean;
                                                lookup_object_api_name?: string;
                                                options?: Array<string>;
                                                detail?: string;
                                            };
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/tables/:api_name`,
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
                            table_type: string;
                            access_item?: string;
                            page_size?: number;
                            page_token?: string;
                            quick_query?: string;
                            api_names?: Array<string>;
                            fill_fields?: boolean;
                            need_total_count?: boolean;
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
                                    `${this.domain}/open-apis/aily/v1/apps/:app_id/tables`,
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
                                                    page_token?: string;
                                                    has_more?: boolean;
                                                    total?: string;
                                                    items?: Array<{
                                                        table_type:
                                                            | "dataset"
                                                            | "datatable";
                                                        api_name: string;
                                                        label?: Record<
                                                            string,
                                                            string
                                                        >;
                                                        access_items?: Array<
                                                            "read" | "write"
                                                        >;
                                                        ai_description?: string;
                                                        fields?: Array<{
                                                            api_name: string;
                                                            label?: Record<
                                                                string,
                                                                string
                                                            >;
                                                            ai_description?: string;
                                                            access_items?: Array<
                                                                "read" | "write"
                                                            >;
                                                            type_name?: string;
                                                            field_setting?: {
                                                                required?: boolean;
                                                                unique?: boolean;
                                                                case_sensitive?: boolean;
                                                                text_max_length?: number;
                                                                multiple?: boolean;
                                                                lookup_object_api_name?: string;
                                                                options?: Array<string>;
                                                                detail?: string;
                                                            };
                                                        }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.table&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=app.table&version=v1 document }
                 *
                 * 查询元信息列表
                 *
                 * 获取应用内元信息列表
                 */
                list: async (
                    payload?: {
                        params: {
                            table_type: string;
                            access_item?: string;
                            page_size?: number;
                            page_token?: string;
                            quick_query?: string;
                            api_names?: Array<string>;
                            fill_fields?: boolean;
                            need_total_count?: boolean;
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
                                    page_token?: string;
                                    has_more?: boolean;
                                    total?: string;
                                    items?: Array<{
                                        table_type: "dataset" | "datatable";
                                        api_name: string;
                                        label?: Record<string, string>;
                                        access_items?: Array<"read" | "write">;
                                        ai_description?: string;
                                        fields?: Array<{
                                            api_name: string;
                                            label?: Record<string, string>;
                                            ai_description?: string;
                                            access_items?: Array<
                                                "read" | "write"
                                            >;
                                            type_name?: string;
                                            field_setting?: {
                                                required?: boolean;
                                                unique?: boolean;
                                                case_sensitive?: boolean;
                                                text_max_length?: number;
                                                multiple?: boolean;
                                                lookup_object_api_name?: string;
                                                options?: Array<string>;
                                                detail?: string;
                                            };
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/tables`,
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
             * aily_session.aily_message
             */
            ailySessionAilyMessage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session.aily_message&apiName=feedback&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=feedback&project=aily&resource=aily_session.aily_message&version=v1 document }
                 *
                 * 该 API 用于向某个飞书智能伙伴应用发送的消息（Message）提交反馈。
                 */
                feedback: async (
                    payload?: {
                        data: {
                            feedback_type: "LIKE" | "DISLIKE" | "NEUTRAL";
                            reason?: string;
                            content?: string;
                        };
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
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/sessions/:aily_session_id/messages/:aily_message_id/feedback`,
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    messages?: Array<{
                                                        id?: string;
                                                        session_id?: string;
                                                        run_id?: string;
                                                        content_type?:
                                                            | "MDX"
                                                            | "TEXT"
                                                            | "CLIP"
                                                            | "SmartCard"
                                                            | "JSON";
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
                                                            identity_provider?:
                                                                | "AILY"
                                                                | "FEISHU";
                                                            sender_type?:
                                                                | "USER"
                                                                | "ASSISTANT";
                                                            aily_id?: string;
                                                        };
                                                        mentions?: Array<{
                                                            entity_id?: string;
                                                            identity_provider?:
                                                                | "AILY"
                                                                | "FEISHU";
                                                            key?: string;
                                                            name?: string;
                                                            aily_id?: string;
                                                        }>;
                                                        plain_text?: string;
                                                        created_at?: string;
                                                        status?:
                                                            | "IN_PROGRESS"
                                                            | "COMPLETED";
                                                        reasoning_content?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session.aily_message&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=aily_session.aily_message&version=v1 document }
                 *
                 * 列出 Aily 消息
                 *
                 * 该 API 用于列出某个飞书 Aily 应用的某个会话（Session）下消息（Message）的详细信息；包括消息的内容、发送人等。
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
                                        content_type?:
                                            | "MDX"
                                            | "TEXT"
                                            | "CLIP"
                                            | "SmartCard"
                                            | "JSON";
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
                                            identity_provider?:
                                                | "AILY"
                                                | "FEISHU";
                                            sender_type?: "USER" | "ASSISTANT";
                                            aily_id?: string;
                                        };
                                        mentions?: Array<{
                                            entity_id?: string;
                                            identity_provider?:
                                                | "AILY"
                                                | "FEISHU";
                                            key?: string;
                                            name?: string;
                                            aily_id?: string;
                                        }>;
                                        plain_text?: string;
                                        created_at?: string;
                                        status?: "IN_PROGRESS" | "COMPLETED";
                                        reasoning_content?: string;
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session.aily_message&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=aily_session.aily_message&version=v1 document }
                 *
                 * 获取 Aily 消息
                 *
                 * 该 API 用于获取某个飞书 Aily 应用的消息（Message）的详细信息；包括消息的内容、发送人等。
                 *
                 * ## 实体概念说明;;- **会话**（Session）：管理用户与 Aily 助手之间的交互会话；每次会话记录了用户发送给 Aily 助手的消息以及 Aily 助手的响应。;- **消息**（Message）：消息可以包含文本、表格、图片等多种类型的内容。;- **运行**（Run）：Aily 助手基于会话内消息进行意图判定、调用匹配的技能，并返回技能执行后的结果消息。
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
                                        content_type?:
                                            | "MDX"
                                            | "TEXT"
                                            | "CLIP"
                                            | "SmartCard"
                                            | "JSON";
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
                                            identity_provider?:
                                                | "AILY"
                                                | "FEISHU";
                                            sender_type?: "USER" | "ASSISTANT";
                                            aily_id?: string;
                                        };
                                        mentions?: Array<{
                                            entity_id?: string;
                                            identity_provider?:
                                                | "AILY"
                                                | "FEISHU";
                                            key?: string;
                                            name?: string;
                                            aily_id?: string;
                                        }>;
                                        plain_text?: string;
                                        created_at?: string;
                                        status?: "IN_PROGRESS" | "COMPLETED";
                                        reasoning_content?: string;
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session.aily_message&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=aily&resource=aily_session.aily_message&version=v1 document }
                 *
                 * 发送 Aily 消息
                 *
                 * 该 API 用于向某个飞书 Aily 应用发送一条消息（Message）；每个消息从属于一个活跃的会话（Session）。
                 */
                create: async (
                    payload?: {
                        data: {
                            idempotent_id: string;
                            content_type:
                                | "MDX"
                                | "TEXT"
                                | "CLIP"
                                | "SmartCard"
                                | "JSON";
                            content: string;
                            file_ids?: Array<string>;
                            quote_message_id?: string;
                            mentions?: Array<{
                                entity_id?: string;
                                identity_provider?: "AILY" | "FEISHU";
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
                                        content_type?:
                                            | "MDX"
                                            | "TEXT"
                                            | "CLIP"
                                            | "SmartCard"
                                            | "JSON";
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
                                            identity_provider?:
                                                | "AILY"
                                                | "FEISHU";
                                            sender_type?: "USER" | "ASSISTANT";
                                            aily_id?: string;
                                        };
                                        mentions?: Array<{
                                            entity_id?: string;
                                            identity_provider?:
                                                | "AILY"
                                                | "FEISHU";
                                            key?: string;
                                            name?: string;
                                            aily_id?: string;
                                        }>;
                                        plain_text?: string;
                                        created_at?: string;
                                        status?: "IN_PROGRESS" | "COMPLETED";
                                        reasoning_content?: string;
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
                                        (
                                            res as {
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.data_asset_tag&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=app.data_asset_tag&version=v1 document }
                 *
                 * 获取数据知识分类列表
                 *
                 * 获取 Aily 助手的数据知识分类列表
                 *
                 * - `tenant_access_token` 仅支持[ Aily 平台](https://aily.feishu.cn)的渠道应用身份;- `user_access_token` 要求开发者需要 Aily 平台的应用协作者角色，包括管理员、开发者、运维人员
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
             * app.skill
             */
            appSkill: {
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
                                        (
                                            res as {
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.skill&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=app.skill&version=v1 document }
                 *
                 * 查询技能列表
                 *
                 * 该 API 用于查询某个 Aily 应用的技能列表;;> 包括内置的数据分析与问答技能、以及未在对话开启的技能。
                 *
                 * 更多信息及示例代码，可参考 Aily 技能 OpenAPI 接口说明。
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
                 * 调用技能
                 *
                 * 该 API 用于调用某个 Aily 应用的特定技能，支持指定技能入参；并同步返回技能执行的结果。
                 *
                 * > **技能 API** 能显著简化业务系统的集成工作（单轮 API 调用）。技能 API 提供更贴合系统间服务调用的参数传递模式（JSON 入参 / 出参），且无需通过文本消息对话的方式调用 AI 能力。;;:::html;<div style="text-align: center;">; <img src="https://lf3-static.bytednsdoc.com/obj/eden-cn/10eh7pbovhfnuhd/aily_skill_intro.png?x-resource-account=public" width="600" />;:::;
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.skill&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=app.skill&version=v1 document }
                 *
                 * 获取技能信息
                 *
                 * 该 API 用于查询某个 Aily 应用的特定技能详情
                 *
                 * 更多信息及示例代码，可参考 Aily 技能 OpenAPI 接口说明。
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
            },
            /**
             * app.data_asset
             */
            appDataAsset: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.data_asset&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=aily&resource=app.data_asset&version=v1 document }
                 *
                 * 创建数据知识
                 *
                 * 在 Aily 中添加单个数据知识
                 *
                 * - 仅支持开发环境;- 开发者需要 Aily 平台的应用协作者角色，包括管理员、开发者、运维人员;- 使用应用身份仅支持[ Aily 平台](https://aily.feishu.cn)渠道的应用身份
                 */
                create: async (
                    payload?: {
                        data: {
                            connect_type: "import" | "direct";
                            source_type:
                                | "file"
                                | "lark_wiki_space"
                                | "lark_doc"
                                | "lark_helpdesk";
                            import_knowledge_setting?: {
                                chunk_setting?: {
                                    rule_type: "separator" | "intelligent";
                                    separate_type?: "paragraph" | "title";
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
                                lark_helpdesk?: { helpdesk_id: string };
                            };
                            description?: Record<string, string>;
                        };
                        params?: { tenant_type?: string };
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
                                    data_asset?: {
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
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/data_assets`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.data_asset&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=app.data_asset&version=v1 document }
                 *
                 * 获取数据知识
                 *
                 * 获取单个数据知识
                 *
                 * - 开发者需要 Aily 平台的应用协作者角色，包括管理员、开发者、运维人员;- 使用应用身份仅支持[ Aily 平台](https://aily.feishu.cn)渠道的应用身份
                 */
                get: async (
                    payload?: {
                        params?: {
                            with_data_asset_item?: boolean;
                            with_connect_status?: boolean;
                            with_import_setting?: boolean;
                            tenant_type?: string;
                        };
                        path: { app_id: string; data_asset_id: string };
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
                                    data_asset?: {
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
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/data_assets/:data_asset_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.data_asset&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=aily&resource=app.data_asset&version=v1 document }
                 *
                 * 删除数据知识
                 *
                 * 删除 Aily 的数据知识
                 *
                 * - 仅支持开发环境;- 开发者需要 Aily 平台的应用协作者角色，包括管理员、开发者、运维人员;- 使用应用身份仅支持[ Aily 平台](https://aily.feishu.cn)渠道的应用身份
                 */
                delete: async (
                    payload?: {
                        params?: { tenant_type?: string };
                        path: { app_id: string; data_asset_id: string };
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
                                    data_asset?: {
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
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/data_assets/:data_asset_id`,
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
                                        (
                                            res as {
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.data_asset&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=app.data_asset&version=v1 document }
                 *
                 * 获取数据知识列表
                 *
                 * 获取 Aily 助手的数据知识列表
                 *
                 * - `tenant_access_token` 仅支持[ Aily 平台](https://aily.feishu.cn)的渠道应用身份;- `user_access_token` 要求开发者需要 Aily 平台的应用协作者角色，包括管理员、开发者、运维人员
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.data_asset&apiName=upload_file&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_file&project=aily&resource=app.data_asset&version=v1 document }
                 *
                 * 上传文件用于 Aily 的数据知识管理;
                 *
                 * 上传文件用于 Aily 的数据知识管理;。
                 *
                 * - 仅支持开发环境;- 开发者需要 Aily 创建平台的应用协作者角色，包括管理员、开发者、运维人员;- 使用应用身份仅支持[ Aily 平台](https://aily.feishu.cn)渠道的应用身份;- 仅支持上传docx、txt、pdf、pptx类型的文件
                 */
                uploadFile: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                        params?: { tenant_type?: string };
                        path: { app_id: string };
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
                                data?: {
                                    file_info?: {
                                        token: string;
                                        mime_type: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/data_assets/upload_file`,
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
             * aily_session.run
             */
            ailySessionRun: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session.run&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=aily_session.run&version=v1 document }
                 *
                 * 获取运行
                 *
                 * 该 API 用于获取某个飞书 Aily 应用的运行（Run）的详细信息；包括运行的状态、结束时间等。
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
                                        status:
                                            | "QUEUED"
                                            | "IN_PROGRESS"
                                            | "REQUIRES_MESSAGE"
                                            | "CANCELLED"
                                            | "COMPLETED"
                                            | "FAILED"
                                            | "EXPIRED";
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
                                        (
                                            res as {
                                                code?: number;
                                                msg?: string;
                                                data?: {
                                                    runs?: Array<{
                                                        id: string;
                                                        created_at: string;
                                                        app_id: string;
                                                        session_id: string;
                                                        status:
                                                            | "QUEUED"
                                                            | "IN_PROGRESS"
                                                            | "REQUIRES_MESSAGE"
                                                            | "CANCELLED"
                                                            | "COMPLETED"
                                                            | "FAILED"
                                                            | "EXPIRED";
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session.run&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=aily_session.run&version=v1 document }
                 *
                 * 列出运行
                 *
                 * 该 API 用于列出某个飞书 Aily 应用的运行（Run）的详细信息；包括状态、结束时间等。
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
                                        status:
                                            | "QUEUED"
                                            | "IN_PROGRESS"
                                            | "REQUIRES_MESSAGE"
                                            | "CANCELLED"
                                            | "COMPLETED"
                                            | "FAILED"
                                            | "EXPIRED";
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=aily_session.run&apiName=cancel&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cancel&project=aily&resource=aily_session.run&version=v1 document }
                 *
                 * 中止一次运行
                 *
                 * 该 API 用于中止某个飞书 Aily 的一次运行。
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
                                        status:
                                            | "QUEUED"
                                            | "IN_PROGRESS"
                                            | "REQUIRES_MESSAGE"
                                            | "CANCELLED"
                                            | "COMPLETED"
                                            | "FAILED"
                                            | "EXPIRED";
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
                 * 创建运行
                 *
                 * 该 API 用于在某个飞书 Aily 应用会话（Session）上创建一次运行（Run）。
                 *
                 * ## 实体概念说明;;- **会话**（Session）：管理用户与 Aily 助手之间的交互会话；每次会话记录了用户发送给 Aily 助手的消息以及 Aily 助手的响应。;- **消息**（Message）：消息可以包含文本、表格、图片等多种类型的内容。;- **运行**（Run）：Aily 助手基于会话内消息进行意图判定、调用匹配的技能，并返回技能执行后的结果消息。
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
                                        status:
                                            | "QUEUED"
                                            | "IN_PROGRESS"
                                            | "REQUIRES_MESSAGE"
                                            | "CANCELLED"
                                            | "COMPLETED"
                                            | "FAILED"
                                            | "EXPIRED";
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
            },
            /**
             * app.data_asset_chunk
             */
            appDataAssetChunk: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=app.data_asset_chunk&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=aily&resource=app.data_asset_chunk&version=v1 document }
                 *
                 * 数据知识切片检索
                 *
                 * - 使用`tenant_access_token`需要在 Aily 管理后台开启”支持使用应用身份调用 API 和 SDK;- 使用 `tenant_access_token`无法对直连模式引入的飞书数据（云文档，服务台等）执行检索
                 */
                search: async (
                    payload?: {
                        data: {
                            query: string;
                            top_k?: number;
                            data_asset_ids?: Array<string>;
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
                                        content: string;
                                        data_asset_id?: string;
                                        score?: number;
                                        data_asset_label?: Record<
                                            string,
                                            string
                                        >;
                                        data_asset_source_url?: string;
                                        data_asset_data_source_type?:
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
                                        data_asset_connect_type?:
                                            | "import"
                                            | "direct";
                                        source_info?: {
                                            title?: string;
                                            url?: string;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/apps/:app_id/data_asset_chunks/search`,
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
             * agent.agent_visibility
             */
            agentAgentVisibility: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=agent.agent_visibility&apiName=check&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=check&project=aily&resource=agent.agent_visibility&version=v1 document }
                 *
                 * 获取智能体可见性
                 *
                 * 查询当前调用用户对指定智能体的可见性。接口根据UserAccessToken(用户身份凭证)解析出当前用户,结合传入的 channel_type(渠道类型),返回可见性。
                 *
                 * 典型用于 WebSDK 场景:前端据此决定是否向当前用户展示该智能体。
                 */
                check: async (
                    payload?: {
                        data: { channel_type: string };
                        path: { agent_id: string };
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
                                data?: { visibility?: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/agents/:agent_id/agent_visibility/check`,
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
             * agent.agent_attachment
             */
            agentAgentAttachment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=agent.agent_attachment&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=aily&resource=agent.agent_attachment&version=v1 document }
                 *
                 * 上传附件
                 *
                 * 本接口用于上传需智能体分析的文件，上传成功后返回附件 ID。
                 *
                 * 调用[发起对话](https://open.larkoffice.com/document/uAjLw4CM/ukTMukTMukTM/aily-v1/agent-agent_chat/create)中引用附件ID，发送给智能体识别和分析，获取智能体的分析结果和建议。
                 */
                create: async (
                    payload?: {
                        data: {
                            file?: Buffer | fs.ReadStream;
                            type: string;
                            doc_url?: string;
                        };
                        path: { agent_id: string };
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
                                data?: { agent_attachment_id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/agents/:agent_id/attachments`,
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
             * tenant.app_stat
             */
            tenantAppStat: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            start_at: string;
                            end_at: string;
                            filter_type: string;
                            page_token?: string;
                            page_size?: number;
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
                                    `${this.domain}/open-apis/aily/v1/app_stats`,
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
                                                        avg_daily_active_user_num?: number;
                                                        avg_daily_run_num?: number;
                                                        avg_daily_credit_usage?: number;
                                                        total_credit_usage?: number;
                                                        owner?: {
                                                            id: string;
                                                            name?: string;
                                                            tenant_id?: string;
                                                            lark_user_id?: string;
                                                            open_user_id?: string;
                                                            open_id?: string;
                                                        };
                                                        app_created_at?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=tenant.app_stat&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=tenant.app_stat&version=v1 document }
                 *
                 * 查询应用统计数据
                 *
                 * 该 API 用于查询租户下的工作流/智能体应用使用情况的统计数据
                 */
                list: async (
                    payload?: {
                        params: {
                            start_at: string;
                            end_at: string;
                            filter_type: string;
                            page_token?: string;
                            page_size?: number;
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
                                        avg_daily_active_user_num?: number;
                                        avg_daily_run_num?: number;
                                        avg_daily_credit_usage?: number;
                                        total_credit_usage?: number;
                                        owner?: {
                                            id: string;
                                            name?: string;
                                            tenant_id?: string;
                                            lark_user_id?: string;
                                            open_user_id?: string;
                                            open_id?: string;
                                        };
                                        app_created_at?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/app_stats`,
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
             * agent.agent_chat
             */
            agentAgentChat: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=agent.agent_chat&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=agent.agent_chat&version=v1 document }
                 *
                 * 获取对话结果
                 *
                 * 本接口用于获取智能体的对话回复，内容包括文字和产物等信息。
                 */
                get: async (
                    payload?: {
                        path: { agent_id: string; agent_chat_id: string };
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
                                    content: Array<{
                                        type?: string;
                                        text?: string;
                                        agent_artifact_id?: string;
                                        artifact_type?: string;
                                    }>;
                                    finish_reason?: string;
                                    status: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/agents/:agent_id/chats/:agent_chat_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=agent.agent_chat&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=aily&resource=agent.agent_chat&version=v1 document }
                 *
                 * 发起智能体对话
                 *
                 * 异步发起一轮智能体对话，提交用户消息后立即返回对话ID，触发智能体在后台运行。
                 *
                 * 可通过 **流式输出** 实时获取结果或[获取对话结果](/uAjLw4CM/ukTMukTMukTM/aily-v1/agent-agent_chat/get)接口轮询运行状态与回复。;* 在请求体新增参数"stream": true 即可实现SSE的流式输出，超时时间5分钟;* 在请求体新增参数"session_id": "「会话ID」"，即可复用这个session_id进行多轮对话
                 */
                create: async (
                    payload?: {
                        data: {
                            user_message: {
                                content: Array<{ type: string; text: string }>;
                                agent_attachment_ids?: Array<string>;
                            };
                            stream?: boolean;
                            session_id?: string;
                        };
                        path: { agent_id: string };
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
                                    agent_chat_id: string;
                                    session_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/agents/:agent_id/chats`,
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
             * agent.agent_chat_session
             */
            agentAgentChatSession: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=agent.agent_chat_session&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=aily&resource=agent.agent_chat_session&version=v1 document }
                 *
                 * 删除会话
                 *
                 * 本接口用于删除智能体的某次会话。
                 */
                delete: async (
                    payload?: {
                        path: {
                            agent_id: string;
                            agent_chat_session_id: string;
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
                                `${this.domain}/open-apis/aily/v1/agents/:agent_id/sessions/:agent_chat_session_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=agent.agent_chat_session&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=aily&resource=agent.agent_chat_session&version=v1 document }
                 *
                 * 创建会话
                 *
                 * 本接口用于智能体创建空白会话
                 */
                create: async (
                    payload?: {
                        data?: { name?: string };
                        path: { agent_id: string };
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
                                    session_id?: string;
                                    name?: string;
                                    created_at?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/agents/:agent_id/sessions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=agent.agent_chat_session&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=agent.agent_chat_session&version=v1 document }
                 *
                 * 获取指定会话信息
                 *
                 * 本接口用于查询智能体某次指定会话的详细信息。
                 */
                get: async (
                    payload?: {
                        path: {
                            agent_id: string;
                            agent_chat_session_id: string;
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
                                    session_id?: string;
                                    name?: string;
                                    status?: string;
                                    created_at?: string;
                                    last_chat_at?: string;
                                    turns?: {
                                        agent_chat_id?: string;
                                        created_at?: number;
                                        status?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/agents/:agent_id/sessions/:agent_chat_session_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=agent.agent_chat_session&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily&resource=agent.agent_chat_session&version=v1 document }
                 *
                 * 查询会话列表
                 *
                 * 本接口用于查询智能体的会话列表。
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
                        path: { agent_id: string };
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
                                    sessions?: Array<{
                                        session_id: string;
                                        name?: string;
                                        status?: string;
                                        created_at?: number;
                                        last_chat_at?: number;
                                    }>;
                                    has_more?: boolean;
                                    next_page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/agents/:agent_id/sessions`,
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
             * agent.agent_artifact
             */
            agentAgentArtifact: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=agent.agent_artifact&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily&resource=agent.agent_artifact&version=v1 document }
                 *
                 * 下载智能体产物
                 *
                 * 根据产物 ID(agent_artifact_id)获取该产物的下载地址及基础信息(名称、URL),用于开发者拉取智能体在会话中生成的图片、文件、云文档等产物。
                 */
                get: async (
                    payload?: {
                        path: { agent_id: string; agent_artifact_id: string };
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
                                    agent_artifact?: {
                                        artifact_id: string;
                                        name: string;
                                        url: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/agents/:agent_id/artifacts/:agent_artifact_id`,
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
             * skill_hub.tenant_builtin
             */
            skillHubTenantBuiltin: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=skill_hub.tenant_builtin&apiName=upload_or_update_tenant_builtin_skill&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_or_update_tenant_builtin_skill&project=aily&resource=skill_hub.tenant_builtin&version=v1 document }
                 *
                 * 上传技能包新建或更新（按包内技能名幂等，触发扫描）
                 */
                uploadOrUpdateTenantBuiltinSkill: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
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
                                data?: {
                                    skill_id?: string;
                                    version?: string;
                                    status?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/skill_hub/tenant_builtin/skills`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=skill_hub.tenant_builtin&apiName=batch_delete_tenant_builtin_skills&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_delete_tenant_builtin_skills&project=aily&resource=skill_hub.tenant_builtin&version=v1 document }
                 *
                 * 批量下架删除（不可恢复）
                 */
                batchDeleteTenantBuiltinSkills: async (
                    payload?: {
                        params: { skill_ids: Array<string> };
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
                                `${this.domain}/open-apis/aily/v1/skill_hub/tenant_builtin/skills`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=skill_hub.tenant_builtin&apiName=batch_query_tenant_builtin_skills&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_query_tenant_builtin_skills&project=aily&resource=skill_hub.tenant_builtin&version=v1 document }
                 *
                 * 批量查询已供给的内置技能列表及状态
                 */
                batchQueryTenantBuiltinSkills: async (
                    payload?: {
                        params?: {
                            status?: string;
                            page?: string;
                            page_size?: string;
                            skill_ids?: Array<string>;
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
                                        skill_id?: string;
                                        name?: string;
                                        label?: string;
                                        description?: string;
                                        version?: string;
                                        status?: string;
                                        scan_fail_reason?: string;
                                        visibility?: {
                                            type: number;
                                            entities?: Array<{
                                                type: number;
                                                entity_id: string;
                                            }>;
                                        };
                                        updated_at?: string;
                                        tags_json?: string;
                                        category_info?: {
                                            category_uid: string;
                                            name_zh?: string;
                                            name_en?: string;
                                        };
                                        operation_info?: {
                                            is_featured?: boolean;
                                            is_special_recommended?: boolean;
                                            show_skill_md?: boolean;
                                        };
                                    }>;
                                    total?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/skill_hub/tenant_builtin/skills`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=skill_hub.tenant_builtin&apiName=update_tenant_builtin_skill_meta&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_tenant_builtin_skill_meta&project=aily&resource=skill_hub.tenant_builtin&version=v1 document }
                 *
                 * 更新技能信息（名称/描述/可见范围，轻量不重扫）
                 */
                updateTenantBuiltinSkillMeta: async (
                    payload?: {
                        data?: {
                            label?: string;
                            description?: string;
                            visibility?: {
                                type: number;
                                entities?: Array<{
                                    type: number;
                                    entity_id: string;
                                }>;
                            };
                            tags_json?: string;
                            category_uid?: string;
                            operation_info?: {
                                is_featured?: boolean;
                                is_special_recommended?: boolean;
                                show_skill_md?: boolean;
                            };
                        };
                        path: { skill_id: string };
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
                                `${this.domain}/open-apis/aily/v1/skill_hub/tenant_builtin/skills/:skill_id`,
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
             * skill_hub.skill_hub
             */
            skillHubSkillHub: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily&resource=skill_hub.skill_hub&apiName=list_skill_categories_for_open_api&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list_skill_categories_for_open_api&project=aily&resource=skill_hub.skill_hub&version=v1 document }
                 *
                 * 获取全量技能分类目录
                 */
                listSkillCategoriesForOpenApi: async (
                    payload?: {},
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
                                    category_infos?: Array<{
                                        category_uid: string;
                                        name_zh?: string;
                                        name_en?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily/v1/skill_hub/categories`,
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
