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
import calendar from "./calendar";

// auto gen
export default abstract class Client extends calendar {
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
    cardkit = {
        v1: {
            /**
             * card
             */
            card: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=cardkit&resource=card&version=v1 document }
                 *
                 * 按指定的多个操作批量局部更新卡片，支持更新卡片设置、添加组件、删除组件、更新组件
                 */
                batchUpdate: async (
                    payload?: {
                        data: {
                            uuid?: string;
                            sequence: number;
                            actions: string;
                        };
                        path: { card_id: string };
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
                                `${this.domain}/open-apis/cardkit/v1/cards/:card_id/batch_update`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=cardkit&resource=card&version=v1 document }
                 *
                 * 创建卡片实例，成功后可通过发送消息等接口发送卡片实例
                 */
                create: async (
                    payload?: {
                        data: { type: string; data: string };
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
                                data?: { card_id: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/cardkit/v1/cards`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card&apiName=id_convert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=id_convert&project=cardkit&resource=card&version=v1 document }
                 *
                 * 获取消息 id 对应的卡片 id
                 */
                idConvert: async (
                    payload?: {
                        data: { message_id: string };
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
                                data?: { card_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/cardkit/v1/cards/id_convert`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card&apiName=settings&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=settings&project=cardkit&resource=card&version=v1 document }
                 *
                 * 更新指定的卡片设置
                 */
                settings: async (
                    payload?: {
                        data: {
                            settings: string;
                            uuid?: string;
                            sequence: number;
                        };
                        path: { card_id: string };
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
                                `${this.domain}/open-apis/cardkit/v1/cards/:card_id/settings`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=cardkit&resource=card&version=v1 document }
                 *
                 * 对卡片进行全量更新，即：以全新的卡片内容更新已有卡片
                 */
                update: async (
                    payload?: {
                        data: {
                            card: { type: "card_json"; data: string };
                            uuid?: string;
                            sequence: number;
                        };
                        path: { card_id: string };
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
                                `${this.domain}/open-apis/cardkit/v1/cards/:card_id`,
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
             * card.element
             */
            cardElement: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card.element&apiName=content&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=content&project=cardkit&resource=card.element&version=v1 document }
                 *
                 * 以传入的文本内容覆盖已有卡片组件内容，卡片将自动识别其中的增量变更内容，并以“打字机”效果输出。
                 */
                content: async (
                    payload?: {
                        data: {
                            uuid?: string;
                            content: string;
                            sequence: number;
                        };
                        path: { card_id: string; element_id: string };
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
                                `${this.domain}/open-apis/cardkit/v1/cards/:card_id/elements/:element_id/content`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card.element&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=cardkit&resource=card.element&version=v1 document }
                 *
                 * 在卡片内指定位置添加组件
                 */
                create: async (
                    payload?: {
                        data: {
                            type: "insert_before" | "insert_after" | "append";
                            target_element_id?: string;
                            uuid?: string;
                            sequence: number;
                            elements: string;
                        };
                        path: { card_id: string };
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
                                `${this.domain}/open-apis/cardkit/v1/cards/:card_id/elements`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card.element&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=cardkit&resource=card.element&version=v1 document }
                 *
                 * 删除卡片内的指定组件
                 */
                delete: async (
                    payload?: {
                        data: { uuid?: string; sequence: number };
                        path: { card_id: string; element_id: string };
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
                                `${this.domain}/open-apis/cardkit/v1/cards/:card_id/elements/:element_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card.element&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=cardkit&resource=card.element&version=v1 document }
                 *
                 * 以传入的配置覆盖指定组件的已有配置
                 */
                patch: async (
                    payload?: {
                        data: {
                            partial_element: string;
                            uuid?: string;
                            sequence: number;
                        };
                        path: { card_id: string; element_id: string };
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
                                `${this.domain}/open-apis/cardkit/v1/cards/:card_id/elements/:element_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card.element&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=cardkit&resource=card.element&version=v1 document }
                 *
                 * 以新组件全量替换更新指定组件
                 */
                update: async (
                    payload?: {
                        data: {
                            uuid?: string;
                            element: string;
                            sequence: number;
                        };
                        path: { card_id: string; element_id: string };
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
                                `${this.domain}/open-apis/cardkit/v1/cards/:card_id/elements/:element_id`,
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
