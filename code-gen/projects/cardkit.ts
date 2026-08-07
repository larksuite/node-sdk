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
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=cardkit&resource=card&version=v1 document }
                 *
                 * 创建卡片实体
                 *
                 * 基于卡片 JSON 代码或卡片搭建工具搭建的卡片，创建卡片实体。用于后续通过卡片实体 ID（card_id）发送卡片、更新卡片等。
                 *
                 * ## 使用限制;;- 本接口仅支持[卡片 JSON 2.0 结构](https://open.feishu.cn/document/uAjLw4CM/ukzMukzMukzM/feishu-cards/card-json-v2-structure)或卡片搭建工具搭建的[新版卡片](https://open.feishu.cn/document/uAjLw4CM/ukzMukzMukzM/feishu-cards/feishu-card-cardkit/cardkit-upgraded-version-card-release-notes)。;- 调用该接口时，不支持将卡片设置为独享卡片模式。即不支持将卡片 JSON 数据中的 `update_multi` 属性设置为 `false`。;- 一个卡片实体，仅支持发送一次。;- 卡片实体的有效期为 14 天。即创建卡片实体超出 14 天后，你将无法调用相关接口操作卡片。
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
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card&apiName=settings&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=settings&project=cardkit&resource=card&version=v1 document }
                 *
                 * 更新卡片配置
                 *
                 * 更新指定卡片实体的配置，支持卡片配置 `config` 字段和卡片跳转链接 `card_link` 字段。
                 *
                 * ## 使用限制;;- 调用该接口时，不支持将卡片设置为独享卡片模式。即不支持将卡片 JSON 数据中的 `update_multi` 属性设置为 `false`。;- 调用该接口的应用身份（tenant_access_token）需与创建目标卡片实体的应用身份一致。
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
                 * 全量更新卡片实体
                 *
                 * 传入新的卡片 JSON 代码，覆盖更新指定的卡片实体的所有内容。
                 *
                 * ## 使用限制;- 本接口仅支持[卡片 JSON 2.0 结构](https://open.feishu.cn/document/uAjLw4CM/ukzMukzMukzM/feishu-cards/card-json-v2-structure)。;- 调用该接口时，不支持将卡片设置为独享卡片模式。即不支持将卡片 JSON 数据中的 `update_multi` 属性设置为 `false`。;- 调用该接口的应用身份（tenant_access_token）需与创建目标卡片实体的应用身份一致。
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card&apiName=id_convert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=id_convert&project=cardkit&resource=card&version=v1 document }
                 *
                 * 转换 ID
                 *
                 * 将[消息 ID](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/intro#44c58e1c)（ `message_id` ）转换为卡片实体 ID（`card_id`）。用于将由[发送消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create)等接口返回的消息 ID 转换为卡片实体 ID，以进一步对卡片进行全量更新、局部更新、或文本流式更新操作。
                 *
                 * 本接口已不推荐使用。要基于接口创建卡片、发送卡片，推荐你调用[创建卡片实体](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/cardkit-v1/card/create)接口获取卡片实体 ID，再调用[发送消息](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create)接口发送卡片。;;## 提示;
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
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card&apiName=batch_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update&project=cardkit&resource=card&version=v1 document }
                 *
                 * 局部更新卡片实体
                 *
                 * 更新卡片实体局部内容，包括配置和组件。支持同时对多个组件进行增删改等不同操作。
                 *
                 * ## 使用限制;;- 本接口仅支持[卡片 JSON 2.0 结构](https://open.feishu.cn/document/uAjLw4CM/ukzMukzMukzM/feishu-cards/card-json-v2-structure)。;- 调用该接口时，不支持将卡片设置为独享卡片模式。即不支持将卡片 JSON 数据中的 `update_multi` 属性设置为 `false`。;- 调用该接口的应用身份（tenant_access_token）需与创建目标卡片实体的应用身份一致。
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
            },
            /**
             * card.element
             */
            cardElement: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card.element&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=cardkit&resource=card.element&version=v1 document }
                 *
                 * 更新组件
                 *
                 * 更新卡片实体中的指定组件为新组件。
                 *
                 * ## 使用限制;;- 调用该接口时，不支持将卡片设置为独享卡片模式。即不支持将卡片 JSON 数据中的 `update_multi` 属性设置为 `false`。;- 调用该接口的应用身份（tenant_access_token）需与创建目标卡片实体的应用身份一致。
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card.element&apiName=content&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=content&project=cardkit&resource=card.element&version=v1 document }
                 *
                 * 流式更新文本
                 *
                 * 对卡片中的普通文本元素（tag 为 plain_text 的元素）或富文本组件（tag 为 markdown 的组件）传入全量文本内容，以实现“打字机”式的文字输出效果。
                 *
                 * ## 输出效果说明;;若旧文本为传入的新文本的前缀子串，新增文本将在旧文本末尾继续以打字机效果输出；若新旧文本前缀不同，全量文本将直接上屏输出，无打字机效果。参考[流式更新卡片](https://open.feishu.cn/document/uAjLw4CM/ukzMukzMukzM/feishu-cards/streaming-updates-openapi-overview)，了解流式更新文本的效果和完整流程。;;## 使用限制;;- 调用该接口时，不支持将卡片设置为独享卡片模式。即不支持将卡片 JSON 数据中的 `update_multi` 属性设置为 `false`。;- 对于搭建工具中的卡片，仅支持对富文本组件中的内容进行流式更新，不支持对普通文本元素进行文本流式更新。;- 调用该接口的应用身份（tenant_access_token）需与创建目标卡片实体的应用身份一致。;;## 前提条件;;调用该接口时，需确保已开启卡片的流式更新模式：;- 在卡片 JSON 中，将 `streaming_mode` 设为 `true`;- 或在卡片搭建工具中，在设置中开启流式更新模式：;;     ![image.png](//sf3-cn.feishucdn.com/obj/open-platform-opendoc/6051c2a7d1df743858d11d2ae89d96a2_pTDWhbUysD.png?maxWidth=400)
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
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card.element&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=cardkit&resource=card.element&version=v1 document }
                 *
                 * 删除组件
                 *
                 * 删除指定卡片实体中的组件。
                 *
                 * ## 注意事项;;删除容器类组件时，容器中内嵌的组件将一并被删除。;;## 使用限制;;- 调用该接口时，不支持将卡片设置为独享卡片模式。即不支持将卡片 JSON 数据中的 `update_multi` 属性设置为 `false`。;- 调用该接口的应用身份（tenant_access_token）需与创建目标卡片实体的应用身份一致。
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
                 * 更新组件属性
                 *
                 * 通过传入 `card_id`（卡片实体 ID）和 `element_id`（组件 ID），更新卡片实体中对应组件的属性。
                 *
                 * ## 使用限制;;- 本接口不支持修改组件的标签（tag）属性。;- 调用该接口时，不支持将卡片设置为独享卡片模式。即不支持将卡片 JSON 数据中的 `update_multi` 属性设置为 `false`。;- 调用该接口的应用身份（tenant_access_token）需与创建目标卡片实体的应用身份一致。
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
                 * {@link https://open.feishu.cn/api-explorer?project=cardkit&resource=card.element&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=cardkit&resource=card.element&version=v1 document }
                 *
                 * 新增组件
                 *
                 * 为指定卡片实体新增组件，以扩展卡片内容，如在卡片中添加一个点击按钮。
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
            },
        },
    };
}
