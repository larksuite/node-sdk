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
import ccm_unified_resource from "./ccm_unified_resource";

// auto gen
export default abstract class Client extends ccm_unified_resource {
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
    collab_plugins = {
        v1: {
            /**
             * chat.chat_collab_plugin
             */
            chatChatCollabPlugin: {
                listWithIterator: async (
                    payload?: {
                        data?: { link_chat_common_header?: {} };
                        params?: {
                            bot_id?: string;
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { chat_id: string };
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
                                    `${this.domain}/open-apis/collab_plugins/v1/chats/:chat_id/chat_collab_plugins`,
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
                                                    entity_urls?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=collab_plugins&resource=chat.chat_collab_plugin&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=collab_plugins&resource=chat.chat_collab_plugin&version=v1 document }
                 *
                 * 查询指定群组已关联的应用页面
                 *
                 * 通过传入群组 id，获取到该群组已绑定的应用页面信息。;由于一个群组可以关联不同的应用页面，因此接口将以分页形式返回数据列表。
                 */
                list: async (
                    payload?: {
                        data?: { link_chat_common_header?: {} };
                        params?: {
                            bot_id?: string;
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { chat_id: string };
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
                                    entity_urls?: Array<string>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/collab_plugins/v1/chats/:chat_id/chat_collab_plugins`,
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
             * chat
             */
            chat: {
                listWithIterator: async (
                    payload?: {
                        data?: {
                            link_chat_common_header?: {};
                            entity_id?: string;
                            entity_url?: string;
                        };
                        params?: {
                            bot_id?: string;
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
                                    `${this.domain}/open-apis/collab_plugins/v1/chats`,
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
                                                    chat_ids?: Array<string>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=collab_plugins&resource=chat&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=collab_plugins&resource=chat&version=v1 document }
                 *
                 * 查询指定应用页面的关联群组
                 *
                 * 通过传入应用页面 URL 或 业务 id，获取到已绑定的关联群组。
                 */
                list: async (
                    payload?: {
                        data?: {
                            link_chat_common_header?: {};
                            entity_id?: string;
                            entity_url?: string;
                        };
                        params?: {
                            bot_id?: string;
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
                                    chat_ids?: Array<string>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/collab_plugins/v1/chats`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=collab_plugins&resource=chat&apiName=unbind&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=unbind&project=collab_plugins&resource=chat&version=v1 document }
                 *
                 * 解除关联群组
                 *
                 * 针对指定的应用页面 URL，与指定群组解除关联关系。;解除之后，若该网页 URL 依然激活群组插件，那么用户在飞书中再次打开该页面，会看到“创建群组”按钮，可自行创建群组。若您不希望该网页 URL 继续展示群组插件，请调用关闭插件API
                 */
                unbind: async (
                    payload?: {
                        data?: {
                            link_chat_common_header?: { bot_id?: string };
                            entity_id?: string;
                            entity_url?: string;
                        };
                        params?: { bot_id?: string };
                        path: { chat_id: string };
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
                                `${this.domain}/open-apis/collab_plugins/v1/chats/:chat_id/unbind`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=collab_plugins&resource=chat&apiName=bind&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=bind&project=collab_plugins&resource=chat&version=v1 document }
                 *
                 * 绑定关联群组
                 *
                 * 针对指定的应用页面 URL，与指定群组创建关联关系。;绑定完成后，企业内所有用户在飞书中打开该网页，可在标签页上看到群组插件按钮，点击可加入或打开该群组。;注意：如果网页内容存在权限范围，不希望所有用户都能加入群组，造成信息泄露，可以将该群组开启“进群验证”，具体方法详见“更新群信息” API 中的 membership_approval 字段。
                 */
                bind: async (
                    payload?: {
                        data?: {
                            link_chat_common_header?: { bot_id?: string };
                            entity_id?: string;
                            entity_url?: string;
                        };
                        params?: { bot_id?: string };
                        path: { chat_id: string };
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
                                `${this.domain}/open-apis/collab_plugins/v1/chats/:chat_id/bind`,
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
             * collab_plugin
             */
            collabPlugin: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=collab_plugins&resource=collab_plugin&apiName=activate&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=activate&project=collab_plugins&resource=collab_plugin&version=v1 document }
                 *
                 * 激活插件
                 *
                 * 传入指定的应用页面 URL，即可在该 URL 的网页标签页中激活标签页插件。由于目前标签页插件只包含群组插件这一个类型，因此激活插件后该网页在飞书的标签页中会展示群组插件按钮。;; 因为URL 和事项的关联关系不够清晰，为了方便开发者管理业务系统中的具体事项，开发者可以传入业务 id（entity_id）来管理 URL 和插件状态。;需要指出的是，业务 URL（entity_url）是必填字段，它决定了在飞书客户端哪个页面的网页容器中展示标签页插件；而业务 id（entity_id）是选填字段，便于开发者进行业务系统中事项的管理和检索。
                 */
                activate: async (
                    payload?: {
                        data: { entity_url: string; entity_id?: string };
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
                                `${this.domain}/open-apis/collab_plugins/v1/collab_plugin/activate`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=collab_plugins&resource=collab_plugin&apiName=deactivate&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=deactivate&project=collab_plugins&resource=collab_plugin&version=v1 document }
                 *
                 * 关闭插件
                 *
                 * 传入指定的应用页面 URL，在该 URL 的网页标签页中关闭标签页插件。;若该 URL 已经绑定了关联群组，那么关闭插件则会在飞书的标签页中隐藏群组插件按钮，但不会解除 URL 与群组的关联关系。
                 */
                deactivate: async (
                    payload?: {
                        data: { entity_url: string; entity_id?: string };
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
                                `${this.domain}/open-apis/collab_plugins/v1/collab_plugin/deactivate`,
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
