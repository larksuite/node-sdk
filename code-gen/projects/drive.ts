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
import docx from "./docx";

// auto gen
export default abstract class Client extends docx {
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
    drive = {
        /**
         * file
         */
        file: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=create_folder&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_folder&project=drive&resource=file&version=v1 document }
             *
             * 新建文件夹
             *
             * 该接口用于在用户云空间指定文件夹中创建一个空文件夹。
             */
            createFolder: async (
                payload?: {
                    data: { name: string; folder_token: string };
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
                            data?: { token?: string; url?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/create_folder`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=move&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=move&project=drive&resource=file&version=v1 document }
             *
             * 移动文件或文件夹
             *
             * 将文件或者文件夹移动到用户云空间的其他位置。
             *
             * ## 使用限制;;该接口不支持并发调用，且调用频率上限为 5 QPS 且 10000次/天。否则会返回 1061045 错误码，可通过稍后重试解决。
             */
            move: async (
                payload?: {
                    data?: {
                        type?:
                            | "file"
                            | "docx"
                            | "bitable"
                            | "doc"
                            | "sheet"
                            | "mindnote"
                            | "folder"
                            | "slides";
                        folder_token?: string;
                    };
                    path: { file_token: string };
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
                            data?: { task_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/move`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=copy&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=copy&project=drive&resource=file&version=v1 document }
             *
             * 复制文件
             *
             * 将用户云空间中的文件复制至其它文件夹下。该接口为异步接口。
             */
            copy: async (
                payload?: {
                    data: {
                        name: string;
                        type?:
                            | "file"
                            | "doc"
                            | "sheet"
                            | "bitable"
                            | "docx"
                            | "mindnote"
                            | "slides";
                        folder_token: string;
                        extra?: Array<{ key: string; value: string }>;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { file_token?: string };
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
                                file?: {
                                    token: string;
                                    name: string;
                                    type: string;
                                    parent_token?: string;
                                    url?: string;
                                    shortcut_info?: {
                                        target_type: string;
                                        target_token: string;
                                    };
                                    created_time?: string;
                                    modified_time?: string;
                                    owner_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/copy`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=create_shortcut&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_shortcut&project=drive&resource=file&version=v1 document }
             *
             * 创建文件快捷方式
             *
             * 创建指定文件的快捷方式到云空间的其它文件夹中。
             *
             * ## 使用限制;;该接口不支持并发调用，且调用频率上限为 5 QPS，10000 次/天。否则会返回 1061045 错误码，可通过稍后重试解决。
             */
            createShortcut: async (
                payload?: {
                    data: {
                        parent_token: string;
                        refer_entity: {
                            refer_token: string;
                            refer_type:
                                | "file"
                                | "docx"
                                | "bitable"
                                | "doc"
                                | "sheet"
                                | "mindnote"
                                | "slides";
                        };
                    };
                    params?: {
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
                                succ_shortcut_node?: {
                                    token: string;
                                    name: string;
                                    type: string;
                                    parent_token?: string;
                                    url?: string;
                                    shortcut_info?: {
                                        target_type: string;
                                        target_token: string;
                                    };
                                    created_time?: string;
                                    modified_time?: string;
                                    owner_id?: string;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/create_shortcut`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_part&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_part&project=drive&resource=file&version=v1 document }
             *
             * 分片上传文件-上传分片
             *
             * 根据 [预上传](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_prepare)接口返回的上传事务 ID 和分片策略上传对应的文件分片。上传完成后，你需调用[分片上传文件（完成上传）](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_finish)触发完成上传。了解完整的上传文件流程，参考[分片上传文件概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/multipart-upload-file-/introduction)。
             */
            uploadPart: async (
                payload?: {
                    data: {
                        upload_id: string;
                        seq: number;
                        size: number;
                        checksum?: string;
                        file: Buffer | fs.ReadStream;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/upload_part`,
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
            listWithIterator: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        folder_token?: string;
                        order_by?: "EditedTime" | "CreatedTime";
                        direction?: "ASC" | "DESC";
                        option?: string;
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
                                `${this.domain}/open-apis/drive/v1/files`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                files?: Array<{
                                                    token: string;
                                                    name: string;
                                                    type: string;
                                                    parent_token?: string;
                                                    url?: string;
                                                    shortcut_info?: {
                                                        target_type: string;
                                                        target_token: string;
                                                    };
                                                    created_time?: string;
                                                    modified_time?: string;
                                                    owner_id?: string;
                                                }>;
                                                next_page_token?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=drive&resource=file&version=v1 document }
             *
             * 获取文件夹中的文件清单
             *
             * 该接口用于获取用户云空间指定文件夹中文件信息清单。文件的信息包括名称、类型、token、创建时间、所有者 ID 等。
             *
             * ## 使用限制;;本接口仅支持获取当前层级的文件信息，不支持递归获取子文件夹中的文件信息清单。
             */
            list: async (
                payload?: {
                    params?: {
                        page_size?: number;
                        page_token?: string;
                        folder_token?: string;
                        order_by?: "EditedTime" | "CreatedTime";
                        direction?: "ASC" | "DESC";
                        option?: string;
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
                                files?: Array<{
                                    token: string;
                                    name: string;
                                    type: string;
                                    parent_token?: string;
                                    url?: string;
                                    shortcut_info?: {
                                        target_type: string;
                                        target_token: string;
                                    };
                                    created_time?: string;
                                    modified_time?: string;
                                    owner_id?: string;
                                }>;
                                next_page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=task_check&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=task_check&project=drive&resource=file&version=v1 document }
             *
             * 查询异步任务状态
             *
             * 查询异步任务的状态信息。目前支持查询删除文件夹和移动文件夹的异步任务。
             */
            taskCheck: async (
                payload?: {
                    params: { task_id: string };
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
                            data?: { status?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/task_check`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=delete_subscribe&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete_subscribe&project=drive&resource=file&version=v1 document }
             *
             * 取消云文档事件订阅
             *
             * 该接口用于取消订阅云文档的通知事件。了解事件订阅的配置流程和使用场景，参考[事件概述](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)。了解云文档支持的事件类型，参考[事件列表](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-list)。
             *
             * ## 注意事项;目前只支持取消订阅事件列表中所有文档事件，暂不支持指定取消的事件。;## 前提条件;- 调用接口前，请确保应用或用户为文档所有者或文档管理者。;- 调用接口前，请确保正确配置订阅方式并添加了事件。详情参考[配置订阅方式](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/request-url-configuration-case)和[添加事件](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/subscription-event-case)。
             */
            deleteSubscribe: async (
                payload?: {
                    params: {
                        file_type:
                            | "doc"
                            | "docx"
                            | "sheet"
                            | "bitable"
                            | "file"
                            | "folder"
                            | "slides";
                        event_type?: string;
                    };
                    path: { file_token: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        { code?: number; msg?: string; data?: { data: string } }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/delete_subscribe`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=get_subscribe&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_subscribe&project=drive&resource=file&version=v1 document }
             *
             * 查询云文档事件订阅状态
             *
             * 该接口用于查询云文档事件的订阅状态。了解事件订阅的配置流程和使用场景，参考[事件概述](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)。了解云文档支持的事件类型，参考[事件列表](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-list)。
             *
             * ## 前提条件;- 调用接口前，请确保应用或用户为文档所有者或文档管理者。文档的通知事件仅支持文档拥有者和文档管理者订阅。;- 调用接口前，请确保正确配置订阅方式并添加了事件。详情参考[配置订阅方式](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/request-url-configuration-case)和[添加事件](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/subscription-event-case)。
             */
            getSubscribe: async (
                payload?: {
                    params: {
                        file_type:
                            | "doc"
                            | "docx"
                            | "sheet"
                            | "bitable"
                            | "file"
                            | "folder"
                            | "slides";
                        event_type?: string;
                    };
                    path: { file_token: string };
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
                            data?: { is_subscribe?: boolean };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/get_subscribe`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=subscribe&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscribe&project=drive&resource=file&version=v1 document }
             *
             * 订阅云文档事件
             *
             * 订阅云文档的各类通知事件。调用该接口并在开发者后台添加事件后，当云文档发生指定事件时，系统会向配置的地址发送事件。
             */
            subscribe: async (
                payload?: {
                    params: {
                        file_type:
                            | "doc"
                            | "docx"
                            | "sheet"
                            | "bitable"
                            | "file"
                            | "folder"
                            | "slides";
                        event_type?: string;
                    };
                    path: { file_token: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/subscribe`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=download&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download&project=drive&resource=file&version=v1 document }
             *
             * 下载文件
             *
             * 下载云空间中的文件，如 PDF 文件。不包含飞书文档、电子表格以及多维表格等在线文档。该接口支持通过在请求头添加 `Range` 参数分片下载部分文件。
             */
            download: async (
                payload?: {
                    params?: { version?: string };
                    path?: { file_token?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, any>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/download`,
                            path
                        ),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                        $return_headers: true,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                const checkIsReadable = () => {
                    const consumedError =
                        "The stream has already been consumed";
                    if (!res.data.readable) {
                        this.logger.error(consumedError);
                        throw new Error(consumedError);
                    }
                };

                return {
                    writeFile: async (filePath: string) => {
                        checkIsReadable();
                        return new Promise((resolve, reject) => {
                            const writableStream =
                                fs.createWriteStream(filePath);
                            writableStream.on("finish", () => {
                                resolve(filePath);
                            });
                            writableStream.on("error", (e) => {
                                reject(e);
                            });
                            res.data.pipe(writableStream);
                        });
                    },
                    getReadableStream: () => {
                        checkIsReadable();
                        return res.data as Readable;
                    },
                    headers: res.headers,
                };
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_prepare&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_prepare&project=drive&resource=file&version=v1 document }
             *
             * 分片上传文件-预上传
             *
             * 发送初始化请求，以获取上传事务 ID 和分片策略，为[上传分片](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_part)做准备。平台固定以 4MB 的大小对文件进行分片。了解完整的上传文件流程，参考[上传文件概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/multipart-upload-file-/introduction)。
             */
            uploadPrepare: async (
                payload?: {
                    data: {
                        file_name: string;
                        parent_type: "explorer" | "wiki";
                        parent_node: string;
                        size: number;
                        file_token?: string;
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
                                upload_id?: string;
                                block_size?: number;
                                block_num?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/upload_prepare`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_finish&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_finish&project=drive&resource=file&version=v1 document }
             *
             * 分片上传文件-完成上传
             *
             * 调用[上传分片](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_part)接口将分片全部上传完毕后，你需调用本接口触发完成上传。否则将上传失败。了解完整的上传文件流程，参考[上传文件概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/multipart-upload-file-/introduction)。
             */
            uploadFinish: async (
                payload?: {
                    data: { upload_id: string; block_num: number };
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
                                file_token?: string;
                                version?: string;
                                url?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/upload_finish`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_all&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_all&project=drive&resource=file&version=v1 document }
             *
             * 上传文件
             *
             * 将指定文件上传至云空间指定目录中。
             */
            uploadAll: async (
                payload?: {
                    data: {
                        file_name: string;
                        parent_type: "explorer" | "wiki";
                        parent_node: string;
                        size: number;
                        checksum?: string;
                        file: Buffer | fs.ReadStream;
                        file_token?: string;
                    };
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
                                file_token?: string;
                                url?: string;
                                version?: string;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/upload_all`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=drive&resource=file&version=v1 document }
             *
             * 删除文件或文件夹
             *
             * 删除用户在云空间内的文件或者文件夹。文件或文件夹被删除后，会进入回收站中。
             */
            delete: async (
                payload?: {
                    params: {
                        type:
                            | "file"
                            | "docx"
                            | "bitable"
                            | "folder"
                            | "doc"
                            | "sheet"
                            | "mindnote"
                            | "shortcut"
                            | "slides";
                        async?: boolean;
                    };
                    path?: { file_token?: string };
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
                            data?: { task_id?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token`,
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
        },
        /**
         * meta
         */
        meta: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=meta&apiName=batch_query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_query&project=drive&resource=meta&version=v1 document }
             *
             * 获取文件元数据
             *
             * 该接口用于根据文件 token （文件的唯一标识）获取其元数据，包括标题、所有者、创建时间、密级、访问链接等数据。
             */
            batchQuery: async (
                payload?: {
                    data: {
                        request_docs: Array<{
                            doc_token: string;
                            doc_type:
                                | "doc"
                                | "sheet"
                                | "bitable"
                                | "mindnote"
                                | "file"
                                | "wiki"
                                | "docx"
                                | "folder"
                                | "synced_block"
                                | "slides";
                        }>;
                        with_url?: boolean;
                    };
                    params?: {
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
                                metas: Array<{
                                    doc_token: string;
                                    doc_type: string;
                                    title: string;
                                    owner_id: string;
                                    create_time: string;
                                    latest_modify_user: string;
                                    latest_modify_time: string;
                                    url: string;
                                    sec_label_name?: string;
                                    request_doc_info?: {
                                        doc_token: string;
                                        doc_type:
                                            | "doc"
                                            | "sheet"
                                            | "bitable"
                                            | "mindnote"
                                            | "file"
                                            | "wiki"
                                            | "docx"
                                            | "folder"
                                            | "synced_block"
                                            | "slides";
                                    };
                                }>;
                                failed_list?: Array<{
                                    token: string;
                                    code: number;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/metas/batch_query`,
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
         * file.subscription
         */
        fileSubscription: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.subscription&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=drive&resource=file.subscription&version=v1 document }
             *
             * 更新订阅状态
             *
             * 根据订阅ID更新订阅状态
             */
            patch: async (
                payload?: {
                    data: {
                        is_subscribe: boolean;
                        file_type: "doc" | "docx" | "wiki";
                    };
                    path?: { file_token?: string; subscription_id?: string };
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
                                subscription_id?: string;
                                subscription_type?: "comment_update";
                                is_subcribe?: boolean;
                                file_type?: "doc" | "docx" | "wiki";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/subscriptions/:subscription_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.subscription&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=drive&resource=file.subscription&version=v1 document }
             *
             * 获取订阅状态
             *
             * 根据订阅ID获取该订阅的状态
             */
            get: async (
                payload?: {
                    data: { file_type: "doc" | "docx" | "wiki" };
                    path?: { file_token?: string; subscription_id?: string };
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
                                subscription_id: string;
                                subscription_type?: "comment_update";
                                is_subcribe?: boolean;
                                file_type?: "doc" | "docx" | "wiki";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/subscriptions/:subscription_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.subscription&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=file.subscription&version=v1 document }
             *
             * 创建订阅
             *
             * 订阅文档中的变更事件，当前支持文档评论订阅，订阅后文档评论更新会有“云文档助手”推送给订阅的用户
             */
            create: async (
                payload?: {
                    data: {
                        subscription_id?: string;
                        subscription_type: "comment_update";
                        is_subcribe?: boolean;
                        file_type: "doc" | "docx" | "wiki";
                    };
                    path: { file_token: string };
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
                                subscription_id?: string;
                                subscription_type?: "comment_update";
                                is_subcribe?: boolean;
                                file_type?: "doc" | "docx" | "wiki";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/subscriptions`,
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
         * export_task
         */
        exportTask: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=export_task&apiName=download&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download&project=drive&resource=export_task&version=v1 document }
             *
             * 下载导出文件
             *
             * 根据[查询导出任务结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/get)返回的导出文件的 token，下载导出产物到本地。了解完整的导出文件步骤，参考[导出云文档概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/export-user-guide)。
             */
            download: async (
                payload?: {
                    path: { file_token: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, any>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/export_tasks/file/:file_token/download`,
                            path
                        ),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                        $return_headers: true,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                const checkIsReadable = () => {
                    const consumedError =
                        "The stream has already been consumed";
                    if (!res.data.readable) {
                        this.logger.error(consumedError);
                        throw new Error(consumedError);
                    }
                };

                return {
                    writeFile: async (filePath: string) => {
                        checkIsReadable();
                        return new Promise((resolve, reject) => {
                            const writableStream =
                                fs.createWriteStream(filePath);
                            writableStream.on("finish", () => {
                                resolve(filePath);
                            });
                            writableStream.on("error", (e) => {
                                reject(e);
                            });
                            res.data.pipe(writableStream);
                        });
                    },
                    getReadableStream: () => {
                        checkIsReadable();
                        return res.data as Readable;
                    },
                    headers: res.headers,
                };
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=export_task&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=drive&resource=export_task&version=v1 document }
             *
             * 查询导出任务结果
             *
             * 根据[创建导出任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/create)返回的导出任务 ID（ticket）轮询导出任务结果，并返回导出文件的 token。你可使用该 token 继续调用[下载导出文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/download)接口将导出的产物下载到本地。了解完整的导出文件步骤，参考[导出飞书云文档概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/export-user-guide)。
             *
             * ## 注意事项;;调用该接口的用户或应用需与调用创建导出任务接口的用户或应用保持一致。
             */
            get: async (
                payload?: {
                    params: { token: string };
                    path: { ticket: string };
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
                                result?: {
                                    file_extension:
                                        | "docx"
                                        | "pdf"
                                        | "xlsx"
                                        | "csv"
                                        | "base"
                                        | "pptx";
                                    type:
                                        | "doc"
                                        | "sheet"
                                        | "bitable"
                                        | "docx"
                                        | "slides";
                                    file_name?: string;
                                    file_token?: string;
                                    file_size?: number;
                                    job_error_msg?: string;
                                    job_status?: number;
                                    only_schema?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/export_tasks/:ticket`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=export_task&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=export_task&version=v1 document }
             *
             * 创建导出任务
             *
             * 该接口用于创建导出文件的任务，并返回导出任务 ID。导出文件指将飞书文档、电子表格、多维表格导出为本地文件，包括 Word、Excel、PDF、CSV 格式。该接口为异步接口，需要继续调用[查询导出任务结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/get)接口获取导出结果。了解完整的导出步骤，参考[导出云文档概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/export-user-guide)。
             */
            create: async (
                payload?: {
                    data: {
                        file_extension:
                            | "docx"
                            | "pdf"
                            | "xlsx"
                            | "csv"
                            | "base"
                            | "pptx";
                        token: string;
                        type: "doc" | "sheet" | "bitable" | "docx" | "slides";
                        sub_id?: string;
                        only_schema?: boolean;
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
                            data?: { ticket?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/export_tasks`,
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
         * file.version
         */
        fileVersion: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.version&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=file.version&version=v1 document }
             *
             * 创建文档版本
             *
             * 创建文档版本。文档支持在线文档或电子表格。该接口为异步接口。
             */
            create: async (
                payload?: {
                    data?: {
                        owner_id?: string;
                        obj_type?: "docx" | "sheet";
                        parent_type?: "docx" | "sheet";
                        name?: string;
                        parent_token?: string;
                        creator_id?: string;
                        create_time?: string;
                        update_time?: string;
                        status?: "0" | "1" | "2";
                        version?: string;
                    };
                    params?: {
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { file_token: string };
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
                                name?: string;
                                version?: string;
                                parent_token?: string;
                                owner_id?: string;
                                creator_id?: string;
                                create_time?: string;
                                update_time?: string;
                                status?: "0" | "1" | "2";
                                obj_type?: "docx" | "sheet";
                                parent_type?: "docx" | "sheet";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/versions`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.version&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=drive&resource=file.version&version=v1 document }
             *
             * 删除文档版本
             *
             * 删除基于在线文档或电子表格创建的版本。
             */
            delete: async (
                payload?: {
                    params: {
                        obj_type: "docx" | "sheet";
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path: { file_token: string; version_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/versions/:version_id`,
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
            listWithIterator: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
                        obj_type: "docx" | "sheet";
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path: { file_token: string };
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
                                `${this.domain}/open-apis/drive/v1/files/:file_token/versions`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                    name?: string;
                                                    version?: string;
                                                    parent_token?: string;
                                                    owner_id?: string;
                                                    creator_id?: string;
                                                    create_time?: string;
                                                    update_time?: string;
                                                    status?: "0" | "1" | "2";
                                                    obj_type?: "docx" | "sheet";
                                                    parent_type?:
                                                        | "docx"
                                                        | "sheet";
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.version&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=drive&resource=file.version&version=v1 document }
             *
             * 获取文档版本列表
             *
             * 获取文档或电子表格的版本列表。
             */
            list: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
                        obj_type: "docx" | "sheet";
                        user_id_type?: "open_id" | "union_id" | "user_id";
                    };
                    path: { file_token: string };
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
                                    name?: string;
                                    version?: string;
                                    parent_token?: string;
                                    owner_id?: string;
                                    creator_id?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    status?: "0" | "1" | "2";
                                    obj_type?: "docx" | "sheet";
                                    parent_type?: "docx" | "sheet";
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/versions`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.version&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=drive&resource=file.version&version=v1 document }
             *
             * 获取文档版本信息
             *
             * 该接口用于获取文档或电子表格指定版本的信息，包括标题、标识、创建者、创建时间等。
             */
            get: async (
                payload?: {
                    params: {
                        obj_type: "docx" | "sheet";
                        user_id_type?: "open_id" | "union_id" | "user_id";
                        page_token?: string;
                        page_size?: number;
                    };
                    path: { file_token: string; version_id: string };
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
                                name?: string;
                                version?: string;
                                parent_token?: string;
                                owner_id?: string;
                                creator_id?: string;
                                create_time?: string;
                                update_time?: string;
                                status?: "0" | "1" | "2";
                                obj_type?: "docx" | "sheet";
                                parent_type?: "docx" | "sheet";
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/versions/:version_id`,
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
         * file.view_record
         */
        fileViewRecord: {
            listWithIterator: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
                        file_type:
                            | "doc"
                            | "docx"
                            | "sheet"
                            | "bitable"
                            | "mindnote"
                            | "wiki"
                            | "file";
                        viewer_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { file_token: string };
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
                                `${this.domain}/open-apis/drive/v1/files/:file_token/view_records`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                    viewer_id?: string;
                                                    name?: string;
                                                    avatar_url?: string;
                                                    last_view_time?: string;
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.view_record&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=drive&resource=file.view_record&version=v1 document }
             *
             * 获取文件访问记录
             *
             * 获取文档、电子表格、多维表格等文件的历史访问记录，包括访问者的 ID、姓名、头像和最近访问时间。
             */
            list: async (
                payload?: {
                    params: {
                        page_size: number;
                        page_token?: string;
                        file_type:
                            | "doc"
                            | "docx"
                            | "sheet"
                            | "bitable"
                            | "mindnote"
                            | "wiki"
                            | "file";
                        viewer_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { file_token: string };
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
                                    viewer_id?: string;
                                    name?: string;
                                    avatar_url?: string;
                                    last_view_time?: string;
                                }>;
                                page_token?: string;
                                has_more?: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/view_records`,
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
         * file.statistics
         */
        fileStatistics: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.statistics&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=drive&resource=file.statistics&version=v1 document }
             *
             * 获取文件统计信息
             *
             * 此接口用于获取各类文件的流量统计信息和互动信息，包括阅读人数、阅读次数和点赞数。
             */
            get: async (
                payload?: {
                    params: {
                        file_type:
                            | "doc"
                            | "sheet"
                            | "mindnote"
                            | "bitable"
                            | "wiki"
                            | "file"
                            | "docx";
                    };
                    path?: { file_token?: string };
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
                                file_token?: string;
                                file_type?: string;
                                statistics?: {
                                    uv?: number;
                                    pv?: number;
                                    like_count?: number;
                                    timestamp?: number;
                                    uv_today?: number;
                                    pv_today?: number;
                                    like_count_today?: number;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/statistics`,
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
         * permission.public.password
         */
        permissionPublicPassword: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public.password&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=permission.public.password&version=v1 document }
             *
             * 启用云文档密码
             *
             * 启用指定云文档的密码。密码启用后，组织外用户需要密码访问，组织内用户无需密码可直接访问。
             */
            create: async (
                payload?: {
                    params: {
                        type:
                            | "doc"
                            | "sheet"
                            | "file"
                            | "wiki"
                            | "bitable"
                            | "docx"
                            | "mindnote"
                            | "minutes"
                            | "slides";
                    };
                    path?: { token?: string };
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
                            data?: { password?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/permissions/:token/public/password`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public.password&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=drive&resource=permission.public.password&version=v1 document }
             *
             * 刷新云文档密码
             *
             * 刷新指定云文档的密码。密码刷新后，旧密码将失效，并生成新密码。
             *
             * ## 注意事项;;要刷新密码，必须先确保指定云文档已有密码。你可通过[启用云文档密码](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public-password/create)接口启用密码。
             */
            update: async (
                payload?: {
                    params: {
                        type:
                            | "doc"
                            | "sheet"
                            | "file"
                            | "wiki"
                            | "bitable"
                            | "docx"
                            | "mindnote"
                            | "minutes"
                            | "slides";
                    };
                    path?: { token?: string };
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
                            data?: { password?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/permissions/:token/public/password`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public.password&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=drive&resource=permission.public.password&version=v1 document }
             *
             * 停用云文档密码
             *
             * 停用指定云文档的密码。密码停用后，组织外用户访问文档将无需输入密码。
             */
            delete: async (
                payload?: {
                    params: {
                        type:
                            | "doc"
                            | "sheet"
                            | "file"
                            | "wiki"
                            | "bitable"
                            | "docx"
                            | "mindnote"
                            | "minutes"
                            | "slides";
                    };
                    path?: { token?: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/permissions/:token/public/password`,
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
        },
        /**
         * file.comment
         */
        fileComment: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=file.comment&version=v1 document }
             *
             * 添加全文评论
             *
             * 在文档中添加一条全局评论，不支持局部评论。
             */
            create: async (
                payload?: {
                    data?: {
                        reply_list?: {
                            replies: Array<{
                                content: {
                                    elements: Array<{
                                        type:
                                            | "text_run"
                                            | "docs_link"
                                            | "person";
                                        text_run?: { text: string };
                                        docs_link?: { url: string };
                                        person?: { user_id: string };
                                    }>;
                                };
                                reactions?: Array<{
                                    reaction_key: string;
                                    count: number;
                                    ahead_users?: Array<string>;
                                }>;
                            }>;
                        };
                    };
                    params: {
                        file_type: "doc" | "docx";
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { file_token: string };
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
                                comment_id?: string;
                                user_id?: string;
                                create_time?: number;
                                update_time?: number;
                                is_solved?: boolean;
                                solved_time?: number;
                                solver_user_id?: string;
                                has_more?: boolean;
                                page_token?: string;
                                is_whole?: boolean;
                                quote?: string;
                                reply_list?: {
                                    replies: Array<{
                                        content: {
                                            elements: Array<{
                                                type:
                                                    | "text_run"
                                                    | "docs_link"
                                                    | "person";
                                                text_run?: { text: string };
                                                docs_link?: { url: string };
                                                person?: { user_id: string };
                                            }>;
                                        };
                                        reply_id?: string;
                                        user_id?: string;
                                        create_time?: number;
                                        update_time?: number;
                                        extra?: { image_list?: Array<string> };
                                        reactions?: Array<{
                                            reaction_key: string;
                                            count: number;
                                            ahead_users?: Array<string>;
                                        }>;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/comments`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=drive&resource=file.comment&version=v1 document }
             *
             * 获取全文评论
             *
             * 获取云文档中的某条全文评论，不支持局部评论。
             */
            get: async (
                payload?: {
                    params: {
                        file_type:
                            | "doc"
                            | "sheet"
                            | "file"
                            | "docx"
                            | "slides"
                            | "bitable"
                            | "apps";
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        need_reaction?: boolean;
                    };
                    path: { file_token: string; comment_id: string };
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
                                comment_id?: string;
                                user_id?: string;
                                create_time?: number;
                                update_time?: number;
                                is_solved?: boolean;
                                solved_time?: number;
                                solver_user_id?: string;
                                has_more?: boolean;
                                page_token?: string;
                                is_whole?: boolean;
                                quote?: string;
                                reply_list?: {
                                    replies: Array<{
                                        content: {
                                            elements: Array<{
                                                type:
                                                    | "text_run"
                                                    | "docs_link"
                                                    | "person";
                                                text_run?: { text: string };
                                                docs_link?: { url: string };
                                                person?: { user_id: string };
                                            }>;
                                        };
                                        reply_id?: string;
                                        user_id?: string;
                                        create_time?: number;
                                        update_time?: number;
                                        extra?: { image_list?: Array<string> };
                                        reactions?: Array<{
                                            reaction_key: string;
                                            count: number;
                                            ahead_users?: Array<string>;
                                        }>;
                                    }>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=drive&resource=file.comment&version=v1 document }
             *
             * 解决/恢复评论
             *
             * 解决或恢复云文档中的评论。
             */
            patch: async (
                payload?: {
                    data: { is_solved: boolean };
                    params: {
                        file_type:
                            | "doc"
                            | "docx"
                            | "sheet"
                            | "file"
                            | "slides"
                            | "bitable"
                            | "apps";
                    };
                    path: { file_token: string; comment_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        { code?: number; msg?: string; data?: { data: string } }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id`,
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
            listWithIterator: async (
                payload?: {
                    params: {
                        file_type:
                            | "doc"
                            | "docx"
                            | "sheet"
                            | "file"
                            | "slides"
                            | "bitable"
                            | "apps";
                        is_whole?: boolean;
                        is_solved?: boolean;
                        page_token?: string;
                        page_size?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        need_reaction?: boolean;
                        need_relation?: boolean;
                    };
                    path: { file_token: string };
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
                                `${this.domain}/open-apis/drive/v1/files/:file_token/comments`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                has_more?: boolean;
                                                page_token?: string;
                                                items?: Array<{
                                                    comment_id?: string;
                                                    user_id?: string;
                                                    create_time?: number;
                                                    update_time?: number;
                                                    is_solved?: boolean;
                                                    solved_time?: number;
                                                    solver_user_id?: string;
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    is_whole?: boolean;
                                                    quote?: string;
                                                    reply_list?: {
                                                        replies: Array<{
                                                            content: {
                                                                elements: Array<{
                                                                    type:
                                                                        | "text_run"
                                                                        | "docs_link"
                                                                        | "person";
                                                                    text_run?: {
                                                                        text: string;
                                                                    };
                                                                    docs_link?: {
                                                                        url: string;
                                                                    };
                                                                    person?: {
                                                                        user_id: string;
                                                                    };
                                                                }>;
                                                            };
                                                            reply_id?: string;
                                                            user_id?: string;
                                                            create_time?: number;
                                                            update_time?: number;
                                                            extra?: {
                                                                image_list?: Array<string>;
                                                            };
                                                            reactions?: Array<{
                                                                reaction_key: string;
                                                                count: number;
                                                                ahead_users?: Array<string>;
                                                            }>;
                                                        }>;
                                                    };
                                                }>;
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=drive&resource=file.comment&version=v1 document }
             *
             * 获取云文档所有评论
             *
             * 该接口用于根据云文档 Token 分页获取文档所有评论信息，包括评论和回复 ID、回复的内容、评论人和回复人的用户 ID 等。该接口支持返回全局评论以及局部评论，可通过 is_whole（是否为全局评论）字段区分。默认每页返回 50 个评论。
             */
            list: async (
                payload?: {
                    params: {
                        file_type:
                            | "doc"
                            | "docx"
                            | "sheet"
                            | "file"
                            | "slides"
                            | "bitable"
                            | "apps";
                        is_whole?: boolean;
                        is_solved?: boolean;
                        page_token?: string;
                        page_size?: number;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                        need_reaction?: boolean;
                        need_relation?: boolean;
                    };
                    path: { file_token: string };
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
                                has_more?: boolean;
                                page_token?: string;
                                items?: Array<{
                                    comment_id?: string;
                                    user_id?: string;
                                    create_time?: number;
                                    update_time?: number;
                                    is_solved?: boolean;
                                    solved_time?: number;
                                    solver_user_id?: string;
                                    has_more?: boolean;
                                    page_token?: string;
                                    is_whole?: boolean;
                                    quote?: string;
                                    reply_list?: {
                                        replies: Array<{
                                            content: {
                                                elements: Array<{
                                                    type:
                                                        | "text_run"
                                                        | "docs_link"
                                                        | "person";
                                                    text_run?: { text: string };
                                                    docs_link?: { url: string };
                                                    person?: {
                                                        user_id: string;
                                                    };
                                                }>;
                                            };
                                            reply_id?: string;
                                            user_id?: string;
                                            create_time?: number;
                                            update_time?: number;
                                            extra?: {
                                                image_list?: Array<string>;
                                            };
                                            reactions?: Array<{
                                                reaction_key: string;
                                                count: number;
                                                ahead_users?: Array<string>;
                                            }>;
                                        }>;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/comments`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=batch_query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_query&project=drive&resource=file.comment&version=v1 document }
             *
             * 批量获取评论
             *
             * 该接口用于根据评论 ID 列表批量获取云文档评论信息，包括评论和回复 ID、回复的内容、评论人和回复人的用户 ID 等。支持返回全局评论以及局部评论，可通过 is_whole （是否为全局评论标识）字段区分。
             */
            batchQuery: async (
                payload?: {
                    data: {
                        comment_ids: Array<string>;
                        need_reaction?: boolean;
                        need_relation?: boolean;
                    };
                    params: {
                        file_type:
                            | "doc"
                            | "docx"
                            | "sheet"
                            | "file"
                            | "slides"
                            | "bitable"
                            | "apps";
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path?: { file_token?: string };
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
                                    comment_id?: string;
                                    user_id?: string;
                                    create_time?: number;
                                    update_time?: number;
                                    is_solved?: boolean;
                                    solved_time?: number;
                                    solver_user_id?: string;
                                    has_more?: boolean;
                                    page_token?: string;
                                    is_whole?: boolean;
                                    quote?: string;
                                    reply_list?: {
                                        replies: Array<{
                                            content: {
                                                elements: Array<{
                                                    type:
                                                        | "text_run"
                                                        | "docs_link"
                                                        | "person";
                                                    text_run?: { text: string };
                                                    docs_link?: { url: string };
                                                    person?: {
                                                        user_id: string;
                                                    };
                                                }>;
                                            };
                                            reply_id?: string;
                                            user_id?: string;
                                            create_time?: number;
                                            update_time?: number;
                                            extra?: {
                                                image_list?: Array<string>;
                                            };
                                            reactions?: Array<{
                                                reaction_key: string;
                                                count: number;
                                                ahead_users?: Array<string>;
                                            }>;
                                        }>;
                                    };
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/comments/batch_query`,
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
         * media
         */
        media: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=batch_get_tmp_download_url&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get_tmp_download_url&project=drive&resource=media&version=v1 document }
             *
             * 获取素材临时下载链接
             *
             * 该接口用于获取云文档中素材的临时下载链接。链接的有效期为 24 小时，过期失效。
             */
            batchGetTmpDownloadUrl: async (
                payload?: {
                    params: { file_tokens: Array<string>; extra?: string };
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
                                tmp_download_urls?: Array<{
                                    file_token: string;
                                    tmp_download_url: string;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/medias/batch_get_tmp_download_url`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=download&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download&project=drive&resource=media&version=v1 document }
             *
             * 下载素材
             *
             * 下载各类云文档中的素材，例如电子表格中的图片。该接口支持通过在请求头添加`Range` 参数分片下载素材。
             */
            download: async (
                payload?: {
                    params?: { extra?: string };
                    path: { file_token: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, any>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/medias/:file_token/download`,
                            path
                        ),
                        method: "GET",
                        headers,
                        data,
                        params,
                        responseType: "stream",
                        paramsSerializer: (params) =>
                            stringify(params, { arrayFormat: "repeat" }),
                        $return_headers: true,
                    })
                    .catch((e) => {
                        this.logger.error(formatErrors(e));
                        throw e;
                    });

                const checkIsReadable = () => {
                    const consumedError =
                        "The stream has already been consumed";
                    if (!res.data.readable) {
                        this.logger.error(consumedError);
                        throw new Error(consumedError);
                    }
                };

                return {
                    writeFile: async (filePath: string) => {
                        checkIsReadable();
                        return new Promise((resolve, reject) => {
                            const writableStream =
                                fs.createWriteStream(filePath);
                            writableStream.on("finish", () => {
                                resolve(filePath);
                            });
                            writableStream.on("error", (e) => {
                                reject(e);
                            });
                            res.data.pipe(writableStream);
                        });
                    },
                    getReadableStream: () => {
                        checkIsReadable();
                        return res.data as Readable;
                    },
                    headers: res.headers,
                };
            },
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_part&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_part&project=drive&resource=media&version=v1 document }
             *
             * 分片上传素材-上传分片
             *
             * 根据 [预上传](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_prepare)接口返回的上传事务 ID 和分片策略上传对应的素材分片。上传完成后，你可调用 [分片上传素材（完成上传）](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_finish)触发完成上传。
             *
             * ## 使用限制;;该接口调用频率上限为 5 QPS。
             */
            uploadPart: async (
                payload?: {
                    data: {
                        upload_id: string;
                        seq: number;
                        size: number;
                        checksum?: string;
                        file: Buffer | fs.ReadStream;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                const res = await this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/medias/upload_part`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_finish&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_finish&project=drive&resource=media&version=v1 document }
             *
             * 分片上传素材-完成上传
             *
             * 调用[上传分片](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_part)接口将分片全部上传完毕后，你需调用本接口触发完成上传。了解完整的分片上传素材流程，参考[素材概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/introduction)。
             *
             * ## 使用限制;;该接口调用频率上限为 5 QPS。
             */
            uploadFinish: async (
                payload?: {
                    data: { upload_id: string; block_num: number };
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
                            data?: { file_token?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/medias/upload_finish`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_all&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_all&project=drive&resource=media&version=v1 document }
             *
             * 上传素材
             *
             * 将文件、图片、视频等素材上传到指定云文档中。素材将显示在对应云文档中，在云空间中不会显示。
             */
            uploadAll: async (
                payload?: {
                    data: {
                        file_name: string;
                        parent_type:
                            | "doc_image"
                            | "docx_image"
                            | "sheet_image"
                            | "doc_file"
                            | "docx_file"
                            | "sheet_file"
                            | "vc_virtual_background"
                            | "bitable_image"
                            | "bitable_file"
                            | "moments"
                            | "ccm_import_open"
                            | "calendar"
                            | "base_global"
                            | "lark_ai_media_analysis"
                            | "whiteboard"
                            | "mindnote_image"
                            | "comment_image"
                            | "slide_img"
                            | "slide_file"
                            | "email"
                            | "bitable_tmp_point"
                            | "office_sheet_file"
                            | "office_slide_file";
                        parent_node: string;
                        size: number;
                        checksum?: string;
                        extra?: string;
                        file: Buffer | fs.ReadStream;
                    };
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
                            data?: { file_token?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/medias/upload_all`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_prepare&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_prepare&project=drive&resource=media&version=v1 document }
             *
             * 分片上传素材-预上传
             *
             * 发送初始化请求，以获取上传事务 ID 和分片策略，为[上传素材分片](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_part)做准备。平台固定以 4MB 的大小对素材进行分片。了解完整的分片上传素材流程，参考[素材概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/introduction)。
             */
            uploadPrepare: async (
                payload?: {
                    data: {
                        file_name: string;
                        parent_type:
                            | "doc_image"
                            | "docx_image"
                            | "sheet_image"
                            | "doc_file"
                            | "docx_file"
                            | "sheet_file"
                            | "vc_virtual_background"
                            | "bitable_image"
                            | "bitable_file"
                            | "moments"
                            | "ccm_import_open"
                            | "calendar"
                            | "base_global"
                            | "lark_ai_media_analysis"
                            | "whiteboard"
                            | "mindnote_image"
                            | "comment_image"
                            | "slide_img"
                            | "slide_file"
                            | "email"
                            | "bitable_tmp_point"
                            | "office_sheet_file"
                            | "office_slide_file";
                        size: number;
                        parent_node?: string;
                        extra?: string;
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
                                upload_id?: string;
                                block_size?: number;
                                block_num?: number;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/medias/upload_prepare`,
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
         * import_task
         */
        importTask: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=import_task&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=drive&resource=import_task&version=v1 document }
             *
             * 查询导入结果
             *
             * 根据[创建导入任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/create)返回的导入任务 ID（ticket）轮询导入结果。了解完整的导入文件步骤，参考[导入文件概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/import-user-guide)。
             */
            get: async (
                payload?: {
                    path: { ticket: string };
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
                                result?: {
                                    ticket?: string;
                                    type: string;
                                    job_status?: number;
                                    job_error_msg?: string;
                                    token?: string;
                                    url?: string;
                                    extra?: Array<string>;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/import_tasks/:ticket`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=import_task&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=import_task&version=v1 document }
             *
             * 创建导入任务
             *
             * 该接口用于创建导入文件的任务，并返回导入任务 ID。导入文件指将本地文件如 Word、TXT、Markdown、Excel 等格式的文件导入为某种格式的飞书在线云文档。该接口为异步接口，需要继续调用[查询导入任务结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/get)接口获取导入结果。了解完整的导入文件步骤，参考[导入文件概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/import-user-guide)。
             *
             * ## 前提条件;创建导入任务前，你需先调用[上传素材](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_all)或[上传文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_all)接口获取源文件的 token。
             */
            create: async (
                payload?: {
                    data: {
                        file_extension: string;
                        file_token: string;
                        type: string;
                        file_name?: string;
                        point: { mount_type: number; mount_key: string };
                        token?: string;
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
                            data?: { ticket?: string };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/import_tasks`,
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
         * user
         */
        user: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=user&apiName=subscription_status&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription_status&project=drive&resource=user&version=v1 document }
             *
             * 查询用户云文档事件订阅状态
             *
             * 该接口用于查询用户云文档事件的订阅状态。仅当is_subscribe（订阅状态）为 true，应用才可收到 “用户云文档事件”下的各类通知事件。
             */
            subscriptionStatus: async (
                payload?: {
                    params: { event_type: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        { code?: number; msg?: string; data?: { data: string } }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/user/subscription_status`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=user&apiName=remove_subscription&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_subscription&project=drive&resource=user&version=v1 document }
             *
             * 取消用户云文档事件订阅
             *
             * 该接口用于取消订阅用户云文档的通知事件。取消订阅后，用户将不再收到云文档评论、回复添加事件。
             */
            removeSubscription: async (
                payload?: {
                    params: { event_type: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/user/remove_subscription`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=user&apiName=subscription&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=drive&resource=user&version=v1 document }
             *
             * 订阅用户云文档事件
             *
             * 订阅用户云文档的各类通知事件，调用后目前可获取接收者视角的云文档评论、回复添加事件。
             *
             * ## 注意事项;仅用户身份订阅“用户云文档事件”时，需要调用该接口，应用身份无需调用。
             */
            subscription: async (
                payload?: {
                    data: { event_type: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/user/subscription`,
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
         * file.comment.reply
         */
        fileCommentReply: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment.reply&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=drive&resource=file.comment.reply&version=v1 document }
             *
             * 删除回复
             *
             * 删除云文档中的某条回复。
             */
            delete: async (
                payload?: {
                    params: {
                        file_type:
                            | "doc"
                            | "docx"
                            | "sheet"
                            | "file"
                            | "slides"
                            | "bitable"
                            | "apps";
                    };
                    path: {
                        file_token: string;
                        comment_id: string;
                        reply_id: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        { code?: number; msg?: string; data?: { data: string } }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id/replies/:reply_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment.reply&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=file.comment.reply&version=v1 document }
             *
             * 添加回复
             *
             * 使用该接口可对云文档中的某条评论进行回复，回复内容支持普通文本、云文档链接等。
             */
            create: async (
                payload?: {
                    data: {
                        content: {
                            elements: Array<{
                                type: "text_run" | "docs_link" | "person";
                                text_run?: { text: string };
                                docs_link?: { url: string };
                                person?: { user_id: string };
                            }>;
                        };
                        extra?: string;
                    };
                    params: {
                        file_type:
                            | "doc"
                            | "sheet"
                            | "file"
                            | "docx"
                            | "slides"
                            | "bitable"
                            | "apps";
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { file_token: string; comment_id: string };
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
                                content?: {
                                    elements: Array<{
                                        type:
                                            | "text_run"
                                            | "docs_link"
                                            | "person";
                                        text_run?: { text: string };
                                        docs_link?: { url: string };
                                        person?: { user_id: string };
                                    }>;
                                };
                                reply_id?: string;
                                user_id?: string;
                                create_time?: number;
                                update_time?: number;
                                extra?: { image_list?: Array<string> };
                                reactions?: Array<{
                                    reaction_key: string;
                                    count: number;
                                    ahead_users?: Array<string>;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id/replies`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment.reply&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=drive&resource=file.comment.reply&version=v1 document }
             *
             * 更新回复的内容
             *
             * 更新云文档中的某条回复的内容。
             */
            update: async (
                payload?: {
                    data: {
                        content: {
                            elements: Array<{
                                type: "text_run" | "docs_link" | "person";
                                text_run?: { text: string };
                                docs_link?: { url: string };
                                person?: { user_id: string };
                            }>;
                        };
                    };
                    params: {
                        file_type:
                            | "doc"
                            | "docx"
                            | "sheet"
                            | "file"
                            | "slides"
                            | "bitable"
                            | "apps";
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: {
                        file_token: string;
                        comment_id: string;
                        reply_id: string;
                    };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<
                        any,
                        { code?: number; msg?: string; data?: { data: string } }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id/replies/:reply_id`,
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
            listWithIterator: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        file_type:
                            | "doc"
                            | "docx"
                            | "sheet"
                            | "file"
                            | "slides"
                            | "bitable"
                            | "apps";
                        need_reaction?: boolean;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { file_token: string; comment_id: string };
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
                                `${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id/replies`,
                                path
                            ),
                            method: "GET",
                            headers: pickBy(innerPayload.headers, identity),
                            params: pickBy(innerPayload.params, identity),
                            data,
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
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
                                                    content: {
                                                        elements: Array<{
                                                            type:
                                                                | "text_run"
                                                                | "docs_link"
                                                                | "person";
                                                            text_run?: {
                                                                text: string;
                                                            };
                                                            docs_link?: {
                                                                url: string;
                                                            };
                                                            person?: {
                                                                user_id: string;
                                                            };
                                                        }>;
                                                    };
                                                    reply_id?: string;
                                                    user_id?: string;
                                                    create_time?: number;
                                                    update_time?: number;
                                                    extra?: {
                                                        image_list?: Array<string>;
                                                    };
                                                    reactions?: Array<{
                                                        reaction_key: string;
                                                        count: number;
                                                        ahead_users?: Array<string>;
                                                    }>;
                                                }>;
                                                page_token?: string;
                                                has_more: boolean;
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment.reply&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=drive&resource=file.comment.reply&version=v1 document }
             *
             * 获取回复信息
             *
             * 该接口用于根据评论 ID，获取该条评论对应的回复信息，包括回复 ID、回复内容、回复人的用户 ID 等。
             */
            list: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        file_type:
                            | "doc"
                            | "docx"
                            | "sheet"
                            | "file"
                            | "slides"
                            | "bitable"
                            | "apps";
                        need_reaction?: boolean;
                        user_id_type?: "user_id" | "union_id" | "open_id";
                    };
                    path: { file_token: string; comment_id: string };
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
                                    content: {
                                        elements: Array<{
                                            type:
                                                | "text_run"
                                                | "docs_link"
                                                | "person";
                                            text_run?: { text: string };
                                            docs_link?: { url: string };
                                            person?: { user_id: string };
                                        }>;
                                    };
                                    reply_id?: string;
                                    user_id?: string;
                                    create_time?: number;
                                    update_time?: number;
                                    extra?: { image_list?: Array<string> };
                                    reactions?: Array<{
                                        reaction_key: string;
                                        count: number;
                                        ahead_users?: Array<string>;
                                    }>;
                                }>;
                                page_token?: string;
                                has_more: boolean;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id/replies`,
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
         * permission.public
         */
        permissionPublic: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=drive&resource=permission.public&version=v1 document }
             *
             * 更新云文档权限设置
             *
             * 更新指定云文档的权限设置，包括是否允许内容被分享到组织外、谁可以查看、添加、移除协作者、谁可以复制内容等设置。;
             *
             * 本接口为历史版本接口。推荐使用新版接口[更新云文档权限设置](https://open.feishu.cn/document/ukTMukTMukTM/uIzNzUjLyczM14iM3MTN/drive-v2/permission-public/patch)。
             */
            patch: async (
                payload?: {
                    data?: {
                        external_access?: boolean;
                        security_entity?:
                            | "anyone_can_view"
                            | "anyone_can_edit"
                            | "only_full_access";
                        comment_entity?: "anyone_can_view" | "anyone_can_edit";
                        share_entity?:
                            | "anyone"
                            | "same_tenant"
                            | "only_full_access";
                        link_share_entity?:
                            | "tenant_readable"
                            | "tenant_editable"
                            | "anyone_readable"
                            | "anyone_editable"
                            | "closed";
                        invite_external?: boolean;
                    };
                    params: {
                        type:
                            | "doc"
                            | "sheet"
                            | "file"
                            | "wiki"
                            | "bitable"
                            | "docx"
                            | "mindnote"
                            | "minutes"
                            | "slides";
                    };
                    path: { token: string };
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
                                permission_public?: {
                                    external_access?: boolean;
                                    security_entity?:
                                        | "anyone_can_view"
                                        | "anyone_can_edit"
                                        | "only_full_access";
                                    comment_entity?:
                                        | "anyone_can_view"
                                        | "anyone_can_edit";
                                    share_entity?:
                                        | "anyone"
                                        | "same_tenant"
                                        | "only_full_access";
                                    link_share_entity?:
                                        | "tenant_readable"
                                        | "tenant_editable"
                                        | "anyone_readable"
                                        | "anyone_editable"
                                        | "closed";
                                    invite_external?: boolean;
                                    lock_switch?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/permissions/:token/public`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=drive&resource=permission.public&version=v1 document }
             *
             * 获取云文档权限设置
             *
             * 获取指定云文档的权限设置，包括是否允许内容被分享到组织外、谁可以查看、添加、移除协作者等设置。
             *
             * 本接口为历史版本接口。推荐使用新版接口[获取云文档权限设置](https://open.feishu.cn/document/ukTMukTMukTM/uIzNzUjLyczM14iM3MTN/drive-v2/permission-public/get)。
             */
            get: async (
                payload?: {
                    params: {
                        type:
                            | "doc"
                            | "sheet"
                            | "file"
                            | "wiki"
                            | "bitable"
                            | "docx"
                            | "mindnote"
                            | "minutes"
                            | "slides";
                    };
                    path: { token: string };
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
                                permission_public?: {
                                    external_access?: boolean;
                                    security_entity?:
                                        | "anyone_can_view"
                                        | "anyone_can_edit"
                                        | "only_full_access";
                                    comment_entity?:
                                        | "anyone_can_view"
                                        | "anyone_can_edit";
                                    share_entity?:
                                        | "anyone"
                                        | "same_tenant"
                                        | "only_full_access";
                                    link_share_entity?:
                                        | "tenant_readable"
                                        | "tenant_editable"
                                        | "anyone_readable"
                                        | "anyone_editable"
                                        | "closed";
                                    invite_external?: boolean;
                                    lock_switch?: boolean;
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/permissions/:token/public`,
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
         * permission.member
         */
        permissionMember: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=batch_create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=drive&resource=permission.member&version=v1 document }
             *
             * 批量增加协作者权限
             *
             * 为指定云文档批量添加多个协作者，协作者可以是用户、群组、部门、用户组等。
             */
            batchCreate: async (
                payload?: {
                    data: {
                        members: Array<{
                            member_type:
                                | "email"
                                | "openid"
                                | "unionid"
                                | "openchat"
                                | "opendepartmentid"
                                | "userid"
                                | "groupid"
                                | "wikispaceid"
                                | "appid";
                            member_id: string;
                            perm: "view" | "edit" | "full_access";
                            perm_type?: "container" | "single_page";
                            type?:
                                | "user"
                                | "chat"
                                | "department"
                                | "group"
                                | "wiki_space_member"
                                | "wiki_space_viewer"
                                | "wiki_space_editor";
                            name?: string;
                            avatar?: string;
                            external_label?: boolean;
                        }>;
                    };
                    params: {
                        type:
                            | "doc"
                            | "sheet"
                            | "file"
                            | "wiki"
                            | "bitable"
                            | "docx"
                            | "folder"
                            | "mindnote"
                            | "minutes"
                            | "slides"
                            | "apps";
                        need_notification?: boolean;
                    };
                    path: { token: string };
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
                                members?: Array<{
                                    member_type:
                                        | "email"
                                        | "openid"
                                        | "unionid"
                                        | "openchat"
                                        | "opendepartmentid"
                                        | "userid"
                                        | "groupid"
                                        | "wikispaceid"
                                        | "appid";
                                    member_id: string;
                                    perm: "view" | "edit" | "full_access";
                                    perm_type?: "container" | "single_page";
                                    type?:
                                        | "user"
                                        | "chat"
                                        | "department"
                                        | "group"
                                        | "wiki_space_member"
                                        | "wiki_space_viewer"
                                        | "wiki_space_editor";
                                    name?: string;
                                    avatar?: string;
                                    external_label?: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/permissions/:token/members/batch_create`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=drive&resource=permission.member&version=v1 document }
             *
             * 更新协作者权限
             *
             * 更新指定云文档中指定协作者的权限，包括可阅读、可编辑、可管理权限。
             */
            update: async (
                payload?: {
                    data?: {
                        member_type?:
                            | "email"
                            | "openid"
                            | "unionid"
                            | "openchat"
                            | "opendepartmentid"
                            | "userid"
                            | "groupid"
                            | "wikispaceid"
                            | "appid";
                        perm?: "view" | "edit" | "full_access";
                        perm_type?: "container" | "single_page";
                        type?:
                            | "user"
                            | "chat"
                            | "department"
                            | "group"
                            | "wiki_space_member"
                            | "wiki_space_viewer"
                            | "wiki_space_editor";
                    };
                    params: {
                        need_notification?: boolean;
                        type:
                            | "doc"
                            | "sheet"
                            | "file"
                            | "wiki"
                            | "bitable"
                            | "docx"
                            | "mindnote"
                            | "minutes"
                            | "slides"
                            | "apps";
                    };
                    path: { token: string; member_id: string };
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
                                member?: {
                                    member_type:
                                        | "email"
                                        | "openid"
                                        | "unionid"
                                        | "openchat"
                                        | "opendepartmentid"
                                        | "userid"
                                        | "groupid"
                                        | "wikispaceid"
                                        | "appid";
                                    member_id: string;
                                    perm: "view" | "edit" | "full_access";
                                    perm_type?: "container" | "single_page";
                                    type?:
                                        | "user"
                                        | "chat"
                                        | "department"
                                        | "group"
                                        | "wiki_space_member"
                                        | "wiki_space_viewer"
                                        | "wiki_space_editor";
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/permissions/:token/members/:member_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=drive&resource=permission.member&version=v1 document }
             *
             * 移除协作者权限
             *
             * 通过云文档 token 和协作者 ID 移除指定云文档协作者的权限。
             */
            delete: async (
                payload?: {
                    data?: {
                        type?:
                            | "user"
                            | "chat"
                            | "department"
                            | "group"
                            | "wiki_space_member"
                            | "wiki_space_viewer"
                            | "wiki_space_editor"
                            | "appid";
                        perm_type?: "container" | "single_page";
                    };
                    params: {
                        type:
                            | "doc"
                            | "sheet"
                            | "file"
                            | "wiki"
                            | "bitable"
                            | "docx"
                            | "folder"
                            | "mindnote"
                            | "minutes"
                            | "slides"
                            | "apps";
                        member_type:
                            | "email"
                            | "openid"
                            | "openchat"
                            | "opendepartmentid"
                            | "userid"
                            | "unionid"
                            | "groupid"
                            | "wikispaceid"
                            | "appid";
                    };
                    path: { token: string; member_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/permissions/:token/members/:member_id`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=transfer_owner&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=transfer_owner&project=drive&resource=permission.member&version=v1 document }
             *
             * 转移云文档所有者
             *
             * 转移指定云文档的所有者。
             */
            transferOwner: async (
                payload?: {
                    data?: {
                        member_type?: "email" | "openid" | "userid" | "appid";
                        member_id?: string;
                    };
                    params: {
                        type:
                            | "doc"
                            | "sheet"
                            | "file"
                            | "wiki"
                            | "bitable"
                            | "docx"
                            | "mindnote"
                            | "minutes"
                            | "slides"
                            | "folder"
                            | "apps";
                        need_notification?: boolean;
                        remove_old_owner?: boolean;
                        stay_put?: boolean;
                        old_owner_perm?: string;
                    };
                    path: { token: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/permissions/:token/members/transfer_owner`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=auth&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=auth&project=drive&resource=permission.member&version=v1 document }
             *
             * 判断用户权限
             *
             * 判断当前请求的应用或用户是否具有指定云文档的指定权限，权限包括阅读、编辑、分享、评论、导出等权限。
             */
            auth: async (
                payload?: {
                    params: {
                        type:
                            | "doc"
                            | "sheet"
                            | "file"
                            | "wiki"
                            | "bitable"
                            | "docx"
                            | "mindnote"
                            | "minutes"
                            | "slides"
                            | "apps";
                        action:
                            | "view"
                            | "edit"
                            | "share"
                            | "comment"
                            | "export"
                            | "copy"
                            | "print"
                            | "manage_public";
                    };
                    path: { token: string };
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
                            data?: { auth_result: boolean };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/permissions/:token/members/auth`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=permission.member&version=v1 document }
             *
             * 增加协作者权限
             *
             * 为指定云文档添加协作者，协作者可以是用户、群组、部门、用户组等。
             *
             * ## 前提条件;;- 调用该接口需要调用身份有该云文档添加协作者的权限。添加协作者的权限可通过云文档设置中的 **谁可以查看、添加、移除协作者** 等选项进行控制。;- 调用该接口时，需要调用身份与被授权对象 **互相可见**，例如：;    - **添加用户协作者**：需要调用身份与被授权对象为联系人或同组织内可搜索，且互相未屏蔽。;    - **添加群协作者**：需要调用身份在群内。要使用 `tenant_access_token` 身份添加群协作者，则需要将该应用作为机器人添加至群组中，使应用对群可见。详细步骤参考[如何为应用开通云文档相关资源的权限](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-add-permissions-to-app)。;    - **添加部门协作者**：需要调用身份对部门可见。由于应用对企业内的组织架构都不可见，所以暂不支持通过 `tenant_access_token`  添加部门协作者。;;## 注意事项;;不支持将应用直接添加到文件夹作为协作者（添加成功后实际仍然没有权限）。如果希望给应用授予文件夹的权限，请将应用作为群机器人添加到群组内，然后授予该群组可管理权限。详细步骤参考[如何为应用开通云文档相关资源的权限](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-add-permissions-to-app)。
             */
            create: async (
                payload?: {
                    data?: {
                        member_type?:
                            | "email"
                            | "openid"
                            | "unionid"
                            | "openchat"
                            | "opendepartmentid"
                            | "userid"
                            | "groupid"
                            | "wikispaceid"
                            | "appid";
                        member_id?: string;
                        perm?: "view" | "edit" | "full_access";
                        perm_type?: "container" | "single_page";
                        type?:
                            | "user"
                            | "chat"
                            | "department"
                            | "group"
                            | "wiki_space_member"
                            | "wiki_space_viewer"
                            | "wiki_space_editor";
                    };
                    params: {
                        type:
                            | "doc"
                            | "sheet"
                            | "file"
                            | "wiki"
                            | "bitable"
                            | "docx"
                            | "folder"
                            | "mindnote"
                            | "minutes"
                            | "slides"
                            | "apps";
                        need_notification?: boolean;
                    };
                    path: { token: string };
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
                                member?: {
                                    member_type:
                                        | "email"
                                        | "openid"
                                        | "unionid"
                                        | "openchat"
                                        | "opendepartmentid"
                                        | "userid"
                                        | "groupid"
                                        | "wikispaceid"
                                        | "appid";
                                    member_id: string;
                                    perm: "view" | "edit" | "full_access";
                                    perm_type?: "container" | "single_page";
                                    type?:
                                        | "user"
                                        | "chat"
                                        | "department"
                                        | "group"
                                        | "wiki_space_member"
                                        | "wiki_space_viewer"
                                        | "wiki_space_editor";
                                };
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/permissions/:token/members`,
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=drive&resource=permission.member&version=v1 document }
             *
             * 获取云文档协作者
             *
             * 获取指定云文档的协作者，支持查询人、群、组织架构、用户组、知识库成员五种类型的协作者。
             *
             * ## 前提条件;;调用该接口前，你需确保当前应用或用户具有查看协作者的权限。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
             */
            list: async (
                payload?: {
                    params: {
                        type:
                            | "doc"
                            | "sheet"
                            | "file"
                            | "wiki"
                            | "bitable"
                            | "docx"
                            | "mindnote"
                            | "minutes"
                            | "slides"
                            | "folder"
                            | "apps";
                        fields?: string;
                        perm_type?: "container" | "single_page";
                    };
                    path: { token: string };
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
                                    member_type:
                                        | "email"
                                        | "openid"
                                        | "unionid"
                                        | "openchat"
                                        | "opendepartmentid"
                                        | "userid"
                                        | "groupid"
                                        | "wikispaceid"
                                        | "appid";
                                    member_id: string;
                                    perm: "view" | "edit" | "full_access";
                                    perm_type?: "container" | "single_page";
                                    type?:
                                        | "user"
                                        | "chat"
                                        | "department"
                                        | "group"
                                        | "wiki_space_member"
                                        | "wiki_space_viewer"
                                        | "wiki_space_editor";
                                    name?: string;
                                    avatar?: string;
                                    external_label?: boolean;
                                }>;
                            };
                        }
                    >({
                        url: fillApiPath(
                            `${this.domain}/open-apis/drive/v1/permissions/:token/members`,
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
        v1: {
            /**
             * file
             */
            file: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=create_folder&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_folder&project=drive&resource=file&version=v1 document }
                 *
                 * 新建文件夹
                 *
                 * 该接口用于在用户云空间指定文件夹中创建一个空文件夹。
                 */
                createFolder: async (
                    payload?: {
                        data: { name: string; folder_token: string };
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
                                data?: { token?: string; url?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/create_folder`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=move&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=move&project=drive&resource=file&version=v1 document }
                 *
                 * 移动文件或文件夹
                 *
                 * 将文件或者文件夹移动到用户云空间的其他位置。
                 *
                 * ## 使用限制;;该接口不支持并发调用，且调用频率上限为 5 QPS 且 10000次/天。否则会返回 1061045 错误码，可通过稍后重试解决。
                 */
                move: async (
                    payload?: {
                        data?: {
                            type?:
                                | "file"
                                | "docx"
                                | "bitable"
                                | "doc"
                                | "sheet"
                                | "mindnote"
                                | "folder"
                                | "slides";
                            folder_token?: string;
                        };
                        path: { file_token: string };
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
                                data?: { task_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/move`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=copy&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=copy&project=drive&resource=file&version=v1 document }
                 *
                 * 复制文件
                 *
                 * 将用户云空间中的文件复制至其它文件夹下。该接口为异步接口。
                 */
                copy: async (
                    payload?: {
                        data: {
                            name: string;
                            type?:
                                | "file"
                                | "doc"
                                | "sheet"
                                | "bitable"
                                | "docx"
                                | "mindnote"
                                | "slides";
                            folder_token: string;
                            extra?: Array<{ key: string; value: string }>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { file_token?: string };
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
                                    file?: {
                                        token: string;
                                        name: string;
                                        type: string;
                                        parent_token?: string;
                                        url?: string;
                                        shortcut_info?: {
                                            target_type: string;
                                            target_token: string;
                                        };
                                        created_time?: string;
                                        modified_time?: string;
                                        owner_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/copy`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=create_shortcut&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_shortcut&project=drive&resource=file&version=v1 document }
                 *
                 * 创建文件快捷方式
                 *
                 * 创建指定文件的快捷方式到云空间的其它文件夹中。
                 *
                 * ## 使用限制;;该接口不支持并发调用，且调用频率上限为 5 QPS，10000 次/天。否则会返回 1061045 错误码，可通过稍后重试解决。
                 */
                createShortcut: async (
                    payload?: {
                        data: {
                            parent_token: string;
                            refer_entity: {
                                refer_token: string;
                                refer_type:
                                    | "file"
                                    | "docx"
                                    | "bitable"
                                    | "doc"
                                    | "sheet"
                                    | "mindnote"
                                    | "slides";
                            };
                        };
                        params?: {
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
                                    succ_shortcut_node?: {
                                        token: string;
                                        name: string;
                                        type: string;
                                        parent_token?: string;
                                        url?: string;
                                        shortcut_info?: {
                                            target_type: string;
                                            target_token: string;
                                        };
                                        created_time?: string;
                                        modified_time?: string;
                                        owner_id?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/create_shortcut`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_part&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_part&project=drive&resource=file&version=v1 document }
                 *
                 * 分片上传文件-上传分片
                 *
                 * 根据 [预上传](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_prepare)接口返回的上传事务 ID 和分片策略上传对应的文件分片。上传完成后，你需调用[分片上传文件（完成上传）](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_finish)触发完成上传。了解完整的上传文件流程，参考[分片上传文件概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/multipart-upload-file-/introduction)。
                 */
                uploadPart: async (
                    payload?: {
                        data: {
                            upload_id: string;
                            seq: number;
                            size: number;
                            checksum?: string;
                            file: Buffer | fs.ReadStream;
                        };
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
                                `${this.domain}/open-apis/drive/v1/files/upload_part`,
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
                listWithIterator: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            folder_token?: string;
                            order_by?: "EditedTime" | "CreatedTime";
                            direction?: "ASC" | "DESC";
                            option?: string;
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
                                    `${this.domain}/open-apis/drive/v1/files`,
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
                                                    files?: Array<{
                                                        token: string;
                                                        name: string;
                                                        type: string;
                                                        parent_token?: string;
                                                        url?: string;
                                                        shortcut_info?: {
                                                            target_type: string;
                                                            target_token: string;
                                                        };
                                                        created_time?: string;
                                                        modified_time?: string;
                                                        owner_id?: string;
                                                    }>;
                                                    next_page_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=drive&resource=file&version=v1 document }
                 *
                 * 获取文件夹中的文件清单
                 *
                 * 该接口用于获取用户云空间指定文件夹中文件信息清单。文件的信息包括名称、类型、token、创建时间、所有者 ID 等。
                 *
                 * ## 使用限制;;本接口仅支持获取当前层级的文件信息，不支持递归获取子文件夹中的文件信息清单。
                 */
                list: async (
                    payload?: {
                        params?: {
                            page_size?: number;
                            page_token?: string;
                            folder_token?: string;
                            order_by?: "EditedTime" | "CreatedTime";
                            direction?: "ASC" | "DESC";
                            option?: string;
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
                                    files?: Array<{
                                        token: string;
                                        name: string;
                                        type: string;
                                        parent_token?: string;
                                        url?: string;
                                        shortcut_info?: {
                                            target_type: string;
                                            target_token: string;
                                        };
                                        created_time?: string;
                                        modified_time?: string;
                                        owner_id?: string;
                                    }>;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=task_check&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=task_check&project=drive&resource=file&version=v1 document }
                 *
                 * 查询异步任务状态
                 *
                 * 查询异步任务的状态信息。目前支持查询删除文件夹和移动文件夹的异步任务。
                 */
                taskCheck: async (
                    payload?: {
                        params: { task_id: string };
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
                                data?: { status?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/task_check`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=delete_subscribe&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete_subscribe&project=drive&resource=file&version=v1 document }
                 *
                 * 取消云文档事件订阅
                 *
                 * 该接口用于取消订阅云文档的通知事件。了解事件订阅的配置流程和使用场景，参考[事件概述](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)。了解云文档支持的事件类型，参考[事件列表](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-list)。
                 *
                 * ## 注意事项;目前只支持取消订阅事件列表中所有文档事件，暂不支持指定取消的事件。;## 前提条件;- 调用接口前，请确保应用或用户为文档所有者或文档管理者。;- 调用接口前，请确保正确配置订阅方式并添加了事件。详情参考[配置订阅方式](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/request-url-configuration-case)和[添加事件](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/subscription-event-case)。
                 */
                deleteSubscribe: async (
                    payload?: {
                        params: {
                            file_type:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "bitable"
                                | "file"
                                | "folder"
                                | "slides";
                            event_type?: string;
                        };
                        path: { file_token: string };
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
                                data?: { data: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/delete_subscribe`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=get_subscribe&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_subscribe&project=drive&resource=file&version=v1 document }
                 *
                 * 查询云文档事件订阅状态
                 *
                 * 该接口用于查询云文档事件的订阅状态。了解事件订阅的配置流程和使用场景，参考[事件概述](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)。了解云文档支持的事件类型，参考[事件列表](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-list)。
                 *
                 * ## 前提条件;- 调用接口前，请确保应用或用户为文档所有者或文档管理者。文档的通知事件仅支持文档拥有者和文档管理者订阅。;- 调用接口前，请确保正确配置订阅方式并添加了事件。详情参考[配置订阅方式](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/request-url-configuration-case)和[添加事件](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-subscription-configure-/subscription-event-case)。
                 */
                getSubscribe: async (
                    payload?: {
                        params: {
                            file_type:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "bitable"
                                | "file"
                                | "folder"
                                | "slides";
                            event_type?: string;
                        };
                        path: { file_token: string };
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
                                data?: { is_subscribe?: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/get_subscribe`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=subscribe&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscribe&project=drive&resource=file&version=v1 document }
                 *
                 * 订阅云文档事件
                 *
                 * 订阅云文档的各类通知事件。调用该接口并在开发者后台添加事件后，当云文档发生指定事件时，系统会向配置的地址发送事件。
                 */
                subscribe: async (
                    payload?: {
                        params: {
                            file_type:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "bitable"
                                | "file"
                                | "folder"
                                | "slides";
                            event_type?: string;
                        };
                        path: { file_token: string };
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
                                `${this.domain}/open-apis/drive/v1/files/:file_token/subscribe`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=download&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download&project=drive&resource=file&version=v1 document }
                 *
                 * 下载文件
                 *
                 * 下载云空间中的文件，如 PDF 文件。不包含飞书文档、电子表格以及多维表格等在线文档。该接口支持通过在请求头添加 `Range` 参数分片下载部分文件。
                 */
                download: async (
                    payload?: {
                        params?: { version?: string };
                        path?: { file_token?: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/download`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                            $return_headers: true,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    const checkIsReadable = () => {
                        const consumedError =
                            "The stream has already been consumed";
                        if (!res.data.readable) {
                            this.logger.error(consumedError);
                            throw new Error(consumedError);
                        }
                    };

                    return {
                        writeFile: async (filePath: string) => {
                            checkIsReadable();
                            return new Promise((resolve, reject) => {
                                const writableStream =
                                    fs.createWriteStream(filePath);
                                writableStream.on("finish", () => {
                                    resolve(filePath);
                                });
                                writableStream.on("error", (e) => {
                                    reject(e);
                                });
                                res.data.pipe(writableStream);
                            });
                        },
                        getReadableStream: () => {
                            checkIsReadable();
                            return res.data as Readable;
                        },
                        headers: res.headers,
                    };
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_prepare&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_prepare&project=drive&resource=file&version=v1 document }
                 *
                 * 分片上传文件-预上传
                 *
                 * 发送初始化请求，以获取上传事务 ID 和分片策略，为[上传分片](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_part)做准备。平台固定以 4MB 的大小对文件进行分片。了解完整的上传文件流程，参考[上传文件概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/multipart-upload-file-/introduction)。
                 */
                uploadPrepare: async (
                    payload?: {
                        data: {
                            file_name: string;
                            parent_type: "explorer" | "wiki";
                            parent_node: string;
                            size: number;
                            file_token?: string;
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
                                    upload_id?: string;
                                    block_size?: number;
                                    block_num?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/upload_prepare`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_finish&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_finish&project=drive&resource=file&version=v1 document }
                 *
                 * 分片上传文件-完成上传
                 *
                 * 调用[上传分片](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_part)接口将分片全部上传完毕后，你需调用本接口触发完成上传。否则将上传失败。了解完整的上传文件流程，参考[上传文件概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/multipart-upload-file-/introduction)。
                 */
                uploadFinish: async (
                    payload?: {
                        data: { upload_id: string; block_num: number };
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
                                    file_token?: string;
                                    version?: string;
                                    url?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/upload_finish`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_all&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_all&project=drive&resource=file&version=v1 document }
                 *
                 * 上传文件
                 *
                 * 将指定文件上传至云空间指定目录中。
                 */
                uploadAll: async (
                    payload?: {
                        data: {
                            file_name: string;
                            parent_type: "explorer" | "wiki";
                            parent_node: string;
                            size: number;
                            checksum?: string;
                            file: Buffer | fs.ReadStream;
                            file_token?: string;
                        };
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
                                    file_token?: string;
                                    url?: string;
                                    version?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/upload_all`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=drive&resource=file&version=v1 document }
                 *
                 * 删除文件或文件夹
                 *
                 * 删除用户在云空间内的文件或者文件夹。文件或文件夹被删除后，会进入回收站中。
                 */
                delete: async (
                    payload?: {
                        params: {
                            type:
                                | "file"
                                | "docx"
                                | "bitable"
                                | "folder"
                                | "doc"
                                | "sheet"
                                | "mindnote"
                                | "shortcut"
                                | "slides";
                            async?: boolean;
                        };
                        path?: { file_token?: string };
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
                                data?: { task_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token`,
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
            },
            /**
             * meta
             */
            meta: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=meta&apiName=batch_query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_query&project=drive&resource=meta&version=v1 document }
                 *
                 * 获取文件元数据
                 *
                 * 该接口用于根据文件 token （文件的唯一标识）获取其元数据，包括标题、所有者、创建时间、密级、访问链接等数据。
                 */
                batchQuery: async (
                    payload?: {
                        data: {
                            request_docs: Array<{
                                doc_token: string;
                                doc_type:
                                    | "doc"
                                    | "sheet"
                                    | "bitable"
                                    | "mindnote"
                                    | "file"
                                    | "wiki"
                                    | "docx"
                                    | "folder"
                                    | "synced_block"
                                    | "slides";
                            }>;
                            with_url?: boolean;
                        };
                        params?: {
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
                                    metas: Array<{
                                        doc_token: string;
                                        doc_type: string;
                                        title: string;
                                        owner_id: string;
                                        create_time: string;
                                        latest_modify_user: string;
                                        latest_modify_time: string;
                                        url: string;
                                        sec_label_name?: string;
                                        request_doc_info?: {
                                            doc_token: string;
                                            doc_type:
                                                | "doc"
                                                | "sheet"
                                                | "bitable"
                                                | "mindnote"
                                                | "file"
                                                | "wiki"
                                                | "docx"
                                                | "folder"
                                                | "synced_block"
                                                | "slides";
                                        };
                                    }>;
                                    failed_list?: Array<{
                                        token: string;
                                        code: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/metas/batch_query`,
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
             * file.subscription
             */
            fileSubscription: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.subscription&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=drive&resource=file.subscription&version=v1 document }
                 *
                 * 更新订阅状态
                 *
                 * 根据订阅ID更新订阅状态
                 */
                patch: async (
                    payload?: {
                        data: {
                            is_subscribe: boolean;
                            file_type: "doc" | "docx" | "wiki";
                        };
                        path?: {
                            file_token?: string;
                            subscription_id?: string;
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
                                    subscription_id?: string;
                                    subscription_type?: "comment_update";
                                    is_subcribe?: boolean;
                                    file_type?: "doc" | "docx" | "wiki";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/subscriptions/:subscription_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.subscription&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=drive&resource=file.subscription&version=v1 document }
                 *
                 * 获取订阅状态
                 *
                 * 根据订阅ID获取该订阅的状态
                 */
                get: async (
                    payload?: {
                        data: { file_type: "doc" | "docx" | "wiki" };
                        path?: {
                            file_token?: string;
                            subscription_id?: string;
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
                                    subscription_id: string;
                                    subscription_type?: "comment_update";
                                    is_subcribe?: boolean;
                                    file_type?: "doc" | "docx" | "wiki";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/subscriptions/:subscription_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.subscription&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=file.subscription&version=v1 document }
                 *
                 * 创建订阅
                 *
                 * 订阅文档中的变更事件，当前支持文档评论订阅，订阅后文档评论更新会有“云文档助手”推送给订阅的用户
                 */
                create: async (
                    payload?: {
                        data: {
                            subscription_id?: string;
                            subscription_type: "comment_update";
                            is_subcribe?: boolean;
                            file_type: "doc" | "docx" | "wiki";
                        };
                        path: { file_token: string };
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
                                    subscription_id?: string;
                                    subscription_type?: "comment_update";
                                    is_subcribe?: boolean;
                                    file_type?: "doc" | "docx" | "wiki";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/subscriptions`,
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
             * export_task
             */
            exportTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=export_task&apiName=download&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download&project=drive&resource=export_task&version=v1 document }
                 *
                 * 下载导出文件
                 *
                 * 根据[查询导出任务结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/get)返回的导出文件的 token，下载导出产物到本地。了解完整的导出文件步骤，参考[导出云文档概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/export-user-guide)。
                 */
                download: async (
                    payload?: {
                        path: { file_token: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/export_tasks/file/:file_token/download`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                            $return_headers: true,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    const checkIsReadable = () => {
                        const consumedError =
                            "The stream has already been consumed";
                        if (!res.data.readable) {
                            this.logger.error(consumedError);
                            throw new Error(consumedError);
                        }
                    };

                    return {
                        writeFile: async (filePath: string) => {
                            checkIsReadable();
                            return new Promise((resolve, reject) => {
                                const writableStream =
                                    fs.createWriteStream(filePath);
                                writableStream.on("finish", () => {
                                    resolve(filePath);
                                });
                                writableStream.on("error", (e) => {
                                    reject(e);
                                });
                                res.data.pipe(writableStream);
                            });
                        },
                        getReadableStream: () => {
                            checkIsReadable();
                            return res.data as Readable;
                        },
                        headers: res.headers,
                    };
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=export_task&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=drive&resource=export_task&version=v1 document }
                 *
                 * 查询导出任务结果
                 *
                 * 根据[创建导出任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/create)返回的导出任务 ID（ticket）轮询导出任务结果，并返回导出文件的 token。你可使用该 token 继续调用[下载导出文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/download)接口将导出的产物下载到本地。了解完整的导出文件步骤，参考[导出飞书云文档概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/export-user-guide)。
                 *
                 * ## 注意事项;;调用该接口的用户或应用需与调用创建导出任务接口的用户或应用保持一致。
                 */
                get: async (
                    payload?: {
                        params: { token: string };
                        path: { ticket: string };
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
                                    result?: {
                                        file_extension:
                                            | "docx"
                                            | "pdf"
                                            | "xlsx"
                                            | "csv"
                                            | "base"
                                            | "pptx";
                                        type:
                                            | "doc"
                                            | "sheet"
                                            | "bitable"
                                            | "docx"
                                            | "slides";
                                        file_name?: string;
                                        file_token?: string;
                                        file_size?: number;
                                        job_error_msg?: string;
                                        job_status?: number;
                                        only_schema?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/export_tasks/:ticket`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=export_task&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=export_task&version=v1 document }
                 *
                 * 创建导出任务
                 *
                 * 该接口用于创建导出文件的任务，并返回导出任务 ID。导出文件指将飞书文档、电子表格、多维表格导出为本地文件，包括 Word、Excel、PDF、CSV 格式。该接口为异步接口，需要继续调用[查询导出任务结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/get)接口获取导出结果。了解完整的导出步骤，参考[导出云文档概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/export-user-guide)。
                 */
                create: async (
                    payload?: {
                        data: {
                            file_extension:
                                | "docx"
                                | "pdf"
                                | "xlsx"
                                | "csv"
                                | "base"
                                | "pptx";
                            token: string;
                            type:
                                | "doc"
                                | "sheet"
                                | "bitable"
                                | "docx"
                                | "slides";
                            sub_id?: string;
                            only_schema?: boolean;
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
                                data?: { ticket?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/export_tasks`,
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
             * file.version
             */
            fileVersion: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.version&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=file.version&version=v1 document }
                 *
                 * 创建文档版本
                 *
                 * 创建文档版本。文档支持在线文档或电子表格。该接口为异步接口。
                 */
                create: async (
                    payload?: {
                        data?: {
                            owner_id?: string;
                            obj_type?: "docx" | "sheet";
                            parent_type?: "docx" | "sheet";
                            name?: string;
                            parent_token?: string;
                            creator_id?: string;
                            create_time?: string;
                            update_time?: string;
                            status?: "0" | "1" | "2";
                            version?: string;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { file_token: string };
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
                                    name?: string;
                                    version?: string;
                                    parent_token?: string;
                                    owner_id?: string;
                                    creator_id?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    status?: "0" | "1" | "2";
                                    obj_type?: "docx" | "sheet";
                                    parent_type?: "docx" | "sheet";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/versions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.version&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=drive&resource=file.version&version=v1 document }
                 *
                 * 删除文档版本
                 *
                 * 删除基于在线文档或电子表格创建的版本。
                 */
                delete: async (
                    payload?: {
                        params: {
                            obj_type: "docx" | "sheet";
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { file_token: string; version_id: string };
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
                                `${this.domain}/open-apis/drive/v1/files/:file_token/versions/:version_id`,
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
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            obj_type: "docx" | "sheet";
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { file_token: string };
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
                                    `${this.domain}/open-apis/drive/v1/files/:file_token/versions`,
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
                                                        name?: string;
                                                        version?: string;
                                                        parent_token?: string;
                                                        owner_id?: string;
                                                        creator_id?: string;
                                                        create_time?: string;
                                                        update_time?: string;
                                                        status?:
                                                            | "0"
                                                            | "1"
                                                            | "2";
                                                        obj_type?:
                                                            | "docx"
                                                            | "sheet";
                                                        parent_type?:
                                                            | "docx"
                                                            | "sheet";
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.version&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=drive&resource=file.version&version=v1 document }
                 *
                 * 获取文档版本列表
                 *
                 * 获取文档或电子表格的版本列表。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            obj_type: "docx" | "sheet";
                            user_id_type?: "open_id" | "union_id" | "user_id";
                        };
                        path: { file_token: string };
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
                                        name?: string;
                                        version?: string;
                                        parent_token?: string;
                                        owner_id?: string;
                                        creator_id?: string;
                                        create_time?: string;
                                        update_time?: string;
                                        status?: "0" | "1" | "2";
                                        obj_type?: "docx" | "sheet";
                                        parent_type?: "docx" | "sheet";
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/versions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.version&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=drive&resource=file.version&version=v1 document }
                 *
                 * 获取文档版本信息
                 *
                 * 该接口用于获取文档或电子表格指定版本的信息，包括标题、标识、创建者、创建时间等。
                 */
                get: async (
                    payload?: {
                        params: {
                            obj_type: "docx" | "sheet";
                            user_id_type?: "open_id" | "union_id" | "user_id";
                            page_token?: string;
                            page_size?: number;
                        };
                        path: { file_token: string; version_id: string };
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
                                    name?: string;
                                    version?: string;
                                    parent_token?: string;
                                    owner_id?: string;
                                    creator_id?: string;
                                    create_time?: string;
                                    update_time?: string;
                                    status?: "0" | "1" | "2";
                                    obj_type?: "docx" | "sheet";
                                    parent_type?: "docx" | "sheet";
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/versions/:version_id`,
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
             * file.view_record
             */
            fileViewRecord: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            file_type:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "bitable"
                                | "mindnote"
                                | "wiki"
                                | "file";
                            viewer_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { file_token: string };
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
                                    `${this.domain}/open-apis/drive/v1/files/:file_token/view_records`,
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
                                                        viewer_id?: string;
                                                        name?: string;
                                                        avatar_url?: string;
                                                        last_view_time?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.view_record&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=drive&resource=file.view_record&version=v1 document }
                 *
                 * 获取文件访问记录
                 *
                 * 获取文档、电子表格、多维表格等文件的历史访问记录，包括访问者的 ID、姓名、头像和最近访问时间。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size: number;
                            page_token?: string;
                            file_type:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "bitable"
                                | "mindnote"
                                | "wiki"
                                | "file";
                            viewer_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { file_token: string };
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
                                        viewer_id?: string;
                                        name?: string;
                                        avatar_url?: string;
                                        last_view_time?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/view_records`,
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
             * file.statistics
             */
            fileStatistics: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.statistics&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=drive&resource=file.statistics&version=v1 document }
                 *
                 * 获取文件统计信息
                 *
                 * 此接口用于获取各类文件的流量统计信息和互动信息，包括阅读人数、阅读次数和点赞数。
                 */
                get: async (
                    payload?: {
                        params: {
                            file_type:
                                | "doc"
                                | "sheet"
                                | "mindnote"
                                | "bitable"
                                | "wiki"
                                | "file"
                                | "docx";
                        };
                        path?: { file_token?: string };
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
                                    file_token?: string;
                                    file_type?: string;
                                    statistics?: {
                                        uv?: number;
                                        pv?: number;
                                        like_count?: number;
                                        timestamp?: number;
                                        uv_today?: number;
                                        pv_today?: number;
                                        like_count_today?: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/statistics`,
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
             * permission.public.password
             */
            permissionPublicPassword: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public.password&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=permission.public.password&version=v1 document }
                 *
                 * 启用云文档密码
                 *
                 * 启用指定云文档的密码。密码启用后，组织外用户需要密码访问，组织内用户无需密码可直接访问。
                 */
                create: async (
                    payload?: {
                        params: {
                            type:
                                | "doc"
                                | "sheet"
                                | "file"
                                | "wiki"
                                | "bitable"
                                | "docx"
                                | "mindnote"
                                | "minutes"
                                | "slides";
                        };
                        path?: { token?: string };
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
                                data?: { password?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/permissions/:token/public/password`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public.password&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=drive&resource=permission.public.password&version=v1 document }
                 *
                 * 刷新云文档密码
                 *
                 * 刷新指定云文档的密码。密码刷新后，旧密码将失效，并生成新密码。
                 *
                 * ## 注意事项;;要刷新密码，必须先确保指定云文档已有密码。你可通过[启用云文档密码](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public-password/create)接口启用密码。
                 */
                update: async (
                    payload?: {
                        params: {
                            type:
                                | "doc"
                                | "sheet"
                                | "file"
                                | "wiki"
                                | "bitable"
                                | "docx"
                                | "mindnote"
                                | "minutes"
                                | "slides";
                        };
                        path?: { token?: string };
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
                                data?: { password?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/permissions/:token/public/password`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public.password&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=drive&resource=permission.public.password&version=v1 document }
                 *
                 * 停用云文档密码
                 *
                 * 停用指定云文档的密码。密码停用后，组织外用户访问文档将无需输入密码。
                 */
                delete: async (
                    payload?: {
                        params: {
                            type:
                                | "doc"
                                | "sheet"
                                | "file"
                                | "wiki"
                                | "bitable"
                                | "docx"
                                | "mindnote"
                                | "minutes"
                                | "slides";
                        };
                        path?: { token?: string };
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
                                `${this.domain}/open-apis/drive/v1/permissions/:token/public/password`,
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
            },
            /**
             * file.comment
             */
            fileComment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=file.comment&version=v1 document }
                 *
                 * 添加全文评论
                 *
                 * 在文档中添加一条全局评论，不支持局部评论。
                 */
                create: async (
                    payload?: {
                        data?: {
                            reply_list?: {
                                replies: Array<{
                                    content: {
                                        elements: Array<{
                                            type:
                                                | "text_run"
                                                | "docs_link"
                                                | "person";
                                            text_run?: { text: string };
                                            docs_link?: { url: string };
                                            person?: { user_id: string };
                                        }>;
                                    };
                                    reactions?: Array<{
                                        reaction_key: string;
                                        count: number;
                                        ahead_users?: Array<string>;
                                    }>;
                                }>;
                            };
                        };
                        params: {
                            file_type: "doc" | "docx";
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { file_token: string };
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
                                    comment_id?: string;
                                    user_id?: string;
                                    create_time?: number;
                                    update_time?: number;
                                    is_solved?: boolean;
                                    solved_time?: number;
                                    solver_user_id?: string;
                                    has_more?: boolean;
                                    page_token?: string;
                                    is_whole?: boolean;
                                    quote?: string;
                                    reply_list?: {
                                        replies: Array<{
                                            content: {
                                                elements: Array<{
                                                    type:
                                                        | "text_run"
                                                        | "docs_link"
                                                        | "person";
                                                    text_run?: { text: string };
                                                    docs_link?: { url: string };
                                                    person?: {
                                                        user_id: string;
                                                    };
                                                }>;
                                            };
                                            reply_id?: string;
                                            user_id?: string;
                                            create_time?: number;
                                            update_time?: number;
                                            extra?: {
                                                image_list?: Array<string>;
                                            };
                                            reactions?: Array<{
                                                reaction_key: string;
                                                count: number;
                                                ahead_users?: Array<string>;
                                            }>;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/comments`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=drive&resource=file.comment&version=v1 document }
                 *
                 * 获取全文评论
                 *
                 * 获取云文档中的某条全文评论，不支持局部评论。
                 */
                get: async (
                    payload?: {
                        params: {
                            file_type:
                                | "doc"
                                | "sheet"
                                | "file"
                                | "docx"
                                | "slides"
                                | "bitable"
                                | "apps";
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            need_reaction?: boolean;
                        };
                        path: { file_token: string; comment_id: string };
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
                                    comment_id?: string;
                                    user_id?: string;
                                    create_time?: number;
                                    update_time?: number;
                                    is_solved?: boolean;
                                    solved_time?: number;
                                    solver_user_id?: string;
                                    has_more?: boolean;
                                    page_token?: string;
                                    is_whole?: boolean;
                                    quote?: string;
                                    reply_list?: {
                                        replies: Array<{
                                            content: {
                                                elements: Array<{
                                                    type:
                                                        | "text_run"
                                                        | "docs_link"
                                                        | "person";
                                                    text_run?: { text: string };
                                                    docs_link?: { url: string };
                                                    person?: {
                                                        user_id: string;
                                                    };
                                                }>;
                                            };
                                            reply_id?: string;
                                            user_id?: string;
                                            create_time?: number;
                                            update_time?: number;
                                            extra?: {
                                                image_list?: Array<string>;
                                            };
                                            reactions?: Array<{
                                                reaction_key: string;
                                                count: number;
                                                ahead_users?: Array<string>;
                                            }>;
                                        }>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=drive&resource=file.comment&version=v1 document }
                 *
                 * 解决/恢复评论
                 *
                 * 解决或恢复云文档中的评论。
                 */
                patch: async (
                    payload?: {
                        data: { is_solved: boolean };
                        params: {
                            file_type:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "file"
                                | "slides"
                                | "bitable"
                                | "apps";
                        };
                        path: { file_token: string; comment_id: string };
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
                                data?: { data: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id`,
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
                listWithIterator: async (
                    payload?: {
                        params: {
                            file_type:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "file"
                                | "slides"
                                | "bitable"
                                | "apps";
                            is_whole?: boolean;
                            is_solved?: boolean;
                            page_token?: string;
                            page_size?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            need_reaction?: boolean;
                            need_relation?: boolean;
                        };
                        path: { file_token: string };
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
                                    `${this.domain}/open-apis/drive/v1/files/:file_token/comments`,
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
                                                    has_more?: boolean;
                                                    page_token?: string;
                                                    items?: Array<{
                                                        comment_id?: string;
                                                        user_id?: string;
                                                        create_time?: number;
                                                        update_time?: number;
                                                        is_solved?: boolean;
                                                        solved_time?: number;
                                                        solver_user_id?: string;
                                                        has_more?: boolean;
                                                        page_token?: string;
                                                        is_whole?: boolean;
                                                        quote?: string;
                                                        reply_list?: {
                                                            replies: Array<{
                                                                content: {
                                                                    elements: Array<{
                                                                        type:
                                                                            | "text_run"
                                                                            | "docs_link"
                                                                            | "person";
                                                                        text_run?: {
                                                                            text: string;
                                                                        };
                                                                        docs_link?: {
                                                                            url: string;
                                                                        };
                                                                        person?: {
                                                                            user_id: string;
                                                                        };
                                                                    }>;
                                                                };
                                                                reply_id?: string;
                                                                user_id?: string;
                                                                create_time?: number;
                                                                update_time?: number;
                                                                extra?: {
                                                                    image_list?: Array<string>;
                                                                };
                                                                reactions?: Array<{
                                                                    reaction_key: string;
                                                                    count: number;
                                                                    ahead_users?: Array<string>;
                                                                }>;
                                                            }>;
                                                        };
                                                    }>;
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=drive&resource=file.comment&version=v1 document }
                 *
                 * 获取云文档所有评论
                 *
                 * 该接口用于根据云文档 Token 分页获取文档所有评论信息，包括评论和回复 ID、回复的内容、评论人和回复人的用户 ID 等。该接口支持返回全局评论以及局部评论，可通过 is_whole（是否为全局评论）字段区分。默认每页返回 50 个评论。
                 */
                list: async (
                    payload?: {
                        params: {
                            file_type:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "file"
                                | "slides"
                                | "bitable"
                                | "apps";
                            is_whole?: boolean;
                            is_solved?: boolean;
                            page_token?: string;
                            page_size?: number;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                            need_reaction?: boolean;
                            need_relation?: boolean;
                        };
                        path: { file_token: string };
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
                                    has_more?: boolean;
                                    page_token?: string;
                                    items?: Array<{
                                        comment_id?: string;
                                        user_id?: string;
                                        create_time?: number;
                                        update_time?: number;
                                        is_solved?: boolean;
                                        solved_time?: number;
                                        solver_user_id?: string;
                                        has_more?: boolean;
                                        page_token?: string;
                                        is_whole?: boolean;
                                        quote?: string;
                                        reply_list?: {
                                            replies: Array<{
                                                content: {
                                                    elements: Array<{
                                                        type:
                                                            | "text_run"
                                                            | "docs_link"
                                                            | "person";
                                                        text_run?: {
                                                            text: string;
                                                        };
                                                        docs_link?: {
                                                            url: string;
                                                        };
                                                        person?: {
                                                            user_id: string;
                                                        };
                                                    }>;
                                                };
                                                reply_id?: string;
                                                user_id?: string;
                                                create_time?: number;
                                                update_time?: number;
                                                extra?: {
                                                    image_list?: Array<string>;
                                                };
                                                reactions?: Array<{
                                                    reaction_key: string;
                                                    count: number;
                                                    ahead_users?: Array<string>;
                                                }>;
                                            }>;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/comments`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=batch_query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_query&project=drive&resource=file.comment&version=v1 document }
                 *
                 * 批量获取评论
                 *
                 * 该接口用于根据评论 ID 列表批量获取云文档评论信息，包括评论和回复 ID、回复的内容、评论人和回复人的用户 ID 等。支持返回全局评论以及局部评论，可通过 is_whole （是否为全局评论标识）字段区分。
                 */
                batchQuery: async (
                    payload?: {
                        data: {
                            comment_ids: Array<string>;
                            need_reaction?: boolean;
                            need_relation?: boolean;
                        };
                        params: {
                            file_type:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "file"
                                | "slides"
                                | "bitable"
                                | "apps";
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path?: { file_token?: string };
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
                                        comment_id?: string;
                                        user_id?: string;
                                        create_time?: number;
                                        update_time?: number;
                                        is_solved?: boolean;
                                        solved_time?: number;
                                        solver_user_id?: string;
                                        has_more?: boolean;
                                        page_token?: string;
                                        is_whole?: boolean;
                                        quote?: string;
                                        reply_list?: {
                                            replies: Array<{
                                                content: {
                                                    elements: Array<{
                                                        type:
                                                            | "text_run"
                                                            | "docs_link"
                                                            | "person";
                                                        text_run?: {
                                                            text: string;
                                                        };
                                                        docs_link?: {
                                                            url: string;
                                                        };
                                                        person?: {
                                                            user_id: string;
                                                        };
                                                    }>;
                                                };
                                                reply_id?: string;
                                                user_id?: string;
                                                create_time?: number;
                                                update_time?: number;
                                                extra?: {
                                                    image_list?: Array<string>;
                                                };
                                                reactions?: Array<{
                                                    reaction_key: string;
                                                    count: number;
                                                    ahead_users?: Array<string>;
                                                }>;
                                            }>;
                                        };
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/comments/batch_query`,
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
             * media
             */
            media: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=batch_get_tmp_download_url&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_get_tmp_download_url&project=drive&resource=media&version=v1 document }
                 *
                 * 获取素材临时下载链接
                 *
                 * 该接口用于获取云文档中素材的临时下载链接。链接的有效期为 24 小时，过期失效。
                 */
                batchGetTmpDownloadUrl: async (
                    payload?: {
                        params: { file_tokens: Array<string>; extra?: string };
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
                                    tmp_download_urls?: Array<{
                                        file_token: string;
                                        tmp_download_url: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/medias/batch_get_tmp_download_url`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=download&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download&project=drive&resource=media&version=v1 document }
                 *
                 * 下载素材
                 *
                 * 下载各类云文档中的素材，例如电子表格中的图片。该接口支持通过在请求头添加`Range` 参数分片下载素材。
                 */
                download: async (
                    payload?: {
                        params?: { extra?: string };
                        path: { file_token: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/medias/:file_token/download`,
                                path
                            ),
                            method: "GET",
                            headers,
                            data,
                            params,
                            responseType: "stream",
                            paramsSerializer: (params) =>
                                stringify(params, { arrayFormat: "repeat" }),
                            $return_headers: true,
                        })
                        .catch((e) => {
                            this.logger.error(formatErrors(e));
                            throw e;
                        });

                    const checkIsReadable = () => {
                        const consumedError =
                            "The stream has already been consumed";
                        if (!res.data.readable) {
                            this.logger.error(consumedError);
                            throw new Error(consumedError);
                        }
                    };

                    return {
                        writeFile: async (filePath: string) => {
                            checkIsReadable();
                            return new Promise((resolve, reject) => {
                                const writableStream =
                                    fs.createWriteStream(filePath);
                                writableStream.on("finish", () => {
                                    resolve(filePath);
                                });
                                writableStream.on("error", (e) => {
                                    reject(e);
                                });
                                res.data.pipe(writableStream);
                            });
                        },
                        getReadableStream: () => {
                            checkIsReadable();
                            return res.data as Readable;
                        },
                        headers: res.headers,
                    };
                },
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_part&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_part&project=drive&resource=media&version=v1 document }
                 *
                 * 分片上传素材-上传分片
                 *
                 * 根据 [预上传](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_prepare)接口返回的上传事务 ID 和分片策略上传对应的素材分片。上传完成后，你可调用 [分片上传素材（完成上传）](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_finish)触发完成上传。
                 *
                 * ## 使用限制;;该接口调用频率上限为 5 QPS。
                 */
                uploadPart: async (
                    payload?: {
                        data: {
                            upload_id: string;
                            seq: number;
                            size: number;
                            checksum?: string;
                            file: Buffer | fs.ReadStream;
                        };
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
                                `${this.domain}/open-apis/drive/v1/medias/upload_part`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_finish&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_finish&project=drive&resource=media&version=v1 document }
                 *
                 * 分片上传素材-完成上传
                 *
                 * 调用[上传分片](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_part)接口将分片全部上传完毕后，你需调用本接口触发完成上传。了解完整的分片上传素材流程，参考[素材概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/introduction)。
                 *
                 * ## 使用限制;;该接口调用频率上限为 5 QPS。
                 */
                uploadFinish: async (
                    payload?: {
                        data: { upload_id: string; block_num: number };
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
                                data?: { file_token?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/medias/upload_finish`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_all&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_all&project=drive&resource=media&version=v1 document }
                 *
                 * 上传素材
                 *
                 * 将文件、图片、视频等素材上传到指定云文档中。素材将显示在对应云文档中，在云空间中不会显示。
                 */
                uploadAll: async (
                    payload?: {
                        data: {
                            file_name: string;
                            parent_type:
                                | "doc_image"
                                | "docx_image"
                                | "sheet_image"
                                | "doc_file"
                                | "docx_file"
                                | "sheet_file"
                                | "vc_virtual_background"
                                | "bitable_image"
                                | "bitable_file"
                                | "moments"
                                | "ccm_import_open"
                                | "calendar"
                                | "base_global"
                                | "lark_ai_media_analysis"
                                | "whiteboard"
                                | "mindnote_image"
                                | "comment_image"
                                | "slide_img"
                                | "slide_file"
                                | "email"
                                | "bitable_tmp_point"
                                | "office_sheet_file"
                                | "office_slide_file";
                            parent_node: string;
                            size: number;
                            checksum?: string;
                            extra?: string;
                            file: Buffer | fs.ReadStream;
                        };
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
                                data?: { file_token?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/medias/upload_all`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_prepare&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_prepare&project=drive&resource=media&version=v1 document }
                 *
                 * 分片上传素材-预上传
                 *
                 * 发送初始化请求，以获取上传事务 ID 和分片策略，为[上传素材分片](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_part)做准备。平台固定以 4MB 的大小对素材进行分片。了解完整的分片上传素材流程，参考[素材概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/introduction)。
                 */
                uploadPrepare: async (
                    payload?: {
                        data: {
                            file_name: string;
                            parent_type:
                                | "doc_image"
                                | "docx_image"
                                | "sheet_image"
                                | "doc_file"
                                | "docx_file"
                                | "sheet_file"
                                | "vc_virtual_background"
                                | "bitable_image"
                                | "bitable_file"
                                | "moments"
                                | "ccm_import_open"
                                | "calendar"
                                | "base_global"
                                | "lark_ai_media_analysis"
                                | "whiteboard"
                                | "mindnote_image"
                                | "comment_image"
                                | "slide_img"
                                | "slide_file"
                                | "email"
                                | "bitable_tmp_point"
                                | "office_sheet_file"
                                | "office_slide_file";
                            size: number;
                            parent_node?: string;
                            extra?: string;
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
                                    upload_id?: string;
                                    block_size?: number;
                                    block_num?: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/medias/upload_prepare`,
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
             * import_task
             */
            importTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=import_task&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=drive&resource=import_task&version=v1 document }
                 *
                 * 查询导入结果
                 *
                 * 根据[创建导入任务](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/create)返回的导入任务 ID（ticket）轮询导入结果。了解完整的导入文件步骤，参考[导入文件概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/import-user-guide)。
                 */
                get: async (
                    payload?: {
                        path: { ticket: string };
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
                                    result?: {
                                        ticket?: string;
                                        type: string;
                                        job_status?: number;
                                        job_error_msg?: string;
                                        token?: string;
                                        url?: string;
                                        extra?: Array<string>;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/import_tasks/:ticket`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=import_task&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=import_task&version=v1 document }
                 *
                 * 创建导入任务
                 *
                 * 该接口用于创建导入文件的任务，并返回导入任务 ID。导入文件指将本地文件如 Word、TXT、Markdown、Excel 等格式的文件导入为某种格式的飞书在线云文档。该接口为异步接口，需要继续调用[查询导入任务结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/get)接口获取导入结果。了解完整的导入文件步骤，参考[导入文件概述](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/import-user-guide)。
                 *
                 * ## 前提条件;创建导入任务前，你需先调用[上传素材](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_all)或[上传文件](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_all)接口获取源文件的 token。
                 */
                create: async (
                    payload?: {
                        data: {
                            file_extension: string;
                            file_token: string;
                            type: string;
                            file_name?: string;
                            point: { mount_type: number; mount_key: string };
                            token?: string;
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
                                data?: { ticket?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/import_tasks`,
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
             * user
             */
            user: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=user&apiName=subscription_status&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription_status&project=drive&resource=user&version=v1 document }
                 *
                 * 查询用户云文档事件订阅状态
                 *
                 * 该接口用于查询用户云文档事件的订阅状态。仅当is_subscribe（订阅状态）为 true，应用才可收到 “用户云文档事件”下的各类通知事件。
                 */
                subscriptionStatus: async (
                    payload?: {
                        params: { event_type: string };
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
                                data?: { data: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/user/subscription_status`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=user&apiName=remove_subscription&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=remove_subscription&project=drive&resource=user&version=v1 document }
                 *
                 * 取消用户云文档事件订阅
                 *
                 * 该接口用于取消订阅用户云文档的通知事件。取消订阅后，用户将不再收到云文档评论、回复添加事件。
                 */
                removeSubscription: async (
                    payload?: {
                        params: { event_type: string };
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
                                `${this.domain}/open-apis/drive/v1/user/remove_subscription`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=user&apiName=subscription&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=subscription&project=drive&resource=user&version=v1 document }
                 *
                 * 订阅用户云文档事件
                 *
                 * 订阅用户云文档的各类通知事件，调用后目前可获取接收者视角的云文档评论、回复添加事件。
                 *
                 * ## 注意事项;仅用户身份订阅“用户云文档事件”时，需要调用该接口，应用身份无需调用。
                 */
                subscription: async (
                    payload?: {
                        data: { event_type: string };
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
                                `${this.domain}/open-apis/drive/v1/user/subscription`,
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
             * file.comment.reply
             */
            fileCommentReply: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment.reply&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=drive&resource=file.comment.reply&version=v1 document }
                 *
                 * 删除回复
                 *
                 * 删除云文档中的某条回复。
                 */
                delete: async (
                    payload?: {
                        params: {
                            file_type:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "file"
                                | "slides"
                                | "bitable"
                                | "apps";
                        };
                        path: {
                            file_token: string;
                            comment_id: string;
                            reply_id: string;
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
                                data?: { data: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id/replies/:reply_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment.reply&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=file.comment.reply&version=v1 document }
                 *
                 * 添加回复
                 *
                 * 使用该接口可对云文档中的某条评论进行回复，回复内容支持普通文本、云文档链接等。
                 */
                create: async (
                    payload?: {
                        data: {
                            content: {
                                elements: Array<{
                                    type: "text_run" | "docs_link" | "person";
                                    text_run?: { text: string };
                                    docs_link?: { url: string };
                                    person?: { user_id: string };
                                }>;
                            };
                            extra?: string;
                        };
                        params: {
                            file_type:
                                | "doc"
                                | "sheet"
                                | "file"
                                | "docx"
                                | "slides"
                                | "bitable"
                                | "apps";
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { file_token: string; comment_id: string };
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
                                    content?: {
                                        elements: Array<{
                                            type:
                                                | "text_run"
                                                | "docs_link"
                                                | "person";
                                            text_run?: { text: string };
                                            docs_link?: { url: string };
                                            person?: { user_id: string };
                                        }>;
                                    };
                                    reply_id?: string;
                                    user_id?: string;
                                    create_time?: number;
                                    update_time?: number;
                                    extra?: { image_list?: Array<string> };
                                    reactions?: Array<{
                                        reaction_key: string;
                                        count: number;
                                        ahead_users?: Array<string>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id/replies`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment.reply&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=drive&resource=file.comment.reply&version=v1 document }
                 *
                 * 更新回复的内容
                 *
                 * 更新云文档中的某条回复的内容。
                 */
                update: async (
                    payload?: {
                        data: {
                            content: {
                                elements: Array<{
                                    type: "text_run" | "docs_link" | "person";
                                    text_run?: { text: string };
                                    docs_link?: { url: string };
                                    person?: { user_id: string };
                                }>;
                            };
                        };
                        params: {
                            file_type:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "file"
                                | "slides"
                                | "bitable"
                                | "apps";
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: {
                            file_token: string;
                            comment_id: string;
                            reply_id: string;
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
                                data?: { data: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id/replies/:reply_id`,
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
                listWithIterator: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            file_type:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "file"
                                | "slides"
                                | "bitable"
                                | "apps";
                            need_reaction?: boolean;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { file_token: string; comment_id: string };
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
                                    `${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id/replies`,
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
                                                        content: {
                                                            elements: Array<{
                                                                type:
                                                                    | "text_run"
                                                                    | "docs_link"
                                                                    | "person";
                                                                text_run?: {
                                                                    text: string;
                                                                };
                                                                docs_link?: {
                                                                    url: string;
                                                                };
                                                                person?: {
                                                                    user_id: string;
                                                                };
                                                            }>;
                                                        };
                                                        reply_id?: string;
                                                        user_id?: string;
                                                        create_time?: number;
                                                        update_time?: number;
                                                        extra?: {
                                                            image_list?: Array<string>;
                                                        };
                                                        reactions?: Array<{
                                                            reaction_key: string;
                                                            count: number;
                                                            ahead_users?: Array<string>;
                                                        }>;
                                                    }>;
                                                    page_token?: string;
                                                    has_more: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment.reply&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=drive&resource=file.comment.reply&version=v1 document }
                 *
                 * 获取回复信息
                 *
                 * 该接口用于根据评论 ID，获取该条评论对应的回复信息，包括回复 ID、回复内容、回复人的用户 ID 等。
                 */
                list: async (
                    payload?: {
                        params: {
                            page_size?: number;
                            page_token?: string;
                            file_type:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "file"
                                | "slides"
                                | "bitable"
                                | "apps";
                            need_reaction?: boolean;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { file_token: string; comment_id: string };
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
                                        content: {
                                            elements: Array<{
                                                type:
                                                    | "text_run"
                                                    | "docs_link"
                                                    | "person";
                                                text_run?: { text: string };
                                                docs_link?: { url: string };
                                                person?: { user_id: string };
                                            }>;
                                        };
                                        reply_id?: string;
                                        user_id?: string;
                                        create_time?: number;
                                        update_time?: number;
                                        extra?: { image_list?: Array<string> };
                                        reactions?: Array<{
                                            reaction_key: string;
                                            count: number;
                                            ahead_users?: Array<string>;
                                        }>;
                                    }>;
                                    page_token?: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/files/:file_token/comments/:comment_id/replies`,
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
             * permission.public
             */
            permissionPublic: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=drive&resource=permission.public&version=v1 document }
                 *
                 * 更新云文档权限设置
                 *
                 * 更新指定云文档的权限设置，包括是否允许内容被分享到组织外、谁可以查看、添加、移除协作者、谁可以复制内容等设置。;
                 *
                 * 本接口为历史版本接口。推荐使用新版接口[更新云文档权限设置](https://open.feishu.cn/document/ukTMukTMukTM/uIzNzUjLyczM14iM3MTN/drive-v2/permission-public/patch)。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            external_access?: boolean;
                            security_entity?:
                                | "anyone_can_view"
                                | "anyone_can_edit"
                                | "only_full_access";
                            comment_entity?:
                                | "anyone_can_view"
                                | "anyone_can_edit";
                            share_entity?:
                                | "anyone"
                                | "same_tenant"
                                | "only_full_access";
                            link_share_entity?:
                                | "tenant_readable"
                                | "tenant_editable"
                                | "anyone_readable"
                                | "anyone_editable"
                                | "closed";
                            invite_external?: boolean;
                        };
                        params: {
                            type:
                                | "doc"
                                | "sheet"
                                | "file"
                                | "wiki"
                                | "bitable"
                                | "docx"
                                | "mindnote"
                                | "minutes"
                                | "slides";
                        };
                        path: { token: string };
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
                                    permission_public?: {
                                        external_access?: boolean;
                                        security_entity?:
                                            | "anyone_can_view"
                                            | "anyone_can_edit"
                                            | "only_full_access";
                                        comment_entity?:
                                            | "anyone_can_view"
                                            | "anyone_can_edit";
                                        share_entity?:
                                            | "anyone"
                                            | "same_tenant"
                                            | "only_full_access";
                                        link_share_entity?:
                                            | "tenant_readable"
                                            | "tenant_editable"
                                            | "anyone_readable"
                                            | "anyone_editable"
                                            | "closed";
                                        invite_external?: boolean;
                                        lock_switch?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/permissions/:token/public`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=drive&resource=permission.public&version=v1 document }
                 *
                 * 获取云文档权限设置
                 *
                 * 获取指定云文档的权限设置，包括是否允许内容被分享到组织外、谁可以查看、添加、移除协作者等设置。
                 *
                 * 本接口为历史版本接口。推荐使用新版接口[获取云文档权限设置](https://open.feishu.cn/document/ukTMukTMukTM/uIzNzUjLyczM14iM3MTN/drive-v2/permission-public/get)。
                 */
                get: async (
                    payload?: {
                        params: {
                            type:
                                | "doc"
                                | "sheet"
                                | "file"
                                | "wiki"
                                | "bitable"
                                | "docx"
                                | "mindnote"
                                | "minutes"
                                | "slides";
                        };
                        path: { token: string };
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
                                    permission_public?: {
                                        external_access?: boolean;
                                        security_entity?:
                                            | "anyone_can_view"
                                            | "anyone_can_edit"
                                            | "only_full_access";
                                        comment_entity?:
                                            | "anyone_can_view"
                                            | "anyone_can_edit";
                                        share_entity?:
                                            | "anyone"
                                            | "same_tenant"
                                            | "only_full_access";
                                        link_share_entity?:
                                            | "tenant_readable"
                                            | "tenant_editable"
                                            | "anyone_readable"
                                            | "anyone_editable"
                                            | "closed";
                                        invite_external?: boolean;
                                        lock_switch?: boolean;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/permissions/:token/public`,
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
             * permission.member
             */
            permissionMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=drive&resource=permission.member&version=v1 document }
                 *
                 * 批量增加协作者权限
                 *
                 * 为指定云文档批量添加多个协作者，协作者可以是用户、群组、部门、用户组等。
                 */
                batchCreate: async (
                    payload?: {
                        data: {
                            members: Array<{
                                member_type:
                                    | "email"
                                    | "openid"
                                    | "unionid"
                                    | "openchat"
                                    | "opendepartmentid"
                                    | "userid"
                                    | "groupid"
                                    | "wikispaceid"
                                    | "appid";
                                member_id: string;
                                perm: "view" | "edit" | "full_access";
                                perm_type?: "container" | "single_page";
                                type?:
                                    | "user"
                                    | "chat"
                                    | "department"
                                    | "group"
                                    | "wiki_space_member"
                                    | "wiki_space_viewer"
                                    | "wiki_space_editor";
                                name?: string;
                                avatar?: string;
                                external_label?: boolean;
                            }>;
                        };
                        params: {
                            type:
                                | "doc"
                                | "sheet"
                                | "file"
                                | "wiki"
                                | "bitable"
                                | "docx"
                                | "folder"
                                | "mindnote"
                                | "minutes"
                                | "slides"
                                | "apps";
                            need_notification?: boolean;
                        };
                        path: { token: string };
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
                                    members?: Array<{
                                        member_type:
                                            | "email"
                                            | "openid"
                                            | "unionid"
                                            | "openchat"
                                            | "opendepartmentid"
                                            | "userid"
                                            | "groupid"
                                            | "wikispaceid"
                                            | "appid";
                                        member_id: string;
                                        perm: "view" | "edit" | "full_access";
                                        perm_type?: "container" | "single_page";
                                        type?:
                                            | "user"
                                            | "chat"
                                            | "department"
                                            | "group"
                                            | "wiki_space_member"
                                            | "wiki_space_viewer"
                                            | "wiki_space_editor";
                                        name?: string;
                                        avatar?: string;
                                        external_label?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/permissions/:token/members/batch_create`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=drive&resource=permission.member&version=v1 document }
                 *
                 * 更新协作者权限
                 *
                 * 更新指定云文档中指定协作者的权限，包括可阅读、可编辑、可管理权限。
                 */
                update: async (
                    payload?: {
                        data?: {
                            member_type?:
                                | "email"
                                | "openid"
                                | "unionid"
                                | "openchat"
                                | "opendepartmentid"
                                | "userid"
                                | "groupid"
                                | "wikispaceid"
                                | "appid";
                            perm?: "view" | "edit" | "full_access";
                            perm_type?: "container" | "single_page";
                            type?:
                                | "user"
                                | "chat"
                                | "department"
                                | "group"
                                | "wiki_space_member"
                                | "wiki_space_viewer"
                                | "wiki_space_editor";
                        };
                        params: {
                            need_notification?: boolean;
                            type:
                                | "doc"
                                | "sheet"
                                | "file"
                                | "wiki"
                                | "bitable"
                                | "docx"
                                | "mindnote"
                                | "minutes"
                                | "slides"
                                | "apps";
                        };
                        path: { token: string; member_id: string };
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
                                    member?: {
                                        member_type:
                                            | "email"
                                            | "openid"
                                            | "unionid"
                                            | "openchat"
                                            | "opendepartmentid"
                                            | "userid"
                                            | "groupid"
                                            | "wikispaceid"
                                            | "appid";
                                        member_id: string;
                                        perm: "view" | "edit" | "full_access";
                                        perm_type?: "container" | "single_page";
                                        type?:
                                            | "user"
                                            | "chat"
                                            | "department"
                                            | "group"
                                            | "wiki_space_member"
                                            | "wiki_space_viewer"
                                            | "wiki_space_editor";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/permissions/:token/members/:member_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=drive&resource=permission.member&version=v1 document }
                 *
                 * 移除协作者权限
                 *
                 * 通过云文档 token 和协作者 ID 移除指定云文档协作者的权限。
                 */
                delete: async (
                    payload?: {
                        data?: {
                            type?:
                                | "user"
                                | "chat"
                                | "department"
                                | "group"
                                | "wiki_space_member"
                                | "wiki_space_viewer"
                                | "wiki_space_editor"
                                | "appid";
                            perm_type?: "container" | "single_page";
                        };
                        params: {
                            type:
                                | "doc"
                                | "sheet"
                                | "file"
                                | "wiki"
                                | "bitable"
                                | "docx"
                                | "folder"
                                | "mindnote"
                                | "minutes"
                                | "slides"
                                | "apps";
                            member_type:
                                | "email"
                                | "openid"
                                | "openchat"
                                | "opendepartmentid"
                                | "userid"
                                | "unionid"
                                | "groupid"
                                | "wikispaceid"
                                | "appid";
                        };
                        path: { token: string; member_id: string };
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
                                `${this.domain}/open-apis/drive/v1/permissions/:token/members/:member_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=transfer_owner&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=transfer_owner&project=drive&resource=permission.member&version=v1 document }
                 *
                 * 转移云文档所有者
                 *
                 * 转移指定云文档的所有者。
                 */
                transferOwner: async (
                    payload?: {
                        data?: {
                            member_type?:
                                | "email"
                                | "openid"
                                | "userid"
                                | "appid";
                            member_id?: string;
                        };
                        params: {
                            type:
                                | "doc"
                                | "sheet"
                                | "file"
                                | "wiki"
                                | "bitable"
                                | "docx"
                                | "mindnote"
                                | "minutes"
                                | "slides"
                                | "folder"
                                | "apps";
                            need_notification?: boolean;
                            remove_old_owner?: boolean;
                            stay_put?: boolean;
                            old_owner_perm?: string;
                        };
                        path: { token: string };
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
                                `${this.domain}/open-apis/drive/v1/permissions/:token/members/transfer_owner`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=auth&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=auth&project=drive&resource=permission.member&version=v1 document }
                 *
                 * 判断用户权限
                 *
                 * 判断当前请求的应用或用户是否具有指定云文档的指定权限，权限包括阅读、编辑、分享、评论、导出等权限。
                 */
                auth: async (
                    payload?: {
                        params: {
                            type:
                                | "doc"
                                | "sheet"
                                | "file"
                                | "wiki"
                                | "bitable"
                                | "docx"
                                | "mindnote"
                                | "minutes"
                                | "slides"
                                | "apps";
                            action:
                                | "view"
                                | "edit"
                                | "share"
                                | "comment"
                                | "export"
                                | "copy"
                                | "print"
                                | "manage_public";
                        };
                        path: { token: string };
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
                                data?: { auth_result: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/permissions/:token/members/auth`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=permission.member&version=v1 document }
                 *
                 * 增加协作者权限
                 *
                 * 为指定云文档添加协作者，协作者可以是用户、群组、部门、用户组等。
                 *
                 * ## 前提条件;;- 调用该接口需要调用身份有该云文档添加协作者的权限。添加协作者的权限可通过云文档设置中的 **谁可以查看、添加、移除协作者** 等选项进行控制。;- 调用该接口时，需要调用身份与被授权对象 **互相可见**，例如：;    - **添加用户协作者**：需要调用身份与被授权对象为联系人或同组织内可搜索，且互相未屏蔽。;    - **添加群协作者**：需要调用身份在群内。要使用 `tenant_access_token` 身份添加群协作者，则需要将该应用作为机器人添加至群组中，使应用对群可见。详细步骤参考[如何为应用开通云文档相关资源的权限](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-add-permissions-to-app)。;    - **添加部门协作者**：需要调用身份对部门可见。由于应用对企业内的组织架构都不可见，所以暂不支持通过 `tenant_access_token`  添加部门协作者。;;## 注意事项;;不支持将应用直接添加到文件夹作为协作者（添加成功后实际仍然没有权限）。如果希望给应用授予文件夹的权限，请将应用作为群机器人添加到群组内，然后授予该群组可管理权限。详细步骤参考[如何为应用开通云文档相关资源的权限](https://open.feishu.cn/document/uAjLw4CM/ugTN1YjL4UTN24CO1UjN/trouble-shooting/how-to-add-permissions-to-app)。
                 */
                create: async (
                    payload?: {
                        data?: {
                            member_type?:
                                | "email"
                                | "openid"
                                | "unionid"
                                | "openchat"
                                | "opendepartmentid"
                                | "userid"
                                | "groupid"
                                | "wikispaceid"
                                | "appid";
                            member_id?: string;
                            perm?: "view" | "edit" | "full_access";
                            perm_type?: "container" | "single_page";
                            type?:
                                | "user"
                                | "chat"
                                | "department"
                                | "group"
                                | "wiki_space_member"
                                | "wiki_space_viewer"
                                | "wiki_space_editor";
                        };
                        params: {
                            type:
                                | "doc"
                                | "sheet"
                                | "file"
                                | "wiki"
                                | "bitable"
                                | "docx"
                                | "folder"
                                | "mindnote"
                                | "minutes"
                                | "slides"
                                | "apps";
                            need_notification?: boolean;
                        };
                        path: { token: string };
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
                                    member?: {
                                        member_type:
                                            | "email"
                                            | "openid"
                                            | "unionid"
                                            | "openchat"
                                            | "opendepartmentid"
                                            | "userid"
                                            | "groupid"
                                            | "wikispaceid"
                                            | "appid";
                                        member_id: string;
                                        perm: "view" | "edit" | "full_access";
                                        perm_type?: "container" | "single_page";
                                        type?:
                                            | "user"
                                            | "chat"
                                            | "department"
                                            | "group"
                                            | "wiki_space_member"
                                            | "wiki_space_viewer"
                                            | "wiki_space_editor";
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/permissions/:token/members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=drive&resource=permission.member&version=v1 document }
                 *
                 * 获取云文档协作者
                 *
                 * 获取指定云文档的协作者，支持查询人、群、组织架构、用户组、知识库成员五种类型的协作者。
                 *
                 * ## 前提条件;;调用该接口前，你需确保当前应用或用户具有查看协作者的权限。了解更多，参考[如何为应用或用户开通文档权限](https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#16c6475a)。
                 */
                list: async (
                    payload?: {
                        params: {
                            type:
                                | "doc"
                                | "sheet"
                                | "file"
                                | "wiki"
                                | "bitable"
                                | "docx"
                                | "mindnote"
                                | "minutes"
                                | "slides"
                                | "folder"
                                | "apps";
                            fields?: string;
                            perm_type?: "container" | "single_page";
                        };
                        path: { token: string };
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
                                        member_type:
                                            | "email"
                                            | "openid"
                                            | "unionid"
                                            | "openchat"
                                            | "opendepartmentid"
                                            | "userid"
                                            | "groupid"
                                            | "wikispaceid"
                                            | "appid";
                                        member_id: string;
                                        perm: "view" | "edit" | "full_access";
                                        perm_type?: "container" | "single_page";
                                        type?:
                                            | "user"
                                            | "chat"
                                            | "department"
                                            | "group"
                                            | "wiki_space_member"
                                            | "wiki_space_viewer"
                                            | "wiki_space_editor";
                                        name?: string;
                                        avatar?: string;
                                        external_label?: boolean;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v1/permissions/:token/members`,
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
        v2: {
            /**
             * file.like
             */
            fileLike: {
                listWithIterator: async (
                    payload?: {
                        params: {
                            file_type: "doc" | "docx" | "file";
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { file_token: string };
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
                                    `${this.domain}/open-apis/drive/v2/files/:file_token/likes`,
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
                                                        user_id?: string;
                                                        last_liked_time?: string;
                                                        user_name?: string;
                                                        user_en_name?: string;
                                                        user_avatar_url?: string;
                                                        user_is_desensitized?: boolean;
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.like&apiName=list&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=drive&resource=file.like&version=v2 document }
                 *
                 * 获取云文档的点赞者列表
                 *
                 * 获取指定云文档的点赞者列表并按点赞时间由近到远分页返回。
                 */
                list: async (
                    payload?: {
                        params: {
                            file_type: "doc" | "docx" | "file";
                            page_size?: number;
                            page_token?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { file_token: string };
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
                                        user_id?: string;
                                        last_liked_time?: string;
                                        user_name?: string;
                                        user_en_name?: string;
                                        user_avatar_url?: string;
                                        user_is_desensitized?: boolean;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v2/files/:file_token/likes`,
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
             * comment_reaction
             */
            commentReaction: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=comment_reaction&apiName=update_reaction&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_reaction&project=drive&resource=comment_reaction&version=v2 document }
                 *
                 * 添加/取消表情回应
                 *
                 * 使用该接口可对云文档中的某条评论进行emoji表情回应或取消emoji表情回应。适用于用户需要对云文档评论进行emoji表情互动的场景。
                 */
                updateReaction: async (
                    payload?: {
                        data: {
                            action: "add" | "delete";
                            reply_id: string;
                            reaction_type: string;
                        };
                        params: { file_type: string };
                        path: { file_token: string };
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
                                `${this.domain}/open-apis/drive/v2/files/:file_token/comments/reaction`,
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
             * permission.public
             */
            permissionPublic: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=drive&resource=permission.public&version=v2 document }
                 *
                 * 获取云文档权限设置
                 *
                 * 获取指定云文档的权限设置，包括是否允许内容被分享到组织外、谁可以查看、添加、移除协作者、谁可以复制内容等设置。;
                 */
                get: async (
                    payload?: {
                        params: {
                            type:
                                | "doc"
                                | "sheet"
                                | "file"
                                | "wiki"
                                | "bitable"
                                | "docx"
                                | "mindnote"
                                | "minutes"
                                | "slides"
                                | "folder"
                                | "apps";
                        };
                        path: { token: string };
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
                                    permission_public?: {
                                        external_access_entity?:
                                            | "open"
                                            | "closed"
                                            | "allow_share_partner_tenant";
                                        security_entity?:
                                            | "anyone_can_view"
                                            | "anyone_can_edit"
                                            | "only_full_access";
                                        comment_entity?:
                                            | "anyone_can_view"
                                            | "anyone_can_edit";
                                        share_entity?: "anyone" | "same_tenant";
                                        manage_collaborator_entity?:
                                            | "collaborator_can_view"
                                            | "collaborator_can_edit"
                                            | "collaborator_full_access";
                                        link_share_entity?:
                                            | "tenant_readable"
                                            | "tenant_editable"
                                            | "partner_tenant_readable"
                                            | "partner_tenant_editable"
                                            | "anyone_readable"
                                            | "anyone_editable"
                                            | "closed";
                                        copy_entity?:
                                            | "anyone_can_view"
                                            | "anyone_can_edit"
                                            | "only_full_access";
                                        lock_switch?: boolean;
                                        perm_type?: {
                                            external_access_entity?: string;
                                            link_share_entity?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v2/permissions/:token/public`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public&apiName=patch&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=drive&resource=permission.public&version=v2 document }
                 *
                 * 更新云文档权限设置
                 *
                 * 更新指定云文档的权限设置，包括是否允许内容被分享到组织外、谁可以查看、添加、移除协作者、谁可以复制内容等设置。;
                 *
                 * 本接口为增量更新，即仅更新传入的参数对应的权限设置。若参数不传，则不更新设置。
                 */
                patch: async (
                    payload?: {
                        data?: {
                            external_access_entity?:
                                | "open"
                                | "closed"
                                | "allow_share_partner_tenant";
                            security_entity?:
                                | "anyone_can_view"
                                | "anyone_can_edit"
                                | "only_full_access";
                            comment_entity?:
                                | "anyone_can_view"
                                | "anyone_can_edit";
                            share_entity?: "anyone" | "same_tenant";
                            manage_collaborator_entity?:
                                | "collaborator_can_view"
                                | "collaborator_can_edit"
                                | "collaborator_full_access";
                            link_share_entity?:
                                | "tenant_readable"
                                | "tenant_editable"
                                | "partner_tenant_readable"
                                | "partner_tenant_editable"
                                | "anyone_readable"
                                | "anyone_editable"
                                | "closed";
                            copy_entity?:
                                | "anyone_can_view"
                                | "anyone_can_edit"
                                | "only_full_access";
                            perm_type?: {
                                external_access_entity?: string;
                                link_share_entity?: string;
                            };
                        };
                        params: {
                            type:
                                | "doc"
                                | "sheet"
                                | "file"
                                | "wiki"
                                | "bitable"
                                | "docx"
                                | "mindnote"
                                | "minutes"
                                | "slides"
                                | "apps";
                        };
                        path: { token: string };
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
                                    permission_public?: {
                                        external_access_entity?:
                                            | "open"
                                            | "closed"
                                            | "allow_share_partner_tenant";
                                        security_entity?:
                                            | "anyone_can_view"
                                            | "anyone_can_edit"
                                            | "only_full_access";
                                        comment_entity?:
                                            | "anyone_can_view"
                                            | "anyone_can_edit";
                                        share_entity?: "anyone" | "same_tenant";
                                        manage_collaborator_entity?:
                                            | "collaborator_can_view"
                                            | "collaborator_can_edit"
                                            | "collaborator_full_access";
                                        link_share_entity?:
                                            | "tenant_readable"
                                            | "tenant_editable"
                                            | "partner_tenant_readable"
                                            | "partner_tenant_editable"
                                            | "anyone_readable"
                                            | "anyone_editable"
                                            | "closed";
                                        copy_entity?:
                                            | "anyone_can_view"
                                            | "anyone_can_edit"
                                            | "only_full_access";
                                        lock_switch?: boolean;
                                        perm_type?: {
                                            external_access_entity?: string;
                                            link_share_entity?: string;
                                        };
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/drive/v2/permissions/:token/public`,
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
            },
        },
    };
}
