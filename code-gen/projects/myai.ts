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
import myai_url_extension from "./myai_url_extension";

// auto gen
export default abstract class Client extends myai_url_extension {
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
    myai = {
        v1: {
            /**
             * message
             */
            message: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai&resource=message&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=myai&resource=message&version=v1 document }
                 */
                patch: async (
                    payload?: {
                        data: { verify_token: string; content: string };
                        path: { message_id: string };
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
                                `${this.domain}/open-apis/myai/v1/messages/:message_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai&resource=message&apiName=non_stream_send&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=non_stream_send&project=myai&resource=message&version=v1 document }
                 *
                 * 发送智能伙伴非流式消息
                 */
                nonStreamSend: async (
                    payload?: {
                        data: {
                            verify_token: string;
                            message_type: string;
                            content: string;
                        };
                        params?: { uuid?: string };
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
                                data?: { message_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai/v1/messages/non_stream_send`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai&resource=message&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=myai&resource=message&version=v1 document }
                 *
                 * 发送智能伙伴流式消息
                 */
                create: async (
                    payload?: {
                        data: {
                            verify_token: string;
                            unique_id?: string;
                            sequence: number;
                            code: number;
                            message_type: string;
                            delta_content: string;
                            full_content: string;
                            references?: Array<{ url: string; title?: string }>;
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
                                data?: { message_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai/v1/messages`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai&resource=message&apiName=create_follow_up&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_follow_up&project=myai&resource=message&version=v1 document }
                 *
                 * 推送自定义快捷指令
                 */
                createFollowUp: async (
                    payload?: {
                        data: {
                            follow_up_list: Array<{ text: string }>;
                            message_id?: string;
                            verify_token: string;
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
                                `${this.domain}/open-apis/myai/v1/messages/create_follow_up`,
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
             * myai_scene
             */
            myaiScene: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai&resource=myai_scene&apiName=batch_open&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_open&project=myai&resource=myai_scene&version=v1 document }
                 */
                batchOpen: async (
                    payload?: {
                        data: { member_ids: Array<string> };
                        params?: {
                            member_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { myai_scene_id: string };
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
                                    no_perm_member_ids?: Array<string>;
                                    invalid_member_ids?: Array<string>;
                                    user_no_myai_perm_member_ids?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai/v1/myai_scenes/:myai_scene_id/batch_open`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai&resource=myai_scene&apiName=deactivate&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=deactivate&project=myai&resource=myai_scene&version=v1 document }
                 */
                deactivate: async (
                    payload?: {
                        path: { myai_scene_id: string };
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
                                `${this.domain}/open-apis/myai/v1/myai_scenes/:myai_scene_id/deactivate`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai&resource=myai_scene&apiName=activate&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=activate&project=myai&resource=myai_scene&version=v1 document }
                 */
                activate: async (
                    payload?: {
                        path: { myai_scene_id: string };
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
                                `${this.domain}/open-apis/myai/v1/myai_scenes/:myai_scene_id/activate`,
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
                        params?: { page_token?: string; page_size?: number };
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
                                    `${this.domain}/open-apis/myai/v1/myai_scenes`,
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
                                                    scenes?: Array<{
                                                        id?: string;
                                                        name?: string;
                                                        description?: string;
                                                        greeting?: string;
                                                        guide_question_list?: Array<{
                                                            guide_question_content?: string;
                                                        }>;
                                                        icon_key?: string;
                                                        shared_link?: string;
                                                        card_conf?: {
                                                            card_type?:
                                                                | "default"
                                                                | "call_back"
                                                                | "event";
                                                            call_back_url?: string;
                                                            call_back_url_is_internal?: boolean;
                                                        };
                                                        is_official?: boolean;
                                                        status?:
                                                            | "activation"
                                                            | "disabled";
                                                        is_support_chat?: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai&resource=myai_scene&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=myai&resource=myai_scene&version=v1 document }
                 */
                list: async (
                    payload?: {
                        params?: { page_token?: string; page_size?: number };
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
                                    scenes?: Array<{
                                        id?: string;
                                        name?: string;
                                        description?: string;
                                        greeting?: string;
                                        guide_question_list?: Array<{
                                            guide_question_content?: string;
                                        }>;
                                        icon_key?: string;
                                        shared_link?: string;
                                        card_conf?: {
                                            card_type?:
                                                | "default"
                                                | "call_back"
                                                | "event";
                                            call_back_url?: string;
                                            call_back_url_is_internal?: boolean;
                                        };
                                        is_official?: boolean;
                                        status?: "activation" | "disabled";
                                        is_support_chat?: boolean;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai/v1/myai_scenes`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai&resource=myai_scene&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=myai&resource=myai_scene&version=v1 document }
                 */
                get: async (
                    payload?: {
                        path: { myai_scene_id: string };
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
                                    scene?: {
                                        id?: string;
                                        name?: string;
                                        description?: string;
                                        greeting?: string;
                                        guide_question_list?: Array<{
                                            guide_question_content?: string;
                                        }>;
                                        icon_key?: string;
                                        shared_link?: string;
                                        card_conf?: {
                                            card_type?:
                                                | "default"
                                                | "call_back"
                                                | "event";
                                            call_back_url?: string;
                                            call_back_url_is_internal?: boolean;
                                        };
                                        is_official?: boolean;
                                        status?: "activation" | "disabled";
                                        is_support_chat?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai/v1/myai_scenes/:myai_scene_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai&resource=myai_scene&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=myai&resource=myai_scene&version=v1 document }
                 */
                patch: async (
                    payload?: {
                        data?: {
                            update_myai_scene?: {
                                name?: string;
                                description?: string;
                                greeting?: string;
                                guide_question_list?: Array<{
                                    guide_question_content?: string;
                                }>;
                                icon_key?: string;
                                card_conf?: {
                                    card_type?:
                                        | "default"
                                        | "call_back"
                                        | "event";
                                    call_back_url?: string;
                                    call_back_url_is_internal?: boolean;
                                };
                                is_support_chat?: boolean;
                            };
                        };
                        path: { myai_scene_id: string };
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
                                    myai_scene?: {
                                        id?: string;
                                        name?: string;
                                        description?: string;
                                        greeting?: string;
                                        guide_question_list?: Array<{
                                            guide_question_content?: string;
                                        }>;
                                        icon_key?: string;
                                        shared_link?: string;
                                        card_conf?: {
                                            card_type?:
                                                | "default"
                                                | "call_back"
                                                | "event";
                                            call_back_url?: string;
                                            call_back_url_is_internal?: boolean;
                                        };
                                        is_official?: boolean;
                                        status?: "activation" | "disabled";
                                        is_support_chat?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai/v1/myai_scenes/:myai_scene_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=myai&resource=myai_scene&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=myai&resource=myai_scene&version=v1 document }
                 */
                create: async (
                    payload?: {
                        data?: {
                            myai_scene?: {
                                name: string;
                                description: string;
                                greeting?: string;
                                guide_question_list?: Array<{
                                    guide_question_content?: string;
                                }>;
                                icon_key?: string;
                                card_conf?: {
                                    card_type?:
                                        | "default"
                                        | "call_back"
                                        | "event";
                                    call_back_url?: string;
                                    call_back_url_is_internal?: boolean;
                                };
                                is_official?: boolean;
                                is_support_chat?: boolean;
                            };
                        };
                        params?: { add_for_app_owner?: boolean };
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
                                    myai_scene?: {
                                        id?: string;
                                        name?: string;
                                        description?: string;
                                        greeting?: string;
                                        guide_question_list?: Array<{
                                            guide_question_content?: string;
                                        }>;
                                        icon_key?: string;
                                        shared_link?: string;
                                        card_conf?: {
                                            card_type?:
                                                | "default"
                                                | "call_back"
                                                | "event";
                                            call_back_url?: string;
                                            call_back_url_is_internal?: boolean;
                                        };
                                        is_official?: boolean;
                                        status?: "activation" | "disabled";
                                        is_support_chat?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai/v1/myai_scenes`,
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
             * myai_usable
             */
            myaiUsable: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai&resource=myai_usable&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=myai&resource=myai_usable&version=v1 document }
                 */
                get: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { usable?: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai/v1/myai_usable`,
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
             * message.resource
             */
            messageResource: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai&resource=message.resource&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=myai&resource=message.resource&version=v1 document }
                 */
                get: async (
                    payload?: {
                        params: { type: string; verify_token: string };
                        path: { message_id: string; file_key: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/myai/v1/messages/:message_id/resources/:file_key`,
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
            },
            /**
             * myai_feed_top_pin
             */
            myaiFeedTopPin: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=myai&resource=myai_feed_top_pin&apiName=toggle&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=toggle&project=myai&resource=myai_feed_top_pin&version=v1 document }
                 */
                toggle: async (
                    payload?: {
                        data: {
                            tenant_id_list: Array<string>;
                            user_id_list?: Array<string>;
                            mode: number;
                            operate: number;
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
                                `${this.domain}/open-apis/myai/v1/myai_feed_top_pin/toggle`,
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
