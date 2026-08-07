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
import myai_im_extension from "./myai_im_extension";

// auto gen
export default abstract class Client extends myai_im_extension {
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
    myai_mail = {
        v1: {
            /**
             * myai
             */
            myai: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=embedded_chat_action&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=embedded_chat_action&project=myai_mail&resource=myai&version=v1 document }
                 */
                embeddedChatAction: async (
                    payload?: {
                        data?: {
                            intention?: string;
                            scenario_context?: {
                                extensions?: Array<{ key?: string }>;
                                object?: { type?: string; biz_id?: string };
                                work_mode?: number;
                                scenario?: string;
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: string;
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                extra?: {
                                    account_id?: string;
                                    biz_ids?: string;
                                    thread_biz_ids?: string;
                                    ai_chat_mode_id?: string;
                                    is_select_all?: string;
                                    label_id?: string;
                                    folder_id?: string;
                                    exclude_msg_biz_ids?: string;
                                    exclude_thread_biz_ids?: string;
                                    is_stranger_thread?: string;
                                    embedded_chat_my_ai_extra_pb_str?: string;
                                };
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
                                }>;
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
                                    result?: {
                                        answer?: string;
                                        reference?: {
                                            references?: Array<{
                                                passage_source?: number;
                                                title?: string;
                                                url?: string;
                                                available?: boolean;
                                            }>;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/embedded_chat_action`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=message_vector_search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=message_vector_search&project=myai_mail&resource=myai&version=v1 document }
                 */
                messageVectorSearch: async (
                    payload?: {
                        data?: {
                            tool_raw_instruction?: string;
                            scenario_context?: {
                                extensions?: Array<{ key?: string }>;
                                object?: { type?: string; biz_id?: string };
                                work_mode?: number;
                                scenario?: string;
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: string;
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                extra?: {
                                    account_id?: string;
                                    biz_ids?: string;
                                    thread_biz_ids?: string;
                                    ai_chat_mode_id?: string;
                                    is_select_all?: string;
                                    label_id?: string;
                                    folder_id?: string;
                                    exclude_msg_biz_ids?: string;
                                    exclude_thread_biz_ids?: string;
                                    is_stranger_thread?: string;
                                    embedded_chat_my_ai_extra_pb_str?: string;
                                };
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
                                }>;
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
                                    result?: {
                                        answer?: string;
                                        reference?: {
                                            references?: Array<{
                                                passage_source?: number;
                                                title?: string;
                                                url?: string;
                                                available?: boolean;
                                            }>;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/message_vector_search`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=get_mail_message_by_biz_id&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_mail_message_by_biz_id&project=myai_mail&resource=myai&version=v1 document }
                 */
                getMailMessageByBizId: async (
                    payload?: {
                        data?: { message_biz_ids?: string };
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
                                    result?: {
                                        message_content_list?: Array<{
                                            biz_id?: string;
                                            sender?: string;
                                            to?: Array<string>;
                                            cc?: Array<string>;
                                            bcc?: Array<string>;
                                            subject?: string;
                                            content?: string;
                                            attachment_names?: Array<string>;
                                            applink?: string;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/get_mail_message_by_biz_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=get_create_todo_link&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_create_todo_link&project=myai_mail&resource=myai&version=v1 document }
                 */
                getCreateTodoLink: async (
                    payload?: {
                        data?: {
                            title?: string;
                            email_subject?: string;
                            email_link?: string;
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
                                data?: { result?: { todo_link?: string } };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/get_create_todo_link`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=get_create_draft_link&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_create_draft_link&project=myai_mail&resource=myai&version=v1 document }
                 */
                getCreateDraftLink: async (
                    payload?: {
                        data?: {
                            reply_to?: string;
                            subject?: string;
                            content?: string;
                            receiver?: string;
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
                                data?: { result?: { draft_link?: string } };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/get_create_draft_link`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=get_mark_read_link&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_mark_read_link&project=myai_mail&resource=myai&version=v1 document }
                 */
                getMarkReadLink: async (
                    payload?: {
                        data?: { message_biz_ids?: string };
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
                                data?: { result?: { mark_read_link?: string } };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/get_mark_read_link`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=messages_read&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=messages_read&project=myai_mail&resource=myai&version=v1 document }
                 */
                messagesRead: async (
                    payload?: {
                        data?: {
                            message_biz_ids?: string;
                            scenario_context?: {
                                extensions?: Array<{ key?: string }>;
                                object?: { type?: string; biz_id?: string };
                                work_mode?: number;
                                scenario?: string;
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: string;
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                extra?: {
                                    account_id?: string;
                                    biz_ids?: string;
                                    thread_biz_ids?: string;
                                    ai_chat_mode_id?: string;
                                    is_select_all?: string;
                                    label_id?: string;
                                    folder_id?: string;
                                    exclude_msg_biz_ids?: string;
                                    exclude_thread_biz_ids?: string;
                                    is_stranger_thread?: string;
                                    embedded_chat_my_ai_extra_pb_str?: string;
                                };
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
                                }>;
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
                                    result?: {
                                        message_biz_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/messages_read`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=messages_unflagged&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=messages_unflagged&project=myai_mail&resource=myai&version=v1 document }
                 */
                messagesUnflagged: async (
                    payload?: {
                        data?: {
                            message_biz_ids?: string;
                            scenario_context?: {
                                extensions?: Array<{ key?: string }>;
                                object?: { type?: string; biz_id?: string };
                                work_mode?: number;
                                scenario?: string;
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: string;
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                extra?: {
                                    account_id?: string;
                                    biz_ids?: string;
                                    thread_biz_ids?: string;
                                    ai_chat_mode_id?: string;
                                    is_select_all?: string;
                                    label_id?: string;
                                    folder_id?: string;
                                    exclude_msg_biz_ids?: string;
                                    exclude_thread_biz_ids?: string;
                                    is_stranger_thread?: string;
                                    embedded_chat_my_ai_extra_pb_str?: string;
                                };
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
                                }>;
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
                                    result?: {
                                        message_biz_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/messages_unflagged`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=messages_unread&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=messages_unread&project=myai_mail&resource=myai&version=v1 document }
                 */
                messagesUnread: async (
                    payload?: {
                        data?: {
                            message_biz_ids?: string;
                            scenario_context?: {
                                extensions?: Array<{ key?: string }>;
                                object?: { type?: string; biz_id?: string };
                                work_mode?: number;
                                scenario?: string;
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: string;
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                extra?: {
                                    account_id?: string;
                                    biz_ids?: string;
                                    thread_biz_ids?: string;
                                    ai_chat_mode_id?: string;
                                    is_select_all?: string;
                                    label_id?: string;
                                    folder_id?: string;
                                    exclude_msg_biz_ids?: string;
                                    exclude_thread_biz_ids?: string;
                                    is_stranger_thread?: string;
                                    embedded_chat_my_ai_extra_pb_str?: string;
                                };
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
                                }>;
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
                                    result?: {
                                        message_biz_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/messages_unread`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=messages_flagged&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=messages_flagged&project=myai_mail&resource=myai&version=v1 document }
                 */
                messagesFlagged: async (
                    payload?: {
                        data?: {
                            message_biz_ids?: string;
                            scenario_context?: {
                                extensions?: Array<{ key?: string }>;
                                object?: { type?: string; biz_id?: string };
                                work_mode?: number;
                                scenario?: string;
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: string;
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                extra?: {
                                    account_id?: string;
                                    biz_ids?: string;
                                    thread_biz_ids?: string;
                                    ai_chat_mode_id?: string;
                                    is_select_all?: string;
                                    label_id?: string;
                                    folder_id?: string;
                                    exclude_msg_biz_ids?: string;
                                    exclude_thread_biz_ids?: string;
                                    is_stranger_thread?: string;
                                    embedded_chat_my_ai_extra_pb_str?: string;
                                };
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
                                }>;
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
                                    result?: {
                                        message_biz_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/messages_flagged`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=messages_archive&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=messages_archive&project=myai_mail&resource=myai&version=v1 document }
                 */
                messagesArchive: async (
                    payload?: {
                        data?: {
                            message_biz_ids?: string;
                            scenario_context?: {
                                extensions?: Array<{ key?: string }>;
                                object?: { type?: string; biz_id?: string };
                                work_mode?: number;
                                scenario?: string;
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: string;
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                extra?: {
                                    account_id?: string;
                                    biz_ids?: string;
                                    thread_biz_ids?: string;
                                    ai_chat_mode_id?: string;
                                    is_select_all?: string;
                                    label_id?: string;
                                    folder_id?: string;
                                    exclude_msg_biz_ids?: string;
                                    exclude_thread_biz_ids?: string;
                                    is_stranger_thread?: string;
                                    embedded_chat_my_ai_extra_pb_str?: string;
                                };
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
                                }>;
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
                                    result?: {
                                        message_biz_ids?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/messages_archive`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=create_label&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_label&project=myai_mail&resource=myai&version=v1 document }
                 */
                createLabel: async (
                    payload?: {
                        data?: {
                            label_name?: string;
                            color_type?: string;
                            scenario_context?: {
                                extensions?: Array<{ key?: string }>;
                                object?: { type?: string; biz_id?: string };
                                work_mode?: number;
                                scenario?: string;
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: string;
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                extra?: {
                                    account_id?: string;
                                    biz_ids?: string;
                                    thread_biz_ids?: string;
                                    ai_chat_mode_id?: string;
                                    is_select_all?: string;
                                    label_id?: string;
                                    folder_id?: string;
                                    exclude_msg_biz_ids?: string;
                                    exclude_thread_biz_ids?: string;
                                    is_stranger_thread?: string;
                                    embedded_chat_my_ai_extra_pb_str?: string;
                                };
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
                                }>;
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
                                    result?: {
                                        id?: string;
                                        name?: string;
                                        text_color?: string;
                                        background_color?: string;
                                        path?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/create_label`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=search_user_emails&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_user_emails&project=myai_mail&resource=myai&version=v1 document }
                 */
                searchUserEmails: async (
                    payload?: {
                        data?: {
                            start_time?: string;
                            end_time?: string;
                            sender?: string;
                            receiver?: string;
                            label_or_folder?: string;
                            keyword?: string;
                            attachment_name?: string;
                            has_attachment?: string;
                            cursor?: string;
                            is_read?: string;
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
                                    result?: {
                                        messages?: Array<{
                                            biz_id?: string;
                                            sender?: string;
                                            to?: Array<string>;
                                            cc?: Array<string>;
                                            bcc?: Array<string>;
                                            subject?: string;
                                            content?: string;
                                            attachment_names?: Array<string>;
                                            applink?: string;
                                        }>;
                                        cursor?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/search_user_emails`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=search_user_emails_with_card&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_user_emails_with_card&project=myai_mail&resource=myai&version=v1 document }
                 */
                searchUserEmailsWithCard: async (
                    payload?: {
                        data?: { user_input?: string };
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
                                    result?: {
                                        messages?: Array<{
                                            title?: string;
                                            token?: string;
                                            applink?: string;
                                        }>;
                                    };
                                    present?: {
                                        type: string;
                                        body: string;
                                        operation_type?: string;
                                        interactable?: boolean;
                                        callback_url?: string;
                                        callback_info?: string;
                                        operation_url?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/search_user_emails_with_card`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=summarize_unread_emails_with_card&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=summarize_unread_emails_with_card&project=myai_mail&resource=myai&version=v1 document }
                 */
                summarizeUnreadEmailsWithCard: async (
                    payload?: {
                        data?: {
                            start_time?: string;
                            end_time?: string;
                            timezone?: string;
                            cursor?: string;
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
                                    result?: {
                                        messages?: Array<{
                                            title?: string;
                                            token?: string;
                                            applink?: string;
                                        }>;
                                        cursor?: string;
                                    };
                                    present?: {
                                        type: string;
                                        body: string;
                                        operation_type?: string;
                                        interactable?: boolean;
                                        callback_url?: string;
                                        callback_info?: string;
                                        operation_url?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/summarize_unread_emails_with_card`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=qa_with_message_biz_id&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=qa_with_message_biz_id&project=myai_mail&resource=myai&version=v1 document }
                 */
                qaWithMessageBizId: async (
                    payload?: {
                        data?: { message_biz_id?: string; question?: string };
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
                                    result?: {
                                        answer?: string;
                                        reference?: {
                                            references?: Array<{
                                                passage_source?: number;
                                                title?: string;
                                                url?: string;
                                                available?: boolean;
                                            }>;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/qa_with_message_biz_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=create_folder&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_folder&project=myai_mail&resource=myai&version=v1 document }
                 */
                createFolder: async (
                    payload?: {
                        data?: {
                            folder_name?: string;
                            scenario_context?: {
                                extensions?: Array<{ key?: string }>;
                                object?: { type?: string; biz_id?: string };
                                work_mode?: number;
                                scenario?: string;
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: string;
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                extra?: {
                                    account_id?: string;
                                    biz_ids?: string;
                                    thread_biz_ids?: string;
                                    ai_chat_mode_id?: string;
                                    is_select_all?: string;
                                    label_id?: string;
                                    folder_id?: string;
                                    exclude_msg_biz_ids?: string;
                                    exclude_thread_biz_ids?: string;
                                    is_stranger_thread?: string;
                                    embedded_chat_my_ai_extra_pb_str?: string;
                                };
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
                                }>;
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
                                    result?: {
                                        id?: string;
                                        name?: string;
                                        parent_folder_id?: string;
                                        folder_type?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/create_folder`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=create_mail_contact&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_mail_contact&project=myai_mail&resource=myai&version=v1 document }
                 */
                createMailContact: async (
                    payload?: {
                        data?: {
                            name?: string;
                            company?: string;
                            phone?: string;
                            mail_address?: string;
                            tag?: string;
                            remark?: string;
                            position?: string;
                            scenario_context?: {
                                extensions?: Array<{ key?: string }>;
                                object?: { type?: string; biz_id?: string };
                                work_mode?: number;
                                scenario?: string;
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: string;
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                extra?: {
                                    account_id?: string;
                                    biz_ids?: string;
                                    thread_biz_ids?: string;
                                    ai_chat_mode_id?: string;
                                    is_select_all?: string;
                                    label_id?: string;
                                    folder_id?: string;
                                    exclude_msg_biz_ids?: string;
                                    exclude_thread_biz_ids?: string;
                                    is_stranger_thread?: string;
                                    embedded_chat_my_ai_extra_pb_str?: string;
                                };
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
                                }>;
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
                                    result?: {
                                        id?: string;
                                        name?: string;
                                        company?: string;
                                        phone?: string;
                                        mail_address?: string;
                                        tag?: string;
                                        remark?: string;
                                        position?: string;
                                        avatar?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/create_mail_contact`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai&apiName=embedded_chat&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=embedded_chat&project=myai_mail&resource=myai&version=v1 document }
                 */
                embeddedChat: async (
                    payload?: {
                        data?: {
                            tool_raw_instruction?: string;
                            scenario_context?: {
                                extensions?: Array<{ key?: string }>;
                                object?: { type?: string; biz_id?: string };
                                work_mode?: number;
                                scenario?: string;
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: string;
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                extra?: {
                                    account_id?: string;
                                    biz_ids?: string;
                                    thread_biz_ids?: string;
                                    ai_chat_mode_id?: string;
                                    is_select_all?: string;
                                    label_id?: string;
                                    folder_id?: string;
                                    exclude_msg_biz_ids?: string;
                                    exclude_thread_biz_ids?: string;
                                    is_stranger_thread?: string;
                                    embedded_chat_my_ai_extra_pb_str?: string;
                                };
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
                                }>;
                            };
                            scenario_context_schema_version?: string;
                            intention?: string;
                            embedded_chat_my_ai_extra_pb_str?: string;
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
                                    result?: {
                                        answer?: string;
                                        reference?: {
                                            references?: Array<{
                                                passage_source?: number;
                                                title?: string;
                                                url?: string;
                                                available?: boolean;
                                            }>;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/embedded_chat`,
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
             * myai.message
             */
            myaiMessage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai.message&apiName=read&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=read&project=myai_mail&resource=myai.message&version=v1 document }
                 */
                read: async (
                    payload?: {
                        data?: {
                            message_biz_id?: string;
                            scenario_context?: {
                                extensions?: Array<{ key?: string }>;
                                object?: { type?: string; biz_id?: string };
                                work_mode?: number;
                                scenario?: string;
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: string;
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                extra?: {
                                    account_id?: string;
                                    biz_ids?: string;
                                    thread_biz_ids?: string;
                                    ai_chat_mode_id?: string;
                                    is_select_all?: string;
                                    label_id?: string;
                                    folder_id?: string;
                                    exclude_msg_biz_ids?: string;
                                    exclude_thread_biz_ids?: string;
                                    is_stranger_thread?: string;
                                    embedded_chat_my_ai_extra_pb_str?: string;
                                };
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
                                }>;
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
                                data?: { result?: { message_biz_id?: string } };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/message/read`,
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
             * myai.folder
             */
            myaiFolder: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai_mail&resource=myai.folder&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=myai_mail&resource=myai.folder&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            folder_name?: string;
                            scenario_context?: {
                                extensions?: Array<{ key?: string }>;
                                object?: { type?: string; biz_id?: string };
                                work_mode?: number;
                                scenario?: string;
                                system_info?: {
                                    time?: string;
                                    time_zone?: string;
                                    lang?: string;
                                    brand?: string;
                                    weekday?: string;
                                    session_id?: string;
                                    shadow_name?: string;
                                    locale?: string;
                                    app_version?: string;
                                };
                                extra?: {
                                    account_id?: string;
                                    biz_ids?: string;
                                    thread_biz_ids?: string;
                                    ai_chat_mode_id?: string;
                                    is_select_all?: string;
                                    label_id?: string;
                                    folder_id?: string;
                                    exclude_msg_biz_ids?: string;
                                    exclude_thread_biz_ids?: string;
                                    is_stranger_thread?: string;
                                    embedded_chat_my_ai_extra_pb_str?: string;
                                };
                                memory?: Array<{
                                    role?: string;
                                    content?: string;
                                }>;
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
                                    result?: {
                                        id?: string;
                                        name?: string;
                                        parent_folder_id?: string;
                                        folder_type?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai_mail/v1/myai/folder`,
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
