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
import directory from "./directory";

// auto gen
export default abstract class Client extends directory {
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
    docs_ai = {
        v1: {
            /**
             * document
             */
            document: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docs_ai&resource=document&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=docs_ai&resource=document&version=v1 document }
                 *
                 * 局部修订文档，支持 block / string 级别的基础指令
                 */
                update: async (
                    payload?: {
                        data?: {
                            format?: "xml" | "markdown";
                            revision_id?: number;
                            block_id?: string;
                            command?: string;
                            content?: string;
                            pattern?: string;
                            src_block_ids?: string;
                            extra_param?: string;
                            scene?: string;
                            reference_map?: Record<
                                string,
                                Record<
                                    string,
                                    { data?: string; user_id?: string }
                                >
                            >;
                        };
                        path: { document_id: string };
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
                                    document?: {
                                        document_id?: string;
                                        revision_id?: number;
                                        url?: string;
                                        content?: string;
                                        new_blocks?: Array<{
                                            block_type?: string;
                                            block_id?: string;
                                            block_token?: string;
                                        }>;
                                        reference_map?: Record<
                                            string,
                                            Record<
                                                string,
                                                {
                                                    data?: string;
                                                    user_id?: string;
                                                }
                                            >
                                        >;
                                    };
                                    result?:
                                        | "success"
                                        | "partial_success"
                                        | "failed";
                                    updated_blocks_count?: number;
                                    warnings?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/docs_ai/v1/documents/:document_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=docs_ai&resource=document&apiName=fetch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=fetch&project=docs_ai&resource=document&version=v1 document }
                 *
                 * 读取文档内容，返回 XML / Markdown
                 */
                fetch: async (
                    payload?: {
                        data?: {
                            format?: "xml" | "markdown";
                            revision_id?: number;
                            export_option?: {
                                export_style_attrs?: boolean;
                                export_cite_extra_data?: boolean;
                                export_block_id?: boolean;
                            };
                            read_option?: {
                                read_mode?: string;
                                start_block_id?: string;
                                end_block_id?: string;
                                keyword?: string;
                                context_before?: number;
                                context_after?: number;
                                max_depth?: number;
                            };
                            scene?: string;
                            lang?: string;
                            extra_param?: string;
                        };
                        path: { document_id: string };
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
                                    document?: {
                                        document_id?: string;
                                        revision_id?: number;
                                        url?: string;
                                        content?: string;
                                        new_blocks?: Array<{
                                            block_type?: string;
                                            block_id?: string;
                                            block_token?: string;
                                        }>;
                                        reference_map?: Record<
                                            string,
                                            Record<
                                                string,
                                                {
                                                    data?: string;
                                                    user_id?: string;
                                                }
                                            >
                                        >;
                                    };
                                    tips?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/docs_ai/v1/documents/:document_id/fetch`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=docs_ai&resource=document&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=docs_ai&resource=document&version=v1 document }
                 *
                 * 创建文档（导入），支持 XML / Markdown
                 */
                create: async (
                    payload?: {
                        data?: {
                            parent_token?: string;
                            parent_position?: string;
                            format?: "xml" | "markdown";
                            content?: string;
                            scene?: string;
                            reference_map?: Record<
                                string,
                                Record<
                                    string,
                                    { data?: string; user_id?: string }
                                >
                            >;
                            extra_param?: string;
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
                                    document?: {
                                        document_id?: string;
                                        revision_id?: number;
                                        url?: string;
                                        content?: string;
                                        new_blocks?: Array<{
                                            block_type?: string;
                                            block_id?: string;
                                            block_token?: string;
                                        }>;
                                        reference_map?: Record<
                                            string,
                                            Record<
                                                string,
                                                {
                                                    data?: string;
                                                    user_id?: string;
                                                }
                                            >
                                        >;
                                    };
                                    warnings?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/docs_ai/v1/documents`,
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
             * document.history
             */
            documentHistory: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=docs_ai&resource=document.history&apiName=revert_status&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=revert_status&project=docs_ai&resource=document.history&version=v1 document }
                 *
                 * 查询 Docx 历史回滚任务状态
                 */
                revertStatus: async (
                    payload?: {
                        params?: { task_id?: string };
                        path: { document_id: string };
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
                                    status?:
                                        | "done"
                                        | "partial_failed"
                                        | "running"
                                        | "failed";
                                    history_version_id?: string;
                                    failed_block_tokens?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/docs_ai/v1/documents/:document_id/history/revert_status`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=docs_ai&resource=document.history&apiName=revert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=revert&project=docs_ai&resource=document.history&version=v1 document }
                 *
                 * 按 revision_id 回滚 Docx 历史版本
                 */
                revert: async (
                    payload?: {
                        data?: {
                            history_version_id?: string;
                            wait_timeout_ms?: number;
                        };
                        path: { document_id: string };
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
                                    task_id?: string;
                                    status?:
                                        | "done"
                                        | "partial_failed"
                                        | "running"
                                        | "failed";
                                    history_version_id?: string;
                                    poll_after_ms?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/docs_ai/v1/documents/:document_id/history/revert`,
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
                        path: { document_id: string };
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
                                    `${this.domain}/open-apis/docs_ai/v1/documents/:document_id/histories`,
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
                                                    entries?: Array<{
                                                        revision_id?: number;
                                                        edit_time?: string;
                                                        type?: number;
                                                        name?: string;
                                                        description?: string;
                                                        editor_ids?: Array<string>;
                                                        history_version_id?: string;
                                                    }>;
                                                    has_more?: boolean;
                                                    page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=docs_ai&resource=document.history&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=docs_ai&resource=document.history&version=v1 document }
                 *
                 * 列出 Docx 历史版本
                 */
                list: async (
                    payload?: {
                        params?: { page_token?: string; page_size?: number };
                        path: { document_id: string };
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
                                    entries?: Array<{
                                        revision_id?: number;
                                        edit_time?: string;
                                        type?: number;
                                        name?: string;
                                        description?: string;
                                        editor_ids?: Array<string>;
                                        history_version_id?: string;
                                    }>;
                                    has_more?: boolean;
                                    page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/docs_ai/v1/documents/:document_id/histories`,
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
