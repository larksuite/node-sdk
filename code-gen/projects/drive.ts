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
     * 云文档-文件管理
     */
    drive = {
        /**
         * 导出
         */
        exportTask: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=export_task&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/create document }
             *
             * 创建导出任务
             *
             * 创建导出任务，将云文件导出为指定格式的本地文件。该接口为异步接口，需要通过轮询 [查询导出任务结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/get) 接口获取任务结果。
             */
            create: async (
                payload?: {
                    data: {
                        file_extension: "docx" | "pdf" | "xlsx" | "csv";
                        token: string;
                        type: "doc" | "sheet" | "bitable" | "docx";
                        sub_id?: string;
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=export_task&apiName=download&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/download document }
             *
             * 下载导出文件
             *
             * 根据任务导出结果的token，下载导出文件
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/get document }
             *
             * 查询导出任务结果
             *
             * 根据[创建导出任务](/ssl::ttdoc//uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/create)的ticket查询导出任务的结果，前提条件需要先调用创建导出任务接口。;;通过该接口获取到下载文件的 token 后调用[下载导出文件接口](/ssl::ttdoc//uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/download)将文件进行下载
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
                                        | "csv";
                                    type: "doc" | "sheet" | "bitable" | "docx";
                                    file_name?: string;
                                    file_token?: string;
                                    file_size?: number;
                                    job_error_msg?: string;
                                    job_status?: number;
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
        },
        /**
         * 评论
         */
        fileComment: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=batch_query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/batch_query document }
             *
             * 批量获取评论
             *
             * 该接口用于根据评论 ID 列表批量获取评论。
             */
            batchQuery: async (
                payload?: {
                    data: { comment_ids: Array<string> };
                    params: {
                        file_type: "doc" | "docx" | "sheet" | "file" | "slides";
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/create document }
             *
             * 添加评论
             *
             * 往云文档添加一条全局评论。
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/get document }
             *
             * 获取评论
             *
             * 获取云文档中的某条评论。
             */
            get: async (
                payload?: {
                    params: {
                        file_type: "doc" | "sheet" | "file" | "docx";
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
            listWithIterator: async (
                payload?: {
                    params: {
                        file_type: "doc" | "docx" | "sheet" | "file" | "slides";
                        is_whole?: boolean;
                        is_solved?: boolean;
                        page_token?: string;
                        page_size?: number;
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/list document }
             *
             * 分页获取文档评论
             *
             * 该接口用于根据文档 token 分页获取文档评论。
             */
            list: async (
                payload?: {
                    params: {
                        file_type: "doc" | "docx" | "sheet" | "file" | "slides";
                        is_whole?: boolean;
                        is_solved?: boolean;
                        page_token?: string;
                        page_size?: number;
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/patch document }
             *
             * 解决/恢复 评论
             *
             * 解决或恢复云文档中的评论。
             */
            patch: async (
                payload?: {
                    data: { is_solved: boolean };
                    params: {
                        file_type: "doc" | "docx" | "sheet" | "file" | "slides";
                    };
                    path: { file_token: string; comment_id: string };
                },
                options?: IRequestOptions
            ) => {
                const { headers, params, data, path } =
                    await this.formatPayload(payload, options);

                return this.httpInstance
                    .request<any, { code?: number; msg?: string; data?: {} }>({
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
        },
        /**
         * 评论
         */
        fileCommentReply: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment.reply&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/delete document }
             *
             * 删除回复
             *
             * 删除云文档中的某条回复。
             */
            delete: async (
                payload?: {
                    params: {
                        file_type: "doc" | "docx" | "sheet" | "file" | "slides";
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
                    .request<any, { code?: number; msg?: string; data?: {} }>({
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
            listWithIterator: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        file_type: "doc" | "docx" | "sheet" | "file" | "slides";
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/list document }
             *
             * 获取回复
             *
             * 该接口用于根据评论 ID 以及分页参数，获取回复。
             */
            list: async (
                payload?: {
                    params: {
                        page_size?: number;
                        page_token?: string;
                        file_type: "doc" | "docx" | "sheet" | "file" | "slides";
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment.reply&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/update document }
             *
             * 更新回复
             *
             * 更新云文档中的某条回复。
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
                        file_type: "doc" | "docx" | "sheet" | "file" | "slides";
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
                    .request<any, { code?: number; msg?: string; data?: {} }>({
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
        },
        /**
         * 文件夹
         */
        file: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=copy&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/copy document }
             *
             * 复制文件
             *
             * 将文件复制到用户云空间的其他文件夹中。不支持复制文件夹。;;如果目标文件夹是我的空间，则复制的文件会在「**我的空间**」的「**归我所有**」列表里。
             *
             * 该接口不支持并发拷贝多个文件，且调用频率上限为 5QPS 且 10000次/天
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=create_folder&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/create_folder document }
             *
             * 新建文件夹
             *
             * 在用户云空间的指定文件夹中创建一个新的空文件夹。
             *
             * 该接口不支持并发创建，且调用频率上限为 5QPS 以及 10000次/天
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=create_shortcut&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_shortcut&project=drive&resource=file&version=v1 document }
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/delete document }
             *
             * 删除文件
             *
             * 删除用户在云空间内的文件或者文件夹。文件或者文件夹被删除后，会进入用户回收站里。
             *
             * 该接口不支持并发调用，且调用频率上限为5QPS。删除文件夹会异步执行并返回一个task_id，可以使用[task_check](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/task_check)接口查询任务执行状态。
             *
             * 要删除文件需要确保应用具有下述两种权限之一：;1. 该应用是文件所有者并且具有该文件所在父文件夹的编辑权限。;2. 该应用并非文件所有者，但是是该文件所在父文件夹的所有者或者拥有该父文件夹的所有权限（full access）。
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=delete_subscribe&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/delete_subscribe document }
             *
             * 取消云文档事件订阅情况
             *
             * 该接口**仅支持文档拥有者**取消订阅自己文档的通知事件，可订阅的文档类型为**旧版文档**、**新版文档**、**电子表格**和**多维表格**。在调用该接口之前请确保正确[配置事件回调网址和订阅事件类型](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM#2eb3504a)，事件类型参考[事件列表](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-list)。
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
                    .request<any, { code?: number; msg?: string; data?: {} }>({
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=download&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/download document }
             *
             * 下载文件
             *
             * 使用该接口可以下载在云空间目录下的文件（不含飞书文档/表格/思维导图等在线文档）。支持range下载。
             *
             * 该接口支持调用频率上限为5QPS
             */
            download: async (
                payload?: {
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=get_subscribe&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/get_subscribe document }
             *
             * 查询云文档事件订阅状态
             *
             * 该接口**仅支持文档拥有者**查询自己文档的订阅状态，可订阅的文档类型为**旧版文档**、**新版文档**、**电子表格**和**多维表格**。在调用该接口之前请确保正确[配置事件回调网址和订阅事件类型](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM#2eb3504a)，事件类型参考[事件列表](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-list)。
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/list document }
             *
             * 获取文件夹下的清单
             *
             * 获取用户云空间中指定文件夹下的文件清单。清单类型包括文件、各种在线文档（文档、电子表格、多维表格、思维笔记）、文件夹和快捷方式。该接口支持分页，但是不会递归的获取子文件夹的清单。
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=move&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/move document }
             *
             * 移动文件
             *
             * 将文件或者文件夹移动到用户云空间的其他位置。
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=subscribe&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/subscribe document }
             *
             * 订阅云文档事件
             *
             * 该接口仅支持**文档拥有者**订阅自己文档的通知事件，可订阅的文档类型为**旧版文档**、**新版文档**、**电子表格**和**多维表格**。在调用该接口之前请确保正确[配置事件回调网址和订阅事件类型](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM#2eb3504a)(暂不支持单独订阅文档维度的某类事件)，事件类型参考[事件列表](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-list)。
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=task_check&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/task_check document }
             *
             * 查询异步任务状态
             *
             * 查询删除文件夹等异步任务的状态信息。
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_all&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_all document }
             *
             * 上传文件
             *
             * 向云空间指定目录下上传一个小文件。
             *
             * 该接口支持调用频率上限为5QPS
             *
             * 请不要使用这个接口上传大于20MB的文件，如果有这个需求可以尝试使用[分片上传接口](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/multipart-upload-file-/introduction)。
             */
            uploadAll: async (
                payload?: {
                    data: {
                        file_name: string;
                        parent_type: "explorer";
                        parent_node: string;
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
                        {
                            code?: number;
                            msg?: string;
                            data?: { file_token?: string };
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_finish&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_finish document }
             *
             * 分片上传文件（完成上传）
             *
             * 触发完成上传。
             *
             * 该接口不支持太高的并发，且调用频率上限为5QPS
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_part&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_part document }
             *
             * 分片上传文件（上传分片）
             *
             * 上传对应的文件块。
             *
             * 该接口不支持太高的并发，且调用频率上限为5QPS
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_prepare&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_prepare document }
             *
             * 分片上传文件（预上传）
             *
             * 发送初始化请求获取上传事务ID和分块策略，目前是以4MB大小进行定长分片。
             *
             * 该接口不支持太高的并发，且调用频率上限为5QPS
             *
             * 你在24小时内可保存上传事务ID和上传进度，以便可以恢复上传
             */
            uploadPrepare: async (
                payload?: {
                    data: {
                        file_name: string;
                        parent_type: "explorer";
                        parent_node: string;
                        size: number;
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
        },
        /**
         * file.statistics
         */
        fileStatistics: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.statistics&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-statistics/get document }
             *
             * 获取文件统计信息
             *
             * 此接口用于获取文件统计信息，包括文档阅读人数、次数和点赞数。
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
         * 订阅
         */
        fileSubscription: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.subscription&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/create document }
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.subscription&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/get document }
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.subscription&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/patch document }
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
        },
        /**
         * 文档版本
         */
        fileVersion: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.version&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/create document }
             *
             * 创建文档版本
             *
             * 创建文档版本。
             */
            create: async (
                payload?: {
                    data?: { name?: string; obj_type?: "docx" | "sheet" };
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/delete document }
             *
             * 删除文档版本
             *
             * 删除文档版本。
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.version&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/get document }
             *
             * 获取文档版本
             *
             * 获取文档版本。
             */
            get: async (
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/list document }
             *
             * 获取文档版本列表
             *
             * 获取文档所有版本。
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
         * 导入
         */
        importTask: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=import_task&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/create document }
             *
             * 创建导入任务
             *
             * 创建导入任务。支持导入为 doc、docx、sheet、bitable，参考[导入用户指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/import-user-guide)
             */
            create: async (
                payload?: {
                    data: {
                        file_extension: string;
                        file_token: string;
                        type: string;
                        file_name?: string;
                        point: { mount_type: number; mount_key: string };
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=import_task&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/get document }
             *
             * 查询导入结果
             *
             * 根据创建导入任务返回的 ticket 查询导入结果。
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
        },
        /**
         * 素材
         */
        media: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=batch_get_tmp_download_url&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/batch_get_tmp_download_url document }
             *
             * 获取素材临时下载链接
             *
             * 通过file_token获取素材临时下载链接，链接时效性是24小时，过期失效。
             *
             * 该接口不支持太高的并发，且调用频率上限为5QPS
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
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/download document }
             *
             * 下载素材
             *
             * 使用该接口可以下载素材。素材表示在各种创作容器里的文件，如Doc文档内的图片，文件均属于素材。支持range下载。
             *
             * 该接口不支持太高的并发，且调用频率上限为5QPS
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_all&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_all document }
             *
             * 上传素材
             *
             * 将文件、图片、视频等素材文件上传到指定云文档中。素材文件在云空间中不会显示，只会显示在对应云文档中。
             *
             * 该接口支持调用频率上限为5QPS
             *
             * 请不要使用这个接口上传大于20MB的文件，如果有这个需求可以尝试使用[分片上传接口](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/multipart-upload-media/introduction)。
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
                            | "lark_ai_media_analysis";
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_finish&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_finish document }
             *
             * 分片上传素材（完成上传）
             *
             * 触发完成上传。
             *
             * 该接口不支持太高的并发，且调用频率上限为5QPS
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_part&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_part document }
             *
             * 分片上传素材（上传分片）
             *
             * 上传对应的文件块。
             *
             * 该接口不支持太高的并发，且调用频率上限为5QPS
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_prepare&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_prepare document }
             *
             * 分片上传素材（预上传）
             *
             * 发送初始化请求获取上传事务ID和分块策略，目前是以4MB大小进行定长分片。
             *
             * 该接口不支持太高的并发，且调用频率上限为5QPS
             *
             * 您在24小时内可保存上传事务ID和上传进度，以便可以恢复上传
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
                            | "lark_ai_media_analysis";
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
         * meta
         */
        meta: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=meta&apiName=batch_query&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/meta/batch_query document }
             *
             * 获取文档元数据
             *
             * 该接口用于根据 token 获取各类文件的元数据
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
         * 成员
         */
        permissionMember: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=auth&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=auth&project=drive&resource=permission.member&version=v1 document }
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
                            | "slides";
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=batch_create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=drive&resource=permission.member&version=v1 document }
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
                                | "wikispaceid";
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
                            | "slides";
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
                                        | "wikispaceid";
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/create document }
             *
             * 增加协作者权限
             *
             * 该接口用于根据 filetoken 给用户增加文档的权限。
             */
            create: async (
                payload?: {
                    data: {
                        member_type:
                            | "email"
                            | "openid"
                            | "unionid"
                            | "openchat"
                            | "opendepartmentid"
                            | "userid"
                            | "groupid"
                            | "wikispaceid";
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
                            | "slides";
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
                                        | "wikispaceid";
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/delete document }
             *
             * 移除协作者权限
             *
             * 该接口用于根据 filetoken 移除文档协作者的权限。
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
                            | "wiki_space_editor";
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
                            | "slides";
                        member_type:
                            | "email"
                            | "openid"
                            | "openchat"
                            | "opendepartmentid"
                            | "userid"
                            | "unionid"
                            | "groupid"
                            | "wikispaceid";
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=list&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/list document }
             *
             * 获取协作者列表
             *
             * 该接口用于根据 filetoken 查询协作者
             *
             * - 你能获取到协作者列表的前提是你对该文档有分享权限;- 目前仅支持人、群、组织架构三种类型的协作者
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
                            | "slides";
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
                                        | "wikispaceid";
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=transfer_owner&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=transfer_owner&project=drive&resource=permission.member&version=v1 document }
             */
            transferOwner: async (
                payload?: {
                    data: {
                        member_type: "email" | "openid" | "userid";
                        member_id: string;
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
                            | "folder";
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/update document }
             *
             * 更新协作者权限
             *
             * 该接口用于根据 filetoken 更新文档协作者的权限。
             *
             * 该接口要求文档协作者已存在，如还未对文档协作者授权请先调用[「增加权限」 ](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/create)接口进行授权。
             */
            update: async (
                payload?: {
                    data: {
                        member_type:
                            | "email"
                            | "openid"
                            | "unionid"
                            | "openchat"
                            | "opendepartmentid"
                            | "userid"
                            | "groupid"
                            | "wikispaceid";
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
                            | "slides";
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
                                        | "wikispaceid";
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
        },
        /**
         * 设置
         */
        permissionPublic: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public&apiName=get&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public/get document }
             *
             * 获取云文档权限设置
             *
             * 该接口用于根据 filetoken 获取云文档的权限设置。
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public&apiName=patch&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public/patch document }
             *
             * 更新云文档权限设置
             *
             * 该接口用于根据 filetoken 更新云文档的权限设置。
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
        },
        /**
         * permission.public.password
         */
        permissionPublicPassword: {
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public.password&apiName=create&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=permission.public.password&version=v1 document }
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
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public.password&apiName=delete&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=drive&resource=permission.public.password&version=v1 document }
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
            /**
             * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public.password&apiName=update&version=v1 click to debug }
             *
             * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=drive&resource=permission.public.password&version=v1 document }
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
        },
        v1: {
            /**
             * 导出
             */
            exportTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=export_task&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/create document }
                 *
                 * 创建导出任务
                 *
                 * 创建导出任务，将云文件导出为指定格式的本地文件。该接口为异步接口，需要通过轮询 [查询导出任务结果](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/get) 接口获取任务结果。
                 */
                create: async (
                    payload?: {
                        data: {
                            file_extension: "docx" | "pdf" | "xlsx" | "csv";
                            token: string;
                            type: "doc" | "sheet" | "bitable" | "docx";
                            sub_id?: string;
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=export_task&apiName=download&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/download document }
                 *
                 * 下载导出文件
                 *
                 * 根据任务导出结果的token，下载导出文件
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/get document }
                 *
                 * 查询导出任务结果
                 *
                 * 根据[创建导出任务](/ssl::ttdoc//uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/create)的ticket查询导出任务的结果，前提条件需要先调用创建导出任务接口。;;通过该接口获取到下载文件的 token 后调用[下载导出文件接口](/ssl::ttdoc//uAjLw4CM/ukTMukTMukTM/reference/drive-v1/export_task/download)将文件进行下载
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
                                            | "csv";
                                        type:
                                            | "doc"
                                            | "sheet"
                                            | "bitable"
                                            | "docx";
                                        file_name?: string;
                                        file_token?: string;
                                        file_size?: number;
                                        job_error_msg?: string;
                                        job_status?: number;
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
            },
            /**
             * 评论
             */
            fileComment: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=batch_query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/batch_query document }
                 *
                 * 批量获取评论
                 *
                 * 该接口用于根据评论 ID 列表批量获取评论。
                 */
                batchQuery: async (
                    payload?: {
                        data: { comment_ids: Array<string> };
                        params: {
                            file_type:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "file"
                                | "slides";
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/create document }
                 *
                 * 添加评论
                 *
                 * 往云文档添加一条全局评论。
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/get document }
                 *
                 * 获取评论
                 *
                 * 获取云文档中的某条评论。
                 */
                get: async (
                    payload?: {
                        params: {
                            file_type: "doc" | "sheet" | "file" | "docx";
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
                listWithIterator: async (
                    payload?: {
                        params: {
                            file_type:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "file"
                                | "slides";
                            is_whole?: boolean;
                            is_solved?: boolean;
                            page_token?: string;
                            page_size?: number;
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/list document }
                 *
                 * 分页获取文档评论
                 *
                 * 该接口用于根据文档 token 分页获取文档评论。
                 */
                list: async (
                    payload?: {
                        params: {
                            file_type:
                                | "doc"
                                | "docx"
                                | "sheet"
                                | "file"
                                | "slides";
                            is_whole?: boolean;
                            is_solved?: boolean;
                            page_token?: string;
                            page_size?: number;
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment/patch document }
                 *
                 * 解决/恢复 评论
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
                                | "slides";
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
                            { code?: number; msg?: string; data?: {} }
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
            },
            /**
             * 评论
             */
            fileCommentReply: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment.reply&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/delete document }
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
                                | "slides";
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
                            { code?: number; msg?: string; data?: {} }
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
                                | "slides";
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/list document }
                 *
                 * 获取回复
                 *
                 * 该接口用于根据评论 ID 以及分页参数，获取回复。
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
                                | "slides";
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.comment.reply&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-comment-reply/update document }
                 *
                 * 更新回复
                 *
                 * 更新云文档中的某条回复。
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
                                | "slides";
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
                            { code?: number; msg?: string; data?: {} }
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
            },
            /**
             * 文件夹
             */
            file: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=copy&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/copy document }
                 *
                 * 复制文件
                 *
                 * 将文件复制到用户云空间的其他文件夹中。不支持复制文件夹。;;如果目标文件夹是我的空间，则复制的文件会在「**我的空间**」的「**归我所有**」列表里。
                 *
                 * 该接口不支持并发拷贝多个文件，且调用频率上限为 5QPS 且 10000次/天
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=create_folder&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/create_folder document }
                 *
                 * 新建文件夹
                 *
                 * 在用户云空间的指定文件夹中创建一个新的空文件夹。
                 *
                 * 该接口不支持并发创建，且调用频率上限为 5QPS 以及 10000次/天
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=create_shortcut&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create_shortcut&project=drive&resource=file&version=v1 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/delete document }
                 *
                 * 删除文件
                 *
                 * 删除用户在云空间内的文件或者文件夹。文件或者文件夹被删除后，会进入用户回收站里。
                 *
                 * 该接口不支持并发调用，且调用频率上限为5QPS。删除文件夹会异步执行并返回一个task_id，可以使用[task_check](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/task_check)接口查询任务执行状态。
                 *
                 * 要删除文件需要确保应用具有下述两种权限之一：;1. 该应用是文件所有者并且具有该文件所在父文件夹的编辑权限。;2. 该应用并非文件所有者，但是是该文件所在父文件夹的所有者或者拥有该父文件夹的所有权限（full access）。
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=delete_subscribe&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/delete_subscribe document }
                 *
                 * 取消云文档事件订阅情况
                 *
                 * 该接口**仅支持文档拥有者**取消订阅自己文档的通知事件，可订阅的文档类型为**旧版文档**、**新版文档**、**电子表格**和**多维表格**。在调用该接口之前请确保正确[配置事件回调网址和订阅事件类型](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM#2eb3504a)，事件类型参考[事件列表](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-list)。
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
                            { code?: number; msg?: string; data?: {} }
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=download&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/download document }
                 *
                 * 下载文件
                 *
                 * 使用该接口可以下载在云空间目录下的文件（不含飞书文档/表格/思维导图等在线文档）。支持range下载。
                 *
                 * 该接口支持调用频率上限为5QPS
                 */
                download: async (
                    payload?: {
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=get_subscribe&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/get_subscribe document }
                 *
                 * 查询云文档事件订阅状态
                 *
                 * 该接口**仅支持文档拥有者**查询自己文档的订阅状态，可订阅的文档类型为**旧版文档**、**新版文档**、**电子表格**和**多维表格**。在调用该接口之前请确保正确[配置事件回调网址和订阅事件类型](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM#2eb3504a)，事件类型参考[事件列表](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-list)。
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/list document }
                 *
                 * 获取文件夹下的清单
                 *
                 * 获取用户云空间中指定文件夹下的文件清单。清单类型包括文件、各种在线文档（文档、电子表格、多维表格、思维笔记）、文件夹和快捷方式。该接口支持分页，但是不会递归的获取子文件夹的清单。
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=move&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/move document }
                 *
                 * 移动文件
                 *
                 * 将文件或者文件夹移动到用户云空间的其他位置。
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=subscribe&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/subscribe document }
                 *
                 * 订阅云文档事件
                 *
                 * 该接口仅支持**文档拥有者**订阅自己文档的通知事件，可订阅的文档类型为**旧版文档**、**新版文档**、**电子表格**和**多维表格**。在调用该接口之前请确保正确[配置事件回调网址和订阅事件类型](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM#2eb3504a)(暂不支持单独订阅文档维度的某类事件)，事件类型参考[事件列表](https://open.feishu.cn/document/ukTMukTMukTM/uYDNxYjL2QTM24iN0EjN/event-list)。
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=task_check&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/task_check document }
                 *
                 * 查询异步任务状态
                 *
                 * 查询删除文件夹等异步任务的状态信息。
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_all&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_all document }
                 *
                 * 上传文件
                 *
                 * 向云空间指定目录下上传一个小文件。
                 *
                 * 该接口支持调用频率上限为5QPS
                 *
                 * 请不要使用这个接口上传大于20MB的文件，如果有这个需求可以尝试使用[分片上传接口](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/multipart-upload-file-/introduction)。
                 */
                uploadAll: async (
                    payload?: {
                        data: {
                            file_name: string;
                            parent_type: "explorer";
                            parent_node: string;
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
                            {
                                code?: number;
                                msg?: string;
                                data?: { file_token?: string };
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_finish&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_finish document }
                 *
                 * 分片上传文件（完成上传）
                 *
                 * 触发完成上传。
                 *
                 * 该接口不支持太高的并发，且调用频率上限为5QPS
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_part&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_part document }
                 *
                 * 分片上传文件（上传分片）
                 *
                 * 上传对应的文件块。
                 *
                 * 该接口不支持太高的并发，且调用频率上限为5QPS
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file&apiName=upload_prepare&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file/upload_prepare document }
                 *
                 * 分片上传文件（预上传）
                 *
                 * 发送初始化请求获取上传事务ID和分块策略，目前是以4MB大小进行定长分片。
                 *
                 * 该接口不支持太高的并发，且调用频率上限为5QPS
                 *
                 * 你在24小时内可保存上传事务ID和上传进度，以便可以恢复上传
                 */
                uploadPrepare: async (
                    payload?: {
                        data: {
                            file_name: string;
                            parent_type: "explorer";
                            parent_node: string;
                            size: number;
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
            },
            /**
             * file.statistics
             */
            fileStatistics: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.statistics&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-statistics/get document }
                 *
                 * 获取文件统计信息
                 *
                 * 此接口用于获取文件统计信息，包括文档阅读人数、次数和点赞数。
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
             * 订阅
             */
            fileSubscription: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.subscription&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/create document }
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.subscription&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/get document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.subscription&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-subscription/patch document }
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
            },
            /**
             * 文档版本
             */
            fileVersion: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.version&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/create document }
                 *
                 * 创建文档版本
                 *
                 * 创建文档版本。
                 */
                create: async (
                    payload?: {
                        data?: { name?: string; obj_type?: "docx" | "sheet" };
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/delete document }
                 *
                 * 删除文档版本
                 *
                 * 删除文档版本。
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=file.version&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/get document }
                 *
                 * 获取文档版本
                 *
                 * 获取文档版本。
                 */
                get: async (
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/file-version/list document }
                 *
                 * 获取文档版本列表
                 *
                 * 获取文档所有版本。
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
             * 导入
             */
            importTask: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=import_task&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/create document }
                 *
                 * 创建导入任务
                 *
                 * 创建导入任务。支持导入为 doc、docx、sheet、bitable，参考[导入用户指南](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/import-user-guide)
                 */
                create: async (
                    payload?: {
                        data: {
                            file_extension: string;
                            file_token: string;
                            type: string;
                            file_name?: string;
                            point: { mount_type: number; mount_key: string };
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=import_task&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/import_task/get document }
                 *
                 * 查询导入结果
                 *
                 * 根据创建导入任务返回的 ticket 查询导入结果。
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
            },
            /**
             * 素材
             */
            media: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=batch_get_tmp_download_url&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/batch_get_tmp_download_url document }
                 *
                 * 获取素材临时下载链接
                 *
                 * 通过file_token获取素材临时下载链接，链接时效性是24小时，过期失效。
                 *
                 * 该接口不支持太高的并发，且调用频率上限为5QPS
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
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/download document }
                 *
                 * 下载素材
                 *
                 * 使用该接口可以下载素材。素材表示在各种创作容器里的文件，如Doc文档内的图片，文件均属于素材。支持range下载。
                 *
                 * 该接口不支持太高的并发，且调用频率上限为5QPS
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_all&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_all document }
                 *
                 * 上传素材
                 *
                 * 将文件、图片、视频等素材文件上传到指定云文档中。素材文件在云空间中不会显示，只会显示在对应云文档中。
                 *
                 * 该接口支持调用频率上限为5QPS
                 *
                 * 请不要使用这个接口上传大于20MB的文件，如果有这个需求可以尝试使用[分片上传接口](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/multipart-upload-media/introduction)。
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
                                | "lark_ai_media_analysis";
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_finish&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_finish document }
                 *
                 * 分片上传素材（完成上传）
                 *
                 * 触发完成上传。
                 *
                 * 该接口不支持太高的并发，且调用频率上限为5QPS
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_part&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_part document }
                 *
                 * 分片上传素材（上传分片）
                 *
                 * 上传对应的文件块。
                 *
                 * 该接口不支持太高的并发，且调用频率上限为5QPS
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=media&apiName=upload_prepare&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/media/upload_prepare document }
                 *
                 * 分片上传素材（预上传）
                 *
                 * 发送初始化请求获取上传事务ID和分块策略，目前是以4MB大小进行定长分片。
                 *
                 * 该接口不支持太高的并发，且调用频率上限为5QPS
                 *
                 * 您在24小时内可保存上传事务ID和上传进度，以便可以恢复上传
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
                                | "lark_ai_media_analysis";
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
             * meta
             */
            meta: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=meta&apiName=batch_query&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/meta/batch_query document }
                 *
                 * 获取文档元数据
                 *
                 * 该接口用于根据 token 获取各类文件的元数据
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
             * 成员
             */
            permissionMember: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=auth&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=auth&project=drive&resource=permission.member&version=v1 document }
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
                                | "slides";
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=batch_create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=batch_create&project=drive&resource=permission.member&version=v1 document }
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
                                    | "wikispaceid";
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
                                | "slides";
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
                                            | "wikispaceid";
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/create document }
                 *
                 * 增加协作者权限
                 *
                 * 该接口用于根据 filetoken 给用户增加文档的权限。
                 */
                create: async (
                    payload?: {
                        data: {
                            member_type:
                                | "email"
                                | "openid"
                                | "unionid"
                                | "openchat"
                                | "opendepartmentid"
                                | "userid"
                                | "groupid"
                                | "wikispaceid";
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
                                | "slides";
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
                                            | "wikispaceid";
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/delete document }
                 *
                 * 移除协作者权限
                 *
                 * 该接口用于根据 filetoken 移除文档协作者的权限。
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
                                | "wiki_space_editor";
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
                                | "slides";
                            member_type:
                                | "email"
                                | "openid"
                                | "openchat"
                                | "opendepartmentid"
                                | "userid"
                                | "unionid"
                                | "groupid"
                                | "wikispaceid";
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=list&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/list document }
                 *
                 * 获取协作者列表
                 *
                 * 该接口用于根据 filetoken 查询协作者
                 *
                 * - 你能获取到协作者列表的前提是你对该文档有分享权限;- 目前仅支持人、群、组织架构三种类型的协作者
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
                                | "slides";
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
                                            | "wikispaceid";
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=transfer_owner&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=transfer_owner&project=drive&resource=permission.member&version=v1 document }
                 */
                transferOwner: async (
                    payload?: {
                        data: {
                            member_type: "email" | "openid" | "userid";
                            member_id: string;
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
                                | "folder";
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.member&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/update document }
                 *
                 * 更新协作者权限
                 *
                 * 该接口用于根据 filetoken 更新文档协作者的权限。
                 *
                 * 该接口要求文档协作者已存在，如还未对文档协作者授权请先调用[「增加权限」 ](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-member/create)接口进行授权。
                 */
                update: async (
                    payload?: {
                        data: {
                            member_type:
                                | "email"
                                | "openid"
                                | "unionid"
                                | "openchat"
                                | "opendepartmentid"
                                | "userid"
                                | "groupid"
                                | "wikispaceid";
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
                                | "slides";
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
                                            | "wikispaceid";
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
            },
            /**
             * 设置
             */
            permissionPublic: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public&apiName=get&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public/get document }
                 *
                 * 获取云文档权限设置
                 *
                 * 该接口用于根据 filetoken 获取云文档的权限设置。
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public&apiName=patch&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/drive-v1/permission-public/patch document }
                 *
                 * 更新云文档权限设置
                 *
                 * 该接口用于根据 filetoken 更新云文档的权限设置。
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
            },
            /**
             * permission.public.password
             */
            permissionPublicPassword: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public.password&apiName=create&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=create&project=drive&resource=permission.public.password&version=v1 document }
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
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public.password&apiName=delete&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=delete&project=drive&resource=permission.public.password&version=v1 document }
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
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public.password&apiName=update&version=v1 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=update&project=drive&resource=permission.public.password&version=v1 document }
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
                 * 获取指定文件的点赞者列表并分页返回。
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
             * permission.public
             */
            permissionPublic: {
                /**
                 * {@link https://open.feishu.cn/api-explorer?project=drive&resource=permission.public&apiName=get&version=v2 click to debug }
                 *
                 * {@link https://open.feishu.cn/api-explorer?from=op_doc_tab&apiName=get&project=drive&resource=permission.public&version=v2 document }
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
