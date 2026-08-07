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
import board from "./board";

// auto gen
export default abstract class Client extends board {
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
    bot = {
        v3: {
            /**
             * bot_menu
             */
            botMenu: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=bot&resource=bot_menu&apiName=delete_bot_menu&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete_bot_menu&project=bot&resource=bot_menu&version=v3 document }
                 *
                 * 删除千人千面菜单
                 *
                 * 删除指定用户可见的千人千面菜单。
                 */
                deleteBotMenu: async (
                    payload?: {
                        data?: { user_id?: string };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
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
                                `${this.domain}/open-apis/bot/v3/bot_menu`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=bot&resource=bot_menu&apiName=set_bot_menu&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=set_bot_menu&project=bot&resource=bot_menu&version=v3 document }
                 *
                 * 创建千人千面菜单
                 *
                 * 为指定用户创建仅其可见的机器人菜单。
                 */
                setBotMenu: async (
                    payload?: {
                        data: {
                            user_id?: string;
                            bot_menu: {
                                bot_menu_id?: string;
                                bot_menu_items?: Array<{
                                    name: string;
                                    i18n_name: Record<string, string>;
                                    icon?: {
                                        ud_icon?: {
                                            token?: string;
                                            color?: string;
                                        };
                                        file_key?: string;
                                    };
                                    tag?: string;
                                    behaviors?: Array<{
                                        type?:
                                            | "target"
                                            | "event_key"
                                            | "send_message";
                                        target?: {
                                            common_url?: string;
                                            ios_url?: string;
                                            android_url?: string;
                                            pc_url?: string;
                                            web_url?: string;
                                        };
                                        event_key?: string;
                                        is_primary?: boolean;
                                    }>;
                                    children?: Array<{
                                        name: string;
                                        i18n_name: Record<string, string>;
                                        icon?: {
                                            ud_icon?: {
                                                token?: string;
                                                color?: string;
                                            };
                                            file_key?: string;
                                        };
                                        tag?: string;
                                        behaviors?: Array<{
                                            type?:
                                                | "target"
                                                | "event_key"
                                                | "send_message";
                                            target?: {
                                                common_url?: string;
                                                ios_url?: string;
                                                android_url?: string;
                                                pc_url?: string;
                                                web_url?: string;
                                            };
                                            event_key?: string;
                                            is_primary?: boolean;
                                        }>;
                                        children?: Array<{
                                            name: string;
                                            i18n_name: Record<string, string>;
                                            icon?: {
                                                ud_icon?: {
                                                    token?: string;
                                                    color?: string;
                                                };
                                                file_key?: string;
                                            };
                                            tag?: string;
                                            behaviors?: {
                                                type?:
                                                    | "target"
                                                    | "event_key"
                                                    | "send_message";
                                                target?: {
                                                    common_url?: string;
                                                    ios_url?: string;
                                                    android_url?: string;
                                                    pc_url?: string;
                                                    web_url?: string;
                                                };
                                                event_key?: string;
                                                is_primary?: boolean;
                                            };
                                        }>;
                                    }>;
                                }>;
                            };
                        };
                        params?: {
                            user_id_type?: "open_id" | "union_id" | "user_id";
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
                                    bot_menu?: {
                                        bot_menu_id?: string;
                                        bot_menu_items?: Array<{
                                            name: string;
                                            i18n_name: Record<string, string>;
                                            icon?: {
                                                ud_icon?: {
                                                    token?: string;
                                                    color?: string;
                                                };
                                                file_key?: string;
                                            };
                                            tag?: string;
                                            behaviors?: Array<{
                                                type?:
                                                    | "target"
                                                    | "event_key"
                                                    | "send_message";
                                                target?: {
                                                    common_url?: string;
                                                    ios_url?: string;
                                                    android_url?: string;
                                                    pc_url?: string;
                                                    web_url?: string;
                                                };
                                                event_key?: string;
                                                is_primary?: boolean;
                                            }>;
                                            children?: Array<{
                                                name: string;
                                                i18n_name: Record<
                                                    string,
                                                    string
                                                >;
                                                icon?: {
                                                    ud_icon?: {
                                                        token?: string;
                                                        color?: string;
                                                    };
                                                    file_key?: string;
                                                };
                                                tag?: string;
                                                behaviors?: Array<{
                                                    type?:
                                                        | "target"
                                                        | "event_key"
                                                        | "send_message";
                                                    target?: {
                                                        common_url?: string;
                                                        ios_url?: string;
                                                        android_url?: string;
                                                        pc_url?: string;
                                                        web_url?: string;
                                                    };
                                                    event_key?: string;
                                                    is_primary?: boolean;
                                                }>;
                                                children?: Array<{
                                                    name: string;
                                                    i18n_name: Record<
                                                        string,
                                                        string
                                                    >;
                                                    icon?: {
                                                        ud_icon?: {
                                                            token?: string;
                                                            color?: string;
                                                        };
                                                        file_key?: string;
                                                    };
                                                    tag?: string;
                                                    behaviors?: {
                                                        type?:
                                                            | "target"
                                                            | "event_key"
                                                            | "send_message";
                                                        target?: {
                                                            common_url?: string;
                                                            ios_url?: string;
                                                            android_url?: string;
                                                            pc_url?: string;
                                                            web_url?: string;
                                                        };
                                                        event_key?: string;
                                                        is_primary?: boolean;
                                                    };
                                                }>;
                                            }>;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bot/v3/bot_menu`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=bot&resource=bot_menu&apiName=get_bot_menu&version=v3 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_bot_menu&project=bot&resource=bot_menu&version=v3 document }
                 *
                 * 获取千人千面菜单
                 *
                 * 获取指定用户可见的机器人菜单信息。
                 */
                getBotMenu: async (
                    payload?: {
                        params?: {
                            user_id?: string;
                            user_id_type?: "open_id" | "union_id" | "user_id";
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
                                    bot_menu?: {
                                        bot_menu_id?: string;
                                        bot_menu_items?: Array<{
                                            name: string;
                                            i18n_name: Record<string, string>;
                                            icon?: {
                                                ud_icon?: {
                                                    token?: string;
                                                    color?: string;
                                                };
                                                file_key?: string;
                                            };
                                            tag?: string;
                                            behaviors?: Array<{
                                                type?:
                                                    | "target"
                                                    | "event_key"
                                                    | "send_message";
                                                target?: {
                                                    common_url?: string;
                                                    ios_url?: string;
                                                    android_url?: string;
                                                    pc_url?: string;
                                                    web_url?: string;
                                                };
                                                event_key?: string;
                                                is_primary?: boolean;
                                            }>;
                                            children?: Array<{
                                                name: string;
                                                i18n_name: Record<
                                                    string,
                                                    string
                                                >;
                                                icon?: {
                                                    ud_icon?: {
                                                        token?: string;
                                                        color?: string;
                                                    };
                                                    file_key?: string;
                                                };
                                                tag?: string;
                                                behaviors?: Array<{
                                                    type?:
                                                        | "target"
                                                        | "event_key"
                                                        | "send_message";
                                                    target?: {
                                                        common_url?: string;
                                                        ios_url?: string;
                                                        android_url?: string;
                                                        pc_url?: string;
                                                        web_url?: string;
                                                    };
                                                    event_key?: string;
                                                    is_primary?: boolean;
                                                }>;
                                                children?: Array<{
                                                    name: string;
                                                    i18n_name: Record<
                                                        string,
                                                        string
                                                    >;
                                                    icon?: {
                                                        ud_icon?: {
                                                            token?: string;
                                                            color?: string;
                                                        };
                                                        file_key?: string;
                                                    };
                                                    tag?: string;
                                                    behaviors?: {
                                                        type?:
                                                            | "target"
                                                            | "event_key"
                                                            | "send_message";
                                                        target?: {
                                                            common_url?: string;
                                                            ios_url?: string;
                                                            android_url?: string;
                                                            pc_url?: string;
                                                            web_url?: string;
                                                        };
                                                        event_key?: string;
                                                        is_primary?: boolean;
                                                    };
                                                }>;
                                            }>;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bot/v3/bot_menu`,
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
        v4: {
            /**
             * bot
             */
            bot: {
                searchWithIterator: async (
                    payload?: {
                        data?: {
                            query?: string;
                            filter?: {
                                chat_ids?: Array<string>;
                                has_chatter?: boolean;
                            };
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
                                    `${this.domain}/open-apis/bot/v4/bot/search`,
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
                                                        id: string;
                                                        display_info?: string;
                                                        meta_data?: {
                                                            tenant_id?: string;
                                                            enable_join_group?: boolean;
                                                            chat_id?: string;
                                                            is_agent?: boolean;
                                                        };
                                                    }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=bot&resource=bot&apiName=search&version=v4 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=bot&resource=bot&version=v4 document }
                 *
                 * 搜索机器人
                 *
                 * 用户可以通过关键字搜索可见的机器人，可见性和套件内搜索一致。
                 */
                search: async (
                    payload?: {
                        data?: {
                            query?: string;
                            filter?: {
                                chat_ids?: Array<string>;
                                has_chatter?: boolean;
                            };
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
                                        id: string;
                                        display_info?: string;
                                        meta_data?: {
                                            tenant_id?: string;
                                            enable_join_group?: boolean;
                                            chat_id?: string;
                                            is_agent?: boolean;
                                        };
                                    }>;
                                    has_more: boolean;
                                    page_token?: string;
                                    notice?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/bot/v4/bot/search`,
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
