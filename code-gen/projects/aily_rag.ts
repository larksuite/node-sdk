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
import admin from "./admin";

// auto gen
export default abstract class Client extends admin {
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
    aily_rag = {
        v1: {
            /**
             * data_asset
             */
            dataAsset: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=aily_rag&resource=data_asset&apiName=init&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=init&project=aily_rag&resource=data_asset&version=v1 document }
                 *
                 * 初始化知识资产
                 *
                 * 使用 RAG 服务前必须调用此接口完成知识资产的初始化，只有初始化知识资产成功之后才可以继续使用其他 RAG OpenAPI。
                 */
                init: async (payload?: {}, options?: IRequestOptions) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    return this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: { status?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily_rag/v1/data_assets/init`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily_rag&resource=data_asset&apiName=retrieval&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=retrieval&project=aily_rag&resource=data_asset&version=v1 document }
                 *
                 * 召回知识
                 *
                 * 召回已上传的知识。
                 */
                retrieval: async (
                    payload?: {
                        data: { query: string; top_k?: number };
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
                                    chunks?: Array<{
                                        chunk_id?: string;
                                        data_asset_id?: string;
                                        content?: string;
                                        score?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily_rag/v1/data_assets/retrieval`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily_rag&resource=data_asset&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=aily_rag&resource=data_asset&version=v1 document }
                 *
                 * 查询知识
                 *
                 * 查询单个知识详情
                 */
                get: async (
                    payload?: {
                        path: { data_asset_id: string };
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
                                    data_asset?: {
                                        id?: string;
                                        title?: string;
                                        description?: string;
                                        data_source_type?:
                                            | "excel"
                                            | "pdf"
                                            | "pptx"
                                            | "txt"
                                            | "docx"
                                            | "larkbiz_docx";
                                        connect_status?:
                                            | "awaiting"
                                            | "syncing"
                                            | "running"
                                            | "successful"
                                            | "continuously_syncing"
                                            | "partially_successful"
                                            | "failed";
                                        connect_failed_reason?: string;
                                        import_knowledge_setting?: {
                                            file?: {
                                                title?: string;
                                                token?: string;
                                                mime_type?: string;
                                                url?: string;
                                            };
                                            lark_doc?: {
                                                type?:
                                                    | "doc"
                                                    | "file"
                                                    | "wiki"
                                                    | "docx"
                                                    | "folder";
                                                token?: string;
                                                url?: string;
                                            };
                                        };
                                        create_time?: number;
                                        update_time?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily_rag/v1/data_assets/:data_asset_id`,
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
                        params?: { page_size?: number; page_token?: string };
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
                                    `${this.domain}/open-apis/aily_rag/v1/data_assets`,
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
                                                        title?: string;
                                                        description?: string;
                                                        data_source_type?:
                                                            | "excel"
                                                            | "pdf"
                                                            | "pptx"
                                                            | "txt"
                                                            | "docx"
                                                            | "larkbiz_docx";
                                                        connect_status?:
                                                            | "awaiting"
                                                            | "syncing"
                                                            | "running"
                                                            | "successful"
                                                            | "continuously_syncing"
                                                            | "partially_successful"
                                                            | "failed";
                                                        connect_failed_reason?: string;
                                                        import_knowledge_setting?: {
                                                            file?: {
                                                                title?: string;
                                                                token?: string;
                                                                mime_type?: string;
                                                                url?: string;
                                                            };
                                                            lark_doc?: {
                                                                type?:
                                                                    | "doc"
                                                                    | "file"
                                                                    | "wiki"
                                                                    | "docx"
                                                                    | "folder";
                                                                token?: string;
                                                                url?: string;
                                                            };
                                                        };
                                                        create_time?: number;
                                                        update_time?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily_rag&resource=data_asset&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=aily_rag&resource=data_asset&version=v1 document }
                 *
                 * 查询知识列表
                 *
                 * 分页查询所有的知识
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
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
                                        title?: string;
                                        description?: string;
                                        data_source_type?:
                                            | "excel"
                                            | "pdf"
                                            | "pptx"
                                            | "txt"
                                            | "docx"
                                            | "larkbiz_docx";
                                        connect_status?:
                                            | "awaiting"
                                            | "syncing"
                                            | "running"
                                            | "successful"
                                            | "continuously_syncing"
                                            | "partially_successful"
                                            | "failed";
                                        connect_failed_reason?: string;
                                        import_knowledge_setting?: {
                                            file?: {
                                                title?: string;
                                                token?: string;
                                                mime_type?: string;
                                                url?: string;
                                            };
                                            lark_doc?: {
                                                type?:
                                                    | "doc"
                                                    | "file"
                                                    | "wiki"
                                                    | "docx"
                                                    | "folder";
                                                token?: string;
                                                url?: string;
                                            };
                                        };
                                        create_time?: number;
                                        update_time?: number;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily_rag/v1/data_assets`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily_rag&resource=data_asset&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=aily_rag&resource=data_asset&version=v1 document }
                 *
                 * 删除知识
                 *
                 * 根据知识ID进行删除操作。
                 */
                delete: async (
                    payload?: {
                        path: { data_asset_id: string };
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
                                    data_asset?: {
                                        id?: string;
                                        title?: string;
                                        description?: string;
                                        data_source_type?:
                                            | "excel"
                                            | "pdf"
                                            | "pptx"
                                            | "txt"
                                            | "docx"
                                            | "larkbiz_docx";
                                        connect_status?:
                                            | "awaiting"
                                            | "syncing"
                                            | "running"
                                            | "successful"
                                            | "continuously_syncing"
                                            | "partially_successful"
                                            | "failed";
                                        connect_failed_reason?: string;
                                        import_knowledge_setting?: {
                                            file?: {
                                                title?: string;
                                                token?: string;
                                                mime_type?: string;
                                                url?: string;
                                            };
                                            lark_doc?: {
                                                type?:
                                                    | "doc"
                                                    | "file"
                                                    | "wiki"
                                                    | "docx"
                                                    | "folder";
                                                token?: string;
                                                url?: string;
                                            };
                                        };
                                        create_time?: number;
                                        update_time?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily_rag/v1/data_assets/:data_asset_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily_rag&resource=data_asset&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=aily_rag&resource=data_asset&version=v1 document }
                 *
                 * 创建知识
                 *
                 * 使用上传的文件或者飞书文档创建知识。
                 */
                create: async (
                    payload?: {
                        data: {
                            source_type: "lark_doc" | "file";
                            description?: string;
                            import_knowledge_setting: {
                                file?: {
                                    token: string;
                                    mime_type: string;
                                    url?: string;
                                };
                                lark_doc?: {
                                    type?:
                                        | "doc"
                                        | "file"
                                        | "wiki"
                                        | "docx"
                                        | "folder";
                                    token?: string;
                                    url?: string;
                                };
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
                                    data_asset?: {
                                        id?: string;
                                        title?: string;
                                        description?: string;
                                        data_source_type?:
                                            | "excel"
                                            | "pdf"
                                            | "pptx"
                                            | "txt"
                                            | "docx"
                                            | "larkbiz_docx";
                                        connect_status?:
                                            | "awaiting"
                                            | "syncing"
                                            | "running"
                                            | "successful"
                                            | "continuously_syncing"
                                            | "partially_successful"
                                            | "failed";
                                        connect_failed_reason?: string;
                                        import_knowledge_setting?: {
                                            file?: {
                                                title?: string;
                                                token?: string;
                                                mime_type?: string;
                                                url?: string;
                                            };
                                            lark_doc?: {
                                                type?:
                                                    | "doc"
                                                    | "file"
                                                    | "wiki"
                                                    | "docx"
                                                    | "folder";
                                                token?: string;
                                                url?: string;
                                            };
                                        };
                                        create_time?: number;
                                        update_time?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily_rag/v1/data_assets`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=aily_rag&resource=data_asset&apiName=upload_file&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_file&project=aily_rag&resource=data_asset&version=v1 document }
                 *
                 * 上传文件
                 *
                 * 用户可以将一个本地文件上传作为知识。;该API允许上传一个本地文件，API的返回值：token和mime_type可以作为入参在创建知识的API使用。
                 */
                uploadFile: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    file_info?: {
                                        token: string;
                                        mime_type: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/aily_rag/v1/data_assets/upload_file`,
                                path
                            ),
                            method: "POST",
                            data,
                            params,
                            headers: {
                                ...headers,
                                "Content-Type": "multipart/form-data",
                            },
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });
                    return res?.data || null;
                },
            },
        },
    };
}
