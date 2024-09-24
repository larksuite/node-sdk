import { fillApiPath } from "@node-sdk/utils";
import { Logger } from "@node-sdk/typings";
import { formatErrors } from "@node-sdk/client/utils";
import { IRequestOptions } from "@node-sdk/code-gen/types";
import { IPayload } from "@node-sdk/client/types";
import { HttpInstance } from "@node-sdk/typings/http";
import { Readable } from "stream";
import wiki from "./projects/wiki";

// auto gen
export default abstract class Client extends wiki {
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
    workplace = {
        /**
         * custom_workplace_access_data
         */
        customWorkplaceAccessData: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=custom_workplace_access_data&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=workplace&resource=custom_workplace_access_data&version=v1 document }
             */
            search: async (
                payload?: {
                    params: {
                        from_date: string;
                        to_date: string;
                        page_size: number;
                        page_token?: string;
                        custom_workplace_id?: string;
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
                                    custom_workplace_id?: string;
                                    access_data?: { pv?: number; uv?: number };
                                    date?: string;
                                    custom_workplace_name?: Array<{
                                        language?: string;
                                        name?: string;
                                    }>;
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/workplace/v1/custom_workplace_access_data/search`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * workplace_access_data
         */
        workplaceAccessData: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_access_data&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=workplace&resource=workplace_access_data&version=v1 document }
             */
            search: async (
                payload?: {
                    params: {
                        from_date: string;
                        to_date: string;
                        page_size: number;
                        page_token?: string;
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
                                    date?: string;
                                    all_workplace?: {
                                        pv?: number;
                                        uv?: number;
                                    };
                                    default_workplace?: {
                                        pv?: number;
                                        uv?: number;
                                    };
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/workplace/v1/workplace_access_data/search`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        /**
         * workplace_block_access_data
         */
        workplaceBlockAccessData: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_block_access_data&apiName=search&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=workplace&resource=workplace_block_access_data&version=v1 document }
             */
            search: async (
                payload?: {
                    params: {
                        from_date: string;
                        to_date: string;
                        page_size: number;
                        page_token?: string;
                        block_id?: string;
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
                                    date?: string;
                                    block_id?: string;
                                    access_data?: { pv?: number; uv?: number };
                                }>;
                                has_more?: boolean;
                                page_token?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/workplace/v1/workplace_block_access_data/search`,
                            path
                        ),
                        method: "POST",
                        data,
                        params,
                        headers,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });
            },
        },
        v1: {
            /**
             * custom_workplace_access_data
             */
            customWorkplaceAccessData: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=custom_workplace_access_data&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=workplace&resource=custom_workplace_access_data&version=v1 document }
                 */
                search: async (
                    payload?: {
                        params: {
                            from_date: string;
                            to_date: string;
                            page_size: number;
                            page_token?: string;
                            custom_workplace_id?: string;
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
                                        custom_workplace_id?: string;
                                        access_data?: {
                                            pv?: number;
                                            uv?: number;
                                        };
                                        date?: string;
                                        custom_workplace_name?: Array<{
                                            language?: string;
                                            name?: string;
                                        }>;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/workplace/v1/custom_workplace_access_data/search`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * workplace_access_data
             */
            workplaceAccessData: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_access_data&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=workplace&resource=workplace_access_data&version=v1 document }
                 */
                search: async (
                    payload?: {
                        params: {
                            from_date: string;
                            to_date: string;
                            page_size: number;
                            page_token?: string;
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
                                        date?: string;
                                        all_workplace?: {
                                            pv?: number;
                                            uv?: number;
                                        };
                                        default_workplace?: {
                                            pv?: number;
                                            uv?: number;
                                        };
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/workplace/v1/workplace_access_data/search`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                },
            },
            /**
             * workplace_block_access_data
             */
            workplaceBlockAccessData: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=workplace&resource=workplace_block_access_data&apiName=search&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search&project=workplace&resource=workplace_block_access_data&version=v1 document }
                 */
                search: async (
                    payload?: {
                        params: {
                            from_date: string;
                            to_date: string;
                            page_size: number;
                            page_token?: string;
                            block_id?: string;
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
                                        date?: string;
                                        block_id?: string;
                                        access_data?: {
                                            pv?: number;
                                            uv?: number;
                                        };
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/workplace/v1/workplace_block_access_data/search`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers,
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
