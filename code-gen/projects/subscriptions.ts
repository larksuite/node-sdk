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
import speech_to_text from "./speech_to_text";

// auto gen
export default abstract class Client extends speech_to_text {
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
    subscriptions = {
        v1: {
            /**
             * image
             */
            image: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=subscriptions&resource=image&apiName=transfer&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=transfer&project=subscriptions&resource=image&version=v1 document }
                 *
                 * 转存图片
                 *
                 * 该接口用于转存用户提供的互联网图片，获取订阅号内可用的图片链接。支持JPEG、PNG、WEBP、GIF、TIFF格式图片。
                 */
                transfer: async (
                    payload?: {
                        data: { original_url: string };
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
                                data?: { url?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/subscriptions/v1/images/transfer`,
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
             * account.message
             */
            accountMessage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=subscriptions&resource=account.message&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=subscriptions&resource=account.message&version=v1 document }
                 *
                 * 获取消息内容
                 *
                 * 根据消息 ID 获取消息内容。
                 */
                get: async (
                    payload?: {
                        path?: { account_id?: string; message_id?: string };
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
                                        articles: Array<{
                                            id?: string;
                                            title: string;
                                            cover?: {
                                                origin_cover: string;
                                                message_cover?: string;
                                                article_cover?: string;
                                            };
                                            content?: string;
                                            external_link_url?: string;
                                            article_type: number;
                                            content_source_url?: string;
                                            author?: string;
                                            i18n_title?: {
                                                zh_cn: string;
                                                en_us: string;
                                                ja_jp: string;
                                            };
                                            i18n_content?: {
                                                zh_cn: string;
                                                en_us: string;
                                                ja_jp: string;
                                            };
                                            i18n_author?: {
                                                zh_cn: string;
                                                en_us: string;
                                                ja_jp: string;
                                            };
                                            article_config: {
                                                allow_comment?: boolean;
                                                allow_forward?: boolean;
                                                share_type?: number;
                                                comment_display_type?: number;
                                                dialog_effective_time?: string;
                                                dialog_closable?: boolean;
                                            };
                                            digest?: string;
                                            i18n_digest?: {
                                                zh_cn: string;
                                                en_us: string;
                                                ja_jp: string;
                                            };
                                            release_time?: string;
                                            article_link?: string;
                                            dialog_button_text?: string;
                                            i18n_dialog_button_text?: {
                                                zh_cn: string;
                                                en_us: string;
                                                ja_jp: string;
                                            };
                                        }>;
                                        release_time?: string;
                                        status?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/subscriptions/v1/accounts/:account_id/messages/:message_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=subscriptions&resource=account.message&apiName=send&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=send&project=subscriptions&resource=account.message&version=v1 document }
                 *
                 * 发送消息
                 *
                 * 发送消息，将草稿态的消息发送给订阅的用户，支持立即发送与定时发送。需先调用创建消息接口获取message_id，再使用本接口发送已创建的草稿消息。
                 */
                send: async (
                    payload?: {
                        data: {
                            send_type: number;
                            send_time?: string;
                            send_range?: {
                                range_type: number;
                                members?: Array<{
                                    type: number;
                                    user_id?: string;
                                    department_id?: string;
                                }>;
                                admin_groups?: Array<{ id: string }>;
                            };
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { account_id?: string; message_id?: string };
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
                                `${this.domain}/open-apis/subscriptions/v1/accounts/:account_id/messages/:message_id/send`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=subscriptions&resource=account.message&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=subscriptions&resource=account.message&version=v1 document }
                 *
                 * 创建消息
                 *
                 * 该接口用于创建订阅号消息。
                 */
                create: async (
                    payload?: {
                        data: {
                            articles: Array<{
                                title: string;
                                cover?: {
                                    origin_cover: string;
                                    message_cover?: string;
                                    article_cover?: string;
                                };
                                content?: string;
                                external_link_url?: string;
                                article_type: number;
                                content_source_url?: string;
                                author?: string;
                                i18n_title?: {
                                    zh_cn: string;
                                    en_us: string;
                                    ja_jp: string;
                                };
                                i18n_content?: {
                                    zh_cn: string;
                                    en_us: string;
                                    ja_jp: string;
                                };
                                i18n_author?: {
                                    zh_cn: string;
                                    en_us: string;
                                    ja_jp: string;
                                };
                                article_config: {
                                    allow_comment?: boolean;
                                    allow_forward?: boolean;
                                    share_type?: number;
                                    comment_display_type?: number;
                                    dialog_effective_time?: string;
                                    dialog_closable?: boolean;
                                };
                                digest?: string;
                                i18n_digest?: {
                                    zh_cn: string;
                                    en_us: string;
                                    ja_jp: string;
                                };
                                dialog_button_text?: string;
                                i18n_dialog_button_text?: {
                                    zh_cn: string;
                                    en_us: string;
                                    ja_jp: string;
                                };
                            }>;
                        };
                        path?: { account_id?: string };
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
                                    message_id?: string;
                                    article_ids?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/subscriptions/v1/accounts/:account_id/messages`,
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
                            released?: boolean;
                        };
                        path?: { account_id?: string };
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
                                    `${this.domain}/open-apis/subscriptions/v1/accounts/:account_id/messages`,
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
                                                        id?: string;
                                                        articles: Array<{
                                                            id?: string;
                                                            title: string;
                                                            cover?: {
                                                                origin_cover: string;
                                                                message_cover?: string;
                                                                article_cover?: string;
                                                            };
                                                            content?: string;
                                                            external_link_url?: string;
                                                            article_type: number;
                                                            content_source_url?: string;
                                                            author?: string;
                                                            i18n_title?: {
                                                                zh_cn: string;
                                                                en_us: string;
                                                                ja_jp: string;
                                                            };
                                                            i18n_content?: {
                                                                zh_cn: string;
                                                                en_us: string;
                                                                ja_jp: string;
                                                            };
                                                            i18n_author?: {
                                                                zh_cn: string;
                                                                en_us: string;
                                                                ja_jp: string;
                                                            };
                                                            article_config: {
                                                                allow_comment?: boolean;
                                                                allow_forward?: boolean;
                                                                share_type?: number;
                                                                comment_display_type?: number;
                                                                dialog_effective_time?: string;
                                                                dialog_closable?: boolean;
                                                            };
                                                            digest?: string;
                                                            i18n_digest?: {
                                                                zh_cn: string;
                                                                en_us: string;
                                                                ja_jp: string;
                                                            };
                                                            release_time?: string;
                                                            article_link?: string;
                                                            dialog_button_text?: string;
                                                            i18n_dialog_button_text?: {
                                                                zh_cn: string;
                                                                en_us: string;
                                                                ja_jp: string;
                                                            };
                                                        }>;
                                                        release_time?: string;
                                                        status?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=subscriptions&resource=account.message&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=subscriptions&resource=account.message&version=v1 document }
                 *
                 * 获取消息列表
                 *
                 * 根据账号ID获取账号下的消息列表，支持过滤已发送、未发送。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            released?: boolean;
                        };
                        path?: { account_id?: string };
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
                                        id?: string;
                                        articles: Array<{
                                            id?: string;
                                            title: string;
                                            cover?: {
                                                origin_cover: string;
                                                message_cover?: string;
                                                article_cover?: string;
                                            };
                                            content?: string;
                                            external_link_url?: string;
                                            article_type: number;
                                            content_source_url?: string;
                                            author?: string;
                                            i18n_title?: {
                                                zh_cn: string;
                                                en_us: string;
                                                ja_jp: string;
                                            };
                                            i18n_content?: {
                                                zh_cn: string;
                                                en_us: string;
                                                ja_jp: string;
                                            };
                                            i18n_author?: {
                                                zh_cn: string;
                                                en_us: string;
                                                ja_jp: string;
                                            };
                                            article_config: {
                                                allow_comment?: boolean;
                                                allow_forward?: boolean;
                                                share_type?: number;
                                                comment_display_type?: number;
                                                dialog_effective_time?: string;
                                                dialog_closable?: boolean;
                                            };
                                            digest?: string;
                                            i18n_digest?: {
                                                zh_cn: string;
                                                en_us: string;
                                                ja_jp: string;
                                            };
                                            release_time?: string;
                                            article_link?: string;
                                            dialog_button_text?: string;
                                            i18n_dialog_button_text?: {
                                                zh_cn: string;
                                                en_us: string;
                                                ja_jp: string;
                                            };
                                        }>;
                                        release_time?: string;
                                        status?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/subscriptions/v1/accounts/:account_id/messages`,
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
             * account
             */
            account: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=subscriptions&resource=account&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=subscriptions&resource=account&version=v1 document }
                 *
                 * 获取账号信息
                 *
                 * 根据账号ID获取账号基本信息。
                 */
                get: async (
                    payload?: {
                        params?: { member_id_type?: "open_id" };
                        path: { account_id: string };
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
                                    account: {
                                        name: string;
                                        account_id: string;
                                        i18n_name?: {
                                            zh_cn: string;
                                            en_us: string;
                                            ja_jp: string;
                                        };
                                        description: string;
                                        i18n_description?: {
                                            zh_cn: string;
                                            en_us: string;
                                            ja_jp: string;
                                        };
                                        admins?: Array<{
                                            member_id_type?: string;
                                            member_id?: string;
                                            name?: string;
                                        }>;
                                        ownership?: {
                                            type?:
                                                | "personal"
                                                | "organization"
                                                | "department"
                                                | "enterprise";
                                            name?: string;
                                        };
                                        follow_range?: {
                                            enable?: boolean;
                                            i18n_range_text?: {
                                                zh_cn: string;
                                                en_us: string;
                                                ja_jp: string;
                                            };
                                        };
                                        create_time?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/subscriptions/v1/accounts/:account_id`,
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
                            member_id_type?: "open_id";
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
                                    `${this.domain}/open-apis/subscriptions/v1/accounts`,
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
                                                        name: string;
                                                        account_id: string;
                                                        i18n_name?: {
                                                            zh_cn: string;
                                                            en_us: string;
                                                            ja_jp: string;
                                                        };
                                                        description: string;
                                                        i18n_description?: {
                                                            zh_cn: string;
                                                            en_us: string;
                                                            ja_jp: string;
                                                        };
                                                        admins?: Array<{
                                                            member_id_type?: string;
                                                            member_id?: string;
                                                            name?: string;
                                                        }>;
                                                        ownership?: {
                                                            type?:
                                                                | "personal"
                                                                | "organization"
                                                                | "department"
                                                                | "enterprise";
                                                            name?: string;
                                                        };
                                                        follow_range?: {
                                                            enable?: boolean;
                                                            i18n_range_text?: {
                                                                zh_cn: string;
                                                                en_us: string;
                                                                ja_jp: string;
                                                            };
                                                        };
                                                        create_time?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=subscriptions&resource=account&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=subscriptions&resource=account&version=v1 document }
                 *
                 * 获取账号列表
                 *
                 * 获取组织内的订阅号账号列表。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            member_id_type?: "open_id";
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
                                        name: string;
                                        account_id: string;
                                        i18n_name?: {
                                            zh_cn: string;
                                            en_us: string;
                                            ja_jp: string;
                                        };
                                        description: string;
                                        i18n_description?: {
                                            zh_cn: string;
                                            en_us: string;
                                            ja_jp: string;
                                        };
                                        admins?: Array<{
                                            member_id_type?: string;
                                            member_id?: string;
                                            name?: string;
                                        }>;
                                        ownership?: {
                                            type?:
                                                | "personal"
                                                | "organization"
                                                | "department"
                                                | "enterprise";
                                            name?: string;
                                        };
                                        follow_range?: {
                                            enable?: boolean;
                                            i18n_range_text?: {
                                                zh_cn: string;
                                                en_us: string;
                                                ja_jp: string;
                                            };
                                        };
                                        create_time?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/subscriptions/v1/accounts`,
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
             * account_stats_data
             */
            accountStatsData: {
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            begin_time?: string;
                            end_time?: string;
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
                                    `${this.domain}/open-apis/subscriptions/v1/account_stats_data`,
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
                                                        account_id?: string;
                                                        total_follower_count?: string;
                                                        total_article_count?: string;
                                                        article_count?: string;
                                                        read_count?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=subscriptions&resource=account_stats_data&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=subscriptions&resource=account_stats_data&version=v1 document }
                 *
                 * 获取账号统计数据
                 *
                 * 获取组织内的订阅号账号统计数据。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            begin_time?: string;
                            end_time?: string;
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
                                        account_id?: string;
                                        total_follower_count?: string;
                                        total_article_count?: string;
                                        article_count?: string;
                                        read_count?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/subscriptions/v1/account_stats_data`,
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
             * account.follow_relation
             */
            accountFollowRelation: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=subscriptions&resource=account.follow_relation&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=subscriptions&resource=account.follow_relation&version=v1 document }
                 */
                get: async (
                    payload?: {
                        path: { account_id: string };
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
                                    follow_relation: { is_followed: boolean };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/subscriptions/v1/accounts/:account_id/follow_relation`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=subscriptions&resource=account.follow_relation&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=subscriptions&resource=account.follow_relation&version=v1 document }
                 */
                update: async (
                    payload?: {
                        data: { is_followed: boolean };
                        path: { account_id: string };
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
                                    follow_relation: { is_followed: boolean };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/subscriptions/v1/accounts/:account_id/follow_relation`,
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
