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
             * app.storage
             */
            appStorage: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.storage&apiName=upload&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=spark&resource=app.storage&version=v1 document }
                 *
                 * 上传文件
                 *
                 * 用于上传 20MB（含） 以内的文件
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.storage&apiName=download&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download&project=spark&resource=app.storage&version=v1 document }
                 *
                 * 下载文件
                 *
                 * 用于下传 20MB（含） 以内的文件
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.storage&apiName=upload_initialize&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_initialize&project=spark&resource=app.storage&version=v1 document }
                 *
                 * 分片上传文件 - 创建上传请求
                 *
                 * 发送初始化请求，以获取上传请求 ID和分片策略，为上传分片做准备。获取结果后可调用`上传分片`接口完成文件分片上传。
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
                 *
                 * 根据`创建上传请求`接口返回的上传请求 ID 和分片策略上传对应的文件分片。全部上传完成后可调用`完成上传`接口完成文件分片上传。
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.storage&apiName=upload_complete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_complete&project=spark&resource=app.storage&version=v1 document }
                 *
                 * 分片上传文件 - 完成上传
                 *
                 * 调用`上传分片`将分片全部上传完毕后，调用本接口触发完成上传。
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.storage&apiName=file_upload_callback&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=file_upload_callback&project=spark&resource=app.storage&version=v1 document }
                 *
                 * ## 功能介绍;完成文件上传后的回调确认，用于通知服务端文件上传状态并获取最终的文件元信息，是文件上传流程的第2步。;;### 前提条件;- 已通过文件上传初始化接口获取有效的 `upload_id`;- 文件已成功上传至指定存储节点并获取到 `etag`;;### 注意事项;- 需在文件上传完成后10分钟内调用此接口，否则 `upload_id` 将失效;- 若回调失败，需重新发起文件上传流程
                 */
                fileUploadCallback: async (
                    payload?: {
                        data: { upload_id: string; etag: string };
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
                                    file_name: string;
                                    path: string;
                                    size_bytes: number;
                                    type: string;
                                    download_url?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/storage/file_upload_callback`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.storage&apiName=file_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=file_list&project=spark&resource=app.storage&version=v1 document }
                 *
                 * ## 功能介绍;查询指定应用下的文件列表，支持按文件名、路径、类型、大小、上传时间等条件筛选，支持分页查询，常用于应用内文件管理、批量导出或存储容量统计场景。;;### 注意事项;- 默认分页大小为20条，最大支持100条/页;- 上传时间筛选需使用RFC3339格式时间字符串
                 */
                fileList: async (
                    payload?: {
                        params?: {
                            name?: string;
                            path?: string;
                            type?: string;
                            size_gt?: string;
                            size_lt?: string;
                            uploaded_since?: string;
                            uploaded_until?: string;
                            page_size?: string;
                            page_token?: string;
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
                                    items: Array<{
                                        file_name: string;
                                        path: string;
                                        size_bytes: number;
                                        type: string;
                                        created_by?: string;
                                        created_at?: string;
                                        download_url?: string;
                                    }>;
                                    page_token?: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/storage/file_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.storage&apiName=file_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=file_delete&project=spark&resource=app.storage&version=v1 document }
                 *
                 * ## 功能介绍;批量删除指定应用下的存储文件，支持一次提交多个文件路径进行批量操作，常用于清理过期文件、回收存储资源场景。;;### 注意事项;- 删除操作不可逆，文件删除后无法恢复，请谨慎操作。;- 单次请求最多支持删除100个文件，超出限制将返回参数错误。;;### 使用限制;- 仅能删除当前应用名下的文件，无法跨应用操作其他应用的存储资源。
                 */
                fileDelete: async (
                    payload?: {
                        data: { paths: Array<string> };
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
                                    results: Array<{
                                        status: string;
                                        file?: {
                                            file_name: string;
                                            path: string;
                                            size_bytes: number;
                                            type: string;
                                            created_by?: string;
                                            created_at?: string;
                                            download_url?: string;
                                        };
                                        error_code?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/storage/file_batch_remove`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.storage&apiName=file_pre_upload&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=file_pre_upload&project=spark&resource=app.storage&version=v1 document }
                 *
                 * ## 功能介绍;获取文件预上传凭证，用于后续将文件上传至指定存储地址，适用于应用内文件上传场景，如文档附件、图片素材等。;;### 注意事项;- 生成的上传地址有效期为30分钟，过期后需重新调用接口获取。;- 文件大小需与预上传时指定的`file_size`完全一致，否则上传会失败。
                 */
                filePreUpload: async (
                    payload?: {
                        data: {
                            file_name: string;
                            file_size: string;
                            content_type?: string;
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
                                    upload_url: string;
                                    upload_id: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/storage/file_pre_upload`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.storage&apiName=file_sign&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=file_sign&project=spark&resource=app.storage&version=v1 document }
                 *
                 * ## 功能介绍;生成指定应用存储文件的临时访问签名 URL，用于安全访问私有存储文件，支持自定义签名有效期。常用于前端直接下载/预览应用存储中的文件场景。;;### 注意事项;- 签名 URL 仅在指定有效期内有效，过期后需重新生成。;- 生成的签名 URL 仅具备文件访问权限，不支持修改或删除文件。
                 */
                fileSign: async (
                    payload?: {
                        data: { path: string; expires_in?: string };
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
                                    file_name: string;
                                    path: string;
                                    signed_url: string;
                                    expires_at: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/storage/file_sign`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.storage&apiName=file_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=file_get&project=spark&resource=app.storage&version=v1 document }
                 *
                 * ## 功能介绍;获取指定应用下存储文件的详细信息及下载链接，支持通过文件路径精准定位目标文件，常用于文件管理、内容分发或数据备份场景。;;### 注意事项;- 生成的下载链接具有时效性，过期后需重新调用接口获取。;- 仅能查询当前授权用户有权限访问的应用文件。
                 */
                fileGet: async (
                    payload?: {
                        params: { path: string };
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
                                    file_name: string;
                                    path: string;
                                    size_bytes: number;
                                    type: string;
                                    created_by?: string;
                                    created_at?: string;
                                    download_url?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/storage/file`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.storage&apiName=file_quota_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=file_quota_get&project=spark&resource=app.storage&version=v1 document }
                 *
                 * ## 功能介绍;获取指定应用的文件存储使用情况，包含已用存储空间、总配额、使用率及文件数量，用于监控应用存储资源消耗、预警配额不足等场景。;;### 前提条件;- 需拥有目标应用的存储管理权限。
                 */
                fileQuotaGet: async (
                    payload?: {
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
                                    storage_used_bytes: number;
                                    storage_quota_bytes?: number;
                                    usage_percent?: number;
                                    files: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/storage/file_quota`,
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
             * app
             */
            app: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=icon&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=icon&project=spark&resource=app&version=v1 document }
                 *
                 * 上传妙搭应用图标
                 *
                 * 上传妙搭应用图标
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=upload_html_code_and_release&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload_html_code_and_release&project=spark&resource=app&version=v1 document }
                 *
                 * 上传 HTML 代码并发布;
                 *
                 * 上传 HTML 代码并发布;
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=get_app_visibility&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_app_visibility&project=spark&resource=app&version=v1 document }
                 *
                 * 获取妙搭应用可用范围;
                 *
                 * 获取妙搭应用可用范围;
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=update_app_visibility&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update_app_visibility&project=spark&resource=app&version=v1 document }
                 *
                 * 更新妙搭应用可用范围
                 *
                 * 更新妙搭应用可用范围
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=search_traces&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_traces&project=spark&resource=app&version=v1 document }
                 *
                 * 搜索 traces
                 */
                searchTraces: async (
                    payload?: {
                        data: {
                            app_env: string;
                            start_timestamp_ns?: string;
                            end_timestamp_ns?: string;
                            limit: string;
                            page_token?: string;
                            filter?: {
                                trace_ids?: Array<string>;
                                user_ids?: Array<string>;
                                keyword?: string;
                            };
                            with_log_severity_count?: boolean;
                            fetch_fields?: Array<string>;
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
                                    spans?: Array<{
                                        trace_id: string;
                                        span_id: string;
                                        parent_span_id: string;
                                        name: string;
                                        start_time_unix_nano: string;
                                        end_time_unix_nano: string;
                                        attributes?: Array<{
                                            key: string;
                                            value: string;
                                        }>;
                                    }>;
                                    next_page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/search_traces`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=search_logs&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=search_logs&project=spark&resource=app&version=v1 document }
                 *
                 * ======== OpenAPI（Lark CLI） ======== //\n搜索日志
                 */
                searchLogs: async (
                    payload?: {
                        data: {
                            app_env: string;
                            start_timestamp_ns?: string;
                            end_timestamp_ns?: string;
                            limit: string;
                            page_token?: string;
                            filter?: {
                                levels?: Array<string>;
                                log_ids?: Array<string>;
                                trace_ids?: Array<string>;
                                modules?: Array<string>;
                                user_ids?: Array<string>;
                                pages?: Array<string>;
                                apis?: Array<string>;
                                min_duration_ms?: string;
                                max_duration_ms?: string;
                                keyword?: string;
                            };
                            fetch_fields?: Array<string>;
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
                                    log_items?: Array<{
                                        id: string;
                                        body: string;
                                        severity_text: string;
                                        timestamp_ns: string;
                                        attributes?: Array<{
                                            key: string;
                                            value: string;
                                        }>;
                                        span_id?: string;
                                        trace_id?: string;
                                    }>;
                                    next_page_token: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/search_logs`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=delete_env_vars&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete_env_vars&project=spark&resource=app&version=v1 document }
                 *
                 * 【飞书开平】删除沙箱环境变量
                 */
                deleteEnvVars: async (
                    payload?: {
                        data: { keys: Array<string>; env?: "online" | "dev" };
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
                                data?: { deleted_keys: Array<string> };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/delete_env_vars`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=env_vars&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=env_vars&project=spark&resource=app&version=v1 document }
                 *
                 * 【飞书开平】查询沙箱环境变量
                 */
                envVars: async (
                    payload?: {
                        data?: { scene?: number; env?: "online" | "dev" };
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
                                    env_vars?: Array<{
                                        key: string;
                                        value: string;
                                        extras?: Array<{
                                            key: string;
                                            value?: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/env_vars`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=query_metrics_data&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query_metrics_data&project=spark&resource=app&version=v1 document }
                 *
                 * 查询指标数据
                 */
                queryMetricsData: async (
                    payload?: {
                        data: {
                            metric_names: Array<
                                | "cpu_usage"
                                | "mem_usage"
                                | "client_api_request_qps"
                                | "client_api_request_count"
                                | "client_api_request_latency_p50"
                                | "client_api_request_latency_p99"
                                | "client_api_request_error_qps"
                                | "client_api_request_error_count"
                            >;
                            start_timestamp?: string;
                            end_timestamp?: string;
                            filter?: {
                                pages?: Array<string>;
                                apis?: Array<string>;
                            };
                            aggregator?: "sum" | "avg";
                            down_sample?: string;
                            need_pack_lack_point?: boolean;
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
                                    points?: Array<{
                                        timestamp: string;
                                        dimensions?: Array<{
                                            key: string;
                                            value: string;
                                        }>;
                                        values?: Array<{
                                            metric_name:
                                                | "cpu_usage"
                                                | "mem_usage"
                                                | "client_api_request_qps"
                                                | "client_api_request_count"
                                                | "client_api_request_latency_p50"
                                                | "client_api_request_latency_p99"
                                                | "client_api_request_error_qps"
                                                | "client_api_request_error_count";
                                            value: number;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/query_metrics_data`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=trace&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=trace&project=spark&resource=app&version=v1 document }
                 *
                 * 获取 traces
                 */
                trace: async (
                    payload?: {
                        data: {
                            app_env: string;
                            trace_id: string;
                            with_log_severity_count?: boolean;
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
                                    spans?: Array<{
                                        trace_id: string;
                                        span_id: string;
                                        parent_span_id: string;
                                        name: string;
                                        start_time_unix_nano: string;
                                        end_time_unix_nano: string;
                                        attributes?: Array<{
                                            key: string;
                                            value: string;
                                        }>;
                                    }>;
                                    is_break: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/trace`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=query_analytics_data&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=query_analytics_data&project=spark&resource=app&version=v1 document }
                 *
                 * 批量查询运营数据
                 */
                queryAnalyticsData: async (
                    payload?: {
                        data: {
                            metric_types: Array<
                                | "TOTAL_USER"
                                | "ACTIVE_USER"
                                | "NEW_USER"
                                | "PAGE_VIEW"
                                | "API_REQUEST"
                            >;
                            start_timestamp_ns: string;
                            end_timestamp_ns: string;
                            time_aggregation_unit: "DAY" | "WEEK" | "MONTH";
                            filter?: {
                                page?: string;
                                device_types?: Array<string>;
                            };
                            need_pack_lack_point?: boolean;
                            group_by?: string;
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
                                    series?: Array<{
                                        metric_type:
                                            | "TOTAL_USER"
                                            | "ACTIVE_USER"
                                            | "NEW_USER"
                                            | "PAGE_VIEW"
                                            | "API_REQUEST";
                                        points?: Array<{
                                            timestamp_ns: string;
                                            value: number;
                                            dimensions: Array<{
                                                key: string;
                                                value: string;
                                            }>;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/query_analytics_data`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=create_or_update_env_var&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_or_update_env_var&project=spark&resource=app&version=v1 document }
                 *
                 * 【飞书开平】创建/更新沙箱环境变量
                 */
                createOrUpdateEnvVar: async (
                    payload?: {
                        data: {
                            key: string;
                            value: string;
                            env?: "online" | "dev";
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
                                data?: { action: "created" | "updated" };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/create_or_update_env_var`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=resolve_stack_trace&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=resolve_stack_trace&project=spark&resource=app&version=v1 document }
                 *
                 * 解析 source map 获取源码
                 */
                resolveStackTrace: async (
                    payload?: {
                        data: {
                            commit_id: string;
                            source_map_file_prefix: string;
                            frames?: Array<{
                                file_name: string;
                                line: number;
                                column: number;
                                source_file_name?: string;
                                source_line?: number;
                                source_column?: number;
                            }>;
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
                                    frames?: Array<{
                                        file_name: string;
                                        line: number;
                                        column: number;
                                        source_file_name?: string;
                                        source_line?: number;
                                        source_column?: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/resolve_stack_trace`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=pre_release&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=pre_release&project=spark&resource=app&version=v1 document }
                 *
                 * 发布准备
                 */
                preRelease: async (
                    payload?: {
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
                                    kvs?: Array<{
                                        key?: string;
                                        value?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/pre_release`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=user_role_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=user_role_list&project=spark&resource=app&version=v1 document }
                 *
                 * ## 功能介绍;获取妙搭应用下指定用户命中的所有角色列表，返回完整角色信息，常用于按用户同步权限配置或判断用户在应用内具备的角色集合。;;### 前提条件;- 调用方需拥有对应应用角色的查看权限。;;### 注意事项;- 以真实运行态命中结果为准。
                 */
                userRoleList: async (
                    payload?: {
                        data: { target_user_id: string };
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
                                    roles: Array<{
                                        role_id: string;
                                        name: string;
                                        description?: string;
                                        created_by?: string;
                                        updated_by?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        member_count?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/user_role_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=git_info&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=git_info&project=spark&resource=app&version=v1 document }
                 *
                 * 获取应用对应的 Git 访问信息（干净 URL + 用户名 + token + 过期时间）。OpenAPI 接口。
                 */
                gitInfo: async (
                    payload?: {
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
                                    git_url?: string;
                                    username?: string;
                                    token?: string;
                                    expired_time?: string;
                                    commit_author_name?: string;
                                    commit_author_email?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/git_info`,
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
                 * 更新妙搭应用信息
                 *
                 * 更新妙搭应用信息
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
                                        meta_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=spark&resource=app&version=v1 document }
                 *
                 * 批量获取妙搭应用
                 *
                 * 批量获取妙搭应用
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
                                        meta_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=spark&resource=app&version=v1 document }
                 *
                 * 【OpenAPI】查询妙搭应用详情（本次新增；GET /open-apis/spark/v1/apps/:appID）
                 */
                get: async (
                    payload?: {
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
                                        meta_token?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=spark&resource=app&version=v1 document }
                 *
                 * 创建妙搭应用
                 *
                 * 创建妙搭应用
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            app_type: string;
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
                                        meta_token?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=member_add&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=member_add&project=spark&resource=app&version=v1 document }
                 *
                 * 为妙搭应用添加用户、部门或群聊协作者。若该应用暂不支持通过 OpenAPI 管理协作者，返回错误码 3340005，请前往妙搭后台的权限设置中操作
                 */
                memberAdd: async (
                    payload?: {
                        data: {
                            user_open_id?: string;
                            department_id?: string;
                            chat_id?: string;
                            role: string;
                            need_notification?: boolean;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    member?: {
                                        member_type: string;
                                        role: string;
                                        user_open_id?: string;
                                        department_id?: string;
                                        chat_id?: string;
                                        name?: string;
                                    };
                                    changed?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=member_remove&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=member_remove&project=spark&resource=app&version=v1 document }
                 *
                 * 移除妙搭应用的用户、部门或群聊协作者。若该应用暂不支持通过 OpenAPI 管理协作者，返回错误码 3340005，请前往妙搭后台的权限设置中操作
                 */
                memberRemove: async (
                    payload?: {
                        data?: {
                            user_open_id?: string;
                            department_id?: string;
                            chat_id?: string;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    member?: {
                                        member_type: string;
                                        role: string;
                                        user_open_id?: string;
                                        department_id?: string;
                                        chat_id?: string;
                                        name?: string;
                                    };
                                    changed?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/members/remove`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=member_settings_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=member_settings_get&project=spark&resource=app&version=v1 document }
                 *
                 * 查询妙搭应用的协作者权限设置。若该应用暂不支持通过 OpenAPI 管理协作者，返回错误码 3340005，请前往妙搭后台的权限设置中操作
                 */
                memberSettingsGet: async (
                    payload?: {
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
                                    settings?: {
                                        external_access?: string;
                                        external_invite?: string;
                                        link_share?: string;
                                        manage_collaborators_by?: string;
                                        comment_by?: string;
                                        copy_download_by?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/member-settings`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=member_settings_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=member_settings_update&project=spark&resource=app&version=v1 document }
                 *
                 * 部分更新妙搭应用的协作者权限设置。若该应用暂不支持通过 OpenAPI 管理协作者，返回错误码 3340005，请前往妙搭后台的权限设置中操作
                 */
                memberSettingsUpdate: async (
                    payload?: {
                        data?: {
                            external_access?: string;
                            external_invite?: string;
                            link_share?: string;
                            manage_collaborators_by?: string;
                            comment_by?: string;
                            copy_download_by?: string;
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
                                    settings?: {
                                        external_access?: string;
                                        external_invite?: string;
                                        link_share?: string;
                                        manage_collaborators_by?: string;
                                        comment_by?: string;
                                        copy_download_by?: string;
                                    };
                                    changes?: Array<{
                                        field: string;
                                        before?: string;
                                        after?: string;
                                    }>;
                                    changed?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/member-settings`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=member_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=member_update&project=spark&resource=app&version=v1 document }
                 *
                 * 更新妙搭应用协作者的权限角色。若该应用暂不支持通过 OpenAPI 管理协作者，返回错误码 3340005，请前往妙搭后台的权限设置中操作
                 */
                memberUpdate: async (
                    payload?: {
                        data: {
                            user_open_id?: string;
                            department_id?: string;
                            chat_id?: string;
                            role: string;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    member?: {
                                        member_type: string;
                                        role: string;
                                        user_open_id?: string;
                                        department_id?: string;
                                        chat_id?: string;
                                        name?: string;
                                    };
                                    before_role?: string;
                                    after_role?: string;
                                    changed?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/members`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=db_dev_init&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=db_dev_init&project=spark&resource=app&version=v1 document }
                 *
                 * -------------------------openAPI db 域（妙搭 data CLI）-start-----------------------\n复用策略：table-list / table-schema / sql 三个接口扩展存量方法（见上方各方法 scope 已追加 spark:app:read/write）。\n仅 multi-env-init 为新增接口（存量无对应方法）。
                 */
                dbDevInit: async (
                    payload?: {
                        data?: { sync_data?: boolean };
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
                                    status: string;
                                    environments: Array<string>;
                                    data_synced: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db_dev_init`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=sql_commands&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=sql_commands&project=spark&resource=app&version=v1 document }
                 *
                 * 执行 SQL
                 *
                 * 在应用下执行 SQL。
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app&apiName=member_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=member_list&project=spark&resource=app&version=v1 document }
                 *
                 * 查询妙搭应用协作者列表。若该应用暂不支持通过 OpenAPI 管理协作者，返回错误码 3340005，请前往妙搭后台的权限设置中操作
                 */
                memberList: async (
                    payload?: {
                        params?: {
                            role?: string;
                            member_type?: string;
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
                                    items?: Array<{
                                        member_type: string;
                                        role: string;
                                        user_open_id?: string;
                                        department_id?: string;
                                        chat_id?: string;
                                        name?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/members`,
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
             * app.session
             */
            appSession: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.session&apiName=chat&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=chat&project=spark&resource=app.session&version=v1 document }
                 *
                 * lark-cli +chat：在 session 下发一条 message（messages 子资源 create）；BFF 内部复用 AsyncChat
                 */
                chat: async (
                    payload?: {
                        data: {
                            message: string;
                            attachment_ids?: Array<string>;
                        };
                        path: { app_id: string; session_id: string };
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
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/sessions/:session_id/chat`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.session&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=spark&resource=app.session&version=v1 document }
                 *
                 * lark-cli +session-list：列出 app 下所有 session（按 AppMode 路由 ListConversation / ListProSubTasks）
                 */
                list: async (
                    payload?: {
                        params?: { page_size?: number; page_token?: string };
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
                                    sessions?: Array<{
                                        session_id?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        is_active?: boolean;
                                        name?: string;
                                    }>;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/sessions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.session&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=spark&resource=app.session&version=v1 document }
                 *
                 * 创建会话
                 */
                create: async (
                    payload?: {
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
                                data?: { session_id?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/sessions`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.session&apiName=stop&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=stop&project=spark&resource=app.session&version=v1 document }
                 *
                 * lark-cli +session-stop：打断指定 session 的指定 turn（仅 RUNNING；复用 chat_svc.StopChat + CancelRunningTask）
                 */
                stop: async (
                    payload?: {
                        data: { turn_id: string };
                        path: { app_id: string; session_id: string };
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
                                data?: { stopped?: boolean; state?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/sessions/:session_id/stop`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.session&apiName=get_turn_message&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_turn_message&project=spark&resource=app.session&version=v1 document }
                 *
                 * lark-cli 按 turn_id 增量查询本轮 agent 产生的消息（游标分页，已返回过的不再返回）
                 */
                getTurnMessage: async (
                    payload?: {
                        params?: { page_token?: string };
                        path: {
                            app_id: string;
                            session_id: string;
                            turn_id: string;
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
                                    messages?: Array<{
                                        message_id?: string;
                                        role?: string;
                                        content?: string;
                                        finish_reason?: string;
                                    }>;
                                    has_more?: boolean;
                                    next_page_token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/sessions/:session_id/turns/:turn_id/reply_message`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.session&apiName=read&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=read&project=spark&resource=app.session&version=v1 document }
                 *
                 * lark-cli +session-read：聚合查询 session 状态 + 队列 + 最新 turn 消息
                 */
                read: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { app_id: string; session_id: string };
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
                                    session_id?: string;
                                    is_active?: boolean;
                                    is_streaming?: boolean;
                                    summary?: string;
                                    queued_messages?: Array<{
                                        seq_no?: string;
                                        submitted_at?: string;
                                        content?: string;
                                        attachment_ids?: Array<string>;
                                        sender?: {
                                            user_id?: string;
                                            name?: string;
                                        };
                                    }>;
                                    queued_count?: number;
                                    latest_turn?: {
                                        turn_id?: string;
                                        status?: string;
                                        user_message?: {
                                            content?: string;
                                            attachment_ids?: Array<string>;
                                        };
                                        sender?: {
                                            user_id?: string;
                                            name?: string;
                                        };
                                        messages?: Array<{
                                            message_id?: string;
                                            role?: string;
                                            content?: string;
                                            finish_reason?: string;
                                        }>;
                                    };
                                    version_anchor?: {
                                        app_version?: number;
                                        git_sha?: string;
                                        preview_url?: string;
                                        online_url?: string;
                                    };
                                    next_poll_after_ms?: number;
                                    turns?: Array<{
                                        turn_id?: string;
                                        status?: string;
                                        user_message?: {
                                            content?: string;
                                            attachment_ids?: Array<string>;
                                        };
                                        sender?: {
                                            user_id?: string;
                                            name?: string;
                                        };
                                        messages?: Array<{
                                            message_id?: string;
                                            role?: string;
                                            content?: string;
                                            finish_reason?: string;
                                        }>;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/sessions/:session_id`,
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
             * app.attachment
             */
            appAttachment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.attachment&apiName=upload&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=upload&project=spark&resource=app.attachment&version=v1 document }
                 *
                 * 附件上传 OpenAPI 同类接口（multipart/form-data，返回 Attachment；内部复用 attachment_svc.UploadAttachment 直传 aily_agent；app 维度，做协作者鉴权）
                 */
                upload: async (
                    payload?: {
                        data: {
                            target_type: "none";
                            name?: string;
                            file?: Buffer | fs.ReadStream;
                            type: "file" | "image";
                            parse_type?: "binary" | "feishu_doc" | "template";
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
                                    attachment?: {
                                        id: string;
                                        created_at: string;
                                        created_by: string;
                                        updated_at: string;
                                        source_api_id: string;
                                        name: string;
                                        type: "file" | "image";
                                        mime_type?: string;
                                        summary?: string;
                                        status:
                                            | "uploaded"
                                            | "parsed"
                                            | "chunk_success"
                                            | "chunk_failed";
                                        raw_url: string;
                                        text_url?: string;
                                        text_key?: string;
                                        doc_meta?: {
                                            id?: string;
                                            token?: string;
                                            title?: string;
                                            url?: string;
                                            type?: string;
                                            owner_uid?: string;
                                            owner_name?: string;
                                            size?: number;
                                            edit_time?: string;
                                        };
                                        size?: number;
                                        source?: "user" | "llm" | "template";
                                        raw?: string;
                                        tos_type?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/attachments/upload`,
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
             * app.release
             */
            appRelease: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.release&apiName=error_logs&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=error_logs&project=spark&resource=app.release&version=v1 document }
                 *
                 * 查询发布错误日志
                 */
                errorLogs: async (
                    payload?: {
                        path: { app_id: string; release_id: string };
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
                                    status?: string;
                                    error_logs?: Array<{
                                        step?: string;
                                        error_log?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/releases/:release_id/error_logs`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.release&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=spark&resource=app.release&version=v1 document }
                 *
                 * 查询发布历史
                 */
                list: async (
                    payload?: {
                        params?: {
                            status?: string;
                            page_size?: string;
                            page_token?: string;
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
                                    releases?: Array<{
                                        release_id?: string;
                                        status?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        online_url?: string;
                                        commit_id?: string;
                                        creator?: {
                                            username?: string;
                                            email?: string;
                                        };
                                    }>;
                                    next_page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/releases`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.release&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=spark&resource=app.release&version=v1 document }
                 *
                 * 查询发布详情
                 */
                get: async (
                    payload?: {
                        path: { app_id: string; release_id: string };
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
                                    release?: {
                                        release_id?: string;
                                        status?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        online_url?: string;
                                        commit_id?: string;
                                        creator?: {
                                            username?: string;
                                            email?: string;
                                        };
                                    };
                                    error_logs?: Array<{
                                        step?: string;
                                        error_log?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/releases/:release_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.release&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=spark&resource=app.release&version=v1 document }
                 *
                 * 创建发布
                 */
                create: async (
                    payload?: {
                        data?: { branch?: string; tos_path?: string };
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
                                    release_id?: string;
                                    status?: string;
                                    sync?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/releases`,
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
             * app.oapi_apikey
             */
            appOapiApikey: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.oapi_apikey&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=spark&resource=app.oapi_apikey&version=v1 document }
                 *
                 * 应用 API 密钥
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            config?: {
                                request_scope?: {
                                    allow_all: boolean;
                                    http_infos?: Array<{
                                        http_method: string;
                                        http_path: string;
                                    }>;
                                };
                                is_allow_access_preview?: boolean;
                            };
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
                                    api_key_id?: string;
                                    info?: {
                                        api_key_id: string;
                                        api_key: string;
                                        name: string;
                                        config: {
                                            request_scope?: {
                                                allow_all: boolean;
                                                http_infos?: Array<{
                                                    http_method: string;
                                                    http_path: string;
                                                }>;
                                            };
                                            is_allow_access_preview?: boolean;
                                        };
                                        status: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/oapi_apikeys`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.oapi_apikey&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=spark&resource=app.oapi_apikey&version=v1 document }
                 *
                 * 获取应用 API appId
                 */
                list: async (
                    payload?: {
                        params?: { limit?: string; offset?: string };
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
                                    infos?: Array<{
                                        api_key_id: string;
                                        api_key: string;
                                        name: string;
                                        config: {
                                            request_scope?: {
                                                allow_all: boolean;
                                                http_infos?: Array<{
                                                    http_method: string;
                                                    http_path: string;
                                                }>;
                                            };
                                            is_allow_access_preview?: boolean;
                                        };
                                        status: number;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/oapi_apikeys`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.oapi_apikey&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=spark&resource=app.oapi_apikey&version=v1 document }
                 *
                 * 更新应用 API 密钥
                 */
                patch: async (
                    payload?: {
                        data?: {
                            config?: {
                                request_scope?: {
                                    allow_all: boolean;
                                    http_infos?: Array<{
                                        http_method: string;
                                        http_path: string;
                                    }>;
                                };
                                is_allow_access_preview?: boolean;
                            };
                            status?: number;
                            name?: string;
                        };
                        path: { app_id: string; oapi_apikey_id: string };
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
                                    info?: {
                                        api_key_id: string;
                                        api_key: string;
                                        name: string;
                                        config: {
                                            request_scope?: {
                                                allow_all: boolean;
                                                http_infos?: Array<{
                                                    http_method: string;
                                                    http_path: string;
                                                }>;
                                            };
                                            is_allow_access_preview?: boolean;
                                        };
                                        status: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/oapi_apikeys/:oapi_apikey_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.oapi_apikey&apiName=refresh&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=refresh&project=spark&resource=app.oapi_apikey&version=v1 document }
                 *
                 * 刷新应用 API 密钥
                 */
                refresh: async (
                    payload?: {
                        path: { app_id: string; oapi_apikey_id: string };
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
                                    api_key: string;
                                    info?: {
                                        api_key_id: string;
                                        api_key: string;
                                        name: string;
                                        config: {
                                            request_scope?: {
                                                allow_all: boolean;
                                                http_infos?: Array<{
                                                    http_method: string;
                                                    http_path: string;
                                                }>;
                                            };
                                            is_allow_access_preview?: boolean;
                                        };
                                        status: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/oapi_apikeys/:oapi_apikey_id/refresh`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.oapi_apikey&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=spark&resource=app.oapi_apikey&version=v1 document }
                 *
                 * 删除应用 API 密钥
                 */
                delete: async (
                    payload?: {
                        path: { app_id: string; oapi_apikey_id: string };
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
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/oapi_apikeys/:oapi_apikey_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.oapi_apikey&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=spark&resource=app.oapi_apikey&version=v1 document }
                 *
                 * 获取应用 API 密钥详情
                 */
                get: async (
                    payload?: {
                        path: { app_id: string; oapi_apikey_id: string };
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
                                    info?: {
                                        api_key_id: string;
                                        api_key: string;
                                        name: string;
                                        config: {
                                            request_scope?: {
                                                allow_all: boolean;
                                                http_infos?: Array<{
                                                    http_method: string;
                                                    http_path: string;
                                                }>;
                                            };
                                            is_allow_access_preview?: boolean;
                                        };
                                        status: number;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/oapi_apikeys/:oapi_apikey_id`,
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
             * plugin.version
             */
            pluginVersion: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=plugin.version&apiName=download_package&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=download_package&project=spark&resource=plugin.version&version=v1 document }
                 *
                 * ## 功能介绍;根据指定的插件标识和版本号，获取对应插件安装包的二进制文件流，用于插件的部署与更新场景。;;### 前提条件;- 需已通过插件发布流程将目标版本插件上传至系统。;;### 注意事项;- 返回的二进制流需直接保存为文件，不可通过文本解析方式处理。
                 */
                downloadPackage: async (
                    payload?: {
                        data: { plugin_key: string; plugin_version: string };
                    },
                    options?: IRequestOptions
                ) => {
                    const { headers, params, data, path } =
                        await this.formatPayload(payload, options);

                    const res = await this.httpInstance
                        .request<any, any>({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/plugin/versions/download_package`,
                                path
                            ),
                            method: "POST",
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=plugin.version&apiName=batch_query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_query&project=spark&resource=plugin.version&version=v1 document }
                 *
                 * ## 功能介绍;批量获取指定插件的版本信息，支持同时查询多个插件的全量版本或仅最新版本，常用于插件管理平台的版本展示、更新检测场景。;;### 注意事项;- 未查询到对应插件时，返回结果中该插件的版本列表为空。
                 */
                batchQuery: async (
                    payload?: {
                        data: {
                            plugin_keys: Array<string>;
                            latest_only?: boolean;
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
                                        key?: string;
                                        version?: string;
                                        name?: string;
                                        description?: string;
                                        download_url?: string;
                                        download_approach?: string;
                                        status?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/plugin/versions/batch_query`,
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
             * app.trigger
             */
            appTrigger: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.trigger&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=spark&resource=app.trigger&version=v1 document }
                 *
                 * 停用/启用触发器
                 */
                patch: async (
                    payload?: {
                        data: { status: string };
                        path: { app_id: string; name: string };
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
                                data?: { success: boolean };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/triggers/:name`,
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
                        params?: {
                            trigger_type?: string;
                            page_size?: string;
                            page_token?: string;
                        };
                        path: { app_id: string };
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
                                    `${this.domain}/open-apis/spark/v1/apps/:app_id/triggers`,
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
                                                        name: string;
                                                        trigger_type: string;
                                                        status: string;
                                                        editable?: boolean;
                                                        description?: string;
                                                        condition_summary?: string;
                                                        trigger_condition?: {
                                                            cron?: string;
                                                            timezone?: string;
                                                            event?: string;
                                                            table?: string;
                                                            fields?: Array<string>;
                                                            preview_url?: string;
                                                            runtime_url?: string;
                                                            white_ip_list?: Array<string>;
                                                            token_enabled?: boolean;
                                                            token_value?: string;
                                                            approval_code?: string;
                                                            event_type?: string;
                                                            status?: Array<string>;
                                                        };
                                                        capabilities?: {
                                                            can_update?: boolean;
                                                            can_enable?: boolean;
                                                            can_disable?: boolean;
                                                            can_delete?: boolean;
                                                            can_reset_token?: boolean;
                                                        };
                                                        created_at?: string;
                                                        updated_at?: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.trigger&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=spark&resource=app.trigger&version=v1 document }
                 *
                 * 获取触发器列表
                 */
                list: async (
                    payload?: {
                        params?: {
                            trigger_type?: string;
                            page_size?: string;
                            page_token?: string;
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
                                    items?: Array<{
                                        name: string;
                                        trigger_type: string;
                                        status: string;
                                        editable?: boolean;
                                        description?: string;
                                        condition_summary?: string;
                                        trigger_condition?: {
                                            cron?: string;
                                            timezone?: string;
                                            event?: string;
                                            table?: string;
                                            fields?: Array<string>;
                                            preview_url?: string;
                                            runtime_url?: string;
                                            white_ip_list?: Array<string>;
                                            token_enabled?: boolean;
                                            token_value?: string;
                                            approval_code?: string;
                                            event_type?: string;
                                            status?: Array<string>;
                                        };
                                        capabilities?: {
                                            can_update?: boolean;
                                            can_enable?: boolean;
                                            can_disable?: boolean;
                                            can_delete?: boolean;
                                            can_reset_token?: boolean;
                                        };
                                        created_at?: string;
                                        updated_at?: string;
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/triggers`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.trigger&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=spark&resource=app.trigger&version=v1 document }
                 *
                 * 更新触发器
                 */
                update: async (
                    payload?: {
                        data?: {
                            description?: string;
                            cron_condition?: {
                                cron: string;
                                timezone?: string;
                            };
                            record_change_condition?: {
                                event: string;
                                table: string;
                                fields?: Array<string>;
                            };
                            webhook_condition?: {
                                white_ip_list: Array<string>;
                            };
                            feishu_approval_condition?: {
                                approval_code?: string;
                                event_type: string;
                                status: Array<string>;
                            };
                        };
                        path: { app_id: string; name: string };
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
                                    trigger?: {
                                        name: string;
                                        trigger_type: string;
                                        status: string;
                                        editable?: boolean;
                                        description?: string;
                                        condition_summary?: string;
                                        trigger_condition?: {
                                            cron?: string;
                                            timezone?: string;
                                            event?: string;
                                            table?: string;
                                            fields?: Array<string>;
                                            preview_url?: string;
                                            runtime_url?: string;
                                            white_ip_list?: Array<string>;
                                            token_enabled?: boolean;
                                            token_value?: string;
                                            approval_code?: string;
                                            event_type?: string;
                                            status?: Array<string>;
                                        };
                                        capabilities?: {
                                            can_update?: boolean;
                                            can_enable?: boolean;
                                            can_disable?: boolean;
                                            can_delete?: boolean;
                                            can_reset_token?: boolean;
                                        };
                                        created_at?: string;
                                        updated_at?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/triggers/:name`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.trigger&apiName=reset_webhook_token&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reset_webhook_token&project=spark&resource=app.trigger&version=v1 document }
                 *
                 * 重置webhook凭证
                 */
                resetWebhookToken: async (
                    payload?: {
                        data?: { token_type?: string };
                        path: { app_id: string; name: string };
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
                                    success: boolean;
                                    token_type?: string;
                                    token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/triggers/:name/webhook/token/reset`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.trigger&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=spark&resource=app.trigger&version=v1 document }
                 *
                 * 创建一个触发器
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            description?: string;
                            trigger_type: string;
                            cron_condition?: {
                                cron: string;
                                timezone?: string;
                            };
                            record_change_condition?: {
                                event: string;
                                table: string;
                                fields?: Array<string>;
                            };
                            webhook_condition?: {
                                white_ip_list: Array<string>;
                            };
                            feishu_approval_condition?: {
                                approval_code?: string;
                                event_type: string;
                                status: Array<string>;
                            };
                            status?: string;
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
                                    trigger?: {
                                        name: string;
                                        trigger_type: string;
                                        status: string;
                                        editable?: boolean;
                                        description?: string;
                                        condition_summary?: string;
                                        trigger_condition?: {
                                            cron?: string;
                                            timezone?: string;
                                            event?: string;
                                            table?: string;
                                            fields?: Array<string>;
                                            preview_url?: string;
                                            runtime_url?: string;
                                            white_ip_list?: Array<string>;
                                            token_enabled?: boolean;
                                            token_value?: string;
                                            approval_code?: string;
                                            event_type?: string;
                                            status?: Array<string>;
                                        };
                                        capabilities?: {
                                            can_update?: boolean;
                                            can_enable?: boolean;
                                            can_disable?: boolean;
                                            can_delete?: boolean;
                                            can_reset_token?: boolean;
                                        };
                                        created_at?: string;
                                        updated_at?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/triggers`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.trigger&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=spark&resource=app.trigger&version=v1 document }
                 *
                 * 获取触发器的详情
                 */
                get: async (
                    payload?: {
                        path: { app_id: string; name: string };
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
                                    trigger?: {
                                        name: string;
                                        trigger_type: string;
                                        status: string;
                                        editable?: boolean;
                                        description?: string;
                                        condition_summary?: string;
                                        trigger_condition?: {
                                            cron?: string;
                                            timezone?: string;
                                            event?: string;
                                            table?: string;
                                            fields?: Array<string>;
                                            preview_url?: string;
                                            runtime_url?: string;
                                            white_ip_list?: Array<string>;
                                            token_enabled?: boolean;
                                            token_value?: string;
                                            approval_code?: string;
                                            event_type?: string;
                                            status?: Array<string>;
                                        };
                                        capabilities?: {
                                            can_update?: boolean;
                                            can_enable?: boolean;
                                            can_disable?: boolean;
                                            can_delete?: boolean;
                                            can_reset_token?: boolean;
                                        };
                                        created_at?: string;
                                        updated_at?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/triggers/:name`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.trigger&apiName=reset_webhook_url&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=reset_webhook_url&project=spark&resource=app.trigger&version=v1 document }
                 *
                 * 重置webhook 链接
                 */
                resetWebhookUrl: async (
                    payload?: {
                        data: { app_env: string };
                        path: { app_id: string; name: string };
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
                                data?: { success: boolean; url?: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/triggers/:name/webhook/url/reset`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.trigger&apiName=switch_webhook_token_status&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=switch_webhook_token_status&project=spark&resource=app.trigger&version=v1 document }
                 *
                 * 是否开启webhook token
                 */
                switchWebhookTokenStatus: async (
                    payload?: {
                        data: { status: string; token_type?: string };
                        path: { app_id: string; name: string };
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
                                    success: boolean;
                                    token_type?: string;
                                    token?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/triggers/:name/webhook/token/status`,
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
            /**
             * app.role
             */
            appRole: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.role&apiName=member_remove&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=member_remove&project=spark&resource=app.role&version=v1 document }
                 *
                 * ## 功能介绍;移除妙搭应用角色下的指定成员或全部成员，支持按成员类型（用户、部门、群聊）批量操作，常用于角色权限调整或人员离职后的权限回收场景。;;### 前提条件;- 操作员需拥有目标应用角色的「成员管理」权限。;;### 注意事项;- 移除全部成员操作不可恢复，请谨慎调用；若同时指定了成员列表和`all`参数，将忽略成员列表。
                 */
                memberRemove: async (
                    payload?: {
                        data?: {
                            users?: Array<string>;
                            departments?: Array<string>;
                            chats?: Array<string>;
                            all?: boolean;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { app_id: string; role_id: string };
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
                                    users?: Array<string>;
                                    departments?: Array<string>;
                                    chats?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/roles/:role_id/member_remove`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.role&apiName=member_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=member_list&project=spark&resource=app.role&version=v1 document }
                 *
                 * ## 功能介绍;获取妙搭应用指定角色下的成员列表，支持按成员类型（用户、部门、群聊）筛选查询，常用于角色权限配置同步或成员权限校验场景。;;### 前提条件;- 调用方需拥有对应应用角色的查看权限。;;### 注意事项;- 仅返回当前生效的角色成员，已移除的成员不会出现在结果中。
                 */
                memberList: async (
                    payload?: {
                        params?: {
                            member_type?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { app_id: string; role_id: string };
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
                                    users?: Array<string>;
                                    departments?: Array<string>;
                                    chats?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/roles/:role_id/member_list`,
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
                        params?: {
                            limit?: string;
                            offset?: string;
                            need_member?: boolean;
                            name?: string;
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { app_id: string };
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
                                    `${this.domain}/open-apis/spark/v1/apps/:app_id/roles`,
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
                                                    items: Array<{
                                                        role_id: string;
                                                        name: string;
                                                        description?: string;
                                                        created_by?: string;
                                                        updated_by?: string;
                                                        created_at?: string;
                                                        updated_at?: string;
                                                        member_count?: string;
                                                    }>;
                                                    has_more?: boolean;
                                                    total: string;
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.role&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=list&project=spark&resource=app.role&version=v1 document }
                 *
                 * ## 功能介绍;获取指定应用下的角色列表，支持按角色名称模糊过滤，可按需返回角色成员统计信息，常用于应用角色管理页的角色列表渲染场景。;;### 注意事项;- 仅返回当前应用下的角色信息，跨应用角色需调用对应应用的接口获取。
                 */
                list: async (
                    payload?: {
                        params?: {
                            limit?: string;
                            offset?: string;
                            need_member?: boolean;
                            name?: string;
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
                                    items: Array<{
                                        role_id: string;
                                        name: string;
                                        description?: string;
                                        created_by?: string;
                                        updated_by?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        member_count?: string;
                                    }>;
                                    has_more?: boolean;
                                    total: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/roles`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.role&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=spark&resource=app.role&version=v1 document }
                 *
                 * ## 功能介绍;在指定妙搭应用下创建自定义角色，支持配置角色名称与描述，用于应用内权限的分组管理。;;### 前提条件;- 操作员需拥有妙搭应用的角色创建权限。;;### 注意事项;- 角色 ID 为应用内全局唯一标识，创建后不可修改；若不指定角色 ID，系统将自动生成唯一值。
                 */
                create: async (
                    payload?: {
                        data: {
                            name: string;
                            description?: string;
                            role_id?: string;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: {
                                    role: {
                                        role_id: string;
                                        name: string;
                                        description?: string;
                                        created_by?: string;
                                        updated_by?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        member_count?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/roles`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.role&apiName=member_add&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=member_add&project=spark&resource=app.role&version=v1 document }
                 *
                 * ## 功能介绍;为妙搭应用下的指定角色批量添加成员，支持添加用户、部门或群聊类型的角色成员，单次最多可添加100个成员。;;### 注意事项;- 若添加的成员类型为部门，该部门下的所有用户将自动成为角色成员；若为群聊，群内所有成员将自动成为角色成员。;- 重复添加已在角色中的成员将不会重复生效。
                 */
                memberAdd: async (
                    payload?: {
                        data?: {
                            users?: Array<string>;
                            departments?: Array<string>;
                            chats?: Array<string>;
                        };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { app_id: string; role_id: string };
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
                                    users?: Array<string>;
                                    departments?: Array<string>;
                                    chats?: Array<string>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/roles/:role_id/member_add`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.role&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=spark&resource=app.role&version=v1 document }
                 *
                 * ## 功能介绍;删除妙搭应用下指定的角色，删除后该角色关联的用户权限将同步失效，无法再使用该角色对应的功能权限。;;### 注意事项;- 角色删除操作不可逆，请谨慎调用。;- 仅可删除当前应用下已存在的角色。
                 */
                delete: async (
                    payload?: {
                        path: { app_id: string; role_id: string };
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
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/roles/:role_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.role&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=patch&project=spark&resource=app.role&version=v1 document }
                 *
                 * ## 功能介绍;更新妙搭应用下指定角色的名称或描述，支持对角色基础信息进行修改。;;### 前提条件;- 操作员需拥有目标角色的编辑权限。;;### 注意事项;- 角色名称修改后，应用内关联该角色的权限配置将同步生效。
                 */
                patch: async (
                    payload?: {
                        data?: { name?: string; description?: string };
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { app_id: string; role_id: string };
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
                                    role: {
                                        role_id: string;
                                        name: string;
                                        description?: string;
                                        created_by?: string;
                                        updated_by?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        member_count?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/roles/:role_id`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.role&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=spark&resource=app.role&version=v1 document }
                 *
                 * ## 功能介绍;获取妙搭应用下指定角色的详细信息，包含角色名称、描述、创建/更新时间及成员总数等，常用于应用角色管理或权限配置场景。;;### 前提条件;- 调用者需拥有对应应用的角色查看权限。;;### 注意事项;- 角色成员总数仅为统计值，如需获取具体成员列表需调用对应接口并指定成员获取参数。
                 */
                get: async (
                    payload?: {
                        params?: {
                            user_id_type?: "user_id" | "union_id" | "open_id";
                        };
                        path: { app_id: string; role_id: string };
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
                                    role: {
                                        role_id: string;
                                        name: string;
                                        description?: string;
                                        created_by?: string;
                                        updated_by?: string;
                                        created_at?: string;
                                        updated_at?: string;
                                        member_count?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/roles/:role_id`,
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
                 * 转换飞书妙搭和飞书开放平台用户 ID
                 *
                 * 转换飞书妙搭和飞书开放平台之间的用户 ID;#### 使用场景;适用于需要在飞书妙搭和飞书开放平台之间转换用户身份的场景;#### 实现方式;通过指定转换类型（id_convert_type）和待转换的 ID 列表（ids）实现指定 ID 转换
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
            /**
             * app.table
             */
            appTable: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.table&apiName=get_table_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_table_list&project=spark&resource=app.table&version=v1 document }
                 *
                 * 获取数据表列表
                 *
                 * 获取应用下的数据表列表，包含数据表名称、描述，以及数据表列信息等字段。
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.table&apiName=delete_table_records&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete_table_records&project=spark&resource=app.table&version=v1 document }
                 *
                 * 删除数据表中的记录
                 *
                 * 删除指定应用下数据表中符合filter筛选条件的记录，删除后记录不可恢复。
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.table&apiName=batch_update_table_records&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_update_table_records&project=spark&resource=app.table&version=v1 document }
                 *
                 * 批量更新数据表中的记录
                 *
                 * 批量更新应用下的数据表中的记录，每条记录需包含主键如_id，单次最多500条。
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.table&apiName=get_table_detail&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_table_detail&project=spark&resource=app.table&version=v1 document }
                 *
                 * 获取数据表详细信息
                 *
                 * 获取应用下的数据表详情，包含数据表名称、描述，以及数据表列信息等字段。
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.table&apiName=post_table_records&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=post_table_records&project=spark&resource=app.table&version=v1 document }
                 *
                 * 向数据表中添加或更新记录
                 *
                 * 向应用下的数据表中添加或更新记录。
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.table&apiName=get_table_record_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_table_record_list&project=spark&resource=app.table&version=v1 document }
                 *
                 * 查询数据表数据记录
                 *
                 * 查询应用下的数据表数据记录，包括指定列、字段值及分页信息，适用于需要获取应用下某数据表数据的记录、展示等场景。
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
                 *
                 * 将数据表中符合filter条件的记录更新为record参数指定的内容。
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
            },
            /**
             * app.db
             */
            appDb: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=env_migrate&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=env_migrate&project=spark&resource=app.db&version=v1 document }
                 *
                 * ## 功能介绍;触发应用数据库环境迁移操作，支持在不同环境间同步数据库结构与数据，常用于应用发布前的环境一致性校验或生产环境更新场景。;;### 前提条件;- 需拥有目标应用的数据库管理权限;- 迁移源环境与目标环境需处于同一租户下;;### 注意事项;- `dry_run` 模式仅执行迁移校验，不会实际修改数据库;- 实际迁移操作不可逆，请在执行前确认数据备份完成;- 大规模数据迁移可能存在异步延迟，可通过返回的 `task_id` 查询进度
                 */
                envMigrate: async (
                    payload?: {
                        data: { dry_run: boolean };
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
                                    from: string;
                                    to: string;
                                    changes?: Array<{
                                        type: string;
                                        table: string;
                                        statement: string;
                                    }>;
                                    task_id?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/env_migrate`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=env_recovery&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=env_recovery&project=spark&resource=app.db&version=v1 document }
                 *
                 * ## 功能介绍;将指定应用的数据库环境恢复至目标状态，支持预演模式验证恢复可行性，常用于数据误操作回滚、环境克隆或版本回溯场景。;;### 前提条件;- 操作员需拥有目标应用的“数据库管理”权限。;- 目标应用处于正常运行状态，无正在执行的数据库任务。;;### 注意事项;- 预演模式（dry_run=true）仅验证恢复可行性，不会实际修改数据库；正式恢复（dry_run=false）执行后不可撤销，请谨慎操作。;- 恢复过程中应用可能出现短暂的读写延迟，建议在业务低峰期执行。
                 */
                envRecovery: async (
                    payload?: {
                        data: { target: string; dry_run: boolean };
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
                                    target: string;
                                    preview_request_id?: string;
                                    status?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/env_recovery`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=quota&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=quota&project=spark&resource=app.db&version=v1 document }
                 *
                 * ## 功能介绍;查询指定应用的数据库资源使用配额信息，包含存储用量、配额上限、表及视图数量等核心指标，用于监控应用数据库资源消耗情况、评估扩容需求。;;### 前提条件;- 需拥有目标应用的数据库资源查看权限;;### 注意事项;- 存储用量数据为近5分钟内的统计值，存在轻微延迟;- 未设置存储配额的应用，`storage_quota_bytes` 字段将返回空值
                 */
                quota: async (
                    payload?: {
                        params?: { env?: string };
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
                                    storage_used_bytes: number;
                                    storage_quota_bytes?: number;
                                    usage_percent?: number;
                                    tables: number;
                                    views: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/quota`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=env_recovery_diff_status&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=env_recovery_diff_status&project=spark&resource=app.db&version=v1 document }
                 *
                 * ## 功能介绍;查询数据库环境恢复预览任务的差异分析状态，包括任务执行进度、受影响表数量、数据变更详情及预计完成时间，用于确认恢复操作的影响范围与执行状态。;;### 前提条件;- 已发起数据库环境恢复预览任务，获取有效的预览请求ID;- 调用者需拥有目标应用的数据库管理权限;;### 注意事项;- 预览任务状态仅保留7天，过期后无法查询;- 差异分析结果为实时计算值，多次查询可能存在数据更新
                 */
                envRecoveryDiffStatus: async (
                    payload?: {
                        params: { preview_request_id: string };
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
                                    preview_status: string;
                                    tables_affected?: string;
                                    changes?: Array<{
                                        table: string;
                                        inserted?: string;
                                        deleted?: string;
                                        modified?: string;
                                        action?: string;
                                        dropped_at?: string;
                                    }>;
                                    estimated_seconds?: string;
                                    error_message?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/env_recovery_diff_status`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=sync_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=sync_get&project=spark&resource=app.db&version=v1 document }
                 *
                 * 通过 task_id 查询任务的完整配置、状态和对应 mode 的结果
                 */
                syncGet: async (
                    payload?: {
                        params: { task_id: string };
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
                                    task_id?: string;
                                    mode?: string;
                                    status?: string;
                                    created_at?: string;
                                    source?: {
                                        type: string;
                                        base_url?: string;
                                        table?: { name: string };
                                    };
                                    target?: {
                                        type: string;
                                        table: {
                                            name: string;
                                            action?: string;
                                            comment?: string;
                                        };
                                    };
                                    field_maps?: Array<{
                                        base_field: { name: string };
                                        pg_field: {
                                            name: string;
                                            type?: string;
                                            single_value?: boolean;
                                            nullable?: boolean;
                                            unique?: boolean;
                                            comment?: string;
                                        };
                                        option_mappings?: Array<{
                                            source: string;
                                            target: string;
                                        }>;
                                        enabled?: boolean;
                                    }>;
                                    schema_only?: boolean;
                                    statistics?: {
                                        total?: number;
                                        failed?: number;
                                    };
                                    warnings?: Array<{
                                        code: string;
                                        message: string;
                                        target_table?: string;
                                    }>;
                                    last_synced_at?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/sync_task`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=sync_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=sync_update&project=spark&resource=app.db&version=v1 document }
                 *
                 * 修改 streaming 任务的字段映射
                 */
                syncUpdate: async (
                    payload?: {
                        data: {
                            task_id: string;
                            config: {
                                mode: string;
                                schema_only?: boolean;
                                source: {
                                    type: string;
                                    base_url?: string;
                                    table?: { name: string };
                                };
                                target: {
                                    type: string;
                                    table: {
                                        name: string;
                                        action?: string;
                                        comment?: string;
                                    };
                                };
                                field_maps?: Array<{
                                    base_field: { name: string };
                                    pg_field: {
                                        name: string;
                                        type?: string;
                                        single_value?: boolean;
                                        nullable?: boolean;
                                        unique?: boolean;
                                        comment?: string;
                                    };
                                    option_mappings?: Array<{
                                        source: string;
                                        target: string;
                                    }>;
                                    enabled?: boolean;
                                }>;
                            };
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
                                    task_id?: string;
                                    mode?: string;
                                    status?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/sync_update`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=sync_disable&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=sync_disable&project=spark&resource=app.db&version=v1 document }
                 *
                 * 停用 streaming 任务，任务进入 disabled
                 */
                syncDisable: async (
                    payload?: {
                        data: { task_id: string };
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
                                    task_id?: string;
                                    mode?: string;
                                    status?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/sync_disable`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=data_export&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=data_export&project=spark&resource=app.db&version=v1 document }
                 *
                 * ## 功能介绍;导出指定应用数据库中指定表的数据，支持自定义导出格式和数据量上限，常用于数据备份、业务分析或系统迁移场景。;;### 前提条件;- 需拥有目标应用的数据库访问权限;- 目标表需存在且当前用户有读取权限;;### 注意事项;- 导出数据将以附件形式返回，大体积数据可能存在延迟;- 未指定格式时默认导出为 CSV 格式;- 未指定数据量上限时默认最多导出 5000 条记录
                 */
                dataExport: async (
                    payload?: {
                        params: {
                            env?: string;
                            table: string;
                            format?: string;
                            limit?: string;
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
                                    data: Buffer | fs.ReadStream;
                                    content_type: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/data_export`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=env_recovery_apply_status&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=env_recovery_apply_status&project=spark&resource=app.db&version=v1 document }
                 *
                 * ## 功能介绍;查询指定应用的数据库环境恢复申请状态，支持获取恢复进度、结果及预计完成时间，用于跟踪数据库恢复任务的执行情况。;;### 前提条件;- 已提交数据库环境恢复申请且申请处于处理流程中。;;### 注意事项;- 若恢复任务失败，`error_message` 字段将返回具体失败原因。
                 */
                envRecoveryApplyStatus: async (
                    payload?: {
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
                                    status: string;
                                    error_message?: string;
                                    restore_time_sec?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/env_recovery_apply_status`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=audit_config_update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=audit_config_update&project=spark&resource=app.db&version=v1 document }
                 *
                 * ## 功能介绍;更新指定应用数据库表的审计配置，支持开启/关闭审计功能及调整审计日志保留时长，用于满足数据合规审计需求。;;### 注意事项;- 开启审计后将自动记录该表的所有数据变更操作，会产生一定存储开销。;- 保留时长仅支持设置为合法的时间周期格式，如 "30d"（30天）、"90d"（90天）。
                 */
                auditConfigUpdate: async (
                    payload?: {
                        data: {
                            table: string;
                            enabled: boolean;
                            retention?: string;
                        };
                        params?: { env?: string };
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
                                    status: {
                                        table: string;
                                        enabled: boolean;
                                        enabled_at?: string;
                                        retention?: string;
                                    };
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/audit_set`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=data_import&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=data_import&project=spark&resource=app.db&version=v1 document }
                 *
                 * ## 功能介绍;批量导入结构化数据到指定应用的数据库表中，支持多种数据格式，适用于数据初始化、批量数据更新或系统间数据同步场景。;;### 前提条件;- 需提前在目标应用中创建对应的数据表结构。;- 导入的数据格式需与目标表的字段定义匹配。;;### 注意事项;- 导入操作为覆盖式写入，若目标表已有相同主键数据将被替换，请谨慎操作。;- 单次导入数据量不可超过 1000 条，超出部分将被截断。
                 */
                dataImport: async (
                    payload?: {
                        data: {
                            file_name: string;
                            file: Buffer | fs.ReadStream;
                        };
                        params: { env?: string; table: string };
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
                                data?: { table: string; rows: number };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/data_import`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=sync_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=sync_delete&project=spark&resource=app.db&version=v1 document }
                 *
                 * 停止并删除 streaming 任务
                 */
                syncDelete: async (
                    payload?: {
                        data: { task_id: string };
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
                                    task_id?: string;
                                    mode?: string;
                                    deleted?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/sync_del`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=audit_log_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=audit_log_list&project=spark&resource=app.db&version=v1 document }
                 *
                 * ## 功能介绍;查询指定应用数据库的操作审计日志，支持按环境、数据表、时间范围筛选，返回操作事件详情、分页信息及跳过的无效日志列表，用于数据安全审计、操作溯源及合规检查场景。;;### 注意事项;- 日志数据仅保留 90 天，超出时间范围的查询将返回空结果。;- 单次查询时间跨度不得超过 30 天，否则将自动截断为 30 天。
                 */
                auditLogList: async (
                    payload?: {
                        params: {
                            env?: string;
                            tables: string;
                            since?: string;
                            until?: string;
                            page_size?: string;
                            page_token?: string;
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
                                    items: Array<{
                                        event_id: string;
                                        event_time: string;
                                        target_table: string;
                                        type: string;
                                        operator: string;
                                        summary: string;
                                        before?: string;
                                        after?: string;
                                    }>;
                                    page_token?: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/audit_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=audit_status&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=audit_status&project=spark&resource=app.db&version=v1 document }
                 *
                 * ## 功能介绍;查询指定应用下数据库表的审计状态配置，包括审计开关状态、启用时间及数据保留周期，用于合规检查或审计策略管理场景。;;### 前提条件;- 操作员需拥有目标应用的数据库配置管理权限。;;### 注意事项;- 未指定表名时，将返回该应用下所有数据库表的审计状态。
                 */
                auditStatus: async (
                    payload?: {
                        params?: { env?: string; table?: string };
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
                                    items: Array<{
                                        table: string;
                                        enabled: boolean;
                                        enabled_at?: string;
                                        retention?: string;
                                    }>;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/audit_status`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=env_migrate_status&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=env_migrate_status&project=spark&resource=app.db&version=v1 document }
                 *
                 * ## 功能介绍;查询指定应用的环境迁移任务执行状态，支持获取任务当前进度、执行结果及变更生效数量，用于监控环境迁移流程的完成情况。;;### 前提条件;- 已调用环境迁移接口发起迁移任务，获取到有效的任务ID;- 调用者需拥有目标应用的环境管理权限;;### 注意事项;- 任务状态仅保留90天，超过期限的任务ID无法查询;- 迁移任务执行过程中，状态会实时更新，建议间隔30秒轮询查询
                 */
                envMigrateStatus: async (
                    payload?: {
                        params: { task_id: string };
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
                                    task_id: string;
                                    status: string;
                                    error_message?: string;
                                    changes_applied?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/env_migrate_status`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=sync_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=sync_create&project=spark&resource=app.db&version=v1 document }
                 *
                 * 根据 Base 表创建目标表、执行一次性数据导入，或创建自动同步配置
                 */
                syncCreate: async (
                    payload?: {
                        data: {
                            env?: string;
                            config: {
                                mode: string;
                                schema_only?: boolean;
                                source: {
                                    type: string;
                                    base_url?: string;
                                    table?: { name: string };
                                };
                                target: {
                                    type: string;
                                    table: {
                                        name: string;
                                        action?: string;
                                        comment?: string;
                                    };
                                };
                                field_maps?: Array<{
                                    base_field: { name: string };
                                    pg_field: {
                                        name: string;
                                        type?: string;
                                        single_value?: boolean;
                                        nullable?: boolean;
                                        unique?: boolean;
                                        comment?: string;
                                    };
                                    option_mappings?: Array<{
                                        source: string;
                                        target: string;
                                    }>;
                                    enabled?: boolean;
                                }>;
                            };
                            preview?: boolean;
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
                                    config?: {
                                        mode: string;
                                        schema_only?: boolean;
                                        source: {
                                            type: string;
                                            base_url?: string;
                                            table?: { name: string };
                                        };
                                        target: {
                                            type: string;
                                            table: {
                                                name: string;
                                                action?: string;
                                                comment?: string;
                                            };
                                        };
                                        field_maps?: Array<{
                                            base_field: { name: string };
                                            pg_field: {
                                                name: string;
                                                type?: string;
                                                single_value?: boolean;
                                                nullable?: boolean;
                                                unique?: boolean;
                                                comment?: string;
                                            };
                                            option_mappings?: Array<{
                                                source: string;
                                                target: string;
                                            }>;
                                            enabled?: boolean;
                                        }>;
                                    };
                                    syncable_source_fields?: Array<string>;
                                    summary?: {
                                        syncable_source_field_count: number;
                                        mapped_field_count?: number;
                                        estimated_record_count?: number;
                                    };
                                    task_id?: string;
                                    mode?: string;
                                    schema_only?: boolean;
                                    status?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/sync_create`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=sync_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=sync_list&project=spark&resource=app.db&version=v1 document }
                 *
                 * 列出应用下保留的 batch 和 streaming 任务。结果默认按 created_at 倒序排列
                 */
                syncList: async (
                    payload?: {
                        params?: {
                            env?: string;
                            mode?: string;
                            status?: string;
                            table?: string;
                            page_size?: number;
                            page_token?: string;
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
                                    items?: Array<{
                                        task_id: string;
                                        mode?: string;
                                        schema_only?: boolean;
                                        status?: string;
                                        created_at?: string;
                                        source?: {
                                            type: string;
                                            base_url?: string;
                                            table?: { name: string };
                                        };
                                        target?: {
                                            type: string;
                                            table: {
                                                name: string;
                                                action?: string;
                                                comment?: string;
                                            };
                                        };
                                    }>;
                                    page_token?: string;
                                    has_more?: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/sync_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=changelog_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=changelog_list&project=spark&resource=app.db&version=v1 document }
                 *
                 * ## 功能介绍;查询指定应用数据库的变更日志列表，支持按环境、数据表、时间范围等维度筛选，用于追踪数据库结构或数据的变更历史，适用于合规审计、问题排查等场景。;;### 前提条件;- 需拥有目标应用的数据库访问权限;;### 注意事项;- 默认返回最近30天的变更记录，超出范围需指定`since`和`until`参数;- 单次查询最大返回100条记录，超出需通过分页参数获取后续数据
                 */
                changelogList: async (
                    payload?: {
                        params?: {
                            env?: string;
                            table?: string;
                            change_id?: string;
                            since?: string;
                            until?: string;
                            page_size?: string;
                            page_token?: string;
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
                                    items: Array<{
                                        change_id: string;
                                        changed_at: string;
                                        operator: string;
                                        target_table: string;
                                        change_type: string;
                                        summary: string;
                                        statement: string;
                                    }>;
                                    page_token?: string;
                                    has_more: boolean;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/changelog_list`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.db&apiName=sync_enable&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=sync_enable&project=spark&resource=app.db&version=v1 document }
                 *
                 * 启用 disabled 的 streaming 任务。
                 */
                syncEnable: async (
                    payload?: {
                        data: { task_id: string };
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
                                    task_id?: string;
                                    mode?: string;
                                    status?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/db/sync_enable`,
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
             * app.cache
             */
            appCache: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.cache&apiName=cache_delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cache_delete&project=spark&resource=app.cache&version=v1 document }
                 *
                 * ## 功能介绍;删除指定应用缓存中的单条或多条键值对，用于清理过期或无效的缓存数据，释放存储资源。;;### 注意事项;- 缓存删除操作不可逆，删除后对应键值对将永久失效。;- 若指定的缓存键不存在，接口将返回成功但不会产生实际删除效果。
                 */
                cacheDelete: async (
                    payload?: {
                        params: { env?: string; key: string };
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
                                    env: string;
                                    deleted_key_count: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/cache`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.cache&apiName=cache_get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cache_get&project=spark&resource=app.cache&version=v1 document }
                 *
                 * ## 功能介绍;获取应用缓存中指定键的存储内容，支持查询不同环境下的缓存数据，常用于应用运行时的临时数据读取场景。;;### 注意事项;- 仅能查询当前应用有权限访问的缓存数据。
                 */
                cacheGet: async (
                    payload?: {
                        params: { env?: string; key: string };
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
                                    env: string;
                                    exists: boolean;
                                    ttl_ms?: number;
                                    value?: string;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/cache`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.cache&apiName=cache_set&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cache_set&project=spark&resource=app.cache&version=v1 document }
                 *
                 * ## 功能介绍;将指定键值对存储至应用缓存，支持设置数据过期时间，常用于临时数据的快速存取场景，如会话信息、临时配置等。;;### 注意事项;- 缓存数据的实际存储时长可能受系统策略影响，与设置的过期时间存在毫秒级误差。;- 若未设置过期时间，缓存数据将永久存储，直至手动删除或系统清理。
                 */
                cacheSet: async (
                    payload?: {
                        data: {
                            env?: string;
                            key: string;
                            value: string;
                            ttl_ms?: number;
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
                                data?: { env: string };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/cache`,
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
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.cache&apiName=cache_clear&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=cache_clear&project=spark&resource=app.cache&version=v1 document }
                 *
                 * ## 功能介绍;清除指定应用下的缓存数据，支持按环境维度清理，常用于应用配置更新后刷新缓存场景。;;### 注意事项;- 缓存清除操作不可逆，执行后无法恢复已删除的缓存数据。;- 仅支持清除当前应用维度下的缓存，跨应用缓存需单独调用对应接口。
                 */
                cacheClear: async (
                    payload?: {
                        data?: { env?: string };
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
                                    env: string;
                                    deleted_key_count: number;
                                };
                            }
                        >({
                            url: fillApiPath(
                                `${this.domain}/open-apis/spark/v1/apps/:app_id/cache/clear`,
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
             * app.enum
             */
            appEnum: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.enum&apiName=get_enum_list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_enum_list&project=spark&resource=app.enum&version=v1 document }
                 *
                 * 获取自定义枚举列表
                 *
                 * 获取应用下的自定义枚举列表，包括枚举名称、描述、枚举值列表等字段信息。
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=spark&resource=app.enum&apiName=get_enum_detail&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get_enum_detail&project=spark&resource=app.enum&version=v1 document }
                 *
                 * 获取自定义枚举详细信息
                 *
                 * 获取应用下的自定义枚举详细信息，包括枚举名称、描述、枚举值列表等字段信息。
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
                 *
                 * 查询应用下的视图数据记录，包括指定列、字段值及分页信息，适用于需要获取应用下某视图数据的记录、展示等场景。
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
        },
    };
}
