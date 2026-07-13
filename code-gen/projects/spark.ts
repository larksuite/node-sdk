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
import slides from "./slides";

// auto gen
export default abstract class Client extends slides {
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
    spark = {
        v1: {
            /**
             * app
             */
            app: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=spark&resource=app&version=v1 document }
                 *
                 * 创建妙搭应用
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            app_type?: string;
                            description?: string;
                            icon_url?: string;
                            source_agent?: string;
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
                                    app?: {
                                        app_id?: string;
                                        app_type?: string;
                                        name?: string;
                                        description?: string;
                                        icon_url?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        is_published?: boolean;
                                        online_url?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=get_app_visibility&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_app_visibility&project=spark&resource=app&version=v1 document }
                 *
                 * 查询妙搭应用可见范围
                 */
                getAppVisibility: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { app_id: string };
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
                                    scope?: string;
                                    users?: Array<string>;
                                    departments?: Array<string>;
                                    chats?: Array<string>;
                                    apply_config?: {
                                        enabled?: boolean;
                                        approvers?: Array<string>;
                                    };
                                    require_login?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/access-scope`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=icon&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=icon&project=spark&resource=app&version=v1 document }
                 *
                 * 上传妙搭应用图标（multipart/form-data，返回图标 URL；不绑定具体 App）
                 */
                icon: async (
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
                                data?: { icon_url?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/icon`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=spark&resource=app&version=v1 document }
                 *
                 * 列出当前用户的妙搭应用
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            app_type?: string;
                            keyword?: string;
                            scope?: string;
                            ownership?: string;
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
                                    page_token?: string;
                                    items?: Array<{
                                        app_id?: string;
                                        app_type?: string;
                                        name?: string;
                                        description?: string;
                                        icon_url?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        is_published?: boolean;
                                        online_url?: string;
                                    }>;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=spark&resource=app&version=v1 document }
                 *
                 * 更新妙搭应用
                 */
                patch: async (
                    payload?: {
                        data?: {
                            name?: string;
                            description?: string;
                            icon_url?: string;
                        };
                        path: { app_id: string };
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
                                    app?: {
                                        app_id?: string;
                                        app_type?: string;
                                        name?: string;
                                        description?: string;
                                        icon_url?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        is_published?: boolean;
                                        online_url?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=sql_commands&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=sql_commands&project=spark&resource=app&version=v1 document }
                 *
                 * 执行 SQL
                 */
                sqlCommands: async (
                    payload?: {
                        data: { sql: string };
                        params?: { env?: string; transactional?: boolean };
                        path: { app_id: string };
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
                                data?: { result: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/sql_commands`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=update_app_visibility&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_app_visibility&project=spark&resource=app&version=v1 document }
                 *
                 * 更新妙搭应用可见范围（access-scope）
                 */
                updateAppVisibility: async (
                    payload?: {
                        data: {
                            users?: Array<string>;
                            departments?: Array<string>;
                            chats?: Array<string>;
                            apply_config?: {
                                enabled?: boolean;
                                approvers?: Array<string>;
                            };
                            require_login?: boolean;
                            scope: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { app_id: string };
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
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/access-scope`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=upload_html_code_and_release&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_html_code_and_release&project=spark&resource=app&version=v1 document }
                 *
                 * 上传 HTML 代码并发布应用
                 */
                uploadHtmlCodeAndRelease: async (
                    payload?: {
                        data: { file: Buffer | fs.ReadStream };
                        path: { app_id: string };
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
                                data?: { url?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/upload_and_release_html_code`,
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
            /**
             * app.enum
             */
            appEnum: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.enum&apiName=get_enum_detail&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_enum_detail&project=spark&resource=app.enum&version=v1 document }
                 *
                 * 获取自定义枚举详细信息
                 */
                getEnumDetail: async (
                    payload?: {
                        params?: { env?: string };
                        path: { app_id: string; enum_name: string };
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
                                    name: string;
                                    description: string;
                                    options: Array<string>;
                                    created_at: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/enums/:enum_name`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.enum&apiName=get_enum_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_enum_list&project=spark&resource=app.enum&version=v1 document }
                 *
                 * 获取自定义枚举列表
                 */
                getEnumList: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            env?: string;
                        };
                        path: { app_id: string };
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
                                    has_more: boolean;
                                    page_token: string;
                                    items: Array<{
                                        name: string;
                                        description: string;
                                        options: Array<string>;
                                        created_at: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/enums`,
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
             * app.storage
             */
            appStorage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.storage&apiName=download&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download&project=spark&resource=app.storage&version=v1 document }
                 *
                 * 下载文件
                 */
                download: async (
                    payload?: {
                        params?: { file_key?: string; file_url?: string };
                        path: { app_id: string };
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
                                data?: { content_type: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/storage`,
                                path
                            ),
                            method: "GET",
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.storage&apiName=upload&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=spark&resource=app.storage&version=v1 document }
                 *
                 * 上传文件
                 */
                upload: async (
                    payload?: {
                        data: {
                            file_name: string;
                            check_sum?: string;
                            file: Buffer | fs.ReadStream;
                        };
                        path: { app_id: string };
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
                                    file_key: string;
                                    file_url: string;
                                    file_name: string;
                                    file_size: number;
                                    mime_type: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/storage/upload`,
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.storage&apiName=upload_complete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_complete&project=spark&resource=app.storage&version=v1 document }
                 *
                 * 分片上传文件 - 完成上传
                 */
                uploadComplete: async (
                    payload?: {
                        data: { upload_id: string };
                        path: { app_id: string };
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
                                    file_key: string;
                                    file_url: string;
                                    file_name: string;
                                    file_size: number;
                                    mime_type: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/storage/upload/complete`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.storage&apiName=upload_initialize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_initialize&project=spark&resource=app.storage&version=v1 document }
                 *
                 * 分片上传文件 - 创建上传请求
                 */
                uploadInitialize: async (
                    payload?: {
                        data: {
                            file_name: string;
                            file_size: number;
                            mime_type?: string;
                        };
                        path: { app_id: string };
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
                                    upload_id: string;
                                    chunk_size: number;
                                    chunk_numbers: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/storage/upload/initialize`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.storage&apiName=upload_part&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_part&project=spark&resource=app.storage&version=v1 document }
                 *
                 * 分片上传文件 - 上传分片
                 */
                uploadPart: async (
                    payload?: {
                        data: {
                            upload_id: string;
                            chunk_index: number;
                            file: Buffer | fs.ReadStream;
                            chunk_check_sum?: string;
                        };
                        path: { app_id: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<
                            any,
                            { code?: number; msg?: string; data?: {} }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/storage/upload/part`,
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
            /**
             * app.table
             */
            appTable: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.table&apiName=batch_update_table_records&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update_table_records&project=spark&resource=app.table&version=v1 document }
                 *
                 * 批量更新数据表中的记录
                 */
                batchUpdateTableRecords: async (
                    payload?: {
                        data: { records: string };
                        params?: {
                            env?: string;
                            user_identifier_type?: string;
                        };
                        path: { app_id: string; table_name: string };
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
                                data?: { record_ids: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/tables/:table_name/records_batch_update`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.table&apiName=delete_table_records&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete_table_records&project=spark&resource=app.table&version=v1 document }
                 *
                 * 删除数据表中的记录
                 */
                deleteTableRecords: async (
                    payload?: {
                        params: { filter: string; env?: string };
                        path: { app_id: string; table_name: string };
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
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/tables/:table_name/records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.table&apiName=get_table_detail&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_table_detail&project=spark&resource=app.table&version=v1 document }
                 *
                 * 获取数据表详细信息
                 */
                getTableDetail: async (
                    payload?: {
                        params?: { env?: string; format?: string };
                        path: { app_id: string; table_name: string };
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
                                    name: string;
                                    description: string;
                                    columns: Array<{
                                        name: string;
                                        description: string;
                                        data_type: string;
                                        is_primary_key: boolean;
                                        is_unique: boolean;
                                        is_auto_increment: boolean;
                                        is_array: boolean;
                                        is_allow_null: boolean;
                                        default_value: string;
                                    }>;
                                    indexes?: Array<{
                                        name: string;
                                        columns?: Array<string>;
                                        type: string;
                                        definition: string;
                                    }>;
                                    constraints?: Array<{
                                        type: string;
                                        name: string;
                                        columns: Array<string>;
                                        referenced_table?: string;
                                        referenced_columns?: Array<string>;
                                    }>;
                                    estimated_row_count?: number;
                                    size_bytes?: number;
                                    ddl?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/tables/:table_name`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.table&apiName=get_table_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_table_list&project=spark&resource=app.table&version=v1 document }
                 *
                 * 获取数据表列表
                 */
                getTableList: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            env?: string;
                        };
                        path: { app_id: string };
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
                                    has_more: boolean;
                                    page_token: string;
                                    items: Array<{
                                        name: string;
                                        description: string;
                                        columns: Array<{
                                            name: string;
                                            description: string;
                                            data_type: string;
                                            is_primary_key: boolean;
                                            is_unique: boolean;
                                            is_auto_increment: boolean;
                                            is_array: boolean;
                                            is_allow_null: boolean;
                                            default_value: string;
                                        }>;
                                        indexes?: Array<{
                                            name: string;
                                            columns?: Array<string>;
                                            type: string;
                                            definition: string;
                                        }>;
                                        constraints?: Array<{
                                            type: string;
                                            name: string;
                                            columns: Array<string>;
                                            referenced_table?: string;
                                            referenced_columns?: Array<string>;
                                        }>;
                                        estimated_row_count?: number;
                                        size_bytes?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/tables`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.table&apiName=get_table_record_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_table_record_list&project=spark&resource=app.table&version=v1 document }
                 *
                 * 查询数据表数据记录
                 */
                getTableRecordList: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            select?: string;
                            filter?: string;
                            order?: string;
                            env?: string;
                            user_identifier_type?: string;
                        };
                        path: { app_id: string; table_name: string };
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
                                    has_more: boolean;
                                    page_token: string;
                                    total: number;
                                    items: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/tables/:table_name/records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.table&apiName=patch_table_records&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch_table_records&project=spark&resource=app.table&version=v1 document }
                 *
                 * 按条件更新数据表中的记录
                 */
                patchTableRecords: async (
                    payload?: {
                        data: { record: string };
                        params: {
                            filter: string;
                            env?: string;
                            user_identifier_type?: string;
                        };
                        path: { app_id: string; table_name: string };
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
                                data?: { record_ids: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/tables/:table_name/records`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.table&apiName=post_table_records&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=post_table_records&project=spark&resource=app.table&version=v1 document }
                 *
                 * 向数据表中添加或更新记录
                 */
                postTableRecords: async (
                    payload?: {
                        data: { records: string };
                        params?: {
                            columns?: string;
                            on_conflict?: string;
                            env?: string;
                            user_identifier_type?: string;
                        };
                        path: { app_id: string; table_name: string };
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
                                data?: { record_ids: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/tables/:table_name/records`,
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
             * app.view
             */
            appView: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.view&apiName=get_view_record_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_view_record_list&project=spark&resource=app.view&version=v1 document }
                 *
                 * 查询视图数据记录
                 */
                getViewRecordList: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            select?: string;
                            filter?: string;
                            order?: string;
                            env?: string;
                            user_identifier_type?: string;
                        };
                        path: { app_id: string; view_name: string };
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
                                    has_more: boolean;
                                    page_token: string;
                                    total: number;
                                    items: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/views/:view_name/records`,
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
             * directory.user
             */
            directoryUser: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=directory.user&apiName=id_convert&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=id_convert&project=spark&resource=directory.user&version=v1 document }
                 *
                 * open api\nIDConvert: 飞书和force id转换\noapi.post = "/v1/directory/user/id_convert",
                 */
                idConvert: async (
                    payload?: {
                        data: { id_convert_type: number; ids?: Array<string> };
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
                                        source_id: string;
                                        target_id: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/directory/user/id_convert`,
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
