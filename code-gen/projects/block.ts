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
import bitable from "./bitable";

// auto gen
export default abstract class Client extends bitable {
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
     * 小组件
     */
    block = {
        /**
         * 服务端 API
         */
        entity: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=block&resource=entity&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/block-v2/entity/create document }
             *
             * 创建 BlockEntity
             *
             * 开发者可以通过该接口将部分或全部数据存放于 BlockEntity。
             */
            create: async (
                payload?: {
                    data: {
                        title: string;
                        block_type_id: string;
                        source_data: string;
                        source_meta: string;
                        version: string;
                        source_link?: string;
                        owner?: string;
                        extra?: string;
                        i18n_summary?: string;
                        i18n_preview?: string;
                        summary?: string;
                        preview?: string;
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
                                entity: {
                                    block_id: string;
                                    title?: string;
                                    block_type_id: string;
                                    source_data: string;
                                    source_meta: string;
                                    version: string;
                                    source_link?: string;
                                    summary?: string;
                                    preview?: string;
                                    i18n_summay?: string;
                                    i18n_preview?: string;
                                    owner?: string;
                                    extra?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/block/v2/entities`,
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
             * {@link https://open.feishu.cn/api-explorer?project=block&resource=entity&apiName=update&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/block-v2/entity/update document }
             *
             * 更新BlockEntity
             *
             * 开发者通过该接口可以更新存储在BlockEntity中的数据，并实时推送到端侧。
             */
            update: async (
                payload?: {
                    data: {
                        title?: string;
                        block_type_id: string;
                        source_data: string;
                        source_meta: string;
                        version: string;
                        source_link?: string;
                        summary?: string;
                        preview?: string;
                        i18n_summay?: string;
                        i18n_preview?: string;
                        owner?: string;
                        extra?: string;
                    };
                    path: { block_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/block/v2/entities/:block_id`,
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
         * 服务端 API
         */
        message: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=block&resource=message&apiName=create&version=v2 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/block-v2/message/create document }
             *
             * Block协同数据推送
             *
             * 根据BlockID向指定用户列表推送协同数据。
             */
            create: async (
                payload?: {
                    data: {
                        body: string;
                        version: string;
                        block_id: string;
                        resource?: string;
                        open_ids: Array<string>;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/block/v2/message`,
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
        v2: {
            /**
             * 服务端 API
             */
            entity: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=block&resource=entity&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/block-v2/entity/create document }
                 *
                 * 创建 BlockEntity
                 *
                 * 开发者可以通过该接口将部分或全部数据存放于 BlockEntity。
                 */
                create: async (
                    payload?: {
                        data: {
                            title: string;
                            block_type_id: string;
                            source_data: string;
                            source_meta: string;
                            version: string;
                            source_link?: string;
                            owner?: string;
                            extra?: string;
                            i18n_summary?: string;
                            i18n_preview?: string;
                            summary?: string;
                            preview?: string;
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
                                    entity: {
                                        block_id: string;
                                        title?: string;
                                        block_type_id: string;
                                        source_data: string;
                                        source_meta: string;
                                        version: string;
                                        source_link?: string;
                                        summary?: string;
                                        preview?: string;
                                        i18n_summay?: string;
                                        i18n_preview?: string;
                                        owner?: string;
                                        extra?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/block/v2/entities`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=block&resource=entity&apiName=update&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/block-v2/entity/update document }
                 *
                 * 更新BlockEntity
                 *
                 * 开发者通过该接口可以更新存储在BlockEntity中的数据，并实时推送到端侧。
                 */
                update: async (
                    payload?: {
                        data: {
                            title?: string;
                            block_type_id: string;
                            source_data: string;
                            source_meta: string;
                            version: string;
                            source_link?: string;
                            summary?: string;
                            preview?: string;
                            i18n_summay?: string;
                            i18n_preview?: string;
                            owner?: string;
                            extra?: string;
                        };
                        path: { block_id: string };
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
                                `${this.domain}/open-apis/block/v2/entities/:block_id`,
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
             * 服务端 API
             */
            message: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=block&resource=message&apiName=create&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/block-v2/message/create document }
                 *
                 * Block协同数据推送
                 *
                 * 根据BlockID向指定用户列表推送协同数据。
                 */
                create: async (
                    payload?: {
                        data: {
                            body: string;
                            version: string;
                            block_id: string;
                            resource?: string;
                            open_ids: Array<string>;
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
                                `${this.domain}/open-apis/block/v2/message`,
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
